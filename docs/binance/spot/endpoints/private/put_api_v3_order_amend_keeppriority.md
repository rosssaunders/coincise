## Order Amend Keep Priority (TRADE)​

```
PUT /api/v3/order/amend/keepPriority
```

Reduce the quantity of an existing open order.

This adds 0 orders to the `EXCHANGE_MAX_ORDERS` filter and the `MAX_NUM_ORDERS` filter.

Read [Order Amend Keep Priority FAQ](/docs/binance-spot-api-docs/faqs/order_amend_keep_priority) to learn more.

**Weight**: 4

**Unfilled Order Count:** 0

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | STRING | YES |  |
| orderId | LONG | NO\* | `orderId` or `origClientOrderId` must be sent |
| origClientOrderId | STRING | NO\* | `orderId` or `origClientOrderId` must be sent |
| newClientOrderId | STRING | NO\* | The new client order ID for the order after being amended.  
If not sent, one will be randomly generated.  
It is possible to reuse the current clientOrderId by sending it as the `newClientOrderId`. |
| newQty | DECIMAL | YES | `newQty` must be greater than 0 and less than the order's quantity. |
| recvWindow | DECIMAL | NO | The value cannot be greater than `60000`.  
Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| timestamp | LONG | YES |  |

**Data Source**: Matching Engine

**Response:** Response for a single order:

```
{  "transactTime": 1741926410255,  "executionId": 75,  "amendedOrder":  {    "symbol": "BTCUSDT",    "orderId": 33,    "orderListId": -1,    "origClientOrderId": "5xrgbMyg6z36NzBn2pbT8H",    "clientOrderId": "PFaq6hIHxqFENGfdtn4J6Q",    "price": "6.00000000",    "qty": "5.00000000",    "executedQty": "0.00000000",    "preventedQty": "0.00000000",    "quoteOrderQty": "0.00000000",    "cumulativeQuoteQty": "0.00000000",    "status": "NEW",    "timeInForce": "GTC",    "type": "LIMIT",    "side": "SELL",    "workingTime": 1741926410242,    "selfTradePreventionMode": "NONE"  }}
```

Response for an order that is part of an Order list:

```
{  "transactTime": 1741669661670,  "executionId": 22,  "amendedOrder":  {    "symbol": "BTCUSDT",    "orderId": 9,    "orderListId": 1,    "origClientOrderId": "W0fJ9fiLKHOJutovPK3oJp",    "clientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi",    "price": "0.00000000",    "qty": "4.00000000",    "executedQty": "0.00000000",    "preventedQty": "0.00000000",    "quoteOrderQty": "0.00000000",    "cumulativeQuoteQty": "0.00000000",    "status": "PENDING_NEW",    "timeInForce": "GTC",    "type": "MARKET",    "side": "BUY",    "selfTradePreventionMode": "NONE"  },  "listStatus":  {    "orderListId": 1,    "contingencyType": "OTO",    "listOrderStatus": "EXECUTING",    "listClientOrderId": "AT7FTxZXylVSwRoZs52mt3",    "symbol": "BTCUSDT",    "orders":    [      {        "symbol": "BTCUSDT",        "orderId": 8,        "clientOrderId": "GkwwHZUUbFtZOoH1YsZk9Q"      },      {        "symbol": "BTCUSDT",        "orderId": 9,        "clientOrderId": "UQ1Np3bmQ71jJzsSDW9Vpi"      }    ]  }}
```

**Note:** The payloads above do not show all fields that can appear. Please refer to [Conditional fields in Order Responses](/docs/binance-spot-api-docs/rest-api/trading-endpoints#conditional-fields-in-order-responses).

> Source: [https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints](https://developers.binance.com/docs/binance-spot-api-docs/rest-api/trading-endpoints)
