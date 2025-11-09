# GET /unknown

**Source:**
[Get all known trading pairs](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproducts)

## Authentication

Not Required (Public Endpoint)

**Order Size Limits Removed**The properties `base_max_size`, `base_min_size`, `max_market_funds` were [removed on June 30](/exchange/changes/changelog#2022-jun-30).The property, `min_market_funds`, has been repurposed as the notional minimum size for limit orders.

The `base_min_size` and `base_max_size` fields define the min and max order size. The `min_market_funds` and `max_market_funds` fields define the min and max funds allowed in a market order. `status_message` provides any extra information regarding the status if available. The `quote_increment` field specifies the min order price as well as the price increment. The order price must be a multiple of this increment (i.e. if the increment is 0.01, order prices of 0.001 or 0.021 would be rejected). The `base_increment` field specifies the minimum increment for the `base_currency`. `trading_disabled` indicates whether trading is currently restricted on this product, this includes whether both new orders and order cancellations are restricted. `cancel_only` indicates whether this product only accepts cancel requests for orders. `post_only` indicates whether only maker orders can be placed. No orders will be matched when post\_only mode is active. `limit_only` indicates whether this product only accepts limit orders. Only a maximum of one of `trading_disabled`, `cancel_only`, `post_only`, `limit_only` can be true at once. If none are true, the product is trading normally. `fx_stablecoin` indicates whether the currency pair is a Stable Pair. `auction_mode` boolean which indicates whether or not the book is in auction mode. For more details on the auction mode see [Get product book](/api-reference/exchange-api/rest-api/products/get-product-book) describing the level 1 book which contains information pertaining to products in auction mode.

When limit\_only is true, matching can occur if a limit order crosses the book. Product ID will not change once assigned to a product but all other fields ares subject to change.

#### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| type | string | optional |  |

[​

](#parameter-type)

type

string

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | required |  |
| base\_currency | string | required | ​base\_currencystringrequired |
| quote\_currency | string | required | ​quote\_currencystringrequired |
| quote\_increment | string | required | ​quote\_incrementstringrequired |
| base\_increment | string | required | ​base\_incrementstringrequired |
| display\_name | string | required | ​display\_namestringrequired |
| min\_market\_funds | string | required | ​min\_market\_fundsstringrequired |
| margin\_enabled | boolean | required | ​margin\_enabledbooleanrequired |
| post\_only | boolean | required | ​post\_onlybooleanrequired |
| limit\_only | boolean | required | ​limit\_onlybooleanrequired |
| cancel\_only | boolean | required | ​cancel\_onlybooleanrequired |
| status | string | required | ​statusenum<string>default:onlinerequired |
| status\_message | string | required | ​status\_messagestringrequired |
| auction\_mode | boolean | required | ​auction\_modebooleanrequired |
| trading\_disabled | boolean | optional | ​trading\_disabledboolean |
| fx\_stablecoin | boolean | optional | ​fx\_stablecoinboolean |
| max\_slippage\_percentage | string | optional | ​max\_slippage\_percentagestring |
| high\_bid\_limit\_percentage | string | optional | ​high\_bid\_limit\_percentagestring |

200

application/json

[​

](#response-id)

id

string

required

[​

](#response-base-currency)

base\_currency

string

required

[​

](#response-quote-currency)

quote\_currency

string

required

[​

](#response-quote-increment)

quote\_increment

string

required

Min order price (a.k.a. price increment

[​

](#response-base-increment)

base\_increment

string

required

[​

](#response-display-name)

display\_name

string

required

[​

](#response-min-market-funds)

min\_market\_funds

string

required

[​

](#response-margin-enabled)

margin\_enabled

boolean

required

[​

](#response-post-only)

post\_only

boolean

required

[​

](#response-limit-only)

limit\_only

boolean

required

[​

](#response-cancel-only)

cancel\_only

boolean

required

[​

](#response-status)

status

enum<string>

default:online

required

Available options:

`online`,

`offline`,

`internal`,

`delisted`

[​

](#response-status-message)

status\_message

string

required

[​

](#response-auction-mode)

auction\_mode

boolean

required

[​

](#response-trading-disabled)

trading\_disabled

boolean

[​

](#response-fx-stablecoin)

fx\_stablecoin

boolean

[​

](#response-max-slippage-percentage)

max\_slippage\_percentage

string

[​

](#response-high-bid-limit-percentage)

high\_bid\_limit\_percentage

string

Percentage to calculate highest price for limit buy order (Stable coin trading pair only)
