# Get Current Position Mode(USER_DATA)

### API Description

Get user's position mode (Hedge Mode or One-way Mode ) on **_EVERY symbol_**

### HTTP Request

GET `/fapi/v1/positionSide/dual`

### Request Weight

30

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "dualSidePosition": true // "true": Hedge Mode; "false": One-way Mode
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Position-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Position-Mode)
