# GET Get Trading Pairs List (V1)

**Source:** [Get Trading Pairs List (V1)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Trading Pairs List (V1)

`Get a list of all trading pairs on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/symbols`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/v1/symbols`

None

#### Response Data

> Response

```json
{
  "code": 1000,
  "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
  "message": "OK",
  "data": {
    "symbols": [
      "BMX_ETH",
      "XLM_ETH",
      "MOBI_ETH"
    ]
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| symbols | List | Array of trading pairs |

##### Note

-   Returns an array of trading pairs
-   "BMX\_ETH" it means that the base currency of this trading pair is BMX, and the quote currency is ETH