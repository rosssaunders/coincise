# Get Coin Info

Frequency limit: 3 times/1s (IP)

### Description[​](#description "Direct link to Description")

Get spot coin information,supporting both individual and full queries.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/spot/public/coins

Request Example

```
curl "https://api.bitget.com/api/v2/spot/public/coins"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| coin | String | No | Coin name, If the field is left blank, all coin information will be returned by default |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1695799900330,
  "data": [
    {
      "coinId": "1",
      "coin": "BTC",
      "transfer": "true",
      "chains": [
        {
          "chain": "BTC",
          "needTag": "false",
          "withdrawable": "true",
          "rechargeable": "true",
          "withdrawFee": "0.005",
          "extraWithdrawFee": "0",
          "depositConfirm": "1",
          "withdrawConfirm": "1",
          "minDepositAmount": "0.001",
          "minWithdrawAmount": "0.001",
          "browserUrl": "https://blockchair.com/bitcoin/testnet/transaction/",
          "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "withdrawStep": "0",
          "withdrawMinScale": "8",
          "congestion": "normal"
        }
      ]
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| coinId | String | Currency ID |
| coin | String | Token name |
| transfer | Boolean | Transferability |
| chains | Array | Support chain list |
| \> chain | String | Chain name |
| \> needTag | Boolean | Need tag |
| \> withdrawable | Boolean | Withdrawal supported |
| \> rechargeable | Boolean | Deposit supported |
| \> withdrawFee | String | Withdrawal transaction fee |
| \> extraWithdrawFee | String | Extra charge. On chain destruction: `0.1` means `10%` |
| \> depositConfirm | String | Deposit confirmation blocks |
| \> withdrawConfirm | String | Withdrawal confirmation blocks |
| \> minDepositAmount | String | Minimum deposit amount |
| \> minWithdrawAmount | String | Minimum withdrawal amount |
| \> browserUrl | String | Blockchain explorer address |
| \> contractAddress | String | coin contract address |
| \> withdrawStep | String | withdrawal count step  
If the value is not 0, it indicates that the withdraswl size should be multiple of the value.  
if it's 0, that means there is no the limit above. |
| \> withdrawMinScale | String | Decimal places of withdrawal amount |
| \> congestion | String | chain network status  
`normal`: normal  
`congested`: congestion |

> **Source:** https://www.bitget.com/api-doc/spot/market/Get-Coin-List
