# GET Get Transaction History (KEYED)

**Source:**
[Get Transaction History (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Transaction History (KEYED)

`Applicable for querying futures transaction history`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/transaction-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/transaction-history?symbol=BTCUSDT&start_time=1662368173000&end_time=1662368179000`

| Field     | Type   | Required? | Description            |
| --------- | ------ | --------- | ---------------------- |
| symbol    | String | No        | Symbol of the contract |
| flow_type | Int    | No        | Type                   |

\- `0` = All (default)  
\- `1` = Transfer  
\- `2` = Realized PNL  
\- `3` = Funding Fee  
\- `4` = Commission Fee  
\- `5` = Liquidation Clearance | | account | String | No | Trading account  
\-`futures`  
\-`copy_trading` | | start_time | Long | No | Start time(Timestamp in
Milliseconds) | | end_time | Long | No | End time(Timestamp in Milliseconds) | |
page_size | Int | No | Default 100; max 1000 |

- If `start_time` and `end_time` are not sent, only data from the last 7 days
  will be returned.
- If `type` is not sent, all types of account profit and loss transaction
  history will be returned.

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "symbol": "",       "type": "Transfer",       "amount": "-0.37500000",       "asset": "USDT",       "account": "futures",       "time": "1570608000000",       "tran_id": "9689322392"     },     {       "symbol": "BTCUSDT",       "type": "Commission Fee",       "amount": "-0.01000000",       "asset": "USDT",       "account": "futures",       "time": "1570636800000",       "tran_id": "9689322392"     }   ],   "trace": "80ba1f07-1b6f-46ad-81dd-78ac7e9bbccd" }`

| Field     | Type   | Description            |
| --------- | ------ | ---------------------- |
| symbol    | String | Symbol of the contract |
| flow_type | Int    | Type                   |

\- `0` = All (default)  
\- `1` = Transfer  
\- `2` = Realized PNL  
\- `3` = Funding Fee  
\- `4` = Commission Fee  
\- `5` = Liquidation Clearance | | type | String | Type  
\- `Transfer`  
\- `Realized PNL`  
\- `Funding Fee`  
\- `Commission Fee`  
\- `Liquidation Clearance` | | account | String | Trading account  
\-`futures`  
\-`copy_trading` | | amount | String | Amount, supports positive and negative
values | | asset | String | Transaction currency | | time | String | Transaction
timestamp, timestamp in ms | | tran_id | String | Transaction ID |
