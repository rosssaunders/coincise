# HTX Public REST API Documentation

## Introduction

### API Documentation Summary

Welcome to the HTX USDT Margined Contracts API! You can use our API to access
all market data, trading, and account management endpoints.

We have code examples in Shell! You can view code examples in the dark area to
the right.

## Swap API Access Guide

### API Rate Limit Illustration

Future, Coin Margined Swap,Option Swap and USDT Margined Contracts are using
separate API rate limits.

Please note that, for both public interface and private interface, there are
rate limits, more details are as below:

- Generally, the private interface rate limit of API key is at most 144 times
  every 3 seconds for each UID (Trade Interface: at most 72 times every 3
  seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
  shared by all the altcoins contracts delivered by different date).
  [API Interface List](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#api-list)
- For public interface used to get information of index, price limit,
  settlement, delivery, open positions and so on, the rate limit is 240 times
  every 3 second at most for each IP (this 240 times every 3 second public
  interface rate limit is shared by all the requests from that IP of
  non-marketing information, like above).
- For public interface to get market data such as Get Kline data, Get Market
  Data Overview, Get Contract Information,Get market in-depth data, Get premium
  index Kline, Get real-time forecast capital rate kline, Get basis data, Get
  the last Trade of a Contract and so on：

  （1）For restful interfaces, products, (future, coin margined swap, usdt
  margined Contracts)800 times/second for one IP at most

  （2）For websocket: The rate limit for “req” request is 50 times at once. No
  limit for “sub” request as the data will be pushed by sever voluntarily.

- WebSocket, the private order push interface, requires API KEY Verification:

  Each UID can build at most create 30 WS connections for private order push at
  the same time. For each account, contracts of the same underlying coin only
  need to subscribe one WS order push, e.g. users only need to create one WS
  order push connection for BTC Contract which will automatically push orders of
  BTC-USDTcontracts. Please note that the rate limit of WS order push and
  RESTFUL private interface are separated from each other, with no relations.

- Both read and trade interfaces will return the ratelimit info.You can refer to
  the following fields of "header" from api response. E.g.,you will get the
  total Read ratelimit("ratelimit-limit") and the remaining Read
  ratelimit("ratelimit-remaining") when you query the order
  info(/linear-swap-api/v1/swap_account_info) , and you will get the total Trade
  ratelimit("ratelimit-limit") and the remaining Trade
  ratelimit("ratelimit-remaining") when you place an
  order(/linear-swap-api/v1/swap_order)).
  [API Interface List](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#api-list)
- Will response following string for "header" via api

  ratelimit-limit: the upper limit of requests per time, unit: times

  ratelimit-interval: reset interval (reset the number of request), unit: ms

  ratelimit-remaining: the left available request number for this round, unit:
  times

  ratelimit-reset: upper limit of reset time used to reset request number, unit:
  ms

  When API Limitation on Order Cancellation Ratio is triggered,the following
  string for "header" via api will also be returned:

  recovery-time: recovery timestamp, whose unit is millisecond, showing the end
  time of prohibition, or the access retrieval timestamp;

  if you are not in the prohibition period, the field is not included in
  returned header;

### Details of Each Error Code

| Error Code | Error Details Description                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403        | invalid ID                                                                                                                                                                                                      |
| 1000       | System error.                                                                                                                                                                                                   |
| 1001       | System is unprepared.                                                                                                                                                                                           |
| 1002       | Query error.                                                                                                                                                                                                    |
| 1003       | Abnormal redis operation.                                                                                                                                                                                       |
| 1004       | System busy. Please try again later.                                                                                                                                                                            |
| 1010       | Account doesn't exist.                                                                                                                                                                                          |
| 1011       | The user's session doesn't exist.                                                                                                                                                                               |
| 1012       | The user's account doesn't exist.                                                                                                                                                                               |
| 1013       | This contract symbol doesn't exist.                                                                                                                                                                             |
| 1014       | This contract doesn't exist.                                                                                                                                                                                    |
| 1015       | The index price does not exist.                                                                                                                                                                                 |
| 1016       | The bid offer does not exist. Please input the price.                                                                                                                                                           |
| 1017       | Order doesn't exist.                                                                                                                                                                                            |
| 1018       | Main account doesn't exist.                                                                                                                                                                                     |
| 1019       | Main account doesn't exist in the sub-account white list.                                                                                                                                                       |
| 1020       | The number of your sub-account exceeds the maximum. Please contact customer service.                                                                                                                            |
| 1021       | Account open failed. Main account hasn’t opened contract trading account yet.                                                                                                                                   |
| 1030       | Input error.                                                                                                                                                                                                    |
| 1031       | Incorrect form source.                                                                                                                                                                                          |
| 1032       | The number of access exceeded the limit.                                                                                                                                                                        |
| 1033       | Incorrect field of contract period.                                                                                                                                                                             |
| 1034       | Incorrect field of order price type.                                                                                                                                                                            |
| 1035       | Incorrect field of form direction.                                                                                                                                                                              |
| 1036       | Incorrect field of open long form.                                                                                                                                                                              |
| 1037       | The leverage is invalid. Please contact the customer service.                                                                                                                                                   |
| 1038       | The order price exceeds the precision limit, please modify and order again.                                                                                                                                     |
| 1039       | Buy price must be lower than {0}{1}. Sell price must exceed {2}{3}.                                                                                                                                             |
| 1040       | Invalid amount, please modify and order again.                                                                                                                                                                  |
| 1041       | The order amount exceeds the limit ({0}Cont), please modify and order again.                                                                                                                                    |
| 1042       | Current positions have triggered position limits ({0}Cont). Please order after changing the amount.                                                                                                             |
| 1043       | Current positions have triggered position limits ({0}Cont). Please order after changing the amount.                                                                                                             |
| 1044       | Current positions have triggered position limits of our platform. Please order after changing the amount.                                                                                                       |
| 1045       | Unable to switch leverage due to open orders.                                                                                                                                                                   |
| 1046       | Abnormal service. Please try again later.                                                                                                                                                                       |
| 1047       | Insufficient margin available.                                                                                                                                                                                  |
| 1048       | Insufficient close amount available.                                                                                                                                                                            |
| 1049       | Open a position with market price is not available.contracts                                                                                                                                                    |
| 1050       | Customer's order number is repeated. Please try again later.                                                                                                                                                    |
| 1051       | No orders to cancel.                                                                                                                                                                                            |
| 1052       | The number exceeds the batch limit.                                                                                                                                                                             |
| 1053       | Unable to get the latest price range.                                                                                                                                                                           |
| 1054       | Unable to get the latest price.                                                                                                                                                                                 |
| 1055       | The price is not reasonable, and the account equity will be less than 0 after placing this order. Please modify the price and place the order.                                                                  |
| 1056       | In settlement. Your order can’t be placed/withdrew currently.                                                                                                                                                   |
| 1057       | Your order can’t be placed due to trading halt.                                                                                                                                                                 |
| 1058       | Your order can’t be placed due to trade suspension.                                                                                                                                                             |
| 1059       | In delivery. Your order can’t be placed/withdrew currently.                                                                                                                                                     |
| 1060       | Your order can’t be placed currently due to abnormal contracts status.                                                                                                                                          |
| 1061       | This order doesn't exist.                                                                                                                                                                                       |
| 1062       | Cancelling. Please be patient.                                                                                                                                                                                  |
| 1063       | The order has been executed.                                                                                                                                                                                    |
| 1064       | The main key of order conflicts.                                                                                                                                                                                |
| 1065       | The form number of client isn't an integer.                                                                                                                                                                     |
| 1066       | {0} cannot be empty.                                                                                                                                                                                            |
| 1067       | Illegal parameter {0}.                                                                                                                                                                                          |
| 1068       | Export error.                                                                                                                                                                                                   |
| 1069       | The price is not reasonable.                                                                                                                                                                                    |
| 1070       | Empty data, cannot be exported.                                                                                                                                                                                 |
| 1071       | Repeated cancellation. Your order has been canceled.                                                                                                                                                            |
| 1072       | Sell price must be lower than {0}{1}.                                                                                                                                                                           |
| 1073       | Position abnormal. Please contact the customer service.                                                                                                                                                         |
| 1074       | Unable to order currently. Please contact the customer service.                                                                                                                                                 |
| 1075       | The price is not reasonable, and the margin rate will be less than 0 after placing this order. Please modify the price and place the order.                                                                     |
| 1076       | No orders, please try again later.                                                                                                                                                                              |
| 1077       | In settlement or delivery. Unable to get assets of current contract.                                                                                                                                            |
| 1078       | In settlement or delivery. Unable to get assets of some contracts.                                                                                                                                              |
| 1079       | In settlement or delivery. Unable to get positions of current contract.                                                                                                                                         |
| 1080       | In settlement or delivery. Unable to get positions of some contracts.                                                                                                                                           |
| 1081       | The number of your {0} contract trigger orders exceeds the limit {1}.                                                                                                                                           |
| 1082       | Trigger type parameter error.                                                                                                                                                                                   |
| 1083       | Your position is in the process of forced liquidation. Unable to place order temporarily.                                                                                                                       |
| 1084       | Your contract API is disabled, please try again after {0} (GMT+8).                                                                                                                                              |
| 1085       | Trigger order failed, please modify the price and place the order again or contact the customer service.                                                                                                        |
| 1086       | {0} contract is restricted of opening positions on {1}. Please contact customer service.                                                                                                                        |
| 1087       | {0} contract is restricted of closing positions on {1}. Please contact customer service.                                                                                                                        |
| 1088       | {0} contract is restricted of withdraw order on {1}. Please contact customer service.                                                                                                                           |
| 1089       | Transfer is temporarily restricted for {0} account, please contact customer service support.                                                                                                                    |
| 1090       | Margin rate is lower than 0. Order can’t be placed.                                                                                                                                                             |
| 1091       | Equity is less than 0. Order can’t be placed.                                                                                                                                                                   |
| 1092       | The Flash Closing Order takes the {0}th price at the order book. After placing an order, the account equity will be less than 0. Please manually enter the price or place an order with the counterparty price. |
| 1093       | The Flash Closing Order takes the {0}th price at the order book. The margin rate will be less than 0 after placing an order. Please manually enter the price or place an order with the counterparty price.     |
| 1094       | The leverage cannot be empty, please switch the leverage or contact customer service                                                                                                                            |
| 1095       | Non-trading state, unable to switch the leverage temporarily                                                                                                                                                    |
| 1097       | adl freeze status prohibits users from placing orders                                                                                                                                                           |
| 1100       | Unable to open a position currently. Please contact the customer service.                                                                                                                                       |
| 1101       | Unable to close a position currently. Please contact the customer service.                                                                                                                                      |
| 1102       | Unable to transfer in currently. Please contact customer service.                                                                                                                                               |
| 1103       | Unable to transfer out currently. Please contact customer service.                                                                                                                                              |
| 1104       | Trading is prohibited due to contracts trading constraints.                                                                                                                                                     |
| 1105       | Only Close is available due to contracts trading constraints.                                                                                                                                                   |
| 1106       | Delivery or settlement in progress, unable to transfer.                                                                                                                                                         |
| 1108       | Abnormal service. Please try again later.                                                                                                                                                                       |
| 1109       | Sub-account doesn't own the permissions to open positions. Please contact customer service.                                                                                                                     |
| 1110       | Sub-account doesn't own the permissions to close positions. Please contact customer service.                                                                                                                    |
| 1111       | Sub-account doesn't own the permissions to transfer in. Please contact customer service.                                                                                                                        |
| 1112       | Sub-account doesn't own the permissions to transfer out. Please contact customer service.                                                                                                                       |
| 1113       | The sub-account does not have transaction permissions. Please login main account to authorize.                                                                                                                  |
| 1114       | The sub-account does not have transfer permissions. Please login main account to authorize.                                                                                                                     |
| 1115       | You have no access permissions of this sub-account.                                                                                                                                                             |
| 1200       | Login error. Please try again.                                                                                                                                                                                  |
| 1220       | You don’t have access permission as you have not opened contracts trading.                                                                                                                                      |
| 1221       | The total balances of Exchange Account can't meet the requirements for opening contracts.                                                                                                                       |
| 1222       | The days of opening account can't meet the requirements for opening contracts.                                                                                                                                  |
| 1223       | The VIP level can't meet the requirements for opening contracts.                                                                                                                                                |
| 1224       | Your country/region can't meet the requirements for opening contracts.                                                                                                                                          |
| 1225       | Failed to open contracts.                                                                                                                                                                                       |
| 1226       | Repeated account.                                                                                                                                                                                               |
| 1227       | HTX Contract does not support sub-accounts. Please log out sub-account and log in again with primary account.                                                                                                   |
| 1228       | You have not activated contract trading currently, please activate first.                                                                                                                                       |
| 1229       | Cannot agree twice.                                                                                                                                                                                             |
| 1230       | You haven't finished the risk verification.                                                                                                                                                                     |
| 1231       | You haven't finished the ID Verification.                                                                                                                                                                       |
| 1232       | The format/size of the image you uploaded does not meet the requirements. Please re-upload.                                                                                                                     |
| 1233       | High leverage is not enabled (Please sign in the APP or web with your main account to agree to the High-Leverage Agreement)                                                                                     |
| 1234       | For {0} contracts, the number of the position-opening orders which are not fully filled cannot exceed {1}.                                                                                                      |
| 1235       | For {0} contracts, the number of the position-closing orders which are not fully filled cannot exceed {1}.                                                                                                      |
| 1250       | Unable to get the HT_token.                                                                                                                                                                                     |
| 1251       | Unable to get BTC assets. Please try again later.                                                                                                                                                               |
| 1252       | Unable to get currency account assets. Please try again later.                                                                                                                                                  |
| 1253       | Error in signature verification.                                                                                                                                                                                |
| 1254       | The sub-account has no permission to open futures, please go to the web side to log in the main account and open.                                                                                               |
| 1300       | Transfer failed.                                                                                                                                                                                                |
| 1301       | Insufficient amount available.                                                                                                                                                                                  |
| 1302       | Transfer failed.                                                                                                                                                                                                |
| 1303       | The single transfer-out amount must be no less than {0}{1}.                                                                                                                                                     |
| 1304       | The single transfer-out amount must be no more than {0}{1}.                                                                                                                                                     |
| 1305       | The single transfer-in amount must be no less than {0}{1}.                                                                                                                                                      |
| 1306       | The single transfer-in amount must be no more than {0}{1}.                                                                                                                                                      |
| 1307       | Your accumulative transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being.                                                                                             |
| 1308       | Your accumulative transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being.                                                                                               |
| 1309       | Your accumulative net transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being.                                                                                         |
| 1310       | Your accumulative net transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being.                                                                                           |
| 1311       | The platform's accumulative transfer-out amount is over the daily maximum. You can't transfer out for the time being.                                                                                           |
| 1312       | The platform's accumulative transfer-in amount is over the daily maximum. You can't transfer in for the time being.                                                                                             |
| 1313       | The platform's accumulative net transfer-out amount is over the daily maximum. You can't transfer out for the time being.                                                                                       |
| 1314       | The platform's accumulative net transfer-in amount is over the daily maximum. You can't transfer in for the time being.                                                                                         |
| 1315       | Wrong transfer type.                                                                                                                                                                                            |
| 1316       | Failed to freeze the transfer.                                                                                                                                                                                  |
| 1317       | Failed to unfreeze the transfer.                                                                                                                                                                                |
| 1318       | Failed to confirm the transfer.                                                                                                                                                                                 |
| 1319       | Failed to acquire the available transfer amount.                                                                                                                                                                |
| 1320       | The contract status is abnormal. Transfer is unavailable temporarily.                                                                                                                                           |
| 1321       | Transfer failed. Please try again later or contact customer service.                                                                                                                                            |
| 1322       | Invalid amount. Must be more than 0.                                                                                                                                                                            |
| 1323       | Abnormal service, transfer failed. Please try again later.                                                                                                                                                      |
| 1325       | Failed to set trading unit                                                                                                                                                                                      |
| 1326       | Failed to obtain trading units                                                                                                                                                                                  |
| 1327       | No transfer permission, transfer failed, please contact customer service                                                                                                                                        |
| 1328       | No transfer permission, transfer failed, please contact customer service                                                                                                                                        |
| 1329       | No transfer permission, transfer failed, please contact customer service                                                                                                                                        |
| 1330       | No transfer permission, transfer failed, please contact customer service                                                                                                                                        |
| 1331       | Exceeds limit of transfer accuracy (8 digits). Please modify it                                                                                                                                                 |
| 1332       | The contract doesn't exist.                                                                                                                                                                                     |
| 1333       | Failed to open the Maker&Taker agreement                                                                                                                                                                        |
| 1334       | Failed to check the Maker&Taker agreement                                                                                                                                                                       |
| 1335       | Failed to check the second confirmation setting of Maker&Taker                                                                                                                                                  |
| 1336       | Failed to update the second confirmation setting of Maker&Taker                                                                                                                                                 |
| 1337       | Failed to check the settings of Maker&Taker                                                                                                                                                                     |
| 1338       | Failed to update the settings of Maker&Taker                                                                                                                                                                    |
| 1339       | Nickname contains illegal words, please modify it                                                                                                                                                               |
| 1340       | Nickname has been used, please modify it                                                                                                                                                                        |
| 1341       | The enrollment has ended                                                                                                                                                                                        |
| 1342       | You cannot set nickname for sub-account                                                                                                                                                                         |
| 1343       | Invalid indicator, please reset                                                                                                                                                                                 |
| 1344       | Sorry, {0} contracts can add market reminders currently at most                                                                                                                                                 |
| 1345       | Sorry, currently {0} can set up to {1} reminders                                                                                                                                                                |
| 1346       | The indicator already exists, please do not set it repeatedly                                                                                                                                                   |
| 1347       | {0} parameter is incorrect, please modify.                                                                                                                                                                      |
| 1348       | This contract does not support cross margin mode.                                                                                                                                                               |
| 1349       | The leverage of the order does not match the leverage of the current position, please switch the leverage first.                                                                                                |
| 1401       | order price shall be lower than the strike price.                                                                                                                                                               |
| 1403       | The number of take-profit and stop-loss orders for {0} contract shall not exceed {1}                                                                                                                            |
| 1404       | Take-profit and stop-loss orders can only be bound with orders for opening a position                                                                                                                           |
| 1405       | The take-profit price shall not be {0}{1}{2}                                                                                                                                                                    |
| 1406       | Your chances of lucky draw have been used up                                                                                                                                                                    |
| 1407       | The stop-loss price shall not be {0}{1}{2}                                                                                                                                                                      |
| 1408       | Unable to cancel because the take-profit and stop-loss order does not take effect.                                                                                                                              |
| 1409       | You have no access to set a take-profit and stop-loss order, please contact our customer service.                                                                                                               |
| 1410       | The number of sub-accounts for batch operation cannot exceed {0}                                                                                                                                                |
| 1411       | Settlement in progress, unable to query order information.                                                                                                                                                      |
| 1412       | {0} does not meet with the price precision limit {1}.                                                                                                                                                           |
| 1413       | You have no access to set a Trailing Stop order, please contact our customer service.                                                                                                                           |
| 1414       | You have not activated the grid trading. Please log in to the Web or APP with your main account, and agree with the protocol to activate the grid trading.                                                      |
| 1415       | Terminate price (Take-profit/Stop-loss price) cannot be within the range of grid price, please modify!                                                                                                          |
| 1416       | Exceeds the maximum running time, which is{0} days and {1} hours, please modify!                                                                                                                                |
| 1417       | Exceeds the range of grid quantity, which is ({0} ~ {1}), please modify!                                                                                                                                        |
| 1418       | At most {0} grids trading orders can be running at the same time, please cancel other grid trading orders first.                                                                                                |
| 1419       | Exceeds the range of initial margin ({0} ~ {1}} {2}).                                                                                                                                                           |
| 1420       | You have no access to grid trading on HTX Futures, please contact our customer service.                                                                                                                         |
| 1421       | There are open orders or positions of the current contract, please cancel these orders or close these positions first.                                                                                          |
| 1422       | The PnL per grid is expected to be less than 0, please modify!                                                                                                                                                  |
| 1423       | The spread between the lowest and the highest grid price is unreasonable, please modify!                                                                                                                        |
| 1424       | This grid trading has been terminated for other reasons. Therefore, it cannot be modified or manually terminated now.                                                                                           |
| 1425       | The callback rate should be {0}{1}, please modify!                                                                                                                                                              |
| 1426       | The activation price should be {0} the latest price.                                                                                                                                                            |
| 1427       | The number of your {0} contract trailing stop order orders exceeds the limit {1}.                                                                                                                               |
| 1428       | The coupon for the same type of contract can only be collected once by each user.                                                                                                                               |
| 1429       | Already received; please do not collect again!                                                                                                                                                                  |
| 1430       | Invalid coupon; please refresh!                                                                                                                                                                                 |
| 1431       | The system is in maintenance and is expected to resume at {0} (GMT+8).                                                                                                                                          |
| 1432       | A grid trading is being initialized or terminated; unable to place an order currently.                                                                                                                          |
| 1433       | The grid trading is terminated caused by placing/canceling order manually; please check “Order History” for details.                                                                                            |
| 1434       | Less than the minimum initial margin ({0}{1}), which causes the quantity per grid less than the minimum order quantity, please modify!                                                                          |
| 1435       | The grid has been terminated by you.                                                                                                                                                                            |
| 1436       | The grid trading exceeds the effective duration; terminated automatically.                                                                                                                                      |
| 1437       | The grid trading has been terminated for system reasons, please contact our customer service.                                                                                                                   |
| 1438       | The grid trading has been terminated due to the termination condition being triggered.                                                                                                                          |
| 1439       | The grid trading has been terminated due to a liquidation being triggered.                                                                                                                                      |
| 1440       | {0} contracts fail to be cancelled.                                                                                                                                                                             |
| 1441       | The trigger price must be lower than the highest termination price and higher than the lowest termination price, please modify!                                                                                 |
| 1442       | The effective duration must be a minute longer than the running time, please modify!                                                                                                                            |
| 1443       | Delivery of {0} contract causes grid trading termination.                                                                                                                                                       |
| 1450       | The risk level you ranked does not support the use of current leverage.                                                                                                                                         |
| 1451       | The risk level you ranked does not support the use of current leverage, please log in the main account for checking.                                                                                            |
| 1452       | The number of grid orders exceeds the order quantity limits; Unable to place any order temporarily.                                                                                                             |
| 1453       | The number of all your trigger orders exceeds the limit set by the platform; Unable to place any orders temporarily.                                                                                            |
| 1454       | The number of all your take profit and stop loss orders exceeds the limit set by the platform; Unable to place any orders temporarily.                                                                          |
| 1455       | The number of all your trailing stop orders exceeds the limit set by the platform; Unable to place any orders temporarily.                                                                                      |
| 1461       | Current positions have triggered position limits ({0}{1}). Please modify.                                                                                                                                       |
| 1462       | Current positions have triggered position limits ({0}{1}). Please modify.                                                                                                                                       |
| 12001      | Invalid submission time.                                                                                                                                                                                        |
| 12002      | Incorrect signature version.                                                                                                                                                                                    |
| 12003      | Incorrect signature method.                                                                                                                                                                                     |
| 12004      | Private key is expired.                                                                                                                                                                                         |
| 12005      | Incorrect IP address.                                                                                                                                                                                           |
| 12006      | The submission time can't be empty.                                                                                                                                                                             |
| 12007      | Incorrect public key.                                                                                                                                                                                           |
| 12008      | Verification failed.                                                                                                                                                                                            |
| 12009      | The user is locked or doesn't exist.                                                                                                                                                                            |

### API Best Practice

#### 1\. Query contract history orders interface: /linear-swap-api/v1/swap_hisorders

- To ensure timelines and to reduce latency, users are highly recommended to get
  contract history orders information faster from server memory using interface
  “query contract order information” (URL: /linear-swap-api/v1/swap_order_info).
- For users who use interface “query contract history orders” (URL:
  /linear-swap-api/v1/swap_hisorders), please enter as many query conditions as
  possible (including contract_code, trade_type（recommended to send “0” to
  query all）, type, status, create_date). Besides, try not to enter a big
  integer in parameter “create_date”. You are kindly suggested to query one-day
  data at a time.

#### 2\. Query contract match results interface: /linear-swap-api/v1/swap_matchresults

- To improve query performance and response speed, please enter as many querying
  conditions as possible (including contract_code, trade_type（recommended to
  send “0” to query all）, create_date). Besides, try not to enter a big integer
  in parameter “create_date”. You are kindly suggested to query one-day data at
  a time.

#### 3\. Query contract financial record interface: /linear-swap-api/v1/swap_financial_record

- To improve query performance and response speed, please enter as many querying
  conditions as possible (including symbol, type(recommended to leave it blank
  to query all), create_date). Besides, try not to enter a big integer in
  parameter “create_date”. You are kindly suggested to query one-day data at a
  time.

#### 4\. Query contract order detail interface: /linear-swap-api/v1/swap_order_detail

- When querying orders without parameter(such as the parameter: created_at), the
  query result data may be delayed. It is recommended to pass the two parameters
  of the interface: created_at (order timestamp) and order_type (order type,
  default 1), the database will be directly queried, and the query results data
  will be more timely.
- Querying condition “created_at” uses 13-bit long type time stamp (including
  milliseconds). Querying performance will be improved when accurate time stamps
  are entered.
- For example: the converted time stamp of "2019/10/18 10:26:22"
  is 1571365582123. The returned ts from interface “contract_order” can be used
  as time stamp to query corresponding order. 0 is not allowed in parameter
  “created_at”.

#### 5\. WebSocket subscription to Market Depth data:

- For acquiring market depth data within 150 steps, you are kindly suggested to
  use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17；
- For acquiring market depth data within 20 steps, you are kindly suggested to
  use step6, step7, step8, step9, step10, step11, step12, step13, step18,
  step19；
- Since the large volume of pushing 150 steps data every 100ms, WebSocket
  disconnection may occur frequently if client’s network bandwidth is
  insufficient or the processing is not in time; therefore, we highly recommend
  users using step6, step7, step8, step9, step10, step11, step12, step13,
  step18, step19 to acquire 20 steps data. For instance, subscribing 20 steps
  data.

`{`

`"sub": "market.BTC-USDT.depth.step6",`

`"id": "id5"`

`}`

- We also suggest that you subscribe incremental market depth data.orderbook
  event will be checked every 30ms. If there is no orderbook event, you will not
  receive any orderbook data.you HAVE TO maintain local orderbook data,such as
  updating your local orderbook bids and asks data.You can subscribe 20 or 150
  unmerged data.

`{`

`"sub": "market.BTC-USDT.depth.size_20.high_freq",`

`"data_type":"incremental",`

`"id": "id1"`

`}`

#### 6\. Place order interface (URL: /linear-swap-api/v1/swap_order) and place a batch of orders interface (URL:/linear-swap-api/v1/swap_batchorder):

- We recommend to fill in the parameter “client_order_id”(should be unique from
  user-side),which can help users to acquire order status and other order
  information according to the parameter “client_order_id" from
- query order information interface (URL: /linear-swap-api/v1/swap_order_info )
  when there is no returned information due to network or other problems.

#### 7\. The best deployment of program server

- It is recommended that place the server in AWS Tokyo C zone and use the
  api.hbdm.vn domain, which can effectively reduce network disconnection and
  network timeout.

## Swap API FAQ

### Settlement

#### Q1: What is the USDT Margined Swap funding rate settlement cycle? Which interface can be used to check the status when the fund rate is settled?

We warmly remind you that HTX USDT Margined Swap is settled every 8 hours, and
the settlement will be at the end of each period. For example, 00:00 - 08:00 is
a period, and its settlement time would be at 08:00; 08:00 - 16:00 is a period,
and its settlement time would be at 16:00; 16:00 - 00:00 (+1 day) is a period,
and its settlement time would be at 00:00. All times mentioned above are
Singapore Standard time (GMT+8).

（1）Orders can't be placed or cancelled during settlement period, error code
"1056" will be returned if users place or cancel orders.

You are recommended to request contract information by this two ways:

- restful, every few seconds during settlement period to access:
  /linear-swap-api/v1/swap_contract_info
- websocket, Subscribe Contract Info (no authentication):
  public.\$symbol.contract_info

It's in settlement time if there is any number of 5, 6, 7, 8 included in the
returned status code of contract_status, while it indicates that settlement
completed and users could place and cancel orders as usual if the returned
status code is 1.

（2）When querying fund or position information during the settlement period,
error codes will be returned. Error code and their meaning are as following:

1.  Error code "1077" indicates that "the fund query of current perpetual swap
    trading pair failed during the settlement";
2.  Error code "1078" indicates that "the fund query of part of perpetual swap
    trading pairs failed during the settlement";
3.  Error code "1079" indicates that "the position query of current perpetual
    swap trading pair failed during the settlement";
4.  Error code "1080" indicates that "the position query of part of perpetual
    swap trading pairs failed during the settlement";

You are recommended to read the status code from the returned message. If the
above four types of status code appear, the returned data is not accurate and
couldn't be used as reference.

#### Q2: How to query the system status of the exchange?

There are two common statuses of the exchange systems: settlement/delivery in
progress; suspended for maintenance; when the system is in these two kinds of
statuses, the system will return the response error code and error information
when calling the related API interfaces.

a. How to judge whether the settlement/delivery has been done?

Users can judge from the value “contract_status” returned by the “Get
Information of an Order” interface (/linear-swap-api/v1/swap_contract_info);

or Subscribe Contract Info (no authentication): public.\$symbol.contract_info

If the return parameter contract_status is 1, it means that the
settlement/delivery has been done and the trading has been resumed now.

b. How to judge whether the system is suspended for maintenance or not?

Users can judge from the value “heartbeat” pushed by the “Queried if system
interface is available” interface (https://api.hbdm.com/heartbeat/)

or the “Subscribe system status updates” interface ("topic:
public.\$service.heartbeat");

If the return parameter heartbeat is 1, it means that the system is available
now and can be connected normally.

### Error Codes

#### Q1: What is the reason for 1030 error code?

If you encounter errors such as
{"status":"error","err_code":1030,"err_msg":"Abnormal service. Please try again
later.","ts":1588093883199},indicating that your input request parameter is not
correct, please print your request body and complete URL parameters, and please
check the corresponding API document interface one by one.The common example is
that the volume must be an integer.

#### Q2: What is the reason for 1048 error code?

If you encounter errors such as {'index': 1, 'err_code': 1048, 'err_msg':
'Insufficient close amount available.'}, indicating that your available position
is not enough.You need to query the api /linear-swap-api/v1/swap_position_info
to get your available position.

1.  Check whether the amount (cont) of position-closing order exceeds the limit?
    (When there is limit order for closing a position, the quantity that
    available to be closed will be occupied; hence we kindly remind you to
    cancel these orders and try again.)
2.  Check whether direction and offset are wrong as follows:

close long: sell to close a long position (direction: sell; offset: close);

close short: buy to close a short position (direction: buy; offset: close);

Only “direction” need to be uploaded when placing a flash close order (close
long: sell; close short: buy).

1.  The pending take-profit and stop-loss (tp/sl) orders and trigger orders will
    not occupy the quantity of the position.

#### Q3: What is the reason for 1032 error code?

1032 means that your request exceeds the ratelimit. The coin margined swap,
future and USDT margined Contracts limit the rate separately. Please check the
ratelimit in the api ratelimit instructions, and you can print the current
ratelimit in the header of the API response to check whether the ratelimit is
exceeded. It is recommended to increase the request interval delay to avoid
exceeding the ratelimit.

## Endpoints

### /linear-swap-api/v1/swap_funding_rate (\[General\] Query funding rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                    | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------ | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive."BTC-USDT" ... |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                                   | Value Range       |
| ----------------- | --------- | -------- | --------------------------------------------- | ----------------- |
| status            | string    | false    | response status                               | "ok" , "error"    |
| ts                | long      | false    | response timestamp.unit:millionSeconds.       |                   |
| DATA_START        |           | false    |                                               |                   |
| symbol            | string    | false    | symbol                                        | "BTC","ETH"...    |
| contract_code     | string    | false    | contract code,eg:"BTC-USDT"                   |                   |
| fee_asset         | string    | false    | fee asset                                     | eg:"BTC","ETH"... |
| funding_time      | string    | false    | current funding time                          |                   |
| funding_rate      | string    | false    | current funding rate（Updated once a minute） |                   |
| estimated_rate    | string    | false    | (Deprecated, default is null)                 |                   |
| next_funding_time | string    | false    | (Deprecated, default is null)                 |                   |
| DATA_END          |           | false    |                                               |                   |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_fund ing_rate?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "funding_rate": "0.000100000000000000",
    "contract_code": "BTC-USDT",
    "symbol": "BTC",
    "fee_asset": "BTC",
    "funding_time": "1603699200000",
    "estimated_rate": "null",
    "next_funding_time": "null"
  },
  "ts": 1603696494714
}
```

### /linear-swap-api/v1/swap_batch_funding_rate (\[General\]Query a Batch of Funding Rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                     | Value Range    | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------- | -------------- | ------------- |
| contract_code | string    | false    | contract code，if not filled in, default as all | "BTC-USDT" ... |               |

#### Response Parameter

| Parameter         | Data Type    | Required | Description                                   | Value Range    |
| ----------------- | ------------ | -------- | --------------------------------------------- | -------------- |
| status            | string       | true     | the result of server handles for the request  | "ok" , "error" |
| ts                | long         | true     | Time of Respond Generation, Unit: Millisecond |                |
| DATA_START        | object array | true     |                                               |                |
| symbol            | string       | true     | symbol                                        |                |
| contract_code     | string       | true     | contract code                                 | "BTC-USDT" ... |
| fee_asset         | string       | true     | fee asset                                     | "USDT...       |
| funding_time      | string       | true     | current funding time(Millisecond)             |                |
| funding_rate      | string       | true     | current funding rate（Updated once a minute） |                |
| estimated_rate    | string       | true     | (Deprecated, default is null)                 |                |
| next_funding_time | string       | true     | (Deprecated, default is null)                 |                |
| DATA_END          |              | false    |                                               |                |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_batch_funding_rate?contract_code=BTC-USDT" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "funding_rate": "-0.007500000000000000",
      "contract_code": "ETC-USDT",
      "symbol": "ETC",
      "fee_asset": "USDT",
      "funding_time": "1613976000000",
      "estimated_rate": "null",
      "next_funding_time": "null"
    },
    {
      "funding_rate": "-0.007500000000000000",
      "contract_code": "ADA-USDT",
      "symbol": "ADA",
      "fee_asset": "USDT",
      "funding_time": "1613976000000",
      "estimated_rate": "null",
      "next_funding_time": "null"
    }
  ],
  "ts": 1614045373795
}
```

### /linear-swap-api/v1/swap_historical_funding_rate (\[General\] Query historical funding rate)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                       | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | --------------------------------- | ------------- |
| contract_code | string    | true     | contract code                       | Case-Insenstive.eg:"BTC-USDT" ... |               |
| page_index    | int       | false    | page index. 1 by default            |                                   |               |
| page_size     | int       | false    | page size.20 by default. 50 at most | \[1-50\]                          |               |

#### Response Parameter

| Parameter         | Data Type | Required | Description                             | Value Range       |
| ----------------- | --------- | -------- | --------------------------------------- | ----------------- |
| status            | string    | false    | response status                         | "ok" , "error"    |
| ts                | long      | false    | response timestamp.unit:millionSeconds. |                   |
| DATA_START        |           | false    |                                         |                   |
| symbol            | string    | false    | symbol                                  | eg:"BTC","ETH"... |
| contract_code     | string    | false    | contract code                           | eg: "BTC-USDT     |
| fee_asset         | string    | false    | fee asset                               | eg:"USDT"         |
| funding_time      | string    | false    | funding time                            |                   |
| funding_rate      | string    | false    | funding rate                            |                   |
| realized_rate     | string    | false    | (Deprecated, default is null)           |                   |
| avg_premium_index | string    | false    | average premium index                   |                   |
| DATA_END          |           | false    |                                         |                   |
| total_page        | int       | false    | total page                              |                   |
| current_page      | int       | false    | current page                            |                   |
| total_size        | int       | false    | total size                              |                   |
| DATA_END          |           | false    |                                         |                   |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_historical_funding_rate?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 14,
    "current_page": 1,
    "total_size": 14,
    "data": [
      {
        "avg_premium_index": "0.000049895833333333",
        "funding_rate": "0.000100000000000000",
        "funding_time": "1603670400000",
        "realized_rate": "null",
        "contract_code": "BTC-USDT",
        "symbol": "BTC",
        "fee_asset": "USDT"
      }
    ]
  },
  "ts": 1603696680599
}
```

### /linear-swap-api/v3/swap_liquidation_orders (\[General\] Query Liquidation Orders(New))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. one of pair and contract_code
must be filled in; and all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                               | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| contract   | string    | true     | contract code                                                                                                                                                                            | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT"                                                                                                |               |
| pair       | string    | false    | pair                                                                                                                                                                                     | BTC-USDT                                                                                                                                                                  |               |
| trade_type | int       | true     | trade type                                                                                                                                                                               | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |               |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                            | Value range \[((end-time) – 2h), (end-time)\], maximum query window size is 2 hours, query window shift should be within past 90 days.                                    |               |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                              | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days.                                          | now           |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev                                                                                                                                                | next          |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with                                                                                                                                             |               |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                                                  | Value Range                                              |
| -------------- | ------------ | -------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| code           | int          | true     | State code                                                                   |                                                          |
| msg            | string       | true     | The code description                                                         |                                                          |
| ts             | long         | true     | Timestamp                                                                    |                                                          |
| DATA_START     | object array | true     |                                                                              |                                                          |
| query_id       | long         | true     | Query id, which can be used as the from_id field for the next query request. |                                                          |
| symbol         | string       | true     | symbol                                                                       |                                                          |
| contract_code  | string       | true     | contract code                                                                | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| created_at     | long         | true     | liquidation time                                                             |                                                          |
| direction      | string       | true     |                                                                              | "buy":buy"sell": sell                                    |
| offset         | string       | true     |                                                                              | "open":open "close": close, "both"                       |
| volume         | decimal      | true     | liquidation volume (cont)                                                    |                                                          |
| amount         | decimal      | true     | liquidation amount (token)                                                   |                                                          |
| price          | decimal      | true     | bankruptcy price                                                             |                                                          |
| trade_turnover | decimal      | true     | liquidation amount (quotation token)                                         |                                                          |
| pair           | string       | true     | pair                                                                         | such as: “BTC-USDT”                                      |
| business_type  | string       | true     | business type                                                                | futures, swap                                            |
| DATA_END       |              | false    |                                                                              |                                                          |

#### Request example

`curl"/linear-swap-api/v3/swap_liquidation_orders?trade_type=5&contract=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 452057,
      "contract_code": "BTC-USDT-211210",
      "symbol": "USDT",
      "direction": "sell",
      "offset": "close",
      "volume": 479,
      "price": 51441.7,
      "created_at": 1638593647864,
      "amount": 0.479,
      "trade_turnover": 24640.5743,
      "business_type": "futures",
      "pair": "BTC-USDT"
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v1/swap_settlement_records (\[General\] Query historical settlement records of the platform interface)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range                                                                                      | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | Contract Code                               | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                              |               |
| start_time    | long      | false    | Start time（timestamp，unit: millisecond）  | Value range: \[(Current time minus 90 days), Current time\] ，default current time minus 90 days |               |
| end_time      | long      | false    | End time（timestamp，unit: millisecond）    | Value range: (start_time, current time)，default current time                                    |               |
| page_index    | int       | false    | Page, default page 1 if not filled          |                                                                                                  |               |
| page_size     | int       | false    | Page items, default 20, shall not exceed 50 |                                                                                                  |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                             | Value Range                                            |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| status         | string    | true     | Request Processing Result                                                               | "ok" , "error"                                         |
| DATA_START     |           | false    |                                                                                         |                                                        |
| symbol         | string    | true     | Variety code                                                                            | "BTC", "ETH" ...                                       |
| volume         | decimal   | true     | Position quantity(volume). Sum of both buy and sell sides                               |                                                        |
| amount         | decimal   | true     | Position quantity(Currency). Sum of both buy and sell sides                             |                                                        |
| contract_code  | string    | true     | Contract Code                                                                           | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| value          | decimal   | true     | Total position volume（The unit is the denominated currency of the contract. e.g:USDT） |                                                        |
| trade_amount   | decimal   | true     | trading volume within the last 24 hours (coin). Sum of both buy and sell sides          |                                                        |
| trade_volume   | decimal   | true     | trading volume within the last 24 hours (cont). Sum of both buy and sell sides          |                                                        |
| trade_turnover | decimal   | true     | trading amount within the last 24 hours. Sum of both buy and sell sides                 |                                                        |
| contract_type  | string    | true     | contract type                                                                           | swap, this_week, next_week, quarter, next_quarter      |
| pair           | string    | true     | pair                                                                                    | such as: “BTC-USDT”                                    |
| business_type  | string    | true     | business type                                                                           | futures, swap                                          |
| DATA_END       |           | false    |                                                                                         |                                                        |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_settlement_records?contract_code=BTC-USDT&start_time=xxxxx&end_time=xxx&page_index=xxx&page_size=100" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 1,
    "current_page": 1,
    "total_size": 12,
    "settlement_record": [
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211203",
        "settlement_time": 1638518400000,
        "clawback_ratio": 0,
        "settlement_price": 56792.3,
        "settlement_type": "delivery",
        "business_type": "futures",
        "pair": "BTC-USDT"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211203",
        "settlement_time": 1638489600000,
        "clawback_ratio": 0,
        "settlement_price": 57028.6,
        "settlement_type": "settlement",
        "business_type": "futures",
        "pair": "BTC-USDT"
      }
    ]
  },
  "ts": 1638756873768
}
```

### /linear-swap-api/v1/swap_elite_account_ratio (\[General\] Query Top Trader Sentiment Index Function-Account)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                          | Default Value |
| ------------- | --------- | -------- | ------------- | ---------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |               |
| period        | string    | true     | period        | 5min, 15min, 30min, 60min,4hour,1day                 |               |
| contract_code | string    | true     | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |               |
| period        | string    | true     | period        | 5min, 15min, 30min, 60min,4hour,1day                 |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                               |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"                                            |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                           |
| DATA_START    |           | false    |                                               |                                                           |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...                                            |
| contract_code | string    | true     | contract code                                 | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                       |
| business_type | string    | true     | business type                                 | futures, swap                                             |
| LIST_START    |           | false    |                                               |                                                           |
| buy_ratio     | decimal   | true     | Net long position ratio                       |                                                           |
| sell_ratio    | decimal   | true     | Net short position ratio                      |                                                           |
| ts            | long      | true     | Time of Respond Generation                    |                                                           |
| LIST_END      |           | false    |                                               |                                                           |
| DATA_END      |           | false    |                                               |                                                           |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"                                            |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                           |
| DATA_START    |           | false    |                                               |                                                           |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...                                            |
| contract_code | string    | true     | contract code                                 | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                       |
| business_type | string    | true     | business type                                 | futures, swap                                             |
| LIST_START    |           | false    |                                               |                                                           |
| buy_ratio     | decimal   | true     | net long accounts ratio                       |                                                           |
| sell_ratio    | decimal   | true     | net short accounts ratio                      |                                                           |
| locked_ratio  | decimal   | true     | locked accounts ratio                         |                                                           |
| ts            | long      | true     | Time of Respond Generation                    |                                                           |
| LIST_END      |           | false    |                                               |                                                           |
| DATA_END      |           | false    |                                               |                                                           |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_elite_account_ratio?contract_code=BTC-USDT&period=5min"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "list": [
      {
        "buy_ratio": 0.5,
        "sell_ratio": 0.5,
        "locked_ratio": 0,
        "ts": 1638115200000
      }
    ],
    "symbol": "BTC",
    "contract_code": "BTC-USDT",
    "business_type": "swap",
    "pair": "BTC-USDT"
  },
  "ts": 1638169688105
}
```

### /linear-swap-api/v1/swap_elite_position_ratio (\[General\] Query Top Trader Sentiment Index Function-Position)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                          | Default Value |
| ------------- | --------- | -------- | ------------- | ---------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |               |
| period        | string    | true     | period        | 5min, 15min, 30min, 60min,4hour,1day                 |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                               |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"                                            |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                           |
| DATA_START    |           | false    |                                               |                                                           |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...                                            |
| contract_code | string    | true     | contract code                                 | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                       |
| business_type | string    | true     | business type                                 | futures, swap                                             |
| LIST_START    |           | false    |                                               |                                                           |
| buy_ratio     | decimal   | true     | Net long position ratio                       |                                                           |
| sell_ratio    | decimal   | true     | Net short position ratio                      |                                                           |
| ts            | long      | true     | Time of Respond Generation                    |                                                           |
| LIST_END      |           | false    |                                               |                                                           |
| DATA_END      |           | false    |                                               |                                                           |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_elite_position_ratio?contract_code=BTC-USDT&period=1day"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "list": [
      {
        "buy_ratio": 0.5,
        "sell_ratio": 0.5,
        "ts": 1638460800000
      }
    ],
    "symbol": "BTC",
    "contract_code": "BTC-USDT-FUTURES",
    "business_type": "futures",
    "pair": "BTC-USDT"
  },
  "ts": 1638756121395
}
```

### /linear-swap-api/v1/swap_api_state (\[Isolated\] Query information on system status)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                     | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------- | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter                     | Data Type    | Required | Description                                                                                                                                         | Value Range           |
| ----------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| status                        | string       | true     | Request processing Result                                                                                                                           | "ok" , "error"        |
| ts                            | long         | true     | Time of Respond Generation, Unit: Millisecond                                                                                                       |                       |
| DATA_START                    | object array | true     |                                                                                                                                                     |                       |
| symbol                        | string       | true     | symbol                                                                                                                                              | "BTC","ETH"...        |
| contract_code                 | string       | true     | Contract Code                                                                                                                                       | "BTC-USDT"...         |
| margin_mode                   | string       | true     | margin mode                                                                                                                                         | isolated : "isolated" |
| margin_account                | string       | true     | margin account                                                                                                                                      | "BTC-USDT"...         |
| open                          | int          | true     | open order access：when “1”, then access available; when “0”, access unavailable"1"                                                                 |                       |
| close                         | int          | true     | close order access：when “1”, then access available; when “0”, access unavailable "1"                                                               |                       |
| cancel                        | int          | true     | order cancellation access：when “1”, then access available; when “0”, access unavailable "1"                                                        |                       |
| transfer_in                   | int          | true     | deposit access：when “1”, then access available; when “0”, access unavailable "1"                                                                   |                       |
| transfer_out                  | int          | true     | withdraw access： when “1”, then access available; when “0”, access unavailable "1"                                                                 |                       |
| master_transfer_sub           | int          | true     | transfer from master to sub account："1" is available，“0” is unavailable                                                                           |                       |
| sub_transfer_master           | int          | true     | transfer from sub to master account："1" is available，“0” is unavailable                                                                           |                       |
| master_transfer_sub_inner_in  | int          | true     | Transfer_in access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"       |                       |
| master_transfer_sub_inner_out | int          | true     | Transfer_out access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable"      |                       |
| sub_transfer_master_inner_in  | int          | true     | Transfer_in access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"       |                       |
| sub_transfer_master_inner_out | int          | true     | Transfer_out access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable"      |                       |
| transfer_inner_in             | int          | true     | Transfer_in access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable"  |                       |
| transfer_inner_out            | int          | true     | Transfer_out access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |                       |
| DATA_END                      |              | false    |                                                                                                                                                     |                       |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_api_state?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "transfer_in": 1,
      "transfer_out": 1,
      "master_transfer_sub": 1,
      "sub_transfer_master": 1,
      "master_transfer_sub_inner_in": 1,
      "master_transfer_sub_inner_out": 1,
      "sub_transfer_master_inner_in": 1,
      "sub_transfer_master_inner_out": 1,
      "transfer_inner_in": 1,
      "transfer_inner_out": 1
    }
  ],
  "ts": 1603696366019
}
```

### /linear-swap-api/v1/swap_cross_ladder_margin (\[Cross\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. When both of pair, contract_type and
contract_code filled in, the contract_code is the preferred. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                    | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in return all contract infomation | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                                           | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                                  | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap                                 | futures, swap, all                                  |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                                                                                    | Value Range                                         |
| -------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| status               | string       | true     | result of server handled request                                                                               | "ok" , "error"                                      |
| DATA_START           | object array | true     |                                                                                                                |                                                     |
| symbol               | string       | true     | symbol                                                                                                         | such as: "BTC"                                      |
| contract_code        | string       | true     | contract code                                                                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode          | string       | true     | margin mode                                                                                                    | cross                                               |
| margin_account       | string       | true     | margin account                                                                                                 | such as:USDT”                                       |
| contract_type        | string       | true     | contract type                                                                                                  | swap, this_week, next_week, quarter, next_quarter   |
| pair                 | string       | true     | pair                                                                                                           | such as: “BTC-USDT”                                 |
| business_type        | string       | true     | business type                                                                                                  | futures, swap                                       |
| LIST_START           | object array | true     |                                                                                                                |                                                     |
| lever_rate           | int          | true     | lever rate                                                                                                     |                                                     |
| LADDERS_START        | object array | true     | ladders for margin                                                                                             |                                                     |
| min_margin_balance   | decimal      | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                                                     |
| max_margin_balance   | decimal      | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                                                     |
| min_margin_available | decimal      | true     | min margin available(in the range of this ladder margin balance)                                               |                                                     |
| max_margin_available | decimal      | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                                                     |
| LADDERS_END          |              | false    |                                                                                                                |                                                     |
| LIST_END             |              | false    |                                                                                                                |                                                     |
| DATA_END             |              | false    |                                                                                                                |                                                     |
| ts                   | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                                                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_ladder_margin?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 2,
          "ladders": [
            {
              "min_margin_balance": 0,
              "max_margin_balance": null,
              "min_margin_available": 0,
              "max_margin_available": null
            }
          ]
        }
      ],
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    }
  ],
  "ts": 1638755685337
}
```

### /linear-swap-api/v1/swap_ladder_margin (\[Isolated\]Query information on Tiered Margin)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                    | Value Range                           | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------- | ------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, if not filled in return all contract infomation | such as: “BTC-USDT”, “ETH-USDT”。。。 |               |

#### Response Parameter

| Parameter            | Data Type    | Required | Description                                                                                                    | Value Range         |
| -------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------- | ------------------- |
| status               | string       | true     | status                                                                                                         | "ok" , "error"      |
| DATA_START           | object array | true     |                                                                                                                |                     |
| symbol               | string       | true     | symbol                                                                                                         | such as: "BTC"      |
| contract_code        | string       | true     | contract code                                                                                                  | such as: "BTC-USDT" |
| margin_mode          | string       | true     | margin mode                                                                                                    | isolated: isolated  |
| margin_account       | string       | true     | margin account                                                                                                 | such as: “BTC-USDT” |
| LIST_START           | object array | true     |                                                                                                                |                     |
| lever_rate           | int          | true     | lever rate                                                                                                     |                     |
| LADDERS_START        | object array | true     | ladders for margin                                                                                             |                     |
| min_margin_balance   | decimal      | true     | min margin balance(the starting point in this ladder, included in this ladder)                                 |                     |
| max_margin_balance   | decimal      | true     | max margin balance(the end point in this ladder, excluded in this ladder, is next ladder's min_margin_balance) |                     |
| min_margin_available | decimal      | true     | min margin available(in the range of this ladder margin balance)                                               |                     |
| max_margin_available | decimal      | true     | max margin available（not in the range of this ladder margin balance, is next ladder's min_margin_available)   |                     |
| LADDERS_END          |              | false    |                                                                                                                |                     |
| LIST_END             |              | false    |                                                                                                                |                     |
| DATA_END             |              | false    |                                                                                                                |                     |
| ts                   | long         | true     | Time of Respond Generation，Unit：Millisecond                                                                  |                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_ladder_margin?contract_code=BTC-USDT" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "BTC-USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "isolated",
      "list": [
        {
          "lever_rate": 20,
          "ladders": [
            {
              "min_margin_balance": 0,
              "max_margin_balance": 250000,
              "min_margin_available": 0,
              "max_margin_available": 250000
            },
            {
              "min_margin_balance": 250000,
              "max_margin_balance": 2500000,
              "min_margin_available": 250000,
              "max_margin_available": 1000000
            },
            {
              "min_margin_balance": 2500000,
              "max_margin_balance": 10000000,
              "min_margin_available": 1000000,
              "max_margin_available": 2500000
            },
            {
              "min_margin_balance": 10000000,
              "max_margin_balance": 85000000,
              "min_margin_available": 2500000,
              "max_margin_available": 10000000
            },
            {
              "min_margin_balance": 85000000,
              "max_margin_balance": null,
              "min_margin_available": 10000000,
              "max_margin_available": null
            }
          ]
        }
      ]
    }
  ],
  "ts": 1612504906880
}
```

### /linear-swap-api/v1/swap_estimated_settlement_price (\[General\]Get the estimated settlement price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                  | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, return all without filling in | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                         | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap               | futures, swap, all                                  |               |

#### Response Parameter

| Parameter                  | Data Type    | Required | Description                                                                                                                                                                                              | Value Range                                         |
| -------------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| status                     | string       | true     | status                                                                                                                                                                                                   |                                                     |
| DATA_START                 | object array | true     |                                                                                                                                                                                                          |                                                     |
| contract_code              | string       | true     | contract code                                                                                                                                                                                            | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| estimated_settlement_price | decimal      | true     | Current-period estimated settlement price /Current-period estimated delivery price (When the settlement type is "delivery", it is estimated delivery price; Otherwise, it is estimated settlement price) |                                                     |
| settlement_type            | string       | true     | settlement type                                                                                                                                                                                          | “delivery”，“settlement”                            |
| contract_type              | string       | true     | contract type                                                                                                                                                                                            | swap, this_week, next_week, quarter, next_quarter   |
| pair                       | string       | true     | pair                                                                                                                                                                                                     | such as: “BTC-USDT”                                 |
| business_type              | string       | true     | business type                                                                                                                                                                                            | futures, swap                                       |
| DATA_END                   |              | false    |                                                                                                                                                                                                          |                                                     |
| ts                         | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                            |                                                     |

Notes:

When the "settlement_type" is "settlement", the "estimated_settlement_price"
will be calculated and updated from 10 minutes before settlement and until the
settlement. In the other moment(including settlement),
"estimated_settlement_price" is empty, but the other fields will be displayed
normally.

When the "settlement_type" is "delivery", the "estimated_settlement_price" will
be calculated and updated from 10 minutes before settlement and until the
delivery. In the other moment(including delivery), "estimated_settlement_price"
is empty, but the other fields will be displayed normally.

Estimated settlement price will be calculated and updated every 6 seconds.

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_estimated_settlement_price?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "contract_code": "BTC-USDT-211210",
      "estimated_settlement_price": null,
      "settlement_type": "settlement",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    },
    {
      "contract_code": "BTC-USDT-211217",
      "estimated_settlement_price": null,
      "settlement_type": "settlement",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "next_week"
    },
    {
      "contract_code": "BTC-USDT-211231",
      "estimated_settlement_price": null,
      "settlement_type": "settlement",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "quarter"
    },
    {
      "contract_code": "BTC-USDT",
      "estimated_settlement_price": null,
      "settlement_type": "settlement",
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    }
  ],
  "ts": 1638755400222
}
```

### /linear-swap-api/v1/swap_adjustfactor (\[Isolated\] Query information on Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                     | Default Value |
| ------------- | --------- | -------- | ------------- | ------------------------------- | ------------- |
| contract_code | string    | false    | contract code | Case-Insenstive.e.g. "BTC-USDT" |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range           |
| ------------- | --------- | -------- | --------------------------------------------- | --------------------- |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"        |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                       |
| DATA_START    |           | false    |                                               |                       |
| symbol        | string    | true     | symbol                                        | "BTC","ETH"...        |
| contract_code | string    | true     | contract code                                 | e.g. "BTC-USDT"       |
| margin_mode   | string    | true     | margin mode                                   | isolated : "isolated" |
| LIST_START    |           | false    |                                               |                       |
| lever_rate    | decimal   | true     | Leverage                                      |                       |
| LADDERS_START |           | false    |                                               |                       |
| min_size      | decimal   | true     | Min net position limit                        |                       |
| max_size      | decimal   | true     | Max net position limit                        |                       |
| ladder        | int       | true     | Tier                                          |                       |
| adjust_factor | decimal   | true     | Adjustment Factor                             |                       |
| LADDERS_END   |           | false    |                                               |                       |
| LIST_END      |           | false    |                                               |                       |
| DATA_END      |           | false    |                                               |                       |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_adjustfactor?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "isolated",
      "list": [
        {
          "lever_rate": 125,
          "ladders": [
            {
              "ladder": 0,
              "min_size": 0,
              "max_size": 8999,
              "adjust_factor": 0.65
            },
            {
              "ladder": 1,
              "min_size": 9000,
              "max_size": 89999,
              "adjust_factor": 0.8
            },
            {
              "ladder": 2,
              "min_size": 90000,
              "max_size": null,
              "adjust_factor": 0.85
            }
          ]
        }
      ]
    }
  ],
  "ts": 1603695606565
}
```

### /linear-swap-api/v1/swap_cross_adjustfactor (\[Cross\] Query Information On Tiered Adjustment Factor)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface only supports cross margin mode. The
request parameter "contract_code" supports the contract code of futures, in that
the format is BTC-USDT-210625. When both of pair, contract_type and
contract_code filled in, the contract_code is the preferred. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                           | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                  | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                  |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                   | Value Range                                         |
| ------------- | ------------ | -------- | --------------------------------------------- | --------------------------------------------------- |
| status        | string       | true     | Request Processing Result                     | "ok" , "error"                                      |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond |                                                     |
| DATA_START    | object array | true     |                                               |                                                     |
| symbol        | string       | true     | symbol                                        | "BTC","ETH"...                                      |
| contract_code | string       | true     | contract code                                 | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin_mode   | string       | true     | margin mode                                   | cross: cross margin mode                            |
| contract_type | string       | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter   |
| pair          | string       | true     | pair                                          | such as: “BTC-USDT”                                 |
| business_type | string       | true     | business type                                 | futures, swap                                       |
| LIST_START    | object array | true     |                                               |                                                     |
| lever_rate    | decimal      | true     | lever rate                                    |                                                     |
| LADDERS_START | object array | true     |                                               |                                                     |
| min_size      | decimal      | true     | min net position limit                        |                                                     |
| max_size      | decimal      | true     | max net position limit                        |                                                     |
| ladder        | int          | true     | tier                                          | from 0                                              |
| adjust_factor | decimal      | true     | adjustment factor                             |                                                     |
| LADDERS_END   |              | false    |                                               |                                                     |
| LIST_END      |              | false    |                                               |                                                     |
| DATA_END      |              | false    |                                               |                                                     |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_adjustfactor?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 1,
          "ladders": [
            {
              "ladder": 0,
              "min_size": 0,
              "max_size": 3999,
              "adjust_factor": 0.005
            },
            {
              "ladder": 1,
              "min_size": 4000,
              "max_size": 39999,
              "adjust_factor": 0.01
            },
            {
              "ladder": 2,
              "min_size": 40000,
              "max_size": 79999,
              "adjust_factor": 0.015
            },
            {
              "ladder": 3,
              "min_size": 80000,
              "max_size": 119999,
              "adjust_factor": 0.02
            },
            {
              "ladder": 4,
              "min_size": 120000,
              "max_size": null,
              "adjust_factor": 0.025
            }
          ]
        }
      ],
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    }
  ],
  "ts": 1638754992327
}
```

### /v1/insurance_fund_info (\[General\]Query risk reserve balance information)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Query the total amount of risk funds for all current
business lines, priced in USDT.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter      | Data Type    | Required | Description            | Value Range |
| -------------- | ------------ | -------- | ---------------------- | ----------- |
| status         | string       | false    |                        |             |
| DATA_START     | object array | true     |                        |             |
| insurance_fund | string       | true     | Insurance Fund Balance |             |
| DATA_END       |              | false    |                        |             |
| ts             | long         | true     |                        |             |

#### Request example

`curl"https://api.hbdm.com/v1/insurance_fund_info"`

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

### /v1/insurance_fund_history (\[General\]Query historical risk reserves)

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Query the data of historical risk funds and display it by
day.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| start_time | long      | false    | Query start time, query by data creation. time,millisecond timestamp.                                                                                                                    |                            |               |
| end_time   | long      | false    | Query end time, query data by creation. timetime,millisecond timestamp.                                                                                                                  |                            |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is prev | now           |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                            |               |
| limit      | int       | false    |                                                                                                                                                                                          | \[1,100\]                  | 10            |

#### Response Parameter

| Parameter      | Data Type    | Required | Description            | Value Range  |
| -------------- | ------------ | -------- | ---------------------- | ------------ |
| status         | string       | false    |                        | ok , "error" |
| DATA_START     | object array | false    |                        |              |
| query_id       | string       | false    | query id               |              |
| date           | string       | false    |                        |              |
| insurance_fund | string       | false    | Insurance Fund Balance |              |
| DATA_END       |              | false    |                        |              |
| ts             | long         | false    |                        |              |

#### Request example

`curl"https://api.hbdm.com?start_time=***&end_time=***&direct=**&from_id=123&limit=10"`

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

### /linear-swap-api/v1/swap_price_limit (\[General\] Query Swap Price Limitation)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-201101; When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                      | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...              |             |               |
| pair          | string    | false    | pair, BTC-USDT                                                   |             |               |
| contract_type | string    | false    | contract type: swap, this_week, next_week, quarter, next_quarter |             |               |
| business_type | string    | false    | business type, default is swap: futures, swap, all               |             |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range                                            |
| ------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------------ |
| status        | string    | true     | Request Processing Result                     | "ok" ,"error"                                          |
| DATA_START    |           | false    |                                               |                                                        |
| symbol        | string    | true     | Variety code                                  | "BTC","ETH" ...                                        |
| high_limit    | decimal   | true     | Highest Buying Price                          |                                                        |
| low_limit     | decimal   | true     | Lowest Selling Price                          |                                                        |
| contract_code | string    | true     | Contract Code                                 | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract_type | string    | true     | contract type                                 | swap, this_week, next_week, quarter, next_quarter      |
| pair          | string    | true     | pair                                          | such as: “BTC-USDT”                                    |
| business_type | string    | true     | business type                                 | futures, swap                                          |
| DATA_START    |           | false    |                                               |                                                        |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                        |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_price_limit?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "high_limit": 49629,
      "low_limit": 47682.8,
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "high_limit": 49645.2,
      "low_limit": 47698.5,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211217",
      "high_limit": 49699.7,
      "low_limit": 47750.8,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "next_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "high_limit": 50135.1,
      "low_limit": 47214.8,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "quarter"
    }
  ],
  "ts": 1638753887869
}
```

### /linear-swap-api/v1/swap_open_interest (\[General\] Get Swap Open Interest Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-201101; When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                      | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...           |             |               |
| pair          | string    | false    | pair, BTC-USDT                                                   |             |               |
| contract_type | string    | false    | contract type: swap, this_week, next_week, quarter, next_quarter |             |               |
| business_type | string    | false    | business type, default is swap: futures, swap, all               |             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                             | Value Range                                            |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| status         | string    | true     | Request Processing Result                                                               | "ok" , "error"                                         |
| DATA_START     |           | false    |                                                                                         |                                                        |
| symbol         | string    | true     | Variety code                                                                            | "BTC", "ETH" ...                                       |
| volume         | decimal   | true     | Position quantity(volume). Sum of both buy and sell sides                               |                                                        |
| amount         | decimal   | true     | Position quantity(Currency). Sum of both buy and sell sides                             |                                                        |
| contract_code  | string    | true     | Contract Code                                                                           | eg swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| value          | decimal   | true     | Total position volume（The unit is the denominated currency of the contract. e.g:USDT） |                                                        |
| trade_amount   | decimal   | true     | trading volume within the last 24 hours (coin). Sum of both buy and sell sides          |                                                        |
| trade_volume   | decimal   | true     | trading volume within the last 24 hours (cont). Sum of both buy and sell sides          |                                                        |
| trade_turnover | decimal   | true     | trading amount within the last 24 hours. Sum of both buy and sell sides                 |                                                        |
| contract_type  | string    | true     | contract type                                                                           | swap, this_week, next_week, quarter, next_quarter      |
| pair           | string    | true     | pair                                                                                    | such as: “BTC-USDT”                                    |
| business_type  | string    | true     | business type                                                                           | futures, swap                                          |
| DATA_END       |           | false    |                                                                                         |                                                        |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond                                           |                                                        |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_open_interest?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "volume": 78696,
      "amount": 78.696,
      "symbol": "BTC",
      "value": 3823138.2456,
      "contract_code": "BTC-USDT",
      "trade_amount": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    },
    {
      "volume": 10925,
      "amount": 10.925,
      "symbol": "BTC",
      "value": 530662.21,
      "contract_code": "BTC-USDT-211217",
      "trade_amount": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "next_week"
    },
    {
      "volume": 27104,
      "amount": 27.104,
      "symbol": "BTC",
      "value": 1316937.2832,
      "contract_code": "BTC-USDT-211210",
      "trade_amount": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    },
    {
      "volume": 201143,
      "amount": 201.143,
      "symbol": "BTC",
      "value": 9775067.0568,
      "contract_code": "BTC-USDT-211231",
      "trade_amount": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "quarter"
    }
  ],
  "ts": 1638754059540
}
```

### /linear-swap-api/v1/swap_contract_info (\[General\] Query Swap Info)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "support_margin_mode" should be "all" when
querying the contract information which supports the cross margin mode and the
isolated margin mode both. The value of "cross" or "isolated" just can query the
contract information which only supports the cross margin mode or the isolated
margin mode. Please keep attention. The request parameter "contract_code"
supports the contract code of futures, in that the format is BTC-USDT-201101;
When both of pair, contract_type and contract_code filled in, the contract_code
is the preferred. business_type is a required parameter when query info of
futures contract, and its value must be futures or all. When support_margin_mode
is isolated，contract_type, business_type should not be futures type. And when
support_margin_mode is cross, the return data is future's data Notes：contract
elements it can display more futures fields, we recommend you to use it.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type | Required | Description                                                          | Value Range | Default Value |
| ------------------- | --------- | -------- | -------------------------------------------------------------------- | ----------- | ------------- |
| contract_code       | string    | false    | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                  |             |               |
| support_margin_mode | string    | false    | support margin mode cross："cross"；isolated："isolated"；all："all" |             |               |
| pair                | string    | false    | BTC-USDT                                                             |             |               |
| contract_type       | string    | false    | swap, this_week, next_week, quarter, next_quarter                    |             |               |
| business_type       | string    | false    | futures, swap, all(default is swap)                                  |             |               |

#### Response Parameter

| Parameter           | Data Type | Required | Description                                                                                                                 | Value Range                                                                                                                     |
| ------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status              | string    | true     | Request Processing Result                                                                                                   | "ok" , "error"                                                                                                                  |
| DATA_START          |           | false    |                                                                                                                             |                                                                                                                                 |
| symbol              | string    | true     | symbol                                                                                                                      | "BTC","ETH"...                                                                                                                  |
| contract_code       | string    | true     | Contract Code                                                                                                               | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...                                                                             |
| contract_size       | decimal   | true     | Contract Value (USDT of one contract)                                                                                       | 10, 100...                                                                                                                      |
| price_tick          | decimal   | true     | Minimum Variation of Contract Price                                                                                         | 0.001, 0.01...                                                                                                                  |
| settlement_date     | string    | true     | Settlement Date                                                                                                             | eg "1490759594752"                                                                                                              |
| create_date         | string    | true     | Listing Date                                                                                                                | eg "20190808"                                                                                                                   |
| delivery_time       | string    | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |                                                                                                                                 |
| contract_status     | int       | true     | Contract Status                                                                                                             | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| support_margin_mode | string    | false    | support margin mode                                                                                                         | cross："cross"；isolated："isolated"；all："all"                                                                                |
| contract_type       | string    | true     | contract type                                                                                                               | swap, this_week, next_week, quarter, next_quarter                                                                               |
| pair                | string    | true     | pair                                                                                                                        | such as: “BTC-USDT”                                                                                                             |
| business_type       | string    | true     | business type                                                                                                               | futures, swap                                                                                                                   |
| delivery_date       | string    | true     | delivery date, empty string when swap                                                                                       | such as: "20180720"                                                                                                             |
| DATA_END            |           | false    |                                                                                                                             |                                                                                                                                 |
| ts                  | long      | true     | Time of Respond Generation，Unit：Millisecond                                                                               |                                                                                                                                 |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_contract_info?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211203",
      "contract_size": 0.001,
      "price_tick": 0.1,
      "delivery_date": "20211203",
      "delivery_time": "1638518400000",
      "create_date": "20211202",
      "contract_status": 1,
      "settlement_date": "1638518400000",
      "support_margin_mode": "cross",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "contract_size": 0.001,
      "price_tick": 0.1,
      "delivery_date": "20211210",
      "delivery_time": "1639123200000",
      "create_date": "20211202",
      "contract_status": 1,
      "settlement_date": "1638518400000",
      "support_margin_mode": "cross",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "next_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "contract_size": 0.001,
      "price_tick": 0.1,
      "delivery_date": "20211231",
      "delivery_time": "1640937600000",
      "create_date": "20211202",
      "contract_status": 1,
      "settlement_date": "1638518400000",
      "support_margin_mode": "cross",
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "quarter"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "contract_size": 0.001,
      "price_tick": 0.1,
      "delivery_date": "",
      "delivery_time": "",
      "create_date": "20211202",
      "contract_status": 1,
      "settlement_date": "1638518400000",
      "support_margin_mode": "all",
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    }
  ],
  "ts": 1638517765776
}
```

### /linear-swap-api/v1/swap_index (\[General\] Query Swap Index Price Information)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                              | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Case-insenstive."BTC-USDT","ETH-USDT"... |             |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                   | Value Range              |
| ------------- | --------- | -------- | --------------------------------------------- | ------------------------ |
| status        | string    | true     | Request Processing Result                     | "ok" , "error"           |
| DATA_START    |           | false    |                                               |                          |
| contract_code | string    | true     | contract code                                 | "BTC-USDT","ETH-USDT"... |
| index_price   | decimal   | true     | Index Price                                   |                          |
| index_ts      | Long      | true     | Index time                                    |                          |
| DATA_END      |           | false    |                                               |                          |
| ts            | long      | true     | Time of Respond Generation，Unit：Millisecond |                          |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_index?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "index_price": 13076.32986568,
      "index_ts": 1603694592011,
      "contract_code": "BTC-USDT"
    }
  ],
  "ts": 1603694596400
}
```

### /linear-swap-api/market/swap_contract_constituents (\[General\] Get index components )

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get the index component information data on the market.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range | Default Value |
| ------------- | --------- | -------- | ------------- | ----------- | ------------- |
| contract_code | string    | true     | contract code | BTC-USDT... |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                     | Value Range  |
| ------------- | ------------ | -------- | ------------------------------------------------------------------------------- | ------------ | --- |
| status        | string       | false    |                                                                                 | ok , "error" |
| DATA_START    | object array | true     |                                                                                 |              |
| contract_code | string       | true     | contract code                                                                   | BTC-USDT...  |
| ts            | long         | true     | Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 |              |
| components    | string       | true     | Components                                                                      |              |
|               | exchange     | string   | true                                                                            |              |     |
|               | symbol       | string   | true                                                                            |              |     |
|               | weights      | string   | true                                                                            |              |     |
|               | symbol_price | string   | true                                                                            |              |     |
| index_price   | string       | true     |                                                                                 |              |
| DATA_END      |              | false    |                                                                                 |              |
| ts            | long         | true     |                                                                                 |              |

Notes: U-standard perpetual contracts and U-standard delivery contracts return
the same index information.

#### Request example

`curl"https://api.hbdm.com?contract_code=XRP-USDT" `

#### Response Example

##### Success Example

```
{
  "data": {
    "components": [
      {
        "exchange": "huobi",
        "symbol": "ETH-USDT",
        "symbol_price": "2379.06",
        "weights": "20.0000"
      },
      {
        "exchange": "okex",
        "symbol": "ETH-USDT",
        "symbol_price": "2378.8",
        "weights": "20.0000"
      },
      {
        "exchange": "binance",
        "symbol": "ETH-USDT",
        "symbol_price": "2378.91000000",
        "weights": "20.0000"
      },
      {
        "exchange": "HitBTC",
        "symbol": "ETH-USDT",
        "symbol_price": "2379.125",
        "weights": "20.0000"
      },
      {
        "exchange": "bybit",
        "symbol": "ETH-USDT",
        "symbol_price": "2378.84",
        "weights": "20.0000"
      }
    ],
    "contract_code": "ETH-USDT",
    "index_price": "2378.947000000000000000",
    "ts": 1725603895074
  },
  "status": "ok",
  "ts": 1725603896779
}
```

### /linear-swap-api/v1/swap_query_elements (\[General\]Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get Contract Elements info

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                        | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | Contract code, if empty, query all | BTC-USDT... |               |

#### Response Parameter

| Parameter                   | Data Type    | Required | Description                                                                                                                               | Value Range                                                                                                                     |
| --------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| status                      | string       | false    |                                                                                                                                           | ok , "error"                                                                                                                    |
| DATA_START                  | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code               | string       | true     | BTC-USDT...                                                                                                                               |                                                                                                                                 |
| mode_type                   | int          | true     | Margin Mode: 1: Isolated margin; 2: Cross margin and isolated margin; 3: Cross margin                                                     |                                                                                                                                 |
| swap_delivery_type          | int          | true     | Type of Futures: 1: USDT-M perpetual futures; 2: USDT-M delivery futures; 3: Both of them                                                 |                                                                                                                                 |
| instrument_index_code       | string       | true     | index                                                                                                                                     |                                                                                                                                 |
| real_time_settlement        | int          | true     | Whether to enable real-time settlement: 0: No; 1: Yes                                                                                     |                                                                                                                                 |
| transfer_profit_ratio       | Number       | true     | Available coefficient of isolated margin                                                                                                  |                                                                                                                                 |
| cross_transfer_profit_ratio | Number       | true     | Available coefficient of cross margin                                                                                                     |                                                                                                                                 |
| instrument_type             | list         | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| trade_partition             | String       | true     | trade partition USDT HUSD                                                                                                                 |                                                                                                                                 |
| min_level                   | int          | true     | min level                                                                                                                                 |                                                                                                                                 |
| max_level                   | int          | true     | max level                                                                                                                                 |                                                                                                                                 |
| settle_period               | int          | true     | settle period                                                                                                                             |                                                                                                                                 |
| funding_rate_cap            | int          | true     | funding rate cap                                                                                                                          |                                                                                                                                 |
| funding_rate_floor          | int          | true     | funding rate floor                                                                                                                        |                                                                                                                                 |
| trigger_protect             | decimal      | false    | Threshold for price Protection                                                                                                            |                                                                                                                                 |
| long_position_limit         |              | false    | long position limit                                                                                                                       |                                                                                                                                 |
| offset_order_limit          |              | false    | offset order limit                                                                                                                        |                                                                                                                                 |
| open_order_limit            |              | false    | open order limit                                                                                                                          |                                                                                                                                 |
| short_position_limit        |              | false    | short position limit                                                                                                                      |                                                                                                                                 |
| CONTRACT_INFOS_START        | object array | true     |                                                                                                                                           |                                                                                                                                 |
| contract_code               | string       | true     | contract code                                                                                                                             |                                                                                                                                 |
| instrument_type             | list         | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| settlement_date             | string       | true     | The next settlement time of the contract                                                                                                  | Timestamps, such as "1490759594752"                                                                                             |
| delivery_time               | string       | true     | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp               |                                                                                                                                 |
| create_date                 | string       | true     | Listing Date                                                                                                                              | eg "20190808"                                                                                                                   |
| contract_status             | int          | true     | Contract Status                                                                                                                           | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery_date               | string       | true     | delivery date, empty string when swap                                                                                                     | such as: "20180720"                                                                                                             |
| CONTRACT_INFOS_START        | object array | true     |                                                                                                                                           |                                                                                                                                 |
| PRICE_TICKS_START           | object array | false    | The Minimum Price Change                                                                                                                  |                                                                                                                                 |
| business_type               | Integer      | true     | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures                                                        |                                                                                                                                 |
| price                       | String       | true     | The Minimum Price Change                                                                                                                  |                                                                                                                                 |
| INSTRUMENT_VALUES_START     |              | true     | contract Face Value                                                                                                                       |                                                                                                                                 |
| business_type               | Integer      | true     | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures                                                        |                                                                                                                                 |
| price                       | String       | true     | contract Face Value                                                                                                                       |                                                                                                                                 |
| ORDER_LIMITS_START          | object array | true     | The maximum quantity of single order (Cont)                                                                                               |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| open_after_closing          | String       | true     | open after closing                                                                                                                        |                                                                                                                                 |
| NORMAL_LIMITS_START         |              | false    | Hard Price Limit                                                                                                                          |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| OPEN_LIMITS_START           | object       | false    | Non-basis Price Limit                                                                                                                     |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| TRADE_LIMITS_START          |              | false    | Basis Price Limit                                                                                                                         |                                                                                                                                 |
| instrument_type             | int          | true     | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |                                                                                                                                 |
| open                        | String       | true     | open                                                                                                                                      |                                                                                                                                 |
| close                       | String       | true     | close                                                                                                                                     |                                                                                                                                 |
| DATA_END                    |              | false    |                                                                                                                                           |                                                                                                                                 |
| ts                          | long         | true     |                                                                                                                                           |                                                                                                                                 |

#### Request example

`curl"https://api.hbdm.com?contract_code=XRP-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "contract_code": "BTC-USDT",
      "funding_rate_cap": "0.003750000000000000",
      "funding_rate_floor": "-0.003750000000000000",
      "mode_type": 2,
      "swap_delivery_type": 3,
      "settle_period": 8,
      "instrument_index_code": "BTC-USDT",
      "price_ticks": [
        {
          "business_type": 1,
          "price": "0.001000000000000000"
        },
        {
          "business_type": 2,
          "price": "0.100000000000000000"
        }
      ],
      "instrument_values": [
        {
          "business_type": 1,
          "price": "0.001000000000000000"
        },
        {
          "business_type": 2,
          "price": "0.001000000000000000"
        }
      ],
      "min_level": "1",
      "max_level": "200",
      "order_limits": [
        {
          "open_after_closing": "99999999.000000000000000000",
          "instrument_type": 0,
          "open": "99999999.000000000000000000",
          "close": "99999999.000000000000000000"
        },
        {
          "open_after_closing": "99999999.000000000000000000",
          "instrument_type": 1,
          "open": "99999999.000000000000000000",
          "close": "99999999.000000000000000000"
        },
        {
          "open_after_closing": "170000.000000000000000000",
          "instrument_type": 2,
          "open": "170000.000000000000000000",
          "close": "170000.000000000000000000"
        }
      ],
      "normal_limits": [
        {
          "instrument_type": 0,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 1,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 2,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        }
      ],
      "open_limits": [
        {
          "instrument_type": 0,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 1,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 2,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        }
      ],
      "trade_limits": [
        {
          "instrument_type": 0,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 1,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        },
        {
          "instrument_type": 2,
          "open": "999999.990000000000000000",
          "close": "999999.990000000000000000"
        }
      ],
      "real_time_settlement": 1,
      "transfer_profit_ratio": 1,
      "cross_transfer_profit_ratio": 1,
      "instrument_type": [
        1,
        2,
        0
      ],
      "price_tick": "0.001000000000000000",
      "instrument_value": "0.001000000000000000",
      "trade_partition": "USDT",
      "open_order_limit": "99999999.000000000000000000",
      "offset_order_limit": "99999999.000000000000000000",
      "long_position_limit": "200000000.000000000000000000",
      "short_position_limit": "200000000.000000000000000000",
      "contract_infos": [
        {
          "contract_code": "BTC-USDT-231222",
          "instrument_type": 1,
          "settlement_date": "1703232000000",
          "delivery_time": "1703232000000",
          "create_date": "20231208",
          "contract_status": 1,
          "delivery_date": "20231222"
        },
        {
          "contract_code": "BTC-USDT-231229",
          "instrument_type": 2,
          "settlement_date": "1703836800000",
          "delivery_time": "1703836800000",
          "create_date": "20230915",
          "contract_status": 1,
          "delivery_date": "20231229"
        },
        {
          "contract_code": "BTC-USDT",
          "instrument_type": 0,
          "settlement_date": "1703232000000",
          "delivery_time": "",
          "create_date": "20230905",
          "contract_status": 1,
          "delivery_date": ""
        }
      ]
    }
  ],
  "ts": 1703217085568
}
```

### https://api.hbdm.com/api/v1/timestamp (\[General\]Get current system timestamp)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

#### Request Address

| Environment | Address                               |
| ----------- | ------------------------------------- |
| Online      | https://api.hbdm.com/api/v1/timestamp |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description               | Value Range |
| --------- | --------- | -------- | ------------------------- | ----------- |
| status    | string    | true     | Request Processing Result |             |
| ts        | long      | true     | current system timestamp  |             |

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

### https://api.hbdm.com/heartbeat/ (\[General\]Query whether the system is available)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

#### Request Address

| Environment | Address                         |
| ----------- | ------------------------------- |
| Online      | https://api.hbdm.com/heartbeat/ |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter                           | Data Type   | Required | Description                                                                              | Value Range |
| ----------------------------------- | ----------- | -------- | ---------------------------------------------------------------------------------------- | ----------- |
| status                              | string      | false    | "ok" or "error"...                                                                       |             |
| DATA_START                          | dict object | false    |                                                                                          |             |
| heartbeat                           | int         | false    | future 1: avaiable 0: not available(maintenance with service suspended)                  |             |
| swap_heartbeat                      | int         | false    | coin margined swap 1: avaiable 0: not available(maintenance with service suspended)      |             |
| estimated_recovery_time             | long        | false    | null: normal. estimated recovery time :millionseconds.                                   |             |
| swap_estimated_recovery_time        | long        | false    | null: normal. coin margined swap estimated recovery time millionseconds.                 |             |
| linear_swap_heartbeat               | long        | false    | USDT margined Contracts 1: avaiable 0: not available(maintenance with service suspended) |             |
| linear_swap_estimated_recovery_time | long        | false    | null: normal. USDT margined Contracts estimated recovery time millionseconds.            |             |
| DATA_END                            |             | false    |                                                                                          |             |

Notes:

Heartbeat is 1 is available, 0 is not available.

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

### https://api.hbdm.com/heartbeat (\[General\]Maintenance with service suspended)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: During the maintenance of the business system, in
addition to the below two interfaces(Get system status, Query whether the system
is available) for users to query the system status, all “rest” interfaces of the
API business will return this in a fixed manner:{"status": "maintain"}. During
maintenance with service suspended，all websocket notify interfaces except
subscribing system status updates（Subscribe system status updates）can't
work，and will push 1006 error code to clients.Response{ "status":
"maintain"}Query whether the system is available:
https://api.hbdm.com/heartbeat/for getting the infomation that system
maintenance with service suspended, could by subscrib system status updates
websocket interface.

#### Request Address

| Environment | Address |
| ----------- | ------- |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "status": "maintain"
}
```

### /linear-swap-ex/market/depth (\[General\] Get Market Depth)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                                             | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | true     | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ                                                                                                                                                                                                                                                                               |             |               |
| type          | string    | true     | Get depth data within step 150, use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17（merged depth data 0-5,14-17）；when step is 0，depth data will not be merged; Get depth data within step 20, use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19(merged depth data 7-13,18-19); when step is 6, depth data will not be merged. |             |               |

Notes:

step16, step17, step18, and step19 are only for SHIB-USDT contract, and the
other contracts is not supported now.

#### Response Parameter

| Parameter    | Data Type    | Required | Description                                                                      | Value Range    |
| ------------ | ------------ | -------- | -------------------------------------------------------------------------------- | -------------- |
| ch           | string       | true     | Data belonged channel，Format： market.period                                    |                |
| status       | string       | true     | Request Processing Result                                                        |                |
| ts           | long         | true     | Time of Respond Generation，Unit：Millisecond                                    | "ok" , "error" |
| TICK>\_START | object array | false    |                                                                                  |                |
| mrid         | long         | true     | Order ID                                                                         |                |
| id           | long         | true     | tick ID                                                                          |                |
| asks         | object       | false    | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence |                |
| bids         | object       | false    | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence   |                |
| ts           | long         | true     | Time of Respond Generation, Unit: Millisecond                                    |                |
| version      | long         | true     | version ID                                                                       |                |
| ch           | string       | true     | Data channel, Format： market.period                                             |                |
| TICK>\_END   |              | false    |                                                                                  |                |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/depth?contract_code=BTC-USDT&type=step0"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT-CQ.depth.step6",
  "status": "ok",
  "tick": {
    "asks": [
      [
        48611.5,
        741
      ],
      [
        48635.2,
        792
      ]
    ],
    "bids": [
      [
        48596.4,
        90
      ],
      [
        48585.7,
        180
      ]
    ],
    "ch": "market.BTC-USDT-CQ.depth.step6",
    "id": 1638754215,
    "mrid": 1250406,
    "ts": 1638754215640,
    "version": 1638754215
  },
  "ts": 1638754216092
}
```

### /linear-swap-ex/market/bbo (\[General\]Get Market BBO Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: he interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                                                                        |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                     | Value Range                                                                                               |
| ------------- | ------------ | -------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status        | string       | true     | the result of server handling to request                        | "ok" , "error"                                                                                            |
| TICKS_START   | object array | true     |                                                                 |                                                                                                           |
| contract_code | string       | true     | contract code or contract type                                  | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business_type | string       | true     | business type                                                   | futures, swap                                                                                             |
| mrid          | long         | true     | Match ID, unique identification                                 |                                                                                                           |
| ask           | array        | false    | \[Ask 1 price, Ask 1 qty (cont)\]                               |                                                                                                           |
| bid           | array        | false    | \[Bid 1 price, Bid 1 qty (cont)\]                               |                                                                                                           |
| ts            | long         | true     | The system detects the orderbook time point, unit: milliseconds |                                                                                                           |
| TICKS_END     |              | false    |                                                                 |                                                                                                           |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond                   |                                                                                                           |

#### Request example

`curl"https://api.hbdm.com/linear-swap-ex/market/bbo?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ticks": [
    {
      "business_type": "futures",
      "contract_code": "BTC-USDT-CW",
      "ask": [
        48637.3,
        746
      ],
      "bid": [
        48482.5,
        385
      ],
      "mrid": 1251224,
      "ts": 1638754357868
    },
    {
      "business_type": "futures",
      "contract_code": "BTC-USDT-NW",
      "ask": [
        48620.1,
        1000
      ],
      "bid": [
        48461,
        524
      ],
      "mrid": 1251162,
      "ts": 1638754344746
    },
    {
      "business_type": "futures",
      "contract_code": "BTC-USDT-CQ",
      "ask": [
        48630.9,
        868
      ],
      "bid": [
        48577.1,
        63
      ],
      "mrid": 1251236,
      "ts": 1638754359301
    },
    {
      "business_type": "swap",
      "contract_code": "BTC-USDT",
      "ask": [
        48511.6,
        91
      ],
      "bid": [
        48508.9,
        95
      ],
      "mrid": 334931,
      "ts": 1638754361719
    }
  ],
  "ts": 1638754363648
}
```

### /linear-swap-ex/market/history/kline (\[General\] Get KLine Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| period        | string    | true     | KLine Type                     | 1min, 5min, 15min, 30min, 60min, 1hour,4hour,1day, 1mon                                                   |               |
| size          | int       | false    | Acquisition Quantity           | \[1,2000\]                                                                                                | 150           |
| from          | long      | false    | start timestamp seconds.       |                                                                                                           |               |
| to            | long      | false    | end timestamp seconds          |                                                                                                           |               |

Notes:

Either size field or from and to fields need to be filled.

If size field and from/to fields are not filled, It will return error messages.

If from field is filled, to field need to filled too.

The api can mostly return the klines of last two years.

If from to size are all filled,'from' and 'to' will be ignored.

#### Response Parameter

| Parameter      | Data Type  | Required | Description                                                                                                                                        | Value Range |
| -------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| ch             | string     | true     | Data belonged channel，Format： market.period                                                                                                      |             |
| status         | string     | true     | Request Processing Result                                                                                                                          |             |
| ts             | long       | true     | Time of Respond Generation, Unit: Millisecond                                                                                                      |             |
| DATA_START     | kline data | false    |                                                                                                                                                    |             |
| id             | long       | true     | kline id,the same as kline timestamp, kline start timestamp                                                                                        |             |
| vol            | decimal    | true     | Trade Volume(Cont.) . Sum of both buy and sell sides                                                                                               |             |
| count          | decimal    | true     | Order Quantity. Sum of both buy and sell sides                                                                                                     |             |
| open           | decimal    | true     | Open Price                                                                                                                                         |             |
| close          | decimal    | true     | Clos Price, the price in the last kline is the latest order price                                                                                  |             |
| low            | decimal    | true     | Low Price                                                                                                                                          |             |
| high           | decimal    | true     | High Price                                                                                                                                         |             |
| amount         | decimal    | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price). Sum of both buy and sell sides |             |
| trade_turnover | decimal    | true     | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price). Sum of both buy and sell sides                |             |
| DATA_END       |            | false    |                                                                                                                                                    |             |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/history/kline?contract_code=BTC-USDT&period=1day&from=1587052800&to=1591286400"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.kline.1min",
  "data": [
    {
      "amount": 0.004,
      "close": 13076.8,
      "count": 1,
      "high": 13076.8,
      "id": 1603695060,
      "low": 13076.8,
      "open": 13076.8,
      "trade_turnover": 52.3072,
      "vol": 4
    }
  ],
  "status": "ok",
  "ts": 1603695099234
}
```

### /index/market/history/linear_swap_mark_price_kline (\[General\]Get Kline Data of Mark Price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| period        | string    | true     | period                         | 1min, 5min, 15min, 30min, 60min,4hour,1day, 1week,1mon                                                    |               |
| size          | int       | true     | size                           | \[1,2000\]                                                                                                |               |

Notes:

At one time 2000 at most

The input parameters are not case sensitive and all support

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                   | Value Range |
| -------------- | ------------ | -------- | --------------------------------------------- | ----------- |
| ch             | string       | true     | channel, format: market.period                |             |
| DATA_START     | object array | true     |                                               |             |
| id             | long         | true     | id                                            |             |
| vol            | string       | true     | trade vol(cont), value is 0                   |             |
| count          | string       | true     | trade count, value is 0                       |             |
| open           | string       | true     | open price                                    |             |
| close          | string       | true     | close price                                   |             |
| low            | string       | true     | low price                                     |             |
| high           | string       | true     | high price                                    |             |
| amount         | string       | true     | trade amount, value is 0                      |             |
| trade_turnover | string       | true     | trade turnover, value is 0                    |             |
| DATA_END       |              | false    |                                               |             |
| ts             | long         | true     | Time of Respond Generation, Unit: Millisecond |             |

#### Request example

`curl"https://api.hbdm.com/index/market/history/linear_swap_mark_price_kline?contract_code=BTC-USDT&period=5&size=100" `

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.mark_price.5min",
  "data": [
    {
      "amount": "0",
      "close": "31078.68",
      "count": "0",
      "high": "31078.68",
      "id": 1611105300,
      "low": "31078.68",
      "open": "31078.68",
      "trade_turnover": "0",
      "vol": "0"
    },
    {
      "amount": "0",
      "close": "31078.68",
      "count": "0",
      "high": "31078.68",
      "id": 1611105600,
      "low": "31078.68",
      "open": "31078.68",
      "trade_turnover": "0",
      "vol": "0"
    }
  ],
  "status": "ok",
  "ts": 1611106791703
}
```

### /linear-swap-ex/market/detail/merged (\[General\] Get Market Data Overview)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-220325" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                                                                                                                | Value Range    |
| -------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| ch             | string    | true     | Data belonged channel，format： market.\$contract_code.detail.merged                                                                                                       |                |
| status         | string    | true     | Request Processing Result                                                                                                                                                  | "ok" , "error" |
| ts             | long      | true     | Time of Respond Generation, Unit: Millisecond                                                                                                                              |                |
| TICK_START     | object    | true     | kline data (Start at 00:00(UTC+8) of the day)                                                                                                                              |                |
| id             | long      | true     | kline id,the same as kline timestamp                                                                                                                                       |                |
| vol            | string    | true     | Trade Volume(Cont.), from nowtime - 24 hours. Sum of both buy and sell sides                                                                                               |                |
| count          | decimal   | true     | Order Quantity, from nowtime - 24 hours. Sum of both buy and sell sides                                                                                                    |                |
| open           | string    | true     | Opening Price                                                                                                                                                              |                |
| close          | string    | true     | Closing Price, the price in the last kline is the latest order price                                                                                                       |                |
| low            | string    | true     | Low                                                                                                                                                                        |                |
| high           | string    | true     | High                                                                                                                                                                       |                |
| amount         | string    | true     | Trade Amount(Coin), trade amount(coin)=sum(order quantity of a single order \* face value of the coin/order price),from nowtime - 24 hours. Sum of both buy and sell sides |                |
| ask            | object    | true     | Sell,\[price(Ask price), vol(Ask orders (cont.) )\], price in ascending sequence                                                                                           |                |
| bid            | object    | true     | Buy,\[price(Bid price), vol(Bid orders(Cont.))\], Price in descending sequence                                                                                             |                |
| trade_turnover | string    | true     | Transaction amount, that is, sum (transaction quantity \* contract face value \* transaction price),from nowtime - 24 hours. Sum of both buy and sell sides                |                |
| ts             | long      | true     | Timestamp                                                                                                                                                                  |                |
| TICK_END       |           | false    |                                                                                                                                                                            |                |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/detail/merged?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.detail.merged",
  "status": "ok",
  "tick": {
    "amount": "12.526",
    "ask": [
      13084.2,
      131
    ],
    "bid": [
      13082.9,
      38
    ],
    "close": "13076.8",
    "count": 2920,
    "high": "13205.3",
    "id": 1603695162,
    "low": "12877.5",
    "open": "12916.2",
    "trade_turnover": "163247.3982",
    "ts": 1603695162580,
    "vol": "12526"
  },
  "ts": 1603695162580
}
```

### /v2/linear-swap-ex/market/detail/batch_merged (\[General\]Get a Batch of Market Data Overview(V2))

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The interface data updated frequency is 50ms The request parameter
"contract_code" supports the contract code of futures, in that the format is
BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW,
BTC-USDT-CQ, BTC-USDT-NQ. business_type is a required parameter when query info
of futures contract, and its value must be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                    | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| business_type | string    | false    | business type, default is swap | futures, swap, all                                                                                        |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                 | Value Range                                                                                               |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status        | string       | true     | status                                                                      | "ok" , "error"                                                                                            |
| TICKS_START   | object array | true     |                                                                             |                                                                                                           |
| contract_code | string       | true     | contract code or contract type                                              | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business_type | string       | true     | business type                                                               | futures, swap                                                                                             |
| id            | long         | true     | id                                                                          |                                                                                                           |
| amount        | string       | true     | Trade Amount(Coin) ,from nowtime - 24 hours. Sum of both buy and sell sides |                                                                                                           |
| ask           | array        | true     | \[ask one price, ask one vol(cont)\]                                        |                                                                                                           |
| bid           | array        | true     | \[bid one price, bid one vol(cont)\]                                        |                                                                                                           |
| open          | string       | true     | open price                                                                  |                                                                                                           |
| close         | string       | true     | close price                                                                 |                                                                                                           |
| count         | decimal      | true     | Order Quantity, from nowtime - 24 hours. Sum of both buy and sell sides     |                                                                                                           |
| high          | string       | true     | high price                                                                  |                                                                                                           |
| low           | string       | true     | low price                                                                   |                                                                                                           |
| vol           | string       | true     | Transaction amount, from nowtime - 24 hours. Sum of both buy and sell sides |                                                                                                           |
| number_of     | string       | true     | number of(cont), from nowtime - 24 hours. Sum of both buy and sell sides    |                                                                                                           |
| ts            | long         | true     | timestamp                                                                   |                                                                                                           |
| TICKS_END     |              | false    |                                                                             |                                                                                                           |
| ts            | long         | true     | Time of Respond Generation, Unit: Millisecond                               |                                                                                                           |

#### Request example

`curl"https://api.hbdm.com/v2/linear-swap-ex/market/detail/batch_merged?contract_code=BTC-USDT&business_type=swap" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ticks": [
    {
      "id": 1650792083,
      "ts": 1650792083179,
      "ask": [
        39736.6,
        1285
      ],
      "bid": [
        39736.5,
        6070
      ],
      "business_type": "swap",
      "contract_code": "BTC-USDT",
      "open": "39760",
      "close": "39736.6",
      "low": "39316.3",
      "high": "39971.2",
      "amount": "6891.566",
      "count": 48262,
      "vol": "273472535.834",
      "number_of": "6891566"
    }
  ],
  "ts": 1650792083179
}
```

### /linear-swap-ex/market/trade (\[General\] Query The Last Trade of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ. business_type is a
required parameter when query info of futures contract, and its value must be
futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                               | Value Range | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| contract_code | string    | false    | contract code or contract type, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |             |               |
| business_type | string    | false    | business type, default is swap: futures, swap, all                                                                                        |             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                     | Value Range                                                                                               |
| -------------- | --------- | -------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ch             | string    | true     | Data belonged channel，Format： market.\$contract_code.trade.detail             |                                                                                                           |
| status         | string    | true     |                                                                                 | "ok","error"                                                                                              |
| ts             | long      | true     | Sending time                                                                    |                                                                                                           |
| TICK_START     |           | false    |                                                                                 |                                                                                                           |
| id             | long      | true     | Unique Order Id(symbol level).                                                  |                                                                                                           |
| ts             | long      | true     | Latest Creation Time                                                            |                                                                                                           |
| DATA_START     |           | false    |                                                                                 |                                                                                                           |
| id             | long      | true     | Unique Transaction Id(symbol level)                                             |                                                                                                           |
| price          | string    | true     | Price                                                                           |                                                                                                           |
| amount         | string    | true     | Quantity(Cont.). Sum of both buy and sell sides                                 |                                                                                                           |
| direction      | string    | true     | The direction to buy or sell is the direction of the taker (active transaction) |                                                                                                           |
| ts             | long      | true     | Order Creation Time                                                             |                                                                                                           |
| quantity       | string    | true     | trading quantity(coin)                                                          |                                                                                                           |
| contract_code  | string    | true     | Contract Code or Contract type                                                  | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |
| business_type  | string    | true     | business type                                                                   | futures, swap                                                                                             |
| trade_turnover | string    | true     | trade turnover(quoted currency)                                                 |                                                                                                           |
| DATA_END       |           | false    |                                                                                 |                                                                                                           |
| TICK_END       |           | false    |                                                                                 |                                                                                                           |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/trade?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "ch": "market.*.trade.detail",
  "status": "ok",
  "tick": {
    "data": [
      {
        "amount": "6",
        "ts": 1603695230083,
        "id": 1314755250000,
        "price": "13083",
        "direction": "buy",
        "quantity": 0.006,
        "contract_code": "BTC-USDT",
        "business_type": "swap",
        "trade_turnover": 78.498
      }
    ],
    "id": 1603695235127,
    "ts": 1603695235127
  },
  "ts": 1603695235127
}
```

### /linear-swap-ex/market/history/trade (\[General\] Query a Batch of Trade Records of a Contract)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                           | Value Range                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code or contract type        | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |               |
| size          | int       | true     | Number of Trading Records Acquisition | \[1, 2000\]                                                                                               |               |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                                                                     | Value Range   |
| -------------- | ------------ | -------- | ------------------------------------------------------------------------------- | ------------- |
| ch             | string       | true     | Data belonged channel，Format： market.\$contract_code.trade.detail             |               |
| DATA_START     | object array | true     |                                                                                 |               |
| DATA_START     | object array | true     |                                                                                 |               |
| amount         | decimal      | true     | Quantity(Cont.). Sum of both buy and sell sides                                 |               |
| direction      | string       | true     | The direction to buy or sell is the direction of the taker (active transaction) |               |
| id             | long         | true     | Unique Transaction Id(symbol level)                                             |               |
| price          | decimal      | true     | Price                                                                           |               |
| ts             | long         | true     | Order Creation Time                                                             |               |
| quantity       | decimal      | true     | trading quantity(coin)                                                          |               |
| trade_turnover | decimal      | true     | trade turnover(quoted currency)                                                 |               |
| DATA_END       |              | false    |                                                                                 |               |
| id             | long         | true     | Unique Order Id(symbol level).                                                  |               |
| ts             | long         | true     | Latest transaction time                                                         |               |
| DATA_END       |              | false    |                                                                                 |               |
| status         | string       | true     |                                                                                 | "ok"，"error" |
| ts             | long         | true     | Time of Respond Generation, Unit: Millisecond                                   |               |

#### Request example

`curl "https://api.hbdm.com/linear-swap-ex/market/history/trade?contract_code=BTC-USDT&size=100"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.trade.detail",
  "data": [
    {
      "data": [
        {
          "amount": 2,
          "direction": "buy",
          "id": 1314767870000,
          "price": 13081.3,
          "ts": 1603695383124,
          "quantity": 0.002,
          "trade_turnover": 26.1626
        }
      ],
      "id": 131476787,
      "ts": 1603695383124
    }
  ],
  "status": "ok",
  "ts": 1603695388965
}
```

### /linear-swap-api/v1/swap_his_open_interest (\[General\] Query information on open interest)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. one of (pair+contract_type) and
contract_code must be filled in(if all of them not filled in, will get 1014
error code); and all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                      | Default Value |
| ------------- | --------- | -------- | ------------------ | ---------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract_code      | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...              |               |
| pair          | string    | false    | pair               | BTC-USDT                                                         |               |
| contract_type | string    | false    | contract type      | swap, this_week, next_week, quarter, next_quarter                |               |
| period        | string    | true     | Period Type        | 1 hour:"60min"，4 hours:"4hour"，12 hours:"12hour"，1 day:"1day" |               |
| size          | int       | false    | Request Amount     | Default：48，Data Range \[1,200\]                                |               |
| amount_type   | int       | true     | Open interest unit | 1:-cont，2:-cryptocurrenty                                       |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                                                                  | Value Range                                              |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                                                                    | "ok" , "error"                                           |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond                                                |                                                          |
| DATA_START    |           | false    | Dictionary Data                                                                              |                                                          |
| symbol        | string    | true     | symbol                                                                                       | "BTC","ETH"...                                           |
| contract_code | string    | true     | contract code                                                                                | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract_type | string    | true     | contract type                                                                                | swap, this_week, next_week, quarter, next_quarter        |
| pair          | string    | true     | pair                                                                                         | such as: “BTC-USDT”                                      |
| business_type | string    | true     | business type                                                                                | futures, swap                                            |
| TICK_START    |           | false    |                                                                                              |                                                          |
| volume        | decimal   | true     | Open Interest.                                                                               |                                                          |
| amount_type   | int       | true     | Open Interest Unit                                                                           | 1:-cont，2:- cryptocurrency                              |
| value         | decimal   | true     | Total position volume (the unit shall be the denominated currency of the contract, eg, USDT) |                                                          |
| ts            | long      | true     | Recording Time                                                                               |                                                          |
| TICK_END      |           | false    |                                                                                              |                                                          |
| DATA_END      |           | false    |                                                                                              |                                                          |

Notes:

tick field：Tick data is arranged in reverse chronological order；

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_his_open_interest?contract_code=BTC-USDT&period=60min&amount_type=1"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "tick": [
      {
        "volume": 27112,
        "amount_type": 1,
        "ts": 1638720000000,
        "value": 1321498.5264
      }
    ],
    "contract_code": "BTC-USDT-211210",
    "business_type": "futures",
    "pair": "BTC-USDT",
    "contract_type": "this_week"
  },
  "ts": 1638755582116
}
```

### /index/market/history/linear_swap_premium_index_kline (\[General\] Query Premium Index Kline Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                            | Default Value |
| ------------- | --------- | -------- | ------------- | -------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT","ETH-USDT". |               |
| period        | string    | true     | kline period  | 1min,5min, 15min, 30min, 60min,4hour,1day,1week,1mon                                   |               |
| size          | int       | true     | kline size    | \[1,2000\]                                                                             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                          | Value Range        |
| -------------- | --------- | -------- | -------------------------------------------------------------------- | ------------------ |
| ch             | string    | true     | data channel                                                         | eg： market.period |
| DATA_START     |           | false    | object                                                               |                    |
| id             | long      | true     | index kline id,the same as kline timestamp, kline start timestamp    |                    |
| vol            | string    | true     | Trade Volume(Cont.) The value is 0                                   |                    |
| count          | string    | true     | Order Quantity The value is 0                                        |                    |
| open           | string    | true     | Opening Price                                                        |                    |
| close          | string    | true     | Closing Price, the price in the last kline is the latest order price |                    |
| low            | string    | true     | Lowest Price                                                         |                    |
| high           | string    | true     | Highest Price                                                        |                    |
| amount         | string    | true     | Trade Amount(Coin), The value is 0. )                                |                    |
| trade_turnover | string    | true     | Transaction amount, the value is 0.                                  |                    |
| DATA_END       |           | false    |                                                                      |                    |
| status         | string    | true     | process status                                                       | "ok" , "error"     |
| ts             | long      | true     | timestamp of the response of the server, unit：millionseconds        |                    |

#### Request example

`curl "https://api.hbdm.com/index/market/history/linear_swap_premium_index_kline?contract_code=BTC-USDT&period=1min&size=1"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.premium_index.1min",
  "data": [
    {
      "amount": "0",
      "close": "0.0000079166666666",
      "count": "0",
      "high": "0.0000079166666666",
      "id": 1603696920,
      "low": "0.0000079166666666",
      "open": "0.0000079166666666",
      "trade_turnover": "0",
      "vol": "0"
    }
  ],
  "status": "ok",
  "ts": 1603696958348
}
```

### /index/market/history/linear_swap_estimated_rate_kline (\[General\] Query Estimated Funding Rate Kline Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range                                                                            | Default Value |
| ------------- | --------- | -------- | ------------- | -------------------------------------------------------------------------------------- | ------------- |
| contract_code | string    | true     | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT","ETH-USDT". |               |
| period        | string    | true     | kline period  | 1min,5min, 15min, 30min, 60min,4hour,1day,1week,1mon                                   |               |
| size          | int       | true     | kline size    | \[1,2000\]                                                                             |               |

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                          | Value Range          |
| -------------- | --------- | -------- | -------------------------------------------------------------------- | -------------------- |
| ch             | string    | true     | data channel                                                         | eg： market.period   |
| DATA_START     |           | false    | object                                                               |                      |
| id             | long      | true     | kline ID                                                             |                      |
| vol            | string    | true     | Trade Volume(Cont.) The value is 0                                   |                      |
| count          | string    | true     | Order Quantity The value is 0                                        |                      |
| open           | string    | true     | Opening Price                                                        |                      |
| close          | string    | true     | Closing Price, the price in the last kline is the latest order price |                      |
| low            | string    | true     | Lowest Price                                                         |                      |
| high           | string    | true     | Highest Price                                                        |                      |
| amount         | string    | true     | Trade Amount(Coin), The value is 0. )                                |                      |
| trade_turnover | string    | true     | Transaction amount, the value is 0.                                  |                      |
| DATA_END       |           | false    |                                                                      |                      |
| status         | string    | true     | process status                                                       | "ok" , "error"       |
| ts             | long      | true     | timestamp of the response of the server                              | unit：millionseconds |

#### Request example

`curl "https://api.hbdm.com/index/market/history/linear_swap_estimated_rate_kline?contract_code=BTC-USDT&period=1min&size=1"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.estimated_rate.1min",
  "data": [
    {
      "amount": "0",
      "close": "0.0001",
      "count": "0",
      "high": "0.0001",
      "id": 1603697100,
      "low": "0.0001",
      "open": "0.0001",
      "trade_turnover": "0",
      "vol": "0"
    }
  ],
  "status": "ok",
  "ts": 1603697104902
}
```

### /index/market/history/linear_swap_basis (\[General\] Query Basis Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625; and supports contract type:
BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                      | Value Range                                                                                                                      | Default Value            |
| ---------------- | --------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| contract_code    | string    | true     | contract code or contract type                   | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ                        |                          |
| period           | string    | true     | kline period                                     | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon                                                                                   |                          |
| basis_price_type | string    | false    | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |
| size             | int       | true     | data size                                        | \[1,2000\]                                                                                                                       | 150                      |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                        | Value Range    |
| -------------- | ------------ | -------- | ---------------------------------- | -------------- |
| ch             | string       | true     | data channel，eg： market.basis    |                |
| DATA_START     | object array | false    |                                    |                |
| id             | long         | true     | unique id                          |                |
| contract_price | string       | true     | contract last price                |                |
| index_price    | string       | true     | index price                        |                |
| basis          | string       | true     | basis=contract_price - index_price |                |
| basis_rate     | string       | true     | basis_rate=basis/index_price       |                |
| DATA_END       |              | false    |                                    |                |
| status         | string       | true     | status                             | "ok" , "error" |
| ts             | long         | true     | created time                       |                |

#### Request example

`curl "https://api.hbdm.com/index/market/history/linear_swap_basis?contract_code=BTC-USDT&period=1min&size=1"`

#### Response Example

##### Success Example

```
{
  "ch": "market.BTC-USDT.basis.1min.open",
  "data": [
    {
      "basis": "15.29074235666667",
      "basis_rate": "0.001170582317307796",
      "contract_price": "13077.8",
      "id": 1603697160,
      "index_price": "13062.509257643333"
    }
  ],
  "status": "ok",
  "ts": 1603697170804
}
```
