# POST /api/v3/order

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#new-order

> Request

```bash
POST /api/v3/order?symbol=MXUSDT&side=BUY&type=LIMIT&quantity=50&price=0.1&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{    "symbol": "MXUSDT",    "orderId": "06a480e69e604477bfb48dddd5f0b750",    "orderListId": -1,    "price": "0.1",    "origQty": "50",    "type": "LIMIT",    "side": "BUY",    "stpMode": "",    "transactTime": 1666676533741}
```

-   **POST** `/api/v3/order`

**Permission:** SPOT\_DEAL\_WRITE

**Weight(IP):** 1, **Weight(UID):** 1

Parameters:

| Name | type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| side | ENUM | YES | ENUM:[Order Side](#order_side "Order Side") |
| type | ENUM | YES | ENUM:[Order Type](#order_type "Order Type") |
| quantity | DECIMAL | NO | Quantity |
| quoteOrderQty | DECIMAL | NO | Quote order quantity |
| price | DECIMAL | NO | Price |
| newClientOrderId | STRING | NO |  |
| stpMode | STRING | NO | “” - Default value, no restriction on self-trading.“cancel\_maker” - Cancel the maker order.“cancel\_taker” - Cancel the taker order.“cancel\_both” - Cancel both sides. |
| recvWindow | LONG | NO | Max 60000 |
| timestamp | LONG | YES |  |

Response:

| Name | Description |
| --- | --- |
| symbol | Symbol |
| orderId | order id |
| orderListId | order list id |
| price | Price |
| origQty | Original order quantity |
| type | [Order type](#order_type "Order type") |
| side | [order side](#order_side "order side") |
| stpMode | “” - Default value, no restriction on self-trading.“cancel\_maker” - Cancel the maker order.“cancel\_taker” - Cancel the taker order.“cancel\_both” - Cancel both sides. |
| transactTime | transactTime |

Additional mandatory parameters based on `type`:

| Type | Additional mandatory parameters |
| --- | --- |
| `LIMIT` | `quantity`, `price` |
| `MARKET` | `quantity` or `quoteOrderQty` |

Other info:

1.  The default value of stpMode is "", meaning no self-trade prevention check.
2.  Conditions for self-trade prevention to take effect:

-   At least one strategy group must be created;
-   The stpMode parameter must not be empty;

3.  For other self-trade issues, please refer to: [Introduction to Self-Trade Prevention](https://www.mexc.com/zh-MY/announcements/article/introduction-to-self-trade-prevention-stp-17827791526132 "Introduction to Self-Trade Prevention");
4.  When stpMode = "", self-trading is not restricted.

MARKET: When type is market, `quoteOrderQty` or `quantity` required to choose anyone.

-   `MARKET` orders using the `quantity` field specifies the amount of the `base asset` the user wants to sell at the market price
    -   For example, sending a `MARKET` order on BTCUSDT will specify how much BTC the user is selling.
-   `MARKET` orders using `quoteOrderQty` specifies the amount the user wants to spend (when buying) the `quote` asset; the correct `quantity` will be determined based on the market liquidity
    -   Using BTCUSDT as an example:
        -   On the `BUY` side, the order will buy as many BTC as `quoteOrderQty` USDT can.
        -   On the `SELL` side, the order will sell the `quantity` of BTC.
