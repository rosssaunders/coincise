# GET Search Past Margin Orders（Cross）

**Source:** [Search Past Margin Orders（Cross）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4c055-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/cross-margin/loan-orders ( Search Past Margin Orders（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns margin orders based on a specific searching criteria.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start-date | string | false | Search starts date, in format yyyy-mm-dd | NA | \-61d |
| end-date | string | false | Search ends date, in format yyyy-mm-dd | NA | today |
| currency | string | false | Currency | NA | NA |
| state | string | false | Order status | created, accrual (loaned), cleared (paid), invalid | all |
| from | string | false | Search order id to begin with | NA | 0 |
| direct | string | false | Search direction when 'from' is used | next, prev | next |
| size | string | false | The number of orders to return | \[10-100\] | 10 |
| sub-uid | long | false | Sub user UID |  | If not specified, returns loan order list of current logged in user |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| account-id | long | false | Account id |  |
| user-id | long | false | User id |  |
| currency | string | false | The currency in the loan |  |
| filled-points | string | false | Point deduction amount |  |
| filled-ht | string | false | HT deduction amount |  |
| created-at | string | false | The timestamp in milliseconds when the order was created |  |
| accrued-at | string | false | The timestamp in milliseconds when the last accure happened |  |
| loan-amount | string | false | The amount of the origin loan |  |
| loan-balance | string | false | The amount of the loan left |  |
| interest-amount | long | false | The accumulated loan interest |  |
| interest-balance | long | false | The amount of loan interest left |  |
| state | string | false | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/loan-orders?start-date=xxxx&end-date=xxxxxx¤cy=xxxxxx&state=created&from=xxxx&direct=next&size=100&sub-uid=xxxxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"loan-balance":

"0.100000000000000000"

"interest-balance":

"0.000200000000000000"

"loan-amount":

"0.100000000000000000"

"accrued-at":

1511169724531

"interest-amount":

"0.000200000000000000"

"filled-points":

"0.2"

"filled-ht":

"0.2"

"currency":

"btc"

"id":

394

"state":

"accrual"

"account-id":

17747

"user-id":

119913

"created-at":

1511169724531

}

\]

}