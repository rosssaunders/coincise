# OKX API Documentation - Funding Account

### Get currencies [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-currencies "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-currencies")

Retrieve a list of all currencies available which are related to the current
account's KYC entity.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/currencies`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                             |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies separated with comma, e.g. <code>BTC</code> or <code>BTC,ETH</code>. |

#### Response Parameters

| Parameter            | Type    | Description                                                                                                                                                                                                                                                    |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy                  | String  | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                |
| name                 | String  | Name of currency. There is no related name when it is not shown.                                                                                                                                                                                               |
| logoLink             | String  | The logo link of currency                                                                                                                                                                                                                                      |
| chain                | String  | Chain name, e.g. <code>USDT-ERC20</code>, <code>USDT-TRC20</code>                                                                                                                                                                                              |
| ctAddr               | String  | Contract address                                                                                                                                                                                                                                               |
| canDep               | Boolean | The availability to deposit from chain<br><code>false</code>: not available<br><code>true</code>: available                                                                                                                                                    |
| canWd                | Boolean | The availability to withdraw to chain<br><code>false</code>: not available<br><code>true</code>: available                                                                                                                                                     |
| canInternal          | Boolean | The availability to internal transfer<br><code>false</code>: not available<br><code>true</code>: available                                                                                                                                                     |
| depEstOpenTime       | String  | Estimated opening time for deposit, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>if <code>canDep</code> is <code>true</code>, it returns <code>""</code>                                                                          |
| wdEstOpenTime        | String  | Estimated opening time for withdraw, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code><br>if <code>canWd</code> is <code>true</code>, it returns <code>""</code>                                                                          |
| minDep               | String  | The minimum deposit amount of currency in a single transaction                                                                                                                                                                                                 |
| minWd                | String  | The minimum <code>on-chain withdrawal</code> amount of currency in a single transaction                                                                                                                                                                        |
| minInternal          | String  | The minimum <code>internal transfer</code> amount of currency in a single transaction<br>No maximum <code>internal transfer</code> limit in a single transaction, subject to the withdrawal limit in the past 24 hours(<code>wdQuota</code>).                  |
| maxWd                | String  | The maximum amount of currency <code>on-chain withdrawal</code> in a single transaction                                                                                                                                                                        |
| wdTickSz             | String  | The withdrawal precision, indicating the number of digits after the decimal point.<br>The withdrawal fee precision kept the same as withdrawal precision.<br>The accuracy of internal transfer withdrawal is 8 decimal places.                                 |
| wdQuota              | String  | The withdrawal limit in the past 24 hours (including <code>on-chain withdrawal</code> and <code>internal transfer</code>), unit in <code>USD</code>                                                                                                            |
| usedWdQuota          | String  | The amount of currency withdrawal used in the past 24 hours, unit in <code>USD</code>                                                                                                                                                                          |
| fee                  | String  | The fixed withdrawal fee<br>Apply to <code>on-chain withdrawal</code>                                                                                                                                                                                          |
| minFee               | String  | <del>The minimum withdrawal fee for normal address<br>Apply to <code>on-chain withdrawal</code></del><br>(Deprecated)                                                                                                                                          |
| maxFee               | String  | <del>The maximum withdrawal fee for normal address<br>Apply to <code>on-chain withdrawal</code></del><br>(Deprecated)                                                                                                                                          |
| minFeeForCtAddr      | String  | <del>The minimum withdrawal fee for contract address<br>Apply to <code>on-chain withdrawal</code></del><br>(Deprecated)                                                                                                                                        |
| maxFeeForCtAddr      | String  | <del>The maximum withdrawal fee for contract address<br>Apply to <code>on-chain withdrawal</code></del><br>(Deprecated)                                                                                                                                        |
| burningFeeRate       | String  | Burning fee rate, e.g "0.05" represents "5%".<br>Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate.<br>Apply to <code>on-chain withdrawal</code> |
| mainNet              | Boolean | If current chain is main net, then it will return <code>true</code>, otherwise it will return <code>false</code>                                                                                                                                               |
| needTag              | Boolean | Whether tag/memo information is required for withdrawal, e.g. <code>EOS</code> will return <code>true</code>                                                                                                                                                   |
| minDepArrivalConfirm | String  | The minimum number of blockchain confirmations to acknowledge fund deposit. The account is credited after that, but the deposit can not be withdrawn                                                                                                           |
| minWdUnlockConfirm   | String  | The minimum number of blockchain confirmations required for withdrawal of a deposit                                                                                                                                                                            |
| depQuotaFixed        | String  | The fixed deposit limit, unit in <code>USD</code><br>Return empty string if there is no deposit limit                                                                                                                                                          |
| usedDepQuotaFixed    | String  | The used amount of fixed deposit quota, unit in <code>USD</code><br>Return empty string if there is no deposit limit                                                                                                                                           |
| depQuoteDailyLayer2  | String  | The layer2 network daily deposit limit                                                                                                                                                                                                                         |

---

### Get balance [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-balance "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-balance")

Retrieve the funding account balances of all the assets and the amount that is
available or on hold.

Only asset information of a currency with a balance greater than 0 will be
returned.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/balances`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                               |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. <code>BTC</code> or <code>BTC,ETH</code>. |

#### Response Parameters

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| ccy       | String | Currency          |
| bal       | String | Balance           |
| frozenBal | String | Frozen balance    |
| availBal  | String | Available balance |

---

### Get non-tradable assets [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets")

Retrieve the funding account balances of all the assets and the amount that is
available or on hold.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/non-tradable-assets`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                               |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Single currency or multiple currencies (no more than 20) separated with comma, e.g. <code>BTC</code> or <code>BTC,ETH</code>. |

#### Response Parameters

| Parameter      | Type    | Description                                                                                                                                                                                                       |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String  | Currency, e.g. <code>CELT</code>                                                                                                                                                                                  |
| name           | String  | Chinese name of currency. There is no related name when it is not shown.                                                                                                                                          |
| logoLink       | String  | Logo link of currency                                                                                                                                                                                             |
| bal            | String  | Withdrawable balance                                                                                                                                                                                              |
| canWd          | Boolean | Availability to withdraw to chain.<br><code>false</code>: not available <code>true</code>: available                                                                                                              |
| chain          | String  | Chain for withdrawal                                                                                                                                                                                              |
| minWd          | String  | Minimum withdrawal amount of currency in a single transaction                                                                                                                                                     |
| wdAll          | Boolean | Whether all assets in this currency must be withdrawn at one time                                                                                                                                                 |
| fee            | String  | Fixed withdrawal fee                                                                                                                                                                                              |
| feeCcy         | String  | Fixed withdrawal fee unit, e.g. <code>USDT</code>                                                                                                                                                                 |
| burningFeeRate | String  | Burning fee rate, e.g "0.05" represents "5%".<br>Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate. |
| ctAddr         | String  | Last 6 digits of contract address                                                                                                                                                                                 |
| wdTickSz       | String  | Withdrawal precision, indicating the number of digits after the decimal point                                                                                                                                     |
| needTag        | Boolean | Whether tag/memo information is required for withdrawal                                                                                                                                                           |

---

### Get account asset valuation [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation")

View account asset valuation

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/asset-valuation`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                                                      |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy            | String    | No           | Asset valuation calculation unit<br>BTC, USDT<br>USD, CNY, JP, KRW, RUB, EUR<br>VND, IDR, INR, PHP, THB, TRY<br>AUD, SGD, ARS, SAR, AED, IQD<br>The default is the valuation in BTC. |

#### Response Parameters

| Parameter    | Type   | Description                                                           |
| ------------ | ------ | --------------------------------------------------------------------- |
| totalBal     | String | Valuation of total account assets                                     |
| ts           | String | Unix timestamp format in milliseconds, e.g.<code>1597026383085</code> |
| details      | Object | Asset valuation details for each account                              |
| &gt; funding | String | Funding account                                                       |
| &gt; trading | String | Trading account                                                       |
| &gt; classic | String | [Deprecated] Classic account                                          |
| &gt; earn    | String | Earn account                                                          |

---

### Funds transfer [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-funds-transfer "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-funds-transfer")

Only API keys with `Trade` privilege can call this endpoint.

This endpoint supports the transfer of funds between your funding account and
trading account, and from the master account to sub-accounts.

Sub-account can transfer out to master account by default. Need to call
[Set permission of transfer out](/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out)
to grant privilege first if you want sub-account transferring to another
sub-account (sub-accounts need to belong to same master account.)

The success or failure of the request does not necessarily reflect the actual
transfer result. Recommend checking the transfer status by calling "Get funds
transfer state" to confirm the final result.

#### Rate Limit: 2 requests per second

#### Rate limit rule: User ID + Currency

#### Permission: Trade

#### HTTP Request

`POST /api/v5/asset/transfer`

#### Request Parameters

| Parameter   | Type    | Required    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | String  | No          | Transfer type<br><code>0</code>: transfer within account<br><code>1</code>: master account to sub-account (Only applicable to API Key from master account)<br><code>2</code>: sub-account to master account (Only applicable to API Key from master account)<br><code>3</code>: sub-account to master account (Only applicable to APIKey from sub-account)<br><code>4</code>: sub-account to sub-account (Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account. Sub-account directly transfer out permission is disabled by default, set permission please refer to <a href="/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out">Set permission of transfer out</a>)<br>The default is <code>0</code>.<br>If you want to make transfer between sub-accounts by master account API key, refer to <a href="/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts">Master accounts manage the transfers between sub-accounts</a> |
| ccy         | String  | Yes         | Transfer currency, e.g. <code>USDT</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| amt         | String  | Yes         | Amount to be transferred                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| from        | String  | Yes         | The remitting account<br><code>6</code>: Funding account<br><code>18</code>: Trading account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| to          | String  | Yes         | The beneficiary account<br><code>6</code>: Funding account<br><code>18</code>: Trading account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| subAcct     | String  | Conditional | Name of the sub-account<br>When <code>type</code> is <code>1</code>/<code>2</code>/<code>4</code>, this parameter is required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| loanTrans   | Boolean | No          | Whether or not borrowed coins can be transferred out under <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code><br><code>true</code>: borrowed coins can be transferred out<br><code>false</code>: borrowed coins cannot be transferred out<br>the default is <code>false</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| omitPosRisk | String  | No          | Ignore position risk<br>Default is <code>false</code><br>Applicable to <code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| clientId    | String  | No          | Client-supplied ID<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Response Parameters

| Parameter | Type   | Description             |
| --------- | ------ | ----------------------- |
| transId   | String | Transfer ID             |
| clientId  | String | Client-supplied ID      |
| ccy       | String | Currency                |
| from      | String | The remitting account   |
| amt       | String | Transfer amount         |
| to        | String | The beneficiary account |

---

### Get funds transfer state [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state")

Retrieve the transfer state data of the last 2 weeks.

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/transfer-state`

#### Request Parameters

| Parameter | Type   | Required    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transId   | String | Conditional | Transfer ID<br>Either transId or clientId is required. If both are passed, transId will be used.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| clientId  | String | Conditional | Client-supplied ID<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type      | String | No          | Transfer type<br><code>0</code>: transfer within account<br><code>1</code>: master account to sub-account (Only applicable to API Key from master account)<br><code>2</code>: sub-account to master account (Only applicable to API Key from master account)<br><code>3</code>: sub-account to master account (Only applicable to APIKey from sub-account)<br><code>4</code>: sub-account to sub-account (Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account)<br>The default is <code>0</code>.<br>For Custody accounts, can choose not to pass this parameter or pass <code>0</code>. |

#### Response Parameters

| Parameter | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transId   | String | Transfer ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| clientId  | String | Client-supplied ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ccy       | String | Currency, e.g. <code>USDT</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| amt       | String | Amount to be transferred                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type      | String | Transfer type<br><code>0</code>: transfer within account<br><code>1</code>: master account to sub-account (Only applicable to API Key from master account)<br><code>2</code>: sub-account to master account (Only applicable to APIKey from master account)<br><code>3</code>: sub-account to master account (Only applicable to APIKey from sub-account)<br><code>4</code>: sub-account to sub-account (Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account) |
| from      | String | The remitting account<br><code>6</code>: Funding account<br><code>18</code>: Trading account                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| to        | String | The beneficiary account<br><code>6</code>: Funding account<br><code>18</code>: Trading account                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| subAcct   | String | Name of the sub-account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| instId    | String | deprecated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| toInstId  | String | deprecated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| state     | String | Transfer state<br><code>success</code><br><code>pending</code><br><code>failed</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

---

### Asset bills details [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-asset-bills-details "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-asset-bills-details")

Query the billing record in the past month.

#### Rate Limit: 6 Requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/bills`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | No       | Currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type      | String | No       | Bill type<br><code>1</code>: Deposit<br><code>2</code>: Withdrawal<br><code>13</code>: Canceled withdrawal<br><code>20</code>: Transfer to sub account (for master account)<br><code>21</code>: Transfer from sub account (for master account)<br><code>22</code>: Transfer out from sub to master account (for sub-account)<br><code>23</code>: Transfer in from master to sub account (for sub-account)<br><code>28</code>: Manually claimed Airdrop<br><code>47</code>: System reversal<br><code>48</code>: Event Reward<br><code>49</code>: Event Giveaway<br><code>68</code>: Fee rebate (by rebate card)<br><code>72</code>: Token received<br><code>73</code>: Token given away<br><code>74</code>: Token refunded<br><code>75</code>: [Simple earn flexible] Subscription<br><code>76</code>: [Simple earn flexible] Redemption<br><code>77</code>: Jumpstart distribute<br><code>78</code>: Jumpstart lock up<br><code>80</code>: DEFI/Staking subscription<br><code>82</code>: DEFI/Staking redemption<br><code>83</code>: Staking yield<br><code>84</code>: Violation fee<br><code>89</code>: Deposit yield<br><code>116</code>: [Fiat] Place an order<br><code>117</code>: [Fiat] Fulfill an order<br><code>118</code>: [Fiat] Cancel an order<br><code>124</code>: Jumpstart unlocking<br><code>130</code>: Transferred from Trading account<br><code>131</code>: Transferred to Trading account<br><code>132</code>: [P2P] Frozen by customer service<br><code>133</code>: [P2P] Unfrozen by customer service<br><code>134</code>: [P2P] Transferred by customer service<br><code>135</code>: Cross chain exchange<br><code>137</code>: [ETH Staking] Subscription<br><code>138</code>: [ETH Staking] Swapping<br><code>139</code>: [ETH Staking] Earnings<br><code>146</code>: Customer feedback<br><code>150</code>: Affiliate commission<br><code>151</code>: Referral reward<br><code>152</code>: Broker reward<br><code>160</code>: Dual Investment subscribe<br><code>161</code>: Dual Investment collection<br><code>162</code>: Dual Investment profit<br><code>163</code>: Dual Investment refund<br><code>172</code>: [Affiliate] Sub-affiliate commission<br><code>173</code>: [Affiliate] Fee rebate (by trading fee)<br><code>174</code>: Jumpstart Pay<br><code>175</code>: Locked collateral<br><code>176</code>: Loan<br><code>177</code>: Added collateral<br><code>178</code>: Returned collateral<br><code>179</code>: Repayment<br><code>180</code>: Unlocked collateral<br><code>181</code>: Airdrop payment<br><code>185</code>: [Broker] Convert reward<br><code>187</code>: [Broker] Convert transfer<br><code>189</code>: Mystery box bonus<br><code>195</code>: Untradable asset withdrawal<br><code>196</code>: Untradable asset withdrawal revoked<br><code>197</code>: Untradable asset deposit<br><code>198</code>: Untradable asset collection reduce<br><code>199</code>: Untradable asset collection increase<br><code>200</code>: Buy<br><code>202</code>: Price Lock Subscribe<br><code>203</code>: Price Lock Collection<br><code>204</code>: Price Lock Profit<br><code>205</code>: Price Lock Refund<br><code>207</code>: Dual Investment Lite Subscribe<br><code>208</code>: Dual Investment Lite Collection<br><code>209</code>: Dual Investment Lite Profit<br><code>210</code>: Dual Investment Lite Refund<br><code>212</code>: [Flexible loan] Multi-collateral loan collateral locked<br><code>215</code>: [Flexible loan] Multi-collateral loan collateral released<br><code>217</code>: [Flexible loan] Multi-collateral loan borrowed<br><code>218</code>: [Flexible loan] Multi-collateral loan repaid<br><code>232</code>: [Flexible loan] Subsidized interest received<br><code>220</code>: Delisted crypto<br><code>221</code>: Blockchain's withdrawal fee<br><code>222</code>: Withdrawal fee refund<br><code>223</code>: SWAP lead trading profit share<br><code>225</code>: Shark Fin subscribe<br><code>226</code>: Shark Fin collection<br><code>227</code>: Shark Fin profit<br><code>228</code>: Shark Fin refund<br><code>229</code>: Airdrop<br><code>232</code>: Subsidized interest received<br><code>233</code>: Broker rebate compensation<br><code>240</code>: Snowball subscribe<br><code>241</code>: Snowball refund<br><code>242</code>: Snowball profit<br><code>243</code>: Snowball trading failed<br><code>249</code>: Seagull subscribe<br><code>250</code>: Seagull collection<br><code>251</code>: Seagull profit<br><code>252</code>: Seagull refund<br><code>263</code>: Strategy bots profit share<br><code>265</code>: Signal revenue<br><code>266</code>: SPOT lead trading profit share<br><code>270</code>: DCD broker transfer<br><code>271</code>: DCD broker rebate<br><code>272</code>: [Convert] Buy Crypto/Fiat<br><code>273</code>: [Convert] Sell Crypto/Fiat<br><code>284</code>: [Custody] Transfer out trading sub-account<br><code>285</code>: [Custody] Transfer in trading sub-account<br><code>286</code>: [Custody] Transfer out custody funding account<br><code>287</code>: [Custody] Transfer in custody funding account<br><code>288</code>: [Custody] Fund delegation<br><code>289</code>: [Custody] Fund undelegation<br><code>299</code>: Affiliate recommendation commission<br><code>300</code>: Fee discount rebate<br><code>303</code>: Snowball market maker transfer<br><del><code>304</code>: [Simple Earn Fixed] Order submission</del><br><del><code>305</code>: [Simple Earn Fixed] Order redemption</del><br><del><code>306</code>: [Simple Earn Fixed] Principal distribution</del><br><del><code>307</code>: [Simple Earn Fixed] Interest distribution (early termination compensation)</del><br><del><code>308</code>: [Simple Earn Fixed] Interest distribution</del><br><del><code>309</code>: [Simple Earn Fixed] Interest distribution (extension compensation)</del><br><code>311</code>: Crypto dust auto-transfer in<br><code>313</code>: Sent by gift<br><code>314</code>: Received from gift<br><code>315</code>: Refunded from gift<br><code>328</code>: [SOL staking] Send Liquidity Staking Token reward<br><code>329</code>: [SOL staking] Subscribe Liquidity Staking Token staking<br><code>330</code>: [SOL staking] Mint Liquidity Staking Token<br><code>331</code>: [SOL staking] Redeem Liquidity Staking Token order<br><code>332</code>: [SOL staking] Settle Liquidity Staking Token order<br><code>333</code>: Trial fund reward<br><code>339</code>: [Simple Earn Fixed] Order submission<br><code>340</code>: [Simple Earn Fixed] Order failure refund<br><code>341</code>: [Simple Earn Fixed] Redemption<br><code>342</code>: [Simple Earn Fixed] Principal<br><code>343</code>: [Simple Earn Fixed] Interest<br><code>344</code>: [Simple Earn Fixed] Compensatory interest<br><code>345</code>: [Institutional Loan] Principal repayment<br><code>346</code>: [Institutional Loan] Interest repayment<br><code>347</code>: [Institutional Loan] Overdue penalty<br><code>348</code>: [BTC staking] Subscription<br><code>349</code>: [BTC staking] Redemption<br><code>350</code>: [BTC staking] Earnings<br><code>351</code>: [Institutional Loan] Loan disbursement<br><code>354</code>: Copy and bot rewards<br><code>361</code>: Deposit from closed sub-account<br><code>372</code>: Asset segregation<br><code>373</code>: Asset release<br><code>400</code>: Auto earn interest (USDG earn) |
| clientId  | String | No       | Client-supplied ID for transfer or withdrawal<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| after     | String | No       | Pagination of data to return records earlier than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| before    | String | No       | Pagination of data to return records newer than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| limit     | String | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### Response Parameters

| Parameter | Type   | Description                                                                          |
| --------- | ------ | ------------------------------------------------------------------------------------ |
| billId    | String | Bill ID                                                                              |
| ccy       | String | Account balance currency                                                             |
| clientId  | String | Client-supplied ID for transfer or withdrawal                                        |
| balChg    | String | Change in balance at the account level                                               |
| bal       | String | Balance at the account level                                                         |
| type      | String | Bill type                                                                            |
| notes     | String | Notes                                                                                |
| ts        | String | Creation time, Unix timestamp format in milliseconds, e.g.<code>1597026383085</code> |

---

### Asset bills history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-asset-bills-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-asset-bills-history")

Query the billing records of all time since 1 February, 2021.

⚠️ **IMPORTANT**: Data updates occur every 30 seconds. Update frequency may vary
based on data volume - please be aware of potential delays during high-traffic
periods.

#### Rate Limit: 1 Requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/bills-history`

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy        | String | No       | Currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type       | String | No       | Bill type<br><code>1</code>: Deposit<br><code>2</code>: Withdrawal<br><code>13</code>: Canceled withdrawal<br><code>20</code>: Transfer to sub account (for master account)<br><code>21</code>: Transfer from sub account (for master account)<br><code>22</code>: Transfer out from sub to master account (for sub-account)<br><code>23</code>: Transfer in from master to sub account (for sub-account)<br><code>28</code>: Manually claimed Airdrop<br><code>47</code>: System reversal<br><code>48</code>: Event Reward<br><code>49</code>: Event Giveaway<br><code>68</code>: Fee rebate (by rebate card)<br><code>72</code>: Token received<br><code>73</code>: Token given away<br><code>74</code>: Token refunded<br><code>75</code>: [Simple earn flexible] Subscription<br><code>76</code>: [Simple earn flexible] Redemption<br><code>77</code>: Jumpstart distribute<br><code>78</code>: Jumpstart lock up<br><code>80</code>: DEFI/Staking subscription<br><code>82</code>: DEFI/Staking redemption<br><code>83</code>: Staking yield<br><code>84</code>: Violation fee<br><code>89</code>: Deposit yield<br><code>116</code>: [Fiat] Place an order<br><code>117</code>: [Fiat] Fulfill an order<br><code>118</code>: [Fiat] Cancel an order<br><code>124</code>: Jumpstart unlocking<br><code>130</code>: Transferred from Trading account<br><code>131</code>: Transferred to Trading account<br><code>132</code>: [P2P] Frozen by customer service<br><code>133</code>: [P2P] Unfrozen by customer service<br><code>134</code>: [P2P] Transferred by customer service<br><code>135</code>: Cross chain exchange<br><code>137</code>: [ETH Staking] Subscription<br><code>138</code>: [ETH Staking] Swapping<br><code>139</code>: [ETH Staking] Earnings<br><code>146</code>: Customer feedback<br><code>150</code>: Affiliate commission<br><code>151</code>: Referral reward<br><code>152</code>: Broker reward<br><code>160</code>: Dual Investment subscribe<br><code>161</code>: Dual Investment collection<br><code>162</code>: Dual Investment profit<br><code>163</code>: Dual Investment refund<br><code>172</code>: [Affiliate] Sub-affiliate commission<br><code>173</code>: [Affiliate] Fee rebate (by trading fee)<br><code>174</code>: Jumpstart Pay<br><code>175</code>: Locked collateral<br><code>176</code>: Loan<br><code>177</code>: Added collateral<br><code>178</code>: Returned collateral<br><code>179</code>: Repayment<br><code>180</code>: Unlocked collateral<br><code>181</code>: Airdrop payment<br><code>185</code>: [Broker] Convert reward<br><code>187</code>: [Broker] Convert transfer<br><code>189</code>: Mystery box bonus<br><code>195</code>: Untradable asset withdrawal<br><code>196</code>: Untradable asset withdrawal revoked<br><code>197</code>: Untradable asset deposit<br><code>198</code>: Untradable asset collection reduce<br><code>199</code>: Untradable asset collection increase<br><code>200</code>: Buy<br><code>202</code>: Price Lock Subscribe<br><code>203</code>: Price Lock Collection<br><code>204</code>: Price Lock Profit<br><code>205</code>: Price Lock Refund<br><code>207</code>: Dual Investment Lite Subscribe<br><code>208</code>: Dual Investment Lite Collection<br><code>209</code>: Dual Investment Lite Profit<br><code>210</code>: Dual Investment Lite Refund<br><code>212</code>: [Flexible loan] Multi-collateral loan collateral locked<br><code>215</code>: [Flexible loan] Multi-collateral loan collateral released<br><code>217</code>: [Flexible loan] Multi-collateral loan borrowed<br><code>218</code>: [Flexible loan] Multi-collateral loan repaid<br><code>232</code>: [Flexible loan] Subsidized interest received<br><code>220</code>: Delisted crypto<br><code>221</code>: Blockchain's withdrawal fee<br><code>222</code>: Withdrawal fee refund<br><code>223</code>: SWAP lead trading profit share<br><code>225</code>: Shark Fin subscribe<br><code>226</code>: Shark Fin collection<br><code>227</code>: Shark Fin profit<br><code>228</code>: Shark Fin refund<br><code>229</code>: Airdrop<br><code>232</code>: Subsidized interest received<br><code>233</code>: Broker rebate compensation<br><code>240</code>: Snowball subscribe<br><code>241</code>: Snowball refund<br><code>242</code>: Snowball profit<br><code>243</code>: Snowball trading failed<br><code>249</code>: Seagull subscribe<br><code>250</code>: Seagull collection<br><code>251</code>: Seagull profit<br><code>252</code>: Seagull refund<br><code>263</code>: Strategy bots profit share<br><code>265</code>: Signal revenue<br><code>266</code>: SPOT lead trading profit share<br><code>270</code>: DCD broker transfer<br><code>271</code>: DCD broker rebate<br><code>272</code>: [Convert] Buy Crypto/Fiat<br><code>273</code>: [Convert] Sell Crypto/Fiat<br><code>284</code>: [Custody] Transfer out trading sub-account<br><code>285</code>: [Custody] Transfer in trading sub-account<br><code>286</code>: [Custody] Transfer out custody funding account<br><code>287</code>: [Custody] Transfer in custody funding account<br><code>288</code>: [Custody] Fund delegation<br><code>289</code>: [Custody] Fund undelegation<br><code>299</code>: Affiliate recommendation commission<br><code>300</code>: Fee discount rebate<br><code>303</code>: Snowball market maker transfer<br><del><code>304</code>: [Simple Earn Fixed] Order submission</del><br><del><code>305</code>: [Simple Earn Fixed] Order redemption</del><br><del><code>306</code>: [Simple Earn Fixed] Principal distribution</del><br><del><code>307</code>: [Simple Earn Fixed] Interest distribution (early termination compensation)</del><br><del><code>308</code>: [Simple Earn Fixed] Interest distribution</del><br><del><code>309</code>: [Simple Earn Fixed] Interest distribution (extension compensation)</del><br><code>311</code>: Crypto dust auto-transfer in<br><code>313</code>: Sent by gift<br><code>314</code>: Received from gift<br><code>315</code>: Refunded from gift<br><code>328</code>: [SOL staking] Send Liquidity Staking Token reward<br><code>329</code>: [SOL staking] Subscribe Liquidity Staking Token staking<br><code>330</code>: [SOL staking] Mint Liquidity Staking Token<br><code>331</code>: [SOL staking] Redeem Liquidity Staking Token order<br><code>332</code>: [SOL staking] Settle Liquidity Staking Token order<br><code>333</code>: Trial fund reward<br><code>339</code>: [Simple Earn Fixed] Order submission<br><code>340</code>: [Simple Earn Fixed] Order failure refund<br><code>341</code>: [Simple Earn Fixed] Redemption<br><code>342</code>: [Simple Earn Fixed] Principal<br><code>343</code>: [Simple Earn Fixed] Interest<br><code>344</code>: [Simple Earn Fixed] Compensatory interest<br><code>345</code>: [Institutional Loan] Principal repayment<br><code>346</code>: [Institutional Loan] Interest repayment<br><code>347</code>: [Institutional Loan] Overdue penalty<br><code>348</code>: [BTC staking] Subscription<br><code>349</code>: [BTC staking] Redemption<br><code>350</code>: [BTC staking] Earnings<br><code>351</code>: [Institutional Loan] Loan disbursement<br><code>354</code>: Copy and bot rewards<br><code>361</code>: Deposit from closed sub-account<br><code>372</code>: Asset segregation<br><code>373</code>: Asset release<br><code>400</code>: Auto earn interest (USDG earn) |
| clientId   | String | No       | Client-supplied ID for transfer or withdrawal<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| after      | String | No       | Pagination of data to return records earlier than the requested <code>ts</code> or <code>billId</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| before     | String | No       | Pagination of data to return records newer than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| limit      | String | No       | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pagingType | String | No       | PagingType<br><code>1</code>: Timestamp of the bill record<br><code>2</code>: Bill ID of the bill record<br>The default is <code>1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

#### Response Parameters

| Parameter | Type   | Description                                                                          |
| --------- | ------ | ------------------------------------------------------------------------------------ |
| billId    | String | Bill ID                                                                              |
| ccy       | String | Account balance currency                                                             |
| clientId  | String | Client-supplied ID for transfer or withdrawal                                        |
| balChg    | String | Change in balance at the account level                                               |
| bal       | String | Balance at the account level                                                         |
| type      | String | Bill type                                                                            |
| notes     | String | Notes                                                                                |
| ts        | String | Creation time, Unix timestamp format in milliseconds, e.g.<code>1597026383085</code> |

---

### Get deposit address [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-address "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-address")

Retrieve the deposit addresses of currencies, including previously-used
addresses.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-address`

#### Request Parameters

| Parameter | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| ccy       | String | Yes      | Currency, e.g. <code>BTC</code> |

#### Response Parameters

| Parameter    | Type    | Description                                                                                                                                                                                                               |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addr         | String  | Deposit address                                                                                                                                                                                                           |
| tag          | String  | Deposit tag (This will not be returned if the currency does not require a tag for deposit)                                                                                                                                |
| memo         | String  | Deposit memo (This will not be returned if the currency does not require a memo for deposit)                                                                                                                              |
| pmtId        | String  | Deposit payment ID (This will not be returned if the currency does not require a payment_id for deposit)                                                                                                                  |
| addrEx       | Object  | Deposit address attachment (This will not be returned if the currency does not require this)<br>e.g. <code>TONCOIN</code> attached tag name is <code>comment</code>, the return will be <code>{'comment':'123456'}</code> |
| ccy          | String  | Currency, e.g. <code>BTC</code>                                                                                                                                                                                           |
| chain        | String  | Chain name, e.g. <code>USDT-ERC20</code>, <code>USDT-TRC20</code>                                                                                                                                                         |
| to           | String  | The beneficiary account<br><code>6</code>: Funding account <code>18</code>: Trading account<br>The users under some entity (e.g. Brazil) only support deposit to trading account.                                         |
| verifiedName | String  | Verified name (for recipient)                                                                                                                                                                                             |
| selected     | Boolean | Return <code>true</code> if the current deposit address is selected by the website page                                                                                                                                   |
| ctAddr       | String  | Last 6 digits of contract address                                                                                                                                                                                         |

---

### Get deposit history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-history")

Retrieve the deposit records according to the currency, deposit status, and time
range in reverse chronological order. The 100 most recent records are returned
by default.  
Websocket API is also available, refer to
[Deposit info channel](/docs-v5/en/#funding-account-websocket-deposit-info-channel).

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | No       | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| depId     | String | No       | Deposit ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| fromWdId  | String | No       | Internal transfer initiator's withdrawal ID<br>If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator                                                                                                                                                                                                                                                                                                            |
| txId      | String | No       | Hash record of the deposit                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| type      | String | No       | Deposit Type<br><code>3</code>: internal transfer<br><code>4</code>: deposit from chain                                                                                                                                                                                                                                                                                                                                                                                         |
| state     | String | No       | Status of deposit<br><code>0</code>: waiting for confirmation<br><code>1</code>: deposit credited<br><code>2</code>: deposit successful<br><code>8</code>: pending due to temporary deposit suspension on this crypto currency<br><code>11</code>: match the address blacklist<br><code>12</code>: account or deposit is frozen<br><code>13</code>: sub-account deposit interception<br><code>14</code>: KYC limit<br><code>17</code>: Pending response from Travel Rule vendor |
| after     | String | No       | Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. <code>1654041600000</code>                                                                                                                                                                                                                                                                                                                                      |
| before    | String | No       | Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. <code>1656633600000</code>                                                                                                                                                                                                                                                                                                                                        |
| limit     | string | No       | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code>                                                                                                                                                                                                                                                                                                                                                                                 |

#### Response Parameters

| Parameter           | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy                 | String | Currency                                                                                                                                                                                                                                                                                                                                                                                                           |
| chain               | String | Chain name                                                                                                                                                                                                                                                                                                                                                                                                         |
| amt                 | String | Deposit amount                                                                                                                                                                                                                                                                                                                                                                                                     |
| from                | String | Deposit account<br>If the deposit comes from an internal transfer, this field displays the account information of the internal transfer initiator, which can be a mobile phone number, email address, account name, and will return "" in other cases                                                                                                                                                              |
| areaCodeFrom        | String | If <code>from</code> is a phone number, this parameter return area code of the phone number                                                                                                                                                                                                                                                                                                                        |
| to                  | String | Deposit address<br>If the deposit comes from the on-chain, this field displays the on-chain address, and will return "" in other cases                                                                                                                                                                                                                                                                             |
| txId                | String | Hash record of the deposit                                                                                                                                                                                                                                                                                                                                                                                         |
| ts                  | String | The timestamp that the deposit record is created, Unix timestamp format in milliseconds, e.g. <code>1655251200000</code>                                                                                                                                                                                                                                                                                           |
| state               | String | Status of deposit<br><code>0</code>: Waiting for confirmation<br><code>1</code>: Deposit credited<br><code>2</code>: Deposit successful<br><code>8</code>: Pending due to temporary deposit suspension on this crypto currency<br><code>11</code>: Match the address blacklist<br><code>12</code>: Account or deposit is frozen<br><code>13</code>: Sub-account deposit interception<br><code>14</code>: KYC limit |
| depId               | String | Deposit ID                                                                                                                                                                                                                                                                                                                                                                                                         |
| fromWdId            | String | Internal transfer initiator's withdrawal ID<br>If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator, and will return "" in other cases                                                                                                                                                                                                            |
| actualDepBlkConfirm | String | The actual amount of blockchain confirmed in a single deposit                                                                                                                                                                                                                                                                                                                                                      |

About deposit state  
**Waiting for confirmation** is that the required number of blockchain
confirmations has not been reached.  
**Deposit credited** is that there is sufficient number of blockchain
confirmations for the currency to be credited to the account, but it cannot be
withdrawn yet.  
**Deposit successful** means the crypto has been credited to the account and it
can be withdrawn.

---

### Withdrawal [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-withdrawal "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-withdrawal")

Only supported withdrawal of assets from funding account. Common sub-account
does not support withdrawal.

The API can only make withdrawal to verified addresses/account, and verified
addresses can be set by WEB/APP.

About tag  
Some token deposits require a deposit address and a tag (e.g. Memo/Payment ID),
which is a string that guarantees the uniqueness of your deposit address. Follow
the deposit procedure carefully, or you may risk losing your assets.  
For currencies with labels, if it is a withdrawal between OKX users, please use
internal transfer instead of online withdrawal

The following content only applies to users residing in the United Arab
Emirates  
Due to local laws and regulations in your country or region, a certain ratio of
user assets must be stored in cold wallets. We will perform cold-to-hot wallet
asset transfers from time to time. However, if assets in hot wallets are not
sufficient to meet user withdrawal demands, an extra step is needed to transfer
cold wallet assets to the hot wallet. This may cause delays of up to 24 hours to
receive withdrawals.  
Learn more
(https://www.okx.com/help/what-is-a-segregated-wallet-and-why-is-my-withdrawal-delayed)

Users under certain entities need to provide additional information for
withdrawal  
Bahamas entity users refer to
https://www.okx.com/docs-v5/log\_en/#2024-08-08-withdrawal-api-adjustment-for-bahama-entity-users

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Withdraw

#### HTTP Request

`POST /api/v5/asset/withdrawal`

#### Request Parameters

| Parameter                   | Type   | Required    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy                         | String | Yes         | Currency, e.g. <code>USDT</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| amt                         | String | Yes         | Withdrawal amount<br>Withdrawal fee is not included in withdrawal amount. Please reserve sufficient transaction fees when withdrawing.<br>You can get fee amount by <a href="/docs-v5/en/#funding-account-rest-api-get-currencies">Get currencies</a>.<br>For <code>internal transfer</code>, transaction fee is always <code>0</code>.                                                                                                                                                                                                            |
| dest                        | String | Yes         | Withdrawal method<br><code>3</code>: internal transfer<br><code>4</code>: on-chain withdrawal                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| toAddr                      | String | Yes         | <code>toAddr</code> should be a trusted address/account.<br>If your <code>dest</code> is <code>4</code>, some crypto currency addresses are formatted as <code>'address:tag'</code>, e.g. <code>'ARDOR-7JF3-8F2E-QUWZ-CAN7F:123456'</code><br>If your <code>dest</code> is <code>3</code>,<code>toAddr</code> should be a recipient address which can be UID, email, phone or login account name (account name is only for sub-account).                                                                                                           |
| toAddrType                  | String | No          | Address type<br><code>1</code>: wallet address, email, phone, or login account name<br><code>2</code>: UID (only for whitelisted users; applicable only when dest=<code>3</code>)                                                                                                                                                                                                                                                                                                                                                                  |
| chain                       | String | Conditional | Chain name<br>There are multiple chains under some currencies, such as <code>USDT</code> has <code>USDT-ERC20</code>, <code>USDT-TRC20</code><br>If the parameter is not filled in, the default will be the main chain.<br>When you withdrawal the non-tradable asset, if the parameter is not filled in, the default will be the unique withdrawal chain.<br>Apply to <code>on-chain withdrawal</code>.<br>You can get supported chain name by the endpoint of <a href="/docs-v5/en/#funding-account-rest-api-get-currencies">Get currencies</a>. |
| areaCode                    | String | Conditional | Area code for the phone number, e.g. <code>86</code><br>If <code>toAddr</code> is a phone number, this parameter is required.<br>Apply to <code>internal transfer</code>                                                                                                                                                                                                                                                                                                                                                                           |
| rcvrInfo                    | Object | Conditional | Recipient information<br>For the specific entity users to do on-chain withdrawal/lightning withdrawal, this information is required.                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; walletType             | String | Yes         | Wallet Type<br><code>exchange</code>: Withdraw to exchange wallet<br><code>private</code>: Withdraw to private wallet<br>For the wallet belongs to business recipient, <code>rcvrFirstName</code> may input the company name, <code>rcvrLastName</code> may input "N/A", location info may input the registered address of the company.                                                                                                                                                                                                            |
| &gt; exchId                 | String | Conditional | Exchange ID<br>You can query supported exchanges through the endpoint of <a href="/docs-v5/en/#funding-account-rest-api-get-exchange-list-public">Get exchange list (public)</a><br>If the exchange is not in the exchange list, fill in '0' in this field.<br>Apply to walletType = <code>exchange</code>                                                                                                                                                                                                                                         |
| &gt; rcvrFirstName          | String | Conditional | Receiver's first name, e.g. <code>Bruce</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; rcvrLastName           | String | Conditional | Receiver's last name, e.g. <code>Wayne</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; rcvrCountry            | String | Conditional | The recipient's country, e.g. <code>United States</code><br>You must enter an English country name or a two letter country code (ISO 3166-1). Please refer to the <code>Country Name</code> and <code>Country Code</code> in the country information table below.                                                                                                                                                                                                                                                                                  |
| &gt; rcvrCountrySubDivision | String | Conditional | State/Province of the recipient, e.g. <code>California</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; rcvrTownName           | String | Conditional | The town/city where the recipient is located, e.g. <code>San Jose</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; rcvrStreetName         | String | Conditional | Recipient's street address, e.g. <code>Clementi Avenue 1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| clientId                    | String | No          | Client-supplied ID<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Response Parameters

| Parameter | Type   | Description                                                                                                              |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| ccy       | String | Currency                                                                                                                 |
| chain     | String | Chain name, e.g. <code>USDT-ERC20</code>, <code>USDT-TRC20</code>                                                        |
| amt       | String | Withdrawal amount                                                                                                        |
| wdId      | String | Withdrawal ID                                                                                                            |
| clientId  | String | Client-supplied ID<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |

#### Country information

| Country name                                 | Country code |
| -------------------------------------------- | ------------ |
| Afghanistan                                  | AF           |
| Albania                                      | AL           |
| Algeria                                      | DZ           |
| Andorra                                      | AD           |
| Angola                                       | AO           |
| Anguilla                                     | AI           |
| Antigua and Barbuda                          | AG           |
| Argentina                                    | AR           |
| Armenia                                      | AM           |
| Australia                                    | AU           |
| Austria                                      | AT           |
| Azerbaijan                                   | AZ           |
| Bahamas                                      | BS           |
| Bahrain                                      | BH           |
| Bangladesh                                   | BD           |
| Barbados                                     | BB           |
| Belarus                                      | BY           |
| Belgium                                      | BE           |
| Belize                                       | BZ           |
| Benin                                        | BJ           |
| Bermuda                                      | BM           |
| Bhutan                                       | BT           |
| Bolivia                                      | BO           |
| Bosnia and Herzegovina                       | BA           |
| Botswana                                     | BW           |
| Brazil                                       | BR           |
| British Virgin Islands                       | VG           |
| Brunei                                       | BN           |
| Bulgaria                                     | BG           |
| Burkina Faso                                 | BF           |
| Burundi                                      | BI           |
| Cambodia                                     | KH           |
| Cameroon                                     | CM           |
| Canada                                       | CA           |
| Cape Verde                                   | CV           |
| Cayman Islands                               | KY           |
| Central African Republic                     | CF           |
| Chad                                         | TD           |
| Chile                                        | CL           |
| Colombia                                     | CO           |
| Comoros                                      | KM           |
| Congo (Republic)                             | CG           |
| Congo (Democratic Republic)                  | CD           |
| Costa Rica                                   | CR           |
| Cote d´Ivoire (Ivory Coast)                  | CI           |
| Croatia                                      | HR           |
| Cuba                                         | CU           |
| Cyprus                                       | CY           |
| Czech Republic                               | CZ           |
| Denmark                                      | DK           |
| Djibouti                                     | DJ           |
| Dominica                                     | DM           |
| Dominican Republic                           | DO           |
| Ecuador                                      | EC           |
| Egypt                                        | EG           |
| El Salvador                                  | SV           |
| Equatorial Guinea                            | GQ           |
| Eritrea                                      | ER           |
| Estonia                                      | EE           |
| Ethiopia                                     | ET           |
| Fiji                                         | FJ           |
| Finland                                      | FI           |
| France                                       | FR           |
| Gabon                                        | GA           |
| Gambia                                       | GM           |
| Georgia                                      | GE           |
| Germany                                      | DE           |
| Ghana                                        | GH           |
| Greece                                       | GR           |
| Grenada                                      | GD           |
| Guatemala                                    | GT           |
| Guinea                                       | GN           |
| Guinea-Bissau                                | GW           |
| Guyana                                       | GY           |
| Haiti                                        | HT           |
| Honduras                                     | HN           |
| Hong Kong                                    | HK           |
| Hungary                                      | HU           |
| Iceland                                      | IS           |
| India                                        | IN           |
| Indonesia                                    | ID           |
| Iran                                         | IR           |
| Iraq                                         | IQ           |
| Ireland                                      | IE           |
| Israel                                       | IL           |
| Italy                                        | IT           |
| Jamaica                                      | JM           |
| Japan                                        | JP           |
| Jordan                                       | JO           |
| Kazakhstan                                   | KZ           |
| Kenya                                        | KE           |
| Kiribati                                     | KI           |
| North Korea                                  | KP           |
| South Korea                                  | KR           |
| Kuwait                                       | KW           |
| Kyrgyzstan                                   | KG           |
| Laos                                         | LA           |
| Latvia                                       | LV           |
| Lebanon                                      | LB           |
| Lesotho                                      | LS           |
| Liberia                                      | LR           |
| Libya                                        | LY           |
| Liechtenstein                                | LI           |
| Lithuania                                    | LT           |
| Luxembourg                                   | LU           |
| Macau                                        | MO           |
| Macedonia                                    | MK           |
| Madagascar                                   | MG           |
| Malawi                                       | MW           |
| Malaysia                                     | MY           |
| Maldives                                     | MV           |
| Mali                                         | ML           |
| Malta                                        | MT           |
| Marshall Islands                             | MH           |
| Mauritania                                   | MR           |
| Mauritius                                    | MU           |
| Mexico                                       | MX           |
| Micronesia                                   | FM           |
| Moldova                                      | MD           |
| Monaco                                       | MC           |
| Mongolia                                     | MN           |
| Montenegro                                   | ME           |
| Morocco                                      | MA           |
| Mozambique                                   | MZ           |
| Myanmar (Burma)                              | MM           |
| Namibia                                      | NA           |
| Nauru                                        | NR           |
| Nepal                                        | NP           |
| Netherlands                                  | NL           |
| New Zealand                                  | NZ           |
| Nicaragua                                    | NI           |
| Niger                                        | NE           |
| Nigeria                                      | NG           |
| Norway                                       | NO           |
| Oman                                         | OM           |
| Pakistan                                     | PK           |
| Palau                                        | PW           |
| Panama                                       | PA           |
| Papua New Guinea                             | PG           |
| Paraguay                                     | PY           |
| Peru                                         | PE           |
| Philippines                                  | PH           |
| Poland                                       | PL           |
| Portugal                                     | PT           |
| Qatar                                        | QA           |
| Romania                                      | RO           |
| Russia                                       | RU           |
| Rwanda                                       | RW           |
| Saint Kitts and Nevis                        | KN           |
| Saint Lucia                                  | LC           |
| Saint Vincent and the Grenadines             | VC           |
| Samoa                                        | WS           |
| San Marino                                   | SM           |
| Sao Tome and Principe                        | ST           |
| Saudi Arabia                                 | SA           |
| Senegal                                      | SN           |
| Serbia                                       | RS           |
| Seychelles                                   | SC           |
| Sierra Leone                                 | SL           |
| Singapore                                    | SG           |
| Slovakia                                     | SK           |
| Slovenia                                     | SI           |
| Solomon Islands                              | SB           |
| Somalia                                      | SO           |
| South Africa                                 | ZA           |
| Spain                                        | ES           |
| Sri Lanka                                    | LK           |
| Sudan                                        | SD           |
| Suriname                                     | SR           |
| Swaziland                                    | SZ           |
| Sweden                                       | SE           |
| Switzerland                                  | CH           |
| Syria                                        | SY           |
| Taiwan                                       | TW           |
| Tajikistan                                   | TJ           |
| Tanzania                                     | TZ           |
| Thailand                                     | TH           |
| Timor-Leste (East Timor)                     | TL           |
| Togo                                         | TG           |
| Tonga                                        | TO           |
| Trinidad and Tobago                          | TT           |
| Tunisia                                      | TN           |
| Turkey                                       | TR           |
| Turkmenistan                                 | TM           |
| Tuvalu                                       | TV           |
| U.S. Virgin Islands                          | VI           |
| Uganda                                       | UG           |
| Ukraine                                      | UA           |
| United Arab Emirates                         | AE           |
| United Kingdom                               | GB           |
| United States                                | US           |
| Uruguay                                      | UY           |
| Uzbekistan                                   | UZ           |
| Vanuatu                                      | VU           |
| Vatican City                                 | VA           |
| Venezuela                                    | VE           |
| Vietnam                                      | VN           |
| Yemen                                        | YE           |
| Zambia                                       | ZM           |
| Zimbabwe                                     | ZW           |
| Kosovo                                       | XK           |
| South Sudan                                  | SS           |
| China                                        | CN           |
| Palestine                                    | PS           |
| Curacao                                      | CW           |
| Dominican Republic                           | DO           |
| Dominican Republic                           | DO           |
| Gibraltar                                    | GI           |
| New Caledonia                                | NC           |
| Cook Islands                                 | CK           |
| Reunion                                      | RE           |
| Guernsey                                     | GG           |
| Guadeloupe                                   | GP           |
| Martinique                                   | MQ           |
| French Polynesia                             | PF           |
| Faroe Islands                                | FO           |
| Greenland                                    | GL           |
| Jersey                                       | JE           |
| Aruba                                        | AW           |
| Puerto Rico                                  | PR           |
| Isle of Man                                  | IM           |
| Guam                                         | GU           |
| Sint Maarten                                 | SX           |
| Turks and Caicos                             | TC           |
| Åland Islands                                | AX           |
| Caribbean Netherlands                        | BQ           |
| British Indian Ocean Territory               | IO           |
| Christmas as Island                          | CX           |
| Cocos (Keeling) Islands                      | CC           |
| Falkland Islands (Islas Malvinas)            | FK           |
| Mayotte                                      | YT           |
| Niue                                         | NU           |
| Norfolk Island                               | NF           |
| Northern Mariana Islands                     | MP           |
| Pitcairn Islands                             | PN           |
| Saint Helena, Ascension and Tristan da Cunha | SH           |
| Collectivity of Saint Martin                 | MF           |
| Saint Pierre and Miquelon                    | PM           |
| Tokelau                                      | TK           |
| Wallis and Futuna                            | WF           |
| American Samoa                               | AS           |

---

### Cancel withdrawal [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-cancel-withdrawal "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-cancel-withdrawal")

You can cancel normal withdrawal requests, but you cannot cancel withdrawal
requests on Lightning.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/asset/cancel-withdrawal`

#### Request Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| wdId      | String | Yes      | Withdrawal ID |

#### Response Parameters

| Parameter | Type   | Description   |
| --------- | ------ | ------------- |
| wdId      | String | Withdrawal ID |

If the code is equal to 0, it cannot be strictly considered that the withdrawal
has been revoked. It only means that your request is accepted by the server. The
actual result is subject to the status in the withdrawal history.

---

### Get withdrawal history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-history")

Retrieve the withdrawal records according to the currency, withdrawal status,
and time range in reverse chronological order. The 100 most recent records are
returned by default.  
Websocket API is also available, refer to
[Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel).

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/withdrawal-history`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | No       | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| wdId      | String | No       | Withdrawal ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| clientId  | String | No       | Client-supplied ID<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| txId      | String | No       | Hash record of the deposit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| type      | String | No       | Withdrawal type<br><code>3</code>: Internal transfer<br><code>4</code>: On-chain withdrawal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| state     | String | No       | Status of withdrawal<br><br><li>Stage 1 : Pending withdrawal</li><code>19</code>: insufficient balance in the hot wallet<br><code>17</code>: Pending response from Travel Rule vendor<br><code>10</code>: Waiting transfer<br><code>0</code>: Waiting withdrawal<br><code>4</code>/<code>5</code>/<code>6</code>/<code>8</code>/<code>9</code>/<code>12</code>: Waiting manual review<br><code>7</code>: Approved<br>&gt; <code>0</code>, <code>17</code>, <code>19</code> can be cancelled, other statuses cannot be cancelled<br><br><li>Stage 2 : Withdrawal in progress (Applicable to on-chain withdrawals, internal transfers do not have this stage)</li><code>1</code>: Broadcasting your transaction to chain<br><code>15</code>: Pending transaction validation<br><code>16</code>: Due to local laws and regulations, your withdrawal may take up to 24 hours to arrive<br><code>-3</code>: Canceling<br><br><li>Final stage</li><code>-2</code>: Canceled<br><code>-1</code>: Failed<br><code>2</code>: Success |
| after     | String | No       | Pagination of data to return records earlier than the requested ts, Unix timestamp format in milliseconds, e.g. <code>1654041600000</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| before    | String | No       | Pagination of data to return records newer than the requested ts, Unix timestamp format in milliseconds, e.g. <code>1656633600000</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| limit     | String | No       | Number of results per request. The maximum is <code>100</code>; The default is <code>100</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### Response Parameters

| Parameter        | Type    | Description                                                                                                                                                                        |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy              | String  | Currency                                                                                                                                                                           |
| chain            | String  | Chain name, e.g. <code>USDT-ERC20</code>, <code>USDT-TRC20</code>                                                                                                                  |
| nonTradableAsset | Boolean | Whether it is a non-tradable asset or not<br><code>true</code>: non-tradable asset, <code>false</code>: tradable asset                                                             |
| amt              | String  | Withdrawal amount                                                                                                                                                                  |
| ts               | String  | Time the withdrawal request was submitted, Unix timestamp format in milliseconds, e.g. <code>1655251200000</code>.                                                                 |
| from             | String  | Withdrawal account<br>It can be <code>email</code>/<code>phone</code>/<code>sub-account name</code>                                                                                |
| areaCodeFrom     | String  | Area code for the phone number<br>If <code>from</code> is a phone number, this parameter returns the area code for the phone number                                                |
| to               | String  | Receiving address                                                                                                                                                                  |
| areaCodeTo       | String  | Area code for the phone number<br>If <code>to</code> is a phone number, this parameter returns the area code for the phone number                                                  |
| toAddrType       | String  | Address type<br><code>1</code>: wallet address, email, phone, or login account name<br><code>2</code>: UID                                                                         |
| tag              | String  | Some currencies require a tag for withdrawals. This is not returned if not required.                                                                                               |
| pmtId            | String  | Some currencies require a payment ID for withdrawals. This is not returned if not required.                                                                                        |
| memo             | String  | Some currencies require this parameter for withdrawals. This is not returned if not required.                                                                                      |
| addrEx           | Object  | Withdrawal address attachment (This will not be returned if the currency does not require this) e.g. TONCOIN attached tag name is comment, the return will be {'comment':'123456'} |
| txId             | String  | Hash record of the withdrawal<br>This parameter will return "" for internal transfers.                                                                                             |
| fee              | String  | Withdrawal fee amount                                                                                                                                                              |
| feeCcy           | String  | Withdrawal fee currency, e.g. <code>USDT</code>                                                                                                                                    |
| state            | String  | Status of withdrawal                                                                                                                                                               |
| wdId             | String  | Withdrawal ID                                                                                                                                                                      |
| clientId         | String  | Client-supplied ID                                                                                                                                                                 |
| note             | String  | Withdrawal note                                                                                                                                                                    |

---

### Get deposit withdraw status [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-withdraw-status "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-withdraw-status")

Retrieve deposit's and withdrawal's detailed status and estimated complete time.

#### Rate Limit: 1 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-withdraw-status`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                             |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| wdId           | String    | Conditional  | Withdrawal ID, use to retrieve withdrawal status<br>Required to input one and only one of <code>wdId</code> and <code>txId</code>           |
| txId           | String    | Conditional  | Hash record of the deposit, use to retrieve deposit status<br>Required to input one and only one of <code>wdId</code> and <code>txId</code> |
| ccy            | String    | Conditional  | Currency type, e.g. <code>USDT</code><br>Required when retrieving deposit status with <code>txId</code>                                     |
| to             | String    | Conditional  | To address, the destination address in deposit<br>Required when retrieving deposit status with <code>txId</code>                            |
| chain          | String    | Conditional  | Currency chain information, e.g. USDT-ERC20<br>Required when retrieving deposit status with <code>txId</code>                               |

#### Response Parameters

| Parameter       | Type   | Description                                                                                                                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| estCompleteTime | String | Estimated complete time<br>The timezone is <code>UTC+8</code>. The format is MM/dd/yyyy, h:mm:ss AM/PM<br>estCompleteTime is only an approximate estimated time, for reference only. |
| state           | String | The detailed stage and status of the deposit/withdrawal<br>The message in front of the colon is the stage; the message after the colon is the ongoing status.                        |
| txId            | String | Hash record on-chain<br>For withdrawal, if the <code>txId</code> has already been generated, it will return the value, otherwise, it will return "".                                 |
| wdId            | String | Withdrawal ID<br>When retrieving deposit status, wdId returns blank "".                                                                                                              |

Stage References  
Deposit  
Stage 1: On-chain transaction detection  
Stage 2: Push deposit data to associated account  
Stage 3: Receiving account credit  
Final stage: Deposit complete  
Withdrawal  
Stage 1: Pending withdrawal  
Stage 2: Withdrawal in progress  
Final stage: Withdrawal complete / cancellation complete

---

### Get exchange list (public) [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-exchange-list-public "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-exchange-list-public")

Authentication is not required for this public endpoint.

#### Rate Limit: 6 requests per second

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/asset/exchange-list`

#### Request Parameters

None

#### Response Parameters

| Parameter | Type   | Description                                                                        |
| --------- | ------ | ---------------------------------------------------------------------------------- |
| exchName  | String | Exchange name, e.g. <code>1xbet</code>                                             |
| exchId    | String | Exchange ID, e.g. <code>did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1</code> |

---

### Apply for monthly statement (last year) [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-apply-for-monthly-statement-last-year "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-apply-for-monthly-statement-last-year")

Apply for monthly statement in the past year.

#### Rate Limit: 20 requests per month

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`POST /api/v5/asset/monthly-statement`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| month     | String | No       | Month,last month by default. Valid value is <code>Jan</code>, <code>Feb</code>, <code>Mar</code>, <code>Apr</code>,<code>May</code>, <code>Jun</code>, <code>Jul</code>,<code>Aug</code>, <code>Sep</code>,<code>Oct</code>,<code>Nov</code>,<code>Dec</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                       |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| ts            | String   | Download link generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get monthly statement (last year) [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-monthly-statement-last-year "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-monthly-statement-last-year")

Retrieve monthly statement in the past year.

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/monthly-statement`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                                                                                             |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| month     | String | Yes      | Month, valid value is <code>Jan</code>, <code>Feb</code>, <code>Mar</code>, <code>Apr</code>,<code>May</code>, <code>Jun</code>, <code>Jul</code>,<code>Aug</code>, <code>Sep</code>,<code>Oct</code>,<code>Nov</code>,<code>Dec</code> |

#### Response Parameters

| **Parameter** | **Type** | **Description**                                                                                       |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| fileHref      | String   | Download file link                                                                                    |
| ts            | Int      | Download link generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| state         | String   | Download link status<br>"finished" "ongoing"                                                          |

---

### Get convert currencies [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currencies "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currencies")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/convert/currencies`

#### Response parameters

none

#### Response Parameters

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| ccy       | String | Currency, e.g. BTC                       |
| min       | String | Minimum amount to convert ( Deprecated ) |
| max       | String | Maximum amount to convert ( Deprecated ) |

---

### Get convert currency pair [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/convert/currency-pair`

#### Response parameters

| **Parameters** | **Types** | **Required** | **Description**                                  |
| -------------- | --------- | ------------ | ------------------------------------------------ |
| fromCcy        | String    | Yes          | Currency to convert from, e.g. <code>USDT</code> |
| toCcy          | String    | Yes          | Currency to convert to, e.g. <code>BTC</code>    |

#### Response Parameters

| Parameter   | Type   | Description                                                     |
| ----------- | ------ | --------------------------------------------------------------- |
| instId      | String | Currency pair, e.g. <code>BTC-USDT</code>                       |
| baseCcy     | String | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>   |
| baseCcyMax  | String | Maximum amount of base currency                                 |
| baseCcyMin  | String | Minimum amount of base currency                                 |
| quoteCcy    | String | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code> |
| quoteCcyMax | String | Maximum amount of quote currency                                |
| quoteCcyMin | String | Minimum amount of quote currency                                |

---

### Estimate quote [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-estimate-quote "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-estimate-quote")

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Rate Limit: 1 request per 5 seconds

#### Rate limit rule: Instrument ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/asset/convert/estimate-quote`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                 |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| baseCcy        | String    | Yes          | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>                                                                                   |
| quoteCcy       | String    | Yes          | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code>                                                                                 |
| side           | String    | Yes          | Trade side based on <code>baseCcy</code><br><code>buy</code> <code>sell</code>                                                                  |
| rfqSz          | String    | Yes          | RFQ amount                                                                                                                                      |
| rfqSzCcy       | String    | Yes          | RFQ currency                                                                                                                                    |
| clQReqId       | String    | No           | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| tag            | String    | No           | Order tag<br>Applicable to broker user                                                                                                          |

#### Response Parameters

| Parameter | Type   | Description                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------- |
| quoteTime | String | Quotation generation time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| ttlMs     | String | Validity period of quotation in milliseconds                                                      |
| clQReqId  | String | Client Order ID as assigned by the client                                                         |
| quoteId   | String | Quote ID                                                                                          |
| baseCcy   | String | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>                                     |
| quoteCcy  | String | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code>                                   |
| side      | String | Trade side based on <code>baseCcy</code>                                                          |
| origRfqSz | String | Original RFQ amount                                                                               |
| rfqSz     | String | Real RFQ amount                                                                                   |
| rfqSzCcy  | String | RFQ currency                                                                                      |
| cnvtPx    | String | Convert price based on quote currency                                                             |
| baseSz    | String | Convert amount of base currency                                                                   |
| quoteSz   | String | Convert amount of quote currency                                                                  |

---

### Convert trade [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-convert-trade "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-convert-trade")

You should make
[estimate quote](/docs-v5/en/#funding-account-rest-api-estimate-quote) before
convert trade.

Only assets in the trading account supported convert.

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

For the same side (buy/sell), there's a trading limit of 1 request per 5
seconds.

#### HTTP Request

`POST /api/v5/asset/convert/trade`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                 |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| quoteId        | String    | Yes          | Quote ID                                                                                                                                        |
| baseCcy        | String    | Yes          | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>                                                                                   |
| quoteCcy       | String    | Yes          | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code>                                                                                 |
| side           | String    | Yes          | Trade side based on <code>baseCcy</code><br><code>buy</code> <code>sell</code>                                                                  |
| sz             | String    | Yes          | Quote amount<br>The quote amount should no more then RFQ amount                                                                                 |
| szCcy          | String    | Yes          | Quote currency                                                                                                                                  |
| clTReqId       | String    | No           | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| tag            | String    | No           | Order tag<br>Applicable to broker user                                                                                                          |

#### Response Parameters

| Parameter   | Type   | Description                                                                                |
| ----------- | ------ | ------------------------------------------------------------------------------------------ |
| tradeId     | String | Trade ID                                                                                   |
| quoteId     | String | Quote ID                                                                                   |
| clTReqId    | String | Client Order ID as assigned by the client                                                  |
| state       | String | Trade state<br><code>fullyFilled</code>: success<br><code>rejected</code>: failed          |
| instId      | String | Currency pair, e.g. <code>BTC-USDT</code>                                                  |
| baseCcy     | String | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>                              |
| quoteCcy    | String | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code>                            |
| side        | String | Trade side based on <code>baseCcy</code><br><code>buy</code><br><code>sell</code>          |
| fillPx      | String | Filled price based on quote currency                                                       |
| fillBaseSz  | String | Filled amount for base currency                                                            |
| fillQuoteSz | String | Filled amount for quote currency                                                           |
| ts          | String | Convert trade time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get convert history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-convert-history")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### HTTP Request

`GET /api/v5/asset/convert/history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                         |
| -------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clTReqId       | String    | No           | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.         |
| after          | String    | No           | Pagination of data to return records earlier than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| before         | String    | No           | Pagination of data to return records newer than the requested <code>ts</code>, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>   |
| limit          | String    | No           | Number of results per request. The maximum is <code>100</code>. The default is <code>100</code>.                                                        |
| tag            | String    | No           | Order tag<br>Applicable to broker user<br>If the convert trading used <code>tag</code>, this parameter is also required.                                |

#### Response Parameters

| Parameter   | Type   | Description                                                                                |
| ----------- | ------ | ------------------------------------------------------------------------------------------ |
| tradeId     | String | Trade ID                                                                                   |
| clTReqId    | String | Client Order ID as assigned by the client                                                  |
| state       | String | Trade state<br><code>fullyFilled</code> : success<br><code>rejected</code> : failed        |
| instId      | String | Currency pair, e.g. <code>BTC-USDT</code>                                                  |
| baseCcy     | String | Base currency, e.g. <code>BTC</code> in <code>BTC-USDT</code>                              |
| quoteCcy    | String | Quote currency, e.g. <code>USDT</code> in <code>BTC-USDT</code>                            |
| side        | String | Trade side based on <code>baseCcy</code><br><code>buy</code> <code>sell</code>             |
| fillPx      | String | Filled price based on quote currency                                                       |
| fillBaseSz  | String | Filled amount for base currency                                                            |
| fillQuoteSz | String | Filled amount for quote currency                                                           |
| ts          | String | Convert trade time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |

---

### Get deposit payment methods [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-payment-methods "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-payment-methods")

To display all the available fiat deposit payment methods

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/deposit-payment-methods`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                      |
| -------------- | --------- | ------------ | -------------------------------------------------------------------- |
| ccy            | String    | Yes          | Fiat currency, ISO-4217 3 digit currency code, e.g. <code>TRY</code> |

#### Response Parameters

| Parameter                  | Type            | Description                                                                                                                                                  |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy                        | String          | Fiat currency                                                                                                                                                |
| paymentMethod              | String          | The payment method associated with the currency<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code> |
| feeRate                    | String          | The fee rate for each deposit, expressed as a percentage<br>e.g. <code>0.02</code> represents 2 percent fee for each transaction.                            |
| minFee                     | String          | The minimum fee for each deposit                                                                                                                             |
| limits                     | Object          | An object containing limits for various transaction intervals                                                                                                |
| &gt; dailyLimit            | String          | The daily transaction limit                                                                                                                                  |
| &gt; dailyLimitRemaining   | String          | The remaining daily transaction limit                                                                                                                        |
| &gt; weeklyLimit           | String          | The weekly transaction limit                                                                                                                                 |
| &gt; weeklyLimitRemaining  | String          | The remaining weekly transaction limit                                                                                                                       |
| &gt; monthlyLimit          | String          | The monthly transaction limit                                                                                                                                |
| &gt; monthlyLimitRemaining | String          | The remaining monthly transaction limit                                                                                                                      |
| &gt; maxAmt                | String          | The maximum amount allowed per transaction                                                                                                                   |
| &gt; minAmt                | String          | The minimum amount allowed per transaction                                                                                                                   |
| &gt; lifetimeLimit         | String          | The lifetime transaction limit. Return the configured value, "" if not configured                                                                            |
| accounts                   | Array of Object | An array containing information about payment accounts associated with the currency and method.                                                              |
| &gt; paymentAcctId         | String          | The account ID for withdrawal                                                                                                                                |
| &gt; acctNum               | String          | The account number, which can be an IBAN or other bank account number.                                                                                       |
| &gt; recipientName         | String          | The name of the recipient                                                                                                                                    |
| &gt; bankName              | String          | The name of the bank associated with the account                                                                                                             |
| &gt; bankCode              | String          | The SWIFT code / BIC / bank code associated with the account                                                                                                 |
| &gt; state                 | String          | The state of the account<br><code>active</code>                                                                                                              |

---

### Get withdrawal payment methods [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-payment-methods "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-payment-methods")

To display all the available fiat withdrawal payment methods

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/withdrawal-payment-methods`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                      |
| -------------- | --------- | ------------ | -------------------------------------------------------------------- |
| ccy            | String    | Yes          | Fiat currency, ISO-4217 3 digit currency code. e.g. <code>TRY</code> |

#### Response Parameters

| Parameter                  | Type            | Description                                                                                                                                                  |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy                        | String          | Fiat currency                                                                                                                                                |
| paymentMethod              | String          | The payment method associated with the currency<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code> |
| feeRate                    | String          | The fee rate for each deposit, expressed as a percentage<br>e.g. <code>0.02</code> represents 2 percent fee for each transaction.                            |
| minFee                     | String          | The minimum fee for each deposit                                                                                                                             |
| limits                     | Object          | An object containing limits for various transaction intervals                                                                                                |
| &gt; dailyLimit            | String          | The daily transaction limit                                                                                                                                  |
| &gt; dailyLimitRemaining   | String          | The remaining daily transaction limit                                                                                                                        |
| &gt; weeklyLimit           | String          | The weekly transaction limit                                                                                                                                 |
| &gt; weeklyLimitRemaining  | String          | The remaining weekly transaction limit                                                                                                                       |
| &gt; monthlyLimit          | String          | The monthly transaction limit                                                                                                                                |
| &gt; monthlyLimitRemaining | String          | The remaining monthly transaction limit                                                                                                                      |
| &gt; minAmt                | String          | The minimum amount allowed per transaction                                                                                                                   |
| &gt; maxAmt                | String          | The maximum amount allowed per transaction                                                                                                                   |
| &gt; lifetimeLimit         | String          | The lifetime transaction limit. Return the configured value, "" if not configured                                                                            |
| accounts                   | Array of Object | An array containing information about payment accounts associated with the currency and method.                                                              |
| &gt; paymentAcctId         | String          | The account ID for withdrawal                                                                                                                                |
| &gt; acctNum               | String          | The account number, which can be an IBAN or other bank account number.                                                                                       |
| &gt; recipientName         | String          | The name of the recipient                                                                                                                                    |
| &gt; bankName              | String          | The name of the bank associated with the account                                                                                                             |
| &gt; bankCode              | String          | The SWIFT code / BIC / bank code associated with the account                                                                                                 |
| &gt; state                 | String          | The state of the account<br><code>active</code>                                                                                                              |

---

### Create withdrawal order [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-create-withdrawal-order "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-create-withdrawal-order")

Initiate a fiat withdrawal request (Authenticated endpoint, Only for API keys
with "Withdrawal" access)  
Only supported withdrawal of assets from funding account.

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Withdraw

#### HTTP Request

`POST /api/v5/fiat/create-withdrawal`

#### Request Parameters

| **Parameters** | **Type** | **Required** | **Description**                                                                                                                                                             |
| -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paymentAcctId  | String   | Yes          | Payment account id to withdraw to, retrieved from get withdrawal payment methods API                                                                                        |
| ccy            | String   | Yes          | Currency for withdrawal, must match currency allowed for paymentMethod                                                                                                      |
| amt            | String   | Yes          | Requested withdrawal amount before fees. Has to be less than or equal to 2 decimal points double                                                                            |
| paymentMethod  | String   | Yes          | Payment method to use for withdrawal<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code>                           |
| clientId       | String   | Yes          | Client-supplied ID, A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters<br>e.g. <code>194a6975e98246538faeb0fab0d502df</code> |

#### Response Parameters

| Parameter     | Type   | Description                                                                                                  |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| ordId         | String | The unique order Id                                                                                          |
| clientId      | String | The client ID associated with the transaction                                                                |
| amt           | String | The requested amount for the transaction                                                                     |
| ccy           | String | The currency of the transaction                                                                              |
| fee           | String | The transaction fee                                                                                          |
| paymentAcctId | String | The Id of the payment account used                                                                           |
| paymentMethod | String | Payment Method<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code>                             |
| state         | String | The State of the transaction<br><code>processing</code><br><code>completed</code>                            |
| cTime         | String | The creation time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code> |
| uTime         | String | The update time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>   |

---

### Cancel withdrawal order [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-cancel-withdrawal-order "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-cancel-withdrawal-order")

Cancel a pending fiat withdrawal order, currently only applicable to TRY

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/fiat/cancel-withdrawal`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**  |
| -------------- | --------- | ------------ | ---------------- |
| ordId          | String    | Yes          | Payment Order Id |

#### Response Parameters

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| ordId     | String | Payment Order ID                                        |
| state     | String | The state of the transaction, e.g.<code>canceled</code> |

---

### Get withdrawal order history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-order-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-order-history")

Get fiat withdrawal order history

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/withdrawal-order-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                                         |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | Fiat currency, ISO-4217 3 digit currency code, e.g. <code>TRY</code>                                                                                                    |
| paymentMethod  | String    | No           | Payment Method<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code>                                             |
| state          | String    | No           | State of the order<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code><br><code>processing</code> |
| after          | String    | No           | Filter with a begin timestamp. Unix timestamp format in milliseconds (inclusive), e.g. <code>1597026383085</code>                                                       |
| before         | String    | No           | Filter with an end timestamp. Unix timestamp format in milliseconds (inclusive), e.g. <code>1597026383085</code>                                                        |
| limit          | String    | No           | Number of results per request. Maximum and default is <code>100</code>                                                                                                  |

#### Response Parameters

| Parameter     | Type   | Description                                                                                                                                                                   |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId         | String | Unique Order Id                                                                                                                                                               |
| clientId      | String | Client Id of the transaction                                                                                                                                                  |
| amt           | String | Final amount of the transaction                                                                                                                                               |
| ccy           | String | Currency of the transaction                                                                                                                                                   |
| fee           | String | Transaction fee                                                                                                                                                               |
| paymentAcctId | String | ID of the payment account used                                                                                                                                                |
| paymentMethod | String | Payment method type                                                                                                                                                           |
| state         | String | State of the transaction<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code><br><code>processing</code> |
| cTime         | String | Creation time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                      |
| uTime         | String | Update time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                        |

---

### Get withdrawal order detail [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-order-detail "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-order-detail")

Get fiat withdraw order detail

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/withdrawal`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| -------------- | --------- | ------------ | --------------- |
| ordId          | String    | Yes          | Order ID        |

#### Response Parameters

| Parameter     | Type   | Description                                                                                                                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId         | String | Order ID                                                                                                                                                                          |
| clientId      | String | The original request ID associated with the transaction                                                                                                                           |
| ccy           | String | The currency of the transaction                                                                                                                                                   |
| amt           | String | Amount of the transaction                                                                                                                                                         |
| fee           | String | The transaction fee                                                                                                                                                               |
| paymentAcctId | String | The ID of the payment account used                                                                                                                                                |
| paymentMethod | String | Payment method, e.g. <code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code>                                                    |
| state         | String | The state of the transaction<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code><br><code>processing</code> |
| cTime         | String | The creation time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                      |
| uTime         | String | The update time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                        |

---

### Get deposit order history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-history")

Get fiat deposit order history

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/deposit-order-history`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description**                                                                                                                                                         |
| -------------- | --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String    | No           | ISO-4217 3 digit currency code                                                                                                                                          |
| paymentMethod  | String    | No           | Payment Method<br><code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code>                                             |
| state          | String    | No           | State of the order<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code><br><code>processing</code> |
| after          | String    | No           | Filter with a begin timestamp. Unix timestamp format in milliseconds (inclusive), e.g. <code>1597026383085</code>                                                       |
| before         | String    | No           | Filter with an end timestamp. Unix timestamp format in milliseconds (inclusive), e.g. <code>1597026383085</code>                                                        |
| limit          | String    | No           | Number of results per request. Maximum and default is 100                                                                                                               |

#### Response Parameters

| Parameter     | Type   | Description                                                                                                                                        |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId         | String | Unique Order ID                                                                                                                                    |
| clientId      | String | Client Id of the transaction                                                                                                                       |
| ccy           | String | Currency of the transaction                                                                                                                        |
| amt           | String | Final amount of the transaction                                                                                                                    |
| fee           | String | Transaction fee                                                                                                                                    |
| paymentAcctId | String | ID of the payment account used                                                                                                                     |
| paymentMethod | String | Payment Method, e.g. <code>TR_BANKS</code>                                                                                                         |
| state         | String | State of the transaction<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code> |
| cTime         | String | Creation time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                           |
| uTime         | String | Update time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                             |

---

### Get deposit order detail [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-detail "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-order-detail")

Get fiat deposit order detail

#### Rate Limit: 3 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/deposit`

#### Request Parameters

| **Parameters** | **Types** | **Required** | **Description** |
| -------------- | --------- | ------------ | --------------- |
| ordId          | String    | Yes          | Order ID        |

#### Response Parameters

| Parameter     | Type   | Description                                                                                                                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId         | String | Order ID                                                                                                                                                                          |
| clientId      | String | The original request ID associated with the transaction. If it's a deposit, it's most likely an empty string ("").                                                                |
| amt           | String | Amount of the transaction                                                                                                                                                         |
| ccy           | String | The currency of the transaction                                                                                                                                                   |
| fee           | String | The transaction fee                                                                                                                                                               |
| paymentAcctId | String | The ID of the payment account used                                                                                                                                                |
| paymentMethod | String | Payment method, e.g.<code>TR_BANKS</code><br><code>PIX</code><br><code>SEPA</code><br><code>XPULSE</code><br><code>NPP</code>                                                     |
| state         | String | The state of the transaction<br><code>completed</code><br><code>failed</code><br><code>pending</code><br><code>canceled</code><br><code>inqueue</code><br><code>processing</code> |
| cTime         | String | The creation time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                      |
| uTime         | String | The update time of the transaction, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                        |

---

### Get buy/sell currencies [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currencies "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currencies")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/currencies`

#### Response Parameters

| Parameter     | Type             | Description                     |
| ------------- | ---------------- | ------------------------------- |
| fiatCcyList   | Array of objects | Fiat currency list              |
| &gt;ccy       | String           | Currency, e.g. <code>BTC</code> |
| cryptoCcyList | Array of objects | Crypto currency list            |
| &gt;ccy       | String           | Currency, e.g. <code>USD</code> |

This feature is only available to Bahamas institutional users at the moment.

---

### Get buy/sell currency pair [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currency-pair "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-currency-pair")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/currency-pair`

#### Request Parameters

| Parameters | Types  | Required | Description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| fromCcy    | String | Yes      | Currency to sell, e.g. <code>USD</code> |
| toCcy      | String | Yes      | Currency to buy, e.g. <code>BTC</code>  |

#### Response Parameters

| Parameter                  | Type             | Description                                                                                                                                                                                                                             |
| -------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| side                       | String           | Side<br><code>buy</code>: Fiat to crypto<br><code>sell</code>: Crypto to fiat<br>May support both sides in the future, separated with a comma, e.g. <code>buy,sell</code>.                                                              |
| fromCcy                    | String           | Currency to sell, e.g. <code>USD</code>                                                                                                                                                                                                 |
| toCcy                      | String           | Currency to buy, e.g. <code>BTC</code>                                                                                                                                                                                                  |
| singleTradeMax             | String           | The maximum amount of currency for a single trade, unit in <code>fromCcy</code>                                                                                                                                                         |
| singleTradeMin             | String           | The minimum amount of currency for a single trade, unit in <code>fromCcy</code>                                                                                                                                                         |
| fixedPxDailyLimit          | String           | Fixed price daily limit<br>Applicable to Fiat to Fiat trade, else return ''.<br>If <code>side</code> = <code>buy</code>, unit in <code>fromCcy</code><br>If <code>side</code> = <code>sell</code>, unit in <code>toCcy</code>           |
| fixedPxRemainingDailyQuota | String           | Fixed price remaining daily quota<br>Applicable to Fiat to Fiat trade, else return ''.<br>If <code>side</code> = <code>buy</code>, unit in <code>fromCcy</code><br>If <code>side</code> = <code>sell</code>, unit in <code>toCcy</code> |
| paymentMethods             | Array of strings | Supported payment methods<br><code>balance</code><br>e.g. ["balance"]                                                                                                                                                                   |

This feature is only available to Bahamas institutional users at the moment.

---

### Get buy/sell quote [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-quote "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-quote")

#### Rate Limit: 10 requests per second

#### Rate limit rule: User ID

#### Rate Limit: 1 request per 5 seconds

#### Rate limit rule: Instrument ID

#### Permission: Read

#### HTTP Request

`POST /api/v5/fiat/buy-sell/quote`

#### Request Parameters

| Parameters | Types  | Required | Description                                                                                              |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| side       | String | Yes      | Side<br><code>buy</code>: Buy Crypto / Fiat with Fiat<br><code>sell</code>: Sell Crypto to Crypto / Fiat |
| fromCcy    | String | Yes      | Currency to sell                                                                                         |
| toCcy      | String | Yes      | Currency to buy                                                                                          |
| rfqAmt     | String | Yes      | RFQ amount                                                                                               |
| rfqCcy     | String | Yes      | RFQ currency                                                                                             |

#### Response Parameters

| Parameter    | Type   | Description                                                                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| quoteId      | String | Quote ID                                                                                                                       |
| side         | String | Side<br><code>buy</code>: Buy Crypto / Fiat with Fiat<br><code>sell</code>: Sell Crypto to Crypto / Fiat                       |
| fromCcy      | String | Currency to sell, e.g. <code>USD</code>                                                                                        |
| toCcy        | String | Currency to buy, e.g. <code>BTC</code>                                                                                         |
| rfqAmt       | String | RFQ amount                                                                                                                     |
| rfqCcy       | String | RFQ currency                                                                                                                   |
| quotePx      | String | Quote price                                                                                                                    |
| quoteCcy     | String | Quote price unit<br>e.g. <code>USD</code>                                                                                      |
| quoteFromAmt | String | Quote amount, unit in <code>fromCcy</code>                                                                                     |
| quoteToAmt   | String | Quote amount, unit in <code>toCcy</code>                                                                                       |
| quoteTime    | String | Quotation generation time, Unix timestamp format in milliseconds, e.g. 1597026383085                                           |
| ttlMs        | String | The validity period of quotation in milliseconds<br>e.g. <code>10000</code> represents the quotation only valid for 10 seconds |

This feature is only available to Bahamas institutional users at the moment.

---

### Buy/sell trade [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-buy-sell-trade "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-buy-sell-trade")

#### Rate Limit: 1 request per 5 seconds

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/fiat/buy-sell/trade`

#### Request Parameters

| Parameters    | Types  | Required | Description                                                                                                                                         |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| quoteId       | String | Yes      | Quote ID<br>Get from Buy/Sell quote API                                                                                                             |
| side          | String | Yes      | Side<br><code>buy</code>: Buy Crypto / Fiat with Fiat<br><code>sell</code>: Sell Crypto to Crypto / Fiat<br>Should be the same as the Quote request |
| fromCcy       | String | Yes      | Currency to sell<br>Should be the same as the Quote request                                                                                         |
| toCcy         | String | Yes      | Currency to buy<br>Should be the same as the Quote request                                                                                          |
| rfqAmt        | String | Yes      | RFQ amount<br>Should be the same as the Quote request                                                                                               |
| rfqCcy        | String | Yes      | RFQ currency<br>Should be the same as the Quote request                                                                                             |
| paymentMethod | String | Yes      | paymentMethod<br><code>balance</code>                                                                                                               |
| clOrdId       | String | Yes      | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.     |

#### Response Parameters

| Parameter    | Type   | Description                                                                                              |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| ordId        | String | Order ID                                                                                                 |
| clOrdId      | String | Client Order ID as assigned by the client                                                                |
| quoteId      | String | Quote ID                                                                                                 |
| state        | String | Trade state<br><code>processing</code><br><code>completed</code><br><code>failed</code>                  |
| side         | String | Side<br><code>buy</code>: Buy Crypto / Fiat with Fiat<br><code>sell</code>: Sell Crypto to Crypto / Fiat |
| fromCcy      | String | Currency to sell                                                                                         |
| toCcy        | String | Currency to buy                                                                                          |
| rfqAmt       | String | RFQ amount                                                                                               |
| rfqCcy       | String | RFQ currency                                                                                             |
| fillPx       | String | Filled price based on quote currency                                                                     |
| fillQuoteCcy | String | Filled price quote currency<br>e.g. <code>USD</code>                                                     |
| fillFromAmt  | String | Sold amount, unit in <code>fromCcy</code>                                                                |
| fillToAmt    | String | Bought amount, unit in <code>toCcy</code>                                                                |
| cTime        | String | Request time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                     |

This feature is only available to Bahamas institutional users at the moment.

---

### Get buy/sell trade history [🔗](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-trade-history "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-buy-sell-trade-history")

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/fiat/buy-sell/history`

#### Request Parameters

| Parameters | Types  | Required | Description                                                                                                                                     |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ordId      | String | No       | Order ID                                                                                                                                        |
| clOrdId    | String | No       | Client Order ID as assigned by the client<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| state      | String | No       | Trade state<br><code>processing</code><br><code>completed</code><br><code>failed</code>                                                         |
| begin      | String | No       | Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                           |
| end        | String | No       | Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                            |
| limit      | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                          |

#### Response Parameters

| Parameter    | Type   | Description                                                                             |
| ------------ | ------ | --------------------------------------------------------------------------------------- |
| ordId        | String | Order ID                                                                                |
| clOrdId      | String | Client Order ID as assigned by the client                                               |
| quoteId      | String | Quote ID                                                                                |
| state        | String | Trade state<br><code>processing</code><br><code>completed</code><br><code>failed</code> |
| fromCcy      | String | Currency to sell                                                                        |
| toCcy        | String | Currency to buy                                                                         |
| rfqAmt       | String | RFQ amount                                                                              |
| rfqCcy       | String | RFQ currency                                                                            |
| fillPx       | String | Filled price based on quote currency                                                    |
| fillQuoteCcy | String | Filled price quote currency<br>e.g. <code>USD</code>                                    |
| fillFromAmt  | String | Filled amount unit in fromCcy                                                           |
| fillToAmt    | String | Filled amount unit in toCcy                                                             |
| cTime        | String | Request time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>    |
| uTime        | String | Updated time, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>    |

This feature is only available to Bahamas institutional users at the moment.

---

### Deposit info channel [🔗](https://www.okx.com/docs-v5/en/#funding-account-websocket-deposit-info-channel "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-websocket-deposit-info-channel")

A push notification is triggered when a deposit is initiated or the deposit
status changes.  
Supports subscriptions for accounts

- If it is a master account subscription, you can receive the push of the
  deposit info of both the master account and the sub-account.
- If it is a sub-account subscription, only the push of sub-account deposit info
  you can receive.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>deposit-info</code>                                                                                                                                                                                                        |
| &gt; ccy     | String           | No       | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                  |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>deposit-info</code>                                             |
| &gt; ccy     | String | No       | Currency, e.g. <code>BTC</code>                                                       |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**           | **Types**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arg                      | Object           | Successfully subscribed channel                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; channel             | String           | Channel name<br><code>deposit-info</code>                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; uid                 | String           | User Identifier                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; ccy                 | String           | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                                                                                                                                                                    |
| data                     | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; uid                 | String           | User Identifier of the message producer                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; subAcct             | String           | Sub-account name<br>If the message producer is master account, the parameter will return ""                                                                                                                                                                                                                                                                                                                        |
| &gt; pTime               | String           | Push time, the millisecond format of the Unix timestamp, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                           |
| &gt; ccy                 | String           | Currency                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; chain               | String           | Chain name                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; amt                 | String           | Deposit amount                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; from                | String           | Deposit account<br>Only the internal OKX account is returned, not the address on the blockchain.                                                                                                                                                                                                                                                                                                                   |
| &gt; areaCodeFrom        | String           | If <code>from</code> is a phone number, this parameter return area code of the phone number                                                                                                                                                                                                                                                                                                                        |
| &gt; to                  | String           | Deposit address                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; txId                | String           | Hash record of the deposit                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; ts                  | String           | Time of deposit record is created, Unix timestamp format in milliseconds, e.g. <code>1655251200000</code>                                                                                                                                                                                                                                                                                                          |
| &gt; state               | String           | Status of deposit<br><code>0</code>: waiting for confirmation<br><code>1</code>: deposit credited<br><code>2</code>: deposit successful<br><code>8</code>: pending due to temporary deposit suspension on this crypto currency<br><code>11</code>: match the address blacklist<br><code>12</code>: account or deposit is frozen<br><code>13</code>: sub-account deposit interception<br><code>14</code>: KYC limit |
| &gt; depId               | String           | Deposit ID                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; fromWdId            | String           | Internal transfer initiator's withdrawal ID<br>If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator, and will return "" in other cases                                                                                                                                                                                                            |
| &gt; actualDepBlkConfirm | String           | The actual amount of blockchain confirmed in a single deposit                                                                                                                                                                                                                                                                                                                                                      |

---

### Withdrawal info channel [🔗](https://www.okx.com/docs-v5/en/#funding-account-websocket-withdrawal-info-channel "Direct link to: https://www.okx.com/docs-v5/en/#funding-account-websocket-withdrawal-info-channel")

A push notification is triggered when a withdrawal is initiated or the
withdrawal status changes.  
Supports subscriptions for accounts

- If it is a master account subscription, you can receive the push of the
  withdrawal info of both the master account and the sub-account.
- If it is a sub-account subscription, only the push of sub-account withdrawal
  info you can receive.

#### URL Path

/ws/v5/business (required login)

#### Request Parameters

| Parameter    | Type             | Required | Description                                                                                                                                                                                                                                      |
| ------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | String           | No       | Unique identifier of the message<br>Provided by client. It will be returned in response message for identifying the corresponding request.<br>A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| op           | String           | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br>                                                                                                                                                                              |
| args         | Array of objects | Yes      | List of subscribed channels                                                                                                                                                                                                                      |
| &gt; channel | String           | Yes      | Channel name<br><code>withdrawal-info</code>                                                                                                                                                                                                     |
| &gt; ccy     | String           | No       | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                  |

#### Response parameters

| Parameter    | Type   | Required | Description                                                                           |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------- |
| id           | String | No       | Unique identifier of the message                                                      |
| event        | String | Yes      | Operation<br><code>subscribe</code><br><code>unsubscribe</code><br><code>error</code> |
| arg          | Object | No       | Subscribed channel                                                                    |
| &gt; channel | String | Yes      | Channel name<br><code>withdrawal-info</code>                                          |
| &gt; ccy     | String | No       | Currency, e.g. <code>BTC</code>                                                       |
| code         | String | No       | Error code                                                                            |
| msg          | String | No       | Error message                                                                         |
| connId       | String | Yes      | WebSocket connection ID                                                               |

#### Push data parameters

| **Parameters**        | **Types**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arg                   | Object           | Successfully subscribed channel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; channel          | String           | Channel name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; uid              | String           | User Identifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; ccy              | String           | Currency, e.g. <code>BTC</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| data                  | Array of objects | Subscribed data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; uid              | String           | User Identifier of the message producer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; subAcct          | String           | Sub-account name<br>If the message producer is master account, the parameter will return ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; pTime            | String           | Push time, the millisecond format of the Unix timestamp, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; ccy              | String           | Currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; chain            | String           | Chain name, e.g. <code>USDT-ERC20</code>, <code>USDT-TRC20</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; nonTradableAsset | String           | Whether it is a non-tradable asset or not<br><code>true</code>: non-tradable asset, <code>false</code>: tradable asset                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; amt              | String           | Withdrawal amount                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; ts               | String           | Time the withdrawal request was submitted, Unix timestamp format in milliseconds, e.g. <code>1655251200000</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; from             | String           | Withdrawal account<br>It can be <code>email</code>/<code>phone</code>/<code>sub-account name</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; areaCodeFrom     | String           | Area code for the phone number<br>If <code>from</code> is a phone number, this parameter returns the area code for the phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| &gt; to               | String           | Receiving address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; areaCodeTo       | String           | Area code for the phone number<br>If <code>to</code> is a phone number, this parameter returns the area code for the phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; toAddrType       | String           | Address type<br><code>1</code>: wallet address, email, phone, or login account name<br><code>2</code>: UID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; tag              | String           | Some currencies require a tag for withdrawals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; pmtId            | String           | Some currencies require a payment ID for withdrawals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; memo             | String           | Some currencies require this parameter for withdrawals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; addrEx           | Object           | Withdrawal address attachment, e.g. <code>TONCOIN</code> attached tag name is comment, the return will be {'comment':'123456'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; txId             | String           | Hash record of the withdrawal<br>This parameter will return "" for internal transfers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; fee              | String           | Withdrawal fee amount                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; feeCcy           | String           | Withdrawal fee currency, e.g. <code>USDT</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &gt; state            | String           | Status of withdrawal<br><br><li>Stage 1 : Pending withdrawal</li><code>17</code>: Pending response from Travel Rule vendor<br><code>10</code>: Waiting transfer<br><code>0</code>: Waiting withdrawal<br><code>4</code>/<code>5</code>/<code>6</code>/<code>8</code>/<code>9</code>/<code>12</code>: Waiting manual review<br><code>7</code>: Approved<br><br><li>Stage 2 : Withdrawal in progress (Applicable to on-chain withdrawals, internal transfers do not have this stage)</li><code>1</code>: Broadcasting your transaction to chain<br><code>15</code>: Pending transaction validation<br><code>16</code>: Due to local laws and regulations, your withdrawal may take up to 24 hours to arrive<br><code>-3</code>: Canceling<br><br><li>Final stage</li><code>-2</code>: Canceled<br><code>-1</code>: Failed<br><code>2</code>: Success |
| &gt; wdId             | String           | Withdrawal ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; clientId         | String           | Client-supplied ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; note             | String           | Withdrawal note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

---
