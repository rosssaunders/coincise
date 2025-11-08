# Get Account Bills

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get Account bills(It only supports to get the data within 90days. The older data can be downloaded from web)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/mix/account/bill

Request Example

```
curl "https://api.bitget.com/api/v2/mix/account/bill?productType=USDT-FUTURES" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| productType | String | Yes | Product type<br><code>USDT-FUTURES</code> USDT-M Futures<br><code>COIN-FUTURES</code> Coin-M Futures<br><code>USDC-FUTURES</code> USDC-M Futures 
| coin | String | No | Currency<br>It's valid only when the <code>businessType</code> is "trans_from_exchange" or "trans_to_exchange" 
| businessType | String | No | Business type 
| onlyFunding | String | No | The following four types of non-financial businessType will be excluded.,default：no，<br><code>yes</code>：excluded<br><code>no</code>: included;<br>The following four businessType ：<code>append_margin</code>,<code>adjust_down_lever_append_margin</code>, <code>reduce_margin</code>, <code>auto_append_margin</code> 
| idLessThan | String | No | Requests the content on the page before this ID (older data), the value input should be the endId of the corresponding interface. 
| startTime | String | No | Start time, ms<br>The interval between the <code>startTime</code> and the <code>endTime</code> should be &lt;= 30 days 
| endTime | String | No | End time, ms<br>The interval between the <code>startTime</code> and the <code>endTime</code> should be &lt;= 30 days 
| limit | String | No | Page size, max 100, default 20 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695809161807,    "data": {        "bills": [            {                "billId": "1",                "symbol": "BTCUSDT",                "amount": "-0.004992",                "fee": "0",                "feeByCoupon": "",                "businessType": "contract_settle_fee",                "coin": "USDT",                "balance":"232.21",                "cTime": "1695715200654"            },            {                "billId": "2",                "symbol": "ETHUSDT",                "amount": "0",                "fee": "-0.222012",                "feeByCoupon": "",                "businessType": "open_long",                "coin": "USDT",                "balance":"232.21",                "cTime": "1695714563516"            }        ],        "endId": "2"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| bills | Array | Bill list 
| endId | String | The final transaction order ID.<br>This is used when idLessThan/idGreaterThan is set as a range. 
| &gt;billId | String | Bill ID 
| &gt;symbol | String | Symbol 
| &gt;amount | String | Amount 
| &gt;fee | String | Fee 
| &gt;feeByCoupon | String | Fee paid by the coupon 
| &gt;businessType | String | Business Type 
| &gt;coin | String | Coin: USDT 
| &gt;balance | String | Balance 
| &gt;cTime | String | Created Time, ms 

`businessType` enumeration:  
unknown: unknown  
trans\_from\_exchange: transfer in from SPOT account  
trans\_to\_exchange: transfer out to SPOT account  
open\_long: open long  
open\_short: open short  
close\_long: close long  
close\_short: close short  
force\_close\_long: force close long (when burst)  
force\_close\_short: force close short (when burst)  
contract\_settle\_fee: funding fee  
append\_margin: adjust margin  
adjust\_down\_lever\_append\_margin: reduce leverage add margin  
reduce\_margin: reduce margin  
auto\_append\_margin: automatic margin call  
cash\_gift\_issue: distribute coupon/gift/card  
cash\_gift\_recycle: recycling coupon/gift/card  
tracking\_follow\_pay: follower tracking order pay  
tracking\_follow\_back: follower tracking order cashback  
tracking\_trader\_income: tracking order income  
burst\_long\_loss\_query: burst close long  
burst\_short\_loss\_query: burst close short  
trans\_from\_contract: transfer in from FUTURE account  
trans\_to\_contract: transfer out to FUTURE account  
trans\_from\_otc: transfer in from OCT account  
trans\_to\_otc: transfer out to OCT account  
buy: buy in one\_way\_mode  
sell: sell in one\_way\_mode  
force\_buy: force buy in one\_way\_mode  
force\_sell: force sell in one\_way\_mode  
burst\_buy: burst buy  
burst\_sell: burst sell  
bonus\_issue: bonus/coupon issue  
bonus\_recycle: bonus/coupon recycle  
bonus\_expired: bonus/coupon expired  
delivery\_long: delivery future settle long  
delivery\_short: delivery future settle short  
trans\_from\_cross: transfer in from CROSS account  
trans\_to\_cross: transfer out to CROSS account  
trans\_from\_isolated: transfer in from ISOLATED account  
trans\_to\_isolated: transfer out to ISOLATED account  
risk\_captital\_user\_transfer：Insurance fund transfer at user end  
user\_exchange\_buy：Exchange buy(multi-assets mode)  
user\_exchange\_sell：Exchange sell(multi-assets mode)  
settle\_interest：Interest Settlement

  
adl\_close\_long :Auto-Deleveraging closes long positions  
adl\_close\_short : Auto-Deleveraging closes short positions  
adl\_buy\_in\_single\_side\_mode :Auto-Deleveraging triggers buy orders  
adl\_sell\_in\_single\_side\_mode :Auto-Deleveraging triggers sell orders

> **Source:** https://www.bitget.com/api-doc/contract/account/Get-Account-Bill
