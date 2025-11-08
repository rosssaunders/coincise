# Send Quote Request(USER_DATA)

### API Description

Request a quote for the requested token pairs

### HTTP Request

POST `/fapi/v1/convert/getQuote`

### Request Weight

**50(IP)**

**360/hour，500/day**

### Request Parameters

| Name       | Type    | Mandatory | Description                                                                |
| ---------- | ------- | --------- | -------------------------------------------------------------------------- |
| fromAsset  | STRING  | YES       |                                                                            |
| toAsset    | STRING  | YES       |                                                                            |
| fromAmount | DECIMAL | EITHER    | When specified, it is the amount you will be debited after the conversion  |
| toAmount   | DECIMAL | EITHER    | When specified, it is the amount you will be credited after the conversion |
| validTime  | ENUM    | NO        | 10s, default 10s                                                           |
| recvWindow | LONG    | NO        | The value cannot be greater than 60000                                     |
| timestamp  | LONG    | YES       |                                                                            |

- Either fromAmount or toAmount should be sent
- `quoteId` will be returned only if you have enough funds to convert

### Response Example

```json
{
  "quoteId": "12415572564",
  "ratio": "38163.7",
  "inverseRatio": "0.0000262",
  "validTimestamp": 1623319461670,
  "toAmount": "3816.37",
  "fromAmount": "0.1"
}
```

> Source:
> [https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Send-quote-request](https://developers.binance.com/docs/derivatives/usds-margined-futures/convert/Send-quote-request)
