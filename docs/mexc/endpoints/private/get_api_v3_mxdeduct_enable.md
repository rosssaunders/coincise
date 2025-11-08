# Query MX Deduct Status

> Request

```
get api/v3/mxDeduct/enable
```

> Response

```
{
  "data":{
    "mxDeductEnable":false
  },
  "code":0,
  "msg":"success",
  "timestamp":1669109672717
}
```

-   **GET** `api/v3/mxDeduct/enable`  
    

**Permission:** SPOT\_DEAL\_READ

**Weight(IP):** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| recvWindow | long | no | recvWindow |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**Response:**

| Name | Type | Description |
| --- | --- | --- |
| mxDeductEnable | boolean | true:enable,false:disable |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#query-mx-deduct-status
