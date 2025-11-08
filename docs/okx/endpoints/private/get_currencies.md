# GET currencies

Source: [https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-currencies](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-currencies)

### Get currencies

Retrieve a list of all currencies available which are related to the current account's KYC entity.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/currencies`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| --- | --- | --- | --- |
| ccy | String | No | Single currency or multiple currencies separated with comma, e.g. `BTC` or `BTC,ETH`. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| ccy | String | Currency, e.g. `BTC` |
| name | String | Name of currency. There is no related name when it is not shown. |
| logoLink | String | The logo link of currency |
| chain | String | Chain name, e.g. `USDT-ERC20`, `USDT-TRC20` |
| ctAddr | String | Contract address |
| canDep | Boolean | The availability to deposit from chain  
`false`: not available  
`true`: available |
| canWd | Boolean | The availability to withdraw to chain  
`false`: not available  
`true`: available |
| canInternal | Boolean | The availability to internal transfer  
`false`: not available  
`true`: available |
| depEstOpenTime | String | Estimated opening time for deposit, Unix timestamp format in milliseconds, e.g. `1597026383085`  
if `canDep` is `true`, it returns `""` |
| wdEstOpenTime | String | Estimated opening time for withdraw, Unix timestamp format in milliseconds, e.g. `1597026383085`  
if `canWd` is `true`, it returns `""` |
| minDep | String | The minimum deposit amount of currency in a single transaction |
| minWd | String | The minimum `on-chain withdrawal` amount of currency in a single transaction |
| minInternal | String | The minimum `internal transfer` amount of currency in a single transaction  
No maximum `internal transfer` limit in a single transaction, subject to the withdrawal limit in the past 24 hours(`wdQuota`). |
| maxWd | String | The maximum amount of currency `on-chain withdrawal` in a single transaction |
| wdTickSz | String | The withdrawal precision, indicating the number of digits after the decimal point.  
The withdrawal fee precision kept the same as withdrawal precision.  
The accuracy of internal transfer withdrawal is 8 decimal places. |
| wdQuota | String | The withdrawal limit in the past 24 hours (including `on-chain withdrawal` and `internal transfer`), unit in `USD` |
| usedWdQuota | String | The amount of currency withdrawal used in the past 24 hours, unit in `USD` |
| fee | String | The fixed withdrawal fee  
Apply to `on-chain withdrawal` |
| minFee | String | ~The minimum withdrawal fee for normal address  
Apply to `on-chain withdrawal`~  
(Deprecated) |
| maxFee | String | ~The maximum withdrawal fee for normal address  
Apply to `on-chain withdrawal`~  
(Deprecated) |
| minFeeForCtAddr | String | ~The minimum withdrawal fee for contract address  
Apply to `on-chain withdrawal`~  
(Deprecated) |
| maxFeeForCtAddr | String | ~The maximum withdrawal fee for contract address  
Apply to `on-chain withdrawal`~  
(Deprecated) |
| burningFeeRate | String | Burning fee rate, e.g "0.05" represents "5%".  
Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate.  
Apply to `on-chain withdrawal` |
| mainNet | Boolean | If current chain is main net, then it will return `true`, otherwise it will return `false` |
| needTag | Boolean | Whether tag/memo information is required for withdrawal, e.g. `EOS` will return `true` |
| minDepArrivalConfirm | String | The minimum number of blockchain confirmations to acknowledge fund deposit. The account is credited after that, but the deposit can not be withdrawn |
| minWdUnlockConfirm | String | The minimum number of blockchain confirmations required for withdrawal of a deposit |
| depQuotaFixed | String | The fixed deposit limit, unit in `USD`  
Return empty string if there is no deposit limit |
| usedDepQuotaFixed | String | The used amount of fixed deposit quota, unit in `USD`  
Return empty string if there is no deposit limit |
| depQuoteDailyLayer2 | String | The layer2 network daily deposit limit |
