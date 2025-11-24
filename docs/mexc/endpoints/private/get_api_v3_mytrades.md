# GET /api/v3/myTrades

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#account-trade-list

> Response

```json
[  {    "symbol": "BNBBTC",    "id": "fad2af9e942049b6adbda1a271f990c6",    "orderId": "bb41e5663e124046bd9497a3f5692f39",    "orderListId": -1,    "price": "4.00000100",     "qty": "12.00000000",     "quoteQty": "48.000012",     "commission": "10.10000000",     "commissionAsset": "BNB",     "time": 1499865549590,     "isBuyer": true,     "isMaker": false,     "isBestMatch": true,    "isSelfTrade": true,    "clientOrderId": null  }]
```

-   **GET** `/api/v3/myTrades`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 10

Get trades for a specific account and symbol,Only the transaction records in the past 1 month can be queried. If you want to view more transaction records, please use the export function on the web side, which supports exporting transaction records of the past 540 days at most.

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | YES |  |
| orderId | string | NO | order Id |
| startTime | long | NO |  |
| endTime | long | NO |  |
| limit | int | NO | Default 100; max 100; |
| recvWindow | long | NO |  |
| timestamp | long | YES |  |

Response:

| Name | Description |
| --- | --- |
| symbol |  |
| id | deal id |
| orderId | order id |
| price | Price |
| qty | Quantity |
| quoteQty | Deal quantity |
| time | Deal time |
| commission |  |
| commissionAsset |  |
| time | trade time |
| isBuyerMaker |  |
| isBestMatch |  |
| isSelfTrade | isSelfTrade |
| clientOrderId | clientOrderId |
