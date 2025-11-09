# GET Endpoint for setting the trading fee rate for sub-users/sub-accounts

**Source:**
[Endpoint for setting the trading fee rate for sub-users/sub-accounts](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18c8faeb64d)

**Category:** Broker API

## Authentication

Required (Private Endpoint)

### /broker/v1/sub-user/fee_rate/add (Endpoint for setting the trading fee rate for sub-users/sub-accounts)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 100 times/2s

Interface description: Sub-account trading fee rates are the current base rate
for spot and futures trading on the parent account plus an absolute or
percentage change. After setting the sub-account trading fee rate, it will take
effect at 00:00 on the date if a date is set, or at 00:00 on T+1 if no date is
set (i.e. if the fee rate for a sub-account are adjusted today and no effective
date is specified, they will take effect at 00:00 tomorrow. There may be a delay
of some minutes in the effective date).

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type  | Required | Description                                                                                                   | Value Range | Default Value |
| --------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| subUids   | Long       | true     | Sub-account id max. 10                                                                                        |             |               |
| bizType   | Integer    | true     | Business type 0 all 1 Spot 2 U standard linear 3 Coin-Margined swap                                           |             |               |
| taker     | BigDecimal | false    | Additional handling fee for taker Either taker or maker                                                       |             |               |
| maker     | BigDecimal | false    | Additional handling fee for Maker Either taker or maker                                                       |             |               |
| type      | Integer    | true     | Additional handling fee type 1 fixed(0.001 - 0.5 ) 2 percent(1 - 1000)                                        |             |               |
| effectAt  | string     | false    | YYYYMMDD，time of taking effect If the time is not filled in, it will take effect at 0:00 the next day（T+1） |             |               |

#### Response Parameter

| Parameter  | Data Type    | Required | Description                                                            | Value Range |
| ---------- | ------------ | -------- | ---------------------------------------------------------------------- | ----------- |
| status     | string       | false    |                                                                        |             |
| DATA_START | object array | true     |                                                                        |             |
| userId     | Long         | false    | Master-account id                                                      |             |
| subUids    | Long         | false    | Sub-account id max. 10                                                 |             |
| bizType    | Integer      | false    | Business type 0 all 1 Spot 2 U standard linear 3 Coin-Margined swap    |             |
| taker      | BigDecimal   | false    | Additional handling fee for taker                                      |             |
| maker      | BigDecimal   | false    | Additional handling fee for Maker                                      |             |
| type       | Integer      | false    | Additional handling fee type 1 fixed(0.001 - 0.5 ) 2 percent(1 - 1000) |             |
| effectAt   | string       | false    | YYYYMMDD，time of taking effect                                        |             |
| DATA_END   |              | false    |                                                                        |             |
| ts         | long         | true     |                                                                        |             |

#### Request example

{

"userId":

"12345678"

"subUIds":

"1"

"effectAt":

""

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"subUserIds":\[

0

:

12345678

\]

"effectAt":

"2023-12-12"

}

"ts":

1702278179755

}
