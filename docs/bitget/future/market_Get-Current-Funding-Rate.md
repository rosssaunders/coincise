# Get Current Funding Rate

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get the current funding rate of the contract

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/current-fund-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/current-fund-rate?symbol=BTCUSDT&productType=usdt-futures"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | String | No       | Trading pair                                                                                                                                     |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1743054548546,  "data": [    {      "symbol": "BTCUSDT",      "fundingRate": "0.000068",      "fundingRateInterval": "8",      "nextUpdate": "1743062400000",      "minFundingRate": "-0.003",      "maxFundingRate": "0.003"    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter               | Type   | Description                                                                                                                                |
| :---------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| &gt;symbol              | String | Trading pair name                                                                                                                          |
| &gt;fundingRate         | String | Current funding rates                                                                                                                      |
| &gt;fundingRateInterval | String | Funding rate settlement period<br>Unit: hour. Enumeration values include 1, 2, 4, 8. 1 represents 1 hour, 2 represents 2 hours, and so on. |
| &gt;nextUpdate          | String | Next update time<br>Unix timestamp in milliseconds                                                                                         |
| &gt;minFundingRate      | String | Lower limit of funding rate<br>Returned in decimal form. 0.025 represents 2.5%.                                                            |
| &gt;maxFundingRate      | String | Upper limit of funding rate<br>Returned in decimal form. 0.025 represents 2.5%.                                                            |

> **Source:**
> https://www.bitget.com/api-doc/contract/market/Get-Current-Funding-Rate
