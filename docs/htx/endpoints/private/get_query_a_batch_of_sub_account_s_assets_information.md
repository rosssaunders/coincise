# GET Query a Batch of Sub-Account's Assets Information

**Source:** [Query a Batch of Sub-Account's Assets Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d518b8a-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_sub\_account\_info\_list (Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | "BTC-USD"... ,if not filled in return all |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20，50 at most |  |  |

Notes:  
Only return data of sub-accounts that have agreed to access the contract market.  
By default, the list of sub-accounts is in ascending order according to the time when agree to access the contract market, and the earlier the agreed time, the first the position

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | object | true |  |  |
| SUB\_LIST\_START | object array | true |  |  |
| sub\_uid | long | true | sub uid |  |
| ACCOUNT\_INFO\_LIST\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USD" ... |
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

"BTC-USD"

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

"TRX"

"margin\_balance":

50

"liquidation\_price":

NULL

"risk\_rate":

NULL

"contract\_code":

"TRX-USD"

}

\]

}

\]

}

"ts":

1612496369035

}