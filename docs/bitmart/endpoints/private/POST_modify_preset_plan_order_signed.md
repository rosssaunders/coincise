# POST Modify Preset Plan Order (SIGNED)

**Source:**
[Modify Preset Plan Order (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Modify Preset Plan Order (SIGNED)

`Applicable for modifying contract preset plan orders`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/contract/private/modify-preset-plan-order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"ETHUSDT",   "order_id":"220609666322019",   "preset_take_profit_price":"2000",   "preset_stop_loss_price":"1900",   "preset_take_profit_price_type":1,   "preset_stop_loss_price_type":1 }' https://api-cloud-v2.bitmart.com/contract/private/modify-preset-plan-order`

| Field                         | Type   | Required? | Description                          |
| ----------------------------- | ------ | --------- | ------------------------------------ |
| order_id                      | String | Yes       | Order ID                             |
| symbol                        | String | Yes       | Symbol of the contract(like BTCUSDT) |
| preset_take_profit_price_type | Int    | No        | Pre-set TP price type                |

\-`1`\=last_price(default)  
\-`2`\=fair_price | | preset_stop_loss_price_type | Int | No | Pre-set SL price
type  
\-`1`\=last_price(default)  
\-`2`\=fair_price | | preset_take_profit_price | String | No | Pre-set TP price
| | preset_stop_loss_price | String | No | Pre-set SL price |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": {
    "order_id": "220609666322019"
  },
  "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988"
}
```

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| order_id | String | Order ID    |
