# Modify Sub API Key

Modify the settings of sub api key. Use the sub account api key pending to be modified to call the endpoint or use master account api key to manage its sub account api key.

tip

The API key must have one of the below permissions in order to call this endpoint

-   sub API key: "Account Transfer", "Sub Member Transfer"
-   master API Key: "Account Transfer", "Sub Member Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/update-sub-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| apikey | false | string | Sub account api key

-   If you use corresponding sub uid api key call this endpoint, `apikey` param cannot be passed, otherwise throwing an error

 |
| readOnly | false | integer | `0` (default)：Read and Write. `1`：Read only |
| ips | false | string | Set the IP bind. example: `"192.168.0.1,192.168.0.2"`**note:**

-   don't pass ips or pass with `"*"` means no bind
-   No ip bound api key will be **invalid after 90 days**
-   api key will be invalid after **7 days** once the account password is changed

 |
| permissions | false | Object | Tick the types of permission. Don't send this param if you don't want to change the permission |
| \> ContractTrade | false | array | Contract Trade. `["Order","Position"]` |
| \> Spot | false | array | Spot Trade. `["SpotTrade"]` |
| \> Wallet | false | array | Wallet. `["AccountTransfer", "SubMemberTransferList"]`  
*Note: fund custodial account is not supported* |
| \> Options | false | array | USDC Contract. `["OptionsTrade"]` |
| \> Derivatives | false | array | This param is **deprecated** because system will automatically add this permission according to your account is UTA or Classic |
| \> Exchange | false | array | Convert. `["ExchangeHistory"]` |
| \> Earn | false | array | Earn product. `["Earn"]` |
| \> CopyTrading | false | array | Copytrade. `["CopyTrading"]` |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| id | string | Unique id. Internal used |
| note | string | The remark |
| apiKey | string | Api key |
| readOnly | integer | `0`：Read and Write. `1`：Read only |
| secret | string | Always `""` |
| permissions | Object | The types of permission |
| \> ContractTrade | array | Permisson of contract trade |
| \> Spot | array | Permisson of spot |
| \> Wallet | array | Permisson of wallet |
| \> Options | array | Permission of USDC Contract. It supports trade option and usdc perpetual. |
| \> Derivatives | array | Permission of Unified account |
| \> CopyTrading | array | Permission of copytrade |
| \> BlockTrade | array | Permission of blocktrade. Not applicable to sub account, always `[]` |
| \> Exchange | array | Permission of convert |
| \> Earn | array | Permission of Earn |
| \> NFT | array | Deprecated, always `[]` |
| ips | array | IP bound |

### Request Example[​](#request-example "Direct link to heading")

```bash
POST /v5/user/update-sub-api HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676431795752X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "readOnly": 0,    "ips": "*",    "permissions": {            "ContractTrade": [],            "Spot": [                "SpotTrade"            ],            "Wallet": [                "AccountTransfer"            ],            "Options": [],            "CopyTrading": [],            "BlockTrade": [],            "Exchange": [],            "NFT": []        }}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.modify_sub_api_key(    readOnly=0,    ips="*",    permissions={            "ContractTrade": [],            "Spot": [                "SpotTrade"            ],            "Wallet": [                "AccountTransfer"            ],            "Options": [],            "Derivatives": [],            "CopyTrading": [],            "BlockTrade": [],            "Exchange": [],            "NFT": []        }))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: "YOUR_API_KEY",  secret: "YOUR_API_SECRET",});client  .updateSubApiKey({    readOnly: 0,    ips: ['*'],    permissions: {      ContractTrade: [],      Spot: ['SpotTrade'],      Wallet: ['AccountTransfer'],      Options: [],      Derivatives: [],      CopyTrading: [],      BlockTrade: [],      Exchange: [],      NFT: [],    },  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "id": "16651472",
    "note": "testxxx",
    "apiKey": "xxxxxx",
    "readOnly": 0,
    "secret": "",
    "permissions": {
      "ContractTrade": [],
      "Spot": [
        "SpotTrade"
      ],
      "Wallet": [
        "AccountTransfer"
      ],
      "Options": [],
      "Derivatives": [],
      "CopyTrading": [],
      "BlockTrade": [],
      "Exchange": [],
      "NFT": []
    },
    "ips": [
      "*"
    ]
  },
  "retExtInfo": {},
  "time": 1676431796263
}
```