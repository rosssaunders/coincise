# POST api/v3/mxDeduct/enable

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#enable-mx-deduct

Enable or disable MX deduct for spot commission fee

> Request

```bash
post api/v3/mxDeduct/enable
```

> Response

```json
{  "data":{    "mxDeductEnable":true  },  "code":0,  "msg":"success",  "timestamp":1669109672280} 
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
