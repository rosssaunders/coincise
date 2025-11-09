# Core spot transfer

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Send spot assets to another address. This transfer does not touch the EVM
bridge. The signature format is human readable for wallet interfaces.

####

[](#headers-9)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-9)

Request Body

Name

Type

Description

action\*

Object

{

"type": "spotSend",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),
"signatureChainId": the id of the chain used when signing in hexadecimal format;
e.g. "0xa4b1" for Arbitrum,

"destination": address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000, "token": tokenName:tokenId; e.g.
"PURR:0xc4bf3f870c0e9465323c0b6ed28096c2",

"amount": amount of token to send as a string, e.g. "0.01",

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

Copy

```
Example sign typed data for generating the signature:
{
  "types": {
    "HyperliquidTransaction:SpotSend": [
      {
        "name": "hyperliquidChain",
        "type": "string"
      },
      {
        "name": "destination",
        "type": "string"
      },
      {
        "name": "token",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "string"
      },
      {
        "name": "time",
        "type": "uint64"
      }
    ]
  },
  "primaryType": "HyperliquidTransaction:SpotSend",
  "domain": {
    "name": "HyperliquidSignTransaction",
    "version": "1",
    "chainId": 42161,
    "verifyingContract": "0x0000000000000000000000000000000000000000"
  },
  "message": {
    "destination": "0x0000000000000000000000000000000000000000",
    "token": "PURR:0xc1fb593aeffbeb02f85e0308e9956a90",
    "amount": "0.1",
    "time": 1716531066415,
    "hyperliquidChain": "Mainnet"
  }
}
```
