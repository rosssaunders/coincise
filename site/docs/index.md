# Coincise - Crypto API Documentation

LLM-friendly cryptocurrency exchange API documentation covering **20 exchanges** with **2,960+ endpoint documents** optimized for AI consumption.

## What is Coincise?

Coincise provides clean, structured markdown documentation for major cryptocurrency exchange APIs. Documentation is updated weekly through automated pipelines and formatted specifically for optimal LLM context window usage.

## For AI/LLM Users

Access machine-readable documentation indexes:

| Resource | Description |
|----------|-------------|
| [llms.txt](/llms.txt) | Hierarchical index with all exchanges and endpoints |
| [llms-full.txt](/llms-full.txt) | Complete index with document summaries (~3,200 lines) |
| [api/index.json](/api/index.json) | Machine-readable JSON metadata index |
| [/.well-known/llms.txt](/.well-known/llms.txt) | Standard discovery endpoint |
| [/raw/](/raw/) | Direct access to raw markdown files |

## For Human Users

Browse the documentation using the navigation on the left. Each exchange section includes:

- **General Documentation**: Authentication, rate limits, error codes, network connectivity
- **Public Endpoints**: Market data, orderbooks, trades, tickers
- **Private Endpoints**: Account info, order management, positions, withdrawals

## Supported Exchanges

<div class="grid cards" markdown>

-   :material-bitcoin: **Backpack**

    49 documents covering spot trading API

-   :material-bitcoin: **Binance**

    62 documents covering spot and futures APIs

-   :material-bitcoin: **BingX**

    89 documents covering perpetual and spot APIs

-   :material-bitcoin: **Bitfinex**

    74 documents covering margin and derivatives APIs

-   :material-bitcoin: **Bitget**

    315 documents covering spot, futures, and copy trading

-   :material-bitcoin: **BitMart**

    206 documents covering spot and futures APIs

-   :material-bitcoin: **Bullish**

    71 documents covering institutional trading API

-   :material-bitcoin: **Bybit**

    218 documents covering derivatives and spot APIs

-   :material-bitcoin: **Coinbase**

    148 documents covering Advanced Trade and Exchange APIs

-   :material-bitcoin: **Crypto.com**

    126 documents covering spot and derivatives APIs

-   :material-bitcoin: **Deribit**

    216 documents covering options and futures APIs

-   :material-bitcoin: **DigiFinex**

    81 documents covering spot trading API

-   :material-bitcoin: **Gate.io**

    533 documents covering spot, margin, and futures

-   :material-bitcoin: **HTX (Huobi)**

    174 documents covering spot and derivatives APIs

-   :material-bitcoin: **Hyperliquid**

    55 documents covering perpetuals DEX API

-   :material-bitcoin: **KuCoin**

    193 documents covering spot and futures APIs

-   :material-bitcoin: **MEXC**

    166 documents covering spot and futures APIs

-   :material-bitcoin: **OKX**

    300 documents covering unified trading API

-   :material-bitcoin: **Upbit**

    41 documents covering Korean exchange API

-   :material-bitcoin: **XT**

    73 documents covering spot trading API

</div>

## Documentation Standards

All documentation follows a consistent structure:

- **Standardized endpoint format** with request/response parameters in tables
- **JSON code blocks** properly tagged for syntax highlighting
- **Rate limit information** for each endpoint
- **Authentication requirements** clearly indicated
- **Error codes** with descriptions and remediation steps

## Contributing

This project is open source. Visit the [GitHub repository](https://github.com/rosssaunders/coincise) to:

- Report issues with documentation
- Request new exchange integrations
- Contribute extraction scripts

## License

Documentation is provided under the MIT License. Original API documentation remains property of respective exchanges.
