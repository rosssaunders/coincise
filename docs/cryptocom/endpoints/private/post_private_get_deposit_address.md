# POST private/get-deposit-address

**Source:**
[private/get-deposit-address](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-deposit-address)

## Authentication

Required (Private Endpoint)

## private/get-deposit-address

> Request Sample

```
{
  "id": -1,
  "method": "private/get-deposit-address",
  "params": {
    "currency": "CRO",
  },
  "nonce": 1587846358253
}
```

> Response Sample

```
{
  "id": 11,
  "method": "private/get-deposit-address",
  "code": 0,
  "result": {
    "deposit_address_list": [
      {
        "currency": "CRO",
        "create_time": 1615886328000,
        "id": "12345",
        "address": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "status": "1",
        "network": "CRO"
      },
      {
        "currency": "CRO",
        "create_time": 1615886332000,
        "id": "12346",
        "address": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        "status": "1",
        "network": "ETH"
      }
    ]
  }
}
```

Fetches deposit address. Withdrawal setting must be enabled for your API Key. If
you do not see the option when viewing your API Keys, this feature is not yet
available for you.

### Request Params

| Name     | Type   | Required | Description   |
| -------- | ------ | -------- | ------------- |
| currency | string | Y        | E.g. BTC, CRO |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `deposit_address_list`, consisting of:

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| id       | long   | Newly created deposit ID |
| currency | string | E.g. BTC, CRO            |
| network  | string | E.g. ETH, CRO            |

When currency = CRO, network = CRO, it is a main net address.  
When currency = CRO, network = ETH, it is an ERC20 address. | | address | string
| Address with Address Tag (if any) | | create_time | long | | | status | string
| "0"

0 - Inactive  
1 - Active |
