# POST / Mass cancel order

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-mass-cancel-order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-mass-cancel-order)

### POST / Mass cancel order

Cancel all the MMP pending orders of an instrument family.

Only applicable to Option in Portfolio Margin mode, and MMP privilege is
required.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/mass-cancel`

#### Request Parameters

| Parameter    | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| instType     | String | Yes      | Instrument type   |
| `OPTION`     |
| instFamily   | String | Yes      | Instrument family |
| lockInterval | String | No       | Lock interval(ms) |

The range should be \[0, 10 000\]  
The default is 0. You can set it as "0" if you want to unlock it immediately.  
Error 54008 will be returned when placing order during lock interval, it is
different from 51034 which is thrown when MMP is triggered |

#### Response Parameters

| Parameter | Type    | Description                           |
| --------- | ------- | ------------------------------------- |
| result    | Boolean | Result of the request `true`, `false` |
