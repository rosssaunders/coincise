# GET /v5/asset/exchange/query-coin-list

**Source:**
[Get Convert Coin List](https://bybit-exchange.github.io/docs/v5/asset/convert/convert-coin-list)

## Authentication

Required (Private Endpoint)

- [](/docs/)
- Asset
- Convert
- Get Convert Coin List

On this page

# Get Convert Coin List

Query for the list of coins you can convert to/from.

### HTTP Request[​](#http-request "Direct link to heading")

GET `/v5/asset/exchange/query-coin-list`

### Request Parameters[​](#request-parameters "Direct link to heading")

| Parameter                                       | Required | Type   | Comments                          |
| :---------------------------------------------- | :------- | :----- | --------------------------------- |
| [accountType](/docs/v5/enum#convertaccounttype) | **true** | string | Wallet type- `eb_convert_funding` |

- `eb_convert_uta`
- `eb_convert_spot`
- `eb_convert_contract`
- `eb_convert_inverse` | | coin | false | string | Coin, uppercase only- Convert
  from coin (coin to sell)
- when side=0, coin field is ignored | | side | false | integer | `0`: fromCoin
  list, the balance is given if you have it; `1`: toCoin list (coin to buy)-
  when side=1 and coin field is filled, it returns toCoin list based on coin
  field |

### Response Parameters[​](#response-parameters "Direct link to heading")

| Parameter             | Type           | Comments                                                                                                                                                        |
| :-------------------- | :------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coins                 | array<object\> | Coin spec                                                                                                                                                       |
| \> coin               | string         | Coin                                                                                                                                                            |
| \> fullName           | string         | Full coin name                                                                                                                                                  |
| \> icon               | string         | Coin icon url                                                                                                                                                   |
| \> iconNight          | string         | Coin icon url (dark mode)                                                                                                                                       |
| \> accuracyLength     | integer        | Coin precision                                                                                                                                                  |
| \> coinType           | string         | `crypto`                                                                                                                                                        |
| \> balance            | string         | Balance- When side=0, it gives available balance but cannot used to convert. To get an exact balance to convert, you need specify `side=1` and `coin` parameter |
| \> uBalance           | string         | Coin balance in USDT worth value                                                                                                                                |
| \> singleFromMinLimit | string         | The minimum amount of fromCoin per transaction                                                                                                                  |
| \> singleFromMaxLimit | string         | The maximum amount of fromCoin per transaction                                                                                                                  |
| \> disableFrom        | boolean        | `true`: the coin is disabled to be fromCoin, `false`: the coin is allowed to be fromCoin                                                                        |
| \> disableTo          | boolean        | `true`: the coin is disabled to be toCoin, `false`: the coin is allowed to be toCoin                                                                            |
| \> timePeriod         | integer        | Reserved field, ignored for now                                                                                                                                 |
| \> singleToMinLimit   | string         | Reserved field, ignored for now                                                                                                                                 |
| \> singleToMaxLimit   | string         | Reserved field, ignored for now                                                                                                                                 |
| \> dailyFromMinLimit  | string         | Reserved field, ignored for now                                                                                                                                 |
| \> dailyFromMaxLimit  | string         | Reserved field, ignored for now                                                                                                                                 |
| \> dailyToMinLimit    | string         | Reserved field, ignored for now                                                                                                                                 |
| \> dailyToMaxLimit    | string         | Reserved field, ignored for now                                                                                                                                 |

### Request Example[​](#request-example "Direct link to heading")

- HTTP
- Python
- Node.js

```
GET /v5/asset/exchange/query-coin-list?side=0&accountType=eb_convert_funding HTTP/1.1Host: api-testnet.bybit.comX-BAPI-SIGN: XXXXXXX-BAPI-API-KEY: xxxxxxxxxxxxxxxxxxX-BAPI-TIMESTAMP: 1720064061248X-BAPI-RECV-WINDOW: 5000
```

```
from pybit.unified_trading import HTTPsession = HTTP(    testnet=True,    api_key="xxxxxxxxxxxxxxxxxx",    api_secret="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",)print(session.get_convert_coin_list(    side="0",    accountType="eb_convert_funding",))
```

```
const { RestClientV5 } = require('bybit-api');const client = new RestClientV5({  testnet: true,  key: 'xxxxxxxxxxxxxxxxxx',  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',});client  .getConvertCoins({ accountType: 'eb_convert_spot' })  .then((response) => {    console.log(response);  })  .catch((error) => {    console.error(error);  });
```

### Response Example[​](#response-example "Direct link to heading")

```
{    "retCode": 0,    "retMsg": "ok",    "result": {        "coins": [            {                "coin": "BTC",                "fullName": "BTC",                "icon": "https://t1.bycsi.com/app/assets/token/0717b8c28c2373bf714c964195411d0f.svg",                "iconNight": "https://t1.bycsi.com/app/assets/token/9504b4c841194cc38f04041003ffbfdb.svg",                "accuracyLength": 8,                "coinType": "crypto",                "balance": "0",                "uBalance": "0",                "timePeriod": 0,                "singleFromMinLimit": "0.001",                "singleFromMaxLimit": "1",                "singleToMinLimit": "0",                "singleToMaxLimit": "0",                "dailyFromMinLimit": "0",                "dailyFromMaxLimit": "0",                "dailyToMinLimit": "0",                "dailyToMaxLimit": "0",                "disableFrom": false,                "disableTo": false            },            ...            {                "coin": "SOL",                "fullName": "SOL",                "icon": "https://s1.bycsi.com/app/assets/token/87ca5f1ca7229bdf0d9a16435653007c.svg",                "iconNight": "https://t1.bycsi.com/app/assets/token/383a834046655ffe5ef1be1a025791cc.svg",                "accuracyLength": 8,                "coinType": "crypto",                "balance": "18.05988133",                "uBalance": "2458.46990211775033220586588327",                "timePeriod": 0,                "singleFromMinLimit": "0.1",                "singleFromMaxLimit": "1250",                "singleToMinLimit": "0",                "singleToMaxLimit": "0",                "dailyFromMinLimit": "0",                "dailyFromMaxLimit": "0",                "dailyToMinLimit": "0",                "dailyToMaxLimit": "0",                "disableFrom": false,                "disableTo": false            },            ...            {                "coin": "ETH",                "fullName": "ETH",                "icon": "https://s1.bycsi.com/app/assets/token/d6c17c9e767e1810875c702d86ac9f32.svg",                "iconNight": "https://t1.bycsi.com/app/assets/token/9613ac8e7d62081f4ca20488ae5b168d.svg",                "accuracyLength": 8,                "coinType": "crypto",                "balance": "0.80264489",                "uBalance": "2596.09751650032773106431534138",                "timePeriod": 0,                "singleFromMinLimit": "0.01",                "singleFromMaxLimit": "250",                "singleToMinLimit": "0",                "singleToMaxLimit": "0",                "dailyFromMinLimit": "0",                "dailyFromMaxLimit": "0",                "dailyToMinLimit": "0",                "dailyToMaxLimit": "0",                "disableFrom": false,                "disableTo": false            }        ]    },    "retExtInfo": {},    "time": 1720064061736}
```

[

Previous

Guideline

](/docs/v5/asset/convert/guideline)[

Next

Request a Quote

](/docs/v5/asset/convert/apply-quote)

- [HTTP Request](#http-request)
- [Request Parameters](#request-parameters)
- [Response Parameters](#response-parameters)
- [Request Example](#request-example)
- [Response Example](#response-example)
