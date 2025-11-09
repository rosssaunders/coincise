# GET Set Asset Mode

**Source:** [Set Asset Mode](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195886fed64)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v5/account/asset\_mode (Set Asset Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 requests per 10 seconds

Interface description: This interface allows users to set the current asset mode.

#### Request Address

| Environment | Address |
| --- | --- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| assets\_mode | int | true | Multi-Assets Collateral | 0: Single-asset collateral mode; 1: Multi-assets collateral mode |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| assets\_mode | int | true | Multi-Assets Collateral | 0: Single-asset collateral mode; 1: Multi-assets collateral mode |

#### Request example

{

"assets\_mode":

"1"

}

#### Response Example

##### Success Example

{

"code":

200

"msg":

"Success"

"data":{

"assets\_mode":

1

}

"ts":

1547521135713

}