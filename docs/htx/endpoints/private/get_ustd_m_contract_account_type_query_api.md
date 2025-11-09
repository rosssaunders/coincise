# GET USTD-M contract account type query API

**Source:**
[USTD-M contract account type query API](https://www.htx.com/en-us/opend/newApiPages/?id=10000080-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/swap_unified_account_type (USTD-M contract account type query API)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: It is used to query whether the account type of the
user's current USTD-M contract is a unified account or a non-unified account.
The current USTD-M contract has unified account and non-unified account
(cross-margin and isolated-margin account) types. Unified account type assets
are placed in one USDT account, and non-unified account type assets are placed
in different currency pairs.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter    | Data Type | Required | Description        | Value Range                                                                          |
| ------------ | --------- | -------- | ------------------ | ------------------------------------------------------------------------------------ |
| code         | int       | true     | Status code        |                                                                                      |
| msg          | string    | true     | Result description |                                                                                      |
| ts           | long      | true     | Timestamp          |                                                                                      |
| DATA_START   |           | true     |                    |                                                                                      |
| account_type | int       | true     | Account type       | 1: Non-unified account (cross-margin and isolated-margin account);2: Unified account |
| DATA_END     |           | true     |                    |                                                                                      |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":{

"account_type":

2

}

"ts":

1668057324200

}
