# POST private/create-withdrawal

**Source:**
[private/create-withdrawal](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-create-withdrawal)

## Authentication

Required (Private Endpoint)

## private/create-withdrawal

> Request Sample

```
{
  "id": -1,
  "method": "private/create-withdrawal",
  "params": {
    "client_wid": "my_withdrawal_002",
    "currency": "BTC",
    "amount": "1",
    "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
    "address_tag": "",
    "network_id": null
  },
  "nonce": "1607063412000"
}
```

> Response Sample

```
{
  "id":-1,
  "method":"private/create-withdrawal",
  "code":0,
  "result": {
    "id": 2220,
    "amount": 1,
    "fee": 0.0004,
    "symbol": "BTC",
    "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
    "client_wid": "my_withdrawal_002",
    "create_time":1607063412000,
    "network_id": null
  }
}
```

Creates a withdrawal request. Withdrawal setting must be enabled for your API
Key. If you do not see the option when viewing your API Key, this feature is not
yet available for you.

### Request Params

| Name        | Type    | Required | Description                                                                                                                                      |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| client_wid  | string  | N        | Optional Client withdrawal ID                                                                                                                    |
| currency    | string  | Y        | E.g. BTC, CRO                                                                                                                                    |
| amount      | decimal | Y        |                                                                                                                                                  |
| address     | string  | Y        |                                                                                                                                                  |
| address_tag | string  | N        | Secondary address identifier for coins like XRP, XLM etc. Also known as memo or tags.                                                            |
| network_id  | string  | N        | Select the desired network, require the address to be whitelisted first. See default_network and network in get-currency-networks for the value. |

### Helpful Information

- Withdrawal addresses must first be whitelisted in your account’s Withdrawal
  Whitelist page.
- Withdrawal fees and minimum withdrawal amount can be found on the Fees &
  Limits page on the Exchange website.

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | long    | Newly created withdrawal ID                                      |
| client_wid  | string  | (Optional) if a Client withdrawal ID was provided in the request |
| currency    | string  | E.g. BTC, CRO                                                    |
| amount      | decimal |                                                                  |
| fee         | decimal |                                                                  |
| address     | string  | Address with Address Tag (if any)                                |
| create_time | long    |                                                                  |
