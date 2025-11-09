# Get Merge Market Depth

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get merge depth data

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/merge-depth

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/merge-depth?productType=usdt-futures&symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol      | String | Yes      | Trading pair                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| productType | String | Yes      | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| precision   | String | No       | Price accuracy, according to the selected accuracy as the step size to return the cumulative depth, enumeration value:<br>scale0/scale1/scale2/scale3<br>'scale0' is not merged, the default value<br>In general, 'scale1' is the merged depth of the transaction pair’s quotation accuracy<em>10<br>Generally, 'scale2' is the quotation precision </em>100<br>'scale3' is the quotation precision \*1000<br>The precision corresponding to 0/1/2/3 is subject to the actual return parameter "scale". The quotation precision of each trading pair is different, and some trading pairs does not have 'scale2', and the request for a scale that does not exist for the currency pair will be processed according to the maximum scale. Example: A certain trading pair only has scale 0/1, and when scale2 is requested, it will be automatically reduced to 'scale1'. |
| limit       | String | No       | Fixed gear enumeration value: 1/5/15/50/max, the default gear is 100, passing max returns the maximum gear of the trading pair<br>When the actual depth does not meet the limit, return according to the actual gear . If max is passed in, the maximum level of the trading pair will be returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695870963008,    "data": {        "asks": [            [                26347.5,                0.25            ],            [                26348.0,                0.16            ]        ],        "bids": [            [                26346.5,                0.16            ],            [                26346.0,                0.32            ]        ],        "ts": "1695870968804",        "scale": "0.1",        "precision": "scale0",        "isMaxPrecision": "NO"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter      | Type               | Description                                                                                               |
| :------------- | :----------------- | :-------------------------------------------------------------------------------------------------------- |
| asks           | List&lt;String&gt; | The selling price<br>elements are price and quantity.                                                     |
| &gt; Index 0   | String             | Price                                                                                                     |
| &gt; Index 1   | String             | Quantity                                                                                                  |
| bids           | List&lt;String&gt; | Buying price<br>The elements are price and quantity.                                                      |
| &gt; Index 0   | String             | Price                                                                                                     |
| &gt; Index 1   | String             | Quantity                                                                                                  |
| precision      | String             | Requested precision                                                                                       |
| scale          | String             | Actual precision value                                                                                    |
| isMaxPrecision | String             | YES indicates that the current accuracy is the maximum, NO indicates that it is not the maximum accuracy. |
| ts             | String             | Matching engine timestamp(ms), e.g. 1597026383085                                                         |

> **Source:** https://www.bitget.com/api-doc/contract/market/Get-Merge-Depth
