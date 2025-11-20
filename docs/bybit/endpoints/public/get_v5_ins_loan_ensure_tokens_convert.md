# Get Margin Coin Info

tip

-   When queried without an API key, this endpoint returns public margin data
-   If your UID is bound with an OTC loan, then you can get your private margin data by calling with your API key
-   If your UID is not bound with an OTC loan but you passed your API key, this endpoint returns public margin data

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/ins-loan/ensure-tokens-convert`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| productId | false | string | Product ID. If not passed, returns all margin products. For spot, it returns coins with a `convertRatio` greater than 0. |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| marginToken | array | Object |
| \> productId | string | Product Id |
| \> tokenInfo | array | Spot margin coin |
| \>> token | string | Margin coin |
| \>> convertRatioList | array | Margin coin convert ratio List |
| \>>> ladder | string | ladder |
| \>>> convertRatio | string | Margin coin convert ratio |

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
GET /v5/ins-loan/ensure-tokens-convert HTTP/1.1Host: api-testnet.bybit.com
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_margin_coin_info())
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getInstitutionalLendingMarginCoinInfoWithConversionRate({    productId: '81',  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "",    "result": {        "marginToken": [            {                "productId": "81",                "tokenInfo": [                    {                        "token": "USDT",                        "convertRatioList": [                            {                                "ladder": "0-500",                                "convertRatio": "0.95"                            },                            {                                "ladder": "500-1000",                                "convertRatio": "0.9"                            },                            {                                "ladder": "1000-2000",                                "convertRatio": "0.8"                            },                            {                                "ladder": "2000-4000",                                "convertRatio": "0.7"                            },                            {                                "ladder": "4000-99999999999",                                "convertRatio": "0.6"                            }                        ]                    }                  ...                ]            },            {                "productId": "82",                "tokenInfo": [                    ...                    {                        "token": "USDT",                        "convertRatioList": [                            {                                "ladder": "0-1000",                                "convertRatio": "0.7"                            },                            {                                "ladder": "1000-2000",                                "convertRatio": "0.65"                            },                            {                                "ladder": "2000-99999999999",                                "convertRatio": "0.6"                            }                        ]                    }                ]            },            {                "productId": "84",                "tokenInfo": [                    ...                    {                        "token": "BTC",                        "convertRatioList": [                            {                                "ladder": "0-1000",                                "convertRatio": "1"                            },                            {                                "ladder": "1000-5000",                                "convertRatio": "0.9"                            },                            {                                "ladder": "5000-99999999999",                                "convertRatio": "0.55"                            }                        ]                    }                ]            }        ]    },    "retExtInfo": {},    "time": 1683276016497}
```