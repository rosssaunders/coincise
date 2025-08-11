# OKX API Documentation - Sub-account

### Get sub-account list [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-list "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-list")

Applies to master accounts only

#### Rate limit：2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/users/subaccount/list`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                          |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable    | String | No       | Sub-account status<br><code>true</code>: Normal <code>false</code>: Frozen                                                                                           |
| subAcct   | String | No       | Sub-account name                                                                                                                                                     |
| after     | String | No       | Query the data earlier than the requested subaccount creation timestamp, the value should be a Unix timestamp in millisecond format. e.g. <code>1597026383085</code> |
| before    | String | No       | Query the data newer than the requested subaccount creation timestamp, the value should be a Unix timestamp in millisecond format. e.g. <code>1597026383085</code>   |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                                               |

> Returned results

#### Response parameters

| **Parameter name** | **Type**         | **Description**                                                                                                                                                                                                                                                                   |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type               | String           | Sub-account type<br><code>1</code>: Standard sub-account<br><code>2</code>: Managed trading sub-account<br><code>5</code>: Custody trading sub-account - Copper<br><code>9</code>: Managed trading sub-account - Copper<br><code>12</code>: Custody trading sub-account - Komainu |
| enable             | Boolean          | Sub-account status<br><code>true</code>: Normal<br><code>false</code>: Frozen (global)                                                                                                                                                                                            |
| subAcct            | String           | Sub-account name                                                                                                                                                                                                                                                                  |
| uid                | String           | Sub-account uid                                                                                                                                                                                                                                                                   |
| label              | String           | Sub-account note                                                                                                                                                                                                                                                                  |
| mobile             | String           | Mobile number that linked with the sub-account.                                                                                                                                                                                                                                   |
| gAuth              | Boolean          | If the sub-account switches on the Google Authenticator for login authentication.<br><code>true</code>: On <code>false</code>: Off                                                                                                                                                |
| frozenFunc         | Array of strings | Frozen functions<br><code>trading</code><br><code>convert</code><br><code>transfer</code><br><code>withdrawal</code><br><code>deposit</code><br><code>flexible_loan</code>                                                                                                        |
| canTransOut        | Boolean          | Whether the sub-account has the right to transfer out.<br><code>true</code>: can transfer out<br><code>false</code>: cannot transfer out                                                                                                                                          |
| ts                 | String           | Sub-account creation time, Unix timestamp in millisecond format. e.g. <code>1597026383085</code>                                                                                                                                                                                  |
| subAcctLv          | String           | Sub-account level<br><code>1</code>: First level sub-account<br><code>2</code>: Second level sub-account.                                                                                                                                                                         |
| firstLvSubAcct     | String           | The first level sub-account.<br>For subAcctLv: 1, firstLvSubAcct is equal to subAcct<br>For subAcctLv: 2, subAcct belongs to firstLvSubAcct.                                                                                                                                      |
| ifDma              | Boolean          | Whether it is dma broker sub-account.<br><code>true</code>: Dma broker sub-account<br><code>false</code>: It is not dma broker sub-account.                                                                                                                                       |

---

### Create sub-account [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-create-sub-account "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-create-sub-account")

Applies to master accounts only and master accounts API Key must be linked to IP
addresses.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/users/subaccount/create-subaccount`

> Request sample

#### Request Parameters

| Parameter name | Type   | Required    | Description                                                                                                                                                                                                                                 |
| -------------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subAcct        | String | Yes         | Sub-account name                                                                                                                                                                                                                            |
| type           | String | Yes         | Sub-account type<br><code>1</code>: Standard sub-account<br><code>5</code>: Custody trading sub-account - Copper<br><code>12</code>: Custody trading sub-account - Komainu                                                                  |
| label          | String | No          | Sub-account notes. 6-32 letters (case sensitive), numbers or special characters like \*.                                                                                                                                                    |
| pwd            | String | Conditional | Sub-account login password, it is required for KYB users only.<br>Your password must contain:<br>8 - 32 characters long.<br>1 lowercase character (a-z).<br>1 uppercase character (A-Z).<br>1 number.<br>1 special character e.g. ! @ # $ % |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**   |
| ------------------ | -------- | ----------------- |
| subAcct            | String   | Sub-account name  |
| label              | String   | Sub-account notes |
| uid                | String   | Sub-account ID    |
| ts                 | String   | Creation time     |

---

### Create an API Key for a sub-account [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-create-an-api-key-for-a-sub-account "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-create-an-api-key-for-a-sub-account")

Applies to master accounts only and master accounts API Key must be linked to IP
addresses.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/users/subaccount/apikey`

> Request sample

#### Request Parameters

| Parameter  | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subAcct    | String | Yes      | Sub-account name, supports 6 to 20 characters that include numbers and letters (case sensitive, space symbol is not supported).                                                                                                                                                                                                                                                              |
| label      | String | Yes      | API Key note                                                                                                                                                                                                                                                                                                                                                                                 |
| passphrase | String | Yes      | API Key password, supports 8 to 32 alphanumeric characters containing at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.                                                                                                                                                                                                                                     |
| perm       | String | No       | API Key permissions<br><code>read_only</code>: Read only<br><code>trade</code>: Trade                                                                                                                                                                                                                                                                                                        |
| ip         | String | No       | Link IP addresses, separate with commas if more than one. Support up to 20 addresses.<br><font color="red"><b>For security reasons, it is recommended to bind IP addresses.</b></font><br><font color="red"><b>API keys with trading or withdrawal permissions that are not bound to IPs will expire after 14 days of inactivity. (API keys in demo trading will not be deleted.)</b></font> |

> Returned result

#### Response parameters

| **Parameter name** | **Type** | **Description**                                                                 |
| ------------------ | -------- | ------------------------------------------------------------------------------- |
| subAcct            | String   | Sub-account name                                                                |
| label              | String   | API Key note                                                                    |
| apiKey             | String   | API public key                                                                  |
| secretKey          | String   | API private key                                                                 |
| passphrase         | String   | API Key password                                                                |
| perm               | String   | API Key access<br><code>read_only</code> : Read only <code>trade</code> : Trade |
| ip                 | String   | IP address that linked with API Key                                             |
| ts                 | String   | Creation time                                                                   |

---

### Query the API Key of a sub-account [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-query-the-api-key-of-a-sub-account "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-query-the-api-key-of-a-sub-account")

Applies to master accounts only

#### Rate limit：20 request per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/users/subaccount/apikey`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| subAcct   | String | Yes      | Sub-account name |
| apiKey    | String | No       | API public key   |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**                                      |
| ------------------ | -------- | ---------------------------------------------------- |
| label              | String   | API Key note                                         |
| apiKey             | String   | API public key                                       |
| perm               | String   | API Key access<br>read_only: Read only; trade: Trade |
| ip                 | String   | IP address that linked with API Key                  |
| ts                 | String   | Creation time                                        |

---

### Reset the API Key of a sub-account [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-reset-the-api-key-of-a-sub-account "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-reset-the-api-key-of-a-sub-account")

Applies to master accounts only and master accounts API Key must be linked to IP
addresses.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/users/subaccount/modify-apikey`

> Request sample

#### Request Parameters

| Parameter name | Type   | Required | Description                                                                                                                                                                                                                                         |
| -------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subAcct        | String | Yes      | Sub-account name                                                                                                                                                                                                                                    |
| apiKey         | String | Yes      | Sub-account APIKey                                                                                                                                                                                                                                  |
| label          | String | No       | Sub-account API Key label. The label will be reset if this is passed through.                                                                                                                                                                       |
| perm           | String | No       | Sub-account API Key permissions<br><code>read_only</code>: Read<br><code>trade</code>: Trade<br>Separate with commas if more than one.<br>The permission will be reset if this is passed through.                                                   |
| ip             | String | No       | Sub-account API Key linked IP addresses, separate with commas if more than one. Support up to 20 IP addresses.<br>The IP will be reset if this is passed through.<br>If <code>ip</code> is set to "", then no IP addresses is linked to the APIKey. |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**                                                                              |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| subAcct            | String   | Sub-account name                                                                             |
| apiKey             | String   | Sub-accountAPI public key                                                                    |
| label              | String   | Sub-account API Key label                                                                    |
| perm               | String   | Sub-account API Key permissions<br><code>read_only</code>: Read<br><code>trade</code>: Trade |
| ip                 | String   | Sub-account API Key IP addresses that linked with API Key                                    |
| ts                 | String   | Creation time                                                                                |

---

### Delete the API Key of sub-accounts [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-delete-the-api-key-of-sub-accounts "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-delete-the-api-key-of-sub-accounts")

Applies to master accounts only and master accounts API Key must be linked to IP
addresses.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/users/subaccount/delete-apikey`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| subAcct   | String | Yes      | Sub-account name |
| apiKey    | String | Yes      | API public key   |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**  |
| ------------------ | -------- | ---------------- |
| subAcct            | String   | Sub-account name |

---

### Get sub-account trading balance [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance")

Query detailed balance info of Trading Account of a sub-account via the master
account (applies to master accounts only)

#### Rate limit：6 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/account/subaccount/balances`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| subAcct   | String | Yes      | Sub-account name |

> Returned result

#### Response parameters

| **Parameters**             | **Types**        | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uTime                      | String           | Update time of account information, millisecond format of Unix timestamp, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| totalEq                    | String           | The total amount of equity in <code>USD</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| isoEq                      | String           | Isolated margin equity in <code>USD</code><br>Applicable to <code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| adjEq                      | String           | Adjusted / Effective equity in <code>USD</code><br>The net fiat value of the assets in the account that can provide margins for spot, expiry futures, perpetual futures and options under the cross-margin mode.<br>In multi-ccy or PM mode, the asset and margin requirement will all be converted to USD value to process the order check or liquidation.<br>Due to the volatility of each currency market, our platform calculates the actual USD value of each currency based on discount rates to balance market risks.<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code> and <code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| availEq                    | String           | Account level available equity, excluding currencies that are restricted due to the collateralized borrowing limit.<br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ordFroz                    | String           | Cross margin frozen for pending orders in <code>USD</code><br>Only applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| imr                        | String           | Initial margin requirement in <code>USD</code><br>The sum of initial margins of all open positions and pending orders under cross-margin mode in <code>USD</code>.<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| mmr                        | String           | Maintenance margin requirement in <code>USD</code><br>The sum of maintenance margins of all open positions and pending orders under cross-margin mode in <code>USD</code>.<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| borrowFroz                 | String           | Potential borrowing IMR of the account in <code>USD</code><br>Only applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>. It is "" for other margin modes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| mgnRatio                   | String           | Maintenance margin ratio in <code>USD</code><br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| notionalUsd                | String           | Notional value of positions in <code>USD</code><br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| notionalUsdForBorrow       | String           | Notional value for <code>Borrow</code> in USD<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| notionalUsdForSwap         | String           | Notional value of positions for <code>Perpetual Futures</code> in USD<br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| notionalUsdForFutures      | String           | Notional value of positions for <code>Expiry Futures</code> in USD<br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| notionalUsdForOption       | String           | Notional value of positions for <code>Option</code> in USD<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| upl                        | String           | Cross-margin info of unrealized profit and loss at the account level in <code>USD</code><br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| details                    | Array of objects | Detailed asset information in all currencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; ccy                   | String           | Currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; eq                    | String           | Equity of currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; cashBal               | String           | Cash balance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; uTime                 | String           | Update time of currency balance information, Unix timestamp format in milliseconds, e.g. <code>1597026383085</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; isoEq                 | String           | Isolated margin equity of currency<br>Applicable to <code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; availEq               | String           | Available equity of currency<br>Applicable to <code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; disEq                 | String           | Discount equity of currency in <code>USD</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; fixedBal              | String           | Frozen balance for <code>Dip Sniper</code> and <code>Peak Sniper</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; availBal              | String           | Available balance of currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; frozenBal             | String           | Frozen balance of currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &gt; ordFrozen             | String           | Margin frozen for open orders<br>Applicable to <code>Spot mode</code>/<code>Futures mode</code>/<code>Multi-currency margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; liab                  | String           | Liabilities of currency<br>It is a positive value, e.g. <code>21625.64</code><br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; upl                   | String           | The sum of the unrealized profit &amp; loss of all margin and derivatives positions of currency.<br>Applicable to <code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; uplLiab               | String           | Liabilities due to Unrealized loss of currency<br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; crossLiab             | String           | Cross liabilities of currency<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; rewardBal             | String           | Trial fund balance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; isoLiab               | String           | Isolated liabilities of currency<br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; mgnRatio              | String           | Cross Maintenance margin ratio of currency<br>The index for measuring the risk of a certain asset in the account.<br>Applicable to <code>Futures mode</code> and when there is cross position                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; imr                   | String           | Cross initial margin requirement at the currency level<br>Applicable to <code>Futures mode</code> and when there is cross position                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; mmr                   | String           | Cross maintenance margin requirement at the currency level<br>Applicable to <code>Futures mode</code> and when there is cross position                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; interest              | String           | Accrued interest of currency<br>It is a positive value, e.g. <code>9.01</code><br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &gt; twap                  | String           | Risk indicator of auto liability repayment<br>Divided into multiple levels from 0 to 5, the larger the number, the more likely the auto repayment will be triggered.<br>Applicable to <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; maxLoan               | String           | Max loan of currency<br>Applicable to <code>cross</code> of <code>Spot mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; eqUsd                 | String           | Equity in <code>USD</code> of currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; borrowFroz            | String           | Potential borrowing IMR of currency in <code>USD</code><br>Applicable to <code>Multi-currency margin</code>/<code>Portfolio margin</code>. It is "" for other margin modes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; notionalLever         | String           | Leverage of currency<br>Applicable to <code>Futures mode</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; stgyEq                | String           | Strategy equity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &gt; isoUpl                | String           | Isolated unrealized profit and loss of currency<br>Applicable to <code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &gt; spotInUseAmt          | String           | Spot in use amount<br>Applicable to <code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; clSpotInUseAmt        | String           | User-defined spot risk offset amount<br>Applicable to <code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; maxSpotInUse          | String           | Max possible spot risk offset amount<br>Applicable to <code>Portfolio margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &gt; spotIsoBal            | String           | Spot isolated balance<br>Applicable to copy trading<br>Applicable to <code>Spot mode</code>/<code>Futures mode</code>.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; smtSyncEq             | String           | Smart sync equity<br>The default is "0", only applicable to copy trader.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; spotCopyTradingEq     | String           | Spot smart sync equity.<br>The default is "0", only applicable to copy trader.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &gt; spotBal               | String           | Spot balance. The unit is currency, e.g. BTC. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; openAvgPx             | String           | Spot average cost price. The unit is USD. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; accAvgPx              | String           | Spot accumulated cost price. The unit is USD. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| &gt; spotUpl               | String           | Spot unrealized profit and loss. The unit is USD. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &gt; spotUplRatio          | String           | Spot unrealized profit and loss ratio. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &gt; totalPnl              | String           | Spot accumulated profit and loss. The unit is USD. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &gt; totalPnlRatio         | String           | Spot accumulated profit and loss ratio. <a href="https://www.okx.com/help/i-introduction-of-spot">More details</a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &gt; colRes                | String           | Platform level collateral restriction status<br><code>0</code>: The restriction is not enabled.<br><code>1</code>: The restriction is not enabled. But the crypto is close to the platform's collateral limit.<br><code>2</code>: The restriction is enabled. This crypto can't be used as margin for your new orders. This may result in failed orders. But it will still be included in the account's adjusted equity and doesn't impact margin ratio.<br>Refer to <a href="https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">Introduction to the platform collateralized borrowing limit</a> for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| &gt; colBorrAutoConversion | String           | Risk indicator of auto conversion. Divided into multiple levels from 1-5, the larger the number, the more likely the repayment will be triggered. The default will be 0, indicating there is no risk currently. 5 means this user is undergoing auto conversion now, 4 means this user will undergo auto conversion soon whereas 1/2/3 indicates there is a risk for auto conversion.<br>Applicable to <code>Spot mode</code>/<code>Futures mode</code>/<code>Multi-currency margin</code>/<code>Portfolio margin</code><br>When the total liability for each crypto set as collateral exceeds a certain percentage of the platform's total limit, the auto-conversion mechanism may be triggered. This may result in the automatic sale of excess collateral crypto if you've set this crypto as collateral and have large borrowings. To lower this risk, consider reducing your use of the crypto as collateral or reducing your liabilities.<br>Refer to <a href="https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism">Introduction to the platform collateralized borrowing limit</a> for more details. |
| &gt; collateralRestrict    | Boolean          | <del>Platform level collateralized borrow restriction<br><code>true</code><br><code>false</code></del>(deprecated, use colRes instead)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &gt; collateralEnabled     | Boolean          | <code>true</code>: Collateral enabled<br><code>false</code>: Collateral disabled<br>Applicable to <code>Multi-currency margin</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; autoLendStatus        | String           | Auto lend status<br><code>unsupported</code>: auto lend is not supported by this currency<br><code>off</code>: auto lend is supported but turned off<br><code>pending</code>: auto lend is turned on but pending matching<br><code>active</code>: auto lend is turned on and matched                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| &gt; autoLendMtAmt         | String           | Auto lend currency matched amount<br>Return "0" when autoLendStatus is <code>unsupported/off/pending</code>. Return matched amount when autoLendStatus is <code>active</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

"" will be returned for inapplicable fields with the current account level.

---

### Get sub-account funding balance [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-funding-balance "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-funding-balance")

Query detailed balance info of Funding Account of a sub-account via the master
account (applies to master accounts only)

#### Rate limit：6 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/asset/subaccount/balances`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| subAcct   | String | Yes      | Sub-account name                                                                                                              |
| ccy       | String | No       | Single currency or multiple currencies (no more than 20) separated with comma, e.g. <code>BTC</code> or <code>BTC,ETH</code>. |

> Returned result

#### Response parameters

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| ccy       | String | Currency          |
| bal       | String | Balance           |
| frozenBal | String | Frozen balance    |
| availBal  | String | Available balance |

---

### Get sub-account maximum withdrawals [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-maximum-withdrawals "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-sub-account-maximum-withdrawals")

Retrieve the maximum withdrawal information of a sub-account via the master
account (applies to master accounts only). If no currency is specified, the
transferable amount of all owned currencies will be returned.

#### Rate limit: 20 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/account/subaccount/max-withdrawal`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| subAcct   | String | Yes      | Sub-account name                                                                                                              |
| ccy       | String | No       | Single currency or multiple currencies (no more than 20) separated with comma, e.g. <code>BTC</code> or <code>BTC,ETH</code>. |

#### Response parameters

| Parameter         | Type   | Description                                                                                                                                                           |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy               | String | Currency                                                                                                                                                              |
| maxWd             | String | Max withdrawal (excluding borrowed assets under <code>Multi-currency margin</code>)                                                                                   |
| maxWdEx           | String | Max withdrawal (including borrowed assets under <code>Multi-currency margin</code>)                                                                                   |
| spotOffsetMaxWd   | String | Max withdrawal under Spot-Derivatives risk offset mode (excluding borrowed assets under <code>Portfolio margin</code>)<br>Applicable to <code>Portfolio margin</code> |
| spotOffsetMaxWdEx | String | Max withdrawal under Spot-Derivatives risk offset mode (including borrowed assets under <code>Portfolio margin</code>)<br>Applicable to <code>Portfolio margin</code> |

---

### Get history of sub-account transfer [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-sub-account-transfer "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-sub-account-transfer")

This endpoint is only available for master accounts. Transfer records are
available from September 28, 2022 onwards.

#### Rate limit：6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/asset/subaccount/bills`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ccy       | String | No       | Currency, such as BTC                                                                                                                                              |
| type      | String | No       | Transfer type<br><code>0</code>: Transfers from master account to sub-account<br><code>1</code> : Transfers from sub-account to master account.                    |
| subAcct   | String | No       | Sub-account name                                                                                                                                                   |
| after     | String | No       | Query the data prior to the requested bill ID creation time (exclude), the value should be a Unix timestamp in millisecond format. e.g. <code>1597026383085</code> |
| before    | String | No       | Query the data after the requested bill ID creation time (exclude), the value should be a Unix timestamp in millisecond format. e.g. <code>1597026383085</code>    |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                                             |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**                                                                              |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| billId             | String   | Bill ID                                                                                      |
| ccy                | String   | Transfer currency                                                                            |
| amt                | String   | Transfer amount                                                                              |
| type               | String   | Bill type                                                                                    |
| subAcct            | String   | Sub-account name                                                                             |
| ts                 | String   | Bill ID creation time, Unix timestamp in millisecond format, e.g. <code>1597026383085</code> |

---

### Get history of managed sub-account transfer [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-managed-sub-account-transfer "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-history-of-managed-sub-account-transfer")

Only applicable to the trading team's master account to getting transfer records
of managed sub accounts entrusted to oneself.

#### Rate limit：6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/asset/subaccount/managed-subaccount-bills`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                                                   |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy       | String | No       | Currency, e.g <code>BTC</code>                                                                                                                |
| type      | String | No       | Transfer type<br><code>0</code>: Transfers from master account to sub-account<br><code>1</code>: Transfers from sub-account to master account |
| subAcct   | String | No       | Sub-account name                                                                                                                              |
| subUid    | String | No       | Sub-account UID                                                                                                                               |
| after     | String | No       | Query the data prior to the requested bill ID creation time (exclude), Unix timestamp in millisecond format, e.g. <code>1597026383085</code>  |
| before    | String | No       | Query the data after the requested bill ID creation time (exclude), Unix timestamp in millisecond format, e.g. <code>1597026383085</code>     |
| limit     | String | No       | Number of results per request. The maximum is 100. The default is 100.                                                                        |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**                                                                              |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| billId             | String   | Bill ID                                                                                      |
| ccy                | String   | Transfer currency                                                                            |
| amt                | String   | Transfer amount                                                                              |
| type               | String   | Bill type                                                                                    |
| subAcct            | String   | Sub-account name                                                                             |
| subUid             | String   | Sub-account UID                                                                              |
| ts                 | String   | Bill ID creation time, Unix timestamp in millisecond format, e.g. <code>1597026383085</code> |

---

### Master accounts manage the transfers between sub-accounts [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts")

Applies to master accounts only.

Only API keys with `Trade` privilege can call this endpoint.

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP request

`POST /api/v5/asset/subaccount/transfer`

> Request sample

#### Request Parameters

| Parameter      | Type    | Required | Description                                                                                                                                                      |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ccy            | String  | Yes      | Currency                                                                                                                                                         |
| amt            | String  | Yes      | Transfer amount                                                                                                                                                  |
| from           | String  | Yes      | Account type of transfer from sub-account<br><code>6</code>: Funding Account<br><code>18</code>: Trading account                                                 |
| to             | String  | Yes      | Account type of transfer to sub-account<br><code>6</code>: Funding Account<br><code>18</code>: Trading account                                                   |
| fromSubAccount | String  | Yes      | Sub-account name of the account that transfers funds out.                                                                                                        |
| toSubAccount   | String  | Yes      | Sub-account name of the account that transfers funds in.                                                                                                         |
| loanTrans      | Boolean | No       | Whether or not borrowed coins can be transferred out under <code>Multi-currency margin</code>/<code>Portfolio margin</code><br>The default is <code>false</code> |
| omitPosRisk    | String  | No       | Ignore position risk<br>Default is <code>false</code><br>Applicable to <code>Portfolio margin</code>                                                             |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description** |
| ------------------ | -------- | --------------- |
| transId            | String   | Transfer ID     |

---

### Set permission of transfer out [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out")

Set permission of transfer out for sub-account (only applicable to master
account API key). Sub-account can transfer out to master account by default.

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID

#### Permission: Trade

#### HTTP Request

`POST /api/v5/users/subaccount/set-transfer-out`

#### Request Parameters

| Parameter   | Type    | Required | Description                                                                                                                                                                |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subAcct     | String  | Yes      | Name of the sub-account. Single sub-account or multiple sub-account (no more than 20) separated with comma.                                                                |
| canTransOut | Boolean | No       | Whether the sub-account has the right to transfer out. The default is <code>true</code>.<br><code>false</code>: cannot transfer out<br><code>true</code>: can transfer out |

> Returned result

#### Response parameters

| **Parameter** | **Type** | **Description**                                                                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| subAcct       | String   | Name of the sub-account                                                                                                                  |
| canTransOut   | Boolean  | Whether the sub-account has the right to transfer out.<br><code>false</code>: cannot transfer out<br><code>true</code>: can transfer out |

---

### Get custody trading sub-account list [🔗](https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-custody-trading-sub-account-list "Direct link to: https://www.okx.com/docs-v5/en/#sub-account-rest-api-get-custody-trading-sub-account-list")

The trading team uses this interface to view the list of sub-accounts currently
under escrow

#### Rate limit：1 request per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP request

`GET /api/v5/users/entrust-subaccount-list`

> Request sample

#### Request Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| subAcct   | String | No       | Sub-account name |

> Returned results

#### Response parameters

| **Parameter name** | **Type** | **Description**  |
| ------------------ | -------- | ---------------- |
| subAcct            | String   | Sub-account name |

---
