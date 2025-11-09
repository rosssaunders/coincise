# POST public/get-valuations

**Source:**
[public/get-valuations](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-valuations)

## Authentication

Not Required (Public Endpoint)

## public/get-valuations

> Request Sample

```
https://{URL}/public/get-valuations?instrument_name=BTCUSD-INDEX&valuation_type=index_price&count=1
```

> Response Sample

```
{
  "id": 1,
  "method": "public/get-valuations",
  "code": 0,
  "result": {
    "data": [{
      "v": "50776.73000",
      "t": 1613547318000
    }],
    "instrument_name": "BTCUSD-INDEX"
  }
}
```

Fetches certain valuation type data for a particular instrument.

### Request Params

| Name            | Type   | Required | Description                  |
| --------------- | ------ | -------- | ---------------------------- |
| instrument_name | string | Y        | e.g. BTCUSD-INDEX            |
| valuation_type  | string | Y        | **List of available types:** |

a. `index_price`: returns per minute data of underlying reference price of the
instrument.  
b. `mark_price`: returns per minute data of mark price of the instrument.  
c. `funding_hist`: returns hourly data of the funding rate settled in past
hourly settlement.  
d. `funding_rate`: returns per minute data of current hourly funding rate that
will settle at the end of each hour of current 4-hour interval.  
e. `estimated_funding_rate`: returns per minute data of estimated funding rate
for the next interval.  
 | | count | number | N | Default is 25 | | start_ts | number | N | Default
timestamp is 30 days ago for `funding_hist`, and 1 day ago for other
valuation_type (Unix timestamp) | | end_ts | number | N | Default timestamp is
current time (Unix timestamp) |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name            | Type   | Description       |
| --------------- | ------ | ----------------- |
| instrument_name | string | e.g. BTCUSD-INDEX |
| data            | array  | See below         |

`data` consists of:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| v    | string | Value       |
| t    | long   | Timestamp   |
