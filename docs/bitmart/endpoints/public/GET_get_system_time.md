# GET Get System Time

**Source:** [Get System Time](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get System Time

`Get system time`

#### Request URL

`GET https://api-cloud.bitmart.com/system/time`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/system/time`

None

#### Response Data

> Response

```json
{
  "code": 1000,
  "trace": "886fb6ae-456b-4654-b4e0-d681ac05cea1",
  "message": "OK",
  "data": {
    "server_time": 1527777538000
  }
}
```

| Field       | Type | Description                                               |
| ----------- | ---- | --------------------------------------------------------- |
| server_time | Long | Current system time (timestamp, accuracy in milliseconds) |
