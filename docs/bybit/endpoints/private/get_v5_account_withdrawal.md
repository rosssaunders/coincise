# GET /v5/account/withdrawal

**Source:**
[Get Transferable Amount (Unified)](https://bybit-exchange.github.io/docs/v5/account/unified-trans-amnt)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Account
- Get Transferable Amount (Unified)

On this page

# Get Transferable Amount (Unified)

Query the available amount to transfer of a specific coin in the Unified wallet.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/account/withdrawal`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                                                                   |
| :-------- | :------- | :----- | ---------------------------------------------------------------------------------------------------------- |
| coinName  | **true** | string | Coin name, uppercase only. Supports up to 20 coins per request, use comma to separate. `BTC,USDC,USDT,SOL` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter                                                                                                          | Type   | Comments                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------- | :----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| availableWithdrawal                                                                                                | string | Transferable amount for the 1st coin in the request                                                                                 |
| availableWithdrawalMap                                                                                             | Object | Transferable amount map for each requested coin. In the map, key is the requested coin, and value is the accordingly amount(string) |
| e.g., "availableWithdrawalMap":{"BTC":"4.54549050","SOL":"33.16713007","XRP":"10805.54548970","ETH":"17.76451865"} |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/account/withdrawal?coinName=BTC,SOL,ETH,XRP HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1739861239242X-BAPI-RECV-WINDOW: 5000Content-Type: application/json
```

```

```

```

```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "OK",    "result": {        "availableWithdrawal": "4.54549050",        "availableWithdrawalMap": {            "BTC": "4.54549050",            "SOL": "33.16713007",            "XRP": "10805.54548970",            "ETH": "17.76451865"        }    },    "retExtInfo": {},    "time": 1739858984601}
```

[

Previous

Get Wallet Balance

](/docs/v5/account/wallet-balance)[

Next

Upgrade to Unified Account

](/docs/v5/account/upgrade-unified-account)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
