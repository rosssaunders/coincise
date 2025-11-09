# POST /v3/transfer

**Title:** Transfer assets among accounts

**Source:**
[Transfer assets among accounts](https://docs.digifinex.com/en-ww/spot/v3/rest.html#transfer-assets-among-accounts)

## Authentication

Required (Private Endpoint)

---

## Transfer assets among accounts

### HTTP Request

- POST `https://openapi.digifinex.com/v3/transfer`

### Request Parameters

Transfer assets among, 1 for spot account, 2 for margin account, 3 for OTC
account Please be noted transfers between margin account and OTC account is
currently not available

| Field         | Request Type | Mandatory | Description                                                                |
| ------------- | ------------ | --------- | -------------------------------------------------------------------------- |
| currency_mark | str          | true      | Currency                                                                   |
| num           | str          | true      | Transfer amount                                                            |
| from          | int          | true      | Transfer from, 1 for spot account, 2 for margin account, 3 for OTC account |
| to            | int          | true      | Transfer to, 1 for spot account, 2 for margin account, 3 for OTC account   |

> Response:

```

{
  "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| ----- | --------- | ------------ | ----------- |
| code  | true      | int          | Status      |
