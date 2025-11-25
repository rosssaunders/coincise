# POST /api/v3/capital/convert

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#dust-transfer

> Request

```bash
post {{api_url}}/api/v3/capital/convert?asset=BTC,FIL,ETH&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{
  "successList": ["ALGO", "OMG"],
  "failedList": [],
  "totalConvert": "0.07085578",
  "convertFee": "0.00071571"
}
```

- **POST** `/api/v3/capital/convert`

**Permission:** SPOT_ACCOUNT_W

**Weight(IP):** 10

Parameters:

| Name      | Type   | Mandatory | Description                                                    |
| --------- | ------ | --------- | -------------------------------------------------------------- |
| asset     | string | YES       | The asset being converted.(max 15 assert)eg:asset\=BTC,FIL,ETH |
| timestamp | string | YES       | timestamp                                                      |
| signature | string | YES       | signature                                                      |

Response:

| Name         | Description                                |
| ------------ | ------------------------------------------ |
| totalConvert | Convert MX amount(Deducted commission fee) |
| convertFee   | convertFee                                 |
| successList  | convert success List                       |
| failedList   | convert failed List                        |
| \-asset      | asset                                      |
| \-message    | message                                    |
| \-code       | code                                       |
