# Query Issued Voucher

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/broker/award/distribution-record`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| accountId | **true** | string | User ID |
| awardId | **true** | string | Voucher ID |
| specCode | **true** | string | Customised unique spec code, up to 8 characters |
| withUsedAmount | false | boolean | Whether to return the amount used by the user-   `true`
-   `false` (default) |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| accountId | string | User ID |
| awardId | string | Voucher ID |
| specCode | string | Spec code |
| amount | string | Amount of voucher |
| isClaimed | boolean | `true`, `false` |
| startAt | string | Claim start timestamp (sec) |
| endAt | string | Claim end timestamp (sec) |
| effectiveAt | string | Voucher effective timestamp (sec) after claimed |
| ineffectiveAt | string | Voucher inactive timestamp (sec) after claimed |
| usedAmount | string | Amount used by the user |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/broker/award/distribution-record HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1726112099846X-BAPI-RECV-WINDOW: 5000Content-Type: application/jsonContent-Length: 111{    "accountId": "5714139",    "awardId": "189528",    "specCode": "demo000",    "withUsedAmount": false}
```

```

```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .getBrokerIssuedVoucher({    id: '80209',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "accountId": "5714139",        "awardId": "189528",        "specCode": "demo000",        "amount": "1",        "isClaimed": true,        "startAt": "1725926400",        "endAt": "1733788800",        "effectiveAt": "1726531200",        "ineffectiveAt": "1733817600",        "usedAmount": "",    }}
```