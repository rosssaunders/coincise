# Get Download Id For Option Transaction History (USER_DATA)

### API Description

Get download id for option transaction history

### HTTP Request

GET `/eapi/v1/income/asyn`

### Request Weight

**5**

**Parameters:**

| Name       | Type | Mandatory | Description     |
| ---------- | ---- | --------- | --------------- |
| startTime  | LONG | YES       | Timestamp in ms |
| endTime    | LONG | YES       | Timestamp in ms |
| recvWindow | LONG | NO        |                 |
| timestamp  | LONG | YES       |                 |

> - Request Limitation is 5 times per month, shared by > front end download page
>   and rest api
> - The time between `startTime` and `endTime` can not be longer than 1 year

### Response Example

```json
{
  "avgCostTimestampOfLast30d": 7241837, // Average time taken for data download in the past 30 days
  "downloadId": "546975389218332672"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/option/account/Get-Download-Id-For-Option-Transaction-History](https://developers.binance.com/docs/derivatives/option/account/Get-Download-Id-For-Option-Transaction-History)
