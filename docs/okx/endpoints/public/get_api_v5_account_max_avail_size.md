# GET /api/v5/account/max-avail-size

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)

### Get maximum available balance/equity

Available balance for isolated margin positions and SPOT, available equity for
cross margin positions.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/max-avail-size`

#### Request Parameters

| **Parameter**                                                             | **Type** | Required    | Description                                                                                               |
| ------------------------------------------------------------------------- | -------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| instId                                                                    | String   | Yes         | Single instrument or multiple instruments (no more than 5) separated with comma, e.g. `BTC-USDT,ETH-USDT` |
| ccy                                                                       | String   | Conditional | Currency used for margin                                                                                  |
| Applicable to `isolated` `MARGIN` and `cross` `MARGIN` in `Futures mode`. |
| tdMode                                                                    | String   | Yes         | Trade mode                                                                                                |

`cross`  
`isolated`  
`cash`  
`spot_isolated`: only applicable to `Futures mode` | | reduceOnly | Boolean | No
| Whether to reduce position only  
Only applicable to `MARGIN` | | px | String | No | The price of closing
position.  
Only applicable to reduceOnly `MARGIN`. | | tradeQuoteCcy | String | No | The
quote currency used for trading. Only applicable to `SPOT`.  
The default value is the quote currency of the `instId`, for example: for
`BTC-USD`, the default is `USD`. |

#### Response Parameters

| **Parameter** | **Type** | **Description**                          |
| ------------- | -------- | ---------------------------------------- |
| instId        | String   | Instrument ID                            |
| availBuy      | String   | Maximum available balance/equity to buy  |
| availSell     | String   | Maximum available balance/equity to sell |

In the case of SPOT/MARGIN, availBuy is in the quote currency, and availSell is
in the base currency.  
In the case of MARGIN with cross tdMode, both availBuy and availSell are in the
currency passed in **ccy**.
