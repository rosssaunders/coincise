# Modify Master API Key

Modify the settings of master api key. Use the api key pending to be modified to
call the endpoint. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this
endpoint..

- master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

info

Only the api key that calls this interface can be modified

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/update-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type    | Comments                                                       |
| :-------- | :------- | :------ | -------------------------------------------------------------- |
| readOnly  | false    | integer | `0` (default)：Read and Write. `1`：Read only                  |
| ips       | false    | string  | Set the IP bind. example: `"192.168.0.1,192.168.0.2"`**note:** |

- don't pass ips or pass with `"*"` means no bind
- No ip bound api key will be **invalid after 90 days**
- api key will be invalid after **7 days** once the account password is changed

| | permissions | false | Object | Tick the types of permission. Don't send this
param if you don't want to change the permission | | \> ContractTrade | false |
array | Contract Trade. `["Order","Position"]` | | \> Spot | false | array |
Spot Trade. `["SpotTrade"]` | | \> Wallet | false | array | Wallet.
`["AccountTransfer","SubMemberTransfer"]` | | \> Options | false | array | USDC
Contract. `["OptionsTrade"]` | | \> Derivatives | false | array | This param is
**deprecated** because system will automatically add this permission according
to your account is UTA or Classic | | \> Exchange | false | array | Convert.
`["ExchangeHistory"]` | | \> Earn | false | array | Earn product. `["Earn"]` | |
\> CopyTrading | false | array | Copytrade. `["CopyTrading"]`, **deprecated** |
| \> BlockTrade | false | array | Blocktrade. `["BlockTrade"]` | | \> NFT |
false | array | Deprecated | | \> Affiliate | false | array | Affiliate.
`["Affiliate"]`

- If you need this permission, make sure you remove all other permissions

|

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter        | Type    | Comments                                                                  |
| :--------------- | :------ | ------------------------------------------------------------------------- |
| id               | string  | Unique id. Internal used                                                  |
| note             | string  | The remark                                                                |
| apiKey           | string  | Api key                                                                   |
| readOnly         | integer | `0`：Read and Write. `1`：Read only                                       |
| secret           | string  | Always `""`                                                               |
| permissions      | Object  | The types of permission                                                   |
| \> ContractTrade | array   | Permisson of contract trade                                               |
| \> Spot          | array   | Permisson of spot                                                         |
| \> Wallet        | array   | Permisson of wallet                                                       |
| \> Options       | array   | Permission of USDC Contract. It supports trade option and usdc perpetual. |
| \> Derivatives   | array   | Permission of Unified account                                             |
| \> CopyTrading   | array   | Permission of copytrade. Not applicable to sub account, always `[]`       |
| \> BlockTrade    | array   | Permission of blocktrade. Not applicable to sub account, always `[]`      |
| \> Exchange      | array   | Permission of convert                                                     |
| \> Earn          | array   | Permission of Earn                                                        |
| \> NFT           | array   | Deprecated, always `[]`                                                   |
| ips              | array   | IP bound                                                                  |

### Request Example[​](#request-example "Direct link to heading")

- Node.js

```bash
POST /v5/user/update-api HTTP/1.1Host: api.bybit.comX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431264739X-BAPI-RECV-WINDOW: 5000X-BAPI-SIGN: XXXXXXContent-Type: application/json{    "readOnly": null,    "ips": "*",    "permissions": {            "ContractTrade": [                "Order",                "Position"            ],            "Spot": [                "SpotTrade"            ],            "Wallet": [                "AccountTransfer",                "SubMemberTransfer"            ],            "Options": [                "OptionsTrade"            ],            "CopyTrading": [                "CopyTrading"            ],            "BlockTrade": [],            "Exchange": [                "ExchangeHistory"            ],            "NFT": [                "NFTQueryProductList"            ]        }}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.modify_master_api_key(    ips="*",    permissions={            "ContractTrade": [                "Order",                "Position"            ],            "Spot": [                "SpotTrade"            ],            "Wallet": [                "AccountTransfer",                "SubMemberTransfer"            ],            "Options": [                "OptionsTrade"            ],            "Derivatives": [                "DerivativesTrade"            ],            "CopyTrading": [                "CopyTrading"            ],            "BlockTrade": [],            "Exchange": [                "ExchangeHistory"            ],            "NFT": [                "NFTQueryProductList"            ]        }))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "xxxxxxxxxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
})
client
  .updateMasterApiKey({
    ips: ["*"],
    permissions: {
      ContractTrade: ["Order", "Position"],
      Spot: ["SpotTrade"],
      Wallet: ["AccountTransfer", "SubMemberTransfer"],
      Options: ["OptionsTrade"],
      Derivatives: ["DerivativesTrade"],
      CopyTrading: ["CopyTrading"],
      BlockTrade: [],
      Exchange: ["ExchangeHistory"],
      NFT: ["NFTQueryProductList"]
    }
  })
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
    "id": "13770661",
    "note": "xxxxx",
    "apiKey": "xxxxx",
    "readOnly": 0,
    "secret": "",
    "permissions": {
      "ContractTrade": ["Order", "Position"],
      "Spot": ["SpotTrade"],
      "Wallet": ["AccountTransfer", "SubMemberTransfer"],
      "Options": ["OptionsTrade"],
      "Derivatives": ["DerivativesTrade"],
      "CopyTrading": ["CopyTrading"],
      "BlockTrade": [],
      "Exchange": ["ExchangeHistory"],
      "Earn": [],
      "NFT": ["NFTQueryProductList"]
    },
    "ips": ["*"]
  },
  "retExtInfo": {},
  "time": 1676431265427
}
```
