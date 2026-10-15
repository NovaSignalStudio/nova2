import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = path.resolve(root, process.argv[2] || 'source/app/dist-preview');
const output = path.join(root, 'docs');
const base = '/nova2/';
await fs.access(path.join(input, 'index.html'));
await fs.mkdir(output, {recursive: true});
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.svg', '.webmanifest']);
let count = 0;
async function copyDirectory(from, to) {
  await fs.mkdir(to, {recursive: true});
  for (const entry of await fs.readdir(from, {withFileTypes: true})) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(source, target);
    } else if (entry.isFile()) {
      if (textExtensions.has(path.extname(entry.name))) {
        const text = await fs.readFile(source, 'utf8');
        // Runtime video/image strings and fonts need the project path too.
        await fs.writeFile(target, text.replace(/(?<![\w/])\/assets\//g, base + 'assets/'));
      } else {
        await fs.copyFile(source, target);
      }
      count++;
    }
  }
}
await copyDirectory(input, output);
await fs.writeFile(path.join(output, '.nojekyll'), '');
console.log(`Prepared ${count} files for GitHub Pages at ${base}`);

