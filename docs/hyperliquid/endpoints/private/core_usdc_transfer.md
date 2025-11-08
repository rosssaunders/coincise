# Core USDC transfer

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Send usd to another address. This transfer does not touch the EVM bridge. The signature format is human readable for wallet interfaces.

#### 

[](#headers-8)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-8)

Request Body

Name

Type

Description

action\*

Object

{

"type": "usdSend",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,

"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,

"amount": amount of usd to send as a string, e.g. "1" for 1 usd,

"time": current timestamp in milliseconds as a Number, should match nonce

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

200: OK Successful Response

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
