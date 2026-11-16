import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {shots} from '../src/assets.ts';

const dir = join(process.cwd(), 'public', 'images');
await mkdir(dir, {recursive: true});
for (const shot of shots) {
  const target = join(dir, shot.file);
  try {
    const response = await fetch(shot.url, {redirect: 'follow', headers: {'User-Agent': 'JUMP-edit-assets/1.0'}});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength < 10_000) throw new Error('Unexpectedly small image response');
    await writeFile(target, bytes);
    process.stdout.write(`OK ${shot.file} (${bytes.byteLength} bytes)\\n`);
  } catch (error) {
    process.stderr.write(`FAILED ${shot.file}: ${error.message}\\n`);
    process.exitCode = 1;
  }
}
