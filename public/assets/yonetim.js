const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const KEY = 'tecrube-admin';
const labels = {yeni:'Yeni', arandi:'Arandı', kayit:'Kayıt oldu', olumsuz:'Olumsuz'};
let password = '';
try { password = sessionStorage.getItem(KEY) || ''; } catch {}
let entries = [], filter = 'hepsi', query = '';

async function api(path, options = {}){
  const res = await fetch(path, {...options, headers:{'Content-Type':'application/json', 'X-Admin-Password':password, ...options.headers}});
  if ([404, 405, 501].includes(res.status)) throw new Error('Yönetim paneli bu barındırmada çalışmıyor: ön kayıt sunucusu (npm start) ya da veritabanı bağlantısı gerekir.');
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'İşlem tamamlanamadı.'), {status:res.status});
  return data;
}
function show(view){ $$('[data-view]').forEach(el => el.hidden = el.dataset.view !== view); }
const status = msg => { $('.admin-status').textContent = msg; };
const fmtDate = iso => new Intl.DateTimeFormat('tr-TR', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', timeZone:'Europe/Istanbul'}).format(new Date(iso));
const fmtTel = t => { const d = t.replace(/\D/g, '').replace(/^90/, '').replace(/^0/, ''); return d.length === 10 ? `0${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6,8)} ${d.slice(8)}` : t; };
const waTel = t => '90' + t.replace(/\D/g, '').replace(/^90/, '').replace(/^0/, '');

function render(){
  const counts = {hepsi:entries.length, yeni:0, arandi:0, kayit:0, olumsuz:0};
  entries.forEach(e => counts[e.durum]++);
  Object.entries(counts).forEach(([k, v]) => $(`[data-count="${k}"]`).textContent = v);
  $('#dash-summary').textContent = counts.yeni ? `${counts.yeni} yeni başvuru aranmayı bekliyor.` : 'Bekleyen yeni başvuru yok.';
  const q = query.toLocaleLowerCase('tr');
  const list = entries.filter(e => (filter === 'hepsi' || e.durum === filter) && (!q || `${e.ad} ${e.telefon} ${e.program} ${e.not}`.toLocaleLowerCase('tr').includes(q)));
  const tbody = $('#rows');
  tbody.replaceChildren(...list.map(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="when"></td><td class="name"></td><td class="tel"><a class="call"></a><a class="wa" target="_blank" rel="noopener">WhatsApp</a></td><td><span class="pill"></span></td><td class="note"></td><td><label class="sr-only"></label><select class="state">${Object.entries(labels).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></td><td><button class="del" type="button"><svg class="icon"><use href="#i-close"/></svg><span class="sr-only">Sil</span></button></td>`;
    $('.when', tr).textContent = fmtDate(e.tarih);
    $('.name', tr).textContent = e.ad;
    $('.call', tr).textContent = fmtTel(e.telefon);
    $('.call', tr).href = `tel:+${waTel(e.telefon)}`;
    $('.wa', tr).href = `https://wa.me/${waTel(e.telefon)}`;
    $('.pill', tr).textContent = e.program;
    $('.note', tr).textContent = e.not || '—';
    const sel = $('.state', tr);
    sel.value = e.durum; sel.dataset.state = e.durum;
    sel.id = `state-${e.id}`; $('label', tr).htmlFor = sel.id; $('label', tr).textContent = `${e.ad} durumu`;
    sel.addEventListener('change', async () => {
      const prev = e.durum;
      try { await api(`/api/basvurular/${e.id}`, {method:'PATCH', body:JSON.stringify({durum:sel.value})}); e.durum = sel.value; status(`${e.ad}: ${labels[e.durum]} olarak işaretlendi.`); render(); }
      catch (err) { sel.value = prev; status(err.message); }
    });
    $('.del', tr).addEventListener('click', async () => {
      if (!confirm(`${e.ad} başvurusu kalıcı olarak silinsin mi?`)) return;
      try { await api(`/api/basvurular/${e.id}`, {method:'DELETE'}); entries = entries.filter(x => x !== e); status('Başvuru silindi.'); render(); }
      catch (err) { status(err.message); }
    });
    return tr;
  }));
  $('#empty').hidden = list.length > 0;
  if (!list.length && entries.length) { $('#empty h2').textContent = 'Bu filtrede başvuru yok.'; $('#empty p').textContent = 'Başka bir durum seçin ya da aramayı temizleyin.'; }
  else { $('#empty h2').textContent = 'Henüz başvuru yok.'; $('#empty p').textContent = 'Sitedeki ön kayıt formundan gelen başvurular burada listelenecek.'; }
}

async function load(){
  try {
    entries = await api('/api/basvurular');
    show('dash'); render(); status('');
  } catch (err) {
    if (err.status === 401){ try { sessionStorage.removeItem(KEY); } catch {} password = ''; show('login'); }
    else status(err.message);
    throw err;
  }
}

$('#login-form').addEventListener('submit', async e => {
  e.preventDefault();
  password = $('#password').value;
  const error = $('#login-error');
  try { await load(); try { sessionStorage.setItem(KEY, password); } catch {} error.hidden = true; }
  catch (err) { error.textContent = err.status === 401 ? 'Şifre hatalı. Tekrar deneyin.' : err.message; error.hidden = false; $('#password').select(); }
});
$('#logout').addEventListener('click', () => { try { sessionStorage.removeItem(KEY); } catch {} password = ''; $('#password').value = ''; show('login'); });
$('#refresh').addEventListener('click', () => load().then(() => status('Liste güncellendi.')).catch(() => {}));
$('#search').addEventListener('input', e => { query = e.target.value.trim(); render(); });
$$('[data-filter]').forEach(b => b.addEventListener('click', () => {
  filter = b.dataset.filter;
  $$('[data-filter]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  render();
}));
$('#export').addEventListener('click', () => {
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [['Tarih', 'Ad soyad', 'Telefon', 'Program', 'Not', 'Durum'], ...entries.map(e => [fmtDate(e.tarih), e.ad, fmtTel(e.telefon), e.program, e.not, labels[e.durum]])];
  const blob = new Blob(['﻿' + rows.map(r => r.map(esc).join(';')).join('\r\n')], {type:'text/csv;charset=utf-8'});
  const a = Object.assign(document.createElement('a'), {href:URL.createObjectURL(blob), download:`on-kayit-basvurulari-${new Date().toISOString().slice(0, 10)}.csv`});
  a.click(); URL.revokeObjectURL(a.href);
});

if (password) load().catch(() => {}); else show('login');
