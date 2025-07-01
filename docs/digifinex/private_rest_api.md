# DigiFinex Private API Documentation

This documentation covers the private endpoints of the DigiFinex API.

Source: https://docs.digifinex.com/en-ww/spot/v3/rest.html

---

## Digifinex API Trading Rules

In order to provide a better API trading environment, avoid malicious manipulation and disruption of the market integrity, DigiFinex hereby publish risk-control quantitative indicators and anti-manipulation rules.

### Quantitative Indicators

The indicators record and calculated by all orders on certain trading pair within one time period.

- Filling Ratio（FR） FR = Total number of Filled Orders / Total Number of Orders
- Filling Weight（FW） FW = Totall Filled Amount / Total Order Amount
- Cancellation Ratio（CR） CR = Total Number of Fully-Cancelled Orders / Total Number of Orders In which the Fully-Cancelled Orders indicate orders with zero-filled amount and cancelled within 5 seconds after order placement.

### Trigger Conditions

| Indicator                | Trigger Value | Trigger Condition     | Calculating Cycle |
| ------------------------ | ------------- | --------------------- | ----------------- |
| Filling Ratio（FR）      | <0.01         | Number of Orders > 99 | 10 minutes        |
| Filling Weight（FW）     | <0.01         | Number of Orders > 49 | 10 minutes        |
| Cancellation Ratio（CR） | \>0.95        | Number of Orders > 99 | 10 minutes        |

### Risk Control and API Ban

API Users violated any anti-manipulation rules will be banned for API trading for 30 minutes. The time will extend to 24 hours after third ban within 3 hours. During that time, banned user cannot place new order through API or creat new API key, order placement and cancellation will not be affected whatsoever.

## Trading Interface List

### Interface List

### Overview

The API request may be tampered during internet, therefore all private API must be signed by your API Key (Secrete Key).

Each API Key has permission property, please check the API permission, and make sure your API key has proper permission.

Signature Method：

The signature may be different if the request text is different, therefore the request should be normalized before signing. Below signing steps take the Create New Order as an example:

1.  Create new order Parameters.

`{'symbol': 'trx_usdt', 'price': 0.01, 'amount': 1, 'type': 'buy'}`

1.  The parameters are URL encoded, and ordered based on ASCII

`symbol=trx_usdt&price=0.01&amount=1&type=buy`

1.  Use the pre-signed text and your Secret Key to generate a signature（Example: Secret:01234567890123456789abcd）:

`7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38`

1.  Put ACCESS-KEY，ACCESS-TIMESTAMP，ACCESS-SIGN（Get last step） into header.

`{'ACCESS-KEY': '0123456789abcd', 'ACCESS-TIMESTAMP': '1589872188', 'ACCESS-SIGN': '7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38'}`

1.  Request Create new order url.

`Method: Post`

`url: https://openapi.digifinex.com/v3/spot/order/new`

`headers: {'ACCESS-KEY': '0123456789abcd', 'ACCESS-TIMESTAMP': '1589872188', 'ACCESS-SIGN': '7e2d0636cab21fd41c828b8c6ce8f77e643febecdeaeab0771c01dc4d7dbef38'}`

`body: {'symbol': 'trx_usdt', 'price': 0.01, 'amount': 1, 'type': 'buy'}`

## Error codes

| code  | Description                                                                                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | Success                                                                                                                                                                  |
| 10001 | Wrong request method, please check it's a GET or POST request                                                                                                            |
| 10002 | Invalid ApiKey                                                                                                                                                           |
| 10003 | Sign doesn't match                                                                                                                                                       |
| 10004 | Illegal request parameters                                                                                                                                               |
| 10005 | Request frequency exceeds the limit                                                                                                                                      |
| 10006 | Unauthorized to execute this request                                                                                                                                     |
| 10007 | IP address Unauthorized                                                                                                                                                  |
| 10008 | Timestamp for this request is invalid                                                                                                                                    |
| 10009 | Unexist endpoint or misses ACCESS-KEY, please check endpoint URL                                                                                                         |
| 10011 | ApiKey expired. Please go to client side to re-create an ApiKey.                                                                                                         |
| 20002 | Trade of this trading pair is suspended                                                                                                                                  |
| 20007 | Price precision error                                                                                                                                                    |
| 20008 | Amount precision error                                                                                                                                                   |
| 20009 | Amount is less than the minimum requirement                                                                                                                              |
| 20010 | Cash Amount is less than the minimum requirement                                                                                                                         |
| 20011 | Insufficient balance                                                                                                                                                     |
| 20012 | Invalid trade type (valid value: buy/sell)                                                                                                                               |
| 20013 | No order info found                                                                                                                                                      |
| 20014 | Invalid date (Valid format: 2018-07-25)                                                                                                                                  |
| 20015 | Date exceeds the limit                                                                                                                                                   |
| 20018 | Your have been banned for API trading by the system                                                                                                                      |
| 20019 | Wrong trading pair symbol, correct format:"base_quote", e.g. "btc_usdt"                                                                                                  |
| 20020 | You have violated the API trading rules and temporarily banned for trading. At present, we have certain restrictions on the user's transaction rate and withdrawal rate. |
| 20021 | Invalid currency                                                                                                                                                         |
| 20022 | The ending timestamp must be larger than the starting timestamp                                                                                                          |
| 20023 | Invalid transfer type                                                                                                                                                    |
| 20024 | Invalid amount                                                                                                                                                           |
| 20025 | This currency is not transferable at the moment                                                                                                                          |
| 20026 | Transfer amount exceed your balance                                                                                                                                      |
| 20027 | Abnormal account status                                                                                                                                                  |
| 20028 | Blacklist for transfer                                                                                                                                                   |
| 20029 | Transfer amount exceed your daily limit                                                                                                                                  |
| 20030 | You have no position on this trading pair                                                                                                                                |
| 20032 | Withdrawal limited                                                                                                                                                       |
| 20033 | Wrong Withdrawal ID                                                                                                                                                      |
| 20034 | Withdrawal service of this crypto has been closed                                                                                                                        |
| 20035 | Withdrawal limit                                                                                                                                                         |
| 20036 | Withdrawal cancellation failed                                                                                                                                           |
| 20037 | The withdrawal address, Tag or chain type is not included in the withdrawal management list                                                                              |
| 20038 | The withdrawal address is not on the white list                                                                                                                          |
| 20039 | Can't be canceled in current status                                                                                                                                      |
| 20040 | Withdraw too frequently; limitation: 3 times a minute, 100 times a day                                                                                                   |
| 20041 | Beyond the daily withdrawal limit                                                                                                                                        |
| 20042 | Current trading pair does not support API trading                                                                                                                        |
| 50000 | Exception error                                                                                                                                                          |

### Response Content

| Field    | Mandatory | Request Type | Description              |
| -------- | --------- | ------------ | ------------------------ |
| ticker   | true      | object       | Trading Pair Information |
| vol      | true      | float        | 24h Volume               |
| change   | true      | float        | 24h Change               |
| base_vol | true      | float        | 24h Amount               |
| sell     | true      | float        | Ask1 Price               |
| last     | true      | float        | Last Price               |
| symbol   | true      | string       | Symbol Name              |
| low      | true      | float        | 24h Low Price            |
| buy      | true      | float        | Bid1 Price               |
| high     | true      | float        | 24h High Price           |
| date     | true      | int          | Timestamp                |
| code     | true      | int          | Status                   |

## Get orderbook

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/trades`

### Request Parameters

| Field  | Request Type | Mandatory | Description                                        |
| ------ | ------------ | --------- | -------------------------------------------------- |
| symbol | string       | true      | "btc_usdt"                                         |
| limit  | int          | false     | Limit of trades returned, default 100, maximum 500 |

> Response:

```

{
    "data": [{
        "date": 1589875415,
        "id": 2989995478,
        "amount": 0.001,
        "type": "buy",
        "price": 9661.05
    }, {
        "date": 1589875415,
        "id": 2989995473,
        "amount": 0.0005,
        "type": "buy",
        "price": 9659.99
    },
    ...
    ],
    "date": 1589875415,
    "code": 0
}

```

### Response Content

| Field  | Mandatory | Request Type | Description       |
| ------ | --------- | ------------ | ----------------- |
| data   | true      | object       | Customer's trades |
| date   | true      | int          | Timestamp         |
| id     | true      | int          | Trading ID        |
| amount | true      | float        | Volume            |
| type   | true      | str          | Trading Type      |
| price  | true      | float        | Trading Price     |
| code   | true      | int          | Status            |

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "symbol_list": [
    {
      "status": "TRADING",
      "symbol": "LTC_USDT",
      "quote_asset": "USDT",
      "base_asset": "LTC",
      "amount_precision": 4,
      "price_precision": 2,
      "minimum_amount": 0.001,
      "minimum_value": 2,
      "zone": "MAIN",
      "order_types": [
        "LIMIT",
        "MARKET"
      ]
    }
  ]
}

```

### Response Content

| Field            | Mandatory | Request Type | Description              |
| ---------------- | --------- | ------------ | ------------------------ |
| symbol_list      | true      | object       | Trading Pair Information |
| order_types      | true      | list         | Trading Type             |
| quote_asset      | true      | str          | Quote Asset              |
| minimum_value    | true      | int          | Minimum Value            |
| amount_precision | true      | int          | Volume Precision         |
| status           | true      | str          | Status                   |
| minimum_amount   | true      | float        | Minmum Amount            |
| symbol           | true      | str          | Symbol Name              |
| zone             | true      | str          | Zone                     |
| base_asset       | true      | str          | Base Asset               |
| price_precision  | true      | int          | Price Precision          |
| code             | true      | int          | Status                   |

## Currencies which support margin trading

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/margin/symbols`

### Request Parameters

No parameter is available for this endpoint.

> Response:

```

{
  "code": 0,
  "symbol_list": [
    {
      "status": "TRADING",
      "symbol": "LTC_USDT",
      "quote_asset": "USDT",
      "base_asset": "LTC",
      "amount_precision": 4,
      "price_precision": 2,
      "minimum_amount": 0.001,
      "minimum_value": 2,
      "zone": "MAIN",
      "liquidation_rate": 0.3,
      "order_types": [
        "LIMIT",
        "MARKET"
      ]
    }
  ]
}

```

### Response Content

| Field            | Mandatory | Request Type | Description                |
| ---------------- | --------- | ------------ | -------------------------- |
| symbol_list      | true      | object       | Margin trading pair symbol |
| order_types      | true      | list         | Trading Type               |
| quote_asset      | true      | str          | Quote Asset                |
| minimum_value    | true      | int          | Minimum Value              |
| amount_precision | true      | int          | Volume Precision           |
| status           | true      | str          | Status                     |
| minimum_amount   | true      | float        | Minmum Amount              |
| liquidation_rate | true      | float        | Liquidation Rate           |
| symbol           | true      | str          | Symbol Name                |
| zone             | true      | str          | Zone                       |
| base_asset       | true      | str          | Base Asset                 |
| price_precision  | true      | int          | Price Precision            |
| code             | true      | int          | Status                     |

## Whether is API trading enabled for the trading pair

### HTTP request

## Spot account assets

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/margin​/assets`

### Response Content

| Field          | Mandatory | Request Type | Description    |
| -------------- | --------- | ------------ | -------------- |
| list           | true      | object       | Account List   |
| currency       | true      | string       | Currency Name  |
| free           | true      | float        | Free           |
| total          | true      | float        | Total          |
| code           | true      | int          | Status         |
| valuation_rate | true      | float        | valuation rate |

## Spot, margin, OTC financial logs

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/{market}/order`

### Request Parameters

market：spot, margin

| Field    | Request Type | Mandatory | Description                                     |
| -------- | ------------ | --------- | ----------------------------------------------- |
| market   | str          | true      | "spot","margin"                                 |
| order_id | str          | true      | Order ID list, separated by commas, limit of 20 |

> Response:

```

{
  "code": 0,
  "data": [
    {
      "symbol": "BTC_USDT",
      "order_id": "dd3164b333a4afa9d5730bb87f6db8b3",
      "created_date": 1562303547,
      "finished_date": 0,
      "price": 0.1,
      "amount": 1,
      "cash_amount": 1,
      "executed_amount": 0,
      "avg_price": 0,
      "status": 1,
      "type": "buy",
      "kind": "margin"
    }
  ]
}

```

### Response Content

| Field           | Mandatory | Request Type | Description                                                                                                                                                    |
| --------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data            | true      | object       | Order Status List                                                                                                                                              |
| symbol          | true      | string       | Symbol Name                                                                                                                                                    |
| order_id        | true      | string       | Order ID                                                                                                                                                       |
| created_date    | true      | int          | Created Time                                                                                                                                                   |
| finished_date   | true      | int          | Finished Time                                                                                                                                                  |
| price           | true      | float        | Price                                                                                                                                                          |
| amount          | true      | float        | Volume                                                                                                                                                         |
| cash_amount     | true      | float        | Cash amount of orders, 0 for none order                                                                                                                        |
| executed_amount | true      | float        | Amount been executed                                                                                                                                           |
| avg_price       | true      | float        | Average price of amount been executed                                                                                                                          |
| status          | true      | int          | Order status, 0 for none executed, 1 for partially executed, 2 for fully executed, 3 for cancelled with none executed, 4 for cancelled with partially executed |
| type            | true      | string       | buy for limit buy order, sell for limit sell order, buy_market for market buy order, sell_market for market sell order                                         |
| kind            | true      | string       | spot, margin                                                                                                                                                   |
| code            | true      | int          | Status                                                                                                                                                         |

## Get order trades details

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/{market}/order/current`

### Request Parameters

market：spot, margin

| Field  | Request Type | Mandatory | Description     |
| ------ | ------------ | --------- | --------------- |
| market | str          | true      | "spot","margin" |
| symbol | str          | false     | Symbol Name     |

> Response:

```

{
  "code": 0,
  "data": [
    {
      "symbol": "BTC_USDT",
      "order_id": "dd3164b333a4afa9d5730bb87f6db8b3",
      "created_date": 1562303547,
      "finished_date": 0,
      "price": 0.1,
      "amount": 1,
      "cash_amount": 1,
      "executed_amount": 0,
      "avg_price": 0,
      "status": 1,
      "type": "buy",
      "kind": "margin"
    }
  ]
}

```

### Response Content

| Field           | Mandatory | Request Type | Description                                                                                                                                                    |
| --------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data            | true      | object       | Current Active Orders List                                                                                                                                     |
| symbol          | true      | string       | Symbol Name                                                                                                                                                    |
| order_id        | true      | string       | Order ID                                                                                                                                                       |
| created_date    | true      | int          | Created Time                                                                                                                                                   |
| finished_date   | true      | int          | Finished Time                                                                                                                                                  |
| price           | true      | float        | Price                                                                                                                                                          |
| amount          | true      | float        | Volume                                                                                                                                                         |
| cash_amount     | true      | float        | Cash amount of orders, 0 for none order                                                                                                                        |
| executed_amount | true      | float        | Amount been executed                                                                                                                                           |
| avg_price       | true      | float        | Average price of amount been executed                                                                                                                          |
| status          | true      | int          | Order status, 0 for none executed, 1 for partially executed, 2 for fully executed, 3 for cancelled with none executed, 4 for cancelled with partially executed |
| type            | true      | string       | buy for limit buy order, sell for limit sell order, buy_market for market buy order, sell_market for market sell order                                         |
| kind            | true      | string       | spot, margin                                                                                                                                                   |
| code            | true      | int          | Status                                                                                                                                                         |

## Get all orders (including history orders)

### HTTP Request

### HTTP Request

- GET `https://openapi.digifinex.com/v3/{market}/mytrades`

### Request Parameters

market：spot, margin

| Field      | Request Type | Mandatory | Description                                               |
| ---------- | ------------ | --------- | --------------------------------------------------------- |
| market     | str          | true      | "spot","margin"                                           |
| symbol     | str          | false     | Symbol Name                                               |
| limit      | int          | false     | Default 50, maximum 500                                   |
| start_time | int          | false     | Starting time, default 3 days before now, maximum 30 days |
| end_time   | int          | false     | Ending time, default current timestamp                    |

> Response:

```

{
  "code": 0,
  "list": [
    {
      "symbol": "BTC_USDT",
      "order_id": "6707cbdcda0edfaa7f4ab509e4cbf966",
      "id": "28457",
      "price": 0.1,
      "amount": 0,
      "fee": 0.096,
      "fee_currency": "USDT",
      "timestamp": 1499865549,
      "side": "buy",
      "is_maker": true
    }
  ]
}

```

### Response Content

| Field        | Mandatory | Request Type | Description                                   |
| ------------ | --------- | ------------ | --------------------------------------------- |
| list         | true      | object       | Customer's trades List                        |
| symbol       | true      | string       | Symbol Name                                   |
| order_id     | true      | string       | Order ID                                      |
| id           | true      | string       | Trading ID                                    |
| price        | true      | float        | Trading Price                                 |
| amount       | true      | float        | Volume                                        |
| fee          | true      | float        | Fee                                           |
| fee_currency | true      | string       | Fee Currency                                  |
| timestamp    | true      | int          | Timestamp                                     |
| side         | true      | string       | Trading Type，buy,sell,buy_market,sell_market |
| is_maker     | true      | bool         | maker or taker                                |
| code         | true      | int          | Status                                        |

## Margin positions

### HTTP Request

### HTTP Request

- POST `https://openapi.digifinex.com/v3/{market}/order/new`

### Request Parameters

market：spot, margin

| Field     | Request Type | Mandatory | Description                                                                                                                                   |
| --------- | ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| market    | str          | true      | "spot","margin"                                                                                                                               |
| symbol    | str          | true      | Symbol Name                                                                                                                                   |
| type      | str          | true      | buy for limit buy order, sell for limit sell order, buy_market for market buy order, sell_market for market sell order                        |
| amount    | float        | true      | Order amount, value in quote currency for market orders and base currency in other order types                                                |
| price     | float        | false     | Order price required for limit order                                                                                                          |
| post_only | int          | false     | Default 0, enabled by 1, if enabled the order will be cancelled if it can be executed immediately, making sure there will be no market taking |

> Response:

```

{
  "code": 0,
  "order_id": "198361cecdc65f9c8c9bb2fa68faec40"
}

```

### Response Content

| Field    | Mandatory | Request Type | Description |
| -------- | --------- | ------------ | ----------- |
| order_id | true      | str          | Order ID    |
| code     | true      | int          | Status      |

## Create multiple order

### HTTP Request

### HTTP Request

- POST `https://openapi.digifinex.com/v3/{market}/order/cancel`

### Request Parameters

market：spot, margin

| Field    | Request Type | Mandatory | Description                        |
| -------- | ------------ | --------- | ---------------------------------- |
| market   | str          | true      | "spot","margin"                    |
| order_id | str          | true      | Order ID list, separated by commas |

> Response:

```

{
  "code": 0,
  "date": 1744190302,
  "success": [
    "198361cecdc65f9c8c9bb2fa68faec40",
    "3fb0d98e51c18954f10d439a9cf57de0"
  ],
  "error": [
    "78a7104e3c65cc0c5a212a53e76d0205"
  ]
}

```

### Response Content

| Field   | Mandatory | Request Type | Description           |
| ------- | --------- | ------------ | --------------------- |
| success | true      | object       | Cancel Success Orders |
| error   | true      | object       | Cancel Failed Orders  |
| code    | true      | int          | Status                |
| date    | true      | int          | date                  |

## Transfer assets among accounts

### HTTP Request

### HTTP Request

- POST `https://openapi.digifinex.com/v3/margin/position/close`

## Deposit address inquiry

This node is used to query the address of a specific currency

### HTTP request

- GET.`https://openapi.digifinex.com/v3/deposit/address`

```
curl "https://openapi.digifinex.com/v3/deposit/address?currency=btc"
```

### Response data

| fieldname  | if necessary | data type | field description                                                           | value range |
| ---------- | ------------ | --------- | --------------------------------------------------------------------------- | ----------- |
| currency   | true         | string    | currency                                                                    |             |
| address    | true         | string    | deposit address                                                             |             |
| addressTag | true         | string    | deposit address lable                                                       |             |
| chain      | true         | string    | the chain name is empty by default, and USDT has two chains: ERC20 and OMNI |             |

## Deposit history

Query the deposit history

### HTTP request

- GET.`https://openapi.digifinex.com/v3/deposit/history`

### Request parameters

| name of parameter | if necessary | type   | description                                    | default value                                                                                                                                                                                                                                | value range                               |
| ----------------- | ------------ | ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| currency          | false        | string | currency                                       | By default, the default value is null and returns to all crptos                                                                                                                                                                              | btc, ltc, bch, eth, etc ...               |
| from              | false        | int    | query initial ID                               | By default, the default value is direct correlation. When direct is' prev ', from is 1, returning from old to new ascending order; When direct is' next ', from is the ID of the most recent record, returning from the old descending order |                                           |
| size              | false        | int    | Query record size                              | 100                                                                                                                                                                                                                                          | 1-500                                     |
| direct            | false        | string | Returns to the sorting direction of the record | By default, it is "prev" (ascending)                                                                                                                                                                                                         | "Prev" (ascending) or "next" (descending) |

> Response:

```
{
  "code": 200,
  "data":
    [
      {
        "id": 1171,
        "currency": "xrp",
        "hashId": "ed03094b84eafbe4bc16e7ef766ee959885ee5bcb265872baaa9c64e1cf86c2b",
        "chain":"",
        "amount": "7.457467",
        "address": "rae93V8d2mdoUQHwBDBdM4NHCMehRJAsbm",
        "state": 3,
        "created_date": "2020-04-20 11:23:00",
        "update_date": "2020-04-20 13:23:00"
      },
      ...
    ]
}
```

### response data

| response Data | if neccesary | data type | description      | value range                                                                                          |
| ------------- | ------------ | --------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| id            | true         | long      |                  |                                                                                                      |
| currency      | true         | string    | currency         |                                                                                                      |
| hashId        | true         | string    | transaction hash |                                                                                                      |
| chain         | true         | string    | chain name       | The chain name is empty by default, and USDT has two chains: ERC20 and OMNI                          |
| amount        | true         | string    | amount           |                                                                                                      |
| address       | true         | string    | address          |                                                                                                      |
| state         | true         | int       | state            | deposit state includes: 1 (in deposit), 2 (to be confirmed), 3 (successfully deposited), 4 (stopped) |
| created_date  | true         | string    | created date     |                                                                                                      |
| update_date   | true         | string    | update date      |                                                                                                      |

## Withdrawal history

Query the withdrawal history

### HTTP request

- GET.`https://openapi.digifinex.com/v3/withdraw/history`

### Request parameters

| name of parameter | if neccesary | type   | description                                   | default value                                                                                                                                                                                                                         | value range                               |
| ----------------- | ------------ | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| currency          | false        | string | currency                                      | By default, the default value is null and returns all currencies                                                                                                                                                                      | btc, ltc, bch, eth, etc ...               |
| from              | false        | string | query initial ID                              | By default, the default value is direct correlation. When direct is' prev ', from is 1, returning from old to new ascending; When direct is' next ', from is the ID of the most recent record, returned from the old descending order |                                           |
| size              | false        | string | query record size                             | 100                                                                                                                                                                                                                                   | 1-500                                     |
| direct            | false        | string | Return to the sorting direction of the record | By default, it is "prev" (ascending)                                                                                                                                                                                                  | "Prev" (ascending) or "next" (descending) |

> Response:

```
{
  "code": 200,
  "data":
    [
      {
        "id": 1171,
        "currency": "xrp",
        "hashId": "ed03094b84eafbe4bc16e7ef766ee959885ee5bcb265872baaa9c64e1cf86c2b",
        "chain": "",
        "amount": 7.457467,
        "address": "rae93V8d2mdoUQHwBDBdM4NHCMehRJAsbm",
        "memo": "100040",
        "fee": "0.00000000",
        "state": 1,
        "created_date": "2020-04-20 11:23:00",
        "update_date": "2020-04-20 13:23:00"
      },
      ...
    ]
}
```

### Response data

| name of parameter | if neccesary | data type | description           | value range                                                                                              |
| ----------------- | ------------ | --------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| id                | true         | long      |                       |                                                                                                          |
| currency          | true         | string    | currency              |                                                                                                          |
| hashId            | true         | string    | transaction hash      |                                                                                                          |
| chain             | true         | string    | chain name            |                                                                                                          |
| amount            | true         | float     | amount                |                                                                                                          |
| address           | true         | string    | address               |                                                                                                          |
| memo              | true         | string    | address lable         |                                                                                                          |
| state             | true         | int       | state                 |                                                                                                          |
| fee               | true         | string    | fee                   | Withdrawal status includes: 1 (application in progress), 2 (to be confirmed), 3 (completed),4 (rejected) |
|                   |              |           |                       |                                                                                                          |
| created_date      | true         | string    | created date          |                                                                                                          |
| update_date       | true         | string    | date of update update |                                                                                                          |
