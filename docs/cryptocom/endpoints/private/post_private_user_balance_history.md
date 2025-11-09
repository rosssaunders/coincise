# POST private/user-balance-history

**Source:**
[private/user-balance-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-user-balance-history)

## Authentication

Required (Private Endpoint)

## private/user-balance-history

> Request Sample

```
{
  "id":11,
  "method": "private/user-balance-history",
  "params": {}
}
```

> Response Sample

```
{
  "id": 11,
  "method": "private/user-balance-history",
  "code": 0,
  "result": {
    "instrument_name": "USD",
    "data": [
      {
        "t": 1629478800000,
        "c": "811.621851"
      }
    ]
  }
}
```

Returns the user's balance history. This call may temporarily have discrepancies
with that shown on the GUI.

### Request Params

| Name      | Type   | Required | Description                                                                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| timeframe | string | N        | `H1` means every hour, `D1` means every day. Omit for 'D1'                                                  |
| end_time  | number | N        | Can be millisecond or nanosecond. Exclusive. If not provided, will be current time.                         |
| limit     | int    | N        | If timeframe is `D1`, max `limit` will be 30 (days). If timeframe is `H1`, max `limit` will be 120 (hours). |

**Note**: If you omit all parameters, you still need to pass in an empty
`params` block like `params: {}` for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array consisting of:

| Name            | Type   | Description                             |
| --------------- | ------ | --------------------------------------- |
| instrument_name | string | instrument name of the balance e.g. USD |
| t               | number | timestamp                               |
| c               | string | total cash balance                      |
