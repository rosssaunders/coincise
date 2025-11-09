# GET Repay Margin Loan（Cross）

**Source:** [Repay Margin Loan（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4c26f-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/orders/{order-id}/repay ( Repay Margin Loan（Cross）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint repays margin loan with you asset in your margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | Loan order ID (written in url path) |  |  |
| amount | string | false | The amount of currency to repay |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tatus | string | false | status |  |
| data | null | false |  |  |

#### Request example

{

"amount":

"1.0"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

NULL

}