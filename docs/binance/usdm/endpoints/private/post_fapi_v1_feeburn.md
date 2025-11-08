# Toggle BNB Burn On Futures Trade (TRADE)

### API Description

Change user's BNB Fee Discount (Fee Discount On or Fee Discount Off ) on
**_EVERY symbol_**

### HTTP Request

POST `/fapi/v1/feeBurn`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description                                        |
| ---------- | ------ | --------- | -------------------------------------------------- |
| feeBurn    | STRING | YES       | "true": Fee Discount On; "false": Fee Discount Off |
| recvWindow | LONG   | NO        |                                                    |
| timestamp  | LONG   | YES       |                                                    |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Toggle-BNB-Burn-On-Futures-Trade](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Toggle-BNB-Burn-On-Futures-Trade)
