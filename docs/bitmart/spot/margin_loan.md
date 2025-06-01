# Margin Loan

## Margin Borrow (Isolated) (SIGNED)

`Applicable to isolated margin account borrowing operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| currency | String | Yes | Borrowing currency, selected according to the borrowing trading pair(like BTC or USDT) 
| amount | String | Yes | Amount of borrowing (precision: 8 decimal places) 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "borrow_id":"113896"     } }`

| Field | Type | Description |
| --- | --- | --- |
| borrow_id | String | Borrowing order ID, only successful borrowing will be returned 

## Margin Repay (Isolated) (SIGNED)

`Applicable to isolated margin account repayment operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| currency | String | Yes | Repayment currency, selected according to the borrowing trading pair(like BTC or USDT) 
| amount | String | Yes | Amount of repayments (precision: 8 decimal places) 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{         "repay_id":"123165"     } }`

| Field | Type | Description |
| --- | --- | --- |
| repay_id | String | Repayment order ID, only successful repayment will be returned 

## Get Borrow Record(Isolated) (KEYED)

`Applicable to the inquiry of borrowing records of an isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| borrow_id | String | No | Borrow order id 
| start_time | Long | No | Query start time: Timestamp 
| end_time | Long | No | Query end time: Timestamp 
| N | Int | No | Query record size, allowed range[1-100]. Default is 50 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "borrow_id": "133425",           "symbol": "BTC_USDT",           "currency": "BTC",           "borrow_amount": "1.23854339",           "daily_interest": "0.05",           "hourly_interest": "0.00208334",           "interest_amount": "0.02398474",           "create_time": 1655345808         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| borrow_id | String | Borrow order id 
| symbol | String | Trading pair 
| currency | String | Currency 
| borrow_amount | String | The total principal amount borrowed (precision: 8 decimal places) 
| daily_interest | String | Daily interest 
| hourly_interest | String | Hourly interest 
| interest_amount | String | Total interest (precision: 8 decimal places) 
| create_time | Long | Order creation time 

## Get Repayment Record(Isolated) (KEYED)

`Applicable to the inquiry of repayment records of isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| repay_id | String | No | Repayment ID 
| currency | String | No | Currency 
| start_time | Long | No | Query start time: Timestamp 
| end_time | Long | No | Query end time: Timestamp 
| N | Int | No | Query record size, allowed range[1-100]. Default is 50 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "repay_id":"118723",           "repay_time":1655345808,           "symbol":"BTC_USDT",           "currency":"BTC",           "repaid_amount":"1.1",           "repaid_principal":"1",           "repaid_interest":"0.1"         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| repay_id | String | Repayment ID 
| repay_time | Long | Repayment Timestamp 
| symbol | String | Repayment trading pairs(like BTC_USDT) 
| currency | String | Repayment currency 
| repaid_amount | String | Repayment amount 
| repaid_principal | String | The principal amount returned by this repayment 
| repaid_interest | String | Interest returned by this repayment 

## Get Trading Pair Borrowing Rate and Amount (KEYED)

`Applicable for checking the borrowing rate and borrowing amount of trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | It can be multiple-choice; if not filled in, then return all, like BTC_USDT, ETH_USDT 

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "max_leverage": "10",           "symbol_enabled": true,           "base": {             "currency": "BTC",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "1000.00000000",             "min_borrow_amount": "1.00000000",             "borrowable_amount": "955.90221219"           },           "quote": {             "currency": "USDT",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "12000.00000000",             "min_borrow_amount": "0.01000000",             "borrowable_amount": "12000.00000000"           }         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| max_leverage | String | Leverage multiplier 
| symbol_enabled | Boolean | Whether the trading pair is enabled 
| currency | String | Currency 
| daily_interest | String | Daily interest 
| hourly_interest | String | Hourly interest 
| max_borrow_amount | String | The maximum amount of borrowing (precision: 8 decimal places) 
| min_borrow_amount | String | The minimum amount of borrowing (precision: 8 decimal places) 
| borrowable_amount | String | The current available amount of borrowing (precision: 8 decimal places)
