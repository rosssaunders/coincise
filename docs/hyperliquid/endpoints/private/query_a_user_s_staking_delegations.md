# Query a user's staking delegations

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

#### 

[](#headers-14)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-16)

Request Body

Name

Type

Description

type\*

String

"delegations"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
[
    {
        "validator":"0x5ac99df645f3414876c816caa18b2d234024b487",
        "amount":"12060.16529862",
        "lockedUntilTimestamp":1735466781353
    },
    ...
]
```
