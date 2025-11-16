# VIP Fee Rate

Rate limit:10 req/sec/IP

### Description[​](#description "Direct link to Description")

Get VIP fee rate

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/vip-fee-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/vip-fee-rate"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

N/A

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695794449789,    "data": [        {            "level": "1",            "dealAmount": "100000",            "assetAmount": "50000",            "takerFeeRate": "0.0006",            "makerFeeRate": "0.0004",            "btcWithdrawAmount": "300",            "usdtWithdrawAmount": "5000000"        },        {            "level": "2",            "dealAmount": "200000",            "assetAmount": "500000",            "takerFeeRate": "0.0006",            "makerFeeRate": "0.0004",            "btcWithdrawAmount": "300",            "usdtWithdrawAmount": "5000000"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter             | Type   | Description                                                      |
| :-------------------- | :----- | :--------------------------------------------------------------- |
| \> level              | String | VIP level                                                        |
| \> dealAmount         | String | Total trading volume of the last 30 days, USDT                   |
| \> assetAmount        | String | Total assets, USDT                                               |
| \> takerFeeRate       | String | Taker rate, '0.000425' means 4.25 with four decimal places ahead |
| \> makerFeeRate       | String | Maker rate, '0.00006' means 0.6 with four decimal places ahead   |
| \> btcWithdrawAmount  | String | 24-hour withdrawal limit (BTC)                                   |
| \> usdtWithdrawAmount | String | 24-hour withdrawal limit (USDT)                                  |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-VIP-Fee-Rate
