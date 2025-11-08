# GET leverage estimated info

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-leverage-estimated-info](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-leverage-estimated-info)

### Get leverage estimated info

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/adjust-leverage-info`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type  
`MARGIN`  
`SWAP`  
`FUTURES` |
| mgnMode | String | Yes | Margin mode  
`isolated`  
`cross` |
| lever | String | Yes | Leverage |
| instId | String | Conditional | Instrument ID, e.g. BTC-USDT  
It is required for these scenarioes: `SWAP` and `FUTURES`, Margin isolation, Margin cross in `Futures mode`. |
| ccy | String | Conditional | Currency used for margin, e.g. BTC  
It is required for isolated margin and cross margin in `Futures mode`, `Multi-currency margin` and `Portfolio margin` |
| posSide | String | No | posSide  
`net`: The default value  
`long`  
`short` |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| estAvailQuoteTrans | String | The estimated margin(in quote currency) can be transferred out under the corresponding leverage  
For cross, it is the maximum quantity that can be transferred from the trading account.  
For isolated, it is the maximum quantity that can be transferred from the isolated position  
Only applicable to `MARGIN` |
| estAvailTrans | String | The estimated margin can be transferred out under the corresponding leverage.  
For cross, it is the maximum quantity that can be transferred from the trading account.  
For isolated, it is the maximum quantity that can be transferred from the isolated position  
The unit is base currency for `MARGIN`  
It is not applicable to the scenario when increasing leverage for isolated position under `FUTURES` and `SWAP` |
| estLiqPx | String | The estimated liquidation price under the corresponding leverage. Only return when there is a position. |
| estMgn | String | The estimated margin needed by position under the corresponding leverage.  
For the `MARGIN` position, it is margin in base currency |
| estQuoteMgn | String | The estimated margin (in quote currency) needed by position under the corresponding leverage |
| estMaxAmt | String | For `MARGIN`, it is the estimated maximum loan in base currency under the corresponding leverage  
For `SWAP` and `FUTURES`, it is the estimated maximum quantity of contracts that can be opened under the corresponding leverage |
| estQuoteMaxAmt | String | The `MARGIN` estimated maximum loan in quote currency under the corresponding leverage. |
| existOrd | Boolean | Whether there is pending orders  
`true`  
`false` |
| maxLever | String | Maximum leverage |
| minLever | String | Minimum leverage |
