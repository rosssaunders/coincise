# Get Order Info

Frequency limit: 20 times/1s (UID)

### Description[​](#description "Direct link to Description")

Get Order Info

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/trade/orderInfo

Request Example

```
curl "https://api.bitget.com/api/v2/spot/trade/orderInfo?orderId=1234567890" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| orderId | String | No | Either Order ID or clientOids is required. 
| clientOid | String | No | Either Client customized ID or orderId is required. 
| requestTime | String | No | request Time Unix millisecond timestamp 
| receiveWindow | String | No | valid window period Unix millisecond timestamp Unix millisecond timestamp 

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1695865476577,  "data": [    {      "userId": "**********",      "symbol": "BTCUSDT",      "orderId": "121211212122",      "clientOid": "121211212122",      "price": "0",      "size": "10.0000000000000000",      "orderType": "market",      "side": "buy",      "status": "filled",      "priceAvg": "13000.0000000000000000",      "baseVolume": "0.0007000000000000",      "quoteVolume": "9.1000000000000000",      "enterPointSource": "API",      "feeDetail": "{\"BGB\":{\"deduction\":true,\"feeCoinCode\":\"BGB\",\"totalDeductionFee\":-0.0041,\"totalFee\":-0.0041},\"newFees\":{\"c\":0,\"d\":0,\"deduction\":false,\"r\":-0.112079256,\"t\":-0.112079256,\"totalDeductionFee\":0}}",      "orderSource": "market",      "cancelReason": "",      "cTime": "1695865232127",      "uTime": "1695865233051"    }  ]}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| userId | String | Account id 
| symbol | String | Trading pair name 
| orderId | String | Order ID 
| clientOid | String | Customized ID 
| price | String | Order price 
| size | String | Amount<br>Limit represents the number of base coins.<br>market-buy represents the number of quote coins.<br>market-sell represents the number of base coins. 
| orderType | String | Order type<br>limit Limit price<br>market Market price 
| side | String | Direction 
| status | String | Order status<br><code>live</code>: pending match<br><code>partially_filled</code>: Partially filled<br><code>filled</code>: All filled<br><code>cancelled</code>: The order is cancelled 
| priceAvg | String | Filled price 
| baseVolume | String | Filled quantity (base coin) 
| quoteVolume | String | Total trading amount (quote coin) 
| enterPointSource | String | Client<br>WEB WEB Client<br>APP APP Client<br>API API Client<br>SYS SYS Client<br>ANDROID ANDROID Client<br>IOS IOS Client 
| cTime | String | Creation time, Unix millisecond timestamp, e.g. 1690196141868 
| uTime | String | Update time, Unix millisecond timestamp, e.g. 1690196141868 
| orderSource | String | Order source<br>normal Normal order<br>market Market order<br>spot_trader_buy Elite spot trade to buy (elite traders)<br>spot_follower_buy Copy trade to buy (followers)<br>spot_trader_sell Elite spot trade to sell (elite traders)<br>spot_follower_sell Copy trade to sell (followers) 
| feeDetail | String | Transaction fee breakdown 
| &gt; newFees | String | Fee details for "newFees". 
| &gt;&gt; c | String | Amount deducted by coupons, unit：currency obtained from the transaction. 
| &gt;&gt; d | String | Amount deducted in BGB (Bitget Coin), unit：BGB 
| &gt;&gt; r | String | If the BGB balance is insufficient to cover the fees, the remaining amount is deducted from the currency obtained from the transaction. 
| &gt;&gt; t | String | The total fee amount to be paid, unit ：currency obtained from the transaction. 
| &gt;&gt; deduction | String | Ignore. 
| &gt;&gt; totalDeductionFee | String | Ignore. 
| &gt; BGB | String | If there is no "newFees" field, this data represents earlier historical data. This key represents the currency used for fee deduction (it is not fixed; if BGB deduction is enabled, it's BGB, otherwise, it's the currency obtained from the transaction). 
| &gt;&gt; deduction | String | Whether there is a fee deduction. 
| &gt;&gt; feeCoinCode | String | Transaction fee coin code 
| &gt;&gt; totalDeductionFee | String | Deduction amount unit： BGB 
| &gt;&gt; totalFee | String | The total fee amount to be paid, unit：currency obtained from the transaction. 
| cancelReason | String | Cancel reason<br><code>normal_cancel</code>: Normal cancel<br><code>stp_cancel</code>: Cancelled by STP

> **Source:** https://www.bitget.com/api-doc/spot/trade/Get-Order-Info
