# GET Redemption

**Source:**
[Redemption](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19975bd8600)

**Category:** Earn

## Authentication

Required (Private Endpoint)

### /v1/earn/order/demand/redeem-order (Redemption)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Redemption of Earn product subscriptions cannot guarantee
real-time asset arrival. Do not rely on your assets invested in Earn products
for high-frequency trading or time-sensitive transactions to avoid unnecessary
losses.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type  | Required | Description       | Value Range | Default Value |
| --------- | ---------- | -------- | ----------------- | ----------- | ------------- |
| orderId   | Long       | true     | Order ID          |             |               |
| requestId | String     | true     | Crypto            |             |               |
| amount    | BigDecimal | true     | Redemption amount |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description                                  | Value Range |
| --------- | --------- | -------- | -------------------------------------------- | ----------- |
| code      | Integer   | true     | Response status (200: Success, 500: Failure) |             |
| message   | String    | true     | Error message                                |             |
| data      | RedeemDto | false    | Data result                                  |             |
| currency  | String    | true     | Product crypto                               |             |
| amount    | String    | true     | Subscription amount                          |             |
| orderId   | Long      | true     | Order ID                                     |             |
| status    | Integer   | true     | Redemption status: 1 - Success; 2 - Failure  |             |

Notes: Redemption arrival may be delayed. Please use with caution if conducting
high-frequency trading.

#### Request example

No data

#### Response Example

##### Success Example

No data
