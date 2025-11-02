## Query the transferable amount of funds in the parent-child account (only for parent account operations).

POST /openApi/account/transfer/v1/subAccount/transferAsset/supportCoins

API KEY permission: Read

Content-Type:request body(application/json)

Query the transferable amount of funds in the parent-child account, The user who
verifies the signature of this API must be main account.

API Parameters

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name  | Type | Required | Field Description                                                                        |
| --------------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| fromUid         | LONG | Yes      | Sender UID                                                                               |
| fromAccountType | LONG | Yes      | Sender account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account   |
| toUid           | LONG | Yes      | Receiver UID                                                                             |
| toAccountType   | LONG | Yes      | Receiver account type: 1-Fund account; 2-Contract account; 3-Perpetual USD-based account |
| recvWindow      | LONG | No       | Execution window time, cannot exceed 60000                                               |
| timestamp       | LONG | Yes      | Current timestamp, e.g., 1658748648396                                                   |

### Response Parameters

| Parameter Name  | Type    | Field Description         |
| --------------- | ------- | ------------------------- |
| coins           | ARRAY   | List of supported coins   |
| id              | LONG    | Coin ID                   |
| name            | STRING  | Coin name, e.g., USDT     |
| availableAmount | DECIMAL | Available transfer amount |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/sub-account](https://bingx-api.github.io/docs/#/en-us/common/sub-account)
