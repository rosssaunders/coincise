# GET /api/v5/public/instruments

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments)

### Get instruments

Retrieve a list of instruments with open contracts for OKX. Retrieve available
instruments info of current account, please refer to
[Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments).

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument Type

#### HTTP Request

`GET /api/v5/public/instruments`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | Yes      | Instrument type |

`SPOT`: Spot  
`MARGIN`: Margin  
`SWAP`: Perpetual Futures  
`FUTURES`: Expiry Futures  
`OPTION`: Option | | instFamily | String | Conditional | Instrument family  
Only applicable to `FUTURES`/`SWAP`/`OPTION`. If instType is `OPTION`,
`instFamily` is required. | | instId | String | No | Instrument ID |

#### Response Parameters

| **Parameter**                                                                                                             | **Type** | **Description**                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType                                                                                                                  | String   | Instrument type                                                                                                                                                 |
| instId                                                                                                                    | String   | Instrument ID, e.g. `BTC-USD-SWAP`                                                                                                                              |
| uly                                                                                                                       | String   | Underlying, e.g. `BTC-USD`                                                                                                                                      |
| Only applicable to `MARGIN/FUTURES`/`SWAP`/`OPTION`                                                                       |
| instFamily                                                                                                                | String   | Instrument family, e.g. `BTC-USD`                                                                                                                               |
| Only applicable to `MARGIN/FUTURES`/`SWAP`/`OPTION`                                                                       |
| category                                                                                                                  | String   | Currency category. Note: this parameter is already deprecated                                                                                                   |
| baseCcy                                                                                                                   | String   | Base currency, e.g. `BTC` in`BTC-USDT`                                                                                                                          |
| Only applicable to `SPOT`/`MARGIN`                                                                                        |
| quoteCcy                                                                                                                  | String   | Quote currency, e.g. `USDT` in `BTC-USDT`                                                                                                                       |
| Only applicable to `SPOT`/`MARGIN`                                                                                        |
| settleCcy                                                                                                                 | String   | Settlement and margin currency, e.g. `BTC`                                                                                                                      |
| Only applicable to `FUTURES`/`SWAP`/`OPTION`                                                                              |
| ctVal                                                                                                                     | String   | Contract value                                                                                                                                                  |
| Only applicable to `FUTURES`/`SWAP`/`OPTION`                                                                              |
| ctMult                                                                                                                    | String   | Contract multiplier                                                                                                                                             |
| Only applicable to `FUTURES`/`SWAP`/`OPTION`                                                                              |
| ctValCcy                                                                                                                  | String   | Contract value currency                                                                                                                                         |
| Only applicable to `FUTURES`/`SWAP`/`OPTION`                                                                              |
| optType                                                                                                                   | String   | Option type, `C`: Call `P`: put                                                                                                                                 |
| Only applicable to `OPTION`                                                                                               |
| stk                                                                                                                       | String   | Strike price                                                                                                                                                    |
| Only applicable to `OPTION`                                                                                               |
| listTime                                                                                                                  | String   | Listing time, Unix timestamp format in milliseconds, e.g. `1597026383085`                                                                                       |
| auctionEndTime                                                                                                            | String   | ~The end time of call auction, Unix timestamp format in milliseconds, e.g. `1597026383085`                                                                      |
| Only applicable to `SPOT` that are listed through call auctions, return "" in other cases (deprecated, use contTdSwTime)~ |
| contTdSwTime                                                                                                              | String   | Continuous trading switch time. The switch time from call auction, prequote to continuous trading, Unix timestamp format in milliseconds. e.g. `1597026383085`. |
| Only applicable to `SPOT`/`MARGIN` that are listed through call auction or prequote, return "" in other cases.            |
| preMktSwTime                                                                                                              | String   | The time premarket swap switched to normal swap, Unix timestamp format in milliseconds, e.g. `1597026383085`.                                                   |
| Only applicable premarket `SWAP`                                                                                          |
| openType                                                                                                                  | String   | Open type                                                                                                                                                       |

`fix_price`: fix price opening  
`pre_quote`: pre-quote  
`call_auction`: call auction  
Only applicable to `SPOT`/`MARGIN`, return "" for all other business lines | |
expTime | String | Expiry time  
Applicable to `SPOT`/`MARGIN`/`FUTURES`/`SWAP`/`OPTION`. For `FUTURES`/`OPTION`,
it is natural delivery/exercise time. It is the instrument offline time when
there is `SPOT/MARGIN/FUTURES/SWAP/` manual offline. Update once change. | |
lever | String | Max Leverage,  
Not applicable to `SPOT`, `OPTION` | | tickSz | String | Tick size, e.g.
`0.0001`  
For Option, it is minimum tickSz among tick band, please use "Get option tick
bands" if you want get option tickBands. | | lotSz | String | Lot size  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`. | |
minSz | String | Minimum order size  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`. | |
ctType | String | Contract type  
`linear`: linear contract  
`inverse`: inverse contract  
Only applicable to `FUTURES`/`SWAP` | | alias | String | Alias  
`this_week`  
`next_week`  
`this_month`  
`next_month`  
`quarter`  
`next_quarter`  
`third_quarter`  
Only applicable to `FUTURES`  
**Not recommended for use, users are encouraged to rely on the expTime field to
determine the delivery time of the contract** | | state | String | Instrument
status  
`live`  
`suspend`  
`preopen`. e.g. There will be `preopen` before the Futures and Options new
contracts state is live.  
`test`: Test pairs, can’t be traded | | ruleType | String | Trading rule types  
`normal`: normal trading  
`pre_market`: pre-market trading | | maxLmtSz | String | The maximum order
quantity of a single limit order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`. | |
maxMktSz | String | The maximum order quantity of a single market order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `USDT`. | | maxLmtAmt |
String | Max USD amount for a single limit order | | maxMktAmt | String | Max
USD amount for a single market order  
Only applicable to `SPOT`/`MARGIN` | | maxTwapSz | String | The maximum order
quantity of a single TWAP order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`.  
The minimum order quantity of a single TWAP order is minSz\*2 | | maxIcebergSz |
String | The maximum order quantity of a single iceBerg order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`. | |
maxTriggerSz | String | The maximum order quantity of a single trigger order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `base currency`. | |
maxStopSz | String | The maximum order quantity of a single stop market order.  
If it is a derivatives contract, the value is the number of contracts.  
If it is `SPOT`/`MARGIN`, the value is the quantity in `USDT`. | |
futureSettlement | Boolean | Whether daily settlement for expiry feature is
enabled  
Applicable to `FUTURES` `cross` | | tradeQuoteCcyList | Array of strings | List
of quote currencies available for trading, e.g. \["USD", "USDC”\]. | |
instIdCode | Integer | Instrument ID code.  
For simple binary encoding, you must use `instIdCode` instead of `instId`.  
For the same `instId`, it's value may be different between production and demo
trading. |

When a new contract is going to be listed, the instrument data of the new
contract will be available with status preopen. When a product is going to be
delisted (e.g. when a FUTURES contract is settled or OPTION contract is
exercised), the instrument will not be available

listTime and contTdSwTime  
For spot symbols listed through a call auction or pre-open, listTime represents
the start time of the auction or pre-open, and contTdSwTime indicates the end of
the auction or pre-open and the start of continuous trading. For other
scenarios, listTime will mark the beginning of continuous trading, and
contTdSwTime will return an empty value "".

state  
The state will always change from \`preopen\` to \`live\` when the listTime is
reached.  
When a product is going to be delisted (e.g. when a FUTURES contract is settled
or OPTION contract is exercised), the instrument will not be available.

Instruments REST endpoints and WebSocket channel will update \`expTime\` once
the delisting announcement is published.  
Instruments REST endpoint and WebSocket channel will update \`listTime\` once
the listing announcement is published:  
1\. For \`SPOT/MARGIN/SWAP\`, this event is only applicable to \`instType\`,
\`instId\`, \`listTime\`, \`state\`.  
2\. For \`FUTURES\`, this event is only applicable to \`instType\`,
\`instFamily\`, \`listTime\`, \`state\`.  
3\. Other fields will be "" temporarily, but they will be updated at least 5
minutes in advance of the \`listTime\`, then the WebSocket subscription using
related \`instId\`/\`instFamily\` can be available.
