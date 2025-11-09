# GET Spot Cancel all orders

**Source:**
[Spot Cancel all orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-193afaf3b53)

**Category:** Trading

## Authentication

Required (Private Endpoint)

### v1/order/cancelAllOrders (Spot Cancel all orders)

Request type: GET

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 times/2s

Interface description: All spot orders can be cancelled through this interface.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                | Value Range | Default Value |
| --------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol    | string    | false    | The trading symbol to trade, you can use "," to separate batches, and if it is empty, all trading pairs will be cancelled. |             |               |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |
| status    | string    | false    | status      |             |

#### Request example

{

"symbol":

"btcusdt"

}

#### Response Example

##### Success Example

{

"status":

"ok"

}
