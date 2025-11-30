# GET /api/v3/ticker/bookTicker

**Source:**
https://www.mexc.com/api-docs/spot-v3/market-data-endpoints#symbol-order-book-ticker

> Response

```json
{  "symbol": "AEUSDT",  "bidPrice": "0.11001",  "bidQty": "115.59",  "askPrice": "0.11127",  "askQty": "215.48"}OR[  {    "symbol": "AEUSDT",    "bidPrice": "0.11001",    "bidQty": "115.59",    "askPrice": "0.11127",    "askQty": "215.48"  },  {    "symbol": "AEUSDT",    "bidPrice": "0.11001",    "bidQty": "115.59",    "askPrice": "0.11127",    "askQty": "215.48"  }]
```

- **GET** `/api/v3/ticker/bookTicker`

**Weight(IP):** 1

Best price/qty on the order book for a symbol or symbols.

Parameters:

| Name   | Type   | Mandatory | Description                                                          |
| ------ | ------ | --------- | -------------------------------------------------------------------- |
| symbol | string | NO        | If the symbol is not sent, all symbols will be returned in an array. |

Response:

| Name     | Description       |
| -------- | ----------------- |
| symbol   | Symbol            |
| bidPrice | Best bid price    |
| bidQty   | Best bid quantity |
| askPrice | Best ask price    |
| askQty   | Best ask quantity |
