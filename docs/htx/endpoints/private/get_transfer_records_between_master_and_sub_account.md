# GET transfer records between master and sub account

**Source:**
[Get transfer records between master and sub account](https://www.htx.com/en-us/opend/newApiPages/?id=28c30a22-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract_master_sub_transfer_record (Get transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                 | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                                      | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |               |
| transfer_type | string    | false    | All by default【multiple types need to be joined with ';'】 | 34:transfer to sub account 35:transfer from sub account                   |               |
| create_date   | int       | true     | days                                                        | days need to be less than or equal to 90                                  |               |
| page_index    | int       | false    | 1 by default                                                |                                                                           |               |
| page_size     | int       | false    | 20 by default.less than or equal to 50.                     | \[1-50\]                                                                  |               |

#### Response Parameter

| Parameter             | Data Type   | Required | Description              | Value Range                                             |
| --------------------- | ----------- | -------- | ------------------------ | ------------------------------------------------------- |
| status                | string      | true     | respone status           | "ok" , "error"                                          |
| ts                    | long        | true     | response millionseconds. |                                                         |
| DATA_START            | object      | true     |                          |                                                         |
| TRANSFER_RECORD_START | objectarray | true     |                          |                                                         |
| id                    | long        | true     | transfer id              |                                                         |
| ts                    | long        | true     | create timestamp         |                                                         |
| symbol                | string      | true     | symbol                   | "BTC","ETH"...                                          |
| sub_uid               | string      | true     | subaccount uid           |                                                         |
| sub_account_name      | string      | true     | subaccount name          |                                                         |
| transfer_type         | int         | true     | transfer type            | transfer from subaccount：35，transfer to subaccount:34 |
| amount                | decimal     | true     | amount                   |                                                         |
| TRANSFER_RECORD_END   |             | false    |                          |                                                         |
| total_page            | int         | true     | total page               |                                                         |
| current_page          | int         | true     | current page             |                                                         |
| total_size            | int         | true     | total size               |                                                         |
| DATA_END              |             | false    |                          |                                                         |

#### Request example

{

"symbol":

"BTC"

"transfer_type":

"34"

"create_date":

30

"page_index":

1

"page_size":

20

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total_page":

1

"current_page":

1

"total_size":

2

"transfer_record":\[

0:{

"id":

3657499070

"symbol":

"ADA"

"transfer_type":

34

"amount":

\-1

"ts":

1604309247860

"sub_uid":

"123456789"

"sub_account_name":

"tom"

}

1:{

"id":

3657420904

"symbol":

"ADA"

"transfer_type":

34

"amount":

\-50

"ts":

1604301623314

"sub_uid":

"123456789"

"sub_account_name":

"tom"

}

\]

}

"ts":

1604309883224

}
