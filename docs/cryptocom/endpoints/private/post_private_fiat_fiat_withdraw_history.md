# POST private/fiat/fiat-withdraw-history

**Source:**
[private/fiat/fiat-withdraw-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-fiat-fiat-withdraw-history)

## Authentication

Required (Private Endpoint)

## private/fiat/fiat-withdraw-history

> Request Sample

```
{
  "id": "123456",
  "method": "private/fiat/fiat-withdraw-history",
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
    "id": 0,
    "code": 0,
    "result": {
        "page": 0,
        "page_size": 10
        "transaction_history_list": [
            {
                "id": "37190e06-d4b4-4909-9177-e6117cbbf40f",
                "account_id": "adb80cff-f420-469c-b439-4d90272bf1a1",
                "currency": "USD",
                "amount": "501.0",
                "amount_in_usd": "501.0",
                "fee_currency": "USD",
                "fee_amount": "0.0",
                "fee_amount_in_usd": null,
                "payment_network": "usd_cubix",
                "status": "completed",
                "created_at": "1744888258315",
                "updated_at": "1744888470530",
                "completed_at": "1744888470530",
                "sender": null,
                "beneficiary": {
                    "account_identifier_value": "d1b2b0d2-890f-4f57-a81b-b1cd016bcc63"
                }
            },
            {
                "id": "73bd49f7-a5b3-486d-86c4-b064b87a5bdf",
                "account_id": "adb80cff-f420-469c-b439-4d90272bf1a1",
                "currency": "USD",
                "amount": "1031027.0",
                "amount_in_usd": "1031027.0",
                "fee_currency": "USD",
                "fee_amount": "45.0",
                "fee_amount_in_usd": null,
                "payment_network": "usd_swift",
                "status": "failed",
                "created_at": "1744363629764",
                "updated_at": "1744381822795",
                "completed_at": null,
                "sender": null,
                "beneficiary": {
                    "account_identifier_value": "12345677"
                }
            }
        ]
    }
}
```

Retrieves paginated fiat withdrawal transaction history for the authenticated
user.

### Request Params

| Field  | Type   | Required | Description                          |
| ------ | ------ | -------- | ------------------------------------ |
| id     | string | Y        | Unique request identifier            |
| method | string | Y        | "private/fiat/fiat-withdraw-history" |
| params | object | Y        | Request parameters                   |
| nonce  | number | Y        | Unix timestamp in milliseconds       |

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
| id                       | string | Y        | Echo back the request identifier from the original request |
| method                   | string | Y        | Method invoked                                             |
| code                     | number | Y        | 0 for success; otherwise, see error details                |
| msg                      | string | N        | Response message                                           |
| transaction_history_list | object | Y        | See below                                                  |

\***\*data\*\*** consists of:

| Field                    | Type                           | Required | Description                     |
| ------------------------ | ------------------------------ | -------- | ------------------------------- |
| transaction_history_list | transaction_history_list array | Y        | List of withdrawal transactions |
| page                     | number                         | Y        | Current page number             |
| page_size                | number                         | Y        | Number of items per page        |

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
| beneficiary     | object | N        | Beneficiary details for withdrawals                        |
| fee             | string | N        | Transaction fee                                            |

### Applies To

REST

### REST Method

POST
