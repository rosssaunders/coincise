# GET Query Swap Index Price Information

**Source:** [Query Swap Index Price Information](https://www.htx.com/en-us/opend/newApiPages/?id=5d517062-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_index (Query Swap Index Price Information)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-insenstive."BTC-USD","ETH-USD"... |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| data<list> |  | false |  |  |
| contract\_code | string | true | contract\_code | "BTC-USD","ETH-USD"... |
| index\_price | decimal | true | Index Price |  |
| index\_ts | Long | true | Index time |  |
| LIST\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_insurance_fund?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"index\_price":

13764.0725

"index\_ts":

1603851876012

"contract\_code":

"BTC-USD"

}

\]

"ts":

1603851883506

}