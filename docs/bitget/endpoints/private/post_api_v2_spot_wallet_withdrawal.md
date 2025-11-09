# Withdraw

Rate limit:5 req/sec/UID

### Description[​](#description "Direct link to Description")

-   Coin withdrawals including on-chain withdrawals and internal transfers(the address needs to be added in the address book on web)
-   KYC: For users in Korea, please note that if you withdraw funds to an account address on a Korean exchange and the amount is significant, the following 5 parameters can be referenced for completion: `memberCode`, `identityType`, `companyName`, `firstName`, and `lastName`.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   POST /api/v2/spot/wallet/withdrawal

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/spot/wallet/withdrawal" \  -H "ACCESS-KEY:your apiKey" \  -H "ACCESS-SIGN:*" \  -H "ACCESS-PASSPHRASE:*" \  -H "ACCESS-TIMESTAMP:1659076670000" \  -H "locale:en-US" \  -H "Content-Type: application/json" \  -d '{"coin": "USDT","transferType":"on_chain","address": "*******************************************","chain": "trc20","size": "0.009"}
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | Yes | Coin  
All coin names can be returned from [Get Coin Info](https://www.bitget.com/api-doc/spot/market/Get-Coin-List) interface |
| transferType | String | Yes | The type of withdrawal  
`on_chain`: withdrawal on chain  
`internal_transfer`: Transfer internally |
| address | String | Yes | Withdrawal address  
when `transferType` is `on_chain`, it represents the chain address  
When `transferType` is `internal_transfer`, according the `innerToType` parameter, please input the UID, email or the mobile |
| chain | String | No | Chain network e.g. erc20, trc20, etc.  
This field must be passed when the `transferType` is `on-chain`.  
You can get the chain names via [Get Coin Info](https://www.bitget.com/api-doc/spot/market/Get-Coin-List) interface |
| innerToType | String | No | Type of address for internal withdrawals  
`email`: Email address  
`mobile`: Mobile phone number  
`uid`: UID  
The default value is uid |
| areaCode | String | No | This field is required when the value of the collection address type is `mobile` |
| tag | String | No | Address tag  
Some special coins need this field, e.g. EOS |
| size | String | Yes | Withdrawal amount  
Special instructions for Bitcoin Lightning Network withdrawals:  
1.This parameter must be filled in with a value that is equal to the deposit amount of your invoice on the Bitcoin Lightning Network;  
2.The value of size is the credited amount, excluding fees;  
The decimal places of withdrawal amount will be returned by the [Get Coin Info](https://www.bitget.com/api-doc/spot/market/Get-Coin-List) interface |
| remark | String | No | Note |
| clientOid | String | No | Client Unique Customized Id |
| memberCode | String | No | Support：  
`bithumb`  
`korbit`  
`coinone`  
 |
| identityType | String | No | Normal user：`user` company：`company` |
| companyName | String | No | Company name |
| firstName | String | No | First Name |
| lastName | String | No | Last name |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "orderId": "123",        "clientOid": "123"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| orderId | String | Order ID |
| clientOid | String | Custom order ID |

> **Source:** https://www.bitget.com/api-doc/spot/account/Wallet-Withdrawal
