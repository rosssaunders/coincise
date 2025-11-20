# Get Sub Account All API Keys

Query all api keys information of a sub UID.

tip

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/user/sub-apikeys`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter   | Required | Type    | Comments                                                                                             |
| :---------- | :------- | :------ | ---------------------------------------------------------------------------------------------------- |
| subMemberId | **true** | string  | Sub UID                                                                                              |
| limit       | false    | integer | Limit for data size per page. \[`1`, `20`\]. Default: `20`                                           |
| cursor      | false    | string  | Cursor. Use the `nextPageCursor` token from the response to retrieve the next page of the result set |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter         | Type           | Comments                                                                                                      |
| :---------------- | :------------- | ------------------------------------------------------------------------------------------------------------- |
| result            | array          | Object                                                                                                        |
| \> id             | string         | Unique ID. Internal use                                                                                       |
| \> ips            | array<string\> | IP bound                                                                                                      |
| \> apiKey         | string         | Api key                                                                                                       |
| \> note           | string         | The remark                                                                                                    |
| \> status         | integer        | `1`: permanent, `2`: expired, `3`: within the validity period, `4`: expires soon (less than 7 days)           |
| \> expiredAt      | datetime       | The expiry day of the api key. Only for those api key with no IP bound or the password has been changed       |
| \> createdAt      | datetime       | The create day of the api key                                                                                 |
| \> type           | integer        | The type of api key. `1`: personal, `2`: connected to the third-party app                                     |
| \> permissions    | Object         | The types of permission                                                                                       |
| \>> ContractTrade | array          | Permission of contract trade `Order`, `Position`                                                              |
| \>> Spot          | array          | Permission of spot `SpotTrade`                                                                                |
| \>> Wallet        | array          | Permission of wallet `AccountTransfer`, `SubMemberTransferList`                                               |
| \>> Options       | array          | Permission of USDC Contract. It supports trade option and USDC perpetual. `OptionsTrade`                      |
| \>> Derivatives   | array          | Unified account api key have this permission by default. `DerivativesTrade`                                   |
| \>> Exchange      | array          | Permission of convert `ExchangeHistory`                                                                       |
| \>> Earn          | array          | Permission of earn product `Earn`                                                                             |
| \>> CopyTrading   | array          | Always `[]`, Master Trader uses "Contract" permission to start Copytrading                                    |
| \>> BlockTrade    | array          | Permission of blocktrade. Not applicable to subaccount, always `[]`                                           |
| \>> NFT           | array          | Deprecated, always `[]`                                                                                       |
| \>> Affiliate     | array          | Permission of Affiliate. Not applicable to sub account, always `[]`                                           |
| \> secret         | string         | Always `"******"`                                                                                             |
| \> readOnly       | boolean        | `true`, `false`                                                                                               |
| \> deadlineDay    | integer        | The remaining valid days of api key. Only for those api key with no IP bound or the password has been changed |
| \> flag           | string         | Api key type                                                                                                  |
| nextPageCursor    | string         | Refer to the `cursor` request parameter                                                                       |

[RUN >>](/docs/api-explorer/v5/user/list-sub-apikeys)

---

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
GET /v5/user/sub-apikeys?subMemberId=100400345 HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1699515251088X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json
```

```

```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .getSubAccountAllApiKeys({ subMemberId: "subUID", limit: 20 })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "result": [
      {
        "id": "24828209",
        "ips": ["*"],
        "apiKey": "XXXXXX",
        "note": "UTA",
        "status": 3,
        "expiredAt": "2023-12-01T02:36:06Z",
        "createdAt": "2023-08-25T06:42:39Z",
        "type": 1,
        "permissions": {
          "ContractTrade": ["Order", "Position"],
          "Spot": ["SpotTrade"],
          "Wallet": ["AccountTransfer", "SubMemberTransferList"],
          "Options": ["OptionsTrade"],
          "Derivatives": ["DerivativesTrade"],
          "CopyTrading": [],
          "BlockTrade": [],
          "Exchange": ["ExchangeHistory"],
          "NFT": [],
          "Affiliate": [],
          "Earn": []
        },
        "secret": "******",
        "readOnly": false,
        "deadlineDay": 21,
        "flag": "hmac"
      }
    ],
    "nextPageCursor": ""
  },
  "retExtInfo": {},
  "time": 1699515251698
}
```
