# POST private/create-subaccount-transfer

**Source:**
[private/create-subaccount-transfer](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-create-subaccount-transfer)

## Authentication

Required (Private Endpoint)

## private/create-subaccount-transfer

> Request Sample

```
{
  "id": 1234,
  "method": "private/create-subaccount-transfer",
  "params": {
    "from": "12345678-0000-0000-0000-000000000001", // Possible value: the master account UUID, or a sub-account UUID.
    "to": "12345678-0000-0000-0000-000000000002",   // Possible value: the master account UUID, or a sub-account UUID.
    "currency": "CRO",
    "amount": "500"
  },
  "nonce": 1587846358253
}
```

> Response sample

```
{
  "id":1234,
  "method":"private/create-subaccount-transfer",
  "code":0
}
```

Transfer between subaccounts (and master account).

### Request params

| Name     | Type   | Required | Description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| from     | string | Y        | Account UUID to be debited                     |
| to       | string | Y        | Account UUID to be credit                      |
| currency | string | Y        | Currency symbol                                |
| amount   | string | Y        | Amount to transfer - must a be positive number |

### Applies To

REST

### Response attributes

| Name | Type   | Description                                              |
| ---- | ------ | -------------------------------------------------------- |
| code | number | 0 for successful transfer (NO_ERROR) else the error code |
