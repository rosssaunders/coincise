import { scrapeRestDocs } from './rest_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "delivery/en/",
    "apiv4/en/",  // Add main API docs as it contains delivery endpoints
];

const outputPath = '../../../docs/gateio/rest_delivery_api.md';

scrapeRestDocs(endpoints, outputPath, 'delivery').catch(console.error); 