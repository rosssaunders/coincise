import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import widdershins from 'widdershins';
import process from 'process';
import { formatMarkdown } from '../../shared/format-markdown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    const configPath = path.resolve(__dirname, '../config/config.json');
    const configData = JSON.parse(await fs.readFile(configPath, 'utf8'));
    const { specUrl, outputFile, title } = configData;

    console.log(`Downloading OpenAPI spec from: ${specUrl}`);
    const tmpFile = path.join(__dirname, 'spec.tmp');
    execSync(`curl -L -o ${tmpFile} ${specUrl}`, { stdio: 'inherit' });
    const specText = await fs.readFile(tmpFile, 'utf8');
    await fs.unlink(tmpFile);
    const specJson = JSON.parse(specText);

    // add title if not present
    specJson.info = specJson.info || {};
    if (title) specJson.info.title = title;

    const options = {
      codeSamples: true,
      httpsnippet: false,
      language_tabs: [{ javascript: 'JavaScript' }, { python: 'Python' }],
      search: true,
      theme: 'darkula'
    };

    console.log('Converting spec to markdown...');
    const markdown = await widdershins.convert(specJson, options);

    const outPath = path.resolve(__dirname, '..', outputFile);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, markdown);
    await formatMarkdown(outPath);
    console.log(`Wrote: ${outPath}`);
  } catch (err) {
    console.error('Error generating docs:', err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
