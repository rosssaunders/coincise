# GET /api/v3/strategy/group/uid

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#add-uid-to-stp-strategy-group

> request

```bash
post /api/v3/strategy/group/uid?uid=49910594&ttradeGroupId=92&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{
  "data": {
    "tradeGroupName": "1",
    "tradeGroupId": 92,
    "tradeGroupUid": "49910594",
    "createTime": 1758044671000,
    "updateTime": 1758044777000
  },
  "code": 200,
  "msg": "success",
  "timestamp": 1758044777023
}
```

- **GET** `/api/v3/strategy/group/uid`

**Permission:** SPOT_ACCOUNT_WRITE

**Weight(IP):** 20

**request**

| Name         | Type   | Mandatory | Description           |
| ------------ | ------ | --------- | --------------------- |
| uid          | string | yes       | separated by ,        |
| tradeGroupId | string | yes       | stp strategy group id |
| timestamp    | long   | yes       | timestamp             |
| signature    | string | yes       | signature             |

**return**

| Name           | Type   | Description                   |
| -------------- | ------ | ----------------------------- |
| tradeGroupName | string | stp strategy group name       |
| tradeGroupId   | string | stp strategy group id         |
| tradeGroupUid  | string | UIDs just add, separated by , |
| updateTime     | long   | update time                   |

Precautions:

- Only the master account is allowed to add uid; sub-accounts cannot access
- Only strategy groups under the current master account can be operated;
  cross-master-account operations are not allowed
