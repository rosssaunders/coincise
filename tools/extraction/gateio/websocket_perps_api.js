import { scrapeWebsocketDocs } from './websocket_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "futures/ws/en/",
];

const outputPath = '../../../docs/gateio/websocket_perps_api.md';

scrapeWebsocketDocs(endpoints, outputPath).catch(console.error);
