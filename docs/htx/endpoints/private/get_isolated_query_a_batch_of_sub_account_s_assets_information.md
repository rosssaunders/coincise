# GET [Isolated]Query a Batch of Sub-Account's Assets Information

**Source:** [[Isolated]Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb822f5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_sub\_account\_info\_list (\[Isolated\]Query a Batch of Sub-Account's Assets Information)

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
| contract\_code | string | false | contract code | "BTC-USDT"... ,if not filled, return all |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20，50 at most |  |  |

Notes:  
Only return data of sub-accounts that have agreed to access the contract market.  
By default, the list of sub-accounts is in ascending order according to the time when agree to access the contract market, and the earlier the agreed time, the first the position

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | object | true |  |  |
| SUB\_LIST\_START | object array | true |  |  |
| sub\_uid | long | true | sub uid |  |
| ACCOUNT\_INFO\_LIST\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_asset | string | true | margin asset) |  |
| margin\_balance | decimal | true | margin balance |  |
| liquidation\_price | decimal | true | liquidation price |  |
| risk\_rate | decimal | true | risk rate |  |
| ACCOUNT\_INFO\_LIST\_END |  | false |  |  |
| SUB\_LIST\_END |  | false |  |  |
| current\_page | int | true | current page |  |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"page\_index":

1

"page\_size":

100

}

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

1

"sub\_list":\[

0:{

"sub\_uid":

123456789

"account\_info\_list":\[

0:{

"symbol":

"BTC"

"margin\_balance":

0

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

}

"ts":

1612504756853

}