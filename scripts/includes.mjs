import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// <!-- @include header --> satırlarını public/_partials/header.html içeriğiyle değiştirir.
export async function renderIncludes(html, root){
  const names = [...new Set([...html.matchAll(/<!-- @include ([\w-]+) -->/g)].map(m => m[1]))];
  for (const name of names){
    const partial = await readFile(resolve(root, '_partials', `${name}.html`), 'utf8');
    html = html.replaceAll(`<!-- @include ${name} -->`, partial.trim());
  }
  html = markMissingPhotos(html, root);
  // Yayında fotoğraf hâlâ eksikse "Fotoğraf eklenecek" notu velilere gösterilmez: FOTO_NOTU=kapali
  if (process.env.FOTO_NOTU === 'kapali') html = html.replaceAll('<span>Fotoğraf eklenecek</span>', '');
  return html;
}

// Dosyası henüz olmayan fotoğraf alanlarında <img> kaldırılır ve alan yer tutucuyla işaretlenir;
// public/images altına dosya konunca bir sonraki istekte (ya da build'de) kendiliğinden görünür.
function markMissingPhotos(html, root){
  return html.replace(/class="([^"]*\bph\b[^"]*)"([^>]*)><img src="\/images\/([^"]+)"[^>]*>/g, (match, cls, rest, file) =>
    existsSync(resolve(root, 'images', file)) ? match : `class="${cls} is-empty"${rest}>`);
}
