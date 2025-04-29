# Binance API Documentation Extractor

A CLI tool to extract and process Binance API documentation.

## Installation

```bash
npm install
```

## Usage

### Process Documentation

Process documentation for a specific exchange:

```bash
node src/main.js process <exchange>
```

Available exchanges:
- `binancespot` - Binance Spot
- `binanceusdm` - Binance USD-M Futures
- `binancecoinm` - Binance COIN-M Futures
- `binanceoptions` - Binance Options

## Output

The processed documentation will be saved in the `docs` directory, organized by exchange and API type.
