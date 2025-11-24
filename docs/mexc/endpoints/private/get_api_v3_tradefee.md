# GET api/v3/tradeFee

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-symbol-commission

> request

```bash
get api/v3/tradeFee?symbol=MXUSDT&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{  "data":{    "makerCommission":0.003000000000000000,    "takerCommission":0.003000000000000000  },  "code":0,  "msg":"success",  "timestamp":1669109672717}
```

-   **GET** `api/v3/tradeFee`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 20

**request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| symbol | string | yes | symbol |
| recvWindow | long | no | recvWindow |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**return**

| Name | Type | Description |
| --- | --- | --- |
| makerCommission | long | User Maker Commission |
| takerCommission | long | User Taker Commission |
