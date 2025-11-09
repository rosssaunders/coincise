# GET Transfer between master and sub account

**Source:** [Transfer between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=5d519bd9-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_master\_sub\_transfer (Transfer between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | long | true | uid of sub account |  |  |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |  |
| amount | decimal | true | transfer amount |  |  |
| type | string | true | transfer type | "master\_to\_sub" or "sub\_to\_master" |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |

Notes:  
the rate limit between the master account and each subaccount is 10 times/ minute  
The client\_order\_id is valid in 8 hours only, that is the user cannot use the same client\_order\_id beyonds one times for the same transfer path (for example, transfer currency from master account to sub-account using client\_order\_id=1, and you can't do that transfe currency from master account to sub-account using client\_order\_id=1 in the next time; but you can transfer currency from sub-account to master account using client\_order\_id=1).

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| ts | long | true | response timestamp，millionseconds |  |
| DATA\_START | object | true |  |  |
| order\_id | string | true | order id |  |
| client\_order\_id | long | false | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"transfer\_type":

"34"

"create\_date":

30

"page\_index":

1

"page\_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"order\_id":

"771036657058648064"

}

"ts":

1603871064225

}