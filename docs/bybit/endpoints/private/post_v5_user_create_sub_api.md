# Create Sub UID API Key

To create new API key for those newly created sub UID. Use **master user's api key** **only**.

tip

The API key must have one of the below permissions in order to call this endpoint..

-   master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"

### HTTP Request[​](#http-request "Direct link to heading")

POST `/v5/user/create-sub-api`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type | Comments |
| :-- | :-- | :-- | --- |
| subuid | **true** | integer | Sub user Id |
| note | false | string | Set a remark |
| readOnly | **true** | integer | `0`：Read and Write. `1`：Read only |
| ips | false | string | Set the IP bind. example: `"192.168.0.1,192.168.0.2"`**note:**
-   don't pass ips or pass with `"*"` means no bind
-   No ip bound api key will be **invalid after 90 days**
-   api key without IP bound will be invalid after **7 days** once the account password is changed

 |
| permissions | **true** | Object | Tick the types of permission.

-   one of below types must be passed, otherwise the error is thrown

 |
| \> ContractTrade | false | array | Contract Trade. `["Order","Position"]` |
| \> Spot | false | array | Spot Trade. `["SpotTrade"]` |
| \> Options | false | array | USDC Contract. `["OptionsTrade"]` |
| \> Wallet | false | array | Wallet. `["AccountTransfer","SubMemberTransferList"]`  
*Note: Fund Custodial account is not supported* |
| \> Exchange | false | array | Convert. `["ExchangeHistory"]` |
| \> Earn | false | array | Earn product. `["Earn"]` |
| \> Derivatives | false | array | This param is **deprecated** because system will automatically add this permission according to your account is UTA or Classic |
| \> CopyTrading | false | array | Copytrade. `["CopyTrading"]` **deprecated** because using signal copy trading now, please refer to [How To Start Copy Trading](/docs/v5/copytrade) |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter | Type | Comments |
| :-- | :-- | --- |
| id | string | Unique id. Internal used |
| note | string | The remark |
| apiKey | string | Api key |
| readOnly | integer | `0`: Read and Write. `1`: Read only |
| secret | string | The secret paired with api key.
-   The secret can't be queried by GET api. Please keep it properly

 |
| permissions | Object | The types of permission |
| \> ContractTrade | array | Permisson of contract trade |
| \> Spot | array | Permisson of spot |
| \> Wallet | array | Permisson of wallet |
| \> Options | array | Permission of USDC Contract. It supports trade option and usdc perpetual. |
| \> Derivatives | array | Permission of Unified account |
| \> Exchange | array | Permission of convert |
| \> Earn | array | Permission of earn product |
| \> CopyTrading | array | Permission of copytrade, **deprecated** always `[]` |
| \> BlockTrade | array | Permission of blocktrade. Not applicable to sub account, always `[]` |
| \> NFT | array | Deprecated, always `[]` |

### Request Example[​](#request-example "Direct link to heading")

-   Node.js

```bash
POST /v5/user/create-sub-api HTTP/1.1Host: api.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1676430005459X-BAPI-RECV-WINDOW: 5000Content-Type: application/json{    "subuid": 53888000,    "note": "testxxx",    "readOnly": 0,    "permissions": {        "Wallet": [            "AccountTransfer"        ]    }}
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.create_sub_api_key(    subuid=53888000,    note="testxxx",    readOnly=0,    permissions={        "Wallet": [            "AccountTransfer"        ]    },))
```

```javascript
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .createSubUIDAPIKey({    subuid: 53888000,    note: 'testxxx',    readOnly: 0,    permissions: {      Wallet: ['AccountTransfer'],    },  })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```json
{
  "retCode": 0,
  "retMsg": "",
  "result": {
    "id": "16651283",
    "note": "testxxx",
    "apiKey": "xxxxx",
    "readOnly": 0,
    "secret": "xxxxxxxx",
    "permissions": {
      "ContractTrade": [],
      "Spot": [],
      "Wallet": [
        "AccountTransfer"
      ],
      "Options": [],
      "CopyTrading": [],
      "BlockTrade": [],
      "Exchange": [],
      "NFT": [],
      "Earn": [
        "Earn"
      ]
    }
  },
  "retExtInfo": {},
  "time": 1676430007643
}
```