# GET Get Current Position (KEYED)

**Source:** [Get Current Position (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Current Position (KEYED)

`Applicable for checking the position details a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/position`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/position?symbol=BTCUSDT`

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
      "leverage": "5",
      "timestamp": 1663814313531,
      "current_fee": "5.00409471",
      "open_timestamp": 1662714817820,
      "current_value": "16680.3157",
      "mark_value": "16673.27053207877",
      "mark_price": "93000.50",
      "position_value": "18584.272343943943943944339",
      "position_cross": "3798.397624451826977945",
      "maintenance_margin": "4798.397624451826977945",
      "margin_type": "Isolated",
      "position_mode": "hedge_mode",
      "close_vol": "100",
      "close_avg_price": "20700.7",
      "open_avg_price": "20200",
      "entry_price": "20201",
      "current_amount": "899",
      "unrealized_value": "1903.956643943943943944339",
      "realized_value": "55.049173071454605573",
      "position_type": 2,
      "account": "futures"
    }
  ],
  "trace": "ae96cae5-1f09-4ea5-971e-4474a6724bc8"
}
```

| Field | Type | Description |
| --- | --- | --- |
| leverage | String | Leverage multiplier |
| symbol | String | Symbol of the contract |
| current\_fee | String | Current position fees |
| open\_timestamp | Long | Opening timestamp |
| current\_value | String | Position value based on last price |
| mark\_value | String | Position value based on mark price |
| mark\_price | String | mark price |
| position\_value | String | Position value based on entry price |
| open\_avg\_price | String | Open average price |
| close\_avg\_price | String | Close average price |
| entry\_price | String | Average entry price of the position |
| close\_vol | String | Close volume |
| position\_cross | String | Margin calls to positions |
| maintenance\_margin | String | Maintenance Margin |
| margin\_type | String | Margin type of the position  
\-`Cross`  
\-`Isolated` |
| position\_mode | String | Position mode  
\-`hedge_mode`  
\-`one_way_mode` |
| current\_amount | String | Current position amount |
| unrealized\_value | String | Unrealized PnL |
| realized\_value | String | Realized PnL |
| position\_type | Int | position type  
\-`1`\=long  
\-`2`\=short |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| timestamp | Long | Current timestamp(ms) |