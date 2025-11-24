# POST /api/v5/trade/cancel-batch-orders

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-cancel-multiple-orders](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-cancel-multiple-orders)

### POST / Cancel multiple orders

Cancel incomplete orders in batches. Maximum 20 orders can be canceled per
request. Request parameters should be passed in the form of an array.

#### Rate Limit: 300 orders per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

Unlike other endpoints, the rate limit of this endpoint is determined by the
number of orders. If there is only one order in the request, it will consume the
rate limit of \`Cancel order\`.

#### HTTP Request

`POST /api/v5/trade/cancel-batch-orders`

#### Request Parameters

| Parameter                                                                          | Type   | Required    | Description                               |
| ---------------------------------------------------------------------------------- | ------ | ----------- | ----------------------------------------- |
| instId                                                                             | String | Yes         | Instrument ID, e.g. `BTC-USDT`            |
| ordId                                                                              | String | Conditional | Order ID                                  |
| Either `ordId` or `clOrdId` is required. If both are passed, `ordId` will be used. |
| clOrdId                                                                            | String | Conditional | Client Order ID as assigned by the client |

#### Response Parameters

| **Parameter**                              | **Type**         | **Description**                                                                                                                    |
| ------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| code                                       | String           | The result code, `0` means success                                                                                                 |
| msg                                        | String           | The error message, empty if the code is 0                                                                                          |
| data                                       | Array of objects | Array of objects contains the response results                                                                                     |
| \> ordId                                   | String           | Order ID                                                                                                                           |
| \> clOrdId                                 | String           | Client Order ID as assigned by the client                                                                                          |
| \> ts                                      | String           | Timestamp when the order request processing is finished by our system, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| \> sCode                                   | String           | The code of the event execution result, `0` means success.                                                                         |
| \> sMsg                                    | String           | Rejection message if the request is unsuccessful.                                                                                  |
| inTime                                     | String           | Timestamp at REST gateway when the request is received, Unix timestamp format in microseconds, e.g. `1597026383085123`             |
| The time is recorded after authentication. |
| outTime                                    | String           | Timestamp at REST gateway when the response is sent, Unix timestamp format in microseconds, e.g. `1597026383085123`                |
