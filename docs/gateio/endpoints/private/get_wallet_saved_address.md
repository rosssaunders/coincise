# GET /wallet/saved_address

**Source:**
[/wallet/saved_address](https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-withdrawal-address-whitelist) Query withdrawal address whitelist

`GET /wallet/saved_address`

_Query withdrawal address whitelist_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-parameters)

| Name     | In    | Type    | Required | Description                        |
| -------- | ----- | ------- | -------- | ---------------------------------- |
| currency | query | string  | true     | Currency                           |
| chain    | query | string  | false    | Chain name                         |
| limit    | query | string  | false    | Maximum number returned, up to 100 |
| page     | query | integer | false    | Page number                        |

> Example responses

> 200 Response

```
[
  {
    "currency": "usdt",
    "chain": "TRX",
    "address": "TWYirLzw2RARB2jfeFcfRPmeuU3rC7rakT",
    "name": "gate",
    "tag": "",
    "verified": "1"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-responses](https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsavedaddress-responseschema)

Status Code **200**

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| » currency | string | Currency                                                  |
| » chain    | string | Chain name                                                |
| » address  | string | Address                                                   |
| » name     | string | Name                                                      |
| » tag      | string | Tag                                                       |
| » verified | string | Whether to pass the verification 0-unverified, 1-verified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-personal-trading-fees) Query personal trading fees

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-fees](https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-fees)

> Code samples
