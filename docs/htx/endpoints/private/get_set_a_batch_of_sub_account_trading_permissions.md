# GET Set a Batch of Sub-Account Trading Permissions

**Source:** [Set a Batch of Sub-Account Trading Permissions](https://www.htx.com/en-us/opend/newApiPages/?id=5d5188f1-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_sub\_auth (Set a Batch of Sub-Account Trading Permissions)

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
| sub\_uid | string | true | sub-account uid (multiple uids are separated by ",", and one time 10 sub uid at most) |  |  |
| sub\_auth | int | true | sub auth, 1:enable, 0:disable |  |  |

Notes:  
When enable the transaction authority on the sub-account for the first time, deemed to agree to access the contract market.  
If the sub-account trading permission has been enable, the interface will directly return success when request to enable again; if the sub-account trading permission has been disable, the interface will directly return success when request to disable again;

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| DATA\_START |  | true |  |  |
| ERRORS\_START | object array | true |  |  |
| sub\_uid | string | true | the list of sub uid which failed |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error msg |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | he list of sub uid which successes |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USD"

"sub\_uid":

321456

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"sub\_uid":

"1234567"

"err\_code":

1010

"err\_msg":

"Account doesnt exist."

}

\]

"successes":

"146190163"

}

"ts":

1612495818455

}