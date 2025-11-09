# POST / Close positions

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-close-positions](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-close-positions)

### POST / Close positions

Close the position of an instrument via a market order.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule (except Options): User ID + Instrument ID

#### Rate limit rule (Options only): User ID + Instrument Family

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/close-position`

#### Request Parameters

| Parameter | Type   | Required    | Description   |
| --------- | ------ | ----------- | ------------- |
| instId    | String | Yes         | Instrument ID |
| posSide   | String | Conditional | Position side |

This parameter can be omitted in `net` mode, and the default value is `net`. You
can only fill with `net`.  
This parameter must be filled in under the `long/short` mode. Fill in `long` for
close-long and `short` for close-short. | | mgnMode | String | Yes | Margin
mode  
`cross` `isolated` | | ccy | String | Conditional | Margin currency, required in
the case of closing `cross` `MARGIN` position for `Futures mode`. | | autoCxl |
Boolean | No | Whether any pending orders for closing out needs to be
automatically canceled when close position via a market order.  
`false` or `true`, the default is `false`. | | clOrdId | String | No |
Client-supplied ID  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 32 characters. | | tag | String | No | Order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up
to 16 characters. |

#### Response Parameters

| **Parameter**                                                                                      | **Type** | **Description**    |
| -------------------------------------------------------------------------------------------------- | -------- | ------------------ |
| instId                                                                                             | String   | Instrument ID      |
| posSide                                                                                            | String   | Position side      |
| clOrdId                                                                                            | String   | Client-supplied ID |
| A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| tag                                                                                                | String   | Order tag          |
| A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters. |

if there are any pending orders for closing out and the orders do not need to be
automatically canceled, it will return an error code and message to prompt users
to cancel pending orders before closing the positions.
