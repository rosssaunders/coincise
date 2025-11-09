# GET [General] Query Swap Index Price Information

**Source:** [[General] Query Swap Index Price Information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb80424-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_index (\[General\] Query Swap Index Price Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-insenstive."BTC-USDT","ETH-USDT"... |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| contract\_code | string | true | contract code | "BTC-USDT","ETH-USDT"... |
| index\_price | decimal | true | Index Price |  |
| index\_ts | Long | true | Index time |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_index?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"index\_price":

13076.32986568

"index\_ts":

1603694592011

"contract\_code":

"BTC-USDT"

}

\]

"ts":

1603694596400

}