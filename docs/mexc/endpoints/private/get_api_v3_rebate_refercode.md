# Query ReferCode

> request

```
get /api/v3/rebate/referCode?timestamp={{timestamp}}&signature={{signature}}
```

> response

```
{
    "referCode": "in3jd"
}
```

**HTTP Request**

- **GET** `/api/v3/rebate/referCode`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| recvWindow | long   | NO        |             |
| timestamp  | long   | YES       |             |
| signature  | string | YES       |             |

**Response**

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| referCode | string | referCode   |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#query-refercode
