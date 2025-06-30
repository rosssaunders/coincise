# Introduction

## API Key Create

*   Many APIs require an API Access Key for access. Please refer to [this page](https://www.bitmart.com/open-api-guide/en-US) to set up.
*   When setting up an API Access Key, it is recommended to set up an IP access whitelist for security purposes.
*   Never give your API Access key/secret key to anyone.

![PNG](../../images/create_api-en-41e5a3c6.png)

If you accidentally leak your API key, delete it immediately and generate a new one.

#### After creating an API Key, you will receive three pieces of information that you must remember:

*   `Access Key`: represents the identity of the account, this is your api key
*   `Secret Key`: used for API signature
*   `Memo`: used for API signature

![PNG](../../images/created_api-9fb3507b.png)

The Access Key and Secret Key will be randomly generated and provided by BitMart, and the Memo will be provided by you to ensure the security of API access.

## API Key Permission Settings

*   The default permission of a newly created API is `Read-Only`.
*   To withdraw funds through the API, you need to modify the permissions in the UI and select `Withdraw`.
*   Permission descriptions:
    *   `Read-only` (query spot trading orders, query contract trading orders, query funds)
    *   `Spot-Trade` (place orders, cancel orders)
    *   `Withdraw` (withdraw funds)
    *   `Margin-Trade` (repayment, borrowing, placing orders, etc.)
    *   `Future-Trade` (long position, short position, closing position, etc.)

![PNG](../../images/key-permission-en-a50bc6ed.png)

###### Read-Only Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /account/v1/wallet | KEYED | Query account assets 
| /account/v1/deposit/address | KEYED | Query deposit addresses for each currency 
| /account/v1/withdraw/address/list | KEYED | Query withdraw address list 
| /account/v2/deposit-withdraw/history | KEYED | Query deposit and withdrawal history 
| /account/v1/deposit-withdraw/detail | KEYED | Query deposit and withdrawal details 
| /spot/v1/wallet | KEYED | Query wallet balance for all currencies 
| /spot/v4/query/order | SIGNED | Query order by id (v4) 
| /spot/v4/query/client-order | SIGNED | Query order by client order id (v4) 
| /spot/v4/query/open-orders | SIGNED | Current open orders (v4) 
| /spot/v4/query/history-orders | SIGNED | Account orders (v4) 
| /spot/v4/query/trades | SIGNED | Account trade list (v4) 
| /spot/v4/query/order-trades | SIGNED | Order trade list(v4) 
| /spot/v1/user_fee | KEYED | Query basic fee rate for current user 
| /spot/v1/trade_fee | KEYED | Query fee rate for a specific trading pair for current user 
| /spot/v1/margin/isolated/pairs | KEYED | Query loan interest rate and limit for a trading pair 
| /spot/v1/margin/isolated/account | KEYED | Query isolated margin account information 
| /spot/v1/margin/isolated/borrow_record | KEYED | Query isolated margin borrowing record 
| /spot/v1/margin/isolated/repay_record | KEYED | Query isolated margin repayment record 
| /contract/private/get-open-orders | KEYED | Query Contract All Open Orders 
| /contract/private/order | KEYED | Query contract order details 
| /contract/private/trade-fee-rate | KEYED | Query Trade Fee Rate 
| /contract/private/order-history | KEYED | Query contract order history 
| /contract/private/trades | KEYED | Query contract trade details 
| /contract/private/transaction-history | KEYED | Get Contract Transaction History 
| /contract/private/assets-detail | KEYED | Query contract asset details 
| /contract/private/position | KEYED | Query position details 
| /contract/private/position-v2 | KEYED | Query position details V2 
| /contract/private/current-plan-order | KEYED | Query Current Plan Orders 
| /contract/private/position-risk | KEYED | Query Position Risk Details 
| /contract/private/get-position-mode | KEYED | Get position mode 

###### Withdraw Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /account/v1/withdraw/charge | KEYED | Query withdrawal limits 
| /account/v1/withdraw/apply | SIGNED | Apply for withdrawal 

###### Spot-Trade Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /spot/v1/submit_order | SIGNED | Place an order 
| /spot/v2/submit_order | SIGNED | Place an order 
| /spot/v1/batch_orders | SIGNED | Place multiple orders 
| /spot/v2/batch_orders | SIGNED | Place multiple orders 
| /spot/v4/batch_orders | SIGNED | Place multiple orders 
| /spot/v1/cancel_order | SIGNED | Cancel an unfinished order 
| /spot/v3/cancel_order | SIGNED | Cancel an unfinished order 
| /spot/v1/cancel_orders | SIGNED | Cancel multiple orders 
| /spot/v4/cancel_orders | SIGNED | Cancel multiple orders 

###### Margin-Trade Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /spot/v1/margin/submit_order | SIGNED | Margin order placement 
| /spot/v1/margin/isolated/transfer | SIGNED | Transfer funds between margin and spot accounts 
| /spot/v1/margin/isolated/borrow | SIGNED | Isolated margin borrowing 
| /spot/v1/margin/isolated/repay | SIGNED | Repay isolated margin debt 

###### Future-Trade Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /contract/private/submit-order | SIGNED | Place an order for a futures contract 
| /contract/private/cancel-order | SIGNED | Cancel a single futures order 
| /contract/private/cancel-orders | SIGNED | Batch cancel futures orders 
| /contract/private/submit-plan-order | SIGNED | Place a plan order for futures contracts 
| /contract/private/cancel-plan-order | SIGNED | Cancel futures plan orders 
| /account/v1/transfer-contract | SIGNED | Future account transfer 
| /account/v1/transfer-contract-list | SIGNED | Get Future account transfer list 
| /contract/private/submit-tp-sl-order | SIGNED | Place a tp or sl order for a futures contract 
| /contract/private/modify-plan-order | SIGNED | Modify a plan order for a futures contract 
| /contract/private/modify-preset-plan-order | SIGNED | Modify a preset plan order for a futures contract 
| /contract/private/modify-tp-sl-order | SIGNED | Modify a tp or sl order for a futures contract 
| /contract/private/submit-trail-order | SIGNED | Place a trail order for futures contracts 
| /contract/private/cancel-trail-order | SIGNED | Cancel futures trail order 
| /contract/private/modify-limit-order | SIGNED | Modify futures limit order 
| /contract/private/cancel-all-after | SIGNED | Timed cancel all open orders 
| /contract/private/set-position-mode | SIGNED | Set position mode 

###### Sub-Account Permissions:

You need to enter [Institution Verification](https://www.bitmart.com/institution-verification/en-US) to use the sub-account endpoints.

After the creation is successful, the sub-account has `Read-only` permission by default.

![PNG](../../images/sub_key_permission-en-6e1c19b2.png)

###### Sub-Account Spot-Trade Permissions:

Same as the above spot trading authority

###### Sub-Account Contract-Trade Permissions:

Same as above futures trading authority

###### Sub-Account Inter-Account Transfer Permissions:

| API Name | Authentication Type | Description |
| --- | --- | --- |
| /account/sub-account/main/v1/sub-to-main | SIGNED | Sub-Account Transfer to Main-Account (For Main Account, use spot account) 
| /account/sub-account/sub/v1/sub-to-main | SIGNED | Sub-Account Transfer to Main-Account (For Sub-Account, use spot account) 
| /account/sub-account/main/v1/main-to-sub | SIGNED | Main-Account Transfer to Sub-Account (For Main Account, use spot account) 
| /account/sub-account/main/v1/sub-to-sub | SIGNED | Sub-Account Transfer to Sub-Account (For Main Account, use spot account) 
| /account/sub-account/main/v1/transfer-list | KEYED | Get Sub-Account Transfer History (For Main Account, use spot account) 
| /account/sub-account/v1/transfer-history | KEYED | Get Account Spot Asset Transfer History (For Main/Sub Account, use spot account) 
| /account/sub-account/main/v1/wallet | KEYED | Get Sub-Account Spot Wallet Balance (For Main Account, use spot account) 
| /account/sub-account/main/v1/subaccount-list | KEYED | Get Sub-Account List (For Main Account, use spot account) 
| /account/contract/sub-account/main/v1/sub-to-main | SIGNED | Sub-Account Transfer to Main-Account (For Main Account, use futures account) 
| /account/contract/sub-account/main/v1/main-to-sub | SIGNED | Main-Account Transfer to Sub-Account (For Main Account, use futures account) 
| /account/contract/sub-account/sub/v1/sub-to-main | SIGNED | Sub-Account Transfer to Main-Account (For Sub-Account, use futures account) 
| /account/contract/sub-account/main/v1/wallet | KEYED | Get Sub-Account Futures Wallet Balance (For Main Account, use futures account) 
| /account/contract/sub-account/v1/transfer-history | KEYED | Get Account Futures Asset Transfer History (For Main/Sub Account, use futures account) 
| /account/contract/sub-account/main/v1/transfer-list | KEYED | Get Sub-Account Transfer History (For Main Account, use futures account) 

## API Library

In order to facilitate access, we provide SDK in some languages for reference. For more programming codes, please refer to the [Quick Start API](/en/quick/#official-sdk-libraries) on the page.

#### Available SDK:

*   [Java](https://github.com/bitmartexchange/bitmart-java-sdk-api)
*   [Python](https://github.com/bitmartexchange/bitmart-python-sdk-api)
*   [Nodejs](https://github.com/bitmartexchange/bitmart-node-sdk-api)
*   [Go](https://github.com/bitmartexchange/bitmart-go-sdk-api)
*   [PHP](https://github.com/bitmartexchange/bitmart-php-sdk-api)

In addition to the SDK, we also provide code samples in multiple languages, and the samples mainly demonstrate how to use the signed interface. It can be built and run standalone or as part of your codebase.

*   [Python Signature Example](/en/quick/#python-signature-request)
*   [Go Signature Example](/en/quick/#go-signature-request)
*   [Nodejs Signature Example](/en/quick/#node-signature-request)
*   [Java Signature Example](/en/quick/#java-signature-request)
*   [PHP Signature Example](/en/quick/#php-signature-request)
*   [Ruby Signature Example](/en/quick/#ruby-signature-request)
*   [C# Signature Example](/en/quick/#c-signature-request)
*   [Rust Signature Example](/en/quick/#rust-signature-request)
*   [C++ Signature Example](/en/quick/#c-signature-request-2)
*   [Postman](https://github.com/bitmartexchange/bitmart-postman-api)

## FAQ

Here are some frequently asked questions.

### Q1. Will different API KEY in the same account return different data?

Different API KEY data under the same account is the same.

### Q2. How to fill information in when applying for APIKEY?

1\. \`memo\` is provided by the user, it can be any string, used to confuse the signature algorithm  
2\. Binding ip is optional, it is recommended to fill in for account security  
3\. API permissions can be checked according to user needs  

### Q3. How is the HTTP status code 429 created?

The request interface exceeds the access frequency limit, it is recommended to reduce the access frequency.

### Q4. Using ccxt, the API KEY is correctly filled in, but it will also prompt 'message': 'Header X-BM-SIGN is wrong'

The parameter uid of ccxt needs to be filled in as the memo when creating the API  
Here is an example of initialization:  
  
bitmart = ccxt.bitmart({  
'apiKey': 'your\_api\_key',  
'secret': 'your\_api\_secret',  
'uid': 'your\_api\_memo' // not your uid, is the api memo  
});  

### Q5. The program I wrote myself always prompts 'message': 'Header X-BM-SIGN is wrong'

Please refer to [Quick Access API](/en/quick/#python-quick-start), select the language you use, and there are correct signature methods for reference.

### Q6. Where is the location of BitMart servers?

We are using Google Cloud Services and deployed in Taiwan.

### Q7. When will the VIP fee I applied for take effect?

We will update on the 8th, 18th and 28th of every month.

### Q8. Why does it prompt "IP is forbidden. We recommend enabling IP whitelist for API trading. "

Because you set up an IP whitelist when creating the API, which means that this API KEY can only send requests through this IP, and other IPs using this API KEY will prompt that it is prohibited.  
Why set up: IP whitelist is a network security measure used to control who can access specific network resources or services. If a whitelist IP is added, the service will only accept API requests from that IP and reject API requests from other IPs.  

## Contact Us

*   Get support in our Telegram group [BitMart API Club](https://t.me/bitmart_api)
*   Please take 1 minute to help us improve: [API Satisfaction Survey](https://www.wjx.cn/vm/OtxJYl9.aspx#)
