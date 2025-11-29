import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exchanges = {
  'backpack': 9452,
  'binance': 270,
  'bingx': 1064,
  'bitfinex': 37,
  'bitget': 513,
  'bitmart': 406,
  'bullish': 1601,
  'bybit': 521,
  'coinbase': 89,
  'cryptocom': 1149,
  'deribit': 522,
  'digifinex': 407,
  'gateio': 302,
  'htx': 102,
  'hyperliquid': 8112,
  'kucoin': 311,
  'mexc': 544,
  'okx': 294,
  'upbit': 351,
  'xt': 525
};

const outputDir = path.join(__dirname, '../docs/assets/exchanges');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(exchanges).forEach(([name, id]) => {
  const url = `https://s2.coinmarketcap.com/static/img/exchanges/64x64/${id}.png`;
  const filePath = path.join(outputDir, `${name}.png`);
  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}.png`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {}); // Delete the file async. (But we don't check the result)
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
