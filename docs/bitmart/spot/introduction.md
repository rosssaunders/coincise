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

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /account/v1/wallet | Query account assets | KEYED 
| /account/v1/deposit/address | Query deposit addresses for each currency | KEYED 
| /account/v1/withdraw/address/list | Query withdraw address list | KEYED 
| /account/v2/deposit-withdraw/history | Query deposit and withdrawal history | KEYED 
| /account/v1/deposit-withdraw/detail | Query deposit and withdrawal details | KEYED 
| /spot/v1/wallet | Query wallet balance for all currencies | KEYED 
| /spot/v4/query/order | Query order by id (v4) | SIGNED 
| /spot/v4/query/client-order | Query order by client order id (v4) | SIGNED 
| /spot/v4/query/open-orders | Current open orders (v4) | SIGNED 
| /spot/v4/query/history-orders | Account orders (v4) | SIGNED 
| /spot/v4/query/trades | Account trade list (v4) | SIGNED 
| /spot/v4/query/order-trades | Order trade list(v4) | SIGNED 
| /spot/v1/user_fee | Query basic fee rate for current user | KEYED 
| /spot/v1/trade_fee | Query fee rate for a specific trading pair for current user | KEYED 
| /spot/v1/margin/isolated/pairs | Query loan interest rate and limit for a trading pair | KEYED 
| /spot/v1/margin/isolated/account | Query isolated margin account information | KEYED 
| /spot/v1/margin/isolated/borrow_record | Query isolated margin borrowing record | KEYED 
| /spot/v1/margin/isolated/repay_record | Query isolated margin repayment record | KEYED 
| /contract/private/get-open-orders | Query Contract All Open Orders | KEYED 
| /contract/private/order | Query contract order details | KEYED 
| /contract/private/trade-fee-rate | Query Trade Fee Rate | KEYED 
| /contract/private/order-history | Query contract order history | KEYED 
| /contract/private/trades | Query contract trade details | KEYED 
| /contract/private/transaction-history | Get Contract Transaction History | KEYED 
| /contract/private/assets-detail | Query contract asset details | KEYED 
| /contract/private/position | Query position details | KEYED 
| /contract/private/position-v2 | Query position details V2 | KEYED 
| /contract/private/current-plan-order | Query Current Plan Orders | KEYED 
| /contract/private/position-risk | Query Position Risk Details | KEYED 
| /contract/private/get-position-mode | Get position mode | KEYED 

###### Withdraw Permissions:

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /account/v1/withdraw/charge | Query withdrawal limits | KEYED 
| /account/v1/withdraw/apply | Apply for withdrawal | SIGNED 

###### Spot-Trade Permissions:

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /spot/v1/submit_order | Place an order | SIGNED 
| /spot/v2/submit_order | Place an order | SIGNED 
| /spot/v1/batch_orders | Place multiple orders | SIGNED 
| /spot/v2/batch_orders | Place multiple orders | SIGNED 
| /spot/v4/batch_orders | Place multiple orders | SIGNED 
| /spot/v1/cancel_order | Cancel an unfinished order | SIGNED 
| /spot/v3/cancel_order | Cancel an unfinished order | SIGNED 
| /spot/v1/cancel_orders | Cancel multiple orders | SIGNED 
| /spot/v4/cancel_orders | Cancel multiple orders | SIGNED 

###### Margin-Trade Permissions:

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /spot/v1/margin/submit_order | Margin order placement | SIGNED 
| /spot/v1/margin/isolated/transfer | Transfer funds between margin and spot accounts | SIGNED 
| /spot/v1/margin/isolated/borrow | Isolated margin borrowing | SIGNED 
| /spot/v1/margin/isolated/repay | Repay isolated margin debt | SIGNED 

###### Future-Trade Permissions:

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /contract/private/submit-order | Place an order for a futures contract | SIGNED 
| /contract/private/cancel-order | Cancel a single futures order | SIGNED 
| /contract/private/cancel-orders | Batch cancel futures orders | SIGNED 
| /contract/private/submit-plan-order | Place a plan order for futures contracts | SIGNED 
| /contract/private/cancel-plan-order | Cancel futures plan orders | SIGNED 
| /account/v1/transfer-contract | Future account transfer | SIGNED 
| /account/v1/transfer-contract-list | Get Future account transfer list | SIGNED 
| /contract/private/submit-tp-sl-order | Place a tp or sl order for a futures contract | SIGNED 
| /contract/private/modify-plan-order | Modify a plan order for a futures contract | SIGNED 
| /contract/private/modify-preset-plan-order | Modify a preset plan order for a futures contract | SIGNED 
| /contract/private/modify-tp-sl-order | Modify a tp or sl order for a futures contract | SIGNED 
| /contract/private/submit-trail-order | Place a trail order for futures contracts | SIGNED 
| /contract/private/cancel-trail-order | Cancel futures trail order | SIGNED 
| /contract/private/modify-limit-order | Modify futures limit order | SIGNED 
| /contract/private/cancel-all-after | Timed cancel all open orders | SIGNED 
| /contract/private/set-position-mode | Set position mode | SIGNED 

###### Sub-Account Permissions:

You need to enter [Institution Verification](https://www.bitmart.com/institution-verification/en-US) to use the sub-account endpoints.

After the creation is successful, the sub-account has `Read-only` permission by default.

![PNG](../../images/sub_key_permission-en-6e1c19b2.png)

###### Sub-Account Spot-Trade Permissions:

Same as the above spot trading authority

###### Sub-Account Contract-Trade Permissions:

Same as above futures trading authority

###### Sub-Account Inter-Account Transfer Permissions:

| API Name | Description | Authentication Type |
| --- | --- | --- |
| /account/sub-account/main/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Main Account, use spot account) | SIGNED 
| /account/sub-account/sub/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Sub-Account, use spot account) | SIGNED 
| /account/sub-account/main/v1/main-to-sub | Main-Account Transfer to Sub-Account (For Main Account, use spot account) | SIGNED 
| /account/sub-account/main/v1/sub-to-sub | Sub-Account Transfer to Sub-Account (For Main Account, use spot account) | SIGNED 
| /account/sub-account/main/v1/transfer-list | Get Sub-Account Transfer History (For Main Account, use spot account) | KEYED 
| /account/sub-account/v1/transfer-history | Get Account Spot Asset Transfer History (For Main/Sub Account, use spot account) | KEYED 
| /account/sub-account/main/v1/wallet | Get Sub-Account Spot Wallet Balance (For Main Account, use spot account) | KEYED 
| /account/sub-account/main/v1/subaccount-list | Get Sub-Account List (For Main Account, use spot account) | KEYED 
| /account/contract/sub-account/main/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Main Account, use futures account) | SIGNED 
| /account/contract/sub-account/main/v1/main-to-sub | Main-Account Transfer to Sub-Account (For Main Account, use futures account) | SIGNED 
| /account/contract/sub-account/sub/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Sub-Account, use futures account) | SIGNED 
| /account/contract/sub-account/main/v1/wallet | Get Sub-Account Futures Wallet Balance (For Main Account, use futures account) | KEYED 
| /account/contract/sub-account/v1/transfer-history | Get Account Futures Asset Transfer History (For Main/Sub Account, use futures account) | KEYED 
| /account/contract/sub-account/main/v1/transfer-list | Get Sub-Account Transfer History (For Main Account, use futures account) | KEYED 

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
