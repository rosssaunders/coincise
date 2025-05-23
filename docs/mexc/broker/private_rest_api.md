# Private REST API Endpoints

## MEXC Broker Introduction

**MEXC is committed to building crypto infrastructure, with API broker partners
that provide valuable services being an essential part of the MEXC ecosystem. To
reward the partners, MEXC now provides privileges for MEXC brokers, including
trading rebates and marketing support.**

To apply for a partnership, please contact: **broker@mexc.com**

## Broker Modes Supported by MEXC

**1\. API Broker**  
This includes copy trade platforms, trading bots, quantitative strategy
platforms, or other asset management platforms with more than 500 people, etc.
Users can authorize the API key to the API broker, and the API broker will send
the trading orders containing the broker ID on behalf of the user and receive
profit shares from fees.

**2\. Independent Broker**  
This includes wallet platforms, market data platforms, aggregation trading
platforms, stockbrokers, as well as stock and securities trading platforms,
etc., all of which have their own independent users. MEXC can provide order
matching systems, account management systems, settlement systems, as well as
main and sub-account systems, etc. Independent brokers can share the trading
fluidity and depth over the MEXC platform and receive profit shares from fees.

**3\. Oauth Broker**

**Introduction**

The third-party application connected to MEXC OAuth 2.0 can provide MEXC users
the one-click trade function. The details are as follows:  
MEXC users only need to perform authorization in the third-party application in
one click, and they can start trading without directly providing the API key to
the third-party application.  
MEXC OAuth 2.0 is supported on Web version, and is developed based on the OAuth
2.0 protocol (RFC 6749).

## Broker Services Provided by MEXC

**1\. API Brokers**  
The user signs up at MEXC, applies for API Key in MEXC, and provides it to the
broker.

- Supports trading pairs set by users
- Supports API Key renewal, and avoids multiple binding.

![](images/brokeren1-4a613b77.png)

**2\. Independent Brokers**  
Brokers have their own brands and separate account systems.Brokers create
separate sub-accounts for users to trade under the Master account. Sub-accounts
support deposit and withdrawal.

- Support sub-account deposit and withdrawal
- Support sub-account transfer

![](images/brokeren2-381043d3.png)

**3\. Integration Procedure**  
1\. Sign up for an account on the official website and apply to become a broker.
You must first apply to become a MEXC broker using MEXC Broker Project
Application Form.  
2\. Once approved, a dedicated account manager will provide you the
corresponding developer docs.  
3\. OAuth Rebate Settings  
After integration of the OAuth broker, when placing an order, you need to fill
in the exclusive broker_id in the source field of the header to be used as an
identifier for the rebate order statistics.

**Authorization Mode Introduction**  
The authorization mode provided by MEXC OAuth 2.0: Authorization code mode.

| Authorization Mode | Description                                                                                                                                                        | Scenario                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Authorization Mode | User authorizes a third-party application to provide client_secret and obtain the authorization code, which is then used to obtain access token and refresh token. | The application has a server, which can store the application key and interact the key with the MEXCOAuth server. |

![](images/brokeren3-a3cf0b23.png)

**Authorization Code Mode**  
After the user jumps to the MEXC authorization page through the third-party
application and authorizes it, the third-party application can exchange the
authorization code for an access token, and access the data resources authorized
by the user by using MEXC OpenAPI.

---

## Broker Endpoints

## Query Universal Transfer History - broker user

> request

```
get  /api/v3/broker/sub-account/universalTransfer?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
[
  {
    "tranId":"11945860693",
    "fromAccount":"master@test.com",
    "toAccount":"subaccount1@test.com",
    "clientTranId":"test",
    "asset":"BTC",
    "amount":"0.1",
    "fromAccountType":"SPOT",
    "toAccountType":"FUTURE",
    "fromSymbol":"SPOT",
    "toSymbol":"FUTURE",
    "status":"SUCCESS",
    "timestamp":1544433325000
  },
   {
    "tranId":"11945860693",
    "fromAccount":"master@test.com",
    "toAccount":"subaccount1@test.com",
    "clientTranId":"test",
    "asset":"BTC",
    "amount":"0.1",
    "fromAccountType":"SPOT",
    "toAccountType":"FUTURE",
    "fromSymbol":"SPOT",
    "toSymbol":"FUTURE",
    "status":"SUCCESS",
    "timestamp":1544433325000
  }
]

```

**Http Request:**

- **GET** `/api/v3/broker/sub-account/universalTransfer`

**API Permission: SPOT_TRANSFER_READ**

**Request Parameter:**

| Name            | Type   | Mandatory | Description                                                        |
| --------------- | ------ | --------- | ------------------------------------------------------------------ |
| fromAccount     | string | no        | transfer from master account by default if fromAccount is not sent |
| toAccount       | string | no        | transfer to master account by default if toAccount is not sent     |
| fromAccountType | string | yes       | fromAccountType                                                    |
| toAccountType   | string | yes       | toAccountType                                                      |
| startTime       | string | no        | startTime(ms)                                                      |
| endTime         | string | no        | endTime(ms)                                                        |
| page            | string | no        | default 1                                                          |
| limit           | string | no        | default 500, max 500                                               |
| timestamp       | string | yes       | timestamp                                                          |
| signature       | string | yes       | sign                                                               |

**Response Parameter:**

| Name            | Type   | Description     |
| --------------- | ------ | --------------- |
| tranId          | string | transfer ID     |
| fromAccount     | string | fromAccount     |
| toAccount       | string | toAccount       |
| clientTranId    | string | clientTranId    |
| asset           | string | transfer asset  |
| amount          | string | transfer amount |
| fromAccountType | string | fromAccountType |
| toAccountType   | string | toAccountType   |
| fromsymbol      | string | fromsymbol      |
| tosymbol        | string | tosymbol        |
| status          | string | transfer status |
| timestamp       | number | transfer time   |

## Create a Sub-account

> request

```
post  /api/v3/broker/sub-account/virtualSubAccount?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "code": "0",
    "message": "",
    "data": [{
        "subAccount": "mexc1",
        "note": "1",
        "timestamp": "1597026383085"
    }]
}
```

**Http Request:**

- **POST** `/api/v3/broker/sub-account/virtualSubAccount`

**Query Parameter:**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | yes       | timestamp   |
| signature | string | yes       | signature   |

**Body Request Parameter:**

| Name       | Type   | Mandatory | Description                                   |
| ---------- | ------ | --------- | --------------------------------------------- |
| subAccount | string | yes       | subAccount name                               |
| note       | string | yes       | note                                          |
| password   | string | no        | password(hexadecimal string encrypted by MD5) |

**Response Parameter:**

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| subAccount | string | subAccount name |
| note       | string | note            |

## Query Sub-account List

> request

```
get  /api/v3/broker/sub-account/list?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "code": "0",
    "message": "",
    "data": [{
        "subAccount": "mexc1",
        "note": "1",
        "timestamp": "1597026383085"
    }, {
        "subAccount": "mexc2",
        "note": "2",
        "timestamp": "1597026383787"
    }]
}
```

**Http Request:**

- **GET** `/api/v3/broker/sub-account/list`

**Request Parameter:**

| Name       | Type   | Mandatory | Description                       |
| ---------- | ------ | --------- | --------------------------------- |
| subAccount | string | no        | subAccount name                   |
| page       | string | no        | Default value: 1                  |
| limit      | string | no        | Default value: 10, Max value: 200 |
| timestamp  | string | yes       | timestamp                         |
| signature  | string | yes       | signature                         |

**Response Parameter:**

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| subAccount | string | subAccount name |
| timestamp  | number | create time     |
| note       | string | note            |

## Query Sub-account Status

> request

```

get  /api/v3/broker/sub-account/status?subAccount=subAccountName&timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "status": "1",
}
```

**Http Request:**

- **GET** `/api/v3/broker/sub-account/status`

**Request Parameter:**

| Name       | Type   | Mandatory | Description     |
| ---------- | ------ | --------- | --------------- |
| subAccount | string | yes       | subAccount name |
| timestamp  | string | yes       | timestamp       |
| signature  | string | yes       | signature       |

**Response Parameter:**

| Name   | Type   | Description        |
| ------ | ------ | ------------------ |
| status | string | 1:normal；2:freeze |

## Create an APIKey for a Sub-account

> request

```
post  /api/v3/broker/sub-account/apiKey?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "subAccount": "4Eb8rPPhpsAL",
    "permissions": "SPOT_ACCOUNT_READ,SPOT_ACCOUNT_WRITE",
    "note": "note2",
    "apikey": "mx0npKfh57kEEVmyLa",
    "secretKey": "51f38875ebe0475dad6236783a95cc19",
    "createTime": 1646291300120
}
```

**Http Request:**

- **POST** `/api/v3/broker/sub-account/apiKey`

**Query Parameter:**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | yes       | timestamp   |
| signature | string | yes       | signature   |

**Body Request Parameter:**

| Name        | Type   | Mandatory | Description                                                                          |
| ----------- | ------ | --------- | ------------------------------------------------------------------------------------ |
| subAccount  | string | yes       | subAccount name                                                                      |
| permissions | string | yes       | Permission                                                                           |
| ip          | string | no        | Link IP addresses, separate with commas if more than one. Support up to 4 addresses. |
| note        | string | yes       | note                                                                                 |

**Response Parameter:**

| Name        | Type   | Description        |
| ----------- | ------ | ------------------ |
| subAccount  | string | subAccount name    |
| note        | string | APIKey note        |
| apikey      | string | apikey             |
| secretKey   | string | secretKey          |
| permissions | string | APIKey permissions |
| ip          | string | APIKey IP address  |
| createTime  | number | createTime         |

## Query the APIKey of a Sub-account

> request

```
get  /api/v3/broker/sub-account/apiKey?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "subAccount": [{
        "note": "v5",
        "apiKey": "arg13sdfgs",
        "permissions": "SPOT_ACCOUNT_READ,SPOT_ACCOUNT_WRITE",
        "ip": "1.1.1.1,2.2.2.2",
        "creatTime": 1597026383085
    }, {
        "note": "v5.1",
        "apiKey": "arg13sdfgs",
        "permissions": "read_only",
        "ip": "1.1.1.1,2.2.2.2",
        "creatTime": 1597026383085
    }]
}

```

**Http Request:**

- **GET** `/api/v3/broker/sub-account/apiKey`

**Request Parameter:**

| Name       | Type   | Mandatory | Description     |
| ---------- | ------ | --------- | --------------- |
| subAccount | string | yes       | subAccount name |
| timestamp  | string | yes       | timestamp       |
| signature  | string | yes       | signature       |

**Response Parameter:**

| Name        | Type   | Description        |
| ----------- | ------ | ------------------ |
| note        | string | note               |
| apikey      | string | apikey             |
| permissions | string | APIKey permissions |
| ip          | string | APIKey iP address  |
| creatTime   | number | creatTime          |

## Delete the APIKey of a Sub-account

> request

```
delete  /api/v3/broker/sub-account/apiKey?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "subAccount": "mexc1"
}
```

**Http Request:**

- **DELETE** `/api/v3/broker/sub-account/apiKey`

**Query Parameter:**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | yes       | timestamp   |
| signature | string | yes       | signature   |

**Body Request Parameter:**

| Name       | Type   | Mandatory | Description     |
| ---------- | ------ | --------- | --------------- |
| subAccount | string | yes       | subAccount name |
| apiKey     | string | yes       | apiKey          |

**Response Parameter:**

| Name       | Type   | Description     |
| ---------- | ------ | --------------- |
| subAccount | string | subAccount name |

## Generate Deposit Address of Sub-account

> request

```
post  /api/v3/broker/capital/deposit/subAddress?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "address": "TDunhSa7jkTNuKrusUTU1MUHtqXoBPKETV",
    "coin": "USDT",
    "network": "ERC-20",
    "memo": ""
}
```

**Http Request:**

- **POST** `/api/v3/broker/capital/deposit/subAddress`

**API Permission: SPOT_DEPOSIT_WRITE**

**Query Parameter:**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| recvWindow | string | no        | recvWindow  |
| timestamp  | string | yes       | timestamp   |
| signature  | string | yes       | signature   |

**Body Request Parameter:**

| Name    | Type   | Mandatory | Description     |
| ------- | ------ | --------- | --------------- |
| coin    | string | yes       | deposit coin    |
| network | string | yes       | deposit network |

**Response Parameter:**

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| address | string | deposit address |
| coin    | string | deposit coin    |
| network | string | deposit network |
| memo    | string | memo            |

## Deposit Address of Sub-account

> request

```
get  /api/v3/broker/capital/deposit/subAddress?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
[{
    "address": "TDunhSa7jkTNuKrusUTU1MUHtqXoBPKETV",
    "coin": "USDT",
    "network": "ERC-20",
    "memo": ""
}, {
    "address": "TDunhSa7jkTNuKrusUTU1MUHtqXoBPKETV",
    "coin": "USDT",
    "network": "TRC-20",
    "memo": ""
}]

```

**Http Request:**

- **GET** `/api/v3/broker/capital/deposit/subAddress`

**API Permission: SPOT_DEPOSIT_READ**

**Request Parameter:**

| Name       | Type   | Mandatory | Description  |
| ---------- | ------ | --------- | ------------ |
| coin       | string | yes       | deposit coin |
| recvWindow | string | no        | recvWindow   |
| timestamp  | string | yes       | timestamp    |
| signature  | string | yes       | signature    |

**Response Parameter:**

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| address | string | deposit address |
| coin    | string | deposit coin    |
| network | string | deposit network |
| memo    | string | memo            |

## Query Sub-account Deposit History

> request

```
get  /api/v3/broker/capital/deposit/subHisrec?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
[
    {
        "amount":"0.00999800",
        "coin":"PAXG",
        "network":"ETH",
        "status":,
        "address":"0x788cabe9236ce061e5a892e159395a81fc8d62c",
        "addressTag":"",
        "txId":"0xaad4654a3234aa6118af9b4b335f581c360b2394721c019b5d1e75328b09f3",
        "unlockConfirm":"12",
        "confirmTimes":"7"
    },
    {
        "amount":"0.50000000",
        "coin":"IOTA",
        "network":"IOTA",
        "status":1,
        "address":"SIZ9VLMHWATXKV99LH99CIGFJFUMLEHGWVZVNXRJJVWBPHYWPPBOSDORZ9EQSHCZAMPVAPGFYQAUUV9DROOXJLNW",
        "addressTag":"",
        "txId":"ESBFVQUTPIWQXFNHNYHSQNTGKRVKPRABQWTAXCDWOAKDKYWPTVG9BGXNVNKTLEJGESAVXIKIZ9999",
        "unlockConfirm":"12",
        "confirmTimes":"7"
    }
]

```

**Http Request:**

- **GET** `/api/v3/broker/capital/deposit/subHisrec`

**Request Parameter:**

| Name       | Type   | Mandatory | Description                            |
| ---------- | ------ | --------- | -------------------------------------- |
| coin       | string | no        | deposit coin                           |
| status     | string | no        | deposit status                         |
| startTime  | string | no        | default: 10 days ago from current time |
| endTime    | string | no        | default:current time                   |
| limit      | string | no        | default:20                             |
| page       | string | no        | default:1                              |
| recvWindow | string | no        | recvWindow                             |
| timestamp  | string | yes       | timestamp                              |
| signature  | string | yes       | signature                              |

**Response Parameter:**

| Name          | Type   | Description     |
| ------------- | ------ | --------------- |
| amount        | string | deposit amount  |
| coin          | string | deposit coin    |
| network       | string | deposit network |
| status        | number | deposit status  |
| address       | string | deposit address |
| addressTag    | string | addressTag      |
| txId          | string | txid            |
| unlockConfirm | string | unlockConfirm   |
| confirmTimes  | string | confirmTimes    |

## Query All Sub-account Deposit History(Recent 3 days)

master account query all Sub-account deposit history

> request

```
get  /api/v3/broker/capital/deposit/subHisrec/getall?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
[
    {
        "amount":"0.00999800",
        "coin":"PAXG",
        "network":"ETH",
        "status":,
        "address":"0x788cabe9236ce061e5a892e1a59395a81f8d62c",
        "txId":"0xaad4654a3234aa6118af9b4b335f5ae81c360b2394721c019b5d1e8b09f3",
        "unlockConfirm":"12",
        "confirmTimes":"7"
    },
    {
        "amount":"0.50000000",
        "coin":"IOTA",
        "network":"IOTA",
        "status":1,
        "address":"SIZ9VLMHWATXKV99LH99CIGFJFUMLEHGWVZZXRJJVWBPHYWPPBOSDORZ9EQSHCZAMPVAPGFYQAUUV9DROOXJLNW",
            "txId":"ESBFVQUTPIWQNJSPXFNHNYHSQNTGKRVKPRABQWTAXCWPTVG9BGXNVNKTLEJGESAVXIKIZ9999",
        "unlockConfirm":"12",
        "confirmTimes":"7"
    }
]

```

**Http Request:**

- **GET** `/api/v3/broker/capital/deposit/subHisrec/getall`

**Request Parameter:**

| Name       | Type   | Mandatory | Description    |
| ---------- | ------ | --------- | -------------- |
| coin       | string | no        | deposit coin   |
| status     | string | no        | deposit status |
| startTime  | string | no        | startTime      |
| endTime    | string | no        | endTime        |
| limit      | string | no        | default:100    |
| page       | string | no        | default:1      |
| recvWindow | string | no        | recvWindow     |
| timestamp  | string | yes       | timestamp      |
| signature  | string | yes       | signature      |

**Response Parameter:**

| Name          | Type   | Description     |
| ------------- | ------ | --------------- |
| amount        | string | deposit amount  |
| coin          | string | deposit coin    |
| network       | string | deposit network |
| status        | number | deposit status  |
| address       | string | deposit address |
| txId          | string | txid            |
| unlockConfirm | string | unlockConfirm   |
| confirmTimes  | string | confirmTimes    |

## Withdraw

\[only support withdraw for sub-account,not master account\]

> request

```
post  /api/v3/broker/capital/withdraw/apply?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "id":"7213fea8e94b4a5593d507237e5a555b"
}
```

**Http Request:**

- **POST** `/api/v3/broker/capital/withdraw/apply`

**API Permission: SPOT_TRANSFER_READ**

**Query Parameter:**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| recvWindow | string | no        | recvWindow  |
| timestamp  | string | yes       | timestamp   |
| signature  | string | yes       | signature   |

**Body Request Parameter:**

| Name     | Type   | Mandatory | Description                                   |
| -------- | ------ | --------- | --------------------------------------------- |
| coin     | string | yes       | withdraw coin                                 |
| network  | string | yes       | withdraw network                              |
| address  | string | yes       | withdraw address                              |
| amount   | string | yes       | amount                                        |
| password | string | no        | password(hexadecimal string encrypted by MD5) |
| remark   | string | no        | remark                                        |

**Response Parameter:**

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | withdrawID  |

## Universal Transfer

only support broker account

> request

```
post  /api/v3/broker/sub-account/universalTransfer?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "tranId": "7213fea8e94b4a5593d507237e5a555b"
}
```

**Http Request:**

- **POST** `/api/v3/broker/sub-account/universalTransfer`

**API Permission: SPOT_TRANSFER_READ**

**Query Parameter:**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | yes       | timestamp   |
| signature | string | yes       | signature   |

**Body Request Parameter:**

| Name            | Type   | Mandatory | Description                                                        |
| --------------- | ------ | --------- | ------------------------------------------------------------------ |
| fromAccount     | string | no        | Transfer from master account by default if fromAccount is not sent |
| toAccount       | string | no        | Transfer to master account by default if toAccount is not sent     |
| fromAccountType | string | yes       | fromAccountType                                                    |
| toAccountType   | string | yes       | toAccountType                                                      |
| asset           | string | yes       | asset,eg:USDT                                                      |
| amount          | string | yes       | amount,eg:1.82938475                                               |

**Response Parameter:**

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| tranId | string | transfer ID |

## Enable Futures for Sub-account

> request

```
post  /api/v3/broker/sub-account/futures?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "code": "0",
    "message": "",
    "data": [{
        "subAccount": "mexc1",
        "isFuturesEnabled": true,
        "timestamp": "1597026383085"
    }]
}
```

**Http Request:**

- **POST** `/api/v3/broker/sub-account/futures`

**Query Parameter:**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | yes       | timestamp   |
| signature | string | yes       | signature   |

**Body Request Parameter:**

| Name       | Type   | Mandatory | Description     |
| ---------- | ------ | --------- | --------------- |
| subAccount | string | yes       | subAccount name |

**Response Parameter:**

| Name             | Type    | Description                     |
| ---------------- | ------- | ------------------------------- |
| subAccount       | string  | subAccount name                 |
| isFuturesEnabled | boolean | isFuturesEnabled: true or false |
| timestamp        | string  | response time                   |

## Get Broker Rebate History Records

> request

```

get  /api/v3/broker/rebate/taxQuery?timestamp={{timestamp}}&signature={{signature}}

```

> response

```
{
    "page": 1,
    "totalRecords": 1,
    "totalPageNum": 1,
    "data": [
        {
            "asset": "USDT",
            "amount": "0.00082273",
            "type": "spot",
            "uid": "221827",
            "time": "20221022"
        },
        {
            "asset": "USDT",
            "amount": "0.00082273",
            "type": "spot",
            "uid": "221827",
            "time": "20221022"
        }
    ]
}

```

**HTTP REQUEST：**

- **GET** `/api/v3/broker/rebate/taxQuery`

**request：**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| startTime  | string | no        | startTime   |
| endTime    | string | no        | endTime     |
| page       | string | no        | default 1   |
| pageSize   | string | no        | default 10  |
| recvWindow | string | no        | recvWindow  |
| timestamp  | string | yes       | timestamp   |
| signature  | string | yes       | signature   |

**response：**

| Name   | Type   | Description     |
| ------ | ------ | --------------- |
| asset  | string | rebate asset    |
| amount | string | rebate amount   |
| uid    | string | rebate user uid |
| type   | string | rebate type     |
| time   | string | rebate time     |

---

## Public API Definitions

## ENUM definitions

### fromAccountType

- SPOT
- FUTURES

### toAccountType

- SPOT
- FUTURES

### Permission

- SPOT_ACCOUNT_READ
- SPOT_ACCOUNT_WRITE
- SPOT_DEAL_READ
- SPOT_DEAL_WRITE
- CONTRACT_ACCOUNT_READ
- CONTRACT_ACCOUNT_WRITE
- CONTRACT_DEAL_READ
- CONTRACT_DEAL_WRITE
- SPOT_WITHDRAW_READ
- SPOT_WITHDRAW_WRITE
- SPOT_TRANSFER_READ
- SPOT_TRANSFER_WRITE
- SPOT_DEPOSIT_READ
- SPOT_DEPOSIT_WRITE

### deposit status

- SMALL
- TIME_DELAY
- LARGE_DELAY
- PENDING
- SUCCESS
- AUDITING
- REJECTED
