# GET Request broker sub-account commission infomation

**Source:** [Request broker sub-account commission infomation](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18c8f9cd16d)

**Category:** Broker API

## Authentication

Required (Private Endpoint)

### /broker/v1/sub-user/fee\_rate (Request broker sub-account commission infomation)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100 times/2s

Interface description: For brokers who have set the trading fee rate mark-up for their sub-accounts, the commission for sub-accounts can be checked through endpoint

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUId | String | true | Sub-account id (the current version is user\_id, which is UID minus the last digit, not account\_id, nor uid) |  |  |
| bizType | String | true | Type： 1 Spot； 2 U standard linear； 3 Coin-Margined swap； |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| DATA\_END |  | false |  |  |
| DATA\_START | object array | true |  |  |
| addMaker | BigDecimal | true | Additional handling fee for maker |  |
| addTaker | BigDecimal | true | Additional handling fee for taker |  |
| bizType | Integer | true | Business Type 0 all； 1 Spot； 2 U standard linear； 3 Coin-Margined swap |  |
| effectAt | Long | true | Time of taking effect |  |
| maker | BigDecimal | true | Master-account maker |  |
| status | string | false |  | ok , "error" |
| subUId | Long | true | Sub-account id |  |
| taker | BigDecimal | true | Master-account taker |  |
| ts | long | true |  |  |
| type | Integer | true | Additional handling fee type 1 fixed 2 percent |  |
| updatedAt | Long | true | Updated time of Additional handling fee |  |
| userId | Long | true | Master-account id |  |

#### Request example

`curl"https://api.huobi.pro/broker/v1/sub-user/fee_rate? subUserId=12345678&bizType=1"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"userId":

324561789

"subUserId":

12345678

"bizType":

1

"taker":

"0.002000"

"maker":

"0.002000"

"type":

1

"addTaker":

"0.5"

"addMaker":

"0"

"updatedAt":

1702277965359

"effectAt":

1702310400000

}

"ts":

1606976912267

}