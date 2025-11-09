# GET order details

Source:
[https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-details](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-order-details)

### Get order details

Retrieve order details.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/order`

#### Request Parameters

| Parameter                                                                         | Type   | Required    | Description                                                                   |
| --------------------------------------------------------------------------------- | ------ | ----------- | ----------------------------------------------------------------------------- |
| ordId                                                                             | String | Conditional | Order ID                                                                      |
| Either `ordId` or `clOrdId` is required, if both are passed, `ordId` will be used |
| clOrdId                                                                           | String | Conditional | Client Order ID as assigned by the client. The latest order will be returned. |

#### Response Example

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| sprdId    | String | spread ID                                 |
| ordId     | String | Order ID                                  |
| clOrdId   | String | Client Order ID as assigned by the client |
| tag       | String | Order tag                                 |
| px        | String | Price                                     |
| sz        | String | Quantity to buy or sell                   |
| ordType   | String | Order type                                |

`market`: Market order  
`limit`: Limit order  
`post_only`: Post-only order  
`ioc`: Immediate-or-cancel order | | side | String | Order side | | fillSz |
String | Last fill quantity | | fillPx | String | Last fill price | | tradeId |
String | Last trade ID | | accFillSz | String | Accumulated fill quantity | |
pendingFillSz | String | Live quantity | | pendingSettleSz | String | Quantity
that's pending settlement | | canceledSz | String | Quantity canceled due order
cancellations or trade rejections | | avgPx | String | Average filled price. If
none is filled, it will return "0". | | state | String | State  
`canceled`  
`live`  
`partially_filled`  
`filled` | | cancelSource | String | Source of the order cancellation.Valid
values and the corresponding meanings are:  
`0`: Order canceled by system  
`1`: Order canceled by user  
`14`: Order canceled: IOC order was partially canceled due to incompletely
filled  
`15`: Order canceled: The order price is beyond the limit  
`20`: Cancel all after triggered  
`31`: The post-only order will take liquidity in maker orders  
`32`: Self trade prevention  
`34`: Order failed to settle due to insufficient margin  
`35`: Order cancellation due to insufficient margin from another order  
`44`: Your order was canceled because your available balance of this crypto was
insufficient for auto conversion. Auto conversion was triggered when the total
collateralized liabilities for this crypto reached the platform’s risk control
limit. | | uTime | String | Update time, Unix timestamp format in milliseconds,
e.g. `1597026383085` | | cTime | String | Creation time, Unix timestamp format
in milliseconds, e.g. `1597026383085` |

Order sizes equation: pendingFillSz + canceledSz + accFillSz = sz
