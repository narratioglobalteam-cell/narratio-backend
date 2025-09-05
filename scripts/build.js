import fs from 'fs';
import path from 'path';
const src = path.resolve('src');
const dist = path.resolve('dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const file of fs.readdirSync(src)) {
  fs.copyFileSync(path.join(src, file), path.join(dist, file));
}
console.log('Backend built to dist/');
