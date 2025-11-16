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
| N/A       |      |          |             |

Response Example

```
{    "code": "00000",    "msg": "success",    "requestTime": 1695808949356,    "data": {        "userId": "**********",        "inviterId": "**********",        "ips": "127.0.0.1",        "authorities": [            "trade",            "readonly"        ],        "parentId": 1,        "traderType": "trader",        "channelCode": "XXX",        "channel": "YYY",        "regisTime":"1246566789345"    }}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter   | Type   | Description             |
| :---------- | :----- | :---------------------- |
| userId      | String | User ID                 |
| inviterId   | String | Inviter's user ID       |
| channelCode | String | Affiliate referral code |
| channel     | String | Affiliate               |
| ips         | String | IP whitelist            |
| authorities | Array  | Permissions             |

Read only  
coor: futures orders  
cpor: futures holdings  
stor: spot trade  
smor: margin trade  
ttor: copy trading  
wtor: wallet transfer  
taxr: taxation  
chor: subaccount  
p2pr: P2P query  
Read and Write  
coow: futures orders  
cpow: futures holdings  
stow: spot trade  
smow: margin trade  
ttow: copy trading  
wtow: wallet transfer  
wwow: wallet withdrawl  
chow: subaccount manage  
p2p: P2P  
pllw: Pledge Loan Write  
pllr: Pledge Loan Read  
taxw: Tax Read and Write | | parentId | Int | Main account user ID | |
traderType | String | trader: Is trader, not_trader: not trader | | regisTime |
String | Register time |

> **Source:** https://www.bitget.com/api-doc/spot/account/Get-Account-Info
