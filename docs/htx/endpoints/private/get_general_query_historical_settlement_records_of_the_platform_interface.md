# GET [General] Query historical settlement records of the platform interface

**Source:** [[General] Query historical settlement records of the platform interface](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f323-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_settlement\_records (\[General\] Query historical settlement records of the platform interface)

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
| contract\_code | string | true | Contract Code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| start\_time | long | false | Start time（timestamp，unit: millisecond） | Value range: \[(Current time minus 90 days), Current time\] ，default current time minus 90 days |  |
| end\_time | long | false | End time（timestamp，unit: millisecond） | Value range: (start\_time, current time)，default current time |  |
| page\_index | int | false | Page, default page 1 if not filled |  |  |
| page\_size | int | false | Page items, default 20, shall not exceed 50 |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC", "ETH" ... |
| volume | decimal | true | Position quantity(volume). Sum of both buy and sell sides |  |
| amount | decimal | true | Position quantity(Currency). Sum of both buy and sell sides |  |
| contract\_code | string | true | Contract Code | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| value | decimal | true | Total position volume（The unit is the denominated currency of the contract. e.g:USDT） |  |
| trade\_amount | decimal | true | trading volume within the last 24 hours (coin). Sum of both buy and sell sides |  |
| trade\_volume | decimal | true | trading volume within the last 24 hours (cont). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | trading amount within the last 24 hours. Sum of both buy and sell sides |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_settlement_records?contract_code=BTC-USDT&start_time=xxxxx&end_time=xxx&page_index=xxx&page_size=100"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

1

"current\_page":

1

"total\_size":

12

"settlement\_record":\[

0:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211203"

"settlement\_time":

1638518400000

"clawback\_ratio":

0

"settlement\_price":

56792.3

"settlement\_type":

"delivery"

"business\_type":

"futures"

"pair":

"BTC-USDT"

}

1:{

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-211203"

"settlement\_time":

1638489600000

"clawback\_ratio":

0

"settlement\_price":

57028.6

"settlement\_type":

"settlement"

"business\_type":

"futures"

"pair":

"BTC-USDT"

}

\]

}

"ts":

1638756873768

}