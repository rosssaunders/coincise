# GET /api/v3/aggTrades

**Source:** https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#compressedaggregate-trades-list

> Response

```json
[  {    "a": null,    "f": null,    "l": null,    "p": "46782.67",    "q": "0.0038",    "T": 1641380483000,    "m": false,    "M": true  }]
```

-   **GET** `/api/v3/aggTrades`

**Weight(IP):** 1

Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.

Parameters:

| Name | Type | Mandatory | Description | Scope |
| --- | --- | --- | --- | --- |
| symbol | string | YES |  |  |
| startTime | long | NO | Timestamp in ms to get aggregate trades from INCLUSIVE. |  |
| endTime | long | NO | Timestamp in ms to get aggregate trades until INCLUSIVE. |  |
| limit | integer | NO |  | Default 500; max 1000. |

startTime and endTime must be used at the same time.

Response:

| Name | Description |
| --- | --- |
| a | Aggregate tradeId |
| f | First tradeId |
| l | Last tradeId |
| p | Price |
| q | Quantity |
| T | Timestamp |
| m | Was the buyer the maker? |
| M | Was the trade the best price match? |
