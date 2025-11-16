# Get Account Bills

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get Account bills(It only supports to get the data within 90days. The older data
can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/mix/account/bill

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/bill?productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter   | Type   | Required | Description  |
| :---------- | :----- | :------- | :----------- |
| productType | String | Yes      | Product type |

`USDT-FUTURES` USDT-M Futures  
`COIN-FUTURES` Coin-M Futures  
`USDC-FUTURES` USDC-M Futures | | coin | String | No | Currency  
It's valid only when the `businessType` is "trans_from_exchange" or
"trans_to_exchange" | | businessType | String | No | Business type | |
onlyFunding | String | No | The following four types of non-financial
businessType will be excluded.,default：no，  
`yes`：excluded  
`no`: included;  
The following four
businessType ：`append_margin`,`adjust_down_lever_append_margin`,
`reduce_margin`, `auto_append_margin` | | idLessThan | String | No | Requests
the content on the page before this ID (older data), the value input should be
the endId of the corresponding interface. | | startTime | String | No | Start
time, ms  
The interval between the `startTime` and the `endTime` should be <= 30 days | |
endTime | String | No | End time, ms  
The interval between the `startTime` and the `endTime` should be <= 30 days | |
limit | String | No | Page size, max 100, default 20 |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695809161807,    "data": {        "bills": [            {                "billId": "1",                "symbol": "BTCUSDT",                "amount": "-0.004992",                "fee": "0",                "feeByCoupon": "",                "businessType": "contract_settle_fee",                "coin": "USDT",                "balance":"232.21",                "cTime": "1695715200654"            },            {                "billId": "2",                "symbol": "ETHUSDT",                "amount": "0",                "fee": "-0.222012",                "feeByCoupon": "",                "businessType": "open_long",                "coin": "USDT",                "balance":"232.21",                "cTime": "1695714563516"            }        ],        "endId": "2"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter                                                     | Type   | Description                     |
| :------------------------------------------------------------ | :----- | :------------------------------ |
| bills                                                         | Array  | Bill list                       |
| endId                                                         | String | The final transaction order ID. |
| This is used when idLessThan/idGreaterThan is set as a range. |
| \>billId                                                      | String | Bill ID                         |
| \>symbol                                                      | String | Symbol                          |
| \>amount                                                      | String | Amount                          |
| \>fee                                                         | String | Fee                             |
| \>feeByCoupon                                                 | String | Fee paid by the coupon          |
| \>businessType                                                | String | Business Type                   |
| \>coin                                                        | String | Coin: USDT                      |
| \>balance                                                     | String | Balance                         |
| \>cTime                                                       | String | Created Time, ms                |

`businessType` enumeration:  
unknown: unknown  
trans_from_exchange: transfer in from SPOT account  
trans_to_exchange: transfer out to SPOT account  
open_long: open long  
open_short: open short  
close_long: close long  
close_short: close short  
force_close_long: force close long (when burst)  
force_close_short: force close short (when burst)  
contract_settle_fee: funding fee  
append_margin: adjust margin  
adjust_down_lever_append_margin: reduce leverage add margin  
reduce_margin: reduce margin  
auto_append_margin: automatic margin call  
cash_gift_issue: distribute coupon/gift/card  
cash_gift_recycle: recycling coupon/gift/card  
tracking_follow_pay: follower tracking order pay  
tracking_follow_back: follower tracking order cashback  
tracking_trader_income: tracking order income  
burst_long_loss_query: burst close long  
burst_short_loss_query: burst close short  
trans_from_contract: transfer in from FUTURE account  
trans_to_contract: transfer out to FUTURE account  
trans_from_otc: transfer in from OCT account  
trans_to_otc: transfer out to OCT account  
buy: buy in one_way_mode  
sell: sell in one_way_mode  
force_buy: force buy in one_way_mode  
force_sell: force sell in one_way_mode  
burst_buy: burst buy  
burst_sell: burst sell  
bonus_issue: bonus/coupon issue  
bonus_recycle: bonus/coupon recycle  
bonus_expired: bonus/coupon expired  
delivery_long: delivery future settle long  
delivery_short: delivery future settle short  
trans_from_cross: transfer in from CROSS account  
trans_to_cross: transfer out to CROSS account  
trans_from_isolated: transfer in from ISOLATED account  
trans_to_isolated: transfer out to ISOLATED account  
risk_captital_user_transfer：Insurance fund transfer at user end  
user_exchange_buy：Exchange buy(multi-assets mode)  
user_exchange_sell：Exchange sell(multi-assets mode)  
settle_interest：Interest Settlement

adl_close_long :Auto-Deleveraging closes long positions  
adl_close_short : Auto-Deleveraging closes short positions  
adl_buy_in_single_side_mode :Auto-Deleveraging triggers buy orders  
adl_sell_in_single_side_mode :Auto-Deleveraging triggers sell orders

> **Source:** https://www.bitget.com/api-doc/contract/account/Get-Account-Bill
