# Symbol Configuration(USER_DATA)

### API Description

Get current account symbol configuration.

### HTTP Request

GET `/fapi/v1/symbolConfig`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

### Response Example

```json
[
  {
    "symbol": "BTCUSDT",
    "marginType": "CROSSED",
    "isAutoAddMargin": "false",
    "leverage": 21,
    "maxNotionalValue": "1000000"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Symbol-Config](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Symbol-Config)
