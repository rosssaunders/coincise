# GET Get Margin Account Details(Isolated) (KEYED)

**Source:** [Get Margin Account Details(Isolated) (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Margin Account Details(Isolated) (KEYED)

`Applicable for isolated margin account inquiries`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/account`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/account?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BMX\_USDT), no symbol is passed, and all isolated margin assets are returned |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "risk_rate": "18.77",           "risk_level": "1",           "buy_enabled": true,           "sell_enabled": true,           "liquidate_price": "-0.09408905",           "liquidate_rate": "1.1",           "base": {             "currency": "BTC",             "borrow_enabled": false,             "borrowed": "2.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "112.89603334",             "frozen": "0.00000000",             "net_asset": "110.89603334",             "net_assetBTC": "0.00000000",             "total_asset": "112.89603334"           },           "quote": {             "currency": "USDT",             "borrow_enabled": true,             "borrowed": "0.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "10.00000000",             "frozen": "0.00000000",             "net_asset": "10.00000000",             "net_assetBTC": "0.00000000",             "total_asset": "10.00000000"           }         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair |
| risk\_rate | String | Current risk rate |
| risk\_level | String | Risk level |
| buy\_enabled | Boolean | Whether open to buy |
| sell\_enabled | Boolean | Whether open to sell |
| liquidate\_price | String | Liquidation price (precision: 8 decimal places) |
| liquidate\_rate | String | Liquidation rate |
| currency | String | Currency |
| borrow\_enabled | Boolean | Whether open to borrow |
| borrowed | String | Borrowed assets (precision: 8 decimal places) |
| borrow\_unpaid | String | Outstanding principal amount (precision: 8 decimal places) |
| interest\_unpaid | String | Interest outstanding (precision: 8 decimal places) |
| available | String | Available assets (precision: 8 decimal places) |
| frozen | String | Trading frozen assets (precision: 8 decimal places) |
| net\_asset | String | Net assets (precision: 8 decimal places) |
| net\_assetBTC | String | Converted BTC net assets (precision: 8 decimal places) |
| total\_asset | String | Total assets (precision: 8 decimal places) |