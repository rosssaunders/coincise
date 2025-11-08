# Get Current Multi-Assets Mode (USER_DATA)

### API Description

Get user's Multi-Assets mode (Multi-Assets Mode or Single-Asset Mode) on
**_Every symbol_**

### HTTP Request

GET `/fapi/v1/multiAssetsMargin`

### Request Weight

**30**

### Request Parameters

| Name       | Type | Mandatory | Description |
| ---------- | ---- | --------- | ----------- |
| recvWindow | LONG | NO        |             |
| timestamp  | LONG | YES       |             |

### Response Example

```json
{
  "multiAssetsMargin": true // "true": Multi-Assets Mode; "false": Single-Asset Mode
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Multi-Assets-Mode](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Current-Multi-Assets-Mode)
