# Query a user's HIP-3 DEX abstraction state

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

#### 

[](#headers-18)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-20)

Request Body

Name

Type

Description

type\*

String

"userDexAbstraction"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
true
```
