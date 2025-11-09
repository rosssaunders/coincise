# GET positions history

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-positions-history](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-positions-history)

### Get positions history

Retrieve the updated position data for the last 3 months. Return in reverse
chronological order using utime. Getting positions history is supported under
Portfolio margin mode since **04:00 AM (UTC) on November 11, 2024**.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/positions-history`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` | | instId | String | No | Instrument ID, e.g. `BTC-USD-SWAP` | |
mgnMode | String | No | Margin mode  
`cross` `isolated` | | type | String | No | The type of latest close position  
`1`: Close position partially;`2`：Close all;`3`：Liquidation;`4`：Partial
liquidation; `5`：ADL - position not fully closed; `6`：ADL - position fully
closed  
It is the latest type if there are several types for the same position. | |
posId | String | No | Position ID. There is attribute expiration. The posId will
be expired if it is more than 30 days after the last full close position, then
position will use new posId. | | after | String | No | Pagination of data to
return records earlier than the requested `uTime`, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | before | String | No | Pagination of data
to return records newer than the requested `uTime`, Unix timestamp format in
milliseconds, e.g. `1597026383085` | | limit | String | No | Number of results
per request. The maximum is 100. The default is 100. All records that have the
same `uTime` will be returned at the current request |

#### Response Parameters

| Parameter          | Type   | Description                       |
| ------------------ | ------ | --------------------------------- |
| instType           | String | Instrument type                   |
| instId             | String | Instrument ID                     |
| mgnMode            | String | Margin mode                       |
| `cross` `isolated` |
| type               | String | The type of latest close position |

`1`：Close position partially;`2`：Close all;`3`：Liquidation;`4`：Partial
liquidation; `5`：ADL;  
It is the latest type if there are several types for the same position. | |
cTime | String | Created time of position | | uTime | String | Updated time of
position | | openAvgPx | String | Average price of opening position  
Under cross-margin mode, the entry price of expiry futures will update at
settlement to the last settlement price, and when the position is opened or
increased. | | nonSettleAvgPx | String | Non-settlement entry price  
The non-settlement entry price only reflects the average price at which the
position is opened or increased.  
Only applicable to `cross` `FUTURES` | | closeAvgPx | String | Average price of
closing position | | posId | String | Position ID | | openMaxPos | String | Max
quantity of position | | closeTotalPos | String | Position's cumulative closed
volume | | realizedPnl | String | Realized profit and loss  
Only applicable to `FUTURES`/`SWAP`/`OPTION`  
`realizedPnl`\=`pnl`+`fee`+`fundingFee`+`liqPenalty`+`settledPnl` | | settledPnl
| String | Accumulated settled profit and loss (calculated by settlement
price)  
Only applicable to `cross` `FUTURES` | | pnlRatio | String | Realized P&L ratio
| | fee | String | Accumulated fee  
Negative number represents the user transaction fee charged by the
platform.Positive number represents rebate. | | fundingFee | String |
Accumulated funding fee | | liqPenalty | String | Accumulated liquidation
penalty. It is negative when there is a value. | | pnl | String | Profit and
loss (excluding the fee). | | posSide | String | Position mode side  
`long`: Hedge mode long  
`short`: Hedge mode short  
`net`: Net mode | | lever | String | Leverage | | direction | String |
Direction: `long` `short`  
Only applicable to `MARGIN/FUTURES/SWAP/OPTION` | | triggerPx | String | trigger
mark price. There is value when `type` is equal to `3`, `4` or `5`. It is ""
when `type` is equal to `1` or `2` | | uly | String | Underlying | | ccy |
String | Currency used for margin |
