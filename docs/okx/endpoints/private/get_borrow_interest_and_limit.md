# GET borrow interest and limit

Source:
[https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit](https://www.okx.com/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)

### Get borrow interest and limit

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/account/interest-limits`

#### Request Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| type      | String | No       | Loan type   |

`2`: Market loans  
Default is `2` | | ccy | String | No | Loan currency, e.g. `BTC` |

#### Response Parameters

| Parameter                         | Type   | Description                                                                    |
| --------------------------------- | ------ | ------------------------------------------------------------------------------ |
| debt                              | String | Current debt in `USD`                                                          |
| interest                          | String | Current interest in `USD`, the unit is `USD`                                   |
| Only applicable to `Market loans` |
| nextDiscountTime                  | String | Next deduct time, Unix timestamp format in milliseconds, e.g. `1597026383085`  |
| nextInterestTime                  | String | Next accrual time, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| loanAlloc                         | String | VIP Loan allocation for the current trading account                            |

1\. The unit is percent(%). Range is \[0, 100\]. Precision is 0.01%  
2\. If master account did not assign anything, then "0"  
3\. "" if shared between master and sub-account | | records | Array of objects |
Details for currencies | | \> ccy | String | Loan currency, e.g. `BTC` | | \>
rate | String | Current daily borrowing rate | | \> loanQuota | String | Borrow
limit of master account  
If loan allocation has been assigned, then it is the borrow limit of the current
trading account | | \> surplusLmt | String | Available amount across all
sub-accounts  
If loan allocation has been assigned, then it is the available amount to borrow
by the current trading account | | \> usedLmt | String | Borrowed amount for
current account  
If loan allocation has been assigned, then it is the borrowed amount by the
current trading account | | \> interest | String | Interest to be deducted  
Only applicable to `Market loans` | | \> interestFreeLiab | String |
Interest-free liability for current account | | \> potentialBorrowingAmt |
String | Potential borrowing amount for current account | | \> surplusLmtDetails
| Object | ~The details of available amount across all sub-accounts  
The value of `surplusLmt` is the minimum value within this array. It can help
you judge the reason that `surplusLmt` is not enough.  
Only applicable to `VIP loans`~Deprecated | | \>> allAcctRemainingQuota | String
| ~Total remaining quota for master account and sub-accounts~ Deprecated | | \>>
curAcctRemainingQuota | String | ~The remaining quota for the current account.  
Only applicable to the case in which the sub-account is assigned the loan
allocation~Deprecated | | \>> platRemainingQuota | String | ~Remaining quota for
the platform.  
The format like "600" will be returned when it is more than
`curAcctRemainingQuota` or `allAcctRemainingQuota`~Deprecated | | \> posLoan |
String | ~Frozen amount for current account (Within the locked quota)  
Only applicable to `VIP loans`~Deprecated | | \> availLoan | String | ~Available
amount for current account (Within the locked quota)  
Only applicable to `VIP loans`~Deprecated | | \> usedLoan | String | ~Borrowed
amount for current account  
Only applicable to `VIP loans`~Deprecated | | \> avgRate | String | ~Average
hourly interest of borrowed coin  
only applicable to `VIP loans`~Deprecated |
