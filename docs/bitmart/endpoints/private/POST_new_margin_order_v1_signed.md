# POST New Margin Order(v1) (SIGNED)

**Source:** [New Margin Order(v1) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## New Margin Order(v1) (SIGNED)

`Applicable for margin order placement`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/submit_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "side":"buy",     "type":"limit",     "size":"10",     "price":"7000" }' https://api-cloud.bitmart.com/spot/v1/margin/submit_order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC\_USDT) |
| side | String | Yes | Side  
\-`buy`\=Buy order  
\-`sell`\=Sell order |
| type | String | Yes | Order type  
\-`limit`\=Limit order  
\-`market`\=Market order  
\-`limit_maker`\=PostOnly order  
\-`ioc`\=IOC order |
| clientOrderId | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Order size |
| price | String | Yes | Price |

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| notional | String | Yes | Required for placing orders by amount |

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Required for placing orders by quantity |

**Instruction**

Buy-limit-maker

-   When "order price">="market lowest selling price", the system will refuse to accept the order after the order is submitted
    
-   When the "order price" <"the lowest selling price in the market", the order will be canceled by the system
    

Sell-limit-maker

-   When "order price" <= "market highest bid price", after the order is submitted, the system will refuse to accept the order
    
-   When "order price"> "market highest bid price", the order will be canceled by the system
    

Buy-ioc,Sell-ioc

-   After the order is placed, all orders that cannot be filled immediately are cancelled immediately

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "f7f74924-14da-42a6-b7f2-d3799dd9a612",
  "data": {
    "order_id": 1223181
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| order\_id | Long | Order ID |

The request is successful only when order\_id is returned.