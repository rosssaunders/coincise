# DELETE /api/v3/strategy/group/uid

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#delete-uid-to-stp-strategy-group

> request

```bash
delete /api/v3/strategy/group/uid?uid=49910594&ttradeGroupId=92&timestamp={{timestamp}}&signature={{signature}}
```

> return

```json
{    "data": true,    "code": 200,    "msg": "success",    "timestamp": 1758045403352}
```

-   **DELETE** `/api/v3/strategy/group/uid`

**Permission:** SPOT\_ACCOUNT\_WRITE

**Weight(IP):** 20

**request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| uid | string | yes | separated by , |
| tradeGroupId | string | yes | stp strategy group id |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**return**

| Name | Type | Description |
| --- | --- | --- |
| msg | string | delete status |

Precautions:

-   Only the main account is allowed to delete; sub-accounts cannot access
-   Only strategy groups under the current master account can be operated; cross-master-account operations are not allowed
