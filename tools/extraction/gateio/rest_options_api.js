import { scrapeRestDocs } from './rest_docs_utils.js';

// List of endpoints to scrape
const endpoints = [
    "options/en/",
    "apiv4/en/",  // Add main API docs as it contains options endpoints
];

const outputPath = '../../../docs/gateio/rest_options_api.md';

scrapeRestDocs(endpoints, outputPath, 'options').catch(console.error); 