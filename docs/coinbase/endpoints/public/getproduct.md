# GET /unknown

**Source:**
[Get single product](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproduct)

## Authentication

Not Required (Public Endpoint)

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| product\_id | string | required | ​product\_idstringrequired |

[​

](#parameter-product-id)

product\_id

string

required

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
