# Error Code

## Restful Error Code

### List of global HTTP return codes

| HTTP | Description |
| --- | --- |
| 404 | Not Found-The requested interface could not be found 
| 403 | Forbidden-No permission to access the resource (KEY may not have permission, or it may be IP restrictions) 
| 401 | Unauthorized-Authentication failed (there are problems with the 3 header parameters, failed) 
| 500 | Internal Server Error-Server exception, BitMart service problem 

### Authentication Error Code

Example: httpStatus:200, body:{"code": 1000, "message": "OK", "trace": "12323-3243242-34334534-4353","data":{}}

| error message | code error code | http status code |
| --- | --- | --- |
| Not found | 30000 | 404 
| Header X-BM-KEY is empty | 30001 | 401 
| Header X-BM-KEY not found | 30002 | 401 
| Header X-BM-KEY has frozen | 30003 | 401 
| Header X-BM-SIGN is empty | 30004 | 401 
| Header X-BM-SIGN is wrong | 30005 | 401 
| Header X-BM-TIMESTAMP is empty | 30006 | 401 
| Header X-BM-TIMESTAMP range. Within a minute | 30007 | 401 
| Header X-BM-TIMESTAMP invalid format | 30008 | 401 
| IP is forbidden. We recommend enabling IP whitelist for API trading. After that reauth your account | 30010 | 403 
| Header X-BM-KEY over expire time | 30011 | 403 
| Header X-BM-KEY is forbidden to request it | 30012 | 403 
| Request too many requests | 30013 | 429 
| Service unavailable | 30014 | 503 
| Service maintenance, the function is temporarily unavailable | 30016 | 200 
| Your account request is temporarily rejected due to violation of current limiting rules, please contact customer service | 30017 | 418 
| Request Body requires JSON format | 30018 | 503 
| You do not have the permissions to perform this operation. Please contact customer service or BD for assistance | 30019 | 200 
| Futures V1 API has been deprecated. Please use Futures V2 API. You can view the change logs for upgrade | 30030 | 200 
| This endpoint has been deprecated. You can view the change logs for upgrade | 30031 | 200 

### Contract API Error Code

Example: httpStatus:400, body:{"code": 40001, "message":"out\_trade\_no not found", "trace":"8bynjk-nmoew-sd1221-csd-123" }

| errMsg error message | code error code | http status code |
| --- | --- | --- |
| OK | 1000 | 200 
| Cloud account not found | 40001 | 400 
| out_trade_no not found | 40002 | 400 
| out_trade_no already existed | 40003 | 400 
| Cloud account count limit | 40004 | 400 
| Transfer vol precision error | 40005 | 400 
| Invalid ip error | 40006 | 400 
| Parse parameter error | 40007 | 400 
| Check nonce error | 40008 | 400 
| Check ver error | 40009 | 400 
| Not found func error | 40010 | 400 
| Invalid request | 40011 | 400 
| System error | 40012 | 400 
| Access too often" CLIENT_TIME_INVALID, "Please check your system time. | 40013 | 400 
| This contract is offline | 40014 | 400 
| This contract's exchange has been paused | 40015 | 400 
| This order would trigger user position liquidate | 40016 | 400 
| It is not possible to open and close simultaneously in the same position | 40017 | 400 
| Your position is closed | 40018 | 400 
| Your position is in liquidation delegating | 40019 | 400 
| Your position volume is not enough | 40020 | 400 
| The position is not exsit | 40021 | 400 
| The position is not isolated | 40022 | 400 
| The position would liquidate when sub margin | 40023 | 400 
| The position would be warnning of liquidation when sub margin | 40024 | 400 
| The position’s margin shouldn’t be lower than the base limit | 40025 | 400 
| You cross margin position is in liquidation delegating | 40026 | 400 
| You contract account available balance not enough | 40027 | 400 
| Your plan order's count is more than system maximum limit. | 40028 | 400 
| The order's leverage is too large. | 40029 | 400 
| The order's leverage is too small. | 40030 | 400 
| The deviation between current price and trigger price is too large. | 40031 | 400 
| The plan order's life cycle is too long. | 40032 | 400 
| The plan order's life cycle is too short. | 40033 | 400 
| The Symbol is not exist | 40034 | 400 
| The order is not exist | 40035 | 400 
| The order status is invalid | 40036 | 400 
| The order id is not exist | 40037 | 400 
| The k-line step is invalid | 40038 | 400 
| The timestamp is invalid | 40039 | 400 
| The order leverage is invalid | 40040 | 400 
| The order side is invalid | 40041 | 400 
| The order type is invalid | 40042 | 400 
| The order precision is invalid | 40043 | 400 
| The order range is invalid | 40044 | 400 
| The order open type is invalid | 40045 | 400 
| The account is not opened futures | 40046 | 403 
| Services is not available in you countries and areas | 40047 | 403 
| ClientOrderId only allows a combination of numbers and letters | 40048 | 403 
| The maximum length of clientOrderId cannot exceed 32 | 40049 | 403 
| Client OrderId duplicated with existing orders | 40050 | 403 
| Insufficient balance | 42000 | 200
