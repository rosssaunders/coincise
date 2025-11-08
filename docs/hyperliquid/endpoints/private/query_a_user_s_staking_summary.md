# Query a user's staking summary

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

####

[](#headers-15)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-17)

Request Body

Name

Type

Description

type\*

String

"delegatorSummary"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
{
    "delegated": "12060.16529862",
    "undelegated": "0.0",
    "totalPendingWithdrawal": "0.0",
    "nPendingWithdrawals": 0
}
```
