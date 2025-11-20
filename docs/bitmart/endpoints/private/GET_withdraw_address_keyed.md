# GET Withdraw Address (KEYED)

**Source:** [Withdraw Address (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Withdraw Address (KEYED)

`Gets Withdraw Address List`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

None

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "0e6edd79-f77f-4251-abe5-83ba75d06c1a",
  "data": {
    "list": [
      {
        "currency": "ETH",
        "network": "ETH",
        "address": "0x1121",
        "memo": "12",
        "remark": "12",
        "addressType": 0,
        "verifyStatus": 0
      }
    ]
  }
}
```

| Field | Type | Description |
| --- | --- | --- |
| address | String | Withdraw Address |
| memo | String | Memo |
| remark | String | Remark |
| verifyStatus | Int | Address verify status  
\-`0`\=Unverified  
\-`1`\=Verified |
| addressType | Int | Address Type  
\-`0`\=Standard Address  
\-`1`\=Universal Address  
\-`2`\=EVM Address |
| network | String | Network. The value is present only when the address type is a Standard address or Universal Address |
| currency | String | The value is present only when the address type is a Standard address |