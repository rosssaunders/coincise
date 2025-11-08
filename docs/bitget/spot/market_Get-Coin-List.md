# Get Coin Info

Frequency limit: 3 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot coin information,supporting both individual and full queries.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

*   GET /api/v2/spot/public/coins

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/coins"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Coin name, If the field is left blank, all coin information will be returned by default 

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695799900330,    "data": [        {            "coinId": "1",            "coin": "BTC",            "transfer": "true",            "chains": [                {                    "chain": "BTC",                    "needTag": "false",                    "withdrawable": "true",                    "rechargeable": "true",                    "withdrawFee": "0.005",                    "extraWithdrawFee": "0",                    "depositConfirm": "1",                    "withdrawConfirm": "1",                    "minDepositAmount": "0.001",                    "minWithdrawAmount": "0.001",                    "browserUrl": "https://blockchair.com/bitcoin/testnet/transaction/",                    "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",                    "withdrawStep": "0",                    "withdrawMinScale": "8",                    "congestion":"normal"                }            ]        }    ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coinId | String | Currency ID 
| coin | String | Token name 
| transfer | Boolean | Transferability 
| chains | Array | Support chain list 
| &gt; chain | String | Chain name 
| &gt; needTag | Boolean | Need tag 
| &gt; withdrawable | Boolean | Withdrawal supported 
| &gt; rechargeable | Boolean | Deposit supported 
| &gt; withdrawFee | String | Withdrawal transaction fee 
| &gt; extraWithdrawFee | String | Extra charge. On chain destruction: <code>0.1</code> means <code>10%</code> 
| &gt; depositConfirm | String | Deposit confirmation blocks 
| &gt; withdrawConfirm | String | Withdrawal confirmation blocks 
| &gt; minDepositAmount | String | Minimum deposit amount 
| &gt; minWithdrawAmount | String | Minimum withdrawal amount 
| &gt; browserUrl | String | Blockchain explorer address 
| &gt; contractAddress | String | coin contract address 
| &gt; withdrawStep | String | withdrawal count step<br>If the value is not 0, it indicates that the withdraswl size should be multiple of the value.<br>if it's 0, that means there is no the limit above. 
| &gt; withdrawMinScale | String | Decimal places of withdrawal amount 
| &gt; congestion | String | chain network status<br><code>normal</code>: normal<br><code>congested</code>: congestion

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Coin-List
