# POST private/get-deposit-history

**Source:** [private/get-deposit-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-deposit-history)

## Authentication

Required (Private Endpoint)

## private/get-deposit-history

> Request Sample

```
{
  "id": -1,
  "method": "private/get-deposit-history",
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
  "method": "private/get-deposit-history",
  "code": 0,
  "result": {
    "deposit_list": [
      {
        "currency": "XRP",
        "fee": 1.0,
        "create_time": 1607063412000,
        "id": "2220",
        "update_time": 1607063460000,
        "amount": 100,
        "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890",
        "status": "1"
      }
    ]
  }
}
```

Fetches deposit history. If you do not see the option when viewing your API Keys, this feature is not yet available for you.  
  
Note: It works for master account only, not for sub-accounts.  

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| currency | string | N | E.g. BTC, CRO |
| start\_ts | long | N | Default is 90 days from current timestamp |
| end\_ts | long | N | Default is current timestamp |
| page\_size | int | N | Page size (Default: 20, Max: 200) |
| page | int | N | Page number (0-based) |
| status | string | N | "0"  
  
0 - Not Arrived  
1 - Arrived  
2 - Failed  
3 - Pending |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array of `deposit_list`, consisting of:

| Name | Type | Description |
| --- | --- | --- |
| id | long | Newly created deposit ID |
| currency | string | E.g. BTC, CRO |
| amount | decimal |  |
| fee | decimal |  |
| address | string | Address with Address Tag (if any) |
| create\_time | long |  |
| status | string | "0"  
  
0 - Not Arrived  
1 - Arrived  
2 - Failed  
3 - Pending |