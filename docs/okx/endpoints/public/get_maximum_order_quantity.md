# GET maximum order quantity

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity)

### Get maximum order quantity

The maximum quantity to buy or sell. It corresponds to the "sz" from placement.

Under the Portfolio Margin account, the calculation of the maximum buy/sell amount or open amount is not supported under the cross mode of derivatives.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/max-size`

#### Request Parameters

| **Parameter** | **Type** | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Single instrument or multiple instruments (no more than 5) in the same instrument type separated with comma, e.g. `BTC-USDT,ETH-USDT` |
| tdMode | String | Yes | Trade mode  
`cross`  
`isolated`  
`cash`  
`spot_isolated`: only applicable to `Futures mode`. |
| ccy | String | Conditional | Currency used for margin  
Applicable to `isolated` `MARGIN` and `cross` `MARGIN` orders in `Futures mode`. |
| px | String | No | Price  
When the price is not specified, it will be calculated according to the current limit price for `FUTURES` and `SWAP`, the last traded price for other instrument types.  
The parameter will be ignored when multiple instruments are specified. |
| leverage | String | No | Leverage for instrument  
The default is current leverage  
Only applicable to `MARGIN/FUTURES/SWAP` |
| tradeQuoteCcy | String | No | The quote currency used for trading. Only applicable to `SPOT`.  
The default value is the quote currency of the `instId`, for example: for `BTC-USD`, the default is `USD`. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID |
| ccy | String | Currency used for margin |
| maxBuy | String | `SPOT`/`MARGIN`: The maximum quantity in base currency that you can buy  
The cross-margin order under `Futures mode` mode, quantity of coins is based on base currency.  
`FUTURES`/`SWAP`/`OPTIONS`: The maximum quantity of contracts that you can buy |
| maxSell | String | `SPOT`/`MARGIN`: The maximum quantity in quote currency that you can sell  
The cross-margin order under `Futures mode` mode, quantity of coins is based on base currency.  
`FUTURES`/`SWAP`/`OPTIONS`: The maximum quantity of contracts that you can sell |
