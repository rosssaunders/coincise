# DELETE the API Key of sub-accounts

Source:
[https://www.okx.com/docs-v5/en/#sub-account-rest-api-delete-the-api-key-of-sub-accounts](https://www.okx.com/docs-v5/en/#sub-account-rest-api-delete-the-api-key-of-sub-accounts)

### Delete the API Key of sub-accounts

Applies to master accounts only and master accounts API Key must be linked to IP
addresses.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/users/subaccount/delete-apikey`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| subAcct   | String | Yes      | Sub-account name |
| apiKey    | String | Yes      | API public key   |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**  |
| ------------------ | -------- | ---------------- |
| subAcct            | String   | Sub-account name |
