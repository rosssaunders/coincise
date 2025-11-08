# Accept Block Trade Order (TRADE)

### API Description

Accept a block trade order

### HTTP Request

POST `/eapi/v1/block/order/execute`

### Request Weight

**5**

### Request Parameters

| Name                  | Type   | Mandatory |  Description                           |
| --------------------- | ------ | --------- | -------------------------------------- |
| blockOrderMatchingKey | STRING | YES       |                                        |
| recvWindow            | LONG   | NO        | The value cannot be greater than 60000 |
| timestamp             | LONG   | YES       |                                        |

### Response Example

```json
{
  "blockTradeSettlementKey": "7d046e6e-a429-4335-ab9d-6a681febcde5",
  "expireTime": 1730172115801,
  "liquidity": "MAKER",
  "status": "ACCEPTED",
  "createTime": 1730170315803,
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "SELL",
      "quantity": "1.2",
      "price": "2.8"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Accept-Block-Trade-Order](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Accept-Block-Trade-Order)
