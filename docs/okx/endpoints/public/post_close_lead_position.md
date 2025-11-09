# POST / Close lead position

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position](https://www.okx.com/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)

### POST / Close lead position

You can only close a lead position once a time.  
It is required to pass subPosId which can get from
[Get existing leading positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions).

#### Rate limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/copytrading/close-subposition`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | No       | Instrument type |

`SPOT`  
`SWAP`, the default value | | subPosId | String | Yes | Lead position ID | |
ordType | String | No | Order type  
`market`：Market order, the default value  
`limit`：Limit order  
 | | px | String | No | Order price. Only applicable to `limit` order and `SPOT`
lead trader  
If the price is 0, the pending order will be canceled.  
It is modifying order if you set `px` after placing limit order. | | tag |
String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. |

#### Response parameters

| **Parameter** | **Type** | **Description**  |
| ------------- | -------- | ---------------- |
| subPosId      | String   | Lead position ID |
| tag           | String   | Order tag        |
