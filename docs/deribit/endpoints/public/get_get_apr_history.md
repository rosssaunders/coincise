## /public/get_apr_history

Retrieves historical APR data for specified currency. Only applicable to
yield-generating tokens (`USDE`, `STETH`, `USDC`, `BUILD`).

**📖 Related Support Article:**
[Yield reward-bearing coins](https://support.deribit.com/hc/en-us/articles/26525792475677-Yield-reward-bearing-coins)

### Parameters

| Parameter | Required | Type   | Enum   | Description |
| --------- | -------- | ------ | ------ | ----------- |
| currency  | true     | string | `usde` |

`steth`  
`usdc`  
`build` | Currency for which to retrieve APR history | | limit | false | integer
| | Number of days to retrieve (default `365`, maximum `365`) | | before | false
| integer | | Used to receive APR history before given epoch day |

### Response

| Name              | Type              | Description                         |
| ----------------- | ----------------- | ----------------------------------- |
| id                | integer           | The id that was sent in the request |
| jsonrpc           | string            | The JSON-RPC version (2.0)          |
| result            | _object_          |                                     |
|   ›  continuation | string            | Continuation token for pagination.  |
|   ›  data         | array of _object_ |                                     |
|   ›    ›  apr     | number            | The APR of the day                  |
|   ›    ›  day     | integer           | The full epoch day                  |
