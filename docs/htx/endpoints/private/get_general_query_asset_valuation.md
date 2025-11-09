# GET [General]Query Asset Valuation

**Source:** [[General]Query Asset Valuation](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8172e-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

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

{

"valuation\_asset":

"BTC"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"valuation\_asset":

"BTC"

"balance":

"0.378256726579799383"

}

\]

"ts":

1614045417046

}