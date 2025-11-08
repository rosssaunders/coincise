# GET / Lead position history

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)

### GET / Lead position history

Retrieve the completed lead position of the last 3 months.  
Returns reverse chronological order with `subPosId`.

#### Rate limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/copytrading/subpositions-history`

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
| limit | String | No | Number of results per request. Maximum is 100. Default is 100. |

#### Response parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. BTC-USDT-SWAP |
| subPosId | String | Lead position ID |
| posSide | String | Position side  
`long`  
`short`  
`net`  
(long position has positive subPos; short position has negative subPos) |
| mgnMode | String | Margin mode. `cross` `isolated` |
| lever | String | Leverage |
| openOrdId | String | Order ID for opening position, only applicable to lead position |
| openAvgPx | String | Average open price |
| openTime | String | Time of opening |
| subPos | String | Quantity of positions |
| closeTime | String | Time of closing position |
| closeAvgPx | String | Average price of closing position |
| pnl | String | Profit and loss |
| pnlRatio | String | P&L ratio |
| instType | String | Instrument type |
| margin | String | Margin |
| ccy | String | Currency |
| markPx | String | Latest mark price, only applicable to contract |
| uniqueCode | String | Lead trader unique code |
| profitSharingAmt | String | Profit sharing amount, only applicable to copy trading. Note: this parameter is already deprecated. |
| closeSubPos | String | Quantity of positions that is already closed |
| type | String | The type of closing position  
`1`：Close position partially;  
`2`：Close all |
