# Change Margin Type(TRADE)

### API Description

Change symbol level margin type

### HTTP Request

POST `/fapi/v1/marginType`

### Request Weight

**1**

### Request Parameters

| Name       | Type   | Mandatory | Description       |
| ---------- | ------ | --------- | ----------------- |
| symbol     | STRING | YES       |                   |
| marginType | ENUM   | YES       | ISOLATED, CROSSED |
| recvWindow | LONG   | NO        |                   |
| timestamp  | LONG   | YES       |                   |

### Response Example

```json
{
  "code": 200,
  "msg": "success"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Margin-Type](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Change-Margin-Type)
