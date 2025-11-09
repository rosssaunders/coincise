# HTX CoinM Private REST API Documentation

## Introduction

### Documentation Summary

Welcome to the HTX Future API! You can use our API to access all market data,
trading, and account management endpoints.

We have code example in Shell! You can view code examples in the dark area to
the right.

You can use the drop down list above to change the API version. You can also use
the language option at the top right to switch documentation language.

### Market Maker Program

Market maker program gives clients with good market making strategy an
opportunity to access customized trading fee structure.

Market makers will not be able to use point cards, VIP rate, rebate or any other
fee promotion.

#### Eligibility Criteria as a Market Maker on HTX Future

Welcome users, who are dedicated to maker strategy and have created large
trading volume, to participate in HTX Futures long-term Market Maker project.If
you have more than 3 BTC in your HTX future account, or more than 3 BTC in your
HTX coin margined swap account, or more than 100000 USDT in your HTX USDT
Margined Contracts account, please send the following information to
Vip@global-hgroup.com :

1.  HTX UIDs (not linked to any rebate program in any accounts)
2.  Provide screenshot of trading volume for the past 30 days or VIP/corporate
    status with other Exchanges

More detail in here:
[HTX Coin-Margined Futures Market Maker Preferential Policy](https://www.huobi.com/support/en-us/detail/360000224641)

### Colocation

#### Solution Architecture

HTX futures API colocation solution is built on AWS infrastructure. Client will
connect via AWS “PrivateLink” to access HTX’s services directly through fast AWS
connection without being routed to public networks.

#### Performance Improvement

The network delay of colocation solution is estimated to be 10ms to 50ms faster
than the ordinary connection. This improvement estimated should be used as a
guidance only as the actual improvement depends on many factors.

#### Eligibility

Colocation is only available to higher tier market makers. To check if your
account is eligible please talk to your dedicated account manager.

#### Setting

Detail in here:
[HTX Futures Colocation](https://github.com/hbdmapi/huobi_colocation/blob/main/Huobi%20Futures%20Colocation.pdf)

### Risk Mechanism

#### Partial Liquidation

Margin ratio is an indicator to estimate the risk of users’assets. When the
margin ratio is less than or equal to 0%, liquidation will be triggered.

It is recommended that you pay close attention to margin ratio changes, so as to
avoid your positions from liquidation.

HTX contracts implement a partial liquidation mechanism, in which the system
will lower the corresponding tier of an adjustment factor to avoid your
positions from being liquidated at one time.

More detail to see:
[Partial Liquidation of Futures](https://www.huobi.com/support/en-us/detail/360000143042)

#### Insurance Funds and Clawback Mechanism

Insurance funds are designed to cover the losses from forced liquidation.

In a fluctuating market, users’ positions may be liquidated. When the order
cannot be filled at the takeover price, resulting in huge losses that are
greater than the part insurance funds can undertake, the platform will implement
the “clawback” mechanism. Each profitable account in the current period
compensates the over loss of liquidation according to its profit ratio.

More detail in here:
[Partial Liquidation of Futures](https://www.huobi.com/support/en-us/detail/360000143042)

#### Tiered Adjustment Factor

The adjustment factor is designed to prevent users from extended margin call
loss. HTX Contracts use a tiered adjustment factor mechanism, which supports up
to five tiers based on the position amount.

For contracts with different expirations under the different account modes, they
are separately calculated. The larger the use’s net positions, the higher the
tier, and the greater the risk.

More detail in here:
[Tiered Adjustment Factors of Coin-margined Futures](https://www.huobi.com/support/en-us/detail/360000293121)

### Matching Mechanism

1.  Matching System: Order accepted by the Order System will enter the Matching
    System. Once orders are matched/filled, the settlement service will be
    executed and the matching result will be returned to the Order System;
    otherwise, the unfilled orders will go into the order book for matching.
2.  Price Priority: Higher-priced buy orders have priority over lower-priced buy
    orders; the reverse is true, lower-priced sell orders have priority over
    higher-priced sell orders.
3.  Time Priority: Buy orders at the same price are executed according to the
    time of entry to the Server.
4.  When the highest bid price is the same as the lowest ask price of the order
    book, this price is what we call transaction price.
5.  When the bid price is higher than the lowest ask price of the order book up
    to the minute, the lowest ask price will be the transaction price.
6.  When the ask price is lower than the highest bid price of the order book up
    to the minute, the highest bid price will be the transaction price.

## Future API Access Illustration

### API List

| permission type | Content Type | Context                                     | Request Type | Desc                                                                                   | Signature Required |
| --------------- | ------------ | ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------- | ------------------ |
| Read            | Market Data  | /api/v1/contract_contract_info              | GET          | Get Contracts Information                                                              | No                 |
| Read            | Market Data  | /api/v1/contract_index                      | GET          | Get contract Index Price Information                                                   | No                 |
| Read            | Market Data  | /api/v1/contract_price_limit                | GET          | Get Contract Price Limitation                                                          | No                 |
| Read            | Market Data  | /api/v1/contract_open_interest              | GET          | Get Contract Open Interest Information                                                 | No                 |
| Read            | Market Data  | /api/v1/contract_delivery_price             | GET          | Get the estimated delivery price                                                       | No                 |
| Read            | Market Data  | /api/v1/contract_api_state                  | GET          | Query information on system status                                                     | No                 |
| Read            | Market Data  | /market/depth                               | GET          | Get Market Depth                                                                       | No                 |
| Read            | Market Data  | /market/bbo                                 | GET          | Get Market BBO Data                                                                    | No                 |
| Read            | Market Data  | /market/history/kline                       | GET          | Get Kline Data                                                                         | No                 |
| Read            | Market Data  | /index/market/history/mark_price_kline      | GET          | Get Kline Data of Mark Price                                                           | No                 |
| Read            | Market Data  | /market/detail/merged                       | GET          | Get Market Data Overview                                                               | No                 |
| Read            | Market Data  | /market/detail/batch_merged                 | GET          | Get a Batch of Market Data Overview                                                    | No                 |
| Read            | Market Data  | /v2/market/detail/batch_merged              | GET          | Get a Batch of Market Data Overview(V2)                                                | No                 |
| Read            | Market Data  | /market/trade                               | GET          | Query The Last Trade of a Contract                                                     | No                 |
| Read            | Market Data  | /market/history/trade                       | GET          | Query a Batch of Trade Records of a Contract                                           | No                 |
| Read            | Market Data  | /api/v1/contract_risk_info                  | GET          | Query information on contract insurance fund balance and estimated clawback rate       | No                 |
| Read            | Market Data  | /api/v1/contract_insurance_fund             | GET          | Query history records of insurance fund balance                                        | No                 |
| Read            | Market Data  | /api/v1/contract_adjustfactor               | GET          | Query information on Tiered Adjustment Factor                                          | No                 |
| Read            | Market Data  | /api/v1/contract_his_open_interest          | GET          | Query information on open interest                                                     | No                 |
| Read            | Market Data  | /api/v1/contract_elite_account_ratio        | GET          | Query Top Trader Sentiment Index Function-Account                                      | No                 |
| Read            | Market Data  | /api/v1/contract_elite_position_ratio       | GET          | Query Top Trader Sentiment Index Function-Position                                     | No                 |
| Read            | Market Data  | /api/v1/contract_liquidation_orders         | GET          | Query Liquidation Order Information                                                    | No                 |
| Read            | Market Data  | /api/v1/contract_settlement_records         | GET          | Query historical settlement records of the platform interface                          | No                 |
| Read            | Market Data  | /index/market/history/index                 | GET          | Query Index Kline Data                                                                 | No                 |
| Read            | Market Data  | /index/market/history/basis                 | GET          | Query Basis Data                                                                       | No                 |
| Read            | Market Data  | /api/v1/contract_estimated_settlement_price | GET          | Get the estimated settlement price                                                     | No                 |
| Read            | Market Data  | /api/v1/contract_ladder_margin              | GET          | Query information on Tiered Margin                                                     | No                 |
| Read            | Account      | /api/v1/contract_balance_valuation          | POST         | Query Asset Valuation                                                                  | Yes                |
| Read            | Account      | /api/v1/contract_account_info               | POST         | Query User’s Account Information                                                       | Yes                |
| Read            | Account      | /api/v1/contract_position_info              | POST         | Query User’s Position Information                                                      | Yes                |
| Trade           | Account      | /api/v1/contract_sub_auth                   | POST         | Set a Batch of Sub-Account Trading Permissions                                         | Yes                |
| Read            | Account      | /api/v1/contract_sub_account_list           | POST         | Query assets information of all sub-accounts under the master account (Query by coins) | Yes                |
| Read            | Account      | /api/v1/contract_sub_account_info_list      | POST         | Query a Batch of Sub-Account's Assets Information                                      | Yes                |
| Read            | Account      | /api/v1/contract_sub_account_info           | POST         | Query a single sub-account's assets information                                        | Yes                |
| Read            | Account      | /api/v1/contract_sub_position_info          | POST         | Query a single sub-account's position information                                      | Yes                |
| Read            | Account      | /api/v1/contract_financial_record           | POST         | Query account financial records                                                        | Yes                |
| Read            | Account      | /api/v1/contract_financial_record_exact     | POST         | Query financial records via multiple fields                                            | Yes                |
| Read            | Account      | /api/v1/contract_user_settlement_records    | POST         | Query user’s settlement records                                                        | Yes                |
| Read            | User Account | /api/v1/contract_order_limit                | POST         | Query contract information on order limit                                              | Yes                |
| Read            | User Account | /api/v1/contract_available_level_rate       | POST         | Query contract available level rate                                                    | Yes                |
| Read            | User Account | /api/v1/contract_fee                        | POST         | Query information on contract trading fee                                              | Yes                |
| Read            | User Account | /api/v1/contract_transfer_limit             | POST         | Query information on Transfer Limit                                                    | Yes                |
| Read            | User Account | /api/v1/contract_position_limit             | POST         | Query information on position limit                                                    | Yes                |
| Trade           | User Account | /api/v1/contract_master_sub_transfer        | POST         | Transfer between master and sub account                                                | Yes                |
| Read            | User Account | /api/v1/contract_account_position_info      | POST         | User’s position Information And User’s position Information                            | Yes                |
| Read            | Trade        | /api/v1/contract_trigger_openorders         | POST         | Query Trigger Order Open Orders                                                        | Yes                |
| Read            | Trade        | /api/v1/contract_trigger_hisorders          | POST         | Query Trigger Order History                                                            | Yes                |
| Trade           | Trade        | /api/v1/contract_order                      | POST         | Place an Order                                                                         | Yes                |
| Trade           | Trade        | /api/v1/contract_batchorder                 | POST         | Place a Batch of Orders                                                                | Yes                |
| Trade           | Trade        | /api/v1/contract_cancel                     | POST         | Cancel an Order                                                                        | Yes                |
| Trade           | Trade        | /api/v1/contract_cancelall                  | POST         | Cancel All Orders                                                                      | Yes                |
| Trade           | Trade        | /api/v1/contract_switch_lever_rate          | POST         | Switch Leverage                                                                        | Yes                |
| Trade           | Trade        | /api/v1/lightning_close_position            | POST         | Place Flash Close Order                                                                | Yes                |
| Read            | Trade        | /api/v1/contract_order_info                 | POST         | Get Information of an Order                                                            | Yes                |
| Read            | Trade        | /api/v1/contract_order_detail               | POST         | Get Trade Details of an Order                                                          | Yes                |
| Read            | Trade        | /api/v1/contract_openorders                 | POST         | Get Current Orders                                                                     | Yes                |
| Read            | Trade        | /api/v1/contract_hisorders                  | POST         | Get History Orders                                                                     | Yes                |
| Read            | Trade        | /api/v1/contract_hisorders_exact            | POST         | Query history orders via multiple fields                                               | Yes                |
| Read            | Trade        | /api/v1/contract_matchresults               | POST         | Get History Match Results                                                              | Yes                |
| Read            | Trade        | /api/v1/contract_matchresults_exact         | POST         | Query history transactions via multiple fields                                         | Yes                |
| Trade           | Trade        | v1/futures/transfer                         | POST         | Transfer margin between Spot account and Future account                                | Yes                |
| Trade           | Strategy     | /api/v1/contract_trigger_order              | POST         | Place Trigger Order                                                                    | Yes                |
| Trade           | Strategy     | /api/v1/contract_trigger_cancel             | POST         | Cancel Trigger Order                                                                   | Yes                |
| Trade           | Strategy     | /api/v1/contract_trigger_cancelall          | POST         | Cancel All Trigger Orders                                                              | Yes                |
| Trade           | Strategy     | /api/v1/contract_tpsl_order                 | POST         | Set a Take-profit and Stop-loss Order for an Existing Position                         | Yes                |
| Trade           | Strategy     | /api/v1/contract_tpsl_cancel                | POST         | Cancel a Take-profit and Stop-loss Order                                               | Yes                |
| Trade           | Strategy     | /api/v1/contract_tpsl_cancelall             | POST         | Cancel all Take-profit and Stop-loss Orders                                            | Yes                |
| Read            | Strategy     | /api/v1/contract_tpsl_openorders            | POST         | Open take-profit and stop-loss orders                                                  | Yes                |
| Read            | Strategy     | /api/v1/contract_tpsl_hisorders             | POST         | Take-profit and stop-loss histoty orders                                               | Yes                |
| Read            | Strategy     | /api/v1/contract_relation_tpsl_order        | POST         | Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order   | Yes                |
| Trade           | Strategy     | /api/v1/contract_track_order                | POST         | Place a Trailing Order                                                                 | Yes                |
| Trade           | Strategy     | /api/v1/contract_track_cancel               | POST         | Cancel a Trailing Order                                                                | Yes                |
| Trade           | Strategy     | /api/v1/contract_track_cancelall            | POST         | Cancel All Trailing Order                                                              | Yes                |
| Read            | Strategy     | /api/v1/contract_track_openorders           | POST         | Current unfilled trailing order acquisition                                            | Yes                |
| Read            | Strategy     | /api/v1/contract_track_hisorders            | POST         | Get History Trailing Orders                                                            | Yes                |

### Address

| Address              | Applicable sites | Applicable functions | Applicable trading pairs             |
| -------------------- | ---------------- | -------------------- | ------------------------------------ |
| https://api.hbdm.com | HTX Future       | Market               | Trading pairs provided by HTX Future |

#### Notice

If you can't connect "https://api.hbdm.com", please use
"https://api.btcgateway.pro" for debug purpose. If your server is deployed in
AWS, we recommend using "https://api.hbdm.vn".

### Signature Authentication & Verification

#### Signature Illustration

Considering that API requests may get tampered in the process of transmission,
to keep the transmission secure, you have to use your API Key to do Signature
Authentication for all private interface except for public interface (used for
acuqiring basic information and market data), in this way to verify whether the
parameters/ parameter value get tampered or not in the process of transmission

A legitimate request consists of following parts：

- Request address of method, i.e. visit server address--api.hbdm.com, e.g.:
  api.hbdm.com/api/v1/contract_order
- API Access Key ID (AccessKeyId): Access Key of the API Key that you apply.
- Method of Signature (SignatureMethod): The first one is for users to use the
  elliptic curve digital signature algorithm, using Ed25519. ‌The second,
  hash-based protocol for user-computed signatures, uses HmacSHA256.
- Ed25519 introduction: It is a high-performance digital signature algorithm
  that provides fast signature verification and generation while having high
  security.
- Signature Version (SignatureVersion): It adopts version 2 in terms of
  Signature Version.
- Timestamp (Timestamp): The time when you send the request (UTC time zone) :
  (UTC time zone) : (UTC time zone), e.g.: 2017-05-11T16:22:06
- Must-fill parameters & optional parameters: For each method, there are a group
  of must-fill parameters and optional parameters used to address the API
  request, which can be found in the illustration of each method as well as
  their meaning. Please note that, in terms of "Get" requests, it needs to do
  Signature calculation for all the original parameters in each method ; In
  terms of "Post" requests, no need to do Signature calculation for the original
  parameters in each method, which means only four parameters need to do
  Signature calculation in "Post" requests, i.e. AccessKeyId, SignatureMethod,
  SignatureVersion, Timestamp with other parameters placed in "body".
- Signature: The result of Signature calculation which is used to verify if
  signature is valid and not tampered.

#### Create API Key

[You could create API Key at](https://www.hbg.com/zh-cn/apikey/)

API Key consists of the following two parts.

- "Access Key", the Key used to visit API.
- "Secret Key", the Key used to do Signature authentication and verification
  (visible during application period).

When create API Key, users could bind IP address, as the validity of unbond IP
address is only 90 days.

API Key has operation authorization of trading, borrowing, deposit and
withdrawal etc..

Both Access Key and Secret Key are closely related with account security, please
do not disclose them to others for any reasons anytime.

#### Ed25519 Steps for Signature

Normative request for Signature calculation Different contents will get totally
different results when use HMAC to calculate Signature, therefore, please
normalize the requests before doing Signature calculation. Take the request of
inquering order details as an example:

query details of one order

`[https://api.hbdm.com/api/v1/contract_order](https://api.hbdm.com/api/v1/contract_order)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=Ed25519`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

#### 1\. Request methods (GET/POST): add line breaker "\\n".

`POST\n`

#### 2\. Text the visit address in lowercase, adding line breake "\\n"

`[api.hbdm.com](http://api.hbdm.com)\n`

#### 3\. Visit the path of methods, adding line breaker "\\n"

`/api/v1/contract_order\n`

#### 4\. Rank the parameter names according to the sequence of ASCII codes, for example, below is the parameters in original sequence and the new sequence:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 to encode when it has already been encoded by URI with hexadecimals in
Uppercase, e.g., ":" wiil be encoded to "%3A" while space to "%20".Timestamp
should be written in the form of YYYY-MM-DDThh:mm:ss and encoded with URI.

#### 5\. After ranking

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

#### 6\. Following the sequence above, link parameters with "&"

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 7\. Form the final character strings that need to do Signature calculation as following:

`POST\n`

`[api.hbdm.com](http://api.hbdm.com)\n`

`/api/v1/contract_order\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 8\. Use the "request character strings" formed in the last step and your Secret Key to create a digital Signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

1.  Use the request string obtained in the previous step to generate the private
    key of Ed25519 and add it to generate a signature.
2.  Encode the generated signature with base-64, and the resulting value is used
    as the digital signature of this interface call.

#### 9\. Add the digital Signature into the parameters of request path.

The final request sent to Server via API should be like:

`https://api.hbdm.com/api/v1/contract_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D`

1.  Add all the must authentication parameters into the parameters of request
    path;
2.  Add the digital Signature encoded with URL code into the path parameters
    with the parameter name of "Signature".

#### HmacSHA256 Steps for Signature

Normative request for Signature calculation Different contents will get totally
different results when use HMAC to calculate Signature, therefore, please
normalize the requests before doing Signature calculation. Take the request of
inquering order details as an example:

query details of one order

`[https://api.hbdm.com/api/v1/contract_order](https://api.hbdm.com/api/v1/contract_order)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=HmacSHA256`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

#### 1\. Request methods (GET/POST): add line breaker "\\n".

`POST\n`

#### 2\. Text the visit address in lowercase, adding line breake "\\n"

`[api.hbdm.com](http://api.hbdm.com)\n`

#### 3\. Visit the path of methods, adding line breaker "\\n"

`/api/v1/contract_order\n`

#### 4\. Rank the parameter names according to the sequence of ASCII codes, for example, below is the parameters in original sequence and the new sequence:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 to encode when it has already been encoded by URI with hexadecimals in
Uppercase, e.g., ":" wiil be encoded to "%3A" while space to "%20".Timestamp
should be written in the form of YYYY-MM-DDThh:mm:ss and encoded with URI.

#### 5\. After ranking

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

#### 6\. Following the sequence above, link parameters with "&"

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 7\. Form the final character strings that need to do Signature calculation as following:

`POST\n`

`[api.hbdm.com](http://api.hbdm.com)\n`

`/api/v1/contract_order\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 8\. Use the "request character strings" formed in the last step and your Secret Key to create a digital Signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

1.  Take the request character string formed in the last step and API Secret Key
    as two parameters, encoding them with the Hash Function HmacSHA256 to get
    corresponding Hash value.
2.  Encoding the Hash value with base-64 code, the result will be the digital
    Signature of this request.

#### 9\. Add the digital Signature into the parameters of request path.

The final request sent to Server via API should be like:

`[https://api.hbdm.com/api/v1/contract_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D](https://api.hbdm.com/api/v1/contract_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D)`

1.  Add all the must authentication parameters into the parameters of request
    path;
2.  Add the digital Signature encoded with URL code into the path parameters
    with the parameter name of "Signature".

### API Rate Limit Illustration

Future, Coin Margined Swap and USDT Margined Contracts are using separate API
rate limits.

Please note that, for both public interface and private interface, there are
rate limits, more details are as below:

- Generally, the private interface rate limit of API key is at most 72 times
  every 3 seconds for each UID (Trade Interface: at most 36 times every 3
  seconds. Read Interface: at most 36 times every 3 seconds) (this rate limit is
  shared by all the altcoins contracts delivered by different date).
  [API Interface List](https://docs.huobigroup.com/docs/dm/v1/en/#api-list)
- For public interface used to get information of index, price limit,
  settlement, delivery, open positions and so on, the rate limit is 120 times
  every 3 seconds at most for each IP (this 120 times every 3 seconds public
  interface rate limit is shared by all the requests from that IP of
  non-marketing information, like above).
- For public interface to get market data such as Get Kline data, Get Market
  Data Overview, Get Contract Information,Get market depth data, Get index
  kline, Get basis data, Get the last Trade of a Contract and so on：

  (1) For restful interfaces：all products(futures, coin margined swap, usdt
  margined Contracts ) 800 times/second for one IP at most

  （2）For websocket: The rate limit for “req” request is 50 times at once. No
  limit for “sub” request as the data will be pushed by sever voluntarily.

- WebSocket, the private order push interface, requires API KEY Verification:

  Each UID can build at most create 30 WS connections for private order push at
  the same time. For each account, contracts of the same underlying coin only
  need to subscribe one WS order push, e.g. users only need to create one WS
  order push connection for BTC Contract which will automatically push orders of
  BTC weekly, BTC biweekly and BTC quarterlycontracts. Please note that the rate
  limit of WS order push and RESTFUL private interface are separated from each
  other, with no relations.

- Both read and trade interfaces will return the ratelimit info.You can refer to
  the following fields of "header" from api response. E.g.,you will get the
  total Read ratelimit("ratelimit-limit") and the remaining Read
  ratelimit("ratelimit-remaining") when you query the order
  info(/api/v1/contract_order_info) , and you will get the total Trade
  ratelimit("ratelimit-limit") and the remaining Trade
  ratelimit("ratelimit-remaining") when you place an
  order(/api/v1/contract_order)).
  [API Interface List](https://docs.huobigroup.com/docs/dm/v1/en/#api-list)
- Will response following string for "header" via api:

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

### API Limitation on Order Cancellation Ratio

- The system will calculate the order cancellation ratio automatically when the
  total number of orders placed via certain order price types by the API user
  goes equal to or larger than 3,000 within 10 minutes. If the order
  cancellation ratio is greater than 99%, the user will be prohibited for 5
  minutes from placing orders via certain API order price types which will be
  listed below (The response of placing orders will return: 1084 Your contract
  API is disabled, please try again after {0} (GMT+8).).
- A 30-minute API order placement prohibition will be triggered if the user was
  prohibited for 3 times within an hour (The response of placing orders will
  return: 1084 Your contract API is disabled, please try again after {0}
  (GMT+8).). After resuming access, the total number of prohibited times will be
  cleared during the previous period and will not be counted into the total
  prohibited times in the new period.
- Please note that the prohibition from placing orders will cause no effect on
  order cancellation via API as well as order placement and cancellation via
  other terminals. We’ll keep you notified on each prohibition via SMS and
  email.
- Only four API order price types will be prohibited which are Limit order,
  Post_only, FOK and IOC. Please note that you can still use freely other order
  price types during the banned period, such as Flash Close, BBO, Optimal 5,
  Optimal 10 and Optimal 20, opponent_ioc, lightning_ioc, optimal_5_ioc,
  optimal_10_ioc，optimal_20_ioc，opponent_fok，lightning_fok，optimal_5_fok，optimal_10_fok，optimal_20_fok,etc.
- The response header returned by HTTP request:
  - When placing order by using the four prohibited order price types during the
    prohibition period, the message header returned by interface will include
    the field:
  - "recovery-time": recovery timestamp ,whose unit is millisecond, showing the
    end time of prohibition, or the access retrieval timestamp;
  - if you are not in the prohibition period, the field is not included in
    returned header;

- Please note that our system calculates order cancellation ratio according to
  UID and therefore, the master account UID and sub-accounts UIDs will be
  counted separately. The calculation period is 10 min/time(The start time
  starts at 00:00 and the end time is 00:10. Every 10 minutes is a cycle.).
- Definition of Indicators：
  - Order Cancellation Ratio =Total number of invalid cancellation / Total
    number of placed orders (all types of orders placed via API)
  - Total number of placed order: Total number of placed orders refers to all
    orders placed via API which meet these requirements:
  - 1.the order type is placing orders (Order Type = 1),
  - 2.order price types include Limit Order, Post_only, FOK and IOC.
  - 3.order creating time should be within the interval between 3 seconds before
    the start time of the calculation period and the end time of the calculation
    period.
  - Total number of invalid cancellation:Total number of invalid cancellation
    refers to all cancellation orders placed via API which meet the
    requirements.
  - the order type is placing orders (order Type=1),
  - the order price types are Limit Order, post_only, FOK and IOC.
  - the order status is “Orders cancelled” (status=7).
  - order with 0 fulfilled.
  - the interval between order cancellation and placement should be less than or
    equal to 3 seconds.
  - the order cancellation time should be within the calculation period.

- In order to ensure stability and transaction performance of API, please try to
  reduce order cancellation rate and cancellation amount during peak periods to
  avoid frequent triggering of API restriction mechanism.Suggestions of reducing
  order cancellation rate are as below:
  - 1\. Set orders’ price to BBO prices as close as possible;
  - 2\. Prolong the interval properly between each order placement and
    cancellation;
  - 3\. Try to increase your amount for each order and reduce the frequency of
    order;
  - 4\. Try to improve your order fulfillment rate:
  - （1）Please try to use order prices types that help more on order
    fulfillment in preference such as BBO, Optimal 5, Optimal 10, Optimal 20,
    Flash Close, opponent_ioc, lightning_ioc, optimal_5_ioc,
    optimal_10_ioc，optimal_20_ioc，opponent_fok，lightning_fok，optimal_5_fok，optimal_10_fok，optimal_20_fok,
    etc.
  - （2）Try to use best bid/ask price when placing IOC orders, FOK orders and
    Post_only orders.
  - 5\. Please try to extend your request polling cycle when implementing your
    strategy.

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

#### 1\. Query contract history orders interface: /api/v1/contract_hisorders

- To ensure timeliness and to reduce latency, users are highly recommended to
  get contract history orders information faster from server memory using
  interface “query contract order information” (URL:
  api/v1/contract_order_info).
- For users who use interface “query contract history orders” (URL:
  /api/v1/contract_hisorders), please enter as many query conditions as possible
  (including symbol, trade_type（recommended to send “0” to query all）, type,
  status, create_date). Besides, try not to enter a big integer in parameter
  “create_date”. You are kindly suggested to query one-day data at a time.

#### 2\. Query contract match results interface: /api/v1/contract_matchresults

- To improve query performance and response speed, please enter as many querying
  conditions as possible (including symbol, trade_type（recommended to send “0”
  to query all）, contract_code, create_date). Besides, try not to enter a big
  integer in parameter “create_date”. You are kindly suggested to query one-day
  data at a time.

#### 3\. Query contract financial record interface: /api/v1/contract_financial_record

- To improve query performance and response speed, please enter as many querying
  conditions as possible (including symbol, type(recommended to leave it blank
  to query all), create_date). Besides, try not to enter a big integer in
  parameter “create_date”. You are kindly suggested to query one-day data at a
  time.

#### 4\. Query contract order detail interface: /api/v1/contract_order_detail

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

#### 5\. Query contract trigger order history orders interface:

- /api/v1/contract_trigger_hisorders
- To improve query performance and response speed, please enter as many
  parameters as possible (including symbol, contract_code, trade_type, status,
  create_date). Besides, try not to enter a big integer in parameter
  “create_date”. You are kindly suggested to query one-day data at a time.

#### 6\. WebSocket subscription to Market Depth data:

- For acquiring market depth data within 150 steps, you are kindly suggested to
  use step0, step1, step2, step3, step4, step5, step14, step15；
- For acquiring market depth data within 20 steps, you are kindly suggested to
  use step6, step7, step8, step9, step10, step11, step12, step13；
- Since the large volume of pushing 150 steps data every 100ms, WebSocket
  disconnection may occur frequently if client’s network bandwidth is
  insufficient or the processing is not in time; therefore, we highly recommend
  users using step6, step7, step8, step9, step10, step11, step12, step13 to
  acquire 20 steps data. For instance, subscribing 20 steps data.

`{`

`"sub": "market.BTC_CQ.depth.step6",`

`"id": "id5"`

`}`

- We also suggest that you subscribe incremental market depth data.orderbook
  event will be checked every 30ms. If there is no orderbook event, you will not
  receive any orderbook data.you HAVE TO maintain local orderbook data,such as
  updating your local orderbook bids and asks data.You can subscribe 20 or 150
  unmerged data.

`{`

`"sub": "market.BTC_CQ.depth.size_20.high_freq",`

`"data_type":"incremental",`

`"id": "id1"`

`}`

#### 7\. Place order interface (URL: /api/v1/contract_order) and place a batch of orders interface (URL:/api/v1/contract_batchorder):

- We recommend to fill in the parameter “client_order_id”(should be unique from
  user-side),which can help users to acquire order status and other order
  information according to the parameter “client_order_id" from
- query order information interface (URL: /api/v1/contract_order_info ) when
  there is no returned information due to network or other problems.

#### 8\. The best deployment of program server

- It is recommended that place the server in AWS Tokyo C zone and use the
  api.hbdm.vn domain, which can effectively reduce network disconnection and
  network timeout.

## Future API FAQ

### Access and Authentication

#### Q1: Is the API Key for future and spot the same ?

Yes. The future API key and spot API key are same. You can create API using the
following link. [click here](https://www.hbg.com/zh-cn/apikey/)

#### Q2: Why are APIs disconnected or timeout?

1.  The network connection is unstable if the server locates in China
    mainland,it is suggested to invoke APIS from a server located in 1c area of
    AWS Tokyo.
2.  You can use api.btcgateway.pro to debug for domestic network.

#### Q3: Why is the websocket often disconnected?

It seems that most of the abnormal websocket issues (such as disconnect,
websocket close )(websocket: close 1006 (abnormal closure))are caused by
different network environment. The following measures can effectively reduce
websocket issues.

It would be better if the server is located in 1c area of AWS Tokyo with url
api.hbdm.vn and implement websocket re-connection mechanism. Both market
heartbeat and order heartbeat should response with Pong with different format,
following Websocket market heartbeat and account heartbeat
requirement.[here](https://docs.huobigroup.com/docs/dm/v1/en/#websocket-heartbeat-and-authentication-interface)

#### Q4: What is the difference between api.hbdm.com and api.hbdm.vn?

The api.hbdm.vn uses AWS's CDN service. it should be more stable and faster for
AWS users. The api.hbdm.com uses Cloudflare's CDN service.

#### Q5: What is the colocation service ? which attention points should we know ?

Actually ,colo corresponds to a vpc node, which directly connects to private
network of HTX's future, so it will reduce the latency between the client and
the HTX future server (bypassing the CDN)

HTX future and HTX swap have the same colo, so the domain name connecting the
swap api and the future api are the same.

Note : Colo needs to use api.hbdm.com for signature(authentication) to avoid
getting 403 error: Verification failure.

#### Q6: Why does signature verification return failure (403: Verification failure) ?

The signature process of future is similar to HTX Spot . In addition to the
following precautions,please refer to the swap or spot demo to verify whether
the signature is successful. Please check your own signature code after demo
verification is successful. The coin margined swap code demo is
[here](https://docs.huobigroup.com/docs/coin_margined_swap/v1/en/#code-demo).
The future code demo is
[here](https://docs.huobigroup.com/docs/dm/v1/en/#code-demo). The USDT Margined
Contracts code demo is
[here](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#code-demo).

1.  Check if the API key is valid and copied correctly.
2.  Check if the IP is in whitelist
3.  Check if th timestamp is UTC time
4.  Check if parameters are sorted alphabetically
5.  Check if the encoding is UTF-8
6.  Check if the signature has base64 encoding
7.  Any method with parameters for GET requests should be signed.
8.  Any method with parameters for POST requests don't need to be signed.
9.  Check if whether the signature is URI encoded and Hexadecimal characters
    must be capitalized, such as ":" should be encoded as "%3A", and the space
    should be encoded as "%20"
10. The authorization of websocket is similar to the authorization of restful
    interface.Pls note that the json body of the websocket authorization
    shouldn't be URL encoded.
11. The host in signature text should be the same as the host in your API
    request.The proxy may change the request host, you can try without
    proxy;Some http/websocket library may include port in the host, you can try
    to append port in signature host, like "api.hbdm.com:443"
12. The hidden text in API Key and Secret Key may have impact on the signature.
13. Check the byte\[\] is directly to be Base64 encoded after generated from the
    HmacSHA256 signature, instead of hexadecimal string to be Base64 encoded.

If the reason for signature failure has not been found through the above
methods. And you can confirm that by this
[demo](https://github.com/hbdmapi/huobi_api_rules) which is specially explaining
the signature.

#### Q7: Is the ratelimit of public market based on IP ? Is the ratelimit of interface with private key based on UID?

Yes. The ratelimit of interface with private key is based on the UID, not the
API key. The master and sub accounts are separately ratelimited and don't affect
each other.

#### Q8: Is there any recommendation for third-party framework which integrates HTX future?

There is an open source asynchronous quantization framework which integrates HTX
future and HTX swap: [here](https://github.com/hbdmapi/hbdm_Python). If you have
any quetsions, please open a ticket in github issues.

### Delivery and Settlement

#### Q1: What is the future settlement cycle? Which interface can be used to check the status when the future is settled?

Orders can't be placed or cancelled during settlement period, error code "1056"
will be returned if users place or cancel orders.

You are recommended to request contract information by this two ways:

- restful, every few seconds during settlement period to access:
  /api/v1/contract_contract_info.
- websocket, Subscribe Contract Info (no authentication):
  public.\$symbol.contract_info

It's in settlement time if there is any number of 5, 6, 7, 8 included in the
returned status code of contract_status, while it indicates that settlement
completed and users could place and cancel orders as usual if the returned
status code is 1.

Kindly remind you that the delivery contract will be settled every day at 16:00
Singapore time or be deliveried at 16:00 on Friday. Inquiry about funds and
positions during settlement or delivery will return an error code.

Error codes and their meaning are as following:

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
Information of an Order” interface ( /api/v1/contract_contract_info)

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

### Market and Websocket

#### Q1: How often are the snapshot orderbook subscription and incremental orderbook subscription pushed?

The snapshot orderbook subscription(market.\$symbol.depth.\$type) is checked
once every 100MS.If there is an update,it will be pushed. It will be pushed at
least 1 second.The incremental orderbook subscription is checked once every
30MS.If there is an update,it will be pushed.If there is no update, it will not
be pushed.

#### Q2: How often is the market trade subscription pushed?

The market trade subscription will be pushed when there is a transaction.

#### Q3: Are there historical Kline data or historical market trade data?

The historical kline data can be obtained via API interface
/market/history/kline with the request params from, to (the time period cannot
exceed two years). And the qty of data records cannot be exceeding 2000 in each
time.

The historical trade data can be obtained by subscribing the websocket topic:
market.\$symbol.trade.detail

or can be downloaded from
[download historical market data](https://futures.huobi.be/zh-cn/data/landing_page)

But also, you can download that data using
[The demo of downloading historical market data](https://github.com/hbdmapi/huobi_public_data)

#### Q4: How to get MACD and other technical indicators on Kline?

The API does not have interfaces to get technical indicators such as MACD. You
can refer to TradingView and other websites to calculate them.

#### Q5: What is the definition of timestamp in the document?

The timestamp in the document refers to the total number of seconds or total
milliseconds from Greenwich Mean Time, January 1, 1970, 00:00:00 (Beijing Time,
January 1, 1970, 08:00:00) to the present.

#### Q6: What is the definition of the 150 level and 20 level of MBP?

The Subscription of MBP data: market.\$symbol.depth.\$type.150 price level means
the current bids and asks splited into 150 level by price.20 price level means
the current bids and asks splited into 20 level by price.

#### Q7: What is the meaning of merged depth when subscribing MBP data?

The subscrpition of MBP data:market.\$symbol.depth.\$type：

step1 and step7 are merged by 5 decimal places.bids down,asks up.step2 and step8
are merged by 4 decimal places.bids down,asks up.step3 and step9 are merged by 3
decimal places.bids down,asks up.step4 and step10 are merged by 2 decimal
places.bids down,asks up.step5 and step11 are merged by 1 decimal places.bids
down,asks up.step12 and step14 are combined by single digit.bids down,asks
up.step13 and step15 are combined by tens.bids down,asks up.

Example:

step4(0.01):

bids price: 100.123, 100.245.The merged bids price are 100.12, 100.24.

asks price: 100.123, 100.245The merged asks price are 100.13, 100.25.

("Down" and "Up" are rounded up or down, if the price is down, the asks price is
not rounded down, and the bids price is rounded up.)

150 price level: step0 to step5, step14, step15；

20 price level: step6 to step13;

More examples：

step1(0.00001):

price: 1.123456The merged bid price is 1.12345.The merged ask price is 1.12346.

step7(0.00001):

price: 1.123456The merged bid price is 1.12345.The merged ask price is 1.12346.

step6(0.000001)

price: 1.123456The merged bid price is 1.123456.The merged ask price is
1.123456.

step11(0.1):

price: 1.123456The merged bid price is 1.1.The merged ask price is 1.1.

#### Q8:Does websocket's position channel push full data or incrementall data each time?

Subscription of position event: "positions.btc".The latest position is
pushed,including the volumes, available volumes, frozen volumes.If there is no
update,it will not be pushed.

#### Q9: Does websocket's position channel push data when the unrealized profit is updated?

Subscription of position event: "positions.btc".It will not be pushed if only
unrealized profit is updated.It will be pushed only when position event is
updated.

#### Q10: What is the difference between market detail and trade detail in WS?

Market Detail(market.\$symbol.detail) is the merged market data. It will be
checked every 0.5s, pushed once trade event udpates,including the OHLCV
data,etc.Trade Detail(market.\$symbol.trade.detail) is pushed once trade event
updates,including trade price, trade volume, trade direction,etc.

#### Q11: What is the meaning of the two ts pushed by subscription of incremental MBP ?

Subscription of incremental
MBP：market.\$symbol.depth.size\_\${size}.high_freq，The outer ts is the
timestamp when the market server sends the data.The inner ts is the timestamp
when the orderbook is checked.

#### Q12: What is the difference between websocket subscription of MBP and incremental MBP? How often is the incremental MBP pushed?

market.\$symbol.depth.\$type is snapshot MBP
data，market.\$symbol.depth.size\_\${size}.high_freq is incremental MBP
data.Snapshot MBP data is checked every 100ms,pushed at least every
1s.Incremental MBP data is checked every 30ms.It will not be pushed,if MBP has
no update.

#### Q13: How to maintain local MBP data subscribing incremental MBP:market.\$symbol.depth.size\_\${size}.high_freq?

Snapshot MBP data will be pushed for the first time, and the incremental MBP
data will be pushed afterwards.

(1) Compare the incremental price with the previous full MBP data, and replace
the order amount with the same price;

(2) If the price is not in the local MBP data,add the price to the local MBP
data;

(3) If a price level is gone, data such as \[8100, 0\] will be pushed.You have
to remove the same price of local MBP data;

(4) For the same websocket connection, the incremental data version is
incremented; if the version is not incremented, you need to re-subscribe and
re-maintain the local full MBP data;

#### Q14: Will the quarter contract of the delivery contract be converted to the next week contract, will it be notified or changged by WS?

If a quarterly contract such as BTC_CQ is converted to the next week contract
BTC_NW, WS will not automatically notify you, you need to change the
subscription to BTC_NW.

#### Q15: When subscribing the same topic of several contract codes, will several ws be needed?

Since Futures, Coin Margined swaps, USDT Margined Contracts are different
contracts with different interface addresses, different ws will be needed.

In Futures, Coin Margined swaps, USDT Margined Contracts thereof, as long as the
interface address is the same, one ws is enough.

#### Q16: Is it available to place/cancel an order via WS??

Currently, it is not supported.

#### Q17: How to subscribe order status?

a. Successfully trade: “Subscribe Match Order Data (matchOrders.\$symbol)” or
“Subscribe Order Data (orders.\$symbol)”

b. Successfully cancel: Subscribe Account Equity Updates Data
(accounts.\$symbol)

#### Q18: What is the difference between the “Subscribe Match Order Data (matchOrders.\$symbol)” and “Subscribe Order Data (orders.\$symbol)”?

The pushed data of these two interfaces are different. Compared to “Subscribe
Match Order Data (matchOrders.\$symbol)”, there are more fields for “Subscribe
Order Data (orders.\$symbol)”

In general, the match order data (Subscribe Match Order Data
“matchOrders.\$symbol”) may be pushed faster than the settled order data
(Subscribe Order Data “orders.\$symbol”).

The orders of forced liquidation and netting will not be pushed in “Subscribe
Match Order Data (matchOrders.\$symbol)”

#### Q19: How often is the “Subscribe Kline Data (market.\$symbol.kline.\$period)” pushed?

If any transaction is completed, it will push every 500ms. If not, it will push
according to the subscribe period

#### Q20: How to judge whether the push is delayed?

Please first synchronize the time of the server through
https://api.hbdm.com/api/v1/timestamp), and the “ts” in the returned data is
timestamp (ms) and the corresponding time zone is UTC+8.

The outer layer of each pushed data has a “ts”, which represents the time stamp
(ms) when the server pushes the data to the client and the corresponding time
zone is UTC+8.

When the data pushed arrive, the procedure will record the local time “ts”. When
the local time “ts” is much later than the pushing data “ts”, you can use the
following methods to improve the delay:

a. Reduce the data pushed by reducing the number of WS subscriptions.

b. Check the stability and speed of the network between procedure and the
servers (please replace api.btcgateway.pro with the domain name used by the
program)

curl -o /dev/null -s -w
time_namelookup"(s)":%{time_namelookup}"\\n"time_connect"(s)":%{time_connect}"\\n"time_starttransfer"(s)":%{time_starttransfer}"\\n"time_total"(s)":%{time_total}"\\n"speed_download"(B/s)":%{speed_download}"\\n"
api.btcgateway.pro

and you will receive data as below:

time_namelookup(s):0.001378

time_connect(s):0.128641

time_starttransfer(s):0.276588

time_total(s):0.276804

speed_download(B/s):2010.000

If you run the above command multiple times in a row, and the results obtained
each time are very different, you can: a. Select an appropriate HTX domain name,
b. Optimize or reselect the network where the program is located.

### Order and Trade

#### Q1: What's the reason for 1004 error code?

We notice that the system is sometimes overloaded when the market suddenly turns
to be highly volatile. If the system is busy recently or the following prompts
appear:

{“status”: “error”, “err_code”: 1004, “err_msg”: “System busy. Please try again
later.”, “ts”:}

please be patient, and do not place or cancel order repeatedly during the
process to avoid repeated orders and additional pressure on system performance.
In the meanwhile, it is recommended to place and cancel orders through Web and
APP.

#### Q2: The same order ID and match ID can have multiple trades. for example: if a user take a large amount of maker orders, there will be multiple corresponding trades . How to identify these different trades ?

The field ID returned by the information interface /api/v1/contract_order_detail
is a globally unique transaction identifier. if a maker order is matched
multiple times, a trade will be pushed once there is a transaction matched.

#### Q3: What is the delay for the round trip of HTX future?

At present,it normally takes about 30-50ms from placing the order to getting the
status of the order.

#### Q4: Why does the API return connection reset or Max retris or Timeout error?

Most of the network connectivity problems ,(such as Connection reset or network
timeout ) are caused by network instability , you can use the server in AWS
Tokyo C area with api.hbdm.vn , which can effectively reduce network timeout
errors.

#### Q5: How to check the order status without order_id not returned?

If the order_id couldn't be returned due to network problems, you can query the
status of the order by adding the custom order number(client_order_id ).

#### Q6: What to do if it's diconnected after the websocket subscription of account, order and positions for a while?

When subscribing private accounts, orders and positions, the heartbeat should
also be maintained regularly ,which is different from the market heartbeat
format . Please refer to the
["websocket Heartbeat and Authentication Interface"](https://docs.huobigroup.com/docs/dm/v1/en/#websocket-heartbeat-and-authentication-interface)
. if the it is disconnected ,please try to reconnect.

#### Q7: What is the difference between order status 1 and 2 ? what is the status 3 ?

Status 1 is the preparation for submission. status 2 is the sequential
submission of internal process, which can be considered that it has been
accepted by the system. Status 3 indicated that the order has been already
submitted to market.

#### Q8: Is there an interface to get the total assets in BTC of my account ?

No.

#### Q9: Why is the order filled after the order is withdrawed successfully by placing API cancellation ?

The success return of order cancellation or placement only represents that the
command is excuted successfully and doesn't mean that the order has been
cancelled . You can check the order status through the interface
/api/v1/contract_order_info.

#### Q10: How long does it generally take for an API from withdrawing to cancelling successfully ?

The order cancellation command generally takes several tens of ms. The actual
status of order cancellation can be obtained by invoking the interface:
/api/v1/contract_order_info.

#### Q11: How to get historical liquidation orders?

To obtain historical liquidation orders, you can access the one of four api
interfaces: Get History Orders (/api/v1/contract_hisorders), Get History Match
Results (/api/v1/contract_matchresults), Query history orders via multiple
fields (/api/v1/contract_hisorders_exact), Query history transactions via
multiple fields (/api/v1/contract_matchresults_exact), with the return field
order_source (order source) to judge. When order_source returns "risk", it means
that this order is a liquidated order.

#### Q12: Why can't open positions?

1.  Available margin is not enough to open positions, cause we have the minimum
    amount requirements when open positions.
2.  The order price is out of the range of price limits.
3.  The amount exceeds the upper limit of single orders.
4.  The number of positions exceed the upper limit for an individual investor.
5.  Positions may only be closed within 10 min before settlement.(error
    code 1105)
6.  The positions are taken over by system.

#### Q13: Does Huob Futures support holding bi-directional position?

Yes, HTX Futures supports long and short positions being held at the same time.

#### Q14: How to ensure the order to be rapidly filled?

At present, HTX Futures does not support market price when placing an order. To
increase the probability of a transaction, users can choose to place an order
based on BBO price (opponent), optimal 5 (optimal_5), optimal 10 (optimal_10),
optimal 20 (optimal_20), among which the success probability of optimal 20 is
the largest, while the slippage always is the largest as well.

It is important to note that the above methods will not guarantee the order to
be filled in 100%. The system will obtain the optimal N price at that moment and
place the order.

#### Q15: How can API procedure be connected to the exchange more rapidly?

It’s recommended to use a AWS Tokyo c-zone server and the domain name
“api.hbdm.vn” to connect to the system.

#### Q16: It occurs an “abnormal service” error when transferring assets between spots and derivatives.

a. Check whether the request address is the address of HTX: api.huobi.pro?

b. Check whether the precision of the coin does not exceed 8 decimal places?

#### Q17: How to confirm whether the position is opened or closed successfully?

Placing an order successfully through “Place an Order” interface
(/api/v1/contract_order) or “Place a batch of orders” interface
(/api/v1/contract_batchorder) just means the server has received your order
placing instructions rather than you have opened/closed a position successfully.

You can check the order status by filling the returned “order_id” in the “Get
Information of an Order” interface (/api/v1/contract_order_info) or the “Order
Details Acquisition” interface (/api/v1/contract_order_detail); If the order has
been filled, the “status” value in the return parameter will turn out 6 (wholly
filled)

It is important to note:

a. For “Get Information of an order” interface (/api/v1/contract_order_info),
after the settlement or delivery, the system will delete all the orders in ended
status (5: partially filled orders have been cancelled; 6: wholly filled; 7:
cancelled);

b. There is a delay in “Order Details Acquisition” interface
(/api/v1/contract_order_detail), so it is better to fill in “created_at” (order
timestamp) and “order_type” (order type, fill in 1 by default). In this way, it
will directly query the database, so the query results will be more timely.

#### Q18: Why are orders canceled by the system automatically?

The order_price_type which can be chosen are IOC, FOK and Maker (Post Only).
When the order book cannot meet with the corresponding conditions, the system
will cancel the orders automatically:

Post_only: If the order placed is filled with an existing order on the order
book immediately, the order will be cancelled to ensure the user is always a
maker.

IOC order: If the order cannot be filled immediately, the unfilled part will be
cancelled at once;

FOK order: If the order cannot be filled in its entirety, it will be wholly
cancelled. No partial fulfillments are allowed.

#### Q19: How to query the maximum amount (cont) available to open by using users’ current assets?

At present, we do not have an interface by which users can directly query the
maximum amount (cont) available to open by using users’ the current asset.

#### Q20: Are the “order_id” and “order_id_str” the same?

The “order_id_str” is the string format of “order_id”, whose values are the
same.

For the “order_id” with 18 bits, the “JSON.parse” in “nodejs” and “javascript”
will be “int” by default, and mistakes will occur when analyzing. Thus, we
advise using “order_id_str”.

#### Q21: How to get the active buying/selling quantity in transaction data?

Users can get the data via “Query The Last Trade of a Contract” (/market/trade)
interface or by subscribing "sub": "market.\$contract_code.trade.detail",
thereinto

Amount refers to the trading volume (cont), which is the sum of the
buying/selling volume;

Direction refers to the active trading direction.

#### Q22: The interval between “from” and “to” is “2000\*period” when acquiring KLine data, then why the data obtained is \[\]?

When acquiring the Kline data, the two time points “from” and “to” are
contained, therefore it includes 2001 pieces of data. However, this exceeds the
maximum limit 2000. Therefore, the system will return \[\].

Besides, the returned data will be \[\] as well if the interval between “from”
and “to” exceeds 2 years.

#### Q23: How to get the latest price?

There are two methods to get the latest price:

a. Invoking the “Get KLine Data” interface and filling in any “period”, the
“close” of the last data in return data will be the latest price;

b. Invoking the “Query The Last Trade of a Contract” interface, the returned
“price” will be the latest price.

#### Q24: How to get the latest index price?

There are two methods to get the latest index price:

a. Calling the “Get Contract Index Price Information” interface
(/api/v1/contract_index), the returned “index_price” will be the latest index
price.

b. Calling the “Subscribe Index Kline Data” websocket
(market.\$symbol.index.\$period), the “close” of the last Kline data in returned
data will be the latest index price.

#### Q25: Will API upgrade affect the operation of the program?

In general, API upgrade will partly influence the ws disconnection. To avoid
this, you can set up a ws-reconnect mechanism in advance; Please subscribe to
the upgrade announcements for more details:

Coin-margined futures: https://status-dm.huobigroup.com/

Coin-margined swaps: https://status-swap.huobigroup.com/

USDT-margined contracts: https://status-linear-swap.huobigroup.com/

#### Q26: What does mean the “margin_balance” in “Query User’s Account Information” interface (api/v1/contract_account_info)?

”margin_balance” refers to the account equity

1.  margin_balance = margin_static + profit_unreal
2.  margin_balance = Account balance + profit_real + profit_unreal

Note: Account balance = margin_static - profit_real, there is only margin_static
in the return data of api interface

Each of the two calculation methods above can get the margin_balance

#### Q27: Is the “risk_rate” (margin rate) in “Query User’s Account Information” interface (/api/v1/contract_account_info) the same as the margin rate on WEB?

Yes, it is

When the “risk_rate” is less than or equal to 0, the position will be
liquidated.

### Error Codes

#### Q1: What is the reason for 1030 error code?

If you encounter errors such as
{"status":"error","err_code":1030,"err_msg":"Abnormal service. Please try again
later.","ts":1588093883199},indicating that your input request parameter is not
correct, please print your request body and complete URL parameters, and please
check the corresponding API document interface one by one.The common example is
that the volume must be an integer, and the client_order_id must be of type
uint32 rather than type uint64.

#### Q2: What is the reason for 1048 error code?

If you encounter errors such as {'index': 1, 'err_code': 1048, 'err_msg':
'Insufficient close amount available.'}, indicating that your available position
is not enough.You need to query the api api/v1/contract_position_info to get
your available position.

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

### How to solve problems more effectively?

When you report an API error, you need to attach your request URL, the original
complete body of the request and the complete request URL parameters, and the
original complete log of the server's response. If it is a websocket
subscription, you need to provide the address of the subscription, the topic of
the subscription, and the original complete log pushed by the server.

If it is an order-related issue, use the API order query interface
/api/v1/contract_order_info to keep the complete log returned and provide your
UID and order number.

## Future Transferring Interface

### Error Code Table

| err-code                                       | err-msg                                                          | Comments                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| base-msg                                       |                                                                  | Other errors, please refer to err-msg list below for details。 |
| base-currency-error                            | The currency is invalid                                          |                                                                |
| frequent-invoke                                | the operation is too frequent. Please try again later            |                                                                |
| banned-by-blacklist                            | Blacklist restriction                                            |                                                                |
| dw-insufficient-balance                        | Insufficient balance. You can only transfer {0} at most.         |                                                                |
| dw-account-transfer-unavailable                | account transfer unavailable                                     |                                                                |
| dw-account-transfer-error                      | account transfer error                                           |                                                                |
| dw-account-transfer-failed                     | Failed to transfer. Please try again later.                      |                                                                |
| dw-account-transfer-failed-account-abnormality | Account abnormality, failed to transfer。Please try again later. |                                                                |

### Error message when err-code is ‘base-msg’.

| err-msg                                                                                                                   | Comments                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Unable to transfer in currently. Please contact customer service.                                                         |                                                |
| Unable to transfer out currently. Please contact customer service.                                                        |                                                |
| Abnormal contracts status. Can’t transfer.                                                                                |                                                |
| Sub-account doesn't own the permissions to transfer in. Please contact customer service.                                  |                                                |
| Sub-account doesn't own the permissions to transfer out. Please contact customer service.                                 |                                                |
| The sub-account does not have transfer permissions. Please login main account to authorize.                               |                                                |
| Insufficient amount available.                                                                                            | Insufficient amount of Future Contract Account |
| The single transfer-out amount must be no less than {0}{1}.                                                               |                                                |
| The single transfer-out amount must be no more than {0}{1}.                                                               |                                                |
| The single transfer-in amount must be no less than {0}{1}.                                                                |                                                |
| The single transfer-in amount must be no more than {0}{1}.                                                                |                                                |
| Your accumulative transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being.       |                                                |
| Your accumulative transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being.         |                                                |
| Your accumulative net transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being.   |                                                |
| Your accumulative net transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being.     |                                                |
| The platform's accumulative transfer-out amount is over the daily maximum. You can't transfer out for the time being.     |                                                |
| The platform's accumulative transfer-in amount is over the daily maximum. You can't transfer in for the time being.       |                                                |
| The platform's accumulative net transfer-out amount is over the daily maximum. You can't transfer out for the time being. |                                                |
| The platform's accumulative net transfer-in amount is over the daily maximum. You can't transfer in for the time being.   |                                                |
| Transfer failed. Please try again later or contact customer service.                                                      |                                                |
| Abnormal service, transfer failed. Please try again later.                                                                |                                                |
| You don’t have access permission as you have not opened contracts trading.                                                |                                                |
| This contract type doesn't exist.                                                                                         |                                                |

## Coin-M Delivery

### Error Code

| Error Code | Error Description                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1000       | System error.                                                                                                                                                                                                                |
| 1001       | The system is not ready.                                                                                                                                                                                                     |
| 1002       | Inquiry error. Please try again later.                                                                                                                                                                                       |
| 1003       | Redis error.                                                                                                                                                                                                                 |
| 1004       | System busy. Please try again later.                                                                                                                                                                                         |
| 1010       | Account doesn't exist.                                                                                                                                                                                                       |
| 1011       | The user's session doesn't exist.                                                                                                                                                                                            |
| 1012       | The user's account doesn't exist.                                                                                                                                                                                            |
| 1013       | This contract symbol doesn't exist.                                                                                                                                                                                          |
| 1014       | This contract doesn't exist.                                                                                                                                                                                                 |
| 1015       | The index price does not exist.                                                                                                                                                                                              |
| 1016       | The bid/ask price does not exist. Please input the price.                                                                                                                                                                    |
| 1017       | Order doesn't exist.                                                                                                                                                                                                         |
| 1018       | Main account doesn't exist.                                                                                                                                                                                                  |
| 1019       | Your main account is not whitelisted for opening subaccounts.                                                                                                                                                                |
| 1020       | The number of your subaccounts has exceeded the limit. Please contact customer service.                                                                                                                                      |
| 1021       | Failed to open an account. Your main account has not been activated for futures trading. Please activate before trading.                                                                                                     |
| 1030       | Input error.                                                                                                                                                                                                                 |
| 1031       | Illegal request.                                                                                                                                                                                                             |
| 1032       | Maximum number of access attempts exceeded.                                                                                                                                                                                  |
| 1033       | Contract expiration value error.                                                                                                                                                                                             |
| 1034       | Order quotation type value error.                                                                                                                                                                                            |
| 1035       | Order side value error.                                                                                                                                                                                                      |
| 1036       | Order open/close value error.                                                                                                                                                                                                |
| 1037       | The leverage is invalid. Please contact the customer service.                                                                                                                                                                |
| 1038       | The price has exceeded the precision limit. Please modify and place order again.                                                                                                                                             |
| 1039       | Buy price must be lower than {0}{1}. Sell price must be higher than {2}{3}.                                                                                                                                                  |
| 1040       | The amount cannot be left empty or smaller than the value of one contract. Please modify and place order again.                                                                                                              |
| 1041       | The amount has exceeded the limit ({0} Cont), please modify and place order again.                                                                                                                                           |
| 1042       | The total positions (this order + open orders + positions) have exceeded the long-position limit ({0}{1}). Please modify.                                                                                                    |
| 1043       | The total positions (this order + open orders + positions) have exceeded the short-position limit ({0}{1}). Please modify.                                                                                                   |
| 1044       | The position limit has been triggered. Please modify.                                                                                                                                                                        |
| 1045       | Unable to change leverage due to open orders.                                                                                                                                                                                |
| 1046       | The position for this contract does not exist.                                                                                                                                                                               |
| 1047       | Insufficient margin available.                                                                                                                                                                                               |
| 1048       | Insufficient open positions to be closed. Please check whether there are open orders under "Limit Orders".                                                                                                                   |
| 1049       | Market price is not supported at the moment for opening a position.                                                                                                                                                          |
| 1050       | Duplicate order number                                                                                                                                                                                                       |
| 1051       | No cancellable orders.                                                                                                                                                                                                       |
| 1052       | The number of batch canceling/placing has exceeded the limit.                                                                                                                                                                |
| 1053       | Unable to access the latest price range.                                                                                                                                                                                     |
| 1054       | Unable to access the latest price.                                                                                                                                                                                           |
| 1055       | Invalid price as it would cause the account equity to be less than zero. Please modify the price and place the order again.                                                                                                  |
| 1056       | Settling. Unable to place/cancel orders currently.                                                                                                                                                                           |
| 1057       | Orders cannot be placed during a trading halt.                                                                                                                                                                               |
| 1058       | Orders cannot be placed while the target token is suspended for trading.                                                                                                                                                     |
| 1059       | Delivering contracts. Unable to place/cancel orders currently.                                                                                                                                                               |
| 1060       | Orders cannot be placed as the futures contracts are not in trading hours.                                                                                                                                                   |
| 1061       | The order does not exist.                                                                                                                                                                                                    |
| 1062       | Canceling. Thank you for your patience.                                                                                                                                                                                      |
| 1063       | The order has been executed.                                                                                                                                                                                                 |
| 1064       | The main key of order conflicts.                                                                                                                                                                                             |
| 1065       | Customer order numbers should be integers.                                                                                                                                                                                   |
| 1066       | {0} cannot be empty.                                                                                                                                                                                                         |
| 1067       | Illegal parameter {0}.                                                                                                                                                                                                       |
| 1068       | Export error                                                                                                                                                                                                                 |
| 1069       | Invalid price                                                                                                                                                                                                                |
| 1070       | Exporting failed as the data is null.                                                                                                                                                                                        |
| 1071       | Repeated cancellation. Your order has been canceled.                                                                                                                                                                         |
| 1072       | Sell price must be lower than {0}{1}.                                                                                                                                                                                        |
| 1073       | Position abnormal. Please contact the customer service.                                                                                                                                                                      |
| 1074       | Order placement error. Please contact customer service.                                                                                                                                                                      |
| 1075       | Invalid price as it would cause the margin rate to be less than zero. Please modify the price and place the order again.                                                                                                     |
| 1076       | No data in the order book. Please try again later.                                                                                                                                                                           |
| 1077       | Delivering and settling contracts. Unable to access the current contract.                                                                                                                                                    |
| 1078       | Delivering and settling contracts. Unable to access some contracts.                                                                                                                                                          |
| 1079       | Delivering and settling contracts. Unable to access the position of the current contract.                                                                                                                                    |
| 1080       | Delivering and settling contracts. Unable to access the positions of some contracts.                                                                                                                                         |
| 1081       | The number of your trigger orders for {0} Perpetual Futures shall not exceed {1}.                                                                                                                                            |
| 1082       | Trigger type parameter error                                                                                                                                                                                                 |
| 1083       | Your position has been taken over for liquidation. Unable to place orders now.                                                                                                                                               |
| 1084       | Your contract API is disabled, please try again after {0} (GMT+8).                                                                                                                                                           |
| 1085       | Failed to place the trigger order. Please modify the price and place the order again, or contact customer service.                                                                                                           |
| 1086       | {0} contracts do not support opening positions on {1} at the moment. Please contact customer service.                                                                                                                        |
| 1087       | {0} contracts do not support closing positions on {1} at the moment. Please contact customer service.                                                                                                                        |
| 1088       | {0} contracts do not support cancellation on {1} at the moment. Please contact customer service.                                                                                                                             |
| 1089       | Transfer service is temporarily suspended for {0} account. Please contact customer service.                                                                                                                                  |
| 1090       | Cannot place this order as the margin ratio is \\u2265 100%.                                                                                                                                                                 |
| 1091       | Cannot place this order as the account equity is less than 0.                                                                                                                                                                |
| 1092       | The bid/ask {0} price is adopted for Flash Close. The account equity would be less than zero if this order was placed. Please manually input a valid price or place an order with the BBO price.                             |
| 10921      | The account equity would be less than zero if this order was placed. Please enter a new price or place the order at BBO price.                                                                                               |
| 1093       | The bid/ask {0} price is adopted for Flash Close. The margin rate would be less than zero if this order was placed. Please manually input a valid price or place an order with the BBO price.                                |
| 10931      | The margin rate will decline to below 0 if this order is placed. Please enter a new price or place order at BBO price.                                                                                                       |
| 1094       | Leverage cannot be empty. Please choose leverage or contact customer service.                                                                                                                                                |
| 1095       | Cannot change leverage as the futures contracts are not in trading hours.                                                                                                                                                    |
| 1097       | Cannot place orders as the account is in freezing for ADL.                                                                                                                                                                   |
| 1098       | Cannot transfer as the account is in freezing for ADL.                                                                                                                                                                       |
| 1100       | You have no permission to open positions. Please contact customer service.                                                                                                                                                   |
| 1101       | You have no permission to close positions. Please contact customer service.                                                                                                                                                  |
| 1102       | You have no permission to transfer in. Please contact customer service.                                                                                                                                                      |
| 1103       | You have no permission to transfer out. Please contact customer service.                                                                                                                                                     |
| 1104       | The current trading is not permitted due to futures trading restrictions.                                                                                                                                                    |
| 1105       | You can only close this position due to futures trading restrictions.                                                                                                                                                        |
| 1106       | You can only close this position due to futures trading restrictions.                                                                                                                                                        |
| 1108       | Abnormal service. Please try again later.                                                                                                                                                                                    |
| 1109       | Subaccounts have no permission to open positions. Please contact customer service.                                                                                                                                           |
| 1110       | Subaccounts have no permission to close positions. Please contact customer service.                                                                                                                                          |
| 1111       | Subaccounts have no permission to transfer in. Please contact customer service.                                                                                                                                              |
| 1112       | Subaccounts have no permission to transfer out. Please contact customer service.                                                                                                                                             |
| 1113       | Subaccounts have no permission to trade. Please log in to your main account to authorize permissions.                                                                                                                        |
| 1114       | Subaccounts have no permission to transfer. Please log in to your main account to authorize permissions.                                                                                                                     |
| 1115       | You have no permission to access this subaccount.                                                                                                                                                                            |
| 1200       | Failed to log in. Please try again.                                                                                                                                                                                          |
| 1205       | You have no access permissions.                                                                                                                                                                                              |
| 1206       | To protect you from high risk exposure, high leverage is not supported. For any questions, please contact customer service.                                                                                                  |
| 1220       | You have no access since you have not activated futures trading yet.                                                                                                                                                         |
| 1221       | Unable to activate futures trading due to insufficient balance in your spot account.                                                                                                                                         |
| 1222       | Unable to activate futures trading as the required duration hasn't been met since your account was activated.                                                                                                                |
| 1223       | The VIP level can't meet the requirements for opening contracts.                                                                                                                                                             |
| 1224       | Your country/region can't meet the requirements for opening contracts.                                                                                                                                                       |
| 1225       | Failed to open contracts.                                                                                                                                                                                                    |
| 1226       | Repeated account.                                                                                                                                                                                                            |
| 1227       | HTX Futures are not supported in subaccounts. Please log in to your main account.                                                                                                                                            |
| 1228       | You have not activated futures trading yet. Please activate it first.                                                                                                                                                        |
| 1229       | You've already consented to the Agreement.                                                                                                                                                                                   |
| 1230       | You haven't finished the risk verification.                                                                                                                                                                                  |
| 1231       | You haven't finished the ID Verification.                                                                                                                                                                                    |
| 1232       | The format/size of the image you uploaded does not meet the requirements. Please re-upload.                                                                                                                                  |
| 1233       | High leverage is not enabled (Please agree to the High-Leverage Agreement with your main account on our website or app.)                                                                                                     |
| 1234       | The unfilled orders of opening positions for {0} contracts cannot exceed {1}.                                                                                                                                                |
| 1235       | The unfilled orders of closing position for {0} contracts cannot exceed {1}.                                                                                                                                                 |
| 1250       | Cannot access HT.n                                                                                                                                                                                                           |
| 1251       | Unable to get BTC assets. Please try again later.                                                                                                                                                                            |
| 1252       | Unable to query spot account balance. Please try again later.                                                                                                                                                                |
| 1253       | Signature verification error                                                                                                                                                                                                 |
| 1254       | Futures trading cannot be activated for subaccounts. Please log in to your main account on our website to activate.                                                                                                          |
| 1300       | Transfer failed.                                                                                                                                                                                                             |
| 1301       | Insufficient transferable amount                                                                                                                                                                                             |
| 1302       | Failed to transfer due to system error.                                                                                                                                                                                      |
| 1303       | Each outward transfer cannot be less than {0}{1}.                                                                                                                                                                            |
| 1304       | Each outward transfer cannot exceed {0}{1}.                                                                                                                                                                                  |
| 1305       | Each inward transfer cannot be less than {0}{1}.                                                                                                                                                                             |
| 1306       | Each inward transfer cannot exceed {0}{1}.                                                                                                                                                                                   |
| 1307       | Your daily cumulative outward transfer amount has exceeded {0}{1}. Unable to make the transfer.                                                                                                                              |
| 1308       | Your daily cumulative inward transfer amount has exceeded {0}{1}. Unable to make the transfer.                                                                                                                               |
| 1309       | Your daily cumulative net outward transfer amount has exceeded {0}{1}. Unable to make the transfer.                                                                                                                          |
| 1310       | Your daily cumulative net inward transfer amount has exceeded {0}{1}. Unable to make the transfer.                                                                                                                           |
| 1311       | The daily upper limit for outward transfer has been reached. Unable to make the transfer.                                                                                                                                    |
| 1312       | The daily upper limit for inward transfer has been reached. Unable to make the transfer.                                                                                                                                     |
| 1313       | The daily upper limit for net outward transfer has been reached. Unable to make the transfer.                                                                                                                                |
| 1314       | The daily upper limit for net inward transfer has been reached. Unable to make the transfer.                                                                                                                                 |
| 1315       | Wrong transfer type.                                                                                                                                                                                                         |
| 1316       | Failed to freeze the transfer.                                                                                                                                                                                               |
| 1317       | Failed to unfreeze the transfer.                                                                                                                                                                                             |
| 1318       | Failed to confirm the transfer.                                                                                                                                                                                              |
| 1319       | Failed to query the transferable amount.                                                                                                                                                                                     |
| 1320       | Cannot make transfers as the futures contracts are not in trading hours.                                                                                                                                                     |
| 1321       | Transfer failed. Please try again later or contact customer service.                                                                                                                                                         |
| 1322       | Invalid amount. Must be more than 0.                                                                                                                                                                                         |
| 1323       | Transfer failed due to service error. Please try again later.                                                                                                                                                                |
| 1325       | Failed to set trading unit                                                                                                                                                                                                   |
| 1326       | Failed to access trading units.                                                                                                                                                                                              |
| 1327       | Transfer failed for lack of transfer permission. Please contact customer service.                                                                                                                                            |
| 1328       | Transfer failed for lack of transfer permission. Please contact customer service.                                                                                                                                            |
| 1329       | Transfer failed for lack of transfer permission. Please contact customer service.                                                                                                                                            |
| 1330       | Transfer failed for lack of transfer permission. Please contact customer service.                                                                                                                                            |
| 1331       | The number of decimals has exceeded the precision limit. Please modify and resubmit.                                                                                                                                         |
| 1332       | The perpetual contract does not exist.                                                                                                                                                                                       |
| 1333       | Failed to agree to the Maker & Taker Agreement.                                                                                                                                                                              |
| 1334       | Failed to query the Maker & Taker Agreement                                                                                                                                                                                  |
| 1335       | Failed to set double confirmation for querying Maker & Taker orders.                                                                                                                                                         |
| 1336       | Failed to set double confirmation for upgrading Maker & Taker orders.                                                                                                                                                        |
| 1337       | ailed to set the settings for querying Maker & Taker orders.                                                                                                                                                                 |
| 1338       | Failed to set the settings for upgrading Maker & Taker orders.                                                                                                                                                               |
| 1339       | Nickname contains illegal words. Please modify.                                                                                                                                                                              |
| 1340       | This nickname has been taken. Please modify.                                                                                                                                                                                 |
| 1341       | The enrollment has ended                                                                                                                                                                                                     |
| 1342       | Nicknames cannot be set for subaccounts.                                                                                                                                                                                     |
| 1343       | Invalid indicator. Please reset.                                                                                                                                                                                             |
| 1344       | Sorry. You can set real-time market reminders for a maximum of {0} contract products.                                                                                                                                        |
| 1345       | Sorry. A maximum of {1} reminders can be set for the {0} contract.                                                                                                                                                           |
| 1346       | The indicator already exists. You don't need to repeat the setting.                                                                                                                                                          |
| 1347       | {0} parameter is incorrect. Please modify.                                                                                                                                                                                   |
| 1348       | This contract does not support cross margin mode.                                                                                                                                                                            |
| 1349       | The leverage for new orders does not match current positions. Please change the leverage.                                                                                                                                    |
| 1401       | This project is not available in your country or region.                                                                                                                                                                     |
| 1403       | The number of take-profit / stop-loss orders for {0} perpetual contract shall not exceed {1}.                                                                                                                                |
| 1404       | Take-profit and stop-loss can only be set for orders that are placed to open positions.                                                                                                                                      |
| 1405       | The take-profit price shall not be {0}{1}{2}                                                                                                                                                                                 |
| 1406       | Your chances have been used up                                                                                                                                                                                               |
| 1407       | The stop-loss price shall not be {0}{1}{2}                                                                                                                                                                                   |
| 1408       | Unable to cancel because the take-profit / stop-loss order has not taken effect yet.                                                                                                                                         |
| 1409       | You have no permission to place take-profit / stop-loss orders. Please contact customer service.                                                                                                                             |
| 1410       | The number of sub-accounts for batch operation cannot exceed {0}                                                                                                                                                             |
| 1411       | Settling. Unable to query order information.                                                                                                                                                                                 |
| 1412       | {0} does not meet with the decimal precision limit {1}.                                                                                                                                                                      |
| 1413       | You have no permission to place a Trailing Stop order. Please contact customer service.                                                                                                                                      |
| 1414       | You have not activated grid trading yet. Please log in to your main account on our website or app, and agree to the grid trading agreement.                                                                                  |
| 1415       | The lowest termination price must be lower than the lowest grid price and the latest price; while the highest termination price must be higher than the highest grid price and the latest price. Please modify and resubmit. |
| 1416       | Exceeding the maximum running time, which is {0} days and {1} hours. Please modify and resubmit.                                                                                                                             |
| 1417       | Exceeding the range of grid quantity, which is ({0} ~ {1}). Please modify and resubmit.                                                                                                                                      |
| 1418       | At most {0} grid orders can run at the same time. Please cancel other grid orders first.                                                                                                                                     |
| 1419       | At most {0} grid orders can run at the same time. Please cancel other grid orders first.                                                                                                                                     |
| 1420       | You have no permission for Futures grid trading. Please contact customer service.                                                                                                                                            |
| 1421       | You have open orders or positions for this futures contract. Please cancel orders or close positions first.                                                                                                                  |
| 1422       | The estimated PnL per grid is less than 0. Please modify and resubmit.                                                                                                                                                       |
| 1423       | The lower-upper price range of the grid is invalid. Please modify and resubmit.                                                                                                                                              |
| 1424       | This grid trading has been terminated for other reasons. Unable to modify or terminate manually.                                                                                                                             |
| 1425       | The callback rate should be {0} {1}. Please modify and resubmit.                                                                                                                                                             |
| 1426       | The activation price should be {0} the latest price.                                                                                                                                                                         |
| 1427       | The number of your {0} trailing-stop perpetual futures orders cannot exceed the limit {1}.                                                                                                                                   |
| 1428       | You can only collect one coupon for the same contract type.                                                                                                                                                                  |
| 1429       | Coupon already claimed. You don't have to repeat the action.                                                                                                                                                                 |
| 1430       | Coupon expired. Please refresh.                                                                                                                                                                                              |
| 1431       | The system is in maintenance and is expected to resume at {0} (GMT+8).                                                                                                                                                       |
| 1432       | A grid trading is being initialized or terminated. Unable to place an order now.                                                                                                                                             |
| 1433       | The grid trading is terminated due to the manual placing/canceling of orders. Please check \\u201COrder History\\u201D for details.                                                                                          |
| 1434       | The amount is less than the minimum initial margin ({0}{1}), which would cause the amount per grid to be less than the minimum allowable amount. Please modify and resubmit.                                                 |
| 1435       | The grid has been terminated by you.                                                                                                                                                                                         |
| 1436       | Timeout and the grid has terminated automatically.                                                                                                                                                                           |
| 1437       | The grid has been terminated due to a system error. Please contact customer service.                                                                                                                                         |
| 1438       | The grid has been terminated after the termination condition was triggered.                                                                                                                                                  |
| 1439       | The grid has been terminated as liquidation was triggered.                                                                                                                                                                   |
| 1440       | Failed to cancel the {0} contract.                                                                                                                                                                                           |
| 1441       | The trigger price must be lower than the highest termination price and higher than the lowest termination price. Please modify and resubmit.                                                                                 |
| 1442       | The effective duration must be longer than the running time by one minute or more. Please modify!                                                                                                                            |
| 1443       | The grid has been terminated due to the delivery of the {0} contract.                                                                                                                                                        |
| 1450       | Current leverage is not supported at your risk level.                                                                                                                                                                        |
| 1451       | Current leverage is not supported at your risk level. Please check the details on your main account.                                                                                                                         |
| 1452       | Grid orders have exceeded the maximum limit. Unable to place orders now.                                                                                                                                                     |
| 1453       | The number of all your trigger orders has exceeded the maximum limit. Unable to place more orders now.                                                                                                                       |
| 1454       | The number of all your take-profit / stop-loss orders has exceeded the maximum limit. Unable to place more orders now.                                                                                                       |
| 1455       | The number of all your trailing stop orders has exceeded the maximum limit. Unable to place more orders now.                                                                                                                 |
| 1456       | Cannot open an account for you now according to local laws and regulations.                                                                                                                                                  |
| 12001      | Invalid submission time.                                                                                                                                                                                                     |
| 12002      | Incorrect signature version.                                                                                                                                                                                                 |
| 12003      | Incorrect signature method.                                                                                                                                                                                                  |
| 12004      | Incorrect signature method.                                                                                                                                                                                                  |
| 12005      | IP address error                                                                                                                                                                                                             |
| 12006      | The submission time cannot be left blank.                                                                                                                                                                                    |
| 12007      | Incorrect public key                                                                                                                                                                                                         |
| 12008      | Verification failed.                                                                                                                                                                                                         |
| 12009      | User has been locked or does not exist.                                                                                                                                                                                      |
| 1350       | This project is not available in your country or region.                                                                                                                                                                     |
| 1457       | You are not eligible to participate. Please refer to the event rules.                                                                                                                                                        |
| 1458       | Query attempts have exceeded the limit of {0}.                                                                                                                                                                               |
| 1459       | Failed to update the custom layout.                                                                                                                                                                                          |
| 1460       | The contract is currently not available. Please do not transfer in.                                                                                                                                                          |
| 1461       | The total positions (this order + open orders + positions) have exceeded the long-position limit ({0}{1}). Please modify and resubmit.                                                                                       |
| 1462       | The total positions (this order + open orders + positions) have exceeded the short-position limit ({0}{1}). Please modify and resubmit.                                                                                      |
| 1463       | With {0}X leverage, the position limit is {1} USDT for a long position and {2} USDT for a short position. Cannot change to this leverage as your current position would exceed the position limit.                           |
| 1464       | The number of unfilled orders for opening positions of {0} delivery futures (including all expirations) shall not exceed {1}.                                                                                                |
| 1465       | The number of unfilled orders for closing positions of {0} futures (including all expirations) shall not exceed {1}.                                                                                                         |
| 1466       | The trading volume of subaccounts will be booked into your main account. Please log in to your main account to check.                                                                                                        |
| 1467       | {0}                                                                                                                                                                                                                          |
| 1481       | Failed to open some subaccounts.                                                                                                                                                                                             |
| 1482       | Subaccount does not exist.                                                                                                                                                                                                   |
| 1511       | The stop-loss price is near the liquidation price and may not trigger the stop-loss order. Please adjust the price and try again.                                                                                            |
| 50001      | In view of the laws and regulations of your country/region, you understand that you bear the responsibility for any further proceeding or operation.                                                                         |
| 50002      | Dear users, services are not available according to the rules and regulations in your country or region.                                                                                                                     |
| 50003      | Please assess and understand all the risks carefully and allocate your funds prudently when trading Futures products.                                                                                                        |
| 50004      | In view of the laws and regulations of your country/region, you understand that you bear the responsibility for any further proceeding or operation.                                                                         |
| 50101      | Please assess and understand all the risks carefully and allocate your funds prudently when trading Futures products.                                                                                                        |
| 50102      | Dear user, please complete KYC identity verification before trading.                                                                                                                                                         |
| 50103      | Sorry, assets transfers between this sub-account and its main account are not available.                                                                                                                                     |

## Endpoints

### /api/v1/contract_balance_valuation (Query Asset Valuation)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                          | Value Range                                                                   | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------- |
| valuation_asset | string    | false    | The valuation according to the certain fiat currency. If not fill in, default as BTC | "BTC","USD","CNY","EUR","GBP","VND","HKD","TWD","MYR","SGD","KRW","RUB","TRY" |               |

#### Response Parameter

| Parameter       | Data Type   | Required | Description                                          | Value Range                                                                   |
| --------------- | ----------- | -------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| status          | string      | true     | the result of server handles for the request         |                                                                               |
| DATA_START      | objectarray | true     |                                                      |                                                                               |
| valuation_asset | string      | true     | The valuation according to the certain fiat currency | "BTC","USD","CNY","EUR","GBP","VND","HKD","TWD","MYR","SGD","KRW","RUB","TRY" |
| balance         | string      | true     | Asset Valuation                                      |                                                                               |
| DATA_END        |             | false    |                                                      |                                                                               |
| ts              | long        | true     | timestamp                                            |                                                                               |

#### Request example

```
{
  "valuation_asset": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "valuation_asset": "CNY",
      "balance": "295098.370590947021036643"
    }
  ],
  "ts": 1614044220841
}
```

### /api/v1/contract_account_info (Query User’s Account Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description  | Value Range | Default Value                                                                                                      |
| --------- | --------- | -------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | string    | false    | Variety code |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...if default, return to all types defaulted |

#### Response Parameter

| Parameter          | Data Type  | Required | Description                                   | Value Range    |
| ------------------ | ---------- | -------- | --------------------------------------------- | -------------- |
| status             | string     | true     | Request Processing Result                     | "ok" , "error" |
| DATA_START         |            | false    |                                               |                |
| symbol             | string     | true     | Variety code                                  | "BTC","ETH"... |
| margin_balance     | decimal    | true     | Account rights                                |                |
| margin_position    | decimal    | true     | Position Margin                               |                |
| margin_frozen      | decimal    | true     | Frozen margin                                 |                |
| margin_available   | decimal    | true     | Available margin                              |                |
| profit_real        | decimal    | true     | Realized profit                               |                |
| profit_unreal      | decimal    | true     | Unrealized profit                             |                |
| risk_rate          | decimal    | true     | risk rate                                     |                |
| new_risk_rate      | bigdecimal | true     | new risk rate                                 |                |
| trade_partition    | string     | true     | trade partition                               |                |
| liquidation_price  | decimal    | true     | Estimated liquidation price                   |                |
| withdraw_available | decimal    | true     | Available withdrawal                          |                |
| lever_rate         | decimal    | true     | Leverage Rate                                 |                |
| adjust_factor      | decimal    | true     | Adjustment Factor                             |                |
| margin_static      | decimal    | true     | Static Margin                                 |                |
| DATA_END           |            | false    |                                               |                |
| ts                 | long       | false    | Time of Respond Generation, Unit: Millisecond |                |

#### Request example

```
{
  "symbol": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "margin_balance": 453.1519557807875,
      "margin_position": 0,
      "margin_frozen": 0,
      "margin_available": 453.1519557807875,
      "profit_real": 16.356351557512742,
      "profit_unreal": 0,
      "risk_rate": null,
      "new_risk_rate": "",
      "trade_partition": "",
      "withdraw_available": 436.7956042232747,
      "liquidation_price": null,
      "lever_rate": 10,
      "adjust_factor": 0.2,
      "margin_static": 453.1519557807875
    }
  ],
  "ts": 1604300060777
}
```

### /api/v1/contract_position_info (Query User’s Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description  | Value Range | Default Value                                                                                                       |
| --------- | --------- | -------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| symbol    | string    | false    | Variety code |             | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...if default, return to all types defaulted |

#### Response Parameter

| Parameter        | Data Type  | Required | Description                                                                       | Value Range                                         |
| ---------------- | ---------- | -------- | --------------------------------------------------------------------------------- | --------------------------------------------------- |
| status           | string     | true     | Request Processing Result                                                         | "ok" , "error"                                      |
| DATA_START       |            | false    |                                                                                   |                                                     |
| symbol           | string     | true     | Variety code                                                                      | "BTC","ETH"...                                      |
| contract_code    | string     | true     | Contract Code                                                                     | "BTC180914" ...                                     |
| contract_type    | string     | true     | Contract Type                                                                     | "this_week", "next_week", "quarter", "next_quarter" |
| volume           | decimal    | true     | Position quantity                                                                 |                                                     |
| available        | decimal    | true     | Available position can be closed                                                  |                                                     |
| frozen           | decimal    | true     | frozen                                                                            |                                                     |
| cost_open        | decimal    | true     | Opening average price                                                             |                                                     |
| cost_hold        | decimal    | true     | Average price of position                                                         |                                                     |
| profit_unreal    | decimal    | true     | Unrealized profit and loss                                                        |                                                     |
| profit_rate      | decimal    | true     | Profit rate                                                                       |                                                     |
| profit           | decimal    | true     | profit                                                                            |                                                     |
| position_margin  | decimal    | true     | Position margin                                                                   |                                                     |
| lever_rate       | int        | true     | Leverage rate                                                                     |                                                     |
| direction        | string     | true     | transaction direction of positions                                                | "buy":long "sell":short                             |
| last_price       | decimal    | true     | Latest price                                                                      |                                                     |
| adl_risk_percent | decimal    | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5                                       |
| liq_px           | string     | true     | Estimated liquidation price                                                       |                                                     |
| new_risk_rate    | bigdecimal | true     | new risk rate                                                                     |                                                     |
| trade_partition  | string     | true     | trade partition                                                                   |                                                     |
| DATA_END         |            | false    |                                                                                   |                                                     |
| ts               | long       | true     | Time of Respond Generation, Unit: Millisecond                                     |                                                     |

Notes:

If there are symbols in the settlement or delivery period,error code 1080(1080
In settlement or delivery. Unable to get positions of some contracts. ) will
return without request parameters. It's suggested to query the position info
with request parameters to avoid raising the error code and not being able to
query the position.

#### Request example

```
{
  "symbol": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "contract_code": "ADA201225",
      "contract_type": "quarter",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 0.0991,
      "cost_hold": 0.0991,
      "profit_unreal": 0,
      "profit_rate": 0,
      "lever_rate": 10,
      "position_margin": 10.090817356205852,
      "direction": "sell",
      "profit": 0,
      "last_price": 0.0991,
      "adl_risk_percent": "3",
      "liq_px": "123.45",
      "new_risk_rate": "",
      "trade_partition": ""
    }
  ],
  "ts": 1604301441639
}
```

### /api/v1/contract_sub_auth (Set a Batch of Sub-Account Trading Permissions)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                           | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------- | ----------- | ------------- |
| sub_uid   | string    | true     | sub-account uid (multiple uids are separated by ",", and one time 10 sub uid at most) |             |               |
| sub_auth  | int       | true     | sub auth, 1:enable, 0:disable                                                         |             |               |

Notes:

When enable the transaction authority on the sub-account for the first time,
deemed to agree to access the contract market.

If the sub-account trading permission has been enable, the interface will
directly return success when request to enable again; if the sub-account trading
permission has been disable, the interface will directly return success when
request to disable again;

#### Response Parameter

| Parameter    | Data Type   | Required | Description                                   | Value Range    |
| ------------ | ----------- | -------- | --------------------------------------------- | -------------- |
| status       | string      | true     | the result of server handling to request      | "ok" . "error" |
| DATA_START   |             | true     |                                               |                |
| ERRORS_START | objectarray | true     |                                               |                |
| sub_uid      | string      | true     | the list of sub uid which failed              |                |
| err_code     | int         | true     | error code                                    |                |
| err_msg      | string      | true     | error msg                                     |                |
| ERRORS_END   |             | false    |                                               |                |
| successes    | string      | true     | the list of sub uid which successes           |                |
| DATA_END     |             | false    |                                               |                |
| ts           | long        | true     | Time of Respond Generation，Unit：Millisecond |                |

#### Request example

```
{
  "sub_uid": "123456",
  "sub_auth": 1
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "sub_uid": "1234567",
        "err_code": 1010,
        "err_msg": "Account doesnt exist."
      }
    ],
    "successes": "123456789"
  },
  "ts": 1612490081318
}
```

### /api/v1/contract_sub_auth_list (Query sub-account transaction permissions)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: This interface is used to query the contract sub-account
and whether it has opened trading permissions.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range | Default Value |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| sub_uid    | string    | false    | sub-account uid (multiple uids are separated by ",")，No more than 10                                                                                                                    |             |               |
| start_time | long      | false    | Start time of sub-account creation                                                                                                                                                       |             |               |
| end_time   | long      | false    | End time of sub-account creation                                                                                                                                                         |             |               |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             |             |               |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |             |               |

#### Response Parameter

| Parameter       | Data Type    | Required | Description                                                            | Value Range  |
| --------------- | ------------ | -------- | ---------------------------------------------------------------------- | ------------ |
| status          | string       | true     | Request the processing result                                          | ok , "error" |
| DATA_START      |              | true     |                                                                        |              |
| query_id        |              | false    |                                                                        |              |
| ERRORS_START    | object array | true     |                                                                        |              |
| sub_uid         | string       | true     | sub uid                                                                |              |
| err_code        | string       | true     | error code                                                             |              |
| err_msg         | string       | true     | error message                                                          |              |
| ERRORS_END      |              | false    |                                                                        |              |
| SUCCESSES_START | object array | false    |                                                                        |              |
| sub_uid         | string       | true     | sub uid                                                                |              |
| sub_auth        | string       | true     | sub auth, 1:enable, 0:disable                                          |              |
| SUCCESSES_START |              | false    |                                                                        |              |
| DATA_END        |              | false    |                                                                        |              |
| ts              | long         | true     | The point in time at which the response was generated, in milliseconds |              |

#### Request example

`curl "https://api.hbdm.com?sub_uid=441618222,462826107,117196834&direct=next&from_id=23512590&start_time=&end_time="`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "sub_uid": "117196834",
        "err_code": 1010,
        "err_msg": "用户不存在"
      }
    ],
    "successes": [
      {
        "query_id": 23512591,
        "sub_uid": "441618222",
        "sub_auth": 1
      },
      {
        "query_id": 25460798,
        "sub_uid": "462826107",
        "sub_auth": 1
      }
    ]
  },
  "ts": 1705391607255
}
```

### /api/v1/contract_sub_account_list (Query assets information of all sub-accounts under the master account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                                              | Value Range                   | Default Value                                                                                                                      |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | string    | false    | type code                                                                                                                                                                                |                               | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"... ,if blank, it will return all contract types by default |
| direct    | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next, prev default is next    | next                                                                                                                               |
| from_id   | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result | Search query_id to begin with |                                                                                                                                    |

#### Response Parameter

| Parameter         | Data Type | Required | Description                                                                  | Value Range    |
| ----------------- | --------- | -------- | ---------------------------------------------------------------------------- | -------------- |
| status            | string    | true     | the handling result of requests                                              | "ok" , "error" |
| ts                | long      | true     | the create time point of response, unit: ms                                  |                |
| DATA_START        |           | false    |                                                                              |                |
| sub_uid           | long      | true     | sub-account UID                                                              |                |
| LIST_START        |           | false    |                                                                              |                |
| symbol            | string    | true     | type code                                                                    | "BTC","ETH"... |
| margin_balance    | decimal   | true     | account equity                                                               |                |
| liquidation_price | decimal   | true     | estimated liquidation price                                                  |                |
| risk_rate         | decimal   | true     | margin rate                                                                  |                |
| query_id          | long      | true     | Query id, which can be used as the from_id field for the next query request. |                |
| LIST_END          |           | false    |                                                                              |                |
| DATA_END          |           | false    |                                                                              |                |

Notes:

Only return data for activated contract sub-account (i.e. sub-accounts that have
gained contract trading permission).

#### Request example

```
{
  "symbol": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "sub_uid": 123456789,
      "list": [
        {
          "symbol": "ADA",
          "margin_balance": 50,
          "liquidation_price": null,
          "risk_rate": null
        }
      ]
    }
  ],
  "ts": 1604301647427
}
```

### /api/v1/contract_sub_account_info_list (Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                         | Value Range                               | Default Value |
| ---------- | --------- | -------- | ----------------------------------- | ----------------------------------------- | ------------- |
| symbol     | string    | false    | symbol                              | "BTC","ETH"... ,if not filled, return all |               |
| page_index | int       | false    | page index, if not filled in as 1st |                                           |               |
| page_size  | int       | false    | if not filled in as 20，50 at most  |                                           |               |

Notes:

Only return data of sub-accounts that have agreed to access the contract market.

#### Response Parameter

| Parameter               | Data Type   | Required | Description                                   | Value Range    |
| ----------------------- | ----------- | -------- | --------------------------------------------- | -------------- |
| status                  | string      | true     | the result of server handling to request      | "ok" . "error" |
| ts                      | long        | true     | Time of Respond Generation，Unit：Millisecond |                |
| DATA_START              | object      | true     |                                               |                |
| sub_uid                 | long        | true     | sub uid                                       |                |
| ACCOUNT_INFO_LIST_START | objectarray | true     |                                               |                |
| symbol                  | string      | true     | symbol                                        | "BTC","ETH"... |
| margin_balance          | decimal     | true     | margin balance                                |                |
| liquidation_price       | decimal     | true     | liquidation price                             |                |
| risk_rate               | decimal     | true     | risk rate                                     |                |
| ACCOUNT_INFO_LIST_END   |             | false    |                                               |                |
| SUB_LIST_END            |             | false    |                                               |                |
| current_page            | int         | true     | current page                                  |                |
| total_page              | int         | true     | total page                                    |                |
| total_size              | int         | true     | total size                                    |                |
| DATA_END                |             | false    |                                               |                |

#### Request example

```
{
  "symbol": "BTC",
  "page_index": 1,
  "page_size": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 1,
    "current_page": 1,
    "total_size": 2,
    "sub_list": [
      {
        "sub_uid": 123456789,
        "account_info_list": [
          {
            "symbol": "BCH",
            "margin_balance": 0,
            "liquidation_price": null,
            "risk_rate": null
          }
        ]
      },
      {
        "sub_uid": 12345678,
        "account_info_list": [
          {
            "symbol": "BCH",
            "margin_balance": 0,
            "liquidation_price": null,
            "risk_rate": null
          }
        ]
      }
    ]
  },
  "ts": 1612490180078
}
```

### /api/v1/contract_sub_account_info (Query a single sub-account's assets information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description     | Value Range                                                                                                                        | Default Value |
| --------- | --------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | string    | false    | type code       | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，if blank, it will return all contract types by default |               |
| sub_uid   | long      | true     | sub-account UID |                                                                                                                                    |               |

#### Response Parameter

| Parameter          | Data Type  | Required | Description                                            | Value Range                                                                        |
| ------------------ | ---------- | -------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| status             | string     | true     | the handling result of requests                        | "ok" , "error"                                                                     |
| ts                 | long       | true     | the create time point of response, unit: ms            |                                                                                    |
| DATA_START         |            | false    |                                                        |                                                                                    |
| symbol             | string     | true     | type code                                              | "BTC","ETH"...when the\$symbol value is "\*", it will subscribe all contract types |
| margin_balance     | decimal    | true     | account equity                                         |                                                                                    |
| margin_position    | decimal    | true     | position margin (the margin used by current positions) |                                                                                    |
| margin_frozen      | decimal    | true     | frozen margin                                          |                                                                                    |
| margin_available   | decimal    | true     | available margin                                       |                                                                                    |
| profit_real        | decimal    | true     | realized profits and losses                            |                                                                                    |
| profit_unreal      | decimal    | true     | unrealized profits and losses                          |                                                                                    |
| risk_rate          | decimal    | true     | margin rate                                            |                                                                                    |
| liquidation_price  | decimal    | true     | estimated liquidation price                            |                                                                                    |
| withdraw_available | decimal    | true     | available transfer amount                              |                                                                                    |
| lever_rate         | decimal    | true     | leverage ratios                                        |                                                                                    |
| adjust_factor      | decimal    | true     | Adjustment Factor                                      |                                                                                    |
| margin_static      | decimal    | true     | Static Margin                                          |                                                                                    |
| new_risk_rate      | bigdecimal | true     | new risk rate                                          |                                                                                    |
| trade_partition    | string     | true     | trade partition                                        |                                                                                    |
| DATA_END           |            | false    |                                                        |                                                                                    |

Notes:

Only query account information for activated contract sub-account (i.e.
sub-accounts that have gained contract trading permission);

No data return for sub-accounts which has logged in hbdm but have not gained
trading permission/activated.

#### Request example

```
{
  "symbol": "BTC",
  "sub_uid": 123456
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "margin_balance": 50,
      "margin_position": 0,
      "margin_frozen": 0,
      "margin_available": 50,
      "profit_real": 0,
      "profit_unreal": 0,
      "risk_rate": null,
      "withdraw_available": 50,
      "liquidation_price": null,
      "lever_rate": 5,
      "adjust_factor": 0.1,
      "margin_static": 5,
      "new_risk_rate": "",
      "trade_partition": ""
    }
  ],
  "ts": 1604301730723
}
```

### /api/v1/contract_sub_position_info (Query a single sub-account's position information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description     | Value Range                                                                                                                        | Default Value |
| --------- | --------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | string    | false    | type code       | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，if blank, it will return all contract types by default |               |
| sub_uid   | long      | true     | sub-account UID |                                                                                                                                    |               |

#### Response Parameter

| Parameter        | Data Type  | Required | Description                                                                       | Value Range                                                                                            |
| ---------------- | ---------- | -------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| status           | string     | true     | the handling result of requests                                                   | "ok" , "error"                                                                                         |
| ts               | long       | true     | the create time point of response, unit: ms                                       |                                                                                                        |
| DATA_START       |            | false    |                                                                                   |                                                                                                        |
| symbol           | string     | true     | type code                                                                         | "BTC","ETH"...                                                                                         |
| contract_code    | string     | true     | contract code                                                                     | "BTC180914" ...                                                                                        |
| contract_type    | string     | true     | contract type                                                                     | Weekly:"this_week", Biweekly:"next_week", Quarterly:"quarter", Next Quarterly Contract: "next_quarter" |
| volume           | decimal    | true     | open interest                                                                     |                                                                                                        |
| available        | decimal    | true     | available positions to close                                                      |                                                                                                        |
| frozen           | decimal    | true     | amount of frozen positions                                                        |                                                                                                        |
| cost_open        | decimal    | true     | average price of open positions                                                   |                                                                                                        |
| cost_hold        | decimal    | true     | average price of positions                                                        |                                                                                                        |
| profit_unreal    | decimal    | true     | unrealized profits and losses                                                     |                                                                                                        |
| profit_rate      | decimal    | true     | profit rate                                                                       |                                                                                                        |
| profit           | decimal    | true     | profits                                                                           |                                                                                                        |
| position_margin  | decimal    | true     | position margin                                                                   |                                                                                                        |
| lever_rate       | int        | true     | leverage ratios                                                                   |                                                                                                        |
| direction        | string     | true     | transaction direction of positions                                                | "buy":long "sell":short                                                                                |
| last_price       | decimal    | true     | Latest price                                                                      |                                                                                                        |
| adl_risk_percent | decimal    | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5                                                                                          |
| liq_px           | string     | true     | Estimated liquidation price                                                       |                                                                                                        |
| new_risk_rate    | bigdecimal | true     | new risk rate                                                                     |                                                                                                        |
| trade_partition  | string     | true     | trade partition                                                                   |                                                                                                        |
| DATA_END         |            | false    |                                                                                   |                                                                                                        |

#### Request example

```
{
  "symbol": "BTC",
  "sub_uid": 123456789
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "contract_code": "ADA201225",
      "contract_type": "quarter",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 0.0991,
      "cost_hold": 0.0991,
      "profit_unreal": -0.04686106551835051,
      "profit_rate": -0.002321965796434265,
      "lever_rate": 5,
      "position_margin": 20.191006925515374,
      "direction": "buy",
      "profit": -0.04686106551835051,
      "last_price": 0.099054,
      "adl_risk_percent": "3",
      "liq_px": "7786",
      "new_risk_rate": "",
      "trade_partition": ""
    }
  ],
  "ts": 1604302891178
}
```

### /api/v3/contract_financial_record (Query account financial records(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value                                                                                                                                                                                                 |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time | long      | false    |                                                                                                                                                                                          | (now) – 48h                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end_time   | long      | false    |                                                                                                                                                                                          | now                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | next, prev default is prev                                                                                                                                                                                    |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Search query_id to begin with                                                                                                                                                                                 |
| symbol     | string    | true     | contract code                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Case-Insenstive.e.g. "BTC-USD"                                                                                                                                                                                |
| type       | string    | true     | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\]                                                                                        | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |                                                                                                                                                                                                               |

#### Response Parameter

| Parameter     | Data Type   | Required | Description          | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ----------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code          | int         | true     | State code           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| msg           | string      | true     | The code description |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ts            | long        | true     | Timestamp            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| DATA_START    | objectarray | true     |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| id            | long        | true     |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ts            | long        | true     | create time          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| symbol        | string      | true     | asset                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| contract_code | string      | true     | contract code        | "BTC-USD"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| type          | int         | true     | transaction Type     | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |
| amount        | decimal     | true     | amount               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| DATA_END      |             | false    |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Request example

```
{
  "type": "3,4,5,6,7,8",
  "symbol": "BTC",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "id": 3662498355,
      "symbol": "ADA",
      "type": 8,
      "amount": -0.07476635514018691,
      "ts": 1605014144415,
      "contract_code": "ADA201225"
    }
  ],
  "ts": 1604312615051
}
```

### /api/v3/contract_financial_record_exact (Query financial records via multiple fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value                                                                                                                                                                                                 |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                            | (now) – 48h                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                              | now                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | next, prev default is prev                                                                                                                                                                                    |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Search query_id to begin with                                                                                                                                                                                 |
| symbol     | string    | true     | contract code                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Case-Insenstive.e.g. "BTC-USD"                                                                                                                                                                                |
| type       | string    | true     | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\]                                                                                        | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |                                                                                                                                                                                                               |

#### Response Parameter

| Parameter     | Data Type   | Required | Description          | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ----------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code          | int         | true     | State code           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| msg           | string      | true     | The code description |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ts            | long        | true     | Timestamp            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| DATA_START    | objectarray | true     |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| id            | long        | true     |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ts            | long        | true     | create time          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| symbol        | string      | true     | asset                | "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| contract_code | string      | true     | contract code        | "BTC200919"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| type          | int         | true     | transaction Type     | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |
| amount        | decimal     | true     | amount               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| DATA_END      |             | false    |                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Request example

```
{
  "type": "3,4,5,6,7,8",
  "symbol": "BTC",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "id": 3657420903,
      "symbol": "ADA",
      "type": 34,
      "amount": -50,
      "ts": 1604301623306,
      "contract_code": "ADA"
    }
  ],
  "ts": 1604312615051
}
```

### /api/v1/contract_user_settlement_records (Query user’s settlement records)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                | Value Range                                                                             | Default Value |
| ---------- | --------- | -------- | ------------------------------------------ | --------------------------------------------------------------------------------------- | ------------- |
| symbol     | string    | true     | contract symbol                            | "BTC","ETH"...                                                                          |               |
| start_time | long      | false    | start time（Timestamp，Unit: Millisecond） | Value Range: \[(current time - 90 days), current time\] ，default current day - 90 days |               |
| end_time   | long      | false    | end time（Timestamp，Unit: Millisecond）   | Value Range: (start_time, current time\]，default current time                          |               |
| page_index | int       | false    | Page                                       | 1st page by default without given instruction                                           |               |
| page_size  | int       | false    | page size                                  | Page 20 by default without given instruction, ，no more than 50                         |               |

Notes:

The data is queried in reverse order by default; the newer the data, the closer
to the front.

If the start time or the end time is not within the value range, the system will
report an error 1067 to indicate the parameter is invalid.

Query users' settlement records with settlement start time behind the start_time
but before the end_time.

This interface only supports users to query data for the last 90 days.

#### Response Parameter

| Parameter                | Data Type   | Required | Description                                                                                                                          | Value Range                                  |
| ------------------------ | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| status                   | string      | true     | Request Processing Result                                                                                                            |                                              |
| DATA_START               | object      | true     |                                                                                                                                      |                                              |
| SETTLEMENT_RECORDS_START | objectarray | true     |                                                                                                                                      |                                              |
| symbol                   | string      | true     | Contract Code                                                                                                                        | "BTC","ETH"...                               |
| margin_balance_init      | decimal     | true     | Initial account equity for this term                                                                                                 |                                              |
| margin_balance           | decimal     | true     | Account equity after settlement for this term                                                                                        |                                              |
| settlement_profit_real   | decimal     | true     | Realized PnL for this term                                                                                                           |                                              |
| settlement_time          | long        | true     | Settlement time for this term; delivery time if at the delivery.                                                                     |                                              |
| clawback                 | decimal     | true     | Clawback for this term                                                                                                               |                                              |
| delivery_fee             | decimal     | true     | Delivery fee for this term（total fee of long and short positions）, the field has value only when the positions are at the delivery |                                              |
| offset_profitloss        | decimal     | true     | Current term PnL of positions closed                                                                                                 |                                              |
| fee                      | decimal     | true     | Transaction fee for this term                                                                                                        |                                              |
| fee_asset                | string      | true     | Transaction Fee Coin                                                                                                                 |                                              |
| POSITIONS_START          | objectarray | true     |                                                                                                                                      |                                              |
| symbol                   | string      | true     | Coin Code                                                                                                                            | "BTC","ETH"...                               |
| contract_code            | string      | true     | Contract Code                                                                                                                        | "BTC200619" ...                              |
| direction                | string      | true     | Position Direction                                                                                                                   | \[buy : sell \]                              |
| volume                   | decimal     | true     | Position volume before the settlement of this term（cont）                                                                           |                                              |
| cost_open                | decimal     | true     | Open price                                                                                                                           |                                              |
| cost_hold_pre            | decimal     | true     | Average position price before the settlement of this term                                                                            |                                              |
| cost_hold                | decimal     | true     | Average position price after the settlement of this term                                                                             |                                              |
| settlement_profit_unreal | decimal     | true     | Unrealized PnL for this term                                                                                                         |                                              |
| settlement_price         | decimal     | true     | Settlement price for this term; delivery price if at the delivery.                                                                   |                                              |
| settlement_type          | string      | true     | Settlement Type                                                                                                                      | settlement: settlement；delivery: delivery； |
| POSITIONS_END            |             | false    |                                                                                                                                      |                                              |
| SETTLEMENT_RECORDS_END   |             | false    |                                                                                                                                      |                                              |
| total_page               | int         | true     | Total Pages                                                                                                                          |                                              |
| current_page             | int         | true     | Current Page                                                                                                                         |                                              |
| total_size               | int         | true     | Total Size                                                                                                                           |                                              |
| DATA_END                 |             | false    |                                                                                                                                      |                                              |
| ts                       | long        | true     | Timestamp                                                                                                                            |                                              |

Notes:

Rule:

settlement_time for this term is the start time of the settlement.

As long as the user has had funds, there will be settlement records. If the user
queried has no settlement record, no data will be returned. (data will be an
empty array)

#### Request example

```
{
  "symbol": "BTC",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "page_index": 1,
  "page_size": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 13,
    "current_page": 1,
    "total_size": 13,
    "settlement_records": [
      {
        "symbol": "ADA",
        "margin_balance_init": 436.4159070661078,
        "margin_balance": 436.7956042232747,
        "settlement_profit_real": 0.37969715716693053,
        "settlement_time": 1604044800130,
        "clawback": 0,
        "delivery_fee": 0,
        "offset_profitloss": 13.259773191595539,
        "fee": -0.5653571299770925,
        "fee_asset": "ADA",
        "positions": [
          {
            "symbol": "ADA",
            "contract_code": "ADA201225",
            "direction": "buy",
            "volume": 2,
            "cost_open": 0.098,
            "cost_hold_pre": 0.098,
            "cost_hold": 0.092423,
            "settlement_profit_unreal": -12.314718904451516,
            "settlement_price": 0.092423,
            "settlement_type": "settlement"
          }
        ]
      }
    ]
  },
  "ts": 1604305358564
}
```

### /api/v1/contract_order_limit (Query contract information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description   | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value |
| ---------------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contracts by default                                                                                                                                                                                                                                                                                                                                                                                                                              |               |
| order_price_type | string    | true     | Order Type    | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order,"opponent_ioc"：IOC order using the BBO price，"lightning_ioc"：lightning IOC，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC， "optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"lightning_fok"：lightning FOK，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                                   | Value Range                                                                                                                                                                                            |
| ---------------- | --------- | -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status           | string    | true     | Request Processing Result                     | "ok" , "error"                                                                                                                                                                                         |
| ts               | long      | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                                                                                                                        |
| DATA_START       |           | false    |                                               |                                                                                                                                                                                                        |
| order_price_type | string    | true     | Order Type                                    | "limit": Limit Order，"opponent":BBO，"lightning": Flash Close，"optimal_5": Optimal top 5 price，"optimal_10":Optimal top 10 price，"optimal_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order |
| LIST_START       |           | false    |                                               |                                                                                                                                                                                                        |
| symbol           | string    | true     | Contract Code                                 | "BTC","ETH"...                                                                                                                                                                                         |
| TYPES_START      |           | false    |                                               |                                                                                                                                                                                                        |
| contract_type    | string    | true     | Contract Type                                 | Weekly:"this_week", Bi-weekly:"next_week", Quarterly:"quarter". Next Quarterly Contract: "next_quarter"                                                                                                |
| open_limit       | long      | true     | Max open order limit                          |                                                                                                                                                                                                        |
| close_limit      | long      | true     | Max close order limit                         |                                                                                                                                                                                                        |
| TYPES_END        |           | false    |                                               |                                                                                                                                                                                                        |
| LIST_END         |           | false    |                                               |                                                                                                                                                                                                        |
| DATA_END         |           | false    |                                               |                                                                                                                                                                                                        |

#### Request example

```
{
  "symbol": "btc",
  "order_price_type": "limit"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_price_type": "limit",
    "list": [
      {
        "symbol": "ADA",
        "types": [
          {
            "contract_type": "this_week",
            "open_limit": 6000,
            "close_limit": 12000
          },
          {
            "contract_type": "next_week",
            "open_limit": 6000,
            "close_limit": 12000
          },
          {
            "contract_type": "quarter",
            "open_limit": 6000,
            "close_limit": 12000
          },
          {
            "contract_type": "next_quarter",
            "open_limit": 6000,
            "close_limit": 12000
          }
        ]
      }
    ]
  },
  "ts": 1604306946036
}
```

### /api/v1/contract_fee (Query information on contract trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description   | Value Range                                                                                                                                    | Default Value |
| --------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | string    | false    | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contract by default |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                       | Value Range    |
| --------------- | --------- | -------- | ------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                         | "ok" , "error" |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond     |                |
| DATA_START      |           | false    |                                                   |                |
| symbol          | string    | true     | Contract Code                                     | "BTC","ETH"... |
| open_maker_fee  | string    | true     | Open maker order fee, decimal                     |                |
| open_taker_fee  | string    | true     | Open taker order fee, decimal                     |                |
| close_maker_fee | string    | true     | Close maker order fee, decimal                    |                |
| close_taker_fee | string    | true     | Close taker order fee, decimal                    |                |
| delivery_fee    | string    | true     | delivery fee, decimal                             |                |
| fee_asset       | string    | true     | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| DATA_END        |           | false    |                                                   |                |

#### Request example

```
{
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "open_maker_fee": "0.0002",
      "open_taker_fee": "0.0004",
      "close_maker_fee": "0.0002",
      "close_taker_fee": "0.0004",
      "delivery_fee": "0.0005",
      "fee_asset": "ADA"
    }
  ],
  "ts": 1604307012954
}
```

### /api/v1/contract_transfer_limit (Query information on Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description   | Value Range                                                                                                                                      | Default Value |
| --------- | --------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| symbol    | string    | false    | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contracts by default. |               |

#### Response Parameter

| Parameter                  | Data Type | Required | Description                                  | Value Range    |
| -------------------------- | --------- | -------- | -------------------------------------------- | -------------- |
| status                     | string    | true     | Request Processing Result                    | "ok" , "error" |
| ts                         | long      | true     | Time of Respond Generation, Unit: Milesecond |                |
| DATA_START                 |           | false    |                                              |                |
| symbol                     | string    | true     | Contract Code                                | "BTC","ETH"... |
| transfer_in_max_each       | decimal   | true     | Max limit of a single deposit                |                |
| transfer_in_min_each       | decimal   | true     | Min limit of a single deposit                |                |
| transfer_out_max_each      | decimal   | true     | Max limit of a single withdrawal             |                |
| transfer_out_min_each      | decimal   | true     | Min limit of a single withdrawal             |                |
| transfer_in_max_daily      | decimal   | true     | Max daily limit of total deposits            |                |
| transfer_out_max_daily     | decimal   | true     | Max daily limit of totally withdrawals       |                |
| net_transfer_in_max_daily  | decimal   | true     | Max daily limit of net total deposits        |                |
| net_transfer_out_max_daily | decimal   | true     | Max daily limit of net total withdrawals     |                |
| DATA_END                   |           | false    |                                              |                |

#### Request example

```
{
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "transfer_in_max_each": 1500000000,
      "transfer_in_min_each": 16,
      "transfer_out_max_each": 150000000,
      "transfer_out_min_each": 0.000001,
      "transfer_in_max_daily": 15000000000,
      "transfer_out_max_daily": 3000000000,
      "net_transfer_in_max_daily": 7500000000,
      "net_transfer_out_max_daily": 1500000000
    }
  ],
  "ts": 1604307084954
}
```

### /api/v1/contract_position_limit (Query information on position limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description   | Value Range                                                                                                                                      | Default Value |
| --------- | --------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| symbol    | string    | false    | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contracts by default. |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                     | Value Range                                                                                               |
| ------------- | --------- | -------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                       | "ok" , "error"                                                                                            |
| ts            | long      | true     | Time of Responding Generation, Unit: milesecond |                                                                                                           |
| DATA_START    |           | false    |                                                 |                                                                                                           |
| symbol        | string    | true     | Contract Code                                   | "BTC","ETH"...                                                                                            |
| LIST_START    |           | false    |                                                 |                                                                                                           |
| contract_type | string    | true     | Contract Type                                   | Weekly :"this_week", Bi-weekly:"next_week", Quarterly:"quarter"， Next Quarterly Contract: "next_quarter" |
| buy_limit     | decimal   | true     | Max long position limit, Unit: Cont             |                                                                                                           |
| sell_limit    | decimal   | true     | Max short position limit, Unit: Cont            |                                                                                                           |
| LIST_END      |           | false    |                                                 |                                                                                                           |
| DATA_END      |           | false    |                                                 |                                                                                                           |

#### Request example

```
{
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "list": [
        {
          "contract_type": "this_week",
          "buy_limit": 60000,
          "sell_limit": 60000
        },
        {
          "contract_type": "next_week",
          "buy_limit": 60000,
          "sell_limit": 60000
        },
        {
          "contract_type": "quarter",
          "buy_limit": 60000,
          "sell_limit": 60000
        },
        {
          "contract_type": "next_quarter",
          "buy_limit": 60000,
          "sell_limit": 60000
        },
        {
          "contract_type": "all",
          "buy_limit": 240000,
          "sell_limit": 240000
        }
      ]
    }
  ],
  "ts": 1604307195501
}
```

### /api/v1/contract_account_position_info (Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range                                                                 | Default Value |
| --------- | --------- | -------- | ----------- | --------------------------------------------------------------------------- | ------------- |
| symbol    | string    | true     | symbol      | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH".... |               |

#### Response Parameter

| Parameter          | Data Type   | Required | Description                                                                       | Value Range                                        |
| ------------------ | ----------- | -------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| status             | string      | true     | Request Processing Result                                                         | "ok" , "error"                                     |
| ts                 | long        | true     | Time of Respond Generation, Unit: Millisecond                                     |                                                    |
| DATA_START         | objectarray | true     |                                                                                   |                                                    |
| symbol             | string      | true     | contract type                                                                     |                                                    |
| margin_balance     | decimal     | true     | Balance Margin                                                                    |                                                    |
| margin_position    | decimal     | true     | Postion Margin                                                                    |                                                    |
| margin_frozen      | decimal     | true     | Frozen Margin                                                                     |                                                    |
| margin_available   | decimal     | true     | Available Margin                                                                  |                                                    |
| profit_real        | decimal     | true     | Realized Profit                                                                   |                                                    |
| profit_unreal      | decimal     | true     | Unreadlized Profit                                                                |                                                    |
| risk_rate          | decimal     | true     | risk rate                                                                         |                                                    |
| withdraw_available | decimal     | true     | Available Withdraw                                                                |                                                    |
| liquidation_price  | decimal     | true     | Estimated Liquidation Price                                                       |                                                    |
| lever_rate         | decimal     | true     | Leverage Rate                                                                     |                                                    |
| adjust_factor      | decimal     | true     | Adjustment Factor                                                                 |                                                    |
| margin_static      | decimal     | true     | Static Margin                                                                     |                                                    |
| new_risk_rate      | bigdecimal  | true     | new risk rate                                                                     |                                                    |
| trade_partition    | string      | true     | trade partition                                                                   |                                                    |
| POSITIONS_START    |             | false    |                                                                                   |                                                    |
| symbol             | string      | true     | Variety Code                                                                      |                                                    |
| contract_code      | string      | true     | Contract Code                                                                     | "BTC180914" ...                                    |
| contract_type      | string      | true     | Contract Type                                                                     | "this_week", "next_week", "quarter" "next_quarter" |
| volume             | decimal     | true     | Position Quantity                                                                 |                                                    |
| available          | decimal     | true     | Available position quatity can be closed                                          |                                                    |
| frozen             | decimal     | true     | forzen postion Quantity                                                           |                                                    |
| cost_open          | decimal     | true     | Opening Average Price                                                             |                                                    |
| cost_hold          | decimal     | true     | Average position price                                                            |                                                    |
| profit_unreal      | decimal     | true     | Unrealized profit                                                                 |                                                    |
| profit_rate        | decimal     | true     | Profit Rate                                                                       |                                                    |
| profit             | decimal     | true     | Profit                                                                            |                                                    |
| position_margin    | decimal     | true     | Position Margin                                                                   |                                                    |
| lever_rate         | int         | true     | Leverage Rate                                                                     |                                                    |
| direction          | string      | true     | transaction direction of positions                                                | "buy":long "sell":short                            |
| last_price         | decimal     | true     | Last Price                                                                        |                                                    |
| adl_risk_percent   | decimal     | false    | The risk level of the current position being forced to reduce the position by adl | 1、2、3、4、5                                      |
| POSITIONS_END      |             | false    |                                                                                   |                                                    |
| DATA_END           |             | false    |                                                                                   |                                                    |

#### Request example

```
{
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "margin_balance": 405.2261241458438,
      "margin_position": 10.300252356182726,
      "margin_frozen": 0,
      "margin_available": 394.9258717896611,
      "profit_real": 16.33616992280033,
      "profit_unreal": 2.094349999768738,
      "risk_rate": 39.14137826269924,
      "withdraw_available": 386.7956042232747,
      "liquidation_price": null,
      "lever_rate": 10,
      "adjust_factor": 0.2,
      "margin_static": 403.13177414607503,
      "new_risk_rate": "",
      "trade_partition": "",
      "positions": [
        {
          "symbol": "ADA",
          "contract_code": "ADA201225",
          "contract_type": "quarter",
          "volume": 1,
          "available": 1,
          "frozen": 0,
          "cost_open": 0.0991,
          "cost_hold": 0.0991,
          "profit_unreal": 2.094349999768738,
          "profit_rate": 0.20755008497708194,
          "lever_rate": 10,
          "position_margin": 10.300252356182726,
          "direction": "sell",
          "profit": 2.094349999768738,
          "last_price": 0.097085,
          "adl_risk_percent": "3"
        }
      ]
    }
  ],
  "ts": 1604307305267
}
```

### /api/v1/contract_master_sub_transfer (Transfer between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                           | Value Range                                                               | Default Value |
| --------------- | --------- | -------- | ------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| sub_uid         | long      | true     | uid of sub account                    |                                                                           |               |
| symbol          | string    | true     | symbol                                | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |               |
| amount          | decimal   | true     | transfer amount                       |                                                                           |               |
| type            | string    | true     | transfer type                         | "master_to_sub" or "sub_to_master"                                        |               |
| client_order_id | long      | false    | Clients fill and maintain themselves. | \[1, 9223372036854775807\]                                                |               |

Notes:

the rate limit between the master account and each subaccount is 10 times/
minute

The client_order_id is valid in 8 hours only, that is the user cannot use the
same client_order_id beyonds one times for the same transfer path (for example,
transfer currency from master account to sub-account using client_order_id=1,
and you can't do that transfe currency from master account to sub-account using
client_order_id=1 in the next time; but you can transfer currency from
sub-account to master account using client_order_id=1).

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range    |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string    | true     | status                                                                                             | "ok" , "error" |
| ts              | long      | true     | response timestamp，millionseconds                                                                 |                |
| DATA_START      | object    | true     |                                                                                                    |                |
| order_id        | string    | true     | order id                                                                                           |                |
| client_order_id | long      | false    | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| DATA_END        |           | false    |                                                                                                    |                |

#### Request example

```
{
  "sub_uid": "123456789",
  "symbol": "BTC",
  "amount": "123",
  "type": "master_to_sub"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": "772874532490125313"
  },
  "ts": 1604309247876
}
```

### /api/v1/contract_master_sub_transfer_record (Get transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                 | Value Range                                                               | Default Value |
| ------------- | --------- | -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                                      | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |               |
| transfer_type | string    | false    | All by default【multiple types need to be joined with ';'】 | 34:transfer to sub account 35:transfer from sub account                   |               |
| create_date   | int       | true     | days                                                        | days need to be less than or equal to 90                                  |               |
| page_index    | int       | false    | 1 by default                                                |                                                                           |               |
| page_size     | int       | false    | 20 by default.less than or equal to 50.                     | \[1-50\]                                                                  |               |

#### Response Parameter

| Parameter             | Data Type   | Required | Description              | Value Range                                             |
| --------------------- | ----------- | -------- | ------------------------ | ------------------------------------------------------- |
| status                | string      | true     | respone status           | "ok" , "error"                                          |
| ts                    | long        | true     | response millionseconds. |                                                         |
| DATA_START            | object      | true     |                          |                                                         |
| TRANSFER_RECORD_START | objectarray | true     |                          |                                                         |
| id                    | long        | true     | transfer id              |                                                         |
| ts                    | long        | true     | create timestamp         |                                                         |
| symbol                | string      | true     | symbol                   | "BTC","ETH"...                                          |
| sub_uid               | string      | true     | subaccount uid           |                                                         |
| sub_account_name      | string      | true     | subaccount name          |                                                         |
| transfer_type         | int         | true     | transfer type            | transfer from subaccount：35，transfer to subaccount:34 |
| amount                | decimal     | true     | amount                   |                                                         |
| TRANSFER_RECORD_END   |             | false    |                          |                                                         |
| total_page            | int         | true     | total page               |                                                         |
| current_page          | int         | true     | current page             |                                                         |
| total_size            | int         | true     | total size               |                                                         |
| DATA_END              |             | false    |                          |                                                         |

#### Request example

```
{
  "symbol": "BTC",
  "transfer_type": "34",
  "create_date": 30,
  "page_index": 1,
  "page_size": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 1,
    "current_page": 1,
    "total_size": 2,
    "transfer_record": [
      {
        "id": 3657499070,
        "symbol": "ADA",
        "transfer_type": 34,
        "amount": -1,
        "ts": 1604309247860,
        "sub_uid": "123456789",
        "sub_account_name": "tom"
      },
      {
        "id": 3657420904,
        "symbol": "ADA",
        "transfer_type": 34,
        "amount": -50,
        "ts": 1604301623314,
        "sub_uid": "123456789",
        "sub_account_name": "tom"
      }
    ]
  },
  "ts": 1604309883224
}
```

### /api/v1/contract_api_trading_status (Query user's API indicator disable information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter              | Data Type   | Required | Description                                          | Value Range                                                   |
| ---------------------- | ----------- | -------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| status                 | string      | true     | response status                                      | "ok" , "error"                                                |
| ts                     | long        | true     | response millionseconds                              |                                                               |
| DATA_START             | arrayobject | true     |                                                      |                                                               |
| is_disable             | long        | true     |                                                      | 1：is disabled，0：isn't disabled                             |
| order_price_types      | string      | true     | order price types,such as：“limit,post_only,FOK,IOC” |                                                               |
| disable_reason         | string      | true     | disable reason                                       | "COR":（Cancel Order Ratio），“TDN”：（Total Disable Number） |
| disable_interval       | long        | true     | disable millionseconds                               |                                                               |
| recovery_time          | long        | true     | recovery millionseconds                              |                                                               |
| COR_START              | dictobject  | true     | （Cancel Order Ratio）                               |                                                               |
| orders_threshold       | long        | true     | orders threshold                                     |                                                               |
| orders                 | long        | true     | total pending orders                                 |                                                               |
| invalid_cancel_orders  | long        | true     | numbers of invalid cancel orders                     |                                                               |
| cancel_ratio_threshold | decimal     | true     | cancel ratio threshold                               |                                                               |
| cancel_ratio           | decimal     | true     | cancel ratio                                         |                                                               |
| is_trigger             | int         | true     |                                                      | 1: triggered，0: not triggered                                |
| is_active              | int         | true     |                                                      | 1: active，0：not active                                      |
| COR_END                | dictobject  | true     |                                                      |                                                               |
| TDN_START              | dictobject  | true     | Total Disable Number                                 |                                                               |
| disables_threshold     | long        | true     | disable threshold                                    |                                                               |
| disables               | long        | true     | total disable number                                 |                                                               |
| is_trigger             | long        | true     |                                                      | 1：triggered，0：not triggered                                |
| is_active              | long        | true     |                                                      |                                                               |
| TDN_END                | dictobject  | true     |                                                      |                                                               |
| DATA_END               |             | false    |                                                      |                                                               |

#### Request example

`curl"https://api.hbdm.com/api/v1/contract_api_trading_status"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "is_disable": 1,
      "order_price_types": "limit,post_only,FOK,IOC",
      "disable_reason": "COR",
      "disable_interval": 5,
      "recovery_time": 1,
      "COR": {
        "orders_threshold": 150,
        "orders": 150,
        "invalid_cancel_orders": 150,
        "cancel_ratio_threshold": 0.98,
        "cancel_ratio": 0.98,
        "is_trigger": 1,
        "is_active": 1
      },
      "TDN": {
        "disables_threshold": 3,
        "disables": 3,
        "is_trigger": 1,
        "is_active": 1
      }
    }
  ],
  "ts": 158797866555
}
```

### /api/v1/contract_available_level_rate (Query Available Leverage Rate)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description      | Value Range   | Default Value |
| --------- | --------- | -------- | ---------------- | ------------- | ------------- |
| symbol    | string    | false    | case-insensitive | "BTC" , "ETH" |               |

#### Response Parameter

| Parameter            | Data Type   | Required | Description                         | Value Range    |
| -------------------- | ----------- | -------- | ----------------------------------- | -------------- |
| status               | string      | true     | response status                     | "ok" , "error" |
| ts                   | long        | true     | response millionseconds             |                |
| DATA_START           | arrayobject | true     |                                     |                |
| symbol               | string      | false    | case-insensitive                    | "BTC" , "ETH"  |
| available_level_rate | string      | true     | available level rate,splited by ',' | "1,5,10"       |
| DATA_END             |             | false    |                                     |                |

#### Request example

```
{
  "symbol": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "available_level_rate": "1,2,3,5,10,20,30,50,75"
    }
  ],
  "ts": 1604312615051
}
```

### /api/v1/contract-cancel-after ( Automatic Order Cancellation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Huobi Futures launches the automatic order cancellation
interface to prevent API users from incurring unexpected losses in the event of
network failures or client system failures that result in a loss of
communication with the Huobi system. When users experience an unexpected
disconnection from Huobi's system, this interface automatically cancels all
pending orders (including both opening and closing orders) to mitigate potential
losses through its Dead Man's Switch functionality. If the interface is not
called again within the specified period, all of the user's pending futures
orders will be canceled.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                                                                                                                                                                   | Value Range                                                    | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
| on_off    | int       | true     | Enable and disable the automatic order cancellation feature                                                                                                                                                                                                                                                   | 1 refers to enable the feature;0 refers to disable the feature |               |
| time_out  | int       | false    | Configure a countdown timer for automatic order cancellation. If the feature is not disabled when the countdown ends, all pending orders placed by the user will be canceled. It is advisable to set the timer when enabling the feature; otherwise, the default countdown is 5,000 milliseconds (5 seconds). | ≥ 5,000 ms                                                     | 5,000 ms      |

Notes:

The system checks all countdowns approximately every 10 ms. Therefore, please be
aware that when using this feature, redundancy should be taken into account. We
do not recommend setting the countdowns too precisely or too small.

#### Response Parameter

| Parameter     | Data Type | Required | Description                                    | Value Range |
| ------------- | --------- | -------- | ---------------------------------------------- | ----------- |
| code          | int       | false    | Status code                                    |             |
| msg           | string    | false    | Error description                              |             |
| ts            | long      | false    | Time of responding, unit: millisecond (ms)     |             |
| DATA> \_START | object    | false    |                                                |             |
| current_time  | long      | false    | Current time (subject to platform server time) |             |
| trigger_time  | long      | false    | Trigger time (subject to platform server time) |             |
| DATA_END      |           | false    |                                                |             |

#### Request example

No data

#### Response Example

##### Success Example

No data

### /api/v1/contract_order (Place an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Value Range                                                                                                                                                  | Default Value |
| ------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| symbol              | string     | false    | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| contract_type       | string     | false    | Contract Type ("this_week": "next_week": "quarter": "next_quarter")                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |               |
| contract_code       | string     | false    | BTC180914                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                              |               |
| client_order_id     | long       | false    | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\]                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| price               | decimal    | false    | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| volume              | long       | true     | Numbers of orders (volume)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| direction           | string     | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| offset              | string     | true     | "open", "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                              |               |
| lever_rate          | int        | true     | Leverage rate \[if“Open”is multiple orders in 10 rate, there will be not multiple orders in 20 rate. Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time. \]                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                              |               |
| order_price_type    | string     | true     | "limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20，ioc: IOC Order,，fok：FOK Order. "opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |                                                                                                                                                              |               |
| tp_trigger_price    | decimal    | false    | Trigger price of take-profit order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |               |
| tp_order_price      | decimal    | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N)                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |               |
| tp_order_price_type | string     | false    | Order type of take-profit order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| sl_trigger_price    | decimal    | false    | Trigger price of stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |               |
| sl_order_price      | decimal    | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| sl_order_price_type | string     | false    | Order type of stop-loss order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                              |               |
| price_protect       | booleanint | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                                                                                                                                                                                                                                                                                                                                                                                 | true or false                                                                                                                                                |               |
| self_match_prevent  | int        | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |               |

Notes:

If there is a number in the Contract Code row，inquiry with Contract_Code.

If there is no number，inquiry by Symbol + Contract Type.

"limit"，"post_only"，"ioc" and "fok" the four order price type need price value
and the other don't need.

Post-Only orders are limit orders that will never take liquidity (also called
maker-only order). There are order limit and position for post-only orders which
the upper limit is 500,000 for open/close orders under weekly, bi-weekly and
quarterly contract respectively.

If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit
order, and the stop loss trigger price is a required field for setting a stop
loss order; if the trigger price field is not filled in, the corresponding take
profit order or stop loss order will not be set.

Description of post_only: assure that the maker order remains as maker order, it
will not be filled immediately with the use of post_only, for the match system
will automatically check whether the price of the maker order is higher/lower
than the opponent first price, i.e. higher than bid price 1 or lower than the
ask price 1. If yes, the maker order will placed on the orderbook, if not, the
maker order will be cancelled.

open long: direction - buy、offset - open

close long: direction -sell、offset - close

open short: direction -sell、offset - open

close short: direction -buy、offset - close

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal_5: top 5
optimal BBO price, optimal_10：top 10 optimal BBO price, optimal_20：top 20
optimal BBO price (No need to transfer price data) ，limit": limit order,
"post_only": maker order only (price data transfer is needed),IOC
:Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at
the best prices offered by the opposite side. In the event of extreme volatility
or insufficient liquidity，there is a risk that your orders may not be filled in
full. Any unfilled part will remain open in the market pending further
execution. Selecting BBO means you understand how this order type is executed
and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range    |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                                                                          | "ok" , "error" |
| DATA_START      |           | false    |                                                                                                    |                |
| order_id        | long      | true     | Order ID                                                                                           |                |
| order_id_str    | string    | true     | Order ID                                                                                           |                |
| client_order_id | int       | true     | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| DATA_END        |           | false    |                                                                                                    |                |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond                                                      |                |

Notes:

The return order_id is 18 bits, it will make mistake when nodejs and JavaScript
analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by
default. so the number over 18 bits need be parsed by jaso-bigint package.

#### Request example

```
{
  "contract_code": "bch210326",
  "direction": "buy",
  "offset": "open",
  "price": 360,
  "lever_rate": 75,
  "volume": 1,
  "order_price_type": "opponent",
  "tp_trigger_price": 450,
  "tp_order_price": 450,
  "tp_order_price_type": "optimal_5",
  "sl_trigger_price": 330,
  "sl_order_price": 330,
  "sl_order_price_type": "optimal_5"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 773119326353580000,
    "order_id_str": "773119326353580033"
  },
  "ts": 1604367611267
}
```

### /api/v1/contract_batchorder (Place a Batch of Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Value Range                                                                                                                                                  | Default Value |
| ------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| orders_data         | List<Object> | false    | 25 orders most.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                              |               |
| symbol              | string       | false    | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| contract_type       | string       | false    | Contract Type: "this_week": "next_week": "quarter": "next_quarter"                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |               |
| contract_code       | string       | false    | BTC180914                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                              |               |
| client_order_id     | long         | false    | Clients fill and maintain themselves. the value must be in \[1, 9223372036854775807\]                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| price               | decimal      | false    | Price                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| volume              | long         | true     | Numbers of orders (volume)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| direction           | string       | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                              |               |
| offset              | string       | true     | "open": "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                              |               |
| leverRate           | int          | true     | Leverage rate \[if “Open” is multiple orders in 10 rate, there will be not multiple orders in 20 rate.Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time. \]                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                              |               |
| orderPriceType      | string       | true     | "limit”: Limit Order "opponent":BBO "post_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal_5： Optimal , optimal_10： Optimal 10, optimal_20：Optimal 20 ,ioc: IOC Order,，fok：FOK Order ,"opponent_ioc"：IOC order using the BBO price，"optimal_5_ioc"：optimal_5 IOC，"optimal_10_ioc"：optimal_10 IOC，"optimal_20_ioc"：optimal_20 IOC, "opponent_fok"：FOK order using the BBO price，"optimal_5_fok"：optimal_5 FOK，"optimal_10_fok"：optimal_10 FOK，"optimal_20_fok"：optimal_20 FOK |                                                                                                                                                              |               |
| tp_trigger_price    | decimal      | false    | Trigger price of take-profit order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                              |               |
| tp_order_price      | decimal      | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N)                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                              |               |
| tp_order_price_type | string       | false    | Order type of take-profit order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| sl_trigger_price    | decimal      | false    | Trigger price of stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                              |               |
| sl_order_price      | decimal      | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                              |               |
| sl_order_price_type | string       | false    | Order type of stop-loss order default is limit; limit，optimal_5，optimal_10，optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                              |               |
| price_protect       | booleanint   | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                                                                                                                                                                                                                                                                                                                                                                                 | true or false                                                                                                                                                |               |
| self_match_prevent  | int          | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |               |

Notes:

If there is a number in the Contract Code row,inquiry with Contract_Code.

If there is no number,inquiry by Symbol + Contract Type.

"limit"，"post_only"，"ioc" and "fok" the four order price type need price value
and the other don't need.

Description of post_only: assure that the maker order remains as maker order, it
will not be filled immediately with the use of post_only, for the match system
will automatically check whether the price of the maker order is higher/lower
than the opponent first price, i.e. higher than bid price 1 or lower than the
ask price 1. If yes, the maker order will placed on the orderbook, if not, the
maker order will be cancelled.

If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit
order, and the stop loss trigger price is a required field for setting a stop
loss order; if the trigger price field is not filled in, the corresponding take
profit order or stop loss order will not be set.

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal_5: top 5
optimal BBO price, optimal_10：top 10 optimal BBO price, optimal_20：top 20
optimal BBO price (No need to transfer price data) ，limit": limit order,
"post_only": maker order only (price data transfer is needed),IOC
:Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at
the best prices offered by the opposite side. In the event of extreme volatility
or insufficient liquidity，there is a risk that your orders may not be filled in
full. Any unfilled part will remain open in the market pending further
execution. Selecting BBO means you understand how this order type is executed
and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                                                                        | Value Range    |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                                                                          | "ok" , "error" |
| DATA_START      |           | false    |                                                                                                    |                |
| ERRORS_START    |           | false    |                                                                                                    |                |
| index           | int       | true     | order Index                                                                                        |                |
| err_code        | int       | true     | Error code                                                                                         |                |
| err_msg         | string    | true     | Error information                                                                                  |                |
| ERRORS_END      |           | false    |                                                                                                    |                |
| SUCCESS_START   |           | false    |                                                                                                    |                |
| index           | int       | true     | order Index                                                                                        |                |
| order_id        | long      | true     | Order ID                                                                                           |                |
| order_id_str    | string    | true     | Order ID                                                                                           |                |
| client_order_id | long      | true     | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |                |
| SUCCESS_END     |           | false    |                                                                                                    |                |
| DATA_END        |           | false    |                                                                                                    |                |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond                                                      |                |

Notes:

The return order_id is 18 bits, it will make mistake when nodejs and JavaScript
analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by
default. so the number over 18 bits need be parsed by jaso-bigint package.

#### Request example

```
{
  "orders_data": [
    {
      "contract_code": "bch210326",
      "direction": "buy",
      "offset": "open",
      "price": 360,
      "lever_rate": 75,
      "volume": 1,
      "order_price_type": "opponent",
      "tp_trigger_price": 450,
      "tp_order_price": 450,
      "tp_order_price_type": "optimal_5",
      "sl_trigger_price": 330,
      "sl_order_price": 330,
      "sl_order_price_type": "optimal_5"
    },
    {
      "contract_code": "bch210326",
      "direction": "buy",
      "offset": "open",
      "price": 360,
      "lever_rate": 75,
      "volume": 1,
      "order_price_type": "post_only",
      "tp_trigger_price": 450,
      "tp_order_price": 450,
      "tp_order_price_type": "optimal_5",
      "sl_trigger_price": 330,
      "sl_order_price": 330,
      "sl_order_price_type": "optimal_5"
    }
  ]
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "index": 1,
        "err_code": 1037,
        "err_msg": "The leverage is invalid. Please contact the customer service."
      }
    ],
    "success": [
      {
        "order_id": 773120304138219500,
        "index": 2,
        "order_id_str": "773120304138219520"
      }
    ]
  },
  "ts": 1604367844388
}
```

### /api/v1/contract_cancel (Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                         | Value Range | Default Value |
| --------------- | --------- | -------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| order_id        | string    | false    | Order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time）       |             |               |
| client_order_id | string    | false    | Client order ID (different IDs are separated by ",", maximum 10 orders can be withdrew at one time) |             |               |
| symbol          | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.."BTC","ETH"...                          |             |               |

Notes:

Both order_id and client_order_id can be used for order withdrawl，one of them
needed at one time，if both of them are set，the default will be order id。

The return data from Cancel An Order Interface only means that order cancelation
designation is executed successfully. To check cancelation result, please check
your order status at Get Information Of An Order interface.

client_order_id, order status query is available for orders placed within 24
hours; Otherwise, clients cannot check orders placed beyond 24 hours.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                               | Value Range    |
| ------------ | --------- | -------- | --------------------------------------------------------- | -------------- |
| status       | string    | true     | Request Processing Result                                 | "ok" , "error" |
| DATA_START   |           | false    |                                                           |                |
| ERRORS_START |           | false    |                                                           |                |
| order_id     | string    | true     | Order ID                                                  |                |
| err_code     | int       | true     | Error code                                                |                |
| err_msg      | string    | true     | Error information                                         |                |
| ERRORS_END   |           | false    |                                                           |                |
| successes    | string    | true     | Successfully withdrew list of order_id or client_order_id |                |
| DATA_END     |           | false    |                                                           |                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond             |                |

#### Request example

```
{
  "order_id": "634696656176029696,634693443368525824",
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "769206471845261312",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "773120304138219520"
  },
  "ts": 1604367997451
}
```

### /api/v1/contract_cancelall (Cancel All Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                 | Value Range | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported..Variety code，eg "BTC","ETH"... |             |               |
| contract_code | string    | false    | contract_code                                                                               |             |               |
| contract_type | string    | false    | contract_type                                                                               |             |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) \["buy" , "sell"\]                        |             |               |
| offset        | string    | false    | offset direction（if not filled in means all） \["open" , "close"\]                         |             |               |

Notes:

Send symbol to cancel all the contracts of that kind of symbol, e.g. send “BTC”
to cancel all BTC weekly, biweekly and quarterly contracts.

Send contract_code to cancel the contracts of that code.

Send symbol+contract_type to cancel the certain contracts under the symbol of
that contract_type, e.g. send “BTC” and “this week”, then the BTC weekly
contracts will be cancelled.

You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range    |
| ------------ | --------- | -------- | --------------------------------------------- | -------------- |
| status       | string    | true     | Request Processing Result                     | "ok" , "error" |
| DATA_START   |           | false    |                                               |                |
| ERRORS_START |           | false    |                                               |                |
| order_id     | string    | true     | Order ID                                      |                |
| err_code     | int       | true     | failed order error messageError code          |                |
| err_msg      | string    | true     | failed order information                      |                |
| ERRORS_END   |           | false    |                                               |                |
| successes    | string    | true     | Successful order                              |                |
| DATA_END     |           | false    |                                               |                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond |                |

#### Request example

```
{
  "symbol": "btc",
  "contract_code": "btc200925",
  "contract_type": "quarter"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "773120045672095744,773120045684678656"
  },
  "ts": 1604369127577
}
```

### /api/v1/contract_switch_lever_rate (Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                         | Value Range    | Default Value |
| ---------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| symbol     | string    | true     | Variety code                                                                                                                        | "BTC","ETH"... |               |
| lever_rate | int       | true     | Leverage to switch.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time. \] |                |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description       | Value Range |
| ---------- | --------- | -------- | ----------------- | ----------- |
| status     | string    | true     | status: ok,error  |             |
| DATA_START | object    | false    |                   |             |
| symbol     | string    | false    | Variety code      |             |
| lever_rate | int       | false    | Switched leverage |             |
| DATA_END   |           | false    |                   |             |
| err_code   | int       | false    | error code        |             |
| err_msg    | string    | false    | error msg         |             |
| ts         | long      | true     | Timestamp         |             |

#### Request example

```
{
  "symbol": "BTC",
  "lever_rate": 10
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "ada",
    "lever_rate": 20
  },
  "ts": 1604369902689
}
```

### /api/v1/contract_order_info (Get Information of an Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                                  | Value Range | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ------------- |
| order_id        | string    | false    | Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time）                |             |               |
| client_order_id | string    | false    | Client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |             |               |
| symbol          | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.."BTC","ETH"...                                   |             |               |

Notes:

When getting information on order cancellation via get order information
interface, users can only query last 4-hour data

At least one of order_id and client_order_id must be filled in

Both order_id and client_order_id can be used to query, and only one of them can
be filled in at the same time. If two are filled in, only order_id is effect to
query. After daily settlement or delivery on Friday, the orders in the end state
(5:partially filled orders have been cancelled, 6:all filled orders, 7:have been
cancelled) will be deleted.

client_order_id，order status query is available for orders placed within 24
hours; Otherwise, clients cannot check orders placed beyond 24 hours.

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                                                                                                                                                                        | Value Range                                                                                                                                                  |
| ------------------ | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status             | string    | true     | Request Processing Result                                                                                                                                                                                                                          | "ok" , "error"                                                                                                                                               |
| DATA_START         |           | false    |                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| symbol             | string    | true     | Variety code                                                                                                                                                                                                                                       |                                                                                                                                                              |
| contract_type      | string    | true     | Contract Type                                                                                                                                                                                                                                      | "this_week", "next_week", "quarter","next_quarter"                                                                                                           |
| contract_code      | string    | true     | Contract Code                                                                                                                                                                                                                                      | "BTC180914" ...                                                                                                                                              |
| volume             | decimal   | true     | Numbers of order                                                                                                                                                                                                                                   |                                                                                                                                                              |
| price              | decimal   | true     | Price committed                                                                                                                                                                                                                                    |                                                                                                                                                              |
| order_price_type   | string    | true     | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                            |                                                                                                                                                              |
| direction          | string    | true     | Transaction direction                                                                                                                                                                                                                              |                                                                                                                                                              |
| offset             | string    | true     | "open": "close"                                                                                                                                                                                                                                    |                                                                                                                                                              |
| lever_rate         | int       | true     | Leverage rate                                                                                                                                                                                                                                      | 1，5，10，20                                                                                                                                                 |
| order_id           | long      | true     | Order ID                                                                                                                                                                                                                                           |                                                                                                                                                              |
| order_id_str       | string    | true     | Order ID                                                                                                                                                                                                                                           |                                                                                                                                                              |
| order_type         | int       | true     | Order type                                                                                                                                                                                                                                         | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                          |
| client_order_id    | long      | true     | Client order ID                                                                                                                                                                                                                                    |                                                                                                                                                              |
| created_at         | long      | true     | Creation time                                                                                                                                                                                                                                      |                                                                                                                                                              |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                                                                                                                                                               |                                                                                                                                                              |
| trade_turnover     | decimal   | true     | Transaction aggregate amount                                                                                                                                                                                                                       |                                                                                                                                                              |
| fee                | decimal   | true     | Service fee                                                                                                                                                                                                                                        |                                                                                                                                                              |
| trade_avg_price    | decimal   | true     | Transaction average price                                                                                                                                                                                                                          |                                                                                                                                                              |
| margin_frozen      | decimal   | true     | Frozen margin                                                                                                                                                                                                                                      |                                                                                                                                                              |
| profit             | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                  |                                                                                                                                                              |
| status             | int       | true     | status: 1. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |                                                                                                                                                              |
| order_source       | string    | true     | order source                                                                                                                                                                                                                                       | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                        |
| fee_asset          | string    | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                  | "BTC","ETH"...                                                                                                                                               |
| canceled_at        | long      | true     | Cancellation time                                                                                                                                                                                                                                  |                                                                                                                                                              |
| liquidation_type   | string    | true     | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                              |                                                                                                                                                              |
| is_tpsl            | int       | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                     | 1：yes；0：no                                                                                                                                                |
| real_profit        | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                     |                                                                                                                                                              |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                    |                                                                                                                                                              |
| self_match_prevent | int       | false    | Self trading prevention                                                                                                                                                                                                                            | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1. |
| DATA_END           |           | false    |                                                                                                                                                                                                                                                    |                                                                                                                                                              |
| ts                 | long      | true     | Timestamp                                                                                                                                                                                                                                          |                                                                                                                                                              |

Notes:

The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).

Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

```
{
  "order_id": "773119326353580033,634693443368525824",
  "symbol": "btc"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "ADA",
      "contract_code": "ADA201225",
      "contract_type": "quarter",
      "volume": 1,
      "price": 0.0933,
      "order_price_type": "post_only",
      "order_type": 1,
      "direction": "sell",
      "offset": "open",
      "lever_rate": 10,
      "order_id": 773119326353580000,
      "client_order_id": null,
      "created_at": 1604367611263,
      "trade_volume": 1,
      "trade_turnover": 10,
      "fee": -0.021436227224008574,
      "trade_avg_price": 0.0933,
      "margin_frozen": 0,
      "profit": 0,
      "status": 6,
      "order_source": "api",
      "order_id_str": "773119326353580033",
      "fee_asset": "ADA",
      "liquidation_type": "0",
      "canceled_at": 0,
      "is_tpsl": 0,
      "real_profit": 0
    }
  ],
  "ts": 1604370179844
}
```

### /api/v1/contract_order_detail (Order Details Acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                               | Value Range                                                                         | Default Value |
| ---------- | --------- | -------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------- |
| symbol     | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |                                                                                     |               |
| order_id   | long      | true     | Order ID                                                                  |                                                                                     |               |
| created_at | long      | true     | Timestamp                                                                 |                                                                                     |               |
| order_type | int       | true     | Order type                                                                | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |               |
| page_index | int       | false    | Page number, default 1st page                                             |                                                                                     |               |
| page_size  | int       | false    | Default 20，no more than 50                                               |                                                                                     |               |

Notes:

When getting information on order cancellation via query order detail interface,
users who type in parameters “created_at” and “order_type” can query last 6-hour
data, while users who don’t type in parameters “created_at” and “order_type” can
only query last 2-hour data.

The return order_id is 18 bits, it will make mistake when nodejs and JavaScript
analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by
default. so the number over 18 bits need be parsed by jason-bigint package.

created_at should use timestamp of long type as 13 bits (include Millisecond),
if send the accurate timestamp for "created_at", query performance will be
improved.

eg. the timestamp "2019/10/18 10:26:22" can be changed：1571365582123.It can
also directly obtain the timestamp（ts) from the returned ordering
interface(contract_order) to query the corresponding orders.

Please note that created_at can't be "0"

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                                                       | Value Range                                                                                                                                                                                                                                 |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | string    | true     | Request Processing Result                                                                                                                                                                                                                                                                                                                                         | "ok" , "error"                                                                                                                                                                                                                              |
| DATA_START         |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| symbol             | string    | true     | Variety code                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                             |
| contract_type      | string    | true     | Contract Type                                                                                                                                                                                                                                                                                                                                                     | "this_week","next_week","quarter","next_quarter"                                                                                                                                                                                            |
| contract_code      | string    | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                     | "BTC180914" ...                                                                                                                                                                                                                             |
| lever_rate         | int       | true     | Leverage Rate                                                                                                                                                                                                                                                                                                                                                     | 1,5,10,20                                                                                                                                                                                                                                   |
| direction          | string    | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                             |
| offset             | string    | true     | "open": "close"                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| volume             | decimal   | true     | Number of Order                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| price              | decimal   | true     | Price committed                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| created_at         | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                             |
| canceled_at        | long      | true     | Cancellation time                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                             |
| order_source       | string    | true     | Order Source                                                                                                                                                                                                                                                                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                       |
| order_price_type   | string    | true     | order price type                                                                                                                                                                                                                                                                                                                                                  | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                     |
| margin_frozen      | decimal   | true     | Frozen margin                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                             |
| profit             | decimal   | true     | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                          |                                                                                                                                                                                                                                             |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| order_id           | long      | true     | Order ID                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                             |
| order_id_str       | string    | true     | Order ID                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                             |
| order_type         | int       | true     | Order type                                                                                                                                                                                                                                                                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                         |
| client_order_id    | long      | true     | Client order ID                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                             |
| trade_turnover     | decimal   | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                             |
| fee                | decimal   | true     | Service fee                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                             |
| trade_avg_price    | decimal   | true     | Transaction average price                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                             |
| status             | int       | true     | status                                                                                                                                                                                                                                                                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| total_page         | int       | true     | Page in total                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                             |
| current_page       | int       | true     | Current Page                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                             |
| total_size         | int       | true     | Total Size                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                             |
| instrument_price   | decimal   | true     | Liquidation price                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                             |
| final_interest     | decimal   | true     | Account Balance After Liquidation                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                             |
| adjust_value       | decimal   | true     | Adjustment Factor of Liquidating Order                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                             |
| fee_asset          | string    | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                 | "BTC","ETH"...                                                                                                                                                                                                                              |
| liquidation_type   | string    | true     | liquidation type                                                                                                                                                                                                                                                                                                                                                  | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                       |
| is_tpsl            | int       | true     | whether to set take-profit and stop-loss order                                                                                                                                                                                                                                                                                                                    | 1：yes；0：no                                                                                                                                                                                                                               |
| real_profit        | decimal   | true     | total real profit of order (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                             |
| TRADES_START       |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| id                 | string    | true     | the global unique id of the trade.                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                             |
| trade_id           | long      | true     | In this interface, trade_id is the same with match_id of /api/v1/contract_matchresults. trade_id is the result of sets of order execution and trade confirmation. NOTE: trade_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade_id. |                                                                                                                                                                                                                                             |
| trade_price        | decimal   | true     | Match Price                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                             |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                             |
| trade_turnover     | decimal   | true     | Transaction price                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                             |
| trade_fee          | decimal   | true     | Transaction Service fee                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                             |
| role               | string    | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                             |
| created_at         | long      | true     | Creation time                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                             |
| profit             | decimal   | true     | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                             |
| real_profit        | decimal   | true     | real profit of the transaction (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                             |
| TRADES_END         |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| self_match_prevent | int       | false    | Self trading prevention                                                                                                                                                                                                                                                                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                |
| DATA_END           |           | false    |                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                             |
| ts                 | long      | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                             |

Notes:

The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).

Only the real profit parameter (real_profit) of the transaction information that
orders created after 0:00 on January 30, 2021 has a value . And of the other
order transaction information that orders created before that times, the real
profit parameter is 0.

#### Request example

```
{
  "created_at": 1593765713010,
  "order_id": 727181510507044900,
  "order_type": 1,
  "page_index": 1,
  "page_size": 20,
  "symbol": "BTC"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "ADA",
    "contract_code": "ADA201225",
    "contract_type": "quarter",
    "instrument_price": 0,
    "final_interest": 0,
    "adjust_value": 0,
    "lever_rate": 10,
    "direction": "sell",
    "offset": "open",
    "volume": 1,
    "price": 0.0933,
    "created_at": 1604367611263,
    "canceled_at": 0,
    "order_source": "api",
    "order_price_type": "post_only",
    "margin_frozen": 0,
    "profit": 0,
    "trades": [
      {
        "trade_id": 113887800667,
        "trade_price": 0.0933,
        "trade_volume": 1,
        "trade_turnover": 10,
        "trade_fee": -0.021436227224008574,
        "created_at": 1604368087894,
        "role": "maker",
        "real_profit": 0,
        "profit": 0,
        "id": "113887800667-773119326353580033-1"
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1,
    "liquidation_type": "0",
    "fee_asset": "ADA",
    "order_id": 773119326353580000,
    "order_id_str": "773119326353580033",
    "client_order_id": null,
    "order_type": "1",
    "status": 6,
    "trade_avg_price": 0.0933,
    "trade_turnover": 10,
    "trade_volume": 1,
    "is_tpsl": 0,
    "real_profit": 0,
    "fee": -0.021436227224008574
  },
  "ts": 1604370259827
}
```

### /api/v1/contract_openorders (Query Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                 | Value Range | Default Value                                                                                          |
| ---------- | --------- | -------- | --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| symbol     | string    | false    | symbol,If empty, query all  |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                              |
| page_index | int       | false    | Page, default 1st page      | 1           |                                                                                                        |
| page_size  | int       | false    | Default 20，no more than 50 | 20          | \[1-50\]                                                                                               |
| sort_by    | string    | false    | sort fields(descending)     | created_at  | “created_at”descending order by order created at, "update_time": descending order by order update time |
| trade_type | int       | false    | trade type(Default:all)     | 0           | 0:all,1: buy long,2: sell short,3: buy short,4: sell long                                              |

#### Response Parameter

| Parameter          | Data Type | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                 |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | string    | true     | Request Processing Result                                                                                         |                                                                                                                                                                                                                                             |
| DATA_START         |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| ORDERS_START       |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| symbol             | string    | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                             |
| contract_type      | string    | true     | Contract Type                                                                                                     | "this_week","next_week","quarter","next_quarter"                                                                                                                                                                                            |
| contract_code      | string    | true     | Contract Code                                                                                                     | "BTC180914" ...                                                                                                                                                                                                                             |
| volume             | decimal   | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                             |
| price              | decimal   | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                             |
| order_price_type   | string    | true     | order price type                                                                                                  | "limit", "opponent","post_only" Position limit will be applied to post_only while order limit will not.                                                                                                                                     |
| order_type         | int       | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                 |
| direction          | string    | true     | Transaction direction                                                                                             |                                                                                                                                                                                                                                             |
| offset             | string    | true     | "open": "close"                                                                                                   |                                                                                                                                                                                                                                             |
| lever_rate         | int       | true     | Leverage Rate                                                                                                     | 1\\5\\10\\20                                                                                                                                                                                                                                |
| order_id           | long      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                             |
| order_id_str       | string    | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                             |
| client_order_id    | long      | true     | Client order ID                                                                                                   |                                                                                                                                                                                                                                             |
| created_at         | long      | true     | Order Creation time                                                                                               |                                                                                                                                                                                                                                             |
| trade_volume       | decimal   | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                             |
| trade_turnover     | decimal   | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                             |
| fee                | decimal   | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                             |
| trade_avg_price    | decimal   | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                             |
| margin_frozen      | decimal   | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                             |
| profit             | decimal   | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                             |
| status             | int       | true     | status                                                                                                            | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order_source       | string    | true     | Order Source                                                                                                      | ( system. web. api. m. risk. settlement. ios. android. windows. mac. trigger. tpsl)                                                                                                                                                         |
| fee_asset          | string    | true     | the corresponding cryptocurrency to the given fee                                                                 | "BTC","ETH"...                                                                                                                                                                                                                              |
| is_tpsl            | int       | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                               |
| update_time        | Long      | true     | order update time ，millesecond timestamp                                                                         |                                                                                                                                                                                                                                             |
| real_profit        | decimal   | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                             |
| ORDERS_END         |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| total_page         | int       | true     | Total Pages                                                                                                       |                                                                                                                                                                                                                                             |
| current_page       | int       | true     | Current Page                                                                                                      |                                                                                                                                                                                                                                             |
| total_size         | int       | true     | Total Size                                                                                                        |                                                                                                                                                                                                                                             |
| self_match_prevent | int       | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                |
| canceled_source    | string    | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                             |
| DATA_END           |           | false    |                                                                                                                   |                                                                                                                                                                                                                                             |
| ts                 | long      | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                             |

Notes:

The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).

Only of the order information that orders created after 0:00 on January 30,
2021, the real profit (real_profit) parameter has a value. And in the other
orders created before that times, it is 0.

#### Request example

```
{
  "symbol": "BTC",
  "page_index": 1,
  "page_size": 20,
  "sort_by": "created_at",
  "trade_type": 0
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "ADA",
        "contract_code": "ADA201225",
        "contract_type": "quarter",
        "volume": 1,
        "price": 0.0925,
        "order_price_type": "post_only",
        "order_type": 1,
        "direction": "buy",
        "offset": "close",
        "lever_rate": 20,
        "order_id": 773131315209248800,
        "client_order_id": null,
        "created_at": 1604370469629,
        "trade_volume": 0,
        "trade_turnover": 0,
        "fee": 0,
        "trade_avg_price": null,
        "margin_frozen": 0,
        "profit": 0,
        "status": 3,
        "order_source": "web",
        "order_id_str": "773131315209248768",
        "fee_asset": "ADA",
        "liquidation_type": null,
        "canceled_at": null,
        "is_tpsl": 0,
        "update_time": 1606975980467,
        "real_profit": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1604370488518
}
```

### /api/v3/contract_hisorders (Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                             | Default Value                                                                                                                                                                                                 |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string    | true     | Variety code                                                                                                                                                                             |                                                                                                                                                                                                                         | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                                                                                                     |
| trade_type    | int       | true     | trading type                                                                                                                                                                             |                                                                                                                                                                                                                         | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short      |
| type          | int       | true     | Type                                                                                                                                                                                     |                                                                                                                                                                                                                         | 1:All Orders,2:Order in Finished Status                                                                                                                                                                       |
| status        | string    | true     | Order Status                                                                                                                                                                             | support multiple query seperated by ',',such as '3,4,5','0': all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |                                                                                                                                                                                                               |
| contract_code | string    | false    | contract code                                                                                                                                                                            | "BTC180914" ...                                                                                                                                                                                                         |                                                                                                                                                                                                               |
| order_type    | string    | false    | Order Type                                                                                                                                                                               | 1:"limit"，3:"opponent"，4:"lightning",5:"Trigger Order",6:"pst_only",7:"optimal_5"，8:"optimal_10"，9:"optimal_20",10:"fok":FOK order,11:"ioc":ioc order                                                               |                                                                                                                                                                                                               |
| start_time    | long      | false    |                                                                                                                                                                                          | (now) – 48h                                                                                                                                                                                                             | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end_time      | long      | false    |                                                                                                                                                                                          | now                                                                                                                                                                                                                     | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            |
| direct        | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next                                                                                                                                                                                                                    | next, prev default is prev                                                                                                                                                                                    |
| from_id       | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                                                                                                                                                                                                         | Search query_id to begin with                                                                                                                                                                                 |

#### Response Parameter

| Parameter          | Data Type   | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code               | int         | true     | State code                                                                                                        |                                                                                                                                                                                                                                                                                                                                               |
| msg                | string      | true     | The code description                                                                                              |                                                                                                                                                                                                                                                                                                                                               |
| ts                 | long        | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                               |
| DATA_START         | objectarray | true     |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| query_id           | long        | true     | next Query ID                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| order_id           | long        | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| order_id_str       | string      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| symbol             | string      | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                                                                                                                               |
| contract_code      | string      | true     | Contract Code                                                                                                     | "BTC180914" ...                                                                                                                                                                                                                                                                                                                               |
| contract_type      | string      | true     | Contract Type                                                                                                     | "this_week","next_week","quarter","next_quarter"                                                                                                                                                                                                                                                                                              |
| lever_rate         | int         | true     | Leverage Rate                                                                                                     | 1,5,10,20                                                                                                                                                                                                                                                                                                                                     |
| direction          | string      | true     | Transaction direction                                                                                             |                                                                                                                                                                                                                                                                                                                                               |
| offset             | string      | true     | offset direction                                                                                                  | 【open : close】                                                                                                                                                                                                                                                                                                                              |
| volume             | decimal     | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| price              | decimal     | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| create_date        | long        | true     | Creation time                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| update_time        | long        | true     | order update time，millesecond timestamp                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| order_source       | string      | true     | Order Source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                         |
| order_price_type   | string      | true     | order price types                                                                                                 | 1：limit，2：market，3：opponent，4：lightning，5：trigger，6：post_only ，7：optimal_5 ，8：optimal_10 ，9：optimal_20，10：FOK ，11：IOC ，12：opponent_ioc，13：lightning_ioc，14：optimal_5_ioc，15：optimal_10_ioc，16：optimal_20_ioc，17：opponent_fok，18：lightning_fok，19：optimal_5_fok，40：optimal_10_fok，41：optimal_20_fok . |
| margin_frozen      | decimal     | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| profit             | decimal     | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                               |
| trade_volume       | decimal     | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                                                                                                               |
| trade_turnover     | decimal     | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                                                                                                               |
| fee                | decimal     | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                               |
| trade_avg_price    | decimal     | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                                                                                                               |
| status             | int         | true     | order status                                                                                                      | 5\. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                             |
| order_type         | int         | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                           |
| fee_asset          | string      | true     | the corresponding cryptocurrency to the given fee                                                                 | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                            |
| liquidation_type   | string      | true     | liquidation type                                                                                                  | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                                                                                                                         |
| is_tpsl            | int         | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                 |
| real_profit        | decimal     | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                               |
| canceled_source    | string      | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing                   |                                                                                                                                                                                                                                                                                                                                               |
| self_match_prevent | int         | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                  |
| DATA_END           |             | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |

#### Request example

```
{
  "contract": "BTC-USD",
  "trade_type": 0,
  "symbol": "BTC",
  "type": 1,
  "status": "0",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110,
  "limit": 10
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "order_id": 773131315209248800,
      "contract_code": "ADA201225",
      "symbol": "ADA",
      "lever_rate": 20,
      "direction": "buy",
      "offset": "close",
      "volume": 1,
      "price": 0.0925,
      "create_date": 1604370469629,
      "update_time": 1604370469629,
      "order_source": "web",
      "order_price_type": 6,
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0,
      "contract_type": "quarter",
      "trade_volume": 0,
      "trade_turnover": 0,
      "fee": 0,
      "trade_avg_price": 0,
      "status": 3,
      "order_id_str": "773131315209248768",
      "fee_asset": "ADA",
      "liquidation_type": "0",
      "is_tpsl": "0",
      "real_profit": 0
    }
  ],
  "ts": 1604312615051
}
```

### /api/v3/contract_hisorders_exact (Query History Orders via Multiple fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                              | Value Range                                                                                                                                                                                                             | Default Value                                                                                                                                                                                                 |
| ------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string    | true     | Variety code                                                                                                                                                                             |                                                                                                                                                                                                                         | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                                                                                                     |
| trade_type    | int       | true     | trading type                                                                                                                                                                             |                                                                                                                                                                                                                         | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short      |
| type          | int       | true     | Type                                                                                                                                                                                     |                                                                                                                                                                                                                         | 0:all,1: buy long,2: sell short,3: buy short,4: sell long,5: sell liquidation,6: buy liquidation,7:Delivery long,8: Delivery short 11:reduce positions to close long，12:reduce positions to close short      |
| status        | string    | true     | Order Status                                                                                                                                                                             | support multiple query seperated by ',',such as '3,4,5','0': all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |                                                                                                                                                                                                               |
| contract_code | string    | false    | contract code                                                                                                                                                                            | "BTC180914" ...                                                                                                                                                                                                         |                                                                                                                                                                                                               |
| order_type    | string    | false    | Order Type                                                                                                                                                                               | 1:"limit"，3:"opponent"，4:"lightning",5:"Trigger Order",6:"pst_only",7:"optimal_5"，8:"optimal_10"，9:"optimal_20",10:"fok":FOK order,11:"ioc":ioc order                                                               |                                                                                                                                                                                                               |
| start_time    | long      | false    |                                                                                                                                                                                          | (now) – 48h                                                                                                                                                                                                             | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days, query window shift should be within past 2 hours for cancelled order |
| end_time      | long      | false    |                                                                                                                                                                                          | now                                                                                                                                                                                                                     | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days, queriable range should be within past 2 hours for cancelled order            |
| direct        | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order             | next                                                                                                                                                                                                                    | next, prev default is prev                                                                                                                                                                                    |
| from_id       | long      | false    | If the query direction is prev, from_id should be the min query_id in the last query result. If the query direction is next, from_id should be the max query_id in the last query result |                                                                                                                                                                                                                         | Search query_id to begin with                                                                                                                                                                                 |

#### Response Parameter

| Parameter          | Data Type   | Required | Description                                                                                                       | Value Range                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code               | int         | true     | State code                                                                                                        |                                                                                                                                                                                                                                                                                                                                               |
| msg                | string      | true     | The code description                                                                                              |                                                                                                                                                                                                                                                                                                                                               |
| ts                 | long        | true     | Timestamp                                                                                                         |                                                                                                                                                                                                                                                                                                                                               |
| DATA_START         | objectarray | true     |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| query_id           | long        | true     | next Query ID                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| order_id           | long        | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| order_id_str       | string      | true     | Order ID                                                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| symbol             | string      | true     | Variety code                                                                                                      |                                                                                                                                                                                                                                                                                                                                               |
| contract_code      | string      | true     | Contract Code                                                                                                     | "BTC180914" ...                                                                                                                                                                                                                                                                                                                               |
| contract_type      | string      | true     | Contract Type                                                                                                     | "this_week","next_week","quarter","next_quarter"                                                                                                                                                                                                                                                                                              |
| lever_rate         | int         | true     | Leverage Rate                                                                                                     | 1,5,10,20                                                                                                                                                                                                                                                                                                                                     |
| direction          | string      | true     | Transaction direction                                                                                             | 【buy : sell】                                                                                                                                                                                                                                                                                                                                |
| offset             | string      | true     | offset direction                                                                                                  | 【open : close】                                                                                                                                                                                                                                                                                                                              |
| volume             | decimal     | true     | Number of Order                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| price              | decimal     | true     | Price committed                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |
| create_date        | long        | true     | Creation time                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| update_time        | long        | true     | order update time，millesecond timestamp                                                                          |                                                                                                                                                                                                                                                                                                                                               |
| order_source       | string      | true     | Order Source                                                                                                      | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                                                                                                                                                                                                         |
| order_price_type   | string      | true     | order price types                                                                                                 | 1：limit，2：market，3：opponent，4：lightning，5：trigger，6：post_only ，7：optimal_5 ，8：optimal_10 ，9：optimal_20，10：FOK ，11：IOC ，12：opponent_ioc，13：lightning_ioc，14：optimal_5_ioc，15：optimal_10_ioc，16：optimal_20_ioc，17：opponent_fok，18：lightning_fok，19：optimal_5_fok，40：optimal_10_fok，41：optimal_20_fok . |
| margin_frozen      | decimal     | true     | Frozen margin                                                                                                     |                                                                                                                                                                                                                                                                                                                                               |
| profit             | decimal     | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |                                                                                                                                                                                                                                                                                                                                               |
| trade_volume       | decimal     | true     | Transaction quantity                                                                                              |                                                                                                                                                                                                                                                                                                                                               |
| trade_turnover     | decimal     | true     | Transaction aggregate amount                                                                                      |                                                                                                                                                                                                                                                                                                                                               |
| fee                | decimal     | true     | Service fee                                                                                                       |                                                                                                                                                                                                                                                                                                                                               |
| trade_avg_price    | decimal     | true     | Transaction average price                                                                                         |                                                                                                                                                                                                                                                                                                                                               |
| status             | int         | true     | order status                                                                                                      | 5\. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling.                                                                                                                                                                                                                             |
| order_type         | int         | true     | Order type                                                                                                        | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL                                                                                                                                                                                                                                                           |
| fee_asset          | string      | true     | the corresponding cryptocurrency to the given fee                                                                 | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                            |
| liquidation_type   | string      | true     | liquidation type                                                                                                  | 0:Not Forced Liquidation Type，1：Netting Type， 2: Partial Takeover，3：All Takeover                                                                                                                                                                                                                                                         |
| is_tpsl            | int         | true     | whether to set take-profit and stop-loss order                                                                    | 1：yes；0：no                                                                                                                                                                                                                                                                                                                                 |
| real_profit        | decimal     | true     | real profit (calculated with the opening average price, include profit in history settlement.)                    |                                                                                                                                                                                                                                                                                                                                               |
| canceled_source    | string      | false    | timeout-canceled-order: automatically cancel orders, prevent-self-dealing: prevent self-dealing-canceled-order    |                                                                                                                                                                                                                                                                                                                                               |
| self_match_prevent | int         | false    | Self trading prevention                                                                                           | 0 means self-trading is allowed, 1 means self-trading is not allowed, which means canceling taker orders and retaining maker orders. The default value is 1.                                                                                                                                                                                  |
| DATA_END           |             | false    |                                                                                                                   |                                                                                                                                                                                                                                                                                                                                               |

#### Request example

```
{
  "contract": "BTC-USD",
  "trade_type": 0,
  "symbol": "BTC",
  "type": 1,
  "status": "0",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "order_id": 773135295142658000,
      "contract_code": "ADA201225",
      "symbol": "ADA",
      "lever_rate": 20,
      "direction": "buy",
      "offset": "open",
      "volume": 1,
      "price": 0.092,
      "create_date": 1604371418518,
      "order_source": "web",
      "order_price_type": "post_only",
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0,
      "contract_type": "quarter",
      "trade_volume": 1,
      "trade_turnover": 10,
      "fee": -0.021739130434782608,
      "trade_avg_price": 0.092,
      "status": 6,
      "order_id_str": "773135295142658048",
      "fee_asset": "ADA",
      "liquidation_type": "0",
      "is_tpsl": 0,
      "real_profit": 0
    }
  ],
  "ts": 1604312615051
}
```

### /api/v3/contract_matchresults (Get History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                                                                                                                                                                                              | Value Range | Default Value                                                                                                                   |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| symbol     | string    | true     | symbol                                                                                                                                                                                                                   |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                       |
| contract   | string    | true     | contract code                                                                                                                                                                                                            |             |                                                                                                                                 |
| trade_type | int       | true     | Transaction type                                                                                                                                                                                                         |             | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions    |
| start_time | long      | false    | Query start time, query by data creation time                                                                                                                                                                            |             |                                                                                                                                 |
| end_time   | long      | false    | Query end time, query data by creation time                                                                                                                                                                              | now         | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days |
| direct     | string    | false    | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order                                             | next        | next, prev                                                                                                                      |
| from_id    | long      | false    | If the query direction is prev, from_id should be the min(the last entry)query_id in the last query result. If the query direction is next, from_id should be the max (the first entry)query_id in the last query result |             | Search query_id to begin with                                                                                                   |

#### Response Parameter

| Parameter         | Data Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                           | Value Range                                                                                                                                                      |
| ----------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code              | int         | true     | State code                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                  |
| msg               | string      | true     | The code description                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                  |
| ts                | long        | true     | Timestamp                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                  |
| DATA_START        | objectarray | true     |                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                  |
| query_id          | long        | true     | query id, can use as next request's from_id                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                  |
| id                | string      | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                  |
| match_id          | long        | true     | match_id is the same with trade_id of the websocket subscriptions: orders.\$symbol and matchOrders.\$symbol.match_id is the result of sets of order execution and trade confirmation. NOTE: match_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match_id. |                                                                                                                                                                  |
| order_id          | long        | true     | order ID                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                  |
| order_id_str      | string      | true     | order ID                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                  |
| symbol            | string      | true     | contract type code                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                  |
| contract_type     | string      | true     | contract type                                                                                                                                                                                                                                                                                                                                                                         | deliver on this Friday then "this_week"; deliver on next Friday then "next_week"; for quarterly contract then "quarter", Next Quarterly Contract: "next_quarter" |
| contract_code     | string      | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                                         | "BTC180914" ...                                                                                                                                                  |
| direction         | string      | true     | ransaction direction                                                                                                                                                                                                                                                                                                                                                                  | 【buy : sell"】                                                                                                                                                  |
| offset            | string      | true     | offset direction                                                                                                                                                                                                                                                                                                                                                                      | "open": open positions; "close": close positions                                                                                                                 |
| trade_volume      | decimal     | true     | the number of traded contract with unit of lot                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                  |
| trade_price       | decimal     | true     | the price at which orders get filled                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                  |
| trade_turnover    | decimal     | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                  |
| create_date       | long        | true     | the time when orders get filled                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                  |
| offset_profitloss | decimal     | true     | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                             |                                                                                                                                                                  |
| trade_fee         | decimal     | true     | fees charged by platform                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                  |
| role              | string      | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                  |
| real_profit       | decimal     | true     | real profit (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                        |                                                                                                                                                                  |
| fee_asset         | string      | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                                     | （"BTC","ETH"...）                                                                                                                                               |
| order_source      | string      | true     | Order Source                                                                                                                                                                                                                                                                                                                                                                          | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                                                                            |
| DATA_END          |             | false    |                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                  |
| ts                | long        | true     | timestamp                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                  |

#### Request example

```
{
  "contract": "BTC-USD",
  "trade_type": 0,
  "symbol": "BTC",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "match_id": 113891764710,
      "order_id": 773135295142658000,
      "symbol": "ADA",
      "contract_type": "quarter",
      "contract_code": "ADA201225",
      "direction": "buy",
      "offset": "open",
      "trade_volume": 1,
      "trade_price": 0.092,
      "trade_turnover": 10,
      "trade_fee": -0.021739130434782608,
      "offset_profitloss": 0,
      "create_date": 1604371703183,
      "role": "Maker",
      "order_source": "web",
      "order_id_str": "773135295142658048",
      "fee_asset": "ADA",
      "real_profit": 0,
      "id": "113891764710-773135295142658048-1"
    }
  ],
  "ts": 1604312615051
}
```

### /api/v3/contract_matchresults_exact (Query history transactions via multiple fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                      | Value Range                                                                                                                  | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol        | string    | true     | Variety code                                     | "BTC","ETH"...                                                                                                               |               |
| trade_type    | int       | true     | Transaction type                                 | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions |               |
| contract_code | string    | false    | Contract Code                                    |                                                                                                                              |               |
| start_time    | long      | false    | start time（Timestamp，Unit: Millisecond）       | See Note                                                                                                                     |               |
| end_time      | long      | false    | end time（Timestamp，Unit: Millisecond）         | See Note                                                                                                                     |               |
| from_id       | long      | false    | Query start id（uses query_id of returned data） |                                                                                                                              |               |
| size          | int       | false    | number of data                                   | it will be the default value of 20; the number should ≤50                                                                    |               |
| direct        | string    | false    | Query direction                                  | prev ；next ；Default value：prev                                                                                            |               |

Notes:

Value range description of start_time and end_time:

start_time: value range is \[(current time - 90 days)，current time\] ；default
value is clamp（end_time - 10 days，current time -90 days，current time -10
days）which means the furthest time is the current time minus 90 days and the
most recent time is current time minus 10 days.

end_time: value range is \[(current day - 90 days)，above++)，if the end_time is
greater than the current time, use current time; if start_time is filled，the
end_time shall be greater than start_time. The system will use current time by
default.

if from_id is not filled and the query direction is prev, query from back to
front from the end time; if from_id is not filled and the query direction is
next, query from front to back from the start time. Query financial records with
creation time greater than or equal to the start time but less than or equal to
the end time.

Regardless the query direction is prev or next, the data returned is reverse
sorted by query_id.

If the value of start_time or end_time filled in is not within the value range,
the system will report that the parameter is invalid.

Only data within 90 days are available to query.

#### Response Parameter

| Parameter         | Data Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                           | Value Range                                                                                             |
| ----------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| status            | string      | true     | request handling result                                                                                                                                                                                                                                                                                                                                                               |                                                                                                         |
| DATA_START        | object      | true     |                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                         |
| TRADES_START      | objectarray | true     |                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                         |
| id                | string      | true     | the global unique ID of the trade.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                         |
| query_id          | long        | true     | Query id, which can be used as the from_id field for the next query request.                                                                                                                                                                                                                                                                                                          |                                                                                                         |
| match_id          | long        | true     | match_id is the same with trade_id of the websocket subscriptions: orders.\$symbol and matchOrders.\$symbol.match_id is the result of sets of order execution and trade confirmation. NOTE: match_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match_id. |                                                                                                         |
| order_id          | long        | true     | order ID                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                         |
| order_id_str      | string      | true     | order ID                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                         |
| symbol            | string      | true     | Variety code                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                         |
| contract_type     | string      | true     | contract type                                                                                                                                                                                                                                                                                                                                                                         | “this_week”:Weekly，“next_week”:Bi-weekly，“quarter”:Quarterly ,Next Quarterly Contract: "next_quarter" |
| contract_code     | string      | true     | Contract Code                                                                                                                                                                                                                                                                                                                                                                         | "BTC180914" ...                                                                                         |
| direction         | string      | true     | Transaction direction                                                                                                                                                                                                                                                                                                                                                                 | \[Buy (buy), Sell(sell)\]                                                                               |
| offset            | string      | true     | "open": "close"                                                                                                                                                                                                                                                                                                                                                                       | \[Open(open), Close(lose)\]                                                                             |
| trade_volume      | decimal     | true     | Transaction quantity                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                         |
| trade_price       | decimal     | true     | the price at which orders get filled                                                                                                                                                                                                                                                                                                                                                  |                                                                                                         |
| trade_turnover    | decimal     | true     | Transaction aggregate amount                                                                                                                                                                                                                                                                                                                                                          |                                                                                                         |
| create_date       | long        | true     | Creation time                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                         |
| offset_profitloss | decimal     | true     | profits and losses generated from closing positions(calculated with the average price of position, exclude profit in history settlement.)                                                                                                                                                                                                                                             |                                                                                                         |
| trade_fee         | decimal     | true     | fees charged by platform                                                                                                                                                                                                                                                                                                                                                              |                                                                                                         |
| role              | string      | true     | taker or maker                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                         |
| fee_asset         | string      | true     | the corresponding cryptocurrency to the given fee                                                                                                                                                                                                                                                                                                                                     | （"BTC","ETH"...）                                                                                      |
| order_source      | string      | true     | Order Source                                                                                                                                                                                                                                                                                                                                                                          | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL                   |
| real_profit       | decimal     | true     | real profit (calculated with the opening average price, include profit in history settlement.)                                                                                                                                                                                                                                                                                        |                                                                                                         |
| DATA_END          |             | false    |                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                         |
| ts                | long        | true     | timestamp                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                         |

Notes:

if the query result exceeds the data limit, next_id is the id of next data. (
when the query direction is prev, next_id presents the first data on the next
page; when the query direction is next, next_id presents the last data on the
next page.)

The real_profit is calculated with the average price in open position and the
transaction average price in close position (the real profit is the sum of each
profit of order matched).

Only the real profit parameter (real_profit) of the transaction information that
orders created after 0:00 on January 30, 2021 has a value . And of the other
order transaction information that orders created before that times, the real
profit parameter is 0.

#### Request example

```
{
  "contract": "BTC-USD",
  "trade_type": 0,
  "symbol": "BTC",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "",
  "data": [
    {
      "query_id": 111000,
      "match_id": 113891764710,
      "order_id": 773135295142658000,
      "symbol": "ADA",
      "contract_type": "quarter",
      "contract_code": "ADA201225",
      "direction": "buy",
      "offset": "open",
      "trade_volume": 1,
      "trade_price": 0.092,
      "trade_turnover": 10,
      "trade_fee": -0.021739130434782608,
      "offset_profitloss": 0,
      "create_date": 1604371703183,
      "role": "Maker",
      "order_source": "web",
      "order_id_str": "773135295142658048",
      "fee_asset": "ADA",
      "real_profit": 0,
      "id": "113891764710-773135295142658048-1"
    }
  ],
  "ts": 1604312615051
}
```

### /api/v1/lightning_close_position (Place Flash Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description              | Value Range                                                                                             | Default Value |
| ---------------- | --------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | Contract Code            | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                               |               |
| contract_type    | string    | false    | Contract Type            | “this_week”:Weekly，“next_week”:Bi-weekly，“quarter”:Quarterly ,Next Quarterly Contract: "next_quarter" |               |
| contract_code    | string    | false    | Contract Code            | BTC190903                                                                                               |               |
| volume           | long      | true     | Order Quantity(volume)   |                                                                                                         |               |
| direction        | string    | true     | “buy”:Open，“sell”:Close |                                                                                                         |               |
| client_order_id  | long      | false    | Client order ID          | \[1, 9223372036854775807\]                                                                              |               |
| order_price_type | string    | false    | order price type         | "lightning" by default. "lightning_fok": lightning FOK type,"lightning_ioc": lightning IOC type         |               |

Notes:

Lightning Close Position，is order with rival price and optimal 30 grades. And
the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter       | Data Type | Required | Description                                  | Value Range                                            |
| --------------- | --------- | -------- | -------------------------------------------- | ------------------------------------------------------ |
| status          | string    | true     | Request Processing Result                    | "ok" :Order placed successfully, "error"：Order failed |
| ts              | long      | true     | Time of Respond Generation, Unit: Milesecond |                                                        |
| DATA_START      |           | false    |                                              | Dictionary                                             |
| order_id        | long      | true     | Order ID                                     |                                                        |
| order_id_str    | string    | true     | Order ID                                     |                                                        |
| client_order_id | long      | false    | user’s own order ID                          |                                                        |
| DATA_END        |           | false    |                                              |                                                        |

#### Request example

```
{
  "symbol": "BTC",
  "contract_type": "this_week",
  "contract_code": "BTC190903",
  "volume": 1,
  "direction": "sell",
  "client_order_id": "123456",
  "order_price_type": "lightning"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 633766664829804500,
    "order_id_str": "633766664829804544",
    "client_order_id": 9086
  },
  "ts": 158797866555
}
```

### /api/v1/contract_trigger_order (Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                                                                                                     | Value Range                                                               | Default Value |
| ---------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | symbol                                                                                                                                                          | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"... |               |
| contract_type    | string    | false    | contract type                                                                                                                                                   | “this_week”，“next_week”，“quarter”,"next_quarter"                        |               |
| contract_code    | string    | false    | contract code                                                                                                                                                   | BTC190903                                                                 |               |
| trigger_type     | string    | true     | trigger： ge Equal to or Greater than；le Less than or Equal to                                                                                                 |                                                                           |               |
| trigger_price    | Decimal   | true     | Trigger Price                                                                                                                                                   |                                                                           |               |
| order_price      | Decimal   | false    | Order Price                                                                                                                                                     |                                                                           |               |
| order_price_type |           | false    | order price type： "limit" by default;"optimal_5", "optimal_10"，"optimal_20"                                                                                   |                                                                           |               |
| volume           | long      | true     | volume                                                                                                                                                          |                                                                           |               |
| direction        | string    | true     | buy sell                                                                                                                                                        |                                                                           |               |
| offset           | string    | true     | open close                                                                                                                                                      |                                                                           |               |
| lever_rate       | int       | true     | Long leverage shall be equal to short leverage.\[Using Leverage greater than 20 times requires prior approval of high-leverage agreement for the first time. \] |                                                                           |               |

Notes:

If the contract_code field is filled with a number, order will by placed by
contract_code.

If the contract_code field is None, order will by placed by symbol and
contract_type.

optimal_5: top 5 optimal BBO price. optimal_10: top 10 optimal BBO price.
optimal_20: top 20 optimal BBO price. limit: the limit order, order_price
needed.

If you’re holding a position currently, the leverage you choose when placing an
order should be the same as the leverage of your current positions, otherwise,
the order will fail to be placed. If you need a new leverage to place an order,
you should switch the leverage of current positions first by using the Switch
Leverage interface.

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description      | Value Range |
| ------------ | --------- | -------- | ---------------- | ----------- |
| status       | string    | true     | status: ok,error |             |
| err_code     | int       | false    | error code       |             |
| err_msg      | string    | false    | error message    |             |
| DATA_START   | List      | false    | list info        |             |
| order_id     | long      | true     | order id.        |             |
| order_id_str | string    | true     | order id str     |             |
| DATA_END     |           | false    |                  |             |
| ts           | long      | true     | timestamp        |             |

#### Request example

```
{
  "contract_code": "btc200925",
  "contract_type": "quarter",
  "direction": "BUY",
  "lever_rate": 5,
  "offset": "OPEN",
  "order_price": 10000,
  "order_price_type": "limit",
  "symbol": "btc",
  "trigger_price": 10000,
  "trigger_type": "ge",
  "volume": 1
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 28312412,
    "order_id_str": "28312412"
  },
  "ts": 1604372634548
}
```

### /api/v1/contract_trigger_cancel (Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                              | Value Range | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol    | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.BTC,LTC...                    |             |               |
| order_id  | string    | true     | order id. multiple orderids need to be joined by ",".Max number of order ids is 10 once. |             |               |

Notes:

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                    | Value Range    |
| ------------ | --------- | -------- | ------------------------------ | -------------- |
| status       | string    | true     | response status                | "ok" , "error" |
| DATA_START   |           | false    |                                |                |
| successes    | string    | true     | successful orders              |                |
| ERRORS_START |           | false    |                                |                |
| order_id     | string    | true     | order id                       |                |
| err_code     | int       | true     | error code                     |                |
| err_msg      | string    | true     | error messages                 |                |
| ERRORS_END   |           | false    |                                |                |
| DATA_END     |           | false    |                                |                |
| ts           | long      | true     | response timestamp millseconds |                |

#### Request example

```
{
  "symbol": "BTC",
  "order_id": "123456"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "28312406",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "28312412"
  },
  "ts": 1604372746401
}
```

### /api/v1/contract_trigger_cancelall (Cancel All Trigger Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                            | Value Range | Default Value |
| ------------- | --------- | -------- | ---------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.BTC、LTC... |             |               |
| contract_code | string    | false    | contract code,"BTC180914" ...                                          |             |               |
| contract_type | string    | false    | contract type "this_week" "next_week" "quarter" "next_quarter"         |             |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) \["buy" , "sell"\]   |             |               |
| offset        | string    | false    | offset direction（if not filled in means all） \["open" , "close"\]    |             |               |

Notes:

If only symbol is filled, cancel all trigger orders of this symbol

If contract_code is filled, cancel trigger orders of this contract code.

If symbol and contract_type are filled, cancel trigger orders of this symbol and
contract code.

You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                       | Value Range    |
| ------------ | --------- | -------- | --------------------------------- | -------------- |
| status       | string    | true     | status                            | "ok" , "error" |
| DATA_START   |           | false    |                                   |                |
| ERRORS_START |           | false    |                                   |                |
| order_id     | string    | true     | order id                          |                |
| err_code     | int       | true     | error code                        |                |
| err_msg      | string    | true     | error message                     |                |
| ERRORS_END   |           | false    |                                   |                |
| successes    | string    | true     | successful orders                 |                |
| DATA_END     |           | false    |                                   |                |
| ts           | long      | true     | response timestamp in millseconds |                |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "contract_type": "this_week",
  "direction": "sell",
  "offset": "close"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "28312413,28312414"
  },
  "ts": 1604373863946
}
```

### /api/v1/contract_trigger_openorders (Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                                       | Value Range | Default Value |
| ------------- | --------- | -------- | --------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | true     | Case-Insenstive.Both uppercase and lowercase are supported.BTC,LTC...             |             |               |
| contract_code | string    | false    | Case-Insenstive.Both uppercase and lowercase are supported..contract code         |             |               |
| page_index    | int       | false    | page number，default page 1 if no given instruction                               |             |               |
| page_size     | int       | false    | default 20 if no given instruction，no more than 50                               |             |               |
| trade_type    | int       | false    | trade type(Default:all) 0:all,1: buy long,2: sell short,3: buy short,4: sell long |             |               |

#### Response Parameter

| Parameter        | Data Type | Required | Description                               | Value Range                                                                                                                       |
| ---------------- | --------- | -------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| status           | string    | true     | Request Processing Result                 | "ok" , "error"                                                                                                                    |
| DATA_START       | object    | true     | Returned data                             |                                                                                                                                   |
| total_page       | int       | true     | total page                                |                                                                                                                                   |
| current_page     | int       | true     | current page                              |                                                                                                                                   |
| total_size       | int       | true     | total size                                |                                                                                                                                   |
| ORDERS_START     |           | false    |                                           |                                                                                                                                   |
| symbol           | string    | true     | Cryptocurrency                            |                                                                                                                                   |
| contract_code    | string    | true     | contract code                             |                                                                                                                                   |
| contract_type    | string    | true     | contract type                             |                                                                                                                                   |
| trigger_type     | string    | true     | trigger type                              | gegreat than or equal to；leless than or equal to                                                                                 |
| volume           | decimal   | true     | trigger order volume                      |                                                                                                                                   |
| order_type       | int       | true     | Transaction Type                          | 1\. Place orders 2. cancel orders                                                                                                 |
| direction        | string    | true     | order direction                           | \[buy,sell\]                                                                                                                      |
| offset           | string    | true     | offset direction                          | \[open,close\]                                                                                                                    |
| lever_rate       | int       | true     | Leverage                                  | 1,5,10,20                                                                                                                         |
| order_id         | long      | true     | trigger order ID                          |                                                                                                                                   |
| order_id_str     | string    | true     | the order ID with string                  |                                                                                                                                   |
| order_source     | string    | true     | order source                              | ( system. web. api. m. risk. settlement. ios. android. windows. mac. trigger)                                                     |
| trigger_price    | decimal   | true     | trigger price                             |                                                                                                                                   |
| order_price      | decimal   | true     | the preset price by the client            |                                                                                                                                   |
| created_at       | long      | true     | order creation time                       |                                                                                                                                   |
| order_price_type | string    | true     | order price type                          | "limit": limit order，"optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20                                     |
| status           | int       | true     | order status                              | 1:ready to submit、2:submited、3:order accepted、7:wrong order、8：canceled orders but not found、9：canceling order、10：failed' |
| ORDERS_END       |           | false    |                                           |                                                                                                                                   |
| DATA_END         |           | false    |                                           |                                                                                                                                   |
| ts               | long      | true     | Time stamp of response, Unit: millisecond |                                                                                                                                   |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "page_index": 1,
  "page_size": 20,
  "trade_type": 0
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "ADA",
        "contract_code": "ADA201225",
        "contract_type": "quarter",
        "trigger_type": "le",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 20,
        "order_id": 28312415,
        "order_id_str": "28312415",
        "order_source": "api",
        "trigger_price": 0.0895,
        "order_price": 0.0895,
        "created_at": 1604374041289,
        "order_price_type": "limit",
        "status": 2
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1604374215911
}
```

### /api/v1/contract_trigger_hisorders (Query Trigger Order History)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                     | Value Range | Default Value                                                                                                                                                                                                                                  |
| ------------- | --------- | -------- | --------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | string    | true     | Cryptocurrency                                                  |             | Case-Insenstive.Both uppercase and lowercase are supported."BTC","ETH"...                                                                                                                                                                      |
| contract_code | string    | false    | Contract Code                                                   |             | EOS190118                                                                                                                                                                                                                                      |
| trade_type    | int       | true     | Transaction type                                                |             | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |
| status        | string    | true     | Order Status                                                    |             | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled                              |
| create_date   | int       | true     | Date                                                            |             | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                                                                        |
| page_index    | int       | false    | Page, 1st page by default without given instruction             | 1           |                                                                                                                                                                                                                                                |
| page_size     | int       | false    | Page 20 by default without given instruction, ，no more than 50 | 20          | \[1-50\]                                                                                                                                                                                                                                       |
| sort_by       | string    | false    | sort fields(descending)                                         | created_at  | "created_at"：descending order by order creation time, "update_time": descending order by order update time                                                                                                                                    |

Notes:

Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter         | Data Type | Required | Description                                                                                                      | Value Range                                                                                                                          |
| ----------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| status            | string    | true     | Request Processing Result                                                                                        | "ok" , "error"                                                                                                                       |
| DATA_START        | object    | true     | Return data                                                                                                      |                                                                                                                                      |
| total_page        | int       | true     | Total page                                                                                                       |                                                                                                                                      |
| current_page      | int       | true     | Current page                                                                                                     |                                                                                                                                      |
| total_size        | int       | true     | Total Size                                                                                                       |                                                                                                                                      |
| ORDERS_START      |           | false    |                                                                                                                  |                                                                                                                                      |
| symbol            | string    | true     | Cryptocurrency                                                                                                   |                                                                                                                                      |
| contract_code     | string    | true     | Contract Code                                                                                                    |                                                                                                                                      |
| contract_type     | string    | true     | Contract Type                                                                                                    |                                                                                                                                      |
| trigger_type      | string    | true     | trigger                                                                                                          | ge Equal to or Greater than；le Less than or Equal to                                                                                |
| volume            | decimal   | true     | Numbers of order placed                                                                                          |                                                                                                                                      |
| order_type        | int       | true     | Transaction type                                                                                                 | 1、Place orders 2、Cancel orders                                                                                                     |
| direction         | string    | true     | order direction                                                                                                  | \[Buy (buy), Sell(sell)\]                                                                                                            |
| offset            | string    | true     | offset direction                                                                                                 | \[Open(open), Close(lose)\]                                                                                                          |
| lever_rate        | int       | true     | leverage                                                                                                         | 1,5,10,20                                                                                                                            |
| order_id          | int       | true     | Trigger order ID                                                                                                 |                                                                                                                                      |
| order_id_str      | string    | true     | the order ID with string                                                                                         |                                                                                                                                      |
| relation_order_id | string    | true     | Relation order ID is the string related to the limit orders. The value is -1 before the trigger orders executed. |                                                                                                                                      |
| order_price_type  | string    | true     | order type "limit"                                                                                               | Limit order price，"optimal_5": Optimal 5 price level，"optimal_10":Optimal 10 price level，"optimal_20": the Optimal 20 price level |
| status            | int       | true     | Order status                                                                                                     | (4:Orders accepted、5: Orders failing being placed、6: Orders canceled )                                                             |
| order_source      | string    | true     | Order source                                                                                                     | ( system. web. api. m. risk. settlement. ios. android. windows. mac. trigger)                                                        |
| trigger_price     | decimal   | true     | trigger price                                                                                                    |                                                                                                                                      |
| triggered_price   | decimal   | true     | the price when trigger orders executed                                                                           |                                                                                                                                      |
| order_price       | decimal   | true     | the order price preset by the client                                                                             |                                                                                                                                      |
| created_at        | long      | true     | the order creation time                                                                                          |                                                                                                                                      |
| triggered_at      | long      | true     | the execution time when orders getting triggered.                                                                |                                                                                                                                      |
| order_insert_at   | long      | true     | the time when the triggered orders filled successfully.                                                          |                                                                                                                                      |
| canceled_at       | long      | true     | Order cancelation time                                                                                           |                                                                                                                                      |
| fail_code         | int       | true     | the error code when the triggered orders failed to be filled                                                     |                                                                                                                                      |
| fail_reason       | string    | true     | the error message with failure reason when triggered orders failed to filled.                                    |                                                                                                                                      |
| ORDERS_END        |           | false    |                                                                                                                  |                                                                                                                                      |
| DATA_END          |           | false    |                                                                                                                  |                                                                                                                                      |
| ts                | long      | true     | Time of Respond Generation, Unit: Millisecond                                                                    |                                                                                                                                      |

Notes:

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "trade_type": 0,
  "status": "0",
  "create_date": 30,
  "page_index": 1,
  "page_size": 20,
  "sort_by": "created_at"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "ADA",
        "contract_code": "ADA201225",
        "contract_type": "quarter",
        "trigger_type": "le",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 20,
        "order_id": 28312415,
        "order_id_str": "28312415",
        "relation_order_id": "773147284987842560",
        "order_price_type": "limit",
        "status": 4,
        "order_source": "api",
        "trigger_price": 0.0895,
        "triggered_price": 0.089497,
        "order_price": 0.0895,
        "created_at": 1604374041289,
        "triggered_at": 1604374277082,
        "order_insert_at": 1604374277124,
        "update_time": 1604374277124,
        "canceled_at": 0,
        "fail_code": null,
        "fail_reason": null
      }
    ],
    "total_page": 4,
    "current_page": 1,
    "total_size": 4
  },
  "ts": 1604374349086
}
```

### /api/v1/contract_tpsl_order (Set a Take-profit and Stop-loss Order for an Existing Position)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter           | Data Type  | Required | Description                                                                                 | Value Range                                                | Default Value |
| ------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------- |
| symbol              | string     | false    | symbol                                                                                      | "BTC","ETH"...                                             |               |
| contract_type       | string     | false    | contract type                                                                               | “this_week”，“next_week”，“quarter”，“next_quarter”        |               |
| contract_code       | string     | false    | contract code                                                                               | BTC190903                                                  |               |
| direction           | string     | true     | direction                                                                                   | "buy", "sell"                                              |               |
| volume              | decimal    | true     | Numbers of orders (volume)                                                                  |                                                            |               |
| tp_trigger_price    | decimal    | false    | Trigger price of take-profit order                                                          |                                                            |               |
| tp_order_price      | decimal    | false    | Order price of take-profit order（The order price is not required to fill in for Optimal N) |                                                            |               |
| tp_order_price_type | string     | false    | Order type of take-profit order                                                             | default is limit; limit，optimal_5，optimal_10，optimal_20 |               |
| sl_trigger_price    | decimal    | false    | Trigger price of stop-loss order                                                            |                                                            |               |
| sl_order_price      | decimal    | false    | Order price of stop-loss order（The order price is not required to fill in for Optimal N）  |                                                            |               |
| sl_order_price_type | string     | false    | Order type of stop-loss order                                                               | default is limit; limit，optimal_5，optimal_10，optimal_20 |               |
| price_protect       | booleanint | false    | price protection, default is false. This parameter is only required when setting tp/sl      | true or false                                              |               |

Notes:

If the "contract_code" has been filled in with a value, the system will place an
order based on "contract_code"; If not, the system will place an order based on
"symbol+contract_type".

All take-profit and stop-loss orders are position closing orders.

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter      | Data Type | Required | Description                                                                                              | Value Range    |
| -------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| status         | string    | true     | status                                                                                                   | "ok" , "error" |
| ts             | long      | true     | time stamp                                                                                               |                |
| DATA_START     | object    | false    | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |                |
| TP_ORDER_START | object    | true     | Order placing result of take-profit order                                                                |                |
| order_id       | long      | true     | order id                                                                                                 |                |
| order_id_str   | string    | true     | order id (string)                                                                                        |                |
| TP_ORDER_END   |           | false    |                                                                                                          |                |
| SL_ORDER_START | object    | true     | Order placing result of stop-loss order                                                                  |                |
| order_id       | long      | true     | order id                                                                                                 |                |
| order_id_str   | string    | true     | order id (string)                                                                                        |                |
| SL_ORDER_END   |           | false    |                                                                                                          |                |
| DATA_END       |           | false    |                                                                                                          |                |
| err_code       | int       | false    | error code（only when order fails to be placed）                                                         |                |
| err_msg        | string    | false    | error message（only when order fails to be placed）                                                      |                |

Notes:

When only take-profit order or stop-loss order is set , the accordingly returned
"sl_order" or "tp_order" will be empty.

#### Request example

```
{
  "contract_code": "BTC210326",
  "direction": "sell",
  "volume": 1,
  "tp_trigger_price": 35000,
  "tp_order_price": 35000,
  "tp_order_price_type": "optimal_5",
  "sl_trigger_price": "29000",
  "sl_order_price": "29000",
  "sl_order_price_type": "optimal_5"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "tp_order": {
      "order_id": 796083080824655900,
      "order_id_str": "796083080824655872"
    },
    "sl_order": {
      "order_id": 796083080824655900,
      "order_id_str": "796083080824655873"
    }
  },
  "ts": 1609842596990
}
```

### /api/v1/contract_tpsl_cancel (Cancel a Take-profit and Stop-loss Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5times/1s

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                   | Value Range    | Default Value |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------- | -------------- | ------------- |
| symbol    | string    | true     | symbol                                                                                        | "BTC","ETH"... |               |
| order_id  | string    | true     | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |                |               |

Notes:

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range   |
| ------------ | --------- | -------- | --------------------------------------------- | ------------- |
| status       | string    | true     | status                                        | "ok", "error" |
| DATA_START   | object    | true     |                                               | dictionary    |
| ERRORS_START | object    | true     |                                               | dictionary    |
| order_id     | string    | true     | order id                                      |               |
| err_code     | long      | false    | error code                                    |               |
| err_msg      | string    | false    | error message                                 |               |
| ERRORS_END   |           | false    |                                               |               |
| successes    | string    | true     | successes orders                              |               |
| DATA_END     |           | false    |                                               |               |
| ts           | long      | true     | Time of Respond Generation，Unit: Millisecond |               |

#### Request example

```
{
  "symbol": "BTC",
  "order_id": "123456"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "796085144275423232",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "796085144275423233"
  },
  "ts": 1609843174529
}
```

### /api/v1/contract_tpsl_cancelall (Cancel all Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5times/1s

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                       | Value Range                                         | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------- | --------------------------------------------------- | ------------- |
| symbol        | string    | false    | symbol                                            | "BTC","ETH"...                                      |               |
| contract_code | string    | false    | contract code                                     | "BTC180914" ...                                     |               |
| contract_type | string    | false    | contract type                                     | "this_week", "next_week", "quarter"，“next_quarter” |               |
| direction     | string    | false    | Transaction direction(if not filled in means all) | \["buy" , "sell"\]                                  |               |

Notes:

If only "symbol" is set, cancel all the take-profit and stop-loss orders of all
expirations under this order type.

If only "contract_code“ is set, cancel all take-profit and stop-loss orders of
the contracts of the code.

If only "symbol+contract_type" is set, cancel all take-profit and stop-loss
orders of the contracts with both "symbol" and "contract_type" set.

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range   |
| ------------ | --------- | -------- | --------------------------------------------- | ------------- |
| status       | string    | true     | status                                        | "ok", "error" |
| DATA_START   | object    | true     |                                               | dictionary    |
| ERRORS_START | object    | true     |                                               | dictionary    |
| order_id     | string    | true     | order id                                      |               |
| err_code     | long      | false    | error code                                    |               |
| err_msg      | string    | false    | error message                                 |               |
| ERRORS_END   |           | false    |                                               |               |
| successes    | string    | true     | successes orders                              |               |
| DATA_END     |           | false    |                                               |               |
| ts           | long      | true     | Time of Respond Generation，Unit: Millisecond |               |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "contract_type": "this_week",
  "direction": "sell"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "796083080824655872,796083080824655873,796084255502405632,796084255502405633"
  },
  "ts": 1609843284024
}
```

### /api/v1/contract_tpsl_openorders (Query Open Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                         | Value Range                     | Default Value |
| ------------- | --------- | -------- | ----------------------------------- | ------------------------------- | ------------- |
| symbol        | string    | true     | symbol                              | "BTC","ETH"...                  |               |
| contract_code | string    | false    | contract code                       | "BTC180914" ...                 |               |
| page_index    | int       | false    | page index. 1 by default            |                                 |               |
| page_size     | int       | false    | page size.20 by default. 50 at most | \[1-50\]                        |               |
| trade_type    | int       | false    | trade type(Default:all)             | 0:all,3: buy short,4: sell long |               |

#### Response Parameter

| Parameter              | Data Type   | Required | Description                                                                                                                                                                                                                             | Value Range                                                                                                                                                                                                                  |
| ---------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string      | true     | status                                                                                                                                                                                                                                  | "ok", "error"                                                                                                                                                                                                                |
| DATA_START             | object      | true     |                                                                                                                                                                                                                                         | dictionary                                                                                                                                                                                                                   |
| total_page             | int         | true     | total page                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| total_size             | int         | true     | total size                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| current_page           | int         | true     | current page                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| ORDERS_START           | objectarray | true     |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| symbol                 | string      | true     | symbol                                                                                                                                                                                                                                  |                                                                                                                                                                                                                              |
| contract_type          | string      | true     | contract type                                                                                                                                                                                                                           | "this_week", "next_week", "quarter"，“next_quarter”                                                                                                                                                                          |
| contract_code          | string      | true     | contract code                                                                                                                                                                                                                           | "BTC180914" ...                                                                                                                                                                                                              |
| volume                 | decimal     | true     | Numbers of orders (volume)                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| order_type             | int         | true     | Order type                                                                                                                                                                                                                              | 1\. Quotation; 2. Cancelled order                                                                                                                                                                                            |
| tpsl_order_type        | string      | true     | Order type(take-profit order/stop-loss order)                                                                                                                                                                                           | “tp”:take-profit order；"sl"stop-loss order                                                                                                                                                                                  |
| direction              | string      | true     | direction                                                                                                                                                                                                                               | "buy", "sell"                                                                                                                                                                                                                |
| order_id               | long        | true     | order id(take-profit order/stop-loss order)                                                                                                                                                                                             |                                                                                                                                                                                                                              |
| order_id_str           | string      | true     | order id in string(take-profit order/stop-loss order)                                                                                                                                                                                   |                                                                                                                                                                                                                              |
| order_source           | string      | true     | order source                                                                                                                                                                                                                            | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger                                                                                                                                                   |
| trigger_type           | string      | true     | trigger type                                                                                                                                                                                                                            | ge, le                                                                                                                                                                                                                       |
| trigger_price          | decimal     | true     | trigger price                                                                                                                                                                                                                           |                                                                                                                                                                                                                              |
| price_protect          | booleanint  | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                                                                                  | true or false                                                                                                                                                                                                                |
| created_at             | long        | true     | created time                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| order_price_type       | string      | true     | order price type                                                                                                                                                                                                                        | limit, optimal_5, optimal_10, optimal_20                                                                                                                                                                                     |
| order_price            | decimal     | true     | order price                                                                                                                                                                                                                             |                                                                                                                                                                                                                              |
| status                 | int         | true     | status:                                                                                                                                                                                                                                 | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source_order_id        | string      | true     | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |                                                                                                                                                                                                                              |
| relation_tpsl_order_id | string      | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".）                                                            |                                                                                                                                                                                                                              |
| ORDERS_END             |             | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| DATA_END               |             | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| ts                     | long        | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                                                           |                                                                                                                                                                                                                              |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "page_index": 1,
  "page_size": 20,
  "trade_type": 0
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "BTC",
        "contract_code": "BTC210326",
        "contract_type": "quarter",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "order_id": 796097507233927200,
        "order_id_str": "796097507233927168",
        "order_source": "api",
        "trigger_type": "ge",
        "trigger_price": 35000,
        "order_price": 0,
        "created_at": 1609846036501,
        "order_price_type": "optimal_5",
        "status": 2,
        "tpsl_order_type": "tp",
        "source_order_id": null,
        "relation_tpsl_order_id": "796097507233927169"
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 2
  },
  "ts": 1609846316344
}
```

### /api/v1/contract_tpsl_hisorders (Query Take-profit and Stop-loss History Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                   | Value Range                                                                                                                                                                                                                           | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                                        | "BTC","ETH"...                                                                                                                                                                                                                        |               |
| contract_code | string    | true     | contract code,"BTC-USD" ...                                   |                                                                                                                                                                                                                                       |               |
| status        | string    | true     | status                                                        | Multiple orders are separated by English commas, and the status of stop-profit and stop-loss orders is: 0:all(representing all orders in the end state), 4:Have sumbmitted the orders, 5:orders failed, 6:orders canceled, 11:expired |               |
| create_date   | long      | true     | days                                                          | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                                                               |               |
| page_index    | int       | false    | page index. 1 by default                                      |                                                                                                                                                                                                                                       |               |
| page_size     | int       | false    | page size.20 by default. 50 at most                           | \[1-50\]                                                                                                                                                                                                                              |               |
| sort_by       | string    | false    | for sortting, descende order by created_at when without value | "created_at": descending order by order created at, "update_time": descending order by order update time                                                                                                                              |               |

#### Response Parameter

| Parameter              | Data Type   | Required | Description                                                                                                                                                                                                                             | Value Range                                                                                                                                                                                                                  |
| ---------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string      | true     | status                                                                                                                                                                                                                                  | "ok", "error"                                                                                                                                                                                                                |
| DATA_START             | object      | true     |                                                                                                                                                                                                                                         | dictionary                                                                                                                                                                                                                   |
| total_page             | int         | true     | total page                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| total_size             | int         | true     | total size                                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| current_page           | int         | true     | current page                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| ORDERS_START           | objectarray | true     |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| symbol                 | string      | true     | symbol                                                                                                                                                                                                                                  |                                                                                                                                                                                                                              |
| contract_type          | string      | true     | contract type                                                                                                                                                                                                                           | "this_week", "next_week", "quarter"，“next_quarter”                                                                                                                                                                          |
| contract_code          | string      | true     | contract code                                                                                                                                                                                                                           | "BTC180914" ...                                                                                                                                                                                                              |
| volume                 | decimal     | true     | volume                                                                                                                                                                                                                                  |                                                                                                                                                                                                                              |
| order_type             | int         | true     | order type                                                                                                                                                                                                                              | 1.Quotation, 2.Cancelled order                                                                                                                                                                                               |
| tpsl_order_type        | string      | true     | tpsl order type                                                                                                                                                                                                                         | “tp”:Take-profit order, "sl":Stop-loss order                                                                                                                                                                                 |
| direction              | string      | true     | direction                                                                                                                                                                                                                               | "buy", "sell"                                                                                                                                                                                                                |
| order_id               | long        | true     | order id(take-profit order/stop-loss order)                                                                                                                                                                                             |                                                                                                                                                                                                                              |
| order_id_str           | string      | true     | order id in string(take-profit order/stop-loss order)                                                                                                                                                                                   |                                                                                                                                                                                                                              |
| order_source           | string      | true     | order source                                                                                                                                                                                                                            | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger                                                                                                                                                   |
| order_price            | decimal     | true     | order price                                                                                                                                                                                                                             |                                                                                                                                                                                                                              |
| trigger_type           | string      | true     | trigger type                                                                                                                                                                                                                            | ge:greater or equal, le:less or equal                                                                                                                                                                                        |
| trigger_price          | decimal     | true     | trigger price                                                                                                                                                                                                                           |                                                                                                                                                                                                                              |
| price_protect          | booleanint  | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                                                                                  | true or false                                                                                                                                                                                                                |
| created_at             | long        | true     | created time                                                                                                                                                                                                                            |                                                                                                                                                                                                                              |
| order_price_type       | string      | true     | order price type                                                                                                                                                                                                                        | "limit"，optimal_5，optimal_10，optimal_20                                                                                                                                                                                   |
| status                 | int         | true     | status                                                                                                                                                                                                                                  | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source_order_id        | string      | true     | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |                                                                                                                                                                                                                              |
| relation_tpsl_order_id | string      | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".）                                                            |                                                                                                                                                                                                                              |
| canceled_at            | long        | true     | canceled time                                                                                                                                                                                                                           |                                                                                                                                                                                                                              |
| fail_code              | int         | true     | fail code when triggered                                                                                                                                                                                                                |                                                                                                                                                                                                                              |
| fail_reason            | string      | true     | fail reason when triggered                                                                                                                                                                                                              |                                                                                                                                                                                                                              |
| triggered_price        | decimal     | true     | triggered price                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| relation_order_id      | string      | true     | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed.                                                                                                                       |                                                                                                                                                                                                                              |
| update_time            | long        | true     | update time, unit: Millisecond                                                                                                                                                                                                          |                                                                                                                                                                                                                              |
| ORDERS_END             |             | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| DATA_END               |             | false    |                                                                                                                                                                                                                                         |                                                                                                                                                                                                                              |
| ts                     | long        | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                                                           |                                                                                                                                                                                                                              |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "status": "0",
  "create_date": 30,
  "page_index": 1,
  "page_size": 20,
  "sort_by": "created_at"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "BTC",
        "contract_code": "BTC210326",
        "contract_type": "quarter",
        "volume": 1,
        "order_type": 1,
        "tpsl_order_type": "sl",
        "direction": "sell",
        "order_id": 796085144275423200,
        "order_id_str": "796085144275423233",
        "order_source": "api",
        "trigger_type": "le",
        "trigger_price": 29000,
        "order_price": 0,
        "created_at": 1609843088942,
        "order_price_type": "optimal_5",
        "status": 6,
        "source_order_id": null,
        "relation_tpsl_order_id": "796085144275423232",
        "canceled_at": 1609843174692,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1",
        "update_time": 1609843200693
      }
    ],
    "total_page": 6,
    "current_page": 1,
    "total_size": 6
  },
  "ts": 1609846686146
}
```

### /api/v1/contract_relation_tpsl_order (Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range    | Default Value |
| --------- | --------- | -------- | ----------- | -------------- | ------------- |
| symbol    | string    | true     | symbol      | "BTC","ETH"... |               |
| order_id  | long      | true     | order id    |                |               |

#### Response Parameter

| Parameter              | Data Type   | Required | Description                                                                                                                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                 | string      | true     | status                                                                                                                                                                       | "ok", "error"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DATA_START             | object      | true     |                                                                                                                                                                              | dictionary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| symbol                 | string      | true     | symbol                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| contract_type          | string      | true     | contract type                                                                                                                                                                | "this_week", "next_week", "quarter", “next_quarter”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| contract_code          | string      | true     | contract code                                                                                                                                                                | "BTC180914" ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| volume                 | decimal     | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| price                  | decimal     | true     | price                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_price_type       | string      | true     | order price type                                                                                                                                                             | "limit":Limit,"opponent":opponent,"post_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal_5":optimal 5，"optimal_10":optimal 10，"optimal_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent_ioc": opponent ioc，"lightning_ioc": lightning ioc，"optimal_5_ioc": optimal_5 ioc，"optimal_10_ioc": optimal_10 ioc，"optimal_20_ioc": optimal_20 ioc，"opponent_fok": opponent fok，"lightning_fok": lightning fok，"optimal_5_fok": optimal_5 fok，"optimal_10_fok": optimal_10 fok，"optimal_20_fok": optimal_20 fok |
| direction              | string      | true     | direction                                                                                                                                                                    | "buy","sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| offset                 | string      | true     | offset                                                                                                                                                                       | "open", "close"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| lever_rate             | int         | true     | lever rate                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id               | long        | true     | order id                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id_str           | string      | true     | order id in string                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| client_order_id        | long        | true     | client order id                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| created_at             | long        | true     | created at                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_volume           | decimal     | true     | trade volume                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_turnover         | decimal     | true     | trade turnover                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fee                    | decimal     | true     | fee                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trade_avg_price        | decimal     | true     | trade avg price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| margin_frozen          | decimal     | true     | margin frozen                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| profit                 | decimal     | true     | profit when close position (calculated with the average price of position, exclude profit in history settlement.)                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| status                 | int         | true     | status                                                                                                                                                                       | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling                                                                                                                                                                                                                                                                                                                                                   |
| order_type             | int         | true     | order type                                                                                                                                                                   | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| order_source           | string      | true     | order source                                                                                                                                                                 | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| fee_asset              | string      | true     | fee asset                                                                                                                                                                    | （"BTC","ETH"...）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| canceled_at            | long        | true     | canceled at                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TPSL_ORDER_INFO_START  | objectarray | true     | related take-profit and stop loss order info                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| volume                 | decimal     | true     | Numbers of orders (volume)                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| tpsl_order_type        | string      | true     | Order type(take-profit order/stop-loss order)                                                                                                                                | “tp”:take-profit order；"sl"stop-loss order                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| direction              | string      | true     | direction                                                                                                                                                                    | "buy", "sell"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| order_id               | long        | true     | order id(take-profit order/stop-loss order)                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_id_str           | string      | true     | order id in string(take-profit order/stop-loss order)                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trigger_type           | string      | true     | trigger type: ge, le                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| trigger_price          | decimal     | true     | trigger price                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| price_protect          | booleanint  | false    | price protection, default is false. This parameter is only required when setting tp/sl                                                                                       | true or false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| created_at             | long        | true     | created time                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order_price_type       | string      | true     | order price type                                                                                                                                                             | limit, optimal_5, optimal_10, optimal_20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| order_price            | decimal     | true     | order price                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| status                 | int         | true     | status                                                                                                                                                                       | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired                                                                                                                                                                                                                                                                                                                                      |
| relation_tpsl_order_id | string      | true     | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| canceled_at            | long        | true     | canceled time                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fail_code              | int         | true     | fail code when triggered                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| fail_reason            | string      | true     | fail reason when triggered                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| triggered_price        | decimal     | true     | triggered price                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| relation_order_id      | string      | true     | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed.                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TPSL_ORDER_INFO_END    |             | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| DATA_END               |             | false    |                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ts                     | long        | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Request example

```
{
  "symbol": "BTC",
  "order_id": 123456
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "contract_code": "BTC210326",
    "contract_type": "quarter",
    "volume": 1,
    "price": 30000,
    "order_price_type": "post_only",
    "direction": "buy",
    "offset": "open",
    "lever_rate": 75,
    "order_id": 796097782841643000,
    "order_id_str": "796097782841643008",
    "client_order_id": null,
    "created_at": 1609846102202,
    "trade_volume": 0,
    "trade_turnover": 0,
    "fee": 0,
    "trade_avg_price": null,
    "margin_frozen": 0.000044444444444444,
    "profit": 0,
    "status": 3,
    "order_type": 1,
    "order_source": "api",
    "fee_asset": "BTC",
    "canceled_at": 0,
    "tpsl_order_info": [
      {
        "volume": 1,
        "direction": "sell",
        "tpsl_order_type": "tp",
        "order_id": 796097782845837300,
        "order_id_str": "796097782845837312",
        "trigger_type": "ge",
        "trigger_price": 31000,
        "order_price": 0,
        "created_at": 1609846102212,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "796097782845837313",
        "status": 1,
        "canceled_at": 0,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1"
      },
      {
        "volume": 1,
        "direction": "sell",
        "tpsl_order_type": "sl",
        "order_id": 796097782845837300,
        "order_id_str": "796097782845837313",
        "trigger_type": "le",
        "trigger_price": 29100,
        "order_price": 0,
        "created_at": 1609846102212,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "796097782845837312",
        "status": 1,
        "canceled_at": 0,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1"
      }
    ]
  },
  "ts": 1609847008041
}
```

### /api/v1/contract_track_order (Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5times/1s

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                                                 | Value Range                                                    | Default Value |
| ---------------- | --------- | -------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------- |
| symbol           | string    | false    | symbol                                                                      | "BTC","ETH"...                                                 |               |
| contract_type    | string    | false    | contract type                                                               | this_week, next_week, quarter, next_quarter                    |               |
| contract_code    | string    | false    | contract code                                                               | BTC190903                                                      |               |
| direction        | string    | true     | direction                                                                   | buy, sell                                                      |               |
| offset           | string    | true     | offset                                                                      | open, close                                                    |               |
| lever_rate       | int       | false    | lever rate, is required when open position, is optional when close position |                                                                |               |
| volume           | decimal   | true     | volume(cont)                                                                |                                                                |               |
| callback_rate    | decimal   | true     | callback rate                                                               | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |               |
| activeprice      | decimal   | true     | active price                                                                |                                                                |               |
| order_price_type | string    | true     | order price type                                                            | optimal_5, optimal_10, optimal_20, formula_price               |               |

Notes:

When order_price_type is the formula_price, it means that after the tracking
order is triggered successfully, use the lowest (highest) market price \*(1 ±
callback rate) that from statistic since place trading order, as the order price
(the precision is the minimum variation of the contract price and be truncated)
to place a limit price order

whether filled in with the optimal N or the formula price, there is no guarantee
that the order can be completely filled, which mainly depends on the market
conditions.

Symbol+contract_type and contract_code must be filled in one of them, as long as
contract_code is filled in, contract_code will be taken directly.

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                              | Value Range    |
| ------------ | --------- | -------- | ---------------------------------------- | -------------- |
| status       | string    | true     | the result of server handling to request | "ok" , "error" |
| ts           | long      | true     | timestamp                                |                |
| DATA_START   | object    | true     | the returned data which is successful    |                |
| order_id     | long      | true     | trailing order id\[Globally Unique\]     |                |
| order_id_str | string    | true     | trailing order id in string format       |                |
| DATA_END     |           | false    |                                          |                |

#### Request example

```
{
  "symbol": "BTC",
  "contract_type": "this_week",
  "contract_code": "BTC190903",
  "direction": "sell",
  "offset": "open",
  "lever_rate": 20,
  "volume": 1,
  "callback_rate": 0.01,
  "active_price": 1700,
  "order_price_type": "optimal_5"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 825041038916751400,
    "order_id_str": "825041038916751360"
  },
  "ts": 1616746712203
}
```

### /api/v1/contract_track_cancel (Cancel a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5times/1s

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                                      | Value Range    | Default Value |
| --------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| symbol    | string    | true     | symbol                                                                                                                           | "BTC","ETH"... |               |
| order_id  | string    | true     | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |                |               |

Notes:

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range                    |
| ------------ | --------- | -------- | --------------------------------------------- | ------------------------------ |
| status       | string    | true     | the result of server handling to request      | "ok" :success, "error": failed |
| DATA_START   | object    | true     |                                               | dictionary                     |
| ERRORS_START | object    | true     |                                               | dictionary                     |
| order_id     | string    | true     | trailing order id\[Globally Unique\]          |                                |
| err_code     | long      | false    | error code                                    |                                |
| err_msg      | string    | false    | error msg                                     |                                |
| ERRORS_END   |           | false    |                                               |                                |
| successes    | string    | true     | the orders that are success                   |                                |
| DATA_END     |           | false    |                                               |                                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond |                                |

#### Request example

```
{
  "symbol": "BTC",
  "order_id": "123456"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "order_id": "825041038916751361",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "825041038916751360"
  },
  "ts": 1616746795262
}
```

### /api/v1/contract_track_cancelall (Cancel All Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5times/1s

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                            | Value Range                                 | Default Value |
| ------------- | --------- | -------- | -------------------------------------- | ------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                 | "BTC","ETH"...                              |               |
| contract_code | string    | false    | contract code                          | "BTC180914" ...                             |               |
| contract_type | string    | false    | contract type                          | this_week, next_week, quarter, next_quarter |               |
| direction     | string    | false    | direction(if not filled in, means all) | buy, sell                                   |               |
| offset        | string    | false    | offset (if not filled in, means all)   | open, close                                 |               |

Notes:

Send symbol to cancel all the contracts of that kind of symbol

Send contract_code to cancel the contracts of that code.

Send symbol+contract_type to cancel the certain contracts under the symbol of
that contract_type

You can fill in only one of direction and offset to cancel the orders. (such as
direction=buy, all buy orders will be cancelled, including "open" and "close"
offset)

The frequency limit of this interface is 5 times per second.

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range                    |
| ------------ | --------- | -------- | --------------------------------------------- | ------------------------------ |
| status       | string    | true     | the result of server handling to request      | "ok" :success, "error": failed |
| DATA_START   | object    | true     |                                               | dictionary                     |
| ERRORS_START | object    | true     |                                               | dictionary                     |
| order_id     | string    | true     | trailing order id\[Globally Unique\]          |                                |
| err_code     | long      | false    | error code                                    |                                |
| err_msg      | string    | false    | error msg                                     |                                |
| ERRORS_END   |           | false    |                                               |                                |
| successes    | string    | true     | the orders that are success                   |                                |
| DATA_END     |           | false    |                                               |                                |
| ts           | long      | true     | Time of Respond Generation, Unit: Millisecond |                                |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "contract_type": "this_week",
  "direction": "sell",
  "offset": "open"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "825041902725271552,825042030290833408,825042223069433856"
  },
  "ts": 1616747043604
}
```

### /api/v1/contract_track_openorders (Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                 | Value Range                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------------------- | --------------------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                      | "BTC","ETH"...                                            |               |
| contract_code | string    | false    | contract code,"BTC180914" ...               |                                                           |               |
| trade_type    | int       | false    | trade type(if not filled in, means all)     | 0:all,1: buy long,2: sell short,3: buy short,4: sell long |               |
| page_index    | int       | false    | page index, if not filled in as 1st         |                                                           |               |
| page_size     | int       | false    | if not filled in as 20, and no more than 50 |                                                           |               |

#### Response Parameter

| Parameter        | Data Type   | Required | Description                                   | Value Range                                                                                               |
| ---------------- | ----------- | -------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status           | string      | true     | the result of server handling to request      | "ok" :success, "error": failed                                                                            |
| DATA_START       | object      | true     |                                               | dictionary                                                                                                |
| total_page       | int         | true     | total page                                    |                                                                                                           |
| total_size       | int         | true     | total size                                    |                                                                                                           |
| current_page     | int         | true     | current page                                  |                                                                                                           |
| ORDERS_START     | objectarray | true     |                                               |                                                                                                           |
| symbol           | string      | true     | symbol                                        |                                                                                                           |
| contract_type    | string      | true     | contract type                                 | this_week, next_week, quarter，next_quarter                                                               |
| contract_code    | string      | true     | contract code                                 | "BTC180914" ...                                                                                           |
| volume           | decimal     | true     | volume                                        |                                                                                                           |
| order_type       | int         | true     | order type: 1. Quotation; 2. Cancelled order  |                                                                                                           |
| direction        | string      | true     | direction                                     | buy, sell                                                                                                 |
| offset           | string      | true     | offset                                        | open, close                                                                                               |
| lever_rate       | int         | true     | lever rate                                    |                                                                                                           |
| order_id         | long        | true     | trailing order id                             |                                                                                                           |
| order_id_str     | string      | true     | trailing order id in string format            |                                                                                                           |
| order_source     | string      | true     | order source                                  |                                                                                                           |
| created_at       | long        | true     | created at                                    |                                                                                                           |
| order_price_type | string      | true     | order price type                              | optimal_5, optimal_10, optimal_20, formula_price                                                          |
| status           | int         | true     | order status                                  | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| callback_rate    | decimal     | true     | callback rate                                 | such as: 0.01 means 1%                                                                                    |
| activeprice      | decimal     | true     | active price                                  |                                                                                                           |
| is_active        | int         | true     | Is the active price activated?                | 1: activated; 0: not activated                                                                            |
| ORDERS_END       |             | false    |                                               |                                                                                                           |
| DATA_END         |             | false    |                                               |                                                                                                           |
| ts               | long        | true     | Time of Respond Generation, Unit: Millisecond |                                                                                                           |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "trade_type": 0,
  "page_index": 1,
  "page_size": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "BTC",
        "contract_type": "quarter",
        "contract_code": "BTC210326",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "offset": "close",
        "lever_rate": 75,
        "order_id": 825042343047499800,
        "order_id_str": "825042343047499776",
        "order_source": "api",
        "created_at": 1616747023128,
        "order_price_type": "formula_price",
        "status": 2,
        "callback_rate": 0.003,
        "active_price": 54323,
        "is_active": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 3
  },
  "ts": 1616747242096
}
```

### /api/v1/contract_track_hisorders (Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                              | Value Range                                                                                                                                                                               | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol        | string    | true     | symbol                                                                   | "BTC","ETH"...                                                                                                                                                                            |               |
| contract_code | string    | false    | contract code,"BTC180914" ...                                            |                                                                                                                                                                                           |               |
| status        | string    | true     | order status                                                             | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |               |
| trade_type    | int       | true     | trade type                                                               | 0:all,1: buy long,2: sell short,3: buy short,4: sell long                                                                                                                                 |               |
| create_date   | long      | true     | days                                                                     | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default.                   |               |
| page_index    | int       | false    | page index, if not filled in as 1st                                      |                                                                                                                                                                                           |               |
| page_size     | int       | false    | if not filled in as 20, and no more than 50                              |                                                                                                                                                                                           |               |
| sort_by       | string    | false    | sort fields(descending), if not filled in, sort by created_at descending | "create_date"：descending order by order create date , "update_time": descending order by order update time                                                                               |               |

#### Response Parameter

| Parameter          | Data Type   | Required | Description                                                                                                       | Value Range                                                                                               |
| ------------------ | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| status             | string      | true     | the result of server handling to request                                                                          | "ok" :success, "error": failed                                                                            |
| DATA_START         | object      | true     |                                                                                                                   | dictionary                                                                                                |
| total_page         | int         | true     | total page                                                                                                        |                                                                                                           |
| total_size         | int         | true     | total size                                                                                                        |                                                                                                           |
| current_page       | int         | true     | current page                                                                                                      |                                                                                                           |
| ORDERS_START       | objectarray | true     |                                                                                                                   |                                                                                                           |
| symbol             | string      | true     | symbol                                                                                                            |                                                                                                           |
| contract_type      | string      | true     | contract type                                                                                                     | this_week, next_week, quarter，next_quarter                                                               |
| contract_code      | string      | true     | contract code                                                                                                     | "BTC180914" ...                                                                                           |
| volume             | decimal     | true     | volume                                                                                                            |                                                                                                           |
| order_type         | int         | true     | order type: 1. Quotation; 2. Cancelled order                                                                      |                                                                                                           |
| direction          | string      | true     | direction                                                                                                         | buy, sell                                                                                                 |
| offset             | string      | true     | offset                                                                                                            | open, close                                                                                               |
| lever_rate         | int         | true     | lever rate                                                                                                        |                                                                                                           |
| order_id           | long        | true     | trailing order id                                                                                                 |                                                                                                           |
| order_id_str       | string      | true     | trailing order id in string format                                                                                |                                                                                                           |
| order_source       | string      | true     | order source                                                                                                      |                                                                                                           |
| created_at         | long        | true     | created at                                                                                                        |                                                                                                           |
| update_time        | long        | true     | update time, unit: millisecond                                                                                    |                                                                                                           |
| order_price_type   | string      | true     | order price type                                                                                                  | optimal_5, optimal_10, optimal_20, formula_price                                                          |
| status             | int         | true     | order status                                                                                                      | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| canceled_at        | long        | true     | canceled at                                                                                                       |                                                                                                           |
| fail_code          | int         | true     | error code when place limit price order                                                                           |                                                                                                           |
| fail_reason        | string      | true     | error reason when place limit price order                                                                         |                                                                                                           |
| callback_rate      | decimal     | true     | callback rate                                                                                                     | such as: 0.01 means 1%                                                                                    |
| activeprice        | decimal     | true     | active price                                                                                                      |                                                                                                           |
| is_active          | int         | true     | Is the active price activated?                                                                                    | 1: activated; 0: not activated                                                                            |
| market_limit_price | decimal     | true     | lowest/highest market price (use the lowest price when buy. use the highest when sell)                            |                                                                                                           |
| formula_price      | decimal     | true     | formula price(the lowest (highest) market price\* (1 ± callback rate))                                            |                                                                                                           |
| real_volume        | decimal     | true     | real volume                                                                                                       |                                                                                                           |
| triggered_price    | decimal     | true     | triggered price                                                                                                   |                                                                                                           |
| relation_order_id  | string      | true     | relation_order_id is the string related to the limit orders， The value is -1 before the trigger orders executed. |                                                                                                           |
| ORDERS_END         |             | false    |                                                                                                                   |                                                                                                           |
| DATA_END           |             | false    |                                                                                                                   |                                                                                                           |
| ts                 | long        | true     | Time of Respond Generation, Unit: Millisecond                                                                     |                                                                                                           |

#### Request example

```
{
  "symbol": "BTC",
  "contract_code": "BTC180914",
  "status": "0",
  "trade_type": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 20,
  "sort_by": "created_at"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "orders": [
      {
        "symbol": "BTC",
        "contract_type": "quarter",
        "contract_code": "BTC210326",
        "triggered_price": null,
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "close",
        "lever_rate": 75,
        "order_id": 825042223069433900,
        "order_id_str": "825042223069433856",
        "order_source": "api",
        "created_at": 1616746994523,
        "update_time": 1616747101872,
        "order_price_type": "formula_price",
        "status": 6,
        "canceled_at": 1616747044182,
        "fail_code": null,
        "fail_reason": null,
        "callback_rate": 0.003,
        "active_price": 52323,
        "is_active": 0,
        "market_limit_price": null,
        "formula_price": null,
        "real_volume": 0,
        "relation_order_id": "-1"
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 5
  },
  "ts": 1616747533336
}
```

### https://api.huobi.pro/v1/futures/transfer (Transfer margin between Spot account and Future account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1times/1s

#### Request Address

| Environment | Address                                   |
| ----------- | ----------------------------------------- |
| Online      | https://api.huobi.pro/v1/futures/transfer |

#### Request Parameter

| Parameter | Data Type | Required | Description                | Value Range | Default Value                                                                                                                 |
| --------- | --------- | -------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| currency  | string    | true     | currency. Case insensitive |             | e.g. btc, BTC                                                                                                                 |
| amount    | Decimal   | true     | Transferring amount        |             |                                                                                                                               |
| type      | string    | true     | type of the transfer       |             | Transfer from Future account to Spot account: “futures-to-pro” Transfer from Spot account to Future account: "pro-to-futures" |

#### Response Parameter

| Parameter | Data Type | Required | Description            | Value Range                           |
| --------- | --------- | -------- | ---------------------- | ------------------------------------- |
| status    | string    | true     | Response status        | ok, error                             |
| data      | long      | true     | Transfer ID            | If status="error", data will be null. |
| err-code  | string    | true     | Error code             |                                       |
| err-msg   | string    | true     | Error code description |                                       |

#### Request example

```
{
  "currency": "btc",
  "amount": 10,
  "type": "futures-to-pro"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 179697972
}
```

### /v2/account/transfer (\[General\] Spot - transfer funds between contract accounts)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface allows for asset transfer between users’
currency spot accounts, contract accounts

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter      | Data Type | Required | Description                       | Value Range                     | Default Value |
| -------------- | --------- | -------- | --------------------------------- | ------------------------------- | ------------- |
| from           | string    | true     | source，value：spot、futures      | e.g. spot、spot、futures        |               |
| to             | string    | true     | destination，value：spot、futures | e.g. linear-swap、spot、futures |               |
| currency       | string    | true     | 币种,支持大小写                   | e.g. usdt                       |               |
| amount         | decimal   | true     | 划转金额                          |                                 |               |
| margin-account | string    | true     | 保证金账户                        | e.g. btc-usdt、eth-usdt、USDT   |               |

#### Response Parameter

| Parameter | Data Type | Required | Description                     | Value Range |
| --------- | --------- | -------- | ------------------------------- | ----------- |
| success   | string    | true     | status                          | true/false  |
| data      | long      | true     | The generated transfer order id |             |
| code      | long      | true     | Response code                   |             |
| message   | string    | true     | Response message                |             |

#### Request example

```
{
  "from": "spot",
  "to": "futures",
  "currency": "usdt",
  "amount": 100,
  "margin-account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": 176104252,
  "message": "Succeed",
  "success": true
}
```
