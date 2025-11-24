# Get BGB Convert History

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get BGB Convert History

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/convert/bgb-convert-records

Request Example

```
curl "https://api.bitget.com/api/v2/convert/bgb-convert-records?startTime=1686128558000&endTime=1686214958000&limit=10" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### request parameters[​](#request-parameters "Direct link to request parameters")

| Parameter                                                      | Type   | Required | Description                             |
| :------------------------------------------------------------- | :----- | :------- | :-------------------------------------- |
| orderId                                                        | String | No       | Splash Record id                        |
| startTime                                                      | String | No       | Start time, Unix millisecond timestamps |
| endTime                                                        | String | No       | End time, Unix millisecond timestamps   |
| The maximum interval between startTime and endTime is 90 days. |
| limit                                                          | String | No       | Default 20 Maximum 100                  |
| idLessThan                                                     | String | No       | ID of the last record endId             |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1703835442804,
  "data": [
    {
      "orderId": "xxxx",
      "fromCoin": "ROOT",
      "fromAmount": "64.99837000",
      "fromCoinPrice": "0.02954000",
      "toCoin": "BGB",
      "toAmount": "3.55072001",
      "toCoinPrice": "0.54075000",
      "feeDetail": [
        {
          "feeCoin": "BGB",
          "fee": "0.07101441"
        }
      ],
      "status": "success",
      "ctime": "1700837066186"
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter     | Type   | Description                                  |
| :------------ | :----- | :------------------------------------------- |
| data          | List   | List                                         |
| orderId       | String | Splash Record id                             |
| fromCoin      | String | Switch Coin                                  |
| fromAmount    | String | Switch amount                                |
| fromCoinPrice | String | Coin swap price                              |
| toCoin        | String | Target currency                              |
| toAmount      | String | Target currency Amount                       |
| toCoinPrice   | String | Get the price of target coins                |
| feeDetail     | String | swap fee detail                              |
| \> fee        | String | fee                                          |
| \> feeCoin    | String | fee coin                                     |
| status        | String | swap status                                  |
| ts            | String | Time of generation of flash transfer records |

> **Source:**
> https://www.bitget.com/api-doc/common/bgb-convert/Get-BGB-Convert-Record
