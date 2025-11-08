# User Commission Rate (USER_DATA)

### API Description

Query user commission rate

### HTTP Request

GET `/dapi/v1/commissionRate`

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
  "symbol": "BTCUSD_PERP",
  "makerCommissionRate": "0.00015", // 0.015%
  "takerCommissionRate": "0.00040" // 0.040%
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/User-Commission-Rate](https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/User-Commission-Rate)
