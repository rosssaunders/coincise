# POST /v5/broker/award/info

**Source:**
[Query Voucher Spec](https://bybit-exchange.github.io/docs/v5/broker/reward/voucher)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Exchange Broker
- Reward
- Query Voucher Spec

On this page

# Query Voucher Spec

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/broker/award/info`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments   |
| :-------- | :------- | :----- | ---------- |
| id        | **true** | string | Voucher ID |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                  | Type   | Comments                  |
| :------------------------- | :----- | ------------------------- |
| id                         | string | Voucher ID                |
| coin                       | string | Coin                      |
| amountUnit                 | string | - `AWARD_AMOUNT_UNIT_USD` |
| - `AWARD_AMOUNT_UNIT_COIN` |
| productLine                | string | Product line              |
| subProductLine             | string | Sub product line          |
| totalAmount                | Object | Total amount of voucher   |
| usedAmount                 | string | Used amount of voucher    |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/broker/award/info HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1726107086048X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 22{    "id": "80209"}
```

```

```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getBrokerVoucherSpec({    accountId: '5714139',    awardId: '189528',    specCode: 'demo000',    withUsedAmount: false,})  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "id": "80209",        "coin": "USDT",        "amountUnit": "AWARD_AMOUNT_UNIT_USD",        "productLine": "PRODUCT_LINE_CONTRACT",        "subProductLine": "SUB_PRODUCT_LINE_CONTRACT_DEFAULT",        "totalAmount": "10000",        "usedAmount": "100"    },    "retExtInfo": {},    "time": 1726107086313}
```

[

Previous

Get Sub Account Deposit Records

](/docs/v5/broker/sub-deposit-record)[

Next

Issue Voucher

](/docs/v5/broker/reward/issue-voucher)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
