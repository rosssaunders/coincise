# GET tickers.

**Source:**
[tickers.](https://docs.backpack.exchange/#tag/Markets/operation/get_tickers)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_tickers)Get tickers.

Retrieves summarised statistics for the last 24 hours for all market symbols.

##### query Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| interval  | optional | string |             |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter          | Required | Type             | Description                               |
| ------------------ | -------- | ---------------- | ----------------------------------------- |
| symbol             | required | string           | The symbol of the market.                 |
| firstPrice         | required | string <decimal> | First price for the interval.             |
| lastPrice          | required | string <decimal> | Last price for the interval.              |
| priceChange        | required | string <decimal> | Price change for the interval.            |
| priceChangePercent | required | string <decimal> | Percentage price change for the interval. |
| high               | required | string <decimal> | Highest price for the interval.           |
| low                | required | string <decimal> | Lowest price for the interval.            |
| volume             | required | string <decimal> | Base volume for the interval.             |
| quoteVolume        | required | string <decimal> | Quote volume for the interval.            |
| trades             | required | string           | Trades for the interval.                  |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
