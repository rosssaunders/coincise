# Sub-Account

Sub-Account interface function is currently open to institutional users only, and will be opened gradually

## Sub-Account to Main-Account (For Main Account) (SIGNED)

`Sub-account spot asset transfer to Main-account (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-main`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currency 
| subAccount | String | Yes | Sub-Account username 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Sub-Account to Main-Account (For Sub-Account) (SIGNED)

`Sub-Account spot asset transfer to Main-Account spot asset (For Sub-Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/sub/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC" }' https://api-cloud.bitmart.com/account/sub-account/sub/v1/sub-to-main`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currency 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Main-Account to Sub-Account (For Main Account) (SIGNED)

`Main-account spot asset transfer to Sub-account spot asset (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/main-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/main-to-sub`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currency 
| subAccount | String | Yes | Sub-Account username 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Sub-Account to Sub-Account (For Main Account) (SIGNED)

`Sub-Account spot asset transfer to Sub-Account spot asset (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "fromAccount":"subAccountName1@xxx.com",     "toAccount":"subAccountName2@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| requestNo | String | Yes | UUID,unique identifier, max length 64 
| amount | String | Yes | Transfer amount 
| currency | String | Yes | Currency 
| fromAccount | String | Yes | Transfer out Sub-Account username 
| toAccount | String | Yes | Transfer to Sub-Account username 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Get Sub-Account Transfer History (For Main Account) (KEYED)

`Query Sub-Account Spot Asset Transfer History (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/transfer-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/transfer-list?moveType=spot to spot`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| moveType | String | Yes | type<br>-<code>spot to spot</code>=Spot wallet transfer to spot wallet 
| accountName | String | No | Sub-Account username (default: all sub-accounts will be queried) 
| N | Int | Yes | Recent N records, allowed range[1,100] 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "282fd16e-73ee-464f-adb7-7241345929f6",   "data": {     "total": 2,     "historyList": [       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "1",         "submissionTime": 1648471522       },       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "30",         "submissionTime": 1648466178       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| fromAccount | String | Transfer out Sub-Account username 
| fromWalletType | String | Transfer out wallet type<br>-<code>spot</code>=spot wallet 
| toAccount | String | Transfer to Sub-Account username 
| toWalletType | String | Transfer to wallet type<br>-<code>spot</code>=spot wallet 
| currency | String | currency 
| amount | String | Transfer amount 
| submissionTime | Long | The request timestamp is accurate to seconds(UTC-0) 

Note: Only the data for the last 3 months can be queried

## Get Account Spot Asset Transfer History (For Main/Sub Account) (KEYED)

`Get account spot asset transfer history (For Main/Sub Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history?moveType=spot to spot`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| moveType | String | Yes | type<br>-<code>spot to spot</code>=Spot wallet transfer to spot wallet 
| N | Int | Yes | Recent N records, allowed range[1,100] 

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "282fd16e-73ee-464f-adb7-7241345929f6",   "data": {     "total": 2,     "historyList": [       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "1",         "submissionTime": 1648471522       },       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "30",         "submissionTime": 1648466178       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| fromAccount | String | Transfer out Sub-Account username 
| fromWalletType | String | Transfer out wallet type<br>-<code>spot</code>=spot wallet 
| toAccount | String | Transfer to Sub-Account username 
| toWalletType | String | Transfer to wallet type<br>-<code>spot</code>=spot wallet 
| currency | String | currency 
| amount | String | Transfer amount 
| submissionTime | Long | The request timestamp is accurate to seconds(UTC-0) 

Note: Only the data for the last 3 months can be queried

## Get Sub-Account Spot Wallet Balance (For Main Account) (KEYED)

`Get Sub-Account spot wallet balance (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet?subAccount=subAccount1@xxx.com`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| subAccount | String | Yes | Sub-Account username 
| currency | String | No | currency 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"ef834248-51d3-4223-9481-f862aa9dd39f",     "data":{         "wallet":[             {                 "currency":"USDT",                 "name":"Tether USD",                 "available":"1000.00000000",                 "frozen":"0.00000000"             },             {                 "currency":"BTC",                 "name":"Bitcoin",                 "available":"10000.00000000",                 "frozen":"10.00000000"             }         ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| currency | String | Token symbol, e.g., 'BTC' 
| name | String | Token name, e.g., 'Bitcoin' 
| available | String | Available Balance 
| frozen | String | Frozen Balance 

The return list contains only assets with a balance greater than 0.

## Get Sub-Account List (For Main Account) (KEYED)

`Get Sub-Account list (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c03c22c3-75db-4aaa-9500-6dcd63dd9ccf",   "data": {     "subAccountList": [       {         "accountName": "subAccount1@xxx.com",         "status": 1       },       {         "accountName": "subAccount2@xxx.com",         "status": 1       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| accountName | String | Sub-Account username 
| status | Int | Account Status<br>-<code>0</code>=disabled in background<br>-<code>1</code>=normal<br>-<code>2</code>=frozen by main account
