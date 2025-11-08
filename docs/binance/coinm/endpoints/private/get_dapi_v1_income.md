# Get Income History(USER_DATA)

### API Description

Get income history

### HTTP Request

GET `/dapi/v1/income`

### Request Weight

**20**

### Request Parameters

| Name       | Type   | Mandatory | Description                                                                                                            |
| ---------- | ------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| symbol     | STRING | NO        |                                                                                                                        |
| incomeType | STRING | NO        | "TRANSFER","WELCOME_BONUS", "FUNDING_FEE", "REALIZED_PNL", "COMMISSION", "INSURANCE_CLEAR", and "DELIVERED_SETTELMENT" |
| startTime  | LONG   | NO        | Timestamp in ms to get funding from INCLUSIVE.                                                                         |
| endTime    | LONG   | NO        | Timestamp in ms to get funding until INCLUSIVE.                                                                        |
| page       | INT    | NO        |                                                                                                                        |
| limit      | INT    | NO        | Default 100; max 1000                                                                                                  |
| recvWindow | LONG   | NO        |                                                                                                                        |
| timestamp  | LONG   | YES       |                                                                                                                        |

> - If `incomeType` is not sent, all kinds of flow will be returned
> - "trandId" is unique in the same "incomeType" for a user
> - The time between `startTime` and `endTime` can not be longer than 1 year

### Response Example

```json
[
  {
    "symbol": "", // trade symbol, if existing
    "incomeType": "TRANSFER", // income type
    "income": "-0.37500000", // income amount
    "asset": "BTC", // income asset
    "info": "WITHDRAW", // extra information
    "time": 1570608000000,
    "tranId": "9689322392", // transaction id
    "tradeId": "" // trade id, if existing
  },
  {
    "symbol": "BTCUSD_200925",
    "incomeType": "COMMISSION",
    "income": "-0.01000000",
    "asset": "BTC",
    "info": "",
    "time": 1570636800000,
    "tranId": "9689322392",
    "tradeId": "2059192"
  }
]
```

> Source:
> [https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Get-Income-History](https://developers.binance.com/docs/derivatives/coin-margined-futures/account/rest-api/Get-Income-History)
