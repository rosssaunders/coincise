import { scrapeRestDocs } from './rest_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "apiv4/en/",
];

const outputPath = '../../../docs/gateio/rest_spot_api.md';

scrapeRestDocs(endpoints, outputPath, 'spot').catch(console.error); 