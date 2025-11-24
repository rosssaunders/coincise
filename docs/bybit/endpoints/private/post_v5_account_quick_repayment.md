# Repay Liability

You can manually repay the liabilities of Unified account

> **Permission**: USDC Contracts

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/account/quick-repayment`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                |
| :-------- | :------- | :----- | --------------------------------------- |
| coin      | false    | string | The coin with liability, uppercase only |

- Input the specific coin: repay the liability of this coin in particular
- No coin specified: repay the liability of all coins

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments                |
| :-------- | :----- | ----------------------- |
| list      | array  | Object                  |
| \> coin   | string | Coin used for repayment |

- The order of currencies used to repay liability is based on `liquidationOrder`
  from [this endpoint](/docs/v5/spot-margin-uta/vip-margin)

| | \> repaymentQty | string | Repayment qty |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/account/quick-repayment HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1701848610019X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 22{    "coin": "USDT"}
```

```

```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .repayLiability({ coin: "USDT" })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "SUCCESS",
  "result": {
    "list": [
      {
        "coin": "BTC",
        "repaymentQty": "0.10549670"
      },
      {
        "coin": "ETH",
        "repaymentQty": "2.27768114"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1701848610941
}
```
