# GET Get Current Position Risk Details(KEYED)

**Source:** [Get Current Position Risk Details(KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Current Position Risk Details(KEYED)

`Applicable for checking the position risk details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position-risk`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position-risk?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) |
| account | String | No | Trading account  
\-`futures`  
\-`copy_trading` |

#### Response Data

> Response

```json
{
  "code": 1000,
  "message": "Ok",
  "data": [
    {
      "symbol": "BTCUSDT",
      "position_amt": "1",
      "mark_price": "67957.7",
      "unrealized_profit": "969.6",
      "liquidation_price": "64245",
      "leverage": "20",
      "max_notional_value": "3000000",
      "margin_type": "Isolated",
      "isolated_margin": "3078.51948691",
      "position_side": "Long",
      "notional": "66988.1",
      "update_time": 1712390438,
      "account": "futures"
    }
  ],
  "trace": "ae96cae5-1f09-4ea5-971e-4474a6724bc8"
}
```

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like BTCUSDT) |
| position\_amt | String | Position amount |
| mark\_price | String | Mark Price of the contract |
| unrealized\_profit | String | Unrealized profit of the position |
| liquidation\_price | String | LiquidationPrice of the position |
| leverage | String | Position leverage |
| max\_notional\_value | String | Maximum notional value for the current risk level |
| margin\_type | String | Margin type of the position  
\-`Cross`  
\-`Isolated` |
| isolated\_margin | String | Margin for the isolated position |
| position\_side | String | Position side  
\-`Long`  
\-`Short` |
| notional | String | notional = position\_amt\*mark\_Price |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| update\_time | Long | Unix timestamp in milliseconds for when the last updated time occurred |