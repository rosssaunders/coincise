# Query a user's role

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

####

[](#headers-10)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-12)

Request Body

Name

Type

Description

type\*

String

"userRole"

user\*

String

Address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000.

User

Agent

Vault

Subaccount

Missing

Copy

```
{"role":"user"} # "missing", "user", "agent", "vault", or "subAccount"
```

Copy

```
{"role":"agent", "data": {"user": "0x..."}}
```

Copy

```
{"role":"vault"}
```

Copy

```
{"role":"subAccount", "data":{"master":"0x..."}}
```

Copy

```
{"role":"missing"}
```
