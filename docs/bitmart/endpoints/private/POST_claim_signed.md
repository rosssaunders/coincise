# POST Claim (SIGNED)

**Source:** [Claim (SIGNED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Claim (SIGNED)

`Simulated claim`

#### Request URL

`POST https://demo-api-cloud-v2.bitmart.com/contract/private/claim`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "34018ca3-fe24-446a-9e1d-f82edfb3e3",
  "data": {
    "currency": "USDT",
    "amount": "10"
  }
}
```

| Field    | Type   | Description           |
| -------- | ------ | --------------------- |
| currency | String | Currency              |
| amount   | String | Current asset balance |
