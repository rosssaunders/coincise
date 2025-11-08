# GET /v3/markets

**Title:** All the market description

**Source:** [All the market description](https://docs.digifinex.com/en-ww/spot/v3/rest.html#all-the-market-description)

## Authentication

Not Required (Public Endpoint)

---

## All the market description

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/markets`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
    "data": [{
        "volume_precision": 4,
        "price_precision": 2,
        "market": "btc_usdt",
        "min_amount": 2,
        "min_volume": 0.0001
    }],
    "date": 1589873858,
    "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| data | true | object | Trading Pair Information |
| volume\_precision | true | int | Volume Precision |
| price\_precision | true | int | Price Precision |
| market | true | string | Symbol Name |
| min\_amount | true | float | Minimum Trading Amount |
| min\_volume | true | float | Minimum Trading Volume |
| date | true | int | Timestamp |
| code | true | int | Status |