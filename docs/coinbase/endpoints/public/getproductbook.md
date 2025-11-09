# GET /unknown

**Source:**
[Get product book](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductbook)

## Authentication

Not Required (Public Endpoint)

## 

[​

](#details)

Details

By default, only the inside (i.e., the best) bid and ask are returned. This is equivalent to a book depth of 1 level. To see a larger order book, specify the `level` query parameter. If a level is not aggregated, all of the orders at each price are returned. Aggregated levels return only one size for each active price (as if there was only a single order for that size at the level).

## 

[​

](#levels)

Levels

| Level | Description |
| --- | --- |
| 1 | The best bid, ask and auction info |
| 2 | Full order book (aggregated) and auction info |
| 3 | Full order book (non aggregated) and auction info |

**Levels 1 and 2 are aggregated**. The `size` field is the sum of the size of the orders at that `price`, and `num-orders` is the count of orders at that `price`; `size` should not be multiplied by `num-orders`. **Level 3 is non-aggregated** and returns the entire order book.

## 

[​

](#auction-mode)

Auction Mode

While the book is in an auction, the L1, L2 and L3 book contain the most recent indicative quote disseminated during the auction, and `auction_mode` is set to true. These indicative quote messages are sent on an interval basis (approximately once a second) during the collection phase of an auction and includes information about the tentative price and size affiliated with the completion.

-   Opening Price - The price used for matching all the orders as the auction enters the opening state.
-   Opening Size - Aggregate size of all the orders eligible for crossing Best Bid/Ask Price and Size. The anticipated BBO upon entering trading after matching has completed.

Because these indicative quote messages get disseminated on an interval basis, the values aren’t firm as changes in the book may occur between the last update and beginning the transition from auction mode to trading. While in auction mode, the auction\_state indicates what phase the auction is in which includes:

| auction\_state |
| --- |
| collection |
| opening |
| complete |

## 

[​

](#auction-details)

Auction Details

The `collection` state indicates the auction is currently accepting orders and cancellations within the book. During this state, orders do not match and the book may appear crossed in the market data feeds. The `opening` state indicates the book transitions towards full trading or limit only. During `opening` state any buy orders at or over the open price and any sell orders at or below the open price may cross during the opening phase. Matches in this stage are charged taker fees. Any new orders or cancels entered while in the opening phase get queued and processed when the market resumes trading. The `complete` state indicates the dissemination of opening trades is finishing, and immediately after that the book goes into the next mode (either full trading or limit only). The `opening` state passes by too quickly in most normal scenarios to see these states show up in the REST API. During the `collection` state the `can_open` field indicates whether or not the book can complete the auction and enter full trading or limit only mode. `can_open: yes` indicates the book is in a healthy state and the book can enter full trading or limit only once the auction collection state finishes. `can_open: no` indicates the book cannot continue to full trading or limit only. Once a book leaves auction mode — either by moving to full trading, or by being canceled by our market ops team — the book endpoint no longer shows indicative quote data and display `auction_mode` as false.

This request is NOT paginated. The entire book is returned in one response.

Level 1 and Level 2 are recommended for polling. For the most up-to-date data, consider using the WebSocket stream. Level 3 is only recommended for users wishing to maintain a full real-time order book using the WebSocket stream. Abuse of Level 3 via polling can cause your access to be limited or blocked.

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| product\_id | string | required | ​product\_idstringrequired |

[​

](#parameter-product-id)

product\_id

string

required

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| level | integer | optional | ​levelintegerdefault:1 |

[​

](#parameter-level)

level

integer

default:1

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| bids | object | required | ​bidsobject\[\]required |
| asks | object | required | ​asksobject\[\]required |
| sequence | number | required | ​sequencenumberrequired |
| time | string | required | ​timestring<date-time>required |
| auction\_mode | boolean | optional |  |
| auction | object | optional | Show child attributesExample:{ "indicative\_open\_price": "333.99", "indicative\_open\_size": "0.193", "indicative\_bid\_price": "333.98", "indicative\_bid\_size": "4.39088265", "indicative\_ask\_price": "333.99", "indicative\_ask\_size": "25.23542881", "auction\_status": "CAN\_OPEN"} |

200

application/json

[​

](#response-bids)

bids

object\[\]

required

[​

](#response-asks)

asks

object\[\]

required

[​

](#response-sequence)

sequence

number

required

[​

](#response-time)

time

string<date-time>

required

[​

](#response-auction-mode)

auction\_mode

boolean

[​

](#response-auction)

auction

object

Show child attributes

Example:

```
{  "indicative_open_price": "333.99",  "indicative_open_size": "0.193",  "indicative_bid_price": "333.98",  "indicative_bid_size": "4.39088265",  "indicative_ask_price": "333.99",  "indicative_ask_size": "25.23542881",  "auction_status": "CAN_OPEN"}
```
