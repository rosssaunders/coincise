## Sub-Account Asset Transfer Interface (For Master Account Operations Only)

POST /openApi/account/transfer/v1/subAccount/transferAsset

API KEY permission: Universal Transfer

Content-Type:request body(application/json)

Sub-Account Asset Transfer Interface , The user who verifies the signature of
this API must be main account.

API Parameters

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name  | Type    | Required | Field Description                                                                        |
| --------------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| assetName       | string  | Yes      | Name of the asset, e.g., USDT                                                            |
| transferAmount  | DECIMAL | Yes      | Transfer amount                                                                          |
| fromUid         | LONG    | Yes      | Sender UID                                                                               |
| fromType        | LONG    | Yes      | Sender sub/master account type: 1-Master account; 2-Sub-account                          |
| fromAccountType | LONG    | Yes      | Sender account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account   |
| toUid           | LONG    | Yes      | Receiver UID                                                                             |
| toType          | LONG    | Yes      | Receiver sub/master account type: 1-Master account; 2-Sub-account                        |
| toAccountType   | LONG    | Yes      | Receiver account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account |
| remark          | string  | Yes      | Transfer remark                                                                          |
| recvWindow      | LONG    | No       | Execution window time, cannot exceed 60000                                               |
| timestamp       | LONG    | Yes      | Current timestamp, e.g., 1658748648396                                                   |

### Response Parameters

| Parameter Name | Type   | Field Description  |
| -------------- | ------ | ------------------ |
| tranId         | STRING | Transfer record ID |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
