# Batch Create Virtual Subaccount and Apikey

Frequency limit: 1 times/1s (User ID)

### Description[​](#description "Direct link to Description")

Create the virtual sub-account and apikey in batch

- The max length of list is 5 in each request.
- Every sub-account can create up to 10 API Key
- You can create up to 20 sub-accounts.

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- POST /api/v2/user/batch-create-subaccount-and-apikey

Request Example

```
curl -X POST "https://api.bitget.com/api/v2/user/batch-create-subaccount-and-apikey" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json" \     -d '[{"subAccountName":"test","passphrase":"12345678","permList":["spot_trade","margin_trade","contract_trade"],"label":"1681808312065"}]'
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter      | Type   | Required | Description                                           |
| :------------- | :----- | :------- | :---------------------------------------------------- |
| subAccountName | String | Yes      | Virtual sub-account alias8-character English letters  |
| passphrase     | String | Yes      | Passcode English letters of 8−32 characters + numbers |
| label          | String | Yes      | Sub-account note Length 20                            |
| ipList         | List   | No       | Virtual sub-account ApiKey ip whitelist, Max. 30      |
| permList       | List   | No       | Sub-account permissions                               |

`spot_trade`: Spot trade  
`margin_trade`: Spot Marign trade  
`contract_trade`: Futures trade read-write  
`read`: Read permissions |

Response Example

```json
{
  "code": "00000",
  "msg": "success",
  "requestTime": 1682662465346,
  "data": [
    {
      "subAccountUid": "***********",
      "subAccountName": "*****@*******.com",
      "label": "1681808312065",
      "subAccountApiKey": "xx_xxx",
      "secretKey": "XXXXXXXXXXXXXXX",
      "permList": ["spot_trade", "margin_trade", "contract_trade"],
      "ipList": ["127.0.0.1"]
    }
  ]
}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter        | Type   | Description                                          |
| :--------------- | :----- | :--------------------------------------------------- |
| subAccountUid    | String | Virtual sub-account Uid                              |
| subAccountName   | String | Virtual sub-account alias8-character English letters |
| label            | String | Sub-account noteLength 20                            |
| subAccountApiKey | String | Sub-account apikey                                   |
| secretKey        | String | Sub-account secret key                               |
| permList         | List   | Sub-account permissions                              |

`spot_trade`: Spot trade  
`margin_trade`: Spot Marign trade  
`contract_trade`: Futures trade read-write  
`read`: Read permissions | | ipList | List | ip whitelist |

> **Source:**
> https://www.bitget.com/api-doc/common/vsubaccount/Batch-Create-Virtual-Subaccount-And-Apikey
