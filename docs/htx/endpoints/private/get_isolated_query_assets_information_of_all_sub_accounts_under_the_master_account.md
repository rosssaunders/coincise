# GET [Isolated] Query assets information of all sub-accounts under the master account

**Source:** [[Isolated] Query assets information of all sub-accounts under the master account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb820d9-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_sub\_account\_list (\[Isolated\] Query assets information of all sub-accounts under the master account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is next | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| sub\_uid | long | true | sub-account UID |  |
| LIST\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USDT" |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| risk\_rate | decimal | true | margin rate |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:  
Only return data for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission).

#### Request example

{

"contract\_code":

"BTC-USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"sub\_uid":

123456789

"list":\[

0:{

"symbol":

"BTC"

"margin\_balance":

20

"liquidation\_price":

NULL

"risk\_rate":

NULL

"contract\_code":

"BTC-USDT"

"margin\_asset":

"USDT"

"margin\_mode":

"isolated"

"margin\_account":

"BTC-USDT"

}

\]

}

\]

"ts":

1603698380336

}