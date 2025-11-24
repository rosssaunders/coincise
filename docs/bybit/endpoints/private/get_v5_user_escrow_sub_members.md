# Get Fund Custodial Sub Acct

The institutional client can query the fund custodial sub accounts.

tip

The API key must have one of the below permissions in order to call this
endpoint..

- master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/user/escrow_sub_members`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter  | Required | Type   | Comments                                                                                         |
| :--------- | :------- | :----- | ------------------------------------------------------------------------------------------------ |
| pageSize   | false    | string | Data size per page. Return up to 100 records per request                                         |
| nextCursor | false    | string | Cursor. Use the `nextCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter     | Type    | Comments             |
| :------------ | :------ | -------------------- |
| subMembers    | array   | Object               |
| \> uid        | string  | 子帳戶userId         |
| \> username   | string  | 用戶名               |
| \> memberType | integer | `12`: 基金託管子帳戶 |
| \> status     | integer | 帳戶狀態.            |

- `1`: 正常
- `2`: 登陸封禁
- `4`: 凍結

| | \> accountMode | integer | 帳戶模式.

- `1`: 經典帳戶
- `3`: UTA帳戶

| | \> remark | string | 備註 | | nextCursor | string
| 下一頁數據的游標. 返回"0"表示沒有更多的數據了 |

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/user/escrow_sub_members?pageSize=2 HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1739763787703X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```

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
        "uid": "104274894",
        "username": "Private_Wealth_Management",
        "memberType": 12,
        "status": 1,
        "remark": "earn fund",
        "accountMode": 3
      },
      {
        "uid": "104274884",
        "username": "Private_Wealth_Management",
        "memberType": 12,
        "status": 1,
        "remark": "earn fund",
        "accountMode": 3
      }
    ],
    "nextCursor": "344"
  },
  "retExtInfo": {},
  "time": 1739763788699
}
```
