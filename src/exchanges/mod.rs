#[allow(unused_imports)]
pub mod binancespot;
#[allow(unused_imports)]
pub mod binancecoinm;
#[allow(unused_imports)]
pub mod binanceusdm;
pub mod processor_registry;
pub mod binancecommon;

use std::error::Error;
use async_trait::async_trait;

// Ensure processor modules are included in the binary
#[allow(unused_imports)]
pub use binancespot::*;
#[allow(unused_imports)]
pub use binancecoinm::*;
#[allow(unused_imports)]
pub use binanceusdm::*;

#[async_trait]
pub trait ApiProcessor: Send + Sync {
    async fn process_docs(&self) -> Result<(u32, String, String), Box<dyn Error>>;
    fn get_output_filename(&self) -> String;
}
