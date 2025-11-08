# Enable MX Deduct

Enable or disable MX deduct for spot commission fee

> Request

```
post api/v3/mxDeduct/enable
```

> Response

```
{
  "data":{
    "mxDeductEnable":true
  },
  "code":0,
  "msg":"success",
  "timestamp":1669109672280
} 
```

-   **POST** `api/v3/mxDeduct/enable`  
    

**Permission:** SPOT\_DEAL\_WRITE

**Weight(IP):** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| mxDeductEnable | boolean | yes | true:enable,false:disable |
| recvWindow | long | no | recvWindow |
| timestamp | long | yes | timestamp |
| signature | string | yes | signature |

**Response:**

| Name | Type | Description |
| --- | --- | --- |
| mxDeductEnable | boolean | true:enable,false:disable |

For Futures:Enjoy 10% off trading fees when you transfer MX into your futures account.

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#enable-mx-deduct
