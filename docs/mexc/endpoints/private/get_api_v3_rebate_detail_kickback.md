# Get Self Rebate Records Detail

> request

```
get /api/v3/rebate/detail/kickback?timestamp={{timestamp}}&signature={{signature}}
```

> response

```
{
    "page": 1,  
    "totalRecords": 27,  
    "totalPageNum": 3,  
    "data": [
        {
            "asset": "USDT",  
            "type": "spot",        
            "rate": "0.3", 
            "amount": "0.0001126",  
            "uid": "2293729101827",  
            "account": "154****291@qq.com",  
            "tradeTime": 1637651320000,
            "updateTime": 1637651320000
        },
        ...
        {
            "asset": "ETH", 
            "type": "spot", 
            "rate": "0.3", 
            "amount": "0.00000056",
            "uid": "22937291018263",  
            "account": "154****291@qq.com",  
            "tradeTime": 1637651320000,
            "updateTime": 1637928379000
        }
    ]
}
```

**Http Request**

-   **GET** `/api/v3/rebate/detail/kickback`  
    

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| startTime | long | NO |  |
| endTime | long | NO |  |
| page | int | NO | default 1 |
| recvWindow | long | NO |  |
| timestamp | long | YES |  |
| signature | string | YES |  |

**Response**

| Name | Type | Description |
| --- | --- | --- |
| asset | string | rebate asset |
| type | string | rebate type: spot futures |
| rate | string | rebate rate |
| amount | string | rebate amount |
| uid | string | Invitee uid |
| account | string | Invitee account |
| tradeTime | long | trade time |
| updateTime | long | update time |

If startTime and endTime are not sent, the recent 1 year's data will be returned.

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#get-self-rebate-records-detail
