# Get Account List

Frequency limit: 10 times/1s (uid)

### Description[​](#description "Direct link to Description")

Query all account information under a certain product type

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/account/accounts

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/accounts?productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |

Response Example

```
{    "code": "00000",    "data": [        {            "marginCoin": "USDT",            "locked": "0.31876482",            "available": "10575.26735771",            "crossedMaxAvailable": "10580.56434289",            "isolatedMaxAvailable": "10580.56434289",            "maxTransferOut": "10572.92904289",            "accountEquity": "10582.90265771",            "usdtEquity": "10582.902657719473",            "btcEquity": "0.204885807029",            "crossedRiskRate": "0",            "unrealizedPL": "",            "coupon": "0",            "unionTotalMagin": "111,1",            "unionAvailable": "1111.1",            "unionMm": "111",            "assetList": [                {                    "coin": "BTC",                    "balance": "1.2",                    "available": "1.2"                }            ],            "isolatedMargin": "23.43",            "crossedMargin": "34.34",            "crossedUnrealizedPL":"23",            "isolatedUnrealizedPL":"0",            "assetMode": "union"        }    ],    "msg": "success",    "requestTime": 1630901215622}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter                | Type   | Description                                                                                   |
| :----------------------- | :----- | :-------------------------------------------------------------------------------------------- |
| &gt;marginCoin           | String | Margin coin                                                                                   |
| &gt;locked               | String | Locked quantity (margin coin)                                                                 |
| &gt;available            | String | Available quantity in the account                                                             |
| &gt;crossedMaxAvailable  | String | Maximum available balance to open positions under the cross margin mode (margin coin)         |
| &gt;isolatedMaxAvailable | String | Maximum available balance to open positions under the isolated margin mode (margin coin)      |
| &gt;maxTransferOut       | String | Maximum transferable amount                                                                   |
| &gt;accountEquity        | String | Account equity (margin coin),<br>Includes unrealized PnL (based on mark price)                |
| &gt;usdtEquity           | String | Account equity in USDT                                                                        |
| &gt;btcEquity            | String | Account equity in BTC                                                                         |
| &gt;crossedRiskRate      | String | Risk ratio in cross margin mode                                                               |
| &gt;unrealizedPL         | String | Unrealized PnL                                                                                |
| &gt;coupon               | String | Trading bonus                                                                                 |
| &gt;unionTotalMargin     | String | Multi-assets multi-assets mode                                                                |
| &gt;unionAvailable       | String | Available under multi-assets mode                                                             |
| &gt;unionMm              | String | Maintenance margin under multi-assets mode                                                    |
| &gt;assetList            | List   | Assets list under multi-assets mode                                                           |
| &gt;&gt;coin             | String | Coin name                                                                                     |
| &gt;&gt;balance          | String | Balance                                                                                       |
| &gt;&gt;available        | String | Maximum transferable amount<br>Unit: current coin                                             |
| &gt;isolatedMargin       | String | Isolated Margin Occupied                                                                      |
| &gt;crossedMargin        | String | Crossed Margin Occupied                                                                       |
| &gt;crossedUnrealizedPL  | String | unrealizedPL for croessed                                                                     |
| &gt;isolatedUnrealizedPL | String | unrealizedPL for isolated                                                                     |
| &gt;assetMode            | String | Assets mode<br><code>union</code> Multi-assets mode<br><code>single</code> Single-assets mode |

> **Source:** https://www.bitget.com/api-doc/contract/account/Get-Account-List
