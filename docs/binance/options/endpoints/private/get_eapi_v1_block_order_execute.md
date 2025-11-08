# Query Block Trade Details (USER_DATA)

### API Description

Query block trade details; returns block trade details from counterparty's
perspective.

### HTTP Request

GET `/eapi/v1/block/order/execute`

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
  "blockTradeSettlementKey": "12b96c28-ba05-8906-c89t-703215cfb2e6",
  "expireTime": 1730171860460,
  "liquidity": "MAKER",
  "status": "RECEIVED",
  "createTime": 1730170060462,
  "legs": [
    {
      "symbol": "BNB-241101-700-C",
      "side": "SELL",
      "quantity": "1.66",
      "price": "20"
    }
  ]
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Detail](https://developers.binance.com/docs/derivatives/option/market-maker-block-trade/Query-Block-Trade-Detail)
