# GET Transfer Asset from Cross Margin Account to Spot Trading Account（Cross）

**Source:** [Transfer Asset from Cross Margin Account to Spot Trading Account（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4c47a-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/transfer-out (Transfer Asset from Cross Margin Account to Spot Trading Account（Cross）)

Request type: POST

Signature verification: No

Interface permission: Trade

Interface description: This endpoint transfers specific asset from spot trading account to cross margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Currency |  |  |
| amount | string | false | Transfer amount |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | integer | false | Transfer id |  |

#### Request example

{

"currency":

"eth"

"amount":

"1.0"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

1000

}