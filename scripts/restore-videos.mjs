import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=path.join(root,'docs');
const destination=path.join(root,'source/app/public');
await fs.access(path.join(root,'source/app/package.json'));
async function copy(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await copy(p);else if(e.name.endsWith('.mp4')){const out=path.join(destination,path.relative(source,p));await fs.mkdir(path.dirname(out),{recursive:true});await fs.copyFile(p,out);console.log(path.relative(source,p));}}}
await copy(source);
