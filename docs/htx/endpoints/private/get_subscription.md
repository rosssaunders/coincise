# GET Subscription

**Source:**
[Subscription](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19975b68f61)

**Category:** Earn

## Authentication

Required (Private Endpoint)

### /v1/earn/order/demand/add (Subscription)

Request type: POST

Signature verification: Yes

Interface permission: Trade

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type  | Required | Description                                                                                                                                        | Value Range | Default Value |
| --------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| id        | Long       | true     | Project ID                                                                                                                                         |             |               |
| amount    | BigDecimal | true     | Subscription amount                                                                                                                                |             |               |
| requestId | String     | false    | Idempotent ID. It is recommended to use the Snowflake ID to ensure that the operation has the same effect whether executed once or multiple times. |             |               |

#### Response Parameter

| Parameter | Data Type            | Required | Description                                                                                                                                                                | Value Range |
| --------- | -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| code      | Integer              | true     | Response status (200: Success, 500: Failure)                                                                                                                               |             |
| message   | String               | true     | Error message                                                                                                                                                              |             |
| data      | OrderSubscribeResDTO | false    | Data result                                                                                                                                                                |             |
| currency  | String               | true     | Product crypto                                                                                                                                                             |             |
| amount    | String               | true     | Subscription amount                                                                                                                                                        |             |
| orderId   | Long                 | true     | Order ID                                                                                                                                                                   |             |
| status    | Integer              | true     | Status: 1 - Success; 2 - Failure; 3 - Processing (Clients do not need to retry but need to pay attention to the order list to see whether the subscription is successful.) |             |

#### Request example

No data

#### Response Example

##### Success Example

No data
