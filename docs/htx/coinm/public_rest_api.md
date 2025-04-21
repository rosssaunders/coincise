# HTX CoinM Public REST API Documentation

## Introduction

### Documentation Summary

Welcome to the HTX Future API! You can use our API to access all market data, trading, and account management endpoints.

We have code example in Shell! You can view code examples in the dark area to the right.

You can use the drop down list above to change the API version. You can also use the language option at the top right to switch documentation language.

## Future API Access Illustration

### API List

| permission type | Content Type | Context | Request Type | Desc | Signature Required |
| --- | --- | --- | --- | --- | --- |
| Read | Market Data | /api/v1/contract\_contract\_info | GET | Get Contracts Information | No |
| Read | Market Data | /api/v1/contract\_index | GET | Get contract Index Price Information | No |
| Read | Market Data | /api/v1/contract\_price\_limit | GET | Get Contract Price Limitation | No |
| Read | Market Data | /api/v1/contract\_open\_interest | GET | Get Contract Open Interest Information | No |
| Read | Market Data | /api/v1/contract\_delivery\_price | GET | Get the estimated delivery price | No |
| Read | Market Data | /api/v1/contract\_api\_state | GET | Query information on system status | No |
| Read | Market Data | /market/depth | GET | Get Market Depth | No |
| Read | Market Data | /market/bbo | GET | Get Market BBO Data | No |
| Read | Market Data | /market/history/kline | GET | Get Kline Data | No |
| Read | Market Data | /index/market/history/mark\_price\_kline | GET | Get Kline Data of Mark Price | No |
| Read | Market Data | /market/detail/merged | GET | Get Market Data Overview | No |
| Read | Market Data | /market/detail/batch\_merged | GET | Get a Batch of Market Data Overview | No |
| Read | Market Data | /v2/market/detail/batch\_merged | GET | Get a Batch of Market Data Overview(V2) | No |
| Read | Market Data | /market/trade | GET | Query The Last Trade of a Contract | No |
| Read | Market Data | /market/history/trade | GET | Query a Batch of Trade Records of a Contract | No |
| Read | Market Data | /api/v1/contract\_risk\_info | GET | Query information on contract insurance fund balance and estimated clawback rate | No |
| Read | Market Data | /api/v1/contract\_insurance\_fund | GET | Query history records of insurance fund balance | No |
| Read | Market Data | /api/v1/contract\_adjustfactor | GET | Query information on Tiered Adjustment Factor | No |
| Read | Market Data | /api/v1/contract\_his\_open\_interest | GET | Query information on open interest | No |
| Read | Market Data | /api/v1/contract\_elite\_account\_ratio | GET | Query Top Trader Sentiment Index Function-Account | No |
| Read | Market Data | /api/v1/contract\_elite\_position\_ratio | GET | Query Top Trader Sentiment Index Function-Position | No |
| Read | Market Data | /api/v1/contract\_liquidation\_orders | GET | Query Liquidation Order Information | No |
| Read | Market Data | /api/v1/contract\_settlement\_records | GET | Query historical settlement records of the platform interface | No |
| Read | Market Data | /index/market/history/index | GET | Query Index Kline Data | No |
| Read | Market Data | /index/market/history/basis | GET | Query Basis Data | No |
| Read | Market Data | /api/v1/contract\_estimated\_settlement\_price | GET | Get the estimated settlement price | No |
| Read | Market Data | /api/v1/contract\_ladder\_margin | GET | Query information on Tiered Margin | No |
| Read | Account | /api/v1/contract\_balance\_valuation | POST | Query Asset Valuation | Yes |
| Read | Account | /api/v1/contract\_account\_info | POST | Query User’s Account Information | Yes |
| Read | Account | /api/v1/contract\_position\_info | POST | Query User’s Position Information | Yes |
| Trade | Account | /api/v1/contract\_sub\_auth | POST | Set a Batch of Sub-Account Trading Permissions | Yes |
| Read | Account | /api/v1/contract\_sub\_account\_list | POST | Query assets information of all sub-accounts under the master account (Query by coins) | Yes |
| Read | Account | /api/v1/contract\_sub\_account\_info\_list | POST | Query a Batch of Sub-Account's Assets Information | Yes |
| Read | Account | /api/v1/contract\_sub\_account\_info | POST | Query a single sub-account's assets information | Yes |
| Read | Account | /api/v1/contract\_sub\_position\_info | POST | Query a single sub-account's position information | Yes |
| Read | Account | /api/v1/contract\_financial\_record | POST | Query account financial records | Yes |
| Read | Account | /api/v1/contract\_financial\_record\_exact | POST | Query financial records via multiple fields | Yes |
| Read | Account | /api/v1/contract\_user\_settlement\_records | POST | Query user’s settlement records | Yes |
| Read | User Account | /api/v1/contract\_order\_limit | POST | Query contract information on order limit | Yes |
| Read | User Account | /api/v1/contract\_available\_level\_rate | POST | Query contract available level rate | Yes |
| Read | User Account | /api/v1/contract\_fee | POST | Query information on contract trading fee | Yes |
| Read | User Account | /api/v1/contract\_transfer\_limit | POST | Query information on Transfer Limit | Yes |
| Read | User Account | /api/v1/contract\_position\_limit | POST | Query information on position limit | Yes |
| Trade | User Account | /api/v1/contract\_master\_sub\_transfer | POST | Transfer between master and sub account | Yes |
| Read | User Account | /api/v1/contract\_account\_position\_info | POST | User’s position Information And User’s position Information | Yes |
| Read | Trade | /api/v1/contract\_trigger\_openorders | POST | Query Trigger Order Open Orders | Yes |
| Read | Trade | /api/v1/contract\_trigger\_hisorders | POST | Query Trigger Order History | Yes |
| Trade | Trade | /api/v1/contract\_order | POST | Place an Order | Yes |
| Trade | Trade | /api/v1/contract\_batchorder | POST | Place a Batch of Orders | Yes |
| Trade | Trade | /api/v1/contract\_cancel | POST | Cancel an Order | Yes |
| Trade | Trade | /api/v1/contract\_cancelall | POST | Cancel All Orders | Yes |
| Trade | Trade | /api/v1/contract\_switch\_lever\_rate | POST | Switch Leverage | Yes |
| Trade | Trade | /api/v1/lightning\_close\_position | POST | Place Flash Close Order | Yes |
| Read | Trade | /api/v1/contract\_order\_info | POST | Get Information of an Order | Yes |
| Read | Trade | /api/v1/contract\_order\_detail | POST | Get Trade Details of an Order | Yes |
| Read | Trade | /api/v1/contract\_openorders | POST | Get Current Orders | Yes |
| Read | Trade | /api/v1/contract\_hisorders | POST | Get History Orders | Yes |
| Read | Trade | /api/v1/contract\_hisorders\_exact | POST | Query history orders via multiple fields | Yes |
| Read | Trade | /api/v1/contract\_matchresults | POST | Get History Match Results | Yes |
| Read | Trade | /api/v1/contract\_matchresults\_exact | POST | Query history transactions via multiple fields | Yes |
| Trade | Trade | v1/futures/transfer | POST | Transfer margin between Spot account and Future account | Yes |
| Trade | Strategy | /api/v1/contract\_trigger\_order | POST | Place Trigger Order | Yes |
| Trade | Strategy | /api/v1/contract\_trigger\_cancel | POST | Cancel Trigger Order | Yes |
| Trade | Strategy | /api/v1/contract\_trigger\_cancelall | POST | Cancel All Trigger Orders | Yes |
| Trade | Strategy | /api/v1/contract\_tpsl\_order | POST | Set a Take-profit and Stop-loss Order for an Existing Position | Yes |
| Trade | Strategy | /api/v1/contract\_tpsl\_cancel | POST | Cancel a Take-profit and Stop-loss Order | Yes |
| Trade | Strategy | /api/v1/contract\_tpsl\_cancelall | POST | Cancel all Take-profit and Stop-loss Orders | Yes |
| Read | Strategy | /api/v1/contract\_tpsl\_openorders | POST | Open take-profit and stop-loss orders | Yes |
| Read | Strategy | /api/v1/contract\_tpsl\_hisorders | POST | Take-profit and stop-loss histoty orders | Yes |
| Read | Strategy | /api/v1/contract\_relation\_tpsl\_order | POST | Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order | Yes |
| Trade | Strategy | /api/v1/contract\_track\_order | POST | Place a Trailing Order | Yes |
| Trade | Strategy | /api/v1/contract\_track\_cancel | POST | Cancel a Trailing Order | Yes |
| Trade | Strategy | /api/v1/contract\_track\_cancelall | POST | Cancel All Trailing Order | Yes |
| Read | Strategy | /api/v1/contract\_track\_openorders | POST | Current unfilled trailing order acquisition | Yes |
| Read | Strategy | /api/v1/contract\_track\_hisorders | POST | Get History Trailing Orders | Yes |

### Address

| Address | Applicable sites | Applicable functions | Applicable trading pairs |
| --- | --- | --- | --- |
| https://api.hbdm.com | HTX Future | Market | Trading pairs provided by HTX Future |

#### Notice

If you can't connect "https://api.hbdm.com", please use "https://api.btcgateway.pro" for debug purpose. If your server is deployed in AWS, we recommend using "https://api.hbdm.vn".

### API Rate Limit Illustration

Future, Coin Margined Swap and USDT Margined Contracts are using separate API rate limits.

Please note that, for both public interface and private interface, there are rate limits, more details are as below:

-   Generally, the private interface rate limit of API key is at most 72 times every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds. Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date). [API Interface List](https://docs.huobigroup.com/docs/dm/v1/en/#api-list)
    
-   For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).
    
-   For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market depth data, Get index kline, Get basis data, Get the last Trade of a Contract and so on：
    
    (1) For restful interfaces：all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most
    
    （2）For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.
    
-   WebSocket, the private order push interface, requires API KEY Verification:
    
    Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC weekly, BTC biweekly and BTC quarterlycontracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.
    
-   Both read and trade interfaces will return the ratelimit info.You can refer to the following fields of "header" from api response. E.g.,you will get the total Read ratelimit("ratelimit-limit") and the remaining Read ratelimit("ratelimit-remaining") when you query the order info(/api/v1/contract\_order\_info) , and you will get the total Trade ratelimit("ratelimit-limit") and the remaining Trade ratelimit("ratelimit-remaining") when you place an order(/api/v1/contract\_order)). [API Interface List](https://docs.huobigroup.com/docs/dm/v1/en/#api-list)
    
-   Will response following string for "header" via api:
    
    ratelimit-limit: the upper limit of requests per time, unit: times
    
    ratelimit-interval: reset interval (reset the number of request), unit: ms
    
    ratelimit-remaining: the left available request number for this round, unit: times
    
    ratelimit-reset: upper limit of reset time used to reset request number, unit: ms
    
    When API Limitation on Order Cancellation Ratio is triggered,the following string for "header" via api will also be returned:
    
    recovery-time: recovery timestamp, whose unit is millisecond, showing the end time of prohibition, or the access retrieval timestamp;
    
    if you are not in the prohibition period, the field is not included in returned header;

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
| 1097 | adl freeze status prohibits users from placing orders |
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
| 1227 | HTX Contract does not support sub-accounts. Please log out sub-account and log in again with primary account. |
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
| 1420 | You have no access to grid trading on HTX Futures, please contact our customer service. |
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
| 1461 | Current positions have triggered position limits ({0}{1}). Please modify. |
| 1462 | Current positions have triggered position limits ({0}{1}). Please modify. |
| 12001 | Invalid submission time. |
| 12002 | Incorrect signature version. |
| 12003 | Incorrect signature method. |
| 12004 | Private key is expired. |
| 12005 | Incorrect IP address. |
| 12006 | The submission time can't be empty. |
| 12007 | Incorrect public key. |
| 12008 | Verification failed. |
| 12009 | The user is locked or doesn't exist. |

### API Best Practice

#### 1\. Query contract history orders interface: /api/v1/contract\_hisorders

-   To ensure timeliness and to reduce latency, users are highly recommended to get contract history orders information faster from server memory using interface “query contract order information” (URL: api/v1/contract\_order\_info).
    
-   For users who use interface “query contract history orders” (URL: /api/v1/contract\_hisorders), please enter as many query conditions as possible (including symbol, trade\_type（recommended to send “0” to query all）, type, status, create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.
    

#### 2\. Query contract match results interface: /api/v1/contract\_matchresults

-   To improve query performance and response speed, please enter as many querying conditions as possible (including symbol, trade\_type（recommended to send “0” to query all）, contract\_code, create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.

#### 3\. Query contract financial record interface: /api/v1/contract\_financial\_record

-   To improve query performance and response speed, please enter as many querying conditions as possible (including symbol, type(recommended to leave it blank to query all), create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.

#### 4\. Query contract order detail interface: /api/v1/contract\_order\_detail

-   When querying orders without parameter(such as the parameter: created\_at), the query result data may be delayed. It is recommended to pass the two parameters of the interface: created\_at (order timestamp) and order\_type (order type, default 1), the database will be directly queried, and the query results data will be more timely.
    
-   Querying condition “created\_at” uses 13-bit long type time stamp (including milliseconds). Querying performance will be improved when accurate time stamps are entered.
    
-   For example: the converted time stamp of "2019/10/18 10:26:22" is 1571365582123. The returned ts from interface “contract\_order” can be used as time stamp to query corresponding order. 0 is not allowed in parameter “created\_at”.
    

#### 5\. Query contract trigger order history orders interface:

-   /api/v1/contract\_trigger\_hisorders
    
-   To improve query performance and response speed, please enter as many parameters as possible (including symbol, contract\_code, trade\_type, status, create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.
    

#### 6\. WebSocket subscription to Market Depth data:

-   For acquiring market depth data within 150 steps, you are kindly suggested to use step0, step1, step2, step3, step4, step5, step14, step15；
    
-   For acquiring market depth data within 20 steps, you are kindly suggested to use step6, step7, step8, step9, step10, step11, step12, step13；
    
-   Since the large volume of pushing 150 steps data every 100ms, WebSocket disconnection may occur frequently if client’s network bandwidth is insufficient or the processing is not in time; therefore, we highly recommend users using step6, step7, step8, step9, step10, step11, step12, step13 to acquire 20 steps data. For instance, subscribing 20 steps data.
    

`{`

`"sub": "market.BTC_CQ.depth.step6",`

`"id": "id5"`

`}`

-   We also suggest that you subscribe incremental market depth data.orderbook event will be checked every 30ms. If there is no orderbook event, you will not receive any orderbook data.you HAVE TO maintain local orderbook data,such as updating your local orderbook bids and asks data.You can subscribe 20 or 150 unmerged data.

`{`

`"sub": "market.BTC_CQ.depth.size_20.high_freq",`

`"data_type":"incremental",`

`"id": "id1"`

`}`

#### 7\. Place order interface (URL: /api/v1/contract\_order) and place a batch of orders interface (URL:/api/v1/contract\_batchorder):

-   We recommend to fill in the parameter “client\_order\_id”(should be unique from user-side),which can help users to acquire order status and other order information according to the parameter “client\_order\_id" from
    
-   query order information interface (URL: /api/v1/contract\_order\_info ) when there is no returned information due to network or other problems.
    

#### 8\. The best deployment of program server

-   It is recommended that place the server in AWS Tokyo C zone and use the api.hbdm.vn domain, which can effectively reduce network disconnection and network timeout.

## Future API FAQ

### Market and Websocket

#### Q1: How often are the snapshot orderbook subscription and incremental orderbook subscription pushed?

The snapshot orderbook subscription(market.\$symbol.depth.\$type) is checked once every 100MS.If there is an update,it will be pushed. It will be pushed at least 1 second.The incremental orderbook subscription is checked once every 30MS.If there is an update,it will be pushed.If there is no update, it will not be pushed.

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

The Subscription of MBP data: market.\$symbol.depth.\$type.150 price level means the current bids and asks splited into 150 level by price.20 price level means the current bids and asks splited into 20 level by price.

#### Q7: What is the meaning of merged depth when subscribing MBP data?

The subscrpition of MBP data:market.\$symbol.depth.\$type：

step1 and step7 are merged by 5 decimal places.bids down,asks up.step2 and step8 are merged by 4 decimal places.bids down,asks up.step3 and step9 are merged by 3 decimal places.bids down,asks up.step4 and step10 are merged by 2 decimal places.bids down,asks up.step5 and step11 are merged by 1 decimal places.bids down,asks up.step12 and step14 are combined by single digit.bids down,asks up.step13 and step15 are combined by tens.bids down,asks up.

Example:

step4(0.01):

bids price: 100.123, 100.245.The merged bids price are 100.12, 100.24.

asks price: 100.123, 100.245The merged asks price are 100.13, 100.25.

("Down" and "Up" are rounded up or down, if the price is down, the asks price is not rounded down, and the bids price is rounded up.)

150 price level: step0 to step5, step14, step15；

20 price level: step6 to step13;

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

Subscription of position event: "positions.btc".The latest position is pushed,including the volumes, available volumes, frozen volumes.If there is no update,it will not be pushed.

#### Q9: Does websocket's position channel push data when the unrealized profit is updated?

Subscription of position event: "positions.btc".It will not be pushed if only unrealized profit is updated.It will be pushed only when position event is updated.

#### Q10: What is the difference between market detail and trade detail in WS?

Market Detail(market.\$symbol.detail) is the merged market data. It will be checked every 0.5s, pushed once trade event udpates,including the OHLCV data,etc.Trade Detail(market.\$symbol.trade.detail) is pushed once trade event updates,including trade price, trade volume, trade direction,etc.

#### Q11: What is the meaning of the two ts pushed by subscription of incremental MBP ?

Subscription of incremental MBP：market.\$symbol.depth.size\_\${size}.high\_freq，The outer ts is the timestamp when the market server sends the data.The inner ts is the timestamp when the orderbook is checked.

#### Q12: What is the difference between websocket subscription of MBP and incremental MBP? How often is the incremental MBP pushed?

market.\$symbol.depth.\$type is snapshot MBP data，market.\$symbol.depth.size\_\${size}.high\_freq is incremental MBP data.Snapshot MBP data is checked every 100ms,pushed at least every 1s.Incremental MBP data is checked every 30ms.It will not be pushed,if MBP has no update.

#### Q13: How to maintain local MBP data subscribing incremental MBP:market.\$symbol.depth.size\_\${size}.high\_freq?

Snapshot MBP data will be pushed for the first time, and the incremental MBP data will be pushed afterwards.

(1) Compare the incremental price with the previous full MBP data, and replace the order amount with the same price;

(2) If the price is not in the local MBP data,add the price to the local MBP data;

(3) If a price level is gone, data such as \[8100, 0\] will be pushed.You have to remove the same price of local MBP data;

(4) For the same websocket connection, the incremental data version is incremented; if the version is not incremented, you need to re-subscribe and re-maintain the local full MBP data;

#### Q14: Will the quarter contract of the delivery contract be converted to the next week contract, will it be notified or changged by WS?

If a quarterly contract such as BTC\_CQ is converted to the next week contract BTC\_NW, WS will not automatically notify you, you need to change the subscription to BTC\_NW.

#### Q15: When subscribing the same topic of several contract codes, will several ws be needed?

Since Futures, Coin Margined swaps, USDT Margined Contracts are different contracts with different interface addresses, different ws will be needed.

In Futures, Coin Margined swaps, USDT Margined Contracts thereof, as long as the interface address is the same, one ws is enough.

#### Q16: Is it available to place/cancel an order via WS??

Currently, it is not supported.

#### Q17: How to subscribe order status?

a. Successfully trade: “Subscribe Match Order Data (matchOrders.\$symbol)” or “Subscribe Order Data (orders.\$symbol)”

b. Successfully cancel: Subscribe Account Equity Updates Data (accounts.\$symbol)

#### Q18: What is the difference between the “Subscribe Match Order Data (matchOrders.\$symbol)” and “Subscribe Order Data (orders.\$symbol)”?

The pushed data of these two interfaces are different. Compared to “Subscribe Match Order Data (matchOrders.\$symbol)”, there are more fields for “Subscribe Order Data (orders.\$symbol)”

In general, the match order data (Subscribe Match Order Data “matchOrders.\$symbol”) may be pushed faster than the settled order data (Subscribe Order Data “orders.\$symbol”).

The orders of forced liquidation and netting will not be pushed in “Subscribe Match Order Data (matchOrders.\$symbol)”

#### Q19: How often is the “Subscribe Kline Data (market.\$symbol.kline.\$period)” pushed?

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

If you encounter errors such as {"status":"error","err\_code":1030,"err\_msg":"Abnormal service. Please try again later.","ts":1588093883199},indicating that your input request parameter is not correct, please print your request body and complete URL parameters, and please check the corresponding API document interface one by one.The common example is that the volume must be an integer, and the client\_order\_id must be of type uint32 rather than type uint64.

#### Q2: What is the reason for 1048 error code?

If you encounter errors such as {'index': 1, 'err\_code': 1048, 'err\_msg': 'Insufficient close amount available.'}, indicating that your available position is not enough.You need to query the api api/v1/contract\_position\_info to get your available position.

1.  Check whether the amount (cont) of position-closing order exceeds the limit? (When there is limit order for closing a position, the quantity that available to be closed will be occupied; hence we kindly remind you to cancel these orders and try again.)
    
2.  Check whether direction and offset are wrong as follows:
    

close long: sell to close a long position (direction: sell; offset: close);

close short: buy to close a short position (direction: buy; offset: close);

Only “direction” need to be uploaded when placing a flash close order (close long: sell; close short: buy).

1.  The pending take-profit and stop-loss (tp/sl) orders and trigger orders will not occupy the quantity of the position.

#### Q3: What is the reason for 1032 error code?

1032 means that your request exceeds the ratelimit. The coin margined swap, future and USDT margined Contracts limit the rate separately. Please check the ratelimit in the api ratelimit instructions, and you can print the current ratelimit in the header of the API response to check whether the ratelimit is exceeded. It is recommended to increase the request interval delay to avoid exceeding the ratelimit.

## Endpoints

### /api/v1/contract\_adjustfactor (Query information on Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...，If no data detected, system will return to all contracts by default. |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Milesecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| LIST\_START |  | false |  |  |
| lever\_rate | decimal | true | Leverage |  |
| LADDERS\_START |  | false |  |  |
| min\_size | decimal | true | Min net position limit |  |
| max\_size | decimal | true | Max net position limit |  |
| ladder | int | true | Tier |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| LADDERS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_adjustfactor"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "list": [
        {
          "lever_rate": 125,
          "ladders": [
            {
              "ladder": 0,
              "min_size": 0,
              "max_size": 1999,
              "adjust_factor": 0.65
            },
            {
              "ladder": 1,
              "min_size": 2000,
              "max_size": 14999,
              "adjust_factor": 0.8
            },
            {
              "ladder": 2,
              "min_size": 15000,
              "max_size": null,
              "adjust_factor": 0.85
            }
          ]
        }
      ]
    }
  ],
  "ts": 1604298785020
}
```

### /api/v1/contract\_his\_open\_interest (Query information on open interest)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |  |
| contract\_type | string | true | Contract Type | Weekly:"this\_week", Bi-weekly:"next\_week", Quarterly:"quarter" Next Quarterly Contract: "next\_quarter" |  |
| period | string | true | Period Type | 1 hour:"60min"，4 hours:"4hour"，12 hours:"12hour"，1 day:"1day" |  |
| size | int | false | Request Amount | Default：48，Data Range \[1,200\] |  |
| amount\_type | int | true | Open interest unit | 1:-cont，2:-cryptocurrenty |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Milesecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | Contract Code | "BTC","ETH"... |
| contract\_type | string | true | Contract Type | Weekly:"this\_week", Bi-weekly:"next\_week", Quarterly:"quarter" Next Quarterly Contract: "next\_quarter" |
| TICK\_START |  | false |  |  |
| volume | string | true | Open Interest. Sum of both buy and sell sides |  |
| amount\_type | int | true | Open Interest Unit | 1:-cont，2:- cryptocurrency |
| ts | long | true | Recording Time |  |
| TICK\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

tick field：Tick data is arranged in reverse chronological order；

data field：Dictionary database.

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_his_open_interest?symbol=BTC&contract_type=this_week&period=60min&amount_type=1"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "contract_type": "quarter",
    "tick": [
      {
        "volume": "3058980.0000000000000000",
        "amount_type": 1,
        "ts": 1604296800000
      },
      {
        "volume": "3049899.0000000000000000",
        "amount_type": 1,
        "ts": 1604293200000
      }
    ]
  },
  "ts": 1604298943494
}
```

### api/v1/contract\_ladder\_margin (Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | symbol, if not filled in, return all symbol | such as: “BTC”. “ETH”... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" . "error" |
| DATA\_START | objectarray | true |  |  |
| symbol | string | true | symbol | such as: "BTC" |
| LIST\_START | objectarray | true |  |  |
| lever\_rate | int | true | lever rate |  |
| LADDERS\_START | objectarray | true | ladders for margin |  |
| min\_margin\_balance | decimal | true | min margin balance(the starting point in this ladder, included in this ladder) |  |
| max\_margin\_balance | decimal | true | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min\_margin\_balance) |  |
| min\_margin\_available | decimal | true | min margin available(in the range of this ladder margin balance) |  |
| max\_margin\_available | decimal | true | max margin available（not in the range of this ladder margin balance, is next ladder's min\_margin\_available) |  |
| LADDERS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl "https://api.hbdm.com/api/v1/contract_ladder_margin?symbol=BTC"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "list": [
        {
          "lever_rate": 20,
          "ladders": [
            {
              "min_margin_balance": 0,
              "max_margin_balance": 20,
              "min_margin_available": 0,
              "max_margin_available": 20
            },
            {
              "min_margin_balance": 20,
              "max_margin_balance": 80,
              "min_margin_available": 20,
              "max_margin_available": 50
            },
            {
              "min_margin_balance": 80,
              "max_margin_balance": 380,
              "min_margin_available": 50,
              "max_margin_available": 110
            },
            {
              "min_margin_balance": 380,
              "max_margin_balance": 980,
              "min_margin_available": 110,
              "max_margin_available": 170
            },
            {
              "min_margin_balance": 980,
              "max_margin_balance": null,
              "min_margin_available": 170,
              "max_margin_available": null
            }
          ]
        }
      ]
    }
  ],
  "ts": 1612489488052
}
```

### /api/v1/contract\_elite\_account\_ratio (Query Top Trader Sentiment Index Function-Account)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |  |
| period | string | true | period | 5min, 15min, 30min, 60min,4hour,1day |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Milesecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| LIST\_START |  | false |  |  |
| buy\_ratio | decimal | true | net long accounts ratio |  |
| sell\_ratio | decimal | true | net short accounts ratio |  |
| locked\_ratio | decimal | true | locked accounts ratio |  |
| ts | long | true | Time of Respond Generation |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_elite_account_ratio?symbol=BTC&period=60min"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "list": [
      {
        "buy_ratio": 0.52,
        "sell_ratio": 0.45,
        "locked_ratio": 0.03,
        "ts": 1604290200000
      }
    ],
    "symbol": "BTC"
  },
  "ts": 1604299070097
}
```

### /api/v1/contract\_elite\_position\_ratio (Query Top Trader Sentiment Index Function-Position)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |  |
| period | string | true | period | 5min, 15min, 30min, 60min,4hour,1day |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Milesecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| LIST\_START |  | false |  |  |
| buy\_ratio | decimal | true | Net long position ratio |  |
| sell\_ratio | decimal | true | Net short position ratio |  |
| ts | long | true | Time of Respond Generation |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_elite_position_ratio?symbol=BTC&period=60min"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "list": [
      {
        "buy_ratio": 0.51,
        "sell_ratio": 0.49,
        "ts": 1604290500000
      },
      {
        "buy_ratio": 0.508,
        "sell_ratio": 0.492,
        "ts": 1604290800000
      }
    ],
    "symbol": "BTC"
  },
  "ts": 1604299402211
}
```

### /api/v3/contract\_liquidation\_orders (Query Liquidation Order Information(New))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Variety code |  | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |
| trade\_type | int | true | trading type |  | when “0”, request fully filled liquidated orders; when “5’, request liquidated close orders; when “6”, request liquidated open orders |
| start\_time | long | false |  | (now) – 2h | Value range \[((end-time) – 2h), (end-time)\], maximum query window size is 2 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end\_time | long | false |  | now | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next | next, prev default is prev |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  | Search query\_id to begin with |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
|  |  | false |  |  |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | objectarray | true |  |  |
| query\_id | long | true | next Query ID |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| direction | string | true | "buy":buy"sell": sell |  |
| offset | string | true | "open":open "close": close |  |
| volume | decimal | true | liquidated volume(cont) |  |
| amount | decimal | true | liquidation amount (token) |  |
| price | decimal | true | bankruptcy price |  |
| created\_at | long | true | liquidation time |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v3/contract_liquidation_orders?trade_type=5&symbol=BTC"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "contract_code": "BTC201225",
      "symbol": "BTC",
      "direction": "buy",
      "offset": "close",
      "volume": 26,
      "price": 19674.96,
      "created_at": 1606293144641,
      "amount": 0.13214766383260754
    }
  ],
  "ts": 1604312615051
}
```

### /api/v1/contract\_settlement\_records (Query historical settlement records of the platform interface)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Token Code | "BTC","ETH"... |  |
| start\_time | long | false | Start time（timestamp，unit: millisecond） | Value range: \[(Current time minus 90 days), Current time\] ，default current time minus 90 days |  |
| end\_time | long | false | End time（timestamp，unit: millisecond） | Value range: (start\_time, current time\]，default current time |  |
| page\_index | int | false | Page, default page 1 if not filled |  |  |
| page\_size | int | false | Page items, default 20, shall not exceed 50 | \[1-50\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Response generation time point, unit: millisecond |  |
| DATA\_START | objectarray | true |  |  |
| SETTLEMENT\_RECORD\_START | objectarray | true |  |  |
| symbol | string | true | Token Code |  |
| settlement\_time | long | true | Settlement Time（timestamp，unit: millisecond）（when the settlement\_type is delivery, the time is delivery time; when the settlement\_type is settlement, the time is settlement time） |  |
| clawback\_ratio | decimal | true | Clawback Ratio |  |
| LIST\_START | objectarray | true |  |  |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| settlement\_price | decimal | true | Settlement Price（when the settlement\_type is delivery, the price is delivery price; when the settlement\_type is settlement, the price is settlement price；） |  |
| settlement\_type | string | true | Settlement Type | “delivery”：Delivery，“settlement”：Settlement |
| LIST\_END |  | false |  |  |
| SETTLEMENT\_RECORD\_END |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total page items |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_settlement_records?symbol=BTC&start_time=1671441781000&end_time=1671528181856&page_index=1&page_size=20"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 13,
    "current_page": 1,
    "total_size": 13,
    "settlement_record": [
      {
        "symbol": "BTC",
        "settlement_time": 1605859200000,
        "clawback_ratio": 0,
        "list": [
          {
            "contract_code": "BTC201120",
            "settlement_price": 18217.62,
            "settlement_type": "delivery"
          },
          {
            "contract_code": "BTC201127",
            "settlement_price": 18292.24,
            "settlement_type": "settlement"
          },
          {
            "contract_code": "BTC201225",
            "settlement_price": 18490.42,
            "settlement_type": "settlement"
          },
          {
            "contract_code": "BTC210326",
            "settlement_price": 18788.7,
            "settlement_type": "settlement"
          }
        ]
      }
    ]
  },
  "ts": 1606295834648
}
```

### /v1/insurance\_fund\_info (Query risk reserve balance information)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Query the total amount of risk funds for all current business lines, priced in USDT.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object array | true |  |  |
| insurance\_fund | string | true | Insurance Fund Balance |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "insurance_fund": 353207326.6713937,
    "quote_currency": "USDT"
  },
  "ts": 1727584880593
}
```

### /v1/insurance\_fund\_history (Query historical risk reserves)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Query the data of historical risk funds and display it by day.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start\_time | long | false | Query start time, query by data creation. time,millisecond timestamp. |  |  |
| end\_time | long | false | Query end time, query data by creation. timetime,millisecond timestamp. |  |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | now |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |
| limit | int | false |  |  | 10 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| query\_id | string | true | query id |  |
| date | string | true |  |  |
| insurance\_fund | string | true | Insurance Fund Balance |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

```
{
  "start_time": "",
  "end_time": "",
  "direct": "",
  "from_id": "",
  "limit": ""
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "query_id": 37,
      "insurance_fund": 353207326.6713937,
      "date": "2024-09-29"
    },
    {
      "query_id": 30,
      "insurance_fund": 11455730.249709358,
      "date": "2024-09-27"
    },
    {
      "query_id": 29,
      "insurance_fund": 8674362.662209358,
      "date": "2024-09-26"
    },
    {
      "query_id": 28,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-25"
    },
    {
      "query_id": 27,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-24"
    },
    {
      "query_id": 26,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-23"
    },
    {
      "query_id": 25,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-22"
    },
    {
      "query_id": 24,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-21"
    },
    {
      "query_id": 23,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-20"
    },
    {
      "query_id": 22,
      "insurance_fund": 20002222.00001776,
      "date": "2024-09-19"
    }
  ],
  "ts": 1727592000787
}
```

### /api/v1/contract\_price\_limit (Get Contract Price Limitation)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |  |  |
| contract\_type | string | false | Contract Type ("this\_week","next\_week","quarter", "next\_quarter") |  |  |
| contract\_code | string | false | BTC180914 ... |  |  |

Notes:

If not any parameter is filled, the interface returns the price limitation data of all currently available contracts. If the contract\_code is filled in, query by the contract\_code; The contract\_type parameter needs to together with symbol, and can't get contract data only by contract\_type

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" ,"error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH" ... |
| high\_limit | decimal | true | Highest Buying Price |  |
| low\_limit | decimal | true | Lowest Selling Price |  |
| contract\_code | string | true | Contract Code | eg "BTC180914" ... |
| contract\_type | string | true | Contract Type | "this\_week","next\_week","quarter" ,"next\_quarter" |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_price_limit?symbol=BTC&contract_type=this_week"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC210813",
      "contract_type": "this_week",
      "high_limit": 46365.84,
      "low_limit": 44547.58
    }
  ],
  "ts": 1628650919495
}
```

### /api/v1/contract\_open\_interest (Get Contract Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |  |  |
| contract\_type | string | false | Contract Type ("this\_week","next\_week","quarter") |  |  |
| contract\_code | string | false | BTC180914 |  |  |

Notes:

If not any parameter is filled, the interface returns the price limitation data of all currently available contracts. If the contract\_code is filled in, query by the contract\_code; The contract\_type parameter needs to together with symbol, and can't get contract data only by contract\_type

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC", "ETH" ... |
| contract\_type | string | true | Contract Type | "this\_week","next\_week","quarter", "next\_quarter" |
| volume | decimal | true | Position quantity(volume). Sum of both buy and sell sides |  |
| amount | decimal | true | Position quantity(Currency). Sum of both buy and sell sides |  |
| contract\_code | string | true | Contract Code | eg "BTC180914" ... |
| trade\_amount | decimal | true | trading volume within the last 24 hours (coin). Sum of both buy and sell sides |  |
| trade\_volume | decimal | true | trading volume within the last 24 hours (cont). Sum of both buy and sell sides |  |
| trade\_turnover | decimal | true | trading amount within the last 24 hours. Sum of both buy and sell sides |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_open_interest?symbol=BTC&contract_type=this_week"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "volume": 399976,
      "amount": 877.273288561929,
      "symbol": "BTC",
      "contract_type": "this_week",
      "contract_code": "BTC210813",
      "trade_amount": 4986.528002538939,
      "trade_volume": 2272868,
      "trade_turnover": 227286800
    }
  ],
  "ts": 1628651933482
}
```

### /api/v1/contract\_delivery\_price (Get the estimated delivery price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g."BTC","ETH"... |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| delivery\_price | decimal | true | estimated delivery price |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_delivery_price?symbol=BTC"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "delivery_price": 40883.18927358753
  },
  "ts": 1628652034810
}
```

### /api/v1/contract\_estimated\_settlement\_price (Get The Estimated Settlement Price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | symbol, return all without filling in | "BTC" ... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tatus | string | true | status |  |
| DATA\_START | objectarray | true |  |  |
| symbol | string | true | symbol | "BTC" ... |
| LIST\_START | objectarray | true |  |  |
| contract\_type | string | true | contract type | "next\_week", "quarter", "next\_quarter" |
| contract\_code | string | true | contract code | "ETH201225" ... |
| estimated\_settlement\_price | decimal | true | Current-period estimated settlement price /Current-period estimated delivery price (When the settlement type is "delivery", it is estimated delivery price; Otherwise, it is estimated settlement price) |  |
| settlement\_type | string | true | settlement type | “delivery”，“settlement” |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

Notes:

If the settement type is "settlement", the field "estimated\_settlement\_price" will not be caluculated and shown updatedly until an hour before settlement. At other points (including the point of settlement), the field value will be empty; and other fields will be showned normally.

If the settement type is "delivery", the field "estimated\_settlement\_price" will not be caluculated and shown updatedly until an hour before delivery. At other points (including the point of delivery), the field value will be empty; and other fields will be showned normally.

Estimated settlement price will be calculated and updated every 6 seconds.

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_estimated_settlement_price?symbol=BTC"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "list": [
        {
          "contract_type": "this_week",
          "contract_code": "BTC210122",
          "estimated_settlement_price": null,
          "settlement_type": "settlement"
        },
        {
          "contract_type": "next_week",
          "contract_code": "BTC210129",
          "estimated_settlement_price": null,
          "settlement_type": "settlement"
        },
        {
          "contract_type": "quarter",
          "contract_code": "BTC210326",
          "estimated_settlement_price": null,
          "settlement_type": "settlement"
        },
        {
          "contract_type": "next_quarter",
          "contract_code": "BTC210625",
          "estimated_settlement_price": null,
          "settlement_type": "settlement"
        }
      ]
    }
  ],
  "ts": 1609835707183
}
```

### /api/v1/contract\_api\_state (Query information on system status)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | symbol | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... If no data detected, system will return to all symbols by default |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: milesecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| open | int | true | open order access：when “1”, then access available; when “0”, access unavailable"1" |  |
| close | int | true | close order access：when “1”, then access available; when “0”, access unavailable "1" |  |
| cancel | int | true | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_in | int | true | deposit access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_out | int | true | withdraw access： when “1”, then access available; when “0”, access unavailable "1" |  |
| master\_transfer\_sub | int | true | transfer from master to sub account："1" is available，“0” is unavailable |  |
| sub\_transfer\_master | int | true | transfer from sub to master account："1" is available，“0” is unavailable |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_api_state"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "transfer_in": 1,
      "transfer_out": 1,
      "master_transfer_sub": 1,
      "sub_transfer_master": 1
    },
    {
      "symbol": "ETH",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "transfer_in": 1,
      "transfer_out": 1,
      "master_transfer_sub": 1,
      "sub_transfer_master": 1
    }
  ],
  "ts": 1628652120762
}
```

### /api/v1/contract\_contract\_info (Get Contract Info)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

Interface description: contract elements it can display more futures fields, we recommend you to use it.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC","ETH"... |  |  |
| contract\_type | string | false | "this\_week","next\_week", "quarter" "next\_quarter" |  |  |
| contract\_code | string | false | BTC180914 |  |  |

Notes:

If there is a number in the Contract Code row，inquiry with Contract\_Code. If there is no number，inquiry by Symbol + Contract Type. One of the query conditions must be chosen.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Product Code | "BTC","ETH"... |
| contract\_code | string | true | Contract Code | "BTC180914" ... |
| contract\_type | string | true | Contract Type | "this\_week","next\_week", "quarter" ,"next\_quarter" |
| contract\_size | decimal | true | Contract Value (USD of one contract) | 10, 100... |
| price\_tick | decimal | true | Minimum Variation of Contract Price | 0.001, 0.01... |
| delivery\_date | string | true | Contract Delivery Date | eg "20180720" |
| create\_date | string | true | Contract Listing Date | eg "20180706" |
| settlement\_time | string | true | Next settlement time（timestamp，unit: millisecond） |  |
| delivery\_time | string | true | delivery time（timestamp，unit: millisecond） |  |
| contract\_status | int | true | Contract Status | 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,5: In Settlement,6: Delivering,7: Settlement Completed,8: Delivered,9: Suspending of Trade |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_api_state"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC210813",
      "contract_type": "this_week",
      "contract_size": 100,
      "price_tick": 0.01,
      "delivery_date": "20210813",
      "delivery_time": "1628841600000",
      "create_date": "20210730",
      "contract_status": 1,
      "settlement_time": "1628668800000"
    },
    {
      "symbol": "ETH",
      "contract_code": "ETH210813",
      "contract_type": "this_week",
      "contract_size": 10,
      "price_tick": 0.001,
      "delivery_date": "20210813",
      "delivery_time": "1628841600000",
      "create_date": "20210730",
      "contract_status": 1,
      "settlement_time": "1628668800000"
    }
  ],
  "ts": 1628650535608
}
```

### /api/v1/contract\_index (Get Contract Index Price Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC","ETH"... |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| index\_price | decimal | true | Index Price |  |
| index\_ts | long | true | Response generation time point, unit: millisecond |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_index?symbol=BTC"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "index_price": 13707.26,
      "index_ts": 1604296614010
    }
  ],
  "ts": 1604296620746
}
```

### /api/market/contract\_constituents (Get index components)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get the index component information data on the market.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol code | BTC","ETH"... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| ts | long | true | Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 |  |
| components | string | true | Components |  |
| | exchange | string | true |  |  |
| | symbol | string | true |  |  |
| | weights | string | true |  |  |
| | symbol\_price | string | true |  |  |
| index\_price | string | true |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/api/market/contract_constituents?symbol=BTC" `

#### Response Example

##### Success Example

```
{
  "data": {
    "components": [
      {
        "exchange": "bitstamp",
        "symbol": "XRP-USD",
        "symbol_price": "0.5426",
        "weights": "25.0000"
      },
      {
        "exchange": "huobi",
        "symbol": "XRP-USDT",
        "symbol_price": "0.54352938875951312549420",
        "weights": "25.0000"
      },
      {
        "exchange": "binance",
        "symbol": "XRP-BTC",
        "symbol_price": "0.54295220170000000000000000",
        "weights": "25.0000"
      },
      {
        "exchange": "binance",
        "symbol": "XRP-USDT",
        "symbol_price": "0.54360952283326779920700000",
        "weights": "25.0000"
      }
    ],
    "index_price": "0.543172778323195231",
    "symbol": "XRP",
    "ts": 1725605194096
  },
  "status": "ok",
  "ts": 1725605198509
}
```

### /api/v1/contract\_query\_elements (Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get Contract Elements info

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract code, if blank, query all | BTC |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tatus | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | BTC |  |
| instrument\_index\_code | string | true | index |  |
| real\_time\_settlement | int | true | Whether to enable real-time settlement: 0: No; 1: Yes |  |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| contract\_code | string | true | contract code |  |
| instrument\_type | list | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| create\_date | string | true | Listing Date | eg "20190808" |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| delivery\_date | string | true | delivery date, empty string when swap | such as: "20180720" |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| transfer\_profit\_ratio | Number | true | transfer profit ratio |  |
| min\_level | int | true | min level |  |
| max\_level | int | true | max level |  |
| open\_order\_limit | int | true | long position limit |  |
| offset\_order\_limit | int | true | offset order limit |  |
| long\_position\_limit | int | true | open order limit |  |
| short\_position\_limit | int | true | short position limit |  |
| week\_hig\_normal\_limit | int | true | week hig normal limit |  |
| week\_min\_normal\_limit | int | true | week\_min\_normal\_limit |  |
| week\_hig\_open\_limit | int | true | week hig open limit |  |
| week\_min\_open\_limit | int | true | week min open limit |  |
| week\_hig\_trade\_limit | int | true | week hig trade limit |  |
| week\_min\_trade\_limit | int | true | week min trade limit |  |
| biweek\_hig\_normal\_limit | int | true | biweek hig normal limit |  |
| biweek\_min\_normal\_limit | int | true | biweek min normal limit |  |
| biweek\_hig\_open\_limit | int | true | biweek hig open limit |  |
| biweek\_min\_open\_limit | int | true | biweek min open limit |  |
| biweek\_hig\_trade\_limit | int | true | biweek hig trade limit |  |
| biweek\_min\_trade\_limit | int | true | biweek min trade limit |  |
| quarter\_hig\_normal\_limit | int | true | quarter hig normal limit |  |
| quarter\_min\_normal\_limit | int | true | quarter min normal limit |  |
| quarter\_hig\_open\_limit | int | true | quarter hig open limit |  |
| quarter\_min\_open\_limit | int | true | quarter min open limit |  |
| quarter\_hig\_trade\_limit | int | true | quarter hig trade limit |  |
| quarter\_min\_trade\_limit | int | true | quarter min trade limit |  |
| biquarter\_hig\_normal\_limit | int | true | biquarter hig normal limit |  |
| biquarter\_min\_normal\_limit | int | true | biquarter min normal limit |  |
| biquarter\_hig\_open\_limit | int | true | biquarter hig open limit |  |
| biquarter\_min\_open\_limit | int | true | biquarter min open limit |  |
| biquarter\_hig\_trade\_limit | int | true | biquarter hig trade limit |  |
| biquarter\_min\_trade\_limit | int | true | biquarter min trade limit |  |
| real\_time\_settlement | int | true | Whether to enable real-time settlement: 0: No; 1: Yes |  |
| instrument\_type | array | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures |  |
| ORDER\_LIMITS\_START | object array | true | contract Face Value |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| trigger\_protect | decimal | false | Threshold for price Protection |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_query_elements?contract_code=BTC" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "contract_code": "ETH",
      "instrument_index_code": "ETH-USD",
      "price_tick": "0.001000000000000000",
      "instrument_value": "10.000000000000000000",
      "min_level": "1",
      "max_level": "95",
      "open_order_limit": "10008000.000000000000000000",
      "offset_order_limit": "11700.000000000000000000",
      "long_position_limit": "11200000.000000000000000000",
      "short_position_limit": "11200000.000000000000000000",
      "week_hig_normal_limit": 1.005,
      "week_min_normal_limit": 1.004,
      "week_hig_open_limit": 1.009,
      "week_min_open_limit": 1.002,
      "week_hig_trade_limit": 1.006,
      "week_min_trade_limit": 1.005,
      "biweek_hig_normal_limit": 100,
      "biweek_min_normal_limit": 1000,
      "biweek_hig_open_limit": 1000,
      "biweek_min_open_limit": 1000,
      "biweek_hig_trade_limit": 1000,
      "biweek_min_trade_limit": 1000,
      "quarter_hig_normal_limit": 1.004,
      "quarter_min_normal_limit": 1.002,
      "quarter_hig_open_limit": 1.009,
      "quarter_min_open_limit": 1.002,
      "quarter_hig_trade_limit": 1.005,
      "quarter_min_trade_limit": 1.003,
      "biquarter_hig_normal_limit": 0.054,
      "biquarter_min_normal_limit": 0.072,
      "biquarter_hig_open_limit": 0.009,
      "biquarter_min_open_limit": 0.012,
      "biquarter_hig_trade_limit": 0.045,
      "biquarter_min_trade_limit": 0.063,
      "real_time_settlement": 0,
      "transfer_profit_ratio": 0,
      "instrument_type": [
        1,
        2,
        3,
        4
      ],
      "order_limits": [
        {
          "instrument_type": 1,
          "open": "1600.000000000000000000",
          "close": "1900.000000000000000000"
        },
        {
          "instrument_type": 2,
          "open": "1000.000000000000000000",
          "close": "1300.000000000000000000"
        },
        {
          "instrument_type": 3,
          "open": "10000000.000000000000000000",
          "close": "2000.000000000000000000"
        },
        {
          "instrument_type": 4,
          "open": "5400.000000000000000000",
          "close": "6500.000000000000000000"
        }
      ],
      "contract_infos": [
        {
          "contract_code": "ETH231109",
          "instrument_type": 1,
          "delivery_time": "1699498200000",
          "create_date": "20231027",
          "contract_status": 1,
          "delivery_date": "20231109"
        },
        {
          "contract_code": "ETH231116",
          "instrument_type": 2,
          "delivery_time": "1700103000000",
          "create_date": "20231115",
          "contract_status": 1,
          "delivery_date": "20231116"
        },
        {
          "contract_code": "ETH231228",
          "instrument_type": 3,
          "delivery_time": "1703731800000",
          "create_date": "20231027",
          "contract_status": 1,
          "delivery_date": "20231228"
        },
        {
          "contract_code": "ETH240328",
          "instrument_type": 4,
          "delivery_time": "1711594200000",
          "create_date": "20231027",
          "contract_status": 1,
          "delivery_date": "20240328"
        }
      ]
    }
  ],
  "ts": 1703215854265
}
```

### https://api.hbdm.com/api/v1/timestamp (Get current system timestamp)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com/api/v1/timestamp |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| ts | long | true | current system timestamp |  |

Notes:

It can be used for system time calibration.

#### Request example

`curl"https://api.hbdm.com/api/v1/timestamp"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ts": 1578124684692
}
```

### https://api.hbdm.com/heartbeat/ (Query whether the system is available)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: the rate limit is 120 times every 3 seconds at most for each IP (this 120 times every 3 seconds public interface rate limit is shared by all the requests from that IP of non-marketing information, like above)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com/heartbeat/ |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | "ok" or "error"... |  |
| DATA\_START | dictobject | false |  |  |
| heartbeat | int | false | future 1: avaiable 0: not available(maintenance with service suspended) |  |
| swap\_heartbeat | int | false | coin margined swap 1: avaiable 0: not available(maintenance with service suspended) |  |
| estimated\_recovery\_time | long | false | null: normal. estimated recovery time :millionseconds. |  |
| swap\_estimated\_recovery\_time | long | false | null: normal. coin margined swap estimated recovery time millionseconds. |  |
| linear\_swap\_heartbeat | long | false | USDT margined Contracts 1: avaiable 0: not available(maintenance with service suspended) |  |
| linear\_swap\_estimated\_recovery\_time | long | false | null: normal. USDT margined Contracts estimated recovery time millionseconds. |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/heartbeat/"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "heartbeat": 1,
    "estimated_recovery_time": null,
    "swap_heartbeat": 1,
    "swap_estimated_recovery_time": null,
    "linear_swap_heartbeat": 1,
    "linear_swap_estimated_recovery_time": null
  },
  "ts": 1557714418033
}
```

### (Maintenance with service suspended)

Signature verification: Yes

Interface permission: Read

Interface description: During the maintenance of the business system, in addition to the below two interfaces(Get system status, Query whether the system is available) for users to query the system status, all “rest” interfaces of the API business will return this in a fixed manner:{"status": "maintain"}. During maintenance with service suspended，all websocket notify interfaces except subscribing system status updates（Subscribe system status updates）can't work，and will push 1006 error code to clients.Response{ "status": "maintain"}Query whether the system is available: https://api.hbdm.com/heartbeat/for getting the infomation that system maintenance with service suspended, could by subscrib system status updates websocket interface.

#### Request Address

| Environment | Address |
| --- | --- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "status": "maintain"
}
```

### /market/depth (Get Market Depth)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |  |  |
| type | string | true | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15（merged depth data 0-5,14-15）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13(merged depth data 7-13); when step is 6, depth data will not be merged. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.period |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| TICK\_START |  | false |  |  |
| mrid | long | true | Order ID |  |
| id | long | true | tick ID |  |
| asks | array | false | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bids | array | false | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| version | long | true | version ID |  |
| ch | string | true | Data channel, Format： market.period |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/market/depth?symbol=BTC_CQ&type=step5"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC_NQ.depth.step6",
  "status": "ok",
  "tick": {
    "asks": [
      [
        14100.87,
        163
      ],
      [
        14100.88,
        20
      ]
    ],
    "bids": [
      [
        14098.09,
        53
      ],
      [
        14098.08,
        75
      ]
    ],
    "ch": "market.BTC_NQ.depth.step6",
    "id": 1604297395,
    "mrid": 113765352864,
    "ts": 1604297395012,
    "version": 1604297395
  },
  "ts": 1604297395085
}
```

### /market/bbo (Get Market BBO Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | symbol, if not filled in, return all | such as "BTC\_CW" represents BTC “This Week”, "BTC\_NW" represents BTC “Next Week”, "BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported, e.g.: BTC200220 |  |

Notes:

If not filled in any symbol, return the Market BBO Data of all symbol.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| TICKS\_START | objectarray | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| mrid | long | true | Match ID, unique identification |  |
| ask | array | false | \[Ask 1 price, Ask 1 qty (cont)\] |  |
| bid | array | false | \[Bid 1 price, Bid 1 qty (cont)\] |  |
| ts | long | true | The system detects the orderbook time point, unit: milliseconds |  |
| TICKS\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/market/bbo?symbol=BTC_CW"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ticks": [
    {
      "symbol": "BTC_CW",
      "ask": [
        45651.21,
        498
      ],
      "bid": [
        45644.31,
        40
      ],
      "mrid": 144083800866,
      "ts": 1628652339586
    },
    {
      "symbol": "BTC_NW",
      "ask": [
        45659.01,
        8
      ],
      "bid": [
        45659,
        184
      ],
      "mrid": 144083799954,
      "ts": 1628652337609
    }
  ],
  "ts": 1628652339605
}
```

### /market/history/kline (Get Kline Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Contract Name |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |
| period | string | true | Kline Type |  | 1min, 5min, 15min, 30min, 60min, 1hour,4hour,1day, 1mon |
| size | int | false | Acquisition Quantity |  | \[1,2000\] |
| from | long | false | start timestamp seconds. |  |  |
| to | long | false | end timestamp seconds |  |  |

Notes:

Either size field or from/to fields need to be filled.

If size field and from/to fields are not filled, It will return error messages.

If from field is filled, to field need to filled too. The api can mostly return the klines of last two years.

If size, from and toare all filled in, the from and to parameters will be ignored.

Support to query K-line data of contracts which have been delisted in the last four weeks; User can enter contract code to query data of contracts delisted in the last four weeks.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.period |  |
| DATA\_START | object | true | Kline Data |  |
| id | int | true | kline id,the same as kline timestamp, kline start timestamp |  |
| vol | decimal | true | volume. Sum of both buy and sell sides |  |
| count | decimal | true | count. Sum of both buy and sell sides |  |
| open | decimal | true | open price |  |
| close | decimal | true | close price |  |
| low | decimal | true | lowest price |  |
| high | decimal | true | highest price |  |
| amount | decimal | true | amount based on coins. Sum of both buy and sell sides |  |
| DATA\_END |  | false |  |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/market/history/kline?period=1min&size=200&symbol=BTC_CQ"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC_CQ.kline.1min",
  "ts": 1628652530074,
  "status": "ok",
  "data": [
    {
      "id": 1628652420,
      "open": 45875.02,
      "close": 45851,
      "low": 45850.93,
      "high": 45880.01,
      "amount": 2.6471133153472475,
      "vol": 1214,
      "count": 50
    },
    {
      "id": 1628652480,
      "open": 45863.34,
      "close": 45857.52,
      "low": 45851.87,
      "high": 45863.34,
      "amount": 0.6411077350166106,
      "vol": 294,
      "count": 7
    }
  ]
}
```

### /index/market/history/mark\_price\_kline (Get Kline Data of Mark Price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol |  | "BTC\_CW" represents BTC “This Week”, "BTC\_NW" represents BTC “Next Week”, "BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |
| period | string | true | kline period |  | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week,1mon |
| size | int | true | kline size |  | \[1,2000\] |

Notes:

At one time 2000 at most

Case-Insenstive, both uppercase and lowercase are supported

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | channel |  |
| DATA\_START | objectarray | true |  |  |
| id | long | true | kline id |  |
| vol | string | true | trade vol(cont), value is 0 |  |
| count | string | true | trade count, value is 0 |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| low | string | true | low price |  |
| high | string | true | high price |  |
| amount | string | true | trade amount(coin), value is 0 |  |
| DATA\_END |  | false |  |  |
| status | string | true | status | "ok" , "error" |
| ts | number | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/index/market/history/mark_price_kline?symbol=BTC_CW&period=15min&size=100"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC_CQ.mark_price.5min",
  "data": [
    {
      "amount": "0",
      "close": "45853.29",
      "count": "0",
      "high": "45936.25",
      "id": 1628652300,
      "low": "45853.05",
      "open": "45931.25",
      "vol": "0"
    },
    {
      "amount": "0",
      "close": "45862.49",
      "count": "0",
      "high": "45862.49",
      "id": 1628652600,
      "low": "45851.31",
      "open": "45852.5",
      "vol": "0"
    }
  ],
  "status": "ok",
  "ts": 1628652647728
}
```

### /market/detail/merged (Get Market Data Overview)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Contract Name |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，format： market.\$symbol.detail.merged |  |
| status | string | true | Request Processing Result | "ok" , "error" |
| tick | object | true | Kline Data |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| TICK\_START |  | false | kline data (Start at 00:00(UTC+8) of the day) |  |
| id | long | true | kline id,the same as kline timestamp |  |
| vol | string | true | Trade Volume(Cont.). from nowtime - 24 hours. Sum of both buy and sell sides |  |
| count | int | true | Order Quantity. from nowtime - 24 hours. Sum of both buy and sell sides |  |
| open | string | true | Open Price |  |
| close | string | true | Clos Price, the price in the last kline is the latest order price |  |
| low | string | true | Low Price |  |
| high | string | true | High Price |  |
| amount | string | true | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). from nowtime - 24 hours. Sum of both buy and sell sides |  |
| ask | object | true | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |  |
| bid | object | true | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/market/detail/merged?symbol=BTC_CQ"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC_NQ.detail.merged",
  "status": "ok",
  "tick": {
    "amount": "4478.2911316482577028620799060719867257944",
    "ask": [
      14114.01,
      177
    ],
    "bid": [
      14112.71,
      28
    ],
    "close": "14114",
    "count": 18805,
    "high": "14299.99",
    "id": 1604298319,
    "low": "14028.78",
    "open": "14229.47",
    "ts": 1604298319019,
    "vol": "633708"
  },
  "ts": 1604298319019
}
```

### /v2/market/detail/batch\_merged (Get a Batch of Market Data Overview(V2))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Contract Name |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |

Notes:

The interface data updated frequency is 50ms

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| TICKS\_START | objectarray | true |  |  |
| symbol | string | true | symbol | "BTC\_CW","BTC\_NW","BTC\_CQ","BTC\_NQ" |
| id | long | true | the id of kline |  |
| amount | string | true | amount(coin), from nowtime - 24 hours. Sum of both buy and sell sides |  |
| ask | array | true | \[ask one price, ask one vol(cont)\] |  |
| bid | array | true | \[bid one price\], bid one vol(cont)\] |  |
| open | string | true | open price |  |
| close | string | true | close price |  |
| count | decimal | true | trade count ,from nowtime - 24 hours. Sum of both buy and sell sides |  |
| high | string | true | high price |  |
| low | string | true | low price |  |
| vol | string | true | Transaction amount, from nowtime - 24 hours. Sum of both buy and sell sides |  |
| number\_of | string | true | number of(cont), from nowtime - 24 hours. Sum of both buy and sell sides |  |
| ts | long | true | timestamp |  |
| TICKS\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit：Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/v2/market/detail/batch_merged?symbol=BTC_CW"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ticks": [
    {
      "id": 1650792244,
      "ts": 1650792244792,
      "ask": [
        39842.79,
        236
      ],
      "bid": [
        39842.78,
        363
      ],
      "symbol": "BTC_CQ",
      "open": "39878.01",
      "close": "39849.27",
      "low": "39416.79",
      "high": "40103.11",
      "amount": "2786.4746103477839423822794961288088470112",
      "count": 12501,
      "vol": "110847600",
      "number_of": "1108476"
    }
  ],
  "ts": 1650792244792
}
```

### /market/trade (Query The Last Trade of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | Contract Name |  | Case-Insenstive.Both uppercase and lowercase are supported.. e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.\$symbol.trade.detail |  |
| status | string | true |  |  |
| ts | long | true | Sending time |  |
| TICK\_START |  | false |  |  |
| id | long | true | Unique Order Id(symbol level) |  |
| ts | long | true | Latest Creation Time |  |
| DATA\_START |  | false |  |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | string | true | Price |  |
| amount | string | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| ts | long | true | Order Creation Time |  |
| quantity | string | true | trading quantity(coin) |  |
| symbol | string | true | symbol |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/market/trade?symbol=BTC_CQ"`

#### Response Example

##### Success Example

```
{
  "ch": "market.*.trade.detail",
  "status": "ok",
  "tick": {
    "data": [
      {
        "amount": "4",
        "quantity": "0.0129032258064516129032258064516129032",
        "ts": 1613998847438,
        "id": 50710000,
        "price": "31000",
        "direction": "buy",
        "symbol": "BTC_NQ"
      }
    ],
    "id": 1614068483482,
    "ts": 1614068483482
  },
  "ts": 1614068483482
}
```

### /market/history/trade (Query a Batch of Trade Records of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Contract Name |  | Case-Insenstive.Both uppercase and lowercase are supported.. e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. Contract code is supported to query data. e.g.: "BTC200918"(weekly), "BTC200925"(Bi-weekly),"BTC201225"(quarterly),"BTC210326"(next quarterly) |
| size | int | true | Number of Trading Records Acquisition |  | \[1, 2000\] |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | Data belonged channel，Format： market.\$symbol.trade.detail |  |
| status | string | true |  |  |
| ts | long | true | Sending time |  |
| TICK\_START |  | false |  |  |
| id | long | true | Unique Order Id(symbol level) |  |
| ts | long | true | Latest Creation Time |  |
| DATA\_START |  | false |  |  |
| id | long | true | Unique Transaction Id(symbol level) |  |
| price | decimal | true | Price |  |
| amount | decimal | true | Quantity(Cont.). Sum of both buy and sell sides |  |
| direction | string | true | The direction to buy or sell is the direction of the taker (active transaction) |  |
| ts | long | true | Order Creation Time |  |
| quantity | decimal | true | trading quantity(coin) |  |
| DATA\_END |  | false |  |  |
| TICK\_END |  | false |  |  |

Notes:

There are "quantity" parameter in return data only after 21:00:00 on February 3, 2021

#### Request example

`curl"https://api.hbdm.com/market/history/trade?symbol=BTC_CQ&size=100"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ts": 1612491154213,
  "ch": "market.BTC_NQ.trade.detail",
  "data": [
    {
      "id": 123609277049,
      "ts": 1612491144090,
      "data": [
        {
          "amount": 20,
          "quantity": 0.05049085951347513,
          "ts": 1612491144090,
          "id": 1236092770490000,
          "price": 39611.13,
          "direction": "sell"
        }
      ]
    },
    {
      "id": 123609282167,
      "ts": 1612491148260,
      "data": [
        {
          "amount": 20,
          "quantity": 0.05048658975203007,
          "ts": 1612491148260,
          "id": 1236092821670000,
          "price": 39614.48,
          "direction": "sell"
        }
      ]
    }
  ]
}
```

### /index/market/history/index (Query Index Kline Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | index symbol |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g."BTC-USD","ETH-USD"... |
| period | string | true | kline type |  | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1mon |
| size | integer | true | data size |  | \[1,2000\] |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | data channel |  |
| DATA\_START |  | false | object |  |
| id | decimal | true | index kline id,the same as kline timestamp, kline start timestamp |  |
| vol | decimal | true | Trade Volume(Cont.) The value is 0 |  |
| count | decimal | true | Order Quantity The value is 0 |  |
| open | decimal | true | Opening Index Price |  |
| close | decimal | true | Closing Index Price, the price in the last kline is the latest order price |  |
| low | decimal | true | Lowest Index Price |  |
| high | decimal | true | Highest Index Price |  |
| amount | decimal | true | Trade Amount(Coin), The value is 0. ) |  |
| DATA\_END |  | false |  |  |
| status | string | true | process status |  |
| ts | long | true | timestamp of the response of the server |  |

#### Request example

`curl"https://api.hbdm.com/index/market/history/index?symbol=BTC-USD&period=1min&size=150"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USD.index.60min",
  "data": [
    {
      "amount": 0,
      "close": 13703.4175,
      "count": 0,
      "high": 13720.84,
      "id": 1604293200,
      "low": 13658.245,
      "open": 13709.6175,
      "vol": 0
    },
    {
      "amount": 0,
      "close": 13751.6,
      "count": 0,
      "high": 13771.21,
      "id": 1604296800,
      "low": 13693.16,
      "open": 13703.365,
      "vol": 0
    }
  ],
  "status": "ok",
  "ts": 1604299755097
}
```

### /index/market/history/basis (Query Basis Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: all products(futures, coin margined swap, usdt margined Contracts ) 800 times/second for one IP at most

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | symbol name |  | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC\_CW" represents BTC “This Week”，"BTC\_NW" represents BTC “Next Week”，"BTC\_CQ" represents BTC “Quarter”."BTC\_NQ" represents BTC “Next Quarter”. |
| period | string | true | kline period |  | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | Using open price default | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" |
| size | integer | true | data size |  | \[1,2000\] |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | theme |  |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| id | long | true | unique id |  |
| contract\_price | string | true | contract last price |  |
| index\_price | string | true | index price |  |
| basis | string | true | basis=contract\_price - index\_price |  |
| basis\_rate | string | true | basis\_rate=basis/index\_price |  |
| DATA\_END |  | false |  |  |
| ts | long | true | the timestamp of generation |  |

Notes:

2000 size at most per request ；

The basis data of Next Quarterly Contract is available after 2020/6/15 14:00:00.

#### Request example

`curl"https://api.hbdm.com/index/market/history/basis?symbol=BTC_CQ&period=1min&size=150&basis_price_type=open"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USD.basis.5min.open",
  "data": [
    {
      "basis": "-2.1850000000013097",
      "basis_rate": "-0.00015880531885174013",
      "contract_price": "13756.8",
      "id": 1604299500,
      "index_price": "13758.985"
    },
    {
      "basis": "-4.235000000000582",
      "basis_rate": "-0.00030799697602973224",
      "contract_price": "13745.9",
      "id": 1604299800,
      "index_price": "13750.135"
    }
  ],
  "status": "ok",
  "ts": 1604299816352
}
```