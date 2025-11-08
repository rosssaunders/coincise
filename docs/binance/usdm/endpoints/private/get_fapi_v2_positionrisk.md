# Position Information V2 (USER_DATA)

### API Description

Get current position information.

### HTTP Request

GET `/fapi/v2/positionRisk`

### Request Weight

**5**

### Request Parameters

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| symbol     | STRING | NO        |             |
| recvWindow | LONG   | NO        |             |
| timestamp  | LONG   | YES       |             |

**Note**

> Please use with user data stream `ACCOUNT_UPDATE` to meet your timeliness and
> accuracy needs.

### Response Example

> For One-way position mode:

```json
[
  	{
  		"entryPrice": "0.00000",
        "breakEvenPrice": "0.0",
  		"marginType": "isolated",
  		"isAutoAddMargin": "false",
  		"isolatedMargin": "0.00000000",
  		"leverage": "10",
  		"liquidationPrice": "0",
  		"markPrice": "6679.50671178",
  		"maxNotionalValue": "20000000",
  		"positionAmt": "0.000",
  		"notional": "0",,
  		"isolatedWallet": "0",
  		"symbol": "BTCUSDT",
  		"unRealizedProfit": "0.00000000",
  		"positionSide": "BOTH",
  		"updateTime": 0
  	}
]
```

> For Hedge position mode:

```json
[
  {
    "symbol": "BTCUSDT",
    "positionAmt": "0.001",
    "entryPrice": "22185.2",
    "breakEvenPrice": "0.0",
    "markPrice": "21123.05052574",
    "unRealizedProfit": "-1.06214947",
    "liquidationPrice": "19731.45529116",
    "leverage": "4",
    "maxNotionalValue": "100000000",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "LONG",
    "notional": "21.12305052",
    "isolatedWallet": "0",
    "updateTime": 1655217461579
  },
  {
    "symbol": "BTCUSDT",
    "positionAmt": "0.000",
    "entryPrice": "0.0",
    "breakEvenPrice": "0.0",
    "markPrice": "21123.05052574",
    "unRealizedProfit": "0.00000000",
    "liquidationPrice": "0",
    "leverage": "4",
    "maxNotionalValue": "100000000",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "SHORT",
    "notional": "0",
    "isolatedWallet": "0",
    "updateTime": 0
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V2](https://developers.binance.com/docs/derivatives/usds-margined-futures/trade/rest-api/Position-Information-V2)
