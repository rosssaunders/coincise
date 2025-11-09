## Rate Limits

Our REST and WebSocket APIs use rate limits to protect our APIs against
malicious usage so our trading platform can operate reliably and fairly.  
When a request is rejected by our system due to rate limits, the system returns
error code 50011 (Rate limit reached. Please refer to API documentation and
throttle requests accordingly).  
The rate limit is different for each endpoint. You can find the limit for each
endpoint from the endpoint details. Rate limit definitions are detailed below:

- WebSocket login and subscription rate limits are based on connection.
- Public unauthenticated REST rate limits are based on IP address.
- Private REST rate limits are based on User ID (sub-accounts have individual
  User IDs).
- WebSocket order management rate limits are based on User ID (sub-accounts have
  individual User IDs).

### Trading-related APIs

For Trading-related APIs (place order, cancel order, and amend order) the
following conditions apply:

- Rate limits are shared across the REST and WebSocket channels.
- Rate limits for placing orders, amending orders, and cancelling orders are
  independent from each other.
- Rate limits are defined on the Instrument ID level (except Options)
- Rate limits for Options are defined based on the Instrument Family level.
  Refer to the
  [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) endpoint
  to view Instrument Family information.
- Rate limits for a multiple order endpoint and a single order endpoint are also
  independent, with the exception being when there is only one order sent to a
  multiple order endpoint, the order will be counted as a single order and adopt
  the single order rate limit.

### Sub-account rate limit

At the sub-account level, we allow a maximum of 1000 order requests per 2
seconds. Only new order requests and amendment order requests will be counted
towards this limit. The limit encompasses all requests from the endpoints below.
For batch order requests consisting of multiple orders, each order will be
counted individually. Error code 50061 is returned when the sub-account rate
limit is exceeded. The existing rate limit rule per instrument ID remains
unchanged and the existing rate limit and sub-account rate limit will operate in
parallel. If clients require a higher rate limit, clients can trade via multiple
sub-accounts.

- [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
- [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
- [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
- [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
- [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
- [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
- [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
- [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

### Fill ratio based sub-account rate limit

This is only applicable to >= VIP5 customers.  
As an incentive for more efficient trading, the exchange will offer a higher
sub-account rate limit to clients with a high trade fill ratio.

The exchange calculates two ratios based on the transaction data from the past 7
days at 00:00 UTC.

1.  Sub-account fill ratio: This ratio is determined by dividing (the trade
    volume in USDT of the sub-account) by (sum of (new and amendment request
    count per symbol \* symbol multiplier) of the sub-account). Note that the
    master trading account itself is also considered as a sub-account in this
    context.
2.  Master account aggregated fill ratio: This ratio is calculated by dividing
    (the trade volume in USDT on the master account level) by (the sum (new and
    amendment count per symbol \* symbol multiplier\] of all sub-accounts).

The symbol multiplier allows for fine-tuning the weight of each symbol. A
smaller symbol multiplier (<1) is used for smaller pairs that require more
updates per trading volume. All instruments have a default symbol multiplier,
and some instruments will have overridden symbol multipliers.

| InstType          | Override rule     | Overridden symbol multiplier | Default symbol multiplier |
| ----------------- | ----------------- | ---------------------------- | ------------------------- |
| Perpetual Futures | Per instrument ID | `1`                          |

Instrument ID:  
BTC-USDT-SWAP  
BTC-USD-SWAP  
ETH-USDT-SWAP  
ETH-USD-SWAP | `0.2` | | Expiry Futures | Per instrument Family | `0.3`  
Instrument Family:  
BTC-USDT  
BTC-USD  
ETH-USDT  
ETH-USD | `0.1` | | Spot | Per instrument ID | `0.5`  
Instrument ID:  
BTC-USDT  
ETH-USDT | `0.1` | | Options | Per instrument Family | | `0.1` |

The fill ratio computation excludes block trading, spread trading, MMP and fiat
orders for order count; and excludes block trading, spread trading for trade
volume. Only successful order requests (sCode=0) are considered.

At 08:00 UTC, the system will use the maximum value between the sub-account fill
ratio and the master account aggregated fill ratio based on the data snapshot at
00:00 UTC to determine the sub-account rate limit based on the table below. For
broker (non-disclosed) clients, the system considers the sub-account fill ratio
only.

|        | Fill ratio\[x<=ratio<y) | Sub-account rate limit per 2 seconds(new and amendment) |
| ------ | ----------------------- | ------------------------------------------------------- |
| Tier 1 | \[0,1)                  | 1,000                                                   |
| Tier 2 | \[1,2)                  | 1,250                                                   |
| Tier 3 | \[2,3)                  | 1,500                                                   |
| Tier 4 | \[3,5)                  | 1,750                                                   |
| Tier 5 | \[5,10)                 | 2,000                                                   |
| Tier 6 | \[10,20)                | 2,500                                                   |
| Tier 7 | \[20,50)                | 3,000                                                   |
| Tier 8 | \>= 50                  | 10,000                                                  |

If there is an improvement in the fill ratio and rate limit to be uplifted, the
uplift will take effect immediately at 08:00 UTC. However, if the fill ratio
decreases and the rate limit needs to be lowered, a one-day grace period will be
granted, and the lowered rate limit will only be implemented on T+1 at 08:00
UTC. On T+1, if the fill ratio improves, the higher rate limit will be applied
accordingly. In the event of client demotion to VIP4, their rate limit will be
downgraded to Tier 1, accompanied by a one-day grace period.

If the 7-day trading volume of a sub-account is less than 1,000,000 USDT, the
fill ratio of the master account will be applied to it.

For newly created sub-accounts, the Tier 1 rate limit will be applied at
creation until T+1 8am UTC, at which the normal rules will be applied.

Block trading, spread trading, MMP and spot/margin orders are exempted from the
sub-account rate limit.

The exchange offers
[GET / Account rate limit](/docs-v5/en/#order-book-trading-trade-get-account-rate-limit)
endpoint that provides ratio and rate limit data, which will be updated daily at
8am UTC. It will return the sub-account fill ratio, the master account
aggregated fill ratio, current sub-account rate limit and sub-account rate limit
on T+1 (applicable if the rate limit is going to be demoted).

The fill ratio and rate limit calculation example is shown below. Client has 3
accounts, symbol multiplier for BTC-USDT-SWAP = 1 and XRP-USDT = 0.1.

1.  Account A (master account):
    1.  BTC-USDT-SWAP trade volume = 100 USDT, order count = 10;
    2.  XRP-USDT trade volume = 20 USDT, order count = 15;
    3.  Sub-account ratio = (100+20) / (10 \* 1 + 15 \* 0.1) = 10.4
2.  Account B (sub-account):
    1.  BTC-USDT-SWAP trade volume = 200 USDT, order count = 100;
    2.  XRP-USDT trade volume = 20 USDT, order count = 30;
    3.  Sub-account ratio = (200+20) / (100 \* 1 + 30 \* 0.1) = 2.13
3.  Account C (sub-account):
    1.  BTC-USDT-SWAP trade volume = 300 USDT, order count = 1000;
    2.  XRP-USDT trade volume = 20 USDT, order count = 45;
    3.  Sub-account ratio = (300+20) / (100 \* 1 + 45 \* 0.1) = 3.06
4.  Master account aggregated fill ratio = (100+20+200+20+300+20) / (10 \* 1 +
    15 \* 0.1 + 100 \* 1 + 30 \* 0.1 + 100 \* 1 + 45 \* 0.1) = 3.01
5.  Rate limit of accounts
    1.  Account A = max(10.4, 3.01) = 10.4 -> 2500 order requests/2s
    2.  Account B = max(2.13, 3.01) = 3.01 -> 1750 order requests/2s
    3.  Account C = max(3.06, 3.01) = 3.06 -> 1750 order requests/2s

### Best practices

If you require a higher request rate than our rate limit, you can set up
different sub-accounts to batch request rate limits. We recommend this method
for throttling or spacing out requests in order to maximize each accounts' rate
limit and avoid disconnections or rejections.
