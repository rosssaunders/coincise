# OKX API Documentation - Block Trading

## Block Trading Workflow [🔗](https://www.okx.com/docs-v5/en/#block-trading-block-trading-workflow "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-block-trading-workflow")

A block trade is a **large sized, privately negotiated** transaction that allows
traders to execute spot, perpetuals, futures, options and a combination of
instruments (multi leg) which are traded **outside the order book** and at a
**mutually agreed price** between the counter-parties. Once the transaction
economics have been agreed upon, it will be submitted to OKX to be seamlessly
margined, cleared and executed.

**Basic Concepts**

1.  **RFQs** - Request for Quote sent by the Taker to Maker(s). It captures the
    quantity, instrument or multi instrument strategy that a Taker wants to
    trade.
2.  **Quotes** - Quotes are created by the *Maker* in response to a requested
    RFQ.
3.  **Trades** - Trades occur when the *Taker* successfully _executes_ upon a
    makers quote to an RFQ.

**High Level Workflow**

To trade as either Taker or Maker, users need to deposit at least 100,000 USD
into their trading account. In addition, to become a Maker,
[Please complete the form to access block trading](https://share.hsforms.com/1mYdfKtJJR3CC03IyCeC6hg3a1fq).

1.  Taker creates an RFQ and selects which counterparties to broadcast the RFQ
    to.
2.  Multiple Maker(s) send a two way quote as a response to the RFQ.
3.  Taker chooses to execute upon the best quote and the trade is sent to OKX
    for clearing & settlement.
4.  Taker & Maker receive confirmation of the trade's execution.
5.  Trade economics are published to market feed. (minus counterparty info)

**Self-trade Prevention** Users cannot send RFQ requests to themselves.

**Taker's Perspective**

1.  Taker creates an RFQ using `POST /api/v5/rfq/create-rfq`. Taker can pull
    available instruments via `GET /api/v5/public/instruments` and available
    counterparties from `GET /api/v5/rfq/counterparties`.
2.  Taker can cancel an RFQ anytime until it becomes inactive with
    `POST /api/v5/rfq/cancel-rfq`.
3.  Maker, who is a requested counterparty to the RFQ, and is notified over the
    `rfqs` WebSocket channel, can provide a Quote to the RFQ.
4.  Taker, who will be notified of quotes from the `quotes` WebSocket channel,
    can execute upon the best Quote with `POST /api/v5/rfq/execute-quote`.
5.  Taker will receive confirmation of the trade's successful execution on the
    `struc-block-trades` and `rfqs` WebSocket channel.
6.  Taker will also receive confirmation of the trade being completed on the
    `public-struc-block-trades` WebSocket channel as well as all other block
    trades on OKX.

**Maker's Perspective**

1.  Maker is notified about a new RFQ who they are a counterparty to, on the
    `rfqs` WebSocket channel.
2.  Maker can create a one way or two way Quote using
    `POST /api/v5/rfq/create-quote`.
3.  Maker can cancel an existing quote anytime until it becomes inactive with
    `POST /api/v5/rfq/cancel-quote`.
4.  Taker chooses to execute upon an available Quote.
5.  Maker will receive updates of their Quote from the `quotes` WebSocket
    channel.
6.  Maker will receive confirmation of the successful execution of their Quote
    from the `struc-block-trades` and `quotes` WebSocket channel.
7.  Maker will receive confirmation of the trade being completed on the
    `public-struc-block-trades` WebSocket channel as well as all other block
    trades on OKX.

---

### Get Counterparties [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-counterparties "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-counterparties")

Retrieves the list of counterparties that the user is permitted to trade with.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/counterparties`

#### Request parameters

None

#### Response Parameters

| Parameter  | Type   | Description                                                                                                                                                   |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| traderName | String | The long formative username of trader or entity on the platform.                                                                                              |
| traderCode | String | A unique identifier of maker which will be publicly visible on the platform. All RFQ and Quote endpoints will use this as the unique counterparty identifier. |
| type       | String | The counterparty type. <code>LP</code> refers to API connected auto market makers.                                                                            |

---

### Create RFQ [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-create-rfq "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-create-rfq")

Creates a new RFQ

Please select trading bot "WAGMI" as the counterparty when submitting RFQs in
demo trading.  
Prices provided on RFQs by the trading bot are for reference only.

To learn more, please visit
[Support center > FAQ > Trading > Liquid marketplace > Demo trading](/help/demo-trading)

#### Rate Limit: 5 requests per 2 seconds; 80 requests per 12 hours

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/create-rfq`

#### Request parameters

| Parameter             | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| counterparties        | Array of strings | Yes      | The trader code(s) of the counterparties who receive the RFQ. Can be found via /api/v5/rfq/counterparties/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| anonymous             | Boolean          | No       | Submit RFQ on a disclosed or anonymous basis. Valid values are <code>true</code> or <code>false</code>.<br>If not specified, the default value is <code>false</code>.<br>When anonymous = true, the taker’s identify is not disclosed to maker even after trade execution.                                                                                                                                                                                                                                                                                                                                                                        |
| clRfqId               | String           | No       | Client-supplied RFQ ID.<br>A combination of case-sensitive alpha-numeric, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| tag                   | String           | No       | RFQ tag.<br>The block trade associated with the RFQ will have the same tag.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| allowPartialExecution | Boolean          | No       | Whether the RFQ can be partially filled provided that the shape of legs stays the same. Valid values are <code>true</code> or <code>false</code>.<br><code>false</code> by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| legs                  | Array of objects | Yes      | An Array of objects containing each leg of the RFQ. Maximum 15 legs can be placed per request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; instId           | String           | Yes      | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; tdMode           | String           | No       | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                                                                                                                                                                                                                                                                                 |
| &gt; ccy              | String           | No       | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; sz               | String           | Yes      | The size of each leg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; lmtPx            | String           | No       | Taker expected price for the RFQ<br><br>If provided, RFQ trade will be automatically executed if the price from the quote is better than or equal to the price specified until the RFQ is canceled or expired.<br>This field has to be provided for all legs to have the RFQ automatically executed, or leave empty for all legs, otherwise request will be rejected.<br>The auto execution side depends on the leg side of the RFQ.<br>For <code>SPOT/MARGIN/FUTURES/SWAP</code>, lmtPx will be in unit of the quote ccy.<br>For <code>OPTION</code>, lmtPx will be in unit of settle ccy.<br>The field will not be disclosed to counterparties. |
| &gt; side             | String           | Yes      | The direction of each leg. Valid values can be <code>buy</code> or <code>sell</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; posSide          | String           | No       | Position side.<br>The default is <code>net</code> in the net mode. It can only be <code>long</code> or <code>short</code> in the long/short mode.<br>If not specified, users in long/short mode always open new positions.<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>.                                                                                                                                                                                                                                                                                                                                                          |
| &gt; tgtCcy           | String           | No       | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified, this is equal to <code>base_ccy</code> by default.                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; tradeQuoteCcy    | String           | No       | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| acctAlloc             | Array of objects | No       | Account level allocation of the RFQ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; acct             | String           | Yes      | The name of the allocated account of the RFQ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; legs             | Array of objects | Yes      | The allocated legs of the account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt;&gt; sz           | String           | Yes      | The allocated size of each leg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt;&gt; instId       | String           | Yes      | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt;&gt; tdMode       | String           | No       | Trade mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt; ccy          | String           | No       | Margin currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt;&gt; posSide      | String           | No       | Position side                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Response Parameters

| Parameter                  | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                       | String           | The result code, <code>0</code> means success.                                                                                                                                                                                                                                                                                                                                               |
| msg                        | String           | The error message, not empty if the code is not 0.                                                                                                                                                                                                                                                                                                                                           |
| data                       | Array of objects | Array of objects containing the results of the RFQ creation.                                                                                                                                                                                                                                                                                                                                 |
| &gt; cTime                 | String           | The timestamp the RFQ was created. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                    |
| &gt; uTime                 | String           | The timestamp the RFQ was last updated. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                               |
| &gt; state                 | String           | The status of the RFQ.<br>Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>traded_away</code> <code>failed</code>.<br><code>traded_away</code> only applies to Maker                                                                                                                                   |
| &gt; counterparties        | Array of strings | The list of counterparties traderCode the RFQ was broadcast to.                                                                                                                                                                                                                                                                                                                              |
| &gt; validUntil            | String           | The timestamp the RFQ expires. Unix timestamp format in milliseconds.<br>If all legs are options, the RFQ will expire after 10 minutes; otherwise, the RFQ will expire after 2 minutes.                                                                                                                                                                                                      |
| &gt; clRfqId               | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.                                                                                                                                                                                                                                            |
| &gt; tag                   | String           | RFQ tag. The block trade associated with the RFQ will have the same tag.                                                                                                                                                                                                                                                                                                                     |
| &gt; allowPartialExecution | Boolean          | Whether the RFQ can be partially filled provided that the shape of legs stays the same.                                                                                                                                                                                                                                                                                                      |
| &gt; traderCode            | String           | A unique identifier of taker.                                                                                                                                                                                                                                                                                                                                                                |
| &gt; rfqId                 | String           | The unique identifier of the RFQ generated by system.                                                                                                                                                                                                                                                                                                                                        |
| &gt; legs                  | Array of objects | An Array of objects containing each leg of the RFQ.                                                                                                                                                                                                                                                                                                                                          |
| &gt;&gt; instId            | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                                                                                                                                                                                                                                                            |
| &gt;&gt; tdMode            | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                            |
| &gt;&gt; ccy               | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                         |
| &gt;&gt; sz                | String           | Size of the leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt; side              | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                   |
| &gt;&gt; posSide           | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to FUTURES/SWAP. |
| &gt;&gt; tgtCcy            | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default.                                                                                                                                                         |
| &gt;&gt; tradeQuoteCcy     | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                              |
| &gt; groupId               | String           | Group RFQ ID<br>Only applicable to group RFQ, return "" for normal RFQ                                                                                                                                                                                                                                                                                                                       |
| &gt; acctAlloc             | Array of objects | Account level allocation of the RFQ                                                                                                                                                                                                                                                                                                                                                          |
| &gt;&gt; acct              | String           | The name of the allocated account of the RFQ                                                                                                                                                                                                                                                                                                                                                 |
| &gt;&gt; sCode             | String           | The code of the event execution result, 0 means success                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; sMsg              | String           | Rejection message if the request is unsuccessful                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt; legs              | Array of objects | The allocated legs of the account                                                                                                                                                                                                                                                                                                                                                            |
| &gt;&gt;&gt; instId        | String           | Instrument ID                                                                                                                                                                                                                                                                                                                                                                                |
| &gt;&gt;&gt; sz            | String           | The calculated size of each leg of allocated account                                                                                                                                                                                                                                                                                                                                         |
| &gt;&gt;&gt; tdMode        | String           | Trade mode                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt;&gt;&gt; ccy           | String           | Margin currency                                                                                                                                                                                                                                                                                                                                                                              |
| &gt;&gt;&gt; posSide       | String           | Position side                                                                                                                                                                                                                                                                                                                                                                                |

Group RFQ introduction

1\. Only a master account can conduct group RFQ and the available scope of
allocated subaccounts is its normal and managed subaccounts.  
2\. Users will pass in acctAlloc request parameter to indicate the details of
group RFQ account allocation, account name, instrument ID, allocated size, etc.
master account is also allowed and should be indicated as "0". For tdMode, ccy
and posSide fields, they will inherit the system default value if you leave them
empty.  
3\. Add groupId, acctAlloc as a new response parameter.  
4\. The upper limit of the number of allocated subaccounts is 10. You will
receive error code 70516 if you exceed the upper limit.  
5\. For each symbol, the total size of RFQ legs in all accounts should be equal
to its combined amount in the group RFQ. If not, you will receive error
code 70514.  
6\. For each sub-account, the ratio of a leg's size to the group RFQ must be the
same across all symbols. If not, you will receive error code 70515. Here is an
example:  
    1. Parent RFQ legs  
        1. Symbol: BTC-USDT, size: 50, symbol: ETH-USDT, size: 100  
    2. Child RFQ legs, happy case  
        1. Acct1: symbol: BTC-USDT, size: 30, symbol: ETH-USDT, size: 60 (ratio:
0.6)  
        2. Acct2: symbol: BTC-USDT, size: 20, symbol: ETH-USDT, size: 40 (ratio:
0.4)  
    3. Child RFQ legs, bad case  
        1. Acct1: symbol: BTC-USDT, size: 30, symbol: ETH-USDT, size: 50  
        2. Acct2: symbol: BTC-USDT, size: 20, symbol: ETH-USDT, size: 50  
        3. The total size is equal. But the ratio is not equal for different
legs per subaccount.  
7\. For allowPartialExecution field, it will be ignored even though users pass
it in. For a group RFQ, allowPartialExecution will always be true, since taker
can not determine whether the RFQ can be partially or fully filled if any
subaccount fails. Thus, makers should regard it as a RFQ that can be partially
filled.  
8\. Group RFQ will not be created if any subaccount fails.

---

### Cancel RFQ [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-rfq "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-rfq")

Cancel an existing active RFQ that you have created previously.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-rfq`

#### Request parameters

| Parameter | Type   | Required    | Description                                                                                                                                                                                                   |
| --------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId     | String | Conditional | RFQ ID created .                                                                                                                                                                                              |
| clRfqId   | String | Conditional | Client-supplied RFQ ID.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.<br>Either rfqId or clRfqId is required. If both are passed, rfqId will be used. |

#### Response Parameters

| Parameter    | Type             | Description                                                           |
| ------------ | ---------------- | --------------------------------------------------------------------- |
| code         | String           | The result code, <code>0</code> means success.                        |
| msg          | String           | The error message, not empty if the code is not 0.                    |
| data         | Array of objects | Array of objects containing the results                               |
| &gt; rfqId   | String           | RFQ ID                                                                |
| &gt; clRfqId | String           | Client-supplied RFQ ID.                                               |
| &gt; sCode   | String           | The code of the event execution result, <code>0</code> means success. |
| &gt; sMsg    | String           | Rejection message if the request is unsuccessful.                     |

---

### Cancel multiple RFQs [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-multiple-rfqs "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-multiple-rfqs")

Cancel one or multiple active RFQ(s) in a single batch. Maximum 100 RFQ orders
can be canceled per request.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-batch-rfqs`

#### Request parameters

| Parameter | Type             | Required    | Description                                                                                                                                                                          |
| --------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| rfqIds    | Array of strings | Conditional | RFQ IDs .                                                                                                                                                                            |
| clRfqIds  | Array of strings | Conditional | Client-supplied RFQ IDs.<br>Either <code>rfqIds</code> or <code>clRfqIds</code> is required.<br>If both attributes are sent, <code>rfqIds</code> will be used as primary identifier. |

> Success - All requested RFQs canceled

> Partial cancellation

#### Response Parameters

| Parameter    | Type             | Description                                                           |
| ------------ | ---------------- | --------------------------------------------------------------------- |
| code         | String           | The result code, <code>0</code> means success.                        |
| msg          | String           | The error message, not empty if the code is not 0.                    |
| data         | Array of objects | Array of objects containing the results                               |
| &gt; rfqId   | String           | RFQ ID                                                                |
| &gt; clRfqId | String           | Client-supplied RFQ ID.                                               |
| &gt; sCode   | String           | The code of the event execution result, <code>0</code> means success. |
| &gt; sMsg    | String           | Rejection message if the request is unsuccessful.                     |

---

### Cancel all RFQs [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-rfqs "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-rfqs")

Cancels all active RFQs.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-all-rfqs`

#### Request parameters

None

#### Response Parameters

| Parameter | Type             | Description                                                                                          |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| code      | String           | The result code, <code>0</code> means success.                                                       |
| msg       | String           | The error message, not empty if the code is not 0.                                                   |
| data      | Array of objects | Array of objects containing the results                                                              |
| &gt; ts   | String           | The timestamp of successful cancellation. Unix timestamp format in milliseconds, e.g. 1597026383085. |

---

### Execute Quote [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-execute-quote "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-execute-quote")

Executes a Quote. It is only used by the creator of the RFQ

#### Rate Limit: 2 requests per 3 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/execute-quote`

#### Request parameters

| Parameter   | Type             | Required | Description                                                                                                                                                                                                                                                                                           |
| ----------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId       | String           | Yes      | RFQ ID .                                                                                                                                                                                                                                                                                              |
| quoteId     | String           | Yes      | Quote ID.                                                                                                                                                                                                                                                                                             |
| legs        | Array of objects | No       | An Array of objects containing the execution size of each leg of the RFQ.<br>The ratio of the leg sizes needs to be the same as the RFQ.<br>\*Note: <code>tgtCcy</code> and <code>side</code> of each leg will be same as ones in the RFQ. <code>px</code> will be the same as the ones in the Quote. |
| &gt; instId | String           | Yes      | The Instrument ID, for example: "BTC-USDT-SWAP".                                                                                                                                                                                                                                                      |
| &gt; sz     | String           | Yes      | The size of each leg                                                                                                                                                                                                                                                                                  |

#### Response Parameters

| Parameter            | Type             | Description                                                                                                                                         |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                 | String           | The result code, <code>0</code> means success.                                                                                                      |
| msg                  | String           | The error message, not empty if the code is not 0.                                                                                                  |
| data                 | Array of objects | Array of objects containing the results                                                                                                             |
| &gt; cTime           | String           | The execution time for the trade. Unix timestamp in milliseconds.                                                                                   |
| &gt; rfqId           | String           | RFQ ID.                                                                                                                                             |
| &gt; clRfqId         | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.   |
| &gt; quoteId         | String           | Quote ID.                                                                                                                                           |
| &gt; clQuoteId       | String           | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, only return empty string. |
| &gt; blockTdId       | String           | Block trade ID.                                                                                                                                     |
| &gt; tag             | String           | RFQ tag.                                                                                                                                            |
| &gt; tTraderCode     | String           | A unique identifier of the taker. Empty if the anonymous parameter of the RFQ is set to be <code>true</code>.                                       |
| &gt; mTraderCode     | String           | A unique identifier of the maker. Empty if the anonymous parameter of the Quote is set to be <code>true</code>.                                     |
| &gt; legs            | Array of objects | Legs of trade                                                                                                                                       |
| &gt;&gt; instId      | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                   |
| &gt;&gt; px          | String           | The price the leg executed                                                                                                                          |
| &gt;&gt; sz          | String           | Size of the leg in contracts or spot.                                                                                                               |
| &gt;&gt; side        | String           | The direction of the leg from the Takers perspective. Valid value can be buy or sell.                                                               |
| &gt;&gt; fee         | String           | Fee for the individual leg.<br>Negative fee represents the user transaction fee charged by the platform. Positive fee represents rebate.            |
| &gt;&gt; feeCcy      | String           | Fee currency. To be read in conjunction with fee                                                                                                    |
| &gt;&gt; tradeId     | String           | Last traded ID.                                                                                                                                     |
| &gt; acctAlloc       | Array of objects | Account level allocation of the RFQ                                                                                                                 |
| &gt;&gt; acct        | String           | The name of the allocated account of the RFQ.                                                                                                       |
| &gt;&gt; blockTdId   | String           | Block trade ID                                                                                                                                      |
| &gt;&gt; sCode       | String           | The code of the event execution result, 0 means success                                                                                             |
| &gt;&gt; sMsg        | String           | Rejection message if the request is unsuccessful                                                                                                    |
| &gt;&gt; legs        | Array of objects | The allocated legs of the account.                                                                                                                  |
| &gt;&gt;&gt; instId  | String           | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                            |
| &gt;&gt;&gt; sz      | String           | The size of each account leg is filled.                                                                                                             |
| &gt;&gt;&gt; fee     | String           | The fee of each account level leg                                                                                                                   |
| &gt;&gt;&gt; feeCcy  | String           | Fee currency. To be read in conjunction with fee                                                                                                    |
| &gt;&gt;&gt; tradeId | String           | Last traded ID of each account leg                                                                                                                  |

Group RFQ introduction

1\. Takers are not allowed to partially execuate the quote for group RFQ. You
will receive error code 70507 if you don't pass in the full leg size.  
2\. Parent RFQ leg size will be the summation of the filled size of each child
RFQ leg size while fee should also be the summation.  
3\. The blockTdId of parent RFQ and the tradeId of parent RFQ legs will be
emoty. But there will be subaccount breakdown attached with blockTdId and
tradeId populated.

---

### Get Quote products [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quote-products "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quote-products")

Retrieve the products which makers want to quote and receive RFQs for, and the
corresponding price and size limit.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/maker-instrument-settings`

#### Request parameters

None

#### Response Parameters

| Parameter            | Type             | Description                                                                                                                                                                                                                          |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code                 | String           | The result code, <code>0</code> means success.                                                                                                                                                                                       |
| msg                  | String           | The error message, not empty if the code is not <code>0</code>.                                                                                                                                                                      |
| data                 | Array of objects | Return data of the request.                                                                                                                                                                                                          |
| &gt; instType        | String           | Type of instrument. Valid value can be <code>FUTURES</code>, <code>OPTION</code>, <code>SWAP</code> or <code>SPOT</code>.                                                                                                            |
| &gt; includeAll      | Boolean          | Receive all instruments or not under specific instType setting.<br>Valid value can be boolean (<code>True</code>/<code>False</code>). By default, the value will be <code>false</code>.                                              |
| &gt; data            | Array of objects | Elements of the instType.                                                                                                                                                                                                            |
| &gt;&gt; instFamily  | String           | Instrument family. Required for <code>FUTURES</code>, <code>OPTION</code> and <code>SWAP</code> only.                                                                                                                                |
| &gt;&gt; instId      | String           | Instrument ID. Required for <code>SPOT</code> only.                                                                                                                                                                                  |
| &gt;&gt; maxBlockSz  | String           | Max trade quantity for the product(s).<br>For <code>FUTURES</code>, <code>OPTION</code> and <code>SWAP</code>, the max quantity of the RFQ/Quote is in unit of contracts. For <code>SPOT</code>, this parameter is in base currency. |
| &gt;&gt; makerPxBand | String           | Price bands in unit of ticks, measured against mark price.<br>Setting makerPxBand to 1 tick means:<br>If Bid price &gt; Mark + 1 tick, it will be stopped<br>If Ask price &lt; Mark - 1 tick, It will be stopped                     |

---

### Set Quote products [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-set-quote-products "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-set-quote-products")

Customize the products which makers want to quote and receive RFQs for, and the
corresponding price and size limit.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/maker-instrument-settings`

#### Request parameters

| Parameter        | Type             | Required    | Description                                                                                                                                                                                                                          |
| ---------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instType         | String           | Yes         | Type of instrument. Valid value can be <code>FUTURES</code>, <code>OPTION</code>, <code>SWAP</code> or <code>SPOT</code>.                                                                                                            |
| includeAll       | Boolean          | No          | Receive all instruments or not under specific instType setting.<br>Valid value can be boolean (<code>True</code>/<code>False</code>). By default, the value will be <code>false</code>.                                              |
| data             | Array of objects | Yes         | Elements of the instType.                                                                                                                                                                                                            |
| &gt; instFamily  | String           | Conditional | Instrument family. Required for <code>FUTURES</code>, <code>OPTION</code> and <code>SWAP</code> only.                                                                                                                                |
| &gt; instId      | String           | Conditional | Instrument ID. Required for <code>SPOT</code> only.                                                                                                                                                                                  |
| &gt; maxBlockSz  | String           | No          | Max trade quantity for the product(s).<br>For <code>FUTURES</code>, <code>OPTION</code> and <code>SWAP</code>, the max quantity of the RFQ/Quote is in unit of contracts. For <code>SPOT</code>, this parameter is in base currency. |
| &gt; makerPxBand | String           | No          | Price bands in unit of ticks, measured against mark price.<br>Setting makerPxBand to 1 tick means:<br>If Bid price &gt; Mark + 1 tick, it will be stopped<br>If Ask price &lt; Mark - 1 tick, It will be stopped                     |

#### Response Parameters

| Parameter   | Type             | Description                                                                      |
| ----------- | ---------------- | -------------------------------------------------------------------------------- |
| code        | String           | The result code, <code>0</code> means success.                                   |
| msg         | String           | The error message, not empty if the code is not <code>0</code>.                  |
| data        | Array of objects | Array of objects containing the results.                                         |
| &gt; result | Boolean          | Result of the request<br>Valid value is <code>true</code> or <code>false</code>. |

---

### Reset MMP status [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-reset-mmp-status "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-reset-mmp-status")

Reset the MMP status to be inactive.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/mmp-reset`

#### Request parameters

None

#### Response Parameters

| Parameter | Type             | Description                                                                                                       |
| --------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| code      | String           | The result code, <code>0</code> means success.                                                                    |
| msg       | String           | The error message, not empty if the code is not <code>0</code>.                                                   |
| data      | Array of objects | Array of objects containing the results.                                                                          |
| &gt; ts   | String           | The timestamp of re-setting successfully. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>. |

---

### Set MMP [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-set-mmp "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-set-mmp")

This endpoint is used to set MMP configure and only applicable to block trading
makers

#### Rate Limit: 1 request per 10 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/mmp-config`

#### Request Parameters

| Parameter      | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| timeInterval   | String | Yes      | Time window (ms). MMP interval where monitoring is done.<br>"0" means disable MMP. Maximum time interval is 600,000. |
| frozenInterval | String | Yes      | Frozen period (ms).<br>"0" means the trade will remain frozen until you request "Reset MMP Status" to unfrozen.      |
| countLimit     | String | Yes      | Limit in number of execution attempts.                                                                               |

#### Response Parameters

| Parameter      | Type   | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| timeInterval   | String | Time window (ms). MMP interval where monitoring is done |
| frozenInterval | String | Frozen period (ms).                                     |
| countLimit     | String | Limit in number of execution attempts                   |

Group RFQ introduction

For RFQ makers, the execution attempt of group RFQ will only count once towards
MMP regardless of how many account allocations involved.

---

### Get MMP Config [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-mmp-config "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-mmp-config")

This endpoint is used to get MMP configure information and only applicable to
block trading market makers

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/mmp-config`

#### Request Parameters

none

#### Response Parameters

| **Parameter**  | **Type** | **Description**                                                                                                                  |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| timeInterval   | String   | Time window (ms). MMP interval where monitoring is done<br>"0" means MMP is diabled                                              |
| frozenInterval | String   | Frozen period (ms). If it is "0", the trade will remain frozen until manually reset and <code>mmpFrozenUntil</code> will be "".  |
| countLimit     | String   | Limit in number of execution attempts                                                                                            |
| mmpFrozen      | Boolean  | Whether MMP is currently triggered. <code>true</code> or <code>false</code>                                                      |
| mmpFrozenUntil | String   | If frozenInterval is not "0" and mmpFrozen = True, it is the time interval (in ms) when MMP is no longer triggered, otherwise "" |

---

### Create Quote [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-create-quote "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-create-quote")

Allows the user to Quote an RFQ that they are a counterparty to. The user MUST
quote the entire RFQ and not part of the legs or part of the quantity. Partial
quoting is not allowed.

#### Rate Limit: 50 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/create-quote`

#### Request parameters

| Parameter          | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId              | String           | Yes      | RFQ ID .                                                                                                                                                                                                                                                                                                                                                               |
| clQuoteId          | String           | No       | Client-supplied Quote ID.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                        |
| tag                | String           | No       | Quote tag.<br>The block trade associated with the Quote will have the same tag.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.                                                                                                                                                                                  |
| anonymous          | Boolean          | No       | Submit Quote on a disclosed or anonymous basis.<br>Valid value is <code>true</code> or <code>false</code>. <code>false</code> by default.                                                                                                                                                                                                                              |
| quoteSide          | String           | Yes      | The trading direction of the Quote. Its value can be <code>buy</code> or <code>sell</code>.<br>For example, if quoteSide is <code>buy</code>, all the legs are executed in their leg sides; otherwise, all the legs are executed in the opposite of their leg sides.                                                                                                   |
| expiresIn          | String           | No       | Seconds that a quote expires in.<br>Must be an integer between 10-120. Default is 60.                                                                                                                                                                                                                                                                                  |
| legs               | Array of objects | Yes      | The legs of the Quote.                                                                                                                                                                                                                                                                                                                                                 |
| &gt; instId        | String           | Yes      | The instrument ID of quoted leg.                                                                                                                                                                                                                                                                                                                                       |
| &gt; tdMode        | String           | No       | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code> |
| &gt; ccy           | String           | No       | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                   |
| &gt; sz            | String           | Yes      | Size of the leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                  |
| &gt; px            | String           | Yes      | The price of the leg.                                                                                                                                                                                                                                                                                                                                                  |
| &gt; side          | String           | Yes      | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                             |
| &gt; posSide       | String           | No       | Position side.<br>The default is <code>net</code> in the net mode. It can only be <code>long</code> or <code>short</code> in the long/short mode.<br>If not specified, users in long/short mode always open new positions.<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>.                                                                               |
| &gt; tgtCcy        | String           | No       | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default.                                                                                                                                   |
| &gt; tradeQuoteCcy | String           | No       | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                        |

#### Response Parameters

| Parameter              | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                   | String           | The result code, <code>0</code> means success.                                                                                                                                                                                                                                                                                                                                               |
| msg                    | String           | The error message, not empty if the code is not 0.                                                                                                                                                                                                                                                                                                                                           |
| data                   | Array of objects | Array of objects containing the results                                                                                                                                                                                                                                                                                                                                                      |
| &gt; cTime             | String           | The timestamp the Quote was created, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                  |
| &gt; uTime             | String           | The timestamp the Quote was last updated, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                             |
| &gt; state             | String           | The status of the quote. Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> or <code>failed</code>.                                                                                                                                                                                                            |
| &gt; reason            | String           | Reasons of state. Valid values can be <code>mmp_canceled</code>.                                                                                                                                                                                                                                                                                                                             |
| &gt; validUntil        | String           | The timestamp the Quote expires. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                      |
| &gt; rfqId             | String           | RFQ ID                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; clRfqId           | String           | Client-supplied RFQ ID.<br>This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.                                                                                                                                                                                                                                         |
| &gt; quoteId           | String           | Quote ID.                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; clQuoteId         | String           | Client-supplied Quote ID.<br>This attribute is treated as client sensitive information. It will not be exposed to the Taker, only return empty string.                                                                                                                                                                                                                                       |
| &gt; tag               | String           | Quote tag.<br>The block trade associated with the Quote will have the same tag.                                                                                                                                                                                                                                                                                                              |
| &gt; traderCode        | String           | A unique identifier of maker.                                                                                                                                                                                                                                                                                                                                                                |
| &gt; quoteSide         | String           | The trading direction of the Quote.<br>Its value can be <code>buy</code> or <code>sell</code>. For example, if quoteSide is <code>buy</code>, all the legs are executed in their leg sides; otherwise, all the legs are executed in the opposite of their leg sides.                                                                                                                         |
| &gt; legs              | Array of objects | The legs of the Quote.                                                                                                                                                                                                                                                                                                                                                                       |
| &gt;&gt; instId        | String           | Instrument ID, e.g. <code>BTC-USDT-SWAP</code>                                                                                                                                                                                                                                                                                                                                               |
| &gt;&gt; tdMode        | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                            |
| &gt;&gt; ccy           | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                         |
| &gt;&gt; sz            | String           | Size of the leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt; px            | String           | The price of the leg.                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt; side          | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                   |
| &gt;&gt; posSide       | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to FUTURES/SWAP. |
| &gt;&gt; tgtCcy        | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default.                                                                                                                                                         |
| &gt;&gt; tradeQuoteCcy | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                              |

---

### Cancel Quote [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-quote "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-quote")

Cancels an existing active Quote you have created in response to an RFQ.

#### Rate Limit: 50 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-quote`

#### Request parameters

| Parameter | Type   | Required    | Description                                                                                                                                                                                                                  |
| --------- | ------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| quoteId   | String | Conditional | Quote ID.                                                                                                                                                                                                                    |
| clQuoteId | String | Conditional | Client-supplied Quote ID. Either <code>quoteId</code> or <code>clQuoteId</code> is required. If both <code>clQuoteId</code> and <code>quoteId</code> are passed, <code>quoteId</code> will be treated as primary identifier. |
| rfqId     | String | No          | RFQ ID.                                                                                                                                                                                                                      |

#### Response Parameters

| Parameter      | Type             | Description                                                           |
| -------------- | ---------------- | --------------------------------------------------------------------- |
| code           | String           | The result code, <code>0</code> means success.                        |
| msg            | String           | The error message, not empty if the code is not 0.                    |
| data           | Array of objects | Array of objects containing the results                               |
| &gt; quoteId   | String           | Quote ID                                                              |
| &gt; clQuoteId | String           | Client-supplied Quote ID.                                             |
| &gt; sCode     | String           | The code of the event execution result, <code>0</code> means success. |
| &gt; sMsg      | String           | Rejection message if the request is unsuccessful.                     |

---

### Cancel multiple Quotes [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-multiple-quotes "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-multiple-quotes")

Cancel one or multiple active Quote(s) in a single batch. Maximum 100 quote
orders can be canceled per request.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-batch-quotes`

#### Request parameters

| Parameter  | Type             | Required    | Description                                                                                                                                                                           |
| ---------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| quoteIds   | Array of strings | Conditional | Quote IDs .                                                                                                                                                                           |
| clQuoteIds | Array of strings | Conditional | Client-supplied Quote IDs. Either <code>quoteIds</code> or <code>clQuoteIds</code> is required.If both attributes are sent, <code>quoteIds</code> will be used as primary identifier. |

> Success - All requested Quotes canceled

> Partial cancellation

#### Response Parameters

| Parameter      | Type             | Description                                                           |
| -------------- | ---------------- | --------------------------------------------------------------------- |
| code           | String           | The result code, <code>0</code> means success.                        |
| msg            | String           | The error message, not empty if the code is not 0.                    |
| data           | Array of objects | Array of objects containing the results                               |
| &gt; quoteId   | String           | Quote ID                                                              |
| &gt; clQuoteId | String           | Client-supplied Quote ID.                                             |
| &gt; sCode     | String           | The code of the event execution result, <code>0</code> means success. |
| &gt; sMsg      | String           | Rejection message if the request is unsuccessful.                     |

---

### Cancel all Quotes [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-quotes "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-quotes")

Cancels all active Quotes.

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-all-quotes`

#### Request parameters

None

#### Response Parameters

| Parameter | Type             | Description                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| code      | String           | The result code, <code>0</code> means success.                                                         |
| msg       | String           | The error message, not empty if the code is not 0.                                                     |
| data      | Array of objects | Array of objects containing the results                                                                |
| &gt; ts   | String           | The timestamp of cancellation successfully. Unix timestamp format in milliseconds, e.g. 1597026383085. |

---

### Cancel All After [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-after "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-cancel-all-after")

Cancel all quotes after the countdown timeout.

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/rfq/cancel-all-after`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                               |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timeOut   | String | Yes      | The countdown for quotes cancellation, with second as the unit.<br>Range of value can be 0, [10, 120].<br>Setting timeOut to 0 disables Cancel All After. |

#### Response Parameters

| Parameter   | Type   | Description                                                                                  |
| ----------- | ------ | -------------------------------------------------------------------------------------------- |
| triggerTime | String | The time the cancellation is triggered.<br>triggerTime=0 means Cancel All After is disabled. |
| ts          | String | The time the request is received.                                                            |

Users are recommended to send a request to the exchange every second. When the
cancel all after is triggered, the trading engine will cancel quotes on behalf
of the client one by one and this operation may take up to a few seconds. This
feature is intended as a protection mechanism for clients only and clients
should not use this feature as part of their trading strategies.

---

### Get rfqs [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-rfqs "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-rfqs")

Retrieves details of RFQs that the user is a counterparty to (either as the
creator or the receiver of the RFQ).

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/rfqs`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId     | String | No       | RFQ ID .                                                                                                                                                                                                                                                   |
| clRfqId   | String | No       | Client-supplied RFQ ID. If both <code>clRfqId</code> and <code>rfqId</code> are passed, <code>rfqId</code> will be treated as primary identifier                                                                                                           |
| state     | String | No       | The status of the RFQ.<br>Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code> <code>traded_away</code>.<br><code>traded_away</code> only applies to Maker |
| beginId   | String | No       | Start rfq id the request to begin with. Pagination of data to return records newer than the requested rfqId, not including beginId                                                                                                                         |
| endId     | String | No       | End rfq id the request to end with. Pagination of data to return records earlier than the requested rfqId, not including endId                                                                                                                             |
| limit     | String | No       | Number of results per request. The maximum is 100 which is also the default value.                                                                                                                                                                         |

#### Response Parameters

| Parameter                  | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                       | String           | The result code, <code>0</code> means success.                                                                                                                                                                                                                                                                                                                                                                         |
| msg                        | String           | The error message, not empty if the code is not 0.                                                                                                                                                                                                                                                                                                                                                                     |
| data                       | Array of objects | Array of objects containing the results of the RFQ creation.                                                                                                                                                                                                                                                                                                                                                           |
| &gt; cTime                 | String           | The timestamp the RFQ was created. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                              |
| &gt; uTime                 | String           | The timestamp the RFQ was last updated. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                         |
| &gt; state                 | String           | The status of the RFQ.<br>Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> <code>failed</code> <code>traded_away</code>.<br><code>traded_away</code> only applies to Maker                                                                                                                                                             |
| &gt; counterparties        | Array of strings | The list of counterparties traderCode the RFQ was broadcasted to.                                                                                                                                                                                                                                                                                                                                                      |
| &gt; validUntil            | String           | The timestamp the RFQ expires. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                                  |
| &gt; clRfqId               | String           | Client-supplied RFQ ID.<br>This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.                                                                                                                                                                                                                                                                   |
| &gt; tag                   | String           | RFQ tag.<br>The block trade associated with the RFQ will have the same tag.                                                                                                                                                                                                                                                                                                                                            |
| &gt; flowType              | String           | Identify the type of the RFQ.<br>Only applicable to Makers, return "" for Takers                                                                                                                                                                                                                                                                                                                                       |
| &gt; traderCode            | String           | A unique identifier of taker. Empty if the anonymous parameter of the RFQ is set to be <code>true</code>.                                                                                                                                                                                                                                                                                                              |
| &gt; rfqId                 | String           | RFQ ID.                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; allowPartialExecution | Boolean          | Whether the RFQ can be partially filled provided that the shape of legs stays the same.<br>Valid value is <code>true</code> or <code>false</code>. <code>false</code> by default.                                                                                                                                                                                                                                      |
| &gt; legs                  | Array of objects | Legs of RFQ                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt;&gt; instId            | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; tdMode            | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                                                      |
| &gt;&gt; ccy               | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                                                   |
| &gt;&gt; sz                | String           | Size of the leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt;&gt; side              | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt; posSide           | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>. |
| &gt;&gt; tgtCcy            | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are base_ccy and quote_ccy. When not specified this is equal to base_ccy by default.                                                                                                                                                                                                                          |
| &gt;&gt; tradeQuoteCcy     | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                                                        |
| &gt; groupId               | String           | Group RFQ ID<br>Only applicable to group RFQ, return "" for normal RFQ                                                                                                                                                                                                                                                                                                                                                 |
| &gt; acctAlloc             | Array of objects | Account level allocation of the RFQ<br>This is only applicable to the taker.                                                                                                                                                                                                                                                                                                                                           |
| &gt;&gt; acct              | String           | The name of the allocated account of the RFQ.                                                                                                                                                                                                                                                                                                                                                                          |
| &gt;&gt; legs              | Array of objects | The allocated legs of the account.                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt;&gt;&gt; instId        | String           | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                                                                                                                                                                                                                                               |
| &gt;&gt;&gt; sz            | String           | The allocated size of each leg.                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt;&gt; tdMode        | String           | Trade mode                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt;&gt; ccy           | String           | Margin currency                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt;&gt; posSide       | String           | Position side                                                                                                                                                                                                                                                                                                                                                                                                          |

Group RFQ introduction

1\. allowPartialExecution field is always true for group RFQ for taker and
maker.  
2\. Add a new response parameter acctAlloc with all account allocation the same
as the initial request, but it is only applicable to takers.  
3\. Add a new response parameter groupId, applicable to both takers and
makers.  
4\. For group RFQ state,  
    1. if any allocated account is pending execution, then pending_fill  
    2. otherwise,  
        1. if any allocated account is filled, then filled  
        2. if all allocated accounts are failed, then failed

---

### Get quotes [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quotes "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-quotes")

Retrieve all Quotes that the user is a counterparty to (either as the creator or
the receiver).

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/quotes`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                                       |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId     | String | No       | RFQ ID .                                                                                                                                                                          |
| clRfqId   | String | No       | Client-supplied RFQ ID. If both <code>clRfqId</code> and <code>rfqId</code> are passed, <code>rfqId</code> will be be treated as primary identifier.                              |
| quoteId   | String | No       | Quote ID                                                                                                                                                                          |
| clQuoteId | String | No       | Client-supplied Quote ID. If both clQuoteId and quoteId are passed, quoteId will be treated as primary identifier                                                                 |
| state     | String | No       | The status of the quote. Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> or <code>failed</code>. |
| beginId   | String | No       | Start quote id the request to begin with. Pagination of data to return records newer than the requested quoteId, not including beginId                                            |
| endId     | String | No       | End quote id the request to end with. Pagination of data to return records earlier than the requested quoteId, not including endId                                                |
| limit     | String | No       | Number of results per request. The maximum is 100 which is also the default value.                                                                                                |

#### Response Parameters

| Parameter              | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                   | String           | The result code, <code>0</code> means success.                                                                                                                                                                                                                                                                                                                                                                         |
| msg                    | String           | The error message, not empty if the code is not 0.                                                                                                                                                                                                                                                                                                                                                                     |
| data                   | Array of objects | Array of objects containing the results of the Quote creation.                                                                                                                                                                                                                                                                                                                                                         |
| &gt; cTime             | String           | The timestamp the Quote was created, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                            |
| &gt; uTime             | String           | The timestamp the Quote was last updated, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                       |
| &gt; state             | String           | The status of the quote. Valid values can be <code>active</code> <code>canceled</code> <code>pending_fill</code> <code>filled</code> <code>expired</code> or <code>failed</code>.                                                                                                                                                                                                                                      |
| &gt; reason            | String           | Reasons of state. Valid values can be <code>mmp_canceled</code>.                                                                                                                                                                                                                                                                                                                                                       |
| &gt; validUntil        | String           | The timestamp the Quote expires. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                                |
| &gt; rfqId             | String           | RFQ ID.                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; clRfqId           | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.                                                                                                                                                                                                                                                                      |
| &gt; quoteId           | String           | Quote ID.                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; clQuoteId         | String           | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, only return empty string.                                                                                                                                                                                                                                                                    |
| &gt; tag               | String           | Quote tag. The block trade associated with the Quote will have the same tag.                                                                                                                                                                                                                                                                                                                                           |
| &gt; traderCode        | String           | A unique identifier of maker. Empty If the anonymous parameter of the Quote is set to be <code>true</code>.                                                                                                                                                                                                                                                                                                            |
| &gt; quoteSide         | String           | Top level direction of Quote. Its value can be buy or sell.                                                                                                                                                                                                                                                                                                                                                            |
| &gt; legs              | Array of objects | The legs of the Quote.                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt;&gt; instId        | String           | The instrument ID of the quoted leg.                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt;&gt; tdMode        | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                                                      |
| &gt;&gt; ccy           | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                                                   |
| &gt;&gt; sz            | String           | Size of the leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt;&gt; px            | String           | The price of the leg.                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt;&gt; side          | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt; posSide       | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>. |
| &gt;&gt; tgtCcy        | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are base_ccy and quote_ccy. When not specified this is equal to base_ccy by default.                                                                                                                                                                                                                          |
| &gt;&gt; tradeQuoteCcy | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                                                        |

---

### Get trades [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-trades "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-trades")

Retrieves the executed trades that the user is a counterparty to (either as the
creator or the receiver).

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/trades`

#### Request parameters

| Parameter    | Type    | Required | Description                                                                                                                                                                                                   |
| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rfqId        | String  | No       | RFQ ID .                                                                                                                                                                                                      |
| clRfqId      | String  | No       | Client-supplied RFQ ID. If both <code>clRfqId</code> and <code>rfqId</code> are passed, <code>rfqId</code> will be treated as primary identifier                                                              |
| quoteId      | String  | No       | Quote ID                                                                                                                                                                                                      |
| blockTdId    | String  | No       | Block trade ID                                                                                                                                                                                                |
| clQuoteId    | String  | No       | Client-supplied Quote ID. If both <code>clQuoteId</code> and <code>quoteId</code> are passed, <code>quoteId</code> will be treated as primary identifier                                                      |
| beginId      | String  | No       | The starting rfq id the request to begin with. Pagination of data to return records newer than the requested blockTdId, not including beginId.                                                                |
| endId        | String  | No       | The last rfq id the request to end withPagination of data to return records earlier than the requested blockTdId, not including endId.                                                                        |
| beginTs      | String  | No       | Filter trade execution time with a begin timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085                                                                                  |
| endTs        | String  | No       | Filter trade execution time with an end timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085                                                                                   |
| limit        | String  | No       | Number of results per request. The maximum is 100 which is also the default value.<br>If the number of trades in the requested range is bigger than 100, the latest 100 trades in the range will be returned. |
| isSuccessful | Boolean | No       | Whether the trade is filled successfully.<br><code>true</code>: the default value. <code>false</code>.                                                                                                        |

#### Response Parameters

| Parameter              | Type             | Description                                                                                                                                                                                     |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                   | String           | The result code, <code>0</code> means success.                                                                                                                                                  |
| msg                    | String           | The error message, not empty if the code is not 0.                                                                                                                                              |
| data                   | Array of objects | Array of objects containing the results of the block trade.                                                                                                                                     |
| &gt; cTime             | String           | The time the trade was executed. Unix timestamp in milliseconds.                                                                                                                                |
| &gt; rfqId             | String           | RFQ ID.                                                                                                                                                                                         |
| &gt; clRfqId           | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string.                                               |
| &gt; quoteId           | String           | Quote ID.                                                                                                                                                                                       |
| &gt; clQuoteId         | String           | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, only return empty string.                                             |
| &gt; blockTdId         | String           | Block trade ID.                                                                                                                                                                                 |
| &gt; tag               | String           | Trade tag. The block trade will have the tag of the RFQ or Quote it corresponds to.                                                                                                             |
| &gt; tTraderCode       | String           | A unique identifier of the Taker. Empty if the anonymous parameter of the RFQ is set to be <code>true</code>.                                                                                   |
| &gt; mTraderCode       | String           | A unique identifier of the Maker. Empty if the anonymous parameter of the Quote is set to be <code>true</code>.                                                                                 |
| &gt; isSuccessful      | Boolean          | Whether the trade is filled successfully                                                                                                                                                        |
| &gt; errorCode         | String           | Error code for unsuccessful trades.<br>It is "" for successful trade.                                                                                                                           |
| &gt; legs              | Array of objects | Legs of trade                                                                                                                                                                                   |
| &gt;&gt; instId        | String           | Instrument ID, e.g. <code>BTC-USDT-SWAP</code>                                                                                                                                                  |
| &gt;&gt; px            | String           | The price the leg executed                                                                                                                                                                      |
| &gt;&gt; sz            | String           | Size of the leg in contracts or spot.                                                                                                                                                           |
| &gt;&gt; side          | String           | The direction of the leg. Valid value can be buy or sell.                                                                                                                                       |
| &gt;&gt; fee           | String           | Fee. Negative number represents the user transaction fee charged by the platform. Positive number represents rebate.                                                                            |
| &gt;&gt; feeCcy        | String           | Fee currency                                                                                                                                                                                    |
| &gt;&gt; tradeId       | String           | Last traded ID.                                                                                                                                                                                 |
| &gt;&gt; tradeQuoteCcy | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>. |
| &gt; acctAlloc         | Array of objects | Applicable to both taker, maker                                                                                                                                                                 |
| &gt;&gt; blockTdId     | String           | Block trade ID                                                                                                                                                                                  |
| &gt;&gt; errorCode     | String           | Error code for unsuccessful trades.<br>It is "0" for successful trade.                                                                                                                          |
| &gt;&gt; acct          | String           | The name of the allocated account of the RFQ<br>Only applicable to taker, return "" to makers                                                                                                   |
| &gt;&gt; legs          | Array of objects | The allocated legs of the account.                                                                                                                                                              |
| &gt;&gt;&gt; instId    | String           | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                        |
| &gt;&gt;&gt; sz        | String           | Filled size                                                                                                                                                                                     |
| &gt;&gt;&gt; tradeId   | String           | Trade ID                                                                                                                                                                                        |
| &gt;&gt;&gt; fee       | String           | Fee                                                                                                                                                                                             |
| &gt;&gt;&gt; feeCcy    | String           | Fee currency                                                                                                                                                                                    |

Group RFQ introduction

1\. This endpoint is at parent RFQ level and contains account allocation. For
parent RFQ, we should return the actual executed size, i.e. failed execution
size should not be included in the parent RFQ level.  
2\. For account allocation, we should include both filled and failed child RFQ
but add an errorCode to indicate whether a child RFQ is filled.  
3\. Trade results will only be returned to group RFQ creator. Allocated
subaccounts and MSAs will not see trade results. Allocated accounts are expected
to get these trades through trading bills.  
4\. Trades data will only be returned after all child RFQs are execuated.  
5\. For parent RFQ isSuccessful field,  
    1. it will return true if any child RFQs are filled  
    2. otherwise, if all child RFQ fails, it will return false  
6\. Parent RFQ blockTdId or legs tradeId will be empty. However, account
allocation breakdown will be offered and blockTdId/tradeId will be attached.

---

### Get block tickers [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-tickers "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-tickers")

Retrieve the latest block trading volume in the last 24 hours.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/block-tickers`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                                              |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| instType   | String | Yes      | Instrument type<br><code>SPOT</code><br><code>SWAP</code><br><code>FUTURES</code><br><code>OPTION</code>                 |
| instFamily | String | No       | Instrument family, e.g. <code>BTC-USD</code><br>Applicable to <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                                                                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId        | String   | Instrument ID                                                                                                                                                                                                                                        |
| instType      | String   | Instrument type                                                                                                                                                                                                                                      |
| volCcy24h     | String   | 24h trading volume, with a unit of <code>currency</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of base currency.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in quote currency. |
| vol24h        | String   | 24h trading volume, with a unit of <code>contract</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in base currency.      |
| ts            | String   | Block ticker data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                            |

---

### Get block ticker [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-ticker "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-block-ticker")

Retrieve the latest block trading volume in the last 24 hours.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/block-ticker`

#### Request Parameters

| Parameter | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USD-SWAP</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                                                                                                                                      |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instId        | String   | Instrument ID                                                                                                                                                                                                                                        |
| instType      | String   | Instrument type                                                                                                                                                                                                                                      |
| volCcy24h     | String   | 24h trading volume, with a unit of <code>currency</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of base currency.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in quote currency. |
| vol24h        | String   | 24h trading volume, with a unit of <code>contract</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in base currency.      |
| ts            | String   | Block ticker data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                            |

---

### Get public multi-leg transactions of block trades [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-multi-leg-transactions-of-block-trades "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-multi-leg-transactions-of-block-trades")

Retrieves the executed block trades. The data will be updated 15 minutes after
the block trade execution.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rfq/public-trades`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beginId   | String | No       | The starting blockTdId the request to begin with. Pagination of data to return records newer than the requested <code>blockTdId</code>, not including beginId. |
| endId     | String | No       | The last blockTdId the request to end with. Pagination of data to return records earlier than the requested <code>blockTdId</code>, not including endId.       |
| limit     | String | No       | Number of results per request. The maximum is 100 which is also the default value.                                                                             |

#### Response Parameters

| Parameter        | Type             | Description                                                                                                                                            |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code             | String           | The result code, <code>0</code> means success.                                                                                                         |
| msg              | String           | The error message, not empty if the code is not 0.                                                                                                     |
| data             | Array of objects | Array of objects containing the results of the public block trade.                                                                                     |
| &gt; strategy    | String           | Option strategy, e.g. CALL_CALENDAR_SPREAD                                                                                                             |
| &gt; cTime       | String           | The time the trade was executed. Unix timestamp in milliseconds.                                                                                       |
| &gt; blockTdId   | String           | Block trade ID.                                                                                                                                        |
| &gt; legs        | Array of objects | Legs of trade                                                                                                                                          |
| &gt;&gt; instId  | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                      |
| &gt;&gt; px      | String           | The price the leg executed                                                                                                                             |
| &gt;&gt; sz      | String           | Trade quantity<br>For spot trading, the unit is base currency<br>For <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>, the unit is contract. |
| &gt;&gt; side    | String           | The direction of the leg from the Takers perspective. Valid value can be buy or sell.                                                                  |
| &gt;&gt; tradeId | String           | Last traded ID.                                                                                                                                        |

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*parent RFQ level\*\*
regardless of the subaccounts allocation. blockTdId and tradeId will be empty.

---

### Get public single-leg transactions of block trades [🔗](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-single-leg-transactions-of-block-trades "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-single-leg-transactions-of-block-trades")

Retrieve the recent block trading transactions of an instrument. Descending
order by tradeId. The data will be updated 15 minutes after the block trade
execution.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/block-trades`

#### Request Parameters

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| instId    | String | Yes      | Instrument ID, e.g. <code>BTC-USDT</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instId        | String   | Instrument ID                                                                                                                                          |
| tradeId       | String   | Trade ID                                                                                                                                               |
| px            | String   | Trade price                                                                                                                                            |
| sz            | String   | Trade quantity<br>For spot trading, the unit is base currency<br>For <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>, the unit is contract. |
| side          | String   | Trade side<br><code>buy</code><br><code>sell</code>                                                                                                    |
| fillVol       | String   | Implied volatility<br>Only applicable to <code>OPTION</code>                                                                                           |
| fwdPx         | String   | Forward price<br>Only applicable to <code>OPTION</code>                                                                                                |
| idxPx         | String   | Index price<br>Applicable to <code>FUTURES</code>, <code>SWAP</code>, <code>OPTION</code>                                                              |
| markPx        | String   | Mark price<br>Applicable to <code>FUTURES</code>, <code>SWAP</code>, <code>OPTION</code>                                                               |
| ts            | String   | Trade time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>.                                                                    |

Up to 500 most recent historical public transaction data can be retrieved.

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*child RFQ execution level\*\*
but split into a single leg. blockTdId and tradeId will be populated.

---

### Rfqs channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel")

Retrieve the RFQs sent or received by the user. Data will be pushed whenever the
user sends or receives an RFQ.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>rfqs</code>                                                                                                                                                                                                                |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>rfqs</code>                                                     |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**             | **Types**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                        | Object           | Successfully subscribed channel                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel               | String           | Channel name                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; uid                   | String           | User Identifier                                                                                                                                                                                                                                                                                                                                                                                                        |
| data                       | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; cTime                 | String           | The timestamp the RFQ was created, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                              |
| &gt; uTime                 | String           | The timestamp the RFQ was updated latest, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                       |
| &gt; state                 | String           | The status of the RFQ. Valid values can be <code>active</code>, <code>canceled</code>, <code>filled</code>, <code>expired</code> <code>traded_away</code> or <code>failed</code>.<br><code>traded_away</code> only applies to Maker.                                                                                                                                                                                   |
| &gt; counterparties        | Array of Strings | The list of counterparties traderCode the RFQ was broadcasted to.                                                                                                                                                                                                                                                                                                                                                      |
| &gt; validUntil            | String           | The timestamp the RFQ expires. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                                  |
| &gt; clRfqId               | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker. Return empty for Maker, eg. "".                                                                                                                                                                                                                                                                |
| &gt; tag                   | String           | RFQ tag. The block trade associated with the RFQ will have the same tag.                                                                                                                                                                                                                                                                                                                                               |
| &gt; flowType              | String           | Identify the type of the RFQ.<br>Only applicable to Makers, return "" for Takers                                                                                                                                                                                                                                                                                                                                       |
| &gt; traderCode            | String           | A unique identifier of taker. Empty If anonymous mode is <code>True</code>.                                                                                                                                                                                                                                                                                                                                            |
| &gt; rfqId                 | String           | RFQ ID                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; allowPartialExecution | Boolean          | Whether the RFQ can be partially filled provided that the shape of legs stays the same.<br>Valid value is <code>true</code> or <code>false</code>.<br><code>false</code> by default.                                                                                                                                                                                                                                   |
| &gt; legs                  | Array of objects | An Array of objects containing each leg of the RFQ.                                                                                                                                                                                                                                                                                                                                                                    |
| &gt;&gt; instId            | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt;&gt; tdMode            | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                                                      |
| &gt;&gt; ccy               | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                                                   |
| &gt;&gt; sz                | String           | Size of the leg.                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt;&gt; side              | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt; posSide           | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>. |
| &gt;&gt; tgtCcy            | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default.                                                                                                                                                                                   |
| &gt;&gt; tradeQuoteCcy     | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                                                        |
| &gt; groupId               | String           | Group RFQ ID<br>Only applicable to group RFQ, return "" for normal RFQ                                                                                                                                                                                                                                                                                                                                                 |
| &gt; acctAlloc             | Array of objects | Account level allocation of the RFQ<br>This is only applicable to the taker.                                                                                                                                                                                                                                                                                                                                           |
| &gt;&gt; acct              | String           | The name of the allocated account of the RFQ.                                                                                                                                                                                                                                                                                                                                                                          |
| &gt;&gt; legs              | Array of objects | The allocated legs of the account.                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt;&gt;&gt; instId        | String           | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                                                                                                                                                                                                                                               |
| &gt;&gt;&gt; sz            | String           | The allocated size of each leg.                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt;&gt; tdMode        | String           | Trade mode                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt;&gt; ccy           | String           | Margin currency                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt;&gt;&gt; posSide       | String           | Position side                                                                                                                                                                                                                                                                                                                                                                                                          |

state: pending_fill is a kind of moment state, and this channel doesn't update
it.

Group RFQ introduction

1\. allowPartialExecution field is always true for group RFQ for taker and
maker.  
2\. Add a new response parameter acctAlloc with all account allocation the same
as the initial request, but it is only applicable to takers.  
3\. Add a new response parameter groupId, applicable to both takers and
makers.  
4\. For group RFQ state,  
        1. if any allocated account is pending execution, then pending_fill  
        2. otherwise,  
                1. if any allocated account is filled, then filled  
                2. if all allocated accounts are failed, then failed

---

### Quotes channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel")

Retrieve the Quotes sent or received by the user. Data will be pushed whenever
the user sends or receives a Quote.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>quotes</code>                                                                                                                                                                                                              |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>quotes</code>                                                   |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**         | **Types**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                    | Object           | Successfully subscribed channel                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; channel           | String           | Channel name                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; uid               | String           | User Identifier                                                                                                                                                                                                                                                                                                                                                                                                        |
| data                   | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; cTime             | String           | The timestamp the Quote was created, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                            |
| &gt; uTime             | String           | The timestamp the Quote was updated latest, Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                     |
| &gt; state             | String           | The status of the quote. Valid values can be <code>active</code> <code>canceled</code> <code>filled</code> <code>expired</code> or <code>failed</code>.                                                                                                                                                                                                                                                                |
| &gt; reason            | String           | Reasons of state. Valid values can be mmp_canceled.                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; validUntil        | String           | The timestamp the Quote expires. Unix timestamp format in milliseconds.                                                                                                                                                                                                                                                                                                                                                |
| &gt; rfqId             | String           | RFQ ID.                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; clRfqId           | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, just return empty string "" for Maker.                                                                                                                                                                                                                                                         |
| &gt; quoteId           | String           | Quote ID                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; clQuoteId         | String           | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, just return empty string "" for Taker.                                                                                                                                                                                                                                                       |
| &gt; tag               | String           | Quote tag. The block trade associated with the Quote will have the same tag.                                                                                                                                                                                                                                                                                                                                           |
| &gt; traderCode        | String           | A unique identifier of maker. Empty If anonymous mode of Quote is <code>True</code>.                                                                                                                                                                                                                                                                                                                                   |
| &gt; quoteSide         | String           | Top level side of Quote. Its value can be buy or sell.                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; legs              | Array of objects | The legs of the Quote.                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt;&gt; instId        | String           | The instrument name of quoted leg.                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt;&gt; tdMode        | String           | Trade mode<br>Margin mode: <code>cross</code> <code>isolated</code><br>Non-Margin mode: <code>cash</code>.<br>If not provided, tdMode will inherit default values set by the system shown below:<br>Futures mode &amp; SPOT: <code>cash</code><br>Buy options in Futures mode and Multi-currency Margin: <code>isolated</code><br>Other cases: <code>cross</code>                                                      |
| &gt;&gt; ccy           | String           | Margin currency.<br>Only applicable to <code>cross</code> <code>MARGIN</code> orders in <code>Futures mode</code>. The parameter will be ignored in other scenarios.                                                                                                                                                                                                                                                   |
| &gt;&gt; sz            | String           | The size of the quoted leg in contracts or spot.                                                                                                                                                                                                                                                                                                                                                                       |
| &gt;&gt; px            | String           | The price of the leg.                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt;&gt; side          | String           | The direction of the leg. Valid values can be buy or sell.                                                                                                                                                                                                                                                                                                                                                             |
| &gt;&gt; posSide       | String           | Position side.<br>The default is <code>net</code> in the net mode. If not specified, return "", which is equivalent to net.<br>It can only be <code>long</code> or <code>short</code> in the long/short mode. If not specified, return "", which corresponds to the direction that opens new positions for the trade (buy =&gt; long, sell =&gt; short).<br>Only applicable to <code>FUTURES</code>/<code>SWAP</code>. |
| &gt;&gt; tgtCcy        | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default.                                                                                                                                                                                   |
| &gt;&gt; tradeQuoteCcy | String           | The quote currency used for trading. Only applicable to SPOT.<br>The default value is the quote currency of the instId, for example: for <code>BTC-USD</code>, the default is <code>USD</code>.                                                                                                                                                                                                                        |

---

### Structure block trades channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel")

Retrieve user's block trades data. All the legs in the same block trade are
included in the same update. Data will be pushed whenever there is a block trade
that the user is a counterparty for.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>struc-block-trades</code>                                                                                                                                                                                                  |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>struc-block-trades</code>                                       |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**       | **Types**        | **Description**                                                                                                                                                                                                                      |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg                  | Object           | Successfully subscribed channel                                                                                                                                                                                                      |
| &gt; channel         | String           | Channel name                                                                                                                                                                                                                         |
| &gt; uid             | String           | User Identifier                                                                                                                                                                                                                      |
| data                 | Array of objects | Subscribed data                                                                                                                                                                                                                      |
| &gt; cTime           | String           | The time the trade was executed. Unix timestamp in milliseconds.                                                                                                                                                                     |
| &gt; rfqId           | String           | RFQ ID.                                                                                                                                                                                                                              |
| &gt; clRfqId         | String           | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, just return empty string "" for Maker.                                                                       |
| &gt; quoteId         | String           | Quote ID.                                                                                                                                                                                                                            |
| &gt; clQuoteId       | String           | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, just return empty string "" for Taker.                                                                     |
| &gt; blockTdId       | String           | Block trade ID.                                                                                                                                                                                                                      |
| &gt; tag             | String           | Trade tag. The block trade will have the tag of the RFQ or Quote it corresponds to.                                                                                                                                                  |
| &gt; tTraderCode     | String           | A unique identifier of the Taker. Empty If anonymous mode of RFQ is <code>True</code>.                                                                                                                                               |
| &gt; mTraderCode     | String           | A unique identifier of the Maker. Empty If anonymous mode of Quote is <code>True</code>.                                                                                                                                             |
| &gt; isSuccessful    | Boolean          | Whether the trade is filled successfully                                                                                                                                                                                             |
| &gt; errorCode       | String           | Error code for unsuccessful trades.<br>It is "" for successful trade.                                                                                                                                                                |
| &gt; legs            | Array of objects | Legs of trade                                                                                                                                                                                                                        |
| &gt;&gt; instId      | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                                                                                                    |
| &gt;&gt; px          | String           | The price the leg executed                                                                                                                                                                                                           |
| &gt;&gt; sz          | String           | Size of the leg.                                                                                                                                                                                                                     |
| &gt;&gt; side        | String           | The direction of the leg. Valid value can be buy or sell.                                                                                                                                                                            |
| &gt;&gt; tgtCcy      | String           | Defines the unit of the “sz” attribute.<br>Only applicable to instType = SPOT.<br>The valid enumerations are <code>base_ccy</code> and <code>quote_ccy</code>. When not specified this is equal to <code>base_ccy</code> by default. |
| &gt;&gt; fee         | String           | Fee. Negative number represents the user transaction fee charged by the platform. Positive fee represents rebate.                                                                                                                    |
| &gt;&gt; feeCcy      | String           | Fee currency                                                                                                                                                                                                                         |
| &gt;&gt; tradeId     | String           | Last traded ID.                                                                                                                                                                                                                      |
| &gt; acctAlloc       | Array of objects | Applicable to both taker, maker                                                                                                                                                                                                      |
| &gt;&gt; blockTdId   | String           | Block trade ID                                                                                                                                                                                                                       |
| &gt;&gt; errorCode   | String           | Error code for unsuccessful trades.It is "0" for successful trade.                                                                                                                                                                   |
| &gt;&gt; acct        | String           | The name of the allocated account of the RFQOnly applicable to taker, return "" to makers                                                                                                                                            |
| &gt;&gt; legs        | Array of objects | The allocated legs of the account.                                                                                                                                                                                                   |
| &gt;&gt;&gt; instId  | String           | The Instrument ID of each leg. Example : "BTC-USDT-SWAP"                                                                                                                                                                             |
| &gt;&gt;&gt; sz      | String           | Filled size                                                                                                                                                                                                                          |
| &gt;&gt;&gt; tradeId | String           | Trade ID                                                                                                                                                                                                                             |
| &gt;&gt;&gt; fee     | String           | Fee                                                                                                                                                                                                                                  |
| &gt;&gt;&gt; feeCcy  | String           | Fee currency                                                                                                                                                                                                                         |

Group RFQ introduction

1\. This endpoint is at parent RFQ level and contains account allocation. For
parent RFQ, we should return the actual executed size, i.e. failed execution
size should not be included in the parent RFQ level.  
2\. For account allocation, we should include both filled and failed child RFQ
but add an errorCode to indicate whether a child RFQ is filled.  
3\. Trade results will only be returned to group RFQ creator. Allocated
subaccounts and MSAs will not see trade results. Allocated accounts are expected
to get these trades through trading bills.  
4\. Trades data will only be returned after all child RFQs are execuated.  
5\. For parent RFQ isSuccessful field,  
        1. it will return true if any child RFQs are filled  
        2. otherwise, if all child RFQ fails, it will return false  
6\. Parent RFQ blockTdId or legs tradeId will be empty. However, account
allocation breakdown will be offered and tradeId will be attached.

---

### Public structure block trades channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-public-structure-block-trades-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-public-structure-block-trades-channel")

Retrieve the recent block trades data in OKX. All the legs in the same block
trade are included in the same update. The data will be pushed 15 minutes after
the block trade execution.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>public-struc-block-trades</code>                                                                                                                                                                                           |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>public-struc-block-trades</code>                                |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**   | **Types**        | **Description**                                                                                                                                        |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg              | Object           | Successfully subscribed channel                                                                                                                        |
| &gt; channel     | String           | Channel name                                                                                                                                           |
| data             | Array of objects | Subscribed data                                                                                                                                        |
| &gt; cTime       | String           | The time the trade was executed. Unix timestamp in milliseconds.                                                                                       |
| &gt; blockTdId   | String           | Block trade ID.                                                                                                                                        |
| &gt; legs        | Array of objects | Legs of trade                                                                                                                                          |
| &gt;&gt; instId  | String           | Instrument ID, e.g. BTC-USDT-SWAP                                                                                                                      |
| &gt;&gt; px      | String           | The price the leg executed                                                                                                                             |
| &gt;&gt; sz      | String           | Trade quantity<br>For spot trading, the unit is base currency<br>For <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>, the unit is contract. |
| &gt;&gt; side    | String           | The direction of the leg from the Takers perspective. Valid value can be <code>buy</code> or <code>sell</code>.                                        |
| &gt;&gt; tradeId | String           | Last traded ID.                                                                                                                                        |
| &gt; groupId     | String           | Group RFQ ID<br>Only applicable to group RFQ, return "" for normal RFQ                                                                                 |

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*parent RFQ level\*\*
regardless of the subaccounts allocation. blockTdId and tradeId will be empty.

---

### Public block trades channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel")

Retrieve the recent block trades data by individual legs. Each leg in a block
trade is pushed in a separate update. The data will be pushed 15 minutes after
the block trade execution.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>public-block-trades</code>                                                                                                                                                                                                 |
| &gt; instId  | String           | Yes      | Instrument ID, e.g. BTC-USDT-SWAP.                                                                                                                                                                                                               |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>public-block-trades</code>                                      |
| &gt; instId  | String | Yes      | Instrument ID, e.g. BTC-USDT-SWAP.                                                    |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters** | **Types**        | **Description**                                                                                                                                        |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg            | Object           | Successfully subscribed channel                                                                                                                        |
| &gt; channel   | String           | Channel name                                                                                                                                           |
| &gt; instId    | String           | Instrument ID, e.g. BTC-USDT-SWAP.                                                                                                                     |
| data           | Array of objects | Information of the public trade object.                                                                                                                |
| &gt; instId    | String           | Instrument ID, e.g. BTC-USDT-SWAP.                                                                                                                     |
| &gt; tradeId   | String           | Trade ID, generated by counter.                                                                                                                        |
| &gt; px        | String           | The price the leg executed.                                                                                                                            |
| &gt; sz        | String           | Trade quantity<br>For spot trading, the unit is base currency<br>For <code>FUTURES</code>/<code>SWAP</code>/<code>OPTION</code>, the unit is contract. |
| &gt; side      | String           | Trade direction, buy, sell, from taker perspective.                                                                                                    |
| &gt; fillVol   | String           | Implied volatility<br>Only applicable to <code>OPTION</code>                                                                                           |
| &gt; fwdPx     | String           | Forward price<br>Only applicable to options                                                                                                            |
| &gt; idxPx     | String           | Index price<br>Applicable to <code>FUTURES</code>, <code>SWAP</code>, <code>OPTION</code>                                                              |
| &gt; markPx    | String           | Mark price<br>Applicable to <code>FUTURES</code>, <code>SWAP</code>, <code>OPTION</code>                                                               |
| &gt; ts        | String           | Filled time, Unix timestamp format in milliseconds, e.g. 1597026383085.                                                                                |

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*child RFQ execution level\*\*
but split into a single leg. blockTdId and tradeId will be populated.

---

### Block tickers channel [🔗](https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-block-tickers-channel "Direct link to: https://www.okx.com/docs-v5/en/#block-trading-websocket-public-channel-block-tickers-channel")

Retrieve the latest block trading volume in the last 24 hours.

The data will be pushed when triggered by transaction execution event. In
addition, it will also be pushed in 5 minutes interval according to subscription
granularity.

#### URL Path

/ws/v5/business

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>block-tickers</code>                                                                                                                                                                                                       |
| &gt; instId  | String           | Yes      | Instrument ID e.g. BTC-USDT-SWAP                                                                                                                                                                                                                 |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                       |
| ------------ | ------ | -------- | --------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                  |
| event        | String | Yes      | Event<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                |
| &gt; channel | String | Yes      | Channel name<br><code>block-tickers</code>                                        |
| &gt; instId  | String | Yes      | Instrument ID                                                                     |
| code         | String | No       | Error code                                                                        |
| msg          | String | No       | Error message                                                                     |
| connId       | String | Yes      | WebSocket connection ID                                                           |

#### Push data parameters

| **Parameter**  | **Type**         | **Description**                                                                                                                                                                                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg            | Object           | Successfully subscribed channel                                                                                                                                                                                                                      |
| &gt; channel   | String           | Channel name                                                                                                                                                                                                                                         |
| &gt; instId    | String           | Instrument ID                                                                                                                                                                                                                                        |
| data           | Array of objects | Subscribed data                                                                                                                                                                                                                                      |
| &gt; instId    | String           | Instrument ID                                                                                                                                                                                                                                        |
| &gt; instType  | String           | Instrument type                                                                                                                                                                                                                                      |
| &gt; volCcy24h | String           | 24h trading volume, with a unit of <code>currency</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of base currency.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in quote currency. |
| &gt; vol24h    | String           | 24h trading volume, with a unit of <code>contract</code>.<br>If it is a <code>derivatives</code> contract, the value is the number of contracts.<br>If it is <code>SPOT</code>/<code>MARGIN</code>, the value is the quantity in base currency.      |
| &gt; ts        | String           | Block ticker data generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                            |

---
