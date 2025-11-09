# GET Transferable Coin List

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get transferable coin list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/wallet/transfer-coin-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/transfer-coin-info?fromType=isolated_margin&toType=spot" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \ }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| fromType | String | Yes | Account type  
`spot`: Spot account  
`p2p`: P2P account  
`coin_futures`: Coin-M futures account  
`usdt_futures`: USDT-M futures account  
`usdc_futures`: USDC-M futures account  
`crossed_margin`: Cross margin account  
`isolated_margin`: Isolated margin account |
| toType | String | Yes | Account type  
`spot`: Spot account  
`p2p`: P2P account  
`coin_futures`: Coin-M futures account  
`usdt_futures`: USDT-M futures account  
`usdc_futures`: USDC-M futures account  
`crossed_margin`: Cross margin account  
`isolated_margin`: Isolated margin account |

Response Example

```
{    "code":"00000",    "msg":"success",    "requestTime":1683875302853,    "data":[        "BTC",        "USDT",        "ETH"    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | List | transfer\_in and transfer\_out of accounts supports coins intersection. |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Transfer-Coins
