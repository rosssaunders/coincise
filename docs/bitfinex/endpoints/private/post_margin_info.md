# POST /v2/auth/r/info/margin/{key}

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-info-margin](https://docs.bitfinex.com/reference/rest-auth-info-margin)

post

https://api.bitfinex.com/v2/auth/r/info/margin/{key}

Get account margin information (like P/L, Swaps, Margin Balance, Tradable
Balance and others). Use different keys (base, SYMBOL, sym_all) to retrieve
different kinds of data.

Margin base response fields

| Index | Field | Type                                              | Description                                     |
| ----- | ----- | ------------------------------------------------- | ----------------------------------------------- |
| [0]   | KEY   | string                                            | Key for the request ('base')                    |
| [1]   | DATA  | [Margin base data array](#margin-base-data-array) | Response data associated with the requested key |

Margin base data array

| Index | Field          | Type  | Description                                   |
| ----- | -------------- | ----- | --------------------------------------------- |
| [0]   | USER_PL        | float | User profit and loss                          |
| [1]   | USER_SWAPS     | float | Amount of swaps a user has                    |
| [2]   | MARGIN_BALANCE | float | Balance in margin wallet                      |
| [3]   | MARGIN_NET     | float | Balance in margin wallet including P&L        |
| [4]   | MARGIN_MIN     | float | Minimum required margin for current positions |

Margin symbol response fields

Margin symbol

| Index | Field  | Type                                                  | Description                                     |
| ----- | ------ | ----------------------------------------------------- | ----------------------------------------------- |
| [0]   | KEY    | string                                                | Key for the request ('sym')                     |
| [1]   | SYMBOL | string                                                | Pair (e.g. 'tBTCUSD', 'tETHUSD', ...)           |
| [2]   | DATA   | [Margin symbol data array](#margin-symbol-data-array) | Response data associated with the requested key |

Margin sym_all

| Index   | Field               | Type                            | Description                                                                                                                  |
| ------- | ------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [0...n] | Margin symbol array | [Margin symbol](#margin-symbol) | Each index contains one of the n margin symbol arrays. This returns margin symbol data for each margin-enabled trading pair. |

Margin symbol data array

| Index | Field            | Type  | Description                                                           |
| ----- | ---------------- | ----- | --------------------------------------------------------------------- |
| [0]   | TRADABLE_BALANCE | float | Your buying power (how large a position you can obtain)               |
| [1]   | GROSS_BALANCE    | float | Your buying power including funds already reserved for open positions |
| [2]   | BUY              | float | Maximum amount you can buy at current best ASK                        |
| [3]   | SELL             | float | Maximum amount you can sell at current best BID                       |

**Ratelimit**: 90 req/min

> 📘
>
> ###
>
> Limited to Margin Trading
>
> The v2 Margin Info endpoint is limited to margin trading and does not provide
> information related to derivatives trading.

Path Params

key

string

required

"base" | SYMBOL | sym_all

RAW_BODY
