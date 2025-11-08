# Get SubAccount Deposit Address

Rate limit: 10 req/sec/UID

### Description[​](#description "Direct link to Description")

Get Sub-account Deposit Address(Please ensure that queried sub-account has deposit permission enabled)

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/wallet/subaccount-deposit-address

Request Example

```
curl "https://api.bitget.com/api/v2/spot/wallet/subaccount-deposit-address?coin=USDT&chain=ERC20&subUid=123" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameter[​](#request-parameter "Direct link to Request Parameter")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subUid | String | Yes | Sub Account Uid<br>You can get the sub-account list via <a href="https://www.bitget.com/api-doc/common/vsubaccount/Get-Virtual-Subaccount-List" target="_blank" rel="noopener noreferrer">Get Virtual Subaccounts</a> interface 
| coin | String | Yes | Coin name, e.g. USDT<br>All coin names can be returned from <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface 
| chain | String | No | Chain name, e.g. trc20<br>You can get the chain names via <a href="https://www.bitget.com/api-doc/spot/market/Get-Coin-List" target="_blank" rel="noopener noreferrer">Get Coin Info</a> interface 
| size | String | No | Bitcoin Lightning Network withdrawal amount，limit：0.000001 - 0.01 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1683875302853,    "data": {        "address": "xxx",        "chain": "BTC-Bitcoin",        "coin": "BTC",        "tag": "",        "url": "https://btc.com/xxx"    }}
```

### Response Parameter[​](#response-parameter "Direct link to Response Parameter")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| address | String | Deposit address 
| chain | String | chain name 
| coin | String | Token name 
| tag | String | Tag 
| url | String | blockchain address

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-SubAccount-Deposit-Address
