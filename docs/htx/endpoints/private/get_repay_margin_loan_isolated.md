# GET Repay Margin Loan（Isolated）

**Source:**
[Repay Margin Loan（Isolated）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4d7f0-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/margin/orders/{order-id}/repay ( Repay Margin Loan（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint repays margin loan with your asset in your
margin account.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                         | Value Range | Default Value |
| --------- | --------- | -------- | ----------------------------------- | ----------- | ------------- |
| order-id  | string    | false    | The amount of currency to repay     |             |               |
| amount    | string    | false    | Loan order ID (written in url path) |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description     | Value Range |
| --------- | --------- | -------- | --------------- | ----------- |
| data      | integer   | false    | Margin order id |             |

#### Request example

{

"amount":

"1.0"

}

#### Response Example

##### Success Example

{

"data":

1000

}
