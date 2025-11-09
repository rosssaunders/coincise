# Query Announcements

Frequency limit: 20 times/1s (IP)

### Description[​](#description "Direct link to Description")

Search for announcements within one month

Description of the announcement sub-type： The announcement sub-type matches the announcement type.

-   annType=`latest_news`
    -   `announcements` Latest announcement
    -   `news` Bitget news
-   annType=`coin_listings`
    -   `spot`
    -   `futures`
    -   `margin`
    -   `copy_trading`
-   annType=`product_updates`
    -   `spot`
    -   `futures`
    -   `margin`
    -   `copy_trading`
-   annType=`security`
    -   `security_information`
-   annType=`api_trading`
    -   `api_announcement`
-   annType=`symbol_delisting`
    -   `trading_pair_delisting`
-   annType=`maintenance_system_updates`
    -   `asset_maintenance`
    -   `system_updates`
    -   `spot_maintenance`
    -   `futures_maintenance`

### HTTP Request[​](#http-request "Direct link to HTTP Request")

-   GET /api/v2/public/annoucements

Request Example

```
curl "https://api.bitget.com/api/v2/public/annoucements?language=zh_CN"
```

### Request Parameters[​](#request-parameters "Direct link to Request Parameters")

| Parameter | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| annType | String | No | Announcement type  
`latest_news`: Latest events  
`coin_listings`: New coin listings  
`product_updates`: Product update  
`security`: Security  
`api_trading`: Api trading  
`maintenance_system_updates`: maintenance/system upgrades  
`symbol_delisting`: Delisting information |
| startTime | String | No | Start time of the query, Unix millisecond timestamp, e.g. 1690196141868  
Search by announcement time |
| endTime | String | No | End time of the query, Unix millisecond timestamp, e.g. 1690196141868  
Search by announcement time |
| cursor | String | No | Cursor ID  
It is not required for the first call. For subsequent calls, pass the last annId in the previous response. |
| limit | String | No | Number of entries per page  
By default, it is 10 entries, and the maximum is 10 entries. |
| language | String | Yes | language type  
zh\_CN: Chinese  
en\_US: English  
Returns English if the language chosen is not supported |

Response Example

```
{  "code": "00000",  "msg": "success",  "requestTime": 1688008631614,  "data": [    {      "annId": "1",      "annTitle": "test0629",      "annDesc": "Latest announcement",      "cTime": "1688008040000",      "language": "zh_CN",      "annUrl": "https://www.bitget.com/zh_CN/support/articles/23685"    }  ]}
```

### Response Parameters[​](#response-parameters "Direct link to Response Parameters")

| Parameter | Type | Description |
| :-- | :-- | :-- |
| annId | String | Announcement ID |
| annTitle | String | Announcement title |
| annDesc | String | Announcement description (This field is deprecated) |
| cTime | String | Announcement creation time, Unix millisecond timestamp format |
| language | String | language type |
| annUrl | String | Announcement URL |
| annType | String | Announcement type  
`latest_news`: Latest events  
`coin_listings`: New coin listings  
`product_updates`: Product update  
`security`: Security  
`api_trading`: Api trading  
`maintenance_system_updates`: maintenance/system upgrades  
`symbol_delisting`: Delisting information |
| annSubType | String | Announcement sub-type |
| cTime | String | Announcement release time  
In the format of Unix timestamp in milliseconds |

> **Source:** https://www.bitget.com/api-doc/common/notice/Get-All-Notices
