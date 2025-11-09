# POST private/get-currency-networks

**Source:**
[private/get-currency-networks](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-currency-networks)

## Authentication

Required (Private Endpoint)

## private/get-currency-networks

> Request Sample

```
{
  "id": 12,
  "method": "private/get-currency-networks",
  "params": {},
  "api_key": "api_key",
  "sig": "9b4e5428970d88270ac18aa680d33bf6a42390db2060e7f3b81f579a99cea9d5",
  "nonce": :1640830660110
}
```

> Response Sample

```
{
  "code": 0,
  "result": {
    "update_time": 1641151604000,
    "currency_map": {
      "AGLD": {
        "full_name": "Adventure Gold",
        "default_network": null,
        "network_list": [
          {
            "network_id": "ETH",
            "withdrawal_fee": null,
            "withdraw_enabled": true,
            "min_withdrawal_amount": 10.0,
            "deposit_enabled": true,
            "confirmation_required": 12
          }
        ]
      },
      "MATIC": {
        "full_name": "Polygon",
        "default_network": "ETH",
        "network_list": [
          {
            "network_id": "BNB",
            "withdrawal_fee": 0.80000000,
            "withdraw_enabled": true,
            "min_withdrawal_amount": 1.6,
            "deposit_enabled": true,
            "confirmation_required": 0
          },
          {
            "network_id": "ETH",
            "withdrawal_fee": 20.00000000,
            "withdraw_enabled": true,
            "min_withdrawal_amount": 40.0,
            "deposit_enabled": true,
            "confirmation_required": 0
          },
          {
            "network_id": "MATIC",
            "withdrawal_fee": 0.08000000,
            "withdraw_enabled": true,
            "min_withdrawal_amount": 0.16,
            "deposit_enabled": true,
            "confirmation_required": 0
          }
        ]
      }
    }
  }
}
```

Get the symbol network mapping.

### Request Params

| Name              | Type | Required | Description |
| ----------------- | ---- | -------- | ----------- |
| no param required | N/A  |          |             |

**Note**:  
i. You still need to pass in an empty `params` block like `params: {}` for API
request consistency  
ii. It works for master account only, not for sub-accounts.

### Applies To

REST

### REST Method

POST

### Response Attributes

An Map of `currency`, consisting of:

| Name            | Type   | Description                                                                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| full_name       | string | e.g. SHIBA INU                                                                                                                  |
| default_network | string | If network is not provided in create-withdrawal, it will search for default_network, if there is more than 1 network available. |
| network_list    | string | A list of networks                                                                                                              |

network_list:

| Name                  | Type    | Description                                      |
| --------------------- | ------- | ------------------------------------------------ |
| network_id            | string  | the network id, can be used in create-withdrawal |
| withdraw_enabled      | boolean |                                                  |
| deposit_enabled       | boolean |                                                  |
| withdrawal_fee        | decimal |                                                  |
| min_withdrawal_amount | decimal |                                                  |
| confirmation_required | int     | confirmation blocks count                        |
