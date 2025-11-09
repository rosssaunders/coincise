# Error Codes

## Restful Error Code

### List of global HTTP return codes

| HTTP | Description                                                                                                |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| 404  | Not Found-The requested interface could not be found                                                       |
| 403  | Forbidden-No permission to access the resource (KEY may not have permission, or it may be IP restrictions) |
| 401  | Unauthorized-Authentication failed (there are problems with the 3 header parameters, failed)               |
| 500  | Internal Server Error-Server exception, BitMart service problem                                            |

### Authentication Error Code

Example: httpStatus:200, body:{"code": 1000, "message": "OK", "trace":
"12323-3243242-34334534-4353","data":{}}

| error message                                                                                                            |     | code error code | http status code |
| ------------------------------------------------------------------------------------------------------------------------ | --- | --------------- | ---------------- |
| Not found                                                                                                                |     | 30000           | 404              |
| Header X-BM-KEY is empty                                                                                                 |     | 30001           | 401              |
| Header X-BM-KEY not found                                                                                                |     | 30002           | 401              |
| Header X-BM-KEY has frozen                                                                                               |     | 30003           | 401              |
| Header X-BM-SIGN is empty                                                                                                |     | 30004           | 401              |
| Header X-BM-SIGN is wrong                                                                                                |     | 30005           | 401              |
| Header X-BM-TIMESTAMP is empty                                                                                           |     | 30006           | 401              |
| Header X-BM-TIMESTAMP must be long type                                                                                  |     | 30006           | 401              |
| Header X-BM-TIMESTAMP range. Within a minute                                                                             |     | 30007           | 401              |
| Header X-BM-TIMESTAMP range. Timestamp for this request is outside of the recvWindow.                                    |     | 30007           | 401              |
| Param recvWindow must be long type                                                                                       |     | 30007           | 401              |
| Param recvWindow must be less than 60000 and greater than 0                                                              |     | 30007           | 401              |
| Header X-BM-TIMESTAMP invalid format                                                                                     |     | 30008           | 401              |
| IP is forbidden. We recommend enabling IP whitelist for API trading. After that reauth your account                      |     | 30010           | 403              |
| Header X-BM-KEY over expire time                                                                                         |     | 30011           | 403              |
| Header X-BM-KEY is forbidden to request it                                                                               |     | 30012           | 403              |
| Request too many requests                                                                                                |     | 30013           | 429              |
| Service unavailable                                                                                                      |     | 30014           | 503              |
| Service maintenance, the function is temporarily unavailable                                                             |     | 30016           | 200              |
| Your account request is temporarily rejected due to violation of current limiting rules, please contact customer service |     | 30017           | 418              |
| Request Body requires JSON format                                                                                        |     | 30018           | 503              |
| You do not have the permissions to perform this operation. Please contact customer service or BD for assistance          |     | 30019           | 200              |
| Futures V1 API has been deprecated. Please use Futures V2 API. You can view the change logs for upgrade                  |     | 30030           | 200              |
| This endpoint has been deprecated. You can view the change logs for upgrade                                              |     | 30031           | 200              |

### Funding Account&Sub-Account API Error Code

Example: httpStatus:200, body:{"code":
1000,"trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1","message": "OK","data": {}}

| error message                                                                                                                                              | code error code | http status code |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| OK                                                                                                                                                         | 1000            | 200              |
| Invalid request (maybe the body is empty, or the int parameter passes string data)                                                                         | 60000           | 400              |
| Asset account type does not exist                                                                                                                          | 60001           | 400              |
| currency does not exist                                                                                                                                    | 60002           | 400              |
| Currency has been closed recharge channel, if there is any problem, please consult customer service                                                        | 60003           | 400              |
| Currency has been closed withdraw channel, if there is any problem, please consult customer service                                                        | 60004           | 400              |
| Minimum amount is %s                                                                                                                                       | 60005           | 400              |
| Maximum withdraw precision is %d                                                                                                                           | 60006           | 400              |
| Only withdrawals from added addresses are allowed                                                                                                          | 60007           | 400              |
| Balance not enough                                                                                                                                         | 60008           | 400              |
| Beyond the limit                                                                                                                                           | 60009           | 400              |
| Withdraw id or deposit id not found                                                                                                                        | 60010           | 400              |
| Address is not valid                                                                                                                                       | 60011           | 400              |
| This action is not supported in this currency(If IOTA, HLX recharge and withdraw calls are prohibited)                                                     | 60012           | 400              |
| The withdrawal amount must be an integral multiple of %s                                                                                                   | 60013           | 400              |
| Please check your memo                                                                                                                                     | 60014           | 400              |
| This address is not verified. Please add and verify this address on the client                                                                             | 60015           | 400              |
| Your account is not allowed to recharge                                                                                                                    | 60020           | 403              |
| Your account is not allowed to withdraw                                                                                                                    | 60021           | 403              |
| No withdrawals for 24 hours                                                                                                                                | 60022           | 403              |
| Sub-account does not have permission to operate                                                                                                            | 60026           | 403              |
| Only supports sub-account calls                                                                                                                            | 60027           | 403              |
| Account status is unavailable                                                                                                                              | 60028           | 403              |
| The account is frozen by the master account, please contact the master account to unfreeze the account                                                     | 60029           | 403              |
| Method Not Allowed                                                                                                                                         | 60030           | 405              |
| Unsupported Media Type                                                                                                                                     | 60031           | 415              |
| User account not found                                                                                                                                     | 60050           | 500              |
| Internal Server Error                                                                                                                                      | 60051           | 500              |
| Exception                                                                                                                                                  | 60052           | 400              |
| please check The Email/PhoneNumber/BitMart ID And try again                                                                                                | 60053           | 403              |
| Sub-account does not support withdraw                                                                                                                      | 60054           | 403              |
| This currency is not support                                                                                                                               | 60055           | 403              |
| This currency withdrawal is suspended                                                                                                                      | 60056           | 403              |
| User status is not available                                                                                                                               | 60057           | 403              |
| Monitor that the withdrawal will cause the overall spot wallet to fall below the Margin call risk rate. Please revise the withdrawal amount as appropriate | 60058           | 403              |
| internal Withdraw forbidden                                                                                                                                | 60059           | 403              |
| Invalid request                                                                                                                                            | 60060           | 403              |
| Unsupported operation                                                                                                                                      | 60061           | 403              |
| Forbidden                                                                                                                                                  | 60062           | 403              |
| Account is frozen due to security policies. Please contact customer service                                                                                | 60063           | 403              |
| Exceed daily withdrawal quota, for your safety, please wait 24 hours and try again                                                                         | 60064           | 403              |
| The withdrawal user and the target user cannot be the same                                                                                                 | 60065           | 403              |
| Please notice the default startTime and endTime to make sure that time interval is within 0-90 days                                                        | 60066           | 400              |
| If both startTime and endTimeare sent, time between startTimeand endTimemust be less than 90 days.                                                         | 60067           | 400              |
| Parameter Error                                                                                                                                            | 60000           | 400              |
| Amount must be greater than 0                                                                                                                              | 61000           | 400              |
| Insufficient balance                                                                                                                                       | 61001           | 400              |
| ToAccount not found                                                                                                                                        | 61002           | 400              |
| The specified sub-account could not be found                                                                                                               | 61003           | 400              |
| Duplicate requests (such as using an existing requestNo)                                                                                                   | 61004           | 400              |
| Asset transfer between accounts is not available                                                                                                           | 61005           | 403              |
| The sub-account api only supports organization accounts                                                                                                    | 61006           | 403              |
| Please complete your institution verification to enable withdrawal function.                                                                               | 61007           | 403              |
| Suspend transfer out                                                                                                                                       | 61008           | 403              |

### Spot Public Mark API Error Code

| error message                      | code error code | http status code |
| ---------------------------------- | --------------- | ---------------- |
| OK                                 | 1000            | 200              |
| no data                            | 70000           | 200              |
| request param can not be null      | 70001           | 200              |
| symbol is invalid                  | 70002           | 200              |
| after is invalid                   | 71001           | 200              |
| before is invalid                  | 71002           | 200              |
| request after or before is invalid | 71003           | 200              |
| request kline count limit          | 71004           | 200              |
| request step error                 | 71005           | 200              |

### Spot&Margin API Error Code

Example: httpStatus:200, body:{"code":
1000,"trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1","message": "OK","data": {}}

| error message                                                                                                                                            | code error code | http status code |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| OK                                                                                                                                                       | 1000            | 200              |
| Bad Request                                                                                                                                              | 50000           | 400              |
| Symbol not found                                                                                                                                         | 50001           | 400              |
| From Or To format error                                                                                                                                  | 50002           | 400              |
| Step format error                                                                                                                                        | 50003           | 400              |
| Kline size over 500                                                                                                                                      | 50004           | 400              |
| Order Id not found                                                                                                                                       | 50005           | 400              |
| Minimum size is %s                                                                                                                                       | 50006           | 400              |
| Maximum size is %s                                                                                                                                       | 50007           | 400              |
| Minimum price is %s                                                                                                                                      | 50008           | 400              |
| Minimum count\*price is %s                                                                                                                               | 50009           | 400              |
| RequestParam size is required                                                                                                                            | 50010           | 400              |
| RequestParam price is required                                                                                                                           | 50011           | 400              |
| RequestParam notional is required                                                                                                                        | 50012           | 400              |
| Maximum limit\*offset is %d                                                                                                                              | 50013           | 400              |
| RequestParam limit is required                                                                                                                           | 50014           | 400              |
| Minimum limit is 1                                                                                                                                       | 50015           | 400              |
| Maximum limit is %d                                                                                                                                      | 50016           | 400              |
| RequestParam offset is required                                                                                                                          | 50017           | 400              |
| Minimum offset is 1                                                                                                                                      | 50018           | 400              |
| Invalid status. validate status is \[1=Failed, 2=Success, 3=Frozen Failed, 4=Frozen Success, 5=Partially Filled, 6=Fully Fulled, 7=Canceling, 8=Canceled | 50019           | 400              |
| Balance not enough                                                                                                                                       | 50020           | 400              |
| Invalid %s                                                                                                                                               | 50021           | 400              |
| Service unavailable                                                                                                                                      | 50022           | 400              |
| This Symbol can't place order by api                                                                                                                     | 50023           | 400              |
| Order book size over 200                                                                                                                                 | 50024           | 400              |
| Maximum price is %s                                                                                                                                      | 50025           | 400              |
| The buy order price cannot be higher than the open price                                                                                                 | 50026           | 400              |
| The sell order price cannot be lower than the open price                                                                                                 | 50027           | 400              |
| Missing parameters                                                                                                                                       | 50028           | 400              |
| The parameters do not match                                                                                                                              | 50029           | 400              |
| Order is already canceled                                                                                                                                | 50030           | 400              |
| Order is already completed                                                                                                                               | 50031           | 400              |
| Order does not exist (completed or cancelled)                                                                                                            | 50032           | 400              |
| The order quantity should be greater than 0 and less than or equal to 10                                                                                 | 50033           | 400              |
| The price is high and there is no matching depth                                                                                                         | 50034           | 400              |
| The price is low and there is no matching depth                                                                                                          | 50035           | 400              |
| Cancel failed, order is not revocable status                                                                                                             | 50036           | 400              |
| The maximum length of clientOrderId cannot exceed 32                                                                                                     | 50037           | 400              |
| ClientOrderId only allows a combination of numbers and letters                                                                                           | 50038           | 400              |
| Order_id and clientOrderId cannot be empty at the same time                                                                                              | 50039           | 400              |
| Symbol Not Available                                                                                                                                     | 50040           | 400              |
| Out of query time range                                                                                                                                  | 50041           | 400              |
| clientOrderId is duplicate                                                                                                                               | 50042           | 400              |
| Currency not found                                                                                                                                       | 51000           | 400              |
| Margin Account not Opened                                                                                                                                | 51001           | 400              |
| Margin Account Not Available                                                                                                                             | 51002           | 400              |
| Account Limit                                                                                                                                            | 51003           | 400              |
| Exceed the maximum number of borrows available                                                                                                           | 51004           | 400              |
| Less than the minimum borrowable amount                                                                                                                  | 51005           | 400              |
| Exceeds the amount to be repaid                                                                                                                          | 51006           | 400              |
| order_mode not found                                                                                                                                     | 51007           | 400              |
| Operation is limited, please try again later                                                                                                             | 51008           | 400              |
| Parameter mismatch: limit order/market order quantity should be greater than the minimum number of should buy/sell                                       | 51009           | 400              |
| Parameter mismatch: limit order price should be greater than the minimum buy price                                                                       | 51010           | 400              |
| Parameter mismatch: Limit order quantity \* price should be greater than the minimum transaction amount                                                  | 51011           | 400              |
| Participation mismatch: the number of market order buy orders should be greater than the minimum buyable amount                                          | 51012           | 400              |
| Parameter mismatch: the price of market order buy order placed is too small                                                                              | 51013           | 400              |
| Parameter mismatch: the amount of market order sell orders placed is too small                                                                           | 51014           | 400              |
| Quantity is too small                                                                                                                                    | 51015           | 400              |
| There is no Margin Borrowing                                                                                                                             | 51024           | 400              |
| Unsupported OrderMode Type                                                                                                                               | 52000           | 400              |
| Unsupported Trade Type                                                                                                                                   | 52001           | 400              |
| Unsupported Side Type                                                                                                                                    | 52002           | 400              |
| Unsupported Query State Type                                                                                                                             | 52003           | 400              |
| End time must be greater than or equal to Start time                                                                                                     | 52004           | 400              |
| Your account is frozen due to security policies. Please contact customer service                                                                         | 53000           | 403              |
| Your kyc country is restricted. Please contact customer service.                                                                                         | 53001           | 403              |
| Your account has not yet completed the kyc advanced certification, please complete first                                                                 | 53002           | 403              |
| No permission, please contact the main account                                                                                                           | 53003           | 403              |
| This trading pair is not available to trade in your region                                                                                               | 53004           | 403              |
| Don't have permission to access the interface                                                                                                            | 53005           | 403              |
| Please complete your personal verification(Starter)                                                                                                      | 53006           | 403              |
| Please complete your personal verification(Advanced)                                                                                                     | 53007           | 403              |
| Services is not available in your countries and areas                                                                                                    | 53008           | 403              |
| Your account has not yet completed the qr code certification, please complete first                                                                      | 53009           | 403              |
| This account is restricted from borrowing                                                                                                                | 53010           | 403              |
| Your account type is prohibited from using this feature                                                                                                  | 53011           | 403              |
| Method Not Allowed                                                                                                                                       | 57001           | 405              |
| Unsupported Media Type                                                                                                                                   | 58001           | 415              |
| User account not found                                                                                                                                   | 59001           | 400              |
| Internal Server Error                                                                                                                                    | 59002           | 500              |
| Spot wallet call fail                                                                                                                                    | 59003           | 500              |
| Margin wallet service call exception                                                                                                                     | 59004           | 500              |
| Margin wallet service restricted                                                                                                                         | 59005           | 500              |
| Transfer fail                                                                                                                                            | 59006           | 500              |
| Get symbol risk data fail                                                                                                                                | 59007           | 500              |
| Trading order failure                                                                                                                                    | 59008           | 500              |
| Loan success,but trading order failure                                                                                                                   | 59009           | 500              |
| Insufficient loan amount.                                                                                                                                | 59010           | 500              |
| The Get Wallet Balance service call fail, please try again later                                                                                         | 59011           | 500              |

## WebSocket Error Code

> Error Code Format

Copy Success

Copy to Clipboard

`{"event":"<operation>", "errorMessage":"", "errorCode":""}`

### Error Code

| Error Message                                                                                    | Error Code |
| ------------------------------------------------------------------------------------------------ | ---------- |
| Invalid message format                                                                           | 90001      |
| Invalid op param                                                                                 | 90002      |
| Invalid args param                                                                               | 90003      |
| Invalid channel param                                                                            | 90004      |
| Topic quantity in single subscription exceeds limit                                              | 90005      |
| Subscribed total topic quantity exceeds limit                                                    | 90006      |
| Subscribed message frequency exceeds limit, please try later                                     | 90007      |
| Duplicate subscription                                                                           | 90008      |
| Invalid subscription                                                                             | 90009      |
| API KEY is empty                                                                                 | 91001      |
| API KEY not found                                                                                | 91002      |
| API KEY has frozen                                                                               | 91003      |
| API KEY over expire time                                                                         | 91004      |
| Already logged in                                                                                | 91005      |
| User not logged in / User must be logged in                                                      | 91006      |
| Param sign is empty                                                                              | 91010      |
| Param sign is wrong                                                                              | 91011      |
| Param timestamp is empty                                                                         | 91021      |
| Param timestamp range. Within a minute                                                           | 91022      |
| Param timestamp invalid format                                                                   | 91023      |
| Invalid symbol param                                                                             | 92001      |
| Frequently reestablishing connections in a short period of time                                  | 94001      |
| The number of connections established between a single IP and the server exceeds the upper limit | 94002      |
| Internal system error                                                                            | 95000      |
