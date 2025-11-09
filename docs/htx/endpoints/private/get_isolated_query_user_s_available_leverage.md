# GET [Isolated] Query user’s available leverage

**Source:** [[Isolated] Query user’s available leverage](https://www.htx.com/en-us/opend/newApiPages/?id=8cb82e6c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_available\_level\_rate (\[Isolated\] Query user’s available leverage)

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
| contract\_code | string | false | Contract code, if not filled in, the actual available leverage of all contracts will be returned by default | “BTC-USDT”... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | contract code | "BTC-USDT" |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| available\_level\_rate | string | true | available level rate,splited by ',' | "1,5,10" |
| DATA\_END |  | false |  |  |
| ts | long | true | Response generation time point, unit: millisecond |  |

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

"contract\_code":

"BTC-USDT"

"margin\_mode":

"isolated"

"available\_level\_rate":

"1,2,3,5"

}

\]

"ts":

1603699467348

}