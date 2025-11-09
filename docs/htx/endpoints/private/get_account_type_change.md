# GET Account Type Change

**Source:** [Account Type Change](https://www.htx.com/en-us/opend/newApiPages/?id=10000082-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap\_switch\_account\_type (Account Type Change)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Before calling this API, it is necessary to ensure that the USTD-M contract has no positions and pending orders. When changing from a non-unified account (cross-margin account) to a unified account, assets must be transferred from the isolated-margin account to the cross-margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account\_type | int | true | Account type | 1: Non-unified account (cross-margin and isolated-margin account);2: Unified account |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | string | true | Result description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| account\_type | int | true | Account type | 1: Non-unified account (cross-margin and isolated-margin account);2: unified account |
| DATA\_END |  | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":{

"account\_type":

1

}

"ts":

1668057324200

}