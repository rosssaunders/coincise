# Get Sub UID List (Unlimited)

This API is applicable to the client who has over 10k sub accounts. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this endpoint..

-   master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/user/submembers`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| pageSize | false | string | Data size per page. Return up to 100 records per request |
| nextCursor | false | string | Cursor. Use the `nextCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| subMembers | array | Object |
| \> uid | string | Sub user Id |
| \> username | string | Username |
| \> memberType | integer | `1`: standard sub account, `6`: custodial sub account |
| \> status | integer | The status of the user account
-   `1`: normal
-   `2`: login banned
-   `4`: frozen

 |
| \> accountMode | integer | The account mode of the user account

-   `1`: Classic Account
-   `3`: UTA1.0
-   `4`: UTA1.0 Pro
-   `5`: UTA2.0
-   `6`: UTA2.0 Pro

 |
| \> remark | string | The remark |
| nextCursor | string | The next page cursor value. "0" means no more pages |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/user/submembers?pageSize=1 HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676430318405X-BAPI-RECV-WINDOW: 5000
```

```

```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "subMembers": [
      {
        "uid": "106314365",
        "username": "xxxx02",
        "memberType": 1,
        "status": 1,
        "remark": "",
        "accountMode": 5
      },
      {
        "uid": "106279879",
        "username": "xxxx01",
        "memberType": 1,
        "status": 1,
        "remark": "",
        "accountMode": 6
      }
    ],
    "nextCursor": "0"
  },
  "retExtInfo": {},
  "time": 1760388041006
}
```