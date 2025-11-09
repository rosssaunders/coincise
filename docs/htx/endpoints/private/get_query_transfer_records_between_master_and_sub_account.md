# GET Query transfer records between master and sub account

**Source:**
[Query transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=5d519cb8-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap_master_sub_transfer_record (Query transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                 | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code                                               | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |               |
| transfer_type | string    | false    | All by default【multiple types need to be joined with ';'】 | 34:transfer to sub account 35:transfer from sub account                   |               |
| create_date   | int       | true     | days                                                        | days need to be less than or equal to 90                                  |               |
| page_index    | int       | false    | 1 by default                                                | 1                                                                         |               |
| page_size     | int       | false    | 20 by default.less than or equal to 50.                     | 20                                                                        |               |

#### Response Parameter

| Parameter             | Data Type    | Required | Description              | Value Range                                             |
| --------------------- | ------------ | -------- | ------------------------ | ------------------------------------------------------- |
| status                | string       | true     | respone status           | "ok" , "error"                                          |
| ts                    | long         | true     | response millionseconds. |                                                         |
| DATA_START            | object       | true     |                          |                                                         |
| TRANSFER_RECORD_START | object array | true     |                          |                                                         |
| id                    | long         | true     | transfer id              |                                                         |
| ts                    | long         | true     | create timestamp         |                                                         |
| symbol                | string       | true     | symbol                   | "BTC","ETH"...                                          |
| contract_code         | string       | true     | contract code            | "BTC_USD",...                                           |
| sub_uid               | string       | true     | subaccount uid           |                                                         |
| sub_account_name      | string       | true     | subaccount name          |                                                         |
| transfer_type         | int          | true     | transfer type            | transfer from subaccount：35，transfer to subaccount:34 |
| amount                | decimal      | true     | amount                   |                                                         |
| TRANSFER_RECORD_END   |              | false    |                          |                                                         |
| total_page            | int          | true     | total page               |                                                         |
| current_page          | int          | true     | current page             |                                                         |
| total_size            | int          | true     | total size               |                                                         |
| DATA_END              |              | false    |                          |                                                         |

#### Request example

{

"contract_code":

"BTC-USD"

"page_index":

1

"page_size":

20

"sort_by":

"created_at"

"trade_type":

0

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

4

"transfer_record":\[

0:{

"id":

927517392

"symbol":

"THETA"

"transfer_type":

35

"amount":

10

"ts":

1603871064212

"sub_uid":

"123456789"

"sub_account_name":

"tom"

"contract_code":

"THETA-USD"

}

1:{

"id":

927489221

"symbol":

"THETA"

"transfer_type":

34

"amount":

\-100

"ts":

1603869236524

"sub_uid":

"123456789"

"sub_account_name":

"tom"

"contract_code":

"THETA-USD"

}

\]

}

"ts":

1603871223290

}
