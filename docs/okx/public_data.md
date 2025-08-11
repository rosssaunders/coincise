# OKX API Documentation - Public Data

### Get instruments [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments")

Retrieve a list of instruments with open contracts for OKX. Retrieve available
instruments info of current account, please refer to
[Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments).

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument Type

#### HTTP Request

`GET /api/v5/public/instruments`

#### Request Parameters

| Parameter  | Type   | Required    | Description                                                                                                                                                                              |
| ---------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType   | String | Yes         | Instrument type<br><code>SPOT</code>: Spot<br><code>MARGIN</code>: Margin<br><code>SWAP</code>: Perpetual Futures<br><code>FUTURES</code>: Expiry Futures<br><code>OPTION</code>: Option |
| instFamily | String | Conditional | Instrument family<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>. If instType is <code>OPTION</code>, <code>instFamily</code> is required.             |
| instId     | String | No          | Instrument ID                                                                                                                                                                            |

#### Response Parameters

| **Parameter**     | **Type**         | **Description**                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType          | String           | Instrument type                                                                                                                                                                                                                                                                                                                                                                             |
| instId            | String           | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                                                                                                                                                                                                                                                                                               |
| uly               | String           | Underlying, e.g. <code>BTC-USD</code><br>Only applicable to <code>MARGIN/FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                               |
| instFamily        | String           | Instrument family, e.g. <code>BTC-USD</code><br>Only applicable to <code>MARGIN/FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                        |
| category          | String           | Currency category. Note: this parameter is already deprecated                                                                                                                                                                                                                                                                                                                               |
| baseCcy           | String           | Base currency, e.g. <code>BTC</code> in<code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>                                                                                                                                                                                                                                                                    |
| quoteCcy          | String           | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>                                                                                                                                                                                                                                                                 |
| settleCcy         | String           | Settlement and margin currency, e.g. <code>BTC</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                      |
| ctVal             | String           | Contract value<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                                                             |
| ctMult            | String           | Contract multiplier<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                                                        |
| ctValCcy          | String           | Contract value currency<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                                                    |
| optType           | String           | Option type, <code>C</code>: Call <code>P</code>: put<br>Only applicable to <code>OPTION</code>                                                                                                                                                                                                                                                                                             |
| stk               | String           | Strike price<br>Only applicable to <code>OPTION</code>                                                                                                                                                                                                                                                                                                                                      |
| listTime          | String           | Listing time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                        |
| auctionEndTime    | String           | <del>The end time of call auction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>Only applicable to <code>SPOT</code> that are listed through call auctions, return "" in other cases (deprecated, use contTdSwTime)</del>                                                                                                                                      |
| contTdSwTime      | String           | Continuous trading switch time. The switch time from call auction, prequote to continuous trading, Unix timestamp format in milliseconds. e.g. <code>1597026383085</code>.<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code> that are listed through call auction or prequote, return "" in other cases.                                                                          |
| openType          | String           | Open type<br><code>fix_price</code>: fix price opening<br><code>pre_quote</code>: pre-quote<br><code>call_auction</code>: call auction<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>, return "" for all other business lines                                                                                                                                                  |
| expTime           | String           | Expiry time<br>Applicable to <code>SPOT</code>/<code>MARGIN</code>/<code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>. For <code>FUTURES</code>/<code>OPTION</code>, it is natural delivery/exercise time. It is the instrument offline time when there is <code>SPOT/MARGIN/FUTURES/SWAP/</code> manual offline. Update once change.                                               |
| lever             | String           | Max Leverage,<br>Not applicable to <code>SPOT</code>, <code>OPTION</code>                                                                                                                                                                                                                                                                                                                   |
| tickSz            | String           | Tick size, e.g. <code>0.0001</code><br>For Option, it is minimum tickSz among tick band, please use "Get option tick bands" if you want get option tickBands.                                                                                                                                                                                                                               |
| lotSz             | String           | Lot size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                                                                                              |
| minSz             | String           | Minimum order size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                                                                                    |
| ctType            | String           | Contract type<br><code>linear</code>: linear contract<br><code>inverse</code>: inverse contract<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>                                                                                                                                                                                                                                |
| alias             | String           | Alias<br><code>this_week</code><br><code>next_week</code><br><code>this_month</code><br><code>next_month</code><br><code>quarter</code><br><code>next_quarter</code><br><code>third_quarter</code><br>Only applicable to <code>FUTURES</code><br><strong>Not recommended for use, users are encouraged to rely on the expTime field to determine the delivery time of the contract</strong> |
| state             | String           | Instrument status<br><code>live</code><br><code>suspend</code><br><code>preopen</code>. e.g. There will be <code>preopen</code> before the Futures and Options new contracts state is live.<br><code>test</code>: Test pairs, can’t be traded                                                                                                                                               |
| ruleType          | String           | Trading rule types<br><code>normal</code>: normal trading<br><code>pre_market</code>: pre-market trading                                                                                                                                                                                                                                                                                    |
| maxLmtSz          | String           | The maximum order quantity of a single limit order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                                                   |
| maxMktSz          | String           | The maximum order quantity of a single market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>.                                                                                                                                                           |
| maxLmtAmt         | String           | Max USD amount for a single limit order                                                                                                                                                                                                                                                                                                                                                     |
| maxMktAmt         | String           | Max USD amount for a single market order<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code>                                                                                                                                                                                                                                                                                        |
| maxTwapSz         | String           | The maximum order quantity of a single TWAP order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.<br>The minimum order quantity of a single TWAP order is minSz\*2                                                                                   |
| maxIcebergSz      | String           | The maximum order quantity of a single iceBerg order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                                                 |
| maxTriggerSz      | String           | The maximum order quantity of a single trigger order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.                                                                                                                                                 |
| maxStopSz         | String           | The maximum order quantity of a single stop market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>.                                                                                                                                                      |
| futureSettlement  | Boolean          | Whether daily settlement for expiry feature is enabled<br>Applicable to <code>FUTURES</code> <code>cross</code>                                                                                                                                                                                                                                                                             |
| tradeQuoteCcyList | Array of strings | List of quote currencies available for trading, e.g. ["USD", "USDC”].                                                                                                                                                                                                                                                                                                                       |
| instIdCode        | Integer          | Instrument ID code.<br>For simple binary encoding, you must use <code>instIdCode</code> instead of <code>instId</code>.<br>For the same <code>instId</code>, it's value may be different between production and demo trading.                                                                                                                                                               |

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

---

### Get estimated delivery/exercise price [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price")

Retrieve the estimated delivery price which will only have a return value one
hour before the delivery/exercise.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-price`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-200214</code><br>only applicable to <code>FUTURES</code>/<code>OPTION</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type<br><code>FUTURES</code><br><code>OPTION</code>                           |
| instId        | String   | Instrument ID, e.g. <code>BTC-USD-200214</code>                                          |
| settlePx      | String   | Estimated delivery/exercise price                                                        |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get delivery/exercise history [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history")

Retrieve delivery records of Futures and exercise records of Options in the last
3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Type + instFamily)

#### HTTP Request

`GET /api/v5/public/delivery-exercise-history`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                     |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| instType   | String | Yes      | Instrument type<br><code>FUTURES</code><br><code>OPTION</code>                                  |
| instFamily | String | Yes      | Instrument family, only applicable to <code>FUTURES</code>/<code>OPTION</code>                  |
| after      | String | No       | Pagination of data to return records earlier than the requested <code>ts</code>                 |
| before     | String | No       | Pagination of data to return records newer than the requested <code>ts</code>                   |
| limit      | String | No       | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> |

#### Response Parameters

| Parameter  | Type             | Description                                                                                          |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| ts         | String           | Delivery/exercise time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>       |
| details    | Array of objects | Delivery/exercise details                                                                            |
| &gt; insId | String           | Delivery/exercise contract ID                                                                        |
| &gt; px    | String           | Delivery/exercise price                                                                              |
| &gt; type  | String           | Type<br><code>delivery</code><br><code>exercised</code><br><code>expired_otm</code>:Out of the money |

---

### Get estimated future settlement price [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-future-settlement-price "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-estimated-future-settlement-price")

Retrieve the estimated settlement price which will only have a return value one
hour before the settlement.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-settlement-info`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                 |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>XRP-USDT-250307</code><br>only applicable to <code>FUTURES</code> |

#### Response Parameters

| **Parameter**  | **Type** | **Description**                                                                              |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| instId         | String   | Instrument ID, e.g. <code>XRP-USDT-250307</code>                                             |
| nextSettleTime | String   | Next settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| estSettlePx    | String   | Estimated settlement price                                                                   |
| ts             | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>     |

---

### Get futures settlement history [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-futures-settlement-history "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-futures-settlement-history")

Retrieve settlement records of futures in the last 3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Family)

#### HTTP Request

`GET /api/v5/public/settlement-history`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                     |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| instFamily | String | Yes      | Instrument family                                                                               |
| after      | String | No       | Pagination of data to return records earlier than (not include) the requested <code>ts</code>   |
| before     | String | No       | Pagination of data to return records newer than (not include) the requested <code>ts</code>     |
| limit      | String | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code> |

#### Response Parameters

| Parameter     | Type             | Description                                                                             |
| ------------- | ---------------- | --------------------------------------------------------------------------------------- |
| ts            | String           | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| details       | Array of objects | Settlement info                                                                         |
| &gt; instId   | String           | Instrument ID                                                                           |
| &gt; settlePx | String           | Settlement price                                                                        |

---

### Get funding rate [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate")

Retrieve funding rate.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-SWAP</code> or <code>ANY</code> to return the funding rate info of all swap symbols<br>only applicable to <code>SWAP</code> |

#### Response Parameters

| **Parameter**   | **Type** | **Description**                                                                                                                                                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType        | String   | Instrument type <code>SWAP</code>                                                                                                                                                                                               |
| instId          | String   | Instrument ID, e.g. <code>BTC-USD-SWAP</code> or <code>ANY</code>                                                                                                                                                               |
| method          | String   | Funding rate mechanism<br><code>current_period</code><del><br><code>next_period</code></del>(no longer supported)                                                                                                               |
| formulaType     | String   | Formula type<br><code>noRate</code>: old funding rate formula<br><code>withRate</code>: new funding rate formula                                                                                                                |
| fundingRate     | String   | Current funding rate                                                                                                                                                                                                            |
| nextFundingRate | String   | <del>Forecasted funding rate for the next period<br>The nextFundingRate will be "" if the method is <code>current_period</code></del>(no longer supported)                                                                      |
| fundingTime     | String   | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                         |
| nextFundingTime | String   | Forecasted funding time for the next period , Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                            |
| minFundingRate  | String   | The lower limit of the funding rate                                                                                                                                                                                             |
| maxFundingRate  | String   | The upper limit of the funding rate                                                                                                                                                                                             |
| interestRate    | String   | Interest rate                                                                                                                                                                                                                   |
| impactValue     | String   | Depth weighted amount (in the unit of quote currency)                                                                                                                                                                           |
| settState       | String   | Settlement state of funding rate<br><code>processing</code><br><code>settled</code>                                                                                                                                             |
| settFundingRate | String   | If settState = <code>processing</code>, it is the funding rate that is being used for current settlement cycle.<br>If settState = <code>settled</code>, it is the funding rate that is being used for previous settlement cycle |
| premium         | String   | Premium index<br>formula: [Max (0, Impact bid price – Index price) – Max (0, Index price – Impact ask price)] / Index price                                                                                                     |
| ts              | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                        |

For some altcoins perpetual swaps with significant fluctuations in funding
rates, OKX will closely monitor market changes. When necessary, the funding rate
collection frequency, currently set at 8 hours, may be adjusted to higher
frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should
focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields
to determine the funding fee interval of a contract.

---

### Get funding rate history [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history")

Retrieve funding rate history. This endpoint can return data up to three months.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                     |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-SWAP</code><br>only applicable to <code>SWAP</code>           |
| before    | String | No       | Pagination of data to return records newer than the requested <code>fundingTime</code>          |
| after     | String | No       | Pagination of data to return records earlier than the requested <code>fundingTime</code>        |
| limit     | String | No       | Number of results per request. The maximum is <code>400</code>; The default is <code>400</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                  |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type<br><code>SWAP</code>                                                                             |
| instId        | String   | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                    |
| formulaType   | String   | Formula type<br><code>noRate</code>: old funding rate formula<br><code>withRate</code>: new funding rate formula |
| fundingRate   | String   | Predicted funding rate                                                                                           |
| realizedRate  | String   | Actual funding rate                                                                                              |
| fundingTime   | String   | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                          |
| method        | String   | Funding rate mechanism<br><code>current_period</code><br><code>next_period</code>                                |

For some altcoins perpetual swaps with significant fluctuations in funding
rates, OKX will closely monitor market changes. When necessary, the funding rate
collection frequency, currently set at 8 hours, may be adjusted to higher
frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should
focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields
to determine the funding fee interval of a contract.

---

### Get open interest [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-open-interest")

Retrieve the total open interest for contracts on OKX.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/open-interest`

#### Request Parameters

| Parameter  | Type   | Required    | Description                                                                                                                                                  |
| ---------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instType   | String | Yes         | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                                                                          |
| instFamily | String | Conditional | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code><br>If instType is <code>OPTION</code>, instFamily is required. |
| instId     | String | No          | Instrument ID, e.g. <code>BTC-USDT-SWAP</code><br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                   |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type                                                                          |
| instId        | String   | Instrument ID                                                                            |
| oi            | String   | Open interest in number of contracts                                                     |
| oiCcy         | String   | Open interest in number of coin                                                          |
| oiUsd         | String   | Open interest in number of USD                                                           |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get limit price [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-limit-price")

Retrieve the highest buy limit and lowest sell limit of the instrument.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/price-limit`

#### Request Parameters

| Parameter | Type   | Required | Description                                    |
| --------- | ------ | -------- | ---------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USDT-SWAP</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                             |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type                                                                                                                             |
| instId        | String   | Instrument ID, e.g. <code>BTC-USDT-SWAP</code>                                                                                              |
| buyLmt        | String   | Highest buy limit<br>Return "" when enabled is false                                                                                        |
| sellLmt       | String   | Lowest sell limit<br>Return "" when enabled is false                                                                                        |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                    |
| enabled       | Boolean  | Whether price limit is effective<br><code>true</code>: the price limit is effective<br><code>false</code>: the price limit is not effective |

---

### Get option market data [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-market-data "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-option-market-data")

Retrieve option market data.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + instFamily

#### HTTP Request

`GET /api/v5/public/opt-summary`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                   |
| ---------- | ------ | -------- | ------------------------------------------------------------- |
| instFamily | String | Yes      | Instrument family, only applicable to <code>OPTION</code><br> |
| expTime    | String | No       | Contract expiry date, the format is "YYMMDD", e.g. "200527"   |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type<br><code>OPTION</code>                                                   |
| instId        | String   | Instrument ID, e.g. <code>BTC-USD-200103-5500-C</code>                                   |
| uly           | String   | Underlying                                                                               |
| delta         | String   | Sensitivity of option price to <code>uly</code> price                                    |
| gamma         | String   | The delta is sensitivity to <code>uly</code> price                                       |
| vega          | String   | Sensitivity of option price to implied volatility                                        |
| theta         | String   | Sensitivity of option price to remaining maturity                                        |
| deltaBS       | String   | Sensitivity of option price to <code>uly</code> price in BS mode                         |
| gammaBS       | String   | The delta is sensitivity to <code>uly</code> price in BS mode                            |
| vegaBS        | String   | Sensitivity of option price to implied volatility in BS mode                             |
| thetaBS       | String   | Sensitivity of option price to remaining maturity in BS mode                             |
| lever         | String   | Leverage                                                                                 |
| markVol       | String   | Mark volatility                                                                          |
| bidVol        | String   | Bid volatility                                                                           |
| askVol        | String   | Ask volatility                                                                           |
| realVol       | String   | Realized volatility (not currently used)                                                 |
| volLv         | String   | Implied volatility of at-the-money options                                               |
| fwdPx         | String   | Forward price                                                                            |
| ts            | String   | Data update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get discount rate and interest-free quota [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota")

Retrieve discount rate level and interest-free quota.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/discount-rate-interest-free-quota`

#### Request Parameters

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| ccy        | String | No       | Currency                                          |
| discountLv | String | No       | <del>Discount level (Deprecated)<del></del></del> |

#### Response Parameters

| **Parameter**       | **Type**         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy                 | String           | Currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| colRes              | String           | Platform level collateral restriction status<br><code>0</code>: The restriction is not enabled.<br><code>1</code>: The restriction is not enabled. But the crypto is close to the platform's collateral limit.<br><code>2</code>: The restriction is enabled. This crypto can't be used as margin for your new orders. This may result in failed orders. But it will still be included in the account's adjusted equity and doesn't impact margin ratio.<br>Refer to <a href="https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">Introduction to the platform collateralized borrowing limit</a> for more details. |
| collateralRestrict  | Boolean          | <del>Platform level collateralized borrow restriction<br><code>true</code><br><code>false</code></del>(deprecated, use colRes instead)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| amt                 | String           | Interest-free quota                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| discountLv          | String           | <del>Discount rate level.(Deprecated)<del></del></del>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| minDiscountRate     | String           | Minimum discount rate when it exceeds the maximum amount of the last tier.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| details             | Array of objects | New discount details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; discountRate   | String           | Discount rate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; maxAmt         | String           | Tier - upper bound.<br>The unit is the currency like BTC. "" means positive infinity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; minAmt         | String           | Tier - lower bound.<br>The unit is the currency like BTC. The minimum is 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; tier           | String           | Tiers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; liqPenaltyRate | String           | Liquidation penalty rate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; disCcyEq       | String           | Discount equity in currency for quick calculation if your equity is the<code>maxAmt</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

---

### Get system time [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-system-time")

Retrieve API server time.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/time`

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                     |
| ------------- | -------- | ----------------------------------------------------------------------------------- |
| ts            | String   | System time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get mark price [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price")

Retrieve mark price.

We set the mark price based on the SPOT index and at a reasonable basis to
prevent individual users from manipulating the market and causing the contract
price to fluctuate.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/mark-price`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                                |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| instType   | String | Yes      | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> |
| instFamily | String | No       | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>              |
| instId     | String | No       | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                              |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| instType      | String   | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> |
| instId        | String   | Instrument ID, e.g. <code>BTC-USD-200214</code>                                                            |
| markPx        | String   | Mark price                                                                                                 |
| ts            | String   | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                   |

---

### Get position tiers [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-position-tiers "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-position-tiers")

Retrieve position tiers information, maximum leverage depends on your borrowings
and Maintenance margin ratio.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/position-tiers`

#### Request Parameters

| Parameter  | Type   | Required    | Description                                                                                                                                                                                                                                              |
| ---------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType   | String | Yes         | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                                                                                                                                               |
| tdMode     | String | Yes         | Trade mode<br>Margin mode <code>cross</code> <code>isolated</code>                                                                                                                                                                                       |
| instFamily | String | Conditional | Single instrument familiy or multiple instrument families (no more than 5) separated with comma.<br>If instType is <code>SWAP/FUTURES/OPTION</code>, <code>instFamily</code> is required.                                                                |
| instId     | String | Conditional | Single instrument or multiple instruments (no more than 5) separated with comma.<br>Either instId or ccy is required, if both are passed, instId will be used, ignore when instType is one of <code>SWAP</code>,<code>FUTURES</code>,<code>OPTION</code> |
| ccy        | String | Conditional | Margin currency<br>Only applicable to cross MARGIN. It will return borrowing amount for <code>Multi-currency margin</code> and <code>Portfolio margin</code> when <code>ccy</code> takes effect.                                                         |
| tier       | String | No          | Tiers                                                                                                                                                                                                                                                    |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                                                                                                                        |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uly           | String   | Underlying<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                 |
| instFamily    | String   | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                          |
| instId        | String   | Instrument ID                                                                                                                                                                                                                          |
| tier          | String   | Tiers                                                                                                                                                                                                                                  |
| minSz         | String   | The minimum borrowing amount or position of this gear is only applicable to margin/options/perpetual/delivery, the minimum position is 0 by default<br>It will return the minimum borrowing amount when <code>ccy</code> takes effect. |
| maxSz         | String   | The maximum borrowing amount or number of positions held in this position is only applicable to margin/options/perpetual/delivery<br>It will return the maximum borrowing amount when <code>ccy</code> takes effect.                   |
| mmr           | String   | Position maintenance margin requirement rate                                                                                                                                                                                           |
| imr           | String   | Initial margin requirement rate                                                                                                                                                                                                        |
| maxLever      | String   | Maximum available leverage                                                                                                                                                                                                             |
| optMgnFactor  | String   | Option Margin Coefficient (only applicable to options)                                                                                                                                                                                 |
| quoteMaxLoan  | String   | Quote currency borrowing amount (only applicable to leverage and the case when <code>instId</code> takes effect)                                                                                                                       |
| baseMaxLoan   | String   | Base currency borrowing amount (only applicable to leverage and the case when <code>instId</code> takes effect)                                                                                                                        |

---

### Get interest rate and loan quota [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota")

Retrieve interest rate

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/interest-rate-loan-quota`

#### Response Parameters

| Parameter          | Type             | Description                                                                   |
| ------------------ | ---------------- | ----------------------------------------------------------------------------- |
| basic              | Array of objects | Basic interest rate                                                           |
| &gt; ccy           | String           | Currency                                                                      |
| &gt; rate          | String           | Daily rate                                                                    |
| &gt; quota         | String           | Max borrow                                                                    |
| vip                | Array of objects | Interest info for vip users                                                   |
| &gt; level         | String           | VIP Level, e.g. <code>VIP1</code>                                             |
| &gt; loanQuotaCoef | String           | Loan quota coefficient. Loan quota = <code>quota</code> \* <code>level</code> |
| &gt; irDiscount    | String           | <del>Interest rate discount</del>(Deprecated)                                 |
| regular            | Array of objects | Interest info for regular users                                               |
| &gt; level         | String           | Regular user Level, e.g. <code>Lv1</code>                                     |
| &gt; loanQuotaCoef | String           | Loan quota coefficient. Loan quota = <code>quota</code> \* <code>level</code> |
| &gt; irDiscount    | String           | <del>Interest rate discount</del>(Deprecated)                                 |

---

### Get underlying [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-underlying "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-underlying")

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/underlying`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| instType  | String | Yes      | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| ------------- | -------- | --------------- |
| uly           | Array    | Underlying      |

---

### Get insurance fund [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-insurance-fund "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-insurance-fund")

Get insurance fund balance information

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/insurance-fund`

#### Request Parameters

| Parameter  | Type   | Required    | Description                                                                                                                                                                                                                       |
| ---------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instType   | String | Yes         | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                                                                                                                        |
| type       | String | No          | Type<br><code>regular_update</code><br><code>liquidation_balance_deposit</code><br><code>bankruptcy_loss</code><br><code>platform_revenue</code><br><code>adl</code>: ADL historical data<br>The default is <code>all type</code> |
| instFamily | String | Conditional | Instrument family<br>Required for <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                      |
| ccy        | String | Conditional | Currency, only applicable to <code>MARGIN</code>                                                                                                                                                                                  |
| before     | String | No          | Pagination of data to return records newer than the requested <code>ts</code>                                                                                                                                                     |
| after      | String | No          | Pagination of data to return records earlier than the requested <code>ts</code>                                                                                                                                                   |
| limit      | String | No          | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code>                                                                                                                                   |

#### Response Parameters

| Parameter     | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| total         | String           | The total balance of insurance fund, in <code>USD</code>                                                                                                                                                                                                                                                                                                                                                                   |
| instFamily    | String           | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>                                                                                                                                                                                                                                                                                                                              |
| instType      | String           | Instrument type                                                                                                                                                                                                                                                                                                                                                                                                            |
| details       | Array of objects | Insurance fund data                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; balance  | String           | The balance of insurance fund                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; amt      | String           | The change in the balance of insurance fund<br>Applicable when type is <code>liquidation_balance_deposit</code>, <code>bankruptcy_loss</code> or <code>platform_revenue</code>                                                                                                                                                                                                                                             |
| &gt; ccy      | String           | The currency of insurance fund                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; type     | String           | The type of insurance fund                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; maxBal   | String           | Maximum insurance fund balance in the past eight hours<br>Only applicable when type is <code>adl</code>                                                                                                                                                                                                                                                                                                                    |
| &gt; maxBalTs | String           | Timestamp when insurance fund balance reached maximum in the past eight hours, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>Only applicable when type is <code>adl</code>                                                                                                                                                                                                                     |
| &gt; decRate  | String           | <del>Real-time insurance fund decline rate (compare balance and maxBal)<br>Only applicable when type is <code>adl</code></del>(Deprecated)                                                                                                                                                                                                                                                                                 |
| &gt; adlType  | String           | ADL related events<br><code>rate_adl_start</code>: ADL begins due to high insurance fund decline rate<br><code>bal_adl_start</code>: ADL begins due to insurance fund balance falling<br><code>pos_adl_start</code>：ADL begins due to the volume of liquidation orders falls to a certain level (only applicable to premarket symbols)<br><code>adl_end</code>: ADL ends<br>Only applicable when type is <code>adl</code> |
| &gt; ts       | String           | The update timestamp of insurance fund. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                             |

The enumeration value \`regular_update\` of type field is used to present
up-to-minute insurance fund change. The amt field will be used to present the
difference of insurance fund balance when the type field is
\`liquidation_balance_deposit\`, \`bankruptcy_loss\` or \`platform_revenue\`,
which is generated once per day around 08:00 am (UTC). When type is
\`regular_update\`, the amt field will be returned as "".

---

### Get mark price candlesticks [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks")

Retrieve the candlestick charts of mark price. This endpoint can retrieve the
latest 1,440 data entries. Charts are returned in groups based on the requested
bar.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/mark-price-candles`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                            |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                                                                                                          |
| after     | String | No       | Pagination of data to return records earlier than the requested <code>ts</code>                                                                                                                        |
| before    | String | No       | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually                                            |
| bar       | String | No       | Bar size, the default is <code>1m</code><br>e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8 opening price k-line: [6H/12H/1D/1W/1M/3M]<br>UTC+0 opening price k-line: [6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc] |
| limit     | String | No       | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code>                                                                                                        |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ts            | String   | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                         |
| o             | String   | Open price                                                                                                                      |
| h             | String   | highest price                                                                                                                   |
| l             | String   | Lowest price                                                                                                                    |
| c             | String   | Close price                                                                                                                     |
| confirm       | String   | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. |

The candlestick data may be incomplete, and should not be polled repeatedly.

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\]

---

### Get mark price candlesticks history [🔗](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history "Direct link to: https://www.okx.com/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history")

Retrieve the candlestick charts of mark price from recent years.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/history-mark-price-candles`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                   |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-SWAP</code>                                                                                                                                                 |
| after     | String | No       | Pagination of data to return records earlier than the requested <code>ts</code>                                                                                                               |
| before    | String | No       | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually                                   |
| bar       | String | No       | Bar size, the default is <code>1m</code><br>e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>UTC+8 opening price k-line: [6H/12H/1D/1W/1M]<br>UTC+0 opening price k-line: [6Hutc/12Hutc/1Dutc/1Wutc/1Mutc] |
| limit     | String | No       | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code>                                                                                               |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ts            | String   | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                         |
| o             | String   | Open price                                                                                                                      |
| h             | String   | highest price                                                                                                                   |
| l             | String   | Lowest price                                                                                                                    |
| c             | String   | Close price                                                                                                                     |
| confirm       | String   | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. |

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\]

---
