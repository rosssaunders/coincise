# HTX Public WebSocket API Documentation

## Swap API FAQ

### Access and Authentication

#### Q1: Is the API Key for swap and spot the same ?

Yes. The Swap API key and spot API key are same. You can create API using the following link. [click here](https://www.hbg.com/zh-cn/apikey/)

#### Q2: Why are APIs disconnected or timeout?

1.  The network connection is unstable if the server locates in China mainland,it is suggested to invoke APIS from a server located in 1c area of AWS Tokyo.
    
2.  You can use api.btcgateway.pro or api.hbdm.vn to debug for China mainland network.
    

#### Q3: Why is the websocket often disconnected?

It seems that most of the abnormal websocket issues (such as disconnect, websocket close )(websocket: close 1006 (abnormal closure))are caused by different network environment. The following measures can effectively reduce websocket issues.

It would be better if the server is located in 1c area of AWS Tokyo with url api.hbdm.vn and implement websocket re-connection mechanism. Both market heartbeat and order heartbeat should response with Pong with different format, following Websocket market heartbeat and account heartbeat requirement.[here](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#market-heartbeat)

#### Q4: what is the difference between api.hbdm.com and api.hbdm.vn?

The api.hbdm.vn uses AWS's CDN service. it should be more stable and faster for AWS users. The api.hbdm.com uses Cloudflare's CDN service.

#### Q5: What is the colocation service ? which attention points should we know ?

Actually ,colo corresponds to a vpc node, which directly connects to private network of HTX's future, so it will reduce the latency between the client and the HTX future server (bypassing the CDN)

HTX future and HTX swap have the same colo, so the domain name connecting the USDT Margined Contracts api and the future api are the same.

Note : Colo needs to use api.hbdm.com for signature(authentication) to avoid getting 403 error: Verification failure.

#### Q6: Why does signature verification return failure (403: Verification failure) ?

The signature process of USDT Margined Contracts is similar to HTX future and coin margined swap . In addition to the following precautions,please refer to the swap or future demo to verify whether the signature is successful. Please check your own signature code after demo verification is successful. The coin margined swap code demo is [here](https://docs.huobigroup.com/docs/coin_margined_swap/v1/en/#code-demo). The future code demo is [here](https://docs.huobigroup.com/docs/dm/v1/en/#code-demo). The USDT Margined Contracts code demo is [here](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#code-demo).

1.  Check if the API key is valid and copied correctly.
2.  Check if the IP is in whitelist
3.  Check if th timestamp is UTC time
4.  Check if parameters are sorted alphabetically
5.  Check if the encoding is UTF-8
6.  Check if the signature has base64 encoding
7.  Any method with parameters for GET requests should be signed
8.  Any method with parameters for POST requests don't need to be signed
9.  Check if whether the signature is URI encoded and Hexadecimal characters must be capitalized, such as ":" should be encoded as "%3A", and the space shoule be encoded as "%20"
10.  The authorization of websocket is similar to the authorization of restful interface.Pls note that the json body of the websocket authorization shouldn't be URL encoded
11.  The host in signature text should be the same as the host in your API request.The proxy may change the request host, you can try without proxy;Some http/websocket library may include port in the host, you can try to append port in signature host, like "api.hbdm.com:443"
12.  The hidden text in API Key and Secret Key may have impact on the signature.

If the reason for signature failure has not been found through the above methods. And you can confirm that by this [demo](https://github.com/hbdmapi/huobi_api_rules) which is specially explaining the signature.

#### Q7: Is the ratelimit of public market based on IP ? Is the ratelimit of interface with private key based on UID?

Yes. The ratelimit of interface with private key is based on the UID, not the API key. The master and sub accounts are separately ratelimited and don't affect each other.

#### Q8: Is there any recommendation for third-party framework which integrates HTX swap?

There is an open source asynchronous quantization framework which integrates HTX future and HTX swap: [here](https://github.com/hbdmapi/hbdm_Python). If you have any quetsions, please open a ticket in github issues.

### Settlement

#### Q1: What is the USDT Margined Swap funding rate settlement cycle? Which interface can be used to check the status when the fund rate is settled?

We warmly remind you that HTX USDT Margined Swap is settled every 8 hours, and the settlement will be at the end of each period. For example, 00:00 - 08:00 is a period, and its settlement time would be at 08:00; 08:00 - 16:00 is a period, and its settlement time would be at 16:00; 16:00 - 00:00 (+1 day) is a period, and its settlement time would be at 00:00. All times mentioned above are Singapore Standard time (GMT+8).

（1）Orders can't be placed or cancelled during settlement period, error code "1056" will be returned if users place or cancel orders.

You are recommended to request contract information by this two ways:

-   restful, every few seconds during settlement period to access: /linear-swap-api/v1/swap\_contract\_info
-   websocket, Subscribe Contract Info (no authentication): public.\$symbol.contract\_info

It's in settlement time if there is any number of 5, 6, 7, 8 included in the returned status code of contract\_status, while it indicates that settlement completed and users could place and cancel orders as usual if the returned status code is 1.

（2）When querying fund or position information during the settlement period, error codes will be returned. Error code and their meaning are as following:

1.  Error code "1077" indicates that "the fund query of current perpetual swap trading pair failed during the settlement";
2.  Error code "1078" indicates that "the fund query of part of perpetual swap trading pairs failed during the settlement";
3.  Error code "1079" indicates that "the position query of current perpetual swap trading pair failed during the settlement";
4.  Error code "1080" indicates that "the position query of part of perpetual swap trading pairs failed during the settlement";

You are recommended to read the status code from the returned message. If the above four types of status code appear, the returned data is not accurate and couldn't be used as reference.

#### Q2: How to query the system status of the exchange?

There are two common statuses of the exchange systems: settlement/delivery in progress; suspended for maintenance; when the system is in these two kinds of statuses, the system will return the response error code and error information when calling the related API interfaces.

a. How to judge whether the settlement/delivery has been done?

Users can judge from the value “contract\_status” returned by the “Get Information of an Order” interface (/linear-swap-api/v1/swap\_contract\_info);

or Subscribe Contract Info (no authentication): public.\$symbol.contract\_info

If the return parameter contract\_status is 1, it means that the settlement/delivery has been done and the trading has been resumed now.

b. How to judge whether the system is suspended for maintenance or not?

Users can judge from the value “heartbeat” pushed by the “Queried if system interface is available” interface (https://api.hbdm.com/heartbeat/)

or the “Subscribe system status updates” interface ("topic: public.\$service.heartbeat");

If the return parameter heartbeat is 1, it means that the system is available now and can be connected normally.

### Details of Each Error Code

| Error Code | Error Details Description |
| --- | --- |
| 403 | invalid ID |
| 1000 | System error. |
| 1001 | System is unprepared. |
| 1002 | Query error. |
| 1003 | Abnormal redis operation. |
| 1004 | System busy. Please try again later. |
| 1010 | Account doesn't exist. |
| 1011 | The user's session doesn't exist. |
| 1012 | The user's account doesn't exist. |
| 1013 | This contract symbol doesn't exist. |
| 1014 | This contract doesn't exist. |
| 1015 | The index price does not exist. |
| 1016 | The bid offer does not exist. Please input the price. |
| 1017 | Order doesn't exist. |
| 1018 | Main account doesn't exist. |
| 1019 | Main account doesn't exist in the sub-account white list. |
| 1020 | The number of your sub-account exceeds the maximum. Please contact customer service. |
| 1021 | Account open failed. Main account hasn’t opened contract trading account yet. |
| 1030 | Input error. |
| 1031 | Incorrect form source. |
| 1032 | The number of access exceeded the limit. |
| 1033 | Incorrect field of contract period. |
| 1034 | Incorrect field of order price type. |
| 1035 | Incorrect field of form direction. |
| 1036 | Incorrect field of open long form. |
| 1037 | The leverage is invalid. Please contact the customer service. |
| 1038 | The order price exceeds the precision limit, please modify and order again. |
| 1039 | Buy price must be lower than {0}{1}. Sell price must exceed {2}{3}. |
| 1040 | Invalid amount, please modify and order again. |
| 1041 | The order amount exceeds the limit ({0}Cont), please modify and order again. |
| 1042 | Current positions have triggered position limits ({0}Cont). Please order after changing the amount. |
| 1043 | Current positions have triggered position limits ({0}Cont). Please order after changing the amount. |
| 1044 | Current positions have triggered position limits of our platform. Please order after changing the amount. |
| 1045 | Unable to switch leverage due to open orders. |
| 1046 | Abnormal service. Please try again later. |
| 1047 | Insufficient margin available. |
| 1048 | Insufficient close amount available. |
| 1049 | Open a position with market price is not available.contracts |
| 1050 | Customer's order number is repeated. Please try again later. |
| 1051 | No orders to cancel. |
| 1052 | The number exceeds the batch limit. |
| 1053 | Unable to get the latest price range. |
| 1054 | Unable to get the latest price. |
| 1055 | The price is not reasonable, and the account equity will be less than 0 after placing this order. Please modify the price and place the order. |
| 1056 | In settlement. Your order can’t be placed/withdrew currently. |
| 1057 | Your order can’t be placed due to trading halt. |
| 1058 | Your order can’t be placed due to trade suspension. |
| 1059 | In delivery. Your order can’t be placed/withdrew currently. |
| 1060 | Your order can’t be placed currently due to abnormal contracts status. |
| 1061 | This order doesn't exist. |
| 1062 | Cancelling. Please be patient. |
| 1063 | The order has been executed. |
| 1064 | The main key of order conflicts. |
| 1065 | The form number of client isn't an integer. |
| 1066 | {0} cannot be empty. |
| 1067 | Illegal parameter {0}. |
| 1068 | Export error. |
| 1069 | The price is not reasonable. |
| 1070 | Empty data, cannot be exported. |
| 1071 | Repeated cancellation. Your order has been canceled. |
| 1072 | Sell price must be lower than {0}{1}. |
| 1073 | Position abnormal. Please contact the customer service. |
| 1074 | Unable to order currently. Please contact the customer service. |
| 1075 | The price is not reasonable, and the margin rate will be less than 0 after placing this order. Please modify the price and place the order. |
| 1076 | No orders, please try again later. |
| 1077 | In settlement or delivery. Unable to get assets of current contract. |
| 1078 | In settlement or delivery. Unable to get assets of some contracts. |
| 1079 | In settlement or delivery. Unable to get positions of current contract. |
| 1080 | In settlement or delivery. Unable to get positions of some contracts. |
| 1081 | The number of your {0} contract trigger orders exceeds the limit {1}. |
| 1082 | Trigger type parameter error. |
| 1083 | Your position is in the process of forced liquidation. Unable to place order temporarily. |
| 1084 | Your contract API is disabled, please try again after {0} (GMT+8). |
| 1085 | Trigger order failed, please modify the price and place the order again or contact the customer service. |
| 1086 | {0} contract is restricted of opening positions on {1}. Please contact customer service. |
| 1087 | {0} contract is restricted of closing positions on {1}. Please contact customer service. |
| 1088 | {0} contract is restricted of withdraw order on {1}. Please contact customer service. |
| 1089 | Transfer is temporarily restricted for {0} account, please contact customer service support. |
| 1090 | Margin rate is lower than 0. Order can’t be placed. |
| 1091 | Equity is less than 0. Order can’t be placed. |
| 1092 | The Flash Closing Order takes the {0}th price at the order book. After placing an order, the account equity will be less than 0. Please manually enter the price or place an order with the counterparty price. |
| 1093 | The Flash Closing Order takes the {0}th price at the order book. The margin rate will be less than 0 after placing an order. Please manually enter the price or place an order with the counterparty price. |
| 1094 | The leverage cannot be empty, please switch the leverage or contact customer service |
| 1095 | Non-trading state, unable to switch the leverage temporarily |
| 1100 | Unable to open a position currently. Please contact the customer service. |
| 1101 | Unable to close a position currently. Please contact the customer service. |
| 1102 | Unable to transfer in currently. Please contact customer service. |
| 1103 | Unable to transfer out currently. Please contact customer service. |
| 1104 | Trading is prohibited due to contracts trading constraints. |
| 1105 | Only Close is available due to contracts trading constraints. |
| 1106 | Delivery or settlement in progress, unable to transfer. |
| 1108 | Abnormal service. Please try again later. |
| 1109 | Sub-account doesn't own the permissions to open positions. Please contact customer service. |
| 1110 | Sub-account doesn't own the permissions to close positions. Please contact customer service. |
| 1111 | Sub-account doesn't own the permissions to transfer in. Please contact customer service. |
| 1112 | Sub-account doesn't own the permissions to transfer out. Please contact customer service. |
| 1113 | The sub-account does not have transaction permissions. Please login main account to authorize. |
| 1114 | The sub-account does not have transfer permissions. Please login main account to authorize. |
| 1115 | You have no access permissions of this sub-account. |
| 1200 | Login error. Please try again. |
| 1220 | You don’t have access permission as you have not opened contracts trading. |
| 1221 | The total balances of Exchange Account can't meet the requirements for opening contracts. |
| 1222 | The days of opening account can't meet the requirements for opening contracts. |
| 1223 | The VIP level can't meet the requirements for opening contracts. |
| 1224 | Your country/region can't meet the requirements for opening contracts. |
| 1225 | Failed to open contracts. |
| 1226 | Repeated account. |
| 1227 | Huobi Contract does not support sub-accounts. Please log out sub-account and log in again with primary account. |
| 1228 | You have not activated contract trading currently, please activate first. |
| 1229 | Cannot agree twice. |
| 1230 | You haven't finished the risk verification. |
| 1231 | You haven't finished the ID Verification. |
| 1232 | The format/size of the image you uploaded does not meet the requirements. Please re-upload. |
| 1233 | High leverage is not enabled (Please sign in the APP or web with your main account to agree to the High-Leverage Agreement) |
| 1234 | For {0} contracts, the number of the position-opening orders which are not fully filled cannot exceed {1}. |
| 1235 | For {0} contracts, the number of the position-closing orders which are not fully filled cannot exceed {1}. |
| 1250 | Unable to get the HT\_token. |
| 1251 | Unable to get BTC assets. Please try again later. |
| 1252 | Unable to get currency account assets. Please try again later. |
| 1253 | Error in signature verification. |
| 1254 | The sub-account has no permission to open futures, please go to the web side to log in the main account and open. |
| 1300 | Transfer failed. |
| 1301 | Insufficient amount available. |
| 1302 | Transfer failed. |
| 1303 | The single transfer-out amount must be no less than {0}{1}. |
| 1304 | The single transfer-out amount must be no more than {0}{1}. |
| 1305 | The single transfer-in amount must be no less than {0}{1}. |
| 1306 | The single transfer-in amount must be no more than {0}{1}. |
| 1307 | Your accumulative transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being. |
| 1308 | Your accumulative transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being. |
| 1309 | Your accumulative net transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being. |
| 1310 | Your accumulative net transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being. |
| 1311 | The platform's accumulative transfer-out amount is over the daily maximum. You can't transfer out for the time being. |
| 1312 | The platform's accumulative transfer-in amount is over the daily maximum. You can't transfer in for the time being. |
| 1313 | The platform's accumulative net transfer-out amount is over the daily maximum. You can't transfer out for the time being. |
| 1314 | The platform's accumulative net transfer-in amount is over the daily maximum. You can't transfer in for the time being. |
| 1315 | Wrong transfer type. |
| 1316 | Failed to freeze the transfer. |
| 1317 | Failed to unfreeze the transfer. |
| 1318 | Failed to confirm the transfer. |
| 1319 | Failed to acquire the available transfer amount. |
| 1320 | The contract status is abnormal. Transfer is unavailable temporarily. |
| 1321 | Transfer failed. Please try again later or contact customer service. |
| 1322 | Invalid amount. Must be more than 0. |
| 1323 | Abnormal service, transfer failed. Please try again later. |
| 1325 | Failed to set trading unit |
| 1326 | Failed to obtain trading units |
| 1327 | No transfer permission, transfer failed, please contact customer service |
| 1328 | No transfer permission, transfer failed, please contact customer service |
| 1329 | No transfer permission, transfer failed, please contact customer service |
| 1330 | No transfer permission, transfer failed, please contact customer service |
| 1331 | Exceeds limit of transfer accuracy (8 digits). Please modify it |
| 1332 | The contract doesn't exist. |
| 1333 | Failed to open the Maker&Taker agreement |
| 1334 | Failed to check the Maker&Taker agreement |
| 1335 | Failed to check the second confirmation setting of Maker&Taker |
| 1336 | Failed to update the second confirmation setting of Maker&Taker |
| 1337 | Failed to check the settings of Maker&Taker |
| 1338 | Failed to update the settings of Maker&Taker |
| 1339 | Nickname contains illegal words, please modify it |
| 1340 | Nickname has been used, please modify it |
| 1341 | The enrollment has ended |
| 1342 | You cannot set nickname for sub-account |
| 1343 | Invalid indicator, please reset |
| 1344 | Sorry, {0} contracts can add market reminders currently at most |
| 1345 | Sorry, currently {0} can set up to {1} reminders |
| 1346 | The indicator already exists, please do not set it repeatedly |
| 1347 | {0} parameter is incorrect, please modify. |
| 1348 | This contract does not support cross margin mode. |
| 1349 | The leverage of the order does not match the leverage of the current position, please switch the leverage first. |
| 1401 | order price shall be lower than the strike price. |
| 1403 | The number of take-profit and stop-loss orders for {0} contract shall not exceed {1} |
| 1404 | Take-profit and stop-loss orders can only be bound with orders for opening a position |
| 1405 | The take-profit price shall not be {0}{1}{2} |
| 1406 | Your chances of lucky draw have been used up |
| 1407 | The stop-loss price shall not be {0}{1}{2} |
| 1408 | Unable to cancel because the take-profit and stop-loss order does not take effect. |
| 1409 | You have no access to set a take-profit and stop-loss order, please contact our customer service. |
| 1410 | The number of sub-accounts for batch operation cannot exceed {0} |
| 1411 | Settlement in progress, unable to query order information. |
| 1412 | {0} does not meet with the price precision limit {1}. |
| 1413 | You have no access to set a Trailing Stop order, please contact our customer service. |
| 1414 | You have not activated the grid trading. Please log in to the Web or APP with your main account, and agree with the protocol to activate the grid trading. |
| 1415 | Terminate price (Take-profit/Stop-loss price) cannot be within the range of grid price, please modify! |
| 1416 | Exceeds the maximum running time, which is{0} days and {1} hours, please modify! |
| 1417 | Exceeds the range of grid quantity, which is ({0} ~ {1}), please modify! |
| 1418 | At most {0} grids trading orders can be running at the same time, please cancel other grid trading orders first. |
| 1419 | Exceeds the range of initial margin ({0} ~ {1}} {2}). |
| 1420 | You have no access to grid trading on Huobi Futures, please contact our customer service. |
| 1421 | There are open orders or positions of the current contract, please cancel these orders or close these positions first. |
| 1422 | The PnL per grid is expected to be less than 0, please modify! |
| 1423 | The spread between the lowest and the highest grid price is unreasonable, please modify! |
| 1424 | This grid trading has been terminated for other reasons. Therefore, it cannot be modified or manually terminated now. |
| 1425 | The callback rate should be {0}{1}, please modify! |
| 1426 | The activation price should be {0} the latest price. |
| 1427 | The number of your {0} contract trailing stop order orders exceeds the limit {1}. |
| 1428 | The coupon for the same type of contract can only be collected once by each user. |
| 1429 | Already received; please do not collect again! |
| 1430 | Invalid coupon; please refresh! |
| 1431 | The system is in maintenance and is expected to resume at {0} (GMT+8). |
| 1432 | A grid trading is being initialized or terminated; unable to place an order currently. |
| 1433 | The grid trading is terminated caused by placing/canceling order manually; please check “Order History” for details. |
| 1434 | Less than the minimum initial margin ({0}{1}), which causes the quantity per grid less than the minimum order quantity, please modify! |
| 1435 | The grid has been terminated by you. |
| 1436 | The grid trading exceeds the effective duration; terminated automatically. |
| 1437 | The grid trading has been terminated for system reasons, please contact our customer service. |
| 1438 | The grid trading has been terminated due to the termination condition being triggered. |
| 1439 | The grid trading has been terminated due to a liquidation being triggered. |
| 1440 | {0} contracts fail to be cancelled. |
| 1441 | The trigger price must be lower than the highest termination price and higher than the lowest termination price, please modify! |
| 1442 | The effective duration must be a minute longer than the running time, please modify! |
| 1443 | Delivery of {0} contract causes grid trading termination. |
| 1450 | The risk level you ranked does not support the use of current leverage. |
| 1451 | The risk level you ranked does not support the use of current leverage, please log in the main account for checking. |
| 1452 | The number of grid orders exceeds the order quantity limits; Unable to place any order temporarily. |
| 1453 | The number of all your trigger orders exceeds the limit set by the platform; Unable to place any orders temporarily. |
| 1454 | The number of all your take profit and stop loss orders exceeds the limit set by the platform; Unable to place any orders temporarily. |
| 1455 | The number of all your trailing stop orders exceeds the limit set by the platform; Unable to place any orders temporarily. |
| 1484 | Reverse order involves Reduce Only order. |
| 1485 | One-way mode is unavailable for grid trading. |
| 1486 | One-way mode is unavailable temporarily. |
| 1487 | We are sorry you have no access to one-way mode. |
| 1488 | Opening positions is unavailable in one-way mode temporarily. |
| 1489 | Closing positions is unavailable in one-way mode temporarily. |
| 1490 | Opening after closing exceeds the limit (conts). |
| 1491 | Reduce Only order parameter error! |
| 1492 | Amount of Reduce Only order exceeds the amount available to close. |
| 1493 | Position mode cannot be adjusted for open orders. |
| 1494 | Position mode cannot be adjusted for existing positions. |
| 1495 | Position mode cannot be adjusted for open grid orders. |
| 1496 | Position mode cannot be adjusted due to the contract’s non-trading status. |
| 1497 | Position mode parameter passing error! |
| 1498 | Margin account incorrect! |
| 1499 | Hedge mode currently; Unavailable to place orders in one-way mode. |
| 1500 | One-way mode currently; Unavailable to place orders in hedge mode. |
| 12001 | Invalid submission time. |
| 12002 | Incorrect signature version. |
| 12003 | Incorrect signature method. |
| 12004 | Private key is expired. |
| 12005 | Incorrect IP address. |
| 12006 | The submission time can't be empty. |
| 12007 | Incorrect public key. |
| 12008 | Verification failed. |
| 12009 | The user is locked or doesn't exist. |

### Market and Websocket

#### Q1: How often are the snapshot orderbook subscription and incremental orderbook subscription pushed?

The snapshot orderbook subscription(market.\$contract\_code.depth.\$type) is checked once every 100MS.If there is an update,it will be pushed. It will be pushed at least 1 second.The incremental orderbook subscription is checked once every 30MS.If there is an update,it will be pushed.If there is no update, it will not be pushed.

#### Q2: How often is the market trade subscription pushed?

The market trade subscription will be pushed when there is a transaction.

#### Q3: Are there historical Kline data or historical market trade data?

The historical kline data can be obtained via API interface /market/history/kline with the request params from, to (the time period cannot exceed two years). And the qty of data records cannot be exceeding 2000 in each time.

The historical trade data can be obtained by subscribing the websocket topic: market.\$symbol.trade.detail

or can be downloaded from [download historical market data](https://futures.huobi.be/zh-cn/data/landing_page)

But also, you can download that data using [The demo of downloading historical market data](https://github.com/hbdmapi/huobi_public_data)

#### Q4: How to get MACD and other technical indicators on Kline?

The API does not have interfaces to get technical indicators such as MACD. You can refer to TradingView and other websites to calculate them.

#### Q5: What is the definition of timestamp in the document?

The timestamp in the document refers to the total number of seconds or total milliseconds from Greenwich Mean Time, January 1, 1970, 00:00:00 (Beijing Time, January 1, 1970, 08:00:00) to the present.

#### Q6: What is the definition of the 150 level and 20 level of MBP?

The Subscription of MBP data: market.\$contract\_code.depth.\$type.150 price level means the current bids and asks splited into 150 level by price.20 price level means the current bids and asks splited into 20 level by price.

#### Q7: What is the meaning of merged depth when subscribing MBP data?

The subscrpition of MBP data:market.\$contract\_code.depth.\$type：

step16 and step18 are merged by 7 decimal places.bids down,asks up.step17 and step19 are merged by 6 decimal places.bids down,asks up.step1 and step7 are merged by 5 decimal places.bids down,asks up.step2 and step8 are merged by 4 decimal places.bids down,asks up.step3 and step9 are merged by 3 decimal places.bids down,asks up.step4 and step10 are merged by 2 decimal places.bids down,asks up.step5 and step11 are merged by 1 decimal places.bids down,asks up.step12 and step14 are combined by single digit.bids down,asks up.step13 and step15 are combined by tens.bids down,asks up.

Example:

step4(0.01):

bids price: 100.123, 100.245.The merged bids price are 100.12, 100.24.

asks price: 100.123, 100.245The merged asks price are 100.13, 100.25.

("Down" and "Up" are rounded up or down, if the price is down, the asks price is not rounded down, and the bids price is rounded up.)

150 price level: step0 to step5, step14 to step17；

20 price level: step6 to step13, step18, step19;

More examples：

step1(0.00001):

price: 1.123456The merged bid price is 1.12345.The merged ask price is 1.12346.

step7(0.00001):

price: 1.123456The merged bid price is 1.12345.The merged ask price is 1.12346.

step6(0.000001)

price: 1.123456The merged bid price is 1.123456.The merged ask price is 1.123456.

step11(0.1):

price: 1.123456The merged bid price is 1.1.The merged ask price is 1.1.

#### Q8:Does websocket's position channel push full data or incrementall data each time?

Subscription of position event: "positions.BTC-USDT".The latest position is pushed,including the volumes, available volumes, frozen volumes.If there is no update,it will not be pushed.

#### Q9: Does websocket's position channel push data when the unrealized profit is updated?

Subscription of position event: "positions.BTC-USDT".It will not be pushed if only unrealized profit is updated.It will be pushed only when position event is updated.

#### Q10: What is the difference between market detail and trade detail in WS?

Market Detail(market.\$contract\_code.detail) is the merged market data. It will be checked every 0.5s,pushed once trade event updates,including the OHLCV data,etc.Trade Detail(market.\$contract\_code.trade.detail) is pushed once trade event updates,including trade price, trade volume, trade direction,etc.

#### Q11: What is the meaning of the two ts pushed by subscription of incremental MBP ?

Subscription of incremental MBP：market.\$contract\_code.depth.size\_\${size}.high\_freq，The outer ts is the timestamp when the market server sends the data.The inner ts is the timestamp when the orderbook is checked.

#### Q12: What is the difference between websocket subscription of MBP and incremental MBP? How often is the incremental MBP pushed?

market.\$contract\_code.depth.\$type is snapshot MBP data，market.\$contract\_code.depth.size\_\${size}.high\_freq is incremental MBP data.Snapshot MBP data is checked every 100ms,pushed at least every 1s.Incremental MBP data is checked every 30ms.It will not be pushed,if MBP has no update.

#### Q13: How to maintain local MBP data subscribing incremental MBP:market.\$contract\_code.depth.size\_\${size}.high\_freq?

Snapshot MBP data will be pushed for the first time, and the incremental MBP data will be pushed afterwards.

(1) Compare the incremental price with the previous full MBP data, and replace the order amount with the same price;

(2) If the price is not in the local MBP data,add the price to the local MBP data;

(3) If a price level is gone, data such as \[8100, 0\] will be pushed.You have to remove the same price of local MBP data;

(4) For the same websocket connection, the incremental data version is incremented; if the version is not incremented, you need to re-subscribe and re-maintain the local full MBP data;

#### Q14: What's the difference between "funding\_rate" and "realized\_rate" in the response of /linear-swap-api/v1/swap\_historical\_funding\_rate interface?

Generally, "funding\_rate" is equal to "realized\_rate".Only when the payment of funding fee will cause the liquidation of the user's position, the funding fee is under or not charged(And the fee is the actual funding fee:"realized\_rate").The current funding rate:"funding\_rate" remains unchanged.

#### Q15: When subscribing the same topic of several contract codes, will several ws be needed?

Since Futures, Coin Margined swaps, USDT Margined Contracts and Options are different contracts with different interface addresses, different ws will be needed.

In Futures, Coin Margined swaps, USDT Margined Contracts and Options thereof, as long as the interface address is the same, one ws is enough.

#### Q16: Is it available to place/cancel an order via WS??

Currently, it is not supported.

#### Q17: How to subscribe order status?

a. Successfully trade: “Subscribe Match Order Data (matchOrders.\$contract\_code)” or “Subscribe Order Data (orders.\$contract\_code)”

b. Successfully cancel: Subscribe Account Equity Updates Data (accounts.\$contract\_code)

#### Q18: What is the difference between the “Subscribe Match Order Data (matchOrders.\$contract\_code)” and “Subscribe Order Data (orders.\$contract\_code)”?

The pushed data of these two interfaces are different. Compared to “Subscribe Match Order Data (matchOrders.\$contract\_code)”, there are more fields for “Subscribe Order Data (orders.\$contract\_code)”

In general, the match order data (Subscribe Match Order Data “matchOrders.\$contract\_code”) may be pushed faster than the settled order data (Subscribe Order Data “orders.\$contract\_code”).

The orders of forced liquidation and netting will not be pushed in “Subscribe Match Order Data (matchOrders.\$contract\_code)”

#### Q19: How often is the “Subscribe Kline Data (market.\$contract\_code.kline.\$period)” pushed?

If any transaction is completed, it will push every 500ms. If not, it will push according to the subscribe period

#### Q20: How to judge whether the push is delayed?

Please first synchronize the time of the server through https://api.hbdm.com/api/v1/timestamp), and the “ts” in the returned data is timestamp (ms) and the corresponding time zone is UTC+8.

The outer layer of each pushed data has a “ts”, which represents the time stamp (ms) when the server pushes the data to the client and the corresponding time zone is UTC+8.

When the data pushed arrive, the procedure will record the local time “ts”. When the local time “ts” is much later than the pushing data “ts”, you can use the following methods to improve the delay:

a. Reduce the data pushed by reducing the number of WS subscriptions.

b. Check the stability and speed of the network between procedure and the servers (please replace api.btcgateway.pro with the domain name used by the program)

curl -o /dev/null -s -w time\_namelookup"(s)":%{time\_namelookup}"\\n"time\_connect"(s)":%{time\_connect}"\\n"time\_starttransfer"(s)":%{time\_starttransfer}"\\n"time\_total"(s)":%{time\_total}"\\n"speed\_download"(B/s)":%{speed\_download}"\\n" api.btcgateway.pro

and you will receive data as below:

time\_namelookup(s):0.001378

time\_connect(s):0.128641

time\_starttransfer(s):0.276588

time\_total(s):0.276804

speed\_download(B/s):2010.000

If you run the above command multiple times in a row, and the results obtained each time are very different, you can: a. Select an appropriate HTX domain name, b. Optimize or reselect the network where the program is located.

### Error Codes

#### Q1: What is the reason for 1030 error code?

If you encounter errors such as {"status":"error","err\_code":1030,"err\_msg":"Abnormal service. Please try again later.","ts":1588093883199},indicating that your input request parameter is not correct, please print your request body and complete URL parameters, and please check the corresponding API document interface one by one.The common example is that the volume must be an integer.

#### Q2: What is the reason for 1048 error code?

If you encounter errors such as {'index': 1, 'err\_code': 1048, 'err\_msg': 'Insufficient close amount available.'}, indicating that your available position is not enough.You need to query the api /linear-swap-api/v1/swap\_position\_info to get your available position.

1.  Check whether the amount (cont) of position-closing order exceeds the limit? (When there is limit order for closing a position, the quantity that available to be closed will be occupied; hence we kindly remind you to cancel these orders and try again.)
    
2.  Check whether direction and offset are wrong as follows:
    

close long: sell to close a long position (direction: sell; offset: close);

close short: buy to close a short position (direction: buy; offset: close);

Only “direction” need to be uploaded when placing a flash close order (close long: sell; close short: buy).

1.  The pending take-profit and stop-loss (tp/sl) orders and trigger orders will not occupy the quantity of the position.

#### Q3: What is the reason for 1032 error code?

1032 means that your request exceeds the ratelimit. The coin margined swap, future and USDT margined Contracts limit the rate separately. Please check the ratelimit in the api ratelimit instructions, and you can print the current ratelimit in the header of the API response to check whether the ratelimit is exceeded. It is recommended to increase the request interval delay to avoid exceeding the ratelimit.

## Swap WebSocket Reference

### WebSocket Subscription Address

Market Data Request and Subscription: wss://api.hbdm.com/linear-swap-ws

Order Push Subscription: wss://api.hbdm.com/linear-swap-notification

Index Kline Data and Basis Data Subscription: wss://api.hbdm.com/ws\_index

System status updates subscription ：wss://api.hbdm.com/center-notification

If the url: api.hbdm.com can't be accessed, please use the url below:

Market Data Request and Subscription Address: wss://api.btcgateway.pro/linear-swap-ws;

Order Push Subscription：wss://api.btcgateway.pro/linear-swap-notification

Index Kline Data and Basis Data Subscription: wss://api.btcgateway.pro/ws\_index

System status updates subscription ：wss://api.btcgateway.pro/center-notification

If you have further queries about HTX USDT Margined Contracts order push subscription, please refer to [Demo](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#code-demo)

#### Note:

If you can't connect "https://api.hbdm.com", please use "https://api.btcgateway.pro" for debug purpose. If your server is deployed in AWS, we recommend using "https://api.hbdm.vn".

### API Rate Limit Illustration

There is rate limit for both public and private interfaces. More details are laid out as below:

-   Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).
    
-   For public interfaces used to get information of non-market data (such as request information of index, price limit, delivery and settlement, positions, etc.), the rate limit for each IP is 240 times every 3 seconds. (Please note that the 240 times/3s rate limit is shared by all the requests for non-market data under this UID)
    
-   For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on：
    

(1) For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most　　 (2) The rate limit for “req” request is 50 times/s at most. No limit for “sub” request as the data will be pushed by server voluntarily.

-   The order push private WebSocket interface requires API Key for authentication.
    
    Each UID can create 30 WS connections at most for private order push at the same time. The user under this UID only need to subscribe one WS order push for the contracts of the same underlying coins. For example, users only need to create one WS order push connection for BTC Contract, which our system will automatically push orders of BTC weekly, BTC biweekly and BTC quarterly contracts via this connection.
    

Note: The rate limit of WS order push and RESTFUL private interface are separated from each other with no relations.

-   40 subscriptions at most can be sent in one second in websocket connections.

Response the following strings for “Header” via API

-   ratelimit-limit： the upper request limit per time, unit: times
    
-   ratelimit-interval： reset interval(reset the number of request ), unit: ms
    
-   ratelimit-remaining： available request number left in this round, unit: times
    
-   ratelimit-reset： upper limit of reset time used to request number， unit: ms

## WebSocket Heartbeat and Authentication Interface

### Market Heartbeat

WebSocket API supports two-way heartbeat. Both Server and Client can send ping message, which the opposite side can return with pong message.

-   WebSocket Server sends heartbeat：

`{"ping": 18212558000}`

-   WebSocket Client should respond:：

`{"pong": 18212558000}`

Note: Once the WebSocket Client and WebSocket Server get connected, the server will send a heartbeat every 5 seconds (the frequency might change). The connection will get disconnected automatically if the WebSocket Client ignores the heartbeat message for 5 times. The server will remain connection if the WebSocket Client responds one “ping” value within the latest 2 heartbeat messages.

### Order Push Heartbeat

#### WebSocket API supports one-way heartbeat. The Server initiates ping message and the Client will return pong message. The Server sends back a heartbeat:

`{`

`"op": "ping",`

`"ts": "1492420473058"`

`}`

-   WebSocket Client should return:

`{`

`"op": "pong",`

`"ts": "1492420473058"`

`}`

#### Note

-   "ts" value in the return "pong" message is the "ts" value from "ping" push Once the WebSocket Client and WebSocket Server connected, Websocket Server will send a heartbeat every 5 seconds (the frequency might change) to Wesocket Client. If WebSocket Client ignores the heartbeat message for 5 times, it will get disconnected with Websocket Sever automatically. Under abnormal conditions, WebSocket Server will return error message like:

`{`

`"op": "pong"`

`"ts": "1492420473027",`

`"err-code": 2011,`

`"err-msg": “detailed error message”`

`}`

-   Websocket Server disconnects automatically During period of building connection and authentication, Websocket Server will disconnect automatically if there is any error. The data structure before closing pushing are as below:

`{`

`"op": "close", // indicate Websocket Server disconnected automatically`

`"ts": long   // The local timestamp of Server push`

`}`

-   Server return error but remain connection After successful authentication, Server will return error but not disconnect if Client provides illegal Op or there is any internal error.

`{`

`"op": "error", // indicate that receive illegal Op or internal error`

`"ts": long// The local timestamp of Server push`

`}`

### Order Push Address

-   HTX USDT Margined Contracts uses one official address:

`wss://api.hbdm.com/linear-swap-notification`

#### Note

If you can't connect "https://api.hbdm.com", please use "https://api.btcgateway.pro" for debug purpose. If your server is deployed in AWS, we recommend using "https://api.hbdm.vn".

Please note that the WS request connection should not go over 30 normally.

#### Data Compression

All response data from WebSocket server are compressed into GZIP format. Clients have to decompress them for further use.

#### Illustration of Request(req and rep) Data

-   Character Encoding：UTF-8
    
-   Case sensitive，including parameter name and return parameter
    
-   Data type： use JSON to transmit data
    
-   All request data has fixed format. Please note that HTX USDT Margined Contracts API document will only focus on data illustration in non-fixed format.
    

> Request data format is laid out as below:

```
      {      "op": string, // Required; Client requests operator name (Server will returns the same value), For detailed operator name list, please refer to the appendix      "cid": string, // Optional;Request unique ID( Client generate a unique ID which server will return the same value)      // Others required/ Optional string      }        
```

> All responses push data will be returned in fixed format，HTX USDT Margined Contracts API document will only focus on data illustration， Response data format is laid out as below；

```
      {      "op": string, // Required; Clients request operator name      "cid": string, // optional; Client requests unique ID      "ts": long, // required; Server responds local timestamp      "err-code": integer, // required; return error code, “0” means successfully responded, others means error. For detailed return error code list, please refer to appendix      "err-msg": string, only responds error message when error occurs, detailed error information.       "data": object // optional; return data object， request valid data after error removed       }        
```

> Push Data Format is laid out as below:

```
      {      "op": "string", // required;Server pushes operator name, For detailed operator type list, please refer to appendix      "ts": long, // required; Server pushes local timestamp      "data": object // required;return data object      }        
```

### Server voluntarily disconnects connection

During making connection and authentication, server will disconnect connection automatically when error occurs. Before disconnecting, server will send notification below,

`{`

\`"op": "close", // represents server disconnect connection voluntarily

\`"ts": long // Server pushes local timestamp

`}`

### Server return error code but remain connection

After authentication, if clients encountered internal error or request data out from Operator List, WebSocket server will return error message. But server will remain connection

`{`

`"op": "error", // means server receive data out from Operator List or clients got internal error`

`"ts": long// Server pushes local timestamp`

`}`

## Appendix

### Operator Type(OP)

| Type | Description |
| --- | --- |
| ping | Server sends heatbeat with a Ping |
| pong | Clients responds heatbeat with a Pong |
| auth | Authentication |
| sub | Subscribe Message |
| unsub | Unsubscribe Message |
| notify | Server pushes subscribe message |

### Topic Type

| Type | applicative operator type | Description |
| --- | --- | --- |
| orders.\$contract\_code | sub,ubsub | Subscribe/unsubscribe the order data of a given pair; when the \$contract\_code value is \*, it stands for subscribing/unsubscribing the data of all pairs |

### Response code（Err-Code）

| Return Error Code | Return description |
| --- | --- |
| 0 | Request successfully. |
| 2001 | Invalid authentication. |
| 2002 | Authentication required. |
| 2003 | Authentication failed. |
| 2004 | Number of visits exceeds limit. |
| 2005 | Connection has been authenticated. |
| 2007 | You don’t have access permission as you have not opened contracts trading. |
| 2010 | Topic error. |
| 2011 | Contract doesn't exist. |
| 2012 | Topic not subscribed. |
| 2013 | Authentication type doesn't exist. |
| 2014 | Repeated subscription. |
| 2020 | This contract does not support cross margin mode. |
| 2021 | Illegal parameter margin\_account. |
| 2030 | Exceeds connection limit of single user. |
| 2040 | Missing required parameter. |

## Endpoints

### market.\$contract\_code.kline.\$period (\[General\] Subscribe Kline data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | Kline Period | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Request Parameter |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| \_\_tick\_\_ |  | false |  |  |
| id | long | true | kline id,the same as kline timestamp, kline start timestamp |  |
| mrid | long | true | ID Order ID |  |
| vol | decimal | true | Trade Volume(Cont.). Sum of both buy and sell sides |  |
| count | decimal | true | Order Quantity. Sum of both buy and sell sides |  |
| open | decimal | true | Open Price |  |
| close | decimal | true | Clos Price, the price in the last kline is the latest order price |  |
| low | decimal | true | Low Price |  |
| high | decimal | true | High Price |  |
| amount | decimal | true | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.kline.1min",
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.BTC-USDT.kline.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.kline.1min",
  "ts": 1603707124366,
  "tick": {
    "id": 1603707120,
    "mrid": 131592424,
    "open": 13067.7,
    "close": 13067.7,
    "high": 13067.7,
    "low": 13067.7,
    "amount": 0.004,
    "vol": 4,
    "trade_turnover": 52.2708,
    "count": 1
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.kline.1min",
  "id": "id1"
}
```

### market.\$contract\_code.kline.\$period (\[General\] Request Kline data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | Kline Period | 1min, 5min, 15min, 30min, 60min,4hour,1day,1week, 1mon |  |

Notes:

If between time range \[t1, t5\], there are t1-t5 KLines in quantity.

from: t1, to: t5, return \[t1, t5\].

from: t5, to: t1, which t5 > t1, return \[\].

from: t5, return \[t5\].

from: t3, return \[t3, t5\].

to: t5, return \[t1, t5\].

from: t which t3 < t to: t which t3 < t from: t1 and to: t2, should satisfy 1325347200 < t1 < t2 < 2524579200.

Clients can request 2000 Klines at most in one request

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Request Parameter |  |
| status | string | true | status |  |
| id | string | true | Request ID |  |
| wsid | long | true | wsid |  |
| DATA\_START |  | false |  |  |
| id | long | true | kline id,the same as kline timestamp, kline start timestamp |  |
| vol | decimal | true | Trade Volume(Cont.). Sum of both buy and sell sides |  |
| count | decimal | true | Order quantity. Sum of both buy and sell sides |  |
| open | decimal | true | Open Price |  |
| close | decimal | true | Clos Price, the price in the latest Kline is the last order price |  |
| low | decimal | true | Low Price |  |
| high | decimal | true | High Price |  |
| amount | decimal | true | Trade Amount(Coin), trade amount(coins)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.BTC-USDT.kline.1min",
  "id": "id4",
  "from": 1579247342,
  "to": 1579247342
}
```

#### Example of a Successful Subscription

```
{
  "id": "id4",
  "rep": "market.BTC-USDT.kline.60min",
  "wsid": 467277265,
  "status": "ok",
  "data": [
    {
      "id": 1603270800,
      "open": 12198,
      "close": 12196.7,
      "low": 11715.8,
      "high": 12300,
      "amount": 0.276,
      "vol": 276,
      "trade_turnover": 3315.9104,
      "count": 39
    },
    {
      "id": 1603274400,
      "open": 12196.7,
      "close": 12277.9,
      "low": 12111,
      "high": 12289.9,
      "amount": 0.198,
      "vol": 198,
      "trade_turnover": 2420.7728,
      "count": 21
    }
  ]
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.depth.\$type (\[General\] Subscribe Market Depth Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| type | string | true | Depth Type | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17（merged depth data 0-5,14-17）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19(merged depth data 7-13,18-19); when step is 6, depth data will not be merged. |  |

Notes:

When clients choose merged depth data, WebSocket server will only display the merged price within price steps in order book. Please note that the merged depth price will not make any change on the actual order price.

step16, step17, step18, and step19 are only for SHIB-USDT contract, and the other contracts is not supported now.

steps between step1 and step5, step14 and step17 are merged orderbook data of step 150. steps between step7 and step13, step18, step19 are merged orderbook data of step 20. Details are below:

Depth precision

step16、step18 0.0000001

step17、step19 0.000001

step1、step7 0.00001

step2、step8 0.0001

step3、step9 0.001

step4、step10 0.01

step5、step11 0.1

step14、step12 1

step15、step13 10

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ts | string | true | Time of Respond Generation, Unit: Millisecond |  |
| ch | long | true | Data channel, Format： market.period |  |
| \_\_tick\_\_ |  | false |  |  |
| mrid | long | true | Order ID |  |
| id | long | true | tick ID |  |
| asks | object | false | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bids | object | false | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| ts | long | true | Timestamp for depth generation; generated once every 100ms, unit: millisecond |  |
| version | long | true | version ID |  |
| ch | string | true | Data channel, Format： market.period |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.depth.step0",
  "id": "id5"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.BTC-USDT.depth.step0",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.depth.step6",
  "ts": 1603707576468,
  "tick": {
    "mrid": 131596447,
    "id": 1603707576,
    "bids": [
      [
        13071.9,
        38
      ],
      [
        13068,
        5
      ]
    ],
    "asks": [
      [
        13081.9,
        197
      ],
      [
        13099.7,
        371
      ]
    ],
    "ts": 1603707576467,
    "version": 1603707576,
    "ch": "market.BTC-USDT.depth.step6"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.depth.step0",
  "id": "id5"
}
```

### market.\$contract\_code.depth.size\_\${size}.high\_freq (\[General\] Subscribe Incremental Market Depth Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type |  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| size | string | true | Depth size |  | 20: stands for 20 unmerged data. 150:stands for 150 unmerged data. |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ts | string | true | Timestamp of Respond Generation, Unit: Millisecond |  |
| ch | long | true | Data channel, Format：market.\$contract\_code.depth.size\_\${size}.high\_freq |  |
| \_\_tick\_\_ |  | false |  |  |
| mrid | long | true | Order ID |  |
| id | long | true | tick ID，system timestamp.seconds |  |
| asks | object | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bids | object | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| ts | long | true | Timepoint for system detecting orderbook, unit: millisecond |  |
| version | long | true | version ID,auto increment ID. |  |
| event | string | true | event type: update or snapshot |  |
| ch | string | true | Data channel, Format： market.\$contract\_code.depth.size\_\${size}.high\_freq |  |
| \_\_/tick\_\_ |  | false |  |  |

Notes:

when data\_type is incremental,snapshot data wil be pushed for the first time. When re-connection occurs, snapshort data will be pushed for the first time.

version: auto increment in single websocket connection. version may be different among several websocket subscription connections.

orderbook will be pushed if orderbook is updated whenever incremental or snapshot.

orderbook event will be checked every 30ms. If there is no orderbook event, you will not receive any orderbook data.

you HAVE TO maintain local orderbook data,such as updating your local orderbook bids and asks data.

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.depth.size_20.high_freq",
  "data_type": "incremental",
  "id": "id generated by client"
}
```

#### Example of a Successful Subscription

```
{
  "status": "ok",
  "subbed": "market.BTC-USDT.depth.size_20.high_freq",
  "data_type": "incremental",
  "id": "id generated by client",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.depth.size_20.high_freq",
  "tick": {
    "asks": [
      [
        13081.9,
        206
      ],
      [
        13099.7,
        371
      ]
    ],
    "bids": [
      [
        13071.9,
        38
      ],
      [
        13060,
        400
      ]
    ],
    "ch": "market.BTC-USDT.depth.size_20.high_freq",
    "event": "snapshot",
    "id": 131597620,
    "mrid": 131597620,
    "ts": 1603707712356,
    "version": 1512467
  },
  "ts": 1603707712357
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.depth.size_20.high_freq",
  "data_type": "incremental",
  "id": "id generated by client"
}
```

### market.\$contract\_code.detail (\[General\] Subscribe Market Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel，Format： market.\$contract\_code.detail |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ |  | false |  |  |
| id | long | true | ID |  |
| mrid | long | true | Order ID |  |
| open | decimal | true | Open Price |  |
| close | decimal | true | Clos Price, the price from the latest kline is the last order price |  |
| high | decimal | true | High Price |  |
| low | decimal | true | Low Price |  |
| amount | decimal | true | Trade Amount(Coins), Trade amount(Coin)=SUM(quantity(cont.)\*face value/ order price. Sum of both buy and sell sides |  |
| vol | decimal | true | Trade volume(Cont.)， the sum volume of both buy and sell sides. Sum of both buy and sell sides |  |
| count | decimal | true | fulfilled order quantity. Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides |  |
| ask | array | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\] |  |
| bid | array | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\] |  |
| \_\_/tick\_\_ |  | false |  |  |

Notes:

Bid price(p1) and ask price(p1) are not updated in real time, there will be some delay (about 500ms).

The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.detail",
  "id": "id6"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id6",
  "status": "ok",
  "subbed": "market.BTC-USDT.detail",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.detail",
  "ts": 1603707870528,
  "tick": {
    "id": 1603707840,
    "mrid": 131599205,
    "open": 12916.2,
    "close": 13065.8,
    "high": 13205.3,
    "low": 12852.8,
    "amount": 30.316,
    "vol": 30316,
    "trade_turnover": 395073.4918,
    "count": 2983,
    "asks": [
      13081.9,
      206
    ],
    "bids": [
      13071.9,
      38
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.detail",
  "id": "id6"
}
```

### market.\$contract\_code.bbo (\[General\] Subscribe market BBO data push)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel, Format： market.\$contract\_code.bbo |  |
| ts | long | true | Timestamp of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object | true |  |  |
| ch | string | true | Data channel, Format： market.\$contract\_code.bbo |  |
| mrid | string | true | Order ID |  |
| id | long | true | tick ID |  |
| ask | array | false | Best Ask Quotation,\[price(Ask price), vol(Ask order (cont.) )\] |  |
| bid | array | false | Best Bid Quotation,\[price(Bid price), vol(Bid order(Cont.))\] |  |
| version | long | true | version ID. |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| \_\_\\tick\_\_ |  | false |  |  |

Notes:

When any one of the buy\_one price, buy\_one quantity, sell\_one price and sell\_one quantity changes, the system will push BBO price.

If there are multiple changes in the price or quantity of buy\_one or sell\_one at the same time, the system will push the latest price and quantity of buy\_one and sell one with the intermediate data discarded.

When the data received by the client is failed or delayed, the old data buffer in the server will be discarded.The latest BBO will be pushed.

version（version number). Use match id directly to ensure it is globally unique and the value of version number pushed is the largest.

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.bbo",
  "id": "id8"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id8",
  "status": "ok",
  "subbed": "market.BTC-USDT.bbo",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.bbo",
  "ts": 1603707934525,
  "tick": {
    "mrid": 131599726,
    "id": 1603707934,
    "bid": [
      13064,
      38
    ],
    "ask": [
      13072.3,
      205
    ],
    "ts": 1603707934525,
    "version": 131599726,
    "ch": "market.BTC-USDT.bbo"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.bbo",
  "id": "id8"
}
```

### market.\$contract\_code.trade.detail (\[General\] Request Trade Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data Channel，Format： market.\$contract\_code.trade.detail |  |
| status | string | true | Request Status |  |
| id | long | true | Request ID |  |
| DATA\_START |  | false |  |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | string | true | Price |  |
| amount | string | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| ts | long | true | Order Creation Time |  |
| quantity | string | true | trading quantity(coin) |  |
| trade\_turnover | string | true | trade turnover(quoted currency) |  |
| DATA\_END |  | false |  |  |
| ts | long | true | server response time |  |

Notes:

There are "quantity" parameter in return data only after 21:00:00 on February 3, 2021

#### Subscription Example

```
{
  "req": "market.BTC-USDT.trade.detail",
  "size": 50,
  "id": "id8"
}
```

#### Example of a Successful Subscription

```
{
  "data": [
    {
      "amount": "22",
      "ts": 1603706942240,
      "id": 1315909380000,
      "price": "13068.4",
      "direction": "sell",
      "quantity": "0.022",
      "trade_turnover": "288.334"
    },
    {
      "amount": "2",
      "ts": 1603706947767,
      "id": 1315909430000,
      "price": "13068.5",
      "direction": "buy",
      "quantity": "0.002",
      "trade_turnover": "26.334"
    }
  ],
  "id": "id8",
  "rep": "market.BTC-USDT.trade.detail",
  "status": "ok",
  "ts": 1603708046534
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.trade.detail (\[General\] Subscribe Trade Detail Data)

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-ws |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-ws |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel,format: market.\$contract\_code.trade.detail |  |
| ts | long | true | Request time |  |
| \_\_tick\_\_ |  | false |  |  |
| id | long | true | Unique Order Id(symbol level). |  |
| ts | long | true | tick time |  |
| DATA\_START |  | false |  |  |
| amount | decimal | true | quantity(Cont.). Sum of both buy and sell sides |  |
| ts | long | true | trade timestamp |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | decimal | true | Price |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| quantity | decimal | true | trading quantity(coin) |  |
| trade\_turnover | decimal | true | trade turnover(quoted currency) |  |
| DATA\_END |  | false |  |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.trade.detail",
  "id": "id7"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id7",
  "status": "ok",
  "subbed": "market.BTC-USDT.trade.detail",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.trade.detail",
  "ts": 1603708208346,
  "tick": {
    "id": 131602265,
    "ts": 1603708208335,
    "data": [
      {
        "amount": 2,
        "ts": 1603708208335,
        "id": 1316022650000,
        "price": 13073.3,
        "direction": "buy",
        "quantity": 0.002,
        "trade_turnover": 26.334
      }
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.trade.detail",
  "id": "id7"
}
```

### market.\$contract\_code.index.\$period (\[General\] Subscribe Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | index symbol | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |

Notes:

Pushed once the index data is changed.

Periodical Push when the index data hasn't changed according to the kline period.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | false | Data channel，Format：market.\$contract\_code.index.\$period |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object array | false |  |  |
| id | string | false | index kline id,the same as kline timestamp,kline start timestamp |  |
| vol | string | false | Trade Volume. The value is 0. |  |
| count | decimal | false | count. The value is 0. |  |
| open | string | false | open index price |  |
| close | string | false | close index price |  |
| low | string | false | lowest index price |  |
| high | string | false | highest index price |  |
| amount | string | false | amount based on coins. |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.index.1min",
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.BTC-USDT.index.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.index.15min",
  "ts": 1607309592214,
  "tick": {
    "id": 1607309100,
    "open": "19213.505",
    "close": "19242.05",
    "high": "19248.31",
    "low": "19213.505",
    "amount": "0",
    "vol": "0",
    "count": 0
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.index.1min",
  "id": "id1"
}
```

### market.\$contract\_code.index.\$period (\[General\] Request Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | index symbol | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |

Notes:

Pushed once the index data is changed.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| req | string | true | Data channel，Format：market.\$contract\_code.index.\$period |  |
| status | string | true | Request processing result |  |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | false | Details：data parameters |  |
| id | decimal | false | index kline id,the same as kline timestamp,kline start timestamp |  |
| vol | decimal | false | Trade Volume. The value is 0. |  |
| count | decimal | false | count. The value is 0. |  |
| open | decimal | false | open index price |  |
| close | decimal | false | close index price |  |
| low | decimal | false | lowest index price |  |
| high | decimal | false | highest index price |  |
| amount | decimal | false | amount based on coins. |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.btc-usdt.index.1min",
  "id": "id4",
  "from": 1571000000,
  "to": 1573098606
}
```

#### Example of a Successful Subscription

```
{
  "id": "id4",
  "rep": "market.BTC-USDT.index.15min",
  "wsid": 3673570133,
  "ts": 1607310136031,
  "status": "ok",
  "data": [
    {
      "id": 1607309100,
      "open": 19213.505,
      "close": 19207.245,
      "low": 19207.245,
      "high": 19248.31,
      "amount": 0,
      "vol": 0,
      "count": 0
    },
    {
      "id": 1607310000,
      "open": 19199.655,
      "close": 19174.48,
      "low": 19174.48,
      "high": 19208.11,
      "amount": 0,
      "vol": 0,
      "count": 0
    }
  ]
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.premium\_index.\$period (\[General\] Subscribe Premium Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

Notes:

Pushed once the index data is changed.

Periodical Push when the index data hasn't changed according to the kline period.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel，Format： market.period |  |
| \_\_tick\_\_ | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| \_\_/tick\_\_ |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.premium_index.1min",
  "id": "id7"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id7",
  "status": "ok",
  "subbed": "market.BTC-USDT.premium_index.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.premium_index.1min",
  "ts": 1603708380380,
  "tick": {
    "id": 1603708380,
    "open": "0.000068125",
    "close": "0.000068125",
    "high": "0.000068125",
    "low": "0.000068125",
    "amount": "0",
    "vol": "0",
    "count": "0"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.premium_index.1min",
  "id": "id7"
}
```

### market.\$contract\_code.premium\_index.\$period (\[General\] Request Premium Index Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

Notes:

Pushed once the index data is updated.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data channel，Format： market.period |  |
| status | string | true | Request processing result |  |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.BTC-USDT.premium_index.1min",
  "id": "id4",
  "from": 1571000000,
  "to": 1573098606
}
```

#### Example of a Successful Subscription

```
{
  "id": "id4",
  "rep": "market.BTC-USDT.premium_index.15min",
  "wsid": 1524762738,
  "ts": 1603782744066,
  "status": "ok",
  "data": [
    {
      "id": 1603641600,
      "open": "0",
      "close": "0.0000970833333333",
      "low": "0",
      "high": "0.0000997916666666",
      "amount": "0",
      "vol": "0",
      "count": "0"
    }
  ]
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.estimated\_rate.\$period (\[General\] Subscribe Estimated Funding Rate Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

Notes:

Pushed once the kline data is changed.

Periodical Push when the kline data hasn't changed according to the kline period.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data channel，Format： market.period |  |
| \_\_tick\_\_ | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| trade\_turnover | string | true | Transaction amount, the value is 0. |  |
| \_\_/tick\_\_ |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "sub": "market.btc-usdt.estimated_rate.1min",
  "id": "id7"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id7",
  "status": "ok",
  "subbed": "market.btc-usdt.estimated_rate.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.estimated_rate.1min",
  "ts": 1603708560233,
  "tick": {
    "id": 1603708560,
    "open": "0.0001",
    "close": "0.0001",
    "high": "0.0001",
    "low": "0.0001",
    "amount": "0",
    "vol": "0",
    "count": "0",
    "trade_turnover": "0"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.btc-usdt.estimated_rate.1min",
  "id": "id7"
}
```

### market.\$contract\_code.estimated\_rate.\$period (\[General\] Request Estimated Funding Rate Kline Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.."BTC-USDT","ETH-USDT"... |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data channel, Format： market.period |  |
| status | string | true | Request status | "ok" , "error" |
| id | string | true | ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, unit: millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | index kline id,the same as kline timestamp |  |
| vol | string | true | Trade Volume(Cont.). The value is 0. |  |
| count | string | true | count. The value is 0. |  |
| open | string | true | open index price |  |
| close | string | true | close index price |  |
| low | string | true | lowest index price |  |
| high | string | true | highest index price |  |
| amount | string | true | amount based on coins. |  |
| trade\_turnover | string | true | Transaction amount, the value is 0. |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.BTC-USDT.estimated_rate.1min",
  "id": "id4",
  "from": 1579247342,
  "to": 1579247342
}
```

#### Example of a Successful Subscription

```
{
  "id": "id4",
  "rep": "market.BTC-USDT.estimated_rate.15min",
  "wsid": 3674722864,
  "ts": 1603782867314,
  "status": "ok",
  "data": [
    {
      "id": 1603641600,
      "open": "0.0001",
      "close": "0.0001",
      "low": "0.0001",
      "high": "0.0001",
      "amount": "0",
      "vol": "0",
      "count": "0",
      "trade_turnover": "0"
    }
  ]
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.basis.\$period.\$basis\_price\_type (\[General\] Subscribe Basis Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | kline period | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon |  |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | false |  |  |
| \_\_tick\_\_ | object array | false |  |  |
| id | long | false |  |  |
| contract\_price | string | false |  |  |
| index\_price | string | false |  |  |
| basis | string | false |  |  |
| basis\_rate | string | false |  |  |
| \_\_/tick\_\_ |  | false |  |  |
| ts | long | false |  |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.basis.1min.open",
  "id": "id7"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id7",
  "status": "ok",
  "subbed": "market.BTC-USDT.basis.1min.open",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.basis.1min.open",
  "ts": 1617164081549,
  "tick": {
    "id": 1617164040,
    "index_price": "58686.78333333333",
    "contract_price": "58765",
    "basis": "78.21666666667",
    "basis_rate": "0.0013327816285723049700163397705562309"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.basis.1min.open",
  "id": "id7"
}
```

### market.\$contract\_code.basis.\$period.\$basis\_price\_type (\[General\] Request Basis Data)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | kline type | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |  |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| rep | string | true | Data belonged channel Format: market.basis |  |
| status | string | true | Return Statu | "ok" , "error" |
| id | string | true | Request ID |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, unit: millisecond |  |
| DATA\_START | object array | false |  |  |
| id | long | true | unique id |  |
| contract\_price | string | true | contract last price |  |
| index\_price | string | true | index price |  |
| basis | string | true | basis=contract\_price - index\_price |  |
| basis\_rate | string | true | basis\_rate=basis/index\_price |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.btc-usdt.basis.1min.open",
  "id": "id4",
  "from": 1579247342,
  "to": 1579247342
}
```

#### Example of a Successful Subscription

```
{
  "data": [
    {
      "basis": "-27.593412766666006",
      "basis_rate": "-0.0021317871729511838",
      "contract_price": "12916.2",
      "id": 1603641600,
      "index_price": "12943.793412766667"
    }
  ],
  "id": "id4",
  "rep": "market.BTC-USDT.basis.15min.open",
  "status": "ok",
  "ts": 1603783024207,
  "wsid": 1308653018
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data

### market.\$contract\_code.mark\_price.\$period (\[General\]Subscribe Kline Data of Mark Price)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | period | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | channel, format: market.period |  |
| \_\_tick\_\_ | object array | true |  |  |
| id | long | true | id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount, value is 0 |  |
| trade\_turnover | string | true | trade turnover, value is 0 |  |
| \_\_/tick\_\_ |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "sub": "market.BTC-USDT.mark_price.1min",
  "id": "id1"
}
```

#### Example of a Successful Subscription

```
{
  "id": "id1",
  "status": "ok",
  "subbed": "market.BTC-USDT.mark_price.1min",
  "ts": 1489474081631
}
```

#### Example of a Data Update

```
{
  "ch": "market.BTC-USDT.mark_price.1min",
  "ts": 1489474082831,
  "tick": {
    "vol": "0",
    "close": "9800.12",
    "count": "0",
    "high": "9800.12",
    "id": 1529898780,
    "low": "9800.12",
    "open": "9800.12",
    "trade_turnover": "0",
    "amount": "0"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "unsub": "market.BTC-USDT.mark_price.1min",
  "id": "id1"
}
```

### market.\$contract\_code.mark\_price.\$period (\[General\]Request Kline Data of Mark Price)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/ws\_index |
| Online (preferred by aws customers) | wss://api.hbdm.vn/ws\_index |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | period | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week, 1mon |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| req | string | true | channel, format: market.period |  |
| status | string | true | status | "ok" , "error" |
| id | string | true | id |  |
| wsid | long | true | wsid |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| id | long | true | kline id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount, value is 0 |  |
| trade\_turnover | string | true | trade turnover, value is 0 |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "req": "market.BTC-USDT.mark_price.5min",
  "id": "id4",
  "from": 1579247342,
  "to": 1579247342
}
```

#### Example of a Successful Subscription

```
{
  "rep": "market.BTC-USDT.mark_price.1min",
  "status": "ok",
  "id": "id4",
  "wsid": 1231323423,
  "ts": 1579489028884,
  "data": [
    {
      "vol": "0",
      "close": "9800.12",
      "count": "0",
      "high": "9800.12",
      "id": 1529898780,
      "low": "9800.12",
      "open": "9800.12",
      "trade_turnover": "0",
      "amount": "0"
    }
  ]
}
```

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data