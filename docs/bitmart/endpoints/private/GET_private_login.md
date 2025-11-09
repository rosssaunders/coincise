# GET 【Private】Login

**Source:** [【Private】Login](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## 【Private】Login

### Login Subscription Format

> Request Format

`{"action":"access","args":["<API_KEY>","<timestamp>","<sign>","<dev>"]}`

Please note that the following parameters are all of type `String`

- `API_KEY`: The user's API key
- `timestamp`: Timestamp, the unit is milliseconds, it will expire after 60
  seconds
- `sign`: Signature, sign=CryptoJS.HmacSHA256(timestamp + "#" + your_api_memo +
  "#" + "bitmart.WebSocket", your_api_secret_key)
- `dev`: Device, web eg.

### Example

> Login Example

`{"action": "access", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556","web"]}`

> Response

`{"action":"access","success":true}`

Assume that the values of the API requested by the user is as follows:

- timestamp=1589267764859
- API_KEY = "80618e45710812162b04892c7ee5ead4a3cc3e56"
- API_SECRET =
  "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"
- API_MEMO = "test001";

Ues Javascript create param `sign`: sign =
`CryptoJS.HmacSHA256(1589267764859 + "#" + test001 + "#" + "bitmart.WebSocket", '6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9')`
= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

Ues Shell create param `sign`: sign =
`echo -n '1589267764859#test001#bitmart.WebSocket' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"`
(stdin)= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

The final login parameters are:

`{"action": "access", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556","web"]}`

#### Note

1\. If success field of return data is true, it indicates success  
2\. If the login fails, the link will be automatically disconnected
