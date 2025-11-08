# GET Get Current Leverage Risk Limit

**Source:** [Get Current Leverage Risk Limit](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Current Leverage Risk Limit

`Applicable for checking the current leverage risk limit of a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/leverage-bracket`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/leverage-bracket?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "rules": [       {         "symbol": "FUNUSDT",         "brackets": [           {             "bracket": 1,             "initial_leverage": 50,             "notional_cap": "10000",             "notional_floor": "0",             "maint_margin_ratio": "0.01",             "cum": "0"           },           {             "bracket": 2,             "initial_leverage": 25,             "notional_cap": "100000",             "notional_floor": "10000",             "maint_margin_ratio": "0.02",             "cum": "100"           },           {             "bracket": 3,             "initial_leverage": 20,             "notional_cap": "200000",             "notional_floor": "100000",             "maint_margin_ratio": "0.025",             "cum": "600"           },           {             "bracket": 4,             "initial_leverage": 16,             "notional_cap": "400000",             "notional_floor": "200000",             "maint_margin_ratio": "0.03125",             "cum": "1850"           },           {             "bracket": 5,             "initial_leverage": 10,             "notional_cap": "700000",             "notional_floor": "400000",             "maint_margin_ratio": "0.05",             "cum": "9350"           },           {             "bracket": 6,             "initial_leverage": 8,             "notional_cap": "1100000",             "notional_floor": "700000",             "maint_margin_ratio": "0.0625",             "cum": "18100"           },           {             "bracket": 7,             "initial_leverage": 5,             "notional_cap": "1600000",             "notional_floor": "1100000",             "maint_margin_ratio": "0.1",             "cum": "59350"           },           {             "bracket": 8,             "initial_leverage": 4,             "notional_cap": "2200000",             "notional_floor": "1600000",             "maint_margin_ratio": "0.125",             "cum": "99350"           },           {             "bracket": 9,             "initial_leverage": 2,             "notional_cap": "2900000",             "notional_floor": "2200000",             "maint_margin_ratio": "0.25",             "cum": "374350"           },           {             "bracket": 10,             "initial_leverage": 1,             "notional_cap": "3700000",             "notional_floor": "2900000",             "maint_margin_ratio": "0.5",             "cum": "1099350"           }         ]       }     ]   },   "trace": "02bae860-de73-4a82-a1f5-fe38cd769275" }`

| Field | Type | Description |
| --- | --- | --- |
| bracket | Int | Risk bracket / Margin tier |
| initial\_leverage | Int | Maximum leverage in this bracket |
| notional\_cap | String | Maximum notional value in this bracket |
| notional\_floor | String | Minimum notional value in this bracket |
| maint\_margin\_ratio | String | Maintenance margin ratio |
| cum | String | Cumulative maintenance margin amount |