# Query Sub-account List (For Master Account)

Get details of the sub-account list

> Response

```
{
    "subAccounts":[
        {
            "subAccount":"mexc666",
            "isFreeze":false,
            "createTime":1544433328000,
            "uid": "49910511"
        },
        {
            "subAccount":"mexc888",
            "isFreeze":false,
            "createTime":1544433328000,
            "uid": "91921059"
        }
    ]
}
```

- GET / api/v3/sub-account/list

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

Parameters:

| Name       | Type   | Mandatory | Description                       |
| ---------- | ------ | --------- | --------------------------------- |
| subAccount | STRING | NO        | Sub-account Name                  |
| isFreeze   | STRING | NO        | true or false                     |
| page       | INT    | NO        | Default value: 1                  |
| limit      | INT    | NO        | Default value: 10, Max value: 200 |
| timestamp  | LONG   | YES       |                                   |
| recvWindow | LONG   | NO        |                                   |

Response:

| Name       | Description     |
| ---------- | --------------- |
| subAccount | subAccount name |
| isFreeze   | isFreeze        |
| createTime | createTime      |
| uid        | subaccount uid  |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#query-sub-account-list-for-master-account
