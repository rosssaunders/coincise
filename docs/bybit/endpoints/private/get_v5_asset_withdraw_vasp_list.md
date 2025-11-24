# Get Exchange Entity List

This endpoint is particularly used for **kyc=KOR users**. When withdraw funds,
you need to fill entity id.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/withdraw/vasp/list`

### Request Parameters[​](#request-parameters "Direct link to heading")

None

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter       | Type   | Comments                                                                                                               |
| :-------------- | :----- | ---------------------------------------------------------------------------------------------------------------------- |
| vasp            | array  | Exchange entity info                                                                                                   |
| \> vaspEntityId | string | Receiver platform id. When transfer to Upbit or other exchanges that not in the list, please use vaspEntityId='others' |
| \> vaspName     | string | Receiver platform name                                                                                                 |

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/asset/withdraw/vasp/list HTTP/1.1Host: api-testnet.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1715067106163X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXX
```

```

```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .getExchangeEntities()
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
  "retMsg": "success",
  "result": {
    "vasp": [
      {
        "vaspEntityId": "basic-finance",
        "vaspName": "Basic-finance"
      },
      {
        "vaspEntityId": "beeblock",
        "vaspName": "Beeblock"
      },
      {
        "vaspEntityId": "bithumb",
        "vaspName": "bithumb"
      },
      {
        "vaspEntityId": "cardo",
        "vaspName": "cardo"
      },
      {
        "vaspEntityId": "codevasp",
        "vaspName": "codevasp"
      },
      {
        "vaspEntityId": "codexchange-kor",
        "vaspName": "CODExchange-kor"
      },
      {
        "vaspEntityId": "coinone",
        "vaspName": "coinone"
      },
      {
        "vaspEntityId": "dummy",
        "vaspName": "Dummy"
      },
      {
        "vaspEntityId": "flata-exchange",
        "vaspName": "flataexchange"
      },
      {
        "vaspEntityId": "fobl",
        "vaspName": "Foblgate"
      },
      {
        "vaspEntityId": "hanbitco",
        "vaspName": "hanbitco"
      },
      {
        "vaspEntityId": "hexlant",
        "vaspName": "hexlant"
      },
      {
        "vaspEntityId": "inex",
        "vaspName": "INEX"
      },
      {
        "vaspEntityId": "infiniteblock-corp",
        "vaspName": "InfiniteBlock Corp"
      },
      {
        "vaspEntityId": "kdac",
        "vaspName": "kdac"
      },
      {
        "vaspEntityId": "korbit",
        "vaspName": "korbit"
      },
      {
        "vaspEntityId": "paycoin",
        "vaspName": "Paycoin"
      },
      {
        "vaspEntityId": "qbit",
        "vaspName": "Qbit"
      },
      {
        "vaspEntityId": "tennten",
        "vaspName": "TENNTEN"
      },
      {
        "vaspEntityId": "others",
        "vaspName": "Others (including Upbit)"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1715067106537
}
```
