# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name       | Type       | Description                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------ |
| type\*<br> | String<br> | "userRole"<br>                                                                                   |
| user\*<br> | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

User

Agent

Vault

Subaccount

Missing

```json
{"role":"user"} # "missing", "user", "agent", "vault", or "subAccount"
```

```json
{ "role": "agent", "data": { "user": "0x..." } }
```

```json
{ "role": "vault" }
```

```json
{ "role": "subAccount", "data": { "master": "0x..." } }
```

```json
{ "role": "missing" }
```
