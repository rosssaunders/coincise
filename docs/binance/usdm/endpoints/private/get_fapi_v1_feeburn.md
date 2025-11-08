# Get BNB Burn Status (USER_DATA)

### API Description

Get user's BNB Fee Discount (Fee Discount On or Fee Discount Off )

### HTTP Request

GET `/fapi/v1/feeBurn`

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
  "feeBurn": true // "true": Fee Discount On; "false": Fee Discount Off
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-BNB-Burn-Status](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-BNB-Burn-Status)
