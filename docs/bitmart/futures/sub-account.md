# Sub-Account

Sub-Account interface function is currently open to institutional users only, and will be opened gradually

## Sub-Account to Main-Account (For Main Account) (SIGNED)

`Sub-account futures asset transfer to Main-account futures asset (For Main Account)`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"USDT",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/sub-to-main` ``

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currently only <code>USDT</code> is supported 
| subAccount | String | Yes | Sub-Account username 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c1e4e99ff0ec452f8b8bc5f1eb38d733.76.16861963186213159",   "data": {} }`

If code value is 1000,it means the transfer is successful.

## Main-Account to Sub-Account (For Main Account) (SIGNED)

`Main-account futures asset transfer to Sub-account futures asset (For Main Account)`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/main-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/main-to-sub` ``

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currently only <code>USDT</code> is supported 
| subAccount | String | Yes | Sub-Account username 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c1e4e99ff0ec452f8b8bc5f1eb38d733.76.16861963186213159",   "data": {} }`

If code value is 1000,it means the transfer is successful.

## Sub-Account to Main-Account (For Sub-Account) (SIGNED)

`Sub-Account futures asset transfer to Main-Account futures asset (For Sub-Account)`

#### Request URL

`POST https://api-cloud-v2.bitmart.com/account/contract/sub-account/sub/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"USDT" }' https://api-cloud-v2.bitmart.com/account/contract/sub-account/sub/v1/sub-to-main` ``

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currently only <code>USDT</code> is supported 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c1e4e99ff0ec452f8b8bc5f1eb38d733.76.16861970092723253",   "data": {} }`

If code value is 1000,it means the transfer is successful.

## Get Sub-Account Futures Wallet Balance (For Main Account) (KEYED)

`Get Sub-Account futures wallet balance (For Main Account) (KEYED)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/wallet?subAccount=subAccount1@xxx.com&currency=USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subAccount | String | Yes | Sub-Account username 
| currency | String | No | currency 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "87db8cd43374470f96aacb0e3fcaf34c.77.16872314088656435",   "data": {     "wallet": [       {         "currency": "USDT",         "name": "USDT",         "available": "204.15216696",         "frozen": "0.00000000"       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' 
| name | String | Token name, e.g., 'Bitcoin' 
| available | String | Available Balance 
| frozen | String | Frozen Balance 

The return list contains only assets with a balance greater than 0.

## Get Sub-Account Transfer History (For Main Account) (KEYED)

`Query Sub-Account Futures Asset Transfer History (For Main Account)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/transfer-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/transfer-list?subAccount=subAccountName@xxx.com&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subAccount | String | Yes | Sub-Account username 
| limit | Int | Yes | Recent N records, allowed range[1,100] 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "ba950ec2bd114fd7bc069cb812b0129f.62.16887213774200649",   "data": [     {       "fromAccount": "subAccountName@xxx.com",       "toAccount": "masterAccountName@xxx.com",       "toWalletType": "future",       "fromWalletType": "future",       "currency": "USDT",       "amount": "1",       "submissionTime": 1686207254     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| fromAccount | String | Transfer out Sub-Account username 
| fromWalletType | String | Transfer out wallet type<br>-<code>future</code>=futures wallet 
| toAccount | String | Transfer to Sub-Account username 
| toWalletType | String | Transfer to wallet type<br>-<code>future</code>=futures wallet 
| currency | String | currency 
| amount | String | Transfer amount 
| submissionTime | Long | The request timestamp is accurate to seconds(UTC-0) 

## Get Account Futures Asset Transfer History (For Main/Sub Account) (KEYED)

`Get account Futures asset transfer history (For Main/Sub Account)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/v1/transfer-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/v1/transfer-history?limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| limit | Int | Yes | Recent N records, allowed range[1,100] 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "ba950ec2bd114fd7bc069cb812b0129f.62.16887215218140681",   "data": [     {       "fromAccount": "masterAccount@xxx.com",       "toAccount": "subAccount@xxx.com",       "toWalletType": "future",       "fromWalletType": "future",       "currency": "USDT",       "amount": "1",       "submissionTime": 1686207254     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| fromAccount | String | Transfer out Sub-Account username 
| fromWalletType | String | Transfer out wallet type<br>-<code>future</code>=futures wallet 
| toAccount | String | Transfer to Sub-Account username 
| toWalletType | String | Transfer to wallet type<br>-<code>future</code>=futures wallet 
| currency | String | currency 
| amount | String | Transfer amount 
| submissionTime | Long | The request timestamp is accurate to seconds(UTC-0)
