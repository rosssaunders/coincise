# GET Transferable Coin List

Frequency limit:10 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Get transferable coin list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/wallet/transfer-coin-info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/transfer-coin-info?fromType=isolated_margin&toType=spot" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*******" \   -H "ACCESS-PASSPHRASE:*****" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \ }'
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                   |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromType  | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |
| toType    | String | Yes      | Account type<br><code>spot</code>: Spot account<br><code>p2p</code>: P2P account<br><code>coin_futures</code>: Coin-M futures account<br><code>usdt_futures</code>: USDT-M futures account<br><code>usdc_futures</code>: USDC-M futures account<br><code>crossed_margin</code>: Cross margin account<br><code>isolated_margin</code>: Isolated margin account |

Response Example

```
{    "code":"00000",    "msg":"success",    "requestTime":1683875302853,    "data":[        "BTC",        "USDT",        "ETH"    ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description                                                           |
| :-------- | :--- | :-------------------------------------------------------------------- |
| data      | List | transfer_in and transfer_out of accounts supports coins intersection. |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Transfer-Coins
