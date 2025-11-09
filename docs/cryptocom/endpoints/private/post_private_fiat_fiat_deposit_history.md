# POST private/fiat/fiat-deposit-history

**Source:**
[private/fiat/fiat-deposit-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-deposit-history)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-deposit-history

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-deposit-history",
  "params": {
    "page": 0,
    "page_size": 10,
    "start_time": "1781126400000",
    "end_time": "1781127400000",
    "payment_networks": "usd_cubix"
  },
  "nonce": 1640995200000
}
```

> Response Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-deposit-history",
  "code": 0,
  "msg": "success",
  "data": {
    "transaction_history_list": [
            {
                "id": "068ccfae-a85d-4023-aca7-c5979ff16703",
                "account_id": "adb80cff-f420-469c-b439-4d90272bf1a1",
                "currency": "USD",
                "amount": "12.0",
                "amount_in_usd": null,
                "fee_currency": "USD",
                "fee_amount": "0.0",
                "fee_amount_in_usd": null,
                "payment_network": "usd_swift",
                "status": "completed",
                "created_at": "1751126400000",
                "updated_at": "1751126400000",
                "completed_at": null,
                "sender": {
                    "account_identifier_value": "12345555"
                },
                "beneficiary": null
            }
    ],
    "page": 0,
    "page_size": 10
  }
}
```

Retrieves paginated fiat deposit transaction history for the authenticated user.

### Request Params

| Field  | Type   | Required | Description                         |
| ------ | ------ | -------- | ----------------------------------- |
| id     | string | Y        | Unique request identifier           |
| method | string | Y        | "private/fiat/fiat-deposit-history" |
| params | object | Y        | Request parameters                  |
| nonce  | number | Y        | Unix timestamp in milliseconds      |

\***\*params\*\*** consists of:

| Field            | Type   | Required | Description                                                              |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------ |
| page             | number | Y        | Page number (0-based)                                                    |
| page_size        | number | Y        | Number of items per page                                                 |
| start_time       | string | N        | Start time for filtering transactions , required if end_time is provided |
| end_time         | string | N        | End time for filtering transactions                                      |
| payment_networks | string | N        | Comma-separated list of payment networks to filter by                    |

### Response Params

| Field                    | Type   | Required | Description                                                |
| ------------------------ | ------ | -------- | ---------------------------------------------------------- |
| id                       | string | N        | Echo back the request identifier from the original request |
| method                   | string | Y        | Method invoked                                             |
| code                     | number | Y        | 0 for success; otherwise, see error details                |
| msg                      | string | N        | Response message                                           |
| transaction_history_list | object | Y        | See below                                                  |

\***\*data\*\*** consists of:

| Field                    | Type                           | Required | Description                  |
| ------------------------ | ------------------------------ | -------- | ---------------------------- |
| transaction_history_list | transaction_history_list array | Y        | List of deposit transactions |
| page                     | number                         | Y        | Current page number          |
| page_size                | number                         | Y        | Number of items per page     |

\***\*transaction_history_list\*\*** consists of:

| Field           | Type   | Required | Description                                                |
| --------------- | ------ | -------- | ---------------------------------------------------------- |
| id              | string | Y        | Transaction ID                                             |
| amount          | string | Y        | Transaction amount                                         |
| currency        | string | Y        | Currency code                                              |
| status          | string | Y        | Transaction status (pending, completed, failed, cancelled) |
| payment_network | string | Y        | Payment network identifier                                 |
| created_at      | string | Y        | Transaction creation timestamp                             |
| completed_at    | string | N        | Transaction completion timestamp                           |
| fee             | string | N        | Transaction fee                                            |

### Applies To

REST

### REST Method

POST
