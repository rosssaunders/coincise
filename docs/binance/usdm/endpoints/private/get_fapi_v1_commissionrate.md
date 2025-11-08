# User Commission Rate (USER_DATA)

### API Description

Get User Commission Rate

### HTTP Request

GET `/fapi/v1/commissionRate`

### Request Weight

**20**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | YES       |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
{
  "symbol": "BTCUSDT",
  "makerCommissionRate": "0.0002", // 0.02%
  "takerCommissionRate": "0.0004" // 0.04%
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/User-Commission-Rate](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/User-Commission-Rate)
