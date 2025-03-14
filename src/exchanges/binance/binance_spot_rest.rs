use std::error::Error;
use crate::exchanges::binance::doc_processor::DocProcessor;

const ENDPOINTS: &[&str] = &[
    "rest-api",
    "filters",
    "enums",
    "errors",
];

const OUTPUT_FILE: &str = "binance_spot_rest_api_docs.md";
const TITLE: &str = "Binance Spot REST API Documentation";

pub async fn process_rest_docs() -> Result<(u32, String, String), Box<dyn Error>> {
    let processor = DocProcessor::new(ENDPOINTS, OUTPUT_FILE, TITLE);
    processor.process_docs().await
}
