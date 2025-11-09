# GET [Cross] Query Information On Transfer Limit

**Source:** [[Cross] Query Information On Transfer Limit](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83475-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_cross\_transfer\_limit (\[Cross\] Query Information On Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account, return all margin account info when null | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| transfer\_in\_max\_each | decimal | true | max limit of a single deposit |  |
| transfer\_in\_min\_each | decimal | true | min limit of a single deposit |  |
| transfer\_out\_max\_each | decimal | true | max limit of a single withdrawal |  |
| transfer\_out\_min\_each | decimal | true | min limit of a single withdrawal |  |
| transfer\_in\_max\_daily | decimal | true | max daily limit of total deposits |  |
| transfer\_out\_max\_daily | decimal | true | max daily limit of totally withdrawals |  |
| net\_transfer\_in\_max\_daily | decimal | true | max daily limit of net total deposits |  |
| net\_transfer\_out\_max\_daily | decimal | true | max daily limit of net total withdrawals |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"margin\_account":

"USDT"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"transfer\_in\_max\_each":

1000000000000000000

"transfer\_in\_min\_each":

0.0001

"transfer\_out\_max\_each":

1000000000000000000

"transfer\_out\_min\_each":

0.0001

"transfer\_in\_max\_daily":

900000001000000000

"transfer\_out\_max\_daily":

900000100000000000

"net\_transfer\_in\_max\_daily":

900000000100000000

"net\_transfer\_out\_max\_daily":

123456789012345680

"margin\_account":

"USDT"

"margin\_mode":

"cross"

}

\]

"ts":

1606964432217

}