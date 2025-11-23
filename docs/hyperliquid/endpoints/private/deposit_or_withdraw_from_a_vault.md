# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Add or remove funds from a vault.

**Headers**

Name

Value

Content-Type\*

`application/json`

**Body**

Name

Type

Description

action\*

Object

{

"type": "vaultTransfer",

"vaultAddress": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000, "isDeposit": boolean,

"usd": number

}

nonce\*

number

Recommended to use the current timestamp in milliseconds

signature\*

Object

expiresAfter

Number

Timestamp in milliseconds

**Response**

```
{'status': 'ok', 'response': {'type': 'default'}}
```
