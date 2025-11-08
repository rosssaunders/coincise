# GET put/call ratio

Source: [https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-put-call-ratio](https://www.okx.com/docs-v5/en/#trading-statistics-rest-api-get-put-call-ratio)

### Get put/call ratio

Retrieve the open interest ratio and trading volume ratio of calls vs puts.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rubik/stat/option/open-interest-volume-ratio`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ccy | String | Yes | Currency |
| period | String | No | Period, the default is `8H`. e.g. \[`8H/1D`\]  
Each granularity can only query 72 pieces of data at the earliest |

#### Response Parameters

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| ts | String | Timestamp of data generation time |
| oiRatio | String | Long/Short open interest ratio |
| volRatio | String | Long/Short trading volume ratio |

The return value array order is: \[ts,oiRatio,volRatio\]
