# GET fee rates

Source: [https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-fee-rates](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-fee-rates)

### Get fee rates

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/trade-fee`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type  
`SPOT`  
`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` |
| instId | String | No | Instrument ID, e.g. `BTC-USDT`  
Applicable to `SPOT`/`MARGIN` |
| instFamily | String | No | Instrument family, e.g. `BTC-USD`  
Applicable to `FUTURES`/`SWAP`/`OPTION` |
| ruleType | String | No | Trading rule types  
`normal`: normal trading  
`pre_market`: pre-market trading  
ruleType can not be passed through together with instId/instFamily |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| level | String | Fee rate Level |
| taker | String | For `SPOT`/`MARGIN`, it is taker fee rate of the USDT trading pairs.  
For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts |
| maker | String | For `SPOT`/`MARGIN`, it is maker fee rate of the USDT trading pairs.  
For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts |
| takerU | String | Taker fee rate of USDT-margined contracts, only applicable to `FUTURES`/`SWAP` |
| makerU | String | Maker fee rate of USDT-margined contracts, only applicable to `FUTURES`/`SWAP` |
| delivery | String | Delivery fee rate |
| exercise | String | Fee rate for exercising the option |
| instType | String | Instrument type |
| takerUSDC | String | For `SPOT`/`MARGIN`, it is taker fee rate of the USDⓈ&Crypto trading pairs.  
For `FUTURES`/`SWAP`, it is the fee rate of USDC-margined contracts |
| makerUSDC | String | For `SPOT`/`MARGIN`, it is maker fee rate of the USDⓈ&Crypto trading pairs.  
For `FUTURES`/`SWAP`, it is the fee rate of USDC-margined contracts |
| ruleType | String | Trading rule types  
`normal`: normal trading  
`pre_market`: pre-market trading |
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| category | String | Currency category. Note: this parameter is already deprecated |
| fiat | Array of objects | Details of fiat fee rate |
| \> ccy | String | Fiat currency. |
| \> taker | String | Taker fee rate |
| \> maker | String | Maker fee rate |

Remarks:  
The fee rate like maker and taker: positive number, which means the rate of rebate; negative number, which means the rate of commission.

USDⓈ represent the stablecoin besides USDT

The Open API will not reflect zero-fee trading. For zero-fee pairs, please refer to [https://www.okx.com/fees](https://www.okx.com/fees) .
