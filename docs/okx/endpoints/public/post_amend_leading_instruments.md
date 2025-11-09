# POST / Amend leading instruments

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-leading-instruments](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-amend-leading-instruments)

### POST / Amend leading instruments

The leading trader can amend current leading instruments, need to set initial
leading instruments while applying to become a leading trader.  
All non-leading instruments can't have position or pending orders for the
current request when setting non-leading instruments as leading instruments.

#### Rate limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/copytrading/set-instruments`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`SPOT`  
`SWAP`, the default value | | instId | String | Yes | Instrument ID, e.g.
BTC-USDT-SWAP. If there are multiple instruments, separate them with commas. |

The value of \`instId\` must include all instruments that you are going to have
the lead trading with because the previous settings will be overwritten after
the current request is set successfully

#### Response parameters

| **Parameter**     | **Type** | **Description**                   |
| ----------------- | -------- | --------------------------------- |
| instId            | String   | Instrument ID, e.g. BTC-USDT-SWAP |
| enabled           | Boolean  | Whether you set it successfully   |
| `true` or `false` |
