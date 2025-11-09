# GET copytrading account transfer

**Source:** [copytrading account transfer](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126cc4438)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/account\_transfer (copytrading account transfer)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used for fund transfer between documentary accounts and contract linear-swap Taccounts.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| amount | String | true |  |  |  |
| type | Integer | true | 1: Contract U base account to copy account \\ n2: Copy account to contract U base account \\ n3: Spot account to copy account \\ n4: Copy account to spot account |  |  |
| currency | String | true |  |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| data | boolean | true |  |  |
| code | Long | true |  |  |

#### Request example

{

"amount":

1

"type":

1

"currency":

"USDT"

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"f4275696705f404fb910248db70b745b"

"success":

true

}