# DELETE /api/v3/strategy/group

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#delete-stp-strategy-group

> request

```bash
delete /api/v3/strategy/group?tradeGroupId=91&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{    "data": true,    "code": 200,    "msg": "success",    "timestamp": 1758044399749}
```

-   **DELETE** `/api/v3/strategy/group`

**Permission:** SPOT\_ACCOUNT\_W

**Weight(IP):** 20

**request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| tradeGroupId | string | yes | stp strategy group id |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**return**

| Name | Type | Description |
| --- | --- | --- |
| msg | string | delete status |

Precautions:

-   Only the master account is allowed to delete; sub-accounts cannot access
-   Only strategy groups under the current master account can be operated; cross-master-account operations are not allowed
