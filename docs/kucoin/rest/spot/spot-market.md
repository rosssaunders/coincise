---
title: spot v1.0.0
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="spot">spot v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

market

<h1 id="spot-default">Default</h1>

## Get Announcements

<a id="opId001"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v3/announcements", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v3/announcements', headers = headers)

print(r.json())

```

`GET /api/v3/announcements`

This interface can obtain the latest news announcements, and the default page
search is for announcements within a month.

<h3 id="get-announcements-parameters">Parameters</h3>

| Name        | In    | Type           | Required | Description                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPage | query | integer(int64) | false    | page number                                                                                                                                                                                                                                                                                                                                                          |
| pageSize    | query | integer(int64) | false    | page Size                                                                                                                                                                                                                                                                                                                                                            |
| annType     | query | string         | false    | Announcement types: latest-announcements , activities (latest activities), new-listings (new currency online), product-updates (product updates), vip (institutions and VIPs), maintenance-updates (system maintenance), product -updates (product news), delistings (currency offline), others, api-campaigns (API user activities), default : latest-announcements |
| lang        | query | string         | false    | Language type, the default is en_US, the specific value parameters are as follows                                                                                                                                                                                                                                                                                    |
| startTime   | query | integer(int64) | false    | Announcement online start time (milliseconds)                                                                                                                                                                                                                                                                                                                        |
| endTime     | query | integer(int64) | false    | Announcement online end time (milliseconds)                                                                                                                                                                                                                                                                                                                          |

#### Enumerated Values

| Parameter | Value                |
| --------- | -------------------- |
| annType   | latest-announcements |
| annType   | activities           |
| annType   | product-updates      |
| annType   | vip                  |
| annType   | maintenance-updates  |
| annType   | delistings           |
| annType   | others               |
| annType   | api-campaigns        |
| annType   | new-listings         |
| lang      | zh_HK                |
| lang      | ja_JP                |
| lang      | ko_KR                |
| lang      | en_US                |
| lang      | pl_PL                |
| lang      | es_ES                |
| lang      | fr_FR                |
| lang      | ar_AE                |
| lang      | it_IT                |
| lang      | id_ID                |
| lang      | nl_NL                |
| lang      | pt_PT                |
| lang      | vi_VN                |
| lang      | de_DE                |
| lang      | tr_TR                |
| lang      | ms_MY                |
| lang      | ru_RU                |
| lang      | th_TH                |
| lang      | hi_IN                |
| lang      | bn_BD                |
| lang      | fil_PH               |
| lang      | ur_PK                |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "totalNum": {
          "type": "integer",
          "description": "Total Number"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "annId": {
                "type": "integer",
                "description": "Announcement ID"
              },
              "annTitle": {
                "type": "string",
                "description": "Announcement title"
              },
              "annType": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "Announcement type"
              },
              "annDesc": {
                "type": "string",
                "description": "Announcement description"
              },
              "cTime": {
                "type": "integer",
                "description": "Announcement release time, Unix millisecond timestamp format",
                "format": "int64"
              },
              "language": {
                "type": "string",
                "description": "language type"
              },
              "annUrl": {
                "type": "string",
                "description": "Announcement link"
              }
            },
            "required": [
              "annId",
              "annTitle",
              "annType",
              "annDesc",
              "cTime",
              "language",
              "annUrl"
            ]
          }
        },
        "currentPage": {
          "type": "integer",
          "description": "Current page"
        },
        "pageSize": {
          "type": "integer",
          "description": "Page size"
        },
        "totalPage": {
          "type": "integer",
          "description": "Total Page"
        }
      },
      "required": ["totalNum", "items", "currentPage", "pageSize", "totalPage"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-announcements-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-announcements-responseschema">Response Schema</h3>

Status Code **200**

| Name           | Type           | Required | Restrictions | Description                                                  |
| -------------- | -------------- | -------- | ------------ | ------------------------------------------------------------ |
| » code         | string         | true     | none         | none                                                         |
| » data         | object         | true     | none         | none                                                         |
| »» totalNum    | integer        | true     | none         | Total Number                                                 |
| »» items       | [object]       | true     | none         | none                                                         |
| »»» annId      | integer        | true     | none         | Announcement ID                                              |
| »»» annTitle   | string         | true     | none         | Announcement title                                           |
| »»» annType    | [string]       | true     | none         | Announcement type                                            |
| »»» annDesc    | string         | true     | none         | Announcement description                                     |
| »»» cTime      | integer(int64) | true     | none         | Announcement release time, Unix millisecond timestamp format |
| »»» language   | string         | true     | none         | language type                                                |
| »»» annUrl     | string         | true     | none         | Announcement link                                            |
| »» currentPage | integer        | true     | none         | Current page                                                 |
| »» pageSize    | integer        | true     | none         | Page size                                                    |
| »» totalPage   | integer        | true     | none         | Total Page                                                   |

<aside class="success">
This operation does not require authentication
</aside>

## Get Currency

<a id="opId002"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v3/currencies/{currency}", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v3/currencies/{currency}', headers = headers)

print(r.json())

```

`GET /api/v3/currencies/{currency}`

Request the currency details of a specified currency via this endpoint.

<h3 id="get-currency-parameters">Parameters</h3>

| Name     | In    | Type   | Required | Description                                                                                                                                                                              |
| -------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chain    | query | string | false    | Support for querying the chain of currency, e.g. the available values for USDT are OMNI, ERC20, TRC20. This only applies to multi-chain currencies; no need for single-chain currencies. |
| currency | path  | string | true     | Path parameter, Currency                                                                                                                                                                 |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string",
          "description": "A unique currency code that will never change"
        },
        "name": {
          "type": "string",
          "description": "Currency name; will change after renaming"
        },
        "fullName": {
          "type": "string",
          "description": "Full currency name; will change after renaming"
        },
        "precision": {
          "type": "integer",
          "description": "Currency precision"
        },
        "confirms": {
          "type": "integer",
          "description": "Number of block confirmations"
        },
        "contractAddress": {
          "type": "string",
          "description": "Contract address"
        },
        "isMarginEnabled": {
          "type": "boolean",
          "description": "Margin support or not"
        },
        "isDebitEnabled": {
          "type": "boolean",
          "description": "Debit support or not"
        },
        "chains": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "chainName": {
                "type": "string",
                "description": "Chain name of currency"
              },
              "withdrawalMinSize": {
                "type": "string",
                "description": "Minimum withdrawal amount"
              },
              "depositMinSize": {
                "type": "string",
                "description": "Minimum deposit amount"
              },
              "withdrawFeeRate": {
                "type": "string",
                "description": "Withdraw fee rate"
              },
              "withdrawalMinFee": {
                "type": "string",
                "description": "Minimum fees charged for withdrawal"
              },
              "isWithdrawEnabled": {
                "type": "boolean",
                "description": "Withdrawal support or not"
              },
              "isDepositEnabled": {
                "type": "boolean",
                "description": "Deposit support or not"
              },
              "confirms": {
                "type": "integer",
                "description": "Number of block confirmations"
              },
              "preConfirms": {
                "type": "integer",
                "description": "The number of blocks (confirmations) for advance on-chain verification"
              },
              "contractAddress": {
                "type": "string",
                "description": "Contract address"
              },
              "withdrawPrecision": {
                "type": "integer",
                "description": "Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount"
              },
              "maxWithdraw": {
                "type": "number",
                "description": "Maximum amount of single withdrawal"
              },
              "maxDeposit": {
                "type": "string",
                "description": "Maximum amount of single deposit (only applicable to Lightning Network)"
              },
              "needTag": {
                "type": "boolean",
                "description": "Need for memo/tag or not"
              },
              "chainId": {
                "type": "string",
                "description": "Chain id of currency"
              }
            },
            "required": [
              "chainName",
              "withdrawalMinSize",
              "withdrawFeeRate",
              "withdrawalMinFee",
              "isWithdrawEnabled",
              "isDepositEnabled",
              "confirms",
              "preConfirms",
              "contractAddress",
              "withdrawPrecision",
              "needTag",
              "chainId"
            ]
          },
          "description": "Chain list"
        }
      },
      "required": [
        "currency",
        "name",
        "fullName",
        "precision",
        "isMarginEnabled",
        "isDebitEnabled",
        "chains"
      ]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-currency-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-currency-responseschema">Response Schema</h3>

Status Code **200**

| Name                  | Type     | Required | Restrictions | Description                                                                                                        |
| --------------------- | -------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| » code                | string   | true     | none         | none                                                                                                               |
| » data                | object   | true     | none         | none                                                                                                               |
| »» currency           | string   | true     | none         | A unique currency code that will never change                                                                      |
| »» name               | string   | true     | none         | Currency name; will change after renaming                                                                          |
| »» fullName           | string   | true     | none         | Full currency name; will change after renaming                                                                     |
| »» precision          | integer  | true     | none         | Currency precision                                                                                                 |
| »» confirms           | integer  | false    | none         | Number of block confirmations                                                                                      |
| »» contractAddress    | string   | false    | none         | Contract address                                                                                                   |
| »» isMarginEnabled    | boolean  | true     | none         | Margin support or not                                                                                              |
| »» isDebitEnabled     | boolean  | true     | none         | Debit support or not                                                                                               |
| »» chains             | [object] | true     | none         | Chain list                                                                                                         |
| »»» chainName         | string   | true     | none         | Chain name of currency                                                                                             |
| »»» withdrawalMinSize | string   | true     | none         | Minimum withdrawal amount                                                                                          |
| »»» depositMinSize    | string   | false    | none         | Minimum deposit amount                                                                                             |
| »»» withdrawFeeRate   | string   | true     | none         | Withdraw fee rate                                                                                                  |
| »»» withdrawalMinFee  | string   | true     | none         | Minimum fees charged for withdrawal                                                                                |
| »»» isWithdrawEnabled | boolean  | true     | none         | Withdrawal support or not                                                                                          |
| »»» isDepositEnabled  | boolean  | true     | none         | Deposit support or not                                                                                             |
| »»» confirms          | integer  | true     | none         | Number of block confirmations                                                                                      |
| »»» preConfirms       | integer  | true     | none         | The number of blocks (confirmations) for advance on-chain verification                                             |
| »»» contractAddress   | string   | true     | none         | Contract address                                                                                                   |
| »»» withdrawPrecision | integer  | true     | none         | Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount |
| »»» maxWithdraw       | number   | false    | none         | Maximum amount of single withdrawal                                                                                |
| »»» maxDeposit        | string   | false    | none         | Maximum amount of single deposit (only applicable to Lightning Network)                                            |
| »»» needTag           | boolean  | true     | none         | Need for memo/tag or not                                                                                           |
| »»» chainId           | string   | true     | none         | Chain id of currency                                                                                               |

<aside class="success">
This operation does not require authentication
</aside>

## Get All Currencies

<a id="opId003"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v3/currencies", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v3/currencies', headers = headers)

print(r.json())

```

`GET /api/v3/currencies`

Request a currency list via this endpoint. Not all currencies can currently be
used for trading.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "currency": {
            "type": "string",
            "description": "A unique currency code that will never change"
          },
          "name": {
            "type": "string",
            "description": "Currency name; will change after renaming"
          },
          "fullName": {
            "type": "string",
            "description": "Full currency name; will change after renaming"
          },
          "precision": {
            "type": "integer",
            "description": "Currency precision"
          },
          "confirms": {
            "type": "integer",
            "description": "Number of block confirmations"
          },
          "contractAddress": {
            "type": "string",
            "description": "Contract address"
          },
          "isMarginEnabled": {
            "type": "boolean",
            "description": "Margin support or not"
          },
          "isDebitEnabled": {
            "type": "boolean",
            "description": "Debit support or not"
          },
          "chains": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "chainName": {
                  "type": "string",
                  "description": "Chain name of currency"
                },
                "withdrawalMinSize": {
                  "type": "string",
                  "description": "Minimum withdrawal amount"
                },
                "depositMinSize": {
                  "type": "string",
                  "description": "Minimum deposit amount"
                },
                "withdrawFeeRate": {
                  "type": "string",
                  "description": "Withdraw fee rate"
                },
                "withdrawalMinFee": {
                  "type": "string",
                  "description": "Minimum fees charged for withdrawal"
                },
                "isWithdrawEnabled": {
                  "type": "boolean",
                  "description": "Withdrawal support or not"
                },
                "isDepositEnabled": {
                  "type": "boolean",
                  "description": "Deposit support or not"
                },
                "confirms": {
                  "type": "integer",
                  "description": "Number of block confirmations"
                },
                "preConfirms": {
                  "type": "integer",
                  "description": "The number of blocks (confirmations) for advance on-chain verification"
                },
                "contractAddress": {
                  "type": "string",
                  "description": "Contract address"
                },
                "withdrawPrecision": {
                  "type": "integer",
                  "description": "Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount"
                },
                "maxWithdraw": {
                  "type": "string",
                  "description": "Maximum amount of single withdrawal"
                },
                "maxDeposit": {
                  "type": "string",
                  "description": "Maximum amount of single deposit (only applicable to Lightning Network)"
                },
                "needTag": {
                  "type": "boolean",
                  "description": "Need for memo/tag or not"
                },
                "chainId": {
                  "type": "string",
                  "description": "Chain id of currency"
                },
                "depositFeeRate": {
                  "type": "string",
                  "description": "Deposit fee rate (some currencies have this param; the default is empty)"
                },
                "withdrawMaxFee": {
                  "type": "string",
                  "description": "Withdraw max. fee (some currencies have this param; the default is empty)"
                },
                "depositTierFee": {
                  "type": "string"
                }
              },
              "required": [
                "chainName",
                "withdrawalMinSize",
                "withdrawalMinFee",
                "isWithdrawEnabled",
                "isDepositEnabled",
                "confirms",
                "preConfirms",
                "contractAddress",
                "withdrawPrecision",
                "needTag",
                "chainId",
                "withdrawFeeRate"
              ]
            },
            "description": "Chain list"
          }
        },
        "required": [
          "currency",
          "name",
          "fullName",
          "precision",
          "confirms",
          "contractAddress",
          "isMarginEnabled",
          "isDebitEnabled",
          "chains"
        ]
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-all-currencies-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-all-currencies-responseschema">Response Schema</h3>

Status Code **200**

| Name                  | Type     | Required | Restrictions | Description                                                                                                        |
| --------------------- | -------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| » code                | string   | true     | none         | none                                                                                                               |
| » data                | [object] | true     | none         | none                                                                                                               |
| »» currency           | string   | true     | none         | A unique currency code that will never change                                                                      |
| »» name               | string   | true     | none         | Currency name; will change after renaming                                                                          |
| »» fullName           | string   | true     | none         | Full currency name; will change after renaming                                                                     |
| »» precision          | integer  | true     | none         | Currency precision                                                                                                 |
| »» confirms           | integer  | true     | none         | Number of block confirmations                                                                                      |
| »» contractAddress    | string   | true     | none         | Contract address                                                                                                   |
| »» isMarginEnabled    | boolean  | true     | none         | Margin support or not                                                                                              |
| »» isDebitEnabled     | boolean  | true     | none         | Debit support or not                                                                                               |
| »» chains             | [object] | true     | none         | Chain list                                                                                                         |
| »»» chainName         | string   | true     | none         | Chain name of currency                                                                                             |
| »»» withdrawalMinSize | string   | true     | none         | Minimum withdrawal amount                                                                                          |
| »»» depositMinSize    | string   | false    | none         | Minimum deposit amount                                                                                             |
| »»» withdrawFeeRate   | string   | true     | none         | Withdraw fee rate                                                                                                  |
| »»» withdrawalMinFee  | string   | true     | none         | Minimum fees charged for withdrawal                                                                                |
| »»» isWithdrawEnabled | boolean  | true     | none         | Withdrawal support or not                                                                                          |
| »»» isDepositEnabled  | boolean  | true     | none         | Deposit support or not                                                                                             |
| »»» confirms          | integer  | true     | none         | Number of block confirmations                                                                                      |
| »»» preConfirms       | integer  | true     | none         | The number of blocks (confirmations) for advance on-chain verification                                             |
| »»» contractAddress   | string   | true     | none         | Contract address                                                                                                   |
| »»» withdrawPrecision | integer  | true     | none         | Withdrawal precision bit, indicating the maximum supported length after the decimal point of the withdrawal amount |
| »»» maxWithdraw       | string   | false    | none         | Maximum amount of single withdrawal                                                                                |
| »»» maxDeposit        | string   | false    | none         | Maximum amount of single deposit (only applicable to Lightning Network)                                            |
| »»» needTag           | boolean  | true     | none         | Need for memo/tag or not                                                                                           |
| »»» chainId           | string   | true     | none         | Chain id of currency                                                                                               |
| »»» depositFeeRate    | string   | false    | none         | Deposit fee rate (some currencies have this param; the default is empty)                                           |
| »»» withdrawMaxFee    | string   | false    | none         | Withdraw max. fee (some currencies have this param; the default is empty)                                          |
| »»» depositTierFee    | string   | false    | none         | none                                                                                                               |

<aside class="success">
This operation does not require authentication
</aside>

## Get Symbol

<a id="opId004"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v2/symbols/{symbol}", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v2/symbols/{symbol}', headers = headers)

print(r.json())

```

`GET /api/v2/symbols/{symbol}`

Request via this endpoint to get detail currency pairs for trading. If you want
to get the market information of the trading symbol, please use Get All Tickers.

<h3 id="get-symbol--parameters">Parameters</h3>

| Name   | In   | Type   | Required | Description            |
| ------ | ---- | ------ | -------- | ---------------------- |
| symbol | path | string | true     | Path parameter, Symbol |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "unique code of a symbol, it would not change after renaming",
          "example": ["BTC-USDT", "BCHSV-USDT"]
        },
        "name": {
          "type": "string",
          "description": "Name of trading pairs, it would change after renaming",
          "example": ["BTC-USDT", "BSV-USDT"]
        },
        "baseCurrency": {
          "type": "string",
          "description": "Base currency,e.g. BTC."
        },
        "quoteCurrency": {
          "type": "string",
          "description": "Quote currency,e.g. USDT."
        },
        "feeCurrency": {
          "type": "string",
          "description": "The currency of charged fees."
        },
        "market": {
          "type": "string",
          "description": "The trading market.",
          "example": ["USDS", "BTC", "ALTS"]
        },
        "baseMinSize": {
          "type": "string",
          "description": "The minimum order quantity requried to place an order."
        },
        "quoteMinSize": {
          "type": "string",
          "description": "The minimum order funds required to place a market order."
        },
        "baseMaxSize": {
          "type": "string",
          "description": "The maximum order size required to place an order."
        },
        "quoteMaxSize": {
          "type": "string",
          "description": "The maximum order funds required to place a market order."
        },
        "baseIncrement": {
          "type": "string",
          "description": "Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001."
        },
        "quoteIncrement": {
          "type": "string",
          "description": "Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001."
        },
        "priceIncrement": {
          "type": "string",
          "description": "Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001."
        },
        "priceLimitRate": {
          "type": "string",
          "description": "Threshold for price portection"
        },
        "minFunds": {
          "type": "string",
          "description": "The minimum trading amounts"
        },
        "isMarginEnabled": {
          "type": "boolean",
          "description": "Available for margin or not."
        },
        "enableTrading": {
          "type": "boolean",
          "description": "Available for transaction or not."
        },
        "feeCategory": {
          "type": "integer",
          "description": "[Fee Type](https://www.kucoin.com/vip/privilege)",
          "enum": [1, 2, 3],
          "x-api-enum": [
            {
              "value": 1,
              "name": "classA",
              "description": "classA"
            },
            {
              "value": 2,
              "name": "classB",
              "description": "classB"
            },
            {
              "value": 3,
              "name": "classC",
              "description": "classC"
            }
          ]
        },
        "makerFeeCoefficient": {
          "type": "string",
          "description": "The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
        },
        "takerFeeCoefficient": {
          "type": "string",
          "description": "The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
        },
        "st": {
          "type": "boolean",
          "description": "Whether it is a [Special Treatment](https://www.kucoin.com/legal/special-treatment) symbol"
        },
        "callauctionIsEnabled": {
          "type": "boolean",
          "description": "The  [call auction](https://www.kucoin.com/support/40999744334105) status returns true/false"
        },
        "callauctionPriceFloor": {
          "type": "string",
          "description": "The lowest price declared in the call auction",
          "example": ["0.00001"]
        },
        "callauctionPriceCeiling": {
          "type": "string",
          "description": "The highest bid price in the call auction\n",
          "example": ["0.6"]
        },
        "callauctionFirstStageStartTime": {
          "type": "integer",
          "description": "The first phase of the call auction starts at (Allow add orders, allow cancel orders)",
          "format": "int64",
          "example": [1740470400000]
        },
        "callauctionSecondStageStartTime": {
          "type": "integer",
          "description": "The second phase of the call auction starts at (Allow add orders, don't allow cancel orders)",
          "format": "int64",
          "example": [1740473400000]
        },
        "callauctionThirdStageStartTime": {
          "type": "integer",
          "description": "The third phase of the call auction starts at (Don't allow add orders, don't allow cancel orders)",
          "format": "int64",
          "example": [1740473700000]
        },
        "tradingStartTime": {
          "type": "integer",
          "description": "Official opening time (end time of the third phase of call auction)",
          "format": "int64",
          "example": [1740474000000]
        }
      },
      "required": [
        "symbol",
        "name",
        "baseCurrency",
        "quoteCurrency",
        "feeCurrency",
        "market",
        "baseMinSize",
        "quoteMinSize",
        "baseMaxSize",
        "quoteMaxSize",
        "baseIncrement",
        "quoteIncrement",
        "priceIncrement",
        "priceLimitRate",
        "minFunds",
        "isMarginEnabled",
        "enableTrading",
        "feeCategory",
        "makerFeeCoefficient",
        "takerFeeCoefficient",
        "st",
        "callauctionIsEnabled"
      ]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-symbol--responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-symbol--responseschema">Response Schema</h3>

Status Code **200**

| Name                               | Type           | Required | Restrictions | Description                                                                                                                                                                                                                                                                                                           |
| ---------------------------------- | -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » code                             | string         | true     | none         | none                                                                                                                                                                                                                                                                                                                  |
| » data                             | object         | true     | none         | none                                                                                                                                                                                                                                                                                                                  |
| »» symbol                          | string         | true     | none         | unique code of a symbol, it would not change after renaming                                                                                                                                                                                                                                                           |
| »» name                            | string         | true     | none         | Name of trading pairs, it would change after renaming                                                                                                                                                                                                                                                                 |
| »» baseCurrency                    | string         | true     | none         | Base currency,e.g. BTC.                                                                                                                                                                                                                                                                                               |
| »» quoteCurrency                   | string         | true     | none         | Quote currency,e.g. USDT.                                                                                                                                                                                                                                                                                             |
| »» feeCurrency                     | string         | true     | none         | The currency of charged fees.                                                                                                                                                                                                                                                                                         |
| »» market                          | string         | true     | none         | The trading market.                                                                                                                                                                                                                                                                                                   |
| »» baseMinSize                     | string         | true     | none         | The minimum order quantity requried to place an order.                                                                                                                                                                                                                                                                |
| »» quoteMinSize                    | string         | true     | none         | The minimum order funds required to place a market order.                                                                                                                                                                                                                                                             |
| »» baseMaxSize                     | string         | true     | none         | The maximum order size required to place an order.                                                                                                                                                                                                                                                                    |
| »» quoteMaxSize                    | string         | true     | none         | The maximum order funds required to place a market order.                                                                                                                                                                                                                                                             |
| »» baseIncrement                   | string         | true     | none         | Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001. |
| »» quoteIncrement                  | string         | true     | none         | Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001.           |
| »» priceIncrement                  | string         | true     | none         | Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001.                                                                                             |
| »» priceLimitRate                  | string         | true     | none         | Threshold for price portection                                                                                                                                                                                                                                                                                        |
| »» minFunds                        | string         | true     | none         | The minimum trading amounts                                                                                                                                                                                                                                                                                           |
| »» isMarginEnabled                 | boolean        | true     | none         | Available for margin or not.                                                                                                                                                                                                                                                                                          |
| »» enableTrading                   | boolean        | true     | none         | Available for transaction or not.                                                                                                                                                                                                                                                                                     |
| »» feeCategory                     | integer        | true     | none         | [Fee Type](https://www.kucoin.com/vip/privilege)                                                                                                                                                                                                                                                                      |
| »» makerFeeCoefficient             | string         | true     | none         | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee                                                                                                                                      |
| »» takerFeeCoefficient             | string         | true     | none         | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee                                                                                                                                      |
| »» st                              | boolean        | true     | none         | Whether it is a [Special Treatment](https://www.kucoin.com/legal/special-treatment) symbol                                                                                                                                                                                                                            |
| »» callauctionIsEnabled            | boolean        | true     | none         | The [call auction](https://www.kucoin.com/support/40999744334105) status returns true/false                                                                                                                                                                                                                           |
| »» callauctionPriceFloor           | string         | false    | none         | The lowest price declared in the call auction                                                                                                                                                                                                                                                                         |
| »» callauctionPriceCeiling         | string         | false    | none         | The highest bid price in the call auction                                                                                                                                                                                                                                                                             |
| »» callauctionFirstStageStartTime  | integer(int64) | false    | none         | The first phase of the call auction starts at (Allow add orders, allow cancel orders)                                                                                                                                                                                                                                 |
| »» callauctionSecondStageStartTime | integer(int64) | false    | none         | The second phase of the call auction starts at (Allow add orders, don't allow cancel orders)                                                                                                                                                                                                                          |
| »» callauctionThirdStageStartTime  | integer(int64) | false    | none         | The third phase of the call auction starts at (Don't allow add orders, don't allow cancel orders)                                                                                                                                                                                                                     |
| »» tradingStartTime                | integer(int64) | false    | none         | Official opening time (end time of the third phase of call auction)                                                                                                                                                                                                                                                   |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| feeCategory | 1     |
| feeCategory | 2     |
| feeCategory | 3     |

<aside class="success">
This operation does not require authentication
</aside>

## Get All Symbols

<a id="opId005"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v2/symbols", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v2/symbols', headers = headers)

print(r.json())

```

`GET /api/v2/symbols`

Request a list of available currency pairs for trading via this endpoint. If you
want to get the market information of the trading symbol, please use Get All
Tickers.

<h3 id="get-all-symbols-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description                                                         |
| ------ | ----- | ------ | -------- | ------------------------------------------------------------------- |
| market | query | string | false    | [The trading market](https://www.kucoin.com/docs-new/api-222921786) |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "symbol": {
            "type": "string",
            "description": "Unique code of a symbol; it will not change after renaming",
            "example": ["BTC-USDT", "BCHSV-USDT"]
          },
          "name": {
            "type": "string",
            "description": "Name of trading pairs, it will change after renaming",
            "example": ["BTC-USDT", "BSV-USDT"]
          },
          "baseCurrency": {
            "type": "string",
            "description": "Base currency, e.g. BTC."
          },
          "quoteCurrency": {
            "type": "string",
            "description": "Quote currency, e.g. USDT."
          },
          "feeCurrency": {
            "type": "string",
            "description": "The currency of charged fees."
          },
          "market": {
            "type": "string",
            "description": "The trading market.",
            "example": ["USDS", "BTC", "ALTS"]
          },
          "baseMinSize": {
            "type": "string",
            "description": "The minimum order quantity required to place an order."
          },
          "quoteMinSize": {
            "type": "string",
            "description": "The minimum order funds required to place a market order."
          },
          "baseMaxSize": {
            "type": "string",
            "description": "The maximum order size required to place an order."
          },
          "quoteMaxSize": {
            "type": "string",
            "description": "The maximum order funds required to place a market order."
          },
          "baseIncrement": {
            "type": "string",
            "description": "Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001."
          },
          "quoteIncrement": {
            "type": "string",
            "description": "Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001."
          },
          "priceIncrement": {
            "type": "string",
            "description": "Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001.\n\nSpecifies the min. order price as well as the price increment.This also applies to quote currency."
          },
          "priceLimitRate": {
            "type": "string",
            "description": "Threshold for price protection"
          },
          "minFunds": {
            "type": "string",
            "description": "The minimum trading amounts"
          },
          "isMarginEnabled": {
            "type": "boolean",
            "description": "Available for margin or not."
          },
          "enableTrading": {
            "type": "boolean",
            "description": "Available for transaction or not."
          },
          "feeCategory": {
            "type": "integer",
            "description": "[Fee Type](https://www.kucoin.com/vip/privilege)",
            "enum": [1, 2, 3],
            "x-api-enum": [
              {
                "value": 1,
                "name": "classA",
                "description": "classA"
              },
              {
                "value": 2,
                "name": "classB",
                "description": "classB"
              },
              {
                "value": 3,
                "name": "classC",
                "description": "classC"
              }
            ]
          },
          "makerFeeCoefficient": {
            "type": "string",
            "description": "The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
          },
          "takerFeeCoefficient": {
            "type": "string",
            "description": "The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
          },
          "st": {
            "type": "boolean",
            "description": "Whether it is a [Special Treatment](https://www.kucoin.com/legal/special-treatment) symbol"
          },
          "callauctionIsEnabled": {
            "type": "boolean",
            "description": "The [call auction](https://www.kucoin.com/support/40999744334105) status returns true/false"
          },
          "callauctionPriceFloor": {
            "type": "string",
            "description": "The lowest price declared in the call auction",
            "example": ["0.00001"]
          },
          "callauctionPriceCeiling": {
            "type": "string",
            "description": "The highest bid price in the call auction\n",
            "example": ["0.6"]
          },
          "callauctionFirstStageStartTime": {
            "type": "integer",
            "description": "The first phase of the call auction starts at (Allow add orders, allow cancel orders)",
            "format": "int64",
            "example": [1740470400000]
          },
          "callauctionSecondStageStartTime": {
            "type": "integer",
            "description": "The second phase of the call auction starts at (Allow add orders, don't allow cancel orders)",
            "format": "int64",
            "example": [1740473400000]
          },
          "callauctionThirdStageStartTime": {
            "type": "integer",
            "description": "The third phase of the call auction starts at (Don't allow add orders, don't allow cancel orders)",
            "format": "int64",
            "example": [1740473700000]
          },
          "tradingStartTime": {
            "type": "integer",
            "description": "Official opening time (end time of the third phase of call auction)",
            "format": "int64",
            "example": [1740474000000]
          }
        },
        "required": [
          "symbol",
          "name",
          "baseCurrency",
          "quoteCurrency",
          "feeCurrency",
          "market",
          "baseMinSize",
          "quoteMinSize",
          "baseMaxSize",
          "quoteMaxSize",
          "baseIncrement",
          "quoteIncrement",
          "priceIncrement",
          "priceLimitRate",
          "minFunds",
          "isMarginEnabled",
          "enableTrading",
          "feeCategory",
          "makerFeeCoefficient",
          "takerFeeCoefficient",
          "st",
          "callauctionIsEnabled"
        ]
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-all-symbols-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-all-symbols-responseschema">Response Schema</h3>

Status Code **200**

| Name                               | Type           | Required | Restrictions | Description                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | -------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » code                             | string         | true     | none         | none                                                                                                                                                                                                                                                                                                                                |
| » data                             | [object]       | true     | none         | none                                                                                                                                                                                                                                                                                                                                |
| »» symbol                          | string         | true     | none         | Unique code of a symbol; it will not change after renaming                                                                                                                                                                                                                                                                          |
| »» name                            | string         | true     | none         | Name of trading pairs, it will change after renaming                                                                                                                                                                                                                                                                                |
| »» baseCurrency                    | string         | true     | none         | Base currency, e.g. BTC.                                                                                                                                                                                                                                                                                                            |
| »» quoteCurrency                   | string         | true     | none         | Quote currency, e.g. USDT.                                                                                                                                                                                                                                                                                                          |
| »» feeCurrency                     | string         | true     | none         | The currency of charged fees.                                                                                                                                                                                                                                                                                                       |
| »» market                          | string         | true     | none         | The trading market.                                                                                                                                                                                                                                                                                                                 |
| »» baseMinSize                     | string         | true     | none         | The minimum order quantity required to place an order.                                                                                                                                                                                                                                                                              |
| »» quoteMinSize                    | string         | true     | none         | The minimum order funds required to place a market order.                                                                                                                                                                                                                                                                           |
| »» baseMaxSize                     | string         | true     | none         | The maximum order size required to place an order.                                                                                                                                                                                                                                                                                  |
| »» quoteMaxSize                    | string         | true     | none         | The maximum order funds required to place a market order.                                                                                                                                                                                                                                                                           |
| »» baseIncrement                   | string         | true     | none         | Quantity increment: The quantity for an order must be a positive integer multiple of this increment. Here, the size refers to the quantity of the base currency for the order. For example, for the ETH-USDT trading pair, if the baseIncrement is 0.0000001, the order quantity can be 1.0000001 but not 1.00000001.               |
| »» quoteIncrement                  | string         | true     | none         | Quote increment: The funds for a market order must be a positive integer multiple of this increment. The funds refer to the quote currency amount. For example, for the ETH-USDT trading pair, if the quoteIncrement is 0.000001, the amount of USDT for the order can be 3000.000001 but not 3000.0000001.                         |
| »» priceIncrement                  | string         | true     | none         | Price increment: The price of an order must be a positive integer multiple of this increment. For example, for the ETH-USDT trading pair, if the priceIncrement is 0.01, the order price can be 3000.01 but not 3000.001.<br><br>Specifies the min. order price as well as the price increment.This also applies to quote currency. |
| »» priceLimitRate                  | string         | true     | none         | Threshold for price protection                                                                                                                                                                                                                                                                                                      |
| »» minFunds                        | string         | true     | none         | The minimum trading amounts                                                                                                                                                                                                                                                                                                         |
| »» isMarginEnabled                 | boolean        | true     | none         | Available for margin or not.                                                                                                                                                                                                                                                                                                        |
| »» enableTrading                   | boolean        | true     | none         | Available for transaction or not.                                                                                                                                                                                                                                                                                                   |
| »» feeCategory                     | integer        | true     | none         | [Fee Type](https://www.kucoin.com/vip/privilege)                                                                                                                                                                                                                                                                                    |
| »» makerFeeCoefficient             | string         | true     | none         | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee                                                                                                                                                    |
| »» takerFeeCoefficient             | string         | true     | none         | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee                                                                                                                                                    |
| »» st                              | boolean        | true     | none         | Whether it is a [Special Treatment](https://www.kucoin.com/legal/special-treatment) symbol                                                                                                                                                                                                                                          |
| »» callauctionIsEnabled            | boolean        | true     | none         | The [call auction](https://www.kucoin.com/support/40999744334105) status returns true/false                                                                                                                                                                                                                                         |
| »» callauctionPriceFloor           | string         | false    | none         | The lowest price declared in the call auction                                                                                                                                                                                                                                                                                       |
| »» callauctionPriceCeiling         | string         | false    | none         | The highest bid price in the call auction                                                                                                                                                                                                                                                                                           |
| »» callauctionFirstStageStartTime  | integer(int64) | false    | none         | The first phase of the call auction starts at (Allow add orders, allow cancel orders)                                                                                                                                                                                                                                               |
| »» callauctionSecondStageStartTime | integer(int64) | false    | none         | The second phase of the call auction starts at (Allow add orders, don't allow cancel orders)                                                                                                                                                                                                                                        |
| »» callauctionThirdStageStartTime  | integer(int64) | false    | none         | The third phase of the call auction starts at (Don't allow add orders, don't allow cancel orders)                                                                                                                                                                                                                                   |
| »» tradingStartTime                | integer(int64) | false    | none         | Official opening time (end time of the third phase of call auction)                                                                                                                                                                                                                                                                 |

#### Enumerated Values

| Property    | Value |
| ----------- | ----- |
| feeCategory | 1     |
| feeCategory | 2     |
| feeCategory | 3     |

<aside class="success">
This operation does not require authentication
</aside>

## Get Ticker

<a id="opId006"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/orderbook/level1?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/orderbook/level1', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/orderbook/level1`

Request via this endpoint to get Level 1 Market Data. The returned value
includes the best bid price and size, the best ask price and size as well as the
last traded price and the last traded size.

<h3 id="get-ticker-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description |
| ------ | ----- | ------ | -------- | ----------- |
| symbol | query | string | true     | symbol      |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "timestamp",
          "format": "int64"
        },
        "sequence": {
          "type": "string",
          "description": "Sequence"
        },
        "price": {
          "type": "string",
          "description": "Last traded price"
        },
        "size": {
          "type": "string",
          "description": "Last traded size"
        },
        "bestBid": {
          "type": "string",
          "description": "Best bid price"
        },
        "bestBidSize": {
          "type": "string",
          "description": "Best bid size"
        },
        "bestAsk": {
          "type": "string",
          "description": "Best ask price"
        },
        "bestAskSize": {
          "type": "string",
          "description": "Best ask size"
        }
      },
      "required": [
        "sequence",
        "price",
        "size",
        "bestBid",
        "bestBidSize",
        "bestAsk",
        "bestAskSize",
        "time"
      ]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-ticker-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-ticker-responseschema">Response Schema</h3>

Status Code **200**

| Name           | Type           | Required | Restrictions | Description       |
| -------------- | -------------- | -------- | ------------ | ----------------- |
| » code         | string         | true     | none         | none              |
| » data         | object         | true     | none         | none              |
| »» time        | integer(int64) | true     | none         | timestamp         |
| »» sequence    | string         | true     | none         | Sequence          |
| »» price       | string         | true     | none         | Last traded price |
| »» size        | string         | true     | none         | Last traded size  |
| »» bestBid     | string         | true     | none         | Best bid price    |
| »» bestBidSize | string         | true     | none         | Best bid size     |
| »» bestAsk     | string         | true     | none         | Best ask price    |
| »» bestAskSize | string         | true     | none         | Best ask size     |

<aside class="success">
This operation does not require authentication
</aside>

## Get All Tickers

<a id="opId007"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/allTickers", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/allTickers', headers = headers)

print(r.json())

```

`GET /api/v1/market/allTickers`

Request market tickers for all the trading pairs in the market (including 24h
volume); takes a snapshot every 2 seconds. On the rare occasion that we change
the currency name, if you still want the changed symbol name, you can use the
symbolName field instead of the symbol field via “Get all tickers” endpoint.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "timestamp",
          "format": "int64"
        },
        "ticker": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "symbol": {
                "type": "string",
                "description": "Symbol"
              },
              "symbolName": {
                "type": "string",
                "description": "Name of trading pairs, it will change after renaming"
              },
              "buy": {
                "type": "string",
                "description": "Best bid price"
              },
              "bestBidSize": {
                "type": "string",
                "description": "Best bid size"
              },
              "sell": {
                "type": "string",
                "description": "Best ask price"
              },
              "bestAskSize": {
                "type": "string",
                "description": "Best ask size"
              },
              "changeRate": {
                "type": "string",
                "description": "24h change rate"
              },
              "changePrice": {
                "type": "string",
                "description": "24h change price"
              },
              "high": {
                "type": "string",
                "description": "Highest price in 24h"
              },
              "low": {
                "type": "string",
                "description": "Lowest price in 24h"
              },
              "vol": {
                "type": "string",
                "description": "24h volume, executed based on base currency"
              },
              "volValue": {
                "type": "string",
                "description": "24h traded amount"
              },
              "last": {
                "type": "string",
                "description": "Last traded price"
              },
              "averagePrice": {
                "type": "string",
                "description": "Average trading price in the last 24 hours"
              },
              "takerFeeRate": {
                "type": "string",
                "description": "Basic Taker Fee"
              },
              "makerFeeRate": {
                "type": "string",
                "description": "Basic Maker Fee"
              },
              "takerCoefficient": {
                "type": "string",
                "description": "The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee",
                "enum": ["1", "0"],
                "x-api-enum": [
                  {
                    "value": "1",
                    "name": "1",
                    "description": "The taker fee coefficient is 1"
                  },
                  {
                    "value": "0",
                    "name": "",
                    "description": "No fee"
                  }
                ]
              },
              "makerCoefficient": {
                "type": "string",
                "description": "The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee",
                "enum": ["1", "0"],
                "x-api-enum": [
                  {
                    "value": "1",
                    "name": "1",
                    "description": "The maker fee coefficient is 1"
                  },
                  {
                    "value": "0",
                    "name": "",
                    "description": "No fee"
                  }
                ]
              }
            },
            "required": [
              "symbol",
              "symbolName",
              "buy",
              "bestBidSize",
              "sell",
              "bestAskSize",
              "changeRate",
              "changePrice",
              "high",
              "low",
              "vol",
              "volValue",
              "last",
              "averagePrice",
              "takerFeeRate",
              "makerFeeRate",
              "takerCoefficient",
              "makerCoefficient"
            ]
          }
        }
      },
      "required": ["time", "ticker"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-all-tickers-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-all-tickers-responseschema">Response Schema</h3>

Status Code **200**

| Name                 | Type           | Required | Restrictions | Description                                                                                                                                                                      |
| -------------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » code               | string         | true     | none         | none                                                                                                                                                                             |
| » data               | object         | true     | none         | none                                                                                                                                                                             |
| »» time              | integer(int64) | true     | none         | timestamp                                                                                                                                                                        |
| »» ticker            | [object]       | true     | none         | none                                                                                                                                                                             |
| »»» symbol           | string         | true     | none         | Symbol                                                                                                                                                                           |
| »»» symbolName       | string         | true     | none         | Name of trading pairs, it will change after renaming                                                                                                                             |
| »»» buy              | string         | true     | none         | Best bid price                                                                                                                                                                   |
| »»» bestBidSize      | string         | true     | none         | Best bid size                                                                                                                                                                    |
| »»» sell             | string         | true     | none         | Best ask price                                                                                                                                                                   |
| »»» bestAskSize      | string         | true     | none         | Best ask size                                                                                                                                                                    |
| »»» changeRate       | string         | true     | none         | 24h change rate                                                                                                                                                                  |
| »»» changePrice      | string         | true     | none         | 24h change price                                                                                                                                                                 |
| »»» high             | string         | true     | none         | Highest price in 24h                                                                                                                                                             |
| »»» low              | string         | true     | none         | Lowest price in 24h                                                                                                                                                              |
| »»» vol              | string         | true     | none         | 24h volume, executed based on base currency                                                                                                                                      |
| »»» volValue         | string         | true     | none         | 24h traded amount                                                                                                                                                                |
| »»» last             | string         | true     | none         | Last traded price                                                                                                                                                                |
| »»» averagePrice     | string         | true     | none         | Average trading price in the last 24 hours                                                                                                                                       |
| »»» takerFeeRate     | string         | true     | none         | Basic Taker Fee                                                                                                                                                                  |
| »»» makerFeeRate     | string         | true     | none         | Basic Maker Fee                                                                                                                                                                  |
| »»» takerCoefficient | string         | true     | none         | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| »»» makerCoefficient | string         | true     | none         | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |

#### Enumerated Values

| Property         | Value |
| ---------------- | ----- |
| takerCoefficient | 1     |
| takerCoefficient | 0     |
| makerCoefficient | 1     |
| makerCoefficient | 0     |

<aside class="success">
This operation does not require authentication
</aside>

## Get Trade History

<a id="opId008"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/histories?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/histories', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/histories`

Request via this endpoint to get the trade history of the specified symbol, the
returned quantity is the last 100 transaction records.

<h3 id="get-trade-history-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description |
| ------ | ----- | ------ | -------- | ----------- |
| symbol | query | string | true     | symbol      |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "sequence": {
            "type": "string",
            "description": "Sequence number"
          },
          "price": {
            "type": "string",
            "description": "Filled price"
          },
          "size": {
            "type": "string",
            "description": "Filled amount"
          },
          "side": {
            "type": "string",
            "description": "Filled side, The trade side indicates the taker order side. A taker order is the order that was matched with orders opened on the order book.",
            "enum": ["buy", "sell"],
            "x-api-enum": [
              {
                "value": "buy",
                "name": "buy",
                "description": "buy"
              },
              {
                "value": "sell",
                "name": "sell",
                "description": "sell"
              }
            ]
          },
          "time": {
            "type": "integer",
            "format": "int64",
            "description": "Filled timestamp(nanosecond)"
          }
        },
        "required": ["sequence", "price", "size", "side", "time"]
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-trade-history-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-trade-history-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type           | Required | Restrictions | Description                                                                                                                                   |
| ----------- | -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| » code      | string         | true     | none         | none                                                                                                                                          |
| » data      | [object]       | true     | none         | none                                                                                                                                          |
| »» sequence | string         | true     | none         | Sequence number                                                                                                                               |
| »» price    | string         | true     | none         | Filled price                                                                                                                                  |
| »» size     | string         | true     | none         | Filled amount                                                                                                                                 |
| »» side     | string         | true     | none         | Filled side, The trade side indicates the taker order side. A taker order is the order that was matched with orders opened on the order book. |
| »» time     | integer(int64) | true     | none         | Filled timestamp(nanosecond)                                                                                                                  |

#### Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |

<aside class="success">
This operation does not require authentication
</aside>

## Get Klines

<a id="opId009"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch(
  "/api/v1/market/candles?symbol=type,string&type=type,string,enum,1min%2C3min%2C5min%2C15min%2C30min%2C1hour%2C2hour%2C4hour%2C6hour%2C8hour%2C12hour%2C1day%2C1week%2C1month,x-api-enum,%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D",
  {
    method: "GET",

    headers: headers
  }
)
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/candles', params={
  'symbol': {
  "type": "string"
},  'type': {
  "type": "string",
  "enum": [
    "1min",
    "3min",
    "5min",
    "15min",
    "30min",
    "1hour",
    "2hour",
    "4hour",
    "6hour",
    "8hour",
    "12hour",
    "1day",
    "1week",
    "1month"
  ],
  "x-api-enum": [
    {
      "value": "1min",
      "name": "1min",
      "description": "1min"
    },
    {
      "value": "3min",
      "name": "3min",
      "description": "3min"
    },
    {
      "value": "5min",
      "name": "5min",
      "description": "5min"
    },
    {
      "value": "15min",
      "name": "15min",
      "description": "15min"
    },
    {
      "value": "30min",
      "name": "30min",
      "description": "30min"
    },
    {
      "value": "1hour",
      "name": "1hour",
      "description": "1hour"
    },
    {
      "value": "2hour",
      "name": "2hour",
      "description": "2hour"
    },
    {
      "value": "4hour",
      "name": "4hour",
      "description": "4hour"
    },
    {
      "value": "6hour",
      "name": "6hour",
      "description": "6hour"
    },
    {
      "value": "8hour",
      "name": "8hour",
      "description": "8hour"
    },
    {
      "value": "12hour",
      "name": "12hour",
      "description": "12hour"
    },
    {
      "value": "1day",
      "name": "1day",
      "description": "1day"
    },
    {
      "value": "1week",
      "name": "1week",
      "description": "1week"
    },
    {
      "value": "1month",
      "name": "1month",
      "description": "1month"
    }
  ]
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/candles`

Get the Kline of the symbol. Data are returned in grouped buckets based on
requested type. For each query, the system would return at most 1500 pieces of
data. To obtain more data, please page the data by time.

<h3 id="get-klines-parameters">Parameters</h3>

| Name    | In    | Type           | Required | Description                                                                                                                  |
| ------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| symbol  | query | string         | true     | symbol                                                                                                                       |
| type    | query | string         | true     | Type of candlestick patterns: 1min, 3min, 5min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 8hour, 12hour, 1day, 1week, 1month |
| startAt | query | integer(int64) | false    | Start time (second), default is 0                                                                                            |
| endAt   | query | integer(int64) | false    | End time (second), default is 0                                                                                              |

#### Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| type      | 1min   |
| type      | 3min   |
| type      | 5min   |
| type      | 15min  |
| type      | 30min  |
| type      | 1hour  |
| type      | 2hour  |
| type      | 4hour  |
| type      | 6hour  |
| type      | 8hour  |
| type      | 12hour |
| type      | 1day   |
| type      | 1week  |
| type      | 1month |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Start time of the candle cycle, opening price, closing price, highest price, Lowest price, Transaction amount, Transaction volume"
        }
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-klines-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-klines-responseschema">Response Schema</h3>

Status Code **200**

| Name   | Type    | Required | Restrictions | Description |
| ------ | ------- | -------- | ------------ | ----------- |
| » code | string  | true     | none         | none        |
| » data | [array] | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## Get Part OrderBook

<a id="opId010"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/orderbook/level2_{size}?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/orderbook/level2_{size}', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/orderbook/level2_{size}`

Query for part orderbook depth data. (aggregated by price) You are recommended
to request via this endpoint as the system reponse would be faster and cosume
less traffic.

<h3 id="get-part-orderbook-parameters">Parameters</h3>

| Name   | In    | Type    | Required | Description                                  |
| ------ | ----- | ------- | -------- | -------------------------------------------- |
| symbol | query | string  | true     | symbol                                       |
| size   | path  | integer | true     | Get the depth layer, optional value: 20, 100 |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "Timestamp(millisecond)",
          "format": "int64"
        },
        "sequence": {
          "type": "string",
          "description": "Sequence number"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "bids, from high to low"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "asks, from low to high"
        }
      },
      "required": ["sequence", "bids", "asks", "time"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-part-orderbook-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-part-orderbook-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type           | Required | Restrictions | Description            |
| ----------- | -------------- | -------- | ------------ | ---------------------- |
| » code      | string         | true     | none         | none                   |
| » data      | object         | true     | none         | none                   |
| »» time     | integer(int64) | true     | none         | Timestamp(millisecond) |
| »» sequence | string         | true     | none         | Sequence number        |
| »» bids     | [array]        | true     | none         | bids, from high to low |
| »» asks     | [array]        | true     | none         | asks, from low to high |

<aside class="success">
This operation does not require authentication
</aside>

## Get Full OrderBook

<a id="opId011"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v3/market/orderbook/level2?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v3/market/orderbook/level2', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v3/market/orderbook/level2`

Query for Full orderbook depth data. (aggregated by price) It is generally used
by professional traders because it uses more server resources and traffic, and
we have strict access rate limit control. To maintain up-to-date Order Book,
please use Websocket incremental feed after retrieving the OrderBook.

<h3 id="get-full-orderbook-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description |
| ------ | ----- | ------ | -------- | ----------- |
| symbol | query | string | true     | symbol      |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "Timestamp(millisecond)",
          "format": "int64"
        },
        "sequence": {
          "type": "string",
          "description": "Sequence number"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "bids, from high to low"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "asks, from low to high"
        }
      },
      "required": ["time", "sequence", "bids", "asks"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-full-orderbook-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-full-orderbook-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type           | Required | Restrictions | Description            |
| ----------- | -------------- | -------- | ------------ | ---------------------- |
| » code      | string         | true     | none         | none                   |
| » data      | object         | true     | none         | none                   |
| »» time     | integer(int64) | true     | none         | Timestamp(millisecond) |
| »» sequence | string         | true     | none         | Sequence number        |
| »» bids     | [array]        | true     | none         | bids, from high to low |
| »» asks     | [array]        | true     | none         | asks, from low to high |

<aside class="success">
This operation does not require authentication
</aside>

## Get Call Auction Part OrderBook

<a id="opId012"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/orderbook/callauction/level2_{size}?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/orderbook/callauction/level2_{size}', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/orderbook/callauction/level2_{size}`

Query for call auction part orderbook depth data. (aggregated by price). It is
recommended that you request via this endpoint, as the system response will be
faster and consume less traffic.

<h3 id="get-call-auction-part-orderbook-parameters">Parameters</h3>

| Name   | In    | Type    | Required | Description                                  |
| ------ | ----- | ------- | -------- | -------------------------------------------- |
| symbol | query | string  | true     | symbol                                       |
| size   | path  | integer | true     | Get the depth layer, optional value: 20, 100 |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "Timestamp (milliseconds)",
          "format": "int64"
        },
        "sequence": {
          "type": "string",
          "description": "Sequence number"
        },
        "bids": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "bids, from high to low"
        },
        "asks": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Price, Size"
            }
          },
          "description": "asks, from low to high"
        }
      },
      "required": ["sequence", "bids", "asks", "time"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-call-auction-part-orderbook-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-call-auction-part-orderbook-responseschema">Response Schema</h3>

Status Code **200**

| Name        | Type           | Required | Restrictions | Description              |
| ----------- | -------------- | -------- | ------------ | ------------------------ |
| » code      | string         | true     | none         | none                     |
| » data      | object         | true     | none         | none                     |
| »» time     | integer(int64) | true     | none         | Timestamp (milliseconds) |
| »» sequence | string         | true     | none         | Sequence number          |
| »» bids     | [array]        | true     | none         | bids, from high to low   |
| »» asks     | [array]        | true     | none         | asks, from low to high   |

<aside class="success">
This operation does not require authentication
</aside>

## Get Call Auction Info

<a id="opId013"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/callauctionData?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/callauctionData', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/callauctionData`

Get call auction data. This interface will return the following information for
the specified symbol during the call auction phase: estimated transaction price,
estimated transaction quantity, bid price range, and ask price range.

<h3 id="get-call-auction-info-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description |
| ------ | ----- | ------ | -------- | ----------- |
| symbol | query | string | true     | symbol      |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "Symbol",
          "example": ["BTC-USDT"]
        },
        "estimatedPrice": {
          "type": "string",
          "description": "Estimated price"
        },
        "estimatedSize": {
          "type": "string",
          "description": "Estimated size"
        },
        "sellOrderRangeLowPrice": {
          "type": "string",
          "description": "Sell ​​order minimum price"
        },
        "sellOrderRangeHighPrice": {
          "type": "string",
          "description": "Sell ​​order maximum price"
        },
        "buyOrderRangeLowPrice": {
          "type": "string",
          "description": "Buy order minimum price"
        },
        "buyOrderRangeHighPrice": {
          "type": "string",
          "description": "Buy ​​order maximum price"
        },
        "time": {
          "type": "integer",
          "description": "Timestamp (ms)",
          "format": "int64"
        }
      },
      "required": [
        "sellOrderRangeLowPrice",
        "sellOrderRangeHighPrice",
        "buyOrderRangeLowPrice",
        "buyOrderRangeHighPrice",
        "time",
        "symbol",
        "estimatedPrice",
        "estimatedSize"
      ]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-call-auction-info-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-call-auction-info-responseschema">Response Schema</h3>

Status Code **200**

| Name                       | Type           | Required | Restrictions | Description                |
| -------------------------- | -------------- | -------- | ------------ | -------------------------- |
| » code                     | string         | true     | none         | none                       |
| » data                     | object         | true     | none         | none                       |
| »» symbol                  | string         | true     | none         | Symbol                     |
| »» estimatedPrice          | string         | true     | none         | Estimated price            |
| »» estimatedSize           | string         | true     | none         | Estimated size             |
| »» sellOrderRangeLowPrice  | string         | true     | none         | Sell ​​order minimum price |
| »» sellOrderRangeHighPrice | string         | true     | none         | Sell ​​order maximum price |
| »» buyOrderRangeLowPrice   | string         | true     | none         | Buy order minimum price    |
| »» buyOrderRangeHighPrice  | string         | true     | none         | Buy ​​order maximum price  |
| »» time                    | integer(int64) | true     | none         | Timestamp (ms)             |

<aside class="success">
This operation does not require authentication
</aside>

## Get Fiat Price

<a id="opId014"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/prices", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/prices', headers = headers)

print(r.json())

```

`GET /api/v1/prices`

Request the fiat price of the currencies for the available trading pairs via
this endpoint.

<h3 id="get-fiat-price-parameters">Parameters</h3>

| Name       | In    | Type   | Required | Description                                                                                                                         |
| ---------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| base       | query | string | false    | Ticker symbol of a base currency, e.g. USD, EUR. Default is USD                                                                     |
| currencies | query | string | false    | Comma-separated cryptocurrencies to be converted into fiat, e.g.: BTC,ETH, etc. Default to return the fiat price of all currencies. |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {},
      "additionalProperties": {
        "type": "string"
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-fiat-price-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-fiat-price-responseschema">Response Schema</h3>

Status Code **200**

| Name                        | Type   | Required | Restrictions | Description |
| --------------------------- | ------ | -------- | ------------ | ----------- |
| » code                      | string | true     | none         | none        |
| » data                      | object | true     | none         | none        |
| »» **additionalProperties** | string | false    | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## Get 24hr Stats

<a id="opId015"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/market/stats?symbol=type,string", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/market/stats', params={
  'symbol': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

`GET /api/v1/market/stats`

Request via this endpoint to get the statistics of the specified ticker in the
last 24 hours.

<h3 id="get-24hr-stats-parameters">Parameters</h3>

| Name   | In    | Type   | Required | Description |
| ------ | ----- | ------ | -------- | ----------- |
| symbol | query | string | true     | symbol      |

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "time": {
          "type": "integer",
          "description": "timestamp",
          "format": "int64"
        },
        "symbol": {
          "type": "string",
          "description": "Symbol"
        },
        "buy": {
          "type": "string",
          "description": "Best bid price\n"
        },
        "sell": {
          "type": "string",
          "description": "Best ask price"
        },
        "changeRate": {
          "type": "string",
          "description": "24h change rate"
        },
        "changePrice": {
          "type": "string",
          "description": "24h change price"
        },
        "high": {
          "type": "string",
          "description": "Highest price in 24h"
        },
        "low": {
          "type": "string",
          "description": "Lowest price in 24h"
        },
        "vol": {
          "type": "string",
          "description": "24h volume, executed based on base currency"
        },
        "volValue": {
          "type": "string",
          "description": "24h traded amount"
        },
        "last": {
          "type": "string",
          "description": "Last traded price"
        },
        "averagePrice": {
          "type": "string",
          "description": "Average trading price in the last 24 hours"
        },
        "takerFeeRate": {
          "type": "string",
          "description": "Basic Taker Fee"
        },
        "makerFeeRate": {
          "type": "string",
          "description": "Basic Maker Fee"
        },
        "takerCoefficient": {
          "type": "string",
          "description": "The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
        },
        "makerCoefficient": {
          "type": "string",
          "description": "The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee"
        }
      },
      "required": [
        "time",
        "symbol",
        "buy",
        "sell",
        "changeRate",
        "changePrice",
        "high",
        "low",
        "vol",
        "volValue",
        "last",
        "averagePrice",
        "takerFeeRate",
        "makerFeeRate",
        "takerCoefficient",
        "makerCoefficient"
      ]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-24hr-stats-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-24hr-stats-responseschema">Response Schema</h3>

Status Code **200**

| Name                | Type           | Required | Restrictions | Description                                                                                                                                                                      |
| ------------------- | -------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » code              | string         | true     | none         | none                                                                                                                                                                             |
| » data              | object         | true     | none         | none                                                                                                                                                                             |
| »» time             | integer(int64) | true     | none         | timestamp                                                                                                                                                                        |
| »» symbol           | string         | true     | none         | Symbol                                                                                                                                                                           |
| »» buy              | string         | true     | none         | Best bid price                                                                                                                                                                   |
| »» sell             | string         | true     | none         | Best ask price                                                                                                                                                                   |
| »» changeRate       | string         | true     | none         | 24h change rate                                                                                                                                                                  |
| »» changePrice      | string         | true     | none         | 24h change price                                                                                                                                                                 |
| »» high             | string         | true     | none         | Highest price in 24h                                                                                                                                                             |
| »» low              | string         | true     | none         | Lowest price in 24h                                                                                                                                                              |
| »» vol              | string         | true     | none         | 24h volume, executed based on base currency                                                                                                                                      |
| »» volValue         | string         | true     | none         | 24h traded amount                                                                                                                                                                |
| »» last             | string         | true     | none         | Last traded price                                                                                                                                                                |
| »» averagePrice     | string         | true     | none         | Average trading price in the last 24 hours                                                                                                                                       |
| »» takerFeeRate     | string         | true     | none         | Basic Taker Fee                                                                                                                                                                  |
| »» makerFeeRate     | string         | true     | none         | Basic Maker Fee                                                                                                                                                                  |
| »» takerCoefficient | string         | true     | none         | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| »» makerCoefficient | string         | true     | none         | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |

<aside class="success">
This operation does not require authentication
</aside>

## Get Market List

<a id="opId016"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/markets", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/markets', headers = headers)

print(r.json())

```

`GET /api/v1/markets`

Request via this endpoint the transaction currency for the entire trading
market.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-market-list-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-market-list-responseschema">Response Schema</h3>

Status Code **200**

| Name   | Type     | Required | Restrictions | Description |
| ------ | -------- | -------- | ------------ | ----------- |
| » code | string   | true     | none         | none        |
| » data | [string] | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## Get Client IP Address

<a id="opId017"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/my-ip", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/my-ip', headers = headers)

print(r.json())

```

`GET /api/v1/my-ip`

Get the server time.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "string"
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-client-ip-address-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-client-ip-address-responseschema">Response Schema</h3>

Status Code **200**

| Name   | Type   | Required | Restrictions | Description |
| ------ | ------ | -------- | ------------ | ----------- |
| » code | string | true     | none         | none        |
| » data | string | true     | none         | none        |

<aside class="success">
This operation does not require authentication
</aside>

## Get Server Time

<a id="opId018"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/timestamp", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/timestamp', headers = headers)

print(r.json())

```

`GET /api/v1/timestamp`

Get the server time.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "integer",
      "format": "int64",
      "description": "ServerTime (milliseconds)"
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-server-time-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-server-time-responseschema">Response Schema</h3>

Status Code **200**

| Name   | Type           | Required | Restrictions | Description               |
| ------ | -------------- | -------- | ------------ | ------------------------- |
| » code | string         | true     | none         | none                      |
| » data | integer(int64) | true     | none         | ServerTime (milliseconds) |

<aside class="success">
This operation does not require authentication
</aside>

## Get Service Status

<a id="opId019"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/status", {
  method: "GET",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/v1/status', headers = headers)

print(r.json())

```

`GET /api/v1/status`

Get the service status.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "description": "Status of service: open: normal transaction; close: Stop Trading/Maintenance; cancelonly: can only cancel the order but not place order",
          "enum": ["open", "close", "cancelonly"],
          "x-api-enum": [
            {
              "value": "open",
              "name": "OPEN",
              "description": "normal transaction"
            },
            {
              "value": "close",
              "name": "CLOSE",
              "description": "Stop Trading/Maintenance"
            },
            {
              "value": "cancelonly",
              "name": "CANCELONLY",
              "description": "can only cancel the order but not place order"
            }
          ]
        },
        "msg": {
          "type": "string",
          "description": "Remark for operation"
        }
      },
      "required": ["status", "msg"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-service-status-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-service-status-responseschema">Response Schema</h3>

Status Code **200**

| Name      | Type   | Required | Restrictions | Description                                                                                                                             |
| --------- | ------ | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| » code    | string | true     | none         | none                                                                                                                                    |
| » data    | object | true     | none         | none                                                                                                                                    |
| »» status | string | true     | none         | Status of service: open: normal transaction; close: Stop Trading/Maintenance; cancelonly: can only cancel the order but not place order |
| »» msg    | string | true     | none         | Remark for operation                                                                                                                    |

#### Enumerated Values

| Property | Value      |
| -------- | ---------- |
| status   | open       |
| status   | close      |
| status   | cancelonly |

<aside class="success">
This operation does not require authentication
</aside>

## Get Public Token - Spot/Margin

<a id="opId020"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/bullet-public", {
  method: "POST",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/v1/bullet-public', headers = headers)

print(r.json())

```

`POST /api/v1/bullet-public`

This interface can obtain the token required for Websocket to establish a
Spot/Margin connection. If you need use public channels (e.g. all public market
data), please make request as follows to obtain the server list and public token

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string",
          "description": "The token required to establish a Websocket connection"
        },
        "instanceServers": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "endpoint": {
                "type": "string",
                "description": "Websocket domain URL. It is recommended to use a dynamic URL, as the URL may change."
              },
              "encrypt": {
                "type": "boolean",
                "description": "Whether to encrypt. Currently only supports wss, not ws"
              },
              "protocol": {
                "type": "string",
                "description": "Network Protocol",
                "enum": ["websocket"],
                "x-api-enum": [
                  {
                    "value": "websocket",
                    "name": "Websocket",
                    "description": "Websocket"
                  }
                ]
              },
              "pingInterval": {
                "type": "integer",
                "description": "Recommended ping interval (milliseconds)"
              },
              "pingTimeout": {
                "type": "integer",
                "description": "Heartbeat timeout (milliseconds)"
              }
            },
            "required": [
              "endpoint",
              "encrypt",
              "protocol",
              "pingInterval",
              "pingTimeout"
            ]
          }
        }
      },
      "required": ["token", "instanceServers"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-public-token---spot/margin-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-public-token---spot/margin-responseschema">Response Schema</h3>

Status Code **200**

| Name               | Type     | Required | Restrictions | Description                                                                          |
| ------------------ | -------- | -------- | ------------ | ------------------------------------------------------------------------------------ |
| » code             | string   | true     | none         | none                                                                                 |
| » data             | object   | true     | none         | none                                                                                 |
| »» token           | string   | true     | none         | The token required to establish a Websocket connection                               |
| »» instanceServers | [object] | true     | none         | none                                                                                 |
| »»» endpoint       | string   | true     | none         | Websocket domain URL. It is recommended to use a dynamic URL, as the URL may change. |
| »»» encrypt        | boolean  | true     | none         | Whether to encrypt. Currently only supports wss, not ws                              |
| »»» protocol       | string   | true     | none         | Network Protocol                                                                     |
| »»» pingInterval   | integer  | true     | none         | Recommended ping interval (milliseconds)                                             |
| »»» pingTimeout    | integer  | true     | none         | Heartbeat timeout (milliseconds)                                                     |

#### Enumerated Values

| Property | Value     |
| -------- | --------- |
| protocol | websocket |

<aside class="success">
This operation does not require authentication
</aside>

## Get Private Token - Spot/Margin

<a id="opId021"></a>

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/api/v1/bullet-private", {
  method: "POST",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/api/v1/bullet-private', headers = headers)

print(r.json())

```

`POST /api/v1/bullet-private`

This interface can obtain the token required for Websocket to establish a
Spot/Margin private connection. If you need use private channels (e.g. account
balance notice), please make request as follows to obtain the server list and
private token

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string",
          "description": "The token required to establish a Websocket connection"
        },
        "instanceServers": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "endpoint": {
                "type": "string",
                "description": "Websocket domain URL. It is recommended to use a dynamic URL, as the URL may change."
              },
              "encrypt": {
                "type": "boolean",
                "description": "Whether to encrypt. Currently only supports wss, not ws"
              },
              "protocol": {
                "type": "string",
                "description": "Network Protocol",
                "enum": ["websocket"],
                "x-api-enum": [
                  {
                    "value": "websocket",
                    "name": "Websocket",
                    "description": "Websocket"
                  }
                ]
              },
              "pingInterval": {
                "type": "integer",
                "description": "Recommended ping interval (milliseconds)"
              },
              "pingTimeout": {
                "type": "integer",
                "description": "Heartbeat timeout (milliseconds)"
              }
            },
            "required": [
              "endpoint",
              "encrypt",
              "protocol",
              "pingInterval",
              "pingTimeout"
            ]
          }
        }
      },
      "required": ["token", "instanceServers"]
    }
  },
  "required": ["code", "data"]
}
```

<h3 id="get-private-token---spot/margin-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline |

<h3 id="get-private-token---spot/margin-responseschema">Response Schema</h3>

Status Code **200**

| Name               | Type     | Required | Restrictions | Description                                                                          |
| ------------------ | -------- | -------- | ------------ | ------------------------------------------------------------------------------------ |
| » code             | string   | true     | none         | none                                                                                 |
| » data             | object   | true     | none         | none                                                                                 |
| »» token           | string   | true     | none         | The token required to establish a Websocket connection                               |
| »» instanceServers | [object] | true     | none         | none                                                                                 |
| »»» endpoint       | string   | true     | none         | Websocket domain URL. It is recommended to use a dynamic URL, as the URL may change. |
| »»» encrypt        | boolean  | true     | none         | Whether to encrypt. Currently only supports wss, not ws                              |
| »»» protocol       | string   | true     | none         | Network Protocol                                                                     |
| »»» pingInterval   | integer  | true     | none         | Recommended ping interval (milliseconds)                                             |
| »»» pingTimeout    | integer  | true     | none         | Heartbeat timeout (milliseconds)                                                     |

#### Enumerated Values

| Property | Value     |
| -------- | --------- |
| protocol | websocket |

<aside class="success">
This operation does not require authentication
</aside>

# Schemas
