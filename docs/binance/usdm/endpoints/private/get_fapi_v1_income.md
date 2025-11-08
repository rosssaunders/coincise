# Get Income History (USER_DATA)

### API Description

Query income history

### HTTP Request

GET `/fapi/v1/income`

### Request Weight

**30**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | STRING | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| incomeType | STRING | NO        | TRANSFER, WELCOME_BONUS, REALIZED_PNL, FUNDING_FEE, COMMISSION, INSURANCE_CLEAR, REFERRAL_KICKBACK, COMMISSION_REBATE, API_REBATE, CONTEST_REWARD, CROSS_COLLATERAL_TRANSFER, OPTIONS_PREMIUM_FEE, OPTIONS_SETTLE_PROFIT, INTERNAL_TRANSFER, AUTO_EXCHANGE, DELIVERED_SETTELMENT, COIN_SWAP_DEPOSIT, COIN_SWAP_WITHDRAW, POSITION_LIMIT_INCREASE_FEE, STRATEGY_UMFUTURES_TRANSFER，FEE_RETURN，BFUSD_REWARD |
| startTime  | LONG   | NO        | Timestamp in ms to get funding from INCLUSIVE.                                                                                                                                                                                                                                                                                                                                                              |
| endTime    | LONG   | NO        | Timestamp in ms to get funding until INCLUSIVE.                                                                                                                                                                                                                                                                                                                                                             |
| page       | INT    | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| limit      | INT    | NO        | Default 100; max 1000                                                                                                                                                                                                                                                                                                                                                                                       |
| recvWindow | LONG   | NO        |                                                                                                                                                                                                                                                                                                                                                                                                             |
| timestamp  | LONG   | YES       |                                                                                                                                                                                                                                                                                                                                                                                                             |

> - If neither `startTime` nor `endTime` is sent, the recent 7-day data will be
>   returned.
> - If `incomeType` is not sent, all kinds of flow will be returned
> - "trandId" is unique in the same incomeType for a user
> - Income history only contains data for the last three months

### Response Example

```json
[
  {
    "symbol": "", // trade symbol, if existing
    "incomeType": "TRANSFER", // income type
    "income": "-0.37500000", // income amount
    "asset": "USDT", // income asset
    "info": "TRANSFER", // extra information
    "time": 1570608000000,
    "tranId": 9689322392, // transaction id
    "tradeId": "" // trade id, if existing
  },
  {
    "symbol": "BTCUSDT",
    "incomeType": "COMMISSION",
    "income": "-0.01000000",
    "asset": "USDT",
    "info": "COMMISSION",
    "time": 1570636800000,
    "tranId": 9689322392,
    "tradeId": "2059192"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Income-History](https://developers.binance.com/docs/derivatives/usds-margined-futures/account/rest-api/Get-Income-History)
