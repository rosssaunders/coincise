# GET /api/v3/currencies

**Source:**
[/api/v3/currencies](https://www.kucoin.com/docs/rest//api/v3/currencies)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Currencies

Request a currency list via this endpoint. Not all currencies can currently be
used for trading.

## Responses

### 200

| Parameter                         | Required | Type    | Description                                                                                                        |
| --------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code                              | required | string  |                                                                                                                    |
| data                              | required | array   |                                                                                                                    |
| data[].currency                   | required | string  | A unique currency code that will never change                                                                      |
| data[].name                       | required | string  | Currency name; will change after renaming                                                                          |
| data[].fullName                   | required | string  | Full currency name; will change after renaming                                                                     |
| data[].precision                  | required | integer | Currency precision                                                                                                 |
| data[].confirms                   | required | integer | Number of block confirmations                                                                                      |
| data[].contractAddress            | required | string  | Contract address                                                                                                   |
| data[].isMarginEnabled            | required | boolean | Margin support or not                                                                                              |
| data[].isDebitEnabled             | required | boolean | Debit support or not                                                                                               |
| data[].chains                     | required | array   | Chain list                                                                                                         |
| data[].chains[].chainName         | required | string  | Chain name of currency                                                                                             |
| data[].chains[].withdrawalMinSize | required | string  | Minimum withdrawal amount                                                                                          |
| data[].chains[].depositMinSize    | optional | string  | Minimum deposit amount                                                                                             |
| data[].chains[].withdrawFeeRate   | required | string  | Withdraw fee rate                                                                                                  |
| data[].chains[].withdrawalMinFee  | required | string  | Minimum fees charged for withdrawal                                                                                |
| data[].chains[].isWithdrawEnabled | required | boolean | Withdrawal support or not                                                                                          |
| data[].chains[].isDepositEnabled  | required | boolean | Deposit support or not                                                                                             |
| data[].chains[].confirms          | required | integer | Number of block confirmations                                                                                      |
| data[].chains[].preConfirms       | required | integer | The number of blocks (confirmations) for advance on-chain verification                                             |
| data[].chains[].contractAddress   | required | string  | Contract address                                                                                                   |
| data[].chains[].withdrawPrecision | required | integer | Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount |
| data[].chains[].maxWithdraw       | optional | string  | Maximum amount of single withdrawal                                                                                |
| data[].chains[].maxDeposit        | optional | string  | Maximum amount of single deposit (only applicable to Lightning Network)                                            |
| data[].chains[].needTag           | required | boolean | Need for memo/tag or not                                                                                           |
| data[].chains[].chainId           | required | string  | Chain id of currency                                                                                               |
| data[].chains[].depositFeeRate    | optional | string  | Deposit fee rate (some currencies have this param; the default is empty)                                           |
| data[].chains[].withdrawMaxFee    | optional | string  | Withdraw max. fee (some currencies have this param; the default is empty)                                          |
| data[].chains[].depositTierFee    | optional | string  |                                                                                                                    |
