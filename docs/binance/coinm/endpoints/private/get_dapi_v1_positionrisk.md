# Position Information(USER_DATA)

### API Description

Get current account information.

### HTTP Request

GET `/dapi/v1/positionRisk`

### Request Weight

**1**

### Request Parameters

| Name        | Type   | Mandatory | Description |
| ----------- | ------ | --------- | ----------- |
| marginAsset | STRING | NO        |             |
| pair        | STRING | NO        |             |
| recvWindow  | LONG   | NO        |             |
| timestamp   | LONG   | YES       |             |

> - If neither `marginAsset` nor `pair` is sent, positions of all symbols with
>   `TRADING` status will be returned.
> - for One-way Mode user, the response will only show the "BOTH" positions
> - for Hedge Mode user, the response will show "BOTH", "LONG", and "SHORT"
>   positions.

**Note**

> Please use with user data stream `ACCOUNT_UPDATE` to meet your timeliness and
> accuracy needs.

### Response Example

```json
[
  {
    "symbol": "BTCUSD_201225",
    "positionAmt": "0",
    "entryPrice": "0.0",
    "breakEvenPrice": "0.0", // break-even price
    "markPrice": "0.00000000",
    "unRealizedProfit": "0.00000000",
    "liquidationPrice": "0",
    "leverage": "125",
    "maxQty": "50", // maximum quantity of base asset
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "BOTH",
    "updateTime": 0
  },
  {
    "symbol": "BTCUSD_201225",
    "positionAmt": "1",
    "entryPrice": "11707.70000003",
    "breakEvenPrice": "11707.80000005", // break-even price
    "markPrice": "11788.66626667",
    "unRealizedProfit": "0.00005866",
    "liquidationPrice": "11667.63509587",
    "leverage": "125",
    "maxQty": "50",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "LONG",
    "updateTime": 1627026881327
  },
  {
    "symbol": "BTCUSD_201225",
    "positionAmt": "0",
    "entryPrice": "0.0",
    "breakEvenPrice": "0.0", // break-even price
    "markPrice": "0.00000000",
    "unRealizedProfit": "0.00000000",
    "liquidationPrice": "0",
    "leverage": "125",
    "maxQty": "50",
    "marginType": "cross",
    "isolatedMargin": "0.00000000",
    "isAutoAddMargin": "false",
    "positionSide": "SHORT",
    "updateTime": 1627026881327
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Position-Information](https://developers.binance.com/docs/derivatives/coin-margined-futures/trade/rest-api/Position-Information)
