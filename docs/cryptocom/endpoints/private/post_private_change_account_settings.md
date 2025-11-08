# POST private/change-account-settings

**Source:** [private/change-account-settings](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-change-account-settings)

## Authentication

Required (Private Endpoint)

## private/change-account-settings

> Request Sample

```
{
  "id": 696,
  "method": "private/change-account-settings",
  "api_key": "00000009-1111-1111-1111-000000000000",
  "params": {
    "stp_scope": "S",
    "stp_id": "100",
    "stp_inst": "M"
  },
  "nonce": 1721989111722
}
```

> Response Sample

```
{
  "id": 696,
  "method": "private/change-account-settings",
  "code": 0
}
```

Change account level settings regarding STP and other properties.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| stp\_scope | string | N | Optional Field  
  
Possible Values:  
M: Matches Master or Sub a/c  
S: Matches Sub a/c only  
D: for resetting all STP fields to original default values.  
  
Remark:  
Once 'D' is filled to 'stp\_scope', inputs in 'stp\_inst' and 'stp\_id' fields in the same request will be ignored. |
| stp\_inst | number | N | Mandatory if stp\_scope is set.  
Possible Values  
M: Cancel Maker  
T: Cancel Taker  
B: Cancel Both Maker and Taker |
| stp\_id | string of number | N | Optional Field:  
Possible Value: 0 to 32767  
Default Value  
If stp\_scope & stp\_inst are not specified, REJECT  
If stp\_scope is specified, default value = 0. |
| leverage | number | N | Maximum leverage user intends to set for the account. Valid values are between 1-50 (inclusive). When account effective leverage exceeds this, further risk increasing orders will be rejected |

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| code | number | 0 for successful changes |

### Applies To

REST

### REST Method

POST