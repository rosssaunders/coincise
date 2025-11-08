# Withdraw

Rate limit:5 req/sec/UID

### Description[​](#description "Direct link to Description")

*   Coin withdrawals including on-chain withdrawals and internal transfers(the address needs to be added in the address book on web)
*   KYC: For users in Korea, please note that if you withdraw funds to an account address on a Korean exchange and the amount is significant, the following 5 parameters can be referenced for completion: `memberCode`, `identityType`, `companyName`, `firstName`, and `lastName`.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   POST /api/v2/spot/wallet/withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/withdrawal" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json" \  -d '{"coin": "USDT","transferType":"on_chain","address": "*******************************************","chain": "trc20","size": "0.009"}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | Yes | Coin<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface 
| transferType | String | Yes | The type of withdrawal<br><code>on_chain</code>: withdrawal on chain<br><code>internal_transfer</code>: Transfer internally 
| address | String | Yes | Withdrawal address<br>when <code>transferType</code> is <code>on_chain</code>, it represents the chain address<br>When <code>transferType</code> is <code>internal_transfer</code>, according the <code>innerToType</code> parameter, please input the UID, email or the mobile 
| chain | String | No | Chain network e.g. erc20, trc20, etc.<br>This field must be passed when the <code>transferType</code> is <code>on-chain</code>.<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface 
| innerToType | String | No | Type of address for internal withdrawals<br><code>email</code>: Email address<br><code>mobile</code>: Mobile phone number<br><code>uid</code>: UID<br>The default value is uid 
| areaCode | String | No | This field is required when the value of the collection address type is <code>mobile</code> 
| tag | String | No | Address tag<br>Some special coins need this field, e.g. EOS 
| size | String | Yes | Withdrawal amount<br>Special instructions for Bitcoin Lightning Network withdrawals:<br>1.This parameter must be filled in with a value that is equal to the deposit amount of your invoice on the Bitcoin Lightning Network;<br>2.The value of size is the credited amount, excluding fees;<br>The decimal places of withdrawal amount will be returned by the <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface 
| remark | String | No | Note 
| clientOid | String | No | Client Unique Customized Id 
| memberCode | String | No | Support：<br><code>bithumb</code><br><code>korbit</code><br><code>coinone</code><br> 
| identityType | String | No | Normal user：<code>user</code> company：<code>company</code> 
| companyName | String | No | Company name 
| firstName | String | No | First Name 
| lastName | String | No | Last name 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "123",        "clientOid": "123"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID 
| clientOid | String | Custom order ID

> **Source:** https://www.bitget.com/api-doc/spot/account/Wallet-Withdrawal
