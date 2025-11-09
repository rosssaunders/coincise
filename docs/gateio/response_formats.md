# Response Formats

## [#](#return-format) Return Format

All API responses are in JSON format, and users need to transform and extract data by themselves.

The HTTP status code 2XX will be returned when all operations are successful. 401 indicates that there is a problem with the certification. Other 4xx status codes indicate that the request is invalid. If it is a 5xx error, the server has encountered an unknown serious error when processing the request. Please give feedback as soon as possible.

**Return Status**

| Status Code | Description |
| --- | --- |
| 200/201 | Request succeeded |
| 202 | Request accepted by the server, but processing is not done yet |
| 204 | Request succeeded, but the server doesn't return body |
| 400 | Invalid request |
| 401 | Authentication failed |
| 404 | Not found |
| 429 | Too many requests |
| 5xx | Server error |

## [#](#data-type) Data Type

| Type | Description |
| --- | --- |
| `string` | String type, in double quotation marks. Price and amount are also formatted in string format |
| `integer` | 32-bit integer, Mainly related to status codes, size, times, etc. |
| `integer(int64)` | 64-bit integer, Mainly involves ID and higher precision timestamp |
| `float` | Floating point number. Some time and stat fields use float. |
| `object` | Object, Contains a child object{} |
| `array` | List, Includes multiple groups of content |
| `boolean` | true is true, false is false |

## [#](#portfolio-margin-account) Portfolio Margin Account

TIP

The Portfolio Margin Account is no longer maintained, please refer to the new version of the [Unified Account](#unified-account)

Since version `4.25.0`, we start supporting portfolio margin account. Gate's Portfolio Margin Account is a new feature of Gate's trading system. Its main function is to break the capital isolation between cross-margin leverage account and USD cross-margin perpetual contract account inside a Classic Account and achieve the multi-currency margin sharing among multi-product lines. Thanks to the margin sharing, users don't need to transfer funds between the two accounts, and the profit and loss of positions among different trading products can offset each other and effectively improve the capital utilization rate. See more details in the [Help Center](/help/trade/leveraged/26421/introductions-to-gate.io-s-portfolio-margin-account)

Before using the portfolio margin account's API key, you should create the API key on the API management page. The API key supports spot and perpetual contracts trading only.

> If permissions of the API key can't be checked, ensure your cross-margin account has available balance first.

### [#](#transfer) Transfer

The classic account and portfolio margin account are two different capital isolation accounts. If you want to achieve multi-currency margin sharing among multi-product lines, use the portfolio margin account please.

The funds of the portfolio margin account come from the classic account. Due to the change of funds in the classic account, the transfer of funds can only be performed using the API Key of the classic account.

The portfolio margin account is upgraded based on the cross-margin account of the original classic account, so the classic account only needs to transfer its spot funds to the cross-margin account to deposit the portfolio margin account. Similarly, withdrawals from portfolio margin account can be achieved by the classic account performing transferals from the cross margin to its spot account.

The API Key of the portfolio margin account can only perform transferals among its own multiple accounts. Due to the sharing of margin, the portfolio margin account does not need to transfer funds to its futures account (we also restrict doing so). If the futures account has PNL funds that need to be withdrawn, it must be transferred by the portfolio margin account's API key to its cross-margin account first, so that the classic account can perform withdrawals from portfolio margin account.

### [#](#spot-trading) Spot trading

The spot trading of the portfolio margin account is almost the same as the classic account, except that `cross_margin` must be specified in the `account` parameter when placing orders. For example, if you want to place a buy order for the `BTC_USDT` currency pair, the order request will be similar to

```
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "cross_margin",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

TIP

It should be noted that the portfolio margin account is upgraded from the classic account's cross-margin account. The API Key of the classic account originally supports the operation of the cross-margin account. In order not to affect the existing operations of the classic account, we still retain this function of the classic account. So whether it is the API Key of the classic account or the portfolio margin account, both can operate the same the cross margin account (note that the futures accounts are separate)

### [#](#futures-trading) Futures trading

The API operation of the perpetual contract of the portfolio margin account is exactly the same as that of the classic account, but currently only supports USD settlement

TIP

In the futures trading, it should be noted that there is no compatibility for cross-margin accounts like using the API Key of the classic account in spot trading. Therefore, when using the API Key of the classic account for futures trading, assets are kept under `classic account-futures`, and when using portfolio margin account API Key for futures trading, assets are kept under `portfolio margin account-futures`. These two are different futures accounts. In addition, funds under `classic account-spot` cannot share margin with `classic account-futures`.

## [#](#trace-id) Trace ID

The API response will carry the header: X-Gate-Trace-ID . This header is used for tracking.

## [#](#self-trade-prevention-stp) Self-Trade Prevention (STP)

### [#](#concepts) Concepts

**Self-Trade Prevention**: STP will prevent any user's orders from being matched with each other.

**CN**: Cancel new, Cancel new orders and keep old ones.

**CO**: Cancel old, Cancel old orders and keep new ones.

**CB**: Cancel both, Both old and new orders will be cancelled.

### [#](#stp-strategies) STP Strategies

We support three STP strategies, which are `CN` , `CO` and `CB`.

STP is achieved by adding users to one STP trading group. When a user in a STP group place orders, and trading could happen with existing orders of users in the same group, orders will be cancelled. The prevention strategy depends on the `stp_act` parameter specified when placing the order as taker. If not specified, the `CN` strategy will be used by default.

A user has to be added to a STP trading group before using STP. When a user does not belong to any STP trading group, and place orders with the `stp_act` parameter, the orders will be rejected.

### [#](#api-parameter-adjustment) API Parameter Adjustment

Take placing futures order as an example:

```
POST /futures/{settle}/orders
```

New request body parameter:

| Name | Position | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp\_act | body | string | No | STP Strategies, including:  
\- cn  
\- co  
\- cb |

New response fields:

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| stp\_act | string | No | none | STP Strategies, including:  
\- cn  
\- co  
\- cb |
| stp\_id | integer(int64) | No | readonly | The ID of the STP trading group to which user belongs. |
| finish\_as | string | No | readonly | order finish type:  
\- **stp: The order has been canceled due to the `STP`** |

### [#](#user-case) User case

There are multiple accounts under `Organization A`, and the IDs of several accounts are `101`, `102`, and `103`

In order to prevent self-trading of orders placed by internal accounts of the organization, the administrator created a STP trading group with group ID `100`, and added accounts `101` and `102` to the STP trading group. In this case, the members in the group are `[101,102]`.

T1: The `STP` strategy version released.

T2: After the `organization A` account `101` places a short order, there is no matching order in the market order book to match the transaction. At this time, the role of the order is `maker`, and the order status is `open`. The key response fields returned are:

```
{
	"status":"open",
	"stp_act":"cn",
	"stp_id":100
}
```

T3: `Organization A` account `101`/`102` places a long order, and it can reach a trade with account 101’s short order. The match engine finds both two orders' stp\_id are 100, so it applies the STP strategy of the taker order, which defaults to `cn` , and cancels the long order. Order's `finish_as` will be set to `stp`. The key response fields returned are:

```
{
	"status":"finished",
	"stp_act":"cn",
	"stp_id":100,
	"finish_as":"stp"
}
```

-   If `stp_act` is `co` , the order placed by `taker` will be retained, the order status will be `open`, and the system will cancel the order of `maker`.
    
-   If `stp_act` is `cb`, both the long and short orders will be cancelled. Orders' `finish_as` will be set to `stp`. The key response fields returned are:
    

```
{
	"status":"finished",
	"stp_act":"cb",
	"stp_id":100,
	"finish_as":"stp"
}
```

T3': If account 103 places a long order, and it can reach a trade with account 101’s short order, the transaction will be made since account 103 has not been added to account 101’s STP group. The key response fields returned are:

```
{
	"status":"finished",
	"stp_id":0,
	"finish_as":"filled"
}
```

## [#](#unified-account) Unified Account

### [#](#description) Description

Once a user upgrades their account to the unified account, they can utilize the assets from their spot account as collateral for trading. The assets in the account, denominated in various currencies, will be adjusted based on their liquidity and converted to USD for consistent calculation of the account's assets and position value.

The maximum borrowing limit for margin trading represents the maximum amount that a user can borrow for a given trading market. The platform calculates the user's maximum borrowing limit based on factors such as available margin and platform risk control rules. Once the margin trading generates automatic borrowing, the platform immediately starts accruing interest on the borrowed digital assets.

Currently, the ability to switch to `cross_margin` or`usdt_futures` mode is available. In the future, we will gradually introduce support for various combination margin accounts, including `Futures`, `Delivery`, `Options` and more. Stay tuned for further updates.

Please refer to the documentation for unified API. Once you have upgraded your account, you will be able to make use of these endpoints.

Related endpoint can be found in the Unified Account API doc. After enabling the Unified Account, you can proceed to call them. For more detailed information, please refer to [here](https://www.gate.com/unified-trading-account)

### [#](#api-integration-process) API Integration Process

-   Create a new `API KEY` or update the permissions of an existing `API KEY`, checking the `unified` permission
-   Use the classic account's `API KEY` to call the `PUT /unified/unified_mode` endpoint, or upgrade from the WEB page to the Unified Account
-   Use the `/api/v4/spot/**` API for spot-related operations (ordering, modifying orders, querying orders), with the `account=unified` option
-   Use the `/api/v4/futures/**` API for perpetual futures-related operations (ordering, modifying orders, querying orders)
-   Use the `/api/v4/unified/**` API for Unified Account-related operations (account querying, loan querying)

### [#](#spot-trading-2) SPOT Trading

The spot trading in the Unified Account is consistent with that in the classical account. In order operations, specify `account=unified`, or specify `account=spot` and the system will automatically handle the order as a unified account order when detecting the account as a unified account. For example, to place a buy order for the `BTC_USDT` currency pair, the order creation request would be similar to

```
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "unified",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

### [#](#formula) Formula

| Name | Cross Margin |
| --- | --- |
| portfolio\_margin\_total\_equity | Account Equity = ∑(Equity \* Index Price） |
| total\_margin\_balance | Account Margin Balance = ∑(Positive Equity x Index Price x Adjustment Factor) + ∑(Negative Equity x Index Price) - Haircut Loss |
| total\_initial\_margin\_rate | Account Initial Margin Level = Account Margin Balance / Account Initial Margin |
| total\_maintenance\_margin\_rate | Account Maintenance Margin Level = Account Margin Balance / Account Maintenance Margin |
| total\_initial\_margin | Account Initial Margin = Total Liabilities x Spot Initial Margin Rate |
| total\_maintenance\_margin | Account Maintenance Margin = Total Liabilities x Spot Maintenance Margin Rate |
| equity | Equity = Coin Balance - Borrowed |
| available | Available Balance = Principal + Borrowed |
| freeze | Occupied = Assets Occupied by Spot Open Orders |

## [#](#accountbook-type) AccountBook type

### [#](#general-2) General

-   unknown: Unknown
-   login: Log In
-   withdraw: Withdrawals
-   ch\_pass: Change Password
-   ch\_fund\_pass: Change Fund Pass
-   login\_failed: Login Failed
-   axs\_account: Access Account
-   req\_pass\_ch: Request Password Change
-   req\_fund\_pass\_ch: Request Fund Pass Change
-   fund\_pass\_ent: Fund Pass Entered
-   bank\_card\_add: Bank Card Added
-   frw: Face Recognition For Withdrawal

### [#](#order) Order

-   new\_order: Order Placed
-   cancel\_order: Order Cancelled
-   order\_fill: Order Filled
-   order\_rej: Order Rejected
-   order\_fee: Trading Fees
-   system\_fee: Trading Fee System Account

### [#](#withdraw-deposit) Withdraw-Deposit

-   withdraw: Withdrawals
-   deposit: Deposits
-   deposit\_rej: Deposit Rejected
-   withdraw\_rej: Withdrawal Rejected
-   cancel\_withdraw: Cancel Withdrawal
-   withdraw\_gatecode: GateCode Withdrawals
-   withdraw\_fireblock: Fireblocks Withdrawals
-   withdraw\_copper: Copper Withdrawals
-   startup\_withdraw: Token Withdrawal From Startup
-   deposit\_gatecode: GateCode Deposits
-   deposit\_fireblock: Fireblocks Deposits
-   deposit\_copper: Copper Deposits
-   buy\_cl: Buy Crypto Legend
-   buy\_cc: Buy Crypto Cabital
-   deposit\_finmo: Gate connect Finmo Deposit

### [#](#startup) Startup

-   startup\_prtcp: Startup Sale Participation
-   startup\_refund: Startup Sale Refund
-   startup\_sale: Startup Sale
-   startup\_sale\_rb: Startup Sale Rolled Back

### [#](#rebate) Rebate

-   referral\_rebate: Referral Superior Rebate
-   sec\_rebate\_out: Secondary Rebate Financial Account Transfer Out
-   sec\_rebate\_in: Affiliate Indirect Superior Rebate Income
-   ab\_rebate: API Broker Rebate Income
-   eb\_rebate: Exchange Broker Rebate Income
-   u\_rebate: Referral Rebate Income
-   ads\_rebate: Affiliate Direct Superior Rebate Income
-   au\_rebate: Affiliate User Rebate Income
-   pis\_rebate: Partner Indirect Superior Rebate Income
-   pds\_rebate: Partner Direct Superior Rebate Income
-   pu\_rebate: Partner User Rebate Income

### [#](#convert) Convert

-   eth\_swap: ETH Swap
-   dust\_swap\_dctd: Dust Swap-Small Balances Deducted
-   dust\_swap\_gt\_add: Dust Swap-GT Added
-   dust\_swap\_fee: Dust Swap-Fees Deducted
-   cv\_buy: Quick Buy-Bought
-   cv\_sell: Quick Sell-Sold

### [#](#c2c) C2C

-   c2c\_mop: C2C Merchant Order Placed
-   c2c\_moc: C2C Merchant Order Canceled
-   c2c\_rop: C2C Retail Order Placed
-   c2c\_roc: C2C Retail Order Canceled
-   c2c\_om: C2C Order Matched
-   c2c\_or: C2C Order Rejected
-   c2c\_fee: C2C Fees

### [#](#reward) Reward

-   deposit\_bonus: Deposit Bonus
-   trading\_rewards: Trading Rewards
-   purchase\_bonus: Purchase Bonus
-   airdrop: Airdrop
-   award: Award
-   mining\_rewards: Mining Rewards

### [#](#account-transfer-in-out) Account Transfer In-Out

-   margin\_in: Isolated Margin-Transferred In
-   margin\_out: Isolated Margin- Transferred Out
-   spot\_settle\_out: Spot Settlement Transfer Out
-   spot\_settle\_in: Spot Settlement Transfer Out
-   lending\_in: Lending-Transferred In
-   lending\_out: Lending-Transferred Out
-   cross\_in: PortfolioMarginAccountTransferIn
-   cross\_out: PortfolioMarginAccountTransferOut
-   perp\_in: Perps- Transferred In
-   perp\_out: Perps- Transferred Out
-   perp\_settle\_in: Perpetual Multi-currency Settlement Transfer In
-   perp\_settle\_out: Perpetual Multi-currency Settlement Transfer Out
-   delivery\_in: Delivery- Transferred In
-   delivery\_out: Delivery- Transferred Out
-   ai\_in: Auto-Invest-Transferred In
-   ai\_out: Auto-Invest-Transferred Out
-   e\_options\_in: Easy Options- Transferred In
-   e\_options\_out: Easy Options- Transferred Out
-   options\_in: Options- Transferred In
-   options\_out: Options- Transferred Out
-   cbbc\_in: CBBC- Transferred In
-   cbbc\_out: CBBC- Transferred Out
-   warrant\_in: Warrant- Transferred In
-   warrant\_out: Warrant- Transferred Out
-   subaccount\_trf: Subaccount Transfer
-   quant\_in: Quant- Transferred In
-   quant\_out: Quant- Transferred Out
-   pay\_in: Payment Account- Transferred In
-   pay\_out: Payment Account- Transferred Out
-   fct\_in: Futures Copy Trading - Funds Transfer In
-   fct\_out: Futures Copy Trading - Funds Transfer Out

### [#](#points) Points

-   points\_purchase: Points Purchase
-   points\_expiration: Points With Expiration
-   points\_trf: Points Transfer
-   points\_trf\_rej: Points Transfer Rejected

### [#](#finance) Finance

-   lending\_lent: Lending-Lent
-   collected: Collected
-   interest\_in: Interest Income
-   lending\_fee: Lending-Fees Deducted
-   hodl\_int: HODL Interest
-   redeem: Redeem
-   lend: Lend
-   dual\_purchased: Dual C-Purchased
-   dual\_settled: Dual C-Settled
-   liq\_add: Liquidity Added
-   liq\_rm: Liquidity Removed
-   liq\_rebalanced: Liquidity Rebalanced
-   slot\_int\_in: Slot Auction Staking Interest Income
-   str\_int\_in: Structured Products Staking Interest Income

### [#](#loan) Loan

-   borrow: Borrow
-   repay: Repay
-   margin\_borrow: Isolated Margin-Transferred In
-   margin\_repay: Isolated Margin- Transferred Out
-   margin\_interest\_out: Isolated Margin-Interest Deduction
-   cl\_borrow: Cryptoloan- Borrowed
-   cl\_repay: Cryptoloan- Repaid
-   cl\_dctd: Cryptoloan- Collateral Deducted
-   cl\_rtd: Cryptoloan- Collateral Returned
-   cross\_borrow: PortfolioMarginAccountBorrowIn
-   cross\_repay: PortfolioMarginAccountRepay
-   interest\_out: Interest

### [#](#moments) Moments

-   donation: Donation
-   rp\_sent: Red Packet Sent
-   rp\_rcvd: Red Packet Received
-   rp\_rej: Red Packet Rejected
-   ls\_offered: Live Stream-Reward Offered
-   ls\_rcvd: Live Stream- Reward Received
-   pt\_offered: Posts- Reward Offered
-   pt\_rcvd: Posts- Reward Received
-   subs\_deduct: Subscription-Fees Deducted
-   subs\_in: Subscription-Fees Received
-   subs\_refund: Subscription- Refund
-   subs\_in\_rcvd: Subscription- Refunds Received

### [#](#push-trading) PUSH Trading

-   push\_dctd: Push- Deduction
-   push\_rcvd\_dctd: Push- Received-Deducted
-   push\_canceled: Push Canceled
-   push\_rej: Push Rejected
-   push\_sent: Push Sent
-   push\_rcvd: Push Received

### [#](#copy-trading) Copy Trading

-   quant\_return: Quant- Transaction Returned
-   quant\_cmn\_in: Quant-Commission Transferred In
-   quant\_cmn\_out: Quant-Commission Transferred Out
-   quant\_cmn\_rtd: Quant-Commission Returned
-   fct\_refund: Futures Copy Trading - Funds Auto Transfer Out
-   fct\_rcvd: Futures Lead Trading - Performance Fee Received
-   fct\_fee: Futures Copy Trading - Performance Fee Paid
-   fct\_fee\_refund: Futures Copy Trading - Performance Fee Refund

### [#](#nft) NFT

-   nft\_mp: NFT Auction-Margin Paid
-   nft\_bm: NFT Auction-Bid Made
-   nft\_om: NFT Auction-Offer Made
-   ntf\_mr: NFT Auction-Margin Returned
-   nft\_amr: NFT Auction-Aborted-Margin rcvd
-   nft\_ocb: NFT Auction-Order Canceled-Back
-   nft\_fb: Fixed Price-Bought
-   nft\_fs: Fixed Price-For Sale
-   nft\_ob: NFT Make-Offer Bought
-   nft\_os: NFT Make-Offer Sale
-   nft\_cr: Cancel offer refund
-   nft\_ir: Refund for invalid offer
-   nft\_wf: Withdrawal service fee
-   nft\_wfr: Withdrawal service fee
-   ntf\_mf: Multi-copy creation service fee
-   ntf\_mfr: Multi-copy creation service fee refund
-   ntf\_royalty: Royalties
-   nft\_cd: NFT Auction-Order Canceled-Deducted
-   nft\_crd: NFT Auction-Order Canceled-Rotalty-Deducted
-   nft\_cf: crowdfunding
-   nft\_cfr: crowdfunding refund
-   nft\_ammf: Nft-Amm Frozen
-   nft\_ammw: Nft-Amm Withdraw
-   nft\_ammdf: Nft-Amm Deal Fee
-   nft\_ammd: Nft-Amm Deal

## [#](#accountbook-code) AccountBook code

-   1 : Order Placed Old
-   2 : Order Cancelled old
-   4 : Withdrawals
-   9 : Cancel GateCode Withdrawal
-   17 : GateCode Withdrawals
-   18 : Fireblocks Withdrawals
-   19 : copper withdraw
-   20 : Face Recognition For Withdrawal
-   101 : Order Placed
-   102 : Order Filled
-   103 : Order Cancelled
-   104 : Cancel Onchain Withdrawal
-   105 : Token Withdrawal From Startup
-   106 : Donation
-   107 : Startup Sale Participation
-   108 : Startup Sale Refund
-   109 : Referral Superior Rebate
-   110 : Deposits
-   111 : Interest
-   112 : Deposit Rejected
-   113 : Withdrawal Rejected
-   114 : Fund Correction
-   115 : Snapshot
-   116 : Order Rejected
-   117 : CNY1 Deposited
-   118 : Rebasing
-   120 : Transaction Rolled Back
-   121 : GateCode Deposits
-   122 : Fireblocks Deposits
-   123 : Wrongdepo Fee
-   124 : copper deposit
-   131 : Call Auction- Locked
-   132 : Call Auction- Unlocked
-   141 : ETF Asset Consolidation - Debit
-   142 : ETF Asset Consolidation - Credit
-   151 : Trading Fees
-   152 : Trading Fee System Account
-   161 : Secondary Rebate Financial Account Transfer Out
-   162 : Affiliate Indirect Superior Rebate Income
-   164 : Affiliate Direct Superior Rebate Income
-   166 : Affiliate User Rebate Income
-   171 : Order Placed Frozen
-   172 : Order Cancelled Unfrozen
-   181 : ETH Swap
-   182 : ETH2 Swap
-   191 : Referral Rebate Income
-   196 : Web3 Rebate Income
-   301 : C2C Merchant Order Placed
-   302 : C2C Merchant Order Canceled
-   303 : P2P User Sell
-   304 : C2C Retail Order Canceled
-   305 : P2P User Buy
-   306 : C2C Order Rejected
-   307 : Payment Setup
-   308 : C2C Fees
-   309 : C2C Deposit Freeze
-   310 : C2C Deposit Refund
-   311 : C2C Deposit Forfeiture
-   312 : P2P Shared Asset Order Refund
-   313 : P2P Frozen Funds
-   314 : P2P Unfrozen Funds
-   319 : Crypto Conversion Fee
-   322 : Buy Crypto Legend
-   323 : Buy Crypto Cabital
-   324 : Gate Connect-Buy
-   325 : Gate Connect-Buy
-   326 : Gate Connect-Buy
-   327 : Gate Connect-Buy
-   328 : Gate Connect-Sell
-   329 : Gate Connect-Refund
-   330 : Gate Connect-Buy
-   331 : Gate Connect-Sell
-   401 : Deposit Bonus
-   402 : Trading Rewards
-   403 : Purchase Bonus
-   404 : Airdrop
-   405 : Feedback Rewards
-   501 : IFO Claimed
-   502 : IFO Returned
-   601 : Isolated Margin - Transfer In
-   602 : Isolated Margin - Transfer Out
-   603 : Lending-Transferred In
-   604 : Lending-Transferred Out
-   605 : Isolated Margin-Transferred In
-   606 : Isolated Margin- Transferred Out
-   607 : Liquidating-Unlocked
-   608 : Liquidating-Locked
-   609 : Interest Updated
-   610 : Lending-Lent
-   611 : Collected
-   612 : Interest Income
-   613 : Lending-Fees Deducted
-   614 : Due Repayment-Unlocked
-   615 : Due Repayment-Locked
-   616 : Liquidation Fee
-   621 : Staking-Locked
-   622 : Staking-Unlocked
-   623 : Staking Interest Income
-   624 : Staking-Locked
-   625 : Staking-Unlocked
-   626 : Staking Interest Income
-   627 : HODL Interest
-   628 : HODL Interest Distribution
-   629 : HODL Interest Rolled Back
-   630 : Borrow
-   631 : Repay
-   632 : Pledge
-   633 : Collateral Refund
-   635 : Fixed Rate Loan - Interest
-   640 : Flexible Rate Loan - Borrow
-   641 : Flexible Rate Loan - Repay
-   642 : Flexible Rate Loan - Liquidate to Repay Principal
-   643 : Flexible Rate Loan - Liquidate to Repay Interest
-   644 : Flexible Rate Loan - Interest
-   645 : Pledge
-   646 : Collateral Refund
-   647 : Adjust Collateral
-   648 : Refund after Liquidation
-   649 : Liquidation Fee
-   651 : Portfolio Margin Account Transfer In
-   652 : Portfolio Margin Account Transfer Out
-   655 : Fixed Rate Loan - Borrow
-   656 : Fixed Rate Loan - Repay
-   657 : Fixed Rate Loan - Liquidate to Repay Interest
-   658 : Fixed Rate Loan - Liquidate to Repay Principal
-   659 : Cross-Currency Repayment - Transfer Out
-   660 : Cross-Currency Repayment - Transfer In
-   661 : Redeem
-   662 : Lend
-   669 : Interest
-   670 : MarginTradingBorrowed
-   671 : MarginTradingRepaid
-   672 : MarginTradingInterest
-   673 : Isolated Margin-Transferred In
-   674 : Isolated Margin- Transferred Out
-   675 : Interest Updated
-   676 : Isolated Margin-Interest Deduction
-   677 : Borrow
-   678 : Repay
-   679 : Interest
-   681 : Bonus
-   682 : Contributing Insurance Funds
-   683 : Consuming Insurance Funds
-   685 : Interest - Platform Loans
-   686 : Subscription - Fixed-term
-   687 : Redemption - Fixed-term
-   688 : Interest - Fixed-term
-   689 : Bonus - Fixed-term
-   696 : Early repayment penalty
-   697 : Refund of early repayment penalty
-   701 : Perps- Transferred In
-   702 : Perps- Transferred Out
-   703 : Delivery- Transferred In
-   704 : Delivery- Transferred Out
-   705 : Multi-currency Settlement Transfer In
-   706 : Multi-currency Settlement Transfer Out
-   721 : Stable Income - Lock
-   722 : Stable Income - Unlock
-   723 : Stable Income - Interest
-   724 : Stable Income - Lock
-   725 : Stable Income - Unlock
-   726 : Stable Income - Interest
-   727 : Structured Products - Lock
-   728 : Structured Products - Lock
-   729 : Structured Products - Unlock
-   730 : Structured Products - Interest
-   731 : Structured Products - Unlock
-   732 : Structured Products - Interest
-   733 : Hybrid Interest - Lock
-   734 : Hybrid Interest - Lock
-   735 : Hybrid Interest - Unlock
-   736 : Hybrid Interest - Interest
-   737 : Hybrid Interest - Unlock
-   738 : Hybrid Interest - Interest
-   739 : Wealth Referral Commission Rebate
-   751 : Quant Fund - Lock
-   753 : Quant Fund - Unlock
-   754 : Quant Fund - Earnings
-   761 : Lock & Earn Redeem Early
-   801 : Gift Coins Sent
-   802 : Gift Coins Received
-   803 : Gift Coins Rejected
-   804 : Live Stream-Reward Offered
-   805 : Live Stream- Reward Received
-   806 : Posts- Reward Offered
-   807 : Posts- Reward Received
-   901 : Buy Points
-   902 : Buy Points Rollback
-   903 : Time-Limited Points
-   911 : Auto-Invest-Transferred Out
-   912 : Auto-Invest-Transferred In
-   913 : Redeem points for goods
-   915 : Redeemed Points - Refund
-   917 : Expired & Recycled
-   1001 : C2C Loan Ad Posted
-   1002 : C2C Loan Ad Canceled
-   1003 : C2C Loan Order Placed
-   1004 : C2C Loan Repaid
-   1005 : C2C Loan Order Canceled
-   1006 : C2C Loan Fees
-   1007 : C2C Loan Liquidated
-   1008 : C2C Loan- Margin Added
-   1101 : Points Transfer
-   1102 : Points Transfer Refund
-   1171 : Bonus - Flexible
-   1173 : Bonus - Flexible
-   1174 : Bonus
-   1181 : Staking
-   1184 : Redemption
-   1186 : Interest
-   1191 : Staking
-   1194 : Redemption
-   1196 : Interest
-   1201 : Startup Sale
-   1202 : Startup Sale Rolled Back
-   1251 : Stake
-   1253 : Manually Redeem
-   1255 : Reward
-   1258 : Auto-Redeem
-   1301 : Dust Swap-Small Balances Deducted
-   1302 : Dust Swap-GT Added
-   1303 : Dust Swap-Fees Deducted
-   1307 : Dust Swap-Small Balances Deducted
-   1310 : Dust Swap-Small Balances Deducted
-   1311 : Dust Swap-Small Balances Deducted
-   1312 : Small Balance Convert - USDT Added
-   1322 : Convert Small Balance (USDT)
-   1323 : Convert Small Balance - USDT Added
-   1401 : Subaccount Transfer
-   1501 : Subscription-Fees Deducted
-   1502 : Subscription-Fees Received
-   1503 : Subscription- Refund
-   1504 : Subscription- Refunds Received
-   1601 : Easy Options- Transferred In
-   1602 : Easy Options- Transferred Out
-   1603 : Options- Transferred In
-   1604 : Options- Transferred Out
-   1701 : Bots - Transfer In
-   1702 : Bots - Transferred Out
-   1703 : Bots - Refund
-   1801 : CBBC- Transferred In
-   1802 : CBBC- Transferred Out
-   1811 : Warrant- Transferred In
-   1812 : Warrant- Transferred Out
-   1901 : Push- Deduction
-   1903 : Push- Received-Deducted
-   1905 : Push- Canceled
-   1906 : Push- Rejected
-   1907 : Push- Sent
-   1908 : Push- Received
-   2001 : Dual C-Purchased
-   2004 : Dual C-Settled
-   2011 : Subscription to Dip Sniper products
-   2012 : Recouped from expired Dip Sniper products
-   2021 : Subscription to Peak Sniper products
-   2022 : Recouped from expired Peak Sniper products
-   2202 : Lending Farm-Token Added
-   2203 : Lending Farm-Token Removed
-   2301 : Liquidity Added
-   2302 : Liquidity Removed
-   2303 : Liquidity Rebalanced
-   2311 : Add Liquidity
-   2312 : Remove Liquidity
-   2314 : Mining Rewards
-   2401 : Bots - Performance Fee Received
-   2402 : Bots - Performance Fee Paid
-   2403 : Bots - Performance Fee Refund
-   2501 : NFT Auction-Margin Paid
-   2502 : NFT Auction-Bid Made
-   2503 : NFT Auction-Offer Made
-   2504 : NFT Auction-Margin Returned
-   2505 : Fixed Price-Bought
-   2506 : Fixed Price-For Sale
-   2512 : NFT Auction-Aborted-Margin Received
-   2517 : NFT Auction-Order Canceled-Back
-   2518 : NFT Make\_Offer Bought
-   2519 : Cancel offer refund
-   2523 : Withdrawal service fee
-   2524 : Withdrawal service fee
-   2527 : Multi-copy creation service fee
-   2528 : Multi-copy creation service fee refund
-   2531 : Royalties
-   2532 : NFT Auction-Order Canceled-Deducted
-   2533 : Refund for invalid offer
-   2536 : NFT Make\_Offer Sale
-   2538 : NFT Auction-Order Canceled-Rotalty-Deducted
-   2539 : crowdfunding
-   2540 : crowdfunding refund
-   2541 : crowdfunding
-   2542 : crowdfunding refund
-   2551 : Nft-Amm Frozen
-   2552 : Nft-Amm Withdraw
-   2553 : Nft-Amm Deal Fee
-   2554 : Nft-Amm Deal
-   2601 : Quick Buy-Bought
-   2602 : Quick Sell-Sold
-   2603 : Repay All - Transfer Out
-   2604 : Repay All - Transfer In
-   2605 : Buy
-   2606 : Sell
-   2607 : Buy
-   2608 : Sell
-   2609 : Buy
-   2610 : Sell
-   2611 : Convert Refund
-   2612 : Buy
-   2613 : Sell
-   2614 : HODLer Airdrop
-   2701 : Mining Contract Purchased
-   2702 : Mining Balance Added to System
-   2703 : Mining Rewards Deducted From System
-   2704 : Mining Rewards Claimed
-   2706 : Mining Balance User Money Back
-   2707 : Mining Balance deducted From System
-   2801 : Slot Auction Staking-Locked
-   2802 : Slot Auction Staking-Unlocked
-   2803 : Slot Auction Staking Interest Income
-   2804 : Slot Auction Staking-Locked
-   2805 : Slot Auction Staking-Unlocked
-   2806 : Slot Auction Staking Interest Income
-   2807 : Structured Products Staking-Locked
-   2808 : Structured Products Staking-Unlocked
-   2809 : Structured Products Staking Interest Income
-   2810 : Structured Products Financial Account Staking-Locked
-   2811 : Structured Products Financial Account Staking-Unlocked
-   2812 : Structured Products Financial Account Staking Interest Income
-   2901 : Futures Competition Buy Gift Pack
-   2902 : Futures Competition Dovote Reward
-   2903 : Futures Competition Individual Ranking Reward
-   2904 : Futures Competition Team Ranking Reward
-   2905 : Futures Competition Early Bird Reward
-   2906 : Futures Competition Early Bird Reward
-   3001 : Payment Account- Transferred In
-   3008 : Payment Account- Transferred Out
-   3019 : Fiat Withdrawal
-   3020 : Refund for Fiat Withdrawal
-   3101 : Vouchers - Redeem Points
-   3102 : Coupon Center Usdtest Exchange
-   3103 : Activity Center Point Exchange
-   3104 : Exclusive Benefits
-   3105 : Vouchers - Trading Fee Rebate
-   3150 : Error in event token release
-   3151 : Paid by Loss Protection Voucher for Copier
-   3201 : Futures Copy Trading - Funds Transfer In
-   3202 : Futures Copy Trading - Funds Transfer Out
-   3203 : Futures Copy Trading - Funds Auto Transfer Out
-   3204 : Futures Lead Trading - Performance Fee Received
-   3205 : Futures Copy Trading - Performance Fee Paid
-   3206 : Futures Copy Trading - Performance Fee Refund
-   3301 : Affiliate Ultra Direct Superior Rebate Income
-   3302 : Gate.TR&Gate Transfer
-   3321 : Affiliate Ultra Indirect Superior Rebate Income
-   3341 : Affiliate Ultra User Rebate Income
-   3390 : API Broker Rebate Income
-   3401 : Block Trading Transfer In
-   3402 : Block Trading Transfer Out
-   3410 : Exchange Broker Rebate Income
-   3501 : card top up
-   3502 : Gate Card Cashback
-   3503 : Return Top up
-   3504 : Replace Card Fee
-   3505 : Return Card Fee
-   3506 : Card Inactivity Fee
-   3507 : Authorization
-   3508 : Reversal
-   3509 : Clearing
-   3510 : Refund
-   3511 : Repayment
-   3512 : Card Issuance Fee
-   3513 : Return Card Fee
-   3514 : Return Card Balance
-   3515 : Tax Refund
-   3516 : Points Redemption
-   3517 : Withdraw from SGD Card
-   3518 : Deposit to SGD Card
-   3601 : Spot Lead Trading - Funds Transfer In
-   3602 : Spot Lead Trading - Funds Transfer Out
-   3603 : Spot Lead Trading - Funds Auto Transfer Out
-   3604 : Spot Copy Trading - Funds Transfer In
-   3605 : Spot Copy Trading - Funds Transfer Out
-   3606 : Spot Copy Trading - Funds Auto Transfer Out
-   3607 : Spot Lead Trading - Performance Fee Received
-   3608 : Spot Copy Trading - Performance Fee Paid
-   3609 : Spot Copy Trading - Performance Fee Refund
-   3701 : OTC trade - buy
-   3702 : OTC trade - sell
-   3703 : OTC trade - cancel
-   3801 : Futures Voucher Return Transfer
-   3901 : Transfer to Pilot
-   3902 : Transfer from Pilot
-   3903 : Transfer to Spot
-   3904 : Transfer from Spot
-   3905 : Transfer to Spot
-   3906 : Transfer from Pilot
-   3920 : Event Rewards
-   3922 : Pilot Token Airdrop
-   3923 : Pilot Token Airdrop Failed
-   4002 : Withdraw Commission
-   4009 : Withdraw Rewards
-   4011 : Deducted Negative Maker Fee
-   5001 : Pre-Market OTC Trading Fee
-   5002 : Pre-Market OTC Frozen Assets (Buy)
-   5003 : Pre-Market OTC Frozen Assets (Sell)
-   5004 : Pre-Market OTC Trading Fee Refund (Order Canceled)
-   5005 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
-   5006 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
-   5007 : Pre-Market OTC Delivery Transfer Out
-   5008 : Pre-Market OTC Delivery Transfer In
-   5009 : Pre-Market OTC Unfreeze Frozen Assets (Delivery Success)
-   5011 : Compensation to Buyer
-   5012 : Pre-Market OTC Delivery Refund
-   5013 : Pre-Market OTC Trading Fee Refund (Project Canceled)
-   5014 : Pre-Market OTC Payment Refund Due to Project Cancellation (Buy)
-   5015 : Pre-Market OTC Unfreeze Frozen Assets (Sell)
-   5016 : Early Termination Fee
-   5017 : Early Termination Indemnity
-   5051 : Pre-Market - Mint - Deduct Staked Assets
-   5052 : Pre-Market - Mint - PreToken Release
-   5053 : Pre-Market - Take a Snapshot and Clear Balance Before Settlement
-   5054 : Pre-Market - Delivery - Token Delivery
-   5055 : Pre-Market - Delivery - Unstake Staked Assets
-   5056 : Pre-Market - Settlement - Token Settlement
-   5057 : Pre-Market - Settlement - Staked Assets Settlement
-   5058 : Pre-Market - Project Canceled - Staked Assets Settlement
-   5059 : Pre-Market-Unstake-Deduct PreToken
-   5060 : Pre-Market -Unstake-Unstake Staked Assets
-   5061 : Pre-Market - Increase Staked Assets
-   5062 : Pre-Market - Decrease Staked Assets
-   5104 : Fireblocks Fee Refund

## [#](#data-type) Data Type

| Type | Description |
| --- | --- |
| `string` | String type, in double quotation marks. Price and amount are also formatted in string format |
| `integer` | 32-bit integer, Mainly related to status codes, size, times, etc. |
| `integer(int64)` | 64-bit integer, Mainly involves ID and higher precision timestamp |
| `float` | Floating point number. Some time and stat fields use float. |
| `object` | Object, Contains a child object{} |
| `array` | List, Includes multiple groups of content |
| `boolean` | true is true, false is false |

## [#](#portfolio-margin-account) Portfolio Margin Account

TIP

The Portfolio Margin Account is no longer maintained, please refer to the new version of the [Unified Account](#unified-account)

Since version `4.25.0`, we start supporting portfolio margin account. Gate's Portfolio Margin Account is a new feature of Gate's trading system. Its main function is to break the capital isolation between cross-margin leverage account and USD cross-margin perpetual contract account inside a Classic Account and achieve the multi-currency margin sharing among multi-product lines. Thanks to the margin sharing, users don't need to transfer funds between the two accounts, and the profit and loss of positions among different trading products can offset each other and effectively improve the capital utilization rate. See more details in the [Help Center](/help/trade/leveraged/26421/introductions-to-gate.io-s-portfolio-margin-account)

Before using the portfolio margin account's API key, you should create the API key on the API management page. The API key supports spot and perpetual contracts trading only.

> If permissions of the API key can't be checked, ensure your cross-margin account has available balance first.

### [#](#transfer) Transfer

The classic account and portfolio margin account are two different capital isolation accounts. If you want to achieve multi-currency margin sharing among multi-product lines, use the portfolio margin account please.

The funds of the portfolio margin account come from the classic account. Due to the change of funds in the classic account, the transfer of funds can only be performed using the API Key of the classic account.

The portfolio margin account is upgraded based on the cross-margin account of the original classic account, so the classic account only needs to transfer its spot funds to the cross-margin account to deposit the portfolio margin account. Similarly, withdrawals from portfolio margin account can be achieved by the classic account performing transferals from the cross margin to its spot account.

The API Key of the portfolio margin account can only perform transferals among its own multiple accounts. Due to the sharing of margin, the portfolio margin account does not need to transfer funds to its futures account (we also restrict doing so). If the futures account has PNL funds that need to be withdrawn, it must be transferred by the portfolio margin account's API key to its cross-margin account first, so that the classic account can perform withdrawals from portfolio margin account.

### [#](#spot-trading) Spot trading

The spot trading of the portfolio margin account is almost the same as the classic account, except that `cross_margin` must be specified in the `account` parameter when placing orders. For example, if you want to place a buy order for the `BTC_USDT` currency pair, the order request will be similar to

```
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "cross_margin",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

TIP

It should be noted that the portfolio margin account is upgraded from the classic account's cross-margin account. The API Key of the classic account originally supports the operation of the cross-margin account. In order not to affect the existing operations of the classic account, we still retain this function of the classic account. So whether it is the API Key of the classic account or the portfolio margin account, both can operate the same the cross margin account (note that the futures accounts are separate)

### [#](#futures-trading) Futures trading

The API operation of the perpetual contract of the portfolio margin account is exactly the same as that of the classic account, but currently only supports USD settlement

TIP

In the futures trading, it should be noted that there is no compatibility for cross-margin accounts like using the API Key of the classic account in spot trading. Therefore, when using the API Key of the classic account for futures trading, assets are kept under `classic account-futures`, and when using portfolio margin account API Key for futures trading, assets are kept under `portfolio margin account-futures`. These two are different futures accounts. In addition, funds under `classic account-spot` cannot share margin with `classic account-futures`.

## [#](#trace-id) Trace ID

The API response will carry the header: X-Gate-Trace-ID . This header is used for tracking.

## [#](#self-trade-prevention-stp) Self-Trade Prevention (STP)

### [#](#concepts) Concepts

**Self-Trade Prevention**: STP will prevent any user's orders from being matched with each other.

**CN**: Cancel new, Cancel new orders and keep old ones.

**CO**: Cancel old, Cancel old orders and keep new ones.

**CB**: Cancel both, Both old and new orders will be cancelled.

### [#](#stp-strategies) STP Strategies

We support three STP strategies, which are `CN` , `CO` and `CB`.

STP is achieved by adding users to one STP trading group. When a user in a STP group place orders, and trading could happen with existing orders of users in the same group, orders will be cancelled. The prevention strategy depends on the `stp_act` parameter specified when placing the order as taker. If not specified, the `CN` strategy will be used by default.

A user has to be added to a STP trading group before using STP. When a user does not belong to any STP trading group, and place orders with the `stp_act` parameter, the orders will be rejected.

### [#](#api-parameter-adjustment) API Parameter Adjustment

Take placing futures order as an example:

```
POST /futures/{settle}/orders
```

New request body parameter:

| Name | Position | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp\_act | body | string | No | STP Strategies, including:  
\- cn  
\- co  
\- cb |

New response fields:

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| stp\_act | string | No | none | STP Strategies, including:  
\- cn  
\- co  
\- cb |
| stp\_id | integer(int64) | No | readonly | The ID of the STP trading group to which user belongs. |
| finish\_as | string | No | readonly | order finish type:  
\- **stp: The order has been canceled due to the `STP`** |

### [#](#user-case) User case

There are multiple accounts under `Organization A`, and the IDs of several accounts are `101`, `102`, and `103`

In order to prevent self-trading of orders placed by internal accounts of the organization, the administrator created a STP trading group with group ID `100`, and added accounts `101` and `102` to the STP trading group. In this case, the members in the group are `[101,102]`.

T1: The `STP` strategy version released.

T2: After the `organization A` account `101` places a short order, there is no matching order in the market order book to match the transaction. At this time, the role of the order is `maker`, and the order status is `open`. The key response fields returned are:

```
{
	"status":"open",
	"stp_act":"cn",
	"stp_id":100
}
```

T3: `Organization A` account `101`/`102` places a long order, and it can reach a trade with account 101’s short order. The match engine finds both two orders' stp\_id are 100, so it applies the STP strategy of the taker order, which defaults to `cn` , and cancels the long order. Order's `finish_as` will be set to `stp`. The key response fields returned are:

```
{
	"status":"finished",
	"stp_act":"cn",
	"stp_id":100,
	"finish_as":"stp"
}
```

-   If `stp_act` is `co` , the order placed by `taker` will be retained, the order status will be `open`, and the system will cancel the order of `maker`.
    
-   If `stp_act` is `cb`, both the long and short orders will be cancelled. Orders' `finish_as` will be set to `stp`. The key response fields returned are:
    

```
{
	"status":"finished",
	"stp_act":"cb",
	"stp_id":100,
	"finish_as":"stp"
}
```

T3': If account 103 places a long order, and it can reach a trade with account 101’s short order, the transaction will be made since account 103 has not been added to account 101’s STP group. The key response fields returned are:

```
{
	"status":"finished",
	"stp_id":0,
	"finish_as":"filled"
}
```

## [#](#unified-account) Unified Account

### [#](#description) Description

Once a user upgrades their account to the unified account, they can utilize the assets from their spot account as collateral for trading. The assets in the account, denominated in various currencies, will be adjusted based on their liquidity and converted to USD for consistent calculation of the account's assets and position value.

The maximum borrowing limit for margin trading represents the maximum amount that a user can borrow for a given trading market. The platform calculates the user's maximum borrowing limit based on factors such as available margin and platform risk control rules. Once the margin trading generates automatic borrowing, the platform immediately starts accruing interest on the borrowed digital assets.

Currently, the ability to switch to `cross_margin` or`usdt_futures` mode is available. In the future, we will gradually introduce support for various combination margin accounts, including `Futures`, `Delivery`, `Options` and more. Stay tuned for further updates.

Please refer to the documentation for unified API. Once you have upgraded your account, you will be able to make use of these endpoints.

Related endpoint can be found in the Unified Account API doc. After enabling the Unified Account, you can proceed to call them. For more detailed information, please refer to [here](https://www.gate.com/unified-trading-account)

### [#](#api-integration-process) API Integration Process

-   Create a new `API KEY` or update the permissions of an existing `API KEY`, checking the `unified` permission
-   Use the classic account's `API KEY` to call the `PUT /unified/unified_mode` endpoint, or upgrade from the WEB page to the Unified Account
-   Use the `/api/v4/spot/**` API for spot-related operations (ordering, modifying orders, querying orders), with the `account=unified` option
-   Use the `/api/v4/futures/**` API for perpetual futures-related operations (ordering, modifying orders, querying orders)
-   Use the `/api/v4/unified/**` API for Unified Account-related operations (account querying, loan querying)

### [#](#spot-trading-2) SPOT Trading

The spot trading in the Unified Account is consistent with that in the classical account. In order operations, specify `account=unified`, or specify `account=spot` and the system will automatically handle the order as a unified account order when detecting the account as a unified account. For example, to place a buy order for the `BTC_USDT` currency pair, the order creation request would be similar to

```
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "unified",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

### [#](#formula) Formula

| Name | Cross Margin |
| --- | --- |
| portfolio\_margin\_total\_equity | Account Equity = ∑(Equity \* Index Price） |
| total\_margin\_balance | Account Margin Balance = ∑(Positive Equity x Index Price x Adjustment Factor) + ∑(Negative Equity x Index Price) - Haircut Loss |
| total\_initial\_margin\_rate | Account Initial Margin Level = Account Margin Balance / Account Initial Margin |
| total\_maintenance\_margin\_rate | Account Maintenance Margin Level = Account Margin Balance / Account Maintenance Margin |
| total\_initial\_margin | Account Initial Margin = Total Liabilities x Spot Initial Margin Rate |
| total\_maintenance\_margin | Account Maintenance Margin = Total Liabilities x Spot Maintenance Margin Rate |
| equity | Equity = Coin Balance - Borrowed |
| available | Available Balance = Principal + Borrowed |
| freeze | Occupied = Assets Occupied by Spot Open Orders |

## [#](#accountbook-type) AccountBook type

### [#](#general-2) General

-   unknown: Unknown
-   login: Log In
-   withdraw: Withdrawals
-   ch\_pass: Change Password
-   ch\_fund\_pass: Change Fund Pass
-   login\_failed: Login Failed
-   axs\_account: Access Account
-   req\_pass\_ch: Request Password Change
-   req\_fund\_pass\_ch: Request Fund Pass Change
-   fund\_pass\_ent: Fund Pass Entered
-   bank\_card\_add: Bank Card Added
-   frw: Face Recognition For Withdrawal

### [#](#order) Order

-   new\_order: Order Placed
-   cancel\_order: Order Cancelled
-   order\_fill: Order Filled
-   order\_rej: Order Rejected
-   order\_fee: Trading Fees
-   system\_fee: Trading Fee System Account

### [#](#withdraw-deposit) Withdraw-Deposit

-   withdraw: Withdrawals
-   deposit: Deposits
-   deposit\_rej: Deposit Rejected
-   withdraw\_rej: Withdrawal Rejected
-   cancel\_withdraw: Cancel Withdrawal
-   withdraw\_gatecode: GateCode Withdrawals
-   withdraw\_fireblock: Fireblocks Withdrawals
-   withdraw\_copper: Copper Withdrawals
-   startup\_withdraw: Token Withdrawal From Startup
-   deposit\_gatecode: GateCode Deposits
-   deposit\_fireblock: Fireblocks Deposits
-   deposit\_copper: Copper Deposits
-   buy\_cl: Buy Crypto Legend
-   buy\_cc: Buy Crypto Cabital
-   deposit\_finmo: Gate connect Finmo Deposit

### [#](#startup) Startup

-   startup\_prtcp: Startup Sale Participation
-   startup\_refund: Startup Sale Refund
-   startup\_sale: Startup Sale
-   startup\_sale\_rb: Startup Sale Rolled Back

### [#](#rebate) Rebate

-   referral\_rebate: Referral Superior Rebate
-   sec\_rebate\_out: Secondary Rebate Financial Account Transfer Out
-   sec\_rebate\_in: Affiliate Indirect Superior Rebate Income
-   ab\_rebate: API Broker Rebate Income
-   eb\_rebate: Exchange Broker Rebate Income
-   u\_rebate: Referral Rebate Income
-   ads\_rebate: Affiliate Direct Superior Rebate Income
-   au\_rebate: Affiliate User Rebate Income
-   pis\_rebate: Partner Indirect Superior Rebate Income
-   pds\_rebate: Partner Direct Superior Rebate Income
-   pu\_rebate: Partner User Rebate Income

### [#](#convert) Convert

-   eth\_swap: ETH Swap
-   dust\_swap\_dctd: Dust Swap-Small Balances Deducted
-   dust\_swap\_gt\_add: Dust Swap-GT Added
-   dust\_swap\_fee: Dust Swap-Fees Deducted
-   cv\_buy: Quick Buy-Bought
-   cv\_sell: Quick Sell-Sold

### [#](#c2c) C2C

-   c2c\_mop: C2C Merchant Order Placed
-   c2c\_moc: C2C Merchant Order Canceled
-   c2c\_rop: C2C Retail Order Placed
-   c2c\_roc: C2C Retail Order Canceled
-   c2c\_om: C2C Order Matched
-   c2c\_or: C2C Order Rejected
-   c2c\_fee: C2C Fees

### [#](#reward) Reward

-   deposit\_bonus: Deposit Bonus
-   trading\_rewards: Trading Rewards
-   purchase\_bonus: Purchase Bonus
-   airdrop: Airdrop
-   award: Award
-   mining\_rewards: Mining Rewards

### [#](#account-transfer-in-out) Account Transfer In-Out

-   margin\_in: Isolated Margin-Transferred In
-   margin\_out: Isolated Margin- Transferred Out
-   spot\_settle\_out: Spot Settlement Transfer Out
-   spot\_settle\_in: Spot Settlement Transfer Out
-   lending\_in: Lending-Transferred In
-   lending\_out: Lending-Transferred Out
-   cross\_in: PortfolioMarginAccountTransferIn
-   cross\_out: PortfolioMarginAccountTransferOut
-   perp\_in: Perps- Transferred In
-   perp\_out: Perps- Transferred Out
-   perp\_settle\_in: Perpetual Multi-currency Settlement Transfer In
-   perp\_settle\_out: Perpetual Multi-currency Settlement Transfer Out
-   delivery\_in: Delivery- Transferred In
-   delivery\_out: Delivery- Transferred Out
-   ai\_in: Auto-Invest-Transferred In
-   ai\_out: Auto-Invest-Transferred Out
-   e\_options\_in: Easy Options- Transferred In
-   e\_options\_out: Easy Options- Transferred Out
-   options\_in: Options- Transferred In
-   options\_out: Options- Transferred Out
-   cbbc\_in: CBBC- Transferred In
-   cbbc\_out: CBBC- Transferred Out
-   warrant\_in: Warrant- Transferred In
-   warrant\_out: Warrant- Transferred Out
-   subaccount\_trf: Subaccount Transfer
-   quant\_in: Quant- Transferred In
-   quant\_out: Quant- Transferred Out
-   pay\_in: Payment Account- Transferred In
-   pay\_out: Payment Account- Transferred Out
-   fct\_in: Futures Copy Trading - Funds Transfer In
-   fct\_out: Futures Copy Trading - Funds Transfer Out

### [#](#points) Points

-   points\_purchase: Points Purchase
-   points\_expiration: Points With Expiration
-   points\_trf: Points Transfer
-   points\_trf\_rej: Points Transfer Rejected

### [#](#finance) Finance

-   lending\_lent: Lending-Lent
-   collected: Collected
-   interest\_in: Interest Income
-   lending\_fee: Lending-Fees Deducted
-   hodl\_int: HODL Interest
-   redeem: Redeem
-   lend: Lend
-   dual\_purchased: Dual C-Purchased
-   dual\_settled: Dual C-Settled
-   liq\_add: Liquidity Added
-   liq\_rm: Liquidity Removed
-   liq\_rebalanced: Liquidity Rebalanced
-   slot\_int\_in: Slot Auction Staking Interest Income
-   str\_int\_in: Structured Products Staking Interest Income

### [#](#loan) Loan

-   borrow: Borrow
-   repay: Repay
-   margin\_borrow: Isolated Margin-Transferred In
-   margin\_repay: Isolated Margin- Transferred Out
-   margin\_interest\_out: Isolated Margin-Interest Deduction
-   cl\_borrow: Cryptoloan- Borrowed
-   cl\_repay: Cryptoloan- Repaid
-   cl\_dctd: Cryptoloan- Collateral Deducted
-   cl\_rtd: Cryptoloan- Collateral Returned
-   cross\_borrow: PortfolioMarginAccountBorrowIn
-   cross\_repay: PortfolioMarginAccountRepay
-   interest\_out: Interest

### [#](#moments) Moments

-   donation: Donation
-   rp\_sent: Red Packet Sent
-   rp\_rcvd: Red Packet Received
-   rp\_rej: Red Packet Rejected
-   ls\_offered: Live Stream-Reward Offered
-   ls\_rcvd: Live Stream- Reward Received
-   pt\_offered: Posts- Reward Offered
-   pt\_rcvd: Posts- Reward Received
-   subs\_deduct: Subscription-Fees Deducted
-   subs\_in: Subscription-Fees Received
-   subs\_refund: Subscription- Refund
-   subs\_in\_rcvd: Subscription- Refunds Received

### [#](#push-trading) PUSH Trading

-   push\_dctd: Push- Deduction
-   push\_rcvd\_dctd: Push- Received-Deducted
-   push\_canceled: Push Canceled
-   push\_rej: Push Rejected
-   push\_sent: Push Sent
-   push\_rcvd: Push Received

### [#](#copy-trading) Copy Trading

-   quant\_return: Quant- Transaction Returned
-   quant\_cmn\_in: Quant-Commission Transferred In
-   quant\_cmn\_out: Quant-Commission Transferred Out
-   quant\_cmn\_rtd: Quant-Commission Returned
-   fct\_refund: Futures Copy Trading - Funds Auto Transfer Out
-   fct\_rcvd: Futures Lead Trading - Performance Fee Received
-   fct\_fee: Futures Copy Trading - Performance Fee Paid
-   fct\_fee\_refund: Futures Copy Trading - Performance Fee Refund

### [#](#nft) NFT

-   nft\_mp: NFT Auction-Margin Paid
-   nft\_bm: NFT Auction-Bid Made
-   nft\_om: NFT Auction-Offer Made
-   ntf\_mr: NFT Auction-Margin Returned
-   nft\_amr: NFT Auction-Aborted-Margin rcvd
-   nft\_ocb: NFT Auction-Order Canceled-Back
-   nft\_fb: Fixed Price-Bought
-   nft\_fs: Fixed Price-For Sale
-   nft\_ob: NFT Make-Offer Bought
-   nft\_os: NFT Make-Offer Sale
-   nft\_cr: Cancel offer refund
-   nft\_ir: Refund for invalid offer
-   nft\_wf: Withdrawal service fee
-   nft\_wfr: Withdrawal service fee
-   ntf\_mf: Multi-copy creation service fee
-   ntf\_mfr: Multi-copy creation service fee refund
-   ntf\_royalty: Royalties
-   nft\_cd: NFT Auction-Order Canceled-Deducted
-   nft\_crd: NFT Auction-Order Canceled-Rotalty-Deducted
-   nft\_cf: crowdfunding
-   nft\_cfr: crowdfunding refund
-   nft\_ammf: Nft-Amm Frozen
-   nft\_ammw: Nft-Amm Withdraw
-   nft\_ammdf: Nft-Amm Deal Fee
-   nft\_ammd: Nft-Amm Deal

## [#](#accountbook-code) AccountBook code

-   1 : Order Placed Old
-   2 : Order Cancelled old
-   4 : Withdrawals
-   9 : Cancel GateCode Withdrawal
-   17 : GateCode Withdrawals
-   18 : Fireblocks Withdrawals
-   19 : copper withdraw
-   20 : Face Recognition For Withdrawal
-   101 : Order Placed
-   102 : Order Filled
-   103 : Order Cancelled
-   104 : Cancel Onchain Withdrawal
-   105 : Token Withdrawal From Startup
-   106 : Donation
-   107 : Startup Sale Participation
-   108 : Startup Sale Refund
-   109 : Referral Superior Rebate
-   110 : Deposits
-   111 : Interest
-   112 : Deposit Rejected
-   113 : Withdrawal Rejected
-   114 : Fund Correction
-   115 : Snapshot
-   116 : Order Rejected
-   117 : CNY1 Deposited
-   118 : Rebasing
-   120 : Transaction Rolled Back
-   121 : GateCode Deposits
-   122 : Fireblocks Deposits
-   123 : Wrongdepo Fee
-   124 : copper deposit
-   131 : Call Auction- Locked
-   132 : Call Auction- Unlocked
-   141 : ETF Asset Consolidation - Debit
-   142 : ETF Asset Consolidation - Credit
-   151 : Trading Fees
-   152 : Trading Fee System Account
-   161 : Secondary Rebate Financial Account Transfer Out
-   162 : Affiliate Indirect Superior Rebate Income
-   164 : Affiliate Direct Superior Rebate Income
-   166 : Affiliate User Rebate Income
-   171 : Order Placed Frozen
-   172 : Order Cancelled Unfrozen
-   181 : ETH Swap
-   182 : ETH2 Swap
-   191 : Referral Rebate Income
-   196 : Web3 Rebate Income
-   301 : C2C Merchant Order Placed
-   302 : C2C Merchant Order Canceled
-   303 : P2P User Sell
-   304 : C2C Retail Order Canceled
-   305 : P2P User Buy
-   306 : C2C Order Rejected
-   307 : Payment Setup
-   308 : C2C Fees
-   309 : C2C Deposit Freeze
-   310 : C2C Deposit Refund
-   311 : C2C Deposit Forfeiture
-   312 : P2P Shared Asset Order Refund
-   313 : P2P Frozen Funds
-   314 : P2P Unfrozen Funds
-   319 : Crypto Conversion Fee
-   322 : Buy Crypto Legend
-   323 : Buy Crypto Cabital
-   324 : Gate Connect-Buy
-   325 : Gate Connect-Buy
-   326 : Gate Connect-Buy
-   327 : Gate Connect-Buy
-   328 : Gate Connect-Sell
-   329 : Gate Connect-Refund
-   330 : Gate Connect-Buy
-   331 : Gate Connect-Sell
-   401 : Deposit Bonus
-   402 : Trading Rewards
-   403 : Purchase Bonus
-   404 : Airdrop
-   405 : Feedback Rewards
-   501 : IFO Claimed
-   502 : IFO Returned
-   601 : Isolated Margin - Transfer In
-   602 : Isolated Margin - Transfer Out
-   603 : Lending-Transferred In
-   604 : Lending-Transferred Out
-   605 : Isolated Margin-Transferred In
-   606 : Isolated Margin- Transferred Out
-   607 : Liquidating-Unlocked
-   608 : Liquidating-Locked
-   609 : Interest Updated
-   610 : Lending-Lent
-   611 : Collected
-   612 : Interest Income
-   613 : Lending-Fees Deducted
-   614 : Due Repayment-Unlocked
-   615 : Due Repayment-Locked
-   616 : Liquidation Fee
-   621 : Staking-Locked
-   622 : Staking-Unlocked
-   623 : Staking Interest Income
-   624 : Staking-Locked
-   625 : Staking-Unlocked
-   626 : Staking Interest Income
-   627 : HODL Interest
-   628 : HODL Interest Distribution
-   629 : HODL Interest Rolled Back
-   630 : Borrow
-   631 : Repay
-   632 : Pledge
-   633 : Collateral Refund
-   635 : Fixed Rate Loan - Interest
-   640 : Flexible Rate Loan - Borrow
-   641 : Flexible Rate Loan - Repay
-   642 : Flexible Rate Loan - Liquidate to Repay Principal
-   643 : Flexible Rate Loan - Liquidate to Repay Interest
-   644 : Flexible Rate Loan - Interest
-   645 : Pledge
-   646 : Collateral Refund
-   647 : Adjust Collateral
-   648 : Refund after Liquidation
-   649 : Liquidation Fee
-   651 : Portfolio Margin Account Transfer In
-   652 : Portfolio Margin Account Transfer Out
-   655 : Fixed Rate Loan - Borrow
-   656 : Fixed Rate Loan - Repay
-   657 : Fixed Rate Loan - Liquidate to Repay Interest
-   658 : Fixed Rate Loan - Liquidate to Repay Principal
-   659 : Cross-Currency Repayment - Transfer Out
-   660 : Cross-Currency Repayment - Transfer In
-   661 : Redeem
-   662 : Lend
-   669 : Interest
-   670 : MarginTradingBorrowed
-   671 : MarginTradingRepaid
-   672 : MarginTradingInterest
-   673 : Isolated Margin-Transferred In
-   674 : Isolated Margin- Transferred Out
-   675 : Interest Updated
-   676 : Isolated Margin-Interest Deduction
-   677 : Borrow
-   678 : Repay
-   679 : Interest
-   681 : Bonus
-   682 : Contributing Insurance Funds
-   683 : Consuming Insurance Funds
-   685 : Interest - Platform Loans
-   686 : Subscription - Fixed-term
-   687 : Redemption - Fixed-term
-   688 : Interest - Fixed-term
-   689 : Bonus - Fixed-term
-   696 : Early repayment penalty
-   697 : Refund of early repayment penalty
-   701 : Perps- Transferred In
-   702 : Perps- Transferred Out
-   703 : Delivery- Transferred In
-   704 : Delivery- Transferred Out
-   705 : Multi-currency Settlement Transfer In
-   706 : Multi-currency Settlement Transfer Out
-   721 : Stable Income - Lock
-   722 : Stable Income - Unlock
-   723 : Stable Income - Interest
-   724 : Stable Income - Lock
-   725 : Stable Income - Unlock
-   726 : Stable Income - Interest
-   727 : Structured Products - Lock
-   728 : Structured Products - Lock
-   729 : Structured Products - Unlock
-   730 : Structured Products - Interest
-   731 : Structured Products - Unlock
-   732 : Structured Products - Interest
-   733 : Hybrid Interest - Lock
-   734 : Hybrid Interest - Lock
-   735 : Hybrid Interest - Unlock
-   736 : Hybrid Interest - Interest
-   737 : Hybrid Interest - Unlock
-   738 : Hybrid Interest - Interest
-   739 : Wealth Referral Commission Rebate
-   751 : Quant Fund - Lock
-   753 : Quant Fund - Unlock
-   754 : Quant Fund - Earnings
-   761 : Lock & Earn Redeem Early
-   801 : Gift Coins Sent
-   802 : Gift Coins Received
-   803 : Gift Coins Rejected
-   804 : Live Stream-Reward Offered
-   805 : Live Stream- Reward Received
-   806 : Posts- Reward Offered
-   807 : Posts- Reward Received
-   901 : Buy Points
-   902 : Buy Points Rollback
-   903 : Time-Limited Points
-   911 : Auto-Invest-Transferred Out
-   912 : Auto-Invest-Transferred In
-   913 : Redeem points for goods
-   915 : Redeemed Points - Refund
-   917 : Expired & Recycled
-   1001 : C2C Loan Ad Posted
-   1002 : C2C Loan Ad Canceled
-   1003 : C2C Loan Order Placed
-   1004 : C2C Loan Repaid
-   1005 : C2C Loan Order Canceled
-   1006 : C2C Loan Fees
-   1007 : C2C Loan Liquidated
-   1008 : C2C Loan- Margin Added
-   1101 : Points Transfer
-   1102 : Points Transfer Refund
-   1171 : Bonus - Flexible
-   1173 : Bonus - Flexible
-   1174 : Bonus
-   1181 : Staking
-   1184 : Redemption
-   1186 : Interest
-   1191 : Staking
-   1194 : Redemption
-   1196 : Interest
-   1201 : Startup Sale
-   1202 : Startup Sale Rolled Back
-   1251 : Stake
-   1253 : Manually Redeem
-   1255 : Reward
-   1258 : Auto-Redeem
-   1301 : Dust Swap-Small Balances Deducted
-   1302 : Dust Swap-GT Added
-   1303 : Dust Swap-Fees Deducted
-   1307 : Dust Swap-Small Balances Deducted
-   1310 : Dust Swap-Small Balances Deducted
-   1311 : Dust Swap-Small Balances Deducted
-   1312 : Small Balance Convert - USDT Added
-   1322 : Convert Small Balance (USDT)
-   1323 : Convert Small Balance - USDT Added
-   1401 : Subaccount Transfer
-   1501 : Subscription-Fees Deducted
-   1502 : Subscription-Fees Received
-   1503 : Subscription- Refund
-   1504 : Subscription- Refunds Received
-   1601 : Easy Options- Transferred In
-   1602 : Easy Options- Transferred Out
-   1603 : Options- Transferred In
-   1604 : Options- Transferred Out
-   1701 : Bots - Transfer In
-   1702 : Bots - Transferred Out
-   1703 : Bots - Refund
-   1801 : CBBC- Transferred In
-   1802 : CBBC- Transferred Out
-   1811 : Warrant- Transferred In
-   1812 : Warrant- Transferred Out
-   1901 : Push- Deduction
-   1903 : Push- Received-Deducted
-   1905 : Push- Canceled
-   1906 : Push- Rejected
-   1907 : Push- Sent
-   1908 : Push- Received
-   2001 : Dual C-Purchased
-   2004 : Dual C-Settled
-   2011 : Subscription to Dip Sniper products
-   2012 : Recouped from expired Dip Sniper products
-   2021 : Subscription to Peak Sniper products
-   2022 : Recouped from expired Peak Sniper products
-   2202 : Lending Farm-Token Added
-   2203 : Lending Farm-Token Removed
-   2301 : Liquidity Added
-   2302 : Liquidity Removed
-   2303 : Liquidity Rebalanced
-   2311 : Add Liquidity
-   2312 : Remove Liquidity
-   2314 : Mining Rewards
-   2401 : Bots - Performance Fee Received
-   2402 : Bots - Performance Fee Paid
-   2403 : Bots - Performance Fee Refund
-   2501 : NFT Auction-Margin Paid
-   2502 : NFT Auction-Bid Made
-   2503 : NFT Auction-Offer Made
-   2504 : NFT Auction-Margin Returned
-   2505 : Fixed Price-Bought
-   2506 : Fixed Price-For Sale
-   2512 : NFT Auction-Aborted-Margin Received
-   2517 : NFT Auction-Order Canceled-Back
-   2518 : NFT Make\_Offer Bought
-   2519 : Cancel offer refund
-   2523 : Withdrawal service fee
-   2524 : Withdrawal service fee
-   2527 : Multi-copy creation service fee
-   2528 : Multi-copy creation service fee refund
-   2531 : Royalties
-   2532 : NFT Auction-Order Canceled-Deducted
-   2533 : Refund for invalid offer
-   2536 : NFT Make\_Offer Sale
-   2538 : NFT Auction-Order Canceled-Rotalty-Deducted
-   2539 : crowdfunding
-   2540 : crowdfunding refund
-   2541 : crowdfunding
-   2542 : crowdfunding refund
-   2551 : Nft-Amm Frozen
-   2552 : Nft-Amm Withdraw
-   2553 : Nft-Amm Deal Fee
-   2554 : Nft-Amm Deal
-   2601 : Quick Buy-Bought
-   2602 : Quick Sell-Sold
-   2603 : Repay All - Transfer Out
-   2604 : Repay All - Transfer In
-   2605 : Buy
-   2606 : Sell
-   2607 : Buy
-   2608 : Sell
-   2609 : Buy
-   2610 : Sell
-   2611 : Convert Refund
-   2612 : Buy
-   2613 : Sell
-   2614 : HODLer Airdrop
-   2701 : Mining Contract Purchased
-   2702 : Mining Balance Added to System
-   2703 : Mining Rewards Deducted From System
-   2704 : Mining Rewards Claimed
-   2706 : Mining Balance User Money Back
-   2707 : Mining Balance deducted From System
-   2801 : Slot Auction Staking-Locked
-   2802 : Slot Auction Staking-Unlocked
-   2803 : Slot Auction Staking Interest Income
-   2804 : Slot Auction Staking-Locked
-   2805 : Slot Auction Staking-Unlocked
-   2806 : Slot Auction Staking Interest Income
-   2807 : Structured Products Staking-Locked
-   2808 : Structured Products Staking-Unlocked
-   2809 : Structured Products Staking Interest Income
-   2810 : Structured Products Financial Account Staking-Locked
-   2811 : Structured Products Financial Account Staking-Unlocked
-   2812 : Structured Products Financial Account Staking Interest Income
-   2901 : Futures Competition Buy Gift Pack
-   2902 : Futures Competition Dovote Reward
-   2903 : Futures Competition Individual Ranking Reward
-   2904 : Futures Competition Team Ranking Reward
-   2905 : Futures Competition Early Bird Reward
-   2906 : Futures Competition Early Bird Reward
-   3001 : Payment Account- Transferred In
-   3008 : Payment Account- Transferred Out
-   3019 : Fiat Withdrawal
-   3020 : Refund for Fiat Withdrawal
-   3101 : Vouchers - Redeem Points
-   3102 : Coupon Center Usdtest Exchange
-   3103 : Activity Center Point Exchange
-   3104 : Exclusive Benefits
-   3105 : Vouchers - Trading Fee Rebate
-   3150 : Error in event token release
-   3151 : Paid by Loss Protection Voucher for Copier
-   3201 : Futures Copy Trading - Funds Transfer In
-   3202 : Futures Copy Trading - Funds Transfer Out
-   3203 : Futures Copy Trading - Funds Auto Transfer Out
-   3204 : Futures Lead Trading - Performance Fee Received
-   3205 : Futures Copy Trading - Performance Fee Paid
-   3206 : Futures Copy Trading - Performance Fee Refund
-   3301 : Affiliate Ultra Direct Superior Rebate Income
-   3302 : Gate.TR&Gate Transfer
-   3321 : Affiliate Ultra Indirect Superior Rebate Income
-   3341 : Affiliate Ultra User Rebate Income
-   3390 : API Broker Rebate Income
-   3401 : Block Trading Transfer In
-   3402 : Block Trading Transfer Out
-   3410 : Exchange Broker Rebate Income
-   3501 : card top up
-   3502 : Gate Card Cashback
-   3503 : Return Top up
-   3504 : Replace Card Fee
-   3505 : Return Card Fee
-   3506 : Card Inactivity Fee
-   3507 : Authorization
-   3508 : Reversal
-   3509 : Clearing
-   3510 : Refund
-   3511 : Repayment
-   3512 : Card Issuance Fee
-   3513 : Return Card Fee
-   3514 : Return Card Balance
-   3515 : Tax Refund
-   3516 : Points Redemption
-   3517 : Withdraw from SGD Card
-   3518 : Deposit to SGD Card
-   3601 : Spot Lead Trading - Funds Transfer In
-   3602 : Spot Lead Trading - Funds Transfer Out
-   3603 : Spot Lead Trading - Funds Auto Transfer Out
-   3604 : Spot Copy Trading - Funds Transfer In
-   3605 : Spot Copy Trading - Funds Transfer Out
-   3606 : Spot Copy Trading - Funds Auto Transfer Out
-   3607 : Spot Lead Trading - Performance Fee Received
-   3608 : Spot Copy Trading - Performance Fee Paid
-   3609 : Spot Copy Trading - Performance Fee Refund
-   3701 : OTC trade - buy
-   3702 : OTC trade - sell
-   3703 : OTC trade - cancel
-   3801 : Futures Voucher Return Transfer
-   3901 : Transfer to Pilot
-   3902 : Transfer from Pilot
-   3903 : Transfer to Spot
-   3904 : Transfer from Spot
-   3905 : Transfer to Spot
-   3906 : Transfer from Pilot
-   3920 : Event Rewards
-   3922 : Pilot Token Airdrop
-   3923 : Pilot Token Airdrop Failed
-   4002 : Withdraw Commission
-   4009 : Withdraw Rewards
-   4011 : Deducted Negative Maker Fee
-   5001 : Pre-Market OTC Trading Fee
-   5002 : Pre-Market OTC Frozen Assets (Buy)
-   5003 : Pre-Market OTC Frozen Assets (Sell)
-   5004 : Pre-Market OTC Trading Fee Refund (Order Canceled)
-   5005 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
-   5006 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
-   5007 : Pre-Market OTC Delivery Transfer Out
-   5008 : Pre-Market OTC Delivery Transfer In
-   5009 : Pre-Market OTC Unfreeze Frozen Assets (Delivery Success)
-   5011 : Compensation to Buyer
-   5012 : Pre-Market OTC Delivery Refund
-   5013 : Pre-Market OTC Trading Fee Refund (Project Canceled)
-   5014 : Pre-Market OTC Payment Refund Due to Project Cancellation (Buy)
-   5015 : Pre-Market OTC Unfreeze Frozen Assets (Sell)
-   5016 : Early Termination Fee
-   5017 : Early Termination Indemnity
-   5051 : Pre-Market - Mint - Deduct Staked Assets
-   5052 : Pre-Market - Mint - PreToken Release
-   5053 : Pre-Market - Take a Snapshot and Clear Balance Before Settlement
-   5054 : Pre-Market - Delivery - Token Delivery
-   5055 : Pre-Market - Delivery - Unstake Staked Assets
-   5056 : Pre-Market - Settlement - Token Settlement
-   5057 : Pre-Market - Settlement - Staked Assets Settlement
-   5058 : Pre-Market - Project Canceled - Staked Assets Settlement
-   5059 : Pre-Market-Unstake-Deduct PreToken
-   5060 : Pre-Market -Unstake-Unstake Staked Assets
-   5061 : Pre-Market - Increase Staked Assets
-   5062 : Pre-Market - Decrease Staked Assets
-   5104 : Fireblocks Fee Refund