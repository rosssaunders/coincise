# GET [General] Query transfer records between master and sub account

**Source:**
[[General] Query transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb83c2c-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_master_sub_transfer_record (\[General\] Query transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                               | Value Range                                             | Default Value |
| -------------- | --------- | -------- | --------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| margin_account | string    | true     | margin account                                            | "BTC-USDT","USDT"...                                    |               |
| transfer_type  | string    | false    | All by default(multiple types need to be joined with ',') | 34:transfer to sub account 35:transfer from sub account |               |
| create_date    | int       | true     | days                                                      | days need to be less than or equal to 90                |               |
| page_index     | int       | false    | 1 by default                                              |                                                         |               |
| page_size      | int       | false    | 20 by default.less than or equal to 50.                   | \[1-50\]                                                |               |

#### Response Parameter

| Parameter             | Data Type    | Required | Description              | Value Range                                             |
| --------------------- | ------------ | -------- | ------------------------ | ------------------------------------------------------- |
| status                | string       | true     | respone status           | "ok" , "error"                                          |
| ts                    | long         | true     | response millionseconds. |                                                         |
| DATA_START            | object       | true     |                          |                                                         |
| TRANSFER_RECORD_START | object array | true     |                          |                                                         |
| id                    | long         | true     | transfer id              |                                                         |
| ts                    | long         | true     | create timestamp         |                                                         |
| asset                 | string       | true     | asset                    | "USDT"...                                               |
| margin_account        | string       | true     | margin account           | "BTC-USDT"...                                           |
| from_margin_account   | string       | true     | from margin account      | "BTC-USDT"...                                           |
| to_margin_account     | string       | true     | to margin account        | "BTC-USDT"...                                           |
| sub_uid               | string       | true     | subaccount uid           |                                                         |
| sub_account_name      | string       | true     | subaccount name          |                                                         |
| transfer_type         | int          | true     | transfer type            | 35:transfer from subaccount; 34:transfer to subaccount; |
| amount                | decimal      | true     | amount                   |                                                         |
| TRANSFER_RECORD_END   |              | false    |                          |                                                         |
| total_page            | int          | true     | total page               |                                                         |
| current_page          | int          | true     | current page             |                                                         |
| total_size            | int          | true     | total size               |                                                         |
| DATA_END              |              | false    |                          |                                                         |

#### Request example

{

"margin_account":

"BTC-USDT"

"transfer_type":

"34"

"create_date":

30

"page_index":

1

"page_size":

50

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

2

"current_page":

1

"total_size":

2

"transfer_record":\[

0:{

"id":

57920

"transfer_type":

34

"amount":

\-10

"ts":

1603700211125

"sub_uid":

"123436789"

"sub_account_name":

"tom"

"margin_account":

"BTC-USDT"

"asset":

"USDT"

"to_margin_account":

"BTC-USDT"

"from_margin_account":

"BTC-USDT"

}

\]

}

"ts":

1603700414957

}
