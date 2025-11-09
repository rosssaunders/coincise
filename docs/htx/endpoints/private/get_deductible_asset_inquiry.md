# GET Deductible asset inquiry

**Source:**
[Deductible asset inquiry](https://www.htx.com/en-us/opend/newApiPages/?id=10000092-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/linear_swap_overview_account_info (Deductible asset inquiry )

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID

Interface description: It is used to query the total account assets of users of
the U-margin contract unified account type.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                             | Value Range | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------- | ----------- | ------------- |
| trade_partition | String    | false    | If it is empty, query USDT; if it is ALL, query all currencies; if it is HTX, query HTX |             |               |

#### Response Parameter

| Parameter        | Data Type    | Required | Description        | Value Range |
| ---------------- | ------------ | -------- | ------------------ | ----------- |
| code             | int          | true     | Status code        |             |
| msg              | String       | true     | Result description |             |
| ts               | Long         | true     | Timestamp          |             |
| DATA_START       | object array | true     |                    |             |
| margin_asset     | String       | true     | margin_asset       |             |
| margin_balance   | decimal      | true     | margin_balance     |             |
| margin_available | decimal      | true     | margin_available   |             |
| DATA_END         | String       | true     |                    |             |

#### Request example

No data

#### Response Example

##### Success Example

{

"code":

200

"msg":

"ok"

"data":\[

0:{

"margin_asset":

"USDT"

"margin_balance":

20002196154.904106

"margin_available":

20002196154.904106

}

1:{

"margin_asset":

"HT"

"margin_balance":

20002196154.904106

"margin_available":

20002196154.904106

}

\]

"ts":

158797866555

}
