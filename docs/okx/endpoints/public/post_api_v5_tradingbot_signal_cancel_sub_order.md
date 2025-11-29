# POST /api/v5/tradingBot/signal/cancel-sub-order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-cancel-sub-order](https://www.okx.com/docs-v5/en/#order-book-trading-signal-bot-trading-post-cancel-sub-order)

### POST / Cancel sub order

Cancel an incomplete order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/tradingBot/signal/cancel-sub-order`

#### Request Parameters

| Parameter   | Type   | Required | Description                       |
| ----------- | ------ | -------- | --------------------------------- |
| algoId      | String | Yes      | Algo ID                           |
| instId      | String | Yes      | Instrument ID, e.g. BTC-USDT-SWAP |
| signalOrdId | String | Yes      | Order ID                          |

#### Response Parameters

| **Parameter**  | **Type**         | **Description**                                            |
| -------------- | ---------------- | ---------------------------------------------------------- |
| code           | String           | The result code, `0` means success                         |
| msg            | String           | The error message, empty if the code is 0                  |
| data           | Array of objects | Array of objects contains the response results             |
| \> signalOrdId | String           | Order ID                                                   |
| \> sCode       | String           | The code of the event execution result, `0` means success. |
| \> sMsg        | String           | Rejection or success message of event execution.           |

Cancel order returns with sCode equal to 0. It is not strictly considered that
the order has been canceled. It only means that your cancellation request has
been accepted by the system server. The result of the cancellation is subject to
the state by get sub orders endpoint.
