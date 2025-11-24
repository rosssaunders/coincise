# Repay

Fully or partially repay a loan. If interest is due, that is paid off first,
with the loaned amount being paid off only after due interest.

> Permission: "Spot trade"

info

- The repaid amount will be deducted from the Funding wallet.
- The collateral amount will not be auto returned when you don't fully repay the
  debt, but you can also adjust collateral amount

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/crypto-loan/repay`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments      |
| :-------- | :------- | :----- | ------------- |
| orderId   | **true** | string | Loan order ID |
| amount    | **true** | string | Repay amount  |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type   | Comments                 |
| :-------- | :----- | ------------------------ |
| repayId   | string | Repayment transaction ID |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/crypto-loan/repay HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1728629785224X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 61{    "orderId": "1794267532472646144",    "amount": "100"}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.repay_crypto_loan(        orderId="1794267532472646144",        amount="100",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .repayCryptoLoan({ orderId: "1794267532472646144", amount: "100" })
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
  "retMsg": "request.success",
  "result": {
    "repayId": "1794271131730737664"
  },
  "retExtInfo": {},
  "time": 1728629786884
}
```
