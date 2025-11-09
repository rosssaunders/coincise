# GET Subscribe to data of execution changes

**Source:** [Subscribe to data of execution changes](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195a35275ff)

**Category:** Private Channels

## Authentication

Required (Private Endpoint)

### trade $contract\_code (Subscribe to data of execution changes)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket private order transaction push interface (API KEY verification is required) A UID can establish up to 30 private order transaction push WS links at the same time. The user only needs to maintain one order push WS link on one product (including all periodic contracts of the product). A single link is 50 requests per second, and a single IP link is 100 requests per second. Note: The frequency limit of the order push WS is separate from the frequency limit of the user's RESTFUL private interface and does not affect each other.

Interface description: When execution happens, the following messages will be sent.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws/v5/notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws/v5/notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Must. Use sub or unsub. |
| cid | string | Optional. The unique ID of the client. |
| topic | string | Must. trade\_$contract\_code |
| contract\_code | string | Must. Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| \* | \* | yes |
| \* | contract\_code1 | no |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Symbol. Case-insensitive | All: \* (Delivery and perpetual); Perpetual: "BTC-USDT"...; Delivery: "BTC-USDT-210625"... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | String | true | Operation name, with a fixed value of "notify" |  |
| topic | String | true | Push topic |  |
| ts | long | true | Timestamp of server response |  |
| uid | String | true | User UID |  |
| DATA\_START |  | false |  |  |
| contract\_code | String | true | A trading pairconsisting of two currencies: base currency and quote currency |  |
| order\_id | String | true | Order ID |  |
| id | String | true | Trade ID |  |
| client\_order\_id | String | true | The order ID you entered when placing an order. The ID will not be returned if it is not provided. |  |
| side | String | true | Trade side | buy; sell |
| role | String | true | Execution Role: Maker, Taker |  |
| trade\_price | String | true | Execution price |  |
| trade\_volume | String | true | Execution amount (Cont) |  |
| trade\_turnover | String | true | Total value executed (= Execution amount \* Face value \* Execution price) |  |
| created\_time | String | true | Creation time |  |
| updated\_time | String | true | Update time, defaulting to execution time |  |
| contract\_type | String | true | Contract type | swap: Perpetual; this\_week: Weekly; next\_week: Bi-weekly; quarter: Quarterly; next\_quarter: Bi-quarterly |
| DATA\_START |  | false |  |  |
| position\_side | String | true | Position direction | "long":，"short"，“both” |

#### Subscription Example

{

"op":

"sub"

"cid":

"ovILlciUtO"

"topic":

"trade"

"contract\_code":

"\*"

}

#### Example of a Successful Subscription

{

"op":

"auth"

"cid":

"ovILlciUtO"

"type":

"api"

"err-code":

0

"ts":

1734575734395

"data":{

"user-id":

"41312018"

}

}

#### Example of a Data Update

`{ "op":"notify" "topic":"trade" "contract_code":"SHIB-USDT" "ts":1749468764319 "uid":"502061937" "data":[ 0:{ "direction":"sell" "position_side":"short" "id":"100005308993680-1381717672952373248-1" "contract_code":"SHIB-USDT" "contract_type":"swap" "order_id":1381717672952373200 "trade_id":100005308993680 "trade_volume":"1" "trade_price":"0.000012686" "trade_turnover":"0.012686" "role":"taker" "client_order_id":"111111222267" "created_time":1749468764304 "updated_time":1749468764315 } ] }`

#### Example of a Subscription Cancellation

No data