# Get Isolated margin borrowing ratio Data

Frequency limit: 1 times/1s (IP)

### Description[​](#description "Direct link to Description")

The ratio of borrowed amount in the base currency (left) and borrowed amount in
the quote currency (right) in isolated margin accounts, converted to USDT.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/market/isolated-borrow-rate

Request Example

```
curl "https://api.bitget.com/api/v2/mix/market/isolated-borrow-rate?symbol=BTCUSDT"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type   | Required | Description                                                                |
| :-------- | :----- | :------- | :------------------------------------------------------------------------- |
| symbol    | String | Yes      | Trading pair                                                               |
| period    | String | No       | Default:<code>24h</code>, support:<br><code>24h</code><br><code>30d</code> |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1656589586807,    "data": [        {            "ts": "1713942000000",            "borrowRate": "-0.96"        },        {            "ts": "1713942000000",            "borrowRate": "-0.96"        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter  | Type   | Description      |
| :--------- | :----- | :--------------- |
| borrowRate | String | borrow ratio     |
| ts         | String | Millseconds time |

> **Source:**
> https://www.bitget.com/api-doc/common/apidata/Margin-Iso-Borrow-Ratio
