import { cp, mkdir, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { renderIncludes } from './includes.mjs';

const root = resolve('public'), out = resolve('dist');
await rm(out, {recursive:true, force:true});
await mkdir(out, {recursive:true});
await cp(root, out, {recursive:true, filter: src => !src.includes('_partials')});
for (const name of await readdir(out)){
  if (extname(name) !== '.html') continue;
  const file = resolve(out, name);
  await writeFile(file, await renderIncludes(await readFile(file, 'utf8'), root));
}
console.log('Üretim dosyaları dist/ klasöründe hazır. Ön kayıt formu için sunucu (npm start) gerekir.');
