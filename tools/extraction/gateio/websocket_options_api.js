import { scrapeWebsocketDocs } from './websocket_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "options/ws/en/",
];

const outputPath = '../../../docs/gateio/websocket_options_api.md';

scrapeWebsocketDocs(endpoints, outputPath).catch(console.error);
