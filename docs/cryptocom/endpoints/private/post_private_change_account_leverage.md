# POST private/change-account-leverage

**Source:** [private/change-account-leverage](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-change-account-leverage)

## Authentication

Required (Private Endpoint)

## private/change-account-leverage

> Request Sample

```
{
  "id": 1,
  "method": "private/change-account-leverage",
  "params": {
    "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
    "leverage": 10
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/change-account-leverage",
  "code": 0
}
```

Changes the maximum leverage used by the account. Please note, each instrument has its own maximum leverage. Whichever leverage (account or instrument) is lower will be used.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| account\_id | string | Y | account ID to change the leverage. Must be currently the logged user's account |
| leverage | number | Y | maximum leverage to be used for the account. Valid values are between 1-100 (inclusive) |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| code | number | error code or 0 if no error |
| message | string | text description of the error code if non-zero code returned |