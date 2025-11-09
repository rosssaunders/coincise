# GET Query information on Transfer Limit

**Source:** [Query information on Transfer Limit](https://www.htx.com/en-us/opend/newApiPages/?id=5d519a16-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_transfer\_limit (Query information on Transfer Limit)

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
| contract\_code | string | false | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| contract\_code | string | true | contract type code | "BTC-USD",... |
| transfer\_in\_max\_each | decimal | true | Max limit of a single deposit |  |
| transfer\_in\_min\_each | decimal | true | Min limit of a single deposit |  |
| transfer\_out\_max\_each | decimal | true | Max limit of a single withdrawal |  |
| transfer\_out\_min\_each | decimal | true | Min limit of a single withdrawal |  |
| transfer\_in\_max\_daily | decimal | true | Max daily limit of total deposits |  |
| transfer\_out\_max\_daily | decimal | true | Max daily limit of totally withdrawals |  |
| net\_transfer\_in\_max\_daily | decimal | true | Max daily limit of net total deposits |  |
| net\_transfer\_out\_max\_daily | decimal | true | Max daily limit of net total withdrawals |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"order\_id":

"123456"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"THETA"

"contract\_code":

"THETA-USD"

"transfer\_in\_max\_each":

301000000

"transfer\_in\_min\_each":

4

"transfer\_out\_max\_each":

30100000

"transfer\_out\_min\_each":

0.000001

"transfer\_in\_max\_daily":

3010000000

"transfer\_out\_max\_daily":

602000000

"net\_transfer\_in\_max\_daily":

1505000000

"net\_transfer\_out\_max\_daily":

301000000

}

\]

"ts":

1603870908389

}