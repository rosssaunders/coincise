# GET Request a Margin Loan（Cross）

**Source:**
[Request a Margin Loan（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4c1ac-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/orders ( Request a Margin Loan（Cross）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint places an order to apply for a margin loan.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                    | Value Range | Default Value |
| --------- | --------- | -------- | -------------------------------------------------------------- | ----------- | ------------- |
| currency  | string    | false    | The currency to borrow                                         |             |               |
| amount    | string    | false    | The amount of currency to borrow (precision: 3 decimal places) |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description     | Value Range |
| --------- | --------- | -------- | --------------- | ----------- |
| status    | string    | false    | status          |             |
| data      | integer   | false    | Margin order id |             |

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
