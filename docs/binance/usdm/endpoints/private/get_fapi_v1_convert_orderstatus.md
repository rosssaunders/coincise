# Order status(USER_DATA)

### API Description

Query order status by order ID.

### HTTP Request

GET `/fapi/v1/convert/orderStatus`

### Request Weight

**50(IP)**

### Request Parameters

| Name    | Type   | Mandatory | Description                           |
| ------- | ------ | --------- | ------------------------------------- |
| orderId | STRING | NO        | Either orderId or quoteId is required |
| quoteId | STRING | NO        | Either orderId or quoteId is required |

### Response Example

```json
{
  "orderId": 933256278426274426,
  "orderStatus": "SUCCESS",
  "fromAsset": "BTC",
  "fromAmount": "0.00054414",
  "toAsset": "USDT",
  "toAmount": "20",
  "ratio": "36755",
  "inverseRatio": "0.00002721",
  "createTime": 1623381330472
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Order-Status](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Order-Status)
