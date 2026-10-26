import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { randomUUID, randomBytes, timingSafeEqual } from 'node:crypto';
import { renderIncludes } from './includes.mjs';

const root = resolve('public');
const dataDir = resolve('data');
const dataFile = resolve(dataDir, 'basvurular.json');
const port = Number(process.env.PORT || 4173);
const adminPassword = process.env.ADMIN_PASSWORD || randomBytes(6).toString('base64url');
if (!process.env.ADMIN_PASSWORD) console.log(`ADMIN_PASSWORD tanımlı değil. Bu oturumun yönetim şifresi: ${adminPassword}`);

const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'};
const programs = new Set(['LGS - 6. sınıf','LGS - 7. sınıf','LGS - 8. sınıf','YKS - 9. sınıf','YKS - 10. sınıf','YKS - 11. sınıf','YKS - 12. sınıf','YKS - Mezun','Özel ders']);
const statuses = new Set(['yeni','arandi','kayit','olumsuz']);

// Basit hız sınırı: aynı IP'den 10 dakikada en fazla 5 başvuru.
const hits = new Map();
function rateLimited(ip){
  const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < 600_000);
  list.push(now); hits.set(ip, list);
  return list.length > 5;
}

let writeQueue = Promise.resolve();
async function readAll(){
  try { return JSON.parse(await readFile(dataFile, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
}
function update(fn){
  const run = writeQueue.then(async () => {
    const list = await readAll();
    const result = fn(list);
    await mkdir(dataDir, {recursive:true});
    const tmp = dataFile + '.tmp';
    await writeFile(tmp, JSON.stringify(list, null, 2));
    await rename(tmp, dataFile);
    return result;
  });
  writeQueue = run.catch(() => {});
  return run;
}

function json(res, status, body){
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}).end(JSON.stringify(body));
}
async function readBody(req){
  let size = 0; const chunks = [];
  for await (const c of req){ size += c.length; if (size > 10_000) throw new Error('too-large'); chunks.push(c); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}
function authorized(req){
  const given = Buffer.from(String(req.headers['x-admin-password'] || ''));
  const expected = Buffer.from(adminPassword);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

async function api(req, res, url){
  if (url.pathname === '/api/on-kayit' && req.method === 'POST'){
    let body;
    try { body = await readBody(req); } catch { return json(res, 400, {error:'Form gönderilemedi. Lütfen tekrar deneyin.'}); }
    if (body.website) return json(res, 201, {ok:true}); // bal küpü alanı: botlara sessizce başarılı dön
    const ad = clean(body.ad, 80), telefon = clean(body.telefon, 20).replace(/[^\d+]/g, ''), program = clean(body.program, 40), not = clean(body.not, 500);
    const errors = {};
    if (ad.length < 3) errors.ad = 'Ad ve soyadı yazın.';
    if (!/^(\+?90|0)?[2-5]\d{9}$/.test(telefon)) errors.telefon = 'Telefon numarasını 05xx xxx xx xx biçiminde yazın.';
    if (!programs.has(program)) errors.program = 'Bir program seçin.';
    if (body.kvkk !== true) errors.kvkk = 'Devam etmek için aydınlatma metnini onaylayın.';
    if (Object.keys(errors).length) return json(res, 422, {error:'Lütfen işaretli alanları düzeltin.', fields:errors});
    if (rateLimited(req.socket.remoteAddress || '')) return json(res, 429, {error:'Kısa sürede çok fazla başvuru gönderildi. Lütfen bizi telefonla arayın.'});
    const entry = {id:randomUUID(), tarih:new Date().toISOString(), ad, telefon, program, not, durum:'yeni'};
    await update(list => { list.unshift(entry); });
    return json(res, 201, {ok:true});
  }
  if (url.pathname.startsWith('/api/basvurular')){
    if (!authorized(req)) return json(res, 401, {error:'Şifre hatalı.'});
    if (req.method === 'GET' && url.pathname === '/api/basvurular') return json(res, 200, await readAll());
    const id = url.pathname.split('/')[3];
    if (req.method === 'PATCH' && id){
      let body; try { body = await readBody(req); } catch { return json(res, 400, {error:'Geçersiz istek.'}); }
      if (!statuses.has(body.durum)) return json(res, 422, {error:'Geçersiz durum.'});
      const found = await update(list => { const e = list.find(x => x.id === id); if (e) e.durum = body.durum; return Boolean(e); });
      return found ? json(res, 200, {ok:true}) : json(res, 404, {error:'Başvuru bulunamadı.'});
    }
    if (req.method === 'DELETE' && id){
      const found = await update(list => { const i = list.findIndex(x => x.id === id); if (i >= 0) list.splice(i, 1); return i >= 0; });
      return found ? json(res, 200, {ok:true}) : json(res, 404, {error:'Başvuru bulunamadı.'});
    }
  }
  return json(res, 404, {error:'Bulunamadı.'});
}

async function serveFile(res, path, status = 200){
  let body = await readFile(path);
  if (extname(path) === '.html') body = await renderIncludes(body.toString('utf8'), root);
  res.writeHead(status, {'Content-Type':types[extname(path)] || 'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}).end(body);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith('/_partials')) throw Object.assign(new Error('partial'), {code:'ENOENT'});
    if (pathname.endsWith('/')) pathname += 'index.html';
    else if (!extname(pathname)) pathname += '.html';
    const path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    await serveFile(res, path);
  } catch (e) {
    if (e.code === 'ENOENT' || e.code === 'EISDIR') { try { return await serveFile(res, resolve(root, '404.html'), 404); } catch {} }
    console.error(e);
    if (!res.headersSent) res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'}).end('Sunucu hatası.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Tecrübe Kurs Merkezi: http://localhost:${port}`));
