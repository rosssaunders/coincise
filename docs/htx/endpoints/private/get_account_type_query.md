# GET Account type query

**Source:** [Account type query](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e9bf-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_unified\_account\_type (Account type query)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface is used for the account type inquired by the client. Currently, U-margined contracts have unified account and non-unified account (cross-margin and isolated-margin account). The assets of the unified account type are placed in one USDT account, and the assets of the cross-margin isolated account type are placed in different currency pairs. The unified account type is the latest upgrade and currently does not support API ordering. If you need to use the API to place an order, please switch the account type to a non-unified account via /linear-swap-api/v3/swap\_switch\_account\_type.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| account\_type | int | true | account type | 1:Non-unified account (cross-margin and isolated-margin account) 2:Unified account |
| DATA\_END |  | true |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v3/swap_unified_account_type"`

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":{

"account\_type":

2

}

"ts":

1668057324200

}