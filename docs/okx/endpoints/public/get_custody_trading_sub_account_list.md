# GET custody trading sub-account list

Source: [https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-custody-trading-sub-account-list](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-custody-trading-sub-account-list)

### Get custody trading sub-account list

The trading team uses this interface to view the list of sub-accounts currently under escrow

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/users/entrust-subaccount-list`

> Request sample

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| subAcct | String | No | Sub-account name |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description** |
| --- | --- | --- |
| subAcct | String | Sub-account name |
