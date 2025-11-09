# Modify Trigger Order

Speed limit is 10 times/s (UID)

### Description[​](#description "Direct link to Description")

Interface for trigger order modification, used to modify an pending order, such
as its TP/SL and/or triggerPrice.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/mix/order/modify-plan-order

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/mix/order/modify-plan-order" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \   -d '{        "planType":"normal_plan",        "orderId": "123",        "clientOid": "321123",        "symbol": "ethusdt",        "productType": "usdt-futures",        "newSize": "3",        "newPrice": "2001",        "newCallbackRatio": "",        "newTriggerPrice": "2000",        "newTriggerType": "fill_price",        "newStopSurplusExecutePrice": "2049",        "newStopSurplusTriggerPrice": "2050",        "newStopSurplusTriggerType": "mark_price",        "newStopLossExecutePrice": "5",        "newStopLossTriggerPrice": "1970",        "newStopLossTriggerType": "mark_price"}'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter                  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId                    | String | No       | Trigger order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails.                                                                                                                                                                                                                                                                          |
| clientOid                  | String | No       | Customized trigger order ID<br>Either orderId or clientOid is required. If both are entered, orderId prevails.                                                                                                                                                                                                                                                               |
| productType                | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                                                                                                                                                                                             |
| newSize                    | String | No       | Amount of the modified transaction<br>If it is empty, the amount remains unchanged.                                                                                                                                                                                                                                                                                          |
| newPrice                   | String | No       | Modified price for executing orders.<br>1: When the original order is a trigger order and its type is Limit, the original price remains unchanged when this field is empty.<br>Must be empty if the order type is Market.<br>2: When the original order is a trailing order, it must be empty.                                                                               |
| newCallbackRatio           | String | No       | Modified callback rate (for trailing stop orders only)<br>1. When the original order is a trailing stop order, it must be filled in, and the rate must not be greater than 10.<br>2: When the original order is a trigger order, it must be empty.                                                                                                                           |
| newTriggerPrice            | String | No       | Modified trigger price<br>1. When the original order is a trigger order or a trailing stop order, if the field is not set, the price stays unchanged; if it is set, the price updates.                                                                                                                                                                                       |
| newTriggerType             | String | No       | Modified trigger type<br>1. When the original order is a trigger order or a trailing stop order, if the field is not set, the type stays unchanged; if it is set, the type updates.<br>Setting this parameter requires the setting of newTriggerPrice.<br>fill_price: filled price<br>mark_price: mark price                                                                 |
| newStopSurplusTriggerPrice | String | No       | Modified take-profit trigger price<br>1. If the field is left empty: when the original order has the TP set, the original value will be maintained.<br>2. If it is not empty: when the original order has the TP set, the TP will update; when the original order doesn't have the TP set, the TP will be added. If 0 is filled in, the original TP setting will be removed. |
| newStopSurplusExecutePrice | String | No       | Modified take-profit strike price<br>1. This parameter must be empty when the original order is a trailing stop order.<br>2.For a trigger order, if this field is filled in, the price will update; if not filled in, the price stays unchanged; if 0 is filled in, the price setting will be removed.                                                                       |
| newStopSurplusTriggerType  | String | No       | Modified take-profit trigger type<br>Default to the transaction price<br>1. This parameter must be empty when the original order is a trailing stop order.<br>2. For a trigger order that has newStopSurplusTriggerPrice parameter set, it is required.<br>fill_price: filled price<br>mark_price: mark price                                                                |
| newStopLossTriggerPrice    | String | No       | Modified stop-loss trigger price<br>1. If the field is left empty: when the original order has the SL set, the original value will be maintained.<br>2. If it is not empty: when the original order has the SL set, the SL will update; when the original order doesn't have the SL set, the SL will be added. If 0 is filled in, the original SL setting will be removed.   |
| newStopLossExecutePrice    | String | No       | Modified stop-loss strike price<br>1. This parameter must be empty when the original order is a trailing stop order.<br>2.For a trigger order, if this field is filled in, the price will update; if not filled in, the price stays unchanged; if 0 is filled in, the SL setting will be removed.                                                                            |
| newStopLossTriggerType     | String | No       | Modified stop-loss trigger type<br>Default to the transaction price<br>1. This parameter must be empty when the original order is a trailing stop order.<br>2. For a trigger order that has newStopLossTriggerPrice parameter set, it is required.<br>fill_price: filled price<br>mark_price: mark price                                                                     |

Response Example

```
{    "code": "00000",    "data": {        "orderId": "21627293504612",        "clientOid": "BITGET#1627293504612"    },    "msg": "success",    "requestTime": 1627293504612}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type   | Description                 |
| :-------- | :----- | :-------------------------- |
| orderId   | String | Trigger order ID            |
| clientOid | String | Customized trigger order ID |

> **Source:** https://www.bitget.com/api-doc/contract/plan/Modify-Plan-Order
