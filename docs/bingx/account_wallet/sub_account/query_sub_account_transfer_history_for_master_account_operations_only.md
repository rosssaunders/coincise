## Query Sub-Account Transfer History (For Master Account Operations Only)

GET /openApi/account/transfer/v1/subAccount/asset/transferHistory

API KEY permission: Read

Content-Type:request body(application/json)

Query Sub-Account Transfer History, The user who verifies the signature of this
API must be main account.

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                 |
| -------------- | ------ | -------- | ------------------------------------------- |
| uid            | LONG   | Yes      | UID to query                                |
| type           | ENUM   | No       | Transfer type                               |
| tranId         | STRING | No       | Transfer ID                                 |
| startTime      | LONG   | No       | Start time 1658748648396                    |
| endTime        | LONG   | No       | End time 1658748648396                      |
| pageId         | int    | No       | Current page, default is 1                  |
| pagingSize     | int    | No       | Page size, default is 10, cannot exceed 100 |
| recvWindow     | LONG   | No       | Execution window time, cannot exceed 60000  |
| timestamp      | LONG   | Yes      | Current timestamp, e.g., 1658748648396      |

### Response Parameters

| Parameter Name | Type    | Description         |
| -------------- | ------- | ------------------- |
| total          | LONG    | Total count         |
| rows           | Array   | Data array          |
| asset          | string  | Name of the asset   |
| amount         | DECIMAL | Amount of the asset |
| type           | ENUM    | Transfer type       |
| status         | string  | CONFIRMED           |
| tranId         | LONG    | Transfer ID         |
| timestamp      | LONG    | Transfer timestamp  |
| fromUid        | LONG    | UID of the sender   |
| toUid          | LONG    | UID of the receiver |

### Data Parameters

|                               | Description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| MAIN_CAPITAL_TO_SUB_CAPITAL   | Master account capital to sub-account capital               |
| MAIN_CAPITAL_TO_SUB_CONTRACT  | Master account capital to sub-account contract              |
| MAIN_CAPITAL_TO_SUB_SWAP      | Master account capital to sub-account perpetual swap        |
| MAIN_CONTRACT_TO_SUB_CAPITAL  | Master account contract to sub-account capital              |
| MAIN_CONTRACT_TO_SUB_CONTRACT | Master account contract to sub-account contract             |
| MAIN_CONTRACT_TO_SUB_SWAP     | Master account contract to sub-account perpetual swap       |
| MAIN_SWAP_TO_SUB_CAPITAL      | Master account perpetual swap to sub-account capital        |
| MAIN_SWAP_TO_SUB_CONTRACT     | Master account perpetual swap to sub-account contract       |
| MAIN_SWAP_TO_SUB_SWAP         | Master account perpetual swap to sub-account perpetual swap |
| SUB_CAPITAL_TO_MAIN_CAPITAL   | Sub-account capital to master account capital               |
| SUB_CAPITAL_TO_MAIN_CONTRACT  | Sub-account capital to master account contract              |
| SUB_CAPITAL_TO_MAIN_SWAP      | Sub-account capital to master account perpetual swap        |
| SUB_CONTRACT_TO_MAIN_CAPITAL  | Sub-account contract to master account capital              |
| SUB_CONTRACT_TO_MAIN_CONTRACT | Sub-account contract to master account contract             |
| SUB_CONTRACT_TO_MAIN_SWAP     | Sub-account contract to master account perpetual swap       |
| SUB_SWAP_TO_MAIN_CAPITAL      | Sub-account perpetual swap to master account capital        |
| SUB_SWAP_TO_MAIN_CONTRACT     | Sub-account perpetual swap to master account contract       |
| SUB_SWAP_TO_MAIN_SWAP         | Sub-account perpetual swap to master account perpetual swap |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
