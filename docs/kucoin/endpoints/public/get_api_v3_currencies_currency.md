# GET /api/v3/currencies/{currency}

**Source:** [/api/v3/currencies/{currency}](https://www.kucoin.com/docs/rest//api/v3/currencies/{currency})

## Authentication

Not Required (Public Endpoint)

## Description

Get Currency

Request the currency details of a specified currency via this endpoint.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| chain | optional | string | Support for querying the chain of currency, e.g. the available values for USDT are OMNI, ERC20, TRC20. This only applies to multi-chain currencies; no need for single-chain currencies. |
| currency | required | string | Path parameter, Currency |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.currency | required | string | A unique currency code that will never change |
| data.name | required | string | Currency name; will change after renaming |
| data.fullName | required | string | Full currency name; will change after renaming |
| data.precision | required | integer | Currency precision |
| data.confirms | optional | integer | Number of block confirmations |
| data.contractAddress | optional | string | Contract address |
| data.isMarginEnabled | required | boolean | Margin support or not |
| data.isDebitEnabled | required | boolean | Debit support or not |
| data.chains | required | array | Chain list |
| data.chains[].chainName | required | string | Chain name of currency |
| data.chains[].withdrawalMinSize | required | string | Minimum withdrawal amount |
| data.chains[].depositMinSize | optional | string | Minimum deposit amount |
| data.chains[].withdrawFeeRate | required | string | Withdraw fee rate |
| data.chains[].withdrawalMinFee | required | string | Minimum fees charged for withdrawal |
| data.chains[].isWithdrawEnabled | required | boolean | Withdrawal support or not |
| data.chains[].isDepositEnabled | required | boolean | Deposit support or not |
| data.chains[].confirms | required | integer | Number of block confirmations |
| data.chains[].preConfirms | required | integer | The number of blocks (confirmations) for advance on-chain verification |
| data.chains[].contractAddress | required | string | Contract address |
| data.chains[].withdrawPrecision | required | integer | Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount |
| data.chains[].maxWithdraw | optional | number | Maximum amount of single withdrawal |
| data.chains[].maxDeposit | optional | string | Maximum amount of single deposit (only applicable to Lightning Network) |
| data.chains[].needTag | required | boolean | Need for memo/tag or not |
| data.chains[].chainId | required | string | Chain id of currency |

