# HTX Private REST API Documentation

## Introduction

### API Documentation Summary

Welcome to the HTX USDT Margined Contracts API! You can use our API to access all market data, trading, and account management endpoints.

We have code examples in Shell! You can view code examples in the dark area to the right.

### Market Maker Program

Market maker program gives clients with good market making strategy an opportunity to have customized trading fee structure.

Market makers will not be able to use point cards, VIP rate, rebate or any other fee promotions.

#### Eligibility Criteria as a Market Maker on Huobi Futures

Welcome users, who are dedicated to maker strategy and have created large trading volume, to participate in Huobi Futures long-term Market Maker project.If you have more than 3 BTC in your Huobi future account, or more than 3 BTC in your Huobi coin margined swap account, or more than 100000 USDT in your Huobi USDT Margined Contracts account, please send the following information to Vip@global-hgroup.com:

1.  Huobi UIDs (not linked to any rebate program in any accounts)
2.  Provide screenshot of trading volume for the past 30 days or VIP/corporate status with other Exchanges

More detail in here: [Huobi USDT-Margined Contracts Market Maker Preferential Policy](https://www.huobi.com/support/en-us/detail/900003272306)

### Colocation

#### Solution Architecture

HTX swap API colocation solution is built on AWS infrastructure. Client will connect via AWS “PrivateLink” to access HTX’s services directly through fast AWS connection without being routed to public networks.

#### Performance Improvement

The network delay of colocation solution is estimated to be 10ms to 50ms faster than the ordinary connection. This improvement estimated should be used as a guidance only as the actual improvement depends on many factors.

#### Eligibility

Colocation is only available to higher tier market makers. To check if your account is eligible please talk to your dedicated account manager.

#### Setting

Detail in here: [HTX Futures Colocation](https://github.com/hbdmapi/huobi_colocation/blob/main/Huobi%20Futures%20Colocation.pdf)

### Risk Mechanism

#### Partial Liquidation

Margin ratio is an indicator to estimate the risk of users’assets. When the margin ratio is less than or equal to 0%, liquidation will be triggered.

It is recommended that you pay close attention to margin ratio changes, so as to avoid your positions from liquidation.

HTX contracts implement a partial liquidation mechanism, in which the system will lower the corresponding tier of an adjustment factor to avoid your positions from being liquidated at one time.

More detail to see: [Partial Liquidation](https://www.huobi.com/support/en-us/detail/900001325083)

#### Insurance Funds and Clawback Mechanism

Insurance funds are designed to cover the losses from forced liquidation.

In a fluctuating market, users’ positions may be liquidated. When the order cannot be filled at the takeover price, resulting in huge losses that are greater than the part insurance funds can undertake, the platform will implement the “clawback” mechanism. Each profitable account in the current period compensates the over loss of liquidation according to its profit ratio.

More detail in here: [Partial Liquidation](https://www.huobi.com/support/en-us/detail/900001325083)

#### Tiered Adjustment Factor

The adjustment factor is designed to prevent users from extended margin call loss. HTX Contracts use a tiered adjustment factor mechanism, which supports up to five tiers based on the position amount.

For contracts with different expirations under the different account modes, they are separately calculated. The larger the use’s net positions, the higher the tier, and the greater the risk.

More detail in here: [Tiered Adjustment Factor of USDT-margined Contract](https://www.huobi.com/support/en-us/detail/900001326606)

### Matching Mechanism

1.  Matching System: Order accepted by the Order System will enter the Matching System. Once orders are matched/filled, the settlement service will be executed and the matching result will be returned to the Order System; otherwise, the unfilled orders will go into the order book for matching.
    
2.  Price Priority: Higher-priced buy orders have priority over lower-priced buy orders; the reverse is true, lower-priced sell orders have priority over higher-priced sell orders.
    
3.  Time Priority: Buy orders at the same price are executed according to the time of entry to the Server.
    
4.  When the highest bid price is the same as the lowest ask price of the order book, this price is what we call transaction price.
    
5.  When the bid price is higher than the lowest ask price of the order book up to the minute, the lowest ask price will be the transaction price.
    
6.  When the ask price is lower than the highest bid price of the order book up to the minute, the highest bid price will be the transaction price.

## Swap API Access Guide

### API List

| permission type | Content Type | Interface Mode | Context | Request Type | Desc | Signature Required |
| --- | --- | --- | --- | --- | --- | --- |
| Read | Market Data | general | /linear-swap-api/v1/swap\_contract\_info | GET | Get Contracts Information | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_index | GET | Get contract Index Price Information | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_price\_limit | GET | Query Swap Price Limitation | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_open\_interest | GET | Get Contract Open Interest Information | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_risk\_info | GET | Query information on contract insurance fund balance and estimated clawback rate | No |
| Read | Market Data | general | /inear-swap-api/v1/swap\_insurance\_fund | GET | Query history records of insurance fund balance | No |
| Read | Market Data | isolated margin | /linear-swap-api/v1/swap\_adjustfactor | GET | Query information on Tiered Adjustment Factor | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_his\_open\_interest | GET | Query information on open interest | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_elite\_account\_ratio | GET | Query Top Trader Sentiment Index Function-Account | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_elite\_position\_ratio | GET | Query Top Trader Sentiment Index Function-Position | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_liquidation\_orders | GET | Query Liquidation Order Information | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_settlement\_records | GET | Query historical settlement records of the platform interface | No |
| Read | Market Data | isolated margin | /linear-swap-api/v1/swap\_api\_state | GET | Query information on system status | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_funding\_rate | GET | Query funding rate | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_batch\_funding\_rate | GET | \[General\]Query a Batch of Funding Rate | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_historical\_funding\_rate | GET | Query Historical Funding Rate | No |
| Read | Market Data | general | /linear-swap-ex/market/depth | GET | Get Market Depth | No |
| Read | Market Data | General | /linear-swap-ex/market/bbo | GET | Get Market BBO Data | No |
| Read | Market Data | general | /linear-swap-ex/market/history/kline | GET | Get KLine Data | No |
| Read | Market Data | general | /index/market/history/linear\_swap\_mark\_price\_kline | GET | Get Kline Data of Mark Price | No |
| Read | Market Data | general | /linear-swap-ex/market/detail/merged | GET | Get Market Data Overview | No |
| Read | Market Data | general | /linear-swap-ex/market/detail/batch\_merged | GET | Get a Batch of Market Data Overview | No |
| Read | Market Data | general | /v2/linear-swap-ex/market/detail/batch\_merged | GET | Get a Batch of Market Data Overview(V2) | No |
| Read | Market Data | general | /index/market/history/linear\_swap\_basis | GET | Query Basis Data | No |
| Read | Market Data | general | /index/market/history/linear\_swap\_premium\_index\_kline | GET | Query Liquidation Order Information | No |
| Read | Market Data | general | /index/market/history/linear\_swap\_estimated\_rate\_kline | GET | Query Swap Market Data interface | No |
| Read | Market Data | general | /linear-swap-ex/market/trade | GET | Query The Last Trade of a Contract | No |
| Read | Market Data | general | /linear-swap-ex/market/history/trade | GET | Query a Batch of Trade Records of a Contract | No |
| Read | Market Data | cross margin | /linear-swap-api/v1/swap\_cross\_adjustfactor | GET | Query Information On Tiered Adjustment Factor | No |
| Read | Market Data | cross margin | /linear-swap-api/v1/swap\_cross\_transfer\_state | GET | Query Information On Transfer State | No |
| Read | Market Data | cross margin | /linear-swap-api/v1/swap\_cross\_trade\_state | GET | Query Information On Trade State | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_estimated\_settlement\_price | GET | Get the estimated settlement price | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_ladder\_margin | GET | \[Isolated\]Query information on Tiered Margin | No |
| Read | Market Data | general | /linear-swap-api/v1/swap\_cross\_ladder\_margin | GET | \[Cross\]Query information on Tiered Margin | No |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_balance\_valuation | POST | \[General\]Query Asset Valuation | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_account\_info | POST | Query User’s Account Information | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_position\_info | POST | Query User’s position Information | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_available\_level\_rate | POST | Query user’s available leverage | Yes |
| Trade | Account | general | /linear-swap-api/v1/swap\_sub\_auth | POST | \[General\]Set a Batch of Sub-Account Trading Permissions | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_sub\_account\_list | POST | Query assets information of all sub-accounts under the master account (Query by coins) | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_sub\_account\_info\_list | POST | \[Isolated\]Query a Batch of Sub-Account's Assets Information | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_cross\_sub\_account\_info\_list | POST | \[Cross\]Query a Batch of Sub-Account's Assets Information | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_sub\_account\_info | POST | Query a single sub-account's assets information | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_sub\_position\_info | POST | Query a single sub-account's position information | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_financial\_record | POST | Query account financial records | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_financial\_record\_exact | POST | \[General\]Query account financial records via Multiple Fields | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_user\_settlement\_records | POST | Query Settlement Records of Users | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_user\_settlement\_records | POST | Query Settlement Records of Users | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_order\_limit | POST | Query contract information on order limit | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_fee | POST | Query information on contract trading fee | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_transfer\_limit | POST | Query information on Transfer Limit | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_position\_limit | POST | Query information on position limit | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_lever\_position\_limit | POST | \[Isolated\]Query Users' Position Limit for All Leverages | Yes |
| Read | Account | isolated margin | /linear-swap-api/v1/swap\_account\_position\_info | POST | Query Assets And Positions | Yes |
| Trade | Account | general | /linear-swap-api/v1/swap\_master\_sub\_transfer | POST | Transfer between master account and sub-accounts | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_master\_sub\_transfer\_record | POST | Query transfer records of master account | Yes |
| Trade | Account | general | /linear-swap-api/v1/swap\_transfer\_inner | POST | Transfer between different margin accounts under the same account | Yes |
| Read | Account | general | /linear-swap-api/v1/swap\_api\_trading\_status | GET | Query user's API indicator disable information | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_account\_info | POST | Query User's Account Information | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_position\_info | POST | Query User's Position Information | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_sub\_account\_list | POST | Query Assets Information Of All Sub-Accounts Under The Master Account | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_sub\_account\_info | POST | Query A Sub-Account's Assets Information | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_sub\_position\_info | POST | Query A Sub-Account's Position Information | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_transfer\_limit | POST | Query Information On Transfer Limit | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_position\_limit | POST | Query Information On Position Limit | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_lever\_position\_limit | POST | \[Cross\]Query Users' Position Limit for All Leverages | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_account\_position\_info | POST | Query Assets And Positions | Yes |
| Read | Account | cross margin | /linear-swap-api/v1/swap\_cross\_available\_level\_rate | POST | Query User’s Available Leverage | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_switch\_position\_mode | POST | \[Isolated\]Switch Position Mode | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_switch\_position\_mode | POST | \[Cross\]Switch Position Mode | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_order | POST | Place an Order | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_batchorder | POST | Place a Batch of Orders | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_switch\_lever\_rate | POST | Switch Leverage | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_cancel | POST | Cancel an Order | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_cancelall | POST | Cancel All Orders | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_order\_info | POST | Get Information of an Order | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_order\_detail | POST | Get Trade Details of an Order | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_openorders | POST | Get Current Orders | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_hisorders | POST | Get History Orders | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_matchresults | POST | Acquire History Match Results | Yes |
| Read | Trade | isolated margin | /linear-swap-api/v1/swap\_hisorders\_exact | POST | \[Isolated\]Get History Orders via Multiple Fields | Yes |
| Read | Trade | Cross margin | /linear-swap-api/v1/swap\_cross\_hisorders\_exact | POST | \[Cross\]Get History Orders via Multiple Fields | Yes |
| Read | Trade | Isolated margin | /linear-swap-api/v1/swap\_matchresults\_exact | POST | \[Isolated\]Get History Match Results via Multiple Fields | Yes |
| Read | Trade | Cross margin | /linear-swap-api/v1/swap\_cross\_matchresults\_exact | POST | \[Cross\]Get History Match Results via Multiple Fields | Yes |
| Trade | Trade | isolated margin | /linear-swap-api/v1/swap\_lightning\_close\_position | POST | Place Lightning Close Order | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_trigger\_order | POST | Place an Trigger Order | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_trigger\_cancel | POST | Cancel a Trigger Order | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_trigger\_cancelall | POST | Cancel all trigger Orders | Yes |
| Read | Strategy | isolated margin | /linear-swap-api/v1/swap\_trigger\_openorders | POST | Get all open trigger Orders | Yes |
| Read | Strategy | isolated margin | /linear-swap-api/v1/swap\_trigger\_hisorders | POST | Get all history trigger Orders | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_switch\_lever\_rate | POST | Switch Leverage | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_order | POST | Place An Order | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_batchorder | POST | Place A Batch Of Orders | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_cancel | POST | Cancel An Order | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_cancelall | POST | Cancel All Orders | Yes |
| Read | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_order\_info | POST | Get Information of order | Yes |
| Read | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_order\_detail | POST | Get Detail Information of order | Yes |
| Read | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_openorders | POST | Current unfilled order acquisition | Yes |
| Read | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_hisorders | POST | Get History Orders | Yes |
| Read | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_matchresults | POST | Get History Match Results | Yes |
| Trade | Trade | cross margin | /linear-swap-api/v1/swap\_cross\_lightning\_close\_position | POST | Place Lightning Close Position | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_trigger\_order | POST | Place Trigger Order | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_trigger\_cancel | POST | Cancel Trigger Order | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_trigger\_cancelall | POST | Cancel All Trigger Orders | Yes |
| Read | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_trigger\_openorders | POST | Query Open Trigger Order | Yes |
| Read | Strategy | cross margin | /inear-swap-api/v1/swap\_cross\_trigger\_hisorders | POST | Query Trigger Order History | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_tpsl\_order | POST | \[Isolated\]Set a Take-profit and Stop-loss Order for an Existing Position | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_tpsl\_cancel | POST | \[Isolated\]Cancel a Take-profit and Stop-loss Order | Yes |
| Trade | Strategy | isolated margin | /linear-swap-api/v1/swap\_tpsl\_cancelall | POST | \[Isolated\]Cancel all Take-profit and Stop-loss Orders | Yes |
| Read | Strategy | isolated margin | /linear-swap-api/v1/swap\_tpsl\_openorders | POST | \[Isolated\]Open take-profit and stop-loss orders | Yes |
| Read | Strategy | isolated margin | /linear-swap-api/v1/swap\_tpsl\_hisorders | POST | \[Isolated\]Take-profit and stop-loss histoty orders | yes |
| Read | Strategy | isolated margin | /linear-swap-api/v1/swap\_relation\_tpsl\_order | POST | \[Isolated\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_tpsl\_order | POST | \[Cross\]Set a Take-profit and Stop-loss Order for an Existing Position | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_tpsl\_cancel | POST | \[Cross\]Cancel a Take-profit and Stop-loss Order | Yes |
| Trade | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_tpsl\_cancelall | POST | \[Cross\]Cancel all Take-profit and Stop-loss Orders | Yes |
| Read | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_tpsl\_openorders | POST | \[Cross\]Open take-profit and stop-loss orders | Yes |
| Read | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_tpsl\_hisorders | POST | \[Cross\]Take-profit and stop-loss histoty orders | Yes |
| Read | Strategy | cross margin | /linear-swap-api/v1/swap\_cross\_relation\_tpsl\_order | POST | \[Cross\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order | Yes |
| Trade | Account | general | https://api.huobi.pro/v2/account/transfer | POST | Transfer margin between Spot account and USDT Margined Contracts account | Yes |
| Trade | Strategy | Isolated | /linear-swap-api/v1/swap\_track\_order | POST | 【Isolated】Place a Trailing Order | Yes |
| Trade | Strategy | Isolated | /linear-swap-api/v1/swap\_track\_cancel | POST | 【Isolated】Cancel a Trailing Order Order | Yes |
| Trade | Strategy | Isolated | /linear-swap-api/v1/swap\_track\_cancelall | POST | 【Isolated】Cancel All Trailing Orders | Yes |
| Read | Strategy | Isolated | /linear-swap-api/v1/swap\_track\_openorders | POST | 【Isolated】Current unfilled trailing order acquisition | Yes |
| Read | Strategy | Isolated | /linear-swap-api/v1/swap\_track\_hisorders | POST | 【Isolated】Get History Trailing Orders | Yes |
| Trade | Strategy | Cross | /linear-swap-api/v1/swap\_cross\_track\_order | POST | 【Cross】Place a Trailing Order | Yes |
| Trade | Strategy | Cross | /linear-swap-api/v1/swap\_cross\_track\_cancel | POST | 【Cross】Cancel a Trailing Order Order | Yes |
| Trade | Strategy | Cross | /linear-swap-api/v1/swap\_cross\_track\_cancelall | POST | 【Cross】Cancel All Trailing Orders | Yes |
| Read | Strategy | Cross | /linear-swap-api/v1/swap\_cross\_track\_openorders | POST | 【Cross】Current unfilled trailing order acquisition | Yes |
| Read | Strategy | Cross | /linear-swap-api/v1/swap\_cross\_track\_hisorders | POST | 【Cross】Get History Trailing Orders | Yes |

### Address

| Address | Applicable sites | Applicable functions | Applicable trading pairs |
| --- | --- | --- | --- |
| https://api.hbdm.com | HTX USDT Margined Contracts | API | Trading pairs provided by HTX USDT Margined Contracts |

#### Notice

If you can't connect "https://api.hbdm.com", please use "https://api.btcgateway.pro" for debug purpose. If your server is deployed in AWS, we recommend using "https://api.hbdm.vn".

### Signature Authentication & Verification

#### Signature Guide

Considering that API requests may get tampered in the process of transmission, to keep the transmission secure, you have to use your API Key to do Signature Authentication for all private interface except for public interface (used for acuqiring basic information and market data), in this way to verify whether the parameters/ parameter value get tampered or not in the process of transmission

A legitimate request consists of following parts：

-   Request address of method, i.e. visit server address--api.hbdm.com, e.g.: api.hbdm.com/linear-swap-api/v1/swap\_order
    
-   API Access Key ID (AccessKeyId): Access Key of the API Key that you apply.
    
-   Method of Signature (SignatureMethod): The first one is for users to use the elliptic curve digital signature algorithm, using Ed25519. ‌The second, hash-based protocol for user-computed signatures, uses HmacSHA256.
    
-   Ed25519 introduction: It is a high-performance digital signature algorithm that provides fast signature verification and generation while having high security.
-   Signature Version (SignatureVersion): It adopts version 2 in terms of Signature Version.
    
-   Timestamp (Timestamp): The time when you send the request (UTC time zone) : (UTC time zone) : (UTC time zone), e.g.: 2017-05-11T16:22:06
    
-   Must-fill parameters & optional parameters: For each method, there are a group of must-fill parameters and optional parameters used to address the API request, which can be found in the illustration of each method as well as their meaning. Please note that, in terms of "Get" requests, it needs to do Signature calculation for all the original parameters in each method ; In terms of "Post" requests, no need to do Signature calculation for the original parameters in each method, which means only four parameters need to do Signature calculation in "Post" requests, i.e. AccessKeyId, SignatureMethod, SignatureVersion, Timestamp with other parameters placed in "body".
    
-   Signature: The result of Signature calculation which is used to verify if signature is valid and not tampered.
    

#### Create API Key

[You could create API Key at](https://www.hbg.com/zh-cn/apikey/)

API Key consists of the following two parts.

-   "Access Key", the Key used to visit API.
    
-   "Secret Key", the Key used to do Signature authentication and verification (visible during application period).
    

When create API Key, users could bind IP address, as the validity of unbond IP address is only 90 days.

API Key has operation authorization of trading, borrowing, deposit and withdrawal etc..

Both Access Key and Secret Key are closely related with account security, please do not disclose them to others for any reasons anytime.

#### Ed25519 Steps for Signature

Normative request for Signature calculation Different contents will get totally different results when use HMAC to calculate Signature, therefore, please normalize the requests before doing Signature calculation. Take the request of inquering order details as an example:

query details of one order

`[https://api.hbdm.com/linear-swap-api/v1/swap_order](https://api.hbdm.com/linear-swap-api/v1/swap_order)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=Ed25519`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

#### 1\. Request methods (GET/POST): add line breaker "\\n".

`POST\n`

#### 2\. Text the visit address in lowercase, adding line breake "\\n"

`[api.hbdm.com](http://api.hbdm.com)\n`

#### 3\. Visit the path of methods, adding line breaker "\\n"

`/linear-swap-api/v1/swap_order\n`

#### 4\. Rank the parameter names according to the sequence of ASCII codes, for example, below is the parameters in original sequence and the new sequence:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 to encode when it has already been encoded by URI with hexadecimals in Uppercase, e.g., ":" wiil be encoded to "%3A" while space to "%20".Timestamp should be written in the form of YYYY-MM-DDThh:mm:ss and encoded with URI.

#### 5\. After ranking

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

#### 6\. Following the sequence above, link parameters with "&"

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 7\. Form the final character strings that need to do Signature calculation as following:

`POST\n`

`[api.hbdm.com](http://api.hbdm.com)\n`

`/linear-swap-api/v1/swap_order\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 8\. Use the "request character strings" formed in the last step and your Secret Key to create a digital Signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

1.  Use the request string obtained in the previous step to generate the private key of Ed25519 and add it to generate a signature.
2.  Encode the generated signature with base-64, and the resulting value is used as the digital signature of this interface call.

#### 9\. Add the digital Signature into the parameters of request path.

The final request sent to Server via API should be like:

`[https://api.hbdm.com/linear-swap-api/v1/swap_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D](https://api.hbdm.com/linear-swap-api/v1/swap_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D)`

1.  Add all the must authentication parameters into the parameters of request path;
    
2.  Add the digital Signature encoded with URL code into the path parameters with the parameter name of "Signature".
    

#### HmacSHA256 Steps for Signature

Normative request for Signature calculation Different contents will get totally different results when use HMAC to calculate Signature, therefore, please normalize the requests before doing Signature calculation. Take the request of inquering order details as an example:

query details of one order

`[https://api.hbdm.com/linear-swap-api/v1/swap_order](https://api.hbdm.com/linear-swap-api/v1/swap_order)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=HmacSHA256`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

#### 1\. Request methods (GET/POST): add line breaker "\\n".

`POST\n`

#### 2\. Text the visit address in lowercase, adding line breake "\\n"

`[api.hbdm.com](http://api.hbdm.com)\n`

#### 3\. Visit the path of methods, adding line breaker "\\n"

`/linear-swap-api/v1/swap_order\n`

#### 4\. Rank the parameter names according to the sequence of ASCII codes, for example, below is the parameters in original sequence and the new sequence:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 to encode when it has already been encoded by URI with hexadecimals in Uppercase, e.g., ":" wiil be encoded to "%3A" while space to "%20".Timestamp should be written in the form of YYYY-MM-DDThh:mm:ss and encoded with URI.

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

`/linear-swap-api/v1/swap_order\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30`

#### 8\. Use the "request character strings" formed in the last step and your Secret Key to create a digital Signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

1.  Take the request character string formed in the last step and API Secret Key as two parameters, encoding them with the Hash Function HmacSHA256 to get corresponding Hash value.
    
2.  Encoding the Hash value with base-64 code, the result will be the digital Signature of this request.
    

#### 9\. Add the digital Signature into the parameters of request path.

The final request sent to Server via API should be like:

`[https://api.hbdm.com/linear-swap-api/v1/swap_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D](https://api.hbdm.com/linear-swap-api/v1/swap_order?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D)`

1.  Add all the must authentication parameters into the parameters of request path;
    
2.  Add the digital Signature encoded with URL code into the path parameters with the parameter name of "Signature".

### API Rate Limit Illustration

Future, Coin Margined Swap,Option Swap and USDT Margined Contracts are using separate API rate limits.

Please note that, for both public interface and private interface, there are rate limits, more details are as below:

-   Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date). [API Interface List](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#api-list)
    
-   For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).
    
-   For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on：
    
    （1）For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most
    
    （2）For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.
    
-   WebSocket, the private order push interface, requires API KEY Verification:
    
    Each UID can build at most create 30 WS connections for private order push at the same time. For each account, contracts of the same underlying coin only need to subscribe one WS order push, e.g. users only need to create one WS order push connection for BTC Contract which will automatically push orders of BTC-USDTcontracts. Please note that the rate limit of WS order push and RESTFUL private interface are separated from each other, with no relations.
    
-   Both read and trade interfaces will return the ratelimit info.You can refer to the following fields of "header" from api response. E.g.,you will get the total Read ratelimit("ratelimit-limit") and the remaining Read ratelimit("ratelimit-remaining") when you query the order info(/linear-swap-api/v1/swap\_account\_info) , and you will get the total Trade ratelimit("ratelimit-limit") and the remaining Trade ratelimit("ratelimit-remaining") when you place an order(/linear-swap-api/v1/swap\_order)). [API Interface List](https://docs.huobigroup.com/docs/usdt_swap/v1/en/#api-list)
    
-   Will response following string for "header" via api
    
    ratelimit-limit: the upper limit of requests per time, unit: times
    
    ratelimit-interval: reset interval (reset the number of request), unit: ms
    
    ratelimit-remaining: the left available request number for this round, unit: times
    
    ratelimit-reset: upper limit of reset time used to reset request number, unit: ms
    
    When API Limitation on Order Cancellation Ratio is triggered,the following string for "header" via api will also be returned:
    
    recovery-time: recovery timestamp, whose unit is millisecond, showing the end time of prohibition, or the access retrieval timestamp;
    
    if you are not in the prohibition period, the field is not included in returned header;

### API Limitation on Order Cancellation Ratio

-   The system will calculate the order cancellation ratio automatically when the total number of orders placed via certain order price types by the API user goes equal to or larger than 3,000 within 10 minutes. If the order cancellation ratio is greater than 99%, the user will be prohibited for 5 minutes from placing orders via certain API order price types which will be listed below (The response of placing orders will return: 1084 Your contract API is disabled, please try again after {0} (GMT+8).).
-   A 30-minute API order placement prohibition will be triggered if the user was prohibited for 3 times within an hour (The response of placing orders will return: 1084 Your contract API is disabled, please try again after {0} (GMT+8).). After resuming access, the total number of prohibited times will be cleared during the previous period and will not be counted into the total prohibited times in the new period.
-   Please note that the prohibition from placing orders will cause no effect on order cancellation via API as well as order placement and cancellation via other terminals. We’ll keep you notified on each prohibition via SMS and email.
-   Only four API order price types will be prohibited which are Limit order, Post\_only, FOK and IOC. Please note that you can still use freely other order price types during the banned period, such as Lightning Close, BBO, Optimal 5, Optimal 10 and Optimal 20, opponent\_ioc, lightning\_ioc, optimal\_5\_ioc, optimal\_10\_ioc，optimal\_20\_ioc，opponent\_fok，lightning\_fok，optimal\_5\_fok，optimal\_10\_fok，optimal\_20\_fok,etc.
-   The response header returned by HTTP request:
    -   When placing order by using the four prohibited order price types during the prohibition period, the message header returned by interface will include the field: "recovery-time: recovery timestamp" whose unit is millisecond, showing the end time of prohibition, or the access retrieval timestamp; if you are not in the prohibition period, the field is not included in returned header;
    -   Please note that our system calculates order cancellation ratio according to UID and therefore, the master account UID and sub-accounts UIDs will be counted separately. The calculation period is 10 min/time(The start time starts at 00:00 and the end time is 00:10. Every 10 minutes is a cycle.).
-   Definition of Indicators：
    
    -   Order Cancellation Ratio =Total number of invalid cancellation / Total number of placed orders (all types of orders placed via API)
    -   Total number of placed order: Total number of placed orders refers to all orders placed via API which meet these requirements:
    -   1.the order type is placing orders (Order Type = 1),
    -   2.order price types include Limit Order, Post\_only, FOK and IOC.
    -   3.order creating time should be within the interval between 3 seconds before the start time of the calculation period and the end time of the calculation period.
    -   Total number of invalid cancellation:Total number of invalid cancellation refers to all cancellation orders placed via API which meet the requirements.
    -   the order type is placing orders (order Type=1),
    -   the order price types are Limit Order, post\_only, FOK and IOC.
    -   the order status is “Orders cancelled” (status=7).
    -   order with 0 fulfilled.
    -   the interval between order cancellation and placement should be less than or equal to 3 seconds.
    -   the order cancellation time should be within the calculation period.
-   In order to ensure stability and transaction performance of API, please try to reduce order cancellation rate and cancellation amount during peak periods to avoid frequent triggering of API restriction mechanism.Suggestions of reducing order cancellation rate are as below:
    
    -   1\. Set orders’ price to BBO prices as close as possible;
    -   2\. Prolong the interval properly between each order placement and cancellation;
    -   3\. Try to increase your amount for each order and reduce the frequency of order;
    -   4\. Try to improve your order fulfillment rate:
    -   （1）Please try to use order prices types that help more on order fulfillment in preference such as BBO, Optimal 5, Optimal 10, Optimal 20, lightning Close, opponent\_ioc, lightning\_ioc, optimal\_5\_ioc, optimal\_10\_ioc，optimal\_20\_ioc，opponent\_fok，lightning\_fok，optimal\_5\_fok，optimal\_10\_fok，optimal\_20\_fok, etc.
    -   （2）Try to use best bid/ask price when placing IOC orders, FOK orders and Post\_only orders.
    -   5\. Please try to extend your request polling cycle when implementing your strategy.

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

#### 1\. Query contract history orders interface: /linear-swap-api/v1/swap\_hisorders

-   To ensure timelines and to reduce latency, users are highly recommended to get contract history orders information faster from server memory using interface “query contract order information” (URL: /linear-swap-api/v1/swap\_order\_info).
    
-   For users who use interface “query contract history orders” (URL: /linear-swap-api/v1/swap\_hisorders), please enter as many query conditions as possible (including contract\_code, trade\_type（recommended to send “0” to query all）, type, status, create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.
    

#### 2\. Query contract match results interface: /linear-swap-api/v1/swap\_matchresults

-   To improve query performance and response speed, please enter as many querying conditions as possible (including contract\_code, trade\_type（recommended to send “0” to query all）, create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.

#### 3\. Query contract financial record interface: /linear-swap-api/v1/swap\_financial\_record

-   To improve query performance and response speed, please enter as many querying conditions as possible (including symbol, type(recommended to leave it blank to query all), create\_date). Besides, try not to enter a big integer in parameter “create\_date”. You are kindly suggested to query one-day data at a time.

#### 4\. Query contract order detail interface: /linear-swap-api/v1/swap\_order\_detail

-   When querying orders without parameter(such as the parameter: created\_at), the query result data may be delayed. It is recommended to pass the two parameters of the interface: created\_at (order timestamp) and order\_type (order type, default 1), the database will be directly queried, and the query results data will be more timely.
    
-   Querying condition “created\_at” uses 13-bit long type time stamp (including milliseconds). Querying performance will be improved when accurate time stamps are entered.
    
-   For example: the converted time stamp of "2019/10/18 10:26:22" is 1571365582123. The returned ts from interface “contract\_order” can be used as time stamp to query corresponding order. 0 is not allowed in parameter “created\_at”.
    

#### 5\. WebSocket subscription to Market Depth data:

-   For acquiring market depth data within 150 steps, you are kindly suggested to use step0, step1, step2, step3, step4, step5, step14, step15, step16, step17；
    
-   For acquiring market depth data within 20 steps, you are kindly suggested to use step6, step7, step8, step9, step10, step11, step12, step13, step18, step19；
    
-   Since the large volume of pushing 150 steps data every 100ms, WebSocket disconnection may occur frequently if client’s network bandwidth is insufficient or the processing is not in time; therefore, we highly recommend users using step6, step7, step8, step9, step10, step11, step12, step13, step18, step19 to acquire 20 steps data. For instance, subscribing 20 steps data.
    

`{`

`"sub": "market.BTC-USDT.depth.step6",`

`"id": "id5"`

`}`

-   We also suggest that you subscribe incremental market depth data.orderbook event will be checked every 30ms. If there is no orderbook event, you will not receive any orderbook data.you HAVE TO maintain local orderbook data,such as updating your local orderbook bids and asks data.You can subscribe 20 or 150 unmerged data.

`{`

`"sub": "market.BTC-USDT.depth.size_20.high_freq",`

`"data_type":"incremental",`

`"id": "id1"`

`}`

#### 6\. Place order interface (URL: /linear-swap-api/v1/swap\_order) and place a batch of orders interface (URL:/linear-swap-api/v1/swap\_batchorder):

-   We recommend to fill in the parameter “client\_order\_id”(should be unique from user-side),which can help users to acquire order status and other order information according to the parameter “client\_order\_id" from
    
-   query order information interface (URL: /linear-swap-api/v1/swap\_order\_info ) when there is no returned information due to network or other problems.
    

#### 7\. The best deployment of program server

-   It is recommended that place the server in AWS Tokyo C zone and use the api.hbdm.vn domain, which can effectively reduce network disconnection and network timeout.

### Code Demo

-   [Java](https://github.com/hbdmapi/huobi_usdt_swap_Java)
    
-   [Python](https://github.com/hbdmapi/hbdm_Python)
    
-   [Postman](https://github.com/hbdmapi/huobi_futures_Postman)
    
-   [CSharp](https://github.com/hbdmapi/huobi_sdk_CSharp)
    
-   [Golang](https://github.com/hbdmapi/huobi_futures_Golang)
    
-   [C++](https://github.com/hbdmapi/huobi_futures_Cpp)
    

PS: USDT Margined Contracts api is similar to Coin margined swap api and future api.

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

### The usage of and the difference between cross margin mode and isolated margin mode

1.  Under the cross margin mode, all swaps share the USDT in the cross margin account as the margin, which indicates that all positions under the cross margin mode share the same account equity, and their PnL, occupied margin and margin ratio are calculated jointly. Under the isolated margin mode, the account equity for each swaps are calculated separately, and the position margin and PnL of each swaps will not affect each other.
    
2.  The cross margin mode and the isolated margin mode use different margin accounts, and the assets are independent of each other. Users can trade, or hold positions under the two modes at the same time. For example, in BTC/USDT swaps trading, the margin account for cross margin trading is USDT, while the margin account for isolated margin trading is BTC-USDT.
    
3.  API users can use the support\_margin\_mode field (margin mode supported by the contract) of the API interface \[Query Swap Info: linear-swap-api/v1/swap\_contract\_info\] to check which mode (cross/isolated) the contract supports.
    
4.  The API interface is divided into three modes, \[Cross\], \[Isolated\] and \[General\]. These three modes are marked on the API interface name and the interface list. \[Cross\] indicates that the API interface only supports cross margin mode. \[Isolated\] indicates that the API interface only supports isolated margin mode, and \[General\] indicates that the API interface supports both two modes, indicating that it can be called by both the cross margin mode and isolated margin mode.

### How to solve problems more effectively?

When you report an API error, you need to attach your request URL, the original complete body of the request and the complete request URL parameters, and the original complete log of the server's response. If it is a websocket subscription, you need to provide the address of the subscription, the topic of the subscription, and the original complete log pushed by the server.

If it is an order-related issue, use the API order query interface /linear-swap-api/v1/swap\_order\_info to keep the complete log returned and provide your UID and order number.

## Swap Transferring Interface

### Response Code Table

| Response Code | Desc in Chinese | Desc in English |
| --- | --- | --- |
| 200 | 成功 | Succeed |
| 403 | 拒绝访问 | Access denied |
| 404 | 访问的资源不存在 | The resource being accessed does not exist |
| 429 | 太多的请求 | too many requests |
| 500 | 系统错误 | System error |
| 501 | 无效请求 | Invalid request |
| 502 | 无效参数 | Invalid parameter |
| 504 | 缺少参数 | Lack of parameter |
| 512 | 拒绝匿名请求 | Reject anonymous requests |
| 513 | 无效的签名 | Invalid signature |
| 10000 | 币种不存在 | Currency does not exist |
| 10001 | 不支持同业务划转 | Does not support transfer within single business |
| 10002 | 不支持此划转业务 | This transfer is not supported |
| 10003 | from方check校验不通过 | check rejected by the from party |
| 10004 | to方check校验不通过 | to check rejected by the to party |
| 10005 | 个人账户平账检查不通过 | Personal account balance check failed |
| 10006 | 系统账户检查失败 | System account check failed |
| 10008 | 黑名单校验不通过 | Blacklist check failed |
| 10009 | 用户有未安全上账资产，禁止划转 | No transfer is allowed if the user has any asset that has not been charged to the account safely |
| 10010 | 用户被锁定 | User locked |
| 10011 | 24小时内修改过安全策略 | Security policy has been modified within 24 hours |
| 20001 | OTC 人脸识别 | OTC Face Recognition |
| 1030 | 服务异常，请稍后再试 | Abnormal service. Please try again later. |
| 1010 | 用户不存在 | Abnormal service. Please try again later. |
| 1012 | 账户不存在 | Abnormal service. Please contact customer service. |
| 1013 | 合约品种不存在 | This contract type doesn't exist. |
| 1018 | 主账号不存在 | Main account doesn't exist. |
| 1089 | {0}合约暂时限制划转,请联系客服 | {0} contract is restricted of transfer. Please contact customer service. |
| 1102 | 您没有转入权限,请联系客服 | Unable to transfer in currently. Please contact customer service. |
| 1103 | 您没有转出权限,请联系客服 | Unable to transfer out currently. Please contact customer service. |
| 1106 | 合约状态异常,暂时无法划转 | Abnormal contracts status. Can’t transfer. |
| 1111 | 子账号没有转入权限,请联系客服 | Sub-account doesn't own the permissions to transfer in. Please contact customer service. |
| 1112 | 子账号没有转出权限,请联系客服 | sub-account doesn't own the permissions to transfer out. Please contact customer service. |
| 1114 | 子账号没有划转权限,请登录主账号授权 | The sub-account does not have transfer permissions. Please login main account to authorize. |
| 1300 | 划转失败 | Transfer failed. |
| 1301 | 可划转余额不足 | Insufficient amount available. |
| 1302 | 系统划转错误 | Transfer failed. |
| 1303 | 单笔转出的数量不能低于{0}{1} | The single transfer-out amount must be no less than {0}{1}. |
| 1304 | 单笔转出的数量不能高于{0}{1} | The single transfer-out amount must be no more than {0}{1}. |
| 1305 | 单笔转入的数量不能低于{0}{1} | The single transfer-in amount must be no less than {0}{1}. |
| 1306 | 单笔转入的数量不能高于{0}{1} | The single transfer-in amount must be no more than {0}{1}. |
| 1307 | 您当日累计转出量超过{0}{1}, 暂无法转出 | Your accumulative transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being. |
| 1308 | 您当日累计转入量超过{0}{1}, 暂无法转入 | Your accumulative transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being. |
| 1309 | 您当日累计净转出量超过{0}{1}, 暂无法转出 | Your accumulative net transfer-out amount is over the daily maximum, {0}{1}. You can't transfer out for the time being. |
| 1310 | 您当日累计净转入量超过{0}{1}, 暂无法转入 | Your accumulative net transfer-in amount is over the daily maximum, {0}{1}. You can't transfer in for the time being. |
| 1311 | 超过平台当日累计最大转出量限制, 暂无法转出 | The platform's accumulative transfer-out amount is over the daily maximum. You can't transfer out for the time being. |
| 1312 | 超过平台当日累计最大转入量限制, 暂无法转入 | The platform's accumulative transfer-in amount is over the daily maximum. You can't transfer in for the time being. |
| 1313 | 超过平台当日累计最大净转出量限制, 暂无法转出 | The platform's accumulative net transfer-out amount is over the daily maximum. You can't transfer out for the time being. |
| 1314 | 超过平台当日累计最大净转入量限制, 暂无法转入 | The platform's accumulative net transfer-in amount is over the daily maximum. You can't transfer in for the time being. |
| 1315 | 划转类型错误 | Wrong transfer type. |
| 1316 | 划转冻结失败 | Failed to freeze the transfer. |
| 1317 | 划转解冻失败 | Failed to unfreeze the transfer. |
| 1318 | 划转确认失败 | Failed to confirm the transfer. |
| 1319 | 查询可划转金额失败 | Failed to acquire the available transfer amount. |
| 1320 | 此合约在非交易状态中, 无法进行系统划 | The contract status is abnormal. Transfer is unavailable temporarily. |
| 1321 | 划转失败, 请稍后重试或联系客服 | Transfer failed. Please try again later or contact customer service. |
| 1322 | 划转金额必须大于0 | Invalid amount. Must be more than 0. |
| 1323 | 服务异常, 划转失败, 请稍后再试 | Abnormal service, transfer failed. Please try again later. |
| 1327 | 无划转权限, 划转失败, 请联系客服 | No transfer permission, transfer failed, please contact customer service. |
| 1328 | 无划转权限, 划转失败, 请联系客服 | No transfer permission, transfer failed, please contact customer service. |
| 1329 | 无划转权限, 划转失败, 请联系客服 | No transfer permission, transfer failed, please contact customer service. |
| 1330 | 无划转权限, 划转失败, 请联系客服 | No transfer permission, transfer failed, please contact customer service. |
| 1331 | 超出划转精度限制(8位), 请修改后操作 | Exceeds limit of transfer accuracy (8 digits). Please modify it. |

## USDT-M Unified Account

### Unified Account Restricted APIs

| API Name &Documentation | API Path | Restriction reason |
| --- | --- | --- |
| \[General\] Transfer between different margin accounts under the same account | /linear-swap-api/v1/swap\_transfer\_inner | Funds in the unified account are all in one account without transfer |
| \[General\] Transfer between master and sub account | /linear-swap-api/v1/swap\_master\_sub\_transfer | Restrict transfers to currency pairs, all funds are in the USDT account |
| \[Isolated\] Query information on Transfer Limit | /linear-swap-api/v1/swap\_transfer\_limit | Funds in the unified account are all in one account without transfer |
| \[Isolated\] Query User’s Account Information | /linear-swap-api/v1/swap\_account\_info | Unified account assets can be queried through the new asset API |
| \[Cross\] Query User's Account Information | /linear-swap-api/v1/swap\_cross\_account\_info | Unified account assets can be queried through the new asset API |
| \[Isolated\] Query Assets And Positions | /linear-swap-api/v1/swap\_account\_position\_info | The unified account only provides APIs for separate query of assets and positions |
| \[Cross\] Query Assets And Positions | /linear-swap-api/v1/swap\_cross\_account\_position\_info | The unified account only provides APIs for separate query of assets and positions |
| \[Isolated\] Query assets information of all sub-accounts under the master account | /linear-swap-api/v1/swap\_sub\_account\_list | The unified account only supports the assets of the account alone to query funds |
| \[Cross\] Query Assets Information Of All Sub-Accounts Under The Master Account | /linear-swap-api/v1/swap\_cross\_sub\_account\_list | The unified account only supports the assets of the account alone to query funds |
| \[Isolated\]Query a Batch of Sub-Account's Assets Information | /linear-swap-api/v1/swap\_sub\_account\_info\_list/td> | The unified account only supports the assets of the account alone to query funds |
| \[Cross\]Query a Batch of Sub-Account's Assets Information | /linear-swap-api/v1/swap\_cross\_sub\_account\_info\_list | The unified account only supports the assets of the account alone to query funds |
| \[Isolated\] Query a single sub-account's assets information | /linear-swap-api/v1/swap\_sub\_account\_info | The unified account only supports the assets of the account alone to query funds |
| \[Cross\] Query A Sub-Account's Assets Information | /linear-swap-api/v1/swap\_cross\_sub\_account\_info | The unified account only supports the assets of the account alone to query funds |

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

### /linear-swap-api/v1/swap\_balance\_valuation (\[General\]Query Asset Valuation)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| valuation\_asset | string | false | The valuation according to the certain fiat currency. If not fill in, default as BTC | "BTC", "USD", "USDT", "CNY", "EUR", "GBP", "VND", "HKD", "TWD", "MYR", "SGD", "KRW", "RUB", "TRY" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handles for the request |  |
| DATA\_START | object array | true |  |  |
| valuation\_asset | string | true | The valuation according to the certain fiat currency | "BTC", "USD", "USDT", "CNY", "EUR", "GBP", "VND", "HKD", "TWD", "MYR", "SGD", "KRW", "RUB", "TRY" |
| balance | string | true | Asset Valuation |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

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
      "valuation_asset": "BTC",
      "balance": "0.378256726579799383"
    }
  ],
  "ts": 1614045417046
}
```

### /linear-swap-api/v1/swap\_account\_info (\[Isolated\] Query User’s Account Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false |  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | Margin Asset |  |
| margin\_balance | decimal | true | Account rights |  |
| margin\_position | decimal | true | Position Margin |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_available | decimal | true | Available margin |  |
| profit\_unreal | decimal | true | Unrealized profit |  |
| risk\_rate | decimal | true | risk rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | Estimated liquidation price |  |
| withdraw\_available | decimal | true | Available withdrawal |  |
| lever\_rate | decimal | true | Leverage Rate |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | Static Margin |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "margin_balance": 99.75505884,
      "margin_position": 0,
      "margin_frozen": 12.73,
      "margin_available": 87.02505884,
      "profit_real": 0,
      "profit_unreal": 0,
      "risk_rate": 7.761218290652003,
      "new_risk_rate": "",
      "trade_partition": "",
      "withdraw_available": 87.02505884,
      "liquidation_price": null,
      "lever_rate": 10,
      "adjust_factor": 0.075,
      "margin_static": 99.75505884,
      "contract_code": "BTC-USDT",
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side"
    }
  ],
  "ts": 1603697381238
}
```

### /linear-swap-api/v1/swap\_cross\_account\_info (\[Cross\] Query User's Account Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account，return all margin account info when null | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (summary of all contract) |  |
| margin\_frozen | decimal | true | frozen margin (summary of all contract) |  |
| profit\_unreal | decimal | true | unrealized profits and losses (summary of all contract) |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| money\_in | bigdecimal | true | money in |  |
| money\_out | bigdecimal | true | money out |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_contract\_detail\_\_ | object array | true |  |  |
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
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/contract\_detail\_\_ |  | false |  |  |
| \_\_futures\_contract\_detail\_\_ | object array | true |  |  |
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
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/futures\_contract\_detail\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "margin_account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "futures_contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211217",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 10000,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "next_week",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        },
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211210",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 10000,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "this_week",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        },
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211231",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 10000,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "quarter",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        }
      ],
      "margin_mode": "cross",
      "margin_account": "USDT",
      "margin_asset": "USDT",
      "margin_balance": 10000,
      "margin_static": 10000,
      "margin_position": 0,
      "margin_frozen": 0,
      "profit_unreal": 0,
      "withdraw_available": 10000,
      "risk_rate": null,
      "money_in": "",
      "money_out": "",
      "new_risk_rate": "",
      "position_mode": "dual_side",
      "contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 10000,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "swap",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "swap"
        }
      ]
    }
  ],
  "ts": 1638757139907
}
```

### /linear-swap-api/v1/swap\_position\_info (\[Isolated\] Query User’s Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USDT" |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USDT" |
| volume | decimal | true | Position quantity |  |
| available | decimal | true | Available position can be closed |  |
| frozen | decimal | true | frozen |  |
| cost\_open | decimal | true | Opening average price |  |
| cost\_hold | decimal | true | Average price of position |  |
| profit\_unreal | decimal | true | Unrealized profit and loss |  |
| profit\_rate | decimal | true | Profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | Margin Asset |  |
| position\_margin | decimal | true | Position margin |  |
| lever\_rate | int | true | Leverage rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Latest price |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| withdraw\_available | decimal | false | Not the same account is empty, the unified account is the margin amount for position adjustmen |  |
| risk\_rate | decimal | false | margin rate |  |
| liquidation\_price | decimal | false | Estimated liquidation price |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:

If there are symbols in the settlement or delivery period,error code 1080(1080 In settlement or delivery. Unable to get positions of some contracts.) will return without request parameters. It's suggested to query the position info with request parameters to avoid raising the error code and not being able to query the position.

#### Request example

`{         "contract": "BTC-USDT",     }`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 13068,
      "cost_hold": 13068,
      "profit_unreal": 0,
      "profit_rate": 0,
      "lever_rate": 10,
      "position_margin": 1.3068,
      "direction": "buy",
      "profit": 0,
      "last_price": 13068,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    }
  ],
  "ts": 1603697821846
}
```

### /linear-swap-api/v1/swap\_cross\_position\_info (\[Cross\] Query User's Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-211225. When both of pair、contract\_type and contract\_code filled in, the contract\_code is the preferred. when no one filled in, return all contract type's data(swap and futures)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-211225" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | available position can be closed |  |
| frozen | decimal | true | frozen quantity |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| liquidation\_price | decimal | false | Estimated liquidation price |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 48945.9,
      "cost_hold": 48945.9,
      "profit_unreal": -0.0038,
      "profit_rate": -0.00038818368852141,
      "lever_rate": 5,
      "position_margin": 9.78842,
      "direction": "buy",
      "profit": -0.0038,
      "last_price": 48942.1,
      "margin_asset": "USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "contract_type": "swap",
      "pair": "BTC-USDT",
      "business_type": "swap",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 48929.7,
      "cost_hold": 48929.7,
      "profit_unreal": -0.0498,
      "profit_rate": -0.00508893371510555,
      "lever_rate": 5,
      "position_margin": 9.77598,
      "direction": "buy",
      "profit": -0.0498,
      "last_price": 48879.9,
      "margin_asset": "USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "business_type": "futures",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    }
  ],
  "ts": 1638758525147
}
```

### /linear-swap-api/v1/swap\_account\_position\_info (\[Isolated\] Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC-USDT","ETH-USDT".... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | contract symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | Margin Asset |  |
| margin\_balance | decimal | true | Balance Margin |  |
| margin\_static | decimal | true | Balance static |  |
| margin\_position | decimal | true | Postion Margin |  |
| margin\_frozen | decimal | true | Frozen Margin |  |
| margin\_available | decimal | true | Available Margin |  |
| profit\_unreal | decimal | true | Unreadlized Profit |  |
| risk\_rate | decimal | true | risk rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| rade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | Estimated Liquidation Price |  |
| withdraw\_available | decimal | true | Available Withdraw |  |
| lever\_rate | decimal | true | Leverage Rate |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_positions\_\_ | object array | true |  |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Position Quantity |  |
| available | decimal | true | Available position quatity can be closed |  |
| frozen | decimal | true | forzen postion Quantity |  |
| cost\_open | decimal | true | Opening Average Price |  |
| cost\_hold | decimal | true | Average position price |  |
| profit\_unreal | decimal | true | Unrealized profit |  |
| profit\_rate | decimal | true | Profit Rate |  |
| profit | decimal | true | Profit |  |
| margin\_asset | string | true | Margin Asset |  |
| position\_margin | decimal | true | Position Margin |  |
| lever\_rate | int | true | Leverage Rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Last Price |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_/positions\_\_ |  | false |  |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_balance": 99.75173164,
      "margin_position": 1.30699,
      "margin_frozen": 12.73,
      "margin_available": 85.71474164,
      "profit_real": -0.0052272,
      "profit_unreal": 0.0019,
      "risk_rate": 7.0313477027482385,
      "new_risk_rate": "",
      "trade_partition": "",
      "withdraw_available": 85.71284164,
      "liquidation_price": null,
      "lever_rate": 10,
      "adjust_factor": 0.075,
      "margin_static": 99.74983164,
      "positions": [
        {
          "symbol": "BTC",
          "new_risk_rate": "",
          "trade_partition": "",
          "contract_code": "BTC-USDT",
          "volume": 1,
          "available": 1,
          "frozen": 0,
          "cost_open": 13068,
          "cost_hold": 13068,
          "profit_unreal": 0.0019,
          "profit_rate": 0.00145393327211509,
          "lever_rate": 10,
          "position_margin": 1.30699,
          "direction": "buy",
          "profit": 0.0019,
          "last_price": 13069.9,
          "margin_asset": "USDT",
          "margin_mode": "isolated",
          "margin_account": "BTC-USDT",
          "position_mode": "dual_side",
          "adl_risk_percent": "3"
        }
      ],
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side",
      "adl_risk_percent": "3"
    }
  ],
  "ts": 1603697944138
}
```

### /linear-swap-api/v1/swap\_cross\_account\_position\_info (\[Cross\] Query Assets And Positions)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (summary of all contract) |  |
| margin\_frozen | decimal | true | frozen margin (summary of all contract) |  |
| profit\_unreal | decimal | true | unrealized profits and losses (summary of all contract) |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| money\_in | bigdecimal | true | money in |  |
| money\_out | bigdecimal | true | money out |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_contract\_detail\_\_ | object array | true |  |  |
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
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/contract\_detail\_\_ |  | false |  |  |
| \_\_futures\_contract\_detail\_\_ | object array | true |  |  |
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
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/futures\_contract\_detail\_\_ |  | false |  |  |
| \_\_positions\_\_ | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| new\_risk\_rate | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | available position can be closed |  |
| frozen | decimal | true | frozen quantity |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_/positions\_\_ |  | false |  |  |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "margin_account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "positions": [
      {
        "symbol": "BTC",
        "new_risk_rate": "",
        "trade_partition": "",
        "contract_code": "BTC-USDT",
        "volume": 1,
        "available": 1,
        "frozen": 0,
        "cost_open": 48945.9,
        "cost_hold": 48945.9,
        "profit_unreal": 0.0342,
        "profit_rate": 0.00349365319669267,
        "lever_rate": 5,
        "position_margin": 9.79602,
        "direction": "buy",
        "profit": 0.0342,
        "last_price": 48980.1,
        "margin_asset": "USDT",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "contract_type": "swap",
        "pair": "BTC-USDT",
        "business_type": "swap",
        "position_mode": "dual_side"
      },
      {
        "symbol": "BTC",
        "new_risk_rate": "",
        "trade_partition": "",
        "contract_code": "BTC-USDT-211210",
        "volume": 1,
        "available": 1,
        "frozen": 0,
        "cost_open": 48929.7,
        "cost_hold": 48929.7,
        "profit_unreal": 0.0369,
        "profit_rate": 0.003770715945530015,
        "lever_rate": 5,
        "position_margin": 9.79332,
        "direction": "buy",
        "profit": 0.0369,
        "last_price": 48966.6,
        "margin_asset": "USDT",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "contract_type": "this_week",
        "pair": "BTC-USDT",
        "business_type": "futures",
        "position_mode": "dual_side"
      }
    ],
    "futures_contract_detail": [
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211217",
        "margin_position": 0,
        "margin_frozen": 0,
        "margin_available": 9716.43771679,
        "profit_unreal": 0,
        "liquidation_price": null,
        "lever_rate": 5,
        "adjust_factor": 0.04,
        "contract_type": "next_week",
        "cross_max_available": "",
        "trade_partition": "",
        "pair": "BTC-USDT",
        "business_type": "futures"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211210",
        "margin_position": 9.79332,
        "margin_frozen": 0,
        "margin_available": 9716.43771679,
        "profit_unreal": 0.0369,
        "liquidation_price": null,
        "lever_rate": 5,
        "adjust_factor": 0.04,
        "contract_type": "this_week",
        "cross_max_available": "",
        "trade_partition": "",
        "pair": "BTC-USDT",
        "business_type": "futures"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "margin_position": 0,
        "margin_frozen": 264,
        "margin_available": 9716.43771679,
        "profit_unreal": 0,
        "liquidation_price": null,
        "lever_rate": 1,
        "adjust_factor": 0.005,
        "contract_type": "quarter",
        "cross_max_available": "",
        "trade_partition": "",
        "pair": "BTC-USDT",
        "business_type": "futures"
      }
    ],
    "margin_mode": "cross",
    "margin_account": "USDT",
    "margin_asset": "USDT",
    "margin_balance": 10000.02705679,
    "margin_static": 9999.95595679,
    "margin_position": 19.58934,
    "margin_frozen": 264,
    "profit_real": -0.04404321,
    "profit_unreal": 0.0711,
    "withdraw_available": 9716.36661679,
    "risk_rate": 4752.827989089614,
    "money_in": "",
    "money_out": "",
    "new_risk_rate": "",
    "position_mode": "dual_side",
    "adl_risk_percent": "3",
    "contract_detail": [
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT",
        "margin_position": 9.79602,
        "margin_frozen": 0,
        "margin_available": 9716.43771679,
        "profit_unreal": 0.0342,
        "liquidation_price": null,
        "lever_rate": 5,
        "adjust_factor": 0.04,
        "contract_type": "swap",
        "cross_max_available": "",
        "trade_partition": "",
        "pair": "BTC-USDT",
        "business_type": "swap"
      }
    ]
  },
  "ts": 1638758699818
}
```

### /linear-swap-api/v1/swap\_sub\_auth (\[General\]Set a Batch of Sub-Account Trading Permissions)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. If the sub-account trading permission has been enable, the interface will directly return success when request to enable again; if the sub-account trading permission has been disable, the interface will directly return success when request to disable again;

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | string | true | sub-account uid (multiple uids are separated by ",", and one time 10 sub uid at most) |  |  |
| sub\_auth | int | true | sub auth, 1:enable, 0:disable |  |  |

Notes:

When enable the transaction authority on the sub-account for the first time, deemed to agree to access the contract market.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| DATA\_START |  | true |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| sub\_uid | string | true | the list of sub uid which failed |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error msg |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the list of sub uid which successes |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

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
  "ts": 1612504316476
}
```

### /linear-swap-api/v1/swap\_sub\_auth\_list (\[General\] Query sub-account transaction permissions)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface is used to query the contract sub-account and whether it has opened trading permissions.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | string | false | sub-account uid (multiple uids are separated by ",")，No more than 10 |  |  |
| start\_time | long | false | Start time of sub-account creation |  |  |
| end\_time | long | false | End time of sub-account creation |  |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order |  |  |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request the processing result | ok , "error" |
| DATA\_START |  | true |  |  |
| query\_id |  | false |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| sub\_uid | string | true | sub uid |  |
| err\_code | string | true | error code |  |
| err\_msg | string | true | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| \_\_successes\_\_ | object array | false |  |  |
| sub\_uid | string | true | sub uid |  |
| sub\_auth | string | true | sub auth, 1:enable, 0:disable |  |
| \_\_successes\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com?sub_uid=441618222,462826107,117196834&direct=next&from_id=23512590&start_time=&end_time="`

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

### /linear-swap-api/v1/swap\_sub\_account\_list (\[Isolated\] Query assets information of all sub-accounts under the master account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is next | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| sub\_uid | long | true | sub-account UID |  |
| \_\_list\_\_ |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USDT" |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| risk\_rate | decimal | true | margin rate |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| \_\_/list\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

Only return data for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission).

#### Request example

```
{
  "contract_code": "BTC-USDT"
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
          "symbol": "BTC",
          "margin_balance": 20,
          "liquidation_price": null,
          "risk_rate": null,
          "contract_code": "BTC-USDT",
          "margin_asset": "USDT",
          "margin_mode": "isolated",
          "margin_account": "BTC-USDT"
        }
      ]
    }
  ],
  "ts": 1603698380336
}
```

### /linear-swap-api/v1/swap\_cross\_sub\_account\_list (\[Cross\] Query Assets Information Of All Sub-Accounts Under The Master Account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account，return all margin account info when null | "USDT"...，but now only USDT |  |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is next | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| sub\_uid | long | true | sub-account UID |  |
| \_\_list\_\_ | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| risk\_rate | decimal | true | margin rate |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| \_\_/list\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

Only return data for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission).

#### Request example

```
{
  "margin_account": "USDT"
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
          "margin_balance": 163.56170812955912,
          "risk_rate": 78.89672939225149,
          "margin_asset": "USDT",
          "margin_mode": "cross",
          "margin_account": "USDT"
        }
      ]
    }
  ],
  "ts": 1606962745633
}
```

### /linear-swap-api/v1/swap\_sub\_account\_info\_list (\[Isolated\]Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | "BTC-USDT"... ,if not filled, return all |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20，50 at most |  |  |

Notes:

Only return data of sub-accounts that have agreed to access the contract market.

By default, the list of sub-accounts is in ascending order according to the time when agree to access the contract market, and the earlier the agreed time, the first the position

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | object | true |  |  |
| \_\_sub\_list\_\_ | object array | true |  |  |
| sub\_uid | long | true | sub uid |  |
| \_\_account\_info\_list\_\_ | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_asset | string | true | margin asset) |  |
| margin\_balance | decimal | true | margin balance |  |
| liquidation\_price | decimal | true | liquidation price |  |
| risk\_rate | decimal | true | risk rate |  |
| \_\_/account\_info\_list\_\_ |  | false |  |  |
| \_\_/sub\_list\_\_ |  | false |  |  |
| current\_page | int | true | current page |  |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "page_index": 1,
  "page_size": 100
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
    "total_size": 1,
    "sub_list": [
      {
        "sub_uid": 123456789,
        "account_info_list": [
          {
            "symbol": "BTC",
            "margin_balance": 0,
            "liquidation_price": null,
            "risk_rate": null,
            "contract_code": "BTC-USDT",
            "margin_asset": "USDT",
            "margin_mode": "isolated",
            "margin_account": "BTC-USDT"
          }
        ]
      }
    ]
  },
  "ts": 1612504756853
}
```

### /linear-swap-api/v1/swap\_cross\_sub\_account\_info\_list (\[Cross\]Query a Batch of Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account，if not filled in return all margin account | "USDT"，but now just has one account usdt |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20，50 at most |  |  |

Notes:

Only return data of sub-accounts that have agreed to access the contract market.

By default, the list of sub-accounts is in ascending order according to the time when agree to access the contract market, and and the earlier the agreed time, the first the position

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | result of server handled request | "ok" , "error" |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |
| DATA\_START | object | true |  |  |
| \_\_sub\_list\_\_ | object array | true |  |  |
| sub\_uid | long | true | sub uid |  |
| \_\_account\_info\_list\_\_ | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross； |
| margin\_account | string | true | margin account | such as:USDT” |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | margin balance |  |
| risk\_rate | decimal | true | risk rate |  |
| \_\_/account\_info\_list\_\_ |  | false |  |  |
| \_\_/sub\_list\_\_ |  | false |  |  |
| current\_page | int | true | current page |  |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "page_index": 1,
  "page_size": 100
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
    "total_size": 1,
    "sub_list": [
      {
        "sub_uid": 12345678,
        "account_info_list": [
          {
            "margin_balance": 2,
            "risk_rate": null,
            "margin_asset": "USDT",
            "margin_mode": "cross",
            "margin_account": "USDT"
          }
        ]
      }
    ]
  },
  "ts": 1612504845679
}
```

### /linear-swap-api/v1/swap\_sub\_account\_info (\[Isolated\] Query a single sub-account's assets information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| sub\_uid | long | true | sub-account UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USDT" |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| risk\_rate | decimal | true | margin rate |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| lever\_rate | int | true | leverage ratios |  |
| adjust\_factor | decimal | true | Adjustment Factor |  |
| margin\_static | decimal | true | Static Margin |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| DATA\_END |  | false |  |  |

Notes:

Only query account information for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission);

No data return for sub-accounts which has logged in hbdm but have not gained trading permission/activated.

#### Request example

```
{
  "contract_code": "BTC-USDT",
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
      "symbol": "BTC",
      "margin_balance": 20,
      "margin_position": 0,
      "margin_frozen": 0,
      "margin_available": 20,
      "profit_real": 0,
      "profit_unreal": 0,
      "risk_rate": null,
      "new_risk_rate": "",
      "trade_partition": "",
      "withdraw_available": 20,
      "liquidation_price": null,
      "lever_rate": 5,
      "adjust_factor": 0.04,
      "margin_static": 20,
      "contract_code": "BTC-USDT",
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side"
    }
  ],
  "ts": 1603698523200
}
```

### /linear-swap-api/v1/swap\_cross\_sub\_account\_info (\[Cross\] Query A Sub-Account's Assets Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | long | true | sub-account UID |  |  |
| margin\_account | string | false | margin account，return all margin account info when null | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| margin\_asset | string | true | margin asset |  |
| margin\_balance | decimal | true | account equity |  |
| margin\_static | decimal | true | static margin |  |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| withdraw\_available | decimal | true | available transfer amount |  |
| risk\_rate | decimal | true | margin rate |  |
| money\_in | bigdecimal | true | money in |  |
| money\_out | bigdecimal | true | money out |  |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| \_\_contract\_detail\_\_ | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap:"BTC-USDT" ... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/contract\_detail\_\_ |  | false |  |  |
| \_\_futures\_contract\_detail\_\_ | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | future:"BTC-USDT-211231" ... |
| margin\_position | decimal | true | position margin (the margin used by current positions) |  |
| margin\_frozen | decimal | true | frozen margin |  |
| margin\_available | decimal | true | available margin |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| liquidation\_price | decimal | true | estimated liquidation price |  |
| lever\_rate | decimal | true | lever rate |  |
| adjust\_factor | decimal | true | adjustment factor |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| cross\_max\_available | bigdecimal | true | cross max available |  |
| trade\_partition | string | true | trade partition |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/futures\_contract\_detail\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

Only query account information for activated contract sub-account (i.e. sub-accounts that have gained contract trading permission);

No data return for sub-accounts which has logged in hbdm but have not gained trading permission/activated.

#### Request example

```
{
  "sub_uid": 123456,
  "margin_account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "futures_contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211217",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 500,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "next_week",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        },
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211210",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 500,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "this_week",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        },
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT-211231",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 500,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "quarter",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "futures"
        }
      ],
      "margin_mode": "cross",
      "margin_account": "USDT",
      "margin_asset": "USDT",
      "margin_balance": 500,
      "margin_static": 500,
      "margin_position": 0,
      "margin_frozen": 0,
      "profit_real": 0,
      "profit_unreal": 0,
      "withdraw_available": 500,
      "risk_rate": null,
      "money_in": "",
      "money_out": "",
      "new_risk_rate": "",
      "position_mode": "dual_side",
      "contract_detail": [
        {
          "symbol": "BTC",
          "contract_code": "BTC-USDT",
          "margin_position": 0,
          "margin_frozen": 0,
          "margin_available": 500,
          "profit_unreal": 0,
          "liquidation_price": null,
          "lever_rate": 5,
          "adjust_factor": 0.04,
          "contract_type": "swap",
          "cross_max_available": "",
          "trade_partition": "",
          "pair": "BTC-USDT",
          "business_type": "swap"
        }
      ]
    }
  ],
  "ts": 1638759191747
}
```

### /linear-swap-api/v1/swap\_sub\_position\_info (\[Isolated\] Query a single sub-account's position information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| sub\_uid | long | true | sub-account UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the handling result of requests | "ok" , "error" |
| ts | long | true | the create time point of response, unit: ms |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | type code | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_asset | string | true | margin asset |  |
| volume | decimal | true | open interest |  |
| available | decimal | true | available positions to close |  |
| frozen | decimal | true | amount of frozen positions |  |
| cost\_open | decimal | true | average price of open positions |  |
| cost\_hold | decimal | true | average price of positions |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profits |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | leverage ratios |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | Latest price |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| new\_risk\_rate | bigdecimal | true | new risk rate |  |
| trade\_partition | string | true | trade partition |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
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
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 13038.7,
      "cost_hold": 13038.7,
      "profit_unreal": 0,
      "profit_rate": 0,
      "lever_rate": 10,
      "position_margin": 1.30387,
      "direction": "buy",
      "profit": 0,
      "last_price": 13038.7,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "position_mode": "dual_side",
      "adl_risk_percent": "3",
      "new_risk_rate": "",
      "trade_partition": ""
    }
  ],
  "ts": 1603699081114
}
```

### /linear-swap-api/v1/swap\_cross\_sub\_position\_info (\[Cross\] Query A Sub-Account's Position Information)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-211225. When both of pair、contract\_type and contract\_code filled in, the contract\_code is the preferred. when no one filled in, return all contract type's data(swap and futures)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| sub\_uid | long | true | sub-account UID |  |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | position quantity |  |
| available | decimal | true | available position can be closed |  |
| frozen | decimal | true | frozen quantity |  |
| cost\_open | decimal | true | opening average price |  |
| cost\_hold | decimal | true | average price of position |  |
| profit\_unreal | decimal | true | unrealized profits and losses |  |
| profit\_rate | decimal | true | profit rate |  |
| profit | decimal | true | profit |  |
| margin\_asset | string | true | margin asset |  |
| position\_margin | decimal | true | position margin |  |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | transaction direction of positions | "buy":long "sell":short |
| last\_price | decimal | true | latest price |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| position\_mode | string | true | position mode | single\_side，dual\_side |
| adl\_risk\_percent | decimal | false | The risk level of the current position being forced to reduce the position by “adl\_risk\_percent” | 1、2、3、4、5 |
| new\_risk\_rate | bigdecimal | true | trade partition |  |
| trade\_partition | string | true | new risk rate |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "sub_uid": 123456,
  "pair": "BTC-USDT",
  "contract_type": "swap"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "volume": 1,
      "available": 1,
      "frozen": 0,
      "cost_open": 48886.7,
      "cost_hold": 48886.7,
      "profit_unreal": -0.0653,
      "profit_rate": -0.00133574162297721,
      "lever_rate": 1,
      "position_margin": 48.952,
      "direction": "sell",
      "profit": -0.0653,
      "last_price": 48952,
      "margin_asset": "USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "contract_type": "quarter",
      "pair": "BTC-USDT",
      "business_type": "futures",
      "position_mode": "dual_side",
      "adl_risk_percent": "3",
      "new_risk_rate": "",
      "trade_partition": ""
    }
  ],
  "ts": 1638759509329
}
```

### /linear-swap-api/v3/swap\_financial\_record (\[General\] Query account financial records(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| mar\_acct | string | true | margin account | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| type | string | false | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\] | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;85 (System advance account - user U-based account (transfer out advance account)); 86 (User U-based account - system advance payment account (transfer into advance account)) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev. default is next | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true |  |  |
| id | long | true |  |  |
| ts | long | true | create time |  |
| asset | string | true | asset | "USDT"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_account | string | true | margin account | "BTC-USDT","USDT"... |
| face\_margin\_account | string | true | the counterparty margin account, only has value when the transaction Type is 34, 35, 36, 37, 38, 39, and the other types are empty strings | "BTC-USDT"... |
| type | int | true | transaction Type | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;85 (System advance account - user U-based account (transfer out advance account)); 86 (User U-based account - system advance payment account (transfer into advance account)) |
| amount | decimal | true | amount(quote currency) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "mar_acct": "USDT",
  "type": "3",
  "start_time": 1669694400000,
  "end_time": 1669694400000,
  "direct": "next",
  "from_id": 34521
}
```

#### Response Example

##### Success Example

```
{
  "contract": "BTC-USDT",
  "mar_acct": "BTC-USDT",
  "type": "3,4,5,6,7",
  "start_time": 1660119810000,
  "end_time": 1660274746031,
  "direct": "next",
  "from_id": 1110
}
```

### /linear-swap-api/v3/swap\_financial\_record\_exact (\[General\]Query account financial records via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| mar\_acct | string | true | margin account | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| type | string | false | if not fill this parameter, it will query all types \[please use "," to seperate multiple types\] | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 16:settle unrealized PnL-long positions; 17:settle unrealized PnL-short positions; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| contract | string | false | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| mar\_acct | string | true | margin account | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true |  |  |
| id | long | true |  |  |
| ts | long | true | create time |  |
| asset | string | true | asset | "USDT"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_account | string | true | margin account | "BTC-USDT","USDT"... |
| face\_margin\_account | string | true | the counterparty margin account, only has value when the transaction Type is 34, 35, 36, 37, 38, 39, and the other types are empty strings | "BTC-USDT"... |
| type | int | true | transaction Type | 3:close long; 4:close short; 5:fees for open positions-taker; 6:fees for open positions-maker; 7:fees for close positions-taker; 8:fees for close positions-maker; 9:close long for delivery; 10:close short for delivery; 11:delivery fee; 12:close long for liquidation; 13:lose short for liquidation; 14:transfer from spot exchange to contract exchange; 15:tranfer from contract exchange to spot exchange; 19:clawback; 26:system; 28:activity prize rewards; 29:rebate; 30:Funding fee-income; 31:Funding fee-expenditure; 34:transfer to sub; 35:transfer from sub; 36:transfer to master; 37:transfer from master; 38:transfer from other margin account; 39:transfer to another margin account;46:ADL close long; 47:ADL close short;66 (system advance account - user currency delivery account (transfer out advance account)); 67 (user currency delivery account - system advance payment account (transfer in advance account)) |
| amount | decimal | true | amount(quote currency) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "mar_acct": "BTC-USDT",
  "type": "3,4,5,6,7",
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
      "query_id": 138798248,
      "id": 117840,
      "type": 5,
      "amount": -0.02446485,
      "ts": 1638758435635,
      "contract_code": "BTC-USDT-211210",
      "asset": "USDT",
      "margin_account": "USDT",
      "face_margin_account": ""
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v1/swap\_available\_level\_rate (\[Isolated\] Query user’s available leverage)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract code, if not filled in, the actual available leverage of all contracts will be returned by default | “BTC-USDT”... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | contract code | "BTC-USDT" |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| available\_level\_rate | string | true | available level rate,splited by ',' | "1,5,10" |
| DATA\_END |  | false |  |  |
| ts | long | true | Response generation time point, unit: millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "contract_code": "BTC-USDT",
      "margin_mode": "isolated",
      "available_level_rate": "1,2,3,5"
    }
  ],
  "ts": 1603699467348
}
```

### /linear-swap-api/v1/swap\_cross\_available\_level\_rate (\[Cross\] Query User’s Available Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code，return all contract info when null | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| available\_level\_rate | string | true | available level rate,splited by ',' | "1,5,10" |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "business_type": "swap"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "contract_code": "ETH-USDT",
      "available_level_rate": "1,2,3,5",
      "margin_mode": "cross",
      "contract_type": "swap",
      "pair": "ETH-USDT",
      "business_type": "swap"
    },
    {
      "contract_code": "ETH-USDT-211210",
      "available_level_rate": "1,2,3,5",
      "margin_mode": "cross",
      "contract_type": "this_week",
      "pair": "ETH-USDT",
      "business_type": "futures"
    },
    {
      "contract_code": "ETH-USDT-211217",
      "available_level_rate": "1,2,3,5",
      "margin_mode": "cross",
      "contract_type": "next_week",
      "pair": "ETH-USDT",
      "business_type": "futures"
    },
    {
      "contract_code": "ETH-USDT-211231",
      "available_level_rate": "1,2,3,5",
      "margin_mode": "cross",
      "contract_type": "quarter",
      "pair": "ETH-USDT",
      "business_type": "futures"
    }
  ],
  "ts": 1638760001689
}
```

### /linear-swap-api/v1/swap\_order\_limit (\[General\] Query swap information on order limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string  | false | contract type code  | Case-Insenstive.Both uppercase and lowercase are supported.e.g. swap:"BTC-USDT"... , future:"BTC-USDT-210625"... |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| order\_price\_type | string | true | Order Type | "limit": Limit Order，"opponent":BBO，"lightning": Lightning Close，"optimal\_5": Optimal top 5 price，"optimal\_10":Optimal top 10 price，"optimal\_20":Optimal top 20 price,"fok":FOK order,"ioc":ioc order, "opponent\_ioc"：IOC order using the BBO price，"lightning\_ioc"：lightning IOC，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"lightning\_fok"：lightning FOK，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| \_\_list\_\_ |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract type code | swap:"BTC-USDT"... , future:"BTC-USDT-210625"... |
| open\_limit | decimal | true | Max open order limit |  |
| close\_limit | decimal | true | Max close order limit |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/list\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

` {         "contract_code": "BTC-USDT",         "order_price_type": "limit",         "pair": "BTC-USDT",         "contract_type": "swap"         "business_type": "swap"     }`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_price_type": "limit",
    "list": [
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT",
        "open_limit": 170000,
        "close_limit": 170000,
        "business_type": "swap",
        "contract_type": "swap",
        "pair": "BTC-USDT"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211217",
        "open_limit": 170000,
        "close_limit": 170000,
        "business_type": "futures",
        "contract_type": "next_week",
        "pair": "BTC-USDT"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211210",
        "open_limit": 170000,
        "close_limit": 170000,
        "business_type": "futures",
        "contract_type": "this_week",
        "pair": "BTC-USDT"
      },
      {
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "open_limit": 170000,
        "close_limit": 170000,
        "business_type": "futures",
        "contract_type": "quarter",
        "pair": "BTC-USDT"
      }
    ]
  },
  "ts": 1638760136200
}
```

### /linear-swap-api/v1/swap\_fee (\[General\] Query information on swap trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | contract type code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| open\_maker\_fee | string | true | Open maker order fee, decimal |  |
| open\_taker\_fee | string | true | Open taker order fee, decimal |  |
| close\_maker\_fee | string | true | Close maker order fee, decimal |  |
| close\_taker\_fee | string | true | Close taker order fee, decimal |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| delivery\_fee | string | true | delivery fee rate |  |
| DATA\_END |  | false |  |  |

#### Request example

` {         "contract_code": "BTC-USDT",         "pair": "BTC-USDT",         "contract_type": "swap"         "business_type": "swap"     }`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "open_maker_fee": "0.0002",
      "open_taker_fee": "0.0004",
      "close_maker_fee": "0.0002",
      "close_taker_fee": "0.0004",
      "fee_asset": "USDT",
      "delivery_fee": "0",
      "business_type": "swap",
      "contract_type": "swap",
      "pair": "BTC-USDT"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211217",
      "open_maker_fee": "0.0002",
      "open_taker_fee": "0.0005",
      "close_maker_fee": "0.0002",
      "close_taker_fee": "0.0005",
      "fee_asset": "USDT",
      "delivery_fee": "0.00015",
      "business_type": "futures",
      "contract_type": "next_week",
      "pair": "BTC-USDT"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "open_maker_fee": "0.0002",
      "open_taker_fee": "0.0005",
      "close_maker_fee": "0.0002",
      "close_taker_fee": "0.0005",
      "fee_asset": "USDT",
      "delivery_fee": "0.00015",
      "business_type": "futures",
      "contract_type": "this_week",
      "pair": "BTC-USDT"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "open_maker_fee": "0.0002",
      "open_taker_fee": "0.0005",
      "close_maker_fee": "0.0002",
      "close_taker_fee": "0.0005",
      "fee_asset": "USDT",
      "delivery_fee": "0.00015",
      "business_type": "futures",
      "contract_type": "quarter",
      "pair": "BTC-USDT"
    }
  ],
  "ts": 1638760715804
}
```

### /linear-swap-api/v1/swap\_transfer\_limit (\[Isolated\] Query information on Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract type code | "BTC-USDT",... |
| transfer\_in\_max\_each | decimal | true | Max limit of a single deposit |  |
| transfer\_in\_min\_each | decimal | true | Min limit of a single deposit |  |
| transfer\_out\_max\_each | decimal | true | Max limit of a single withdrawal |  |
| transfer\_out\_min\_each | decimal | true | Min limit of a single withdrawal |  |
| transfer\_in\_max\_daily | decimal | true | Max daily limit of total deposits |  |
| transfer\_out\_max\_daily | decimal | true | Max daily limit of totally withdrawals |  |
| net\_transfer\_in\_max\_daily | decimal | true | Max daily limit of net total deposits |  |
| net\_transfer\_out\_max\_daily | decimal | true | Max daily limit of net total withdrawals |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | e.g: "BTC-USDT" ... |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT"
}
```

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
      "transfer_in_max_each": 100000000,
      "transfer_in_min_each": 1,
      "transfer_out_max_each": 10000000,
      "transfer_out_min_each": 0.000001,
      "transfer_in_max_daily": 1000000000,
      "transfer_out_max_daily": 200000000,
      "net_transfer_in_max_daily": 500000000,
      "net_transfer_out_max_daily": 100000000
    }
  ],
  "ts": 1603699803580
}
```

### /linear-swap-api/v1/swap\_cross\_transfer\_limit (\[Cross\] Query Information On Transfer Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account, return all margin account info when null | "USDT"...，but now only USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| transfer\_in\_max\_each | decimal | true | max limit of a single deposit |  |
| transfer\_in\_min\_each | decimal | true | min limit of a single deposit |  |
| transfer\_out\_max\_each | decimal | true | max limit of a single withdrawal |  |
| transfer\_out\_min\_each | decimal | true | min limit of a single withdrawal |  |
| transfer\_in\_max\_daily | decimal | true | max daily limit of total deposits |  |
| transfer\_out\_max\_daily | decimal | true | max daily limit of totally withdrawals |  |
| net\_transfer\_in\_max\_daily | decimal | true | max daily limit of net total deposits |  |
| net\_transfer\_out\_max\_daily | decimal | true | max daily limit of net total withdrawals |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "margin_account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "transfer_in_max_each": 1000000000000000000,
      "transfer_in_min_each": 0.0001,
      "transfer_out_max_each": 1000000000000000000,
      "transfer_out_min_each": 0.0001,
      "transfer_in_max_daily": 900000001000000000,
      "transfer_out_max_daily": 900000100000000000,
      "net_transfer_in_max_daily": 900000000100000000,
      "net_transfer_out_max_daily": 123456789012345680,
      "margin_account": "USDT",
      "margin_mode": "cross"
    }
  ],
  "ts": 1606964432217
}
```

### /linear-swap-api/v1/swap\_position\_limit (\[Isolated\] Query information on position limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract type code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Responding Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract type code | "BTC-USDT",... |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| buy\_limit | decimal | true | max qty of position on long positions, unit: piece(calculated with mark\_price) |  |
| sell\_limit | decimal | true | max qty of position on short positions, unit: piece(calculated with mark\_price) |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| mark\_price | decimal | true | mark price(use this price to calculate the qty of open positions) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "buy_limit": 1026154,
      "sell_limit": 1026154,
      "margin_mode": "isolated",
      "lever_rate": 5,
      "buy_limit_value": 50000000,
      "sell_limit_value": 50000000,
      "mark_price": 48725.6
    }
  ],
  "ts": 1638770954672
}
```

### /linear-swap-api/v1/swap\_cross\_position\_limit (\[Cross\] Query Information On Position Limit)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| buy\_limit | decimal | true | max qty of position on long positions, unit: piece(calculated with mark\_price) |  |
| sell\_limit | decimal | true | max qty of position on short positions, unit: piece(calculated with mark\_price) |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| mark\_price | decimal | true | mark price(use this price to calculate the qty of open positions) |  |
| DATA\_END |  | false |  |  |

#### Request example

` {         "contract_code": "BTC-USDT",         "pair": "BTC-USDT",         "contract_type": "swap"         "business_type": "swap"     }`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "cross",
      "buy_limit": 1021671,
      "sell_limit": 1021671,
      "business_type": "swap",
      "contract_type": "swap",
      "pair": "BTC-USDT",
      "lever_rate": 5,
      "buy_limit_value": 50000000,
      "sell_limit_value": 50000000,
      "mark_price": 48939.4
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211217",
      "margin_mode": "cross",
      "buy_limit": 1021865,
      "sell_limit": 1021865,
      "business_type": "futures",
      "contract_type": "next_week",
      "pair": "BTC-USDT",
      "lever_rate": 5,
      "buy_limit_value": 50000000,
      "sell_limit_value": 50000000,
      "mark_price": 48930.1
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "margin_mode": "cross",
      "buy_limit": 1023478,
      "sell_limit": 1023478,
      "business_type": "futures",
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "lever_rate": 5,
      "buy_limit_value": 50000000,
      "sell_limit_value": 50000000,
      "mark_price": 48853
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "margin_mode": "cross",
      "buy_limit": 1021867,
      "sell_limit": 1021867,
      "business_type": "futures",
      "contract_type": "quarter",
      "pair": "BTC-USDT",
      "lever_rate": 1,
      "buy_limit_value": 50000000,
      "sell_limit_value": 50000000,
      "mark_price": 48930
    }
  ],
  "ts": 1638760890261
}
```

### /linear-swap-api/v1/swap\_lever\_position\_limit (\[Isolated\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: \\This interface only supports isolated margin mode. If the status of contract is Pending Listing, Listing, Suspension, or Suspending of Listing, the data of that contract will not be returned when querying all; If that contract is queried separately, error 1014 will be reported; lever\_rate must fall within the user's available leverage rate, otherwise error 1037 will be reported

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code, NA means all | such as "BTC-USDT", "ETH-USDT" |  |
| lever\_rate | int | false | leverage rate, NA means all |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status code | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | isolated |
| \_\_list\_\_ | object array | true |  |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| \_\_/list\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "lever_rate": 20
}
```

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
          "lever_rate": 2,
          "buy_limit_value": 50000000,
          "sell_limit_value": 50000000
        }
      ]
    }
  ],
  "ts": 1638769536897
}
```

### /linear-swap-api/v1/swap\_cross\_lever\_position\_limit (\[Cross\]Query Users' Position Limit for All Leverages)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| business\_type | string | false | business type, NA means all | futures, swap, all |  |

Notes:

The interface only supports cross margin mode.

If the status of contract is Pending Listing, Listing, Suspension, or Suspending of Listing, the data of that contract will not be returned when querying all; If that contract is queried separately, error 1014 will be reported;

pair, contract\_type and contract\_code all filled in，contract\_code is preferred

lever\_rate must fall within the user's available leverage rate, otherwise error 1037 will be reported

business\_type is a required parameter when querying the contract of futures. And the parameter value must be: futures or all.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| contract\_type | string | false | contract type, NA means all | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | false | pair, NA means all | such as "BTC-USDT" |
| contract\_code | string | false | contract\_code, NA means all | swap: "BTC-USDT"... future: "BTC-USDT-211231"... |
| lever\_rate | int | false | leverage rate, NA means all |  |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... futures: "BTC-USDT-211231"... |
| margin\_mode | string | true | margin mode | cross |
| business\_type | string | true | business type | futures, swap |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: "BTC-USDT" |
| \_\_list\_\_ | object array | true |  |  |
| lever\_rate | int | true | leverage rate |  |
| buy\_limit\_value | decimal | true | upper limit on long positions, unit: usdt |  |
| sell\_limit\_value | decimal | true | upper limit on short positions, unit: usdt |  |
| \_\_/list\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit：Millisecond |  |

#### Request example

```
{
  "business_type": "swap",
  "contract_type": "swap",
  "pair": "BTC-USDT",
  "contract_code": "BTC-USDT",
  "lever_rate": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "business_type": "swap",
      "contract_type": "swap",
      "pair": "BTC-USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 2,
          "buy_limit_value": 50000000,
          "sell_limit_value": 50000000
        }
      ]
    },
    {
      "business_type": "futures",
      "contract_type": "next_week",
      "pair": "BTC-USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211217",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 2,
          "buy_limit_value": 50000000,
          "sell_limit_value": 50000000
        }
      ]
    },
    {
      "business_type": "futures",
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 2,
          "buy_limit_value": 50000000,
          "sell_limit_value": 50000000
        }
      ]
    },
    {
      "business_type": "futures",
      "contract_type": "quarter",
      "pair": "BTC-USDT",
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "margin_mode": "cross",
      "list": [
        {
          "lever_rate": 2,
          "buy_limit_value": 50000000,
          "sell_limit_value": 50000000
        }
      ]
    }
  ],
  "ts": 1638769370732
}
```

### /linear-swap-api/v1/swap\_master\_sub\_transfer (\[General\] Transfer between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub\_uid | long | true | uid of sub account |  |  |
| asset | string | true | asset | "USDT"... |  |
| from\_margin\_account | string | true | from margin account | The unified account is "USDT", and the non-unified account is "USDT", "BTC-USDT".... |  |
| to\_margin\_account | string | true | to margin account | The unified account is "USDT", and the non-unified account is "USDT", "BTC-USDT".... |  |
| amount | decimal | true | transfer amount |  |  |
| type | string | true | transfer type | "master\_to\_sub" or "sub\_to\_master" |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |

Notes:

When from\_margin\_account or to\_margin\_account is USDT, it means the transfer in or transfer out from cross margin account

represents transfer from transfer\_out margin account to transfer\_in margin account. The currency transferred shall be the same as the denominated currency of the transfer\_out margin account.；

The denominated currency of the transfer\_out margin account and transfer\_in margin account must be the same. (eg, USDT can be transferred from BTC-USDT to ETH-USDT, but cannot be transferred from BTC-USDT to ETH-HUSD account).

the rate limit between the master account and each subaccount is 10 times/ minute

The client\_order\_id is valid in 8 hours only, that is the user cannot use the same client\_order\_id beyonds one times for the same transfer path (for example, transfer currency from master account to sub-account using client\_order\_id=1, and you can't do that transfe currency from master account to sub-account using client\_order\_id=1 in the next time; but you can transfer currency from sub-account to master account using client\_order\_id=1).

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| ts | long | true | response timestamp，millionseconds |  |
| DATA\_START | object | true |  |  |
| order\_id | string | true | order id |  |
| client\_order\_id | long | false | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "sub_uid": 123456,
  "asset": "USDT",
  "from_margin_account": "BTC-USDT",
  "to_margin_account": "USDT",
  "amount": 20,
  "type": "master_to_sub",
  "client_order_id": 456321
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": "770320047276195840"
  },
  "ts": 1603700211160
}
```

### /linear-swap-api/v1/swap\_master\_sub\_transfer\_record (\[General\] Query transfer records between master and sub account)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | "BTC-USDT","USDT"... |  |
| transfer\_type | string | false | All by default(multiple types need to be joined with ',') | 34:transfer to sub account 35:transfer from sub account |  |
| create\_date | int | true | days | days need to be less than or equal to 90 |  |
| page\_index | int | false | 1 by default |  |  |
| page\_size | int | false | 20 by default.less than or equal to 50. | \[1-50\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | respone status | "ok" , "error" |
| ts | long | true | response millionseconds. |  |
| DATA\_START | object | true |  |  |
| \_\_transfer\_record\_\_ | object array | true |  |  |
| id | long | true | transfer id |  |
| ts | long | true | create timestamp |  |
| asset | string | true | asset | "USDT"... |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| from\_margin\_account | string | true | from margin account | "BTC-USDT"... |
| to\_margin\_account | string | true | to margin account | "BTC-USDT"... |
| sub\_uid | string | true | subaccount uid |  |
| sub\_account\_name | string | true | subaccount name |  |
| transfer\_type | int | true | transfer type | 35:transfer from subaccount; 34:transfer to subaccount; |
| amount | decimal | true | amount |  |
| \_\_/transfer\_record\_\_ |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "margin_account": "BTC-USDT",
  "transfer_type": "34",
  "create_date": 30,
  "page_index": 1,
  "page_size": 50
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "total_page": 2,
    "current_page": 1,
    "total_size": 2,
    "transfer_record": [
      {
        "id": 57920,
        "transfer_type": 34,
        "amount": -10,
        "ts": 1603700211125,
        "sub_uid": "123436789",
        "sub_account_name": "tom",
        "margin_account": "BTC-USDT",
        "asset": "USDT",
        "to_margin_account": "BTC-USDT",
        "from_margin_account": "BTC-USDT"
      }
    ]
  },
  "ts": 1603700414957
}
```

### /linear-swap-api/v1/swap\_transfer\_inner (\[General\] Transfer between different margin accounts under the same account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| asset | string | true | asset | "USDT"... |  |
| from\_margin\_account | string | true | from margin account | "BTC-USDT","USDT"... |  |
| to\_margin\_account | string | true | to margin account | "ETH-USDT","USDT"... |  |
| amount | decimal | true | amount（The unit is the denominated currency of the contract.） |  |  |
| client\_order\_id | long | false | Clients fill and maintain themselves. | \[1, 9223372036854775807\] |  |

Notes:

When from\_margin\_account or to\_margin\_account is USDT, it means the transfer in or transfer out from cross margin account

represents transfer from transfer\_out margin account to transfer\_in margin account. The currency transferred shall be the same as the denominated currency of the transfer\_out margin account.；

The denominated currency of the transfer\_out margin account and transfer\_in margin account must be the same. (eg, USDT can be transferred from BTC-USDT to ETH-USDT, but cannot be transferred from BTC-USDT to ETH-HUSD account)。

API rate limit for this interface is up to 10 times per minute.

The client\_order\_id is valid in 8 hours only, that is the user cannot use the same client\_order\_id beyonds one times

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| DATA\_START |  | false |  | object array |
| order\_id | string | true | order id |  |
| client\_order\_id | long | false | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response millionseconds. |  |

#### Request example

```
{
  "asset": "USDT",
  "from_margin_account": "BTC-USDT",
  "to_margin_account": "ETH-USDT",
  "amount": 10,
  "client_order_id": 456321
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": "770321554893758464"
  },
  "ts": 1603700570600
}
```

### /linear-swap-api/v1/swap\_api\_trading\_status (\[General\] Query user's API indicator disable information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| ts | long | true | response millionseconds |  |
| DATA\_START | array object | true |  |  |
| is\_disable | int | true |  | 1：is disabled，0：isn't disabled |
| order\_price\_types | string | true | order price types,such as：“limit,post\_only,FOK,IOC” |  |
| disable\_reason | string | true | disable reason | "COR":（Cancel Order Ratio），“TDN”：（Total Disable Number） |
| disable\_interval | long | true | disable millionseconds |  |
| recovery\_time | long | true | recovery millionseconds |  |
| \_\_COR\_\_ | dict object | true | （Cancel Order Ratio） |  |
| orders\_threshold | long | true | orders threshold |  |
| orders | long | true | total pending orders |  |
| invalid\_cancel\_orders | long | true | numbers of invalid cancel orders |  |
| cancel\_ratio\_threshold | decimal | true | cancel ratio threshold |  |
| cancel\_ratio | decimal | true | cancel ratio |  |
| is\_trigger | int | true |  | 1: triggered，0: not triggered |
| is\_active | int | true |  | 1: active，0：not active |
| \_\_/COR\_\_ | dict object | true |  |  |
| \_\_TDN\_\_ | dict object | true | Total Disable Number |  |
| disables\_threshold | long | true | disable threshold |  |
| disables | long | true | total disable number |  |
| is\_trigger | int | true |  | 1：triggered，0：not triggered |
| is\_active | int | true |  | 1：active，0：not active |
| \_\_/TDN\_\_ | dict object | true |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_api_trading_status"`

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

### /linear-swap-api/v1/linear-cancel-after (\[General\] Automatic Order Cancellation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: HTX Futures launches the automatic order cancellation interface to prevent API users from incurring unexpected losses in the event of network failures or client system failures that result in a loss of communication with the HTX system. When users experience an unexpected disconnection from HTX's system, this interface automatically cancels all pending orders (including both opening and closing orders) to mitigate potential losses through its Dead Man's Switch functionality. If the interface is not called again within the specified period, all of the user's pending futures orders will be canceled.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| on\_off | int | true | Enable and disable the automatic order cancellation feature | 1 refers to enable the feature;0 refers to disable the feature |  |
| time\_out | int | false | Configure a countdown timer for automatic order cancellation. If the feature is not disabled when the countdown ends, all pending orders placed by the user will be canceled. It is advisable to set the timer when enabling the feature; otherwise, the default countdown is 5,000 milliseconds (5 seconds). | ≥ 5,000 ms | 5,000 ms |

Notes:

The system checks all countdowns approximately every 10 ms. Therefore, please be aware that when using this feature, redundancy should be taken into account. We do not recommend setting the countdowns too precisely or too small.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| msg | string | false | Error description |  |
| ts | long | false | Time of responding, unit: millisecond (ms) |  |
| DATA\_START | object | false |  |  |
| current\_time | long | false | Current time (subject to platform server time) |  |
| trigger\_time | long | false | Trigger time (subject to platform server time) |  |
| DATA\_END |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

No data

### /linear-swap-api/v1/swap\_cross\_trade\_state (\[Cross\] Query Information On Trade State)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair, contract\_type and contract\_code filled in, the contract\_code is the preferred. business\_type is a required parameter when query info of futures contract, and its value must be futures or all.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| open | int | true | open order access：when “1”, then access available; when “0”, access unavailable"1" |  |
| close | int | true | close order access：when “1”, then access available; when “0”, access unavailable "1" |  |
| cancel | int | true | order cancellation access：when “1”, then access available; when “0”, access unavailable "1" |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_trade_state?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap" `

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
      "margin_account": "USDT",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "this_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211217",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "next_week"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211231",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "business_type": "futures",
      "pair": "BTC-USDT",
      "contract_type": "quarter"
    },
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "open": 1,
      "close": 1,
      "cancel": 1,
      "business_type": "swap",
      "pair": "BTC-USDT",
      "contract_type": "swap"
    }
  ],
  "ts": 1638756343093
}
```

### /linear-swap-api/v1/swap\_switch\_position\_mode (\[Isolated\]Switch Position Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | such as: "BTC-USDT", "ETH-USDT" ... |  |
| position\_mode | string | true | position mode | single\_side; dual\_side |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| margin\_account | string | true | margin account | such as: "BTC-USDT", "ETH-USDT" ... |
| position\_mode | string | true | position mode | single\_side; dual\_side |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "margin_account": "BTC-USDT",
  "position_mode": "dual_side"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "BTC-USDT",
      "position_mode": "single_side"
    }
  ],
  "ts": 1566899973811
}
```

### /linear-swap-api/v1/swap\_cross\_switch\_position\_mode (\[Cross\]Switch Position Mode)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | true | margin account | such as: "USDT" |  |
| position\_mode | string | true | position mode | single\_side; dual\_side |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START | object array | true |  |  |
| margin\_account | string | true | margin account | such as: "USDT" |
| position\_mode | string | true | position mode | single\_side; dual\_side |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "margin_account": "BTC-USDT",
  "position_mode": "dual_side"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "USDT",
      "position_mode": "single_side"
    }
  ],
  "ts": 1566899973811
}
```

### /linear-swap-api/v1/swap\_order (\[Isolated\] Place an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
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
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |

Notes:

"limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need.

Post-Only orders are limit orders that will never take liquidity (also called maker-only order). There are order limit and position for post-only orders which the upper limit is 5,000,000 for open/close orders.

If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set.

Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

open long: direction - buy、offset - open

close long: direction -sell、offset - close

open short: direction -sell、offset - open

close short: direction -buy、offset - close

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START |  | false |  |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Request example

```
{
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
```

#### Response Example

##### Success Example

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

### /linear-swap-api/v1/swap\_cross\_order (\[Cross\] Place An Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
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

Notes:

"limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need.

Post-Only orders are limit orders that will never take liquidity (also called maker-only order). There are order limit and position for post-only orders which the upper limit is 5,000,000 for open/close orders.

If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set.

Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

open long: direction - buy、offset - open

close long: direction -sell、offset - close

open short: direction -sell、offset - open

close short: direction -buy、offset - close

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | false | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Request example

```
{
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
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 784017187857760300,
    "order_id_str": "784017187857760256"
  },
  "ts": 1606965863952
}
```

### /linear-swap-api/v1/swap\_batchorder (\[Isolated\] Place a Batch of Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| \_\_orders\_data\_\_ |  | false |  |  |  |
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
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |
| \_\_/orders\_data\_\_ |  | false |  |  |  |

Notes:

"limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need.

Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled.

If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set.

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

10 orders at most

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing result | ok , "error" |
| DATA\_START | object array | true |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| index | int | true | Index of orders |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error massage |  |
| \_\_/errors\_\_ |  | false |  |  |
| \_\_success\_\_ |  | false |  |  |
| index | int | true | Index of orders |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | The order ID is in string format |  |
| client\_order\_id | long | true | The client order ID filled in by the user when placing an order. If not filled, it will not be returned |  |
| \_\_/success\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

Notes:

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Request example

```
{
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
```

#### Response Example

##### Success Example

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

### /linear-swap-api/v1/swap\_cross\_batchorder (\[Cross\] Place A Batch Of Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| \_\_orders\_data\_\_ | object array | true |  |  |  |
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
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |
| \_\_/orders\_data\_\_ |  | false |  |  |  |

Notes:

"limit"，"post\_only"，"ioc" and "fok" the four order price type need price value and the other don't need.

Description of post\_only: assure that the maker order remains as maker order, it will not be filled immediately with the use of post\_only, for the match system will automatically check whether the price of the maker order is higher/lower than the opponent first price, i.e. higher than bid price 1 or lower than the ask price 1. If yes, the maker order will placed on the orderbook, if not, the maker order will be cancelled.

If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.

Only open orders can support setting take profit and stop loss.

The take profit trigger price is a required field for setting a take profit order, and the stop loss trigger price is a required field for setting a stop loss order; if the trigger price field is not filled in, the corresponding take profit order or stop loss order will not be set.

No need to transfer BBO order price(ask 1 and bid 1) parameter, optimal\_5: top 5 optimal BBO price, optimal\_10：top 10 optimal BBO price, optimal\_20：top 20 optimal BBO price (No need to transfer price data) ，limit": limit order, "post\_only": maker order only (price data transfer is needed),IOC :Immediate-Or-Cancel Order,FOK:Fill-Or-Kill Order.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

25 orders at most

Risk Reminder:By using Best Bid/Offer( bbo ), you are to place limit orders at the best prices offered by the opposite side. In the event of extreme volatility or insufficient liquidity，there is a risk that your orders may not be filled in full. Any unfilled part will remain open in the market pending further execution. Selecting BBO means you understand how this order type is executed and acknowledge to bear the risk of incomplete execution.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| index | int | true | order index |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| \_\_success\_\_ |  | false |  |  |
| index | int | true | order index |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | the client ID that is filled in when the order is placed, if it’s not filled, it won’t be returned |  |
| \_\_/success\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

Notes:

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by json-bigint package.

#### Request example

```
{
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
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [
      {
        "index": 2,
        "err_code": 1045,
        "err_msg": "Unable to switch leverage due to open orders."
      }
    ],
    "success": [
      {
        "order_id": 784022175422087200,
        "index": 1,
        "order_id_str": "784022175422087168"
      }
    ]
  },
  "ts": 1606967053089
}
```

### /linear-swap-api/v1/swap\_cancel (\[Isolated\] Cancel an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |

Notes:

Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。

The return data from Cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface.

client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| \_\_errors\_\_ | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | Error code |  |
| err\_msg | string | true | Error information |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | Successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "order_id": "456789133445",
  "client_order_id": "4567891312345",
  "contract_code": "BTC-USDT"
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

### /linear-swap-api/v1/swap\_cross\_cancel (\[Cross\] Cancel An Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 25 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID (different IDs are separated by ",", maximum 25 orders can be withdrew at one time) |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |

Notes:

Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id。

The return data from Cancel An Order Interface only means that order cancelation designation is executed successfully. To check cancelation result, please check your order status at Get Information Of An Order interface.

client\_order\_id, order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| \_\_errors\_\_ | array | true |  |  |
| order\_id | string | true | order ID |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successfully withdrew list of order\_id or client\_order\_id |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "order_id": "456789133445",
  "client_order_id": "4567891312345",
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap"
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
        "order_id": "784054331179532288",
        "err_code": 1062,
        "err_msg": "Cancelling. Please be patient."
      }
    ],
    "successes": "784054331179532288"
  },
  "ts": 1606974744952
}
```

### /linear-swap-api/v1/swap\_cancelall (\[Isolated\] Cancel All Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported..e.g. "BTC-USDT" |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:

You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | false |  |  |
| \_\_errors\_\_ | array | false |  |  |
| order\_id | string | true | Order ID |  |
| err\_code | int | true | failed order error messageError code |  |
| err\_msg | string | true | failed order information |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | Successful order |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "direction": "buy",
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
    "successes": "768883002062282752,770325103371542528,770325103388319744"
  },
  "ts": 1603701437838
}
```

### /linear-swap-api/v1/swap\_cross\_cancelall (\[Cross\] Cancel All Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:

You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| \_\_errors\_\_ | array | true |  |  |
| order\_id | string | true | order ID |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the list order which's successful |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "direction": "buy",
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
    "successes": "784055473531781120,784055473842159616"
  },
  "ts": 1606974998510
}
```

### /linear-swap-api/v1/swap\_switch\_lever\_rate (\[Isolated\] Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds.

Interface description: This interface only supports isolated margin mode. Only if a user has positions of a single token and has no open orders, the leverage is available to be switched flexibly. The interface limits the number of requests to 1 time per 3 seconds.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT"... |  |
| lever\_rate | int | true | The leverage multiple to be switched; high leverage has a high risk factor, so please use it with caution. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status: ok,error |  |
| DATA\_START | object | false |  |  |
| contract\_code | string | false | contract code | "BTC-USDT"... |
| margin\_mode | string | false | margin mode | isolated : "isolated" |
| lever\_rate | int | false | Switched leverage |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code |  |
| err\_msg | string | false | error msg |  |
| ts | long | true | Timestamp |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "lever_rate": 20
}
```

#### Response Example

##### Success Example

`正确： {     "status": "ok",     "data": {         "contract_code": "btc-usdt",         "margin_mode": "isolated",         "lever_rate": 10     },     "ts": 1603699417036 } 错误： {     "status": "error",     "err_code": 1045,     "err_msg": "Unable to switch leverage due to current holdings or open orders.",     "ts": 1603701654205 }`

### /linear-swap-api/v1/swap\_cross\_switch\_lever\_rate (\[Cross\] Switch Leverage)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 time per 3 seconds.

Interface description: The interface only supports cross margin mode. Only if a user has positions of a single token and has no open orders, the leverage is available to be switched flexibly. The interface limits the number of requests to 1 time per 3 seconds. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| lever\_rate | int | true | The leverage multiple to be switched; high leverage has a high risk factor, so please use it with caution. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | ok/error |  |
| DATA\_START | object | false |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | false | margin mode | cross: cross margin mode |
| lever\_rate | int | false | switched leverage |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |
| err-code | int | false | error code |  |
| err-msg | string | false | error message |  |
| ts | long | true | timestamp |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "lever_rate": 20
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "contract_type": "swap",
    "pair": "BTC-USDT",
    "business_type": "swap",
    "contract_code": "BTC-USDT",
    "lever_rate": 2,
    "margin_mode": "cross"
  },
  "ts": 1639099382678
}
```

### /linear-swap-api/v1/swap\_order\_info (\[Isolated\] Get Information of an Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | Client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |  |  |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |

Notes:

When getting information on order cancellation via get order Information interface, users can only query last 2-hour data

At least one of order\_id and client\_order\_id must be filled in

Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id. The order completed( 5.partially fulfilled but cancelled by client; 6. Fully fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate on 00:00(GMT+8), 08:00(GMT+8) and 16:00(GMT+8).

client\_order\_id，order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | eg."BTC" |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Numbers of order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| direction | string | true | Transaction direction | "buy":"sell" |
| offset | string | true | "open": "close" | "open", "close", "both" |
| lever\_rate | int | true | Leverage rate | 1\\5\\10\\20 |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| created\_at | long | true | Creation time |  |
| canceled\_at | long | true | Canceled time |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_asset | string | true | margin asset |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_source | string | true | Order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| liquidation\_type | string | true | Liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| fee\_amount | decimal | true | HTX fee amount |  |
| fee\_quote\_amount | decimal | true | fee\_quote\_amount |  |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

```
{
  "order_id": "456789321",
  "client_order_id": "456234321",
  "contract_code": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "price": 13059.8,
      "order_price_type": "opponent",
      "order_type": 1,
      "direction": "sell",
      "offset": "open",
      "lever_rate": 10,
      "order_id": 770334322963152900,
      "client_order_id": 57012021045,
      "created_at": 1603703614712,
      "trade_volume": 1,
      "trade_turnover": 13.0598,
      "fee": -0.00522392,
      "trade_avg_price": 13059.8,
      "margin_frozen": 0,
      "profit": 0,
      "status": 6,
      "order_source": "api",
      "order_id_str": "770334322963152896",
      "fee_asset": "USDT",
      "liquidation_type": "0",
      "canceled_at": 0,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "is_tpsl": 0,
      "real_profit": 0,
      "reduce_only": 0,
      "fee_amount": 11,
      "fee_quote_amount": 11,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1603703631815
}
```

### /linear-swap-api/v1/swap\_cross\_order\_info (\[Cross\] Get Information of order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order\_id | string | false | order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time） |  |  |
| client\_order\_id | string | false | client order ID Order ID（different IDs are separated by ",", maximum 50 orders can be withdrew at one time) |  |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |

Notes:

When getting information on order cancellation via get order Information interface, users can only query last 2-hour data

Both order\_id and client\_order\_id can be used for order withdrawl，one of them needed at one time，if both of them are set，the default will be order id. The order completed( 5.partially fulfilled but cancelled by client; 6. Fully fulfilled; 7. Cancelled; ) will be deleted after the settlement of funding rate on 00:00(GMT+8), 08:00(GMT+8) and 16:00(GMT+8).

client\_order\_id，order status query is available for orders placed within 8 hours; Otherwise, clients cannot check orders placed beyond 8 hours.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code |  |
| margin\_mode | string | true | margin mode |  |
| margin\_account | string | true | margin account |  |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction |  |
| offset | string | true | offset |  |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| created\_at | long | true | created time |  |
| trade\_volume | decimal | true | trade quantity |  |
| trade\_turnover | decimal | true | trade amount |  |
| fee | decimal | true | service fee |  |
| trade\_avg\_price | decimal | true | trade average price |  |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |  |
| canceled\_at | long | true | canceled time |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| fee\_amount | decimal | true | HTX fee amount |  |
| fee\_quote\_amount | decimal | true | fee\_quote\_amount |  |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

```
{
  "order_id": "456789321",
  "client_order_id": "456234321",
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "volume": 1,
      "price": 13059.8,
      "order_price_type": "opponent",
      "order_type": 1,
      "direction": "sell",
      "offset": "open",
      "lever_rate": 10,
      "order_id": 770334322963152900,
      "client_order_id": 57012021045,
      "created_at": 1603703614712,
      "trade_volume": 1,
      "trade_turnover": 13.0598,
      "fee": -0.00522392,
      "trade_avg_price": 13059.8,
      "margin_frozen": 0,
      "profit": 0,
      "status": 6,
      "order_source": "api",
      "order_id_str": "770334322963152896",
      "fee_asset": "USDT",
      "liquidation_type": "0",
      "canceled_at": 0,
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "is_tpsl": 0,
      "real_profit": 0,
      "reduce_only": 0,
      "fee_amount": 11,
      "fee_quote_amount": 11,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1603703631815
}
```

### /linear-swap-api/v1/swap\_order\_detail (\[Isolated\] Order details acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| order\_id | long | true | Order ID |  |  |
| created\_at | long | false | Timestamp |  |  |
| order\_type | int | false | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order; 22. ADL reduction-only order |  |
| page\_index | int | false | Page number, default 1st page |  |  |
| page\_size | int | false | Default 20，no more than 50 |  |  |

Notes:

When getting information on order cancellation via query order detail interface, users who type in parameters “created\_at” and “order\_type” can query last 6-hour data, while users who don’t type in parameters “created\_at” and “order\_type” can only query last 2-hour data.

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by jaso-bigint package.

created\_at should use timestamp of long type as 13 bits (include Millisecond), if send the accurate timestamp for "created\_at", query performance will be improved.

Please note that created\_at can't be "0"

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| lever\_rate | int | true | Leverage Rate | 1\\5\\10\\20 |
| direction | string | true | Transaction direction | "buy", "sell" |
| offset | string | true | "open": "close" | "open", "close", "both" |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| created\_at | long | true | Creation time |  |
| canceled\_at | long | true | Canceled time |  |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_asset | string | true | margin asset |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| order\_type | string | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order ; 22. ADL reduction-only order |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| total\_page | int | true | Page in total |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| instrument\_price | decimal | true | Liquidation price |  |
| final\_interest | decimal | true | Account Balance After Liquidation |  |
| adjust\_value | decimal | true | Adjustment Factor of Liquidating Order |  |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| fee | decimal | true | total amount of fees |  |
| liquidation\_type | string | true | Liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| \_\_trades\_\_ |  | false |  |  |
| id | string | true | the global unique ID of the trade. |  |
| fee\_asse | string | false | fee asset |  |
| price | string | false | deduction currency price(USDT) |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | Match Price |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction price |  |
| trade\_fee | decimal | true | Transaction Service fee |  |
| role | string | true | taker or maker |  |
| created\_at | long | true | Creation time |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| \_\_/trades\_\_ |  | false |  |  |
| \_\_/data \_\_ |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_id": "456234321",
  "created_at": 1670559637769,
  "order_type": 1,
  "page_index": 1,
  "page_size": 50
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "contract_code": "BTC-USDT",
    "instrument_price": 0,
    "final_interest": 0,
    "adjust_value": 0,
    "lever_rate": 10,
    "direction": "sell",
    "offset": "open",
    "volume": 1,
    "price": 13059.8,
    "created_at": 1603703614712,
    "canceled_at": 0,
    "order_source": "api",
    "order_price_type": "opponent",
    "margin_frozen": 0,
    "profit": 0,
    "trades": [
      {
        "trade_id": 131560927,
        "trade_price": 13059.8,
        "trade_volume": 1,
        "trade_turnover": 13.0598,
        "trade_fee": -0.00522392,
        "created_at": 1603703614715,
        "role": "taker",
        "fee_asset": "USDT",
        "real_profit": 0,
        "profit": 0,
        "id": "131560927-770334322963152896-1",
        "fee_asse": "",
        "price": ""
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1,
    "liquidation_type": "0",
    "fee_asset": "USDT",
    "fee": -0.00522392,
    "order_id": 770334322963152900,
    "order_id_str": "770334322963152896",
    "client_order_id": 57012021045,
    "order_type": "1",
    "status": 6,
    "trade_avg_price": 13059.8,
    "trade_turnover": 13.0598,
    "trade_volume": 1,
    "margin_asset": "USDT",
    "margin_mode": "isolated",
    "margin_account": "BTC-USDT",
    "is_tpsl": 0,
    "real_profit": 0,
    "reduce_only": 0,
    "canceled_source": "timeout-canceled-order"
  },
  "ts": 1603703678477
}
```

### /linear-swap-api/v1/swap\_cross\_order\_detail (\[Cross\] Get Detail Information of order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| order\_id | long | true | order ID |  |  |
| created\_at | long | false | created timestamp |  |  |
| order\_type | int | false | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order; 22. ADL reduction-only order |  |
| page\_index | int | false | page number, default 1st page |  |  |
| page\_size | int | false | default 20，no more than 50 |  |  |

Notes:

When getting information on order cancellation via query order detail interface, users who type in parameters “created\_at” and “order\_type” can query last 6-hour data, while users who don’t type in parameters “created\_at” and “order\_type” can only query last 2-hour data.

The return order\_id is 18 bits, it will make mistake when nodejs and JavaScript analysed 18 bits. Because the Json.parse in nodejs and JavaScript is int by default. so the number over 18 bits need be parsed by jaso-bigint package.

created\_at should use timestamp of long type as 13 bits (include Millisecond), if send the accurate timestamp for "created\_at", query performance will be improved.

Please note that created\_at can't be "0"

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| lever\_rate | int | true | leverage |  |
| direction | string | true | direction | "buy","sell" |
| offset | string | true | offset | "open", "close", "both" |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| created\_at | long | true | created time |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | total profit or loss of order when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| instrument\_price | decimal | true | liquidation price |  |
| final\_interest | decimal | true | account balance after liquidation |  |
| adjust\_value | decimal | true | adjustment factor of liquidating order |  |
| fee | decimal | true | total fee |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | canceled time |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_type | string | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order ; 22. ADL reduction-only order |
| status | int | true | order status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling. |
| trade\_avg\_price | decimal | true | trade average price |  |
| trade\_turnover | decimal | true | trade total amount |  |
| trade\_volume | decimal | true | trade total amount |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | total real profit of order (calculated with the opening average price, include profit in history settlement.) |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| \_\_trades\_\_ | object array | true |  |  |
| id | string | true | the global unique ID of the trade |  |
| fee\_asse | string | false | fee asset |  |
| price | string | false | deduction currency price(USDT) |  |
| trade\_id | long | true | In this interface, trade\_id is the same with match\_id of linear-swap-api/v1/swap\_cross\_matchresults. trade\_id is the result of sets of order execution and trade confirmation. NOTE: trade\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same trade\_id. |  |
| trade\_price | decimal | true | trade price |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade amount |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker/maker |  |
| created\_at | long | true | created time |  |
| profit | decimal | true | profit or loss of the transaction (calculated with the average price of position, exclude profit in history settlement.) |  |
| real\_profit | decimal | true | real profit of the transaction (calculated with the opening average price, include profit in history settlement.) |  |
| \_\_/trades\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And the real profit (real\_profit) of the transaction information that orders traded after December 10, 2020 has a value.

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "order_id": "456234321",
  "created_at": 1670559637769,
  "order_type": 1,
  "page_index": 1,
  "page_size": 50
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "contract_code": "BTC-USDT",
    "instrument_price": 0,
    "final_interest": 0,
    "adjust_value": 0,
    "lever_rate": 10,
    "direction": "sell",
    "offset": "open",
    "volume": 1,
    "price": 13059.8,
    "created_at": 1603703614712,
    "canceled_at": 0,
    "order_source": "api",
    "order_price_type": "opponent",
    "margin_frozen": 0,
    "profit": 0,
    "trades": [
      {
        "trade_id": 131560927,
        "trade_price": 13059.8,
        "trade_volume": 1,
        "trade_turnover": 13.0598,
        "trade_fee": -0.00522392,
        "created_at": 1603703614715,
        "role": "taker",
        "fee_asset": "USDT",
        "real_profit": 0,
        "profit": 0,
        "id": "131560927-770334322963152896-1",
        "fee_asse": "",
        "price": ""
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1,
    "liquidation_type": "0",
    "fee_asset": "USDT",
    "fee": -0.00522392,
    "order_id": 770334322963152900,
    "order_id_str": "770334322963152896",
    "client_order_id": 57012021045,
    "order_type": "1",
    "status": 6,
    "trade_avg_price": 13059.8,
    "trade_turnover": 13.0598,
    "trade_volume": 1,
    "margin_asset": "USDT",
    "margin_mode": "isolated",
    "margin_account": "BTC-USDT",
    "is_tpsl": 0,
    "real_profit": 0,
    "reduce_only": 0,
    "canceled_source": "timeout-canceled-order"
  },
  "ts": 1603703678477
}
```

### /linear-swap-api/v1/swap\_openorders (\[Isolated\] Current unfilled order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract Code,If empty, query all | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| page\_index | int | false | Page, default 1st page |  | 1 |
| page\_size | int | false | Default 20，no more than 50 |  | 20 |
| sort\_by | string | false | sort fields(descending) | “created\_at”descending order by order created at, "update\_time": descending order by order update time | created\_at |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17:buy(one-way mode), 18:sell(one-way mode) | 0 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object | false |  |  |
| \_\_orders\_\_ | array | false |  |  |
| symbol | string | true | Variety code |  |
| contract\_code | string | true | Contract Code | "BTC-USDT" ... |
| volume | decimal | true | Number of Order |  |
| price | decimal | true | Price committed |  |
| order\_price\_type | string | true | type of order price | "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_20\_ioc"：optimal\_20 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_20\_fok"：optimal\_20 fok |
| order\_type | int | true | Order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| direction | string | true | Transaction direction | "buy","sell" |
| offset | string | true | "open": "close" | "open", "close", "both" |
| lever\_rate | int | true | Leverage Rate | 1\\5\\10\\20 |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | true | Client order ID |  |
| created\_at | long | true | Order Creation time |  |
| trade\_volume | decimal | true | Transaction quantity |  |
| trade\_turnover | decimal | true | Transaction aggregate amount |  |
| fee | decimal | true | Service fee |  |
| trade\_avg\_price | decimal | true | Transaction average price |  |
| margin\_frozen | decimal | true | Frozen margin |  |
| margin\_asset | string | true | margin asset |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |
| order\_source | string | true | Order Source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| fee\_asset | string | true | the corresponding cryptocurrency to the given fee | "USDT"... |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | order Cancellation time |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| total\_page | int | true | Total Pages |  |
| current\_page | int | true | Current Page |  |
| total\_size | int | true | Total Size |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "symbol": "BTC",
        "contract_code": "BTC-USDT",
        "volume": 1,
        "price": 13329,
        "order_price_type": "limit",
        "order_type": 1,
        "direction": "sell",
        "offset": "open",
        "lever_rate": 10,
        "order_id": 770326042832437200,
        "client_order_id": 57012021028,
        "created_at": 1603701640576,
        "trade_volume": 0,
        "trade_turnover": 0,
        "fee": 0,
        "trade_avg_price": null,
        "margin_frozen": 1.3329,
        "profit": 0,
        "status": 3,
        "order_source": "api",
        "order_id_str": "770326042832437248",
        "fee_asset": "USDT",
        "liquidation_type": null,
        "canceled_at": null,
        "margin_asset": "USDT",
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "is_tpsl": 0,
        "update_time": 1606975980467,
        "real_profit": 0,
        "reduce_only": 0
      }
    ],
    "total_page": 2,
    "current_page": 1,
    "total_size": 2
  },
  "ts": 1603703993952
}
```

### /linear-swap-api/v1/swap\_cross\_openorders (\[Cross\] Current unfilled order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract\_code filled in, the contract\_code is the preferred. supports none any parameter filled in, it means all contract code in cross mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| page\_index | int | false | page index, default 1st page |  |  |
| page\_size | int | false | page size, default 20，no more than 50 |  |  |
| sort\_by | string | false | sort fields(Default: “created\_at” descending order) | “created\_at”: descending order by order created at, "update\_time": descending order by order update time |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long , 17.buy(one-way mode), 18.sell(one-way mode) |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result |  |
| DATA\_START | object | true |  |  |
| \_\_orders\_\_ | object | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| volume | decimal | true | place volume |  |
| price | decimal | true | place price |  |
| order\_price\_type | string | true | type of order price | "limit":Limit,"opponent":opponent,"post\_only":Post-Only Order, No order limit but position limit for post-only orders.，"lightning":lightning, "optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20，"fok":FOK Order，"ioc":IOC Order, "opponent\_ioc": opponent ioc，"lightning\_ioc": lightning ioc，"optimal\_5\_ioc": optimal\_5 ioc，"optimal\_10\_ioc": optimal\_10 ioc，"optimal\_20\_ioc"：optimal\_20 ioc，"opponent\_fok"： opponent fok，"lightning\_fok"：lightning fok，"optimal\_5\_fok"：optimal\_5 fok，"optimal\_10\_fok"：optimal\_10 fok，"optimal\_20\_fok"：optimal\_20 fok |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| direction | string | true | "buy"/"sell" | "buy","sell" |
| offset | string | true | "open"/"close" | "open","close","both" |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | long | true | client order ID |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl |
| created\_at | long | true | created time |  |
| trade\_volume | decimal | true | trade total volume |  |
| trade\_turnover | decimal | true | trade total amount |  |
| fee | decimal | true | service fee |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| trade\_avg\_price | decimal | true | trade average price |  |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | frozen margin |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | order status | 3\. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled |
| liquidation\_type | string | true | liquidation type |  |
| canceled\_at | long | true | canceled time |  |
| is\_tpsl | int | true | whether to set take-profit and stop-loss order | 1：yes；0：no |
| real\_profit | decimal | true | real profit (calculated with the opening average price, include profit in history settlement.) |  |
| update\_time | Long | true | order update time ，millesecond timestamp |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |
| ts | long | true | timestamp |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "update_time": 1639104153425,
        "business_type": "swap",
        "contract_type": "swap",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT",
        "volume": 1,
        "price": 66000,
        "order_price_type": "post_only",
        "order_type": 1,
        "direction": "sell",
        "offset": "open",
        "lever_rate": 5,
        "order_id": 918814943964184600,
        "client_order_id": null,
        "created_at": 1639104153393,
        "trade_volume": 0,
        "trade_turnover": 0,
        "fee": 0,
        "trade_avg_price": null,
        "margin_frozen": 13.2,
        "profit": 0,
        "status": 3,
        "order_source": "api",
        "order_id_str": "918814943964184578",
        "fee_asset": "USDT",
        "liquidation_type": null,
        "canceled_at": null,
        "margin_asset": "USDT",
        "margin_account": "USDT",
        "margin_mode": "cross",
        "is_tpsl": 0,
        "real_profit": 0,
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639104160523
}
```

### /linear-swap-api/v3/swap\_hisorders (\[Isolated\] Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode. All via API interface submited price limit orders that had been cancelled will only be kept for 2 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| type | int | true | Type | 1:All Orders,2:Order in Finished Status |  |
| status | string | true | status | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| volume | decimal | true | volume |  |
| price | decimal | true | price |  |
| create\_date | long | true | create date |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit |  |
| real\_profit | decimal | true | real profit |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | is tpsl | 1: yes; 0:no |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "status": 0,
  "type": 1,
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
      "query_id": 13580806498,
      "order_id": 770336866451992600,
      "contract_code": "BTC-USDT",
      "symbol": "BTC",
      "lever_rate": 10,
      "direction": "sell",
      "offset": "close",
      "volume": 1,
      "price": 13100,
      "create_date": 1603704221118,
      "update_time": 1603704221118,
      "order_source": "web",
      "order_price_type": 6,
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "fee": 0,
      "trade_avg_price": 0,
      "status": 3,
      "order_id_str": "770336866451992576",
      "fee_asset": "USDT",
      "liquidation_type": "0",
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "is_tpsl": 0,
      "real_profit": 0,
      "reduce_only": 0,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_cross\_hisorders (\[Cross\] Get History Orders(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract must be filled in(if both of them not filled in, will get 1014 error code); and all filled in, the contract is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| type | int | true | Type | 1:All Orders,2:Order in Finished Status |  |
| status | string | true | status | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |

Notes:

The real\_profit is calculated with the average price in open position and the transaction average price in close position (the real profit is the sum of each profit of order matched).

Only of the order information that orders created after 0:00 on January 30, 2021, the real profit (real\_profit) parameter has a value. And in the other orders created before that times, it is 0.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross； |
| margin\_account | string | true | margin account | "USDT"... |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| volume | decimal | true | volume |  |
| price | decimal | true | price |  |
| create\_date | long | true | create date |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_asset | string | true | margin asset |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit |  |
| real\_profit | decimal | true | real profit |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | is tpsl | 1: yes; 0:no |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "pair": "BTC-USDT",
  "status": 0,
  "type": 1,
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
      "query_id": 13580806498,
      "order_id": 770336866451992600,
      "contract_code": "BTC-USDT",
      "symbol": "BTC",
      "lever_rate": 10,
      "direction": "sell",
      "offset": "close",
      "volume": 1,
      "price": 13100,
      "create_date": 1603704221118,
      "update_time": 1603704221118,
      "order_source": "web",
      "order_price_type": 6,
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0,
      "trade_volume": 0,
      "trade_turnover": 0,
      "fee": 0,
      "trade_avg_price": 0,
      "status": 3,
      "order_id_str": "770336866451992576",
      "fee_asset": "USDT",
      "liquidation_type": "0",
      "margin_asset": "USDT",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "is_tpsl": 0,
      "real_profit": 0,
      "reduce_only": 0,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_hisorders\_exact (\[Isolated\] Get History Orders via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| type | int | true | Type | 1:All Orders,2:Order in Finished Status |  |
| status | string | true | status | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| price\_type | string | false | order price type | order price type, "limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated: isolated |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| volume | decimal | true | volume |  |
| price | decimal | true | price |  |
| create\_date | long | true | create date |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit |  |
| real\_profit | decimal | true | real profit |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | is tpsl | 1: yes; 0:no |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "status": 0,
  "type": 1,
  "price_type": "opponent",
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
      "query_id": 13580806498,
      "order_id": 807038270541733900,
      "contract_code": "BTC-USDT",
      "symbol": "BTC",
      "lever_rate": 10,
      "direction": "buy",
      "offset": "close",
      "volume": 9,
      "price": 36580,
      "create_date": 1612454517740,
      "order_source": "android",
      "order_price_type": "opponent",
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0.3636,
      "trade_volume": 9,
      "trade_turnover": 329.22,
      "fee": -0.131688,
      "trade_avg_price": 36580,
      "status": 6,
      "order_id_str": "807038270541733888",
      "fee_asset": "BTC-USDT",
      "liquidation_type": "0",
      "is_tpsl": 0,
      "real_profit": 0.2394,
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "reduce_only": 0,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_cross\_hisorders\_exact (\[Cross\]Get History Orders via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract\_code filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |
| type | int | true | Type | 1:All Orders,2:Order in Finished Status |  |
| status | string | true | status | support multiple query seperated by ',',such as '3,4,5', 0: all. 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; |  |
| price\_type | string | false | order price type | order price type, "limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross； |
| lever\_rate | int | true | lever rate |  |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| volume | decimal | true | volume |  |
| price | decimal | true | price |  |
| create\_date | long | true | create date |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit |  |
| real\_profit | decimal | true | real profit |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 10.Orders failed. 11. Orders cancelling. |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order；22.ADL |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| liquidation\_type | string | true | liquidation type | 0: Non-liquidated,1: Long and short netting,2: Partial liquidated,3: Full liquidated |
| is\_tpsl | int | true | is tpsl | 1: yes; 0:no |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| canceled\_source | string | false | timeout-canceled-order |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "pair": "BTC-USDT",
  "status": 0,
  "type": 1,
  "price_type": "opponent",
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
      "query_id": 13580806498,
      "order_id": 807038270541733900,
      "contract_code": "BTC-USDT",
      "symbol": "BTC",
      "lever_rate": 10,
      "direction": "buy",
      "offset": "close",
      "volume": 9,
      "price": 36580,
      "create_date": 1612454517740,
      "order_source": "android",
      "order_price_type": "opponent",
      "order_type": 1,
      "margin_frozen": 0,
      "profit": 0.3636,
      "trade_volume": 9,
      "trade_turnover": 329.22,
      "fee": -0.131688,
      "trade_avg_price": 36580,
      "status": 6,
      "order_id_str": "807038270541733888",
      "fee_asset": "BTC-USDT",
      "liquidation_type": "0",
      "is_tpsl": 0,
      "real_profit": 0.2394,
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "reduce_only": 0,
      "canceled_source": "timeout-canceled-order"
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_matchresults (\[Isolated\] Acquire History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports isolated margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
|  |  | false |  |  |  |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| id | string | true | unique id of the trade, and match\_id is not unique id. The specific method of use is to use match\_id and id as the joint primary key to form a unique transaction ID. |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders\_cross.\$contract\_code match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated； |
| margin\_account | string | true | margin account | such as:USDT” |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_turnover | decimal | true | trade turnover |  |
| create\_date | long | true | create date |  |
| offset\_profitloss | decimal | true | profit or loss when cloase position |  |
| real\_profit | decimal | true | real profit |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker or maker |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
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
      "query_id": 452057,
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "business_type": "futures",
      "match_id": 2902136,
      "order_id": 918800256249405400,
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "direction": "buy",
      "offset": "open",
      "trade_volume": 100,
      "trade_price": 48555.6,
      "trade_turnover": 4855.56,
      "trade_fee": -2.42778,
      "offset_profitloss": 0,
      "create_date": 1639100651577,
      "role": "Taker",
      "order_source": "api",
      "order_id_str": "918800256249405440",
      "id": "2902136-918800256249405440-1",
      "fee_asset": "USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "real_profit": 0,
      "reduce_only": 0
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_cross\_matchresults (\[Cross\] Get History Match Results(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| id | string | true | unique id of the trade, and match\_id is not unique id. The specific method of use is to use match\_id and id as the joint primary key to form a unique transaction ID. |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders\_cross.\$contract\_code match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross； |
| margin\_account | string | true | margin account | such as:USDT” |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_turnover | decimal | true | trade turnover |  |
| create\_date | long | true | create date |  |
| offset\_profitloss | decimal | true | profit or loss when cloase position |  |
| real\_profit | decimal | true | real profit |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker or maker |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
|  |  | true |  |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "pair": "BTC-USDT",
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
      "query_id": 452057,
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "business_type": "futures",
      "match_id": 2902136,
      "order_id": 918800256249405400,
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "direction": "buy",
      "offset": "open",
      "trade_volume": 100,
      "trade_price": 48555.6,
      "trade_turnover": 4855.56,
      "trade_fee": -2.42778,
      "offset_profitloss": 0,
      "create_date": 1639100651577,
      "role": "Taker",
      "order_source": "api",
      "order_id_str": "918800256249405440",
      "id": "2902136-918800256249405440-1",
      "fee_asset": "USDT",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "real_profit": 0,
      "reduce_only": 0
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_matchresults\_exact (\[Isolated\]Get History Match Results via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev default is prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| id | string | true | unique id of the trade, and match\_id is not unique id. The specific method of use is to use match\_id and id as the joint primary key to form a unique transaction ID. |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| match\_id | long | true | match\_id is the same with trade\_id of the websocket subscriptions: orders\_cross.\$contract\_code match\_id is the result of sets of order execution and trade confirmation. NOTE: match\_id is not unique, which includes all trade records of a taker order and N maker orders. If the taker order matches with N maker orders, it will create N trades with same match\_id. |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | isolated； |
| margin\_account | string | true | margin account | such as:BTC-USDT” |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_turnover | decimal | true | trade turnover |  |
| create\_date | long | true | create date |  |
| offset\_profitloss | decimal | true | profit or loss when cloase position |  |
| real\_profit | decimal | true | real profit |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker or maker |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| ht\_price | string | false | ht price |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
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
      "query_id": 138798248,
      "match_id": 13752484857,
      "order_id": 807038270541733900,
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "direction": "buy",
      "offset": "close",
      "trade_volume": 9,
      "trade_price": 36580,
      "trade_turnover": 329.22,
      "trade_fee": -0.131688,
      "offset_profitloss": 0.3636,
      "create_date": 1612454517757,
      "role": "Taker",
      "order_source": "android",
      "order_id_str": "807038270541733888",
      "id": "13752484857-807038270541733888-1",
      "fee_asset": "USDT",
      "ht_price": "",
      "margin_mode": "isolated",
      "margin_account": "BTC-USDT",
      "real_profit": 0.2394,
      "reduce_only": 0
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v3/swap\_cross\_matchresults\_exact (\[Cross\]Get History Match Results via Multiple Fields(New))

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract | string | true | contract code | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0:All; 1: Open long; 2: Open short; 3: Close short; 4: Close long; 5: Liquidate long positions; 6: Liquidate short positions, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| start\_time | long | false | Query start time, query by data creation time | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 90 days. |  |
| end\_time | long | false | Query end time, query data by creation time | Value range \[(present-90d), present\], maximum query window size is 48 hours, query window shift should be within past 90 days. | now |
| direct | string | false | Search direct, If the direction is NEXT, the data is returned in positive chronological order; if the direction is PREV, the data is returned in reverse chronological order | next, prev | next |
| from\_id | long | false | If the query direction is prev, from\_id should be the min query\_id in the last query result. If the query direction is next, from\_id should be the max query\_id in the last query result | Search query\_id to begin with |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | State code |  |
| msg | string | true | The code description |  |
| ts | long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| id | string | true | unique id of the trade, and match\_id is not unique id. The specific method of use is to use match\_id and id as the joint primary key to form a unique transaction ID. |  |
| query\_id | long | true | Query id, which can be used as the from\_id field for the next query request. |  |
| match\_id | long | true | matching result id, not unique, may be repeated |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross； |
| margin\_account | string | true | margin account | such as:USDT” |
| direction | string | true | direction | "buy"/"sell" |
| offset | string | true | offset | "open","close","both" |
| trade\_volume | decimal | true | trade volume |  |
| trade\_price | decimal | true | trade price |  |
| trade\_turnover | decimal | true | trade turnover |  |
| create\_date | long | true | create date |  |
| offset\_profitloss | decimal | true | profit or loss when cloase position |  |
| real\_profit | decimal | true | real profit |  |
| trade\_fee | decimal | true | trade fee |  |
| role | string | true | taker or maker |  |
| fee\_asset | string | true | fee asset | （"USDT"...） |
| ht\_price | string | false | ht price |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger、tpsl、ADL |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract": "BTC-USDT",
  "trade_type": 0,
  "pair": "BTC-USDT",
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
      "query_id": 452057,
      "contract_type": "this_week",
      "pair": "BTC-USDT",
      "business_type": "futures",
      "match_id": 2902136,
      "order_id": 918800256249405400,
      "symbol": "BTC",
      "contract_code": "BTC-USDT-211210",
      "direction": "buy",
      "offset": "open",
      "trade_volume": 100,
      "trade_price": 48555.6,
      "trade_turnover": 4855.56,
      "trade_fee": -2.42778,
      "offset_profitloss": 0,
      "create_date": 1639100651577,
      "role": "Taker",
      "order_source": "api",
      "order_id_str": "918800256249405440",
      "id": "2902136-918800256249405440-1",
      "fee_asset": "USDT",
      "ht_price": "",
      "margin_mode": "cross",
      "margin_account": "USDT",
      "real_profit": 0,
      "reduce_only": 0
    }
  ],
  "ts": 1604312615051
}
```

### /linear-swap-api/v1/swap\_lightning\_close\_position (\[Isolated\] Place Lightning Close Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode..By default, the maximum liquidable amount of the current position is used to place a lightning closing order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Case-Insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USDT" |  |  |
| direction | string | true | “buy”:Open，“sell”:Close |  |  |
| client\_order\_id | long | false | Client needs to provide unique API and have to maintain the API themselves afterwards. | \[1, 9223372036854775807\] |  |
| order\_price\_type | string | false | order price type | "market" by default."market": market Order type," "lightning\_fok": lightning FOK type,"lightning\_ioc": lightning IOC type |  |

Notes:

Lightning Close Position，is order with rival price and optimal 30 grades. And the unsettled part will be automatically converted into a limited price order.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" :Order placed successfully, "error"：Order failed |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  | Dictionary |
| order\_id | long | true | Order ID |  |
| order\_id\_str | string | true | Order ID |  |
| client\_order\_id | long | false | user’s own order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_price_type": "lightning",
  "direction": "buy",
  "client_order_id": 1010222
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 9861634,
    "order_id_str": "9861634",
    "client_order_id": 9086
  },
  "ts": 158797866555
}
```

### /linear-swap-api/v1/swap\_cross\_lightning\_close\_position (\[Cross\] Place Lightning Close Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.By default, the maximum liquidable amount of the current position is used to place a lightning closing order. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | true | direction | “buy”/“sell” |  |
| client\_order\_id | long | false | client order ID | \[1, 9223372036854775807\] |  |
| order\_price\_type | string | false | order price type | "market" by default."market": market Order type," "lightning\_fok": lightning FOK type,"lightning\_ioc": lightning IOC type |  |

Notes:

Lightning Close Position，is order with rival price and optimal 30 grades. And the unsettled part will be automatically converted into a limited price order.

The closing price of lightning closing position has a predictable effect, which can avoid the loss of users when the order cannot be completed when the market price rises sharply and falls sharply.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok"/"error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | true |  |  |
| order\_id | long | true | order ID |  |
| order\_id\_str | string | true | order ID |  |
| client\_order\_id | int | false | client order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "order_price_type": "lightning",
  "direction": "buy",
  "client_order_id": 1010222
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 784063527799226400,
    "order_id_str": "784063527799226368"
  },
  "ts": 1606976912267
}
```

### /linear-swap-api/v1/swap\_position\_side (【isolated】Query position mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: query the isolated position mode of the current user's U-margin contract

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | String | true | margin account | such as: "USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | String | true | status | ok , 'error' |
| DATA\_START | object array | true |  |  |
| margin\_account | String | true | margin account | such as:'BTC-USDT'，'ETH-USDT'... |
| position\_mode | String | true | position mode | single\_side; dual\_side |
| DATA\_END | String | true |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_position_side?margin_account=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "USDT",
      "position_mode": "single_side"
    }
  ],
  "ts": 1566899973811
}
```

### /linear-swap-api/v1/swap\_cross\_position\_side (【cross】Query position mode)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: query the cross position mode of the current user's U-margin contract

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | String | true | margin account | such as: "USDT" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | String | true | status | ok , 'error' |
| DATA\_START | object array | true |  |  |
| margin\_account | String | true | margin account | such as:'BTC-USDT'，'ETH-USDT'... |
| position\_mode | String | true | position mode | single\_side; dual\_side |
| DATA\_END | String | true |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_position_side?margin_account=BTC-USDT"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_account": "USDT",
      "position_mode": "single_side"
    }
  ],
  "ts": 1566899973811
}
```

### /linear-swap-api/v1/swap\_trigger\_order (\[Isolated\] Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract type | BTC-USDT |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |  |
| trigger\_price | decimal | true | Trigger Price |  |  |
| order\_price | decimal | false | Order Price |  |  |
| order\_price\_type | string | false | order price type： "limit" by default;"optimal\_5", "optimal\_10"，"optimal\_20" |  |  |
| volume | long | true | volume |  |  |
| direction | string | true | buy sell |  |  |
| offset | string | false | open, close, both |  |  |
| lever\_rate | int | false | Long leverage shall be equal to short leverage.high leverage has a high risk factor, so please use it with caution. |  |  |

Notes:

optimal\_5: top 5 optimal BBO price. optimal\_10: top 10 optimal BBO price. optimal\_20: top 20 optimal BBO price. limit: the limit order, order\_price needed.

If you’re holding a position currently, the leverage you choose when placing an order should be the same as the leverage of your current positions, otherwise, the order will fail to be placed. If you need a new leverage to place an order, you should switch the leverage of current positions first by using the Switch Leverage interface.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | 1 | false | status: ok,error |  |
| err\_code | 0 | false | error code |  |
| err\_msg | 0 | false | error message |  |
| DATA\_START |  | false |  |  |
| order\_id | 1 | false | order id. |  |
| order\_id\_str | 1 | false | order id str |  |
| DATA\_END |  | false |  |  |
| ts | 1 | false | timestamp |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "trigger_type": "ge",
  "trigger_price": 1111,
  "order_price": 1000,
  "order_price_type": "limit",
  "volume": 111,
  "direction": "buy",
  "offset": "open",
  "lever_rate": 10
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 35,
    "order_id_str": "35"
  },
  "ts": 1547521135713
}
```

### /linear-swap-api/v1/swap\_cross\_trigger\_order (\[Cross\] Place Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred. offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled. please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| trigger\_type | string | true | trigger type | ge: Equal to or Greater than；le: Less than or Equal to |  |
| trigger\_price | decimal | true | trigger price |  |  |
| order\_price | decimal | false | order price |  |  |
| order\_price\_type | string | false | order price type | "limit" by default;"optimal\_5", "optimal\_10"，"optimal\_20" |  |
| volume | long | true | Numbers of orders (volume) |  |  |
| direction | string | true | direction | buy/sell |  |
| offset | string | false | offset | open,close,both |  |
| lever\_rate | int | false | leverage rate | Long leverage shall be equal to short leverage.high leverage has a high risk factor, so please use it with caution. |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | timestamp |  |
| DATA\_START | object | true |  |  |
| order\_id | int | true | order ID |  |
| order\_id\_str | string | true | order id |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "reduce_only": 0,
  "trigger_type": "le",
  "trigger_price": 16500,
  "order_price": 16000,
  "order_price_type": "limit",
  "volume": 10,
  "direction": "buy",
  "offset": "open",
  "lever_rate": 20
}
```

#### Response Example

##### Success Example

`正确的返回： {     "status": "ok",     "data": {         "order_id": 1880,         "order_id_str": "1880"     },     "ts": 1606977456766 }  错误的返回： {     "status": "error",     "err_code": 1085,     "err_msg": "Trigger order failed, please modify the price and place the order again or contact the customer service.",     "ts": 1606977396756 }`

### /linear-swap-api/v1/swap\_trigger\_cancel (\[Isolated\] Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | 1 | false | Case-Insenstive.Both uppercase and lowercase are supported.BTC-USDT... |  |  |
| order\_id | 1 | false | order id. multiple orderids need to be joined by ",".Max number of order ids is 20 once. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| \_\_errors\_\_ |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error messages |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successful orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp millseconds |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_id": "456789123"
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
        "order_id": "34",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "1"
  },
  "ts": 1603704887184
}
```

### /linear-swap-api/v1/swap\_cross\_trigger\_cancel (\[Cross\] Cancel Trigger Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| order\_id | string | true | order id. multiple orderids need to be joined by ",".Max number of order ids is 10 once. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| order\_id | string | false | order ID |  |
| err\_code | int | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the list order which's successful，joined by "," |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "direction": "buy",
  "offset": "open"
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
        "order_id": "1888",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "1880"
  },
  "ts": 1606977508308
}
```

### /linear-swap-api/v1/swap\_trigger\_cancelall (\[Isolated\] Cancel All Trigger Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code,"BTC-USDT" ... |  |  |
| direction | string | false | Transaction direction(if not filled in means all) \["buy" , "sell"\] |  |  |
| offset | string | false | offset direction（if not filled in means all） \["open" , "close"\] |  |  |

Notes:

You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| DATA\_START |  | false |  |  |
| \_\_errors\_\_ |  | false |  |  |
| order\_id | string | true | order id |  |
| err\_code | int | true | error code |  |
| err\_msg | string | true | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successful orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | response timestamp in millseconds |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "direction": "buy",
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
    "successes": "2"
  },
  "ts": 1603704998960
}
```

### /linear-swap-api/v1/swap\_cross\_trigger\_cancelall (\[Cross\] Cancel All Trigger Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | Transaction direction(if not filled in means all) | \["buy" , "sell"\] |  |
| offset | string | false | offset direction（if not filled in means all） | \["open" , "close"\] |  |

Notes:

You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| \_\_errors\_\_ | object array | true |  |  |
| order\_id | string | false | order ID |  |
| err\_code | int | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the list order which's successful，joined by "," |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "direction": "buy",
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
    "successes": "1879,1878"
  },
  "ts": 1606977712328
}
```

### /linear-swap-api/v1/swap\_trigger\_openorders (\[Isolated\] Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code "BTC-USDT"... |  |  |
| page\_index | int | false | page number，default page 1 if no given instruction |  |  |
| page\_size | int | false | default 20 if no given instruction ，no more than 50 |  |  |
| trade\_type | int | false | trade type(Default:all) 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| \_\_orders\_\_ |  | false |  |  |
| symbol | string | true | Cryptocurrency |  |
| contract\_code | string | true | contract code |  |
| trigger\_type | string | true | trigger type： gegreat than or equal to；leless than or equal to |  |
| volume | decimal | true | trigger order volume |  |
| order\_type | int | true | Transaction Type 1. Place orders 2. cancel orders |  |
| direction | string | true | order direction \[buy,sell\] |  |
| offset | string | true | offset direction \[open,close,both\] |  |
| lever\_rate | int | true | Leverage 1\\5\\10\\20 |  |
| order\_id | long | true | trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| order\_source | string | true | order source( system、web、api、m、risk、settlement、ios、android、windows、mac、trigger ) |  |
| trigger\_price | decimal | true | trigger price |  |
| order\_price | decimal | true | the preset price by the client |  |
| created\_at | long | true | order creation time |  |
| order\_price\_type | string | true | order price type "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |  |
| status | int | true | order status：1:ready to submit、2:submited、3:order accepted 、8：canceled orders but not found、9：canceling order、10：failed' |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time stamp of response, Unit: millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "contract_code": "BTC-USDT",
        "trigger_type": "ge",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "offset": "open",
        "lever_rate": 10,
        "order_id": 4,
        "order_id_str": "4",
        "order_source": "api",
        "trigger_price": 13900,
        "order_price": 13900,
        "created_at": 1603705215654,
        "order_price_type": "limit",
        "status": 2,
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1603705219567
}
```

### /linear-swap-api/v1/swap\_cross\_trigger\_openorders (\[Cross\] Query Trigger Order Open Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. When both of pair and contract\_code filled in, the contract\_code is the preferred. when none any of them, it means to get the all open orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| page\_index | int | false | page index, default 1st |  |  |
| page\_size | int | false | page size default 20，no more than 50 |  |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| trigger\_type | string | true | trigger type： gegreat than or equal to；leless than or equal to |  |
| volume | decimal | true | place volume |  |
| order\_type | int | true | order type 1. Place orders 2. cancel orders |  |
| direction | string | true | direction \[buy/sell\] |  |
| offset | string | true | offset \[open/close,both\] |  |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| order\_price | decimal | true | order price |  |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | type of order price "limit": limit order，"optimal\_5":optimal 5，"optimal\_10":optimal 10，"optimal\_20":optimal 20 |  |
| status | int | true | order status：1:ready to submit、2:submited、3:order accepted 、8：canceled orders but not found、9：canceling order、10：failed' |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "contract_type": "quarter",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "trigger_type": "le",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 1,
        "order_id": 918808635214700500,
        "order_id_str": "918808635214700544",
        "order_source": "api",
        "trigger_price": 40000,
        "order_price": 40000,
        "created_at": 1639102649275,
        "order_price_type": "limit",
        "status": 2,
        "margin_mode": "cross",
        "margin_account": "USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639102667934
}
```

### /linear-swap-api/v1/swap\_trigger\_hisorders (\[Isolated\] Query Trigger Order History)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Contract Code | BTC-USDT |  |
| trade\_type | int | true | Transaction type | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long, 17:buy(one-way mode), 18:sell(one-way mode)；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |  |
| status | string | true | Order Status | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled |  |
| create\_date | int | true | Date | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | Page, 1st page by default without given instruction | page，1st page by default without given instruction | 1 |
| page\_size | int | false | Page 20 by default without given instruction, ，no more than 50 | Page 20 by default without given instruction, ，no more than 50 | 20 |
| sort\_by | string | false | sort fields(descending) | "created\_at"：descending order by order creation time, "update\_time": descending order by order update time | created\_at |

Notes:

Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START |  | true |  |  |
| total\_page | int | true | Total page |  |
| current\_page | int | true | Current page |  |
| total\_size | int | true | Total Size |  |
| \_\_orders\_\_ |  | false |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | Contract Code |  |
| trigger\_type | string | true | trigger： ge Equal to or Greater than；le Less than or Equal to |  |
| volume | decimal | true | Numbers of order placed |  |
| order\_type | int | true | Transaction type：1、Place orders 2、Cancel orders |  |
| direction | string | true | order direction, \[Buy (buy), Sell(sell)\] |  |
| offset | string | true | offset direction \[Open(open), Close(lose), both\] |  |
| lever\_rate | int | true | leverage 1\\5\\10\\20 |  |
| order\_id | long | true | Trigger order ID |  |
| order\_id\_str | string | true | the order ID with string |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders The value is -1 before the trigger orders executed. |  |
| order\_price\_type | string | true | order type "limit": Limit order price，"optimal\_5": Optimal 5 price level，"optimal\_10":Optimal 10 price level，"optimal\_20": the Optimal 20 price level |  |
| status | int | true | Order status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled ) |  |
| order\_source | string | true | Order source( system、web、api、m、risk、settlement、ios、android、windows、mac、trigger) |  |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | the price when trigger orders executed |  |
| order\_price | decimal | true | the order price preset by the client |  |
| created\_at | long | true | the order creation time |  |
| triggered\_at | long | true | the execution time when orders getting triggered. |  |
| order\_insert\_at | long | true | the time when the triggered orders filled successfully. |  |
| canceled\_at | long | true | Order cancelation time |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| fail\_code | int | true | the error code when the triggered orders failed to be filled |  |
| fail\_reason | string | true | the error message with failure reason when triggered orders failed to filled. |  |
| margin\_mode | string | true | margin mode | isolated : "isolated" |
| margin\_account | string | true | margin account | "BTC-USDT"... |
| reduce\_only | int | false | 0: no, 1: yes |  |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "trade_type": 0,
  "status": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_code": "BTC-USDT",
        "trigger_type": "ge",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "offset": "open",
        "lever_rate": 10,
        "order_id": 3,
        "order_id_str": "3",
        "relation_order_id": "-1",
        "order_price_type": "limit",
        "status": 6,
        "order_source": "api",
        "trigger_price": 13900,
        "triggered_price": null,
        "order_price": 13900,
        "created_at": 1603705155231,
        "triggered_at": null,
        "order_insert_at": 0,
        "canceled_at": 1603705159520,
        "update_time": 1603705159520,
        "fail_code": null,
        "fail_reason": null,
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 3,
    "current_page": 1,
    "total_size": 3
  },
  "ts": 1603705603369
}
```

### /linear-swap-api/v1/swap\_cross\_trigger\_hisorders (\[Cross\] Query Trigger Order History)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | true | trade type | 0: All ,1: Open Long,2: Close Short,3: Open Short,4: Close Long, 17:buy(one-way mode), 18:sell(one-way mode)；the system will transfer these parameters into offset and direction and query the requested data. Please note that no data can be requested with parameter out of this range. |  |
| status | string | true | order status | data divided with several commas, trigger orders ready to be submitted：0: All (All filled orders),4: Trigger orders successfully submitted,5: Trigger orders failed being submitted, 6: Trigger orders cancelled |  |
| create\_date | int | true | date | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index, default 1st page | page index, default 1st |  |
| page\_size | int | false | default 20，no more than 50 | default 20，no more than 50 |  |
| sort\_by | string | false | sort fields(Default: “created\_at” descending order) | "created\_at"：descending order by order creation time, "update\_time": descending order by order update time |  |

Notes:

Default to query completed orders (order status is one of 4, 5, 6);

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| DATA\_START | object | true |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| trigger\_type | string | true | trigger type： ge: Equal to or Greater than；le: Less than or Equal to |  |
| volume | decimal | true | place volume |  |
| order\_type | int | true | order type：1、Place orders 2、Cancel orders |  |
| direction | string | true | direction \[buy/sell\] |  |
| offset | string | true | offset \[open,close,both\] |  |
| lever\_rate | int | true | leverage |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id |  |
| relation\_order\_id | string | true | relation order ID is the string related to the limit orders The value is -1 before the trigger orders executed |  |
| order\_price\_type | string | true | order type "limit": Limit order price，"optimal\_5": Optimal 5 price level，"optimal\_10":Optimal 10 price level，"optimal\_20": the Optimal 20 price level |  |
| status | int | true | status (4:Orders accepted、5: Orders failing being placed、6: Orders canceled ) |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_price | decimal | true | trigger price |  |
| triggered\_price | decimal | true | triggered price |  |
| order\_price | decimal | true | order price |  |
| created\_at | long | true | created time |  |
| update\_time | long | true | order update time，millesecond timestamp |  |
| triggered\_at | long | true | trigger time |  |
| order\_insert\_at | long | true | insert time |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code |  |
| fail\_reason | string | true | fail reason |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "trade_type": 0,
  "status": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_type": "quarter",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "trigger_type": "le",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 1,
        "order_id": 918808635214700500,
        "order_id_str": "918808635214700544",
        "relation_order_id": "-1",
        "order_price_type": "limit",
        "status": 6,
        "order_source": "api",
        "trigger_price": 40000,
        "triggered_price": null,
        "order_price": 40000,
        "created_at": 1639102649275,
        "triggered_at": null,
        "order_insert_at": 0,
        "canceled_at": 1639103205980,
        "fail_code": null,
        "fail_reason": null,
        "margin_mode": "cross",
        "margin_account": "USDT",
        "update_time": 1639103206083,
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639103213233
}
```

### /linear-swap-api/v1/swap\_tpsl\_order (\[Isolated\]Set a Take-profit and Stop-loss Order for an Existing Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: All take-profit and stop-loss orders are position closing orders. This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second. Fill in at least one of the take-profit trigger price(tp\_trigger\_price) and stop-loss trigger price(sl\_trigger\_price). If all the trigger price is not filled in, this type of take-profit and stop-loss order will not be placed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| direction | string | true | direction | "buy", "sell" |  |
| volume | decimal | true | Numbers of orders (volume) |  |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| ts | long | true | time stamp |  |
| DATA\_START | object | false | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |  |
| \_\_tp\_order\_\_ | object | true | Order placing result of take-profit order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/tp\_order\_\_ |  | false |  |  |
| \_\_sl\_order\_\_ | object | true | Order placing result of stop-loss order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/sl\_order\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code（only when order fails to be placed） |  |
| err\_msg | string | false | error message（only when order fails to be placed） |  |

Notes:

When only take-profit order or stop-loss order is set , the accordingly returned "sl\_order" or "tp\_order" will be empty.

#### Request example

```
{
  "contract_code": "btc-usdt",
  "direction": "sell",
  "volume": 1,
  "tp_trigger_price": 32000,
  "tp_order_price": 32000,
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
      "order_id": 795713650661638100,
      "order_id_str": "795713650661638144"
    },
    "sl_order": {
      "order_id": 795713650665832400,
      "order_id_str": "795713650665832448"
    }
  },
  "ts": 1609754517975
}
```

### /linear-swap-api/v1/swap\_cross\_tpsl\_order (\[Cross\]Set a Take-profit and Stop-loss Order for an Existing Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: All take-profit and stop-loss orders are position closing orders. This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second. Fill in at least one of the take-profit trigger price(tp\_trigger\_price) and stop-loss trigger price(sl\_trigger\_price). If all the trigger price is not filled in, this type of take-profit and stop-loss order will not be placed. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | true | direction | "buy", "sell" |  |
| volume | decimal | true | Numbers of orders (volume) |  |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | true | direction | "buy", "sell" |  |
| volume | decimal | true | Numbers of orders (volume) |  |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |

Notes:

All take-profit and stop-loss orders are position closing orders.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| ts | long | true | time stamp |  |
| DATA\_START | object | false | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |  |
| \_\_tp\_order\_\_ | object | true | Order placing result of take-profit order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/tp\_order\_\_ |  | false |  |  |
| \_\_sl\_order\_\_ | object | true | Order placing result of stop-loss order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/sl\_order\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code（only when order fails to be placed） |  |
| err\_msg | string | false | error message（only when order fails to be placed） |  |
| status | string | true | status | "ok" , "error" |
| ts | long | true | time stamp |  |
| DATA\_START | object | false | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |  |
| \_\_tp\_order\_\_ | object | true | Order placing result of take-profit order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/tp\_order\_\_ |  | false |  |  |
| \_\_sl\_order\_\_ | object | true | Order placing result of stop-loss order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| \_\_/sl\_order\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code（only when order fails to be placed） |  |
| err\_msg | string | false | error message（only when order fails to be placed） |  |

Notes:

When only take-profit order or stop-loss order is set , the accordingly returned "sl\_order" or "tp\_order" will be empty.

#### Request example

```
{
  "contract_code": "btc-usdt",
  "direction": "sell",
  "volume": 1,
  "tp_trigger_price": 32000,
  "tp_order_price": 32000,
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
      "order_id": 795714078698750000,
      "order_id_str": "795714078698749952"
    },
    "sl_order": {
      "order_id": 795714078698750000,
      "order_id_str": "795714078698749953"
    }
  },
  "ts": 1609754620038
}
```

### /linear-swap-api/v1/swap\_tpsl\_cancel (\[Isolated\]Cancel a Take-profit and Stop-loss Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| order\_id | string | true | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_id": "2345567123"
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
        "order_id": "795713650661638145",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "795713650661638144"
  },
  "ts": 1609754722004
}
```

### /linear-swap-api/v1/swap\_cross\_tpsl\_cancel (\[Cross\]Cancel a Take-profit and Stop-loss Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| order\_id | string | true | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "order_id": "2345567123"
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
        "order_id": "795714078698749956",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "795714078698749952"
  },
  "ts": 1609754775942
}
```

### /linear-swap-api/v1/swap\_tpsl\_cancelall (\[Isolated\]Cancel all Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| direction | string | false | direction false string direction（if not filled in means all） | \["buy", "sell"\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "direction": "buy"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "795713650665832448,795714964661583872,795714964661583873"
  },
  "ts": 1609754843671
}
```

### /linear-swap-api/v1/swap\_cross\_tpsl\_cancelall (\[Cross\]Cancel all Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | direction false string direction（if not filled in means all） | \["buy", "sell"\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "direction": "buy"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "errors": [],
    "successes": "795714078698749953,795715192882053120,795715192886247424"
  },
  "ts": 1609754894463
}
```

### /linear-swap-api/v1/swap\_tpsl\_openorders (\[Isolated\]Query Open Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,3: buy short,4: sell long |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| order\_type | int | true | Order type: 1. Quotation; 2. Cancelled order |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "contract_code": "BTC-USDT",
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "order_id": 795715396674895900,
        "order_id_str": "795715396674895872",
        "order_source": "api",
        "trigger_type": "le",
        "trigger_price": 27000,
        "order_price": 0,
        "created_at": 1609754934244,
        "order_price_type": "optimal_5",
        "status": 2,
        "tpsl_order_type": "tp",
        "source_order_id": "795715396666507264",
        "relation_tpsl_order_id": "795715396674895873"
      }
    ],
    "total_page": 4,
    "current_page": 1,
    "total_size": 4
  },
  "ts": 1609755183516
}
```

### /linear-swap-api/v1/swap\_cross\_tpsl\_openorders (\[Cross\]Query Open Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. when all of pair and contract\_code filled in, the contract\_code is the preferred; when no one filled in, return all data in cross mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| trade\_type | int | false | trade type(Default:all) | 0:all,3: buy short,4: sell long |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| order\_type | int | true | Order type: 1. Quotation; 2. Cancelled order |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "page_index": 1,
  "page_size": 50,
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
        "contract_type": "this_week",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211210",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "order_id": 918816985859559400,
        "order_id_str": "918816985859559425",
        "order_source": "api",
        "trigger_type": "le",
        "trigger_price": 40000,
        "order_price": 0,
        "created_at": 1639104640223,
        "order_price_type": "optimal_5",
        "status": 2,
        "tpsl_order_type": "sl",
        "source_order_id": null,
        "relation_tpsl_order_id": "918816985859559424"
      },
      {
        "contract_type": "this_week",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211210",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "order_id": 918816985859559400,
        "order_id_str": "918816985859559424",
        "order_source": "api",
        "trigger_type": "ge",
        "trigger_price": 50000,
        "order_price": 0,
        "created_at": 1639104640223,
        "order_price_type": "optimal_5",
        "status": 2,
        "tpsl_order_type": "tp",
        "source_order_id": null,
        "relation_tpsl_order_id": "918816985859559425"
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 2
  },
  "ts": 1639104794491
}
```

### /linear-swap-api/v1/swap\_tpsl\_hisorders (\[Isolated\]Query Take-profit and Stop-loss History Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| status | string | true | status | Multiple orders are separated by English commas, and the status of stop-profit and stop-loss orders is: 0:all(representing all orders in the end state), 4:Have sumbmitted the orders, 5:orders failed, 6:orders canceled, 11:expired |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| sort\_by | string | false | for sortting, descende order by created\_at when without value | "created\_at": descending order by order created at, "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | "BTC-USDT" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| order\_type | int | true | Order type: 1. Quotation; 2. Cancelled order |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| update\_time | long | true | update time, unit: Millisecond |  |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "status": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_code": "BTC-USDT",
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "volume": 1,
        "order_type": 1,
        "tpsl_order_type": "sl",
        "direction": "sell",
        "order_id": 795714964661583900,
        "order_id_str": "795714964661583873",
        "order_source": "api",
        "trigger_type": "le",
        "trigger_price": 29000,
        "created_at": 1609754831244,
        "order_price_type": "optimal_5",
        "status": 6,
        "source_order_id": null,
        "relation_tpsl_order_id": "795714964661583872",
        "canceled_at": 1609754844420,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1",
        "update_time": 1609754850018,
        "order_price": 0
      }
    ],
    "total_page": 17,
    "current_page": 1,
    "total_size": 17
  },
  "ts": 1609756931689
}
```

### /linear-swap-api/v1/swap\_cross\_tpsl\_hisorders (\[Cross\]Query Take-profit and Stop-loss History Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if both of them not filled in, will get 1014 error code); and both filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| status | string | true | status | Multiple orders are separated by English commas, and the status of stop-profit and stop-loss orders is: 0:all(representing all orders in the end state), 4:Have sumbmitted the orders, 5:orders failed, 6:orders canceled, 11:expired |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.20 by default. 50 at most |  |  |
| sort\_by | string | false | for sortting, descende order by created\_at when without value | "created\_at": descending order by order created at, "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| order\_type | int | true | Order type: 1. Quotation; 2. Cancelled order |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| order\_source | string | true | order source | system、web、api、m、risk、settlement、ios、android、windows、mac、trigger |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price\_type | string | true | order price type | market，limit, optimal\_5, optimal\_10, optimal\_20 |
| order\_price | decimal | true | order price |  |
| status | int | true | status: | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired |
| source\_order\_id | string | true | Order id of source limit order (the field will have a value only when the order placed is a take-profit and stop-loss order; it is used to indicate that a certain limit order that triggered current take-profit and stop-loss order.) |  |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| update\_time | long | true | update time, unit: Millisecond |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "status": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_type": "this_week",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211210",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "volume": 1,
        "order_type": 1,
        "tpsl_order_type": "tp",
        "direction": "sell",
        "order_id": 918816985859559400,
        "order_id_str": "918816985859559424",
        "order_source": "api",
        "trigger_type": "ge",
        "trigger_price": 50000,
        "created_at": 1639104640223,
        "order_price_type": "optimal_5",
        "status": 6,
        "source_order_id": null,
        "relation_tpsl_order_id": "918816985859559425",
        "canceled_at": 1639104933147,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1",
        "update_time": 1639104933172,
        "order_price": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639104940769
}
```

### /linear-swap-api/v1/swap\_relation\_tpsl\_order (\[Isolated\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| order\_id | long | true | order id |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | "BTC180914" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| price | decimal | true | price |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction | "buy","sell" |
| offset | string | true | offset | "open", "close", "both" |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| client\_order\_id | long | true | client order id |  |
| created\_at | long | true | created at |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| order\_source | string | true | order source | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger |
| fee\_asset | string | true | fee asset | （"BTC","ETH"...） |
| canceled\_at | long | true | canceled at |  |
| \_\_tpsl\_order\_info\_\_ | object array | true | related take-profit and stop loss order info |  |
| volume | decimal | true | Numbers of orders (volume) |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price | decimal | true | order price |  |
| status | int | true | status | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| \_\_/tpsl\_order\_info\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_id": 3456678123
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "symbol": "BTC",
    "contract_code": "BTC-USDT",
    "margin_mode": "isolated",
    "margin_account": "BTC-USDT",
    "volume": 1,
    "price": 29999,
    "order_price_type": "opponent",
    "direction": "buy",
    "offset": "open",
    "lever_rate": 75,
    "order_id": 795947785812557800,
    "order_id_str": "795947785812557824",
    "client_order_id": null,
    "created_at": 1609810340126,
    "trade_volume": 1,
    "trade_turnover": 29.999,
    "fee": -0.01619946,
    "trade_avg_price": 29999,
    "margin_frozen": 0,
    "profit": 0,
    "status": 6,
    "order_type": 1,
    "order_source": "api",
    "fee_asset": "USDT",
    "canceled_at": 0,
    "tpsl_order_info": [
      {
        "volume": 1,
        "direction": "sell",
        "tpsl_order_type": "tp",
        "order_id": 795947785820946400,
        "order_id_str": "795947785820946432",
        "trigger_type": "ge",
        "trigger_price": 31000,
        "order_price": 0,
        "created_at": 1609810340134,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "795947785820946433",
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
        "order_id": 795947785820946400,
        "order_id_str": "795947785820946433",
        "trigger_type": "le",
        "trigger_price": 29100,
        "order_price": 0,
        "created_at": 1609810340134,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "795947785820946432",
        "status": 1,
        "canceled_at": 0,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1"
      }
    ]
  },
  "ts": 1609810352828
}
```

### /linear-swap-api/v1/swap\_cross\_relation\_tpsl\_order (\[Cross\]Query Info Of Take-profit and Stop-loss Order That Related To Position Opening Order)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in(if both of them not filled in, will get 1014 error code); and both filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| order\_id | long | true | open order id |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| margin\_mode | string | true | margin mode | cross, isolated |
| margin\_account | string | true | margin account | such as “USDT”，“BTC-USDT” |
| volume | decimal | true | Numbers of orders (volume) |  |
| price | decimal | true | price |  |
| order\_price\_type | string | true | order price type | "market": Market Order，"limit”: Limit Order "opponent":BBO "post\_only": Post-Only Order, No order limit but position limit for post-only orders.,optimal\_5： Optimal , optimal\_10： Optimal 10, optimal\_20：Optimal 20，ioc: IOC Order,，fok：FOK Order, "opponent\_ioc"：IOC order using the BBO price，"optimal\_5\_ioc"：optimal\_5 IOC，"optimal\_10\_ioc"：optimal\_10 IOC，"optimal\_20\_ioc"：optimal\_20 IOC, "opponent\_fok"：FOK order using the BBO price，"optimal\_5\_fok"：optimal\_5 FOK，"optimal\_10\_fok"：optimal\_10 FOK，"optimal\_20\_fok"：optimal\_20 FOK |
| direction | string | true | direction | "buy","sell" |
| offset | string | true | offset | "open", "close", "both" |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| client\_order\_id | long | true | client order id |  |
| created\_at | long | true | created at |  |
| trade\_volume | decimal | true | trade volume |  |
| trade\_turnover | decimal | true | trade turnover |  |
| fee | decimal | true | fee |  |
| trade\_avg\_price | decimal | true | trade avg price |  |
| margin\_frozen | decimal | true | margin frozen |  |
| profit | decimal | true | profit when close position (calculated with the average price of position, exclude profit in history settlement.) |  |
| status | int | true | status | 1\. Ready to submit the orders; 2. Ready to submit the orders; 3. Have sumbmitted the orders; 4. Orders partially matched; 5. Orders cancelled with partially matched; 6. Orders fully matched; 7. Orders cancelled; 11. Orders cancelling |
| order\_type | int | true | order type | 1\. Quotation; 2. Cancelled order; 3. Forced liquidation; 4. Delivery Order |
| order\_source | string | true | order source | system. web. api. m. risk. settlement. ios. android. windows. mac. trigger |
| fee\_asset | string | true | fee asset | （"BTC","ETH"...） |
| canceled\_at | long | true | canceled at |  |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| \_\_tpsl\_order\_info\_\_ | object array | true | related take-profit and stop loss order info |  |
| volume | decimal | true | Numbers of orders (volume) |  |
| tpsl\_order\_type | string | true | Order type(take-profit order/stop-loss order) | “tp”:take-profit order；"sl"stop-loss order |
| direction | string | true | direction | "buy", "sell" |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id in string |  |
| trigger\_type | string | true | trigger type: ge, le |  |
| trigger\_price | decimal | true | trigger price |  |
| price\_protect | boolean | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |
| created\_at | long | true | created time |  |
| order\_price | decimal | true | order price |  |
| status | int | true | status | 1.Not Activated, 2.Ready to submit the orders, 3.Submitting the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled, 8.Cancelled order not found, 9.Orders cancelling, 10.Failed, 11.Expired. 12. Not Activated-Expired |
| relation\_tpsl\_order\_id | string | true | related take-profit and stop loss order id（The field will have a value when users set take-profit and stop loss order stimulatenously, otherwise, the value will be "-1".） |  |
| canceled\_at | long | true | canceled time |  |
| fail\_code | int | true | fail code when triggered |  |
| fail\_reason | string | true | fail reason when triggered |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | Relation order ID is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| \_\_/tpsl\_order\_info\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "order_id": 3456678123
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "contract_type": "this_week",
    "business_type": "futures",
    "pair": "BTC-USDT",
    "symbol": "BTC",
    "contract_code": "BTC-USDT-211210",
    "margin_mode": "cross",
    "margin_account": "USDT",
    "volume": 1,
    "price": 48592.2,
    "order_price_type": "opponent",
    "direction": "buy",
    "offset": "open",
    "lever_rate": 5,
    "order_id": 918819004716982300,
    "order_id_str": "918819004716982272",
    "client_order_id": null,
    "created_at": 1639105121550,
    "trade_volume": 1,
    "trade_turnover": 48.5922,
    "fee": -0.0242961,
    "trade_avg_price": 48592.2,
    "margin_frozen": 0,
    "profit": 0,
    "status": 6,
    "order_type": 1,
    "order_source": "api",
    "fee_asset": "USDT",
    "canceled_at": 0,
    "tpsl_order_info": [
      {
        "volume": 1,
        "direction": "sell",
        "tpsl_order_type": "tp",
        "order_id": 918819004746342400,
        "order_id_str": "918819004746342400",
        "trigger_type": "ge",
        "trigger_price": 50000,
        "order_price": 0,
        "created_at": 1639105121563,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "918819004750536704",
        "status": 2,
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
        "order_id": 918819004750536700,
        "order_id_str": "918819004750536704",
        "trigger_type": "le",
        "trigger_price": 40000,
        "order_price": 0,
        "created_at": 1639105121564,
        "order_price_type": "optimal_5",
        "relation_tpsl_order_id": "918819004746342400",
        "status": 2,
        "canceled_at": 0,
        "fail_code": null,
        "fail_reason": null,
        "triggered_price": null,
        "relation_order_id": "-1"
      }
    ]
  },
  "ts": 1639105149621
}
```

### /linear-swap-api/v1/swap\_track\_order (\[Isolated\]Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| direction | string | true | direction | buy, sell |  |
| offset | string | false | offset | open, close, both |  |
| lever\_rate | int | false | lever rate, is required when open position, is optional when close position |  |  |
| volume | decimal | true | volume(cont) |  |  |
| callback\_rate | decimal | true | callback rate | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |  |
| active price | decimal | true | active price |  |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |  |

Notes:

When order\_price\_type is the formula\_price, it means that after the tracking order is triggered successfully, use the lowest (highest) market price \*(1 ± callback rate) that from statistic since place trading order, as the order price (the precision is the minimum variation of the contract price and be truncated) to place a limit price order

whether filled in with the optimal N or the formula price, there is no guarantee that the order can be completely filled, which mainly depends on the market conditions.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| ts | long | true | timestamp |  |
| DATA\_START | object | true | the returned data which is successful |  |
| order\_id | long | true | trailing order id\[Globally Unique\] |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "reduce_only": 0,
  "direction": "buy",
  "offset": "open",
  "lever_rate": 20,
  "volume": 100,
  "callback_rate": 0.01,
  "active_price": 1670,
  "order_price_type": "optimal_5"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 826052268312821800,
    "order_id_str": "826052268312821760"
  },
  "ts": 1616987808080
}
```

### /linear-swap-api/v1/swap\_cross\_track\_order (\[Cross\]Place a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in; and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| reduce\_only | int | false | reduce only(in hedge mode it is invalid, and in one-way mode it's value is 0 when not filled.) | 0: no, 1: yes |  |
| direction | string | true | direction | buy, sell |  |
| offset | string | false | offset | open, close, both |  |
| lever\_rate | int | false | lever rate, is required when open position, is optional when close position |  |  |
| volume | decimal | true | volume(cont) |  |  |
| callback\_rate | decimal | true | callback rate | Such as: 0.01 means 1%. And must be not less than 0.001 (0.1%) |  |
| active price | decimal | true | active price |  |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |  |

Notes:

When order\_price\_type is the formula\_price, it means that after the tracking order is triggered successfully, use the lowest (highest) market price \*(1 ± callback rate) that from statistic since place trading order, as the order price (the precision is the minimum variation of the contract price and be truncated) to place a limit price order

whether filled in with the optimal N or the formula price, there is no guarantee that the order can be completely filled, which mainly depends on the market conditions.

offset, in hedge mode it is a required field, and in one-way mode it is optional paramater which's value must be both when filled.

please note that, in the one-way mode, if using the parameter reduce\_only=1 to place an order for opening positions, when the order triggered, it will respond error message: 1492 Amount of Reduce Only order exceeds the amount available to close. order will be failed.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" , "error" |
| ts | long | true | timestamp |  |
| DATA\_START | object | true | the returned data which is successful |  |
| order\_id | long | true | trailing order id\[Globally Unique\] |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "reduce_only": 0,
  "direction": "buy",
  "offset": "open",
  "lever_rate": 20,
  "volume": 100,
  "callback_rate": 0.01,
  "active_price": 1670,
  "order_price_type": "optimal_5"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "order_id": 826052906719445000,
    "order_id_str": "826052906719444992"
  },
  "ts": 1616987960287
}
```

### /linear-swap-api/v1/swap\_track\_cancel (\[Isolated\]Cancel a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| order\_id | string | true | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "order_id": "456457123"
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
        "order_id": "826052268312821761",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "826052268312821760"
  },
  "ts": 1616988039695
}
```

### /linear-swap-api/v1/swap\_cross\_track\_cancel (\[Cross\]Cancel a Trailing Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in; and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| order\_id | string | true | User's trailing order id (multiple order IDs are separated by ",", a maximum of 10 orders are allowed to be withdrawn at a time) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "order_id": "456457123"
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
        "order_id": "826052906719444993",
        "err_code": 1061,
        "err_msg": "This order doesnt exist."
      }
    ],
    "successes": "826053970168446976"
  },
  "ts": 1616988232517
}
```

### /linear-swap-api/v1/swap\_track\_cancelall (\[Isolated\]Cancel All Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second. You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| direction | string | false | direction(if not filled in as all) | buy, sell |  |
| offset | string | false | offset(if not filledin as all) | open, close |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "direction": "buy",
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
    "successes": "826054603831312384,826054608491184128,826054686706565120"
  },
  "ts": 1616988392280
}
```

### /linear-swap-api/v1/swap\_cross\_track\_cancelall (\[Cross\]Cancel All Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: The interface only supports cross margin mode. The frequency limit of this interface is 5 times per second. You can fill in only one of direction and offset to cancel the orders. (such as direction=buy, all buy orders will be cancelled, including "open" and "close" offset) The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of (pair+contract\_type) and contract\_code must be filled in(if all of them not filled in, will get 1014 error code); and all filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| contract\_type | string | false | contract type | swap, this\_week, next\_week, quarter, next\_quarter |  |
| direction | string | false | direction(if not filled in, means all) | buy, sell |  |
| offset | string | false | offset (if not filled in, means all) | open, close |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| \_\_errors\_\_ | object | true |  | dictionary |
| order\_id | string | true | trailing order id\[Globally Unique\] |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error msg |  |
| \_\_/errors\_\_ |  | false |  |  |
| successes | string | true | the orders that are success |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "contract_type": "swap",
  "direction": "buy",
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
    "successes": "826054813483597824,826054818734866432,826054867657228288"
  },
  "ts": 1616988442893
}
```

### /linear-swap-api/v1/swap\_track\_openorders (\[Isolated\]Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| trade\_type | int | false | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | BTC-USDT |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| margin\_mode | string | true | margin mode | isolated |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "trade_type": 0,
  "page_index": 1,
  "page_size": 50
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
        "contract_code": "BTC-USDT",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 5,
        "order_id": 826055066114916400,
        "order_id_str": "826055066114916352",
        "order_source": "api",
        "created_at": 1616988475122,
        "order_price_type": "formula_price",
        "status": 2,
        "callback_rate": 0.03,
        "active_price": 48888,
        "is_active": 0,
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1616988497109
}
```

### /linear-swap-api/v1/swap\_cross\_track\_openorders (\[Cross\]Current unfilled trailing order acquisition)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. when both of pair and contract\_code filled in, the contract\_code is the preferred. if none of them filled in, it means all open orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| trade\_type | int | false | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| margin\_mode | string | true | margin mode | cross |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "trade_type": 0,
  "page_index": 1,
  "page_size": 50
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
        "contract_type": "quarter",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 1,
        "order_id": 918819679173152800,
        "order_id_str": "918819679173152768",
        "order_source": "api",
        "created_at": 1639105282359,
        "order_price_type": "formula_price",
        "status": 2,
        "callback_rate": 0.03,
        "active_price": 41111,
        "is_active": 0,
        "margin_mode": "cross",
        "margin_account": "USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639105312766
}
```

### /linear-swap-api/v1/swap\_track\_hisorders (\[Isolated\]Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: This interface only supports isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| status | string | true | order status | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |  |
| trade\_type | int | true | trade type | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |
| sort\_by | string | false | sort fields(descending), if not filled in, sort by created\_at descending | "create\_date"：descending order by order create date , "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | BTC-USDT |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| update\_time | long | true | update time, unit: millisecond |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| canceled\_at | long | true | canceled at |  |
| fail\_code | int | true | error code when place limit price order |  |
| fail\_reason | string | true | error reason when place limit price order |  |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| market\_limit\_price | decimal | true | lowest/highest market price (use the lowest price when buy. use the highest when sell) |  |
| formula\_price | decimal | true | formula price(the lowest (highest) market price\* (1 ± callback rate)) |  |
| real\_volume | decimal | true | real volume |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | relation\_order\_id is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| margin\_mode | string | true | margin mode | isolated |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "status": 0,
  "trade_type": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_code": "BTC-USDT",
        "triggered_price": null,
        "volume": 1,
        "order_type": 1,
        "direction": "sell",
        "offset": "open",
        "lever_rate": 5,
        "order_id": 826054686706565100,
        "order_id_str": "826054686706565120",
        "order_source": "api",
        "created_at": 1616988384665,
        "update_time": 1616988430833,
        "order_price_type": "formula_price",
        "status": 6,
        "canceled_at": 1616988393365,
        "fail_code": null,
        "fail_reason": null,
        "callback_rate": 0.03,
        "active_price": 51111,
        "is_active": 0,
        "market_limit_price": null,
        "formula_price": null,
        "real_volume": 0,
        "relation_order_id": "-1",
        "margin_mode": "isolated",
        "margin_account": "BTC-USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 4
  },
  "ts": 1616989113947
}
```

### /linear-swap-api/v1/swap\_cross\_track\_hisorders (\[Cross\]Get History Trailing Orders)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625. one of pair and contract\_code must be filled in. and both filled in, the contract\_code is the preferred.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| pair | string | false | pair | BTC-USDT |  |
| status | string | true | order status | Multiple separated by English commas, Trailing Order status: 0:all(representing all orders in the end state), 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |  |
| trade\_type | int | true | trade type(if not filled in, means all) | 0:all,1: buy long,2: sell short,3: buy short,4: sell long, 17:buy(one-way mode), 18:sell(one-way mode) |  |
| create\_date | long | true | days | any positive integer available. Requesting data beyond 90 will not be supported, otherwise, system will return trigger history data within the last 90 days by default. |  |
| page\_index | int | false | page index, if not filled in as 1st |  |  |
| page\_size | int | false | if not filled in as 20, and no more than 50 |  |  |
| sort\_by | string | false | sort fields(descending), if not filled in, sort by created\_at descending | "create\_date"：descending order by order create date , "update\_time": descending order by order update time |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | the result of server handling to request | "ok" :success, "error": failed |
| DATA\_START | object | true |  | dictionary |
| total\_page | int | true | total page |  |
| total\_size | int | true | total size |  |
| current\_page | int | true | current page |  |
| \_\_orders\_\_ | object array | true |  |  |
| symbol | string | true | symbol |  |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| volume | decimal | true | volume |  |
| order\_type | int | true | order type: 1. Quotation; 2. Cancelled order |  |
| direction | string | true | direction | buy, sell |
| offset | string | true | offset | open, close, both |
| lever\_rate | int | true | lever rate |  |
| order\_id | long | true | trailing order id |  |
| order\_id\_str | string | true | trailing order id in string format |  |
| order\_source | string | true | order source |  |
| created\_at | long | true | created at |  |
| update\_time | long | true | update time, unit: millisecond |  |
| order\_price\_type | string | true | order price type | optimal\_5, optimal\_10, optimal\_20, formula\_price |
| status | int | true | order status | 2.Ready to submit the orders, 4.Submit the orders success, 5.Submit the orders failed, 6.Orders cancelled |
| canceled\_at | long | true | canceled at |  |
| fail\_code | int | true | error code when place limit price order |  |
| fail\_reason | string | true | error reason when place limit price order |  |
| callback\_rate | decimal | true | callback rate | such as: 0.01 means 1% |
| active price | decimal | true | active price |  |
| is\_active | int | true | Is the active price activated? | 1: activated; 0: not activated |
| market\_limit\_price | decimal | true | lowest/highest market price (use the lowest price when buy. use the highest when sell) |  |
| formula\_price | decimal | true | formula price(the lowest (highest) market price\* (1 ± callback rate)) |  |
| real\_volume | decimal | true | real volume |  |
| triggered\_price | decimal | true | triggered price |  |
| relation\_order\_id | string | true | relation\_order\_id is the string related to the limit orders， The value is -1 before the trigger orders executed. |  |
| margin\_mode | string | true | margin mode | cross |
| margin\_account | string | true | margin account | e.g：“BTC-USDT” |
| contract\_type | string | true | contract type | swap, this\_week, next\_week, quarter, next\_quarter |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| reduce\_only | int | true | reduce only | 0: no, 1: yes |
| \_\_/orders\_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |

#### Request example

```
{
  "contract_code": "BTC-USDT",
  "pair": "BTC-USDT",
  "status": 0,
  "trade_type": 0,
  "create_date": 30,
  "page_index": 1,
  "page_size": 50,
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
        "contract_type": "quarter",
        "business_type": "futures",
        "pair": "BTC-USDT",
        "symbol": "BTC",
        "contract_code": "BTC-USDT-211231",
        "triggered_price": null,
        "volume": 1,
        "order_type": 1,
        "direction": "buy",
        "offset": "open",
        "lever_rate": 1,
        "order_id": 918819679173152800,
        "order_id_str": "918819679173152768",
        "order_source": "api",
        "created_at": 1639105282359,
        "update_time": 1639105426243,
        "order_price_type": "formula_price",
        "status": 6,
        "canceled_at": 1639105426208,
        "fail_code": null,
        "fail_reason": null,
        "callback_rate": 0.03,
        "active_price": 41111,
        "is_active": 0,
        "market_limit_price": null,
        "formula_price": null,
        "real_volume": 0,
        "relation_order_id": "-1",
        "margin_mode": "cross",
        "margin_account": "USDT",
        "reduce_only": 0
      }
    ],
    "total_page": 1,
    "current_page": 1,
    "total_size": 1
  },
  "ts": 1639105441911
}
```

### /linear-swap-api/v1/swap\_cross\_transfer\_state (\[Cross\] Query Information On Transfer State)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface only supports cross margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| margin\_account | string | false | margin account, return all margin when null | "USDT"，only support USDT now |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object array | true |  |  |
| margin\_mode | string | true | margin mode | cross: cross margin mode |
| margin\_account | string | true | margin account | "USDT"... |
| transfer\_in | int | true | deposit access：when “1”, then access available; when “0”, access unavailable "1" |  |
| transfer\_out | int | true | withdraw access： when “1”, then access available; when “0”, access unavailable "1" |  |
| master\_transfer\_sub | int | true | transfer from master to sub account："1" is available，“0” is unavailable |  |
| sub\_transfer\_master | int | true | transfer from sub to master account："1" is available，“0” is unavailable |  |
| master\_transfer\_sub\_inner\_in | int | true | Transfer\_in access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| master\_transfer\_sub\_inner\_out | int | true | Transfer\_out access for transfer from main account to sub-account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| sub\_transfer\_master\_inner\_in | int | true | Transfer\_in access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| sub\_transfer\_master\_inner\_out | int | true | Transfer\_out access for transfer from sub-account to main account - crossing account: "1" represents "available", "0" represents "unavailable" |  |
| transfer\_inner\_in | int | true | Transfer\_in access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |  |
| transfer\_inner\_out | int | true | Transfer\_out access for transfer between different margin accounts under the same account："1" represents "available", "0" represents "unavailable" |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_cross_transfer_state?margin_account=USDT" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "margin_mode": "cross",
      "margin_account": "USDT",
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
  "ts": 1606905619516
}
```

### https://api.huobi.pro/v2/account/transfer (\[General\] Transfer margin between Spot account and USDT Margined Contracts account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 times/second.

Interface description: The interface supports cross margin mode and isolated margin mode. This interface is used to transfer assets between Spot account and USDT Margined Contracts account. API rate limit for this interface is 1 times/second. Transferring margin between Spot account and USDT Margined Contracts account Interface, sets 8 decimal places for transferring amount of all coins.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro/v2/account/transfer |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from | string | true | source，value：spot、linear-swap | e.g. spot |  |
| to | string | true | destination，value：spot、linear-swap | e.g. linear-swap |  |
| currency | string | true | currency.Both uppercase and lowercase are supported. | e.g. USDT |  |
| amount | decimal | true | Transferring amount |  |  |
| margin-account | string | true | margin account | e.g. BTC-USDT，ETH-USDT, USDT |  |

Notes:

when "margin-account" is USDT，it means the transfer in or transfer out from cross margin account.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| success | string | true | status | true/false |
| data | long | true | The generated transfer order id |  |
| code | long | true | Response code |  |
| message | string | true | Response message |  |

#### Request example

```
{
  "from": "spot",
  "to": "linear-swap",
  "currency": "usdt",
  "amount": 100,
  "margin-account": "USDT"
}
```

#### Response Example

##### Success Example

` 正确的返回： {     "code": 200,     "data": 176104252,     "message": "Succeed",     "success": true } 错误的返回：  {    "code":1303,    "data":null,    "message":"The single transfer-out amount must be no less than 0.0008BTC",    "success":false }`

### /linear-swap-api/v3/unified\_account\_info (Query unified account assets)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Used to query the total assets of the account of the USTD-m unified account type user. User assets of non-unified account types are still queried separately according to the previous cross-margin account and isolated- margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Contract code, return all if not filled | Swap: "BTC-USDT"... ， Future: "BTC-USDT -210625"... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | String | true | Result description |  |
| ts | Long | true | Timestamp |  |
| DATA\_START | object array | true | USDT-M unified account |  |
| margin\_balance | decimal | true | margin account |  |
| margin\_static | decimal | true | Static equity,excluding profit and loss |  |
| cross\_profit\_unreal | decimal | true | cross unrealized profit and loss of the currency |  |
| cross\_margin\_static | decimal | true | Cross-margin static equity,excluding isolated position assets |  |
| margin\_asset | string | true | Margin Currency (Pricing Currency) | USDT |
| margin\_frozen | decimal | true | Freeze Margin (Frozen Quantity of Cross Margin & Isolated Margin) |  |
| withdraw\_available | decimal | true | Transferable quantity (the amount of assets that users can transfer out of the account) |  |
| cross\_risk\_rate | decimal | true | Cross Margin Rate (%) |  |
| \_\_cross\_swap \_\_ | object array | true | Contract-related fields of cross-position swap |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | Swap："BTC-USDT" ... |
| margin\_mode | string | true | Margin model | Cross Margin Mode：cross |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| cross\_max\_available | int | true | cross max available |  |
| lever\_rate | decimal | true | Lever rate |  |
| contract\_type | string | true | Contract type | swap |
| business\_type | string | true | Business type | swap |
| \_\_/cross\_swap \_\_ |  | false |  |  |
| \_\_cross\_futures \_\_ | object array | true | Fields related to cross-position future contracts |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | future："BTC-USDT-211231" ... |
| margin\_mode | string | true | Margin model | Cross Margin Mode：cross |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| lever\_rate | decimal | true | Lever rate |  |
| contract\_type | string | true | Contract type | this\_week、next\_week、quarter、next\_quarter |
| business\_type | string | true | Business type | futures |
| \_\_/cross\_futures \_\_ |  | false |  |  |
| \_\_isolated\_swap\_\_ | object array | true | Unified Account Isolated Margin Contract |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | "BTC-USDT","ETH-USDT"... |
| margin\_mode | string | true | Margin model | Isolated Margin Mode：isolated |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| withdraw\_available | decimal | true | Maximum amount that can be reduced | Hedge is superposition of long-short isolation, one- way is normal calculation |
| lever\_rate | int | true | Lever rate |  |
| position\_mode | string | true | Position mode | single\_side,dual\_side |
| \_\_/isolated\_swap \_\_ |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

`{ "code":200 "data":[ 0:{ "cross_future":[] "cross_margin_static":0 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[] "isolated_swap":[] "margin_asset":"HUSD" "margin_balance":0 "margin_frozen":0 "margin_static":0 "userId":NULL "withdraw_available":0 } 1:{ "cross_future":[] "cross_margin_static":0 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[] "isolated_swap":[] "margin_asset":"HT" "margin_balance":0 "margin_frozen":0 "margin_static":0 "userId":NULL "withdraw_available":0 } 2:{ "cross_future":[ 0:{ "business_type":"futures" "contract_code":"TOMO-USDT-231229" "contract_type":"quarter" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"TOMO" } 1:{ "business_type":"futures" "contract_code":"TOMO-USDT-231110" "contract_type":"this_week" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"TOMO" } ] "cross_margin_static":19.92483057113564 "cross_profit_unreal":0 "cross_risk_rate":NULL "cross_swap":[ 0:{ "business_type":"swap" "contract_code":"MANA-USDT" "contract_type":"swap" "cross_max_available":19.92483057113564 "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"cross" "symbol":"MANA" } 1:{ "business_type":"swap" "contract_code":"BNT-USDT" "contract_type":"swap" "margin_available":19.92483057113564 "cross_max_available":19.92483057113564 "lever_rate":5 "margin_mode":"cross" "symbol":"BNT" } ] "isolated_swap":[ 0:{ "contract_code":"BTC-USDT" "lever_rate":200 "margin_available":19.92483057113564 "margin_mode":"isolated" "symbol":"BTC" "withdraw_available":0 } 1:{ "contract_code":"GMT-USDT" "lever_rate":5 "margin_available":19.92483057113564 "margin_mode":"isolated" "symbol":"GMT" "withdraw_available":0 } ] "margin_asset":"USDT" "margin_balance":19.92483057113564 "margin_frozen":0 "margin_static":19.92483057113564 "userId":NULL "withdraw_available":19.92483057113564 } ] "msg":"ok" "ts":1699500414053 }`

### /linear-swap-api/v3/linear\_swap\_overview\_account\_info (Deductible asset inquiry )

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID

Interface description: It is used to query the total account assets of users of the U-margin contract unified account type.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| trade\_partition | String | false | If it is empty, query USDT; if it is ALL, query all currencies; if it is HTX, query HTX |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | String | true | Result description |  |
| ts | Long | true | Timestamp |  |
| DATA\_START | object array | true |  |  |
| margin\_asset | String | true | margin\_asset |  |
| margin\_balance | decimal | true | margin\_balance |  |
| margin\_available | decimal | true | margin\_available |  |
| DATA\_END | String | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": [
    {
      "margin_asset": "USDT",
      "margin_balance": 20002196154.904106,
      "margin_available": 20002196154.904106
    },
    {
      "margin_asset": "HT",
      "margin_balance": 20002196154.904106,
      "margin_available": 20002196154.904106
    }
  ],
  "ts": 158797866555
}
```

### /linear-swap-api/v3/linear\_swap\_fee\_switch (Set the U-standard contract fee deduction method )

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID

Interface description: It is used to set deduction for U-standard contract transaction fees. When the balance of the set currency is insufficient, the transaction fees of other currencies will be deducted. For example, it is set to use HTX to deduct the deduction, but if the HTX balance is insufficient, USDT will be used to offset the deduction.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fee\_option | int | true | Whether to enable deduction | 1：yes,0：no |  |
| deduction\_currency | String | true | deduction currency | For example HTX、TRX...... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | String | true | Result description |  |
| ts | Long | true | Timestamp |  |
| DATA\_START | object | true |  |  |
| DATA\_END |  | true |  |  |

Notes: deduction\_currency Only one currency can be entered

#### Request example

`{  "fee_option":1,}`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": {},
  "ts": 1670844857777
}
```

### /linear-swap-api/v3/fix\_position\_margin\_change (Adjust margin for isolated positions)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: It is used to increase or decrease the margin of isolated positions. Through "/linear-swap-api/v3/unified\_account\_info", you can query the margin that can be increased or decreased for corresponding isolated positions. The margin value that can be increased is determined through the "margin\_available" field, and the margin value that can be reduced is confirmed through the "withdraw\_available" field..

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| amount | Double | true | Adjustment amount |  |  |
| asset | String | true | Currency | USDT |  |
| contract\_code | String | true | Contract code | "BTC-USDT","ETH-USDT"…… |  |
| type | int | true | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |  |
| direction | int | true | Position direction | 1: buy;2: sell |  |
| clientOrderId | Long | false | Client order ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | string | true | Result description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| amount | Double | true | Adjustment amount |  |
| asset | String | true | Currency | USDT |
| contract\_code | String | true | Contract code | "BTC-USDT","ETH-USDT"…… |
| type | int | true | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |
| direction | int | true | Position direction | 1: buy;2: sell |
| order\_id | string | true | Adjust Margin Order ID |  |
| client\_order\_id | long | true | Customer-defined order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": {
    "order_id": "1051945088512643072",
    "client_order_id": null
  },
  "ts": 1670844857777
}
```

### /linear-swap-api/v3/fix\_position\_margin\_change\_record (Query the margin adjustment records of isolated positions )

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: It is used to query the records of margin increase and decrease for isolated positions of trading pairs.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| asset | string | true | Currency | USDT |  |
| contract\_code | string | true | Contract code | "BTC-USDT","ETH-USDT"…… |  |
| start\_time | long | false | Query start time, use data to query by creation time | The value range is \[((end-time) – 48h), (end-time)\], the maximum query window is 48 hours, and the window translation range is the last 90 days. |  |
| end\_time | long | false | Query end time, use data to query by creation time | The value range is \[(present-90d), present\], the maximum query window is 48 hours, and the window translation range is the last 90 days. |  |
| direct | string | false | Query direction, when the direction is next, the data will be returned in the forward order of time; when the direction is prev, the data will be returned in the reverse order of time | prev means forward query, and next means backward query. |  |
| from\_id | long | false | If it is a forward (prev) query, it will be assigned the smallest query\_id obtained in the previous query result; if it is a backward (next) query, it will be assigned the largest query\_id obtained in the previous query result |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | string | true | Result description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| query\_id | long | true | Query id, which can be used as the from\_id field of the next query request |  |
| order\_id | string | true | Adjusting margin order number |  |
| amount | double | true | Adjustment amount |  |
| asset | string | true | Currency | USDT |
| symbol | string | true | trading pair | "BTC-USDT","ETH-USDT"…… |
| type | int | true | Adjustment direction 1: increase isolated margin, 2: reduce isolated margin | 1: Increase isolated margin;2: Reduce isolated margin |
| direction | int | true | Position direction | 1: buy;2: sell |
| DATA\_END |  | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": [
    {
      "asset": "USDT",
      "symbol": "ETH-USDT",
      "type": 2,
      "direction": 1,
      "amount": 0,
      "order_id": "1016665644990599168",
      "query_id": 1421340514
    }
  ],
  "ts": 1670170020265
}
```

### /linear-swap-api/v3/swap\_unified\_account\_type (USTD-M contract account type query API)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: It is used to query whether the account type of the user's current USTD-M contract is a unified account or a non-unified account. The current USTD-M contract has unified account and non-unified account (cross-margin and isolated-margin account) types. Unified account type assets are placed in one USDT account, and non-unified account type assets are placed in different currency pairs.

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
| code | int | true | Status code |  |
| msg | string | true | Result description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| account\_type | int | true | Account type | 1: Non-unified account (cross-margin and isolated-margin account);2: Unified account |
| DATA\_END |  | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": {
    "account_type": 2
  },
  "ts": 1668057324200
}
```

### /linear-swap-api/v3/swap\_switch\_account\_type (Account Type Change)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Before calling this API, it is necessary to ensure that the USTD-M contract has no positions and pending orders. When changing from a non-unified account (cross-margin account) to a unified account, assets must be transferred from the isolated-margin account to the cross-margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account\_type | int | true | Account type | 1: Non-unified account (cross-margin and isolated-margin account);2: Unified account |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true | Status code |  |
| msg | string | true | Result description |  |
| ts | long | true | Timestamp |  |
| DATA\_START |  | true |  |  |
| account\_type | int | true | Account type | 1: Non-unified account (cross-margin and isolated-margin account);2: unified account |
| DATA\_END |  | true |  |  |

#### Request example

No data

#### Response Example

##### Success Example

```
{
  "code": 200,
  "msg": "ok",
  "data": {
    "account_type": 1
  },
  "ts": 1668057324200
}
```

### accounts\_unify.USDT (Subscribe to unified account asset push)

Signature verification: Yes

Interface permission: Read

Interface description: It is used for real-time monitoring of asset changes in the unified account.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | Operation name, push fixed value is notify; |  |
| topic | string | true | Push topic |  |
| ts | long | true | Server response timestamp |  |
| uid | string | true | User uid |  |
| event | string | true | Description of events related to asset change notification | For example, order creation and opening (order.open), order execution (order.match) (except forced liquidation and settlement delivery), settlement and delivery (settlement),order forced liquidation (order.liquidati on) (liquidation and takeover positions), order Cancellation (order.cancel), contract account transfer (contract.transf er) (including external transfer, parent-child transfer and transfer of different margin accounts), system (contract.system ), other asset changes (other), switching leverage ( switch\_lever\_r ate), initial capital (init), triggered by periodic push by the system (snapshot), ADL trade, margin adjustment (margin.adjustme nt) |
| DATA\_START | object array | true | USDT-M unified account |  |
| margin\_balance | decimal | true | margin account |  |
| margin\_static | decimal | true | Static equity, excluding profit and loss |  |
| cross\_profit\_unreal | decimal | true | cross unrealized profit and loss of the currency |  |
| cross\_margin\_static | decimal | true | Cross-margin static equity, excluding isolated position assets |  |
| margin\_asset | string | true | Margin Currency(Pricing Currency) | USDT |
| margin\_frozen | decimal | true | Freeze Margin(Frozen Quantity of Cross Margin & Isolated Margin) |  |
| withdraw\_available | decimal | true | Transferabl e quantity (the amount of assets that users can transfer out of the account) |  |
| cross\_risk\_rate | decimal | true | Cross Margin Rate (%) |  |
| \_\_cross\_swap \_\_ | object array | true | Contract-related fields of cross-position swap |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | swap："BTC-USDT" ... |
| margin\_mode | string | true | Margin model | Cross Margin Mode：cross |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| cross\_max\_available | int | true |  |  |
| lever\_rate | decimal | true | Lever rate |  |
| contract\_type | string | true | Contract type | swap |
| business\_type | string | true | Business type | swap |
| \_\_/cross\_swap \_\_ |  | true |  |  |
| \_\_cross\_futures \_\_ | object array | true | Fields related to cross position future contracts |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | future："BTC-USDT-211231" ... |
| margin\_mode | string | true | margin model | Cross Margin Mode：cross |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| lever\_rate | decimal | true | Lever rate |  |
| contract\_type | string | true | Contract type | this\_week、next\_week、quarter、next\_quarter |
| business\_type | string | true | Business type | futures |
| \_\_/cross\_futures \_\_ |  | true |  |  |
| \_\_isolated\_swap\_\_ | object array | true | Unified Account Isolated Margin Contract |  |
| symbol | string | true | Variety Code | "BTC","ETH"... |
| contract\_code | string | true | Contract code | "BTC-USDT","ETH-USDT"... |
| margin\_mode | string | true | margin model | Isolated Margin Mode：isolated |
| margin\_available | decimal | true | Available margin for the current leverage of the contract code |  |
| withdraw\_available | decimal | true | Maximum amount that can be reduced | Hedge is superposition of long-short isolation, one-way is normal calculation |
| lever\_rate | int | true | Lever rate |  |
| position\_mode | string | true | Position mode | single\_side；dual\_side |
| \_\_/isolated\_swap \_\_ |  | true |  |  |
| DATA\_END |  | true |  |  |

#### Subscription Example

```
{
  "op": "sub",
  "cid": "40sG903yz80oDFWr",
  "topic": "accounts_unify.USDT"
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

`{              'op': 'notify',              'topic': 'accounts_unify',              'ts': 1699500917664,              'event': 'init',              'data': [{                  'margin_asset': 'USDT',                  'margin_static': 19.92483057113564,                  'cross_margin_static': 19.92483057113564,                  'margin_balance': 19.92483057113564,                  'cross_profit_unreal': 0,                  'margin_frozen': 0.0,                  'withdraw_available': 19.924656252203462,                  'cross_risk_rate': None,                  'cross_swap': [{                      'symbol': 'DOSE',                      'contract_code': 'DOSE-USDT',                      'margin_mode': 'cross',                      'margin_available': 19.92483057113564,                      'lever_rate': 5,                      'contract_type': 'swap',                      'business_type': 'swap',                      'cross_max_available': 19.92483057113564                  }, {                      'symbol': 'OP',                      'contract_code': 'OP-USDT',                      'margin_mode': 'cross',                      'margin_available': 19.92483057113564,                      'lever_rate': 5,                      'contract_type': 'swap',                      'business_type': 'swap',                      'cross_max_available': 19.92483057113564                  }],                  'cross_future': [],                  'isolated_swap': []              }],              'uid': '421092473'          }`

#### Example of a Subscription Cancellation

No data

### accounts\_unify.USDT (Unsubscribe Unified Account Asset Change Data)

Signature verification: Yes

Interface permission: Read

Interface description: It is used for real-time monitoring of asset changes in the unified account.

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required; operation name, subscription fixed value is unsub |
| cid | string | Optional; Client requests a unique ID |
| topic | string | Required; subscription topic name, required (accounts.\$contract\_code) Subscribe and unsubscribe the asset change information of the unified account, and the value of \$contract\_code is fixed as USDT |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |

#### Subscription Example

```
{
  "op": "unsub",
  "topic": "accounts_unify.USDT",
  "cid": "40sG903yz80oDFWr"
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

No data

#### Example of a Subscription Cancellation

No data