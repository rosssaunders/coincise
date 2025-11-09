# GET Subscribe Order Updates

**Source:** [Subscribe Order Updates](https://www.htx.com/en-us/opend/newApiPages/?id=7ec53c8f-7773-11ed-9966-0242ac110003)

**Category:** Websocket Account and Order

## Authentication

Required (Private Endpoint)

### orders#${symbol} ( Subscribe Order Updates)

Signature verification: No

Interface permission: Read

Rate Limit:

Interface description: An order update can be triggered by any of following: - Conditional order triggering failure (eventType=trigger) - Conditional order cancellation before trigger (eventType=deletion) - Order creation (eventType=creation) - Order matching (eventType=trade) - Order cancellation (eventType=cancellation) The field list in order update message can be various per event type, developers can design the data structure in either of two ways: - Define a data structure including fields for all event types, allowing a few of them are null - Define different data structure for each event type to include specific fields, inheriting from a common data structure which has common fields

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.huobi.pro/ws/v2 |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/v2 |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Trading symbol (wildcard \* is allowed) |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| After conditional order triggering failure |  | false |  |  |
| eventType | string | false | Event type, valid value: trigger (only applicable for conditional order) |  |
| symbol | string | false | Trading symbol |  |
| clientOrderId | string | false | Client order ID |  |
| orderSide | string | false | Order side, valid value: buy, sell |  |
| orderStatus | string | false | Order status, valid value: rejected |  |
| canceledSource | string | false | Enumeration value code of the cancellation source |  |
| canceledSourceDesc | string | false | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| errCode | int | false | Error code for triggering failure |  |
| errMessage | string | false | Error message for triggering failure |  |
| lastActTime | long | false | Order triggering failure time |  |
| After conditional order being cancelled before triggering |  | false |  |  |
| eventType | string | false | Event type, valid value: deletion (only applicable for conditional order) |  |
| symbol | string | false | Trading symbol |  |
| clientOrderId | string | false | Client order ID |  |
| orderSide | string | false | Order side, valid value: buy, sell |  |
| orderStatus | string | false | Order status, valid value: canceled |  |
| lastActTime | long | false | Order trigger time |  |
| After order is submitted |  | false |  |  |
| eventType | string | false | Event type, valid value: creation |  |
| symbol | string | false | Trading symbol |  |
| accountId | long | false | account ID |  |
| orderId | long | false | Order ID |  |
| clientOrderId | string | false | Client order ID (if any) |  |
| orderSource | string | false | Order source |  |
| orderPrice | string | false | Order price |  |
| orderSize | string | false | Order size (inapplicable for market buy order) |  |
| orderValue | string | false | Order value (only applicable for market buy order) |  |
| type | string | false | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |  |
| orderStatus | string | false | Order status, valid value: submitted |  |
| orderCreateTime | long | false | Order creation time |  |
| After order matching  |  | false |  |  |
| eventType | string | false | Event type, valid value: trade |  |
| symbol | string | false | Trading symbol |  |
| tradePrice | string | false | Trade price |  |
| tradeVolume | string | false | Trade volume |  |
| orderId | long | false | Order ID |  |
| type | string | false | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |  |
| clientOrderId | string | false | Client order ID (if any) |  |
| orderSource | string | false | Order source |  |
| orderPrice | string | false | Original order price (not available for market order) |  |
| orderSize | string | false | Original order amount (not available for buy-market order) |  |
| orderValue | string | false | Original order value (only available for buy-market order) |  |
| tradeId | long | false | Trade ID |  |
| tradeTime | long | false | Trade time |  |
| aggressor | bool | false | Aggressor or not, valid value: true (taker), false (maker) |  |
| orderStatus | string | false | Order status, valid value: partial-filled, filled |  |
| remainAmt | string | false | Remaining amount (for buy-market order it's remaining value) |  |
| execAmt | string | false | Accumulative amount (for buy-market order it is accumulative value) |  |
| totalTradeAmount | string | false | Total transaction amount--This field must be a newly completed order on December 6, 2024. The historical data is empty. |  |
| After order cancellation |  | false |  |  |
| eventType | string | false | Event type, valid value: cancellation |  |
| symbol | string | false | Trading symbol |  |
| orderId | long | false | Order ID |  |
| type | string | false | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |  |
| clientOrderId | string | false | Client order ID (if any) |  |
| orderSource | string | false | Order source |  |
| orderPrice | string | false | Original order price (not available for market order) |  |
| orderSize | string | false | Original order amount (not available for buy-market order) |  |
| orderValue | string | false | Original order value (only available for buy-market order) |  |
| orderStatus | string | false | Order status, valid value: partial-canceled, canceled |  |
| remainAmt | string | false | Remaining amount (for buy-market order it's remaining value) |  |
| execAmt | string | false | Accumulative amount (for buy-market order it is accumulative value) |  |
| totalTradeAmount | string | false | Total transaction amount--This field must be a newly completed order on December 6, 2024. The historical data is empty. |  |
| lastActTime | long | false | Last activity time |  |

#### Subscription Example

{

"action":

"sub"

"ch":

"orders#btcusdt"

}

#### Example of a Successful Subscription

{

"action":

"sub"

"code":

200

"ch":

"orders#btcusdt"

"data":{}

}

#### Example of a Data Update

`After conditional order triggering failure – { "action":"push", "ch":"orders#btcusdt", "data": { "orderSide":"buy", "lastActTime":1583853365586, "clientOrderId":"abc123", "orderStatus":"rejected", "symbol":"btcusdt", "eventType":"trigger", "errCode": 2002, "errMessage":"invalid.client.order.id (NT)" } } After conditional order being cancelled before triggering – { "action":"push", "ch":"orders#btcusdt", "data": { "orderSide":"buy", "lastActTime":1583853365586, "clientOrderId":"abc123", "orderStatus":"canceled", "symbol":"btcusdt", "eventType":"deletion" } } After order is submitted – { "action":"push", "ch":"orders#btcusdt", "data": { "orderSize":"2.000000000000000000", "orderCreateTime":1583853365586, "accountld":992701, "orderPrice":"77.000000000000000000", "type":"sell-limit", "orderId":27163533, "clientOrderId":"abc123", "orderSource":"spot-api", "orderStatus":"submitted", "symbol":"btcusdt", "eventType":"creation" } }`

#### Example of a Subscription Cancellation

{

"action":

"unsub"

"ch":

"orders#btcusdt"

}