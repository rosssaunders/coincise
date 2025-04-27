# OKX API Documentation - Public Market Data REST API

### Get instruments

Retrieve a list of instruments with open contracts for OKX. Retrieve available instruments info of current account, please refer to [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments).

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument Type

#### HTTP Request

`GET /api/v5/public/instruments`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>SPOT</code>: Spot<br><code>MARGIN</code>: Margin<br><code>SWAP</code>: Perpetual Futures<br><code>FUTURES</code>: Expiry Futures<br><code>OPTION</code>: Option 
| uly | String | Conditional | Underlying<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>.If instType is <code>OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required. 
| instFamily | String | Conditional | Instrument family<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>. If instType is <code>OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required. 
| instId | String | No | Instrument ID 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type 
| instId | String | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 
| uly | String | Underlying, e.g. <code>BTC-USD</code><br>Only applicable to <code>MARGIN/FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instFamily | String | Instrument family, e.g. <code>BTC-USD</code><br>Only applicable to <code>MARGIN/FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| category | String | Currency category. Note: this parameter is already deprecated 
| baseCcy | String | Base currency, e.g. <code>BTC</code> in<code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code> 
| quoteCcy | String | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code><br>Only applicable to <code>SPOT</code>/<code>MARGIN</code> 
| settleCcy | String | Settlement and margin currency, e.g. <code>BTC</code><br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| ctVal | String | Contract value<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| ctMult | String | Contract multiplier<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| ctValCcy | String | Contract value currency<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| optType | String | Option type, <code>C</code>: Call <code>P</code>: put<br>Only applicable to <code>OPTION</code> 
| stk | String | Strike price<br>Only applicable to <code>OPTION</code> 
| listTime | String | Listing time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| auctionEndTime | String | The end time of call auction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>Only applicable to <code>SPOT</code> that are listed through call auctions, return "" in other cases 
| expTime | String | Expiry time<br>Applicable to <code>SPOT</code>/<code>MARGIN</code>/<code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>. For <code>FUTURES</code>/<code>OPTION</code>, it is natural delivery/exercise time. It is the instrument offline time when there is <code>SPOT/MARGIN/FUTURES/SWAP/</code> manual offline. Update once change. 
| lever | String | Max Leverage,<br>Not applicable to <code>SPOT</code>, <code>OPTION</code> 
| tickSz | String | Tick size, e.g. <code>0.0001</code><br>For Option, it is minimum tickSz among tick band, please use "Get option tick bands" if you want get option tickBands. 
| lotSz | String | Lot size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>. 
| minSz | String | Minimum order size<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>. 
| ctType | String | Contract type<br><code>linear</code>: linear contract<br><code>inverse</code>: inverse contract<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code> 
| alias | String | Alias<br><code>this_week</code><br><code>next_week</code><br><code>this_month</code><br><code>next_month</code><br><code>quarter</code><br><code>next_quarter</code><br><code>third_quarter</code><br>Only applicable to <code>FUTURES</code><br><strong>Not recommended for use, users are encouraged to rely on the expTime field to determine the delivery time of the contract</strong> 
| state | String | Instrument status<br><code>live</code><br><code>suspend</code><br><code>preopen</code>. e.g. There will be <code>preopen</code> before the Futures and Options new contracts state is live.<br><code>test</code>: Test pairs, can't be traded 
| ruleType | String | Trading rule types<br><code>normal</code>: normal trading<br><code>pre_market</code>: pre-market trading 
| maxLmtSz | String | The maximum order quantity of a single limit order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>. 
| maxMktSz | String | The maximum order quantity of a single market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>. 
| maxLmtAmt | String | Max USD amount for a single limit order 
| maxMktAmt | String | Max USD amount for a single market order<br>Only applicable to <code>SPOT</code>/<code>MARGIN</code> 
| maxTwapSz | String | The maximum order quantity of a single TWAP order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>.<br>The minimum order quantity of a single TWAP order is minSz*2 
| maxIcebergSz | String | The maximum order quantity of a single iceBerg order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>. 
| maxTriggerSz | String | The maximum order quantity of a single trigger order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>base currency</code>. 
| maxStopSz | String | The maximum order quantity of a single stop market order.<br>If it is a derivatives contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in <code>USDT</code>. 
| futureSettlement | Boolean | Whether daily settlement for expiry feature is enabled<br>Applicable to <code>FUTURES</code> <code>cross</code> 

When a new contract is going to be listed, the instrument data of the new contract will be available with status preopen. When a product is going to be delisted (e.g. when a FUTURES contract is settled or OPTION contract is exercised), the instrument will not be available listTime and auctionEndTime  
For spot symbols listed through a call auction, listTime represents the start time of the auction, and auctionEndTime indicates the end of the auction and the start of continuous trading. For other scenarios, listTime will mark the beginning of continuous trading, and auctionEndTime will return an empty value "".

state  
The state will always change from \`preopen\` to \`live\` when the listTime is reached.  
When a product is going to be delisted (e.g. when a FUTURES contract is settled or OPTION contract is exercised), the instrument will not be available.

---

### Get estimated delivery/exercise price

Retrieve the estimated delivery price which will only have a return value one hour before the delivery/exercise.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-price`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USD-200214</code><br>only applicable to <code>FUTURES</code>/<code>OPTION</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type<br><code>FUTURES</code><br><code>OPTION</code> 
| instId | String | Instrument ID, e.g. <code>BTC-USD-200214</code> 
| settlePx | String | Estimated delivery/exercise price 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get delivery/exercise history

Retrieve delivery records of Futures and exercise records of Options in the last 3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Type + Uly)

#### HTTP Request

`GET /api/v5/public/delivery-exercise-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>FUTURES</code><br><code>OPTION</code> 
| uly | String | Conditional | Underlying, only applicable to <code>FUTURES</code>/<code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| instFamily | String | Conditional | Instrument family, only applicable to <code>FUTURES</code>/<code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code> 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ts | String | Delivery/exercise time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| details | Array of objects | Delivery/exercise details 
| &gt; insId | String | Delivery/exercise contract ID 
| &gt; px | String | Delivery/exercise price 
| &gt; type | String | Type<br><code>delivery</code><br><code>exercised</code><br><code>expired_otm</code>:Out of the money

---

### Get estimated future settlement price

Retrieve the estimated settlement price which will only have a return value one hour before the settlement.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/estimated-settlement-info`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>XRP-USDT-250307</code><br>only applicable to <code>FUTURES</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. <code>XRP-USDT-250307</code> 
| nextSettleTime | String | Next settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| estSettlePx | String | Estimated settlement price 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get futures settlement history

Retrieve settlement records of futures in the last 3 months.

#### Rate Limit: 40 requests per 2 seconds

#### Rate limit rule: IP + (Instrument Family)

#### HTTP Request

`GET /api/v5/public/settlement-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instFamily | String | Yes | Instrument family 
| after | String | No | Pagination of data to return records earlier than (not include) the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than (not include) the requested <code>ts</code> 
| limit | String | No | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code> 

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ts | String | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| details | Array of objects | Settlement info 
| &gt; instId | String | Instrument ID 
| &gt; settlePx | String | Settlement price

---

### Get funding rate

Retrieve funding rate.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USD-SWAP</code><br>only applicable to <code>SWAP</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type <code>SWAP</code> 
| instId | String | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 
| method | String | Funding rate mechanism<br><code>current_period</code><del><br><code>next_period</code></del>(no longer supported) 
| formulaType | String | Formula type<br><code>noRate</code>: old funding rate formula<br><code>withRate</code>: new funding rate formula 
| fundingRate | String | Current funding rate 
| nextFundingRate | String | <del>Forecasted funding rate for the next period<br>The nextFundingRate will be "" if the method is <code>current_period</code></del>(no longer supported) 
| fundingTime | String | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| nextFundingTime | String | Forecasted funding time for the next period , Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| minFundingRate | String | The lower limit of the predicted funding rate of the next cycle 
| maxFundingRate | String | The upper limit of the predicted funding rate of the next cycle 
| interestRate | String | Interest rate 
| impactValue | String | Depth weighted amount (in the unit of quote currency) 
| settState | String | Settlement state of funding rate<br><code>processing</code><br><code>settled</code> 
| settFundingRate | String | If settState = <code>processing</code>, it is the funding rate that is being used for current settlement cycle.<br>If settState = <code>settled</code>, it is the funding rate that is being used for previous settlement cycle 
| premium | String | Premium between the mid price of perps market and the index price 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 

For some altcoins perpetual swaps with significant fluctuations in funding rates, OKX will closely monitor market changes. When necessary, the funding rate collection frequency, currently set at 8 hours, may be adjusted to higher frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields to determine the funding fee interval of a contract.

---

### Get funding rate history

Retrieve funding rate history. This endpoint can retrieve data from the last 3 months.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/funding-rate-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USD-SWAP</code><br>only applicable to <code>SWAP</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>fundingTime</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>fundingTime</code> 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type<br><code>SWAP</code> 
| instId | String | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 
| formulaType | String | Formula type<br><code>noRate</code>: old funding rate formula<br><code>withRate</code>: new funding rate formula 
| fundingRate | String | Predicted funding rate 
| realizedRate | String | Actual funding rate 
| fundingTime | String | Settlement time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| method | String | Funding rate mechanism<br><code>current_period</code><br><code>next_period</code> 

For some altcoins perpetual swaps with significant fluctuations in funding rates, OKX will closely monitor market changes. When necessary, the funding rate collection frequency, currently set at 8 hours, may be adjusted to higher frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should focus on the difference between \`fundingTime\` and \`nextFundingTime\` fields to determine the funding fee interval of a contract.

---

### Get open interest

Retrieve the total open interest for contracts on OKX.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/open-interest`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 
| uly | String | Conditional | Underlying<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>.<br>If instType is <code>OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required. 
| instFamily | String | Conditional | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code><br>If instType is <code>OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required. 
| instId | String | No | Instrument ID, e.g. <code>BTC-USDT-SWAP</code><br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type 
| instId | String | Instrument ID 
| oi | String | Open interest in number of contracts 
| oiCcy | String | Open interest in number of coin 
| oiUsd | String | Open interest in number of USD 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get limit price

Retrieve the highest buy limit and lowest sell limit of the instrument.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/price-limit`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USDT-SWAP</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type 
| instId | String | Instrument ID, e.g. <code>BTC-USDT-SWAP</code> 
| buyLmt | String | Highest buy limit<br>Return "" when enabled is false 
| sellLmt | String | Lowest sell limit<br>Return "" when enabled is false 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| enabled | Boolean | Whether price limit is effective<br><code>true</code>: the price limit is effective<br><code>false</code>: the price limit is not effective

---

### Get option market data

Retrieve option market data.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP +uly

#### HTTP Request

`GET /api/v5/public/opt-summary`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| uly | String | Conditional | Underlying, only applicable to <code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| instFamily | String | Conditional | Instrument family, only applicable to <code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| expTime | String | No | Contract expiry date, the format is "YYMMDD", e.g. "200527" 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type<br><code>OPTION</code> 
| instId | String | Instrument ID, e.g. <code>BTC-USD-200103-5500-C</code> 
| uly | String | Underlying 
| delta | String | Sensitivity of option price to <code>uly</code> price 
| gamma | String | The delta is sensitivity to <code>uly</code> price 
| vega | String | Sensitivity of option price to implied volatility 
| theta | String | Sensitivity of option price to remaining maturity 
| deltaBS | String | Sensitivity of option price to <code>uly</code> price in BS mode 
| gammaBS | String | The delta is sensitivity to <code>uly</code> price in BS mode 
| vegaBS | String | Sensitivity of option price to implied volatility in BS mode 
| thetaBS | String | Sensitivity of option price to remaining maturity in BS mode 
| lever | String | Leverage 
| markVol | String | Mark volatility 
| bidVol | String | Bid volatility 
| askVol | String | Ask volatility 
| realVol | String | Realized volatility (not currently used) 
| volLv | String | Implied volatility of at-the-money options 
| fwdPx | String | Forward price 
| ts | String | Data update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get discount rate and interest-free quota

Retrieve discount rate level and interest-free quota.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/discount-rate-interest-free-quota`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | No | Currency 
| discountLv | String | No | <del>Discount level (Deprecated)<del></del></del> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ccy | String | Currency 
| amt | String | Interest-free quota 
| discountLv | String | <del>Discount rate level.(Deprecated)<del></del></del> 
| minDiscountRate | String | Minimum discount rate when it exceeds the maximum amount of the last tier. 
| details | Array of objects | New discount details. 
| &gt; discountRate | String | Discount rate 
| &gt; maxAmt | String | Tier - upper bound.<br>The unit is the currency like BTC. "" means positive infinity 
| &gt; minAmt | String | Tier - lower bound.<br>The unit is the currency like BTC. The minimum is 0 
| &gt; tier | String | Tiers 
| &gt; liqPenaltyRate | String | Liquidation penalty rate 
| &gt; disCcyEq | String | Discount equity in currency for quick calculation if your equity is the<code>maxAmt</code>

---

### Get system time

Retrieve API server time.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/time`

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | System time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get mark price

Retrieve mark price.

We set the mark price based on the SPOT index and at a reasonable basis to prevent individual users from manipulating the market and causing the contract price to fluctuate.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP + Instrument ID

#### HTTP Request

`GET /api/v5/public/mark-price`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 
| uly | String | No | Underlying<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instFamily | String | No | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instId | String | No | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 
| instId | String | Instrument ID, e.g. <code>BTC-USD-200214</code> 
| markPx | String | Mark price 
| ts | String | Data return time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get position tiers

Retrieve position tiers information, maximum leverage depends on your borrowings and margin ratio.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/position-tiers`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 
| tdMode | String | Yes | Trade mode<br>Margin mode <code>cross</code> <code>isolated</code> 
| uly | String | Conditional | Single underlying or multiple underlyings (no more than 3) separated with comma.<br>If instType is <code>SWAP/FUTURES/OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required.<br>If both are passed, <code>instFamily</code> will be used. 
| instFamily | String | Conditional | Single instrument familiy or multiple instrument families (no more than 5) separated with comma.<br>If instType is <code>SWAP/FUTURES/OPTION</code>, either <code>uly</code> or <code>instFamily</code> is required.<br>If both are passed, <code>instFamily</code> will be used. 
| instId | String | Conditional | Single instrument or multiple instruments (no more than 5) separated with comma.<br>Either instId or ccy is required, if both are passed, instId will be used, ignore when instType is one of <code>SWAP</code>,<code>FUTURES</code>,<code>OPTION</code> 
| ccy | String | Conditional | Margin currency<br>Only applicable to cross MARGIN. It will return borrowing amount for <code>Multi-currency margin</code> and <code>Portfolio margin</code> when <code>ccy</code> takes effect. 
| tier | String | No | Tiers 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| uly | String | Underlying<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instFamily | String | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instId | String | Instrument ID 
| tier | String | Tiers 
| minSz | String | The minimum borrowing amount or position of this gear is only applicable to margin/options/perpetual/delivery, the minimum position is 0 by default<br>It will return the minimum borrowing amount when <code>ccy</code> takes effect. 
| maxSz | String | The maximum borrowing amount or number of positions held in this position is only applicable to margin/options/perpetual/delivery<br>It will return the maximum borrowing amount when <code>ccy</code> takes effect. 
| mmr | String | Maintenance margin requirement rate 
| imr | String | Initial margin requirement rate 
| maxLever | String | Maximum available leverage 
| optMgnFactor | String | Option Margin Coefficient (only applicable to options) 
| quoteMaxLoan | String | Quote currency borrowing amount (only applicable to leverage and the case when <code>instId</code> takes effect) 
| baseMaxLoan | String | Base currency borrowing amount (only applicable to leverage and the case when <code>instId</code> takes effect)

---

### Get interest rate and loan quota

Retrieve interest rate

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/interest-rate-loan-quota`

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| basic | Array of objects | Basic interest rate 
| &gt; ccy | String | Currency 
| &gt; rate | String | Daily rate 
| &gt; quota | String | Max borrow 
| vip | Array of objects | Interest info for vip users 
| &gt; level | String | VIP Level, e.g. <code>VIP1</code> 
| &gt; loanQuotaCoef | String | Loan quota coefficient. Loan quota = <code>quota</code> * <code>level</code> 
| &gt; irDiscount | String | <del>Interest rate discount</del>(Deprecated) 
| regular | Array of objects | Interest info for regular users 
| &gt; level | String | Regular user Level, e.g. <code>Lv1</code> 
| &gt; loanQuotaCoef | String | Loan quota coefficient. Loan quota = <code>quota</code> * <code>level</code> 
| &gt; irDiscount | String | <del>Interest rate discount</del>(Deprecated)

---

### Get underlying

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/underlying`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| uly | Array | Underlying

---

### Get insurance fund

Get insurance fund balance information

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/insurance-fund`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>MARGIN</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code> 
| type | String | No | Type<br><code>regular_update</code><br><code>liquidation_balance_deposit</code><br><code>bankruptcy_loss</code><br><code>platform_revenue</code><br><code>adl</code>: ADL historical data<br>The default is <code>all type</code> 
| uly | String | Conditional | Underlying<br>Required for <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| instFamily | String | Conditional | Instrument family<br>Required for <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code><br>Either <code>uly</code> or <code>instFamily</code> is required. If both are passed, <code>instFamily</code> will be used. 
| ccy | String | Conditional | Currency, only applicable to <code>MARGIN</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| total | String | The total balance of insurance fund, in <code>USD</code> 
| instFamily | String | Instrument family<br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| instType | String | Instrument type 
| details | Array of objects | Insurance fund data 
| &gt; balance | String | The balance of insurance fund 
| &gt; amt | String | The change in the balance of insurance fund<br>Applicable when type is <code>liquidation_balance_deposit</code>, <code>bankruptcy_loss</code> or <code>platform_revenue</code> 
| &gt; ccy | String | The currency of insurance fund 
| &gt; type | String | The type of insurance fund 
| &gt; maxBal | String | Maximum insurance fund balance in the past eight hours<br>Only applicable when type is <code>adl</code> 
| &gt; maxBalTs | String | Timestamp when insurance fund balance reached maximum in the past eight hours, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>Only applicable when type is <code>adl</code> 
| &gt; decRate | String | <del>Real-time insurance fund decline rate (compare balance and maxBal)<br>Only applicable when type is <code>adl</code></del>(Deprecated) 
| &gt; adlType | String | ADL related events<br><code>rate_adl_start</code>: ADL begins due to high insurance fund decline rate<br><code>bal_adl_start</code>: ADL begins due to insurance fund balance falling<br><code>pos_adl_start</code>：ADL begins due to the volume of liquidation orders falls to a certain level (only applicable to premarket symbols)<br><code>adl_end</code>: ADL ends<br>Only applicable when type is <code>adl</code> 
| &gt; ts | String | The update timestamp of insurance fund. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 

The enumeration value \`regular\_update\` of type field is used to present up-to-minute insurance fund change. The amt field will be used to present the difference of insurance fund balance when the type field is \`liquidation\_balance\_deposit\`, \`bankruptcy\_loss\` or \`platform\_revenue\`, which is generated once per day around 08:00 am (UTC). When type is \`regular\_update\`, the amt field will be returned as "".

---

### Unit convert

Convert the crypto value to the number of contracts, or vice versa

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/convert-contract-coin`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| type | String | No | Convert type<br><code>1</code>: Convert currency to contract<br><code>2</code>: Convert contract to currency<br>The default is <code>1</code> 
| instId | String | Yes | Instrument ID<br>only applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> 
| sz | String | Yes | Quantity to buy or sell<br>It is quantity of currency while converting currency to contract;<br>It is quantity of contract while converting contract to currency. 
| px | String | Conditional | Order price<br>For crypto-margined contracts, it is necessary while converting.<br>For USDT-margined contracts, it is necessary while converting between usdt and contract.<br>It is optional while converting between coin and contract.<br>For OPTION, it is optional. 
| unit | String | No | The unit of currency<br><code>coin</code><br><code>usds</code>: USDT/USDC<br>The default is <code>coin</code>, only applicable to USDⓈ-margined contracts from <code>FUTURES</code>/<code>SWAP</code> 
| opType | String | No | Order type<br><code>open</code>: round down sz when opening positions<br><code>close</code>: round sz to the nearest when closing positions<br>The default is <code>close</code><br>Applicable to <code>FUTURES</code> <code>SWAP</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| type | String | Convert type<br><code>1</code>: Convert currency to contract<br><code>2</code>: Convert contract to currency 
| instId | String | Instrument ID 
| px | String | Order price 
| sz | String | Quantity to buy or sell<br>It is quantity of contract while converting currency to contract<br>It is quantity of currency while contract to currency. 
| unit | String | The unit of currency<br><code>coin</code><br><code>usds</code>: USDT/USDC

---

### Get option tick bands

Get option tick bands information

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/instrument-tick-bands`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instType | String | Yes | Instrument type<br><code>OPTION</code> 
| instFamily | String | No | Instrument family<br>Only applicable to OPTION 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instType | String | Instrument type 
| instFamily | String | Instrument family 
| tickBand | Array of objects | Tick size band 
| &gt; minPx | String | Minimum price while placing an order 
| &gt; maxPx | String | Maximum price while placing an order 
| &gt; tickSz | String | Tick size, e.g. 0.0001

---

### Get premium history

It will return premium data in the past 6 months.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/premium-history`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USDT-SWAP</code><br>Applicable to <code>SWAP</code> 
| after | String | No | Pagination of data to return records earlier than the requested ts(not included) 
| before | String | No | Pagination of data to return records newer than the requested ts(not included) 
| limit | String | No | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>. 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Instrument ID, e.g. <code>BTC-USDT-SWAP</code> 
| premium | String | Premium between the mid price of perps market and the index price 
| ts | String | Data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get index tickers

Retrieve index tickers.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/index-tickers`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| quoteCcy | String | Conditional | Quote currency<br>Currently there is only an index with <code>USD/USDT/BTC/USDC</code> as the quote currency. 
| instId | String | Conditional | Index, e.g. <code>BTC-USD</code><br>Either <code>quoteCcy</code> or <code>instId</code> is required. 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| instId | String | Index 
| idxPx | String | Latest index price 
| high24h | String | Highest price in the past 24 hours 
| low24h | String | Lowest price in the past 24 hours 
| open24h | String | Open price in the past 24 hours 
| sodUtc0 | String | Open price in the UTC 0 
| sodUtc8 | String | Open price in the UTC 8 
| ts | String | Index price update time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>

---

### Get index candlesticks

Retrieve the candlestick charts of the index. This endpoint can retrieve the latest 1,440 data entries. Charts are returned in groups based on the requested bar.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/index-candles`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Index, e.g. <code>BTC-USD</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually 
| bar | String | No | Bar size, the default is <code>1m</code><br>e.g. [<code>1m</code>/<code>3m</code>/<code>5m</code>/<code>15m</code>/<code>30m</code>/<code>1H</code>/<code>2H</code>/<code>4H</code>]<br>Hong Kong time opening price k-line: [<code>6H</code>/<code>12H</code>/<code>1D</code>/<code>1W</code>/<code>1M</code>/<code>3M</code>]<br>UTC time opening price k-line: [<code>6Hutc</code>/<code>12Hutc</code>/<code>1Dutc</code>/<code>1Wutc</code>/<code>1Mutc</code>/<code>3Mutc</code>] 
| limit | String | No | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| o | String | Open price 
| h | String | highest price 
| l | String | Lowest price 
| c | String | Close price 
| confirm | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. 

The candlestick data may be incomplete, and should not be polled repeatedly.

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\].

---

### Get index candlesticks history

Retrieve the candlestick charts of the index from recent years.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/history-index-candles`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Index, e.g. <code>BTC-USD</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually 
| bar | String | No | Bar size, the default is <code>1m</code><br>e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>Hong Kong time opening price k-line: [6H/12H/1D/1W/1M]<br>UTC time opening price k-line: [/6Hutc/12Hutc/1Dutc/1Wutc/1Mutc] 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| o | String | Open price 
| h | String | highest price 
| l | String | Lowest price 
| c | String | Close price 
| confirm | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. 

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\].

---

### Get mark price candlesticks

Retrieve the candlestick charts of mark price. This endpoint can retrieve the latest 1,440 data entries. Charts are returned in groups based on the requested bar.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/mark-price-candles`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually 
| bar | String | No | Bar size, the default is <code>1m</code><br>e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>Hong Kong time opening price k-line: [6H/12H/1D/1W/1M/3M]<br>UTC time opening price k-line: [6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc] 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| o | String | Open price 
| h | String | highest price 
| l | String | Lowest price 
| c | String | Close price 
| confirm | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. 

The candlestick data may be incomplete, and should not be polled repeatedly.

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\]

---

### Get mark price candlesticks history

Retrieve the candlestick charts of mark price from recent years.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/history-mark-price-candles`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| instId | String | Yes | Instrument ID, e.g. <code>BTC-USD-SWAP</code> 
| after | String | No | Pagination of data to return records earlier than the requested <code>ts</code> 
| before | String | No | Pagination of data to return records newer than the requested <code>ts</code>. The latest data will be returned when using <code>before</code> individually 
| bar | String | No | Bar size, the default is <code>1m</code><br>e.g. [1m/3m/5m/15m/30m/1H/2H/4H]<br>Hong Kong time opening price k-line: [6H/12H/1D/1W/1M]<br>UTC time opening price k-line: [6Hutc/12Hutc/1Dutc/1Wutc/1Mutc] 
| limit | String | No | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Opening time of the candlestick, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| o | String | Open price 
| h | String | highest price 
| l | String | Lowest price 
| c | String | Close price 
| confirm | String | The state of candlesticks.<br><code>0</code> represents that it is uncompleted, <code>1</code> represents that it is completed. 

The data returned will be arranged in an array like this: \[ts,o,h,l,c,confirm\]

---

### Get exchange rate

This interface provides the average exchange rate data for 2 weeks

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/exchange-rate`

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| usdCny | String | Exchange rate

---

### Get index components

Get the index component information data on the market

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/index-components`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| index | String | Yes | index, e.g <code>BTC-USDT</code> 

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| index | String | Index 
| last | String | Latest Index Price 
| ts | String | Data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> 
| components | Array of objects | Components 
| &gt; exch | String | Name of Exchange 
| &gt; symbol | String | Name of Exchange Trading Pairs 
| &gt; symPx | String | Price of Exchange Trading Pairs 
| &gt; wgt | String | Weights 
| &gt; cnvPx | String | Price converted to index

---

### Get economic calendar data

Authentication is required for this endpoint. This endpoint is only supported in production environment.

Get the macro-economic calendar data within 3 months. Historical data from 3 months ago is only available to users with trading fee tier VIP1 and above.

#### Rate Limit: 1 request per 5 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/economic-calendar`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| region | string | No | Country, region or entity<br><code>afghanistan</code>, <code>albania</code>, <code>algeria</code>, <code>andorra</code>, <code>angola</code>, <code>antigua_and_barbuda</code>, <code>argentina</code>, <code>armenia</code>, <code>aruba</code>, <code>australia</code>, <code>austria</code>, <code>azerbaijan</code>, <code>bahamas</code>, <code>bahrain</code>, <code>bangladesh</code>, <code>barbados</code>, <code>belarus</code>, <code>belgium</code>, <code>belize</code>, <code>benin</code>, <code>bermuda</code>, <code>bhutan</code>, <code>bolivia</code>, <code>bosnia_and_herzegovina</code>, <code>botswana</code>, <code>brazil</code>, <code>brunei</code>, <code>bulgaria</code>, <code>burkina_faso</code>, <code>burundi</code>, <code>cambodia</code>, <code>cameroon</code>, <code>canada</code>, <code>cape_verde</code>, <code>cayman_islands</code>, <code>central_african_republic</code>, <code>chad</code>, <code>chile</code>, <code>china</code>, <code>colombia</code>, <code>comoros</code>, <code>congo</code>, <code>costa_rica</code>, <code>croatia</code>, <code>cuba</code>, <code>cyprus</code>, <code>czech_republic</code>, <code>denmark</code>, <code>djibouti</code>, <code>dominica</code>, <code>dominican_republic</code>, <code>east_timor</code>, <code>ecuador</code>, <code>egypt</code>, <code>el_salvador</code>, <code>equatorial_guinea</code>, <code>eritrea</code>, <code>estonia</code>, <code>ethiopia</code>, <code>euro_area</code>, <code>european_union</code>, <code>faroe_islands</code>, <code>fiji</code>, <code>finland</code>, <code>france</code>, <code>g20</code>, <code>g7</code>, <code>gabon</code>, <code>gambia</code>, <code>georgia</code>, <code>germany</code>, <code>ghana</code>, <code>greece</code>, <code>greenland</code>, <code>grenada</code>, <code>guatemala</code>, <code>guinea</code>, <code>guinea_bissau</code>, <code>guyana</code>, <code>hungary</code>, <code>haiti</code>, <code>honduras</code>, <code>hong_kong</code>, <code>hungary</code>, <code>imf</code>, <code>indonesia</code>, <code>iceland</code>, <code>india</code>, <code>indonesia</code>, <code>iran</code>, <code>iraq</code>, <code>ireland</code>, <code>isle_of_man</code>, <code>israel</code>, <code>italy</code>, <code>ivory_coast</code>, <code>jamaica</code>, <code>japan</code>, <code>jordan</code>, <code>kazakhstan</code>, <code>kenya</code>, <code>kiribati</code>, <code>kosovo</code>, <code>kuwait</code>, <code>kyrgyzstan</code>, <code>laos</code>, <code>latvia</code>, <code>lebanon</code>, <code>lesotho</code>, <code>liberia</code>, <code>libya</code>, <code>liechtenstein</code>, <code>lithuania</code>, <code>luxembourg</code>, <code>macau</code>, <code>macedonia</code>, <code>madagascar</code>, <code>malawi</code>, <code>malaysia</code>, <code>maldives</code>, <code>mali</code>, <code>malta</code>, <code>mauritania</code>, <code>mauritius</code>, <code>mexico</code>, <code>micronesia</code>, <code>moldova</code>, <code>monaco</code>, <code>mongolia</code>, <code>montenegro</code>, <code>morocco</code>, <code>mozambique</code>, <code>myanmar</code>, <code>namibia</code>, <code>nepal</code>, <code>netherlands</code>, <code>new_caledonia</code>, <code>new_zealand</code>, <code>nicaragua</code>, <code>niger</code>, <code>nigeria</code>, <code>north_korea</code>, <code>northern_mariana_islands</code>, <code>norway</code>, <code>opec</code>, <code>oman</code>, <code>pakistan</code>, <code>palau</code>, <code>palestine</code>, <code>panama</code>, <code>papua_new_guinea</code>, <code>paraguay</code>, <code>peru</code>, <code>philippines</code>, <code>poland</code>, <code>portugal</code>, <code>puerto_rico</code>, <code>qatar</code>, <code>russia</code>, <code>republic_of_the_congo</code>, <code>romania</code>, <code>russia</code>, <code>rwanda</code>, <code>slovakia</code>, <code>samoa</code>, <code>san_marino</code>, <code>sao_tome_and_principe</code>, <code>saudi_arabia</code>, <code>senegal</code>, <code>serbia</code>, <code>seychelles</code>, <code>sierra_leone</code>, <code>singapore</code>, <code>slovakia</code>, <code>slovenia</code>, <code>solomon_islands</code>, <code>somalia</code>, <code>south_africa</code>, <code>south_korea</code>, <code>south_sudan</code>, <code>spain</code>, <code>sri_lanka</code>, <code>st_kitts_and_nevis</code>, <code>st_lucia</code>, <code>sudan</code>, <code>suriname</code>, <code>swaziland</code>, <code>sweden</code>, <code>switzerland</code>, <code>syria</code>, <code>taiwan</code>, <code>tajikistan</code>, <code>tanzania</code>, <code>thailand</code>, <code>togo</code>, <code>tonga</code>, <code>trinidad_and_tobago</code>, <code>tunisia</code>, <code>turkey</code>, <code>turkmenistan</code>, <code>uganda</code>, <code>ukraine</code>, <code>united_arab_emirates</code>, <code>united_kingdom</code>, <code>united_states</code>, <code>uruguay</code>, <code>uzbekistan</code>, <code>vanuatu</code>, <code>venezuela</code>, <code>vietnam</code>, <code>world</code>, <code>yemen</code>, <code>zambia</code>, <code>zimbabwe</code> 
| importance | string | No | Level of importance<br><code>1</code>: low<br><code>2</code>: medium<br><code>3</code>: high 
| before | String | No | Pagination of data to return records newer than the requested ts based on the date parameter. Unix timestamp format in milliseconds. 
| after | String | No | Pagination of data to return records earlier than the requested ts based on the date parameter. Unix timestamp format in milliseconds. The default is the timestamp of the request moment. 
| limit | String | No | Number of results per request. The maximum is 100. The default is 100. 

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| calendarId | string | Calendar ID 
| date | string | Estimated release time of the value of actual field, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> 
| region | string | Country, region or entity 
| category | string | Category name 
| event | string | Event name 
| refDate | string | Date for which the datapoint refers to 
| actual | string | The actual value of this event 
| previous | string | Latest actual value of the previous period<br>The value will be revised if revision is applicable 
| forecast | string | Average forecast among a representative group of economists 
| dateSpan | string | <code>0</code>: The time of the event is known<br><code>1</code>: we only know the date of the event, the exact time of the event is unknown. 
| importance | string | Level of importance<br><code>1</code>: low<br><code>2</code>: medium<br><code>3</code>: high 
| uTime | string | Update time of this record, millisecond format of Unix timestamp, e.g. <code>1597026383085</code> 
| prevInitial | string | The initial value of the previous period<br>Only applicable when revision happens 
| ccy | string | Currency of the data 
| unit | string | Unit of the data

---

