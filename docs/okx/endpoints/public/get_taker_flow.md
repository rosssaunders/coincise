# GET taker flow

Source: [https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-flow](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-taker-flow)

### Get taker flow

This shows the relative buy/sell volume for calls and puts. It shows whether traders are bullish or bearish on price and volatility.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/taker-block-volume`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | Yes | currency |
| period | String | No | period, the default is `8H`. e.g. \[`8H/1D`\]  
Each granularity can provide only one latest piece of data |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Timestamp |
| callBuyVol | String | call option buy volume, in settlement currency |
| callSellVol | String | call option sell volume, in settlement currency |
| putBuyVol | String | put option buy volume, in settlement currency |
| putSellVol | String | put option sell volume, in settlement currency |
| callBlockVol | String | call block volume |
| putBlockVol | String | put block volume |

The return value array order is: \[ts,callBuyVol,callSellVol,putBuyVol,putSellVol,callBlockVol,putBlockVol\]
