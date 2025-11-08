# POST private/advanced/get-order-detail

**Source:** [private/advanced/get-order-detail](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-advanced-get-order-detail)

## Authentication

Required (Private Endpoint)

## private/advanced/get-order-detail

> Request Sample

```
{
  "id": 1,
  "method": "private/advanced/get-order-detail",
  "params": {
    "order_id": "19848525"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/advanced/get-order-detail",
  "code": 0,
  "result": {
    "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
    "order_id": "19848525",
    "client_oid": "1613571154900",
    "order_type": "LIMIT",
    "time_in_force": "GOOD_TILL_CANCEL",
    "side": "BUY",
    "exec_inst": [],
    "quantity": "0.0100",
    "limit_price": "50000.0",
    "order_value": "500.000000",
    "maker_fee_rate": "0.000250",
    "taker_fee_rate": "0.000400",
    "avg_price": "0.0",
    "cumulative_quantity": "0.0000",
    "cumulative_value": "0.000000",
    "cumulative_fee": "0.000000",
    "status": "ACTIVE",
    "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
    "order_date": "2021-02-17",
    "instrument_name": "BTCUSD",
    "fee_instrument_name": "USD",
    "list_id": 6498090546073120199,
    "contingency_type": "OTO",
    "leg_id": 2,
    "create_time": 1613575617173,
    "create_time_ns": "1613575617173123456",
    "update_time": 1613575617173
  }
}
```

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| order\_id | number or string of number | N | Order ID. `string` format is highly recommended, especially for JavaScript client. If not provided, `client_oid` must be specified. |
| client\_oid | string | N | Client Order ID. If not provided, `order_id` must be specified. |

Note: Either `order_id` or `client_oid` must be specified.

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name | Type | Description |
| --- | --- | --- |
| account\_id | string | Account ID |
| order\_id | string of number | Order ID |
| client\_oid | string | Client Order ID |
| order\_type | string | `LIMIT`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT` |
| time\_in\_force | string | `GOOD_TILL_CANCEL` |
| side | string | `BUY` or `SELL` |
| exec\_inst | array | `POST_ONLY` |
| quantity | string | Quantity specified in the order |
| limit\_price | string | Limit price specified in the order |
| order\_value | string | Order value |
| maker\_fee\_rate | string | User's maker fee rate |
| taker\_fee\_rate | string | User's taker fee rate |
| avg\_price | string | Average price |
| cumulative\_quantity | string | Cumulative executed quantity |
| cumulative\_value | string | Cumulative executed value |
| cumulative\_fee | string | Cumulative executed fee |
| status | string | Order status:  
\- `NEW`  
\- `PENDING`  
\- `REJECTED`  
\- `ACTIVE`  
\- `CANCELED`  
\- `FILLED` |
| update\_user\_id | string | Updated user |
| order\_date | string | Order creation date |
| create\_time | number | Order creation timestamp |
| create\_time\_ns | string | Order creation timestamp (nanosecond) |
| update\_time | number | Order update timestamp |
| instrument\_name | string | e.g. BTCUSD-PERP |
| fee\_instrument\_name | string | Currency used for the fees |
| list\_id | number | List id of OTO/OTOCO |
| contingency\_type | string | `OTO` or `OTOCO` |
| leg\_id | number | Leg id of OTO/OTOCO orders |

Note: To detect a 'partial filled' status, look for `status` as `ACTIVE` and `cumulative_quantity` > 0.