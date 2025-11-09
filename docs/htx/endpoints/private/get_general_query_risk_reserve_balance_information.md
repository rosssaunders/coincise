# GET [General]Query risk reserve balance information

**Source:**
[[General]Query risk reserve balance information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-192412eef1f)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /v1/insurance_fund_info (\[General\]Query risk reserve balance information)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Query the total amount of risk funds for all current
business lines, priced in USDT.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter      | Data Type    | Required | Description            | Value Range |
| -------------- | ------------ | -------- | ---------------------- | ----------- |
| status         | string       | false    |                        |             |
| DATA_START     | object array | true     |                        |             |
| insurance_fund | string       | true     | Insurance Fund Balance |             |
| DATA_END       |              | false    |                        |             |
| ts             | long         | true     |                        |             |

#### Request example

`curl"https://api.hbdm.com/v1/insurance_fund_info"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"insurance_fund":

353207326.6713937

"quote_currency":

"USDT"

}

"ts":

1727584880593

}
