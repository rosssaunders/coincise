# GET Search Past Margin Orders（Isolated）

**Source:**
[Search Past Margin Orders（Isolated）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4d423-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/margin/loan-orders ( Search Past Margin Orders（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns margin orders based on a specific
searching criteria.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                               | Value Range                                                | Default Value                                                       |
| ---------- | --------- | -------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| symbol     | string    | false    | The trading symbol to trade                                               | The trading symbol, e.g. btcusdt, bccbtc                   | NA                                                                  |
| states     | string    | false    | Order status list, multiple state allowed, separated by comma             | created, accrual (loaned), cleared (paid), invalid, failed | NA                                                                  |
| start-date | string    | false    | Search starts date, in format yyyy-mm-dd                                  | NA                                                         | \-61d                                                               |
| end-date   | string    | false    | Search ends date, in format yyyy-mm-dd                                    | NA                                                         | today                                                               |
| from       | string    | false    | Search order id to begin with                                             | NA                                                         | NA                                                                  |
| direct     | string    | false    | Search direction when 'from' is used                                      | next, prev                                                 | both                                                                |
| size       | string    | false    | The number of orders to return                                            | \[1, 100\]                                                 | 100                                                                 |
| sub-uid    | int       | false    | Sub user ID (Required field while parent user querying sub user’s orders) |                                                            | If not entered, by default it returns margin orders of current user |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                             | Value Range |
| ------------------ | --------- | -------- | --------------------------------------------------------------------------------------- | ----------- |
| status             | string    | false    | status                                                                                  |             |
| DATA_START         | object    | false    |                                                                                         |             |
| id                 | long      | false    | Order id                                                                                |             |
| account-id         | long      | false    | Account id                                                                              |             |
| user-id            | long      | false    | User id                                                                                 |             |
| symbol             | string    | false    | The margin loan pair to trade, e.g. btcusdt, bccbtc                                     |             |
| currency           | string    | false    | The currency in the loan                                                                |             |
| created-at         | string    | false    | The timestamp in milliseconds when the order was created                                |             |
| accrued-at         | string    | false    | The timestamp in milliseconds when the last accure happened                             |             |
| loan-amount        | string    | false    | The amount of the origin loan                                                           |             |
| loan-balance       | string    | false    | The amount of the loan left                                                             |             |
| interest-rate      | string    | false    | The loan interest rate                                                                  |             |
| interest-amount    | long      | false    | The accumulated loan interest                                                           |             |
| interest-balance   | long      | false    | The amount of loan interest left                                                        |             |
| state              | string    | false    | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid, failed |             |
| paid-point         | string    | false    | Paid HTX Points for repayment                                                           |             |
| paid-coin          | string    | false    | Paid original cryptocurrency for repayment                                              |             |
| deduct-rate        | string    | false    | Deduction rate for repayment                                                            |             |
| deduct-currency    | string    | false    | Deduction currency for repayment                                                        |             |
| deduct-amount      | string    | false    | Deduction value for repayment                                                           |             |
| updated-at         | long      | false    | Update time                                                                             |             |
| hour-interest-rate | string    | false    | Hourly interest rate                                                                    |             |
| day-interest-rate  | string    | false    | Daily interest rate                                                                     |             |
| DATA_END           |           | false    |                                                                                         |             |

#### Request example

`curl"https://api.huobi.pro/v1/margin/loan-orders?symbol=xxxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"deduct-rate":

"1"

"created-at":

1595831651478

"updated-at":

1595832010845

"accrued-at":

1595831651478

"interest-amount":

"0.004083000000000000"

"loan-amount":

"100.000000000000000000"

"hour-interest-rate":

"0.000040830000000000"

"loan-balance":

"0.000000000000000000"

"interest-balance":

"0.000000000000000000"

"paid-coin":

"0.004083000000000000"

"day-interest-rate":

"0.000980000000000000"

"interest-rate":

"0.000040830000000000"

"user-id":

5574974

"account-id":

5463409

"currency":

"usdt"

"symbol":

"btcusdt"

"paid-point":

"0.000000000000000000"

"deduct-currency":

""

"deduct-amount":

"0"

"id":

7839857

"state":

"cleared"

}

\]

}
