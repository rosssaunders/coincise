# New Order

> Request

```
POST /api/v3/order?symbol=MXUSDT&side=BUY&type=LIMIT&quantity=50&price=0.1&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
{
    "symbol": "MXUSDT",
    "orderId": "06a480e69e604477bfb48dddd5f0b750",
    "orderListId": -1,
    "price": "0.1",
    "origQty": "50",
    "type": "LIMIT",
    "side": "BUY",
    "transactTime": 1666676533741
}
```

- **POST** `/api/v3/order`

**Permission:** SPOT_DEAL_WRITE

**Weight(IP):** 1, **Weight(UID):** 1

Parameters:

| Name             | type    | Mandatory | Description                    |
| ---------------- | ------- | --------- | ------------------------------ |
| symbol           | STRING  | YES       |                                |
| side             | ENUM    | YES       | ENUM:[Order Side](#order_side) |
| type             | ENUM    | YES       | ENUM:[Order Type](#order_type) |
| quantity         | DECIMAL | NO        | Quantity                       |
| quoteOrderQty    | DECIMAL | NO        | Quote order quantity           |
| price            | DECIMAL | NO        | Price                          |
| newClientOrderId | STRING  | NO        |                                |
| recvWindow       | LONG    | NO        | Max 60000                      |
| timestamp        | LONG    | YES       |                                |

Response:

| Name         | Description               |
| ------------ | ------------------------- |
| symbol       | Symbol                    |
| orderId      | order id                  |
| orderListId  | order list id             |
| price        | Price                     |
| origQty      | Original order quantity   |
| type         | [Order type](#order_type) |
| side         | [order side](#order_side) |
| transactTime | transactTime              |

Additional mandatory parameters based on `type`:

| Type     | Additional mandatory parameters |
| -------- | ------------------------------- |
| `LIMIT`  | `quantity`, `price`             |
| `MARKET` | `quantity` or `quoteOrderQty`   |

Other info:

MARKET: When type is market, `quoteOrderQty` or `quantity` required to choose
anyone.

- `MARKET` orders using the `quantity` field specifies the amount of the
  `base asset` the user wants to sell at the market price
  - For example, sending a `MARKET` order on BTCUSDT will specify how much BTC
    the user is selling.
- `MARKET` orders using `quoteOrderQty` specifies the amount the user wants to
  spend (when buying) the `quote` asset; the correct `quantity` will be
  determined based on the market liquidity
  - Using BTCUSDT as an example:
  - On the `BUY` side, the order will buy as many BTC as `quoteOrderQty` USDT
    can.
  - On the `SELL` side, the order will sell the `quantity` of BTC.

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#new-order
