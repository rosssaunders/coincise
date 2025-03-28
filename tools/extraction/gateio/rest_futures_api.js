import { scrapeRestDocs } from './rest_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "futures/en/",
    "apiv4/en/",  // Add main API docs as it contains futures endpoints
];

const outputPath = '../../../docs/gateio/rest_futures_api.md';

scrapeRestDocs(endpoints, outputPath, 'futures').catch(console.error); 