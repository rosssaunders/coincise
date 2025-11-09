# POST private/get-withdrawal-history

**Source:**
[private/get-withdrawal-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-withdrawal-history)

## Authentication

Required (Private Endpoint)

## private/get-withdrawal-history

> Request Sample

```
{
  "id": -1,
  "method": "private/get-withdrawal-history",
  "params": {
    "currency": "XRP",
    "start_ts": 1587846300000,
    "end_ts": 1587846358253,
    "page_size": 2,
    "page": 0,
    "status": "1"
  },
  "nonce": 1587846358253
}
```

> Response Sample

```
{
  "id": 11,
  "method": "private/get-withdrawal-history",
  "code": 0,
  "result": {
    "withdrawal_list": [
      {
        "currency": "XRP",
        "client_wid": "my_withdrawal_002",
        "fee": 1.0,
        "create_time": 1607063412000,
        "id": "2220",
        "update_time": 1607063460000,
        "amount": 100,
        "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890",
        "status": "1",
        "txid": "",
        "network_id": null
      }
    ]
  }
}
```

Fetches withdrawal history. If you do not see the option when viewing your API
Keys, this feature is not yet available for you.

Note: It works for master account only, not for sub-accounts.

### Request Params

| Name      | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| currency  | string | N        | E.g. BTC, CRO                             |
| start_ts  | long   | N        | Default is 90 days from current timestamp |
| end_ts    | long   | N        | Default is current timestamp              |
| page_size | int    | N        | Page size (Default: 20, Max: 200)         |
| page      | int    | N        | Page number (0-based)                     |
| status    | string | N        | "0"                                       |

0 - Pending  
1 - Processing  
2 - Rejected  
3 - Payment In-progress  
4 - Payment Failed  
5 - Completed  
6 - Cancelled |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `withdrawal_list`, consisting of:

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| id          | long    | Newly created withdrawal ID                                      |
| client_wid  | string  | (Optional) if a Client withdrawal ID was provided in the request |
| currency    | string  | E.g. BTC, CRO                                                    |
| amount      | decimal |                                                                  |
| fee         | decimal |                                                                  |
| address     | string  | Address with Address Tag (if any)                                |
| create_time | long    |                                                                  |
| status      | string  | "0"                                                              |

0 - Pending  
1 - Processing  
2 - Rejected  
3 - Payment In-progress  
4 - Payment Failed  
5 - Completed  
6 - Cancelled | | txid | string | Transaction hash | | network_id | string |
Network for the transaction - please see get-currency-networks. Only available
when Exchange support multiple network on the currency |
