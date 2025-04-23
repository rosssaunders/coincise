# HTX Private WebSocket API Documentation

## Introduction

### API Documentation Summary

Welcome to the HTX USDT Margined Contracts API! You can use our API to access all market data, trading, and account management endpoints.

We have code examples in Shell! You can view code examples in the dark area to the right.

### Matching Mechanism

1.  Matching System: Order accepted by the Order System will enter the Matching System. Once orders are matched/filled, the settlement service will be executed and the matching result will be returned to the Order System; otherwise, the unfilled orders will go into the order book for matching.
    
2.  Price Priority: Higher-priced buy orders have priority over lower-priced buy orders; the reverse is true, lower-priced sell orders have priority over higher-priced sell orders.
    
3.  Time Priority: Buy orders at the same price are executed according to the time of entry to the Server.
    
4.  When the highest bid price is the same as the lowest ask price of the order book, this price is what we call transaction price.
    
5.  When the bid price is higher than the lowest ask price of the order book up to the minute, the lowest ask price will be the transaction price.
    
6.  When the ask price is lower than the highest bid price of the order book up to the minute, the highest bid price will be the transaction price.

## Swap API FAQ

### Order and Trade

#### Q1: What's the reason for 1004 error code?

We notice that the system is sometimes overloaded when the market suddenly turns to be highly volatile. If the system is busy recently or the following prompts appear:

{“status”: “error”, “err\_code”: 1004, “err\_msg”: “System busy. Please try again later.”, “ts”:}

please be patient, and do not place or cancel order repeatedly during the process to avoid repeated orders and additional pressure on system performance. In the meanwhile, it is recommended to place and cancel orders through Web and APP.

#### Q2: The same order ID and match ID can have multiple trades. for example: if a user take a large amount of maker orders, there will be multiple corresponding trades . How to identify these different trades ?

The field ID returned by the information interface /linear-swap-api/v1/swap\_order\_detail is a globally unique transaction identifier. if a maker order is matched multiple times, a trade will be pushed once there is a transaction matched.

#### Q3: What is the delay for the round trip of HTX USDT Margined swap?

At present,it normally takes about 30-50ms from placing the order to getting the status of the order.

#### Q4: Why does the API return connection reset or Max retris or Timeout error?

Most of the network connectivity problems ,(such as Connection reset or network timeout ) are caused by network instability , you can use the server in AWS Tokyo C area with api.hbdm.vn , which can effectively reduce network timeout errors.

#### Q5: How to check the order status without order\_id not returned?

If the order\_id couldn't be returned due to network problems, you can query the status of the order by adding the custom order number(client\_order\_id ).

#### Q6: What to do if it's diconnected after the websocket subscription of account, order and positions for a while?

When subscribing private accounts, orders and positions, the heartbeat should also be maintained regularly ,which is different from the market heartbeat format . Please refer to the "websocket Heartbeat and Authentication Interface" . if it is disconnected ,please try to reconnect.

#### Q7: What is the difference between order status 1 and 2 ? what is the status 3 ?

Status 1 is the preparation for submission. status 2 is the sequential submission of internal process, which can be considered that it has been accepted by the system. Status 3 indicated that the order has been already submitted to market.

#### Q8: Is there an interface to get the total assets in BTC of my account ?

No.

#### Q9: Why is the order filled after the order is withdrawed successfully by placing API cancellation ?

The success return of order cancellation or placement only represents that the command is excuted successfully and doesn't mean that the order has been cancelled . You can check the order status through the interface /linear-swap-api/v1/swap\_order\_info.

#### Q10: Does the order status of 10 mean the order is failed?

Query the order status by /linear-swap-api/v1/swap\_order\_info.If the status is 10,the order is failed。

#### Q11: How long does it generally take for an API from withdrawing to cancelling successfully ?

The order cancellation command generally takes several tens of ms. The actual status of order cancellation can be obtained by invoking an interface: /linear-swap-api/v1/swap\_order\_info

#### Q12: How to get historical liquidation orders?

To obtain historical liquidation orders, you can access the one of two api interfaces: Get History Orders (/linear-swap-api/v1/swap\_hisorders【Isolated】or /linear-swap-api/v1/swap\_cross\_hisorders【Cross】), Get History Match Results (/linear-swap-api/v1/swap\_matchresults【Isolated】or /linear-swap-api/v1/swap\_cross\_matchresults【Cross】) with the return field order\_source (order source) to judge. When order\_source returns "risk", it means that this order is a liquidated order.

#### Q13: Does Huob Futures support holding bi-directional position?

Yes, HTX Futures supports long and short positions being held at the same time.

#### Q14: How to ensure the order to be rapidly filled?

At present, HTX Futures does not support market price when placing an order. To increase the probability of a transaction, users can choose to place an order based on BBO price (opponent), optimal 5 (optimal\_5), optimal 10 (optimal\_10), optimal 20 (optimal\_20), among which the success probability of optimal 20 is the largest, while the slippage always is the largest as well.

It is important to note that the above methods will not guarantee the order to be filled in 100%. The system will obtain the optimal N price at that moment and place the order.

#### Q15: How can API procedure be connected to the exchange more rapidly?

It’s recommended to use a AWS Tokyo c-zone server and the domain name “api.hbdm.vn” to connect to the system.

#### Q16: It occurs an “abnormal service” error when transferring assets between spots and derivatives.

a. Check whether the request address is the address of HTX: api.huobi.pro?

b. Check whether the precision of the coin does not exceed 8 decimal places?

#### Q17: How to confirm whether the position is opened or closed successfully?

Placing an order successfully through “Place an Order” interface (/linear-swap-api/v1/swap\_order) or “Place a batch of orders” interface (/linear-swap-api/v1/swap\_batchorder) just means the server has received your order placing instructions rather than you have opened/closed a position successfully.

You can check the order status by filling the returned “order\_id” in the “Get Information of an Order” interface (/linear-swap-api/v1/swap\_order\_info) or the “Order Details Acquisition” interface (/linear-swap-api/v1/swap\_order\_detail); If the order has been filled, the “status” value in the return parameter will turn out 6 (wholly filled)

It is important to note:

a. For “Get Information of an order” interface (/linear-swap-api/v1/swap\_order\_info), after the settlement or delivery, the system will delete all the orders in ended status (5: partially filled orders have been cancelled; 6: wholly filled; 7: cancelled);

b. There is a delay in “Order Details Acquisition” interface (/linear-swap-api/v1/swap\_order\_detail), so it is better to fill in “created\_at” (order timestamp) and “order\_type” (order type, fill in 1 by default). In this way, it will directly query the database, so the query results will be more timely.

#### Q18: Why are orders canceled by the system automatically?

The order\_price\_type which can be chosen are IOC, FOK and Maker (Post Only). When the order book cannot meet with the corresponding conditions, the system will cancel the orders automatically:

Post\_only: If the order placed is filled with an existing order on the order book immediately, the order will be cancelled to ensure the user is always a maker.

IOC order: If the order cannot be filled immediately, the unfilled part will be cancelled at once;

FOK order: If the order cannot be filled in its entirety, it will be wholly cancelled. No partial fulfillments are allowed.

#### Q19: How to query the maximum amount (cont) available to open by using users’ current assets?

At present, we do not have an interface by which users can directly query the maximum amount (cont) available to open by using users’ the current asset.

#### Q20: Are the “order\_id” and “order\_id\_str” the same?

The “order\_id\_str” is the string format of “order\_id”, whose values are the same.

For the “order\_id” with 18 bits, the “JSON.parse” in “nodejs” and “javascript” will be “int” by default, and mistakes will occur when analyzing. Thus, we advise using “order\_id\_str”.

#### Q21: How to get the active buying/selling quantity in transaction data?

Users can get the data via “Query The Last Trade of a Contract” (/linear-swap-ex/market/trade) interface or by subscribing "sub": "market.\$contract\_code.trade.detail", thereinto

Amount refers to the trading volume (cont), which is the sum of the buying/selling volume;

Direction refers to the active trading direction.

#### Q22: The interval between “from” and “to” is “2000\*period” when acquiring KLine data, then why the data obtained is \[\]?

When acquiring the Kline data, the two time points “from” and “to” are contained, therefore it includes 2001 pieces of data. However, this exceeds the maximum limit 2000. Therefore, the system will return \[\].

Besides, the returned data will be \[\] as well if the interval between “from” and “to” exceeds 2 years.

#### Q23: How to get the latest price?

There are two methods to get the latest price:

a. Invoking the “Get KLine Data(/linear-swap-ex/market/history/kline)” interface and filling in any “period”, the “close” of the last data in return data will be the latest price;

b. Invoking the “Query The Last Trade of a Contract(/linear-swap-ex/market/trade)” interface, the returned “price” will be the latest price.

#### Q24: How to get the latest index price?

There are two methods to get the latest index price:

a. Calling the “Get Contract Index Price Information” interface (/linear-swap-api/v1/swap\_index), the returned “index\_price” will be the latest index price.

b. Calling the “Subscribe Index Kline Data” websocket (market.\$contract\_code.index.\$period), the “close” of the last Kline data in returned data will be the latest index price.

#### Q25: Will API upgrade affect the operation of the program?

In general, API upgrade will partly influence the ws disconnection. To avoid this, you can set up a ws-reconnect mechanism in advance; Please subscribe to the upgrade announcements for more details:

Coin-margined futures: https://status-dm.huobigroup.com/

Coin-margined swaps: https://status-swap.huobigroup.com/

USDT-margined Contracts: https://status-linear-swap.huobigroup.com/

#### Q26: What does mean the “margin\_balance” in “Query User’s Account Information” interface (api/v1/contract\_account\_info)?

”margin\_balance” refers to the account equity

1.  margin\_balance = margin\_static + profit\_unreal
    
2.  margin\_balance = Account balance + profit\_real + profit\_unreal
    

Note: Account balance = margin\_static - profit\_real, there is only margin\_static in the return data of api interface

Each of the two calculation methods above can get the margin\_balance

#### Q27: Is the “risk\_rate” (margin rate) in “Query User’s Account Information” interface (/linear-swap-api/v1/swap\_account\_info) the same as the margin rate on WEB?

Yes, it is

When the “risk\_rate” is less than or equal to 0, the position will be liquidated.

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

### Authentication

Clients can create Access Key and Secret Key on HTX which Access Key is the API access key kept by the client. The Secret Key is used to sign the request (available only for request). To apply/change API key, please go to “Account-API Management” on HTX USDT Margined Contracts. Make name for the API Key and click “create” to finish. It’s optional to bind IP address to the API Key.

For the Trade WebSocket interface, server have to do authentication for topics require authentication before making connection.

Note: These two keys are closely related to account security and should not be disclosed to others at any time.

#### Authentication Format Example:

`{`

`"op": "auth",`

`"type": "api",`

`"AccessKeyId": "e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx",`

`"SignatureMethod": "HmacSHA256",`

`"SignatureVersion": "2",`

`"Timestamp": "2017-05-11T15:19:30",`

`"Signature": "4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=",`

`}`

#### Illustration on Authentication Format Data

| Field | type | Description |
| --- | --- | --- |
| op | string | required； Operator type， Requested authentication operator type is auth |
| type | string | required； Signature method sign via API means API interface signature, sign via ticket means terminal signature |
| cid | string | Optional； Client requests the unique ID |
| AccessKeyId | string | required if users use API signature； API Access key is the API AccessKey you applied. |
| SignatureMethod | string | required if users use API signature； Signature method, user computes signature basing on the protocol of hash ,the API uses HmacSHA256 |
| SignatureVersion | string | required if the users use API signature； the signature protocol version, the API uses 2 |
| Timestamp | string | required if users use API signature； timestamp, the time you request(UTC timezone) this value can help to avoid request data interception by the third party for example ：2017-05-11T16:22:06 (UTC time zone) |
| Signature | string | required if the users use API signature； signature, the value computed is ensure valid authentication without being tampered |
| ticket | string | required if users use ticket signature ； return when logged in |

#### Notice：

-   To decrease API access rate, the WebSocket server uses the same signature algorithm with that on REST API
    
-   All data is case sensitive;
    
-   When type is api, In API authentication, parameter op, type, cid, Signature do not participate in operation.
    
-   The request method in signature's method is GET, the other parameter please refer to REST api document
    

#### Signature Illustration：

Example on Signature Computing Process:，

-   Request code requirement for signature computing. Because it can return to total different data with different content when using HMAC for signature computing; Before signature computing, clients need to sign by following the standard format.
    
-   Request Method (GET or POST), add newline character `\n` after URL
    

`GET\n`

-   add visit address with lowercase letters, add newline characters `\n` after URL

`api.hbdm.com\n`

-   Access path, adding newline character `\n` after URL

`/linear-swap-notification\n`

-   Sequence the parameter name according to ASCII code (use UTF-8 and transfer into URI encoding, capital letters for hexadecimal characters. E.G.: ‘:’ will be encoded into '%3A', blank will be encoded into '%20'). Here is an encoding example below for request parameters

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

-   Connect all parameters with ’&’ according to the sequence above.
    
-   The final strings for signature computing created by following the steps as below:
    

Signature Computing, transmit the two parameters below into cryptographic hash: strings needed to be computed, API SecretKey. Get the signature computing result and get it encoded with Base 64 code standard.

Add computed value into the Signature parameter in API request. Please note the computed value SHOULD NOT be encoded into URL cdoe.

#### Authentication Response Format Illustration

| Field | type | description |
| --- | --- | --- |
| op | string | required； Operator type， Authentication response type is auth |
| type | string | required； Return data according to the requested parameters |
| cid | string | optional； Return data when “cid” string requested |
| err-code | int | 0 means successfully response, others means response failure return 0 if success , For detailed Response code（Err-Code）, please refer to appendix |
| err-msg | string | optional， response detailed error code when error occurs |
| ts | long | server responds timestamp |
| user-id | string | client ID |

#### 

Example of A Success Authentication Response

{ "op": "auth", "type":"api", "ts": 1489474081631, "err-code": 0, "data": { "user-id": "12345678" } }

#### 

Example of Authentication Response with Error

{ "op": "auth", "type":"api", "ts": 1489474081631, "err-code": xxxx， "err-msg" : "Error details " }

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

## USDT-M Futures

### Error Code

| Error Code | Error Description |
| --- | --- |
| 1000 | System error. |
| 1001 | The system is not ready. |
| 1002 | Inquiry error. Please try again later. |
| 1003 | Redis error. |
| 1004 | System busy. Please try again later. |
| 1005 | Query timeout, please try again. |
| 1010 | Account doesn't exist. |
| 1011 | The user's session doesn't exist. |
| 1012 | The user's account doesn't exist. |
| 1013 | This contract symbol doesn't exist. |
| 1014 | This contract doesn't exist. |
| 1015 | The index price does not exist. |
| 1016 | The bid/ask price does not exist. Please input the price. |
| 1017 | Order doesn't exist. |
| 1018 | Main account doesn't exist. |
| 1019 | Your main account is not whitelisted for opening subaccounts. |
| 1020 | The number of your subaccounts has exceeded the limit. Please contact customer service. |
| 1021 | Failed to open an account. Your main account has not been activated for futures trading. Please activate before trading. |
| 1029 | {0} |
| 1030 | Input error. |
| 1031 | Illegal request. |
| 1032 | Maximum number of access attempts exceeded. |
| 1033 | Contract expiration value error. |
| 1034 | Order quotation type value error. |
| 1035 | Order side value error. |
| 1036 | Order open/close value error. |
| 1037 | The leverage is invalid. Please contact the customer service. |
| 1038 | The price has exceeded the precision limit. Please modify and place order again. |
| 1039 | Buy price must be lower than {0}{1}. Sell price must be higher than {2}{3}. |
| 1040 | The amount cannot be left empty or smaller than the value of one contract. Please modify and place order again. |
| 1041 | The amount has exceeded the limit ({0} Cont), please modify and place order again. |
| 1042 | The total positions (this order + open orders + positions) have exceeded the long-position limit ({0}{1}). Please modify. |
| 1043 | The total positions (this order + open orders + positions) have exceeded the short-position limit ({0}{1}). Please modify. |
| 1044 | The position limit has been triggered. Please modify. |
| 1045 | Unable to change leverage due to open orders. |
| 1046 | The position for this contract does not exist. |
| 1047 | Insufficient margin available. |
| 1048 | Insufficient open positions to be closed. Please check whether there are open orders under "Limit Orders". |
| 1049 | Market price is not supported at the moment for opening a position. |
| 1050 | Duplicate order number |
| 1051 | No cancellable orders. |
| 1052 | The number of batch canceling/placing has exceeded the limit. |
| 1053 | Unable to access the latest price range. |
| 1054 | Unable to access the latest price. |
| 1055 | Invalid price as it would cause the account equity to be less than zero. Please modify the price and place the order again. |
| 1056 | Settling. Unable to place/cancel orders currently. |
| 1057 | Orders cannot be placed during a trading halt. |
| 1058 | Orders cannot be placed while the target token is suspended for trading. |
| 1059 | Delivering contracts. Unable to place/cancel orders currently. |
| 1060 | Orders cannot be placed as the futures contracts are not in trading hours. |
| 1061 | The order does not exist. |
| 1062 | Canceling. Thank you for your patience. |
| 1063 | The order has been executed. |
| 1064 | The main key of order conflicts. |
| 1065 | Customer order numbers should be integers. |
| 1066 | {0} cannot be empty. |
| 1067 | Illegal parameter {0}. |
| 1068 | Export error |
| 1069 | Invalid price |
| 1070 | Exporting failed as the data is null. |
| 1071 | Repeated cancellation. Your order has been canceled. |
| 1072 | Sell price must be lower than {0}{1}. |
| 1073 | Position abnormal. Please contact the customer service. |
| 1074 | Order placement error. Please contact customer service. |
| 1075 | Invalid price as it would cause the margin rate to be less than zero. Please modify the price and place the order again. |
| 1076 | No data in the order book. Please try again later. |
| 1077 | Delivering and settling contracts. Unable to access the current contract. |
| 1078 | Delivering and settling contracts. Unable to access some contracts. |
| 1079 | Delivering and settling contracts. Unable to access the position of the current contract. |
| 1080 | Delivering and settling contracts. Unable to access the positions of some contracts. |
| 1081 | The number of your trigger orders for {0} Perpetual Futures shall not exceed {1}. |
| 1082 | Trigger type parameter error |
| 1083 | Your position has been taken over for liquidation. Unable to place orders now. |
| 1084 | Your contract API is disabled, please try again after {0} (GMT+8). |
| 1085 | Failed to place the trigger order. Please modify the price and place the order again, or contact customer service. |
| 1086 | {0} contracts do not support opening positions on {1} at the moment. Please contact customer service. |
| 1087 | {0} contracts do not support closing positions on {1} at the moment. Please contact customer service. |
| 1088 | {0} contracts do not support cancellation on {1} at the moment. Please contact customer service. |
| 1089 | Transfer service is temporarily suspended for {0} account. Please contact customer service. |
| 1090 | Cannot place this order as the margin ratio is \\u2265 100%. |
| 1091 | Cannot place this order as the account equity is less than 0. |
| 1092 | The bid/ask {0} price is adopted for Flash Close. The account equity would be less than zero if this order was placed. Please manually input a valid price or place an order with the BBO price. |
| 10921 | The account equity would be less than zero if this order was placed. Please enter a new price or place the order at BBO price. |
| 1093 | The bid/ask {0} price is adopted for Flash Close. The margin rate would be less than zero if this order was placed. Please manually input a valid price or place an order with the BBO price. |
| 10931 | The margin rate will decline to below 0 if this order is placed. Please enter a new price or place order at BBO price. |
| 1094 | Leverage cannot be empty. Please choose leverage or contact customer service. |
| 1095 | Cannot change leverage as the futures contracts are not in trading hours. |
| 1096 | When the balance of the trial bonus accounts for the net available amount of {0}, the trial bonus is only used for open positions |
| 1097 | adl freeze status prohibits users from placing orders |
| 1098 | adl frozen status prohibits transfer |
| 1099 | Transfer is temporarily restricted for {0} account, please contact customer service support. |
| 1100 | You have no permission to open positions. Please contact customer service. |
| 1101 | You have no permission to close positions. Please contact customer service. |
| 1102 | You have no permission to transfer in. Please contact customer service. |
| 1103 | You have no permission to transfer out. Please contact customer service. |
| 1104 | The current trading is not permitted due to futures trading restrictions. |
| 1105 | You can only close this position due to futures trading restrictions. |
| 1106 | You can only close this position due to futures trading restrictions. |
| 1108 | Dubbo call error |
| 1109 | Subaccounts have no permission to open positions. Please contact customer service. |
| 1110 | Subaccounts have no permission to close positions. Please contact customer service. |
| 1111 | Subaccounts have no permission to transfer in. Please contact customer service. |
| 1112 | Subaccounts have no permission to transfer out. Please contact customer service. |
| 1113 | Subaccounts have no permission to trade. Please log in to your main account to authorize permissions. |
| 1114 | Subaccounts have no permission to transfer. Please log in to your main account to authorize permissions. |
| 1115 | You have no permission to access this subaccount. |
| 1200 | Failed to log in. Please try again. |
| 1205 | You have no access permissions. |
| 1206 | To protect you from high risk exposure, high leverage is not supported. For any questions, please contact customer service. |
| 1220 | You have no access since you have not activated futures trading yet. |
| 1221 | Unable to activate futures trading due to insufficient balance in your spot account. |
| 1222 | Unable to activate futures trading as the required duration hasn't been met since your account was activated. |
| 1223 | The VIP level can't meet the requirements for opening contracts. |
| 1224 | Your country/region can't meet the requirements for opening contracts. |
| 1225 | Failed to open contracts. |
| 1226 | Repeated account. |
| 1227 | HTX Futures are not supported in subaccounts. Please log in to your main account. |
| 1228 | You have not activated futures trading yet. Please activate it first. |
| 1229 | You've already consented to the Agreement. |
| 1230 | You haven't finished the risk verification. |
| 1231 | You haven't finished the ID Verification. |
| 1232 | The format/size of the image you uploaded does not meet the requirements. Please re-upload. |
| 1233 | High leverage is not enabled (Please agree to the High-Leverage Agreement with your main account on our website or app.) |
| 1234 | The unfilled orders of opening positions for {0} contracts cannot exceed {1}. |
| 1235 | The unfilled orders of closing position for {0} contracts cannot exceed {1}. |
| 1250 | Cannot access HT.n |
| 1251 | Unable to get BTC assets. Please try again later. |
| 1252 | Unable to query spot account balance. Please try again later. |
| 1253 | Signature verification error |
| 1254 | Futures trading cannot be activated for subaccounts. Please log in to your main account on our website to activate. |
| 1300 | Transfer failed. |
| 1301 | Insufficient transferable amount |
| 1302 | Failed to transfer due to system error. |
| 1303 | Each outward transfer cannot be less than {0}{1}. |
| 1304 | Each outward transfer cannot exceed {0}{1}. |
| 1305 | Each inward transfer cannot be less than {0}{1}. |
| 1306 | Each inward transfer cannot exceed {0}{1}. |
| 1307 | Your daily cumulative outward transfer amount has exceeded {0}{1}. Unable to make the transfer. |
| 1308 | Your daily cumulative inward transfer amount has exceeded {0}{1}. Unable to make the transfer. |
| 1309 | Your daily cumulative net outward transfer amount has exceeded {0}{1}. Unable to make the transfer. |
| 1310 | Your daily cumulative net inward transfer amount has exceeded {0}{1}. Unable to make the transfer. |
| 1311 | The daily upper limit for outward transfer has been reached. Unable to make the transfer. |
| 1312 | The daily upper limit for inward transfer has been reached. Unable to make the transfer. |
| 1313 | The daily upper limit for net outward transfer has been reached. Unable to make the transfer. |
| 1314 | The daily upper limit for net inward transfer has been reached. Unable to make the transfer. |
| 1315 | Wrong transfer type. |
| 1316 | Failed to freeze the transfer. |
| 1317 | Failed to unfreeze the transfer. |
| 1318 | Failed to confirm the transfer. |
| 1319 | Failed to query the transferable amount. |
| 1320 | Cannot make transfers as the futures contracts are not in trading hours. |
| 1321 | Transfer failed. Please try again later or contact customer service. |
| 1322 | Invalid amount. Must be more than 0. |
| 1323 | Transfer failed due to service error. Please try again later. |
| 1325 | Failed to set trading unit |
| 1326 | Failed to access trading units. |
| 1327 | Transfer failed for lack of transfer permission. Please contact customer service. |
| 1328 | Transfer failed for lack of transfer permission. Please contact customer service. |
| 1329 | Transfer failed for lack of transfer permission. Please contact customer service. |
| 1330 | Transfer failed for lack of transfer permission. Please contact customer service. |
| 1331 | The number of decimals has exceeded the precision limit. Please modify and resubmit. |
| 1332 | The perpetual contract does not exist. |
| 1333 | Failed to agree to the Maker & Taker Agreement. |
| 1334 | Failed to query the Maker & Taker Agreement |
| 1335 | Failed to set double confirmation for querying Maker & Taker orders. |
| 1336 | Failed to set double confirmation for upgrading Maker & Taker orders. |
| 1337 | ailed to set the settings for querying Maker & Taker orders. |
| 1338 | Failed to set the settings for upgrading Maker & Taker orders. |
| 1339 | Nickname contains illegal words. Please modify. |
| 1340 | This nickname has been taken. Please modify. |
| 1341 | The enrollment has ended |
| 1342 | Nicknames cannot be set for subaccounts. |
| 1343 | Invalid indicator. Please reset. |
| 1344 | Sorry. You can set real-time market reminders for a maximum of {0} contract products. |
| 1345 | Sorry. A maximum of {1} reminders can be set for the {0} contract. |
| 1346 | The indicator already exists. You don't need to repeat the setting. |
| 1347 | {0} parameter is incorrect. Please modify. |
| 1348 | This contract does not support cross margin mode. |
| 1349 | The leverage for new orders does not match current positions. Please change the leverage. |
| 1401 | This project is not available in your country or region. |
| 1403 | The number of take-profit / stop-loss orders for {0} perpetual contract shall not exceed {1}. |
| 1404 | Take-profit and stop-loss can only be set for orders that are placed to open positions. |
| 1405 | The take-profit price shall not be {0}{1}{2} |
| 1406 | Your chances have been used up |
| 1407 | The stop-loss price shall not be {0}{1}{2} |
| 1408 | Unable to cancel because the take-profit / stop-loss order has not taken effect yet. |
| 1409 | You have no permission to place take-profit / stop-loss orders. Please contact customer service. |
| 1410 | The number of sub-accounts for batch operation cannot exceed {0} |
| 1411 | Settling. Unable to query order information. |
| 1412 | {0} does not meet with the decimal precision limit {1}. |
| 1413 | You have no permission to place a Trailing Stop order. Please contact customer service. |
| 1414 | You have not activated grid trading yet. Please log in to your main account on our website or app, and agree to the grid trading agreement. |
| 1415 | The lowest termination price must be lower than the lowest grid price and the latest price; while the highest termination price must be higher than the highest grid price and the latest price. Please modify and resubmit. |
| 1416 | Exceeding the maximum running time, which is {0} days and {1} hours. Please modify and resubmit. |
| 1417 | Exceeding the range of grid quantity, which is ({0} ~ {1}). Please modify and resubmit. |
| 1418 | At most {0} grid orders can run at the same time. Please cancel other grid orders first. |
| 1419 | At most {0} grid orders can run at the same time. Please cancel other grid orders first. |
| 1420 | You have no permission for Futures grid trading. Please contact customer service. |
| 1421 | You have open orders or positions for this futures contract. Please cancel orders or close positions first. |
| 1422 | The estimated PnL per grid is less than 0. Please modify and resubmit. |
| 1423 | The lower-upper price range of the grid is invalid. Please modify and resubmit. |
| 1424 | This grid trading has been terminated for other reasons. Unable to modify or terminate manually. |
| 1425 | The callback rate should be {0} {1}. Please modify and resubmit. |
| 1426 | The activation price should be {0} the latest price. |
| 1427 | The number of your {0} trailing-stop perpetual futures orders cannot exceed the limit {1}. |
| 1428 | You can only collect one coupon for the same contract type. |
| 1429 | Coupon already claimed. You don't have to repeat the action. |
| 1430 | Coupon expired. Please refresh. |
| 1431 | The system is in maintenance and is expected to resume at {0} (GMT+8). |
| 1432 | A grid trading is being initialized or terminated. Unable to place an order now. |
| 1433 | The grid trading is terminated due to the manual placing/canceling of orders. Please check \\u201COrder History\\u201D for details. |
| 1434 | The amount is less than the minimum initial margin ({0}{1}), which would cause the amount per grid to be less than the minimum allowable amount. Please modify and resubmit. |
| 1435 | The grid has been terminated by you. |
| 1436 | Timeout and the grid has terminated automatically. |
| 1437 | The grid has been terminated due to a system error. Please contact customer service. |
| 1438 | The grid has been terminated after the termination condition was triggered. |
| 1439 | The grid has been terminated as liquidation was triggered. |
| 1440 | Failed to cancel the {0} contract. |
| 1441 | The trigger price must be lower than the highest termination price and higher than the lowest termination price. Please modify and resubmit. |
| 1442 | The effective duration must be longer than the running time by one minute or more. Please modify! |
| 1443 | The grid has been terminated due to the delivery of the {0} contract. |
| 1450 | Current leverage is not supported at your risk level. |
| 1451 | Current leverage is not supported at your risk level. Please check the details on your main account. |
| 1452 | Grid orders have exceeded the maximum limit. Unable to place orders now. |
| 1453 | The number of all your trigger orders has exceeded the maximum limit. Unable to place more orders now. |
| 1454 | The number of all your take-profit / stop-loss orders has exceeded the maximum limit. Unable to place more orders now. |
| 1455 | The number of all your trailing stop orders has exceeded the maximum limit. Unable to place more orders now. |
| 1502 | Market orders are not allowed to place orders for one-way positions. |
| 1503 | The trader only supports the two-way position mode. |
| 1504 | After closing the trader status, the leverage can be modified. |
| 1505 | After becoming a trader, only the following trading pairs are allowed to trade:{0} |
| 1506 | After closing the copy trading, the leverage can be modified. |
| 1507 | The copy trading only supports two-way Position Mode |
| 1508 | You are using Copy Trading right now. You will have to exit Copy Trading (and unfollow your Copied Trader) before you can start trading futures. |
| 1511 | The stop-loss price is near the liquidation price and may not trigger the stop-loss order. Please adjust the price and try again. |
| 1600 | The trader only supports the cross-position mode. |
| 12001 | Invalid submission time. |
| 12002 | Incorrect signature version. |
| 12003 | Incorrect signature method. |
| 12004 | Incorrect signature method. |
| 12005 | IP address error |
| 12006 | The submission time cannot be left blank. |
| 12007 | Incorrect public key |
| 12008 | Verification failed. |
| 12009 | User has been locked or does not exist. |
| 1350 | This project is not available in your country or region. |
| 1457 | You are not eligible to participate. Please refer to the event rules. |
| 1458 | Query attempts have exceeded the limit of {0}. |
| 1460 | The contract is currently not available. Please do not transfer in. |
| 1461 | The total positions (this order + open orders + positions) have exceeded the long-position limit ({0}{1}). Please modify and resubmit. |
| 1462 | The total positions (this order + open orders + positions) have exceeded the short-position limit ({0}{1}). Please modify and resubmit. |
| 1463 | With {0}X leverage, the position limit is {1} USDT for a long position and {2} USDT for a short position. Cannot change to this leverage as your current position would exceed the position limit. |
| 1464 | The number of unfilled orders for opening positions of {0} delivery futures (including all expirations) shall not exceed {1}. |
| 1465 | The number of unfilled orders for closing positions of {0} futures (including all expirations) shall not exceed {1}. |
| 1466 | The trading volume of subaccounts will be booked into your main account. Please log in to your main account to check. |
| 1467 | {0} |
| 1468 | The number of take-profit and stop-loss orders for all {0} Futures(including all types) shall not exceed {1} |
| 1469 | The number of your trigger orders for {0} Futures(including all types) shall not exceed {1}. |
| 1470 | The number of your {0} Futures(including all types) trailing stop orders exceeds the limit {1}. |
| 1471 | The trail fund voucher has been redeemed or has expired. |
| 1472 | The trail fund voucher is no longer available. Please consult customer service for details. |
| 1481 | Failed to open some subaccounts. |
| 1482 | Subaccount does not exist. |
| 1480 | We are sorry that the risk control rule was triggered due to your operations, please contact our Customer Service! Thank you for your support! |
| 1483 | Insufficient; Unable to Claim |
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
| 1496 | Position mode cannot be adjusted due to the contract\\u2019s non-trading status. |
| 1497 | Position mode parameter passing error! |
| 1498 | Margin account incorrect! |
| 1499 | Hedge mode currently; Unavailable to place orders in one-way mode. |
| 1500 | One-way mode currently; Unavailable to place orders in hedge mode. |
| 1510 | Since you are the merged cross and isolated margin account for USDT-M futures , you cannot use the APIs. If you need to use, please change the account type via '/linear-swap-api/v3/swap\_switch\_account\_type' 1900={0};{1} |
| 1511 | The stop-loss price is near the liquidation price and may not trigger the stop-loss order. Please adjust the price and try again. |
| 1700 | TWAP service has been temporarily suspended |
| 1701 | Total Size should be no smaller than Chunk Size |
| 1702 | The maximum allowable number of TWAP orders has been reached |
| 1703 | The maximum allowable number of TWAP orders has been reached |
| 1704 | Distance (ratio) to market price: {0}-{1} |
| 1705 | Time Interval: {0} - {1} seconds |
| 2001 | Order failed. The trial bonus cannot be used for futures trades under the isolated margin mode |
| 2011 | There is an isolated position, please close it |
| 2012 | There is an isolated pending order, please cancel the order |
| 2013 | The account has isolated position and pending orders, please remove |
| 2014 | There are assets in the isolated account, please transfer to the full account |
| 1900 | {0};{1} |
| 2100 | One-way Mode does not support TP/SL market orders at the moment |
| 4000 | The merged cross and isolated margin account for USDT-M futures has only one USDT account. |
| 4001 | The merged cross and isolated margin account for USDT-M futures has only one USDT account. No need to transfer between users. |
| 4002 | The merged cross and isolated margin account for USDT-M futures is unavailable.Please complete the query with {0} |
| 4003 | The merged cross and isolated margin account for USDT-M futures is unavailable.Please complete the query with {0} |
| 4004 | The merged cross and isolated margin account for USDT-M futures is unavailable.Please complete the query with {0} |
| 4005 | The merged cross and isolated margin account for USDT-M futures is unavailable.Please complete the query with {0} |
| 4006 | No margin can be increased or decreased without a position |
| 4007 | Unified account special interface, non - one account is not available |
| 4009 | Function suspended |
| 4010 | HT deduction not yet enabled |
| 4011 | Close positions based on the maximum amount that can be closed without passing in the volume field. |
| 50001 | In view of the laws and regulations of your country/region, you understand that you bear the responsibility for any further proceeding or operation. |
| 50002 | Dear users, services are not available according to the rules and regulations in your country or region. |
| 50003 | Please assess and understand all the risks carefully and allocate your funds prudently when trading Futures products. |
| 50004 | In view of the laws and regulations of your country/region, you understand that you bear the responsibility for any further proceeding or operation. |
| 50101 | Please assess and understand all the risks carefully and allocate your funds prudently when trading Futures products. |
| 50102 | Dear user, please complete KYC identity verification before trading. |
| 50103 | Sorry, assets transfers between this sub-account and its main account are not available. |

## Endpoints

### create\_order (\[Isolated\] ws Place an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports websocket contract orders in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，create\_order; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | Order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) 0: no, 1: yes |  |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\] |  |  |
| price | decimal | false | Price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction |  |  |
| offset | string | false | "open", "close", "both" |  |  |
| lever\_rate | int | true | Leverage rate \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| DATA\_START |  | false |  |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Post-Only orders are limit orders that will never take liquidity (also called maker-only order). There are order limit and position for post-only orders which the upper limit is 5,000,000 for open/close orders. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. open long: direction - buy、offset - open close long: direction -sell、offset - close open short: direction -sell、offset - open close short: direction -buy、offset - close No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START |  | false |  |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package

#### Subscription Example

```
{
  "op": "create_order",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "create_cross_order",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "contract_code": "btc-usdt",
    "direction": "buy",
    "offset": "open",
    "price": "29999",
    "lever_rate": 5,
    "volume": 1,
    "order_price_type": "opponent",
    "tp_trigger_price": 31000,
    "tp_order_price": 31000,
    "tp_order_price_type": "optimal_5",
    "sl_trigger_price": "29100",
    "sl_order_price": "29100",
    "sl_order_price_type": "optimal_5"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "order_id": 770323133537685500,
    "client_order_id": 57012021022,
    "order_id_str": "770323133537685504"
  },
  "ts": 1603700946949
}
```

#### Example of a Subscription Cancellation

No data

### create\_cross\_order (\[Cross\] ws Place an Order )

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports websocket contract orders in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， create\_cross\_order; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | Order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |
| price | decimal | false | price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction | "buy"/"sell" |  |
| offset | string | false | "open", "close" | "open","close","both" |  |
| lever\_rate | int | true | leverage \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| DATA\_START |  | false |  |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Post-Only orders are limit orders that will never take liquidity (also called maker-only order). There are order limit and position for post-only orders which the upper limit is 5,000,000 for open/close orders. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. open long: direction - buy、offset - open close long: direction -sell、offset - close open short: direction -sell、offset - open close short: direction -buy、offset - close No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START |  | false |  |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package

#### Subscription Example

```
{
  "op": "create_cross_order",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "create_cross_order",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "contract_code": "btc-usdt",
    "direction": "buy",
    "offset": "open",
    "price": "29999",
    "lever_rate": 5,
    "volume": 1,
    "order_price_type": "opponent",
    "tp_trigger_price": 31000,
    "tp_order_price": 31000,
    "tp_order_price_type": "optimal_5",
    "sl_trigger_price": "29100",
    "sl_order_price": "29100",
    "sl_order_price_type": "optimal_5"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "order_id": 770323133537685500,
    "client_order_id": 57012021022,
    "order_id_str": "770323133537685504"
  },
  "ts": 1603700946949
}
```

#### Example of a Subscription Cancellation

No data

### create\_batchorder (\[Isolated\] ws Place a Batch of Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports batch orders for websocket contracts in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， create\_batchorder |
| cid | string | Optional; ID Client requests unique ID |
| data | string | batch order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) 0: no, 1: yes |  |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\] |  |  |
| price | decimal | false | Price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction |  |  |
| offset | string | false | "open", "close", "both" |  |  |
| lever\_rate | int | true | Leverage rate \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; limit，optimal\_5，optimal\_10，optimal\_20 | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| DATA\_START |  | false |  |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. 10 orders at most Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing result | ok , "error" |
| DATA\_START | object array | true |  |  |
| ERRORS\_START | object array | true |  |  |
| index | int | true | Index of orders |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error massage |  |
| ERRORS\_END |  | false |  |  |
| SUCCESS\_START |  | false |  |  |
| index | int | true | Index of orders |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | The order ID is in string format |  |
| client\_order\_id | long | true | The client order ID filled in by the user when placing an order. If not filled, it will not be returned |  |
| SUCCESS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Subscription Example

```
{
  "op": "create_batchorder",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "create_batchorder",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "orders_data": [
      {
        "contract_code": "btc-usdt",
        "direction": "sell",
        "offset": "open",
        "price": "29999",
        "lever_rate": 5,
        "volume": 1,
        "order_price_type": "opponent",
        "tp_trigger_price": 27000,
        "tp_order_price": 27000,
        "tp_order_price_type": "optimal_5",
        "sl_trigger_price": "30100",
        "sl_order_price": "30100",
        "sl_order_price_type": "optimal_5"
      },
      {
        "contract_code": "btc-usdt",
        "direction": "buy",
        "offset": "open",
        "price": "29999",
        "lever_rate": 5,
        "volume": 1,
        "order_price_type": "post_only",
        "tp_trigger_price": 31000,
        "tp_order_price": 31000,
        "tp_order_price_type": "optimal_5",
        "sl_trigger_price": "29100",
        "sl_order_price": "29100",
        "sl_order_price_type": "optimal_5"
      }
    ]
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "index": 2,
        "err_code": 1050,
        "err_msg": "Customers order number is repeated. Please try again later."
      }
    ],
    "success": [
      {
        "order_id": 770323847022211100,
        "client_order_id": 57012021024,
        "index": 1,
        "order_id_str": "770323847022211072"
      }
    ]
  },
  "ts": 1603701117058
}
```

#### Example of a Subscription Cancellation

No data

### create\_cross\_batchorder (\[Cross\] ws Place a Batch of Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports batch orders for websocket contracts in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，create\_cross\_batchorder |
| cid | string | Optional; ID Client requests unique ID |
| data | string | batch order parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START | object array | true |  |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |
| price | decimal | false | price |  |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | Transaction direction | "buy"/"sell" |  |
| offset | string | false | offset | "open","close","both" |  |
| lever\_rate | int | true | leverage \[ if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate; high leverage has a high risk factor, so please use it with caution. |  |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order default is limit; | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20，optimal\_5，optimal\_10，optimal\_20 |  |
| DATA\_START |  | false |  |  |  |

Notes: "limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need. Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled. If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface. Only open orders can support setting take profit and stop loss. The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set. No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-cancel Order,FOK:Fill-Or-Kill Order. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. 25 orders at most Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| ERRORS\_START | object array | true |  |  |
| index | int | true | order index |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| SUCCESS\_START |  | false |  |  |
| index | int | true | order index |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| SUCCESS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes: The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Subscription Example

```
{
  "op": "create_cross_batchorder",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "create_cross_batchorder",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "orders_data": [
      {
        "contract_code": "btc-usdt",
        "direction": "sell",
        "offset": "open",
        "price": "29999",
        "lever_rate": 5,
        "volume": 1,
        "order_price_type": "opponent",
        "tp_trigger_price": 27000,
        "tp_order_price": 27000,
        "tp_order_price_type": "optimal_5",
        "sl_trigger_price": "30100",
        "sl_order_price": "30100",
        "sl_order_price_type": "optimal_5"
      },
      {
        "contract_code": "btc-usdt",
        "direction": "buy",
        "offset": "open",
        "price": "29999",
        "lever_rate": 5,
        "volume": 1,
        "order_price_type": "post_only",
        "tp_trigger_price": 31000,
        "tp_order_price": 31000,
        "tp_order_price_type": "optimal_5",
        "sl_trigger_price": "29100",
        "sl_order_price": "29100",
        "sl_order_price_type": "optimal_5"
      }
    ]
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "index": 2,
        "err_code": 1050,
        "err_msg": "Customers order number is repeated. Please try again later."
      }
    ],
    "success": [
      {
        "order_id": 770323847022211100,
        "client_order_id": 57012021024,
        "index": 1,
        "order_id_str": "770323847022211072"
      }
    ]
  },
  "ts": 1603701117058
}
```

#### Example of a Subscription Cancellation

No data

### cancel (\[Isolated\] ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports order cancellation for websocket contracts in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cancel |
| cid | string | Optional; ID Client requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| DATA\_START |  | false |  |  |  |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| DATA\_START |  | false |  |  |  |

Notes: Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。 The return data from cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface. client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| ERRORS\_START | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "op": "cancel",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "cancel",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "order_id": "456789133445",
    "client_order_id": "4567891312345",
    "contract_code": "BTC-USDT"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "770323133537685504",
        "err_code": 1071,
        "err_msg": "Repeated withdraw."
      }
    ],
    "successes": "770323847022211072"
  },
  "ts": 1603701351602
}
```

#### Example of a Subscription Cancellation

No data

### cross\_cancel (\[Cross\] ws cancel an Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports order cancellation for websocket contracts in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，cross\_cancel; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |

Notes: Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。 The return data from cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface. client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| ERRORS\_START | array | true |  |  |
| order\_id | string | true | order ID |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "op": "cross_cancel",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "cross_cancel",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "order_id": "456789133445",
    "client_order_id": "4567891312345",
    "contract_code": "BTC-USDT",
    "pair": "BTC-USDT",
    "contract_type": "swap"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "770323133537685504",
        "err_code": 1071,
        "err_msg": "Repeated withdraw."
      }
    ],
    "successes": "770323847022211072"
  },
  "ts": 1603701351602
}
```

#### Example of a Subscription Cancellation

No data

### cancelall (\[Isolated\] ws cancel all Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports all orders cancellation for websocket contracts in isolated position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name cancelall |
| cid | string | Optional; ID Client requests unique ID |
| data | string | All cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USDT" |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes: You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| ERRORS\_START | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | failed order error messageError code |  |
| err\_msg | string | true | failed order information |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | Successful order |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "op": "cancelall",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "cancelall",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "order_id": "456789133445",
    "client_order_id": "4567891312345",
    "contract_code": "BTC-USDT"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "770323133537685504",
        "err_code": 1071,
        "err_msg": "Repeated withdraw."
      }
    ],
    "successes": "770323847022211072"
  },
  "ts": 1603701351602
}
```

#### Example of a Subscription Cancellation

No data

### cross\_cancelall (\[Cross\] ws cancel all Orders)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: This interface only supports all orders cancellation for websocket contracts in cross position mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-trade |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-trade |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name， cross\_cancelall; |
| cid | string | Optional; ID Client requests unique ID |
| data | string | All cancellation parameters |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes: You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| ERRORS\_START | array | true |  |  |
| order\_id | string | true | order ID |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | the list order which's successful |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Subscription Example

```
{
  "op": "cross_cancelall",
  "cid": "40sG903yz80oDFWr",
  "data": ""
}
```

#### Example of a Successful Subscription

```
{
  "op": "cross_cancelall",
  "cid": "40sG903yz80oDFWr",
  "data": {
    "order_id": "456789133445",
    "client_order_id": "4567891312345",
    "contract_code": "BTC-USDT",
    "pair": "BTC-USDT",
    "contract_type": "swap"
  }
}
```

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "770323133537685504",
        "err_code": 1071,
        "err_msg": "Repeated withdraw."
      }
    ],
    "successes": "770323847022211072"
  },
  "ts": 1603701351602
}
```

#### Example of a Subscription Cancellation

No data

### orders.\$contract\_code (\[Isolated\] Subscribe Order Data(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| orders.\* | orders.\* | Allowed |
| orders.contract\_code1 | orders.\* | Allowed |
| orders.contract\_code1 | orders.contract\_code1 | Allowed |
| orders.contract\_code1 | orders.contract\_code1 | Not Allowed |
| orders.\* | orders.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all ) "BTC-USDT","ETH-USDT"... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name，Order push value is notify ; |  |
| topic | string | true | Required; Order push topic |  |
| uid | long | true | account uid |  |
| ts | string | true | Server responses timestamp |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code |  |
| volume | decimal | true | Order quantity |  |
| price | decimal | true | Order price |  |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | "buy" Long "sell": Short |  |
| offset | string | true | "open": Open "close": Close, "both" |  |
| status | int | true | Order status(1. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled; 11Cancelling) |  |
| lever\_rate | int | true | Leverage |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client ID |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| created\_at | long | true | order creation time |  |
| trade\_volume | decimal | true | trade volume(coin)) |  |
| trade\_turnover | decimal | true | Turnover |  |
| fee | decimal | true | Fees |  |
| trade\_avg\_price | decimal | true | Average order price |  |
| margin\_frozen | string | true | Frozen Margin |  |
| margin\_asset | decimal | true | margin\_asset |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| liquidation\_type | decimal | true | Liquidation type, 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |  |
| canceled\_at | long | true | Canceled time |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee |  |
| margin\_mode | string | true | margin mode isolated : "isolated" |  |
| margin\_account | string | true | margin account "BTC-USDT"... |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order 1：yes；0：no |  |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only 0: no, 1: yes |  |
| canceled\_source | string | false | timeout-canceled-order |  |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique ID of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_fee | decimal | true | trading fees |  |
| trade\_turnover | decimal | true | turnover |  |
| created\_at | long | true | trade creation time |  |
| role | string | true | taker or maker |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee |  |
| price | string | false | deduction currency price(USDT) |  |
| TRADE\_END |  | false |  |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "orders.btc-usdt"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "orders.btc-usdt",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "orders.btc-usdt",
  "ts": 1489474082831,
  "uid": "123456789",
  "symbol": "BTC",
  "contract_code": "BTC-USDT",
  "volume": 111,
  "price": 1111,
  "order_price_type": "limit",
  "direction": "buy",
  "offset": "open",
  "status": 6,
  "lever_rate": 10,
  "order_id": 758684042347171800,
  "order_id_str": "758684042347171840",
  "client_order_id": 10683,
  "order_source": "web",
  "order_type": 1,
  "created_at": 1408076414000,
  "trade_volume": 1,
  "trade_turnover": 1200,
  "fee": 0,
  "liquidation_type": "0",
  "trade_avg_price": 10,
  "margin_asset": "USDT",
  "margin_frozen": 10,
  "profit": 2,
  "canceled_at": 1408076414000,
  "fee_asset": "USDT",
  "margin_mode": "isolated",
  "margin_account": "BTC-USDT",
  "is_tpsl": 0,
  "real_profit": 0,
  "reduce_only": 0,
  "canceled_source": "timeout-canceled-order",
  "trade": [
    {
      "trade_id": 14469,
      "id": "14469-758684042347171840-1",
      "trade_volume": 1,
      "trade_price": 123.4555,
      "trade_fee": 0.234,
      "fee_asset": "USDT",
      "price": "",
      "trade_turnover": 34.123,
      "created_at": 1490759594752,
      "role": "maker",
      "profit": 2,
      "real_profit": 0
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "orders.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### orders\_cross.\$contract\_code (\[Cross\] Subscribe Order Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| orders\_cross.\* | orders\_cross.\* | Allowed |
| orders\_cross.contract\_code1 | orders\_cross.\* | Allowed |
| orders\_cross.contract\_code1 | orders\_cross.contract\_code1 | Allowed |
| orders\_cross.contract\_code1 | orders\_cross.contract\_code1 | Not Allowed |
| orders\_cross.\* | orders\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code |  | all: \* (swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | operation name, fixed as notify |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| status | int | true | order status | 1\. Placing orders to order book; 2 Placing orders to order book; 3. Placed to order book 4. Partially filled; 5 partially filled but cancelled by client; 6. Fully filled; 7. Cancelled; 11Cancelling |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| created\_at | long | true | created time |  |
| trade\_volume | decimal | true | trade total amount |  |
| trade\_turnover | decimal | true | trade amount |  |
| fee | decimal | true | service fee |  |
| trade\_avg\_price | decimal | true | trade average price |  |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| liquidation\_type | decimal | true | liquidation type 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |  |
| canceled\_at | long | true | canceled time |  |
| fee\_asset | string | true | fee asset | “USDT” |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique ID of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_cross\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_volume | decimal | true | trade quantity |  |
| trade\_price | decimal | true | trade price |  |
| trade\_fee | decimal | true | trade fee |  |
| trade\_turnover | decimal | true | trade amount |  |
| created\_at | long | true | trade time |  |
| role | string | true | taker/maker |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| fee\_asset | string | true | fee asset | “USDT” |
| price | string | false | deduction currency price(USDT) |  |
| TRADE\_END | string | true |  |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "orders_cross.btc-usdt"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "orders_cross.btc-usdt",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "orders.btc-usdt",
  "ts": 1489474082831,
  "uid": "123456789",
  "symbol": "BTC",
  "contract_code": "BTC-USDT",
  "volume": 111,
  "price": 1111,
  "order_price_type": "limit",
  "direction": "buy",
  "offset": "open",
  "status": 6,
  "lever_rate": 10,
  "order_id": 758684042347171800,
  "order_id_str": "758684042347171840",
  "client_order_id": 10683,
  "order_source": "web",
  "order_type": 1,
  "created_at": 1408076414000,
  "trade_volume": 1,
  "trade_turnover": 1200,
  "fee": 0,
  "liquidation_type": "0",
  "trade_avg_price": 10,
  "margin_asset": "USDT",
  "margin_frozen": 10,
  "profit": 2,
  "canceled_at": 1408076414000,
  "fee_asset": "USDT",
  "margin_mode": "isolated",
  "margin_account": "BTC-USDT",
  "is_tpsl": 0,
  "real_profit": 0,
  "reduce_only": 0,
  "canceled_source": "timeout-canceled-order",
  "trade": [
    {
      "trade_id": 14469,
      "id": "14469-758684042347171840-1",
      "trade_volume": 1,
      "trade_price": 123.4555,
      "trade_fee": 0.234,
      "fee_asset": "USDT",
      "price": "",
      "trade_turnover": 34.123,
      "created_at": 1490759594752,
      "role": "maker",
      "profit": 2,
      "real_profit": 0
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "orders_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### accounts.\$contract\_code (\[Isolated\] Subscribe Account Equity Updates Data(sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| accounts.\* | accounts.\* | Allowed |
| accounts.contract\_code1 | accounts.\* | Allowed |
| accounts.contract\_code1 | accounts.contract\_code1 | Allowed |
| accounts.contract\_code1 | accounts.contract\_code1 | Not Allowed |
| accounts.\* | accounts.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code |  | "\*" all(it means to subscribe the balance change of all coins), "BTC-USDT"... |

Notes:

A regular push of account is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Operator Name，Subscribe value is sub |  |
| topic | string | true | Subscribe Topic Name |  |
| uid | long | true | account uid |  |
| ts | string | true | Time of Respond Generation, Unit: Millisecond |  |
| event | string | true | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | object array | true |  |  |
| symbol | string | true | Coins. "BTC","ETH"... |  |
| contract\_code | string | true | Contract Code |  |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | Account Equity |  |
| margin\_static | decimal | true | Static Equity |  |
| margin\_position | decimal | true | Position Margi(the margin for holding currenty positions) |  |
| margin\_frozen | decimal | true | Frozen Margin |  |
| margin\_available | decimal | true | Available Margin |  |
| profit\_real | decimal | true | Realized Profits&Losses |  |
| profit\_unreal | decimal | true | Unrealized Profits&Losses |  |
| risk\_rate | decimal | true | Margin Ratio |  |
| liquidation\_price | decimal | true | Liquidation Price |  |
| withdraw\_available | decimal | true | Assets available to withdraw |  |
| lever\_rate | int | true | Leverage |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_mode | string | true | margin mode isolated : "isolated" |  |
| margin\_account | string | true | margin account "BTC-USDT"... |  |
| position\_mode | string | true | position mode single\_side，dual\_side |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "accounts.BTC-USDT"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "accounts.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "accounts.btc-usdt",
  "ts": 1603711370689,
  "event": "order.open",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_balance": 79.72434662,
      "margin_static": 79.79484662,
      "margin_position": 1.31303,
      "margin_frozen": 4.0662,
      "margin_available": 74.34511662,
      "profit_real": 0.03405608,
      "profit_unreal": -0.0705,
      "withdraw_available": 74.34511662,
      "risk_rate": 14.745772976801513,
      "liquidation_price": 92163.42096277916,
      "lever_rate": 10,
      "adjust_factor": 0.075,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side"
    }
  ],
  "uid": "123456789"
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "accounts.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### accounts\_cross.\$margin\_account (\[Cross\] Subscribe Account Equity Updates Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| accounts\_cross.\* | accounts\_cross.\* | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.\* | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 |
| accounts\_cross.margin\_account1 | accounts\_cross.margin\_account1 | Not Allowed |
| accounts\_cross.\* | accounts\_cross.margin\_account1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "USDT"... |  |

Notes:

A regular push of account is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | operaton name, fixed as notify; |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| event | string | true | event of margin account update | order.open 、order.match 、settlement、order.liquidation、order.cancel 、contract.transfer、ontract.system、other 、init、napshot 、ADL trade |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit\_real | decimal | true | realized profits and losses |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| CONTRACT\_DETAIL\_END |  | false |  |  |
| FUTURES\_CONTRACT\_DETAIL\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | future: "BTC-USDT-210625" ... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| FUTURES\_CONTRACT\_DETAIL\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "accounts_cross.USDT"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "accounts_cross.USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "accounts_cross",
  "ts": 1640756528985,
  "event": "snapshot",
  "data": [
    {
      "margin_mode": "cross",
      "margin_account": "USDT",
      "margin_asset": "USDT",
      "margin_balance": 20.603401615553835,
      "margin_static": 20.475701615553835,
      "margin_position": 19.30352,
      "margin_frozen": 0,
      "profit_real": -0.01911684,
      "profit_unreal": 0.1277,
      "withdraw_available": 1.1721816155538354,
      "risk_rate": 25.68347743773394,
      "position_mode": "dual_side",
      "contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT",
          "margin_position": 9.55638,
          "margin_frozen": 0,
          "margin_available": 1.2998816155538353,
          "profit_unreal": -0.0102,
          "liquidation_price": 27790.709661740086,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "swap",
          "pair": "BTC-USDT",
          "business_type": "swap"
        }
      ],
      "futures_contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-220325",
          "margin_position": 9.74714,
          "margin_frozen": 0,
          "margin_available": 1.2998816155538353,
          "profit_unreal": 0.1379,
          "liquidation_price": 28744.509661740085,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "quarter",
          "pair": "BTC-USDT",
          "business_type": "futures"
        }
      ]
    }
  ],
  "uid": "123456789"
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "accounts_cross.USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### positions.\$contract\_code (\[Isolated\] Subscribe Position Updates(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| positions.\* | positions.\* | Allowed |
| positions.contract\_code1 | positions.\* | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Allowed |
| positions.contract\_code1 | positions.contract\_code1 | Not Allowed |
| positions.\* | positions.symbol1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all positions) "BTC-USDT"... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | Required;Operator Name ; |  |
| topic | string | false | Required; topic |  |
| uid | string | false | account uid |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| event | string | false | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | array object | false |  |  |
| symbol | string | false | Coin. "BTC","ETH"... |  |
| contract\_code | string | false | Contract Code |  |
| volume | decimal | false | Open Interest |  |
| available | decimal | false | Positions available to close |  |
| frozen | decimal | false | Frozen Margin |  |
| cost\_open | decimal | false | Open price |  |
| cost\_hold | decimal | false | Position Price |  |
| profit\_unreal | decimal | false | Unrealized Profits&Losses |  |
| profit\_rate | decimal | false | Profit/Losses Ratio |  |
| profit | decimal | false | Profits/Losses |  |
| position\_margin | decimal | false | Position Margin |  |
| lever\_rate | int | false | Leverage |  |
| direction | string | false | transaction direction of positions "buy":long "sell":short |  |
| last\_price | decimal | false | Last Price |  |
| margin\_asset | string | false | Margin Asset |  |
| margin\_mode | string | false | margin mode isolated : "isolated" |  |
| margin\_account | string | false | margin account "BTC-USDT"... |  |
| position\_mode | string | false | position mode single\_side，dual\_side |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl(Pushed every 5 seconds, not updated in real time) | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

Notes:

A regular push of position is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

When switching leverage with no positions, the event "switch\_lever\_rate" will not be pushed by the position topic.

In the one-way position mode: only push the data of contract which with the position (that is, only push the data of the one-way non-empty position), if there is no position, it will not be pushed

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "positions.BTC-USDT"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "positions.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "positions",
  "ts": 1603711371803,
  "event": "snapshot",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "available": 0,
      "frozen": 1,
      "cost_open": 13059.8,
      "cost_hold": 13059.8,
      "profit_unreal": -0.0705,
      "profit_rate": -0.05398244996094886,
      "profit": -0.0705,
      "position_margin": 1.31303,
      "lever_rate": 10,
      "direction": "sell",
      "last_price": 13130.3,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    }
  ],
  "uid": "123456789"
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "positions.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### positions\_cross.\$contract\_code (\[Cross\] Subscribe Position Updates（sub）)

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| positions\_cross.\* | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.\* | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Allowed |
| positions\_cross.contract\_code1 | positions\_cross.contract\_code1 | Not Allowed |
| positions\_cross.\* | positions\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | false | operaton name, fixed as notify; |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| event | string | true | Related events of position change notification | notification on account asset change such as commit order(order.open), fulfill order(order.match)(excluding liquidated order and settled orders), settlement and delivery(settlement), fulfill liquidation order(order.liquidation)(including voluntarily fulfilled liquidation order and the fulfilled liquidation order taken over by system ) , cancel order(order.cancel), asset transfer（contract.transfer) (ncluding transfer with exchange accounts, transfer between main account and sub-account, and tranfer between different margin accounts.), system (contract.system), other asset change(other), switch leverage(switch\_lever\_rate), initial margin(init), ADL trade |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | positions available to close |  |
| frozen | decimal | true | positions frozen |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | leverage |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest trade price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by adl(Pushed every 5 seconds, not updated in real time) | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

Notes:

A regular push of position is performed every 5 sedconds.The event field of the reponse is "snapshot".If there is a push in 5 seconds, snapshot push will be skipped.

When switching leverage with no positions, the event "switch\_lever\_rate" will not be pushed by the position topic.

In the one-way position mode: only push the data of contract which with the position (that is, only push the data of the one-way non-empty position), if there is no position, it will not be pushed

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "positions_cross.BTC-USDT"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "positions_cross.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "positions_cross.btc-usdt",
  "ts": 1639107468139,
  "event": "order.match",
  "data": [
    {
      "contract_type": "swap",
      "pair": "BTC-USDT",
      "business_type": "swap",
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 48284.9,
      "cost_hold": 48284.9,
      "profit_unreal": -0.0001,
      "profit_rate": -0.000010355204214985,
      "profit": -0.0001,
      "margin_asset": "USDT",
      "position_margin": 9.65696,
      "lever_rate": 5,
      "direction": "buy",
      "last_price": 48284.8,
      "margin_mode": "cross",
      "margin_account": "USDT",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    }
  ],
  "uid": "123456789"
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "positions_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### matchOrders.\$contract\_code (\[Isolated\] Subscribe Match Order Data（sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| matchOrders.\* | matchOrders.\* | Allowed |
| matchOrders.contract\_code1 | matchOrders.\* | Allowed |
| matchOrders.contract\_code1 | matchOrders.contract\_code1 | Allowed |
| matchOrders.contract\_code1 | matchOrders.contract\_code1 | Not Allowed |
| matchOrders.\* | matchOrders.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all match orders) "BTC-USDT"... |  |

Notes:

The order status of 'post\_only' type pushed by ws is ethier '7:canceled' or '3:submitted'.

The orders will be pushed when matched by matching engine.

The delivery orders will not be pushed.

The orders transfered from future or to future will not be pushed.

The netting and forced liquidation orders will not be pushed.

The orders will generally be pushed faster than the normal orders subscription.But It's not guranted.

If there is an order with N trades,including 1 taker and N maker,it will push N+1 trades at most.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string  | false | notify |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | account uid |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code |  |
| status | int | true | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| client\_order\_id | long | true | client order id |  |
| order\_type | int | true | order\_type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| trade\_volume | decimal | true | trade volume |  |
| volume | decimal | true | volume |  |
| direction | string | true | direction | "buy" : "sell" |
| offset | string | true | offset | "open", "close", "both" |
| lever\_rate | int | true | lever rate |  |
| price | decimal | true | price |  |
| created\_at | long | true | created time |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique id of the trade. |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume（cont） |  |
| trade\_turnover | decimal | true | trade turnover |  |
| created\_at | long | true | created time |  |
| role | string | true | taker or maker |  |
| TRADE\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "topic": "matchOrders.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "matchOrders.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "matchOrders.btc-usdt",
  "ts": 1600926986125,
  "symbol": "BTC",
  "contract_code": "BTC-USDT",
  "status": 6,
  "order_id": 758688290195656700,
  "order_id_str": "758688290195656704",
  "client_order_id": null,
  "order_type": 1,
  "created_at": 1600926984112,
  "trade": [
    {
      "trade_id": 14470,
      "id": "14470-758688290195656704-1",
      "trade_volume": 1,
      "trade_price": 10329.11,
      "trade_turnover": 103.2911,
      "created_at": 1600926986046,
      "role": "taker"
    }
  ],
  "uid": "123456789",
  "volume": 1,
  "trade_volume": 1,
  "direction": "buy",
  "offset": "open",
  "lever_rate": 5,
  "price": 10329.11,
  "order_source": "web",
  "order_price_type": "opponent",
  "margin_mode": "isolated",
  "margin_account": "BTC-USDT",
  "is_tpsl": 0,
  "reduce_only": 0
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "matchOrders.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### matchOrders\_cross.\$contract\_code (\[Cross\] Subscribe Match Order Data（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| matchOrders\_cross.\* | matchOrders\_cross.\* | Allowed |
| matchOrders\_cross.contract\_code1 | matchOrders\_cross.\* | Allowed |
| matchOrders\_cross.contract\_code1 | matchOrders\_cross.contract\_code1 | Allowed |
| matchOrders\_cross.contract\_code1 | matchOrders\_cross.contract\_code1 | Not Allowed |
| matchOrders\_cross.\* | matchOrders\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |

Notes:

The order status of 'post\_only' type pushed by ws is ethier '7:canceled' or '3:submitted'.

The orders will be pushed when matched by matching engine.

The delivery orders will not be pushed.

The orders transfered from future or to future will not be pushed.

The netting and forced liquidation orders will not be pushed.

The orders will generally be pushed faster than the normal orders subscription.But It's not guranted.

If there is an order with N trades,including 1 taker and N maker,it will push N+1 trades at most.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string  | false | operaton name, fixed as notify; |  |
| topic | string | true | topic |  |
| ts | long | true | server response timestamp |  |
| uid | string | true | uid |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| status | int | true | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| trade\_volume | decimal | true | trade volume |  |
| volume | decimal | true | order volume |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| lever\_rate | int | true | leverage |  |
| price | decimal | true | place price |  |
| created\_at | long | true | created time |  |
| order\_source | int | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| order\_price\_type | string | true | type of order price | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| is\_tpsl | string | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| TRADE\_START | object array | true |  |  |
| id | string | true | the global unique id of the trade |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_cross\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade amount |  |
| created\_at | long | true | created time |  |
| role | string | true | taker/maker |  |
| TRADE\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "topic": "matchOrders_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "matchOrders_cross.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "contract_type": "swap",
  "pair": "BTC-USDT",
  "business_type": "swap",
  "op": "notify",
  "topic": "matchOrders_cross.btc-usdt",
  "ts": 1639705640671,
  "uid": "123456789",
  "symbol": "BTC",
  "contract_code": "BTC-USDT",
  "status": 6,
  "order_id": 921337601229725700,
  "order_id_str": "921337601229725696",
  "client_order_id": null,
  "order_type": 1,
  "volume": 1,
  "trade_volume": 1,
  "created_at": 1639705601752,
  "direction": "sell",
  "offset": "open",
  "lever_rate": 5,
  "price": 47800,
  "order_source": "web",
  "order_price_type": "limit",
  "trade": [
    {
      "trade_id": 87890603387,
      "id": "87890603387-921337601229725696-1",
      "trade_volume": 1,
      "trade_price": 47800,
      "trade_turnover": 47.8,
      "created_at": 1639705640641,
      "role": "maker"
    }
  ],
  "margin_mode": "cross",
  "margin_account": "USDT",
  "is_tpsl": 1,
  "reduce_only": 0
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "matchOrders_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### public.\$contract\_code.liquidation\_orders (\[General\] Subscribe Liquidation Orders (no authentication) (sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.liquidation\_orders | public.\*.liquidation\_orders | Allowed |
| public.contract\_code1.liquidation\_orders | public.\*.liquidation\_orders | Allowed |
| public.contract\_code1.liquidation\_orders | public.contract\_code1.liquidation\_orders | Allowed |
| public.contract\_code1.liquidation\_orders | public.contract\_code1.liquidation\_orders | Not Allowed |
| public.\*.liquidation\_orders | public.contract\_code1.liquidation\_orders | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code |  | all: \*, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |

Notes:

subscripting \* is ok under business\_type filled in. when business\_type is swap, subscripting \* returns all swap contracts; when business\_type is futures, subscripting \* returns all futures contracts; when business\_type is all, subscripting \* returns all swap contracts and all futures contracts.

when business\_type is swap, subscripting contract code and will get an error msg with 2011 error code. when you have subscribed \* and business\_type is swap (it means subscripting all swap contracts), which allows you to subscribe \* and business\_type is all(it means subscripting all swap contracts and all futures contracts). but if the steps reversed, you will get error msg with 2014 error code ; It means that you are allowed to subscribe to a small scope first and then to a large scope, but you are not allowed to subscribe to a large scope and then continue to subscribe to a small scope, because it is meaningless. A large scope already includes a small scope.

The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

unsubscripting \* is ok under business\_type filled in. when business\_type is swap, unsubscripting \* means to unsubscripting all swap contracts; when business\_type is futures, unsubscripting \* means to unsubscripting all futures contracts;

unsubscription scope must be greater than or equal to the subscription scope and in that it just can be success.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | value: 'notify'; |  |
| topic | string | true | topic subscribed |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | array object | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | swap code swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| direction | string | true | Long or short |  |
| offset | string | true | Open, close, both |  |
| volume | decimal | true | liquidation volume (Cont.) |  |
| amount | decimal | true | liquidation amount (token) |  |
| trade\_turnover | decimal | true | liquidation amount (quotation token) |  |
| price | decimal | true | bankruptcy price |  |
| created\_at | long | true | Order Creation Time |  |
| contract\_type | string | true | contract type: swap, this\_week, next\_week, quarter, next\_quarter |  |
| pair | string | true | pair, such as: “BTC-USDT” |  |
| business\_type | string | true | business type: futures, swap |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.BTC-USDT.liquidation_orders"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.BTC-USDT.liquidation_orders",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "public.O3-USDT.liquidation_orders",
  "ts": 1639122193214,
  "data": [
    {
      "symbol": "O3",
      "contract_code": "O3-USDT",
      "direction": "sell",
      "offset": "close",
      "volume": 432,
      "price": 0.7858,
      "created_at": 1639122193172,
      "amount": 432,
      "trade_turnover": 339.4656,
      "contract_type": "swap",
      "pair": "O3-USDT",
      "business_type": "swap"
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "public.BTC-USDT.liquidation_orders",
  "cid": "40sG903yz80oDFWr"
}
```

### public.\$contract\_code.funding\_rate (\[General\] Subscribe funding rate (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.funding\_rate | public.\*.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.\*.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | Allowed |
| public.contract\_code1.funding\_rate | public.contract\_code1.funding\_rate | Not Allowed |
| public.\*.funding\_rate | public.contract\_code1.funding\_rate | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all funding rate) "BTC-USDT"... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | value: "notify"; |  |
| topic | string | true | topic subscribed |  |
| ts | long | true | timestamp of server response.unit: millionseconds |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol,"BTC","ETH"... |  |
| contract\_code | string | true | contract\_code,"BTC-USDT" |  |
| fee\_asset | string | true | fee asset,"USDT"... |  |
| funding\_time | string | true | current funding time |  |
| funding\_rate | string | true | current funding rate |  |
| estimated\_rate | string | true | (Deprecated, default is null) |  |
| settlement\_time | string | true | settlement timestamp.eg:"1490759594752" |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "topic": "public.btc-usdt.funding_rate",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.btc-usdt.funding_rate",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "public.BTC-USDT.funding_rate",
  "ts": 1603778748166,
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "fee_asset": "USDT",
      "funding_time": "1603778700000",
      "funding_rate": "-0.000220068774978695",
      "settlement_time": "1603785600000",
      "estimated_rate": "null"
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "public.BTC-USDT.funding_rate",
  "cid": "40sG903yz80oDFWr"
}
```

### public.\$contract\_code.contract\_info (\[General\] Subscribe Contract Info (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\*.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | public.\*.contract\_info | Allowed |
| public.contract\_code1.contract\_info | ublic.contract\_code1.contract\_info | Allowed |
| public.contract\_code1.contract\_info | ublic.contract\_code1.contract\_info | Not Allowed |
| public.\*.contract\_info | ublic.contract\_code1.contract\_info | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |

Notes:

subscripting \* is ok when business\_type filled in. when business\_type is swap, subscripting \* returns all swap contracts; when business\_type is futures, subscripting \* returns all futures contracts; when business\_type is all, subscripting \* returns all swap contracts and all futures contracts.

when business\_type is swap, subscripting contract code and will get an error msg with 2011 error code. when you have subscribed \* and business\_type is swap (it means subscripting all swap contracts), which allows you to subscribe \* and business\_type is all(it means subscripting all swap contracts and all futures contracts). but if the steps reversed, you will get error msg with 2014 error code ; It means that you are allowed to subscribe to a small scope first and then to a large scope, but you are not allowed to subscribe to a large scope and then continue to subscribe to a small scope, because it is meaningless. A large scope already includes a small scope.

The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

unsubscripting \* is ok under business\_type filled in. when business\_type is swap, unsubscripting \* means to unsubscripting all swap contracts; when business\_type is futures, unsubscripting \* means to unsubscripting all futures contracts;

unsubscription scope must be greater than or equal to the subscription scope and in that it just can be success.

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | value: "notify"; |  |
| topic | string | true | topic subscribed |  |
| ts | long | true | timestamp of server response.unit: millionseconds |  |
| event | string | true | event： "init", "update", "snapshot" |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol,"BTC","ETH"... |  |
| contract\_code | string | true | contract\_code, swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| contract\_size | decimal | true | Contract Value (USDT of one contract). such as 10,100 |  |
| price\_tick | decimal | true | Minimum Variation of Contract Price |  |
| settlement\_date | string | true | settlement date：such as "1490759594752" |  |
| create\_date | string | true | Contract Listing Date ：such as "20180706" |  |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| contract\_status | int | true | contract status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| support\_margin\_mode | string | true | support margin mode cross："cross"；isolated："isolated"；all："all" |  |
| contract\_type | string | true | contract type swap, this\_week, next\_week, quarter, next\_quarter |  |
| pair | string | true | pair such as: “BTC-USDT” |  |
| business\_type | string | true | business type futures, swap |  |
| delivery\_date | string | true | delivery date, empty string when swap , such as: "20180720" |  |
| DATA\_END |  | false |  |  |

Notes:

The websocket subscription of contract info event is pushed every 60 seconds, and the event is "snapshot".

When the subscription is successful, the latest contract information will be pushed immediately, and the event is "init".

After the subscription is successful, when the contract information changes, the latest contract information will be pushed. When multiple fields changes simultaneously, only the latest contract information will be pushed, and the event is update.

When the contract status is "delivery completed", the next settlement time of the contract is an empty string.

Only when the status is 1(Listing), can it be traded normally, other statuses are not tradable;

#### Subscription Example

```
{
  "op": "sub",
  "topic": "public.btc-usdt.contract_info",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.btc-usdt.contract_info",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "public.*.contract_info",
  "ts": 1639122053894,
  "event": "init",
  "data": [
    {
      "symbol": "MANA",
      "contract_code": "MANA-USDT",
      "contract_size": 10,
      "price_tick": 0.0001,
      "settlement_date": "1639123200000",
      "create_date": "20210129",
      "contract_status": 1,
      "support_margin_mode": "all",
      "delivery_time": "",
      "contract_type": "swap",
      "business_type": "swap",
      "pair": "MANA-USDT",
      "delivery_date": ""
    },
    {
      "symbol": "NKN",
      "contract_code": "NKN-USDT",
      "contract_size": 10,
      "price_tick": 0.00001,
      "settlement_date": "1639123200000",
      "create_date": "20210810",
      "contract_status": 1,
      "support_margin_mode": "all",
      "delivery_time": "",
      "contract_type": "swap",
      "business_type": "swap",
      "pair": "NKN-USDT",
      "delivery_date": ""
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "public.BTC-USDT.contract_info",
  "cid": "40sG903yz80oDFWr"
}
```

### trigger\_order.\$contract\_code (\[Isolated\] Subscribe trigger orders updates(sub))

Signature verification: Yes

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: This interface only supports isolated margin mode.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| trigger\_order.\* | trigger\_order.\* | Allowed |
| trigger\_order.contract\_code1 | trigger\_order.\* | Allowed |
| trigger\_order.contract\_code1 | trigger\_order.contract\_code1 | Allowed |
| trigger\_order.contract\_code1 | trigger\_order.contract\_code1 | Not Allowed |
| trigger\_order.\* | trigger\_order.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "\*" all(it means to subscribe the all trigger order) "BTC-USDT"... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | Required;Operator Name，Order push value is notify |  |
| topic | string | true | Required; Order push topic |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| uid | string | true | account uid |  |
| event | string | true | Event notification description | trigger order placed successfully（order），trigger order canceled successfully（cancel），order triggered successfully（trigger\_success），order failed to be triggered（trigger\_fail） |
| DATA\_START | object array | true |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| trigger\_type | string | true | trigger type： ge great than or equal to；leless than or equal to |  |
| volume | decimal | true | trigger order volume |  |
| order\_type | int | true | Transaction Type | 1\. Place orders |
| direction | string | true | order direction | \[buy,sell\] |
| offset | string | true | offset direction | \[open,close,both\] |
| lever\_rate | int | true | Leverage |  |
| order\_id | decimal | true | trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | Order price type | "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |
| status | int | true | order status | 2\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | the price when trigger orders executed |  |
| order\_price | decimal | true | the preset price by the client |  |
| created\_at | long | true | order creation time |  |
| triggered\_at | long | true | the execution time when orders getting triggered |  |
| order\_insert\_at | long | true | the time when the triggered orders filled successfully |  |
| canceled\_at | long | true | Order cancelation time |  |
| fail\_code | string | true | the error code when the triggered orders failed to be filled |  |
| fail\_reason | string | true | the error message with failure reason when triggered orders failed to filled |  |
| margin\_mode | int | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

Notes:

The intermediate states processed by the order status system will not be pushed, such as in the progress of placing an order, The descriptions of specific event notifications are as below:

when the order status is 2（Submitted），event notification is order（trigger order placed successfully）；

when the order status is 4（Order placed successfully），event notification is trigger\_success（trigger order triggered successfully）；

when the order status is 6（Canceled），event notification is cancel（trigger order canceled successfully）；

when the order status is 5（Order failed to be placed），event notification is trigger\_fail（trigger order failed to be triggered）；

Single coin cannot be re-suscribed, and all coins subscription can cover single coin subscription; single coin cannot be subscribed after subscribing all coins.

#### Subscription Example

```
{
  "op": "sub",
  "topic": "trigger_order.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "trigger_order.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "trigger_order.btc-usdt",
  "ts": 1603778055069,
  "event": "order",
  "uid": "123456789",
  "data": [
    {
      "symbol": "BTC-USDT",
      "contract_code": "BTC-USDT",
      "trigger_type": "ge",
      "volume": 1,
      "order_type": 1,
      "direction": "sell",
      "offset": "open",
      "lever_rate": 10,
      "order_id": 5,
      "order_id_str": "5",
      "relation_order_id": "-1",
      "order_price_type": "limit",
      "status": 2,
      "order_source": "web",
      "trigger_price": 15000,
      "triggered_price": null,
      "order_price": 15000,
      "created_at": 1603778055064,
      "triggered_at": 0,
      "order_insert_at": 0,
      "canceled_at": 0,
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "fail_code": null,
      "fail_reason": null,
      "reduce_only": 0
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "trigger_order.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### trigger\_order\_cross.\$contract\_code (\[Cross\] Subscribe trigger orders updates(sub))

Signature verification: No

Interface permission: Read

Rate Limit: WebSocket, the private order push interface, requires API KEY Verification: Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDT contracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is unsub; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| trigger\_order\_cross.\* | trigger\_order\_cross.\* | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.\* | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.contract\_code1 | Allowed |
| trigger\_order\_cross.contract\_code1 | trigger\_order\_cross.contract\_code1 | Not Allowed |
| trigger\_order\_cross.\* | trigger\_order\_cross.contract\_code1 | Not Allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \*(swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | operaton name, fixed as notify |  |
| topic | string | true | topic |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| uid | string | true | uid |  |
| event | string | true | event | order，cancel，trigger\_success，trigger\_fail |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| trigger\_type | string | true | trigger type： ge great than or equal to；le less than or equal to |  |
| volume | decimal | true | place volume |  |
| order\_type | int | true | order type | 1\. Place orders |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | "open", "close" | "open","close",both |
| lever\_rate | int | true | leverage |  |
| order\_id | decimal | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders, The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | type of order price | "limit"，"optimal\_5"，"optimal\_10"，"optimal\_20" |
| status | int | true | order status | 2\. Ready to submit the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | triggered price |  |
| order\_price | decimal | true | order price |  |
| created\_at | long | true | created time |  |
| triggered\_at | long | true | triggered time |  |
| order\_insert\_at | long | true | insert time |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code |  |
| fail\_reason | string | true | fail reason |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

Notes:

The intermediate states processed by the order status system will not be pushed, such as in the progress of placing an order, The descriptions of specific event notifications are as below:

when the order status is 2（Submitted），event notification is order（trigger order placed successfully）；

when the order status is 4（Order placed successfully），event notification is trigger\_success（trigger order triggered successfully）；

when the order status is 6（Canceled），event notification is cancel（trigger order canceled successfully）；

when the order status is 5（Order failed to be placed），event notification is trigger\_fail（trigger order failed to be triggered）；

Single coin cannot be re-suscribed, and all coins subscription can cover single coin subscription; single coin cannot be subscribed after subscribing all coins.

#### Subscription Example

```
{
  "op": "sub",
  "topic": "trigger_order_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "trigger_order.BTC-USDT",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "trigger_order_cross.*",
  "ts": 1639123353369,
  "event": "order",
  "uid": "123456789",
  "data": [
    {
      "contract_type": "swap",
      "pair": "BTC-USDT",
      "business_type": "swap",
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "trigger_type": "le",
      "volume": 1,
      "order_type": 1,
      "direction": "buy",
      "offset": "open",
      "lever_rate": 1,
      "order_id": 918895474461802500,
      "order_id_str": "918895474461802496",
      "relation_order_id": "-1",
      "order_price_type": "limit",
      "status": 2,
      "order_source": "api",
      "trigger_price": 40000,
      "triggered_price": null,
      "order_price": 40000,
      "created_at": 1639123353364,
      "triggered_at": 0,
      "order_insert_at": 0,
      "canceled_at": 0,
      "fail_code": null,
      "fail_reason": null,
      "margin_mode": "cross",
      "margin_account": "USDT",
      "reduce_only": 0
    }
  ]
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "trigger_order_cross.BTC-USDT",
  "cid": "40sG903yz80oDFWr"
}
```

### public.\$contract\_code.contract\_elements (\[General\] Subscribe contract elements (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode，Check the latest contract elements information

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is Sub/Unsubscribe ; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Sub/Unsubscribe Topic Name, format: orders.\$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.\$contract\_code.contract\_elements | public.\$contract\_code.contract\_elements | Allowed (single contract) |
| public.\*.contract\_elements | public.\*.contract\_elements | Allowed (all contracts) |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \* (swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | op |  |
| topic | string | true | topic |  |
| ts | long | true |  |  |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | BTC-USDT... |  |
| mode\_type | int | true | Margin Mode: 1: Isolated margin; 2: Cross margin and isolated margin; 3: Cross margin |  |
| swap\_delivery\_type | int | true | Type of Futures: 1: USDT-M perpetual futures; 2: USDT-M delivery futures; 3: Both of them |  |
| instrument\_index\_code | string | true | index |  |
| real\_time\_settlement | int | true | Whether to enable real-time settlement: 0: No; 1: Yes |  |
| transfer\_profit\_ratio | Number | true | Available coefficient of isolated margin |  |
| cross\_transfer\_profit\_ratio | Number | true | Available coefficient of cross margin |  |
| instrument\_type | list | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| trade\_partition | String | true | trade partition USDT HUSD |  |
| min\_level | int | true | min level |  |
| max\_level | int | true | max level |  |
| settle\_period | int | true | settle period |  |
| funding\_rate\_cap | int | true | funding rate cap |  |
| funding\_rate\_floor | int | true | funding rate floor |  |
| CONTRACT\_INFOS\_START |  | false |  |  |
| contract\_code |  | false |  |  |
| instrument\_type |  | false |  |  |
| settlement\_date | string | true |  |  |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| create\_date | string | true | Listing Date | eg "20190808" |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery\_date | string | true | delivery date, empty string when swap | such as: "20180720" |
| CONTRACT\_INFOS\_START |  | false |  |  |
| long\_position\_limit |  | false | long position limit |  |
| offset\_order\_limit |  | false | offset order limit |  |
| open\_order\_limit |  | false | open order limit |  |
| short\_position\_limit |  | false | short position limit |  |
| PRICE\_TICKS\_START | object array | false | The Minimum Price Change |  |
| business\_type | Integer | true | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures |  |
| price | String | true | The Minimum Price Change |  |
| INSTRUMENT\_VALUES\_START |  | true | contract Face Value |  |
| business\_type | Integer | true | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures |  |
| price | String | true | contract Face Value |  |
| ORDER\_LIMITS\_START | object array | true | The maximum quantity of single order (Cont) |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| open\_after\_closing | String | true | open after closing |  |
| NORMAL\_LIMITS\_START |  | false | Hard Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| OPEN\_LIMITS\_START | object | false | Non-basis Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| TRADE\_LIMITS\_START |  | false | Basis Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| DATA\_END |  | false |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.BTC-USDT.contract_elements"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "public.BTC-USDT.contract_elements",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "event": "init",
  "topic": "public.DOSE-USDT.contract_elements",
  "ts": 1712804933421,
  "data": {
    "contract_code": "DOSE-USDT",
    "funding_rate_cap": "0.007800000000000000",
    "funding_rate_floor": "-0.007600000000000000",
    "mode_type": 2,
    "swap_delivery_type": 3,
    "settle_period": 4,
    "instrument_index_code": "DOSE-USDT",
    "price_ticks": [
      {
        "business_type": 2,
        "price": "0.000010000000000000"
      },
      {
        "business_type": 1,
        "price": "0.000000000100000000"
      }
    ],
    "instrument_values": [
      {
        "business_type": 2,
        "price": "0.000010000000000000"
      },
      {
        "business_type": 1,
        "price": "0.000010000000000000"
      }
    ],
    "min_level": "1",
    "max_level": "74",
    "order_limits": [
      {
        "open_after_closing": "500000000000.000000000000000000",
        "instrument_type": 1,
        "open": "500000000000.000000000000000000",
        "close": "500000000000.000000000000000000"
      },
      {
        "open_after_closing": "500000000000.000000000000000000",
        "instrument_type": 2,
        "open": "500000000000.000000000000000000",
        "close": "500000000000.000000000000000000"
      },
      {
        "open_after_closing": "500000000000.000000000000000000",
        "instrument_type": 3,
        "open": "500000000000.000000000000000000",
        "close": "500000000000.000000000000000000"
      },
      {
        "open_after_closing": "500000000003.000000000000000000",
        "instrument_type": 0,
        "open": "500000000001.000000000000000000",
        "close": "10005000000002.000000000000000000"
      }
    ],
    "normal_limits": [
      {
        "instrument_type": 1,
        "open": "999999.910000000000000000",
        "close": "999999.920000000000000000"
      },
      {
        "instrument_type": 2,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 3,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 0,
        "open": "999999.910000000000000000",
        "close": "999999.920000000000000000"
      }
    ],
    "open_limits": [
      {
        "instrument_type": 1,
        "open": "999999.930000000000000000",
        "close": "999999.940000000000000000"
      },
      {
        "instrument_type": 2,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 3,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 0,
        "open": "999999.930000000000000000",
        "close": "999999.940000000000000000"
      }
    ],
    "trade_limits": [
      {
        "instrument_type": 1,
        "open": "999999.950000000000000000",
        "close": "999999.960000000000000000"
      },
      {
        "instrument_type": 2,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 3,
        "open": "999999.990000000000000000",
        "close": "999999.990000000000000000"
      },
      {
        "instrument_type": 0,
        "open": "999999.950000000000000000",
        "close": "999999.960000000000000000"
      }
    ],
    "real_time_settlement": 0,
    "transfer_profit_ratio": 0,
    "cross_transfer_profit_ratio": 1,
    "instrument_type": [
      1,
      2,
      3,
      0
    ],
    "price_tick": "0.000000000100000000",
    "instrument_value": "0.000010000000000000",
    "trade_partition": "USDT",
    "open_order_limit": "500000000001.000000000000000000",
    "offset_order_limit": "10005000000002.000000000000000000",
    "long_position_limit": "4000001.000000000000000000",
    "short_position_limit": "4000002.000000000000000000",
    "contract_infos": [
      {
        "contract_code": "DOSE-USDT-231027",
        "instrument_type": 1,
        "settlement_date": "1694592000000",
        "delivery_time": "1698393600000",
        "create_date": "20231024",
        "contract_status": 1,
        "delivery_date": "20231027"
      },
      {
        "contract_code": "DOSE-USDT-231103",
        "instrument_type": 2,
        "settlement_date": "1694592000000",
        "delivery_time": "1698998400000",
        "create_date": "20231024",
        "contract_status": 1,
        "delivery_date": "20231103"
      },
      {
        "contract_code": "DOSE-USDT-231229",
        "instrument_type": 3,
        "settlement_date": "1694592000000",
        "delivery_time": "1703836800000",
        "create_date": "20231024",
        "contract_status": 1,
        "delivery_date": "20231229"
      },
      {
        "contract_code": "DOSE-USDT",
        "instrument_type": 0,
        "settlement_date": "1712822400000",
        "delivery_time": "",
        "create_date": "20231024",
        "contract_status": 1,
        "delivery_date": ""
      }
    ]
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "topic": "public.BTC-USDT.contract_elements",
  "cid": "40sG903yz80oDFWr"
}
```

### public.\$service.heartbeat (\[General\]Subscribe system status updates)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/center-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/center-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| service | string | true | Business Code | linear-swap : USDT Margined Contracts |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | Operation name, the fixed value of push is notify; |  |
| topic | string | true | Push topic |  |
| event | string | true | Description on notification related event | The initial system status information returned by a successful subscription (init), triggered by system status change (update) |
| ts | long | true | Server response timestamp |  |
| DATA\_START |  | false |  |  |
| heartbeat | int | true | System Status | 1 is available, 0 is not available(maintenance with service suspended) |
| estimated\_recovery\_time | long | true | Estimated system recovery time, unit: millisecond | When the system status is available, return NULL |

Notes:

Since this push is a poll query status, there may be a delay of 1-2 seconds.

#### Subscription Example

```
{
  "op": "sub",
  "cid": "id generated by client",
  "topic ": "public.linear-swap.heartbeat"
}
```

#### Example of a Successful Subscription

```
{
  "op": "sub",
  "cid": "id generated by client",
  "topic": "public.linear-swap.heartbeat",
  "ts": 1670903745088,
  "err-code": 0
}
```

#### Example of a Data Update

```
{
  "op": "notify",
  "topic": "public.linear-swap.heartbeat",
  "event": "init",
  "ts": 1580815422403,
  "data": {
    "heartbeat": 0,
    "estimated_recovery_time": 1408076414000
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "op": "unsub",
  "cid": "id generated by client",
  "topic ": "public.linear-swap.heartbeat"
}
```