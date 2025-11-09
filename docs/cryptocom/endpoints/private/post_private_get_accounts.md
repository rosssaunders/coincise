# POST private/get-accounts

**Source:**
[private/get-accounts](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-accounts)

## Authentication

Required (Private Endpoint)

## private/get-accounts

> Request Sample

```
{
  "id": 12,
  "method": "private/get-accounts",
  "params": {"page_size": 30,"page": 2},
  "nonce": 1587846358253
}
```

> Response Sample

```
{
  "id": 12,
  "method": "private/get-accounts",
  "code": 0,
  "result": {
    "master_account": {
      "uuid": "243d3f39-b193-4eb9-1d60-e98f2fc17707",
      "master_account_uuid": "291879ae-b769-4eb3-4d75-3366ebee7dd6",
      "margin_account_uuid": "69c9ab41-5b95-4d75-b769-e45f2fc16507",
      "enabled": true,
      "tradable": true,
      "name": "",
      "email": "user@crypto.com",
      "mobile_number": "",
      "country_code": "",
      "address": "",
      "margin_access": "DEFAULT",
      "derivatives_access": "DISABLED",
      "create_time": 1620962543792,
      "update_time": 1622019525960,
      "two_fa_enabled": true,
      "kyc_level": "ADVANCED",
      "suspended": false,
      "terminated": false
    },
    "sub_account_list": [
      {
        "uuid": "243d3f39-b193-4eb9-1d60-e98f2fc17707",
        "master_account_uuid": "291879ae-b769-4eb3-4d75-3366ebee7dd6",
        "margin_account_uuid": "69c9ab41-5b95-4d75-b769-e45f2fc16507",
        "label": "Sub Account",
        "enabled": true,
        "tradable": true,
        "name": "",
        "email": "user@crypto.com",
        "mobile_number": "",
        "country_code": "",
        "address": "",
        "margin_access": "DEFAULT",
        "derivatives_access": "DISABLED",
        "create_time": 1620962543792,
        "update_time": 1622019525960,
        "two_fa_enabled": true,
        "kyc_level": "ADVANCED",
        "suspended": false,
        "terminated": false
      }
    ]
  }
}
```

Get Account and its Sub Accounts

### Request Params

By default, the `page_size` is `20` and `page` is `0` respectively.

It can be overided in the JSON request: i.e. "page_size": 30, "page": 2

Note: if using default setting, please ensure you keep `params: {}` for API
request consistency.

### Applies To

REST

### REST Method

POST

### Response Attributes

an object of `master_account`, with an array of `sub_account_list`, both
consisting of:

| Name                | Type    | Description                                               |
| ------------------- | ------- | --------------------------------------------------------- |
| uuid                | string  | Sub account uuid                                          |
| master_account_uuid | string  | Master account uuid                                       |
| margin_account_uuid | string  | (optional) Margin account uuid                            |
| label               | string  | Sub account label                                         |
| enabled             | boolean | true or false                                             |
| tradable            | boolean | true or false                                             |
| name                | string  | Name of sub account                                       |
| email               | string  | Email of sub account                                      |
| mobile_number       | string  | Mobile number of sub account                              |
| country_code        | string  | Country Code of sub account                               |
| address             | string  | Address of sub account                                    |
| margin_access       | string  | DEFAULT or DISABLED                                       |
| derivatives_access  | string  | DEFAULT or DISABLED                                       |
| create_time         | number  | Creation timestamp (milliseconds since the Unix epoch)    |
| update_time         | number  | Last update timestamp (milliseconds since the Unix epoch) |
| two_fa_enabled      | boolean | true or false                                             |
| kyc_level           | string  | Kyc Level                                                 |
| suspended           | boolean | true or false                                             |
| terminated          | boolean | true or false                                             |
