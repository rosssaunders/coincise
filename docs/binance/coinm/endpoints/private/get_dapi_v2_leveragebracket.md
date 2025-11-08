# Notional Bracket for Symbol(USER_DATA)

### API Description

Get the symbol's notional bracket list.

### HTTP Request

GET `/dapi/v2/leverageBracket`

### Request Weight

**1**

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
        "symbol": "BTCUSD_PERP",
        "notionalCoef": 1.50,  //user symbol bracket multiplier, only appears when user's symbol bracket is adjusted
        "brackets": [
            {
                "bracket": 1,   // bracket level
                "initialLeverage": 125,  // the maximum leverage
                "qtyCap": 50,  // upper edge of base asset quantity
                "qtylFloor": 0,  // lower edge of base asset quantity
                "maintMarginRatio": 0.004 // maintenance margin rate
				"cum": 0.0 // Auxiliary number for quick calculation
            },
        ]
    }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Notional-Bracket-for-Symbol](https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Notional-Bracket-for-Symbol)
