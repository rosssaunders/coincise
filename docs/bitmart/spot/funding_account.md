# Funding Account

## Get Account Balance (KEYED)

`Gets Account Balance`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/wallet?currency=USDT&needUsdValuation=true`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | No | Currency 
| needUsdValuation | Bool | No | Whether to return the USD valuation, default is <code>false</code> 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"ef834248-51d3-4223-9481-f862aa9dd39f",     "data":{         "wallet":[             {                 "currency":"USDT",                 "name":"Tether USD",                 "available":"1000.00000000",                 "available_usd_valuation":"1002.00000000",                 "frozen":"0.00000000",                 "unAvailable":"0.00000000"             }         ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' 
| name | String | Token name, e.g., 'Bitcoin' 
| available | String | Available Balance 
| available_usd_valuation | String | Available Balance USD valuation 
| frozen | String | Trading frozen Balance 
| unAvailable | String | Trading frozen Balance + Other frozen Balance 

Only assets with a balance greater than 0 will be returned.

## Get Currencies

`Gets the currency of the asset for withdrawal`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/account/v1/currencies?currencies=BTC,ETH,BMX`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currencies | String | No | Single query, such as <code>BTC</code>; multiple queries, such as <code>BTC,ETH,BMX</code>, can have a maximum of 20. 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "currency": "USDT",         "name": "Tether USD",         "contract_address": null,         "network": "OMNI",         "withdraw_enabled": false,         "deposit_enabled": false,         "withdraw_minsize": null,         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-TRC20",         "name": "USDT-TRC20",         "contract_address": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",         "network": "TRC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "10",         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-ERC20",         "name": "USDT-ERC20",         "contract_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",         "network": "ERC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "26",         "withdraw_minfee": null,         "withdraw_fee": "26",         "withdraw_fee_estimate": "26.3"       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' 
| name | String | Token name, e.g., 'Bitcoin' 
| contract_address | String | Contract address 
| network | String | network, e.g., 'ERC20' 
| withdraw_enabled | Boolean | Availability to withdraw<br>- <code>true</code>=available<br>- <code>false</code>=not available 
| deposit_enabled | Boolean | Availability to deposit<br>- <code>true</code>=available<br>-<code>false</code>=not available 
| withdraw_minsize | String | Minimum withdrawal amount 
| withdraw_minfee | String | Minimum withdrawal fee (After 2025-05-18, the field will be removed) 
| withdraw_fee | String | Withdrawal fee. The unit corresponds to the currency 
| withdraw_fee_estimate | String | Withdrawal fee estimate. The unit is USD. 

1\. If the returned response does not contain the currency you need, the currency may have been removed.  
2\. There are multiple USDT currencies. Note that:  
\`currency\` = \`USDT\` default is OMNI network  
\`currency\` = \`USDT-TRC20\` , is TRC20 network  
\`currency\` = \`USDT-ERC20\`, is ERC20 network  

## Get Spot Wallet Balance (KEYED)

`Get the user's wallet balance for all currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/wallet`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "wallet": [          {               "id": "BTC",               "available": "10.000000",               "name": "Bitcoin",               "frozen": "10.000000",           },           ...     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| id | String | Cryptocurrency abbreviation 
| name | String | Full name 
| available | String | Available balance 
| frozen | String | Frozen balance 

## Deposit Address (KEYED)

`Gets Deposit Address`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit/address`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit/address?currency=USDT-TRC20`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | Yes | Token symbol, e.g., 'BTC' 

**Instruction**

![PNG](../../images/usdt_address_en-4cddf274.png)

USDT has multiple recharge addresses, please select them correctly. For example:  
\`currency\` = \`USDT\` default is OMNI;  
\`currency\` = \`USDT-TRC20\` is TRC20;  
\`currency\` = \`USDT-ERC20\` is ERC20;

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",     "data":{         "currency":"USDT-TRC20",         "chain":"USDT-TRC20",         "address":"TGR3ghy2b5VLbyAYrmiE15jasR6aPHTvC5",         "address_memo":""     } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' 
| chain | String | Token chain 
| address | String | Deposit address 
| address_memo | String | Tag (tag/payment_id/memo); If some currencies need to withdraw currency, it will return data. If not, it will return empty string 

This interface is not available for sub-account

The tag names required by each currency are different, such as (tag/payment\_id/memo). For convenience, BitMart is uniformly defined as address\_Memo. This means that regardless of the currency in which tag/payment\_id/memo is required, the service returns the address\_Memo field uniformly. Please pay attention to the distinction.  
Tag are required for some tokens. Please include them while making deposits to ensure the your funds will be properly credited.  
IOTA and HLX COINS are temporarily not supported for deposit.

[Forgot to write Memo/Wrote a wrong Memo?](https://bitmart.zendesk.com/hc/en-us/articles/360050031134-Forgot-to-write-Memo-Wrote-a-wrong-Memo)

## Withdraw Quota (KEYED)

`Query withdraw quota for currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/charge`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/account/v1/withdraw/charge?currency=BTC`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | Yes | Token symbol, e.g., 'BTC' 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"62a80bde-0cb4-4bf1-b8e5-5ad2c71463e7",     "data":{         "today_available_withdraw_BTC":"100.0000",         "min_withdraw":"0.00000000",         "withdraw_precision":8,         "withdraw_fee":"0.00000000",         "withdraw_Precision_GeTen": 10     } }`

| Field | Type | Description |
| --- | --- | --- |
| today_available_withdraw_BTC | String | Amount available for withdrawal today, unit: BTC 
| min_withdraw | String | Minimum withdrawal amount 
| withdraw_precision | Int | Withdrawal amount must be accurate to several decimal places. 
| withdraw_fee | String | Withdrawal fee 
| withdraw_Precision_GeTen | Long | Withdrawal amount must be an integral multiple of this value. If it is null, it means there is no such requirement. 

This interface is not available for sub-account

1\. When \`withdraw\_precision\`=5, then the decimal point of the withdrawal amount cannot exceed 5 digits.  
2\. When \`withdraw\_Precision\_GeTen\`=10, then the withdrawal amount must be an integral multiple of 10.  

## Withdraw (SIGNED)

`Creates a withdraw request from spot account to an external address`

`The API can only make withdrawal to verified addresses, and verified addresses can be set by WEB/APP.`

#### Request URL

`POST https://api-cloud.bitmart.com/account/v1/withdraw/apply`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | Yes | Token symbol, e.g., 'BTC' 
| amount | String | Yes | The amount of currency to withdraw 

#### Parameters for Withdraw to the blockchain

> 1.Request: Withdraw to the blockchain

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "destination": "To Digital Address",     "address": "0x1EE6FA5A3803608fc22a1f3F76********",     "address_memo": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| address | String | Yes | Withdraw address (only the address added on the official website is supported) 
| address_memo | String | No | Address tag(tag Or payment_id Or memo) 
| destination | String | No | Remark 

#### Parameters for Withdraw to BitMart account

> 2.Request: Withdraw to BitMart account

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "type": 1,     "value": "876940329",     "areaCode": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| type | Int | Yes | Account type<br><code>1</code>=CID<br><code>2</code>=Email<br><code>3</code>=Phone 
| value | String | Yes | Account 
| areaCode | String | Yes | Phone area code, required when account type is phone, e.g.: 61 

##### Important notes on request parameters

1\. If the currency has multiple blockchains, please pay attention to passing parameters: such as USDT  
\`currency\`=\`USDT-TRX\` network is TRX  
\`currency\`=\`USDT-ETH\` network is ETH  
\`currency\`=\`USDT-BSC\_BNB\` network is BSC\_BNB  
\`currency\`=\`USDT-SOL\` network is SOL  
\`currency\`=\`USDT-ALGO\` network is ALGO  
[find more currencies network](#get-currencies)  
2\. Withdraw only supports addresses in the list of commonly used addresses of users. IOTA, HLX one-time currency withdrawal address cannot be set as the common address, so IOTA, HLX withdrawal address is not supported.  
3\. Without the withdrawal tag, \`address\_memo\` does not pass or pass an empty string.  
4\. If the parameters for \`Withdraw to the blockchain\` and the parameters for \`Withdraw to BitMart account\` are transmitted at the same time, the parameters for \`Withdraw to the blockchain\` will take precedence.

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "withdraw_id": "121212"   } }`

| Field | Type | Description |
| --- | --- | --- |
| withdraw_id | String | Withdrawa ID 

##### Note

This interface is not available for sub-account

**1\. When withdraw\_id is returned, it means that the withdrawal request has been sent successfully.**

**2\. You can check the tx\_id of this withdrawal by using the interface of [Get A Deposit Or Withdraw Detail](#get-a-deposit-or-withdraw-detail-keyed), and use it to query the withdrawal progress on the blockchain.**

**3\. If you get an error message， message=`This address is not verified. Please add and verify this address on the client`**  
You need to add the address to the whitelist address according to the following 3 steps.

Step 1: After logging in to the account on the Web or APP, enter the withdrawal page.

Step 2: Click【Add withdrawal address】

![PNG](../../images/add-address-v2-step1-en-eeaabb94.png)

Step 3: On the address management page, save the withdrawal address as \[Verified Address\], which supports API withdrawal.

![PNG](../../images/add-address-v2-step2-en-47a1ddb2.png) ![PNG](../../images/add-address-v2-step3-en-36045e7f.png)

**4\. Address Types:**

1\. Standard Address: Can be withdrawn to a specified currency and network address.  
2\. Universal Address: Can be withdrawn to all currencies on the specified network.  
3\. EVM Address: Can be withdrawn to currencies on EVM type networks.  

**5\. Verified Addresses:**

1\. When saving an address, it can be pre-verified to skip the verification during withdrawal (Verified addresses will not need to be verified again during the withdrawal process).  
2\. API withdrawal must use verified addresses; un-verified addresses cannot be used for withdrawal via API.  

## Withdraw Address (KEYED)

`Gets Withdraw Address List`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

None

#### Response Data

> Response

`{   "message":"OK",   "code":1000,   "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",   "data":{     "list": [       {         "currency": "ETH",         "network": "ETH",         "address": "0x1121",         "memo": "12",         "remark": "12",         "addressType": 0,         "verifyStatus": 0       }]   } }`

| Field | Type | Description |
| --- | --- | --- |
| address | String | Withdraw Address 
| memo | String | Memo 
| remark | String | Remark 
| verifyStatus | Int | Address verify status<br>-<code>0</code>=Unverified<br>-<code>1</code>=Verified 
| addressType | Int | Address Type<br>-<code>0</code>=Standard Address<br>-<code>1</code>=Universal Address<br>-<code>2</code>=EVM Address 
| network | String | Network. The value is present only when the address type is a Standard address or Universal Address 
| currency | String | The value is present only when the address type is a Standard address 

## Get Deposit And Withdraw History (KEYED)

`The original /account/v1/deposit-withdraw/history interface, the old interface is no longer supported, please switch to the new interface as soon as possible`

`Search for all existed withdraws and deposits and return their latest status.`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history?N=100&operation_type=withdraw&startTime=1739499865000`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| currency | String | No | Token symbol, e.g., 'BTC' 
| operation_type | String | Yes | type<br>-<code>deposit</code>=deposit<br>-<code>withdraw</code>=withdraw 
| startTime | Long | No | Default: 90 days from current timestamp (milliseconds) 
| endTime | Long | No | Default: present timestamp (milliseconds) 
| N | Int | Yes | Recent N records (value range 1-1000) 

#### Response Data

> Response

`{   "message":"OK",   "code":1000,   "trace":"142bf92a-fc50-4689-92b6-590886f90b97",   "data":{     "records":[       {         "withdraw_id":"1679952",         "deposit_id":"",         "operation_type":"withdraw",         "currency":"BMX",         "apply_time":1588867374000,         "arrival_amount":"59.000000000000",         "fee":"1.000000000000",         "status":0,         "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",         "address_memo":"",         "tx_id":""       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| withdraw_id | String | withdraw id 
| deposit_id | String | deposit id 
| operation_type | String | type<br>-<code>deposit</code>=deposit<br>-<code>withdraw</code>=withdraw 
| currency | String | Token symbol, e.g., 'BTC' 
| apply_time | Long | The request timestamp is accurate to milliseconds(UTC-0) 
| arrival_amount | String | Actual amount received 
| fee | String | fee 
| status | Int | status<br>- <code>0</code>=Create<br>- <code>1</code>=Submitted, waiting for withdrawal<br>- <code>2</code>=Processing<br>- <code>3</code>=Done<br>- <code>4</code>=Cancel<br>- <code>5</code>=Fail 
| address | String | Address 
| address_memo | String | Address tag 
| tx_id | String | Hash record 

1\. The deposit id has a value when \`operation\_type\` = 'deposit'. The withdraw id has a value when \`operation\_type\` = 'withdraw'.  
2\. Tx\_id is an empty string before it is chained.  
3\. Please notice the default startTime and endTime to make sure that time interval is within 0-90 days.  
4\. If both startTime and endTime are sent, time between startTime and endTime must be less than 90 days.  

This endpoint is not available for sub-account

## Get A Deposit Or Withdraw Detail (KEYED)

`Query a single charge record`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail?id=1679952`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| id | String | Yes | <code>withdraw_id</code> or <code>deposit_id</code> 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{         "record":{             "withdraw_id":"1679952",             "deposit_id":"",             "operation_type":"withdraw",             "currency":"BMX",             "apply_time":1588867374000,             "arrival_amount":"59.000000000000",             "fee":"1.000000000000",             "status":0,             "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",             "address_memo":"",             "tx_id":""         }     } }`

| Field | Type | Description |
| --- | --- | --- |
| withdraw_id | String | withdraw id 
| deposit_id | String | deposit id 
| operation_type | String | type<br>- <code>deposit</code>=deposit<br>- <code>withdraw</code>=withdraw 
| currency | String | Token symbol, e.g., 'BTC' 
| apply_time | Long | The request timestamp is accurate to milliseconds(UTC-0) 
| arrival_amount | String | Actual amount received 
| fee | String | fee 
| status | Int | status<br>- <code>0</code>=Create<br>- <code>1</code>=Submitted, waiting for withdrawal<br>- <code>2</code>=Processing<br>- <code>3</code>=Done<br>- <code>4</code>=Cancel<br>- <code>5</code>=Fail 
| address | String | address 
| address_memo | String | address tag 
| tx_id | String | Hash record 

1\. The deposit id has a value when \`operation\_type\` = 'deposit'. The withdraw id has a value when \`operation\_type\` = 'withdraw'.  
2\. Tx\_id is an empty string before it is chained.

This interface is not available for sub-account

## Get Margin Account Details(Isolated) (KEYED)

`Applicable for isolated margin account inquiries`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/account`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/account?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BMX_USDT), no symbol is passed, and all isolated margin assets are returned 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "risk_rate": "18.77",           "risk_level": "1",           "buy_enabled": true,           "sell_enabled": true,           "liquidate_price": "-0.09408905",           "liquidate_rate": "1.1",           "base": {             "currency": "BTC",             "borrow_enabled": false,             "borrowed": "2.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "112.89603334",             "frozen": "0.00000000",             "net_asset": "110.89603334",             "net_assetBTC": "0.00000000",             "total_asset": "112.89603334"           },           "quote": {             "currency": "USDT",             "borrow_enabled": true,             "borrowed": "0.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "10.00000000",             "frozen": "0.00000000",             "net_asset": "10.00000000",             "net_assetBTC": "0.00000000",             "total_asset": "10.00000000"           }         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| risk_rate | String | Current risk rate 
| risk_level | String | Risk level 
| buy_enabled | Boolean | Whether open to buy 
| sell_enabled | Boolean | Whether open to sell 
| liquidate_price | String | Liquidation price (precision: 8 decimal places) 
| liquidate_rate | String | Liquidation rate 
| currency | String | Currency 
| borrow_enabled | Boolean | Whether open to borrow 
| borrowed | String | Borrowed assets (precision: 8 decimal places) 
| borrow_unpaid | String | Outstanding principal amount (precision: 8 decimal places) 
| interest_unpaid | String | Interest outstanding (precision: 8 decimal places) 
| available | String | Available assets (precision: 8 decimal places) 
| frozen | String | Trading frozen assets (precision: 8 decimal places) 
| net_asset | String | Net assets (precision: 8 decimal places) 
| net_assetBTC | String | Converted BTC net assets (precision: 8 decimal places) 
| total_asset | String | Total assets (precision: 8 decimal places) 

## Margin Asset Transfer (SIGNED)

`For fund transfers between a margin account and spot account`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1",     "side":"in" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| currency | String | Yes | Currency 
| amount | String | Yes | Amount of transfers (precision: 8 decimal places) 
| side | String | Yes | Transfer direction<br>- <code>in</code>=Transfer in<br>- <code>out</code>=Transfer out 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "transfer_id":"124532"     } }`

| Field | Type | Description |
| --- | --- | --- |
| transfer_id | String | Transfer order id, only successful transfers will be returned 

## Get Basic Fee Rate (KEYED)

`For querying the base rate of the current user`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/user_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/user_fee`

None

#### Response Data

> Response

`{   "message":"OK",   "code":1000,   "trace":"0187ba0c876e4236ac191d9848a0f719.94.16778301620100121",   "data":{     "user_rate_type":0,     "level":"LV1",     "taker_fee_rate_A":"0.001",     "maker_fee_rate_A":"0.001",     "taker_fee_rate_B":"0.0025",     "maker_fee_rate_B":"0.0025",     "taker_fee_rate_C":"0.004",     "maker_fee_rate_C":"0.004",     "taker_fee_rate_D":"0.006",     "maker_fee_rate_D":"0.006"   } }`

| Field | Type | Description |
| --- | --- | --- |
| user_rate_type | Long | Rate type：<br>- <code>0</code>=Normal Users<br>- <code>1</code>=VIP Users<br>- <code>2</code>=Special VIP Users 
| level | String | User Level 
| taker_fee_rate_A | String | Taker fee rate for Class-A pairs 
| maker_fee_rate_A | String | Maker fee rate for Class-A pairs 
| taker_fee_rate_B | String | Taker fee rate for Class-B pairs 
| maker_fee_rate_B | String | Maker fee rate for Class-B pairs 
| taker_fee_rate_C | String | Taker fee rate for Class-C pairs 
| maker_fee_rate_C | String | Maker fee rate for Class-C pairs 
| taker_fee_rate_D | String | Taker fee rate for Class-D pairs 
| maker_fee_rate_D | String | Maker fee rate for Class-D pairs 

## Get Actual Trade Fee Rate (KEYED)

`For the actual fee rate of the trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/trade_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/trade_fee?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "87614aa8-5327-4fe2-aafc-02e2ddca7210",   "data": {     "symbol": "BTC_USDT",     "buy_taker_fee_rate": "0.0008",     "sell_taker_fee_rate": "0.0008",     "buy_maker_fee_rate": "0.0006",     "sell_maker_fee_rate": "0.0006"   } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| buy_taker_fee_rate | String | Taker fee rate (Buy) 
| sell_taker_fee_rate | String | Taker fee rate (Sell) 
| buy_maker_fee_rate | String | Maker fee rate (Buy) 
| sell_maker_fee_rate | String | Maker fee rate (Sell)
