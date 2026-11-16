import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const shots = [
  ['IMG_20230110_173612.jpg', 'https://github.com/user-attachments/assets/bb4e5408-e599-432b-92b5-df48ca489759'],
  ['IMG_20220727_154355~2.jpg', 'https://github.com/user-attachments/assets/a5fb60c1-9f11-422e-907d-467986830a21'],
  ['IMG_20231024_152823.jpg', 'https://github.com/user-attachments/assets/ba4713b7-c496-448d-8884-e88f435c5f5f'],
  ['IMG_20220501_111213.jpg', 'https://github.com/user-attachments/assets/268aaab8-aaa3-46dd-9be9-023603e72cc7'],
  ['IMG_20231029_213043.jpg', 'https://github.com/user-attachments/assets/c8bc2995-5622-4b8c-8ded-df13bd048005'],
  ['IMG_20211102_172257.jpg', 'https://github.com/user-attachments/assets/8a631ff6-edf4-41e1-937f-1b914e4a44c7'],
  ['IMG_20231028_012715.jpg', 'https://github.com/user-attachments/assets/167e6b30-4e10-44c8-a44d-407a98070558']
];

const dir = join(process.cwd(), 'public', 'images');
await mkdir(dir, {recursive: true});
for (const [file, url] of shots) {
  const target = join(dir, file);
  try {
    const response = await fetch(url, {redirect: 'follow', headers: {'User-Agent': 'JUMP-edit-assets/1.0'}});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength < 10_000) throw new Error('Unexpectedly small image response');
    await writeFile(target, bytes);
    process.stdout.write(`OK ${file} (${bytes.byteLength} bytes)\\n`);
  } catch (error) {
    process.stderr.write(`FAILED ${file}: ${error.message}\\n`);
    process.exitCode = 1;
  }
}
