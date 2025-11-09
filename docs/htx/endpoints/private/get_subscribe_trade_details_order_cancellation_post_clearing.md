# GET Subscribe Trade Details & Order Cancellation post Clearing

**Source:** [Subscribe Trade Details & Order Cancellation post Clearing](https://www.htx.com/en-us/opend/newApiPages/?id=7ec53dd5-7773-11ed-9966-0242ac110003)

**Category:** Websocket Account and Order

## Authentication

Required (Private Endpoint)

### trade.clearing#${symbol}#${mode} ( Subscribe Trade Details & Order Cancellation post Clearing)

Signature verification: No

Interface permission: Read

Interface description: Only update when order is in transaction or cancellation. Order transaction update is in tick by tick mode, which means, if a taker’s order matches with multiple maker’s orders, the simultaneous multiple trades will be disseminated one by one. But the update sequence of the multiple trades, may not be exactly the same as the sequence of the transactions made. Also, if an order is auto cancelled immediately just after its partial fills, for example a typical IOC order, this channel would possibly disseminate the cancellation update first prior to the trade. If user willing to receive order updates in exact same sequence with the original happening, it is recommended to subscribe order update channel orders#${symbol}.

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
| mode | int | false | Subscription mode (0 – subscribe only trade event; 1 – subscribe both trade and cancellation events; default value: 0) |  |  |

Notes:  
About optional field ‘mode’: If not filled, or filled with 0, it implicates to subscribe trade event only. If filled with 1, it implicates to subscribe both trade and cancellation events.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| eventType | string | false | Event type (trade) |  |
| symbol | string | false | Trading symbol |  |
| orderId | long | false | Order ID |  |
| tradePrice | string | false | Trade price |  |
| tradeVolume | string | false | Trade volume |  |
| orderSide | string | false | Order side, valid value: buy, sell |  |
| orderType | string | false | Order type, valid value: buy-market, sell-market,buy-limit,sell-limit,buy-ioc,sell-ioc,buy-limit-maker,sell-limit-maker,buy-stop-limit,sell-stop-limit,buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  |
| aggressor | bool | false | Aggressor or not, valid value: true, false |  |
| tradeId | long | false | Trade ID |  |
| tradeTime | long | false | Trade time, unix time in millisecond |  |
| transactFee | string | false | Transaction fee (positive value) or Transaction rebate (negative value) |  |
| feeCurrency | string | false | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |  |
| feeDeduct | string | false | Transaction fee deduction |  |
| feeDeductType | string | false | Transaction fee deduction type, valid value: ht, point |  |
| accountId | long | false | Account ID |  |
| source | string | false | Order source |  |
| orderPrice | string | false | Order price (invalid for market order) |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |
| clientOrderId | string | false | Client order ID |  |
| stopPrice | string | false | Stop price (only valid for stop limit order) |  |
| operator | string | false | Operation character (only valid for stop limit order) |  |
| orderCreateTime | long | false | Order creation time |  |
| orderStatus | string | false | Order status, valid value: filled, partial-filled |  |

Notes:  
\- The calculated maker rebate value inside ‘transactFee’ may not be paid immediately.

#### Subscription Example

{

"action":

"sub"

"ch":

"trade.clearing#btcusdt#0"

}

#### Example of a Successful Subscription

{

"action":

"sub"

"code":

200

"ch":

"trade.clearing#btcusdt#0"

"data":{}

}

#### Example of a Data Update

{

"ch":

"trade.clearing#btcusdt#0"

"data":{

"eventType":

"trade"

"symbol":

"btcusdt"

"orderId":

99998888

"tradePrice":

"9999.99"

"tradeVolume":

"0.96"

"orderSide":

"buy"

"aggressor":

true

"tradeId":

919219323232

"tradeTime":

998787897878

"transactFee":

"19.88"

"feeDeduct ":

"0"

"feeDeductType":

""

"feeCurrency":

"btc"

"accountId":

9912791

"source":

"spot-api"

"orderPrice":

"10000"

"orderSize":

"1"

"clientOrderId":

"a001"

"orderCreateTime":

998787897878

"orderStatus":

"partial-filled"

}

}

#### Example of a Subscription Cancellation

{

"action":

"unsub"

"ch":

"trade.clearing#btcusdt#0"

}