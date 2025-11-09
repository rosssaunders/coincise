# BingX API Documentation Extractor

This project extracts BingX API documentation and converts it to structured
markdown format, organized by trading type and functionality.

## Project Structure

```
bingx/
├── config/                          # Configuration files by doc type
│   ├── usdt_futures_general.json   # USDT-Futures general info
│   ├── usdt_futures_authentication.json # USDT-Futures authentication
│   ├── usdt_futures_market_data.json    # USDT-Futures market data
│   ├── usdt_futures_trading.json        # USDT-Futures trading
│   ├── usdt_futures_account.json        # USDT-Futures account
│   ├── coin_futures_general.json           # Coin-Futures general info
│   ├── coin_futures_authentication.json    # Coin-Futures authentication
│   ├── coin_futures_market_data.json       # Coin-Futures market data
│   ├── coin_futures_trading.json           # Coin-Futures trading
│   ├── standard_futures_base_info.json      # Standard Futures base info
│   ├── standard_futures_authentication.json # Standard Futures authentication
│   ├── standard_futures_contract_interface.json # Standard Futures contract interface
│   ├── spot_base_info.json                  # Spot base information
│   ├── spot_authentication.json             # Spot authentication
│   ├── spot_wallet.json                     # Spot wallet operations
│   ├── spot_account.json                    # Spot account management
│   ├── spot_trading.json                    # Spot trading operations
│   ├── public.json                      # Spot Public REST API
│   ├── privateWebSocket.json            # Spot Private WebSocket API
│   ├── publicWebSocket.json             # Spot Public WebSocket API
│   ├── change_log.json                  # Spot Change Log
│   ├── account_wallet_introduction.json     # Account & Wallet introduction
│   ├── account_wallet_account_api.json      # Account & Wallet account operations
│   ├── account_wallet_sub_account.json      # Account & Wallet sub-account management
│   ├── account_wallet_wallet_api.json       # Account & Wallet wallet operations
│   ├── copy_trading.json                # Copy Trading configuration
│   └── agent_broker.json                # Agent & Broker configuration
├── src/
│   ├── index.js                         # Main entry point
│   └── config.js                        # Configuration loader
├── package.json
└── README.md
```

## Documentation Categories

The BingX documentation is organized into the following categories:

1. **USDT-Futures** - USDT-margined perpetual futures trading
2. **Coin-Futures** - Coin-margined futures trading
3. **Spot** - Spot trading (REST API and WebSocket)
4. **Standard Futures** - Standard futures contracts
5. **Account & Wallet** - Account management and wallet operations
6. **Copy Trading** - Copy trading functionality
7. **Agent & Broker** - Agent and broker management

## Dependencies

- puppeteer: ^24.8.0 - For web scraping
- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: ^26.1.0 - For HTML parsing and manipulation
- prettier: ^3.5.3 - For markdown formatting

## Usage

1. Install dependencies:

```bash
pnpm install
```

2. Extract documentation by category:

```bash
# Extract all documentation
pnpm run extract:all

# Extract specific categories
pnpm run extract:usdt-futures
pnpm run extract:coin-futures
pnpm run extract:spot
pnpm run extract:standard-futures
pnpm run extract:account-wallet
pnpm run extract:copy-trading
pnpm run extract:agent-broker
pnpm run extract:change-log

# Individual USDT futures API extractions
pnpm run extract:usdt-futures-general
pnpm run extract:usdt-futures-auth
pnpm run extract:usdt-futures-market
pnpm run extract:usdt-futures-trading
pnpm run extract:usdt-futures-account

# Individual standard futures API extractions
pnpm run extract:standard-futures-base
pnpm run extract:standard-futures-auth
pnpm run extract:standard-futures-contract

# Individual coin futures API extractions
pnpm run extract:coin-futures-general
pnpm run extract:coin-futures-auth
pnpm run extract:coin-futures-market
pnpm run extract:coin-futures-trading

# Individual account & wallet API extractions
pnpm run extract:account-wallet-intro
pnpm run extract:account-wallet-account
pnpm run extract:account-wallet-sub
pnpm run extract:account-wallet-wallet

# Individual spot API extractions
pnpm run extract:spot-private
pnpm run extract:spot-base
pnpm run extract:spot-auth
pnpm run extract:spot-wallet
pnpm run extract:spot-account
pnpm run extract:spot-trading
pnpm run extract:spot-public
pnpm run extract:spot-private-ws
pnpm run extract:spot-public-ws
```

3. Legacy commands (still supported):

```bash
pnpm run private    # Spot private REST API
pnpm run public     # Spot public REST API
pnpm run privateWs  # Spot private WebSocket API
pnpm run publicWs   # Spot public WebSocket API
pnpm run change_log # Change log
pnpm run all        # All legacy extractions
```

## Output Structure

Generated documentation is organized in `../../docs/bingx/` with the following
structure:

```
docs/bingx/
├── usdt_futures/
│   ├── general_information.md
│   ├── authentication.md
│   ├── market_data.md
│   ├── trading.md
│   └── account.md
├── coin_futures/
│   ├── general_information.md
│   ├── authentication.md
│   ├── market_data.md
│   └── trading.md
├── spot/
│   ├── base_info.md
│   ├── authentication.md
│   ├── wallet.md
│   ├── account.md
│   ├── trading.md
│   ├── public_rest_api.md
│   ├── private_websocket_api.md
│   ├── public_websocket_api.md
│   └── change_log.md
├── standard_futures/
│   ├── base_info.md
│   ├── authentication.md
│   └── contract_interface.md
├── account_wallet/
│   ├── introduction.md
│   ├── account_api.md
│   ├── sub_account.md
│   └── wallet_api.md
├── copy_trading/
│   └── rest_api.md
└── agent_broker/
    └── rest_api.md
```

## Configuration

Each configuration file contains:

- `title`: Document title
- `urls`: Array of URLs to extract
- `outputConfig`: Output directory and filename settings

Example configuration:

```json
{
  "title": "BingX USDT-Futures API",
  "urls": [
    "https://bingx-api.github.io/docs/#/en-us/swapV2/introduce",
    "https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html"
  ],
  "outputConfig": {
    "docsDir": "../../docs/bingx/usdt_futures",
    "outputFileName": "rest_api.md"
  }
}
```

## Features

- **Advanced Web Scraping**: Uses Puppeteer with optimized settings for
  documentation extraction
- **Content Processing**: Sophisticated HTML processing to extract clean API
  documentation
- **Markdown Conversion**: High-quality conversion to GitHub Flavored Markdown
- **Error Handling**: Comprehensive error handling with detailed logging
- **Table Processing**: Smart table extraction and formatting
- **Source Attribution**: Automatic source links for each extracted endpoint
- **Rate Limiting**: Polite delays between requests to respect server resources
