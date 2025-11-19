# Get Subaccount Apikey List

Rate Limit: 5 req/sec/UID

### Description[​](#description "Direct link to Description")

Only supports API Key calls from the main account, and the API Key needs to be bound to an IP address

Support to get virtual sub-account or general sub-account API Key list

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/user/virtual-subaccount-apikey-list

Request Example

```
curl -X GET "https://api.bitget.com/api/v2/user/virtual-subaccount-apikey-list?subAccountUid=1" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" 
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| subAccountUid | String | Yes | Sub-account uid |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1682661432874,
  "data": [
    {
      "subAccountUid": "1",
      "label": "1682396356594",
      "subAccountApiKey": "xx_xxx",
      "permList": [
        "spot_trade",
        "margin_trade",
        "contract_trade"
      ],
      "ipList": [
        "127.0.0.1"
      ]
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| subAccountUid | String | Sub-account uid |
| subAccountApiKey | String | Sub-account ApiKey |
| permList | List | Sub-account permissions  
`spot_trade`: Spot trade  
`margin_trade`: Spot Marign trade  
`contract_trade`: Futures trade read-write  
`transfer`:Wallet transfer  
`read`: Read permissions |
| label | String | Sub-account apikey note |
| ipList | List | ip whitelist |

> **Source:** https://www.bitget.com/api-doc/common/vsubaccount/Get-Virtual-Subaccount-ApiKey-List
