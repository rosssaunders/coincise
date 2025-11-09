# GET Repayment Record Reference

**Source:**
[Repayment Record Reference](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50446-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v2/account/repayment ( Repayment Record Reference)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: Available Accounts: Main and Sub-Accounts Sort by
"repayTime"

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                     | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| repayId   | string    | false    | repayment transaction ID                                                                                        |             |               |
| accountId | string    | false    | account ID (default value: all accounts)                                                                        |             |               |
| currency  | string    | false    | borrowing/lending currency (default value: all currencies)                                                      |             |               |
| startTime | long      | false    | start time (unix time in millisecond; range: \[(endTime – x D), endTime\]; default value: (endTime – x D)       |             |               |
| endTime   | long      | false    | end time (unix time in millisecond；range: \[(present time – y D), present time\]; default value: present time) |             |               |
| sort      | string    | false    | sort direction (value: asc, desc; default value: desc)                                                          |             |               |
| limit     | integer   | false    | max return items per page (range: \[1-100\]; default value: 50)                                                 |             |               |
| fromId    | long      | false    | search ID from the start (only available when searching for the next page)                                      |             |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                                                                            | Value Range |
| ----------------- | --------- | -------- | -------------------------------------------------------------------------------------- | ----------- |
| code              | integer   | false    | status code                                                                            |             |
| message           | string    | false    | error description (if any)                                                             |             |
| DATA_START        | array     | false    | sorted by the appointed order                                                          |             |
| repayId           | string    | false    | repayment transaction ID                                                               |             |
| repayTime         | long      | false    | repayment transaction time (unix time in millisecond)                                  |             |
| accountId         | string    | false    | repayment account ID                                                                   |             |
| currency          | string    | false    | repayment currency                                                                     |             |
| repaidAmount      | string    | false    | repaid amount                                                                          |             |
| TRANSACTIDS_START | object    | false    | ID list of original loan transactions (arranged by order of repaymen time)             |             |
| transactId        | long      | false    | original loan transaction ID                                                           |             |
| repaidPrincipal   | string    | false    | principal repaid                                                                       |             |
| repaidInterest    | string    | false    | interest repaid                                                                        |             |
| paidHt            | string    | false    | HT paid                                                                                |             |
| paidPoint         | string    | false    | point paid                                                                             |             |
| TRANSACTIDS_END   |           | false    |                                                                                        |             |
| DATA_END          |           | false    |                                                                                        |             |
| nextId            | long      | false    | search the start ID in the next page (return only when there is data in the next page) |             |

#### Request example

`curl"https://api.huobi.pro/v2/account/repayment?repayId=xxxx&accountId=xxx¤cy=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"repayId":

1174413

"repayTime":

1600747389111

"accountId":

1266826

"currency":

"btc"

"repaidAmount":

"0.00200083"

"transactIds":{

"transactId":

502

"repaidprincipal":

"0.00199666"

"repaidInterest":

"0.00000417"

"paidHt":

"0"

"paidPoint":

"0"

}

}

\]

}
