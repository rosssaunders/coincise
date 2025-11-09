# GET /v3/%7Bmarket%7D/financelog

**Title:** Spot, margin, OTC financial logs

**Source:**
[Spot, margin, OTC financial logs](https://docs.digifinex.com/en-ww/spot/v3/rest.html#spot-margin-otc-financial-logs)

## Authentication

Required (Private Endpoint)

---

## Spot, margin, OTC financial logs

### HTTP Request

- GET `https://openapi.digifinex.com/v3/{market}/financelog`

### Request Parameters

market：spot, margin

| Field         | Request Type | Mandatory | Description               |
| ------------- | ------------ | --------- | ------------------------- |
| market        | str          | true      | "spot","margin"           |
| currency_mark | str          | false     |                           |
| start_time    | int          | false     |                           |
| end_time      | int          | false     |                           |
| limit         | int          | false     | Default 100, maximum 1000 |

> Response:

```

{
    "data": {
        "finance": [
            {
                "time": 1743936061,
                "num": 0.0001,
                "balance": 3.471289738,
                "currency_mark": "USDT",
                "type": 119
            },
        ],
        "total": "196"
    },
    "code": 0
}
```

### Response Content

| Field | Mandatory | Request Type | Description |
| ----- | --------- | ------------ | ----------- |

time | true | int | time |  
num | true | float | num | balance | true | float | balance | currency_mark |
true | str | currency mark | type | true | int | type | total | true | str |
Total |  
code | true | int | Status |
