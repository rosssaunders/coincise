# GET /api/v3/strategy/group

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-stp-strategy-group

> request

```bash
get /api/v3/strategy/group?tradeGroupName=tradeGroupOne&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{    "data": [        {            "tradeGroupName": "tradeGroupNameOne",            "tradeGroupId": 91,            "createTime": 1758043350000,            "updateTime": 1758043350000        }    ],    "code": 200,    "msg": "success",    "timestamp": 1758044090972}
```

-   **GET** `/api/v3/strategy/group`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 20

**request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| tradeGroupName | string | yes | stp strategy group name |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**return**

| Name | Type | Description |
| --- | --- | --- |
| tradeGroupName | string | stp strategy group name |
| tradeGroupId | string | stp strategy group id |
| tradeGroupUid | string | UIDs contained in stp strategy group, separated by , |
| updateTime | long | update time |
| createTime | long | create time |
