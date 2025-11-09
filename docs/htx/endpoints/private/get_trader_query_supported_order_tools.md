# GET Trader query supported order tools

**Source:**
[Trader query supported order tools](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126f0fb3d)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/query_contract (Trader query supported order tools)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per
second.

Interface description: Trader query supported order tools

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter     | Data Type | Required | Description   | Value Range |
| ------------- | --------- | -------- | ------------- | ----------- |
| tid           | String    | true     | request id    |             |
| DATA_START    | array     | true     |               |             |
| contract_code | String    | true     | contract code |             |
| DATA_END      |           | false    |               |             |
| code          | long      | true     |               |             |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/query_contract"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0

:

"SHIB-USDT"

1

:

"BTC-USDT"

\]

"tid":

"1f676762c2b348508c197fe144f6fed2"

"success":

true

}
