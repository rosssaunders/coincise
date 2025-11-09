# GET Set Fee Deduction Crypto

**Source:** [Set Fee Deduction Crypto](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-198885f2846)

**Category:** Basic Information

## Authentication

Required (Private Endpoint)

### /v5/account/fee\_deduction\_currency (Set Fee Deduction Crypto)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Up to 144 requests per UID per 3 seconds. This limit is shared across all trading interfaces (72 requests/3 seconds) and query interfaces (72 requests/3 seconds) for all symbols and contracts with different expiry dates for a given UID.

Interface description: Set the cryptocurrency for deducting trading fees.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fee\_option | int | true | Enable deduction or not | 1: Yes; 0: No |  |
| deduction\_currency | String | true | Deductible crypto | HTX、TRX |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| fee\_option | int | true | Enable deduction or not | 1: Yes; 0: No |
| deduction\_currency | String | true | Deductible crypto | HTX、TRX |

#### Request example

{

"fee\_option":

"1"

"deduction\_currency":

"htx"

}

#### Response Example

##### Success Example

{

"code":

200

"message":

"Success"

"data":{

"fee\_option":

1

"deduction\_currency":

"htx"

}

"ts":

1753154995073

}