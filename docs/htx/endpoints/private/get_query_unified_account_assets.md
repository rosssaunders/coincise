# GET Query unified account assets

**Source:**
[Query unified account assets](https://www.htx.com/en-us/opend/newApiPages/?id=10000074-77b7-11ed-9966-0242ac110003)

**Category:** USDT-M Unified Account

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v3/unified_account_info (Query unified account assets)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Used to query the total assets of the account of the
USTD-m unified account type user. User assets of non-unified account types are
still queried separately according to the previous cross-margin account and
isolated- margin account.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                             | Value Range                                          | Default Value |
| ------------- | --------- | -------- | --------------------------------------- | ---------------------------------------------------- | ------------- |
| contract_code | String    | false    | Contract code, return all if not filled | Swap: "BTC-USDT"... ， Future: "BTC-USDT -210625"... |               |

#### Response Parameter

| Parameter             | Data Type    | Required | Description                                                                             | Value Range                                                                    |
| --------------------- | ------------ | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| code                  | int          | true     | Status code                                                                             |                                                                                |
| msg                   | String       | true     | Result description                                                                      |                                                                                |
| ts                    | Long         | true     | Timestamp                                                                               |                                                                                |
| DATA_START            | object array | true     | USDT-M unified account                                                                  |                                                                                |
| margin_balance        | decimal      | true     | margin account                                                                          |                                                                                |
| margin_static         | decimal      | true     | Static equity,excluding profit and loss                                                 |                                                                                |
| cross_profit_unreal   | decimal      | true     | account unrealized profit and loss of the currency                                      |                                                                                |
| cross_margin_static   | decimal      | true     | Cross-margin static equity,excluding isolated position assets                           |                                                                                |
| margin_asset          | string       | true     | Margin Currency (Pricing Currency)                                                      | USDT                                                                           |
| margin_frozen         | decimal      | true     | Freeze Margin (Frozen Quantity of Cross Margin & Isolated Margin)                       |                                                                                |
| withdraw_available    | decimal      | true     | Transferable quantity (the amount of assets that users can transfer out of the account) |                                                                                |
| cross_risk_rate       | decimal      | true     | Cross Margin Rate (%)                                                                   |                                                                                |
| CROSS_SWAP \_START    | object array | true     | Contract-related fields of cross-position swap                                          |                                                                                |
| symbol                | string       | true     | Variety Code                                                                            | "BTC","ETH"...                                                                 |
| contract_code         | string       | true     | Contract code                                                                           | Swap："BTC-USDT" ...                                                           |
| margin_mode           | string       | true     | Margin model                                                                            | Cross Margin Mode：cross                                                       |
| margin_available      | decimal      | true     | Available margin for the current leverage of the contract code                          |                                                                                |
| cross_max_available   | int          | true     | cross max available                                                                     |                                                                                |
| lever_rate            | decimal      | true     | Lever rate                                                                              |                                                                                |
| contract_type         | string       | true     | Contract type                                                                           | swap                                                                           |
| business_type         | string       | true     | Business type                                                                           | swap                                                                           |
| CROSS_SWAP \_END      |              | false    |                                                                                         |                                                                                |
| CROSS_FUTURES \_START | object array | true     | Fields related to cross-position future contracts                                       |                                                                                |
| symbol                | string       | true     | Variety Code                                                                            | "BTC","ETH"...                                                                 |
| contract_code         | string       | true     | Contract code                                                                           | future："BTC-USDT-211231" ...                                                  |
| margin_mode           | string       | true     | Margin model                                                                            | Cross Margin Mode：cross                                                       |
| margin_available      | decimal      | true     | Available margin for the current leverage of the contract code                          |                                                                                |
| lever_rate            | decimal      | true     | Lever rate                                                                              |                                                                                |
| contract_type         | string       | true     | Contract type                                                                           | this_week、next_week、quarter、next_quarter                                    |
| business_type         | string       | true     | Business type                                                                           | futures                                                                        |
| CROSS_FUTURES \_END   |              | false    |                                                                                         |                                                                                |
| ISOLATED_SWAP_START   | object array | true     | Unified Account Isolated Margin Contract                                                |                                                                                |
| symbol                | string       | true     | Variety Code                                                                            | "BTC","ETH"...                                                                 |
| contract_code         | string       | true     | Contract code                                                                           | "BTC-USDT","ETH-USDT"...                                                       |
| margin_mode           | string       | true     | Margin model                                                                            | Isolated Margin Mode：isolated                                                 |
| margin_available      | decimal      | true     | Available margin for the current leverage of the contract code                          |                                                                                |
| withdraw_available    | decimal      | true     | Maximum amount that can be reduced                                                      | Hedge is superposition of long-short isolation, one- way is normal calculation |
| lever_rate            | int          | true     | Lever rate                                                                              |                                                                                |
| position_mode         | string       | true     | Position mode                                                                           | single_side,dual_side                                                          |
| ISOLATED_SWAP \_END   |              | false    |                                                                                         |                                                                                |
| DATA_END              |              | false    |                                                                                         |                                                                                |

#### Request example

No data

#### Response Example

##### Success Example

`{ "code":200 "data":[ 0:{ "cross_future":[] "cross_margin_static":0 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[] "isolated_swap":[] "margin_asset":"HUSD" "margin_balance":0 "margin_frozen":0 "margin_static":0 "userId":NULL "withdraw_available":0 } 1:{ "cross_future":[] "cross_margin_static":0 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[] "isolated_swap":[] "margin_asset":"HT" "margin_balance":0 "margin_frozen":0 "margin_static":0 "userId":NULL "withdraw_available":0 } 2:{ "cross_future":[ 0:{ "business_type":"futures" "contract_code":"TOMO-USDT-231229" "contract_type":"quarter" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"TOMO" } 1:{ "business_type":"futures" "contract_code":"TOMO-USDT-231110" "contract_type":"this_week" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"TOMO" } ] "cross_margin_static":19.92483057113564 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[ 0:{ "business_type":"swap" "contract_code":"MANA-USDT" "contract_type":"swap" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"MANA" } 1:{ "business_type":"swap" "contract_code":"BNT-USDT" "contract_type":"swap" "margin_available":19.92483057113564 "cross_max_available":19.92483057113564 "lever_rate":5 "margin_mode":"cross" "symbol":"BNT" } ] "isolated_swap":[ 0:{ "contract_code":"BTC-USDT" "lever_rate":200 "margin_available":19.92483057113564 "margin_mode":"isolated" "symbol":"BTC" "withdraw_available":0 } 1:{ "contract_code":"GMT-USDT" "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"isolated" "symbol":"GMT" "withdraw_available":0 } ] "margin_asset":"USDT" "margin_balance":19.92483057113564 "margin_frozen":0 "margin_static":19.92483057113564 "userId":NULL "withdraw_available":19.92483057113564 } ] "msg":"ok" "ts":1699500414053 }`
