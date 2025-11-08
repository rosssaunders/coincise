# GET /v5/user/get-member-type

**Source:**
[Get UID Wallet Type](https://bybit-exchange.github.io/docs/v5/user/wallet-type)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- User
- Get UID Wallet Type

On this page

# Get UID Wallet Type

Get available wallet types for the master account or sub account

tip

- Master api key: you can get master account and appointed sub account available
  wallet types, and support up to 200 sub UID in one request.
- Sub api key: you can get its own available wallet types

PRACTICE

"FUND" - If you never deposit or transfer capital into it, this wallet type will
not be shown in the array, but your account indeed has this wallet.

- `["SPOT","FUND","CONTRACT"]` : Classic account and Funding wallet was operated
  before
- `["SPOT","CONTRACT"]` : Classic account and Funding wallet is never operated
- `["UNIFIED""FUND","CONTRACT"]` : UTA account and Funding wallet was operated
  before.
- `["UNIFIED","CONTRACT"]` : UTA account and Funding wallet is never operated.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/user/get-member-type`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments |
| :-------- | :------- | :----- | -------- |
| memberIds | false    | string |

- Query itself wallet types when not passed
- When use master api key to query sub UID, master UID data is always returned
  in the top of the array
- Multiple sub UID are supported, separated by commas
- This param is ignored when you use sub account api key

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                   | Type   | Comments                                                                                                            |
| :------------------------------------------ | :----- | ------------------------------------------------------------------------------------------------------------------- |
| accounts                                    | array  | Object                                                                                                              |
| \> uid                                      | string | Master/Sub user Id                                                                                                  |
| \> [accountType](/docs/v5/enum#accounttype) | array  | Wallets array. `SPOT`, `CONTRACT`, `FUND`, `OPTION`, `UNIFIED`. Please check above practice to understand the value |

[RUN >>](/docs/api-explorer/v5/user/wallet-type)

---

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/user/get-member-type HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1686884973961X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```

```

```
// https://api.bybit.com/v5/user/get-member-typeconst { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getUIDWalletType({    memberIds: 'subUID1,subUID2',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "accounts": [            {                "uid": "533285",                "accountType": [                    "SPOT",                    "UNIFIED",                    "FUND",                    "CONTRACT"                ]            }        ]    },    "retExtInfo": {},    "time": 1686884974151}
```

[

Previous

Get Sub Account All API Keys

](/docs/v5/user/list-sub-apikeys)[

Next

Modify Master API Key

](/docs/v5/user/modify-master-apikey)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
