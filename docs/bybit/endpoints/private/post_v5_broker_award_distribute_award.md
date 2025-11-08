# POST /v5/broker/award/distribute-award

**Source:**
[Issue Voucher](https://bybit-exchange.github.io/docs/v5/broker/reward/issue-voucher)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Exchange Broker
- Reward
- Issue Voucher

On this page

# Issue Voucher

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/broker/award/distribute-award`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                               | Required | Type   | Comments                                              |
| :-------------------------------------- | :------- | :----- | ----------------------------------------------------- |
| accountId                               | **true** | string | User ID                                               |
| awardId                                 | **true** | string | Voucher ID                                            |
| specCode                                | **true** | string | Customised unique spec code, up to 8 characters       |
| amount                                  | **true** | string | Issue amount- Spot airdrop supports up to 16 decimals |
| - Other types supports up to 4 decimals |
| brokerId                                | **true** | string | Broker ID                                             |

### Response Parameters[​](#response-parameters "Direct link to heading")

None

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
POST /v5/broker/award/distribute-award HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1726110531734X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 128{    "accountId": "2846381",    "awardId": "123456",    "specCode": "award-001",    "amount": "100",    "brokerId": "v-28478"}
```

```

```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .issueBrokerVoucher({    accountId: '2846381',    awardId: '123456',    specCode: 'award-001',    amount: '100',    brokerId: 'v-28478',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": ""}
```

[

Previous

Query Voucher Spec

](/docs/v5/broker/reward/voucher)[

Next

Query Issued Voucher

](/docs/v5/broker/reward/get-issue-voucher)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
