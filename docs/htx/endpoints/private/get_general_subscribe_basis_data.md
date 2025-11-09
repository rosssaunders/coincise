# GET [General] Subscribe Basis Data

**Source:**
[[General] Subscribe Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7d374-77b5-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.basis.$period.$basis_price_type (\[General\] Subscribe Basis Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment                         | Address                     |
| ----------------------------------- | --------------------------- |
| Online                              | wss://api.hbdm.com/ws_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws_index  |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter        | Data Type | Required | Description                                      | Value Range                                                                                                                      | Default Value            |
| ---------------- | --------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| contract_code    | string    | true     | contract code                                    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ                        |                          |
| period           | string    | true     | kline period                                     | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon                                                                                   |                          |
| basis_price_type | string    | false    | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |

#### Data Update

| Parameter      | Data Type    | Required | Description | Value Range |
| -------------- | ------------ | -------- | ----------- | ----------- |
| ch             | string       | false    |             |             |
| TICK_START     | object array | false    |             |             |
| id             | long         | false    |             |             |
| contract_price | string       | false    |             |             |
| index_price    | string       | false    |             |             |
| basis          | string       | false    |             |             |
| basis_rate     | string       | false    |             |             |
| TICK_END       |              | false    |             |             |
| ts             | long         | false    |             |             |

#### Subscription Example

{

"sub":

"market.BTC-USDT.basis.1min.open"

"id":

"id7"

}

#### Example of a Successful Subscription

{

"id":

"id7"

"status":

"ok"

"subbed":

"market.BTC-USDT.basis.1min.open"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USDT.basis.1min.open"

"ts":

1617164081549

"tick":{

"id":

1617164040

"index_price":

"58686.78333333333"

"contract_price":

"58765"

"basis":

"78.21666666667"

"basis_rate":

"0.0013327816285723049700163397705562309"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USDT.basis.1min.open"

"id":

"id7"

}
