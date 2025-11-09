# GET [General] Query Top Trader Sentiment Index Function-Account

**Source:** [[General] Query Top Trader Sentiment Index Function-Account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f487-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_elite\_account\_ratio (\[General\] Query Top Trader Sentiment Index Function-Account)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |  |
| period | string | true | period | 5min, 15min, 30min, 60min,4hour,1day |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |  |
| period | string | true | period | 5min, 15min, 30min, 60min,4hour,1day |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| LIST\_START |  | false |  |  |
| buy\_ratio | decimal | true | Net long position ratio |  |
| sell\_ratio | decimal | true | Net short position ratio |  |
| ts | long | true | Time of Respond Generation |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| LIST\_START |  | false |  |  |
| buy\_ratio | decimal | true | net long accounts ratio |  |
| sell\_ratio | decimal | true | net short accounts ratio |  |
| locked\_ratio | decimal | true | locked accounts ratio |  |
| ts | long | true | Time of Respond Generation |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_elite_account_ratio?contract_code=BTC-USDT&period=5min"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"list":\[

0:{

"buy\_ratio":

0.5

"sell\_ratio":

0.5

"locked\_ratio":

0

"ts":

1638115200000

}

\]

"symbol":

"BTC"

"contract\_code":

"BTC-USDT"

"business\_type":

"swap"

"pair":

"BTC-USDT"

}

"ts":

1638169688105

}