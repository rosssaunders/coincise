# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Send spot assets to another address. This transfer does not touch the EVM
bridge. The signature format is human readable for wallet interfaces.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | {<br>"type": "spotSend",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000, "token": tokenName:tokenId; e.g. "PURR:0xc4bf3f870c0e9465323c0b6ed28096c2",<br>"amount": amount of token to send as a string, e.g. "0.01",<br>"time": current timestamp in milliseconds as a Number, should match nonce<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```

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
