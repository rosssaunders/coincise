# POST private/get-account-settings

**Source:**
[private/get-account-settings](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-account-settings)

## Authentication

Required (Private Endpoint)

## private/get-account-settings

> Request Sample

```
{
  "id": 697,
  "method": "private/get-account-settings",
  "api_key": "00000009-1111-1111-1111-000000000000",
  "params": {},
  "nonce": 1721989202781
}
```

> Response Sample

```
{
  "id": 697,
  "method": "private/get-account-settings",
  "code": 0,
  "result": [
    {
      "leverage": 20,
      "stp_id": 100,
      "stp_scope": "S",
      "stp_inst": "M"
    }
  ]
}
```

Get the STP account settings.

### Request Params

N/A

### Response Attributes

| Name               | Type   | Description                                                                                                                             |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| code               | number | 0 for successful changes                                                                                                                |
| result -> leverage | number | The max leverage user set on the account. When account effective leverage exceeds this, further risk increasing orders will be rejected |
| result -> stp_id   | number | Optional Field                                                                                                                          |

Possible Value: 0 to 32767

Default Value  
\- If stp_scope & stp_inst are not specified, REJECT  
\- If stp_scope is specified, default value = 0.

Note: orderbook-specific settings takes higher precedence. | | result ->
stp_scope | string | Optional Field

Possible Values  
\- M: Matches Master or Sub a/c  
\- S: Matches Sub a/c only

Note: orderbook-specific settings takes higher precedence. | | result ->
stp_inst | string | Possible Values  
\- M: Cancel Maker  
\- T: Cancel Taker  
\- B: Cancel Both Maker and Taker |

### Applies To

REST

### REST Method

POST
