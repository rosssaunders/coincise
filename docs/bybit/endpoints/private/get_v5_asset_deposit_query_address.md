# Get Master Deposit Address

Query the deposit address information of MASTER account.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/deposit/query-address`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter | Required | Type   | Comments                                                                               |
| :-------- | :------- | :----- | -------------------------------------------------------------------------------------- |
| coin      | **true** | string | Coin, uppercase only                                                                   |
| chainType | false    | string | Please use the value of `>> chain` from [coin-info](/docs/v5/asset/coin-info) endpoint |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter            | Type   | Comments                                                                                                         |
| :------------------- | :----- | ---------------------------------------------------------------------------------------------------------------- |
| coin                 | string | Coin                                                                                                             |
| chains               | array  | Object                                                                                                           |
| \> chainType         | string | Chain type                                                                                                       |
| \> addressDeposit    | string | The address for deposit                                                                                          |
| \> tagDeposit        | string | Tag of deposit                                                                                                   |
| \> chain             | string | Chain                                                                                                            |
| \> batchReleaseLimit | string | The deposit limit for this coin in this chain. `"-1"` means no limit                                             |
| \> contractAddress   | string | The contract address of the coin. Only display last 6 characters, if there is no contract address, it shows `""` |

[RUN >>](/docs/api-explorer/v5/asset/master-deposit-addr)

---

### Request Example[​](#request-example "Direct link to heading")

```bash
GET /v5/asset/deposit/query-address?coin=USDT&chainType=ETH HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1672192792371X-BAPI-RECV-WINDOW: 5000
```

```python
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_master_deposit_address(    coin="USDT",    chainType="ETH",))
```

```javascript
const { RestClientV5 } = require("bybit-api")
const client = new RestClientV5({
  testnet: true,
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET"
})
client
  .getMasterDepositAddress("USDT", "ETH")
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
  "retMsg": "success",
  "result": {
    "coin": "USDT",
    "chains": [
      {
        "chainType": "Ethereum (ERC20)",
        "addressDeposit": "XXXXXX",
        "tagDeposit": "",
        "chain": "ETH",
        "batchReleaseLimit": "-1",
        "contractAddress": "831ec7"
      }
    ]
  },
  "retExtInfo": {},
  "time": 1736394811459
}
```
