# GET [General] Subscribe market BBO data push

**Source:**
[[General] Subscribe market BBO data push](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7c802-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Market Interface

## Authentication

Required (Private Endpoint)

### market.$contract_code.bbo (\[General\] Subscribe market BBO data push)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Subscription Address

| Environment                         | Address                           |
| ----------------------------------- | --------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws  |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |

#### Data Update

| Parameter    | Data Type | Required | Description                                                      | Value Range |
| ------------ | --------- | -------- | ---------------------------------------------------------------- | ----------- |
| ch           | string    | true     | Data channel, Format： market.$contract_code.bbo                 |             |
| ts           | long      | true     | Timestamp of Respond Generation, Unit: Millisecond               |             |
| TICK_START   | object    | true     |                                                                  |             |
| ch           | string    | true     | Data channel, Format： market.$contract_code.bbo                 |             |
| mrid         | string    | true     | Order ID                                                         |             |
| id           | long      | true     | tick ID                                                          |             |
| ask          | array     | false    | Best Ask Quotation,\[price(Ask price), vol(Ask order (cont.) )\] |             |
| bid          | array     | false    | Best Bid Quotation,\[price(Bid price), vol(Bid order(Cont.))\]   |             |
| version      | long      | true     | version ID.                                                      |             |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond                    |             |
| \\TICK_START |           | false    |                                                                  |             |

Notes:  
When any one of the buy_one price, buy_one quantity, sell_one price and sell_one
quantity changes, the system will push BBO price.  
If there are multiple changes in the price or quantity of buy_one or sell_one at
the same time, the system will push the latest price and quantity of buy_one and
sell one with the intermediate data discarded.  
When the data received by the client is failed or delayed, the old data buffer
in the server will be discarded.The latest BBO will be pushed.  
version（version number). Use match id directly to ensure it is globally unique
and the value of version number pushed is the largest.

#### Subscription Example

{

"sub":

"market.BTC-USDT.bbo"

"id":

"id8"

}

#### Example of a Successful Subscription

{

"id":

"id8"

"status":

"ok"

"subbed":

"market.BTC-USDT.bbo"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.bbo"

"ts":

1603707934525

"tick":{

"mrid":

131599726

"id":

1603707934

"bid":\[

0

:

13064

1

:

38

\]

"ask":\[

0

:

13072.3

1

:

205

\]

"ts":

1603707934525

"version":

131599726

"ch":

"market.BTC-USDT.bbo"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.bbo"

"id":

"id8"

}
