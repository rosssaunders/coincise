# POST /api/v3/strategy/group

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#create-stp-strategy-group

> request

```bash
post /api/v3/strategy/group?tradeGroupName=tradeGroupOne&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{
  "data": {
    "tradeGroupName": "tradeGroupOne",
    "tradeGroupId": 91,
    "createTime": 1758043350000,
    "updateTime": 1758043350000
  },
  "code": 200,
  "msg": "success",
  "timestamp": 1758043350233
}
```

- **POST** `/api/v3/strategy/group`

**Permission:** SPOT_ACCOUNT_WRITE

**Weight(IP):** 20

**request**

| Name           | Type   | Mandatory | Description             |
| -------------- | ------ | --------- | ----------------------- |
| tradeGroupName | string | yes       | stp strategy group name |
| timestamp      | long   | yes       | timestamp               |
| signature      | string | yes       | signature               |

**return**

| Name           | Type   | Description             |
| -------------- | ------ | ----------------------- |
| tradeGroupName | string | stp strategy group name |
| tradeGroupId   | string | stp strategy group id   |
| createTime     | long   | create time             |

Precautions:

- Only the master account is allowed to create; sub-accounts cannot operate this
  endpoint
- The STP strategy group name must be unique under the same master account
- The STP strategy group ID is unique
- A master account can have up to 10 strategy groups
