# POST public/get-insurance

**Source:** [public/get-insurance](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-insurance)

## Authentication

Not Required (Public Endpoint)

## public/get-insurance

> Request Sample

```
https://{URL}/public/get-insurance?instrument_name=USD&count=1
```

> Response Sample

```
{
  "id": 1,
  "method": "public/get-insurance",
  "code": 0,
  "result": {
    "data": [{
      "v": "50000000",
      "t": 1613539503965
    }],
    "instrument_name": "USD"
  }
}
```

Fetches balance of Insurance Fund for a particular currency.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | Y | e.g. USD |
| count | number | N | Default is 25 |
| start\_ts | number | N | Default timestamp is 1 day ago (Unix timestamp) |
| end\_ts | number | N | Default timestamp is current time (Unix timestamp) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | e.g. USD |
| data | array | See below |

`data` consists of:

| Name | Type | Description |
| --- | --- | --- |
| v | string | Value |
| t | long | Timestamp |