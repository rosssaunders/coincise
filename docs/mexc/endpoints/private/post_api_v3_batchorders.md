# POST /api/v3/batchOrders

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#batch-orders

Supports 20 orders with a same symbol in a batch,rate limit:2 times/s.

> Request

```bash
POST /api/v3/batchOrders?batchOrders=[{"type": "LIMIT_ORDER","price": "40000","quantity": "0.0002","symbol": "BTCUSDT","side": "BUY","newClientOrderId": 9588234},{"type": "LIMIT_ORDER","price": "4005","quantity": "0.0003","symbol": "BTCUSDT","side": "SELL"}]
```

> Response

```json
{  { //success response:   [     {          "symbol": "BTCUSDT",          "orderId": "1196315350023612316",          "orderListId": -1      },     {          "symbol": "BTCUSDT",          "orderId": "1196315350023612318",          "orderListId": -1      }   ],   //error response:   [     {        "symbol": "BTCUSDT",        "orderId": "1196315350023612316",        "newClientOrderId": "hio8279hbdsds",        "orderListId": -1      },     {        "newClientOrderId": "123456",       "msg": "The minimum transaction volume cannot be less than:0.5USDT",        "code": 30002     },     {        "symbol": "BTCUSDT",        "orderId": "1196315350023612318",        "orderListId": -1      }   ]  }}
```

- **POST** `/api/v3/batchOrders`

**Permission:** SPOT_DEAL_WRITE

**Weight(IP):** 1,**Weight(UID):** 1

Parameters:

| Name             | type    | Mandatory | Description                                                                                                                                                           |
| ---------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| batchOrders      | LIST    | YES       | list of batchOrders,supports max 20 orders                                                                                                                            |
| symbol           | STRING  | YES       | symbol                                                                                                                                                                |
| side             | ENUM    | YES       | [order side](#order_side "order side")                                                                                                                                |
| type             | ENUM    | YES       | [order type](#order_type "order type")                                                                                                                                |
| quantity         | DECIMAL | NO        | quantity                                                                                                                                                              |
| quoteOrderQty    | DECIMAL | NO        | quoteOrderQty                                                                                                                                                         |
| price            | DECIMAL | NO        | order price                                                                                                                                                           |
| newClientOrderId | STRING  | NO        | ClientOrderId                                                                                                                                                         |
| stpMode          | STRING  | NO        | “” - Default value, no restriction on self-trading.“cancel_maker” - Cancel the maker order.“cancel_taker” - Cancel the taker order.“cancel_both” - Cancel both sides. |
| recvWindow       | LONG    | NO        | less than 60000                                                                                                                                                       |
| timestamp        | LONG    | YES       | order time                                                                                                                                                            |

base on different`type`,some params are mandatory:

| type     | Mandatory params              |
| -------- | ----------------------------- |
| `LIMIT`  | `quantity`, `price`           |
| `MARKET` | `quantity` or `quoteOrderQty` |

Response

| Name    | type   | Description |
| ------- | ------ | ----------- |
| symbol  | STRING | symbol      |
| orderId | STRING | orderId     |
