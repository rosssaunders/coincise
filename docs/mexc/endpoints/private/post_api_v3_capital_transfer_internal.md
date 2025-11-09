# Internal Transfer

> Request

```
post /api/v3/capital/transfer/internal?&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
  {
    "tranId": "c45d800a47ba4cbc876a5cd29388319"
  }

```

- **POST** `/api/v3/capital/transfer/internal`

**Permission:** SPOT_WITHDRAW_WRITE

**Weight(IP):** 1

**Parameters**

| Name          | Type   | Mandatory | Description                   |
| ------------- | ------ | --------- | ----------------------------- |
| toAccountType | string | Yes       | toAccountTyp:EMAIL/UID/MOBILE |
| toAccount     | string | Yes       | toAccount:EMAIL/UID/MOBILE    |
| areaCode      | string | No        | areaCode of mobile            |
| asset         | string | Yes       | asset                         |
| amount        | string | Yes       | amount                        |
| timestamp     | string | Yes       | timestamp                     |
| signature     | string | Yes       | signature                     |

**Response**

| Name   | Description |
| ------ | ----------- |
| tranId | tranId      |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#internal-transfer
