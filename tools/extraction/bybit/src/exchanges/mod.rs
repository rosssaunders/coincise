//! Module for handling different cryptocurrency exchanges

// Make the processor_registry module public
pub mod processor_registry;

// Basic module structure - expand as needed
pub struct Exchange {
    pub name: String,
}

impl Exchange {
    pub fn new(name: &str) -> Self {
        Self {
            name: name.to_string(),
        }
    }
}
