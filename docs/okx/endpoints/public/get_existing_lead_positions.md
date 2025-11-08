# GET / Existing lead positions

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)

### GET / Existing lead positions

Retrieve lead positions that are not closed.  

Returns reverse chronological order with `openTime`

#### Rate limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/current-subpositions`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | No | Instrument type  
`SPOT`  
`SWAP`  
It returns all types by default. |
| instId | String | No | Instrument ID, e.g. BTC-USDT-SWAP |
| after | String | No | Pagination of data to return records earlier than the requested `subPosId`. |
| before | String | No | Pagination of data to return records newer than the requested `subPosId`. |
| limit | String | No | Number of results per request. Maximum is 500. Default is 500. |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. BTC-USDT-SWAP |
| subPosId | String | Lead position ID |
| posSide | String | Position side  
`long`  
`short`  
`net`  
(Long positions have positive subPos; short positions have negative subPos) |
| mgnMode | String | Margin mode. `cross` `isolated` |
| lever | String | Leverage |
| openOrdId | String | Order ID for opening position, only applicable to lead position |
| openAvgPx | String | Average open price |
| openTime | String | Open time |
| subPos | String | Quantity of positions |
| tpTriggerPx | String | Take-profit trigger price. |
| slTriggerPx | String | Stop-loss trigger price. |
| algoId | String | Stop order ID |
| instType | String | Instrument type |
| tpOrdPx | String | Take-profit order price, it is -1 for market price |
| slOrdPx | String | Stop-loss order price, it is -1 for market price |
| margin | String | Margin |
| upl | String | Unrealized profit and loss |
| uplRatio | String | Unrealized profit and loss ratio |
| markPx | String | Latest mark price, only applicable to contract |
| uniqueCode | String | Lead trader unique code |
| ccy | String | Margin currency |
| availSubPos | String | Quantity of positions that can be closed |
