# Get Account Information

Frequency limit: 1 time/1s (User ID)

### Description[​](#description "Direct link to Description")

Get account information

### HTTP Request[​](#http-request "Direct link to HTTP Request")

- GET /api/v2/spot/account/info

Request Example

```
curl "https://api.bitget.com/api/v2/spot/account/info" \   -H "ACCESS-KEY:*******" \   -H "ACCESS-SIGN:*" \   -H "ACCESS-PASSPHRASE:*" \   -H "ACCESS-TIMESTAMP:1659076670000" \   -H "locale:en-US" \   -H "Content-Type: application/json"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| N/A       |      |          |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "userId": "**********",        "inviterId": "**********",        "ips": "127.0.0.1",        "authorities": [            "trade",            "readonly"        ],        "parentId": 1,        "traderType": "trader",        "channelCode": "XXX",        "channel": "YYY",        "regisTime":"1246566789345"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| userId      | String | User ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| inviterId   | String | Inviter's user ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| channelCode | String | Affiliate referral code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| channel     | String | Affiliate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ips         | String | IP whitelist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| authorities | Array  | Permissions<br>Read only<br>coor: futures orders<br>cpor: futures holdings<br>stor: spot trade<br>smor: margin trade<br>ttor: copy trading<br>wtor: wallet transfer<br>taxr: taxation<br>chor: subaccount<br>p2pr: P2P query<br>Read and Write<br>coow: futures orders<br>cpow: futures holdings<br>stow: spot trade<br>smow: margin trade<br>ttow: copy trading<br>wtow: wallet transfer<br>wwow: wallet withdrawl<br>chow: subaccount manage<br>p2p: P2P<br>pllw: Pledge Loan Write<br>pllr: Pledge Loan Read<br>taxw: Tax Read and Write |
| parentId    | Int    | Main account user ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| traderType  | String | trader: Is trader, not_trader: not trader                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| regisTime   | String | Register time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Account-Info
