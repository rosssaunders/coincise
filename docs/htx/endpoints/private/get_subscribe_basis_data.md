# GET Subscribe Basis Data

**Source:**
[Subscribe Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d5150a9-77b6-11ed-9966-0242ac110003)

**Category:** WebSocket Index and Basis Interface

## Authentication

Required (Private Endpoint)

### market.$contract\_code.basis.$period.$basis_price_type (Subscribe Basis Data)

Signature verification: Yes

Interface permission: Read

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
| contract_code    | string    | true     | contract code                                    | Case-Insenstive.Both uppercase and lowercase are supported..e.g."BTC-USD"                                                        |                          |
| period           | string    | true     | kline period                                     | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon                                                                           |                          |
| basis_price_type | string    | false    | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/3："average" | Using open price default |

#### Data Update

| Parameter      | Data Type    | Required | Description                                   | Value Range |
| -------------- | ------------ | -------- | --------------------------------------------- | ----------- |
| ch             | string       | false    | Data channel，Format： market.period          |             |
| TICK_START     | object array | false    |                                               |             |
| id             | long         | false    | unique id                                     |             |
| contract_price | string       | false    | contract last price                           |             |
| index_price    | string       | false    | index price                                   |             |
| basis          | string       | false    | basis=contract_price - index_price            |             |
| basis_rate     | string       | false    | basis_rate=basis/index_price                  |             |
| TICK_END       |              | false    |                                               |             |
| ts             | long         | false    | Time of Respond Generation, Unit: Millisecond |             |

#### Subscription Example

{

"req":

"market.btc-usd.basis.1min.open"

"id":

"id4"

"from":

1579247342

"to":

1579247342

}

#### Example of a Successful Subscription

{

"id":

"id7"

"status":

"ok"

"subbed":

"market.BTC-USD.basis.1min.open"

"ts":

1489474081631

}

#### Example of a Data Update

{

"ch":

"market.BTC-USD.basis.1min.open"

"ts":

1603877511008

"tick":{

"id":

1603877460

"index_price":

"13649.7075"

"contract_price":

"13651.2"

"basis":

"1.4925"

"basis_rate":

"0.0001093430024049965905862817939505297"

}

}

#### Example of a Subscription Cancellation

{

"unsub":

"market.BTC-USD.basis.1min.open"

"id":

"id7"

}
