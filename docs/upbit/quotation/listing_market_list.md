# Listing Market List

Response

| Field Name     | Description                                                                 | Type   |
| -------------- | --------------------------------------------------------------------------- | ------ |
| market         | Market ID                                                                   | String |
| english_name   | Market Name                                                                 | String |
| market_warning | Market Investment WarningNONE (Not applicable), CAUTION(Investment warning) | String |

is_details

boolean

Defaults to false

Exposed additional details(ex. Market Investment Warning, ...)

truefalse

# 200

200

json

# 400

400

object

Updated 3 months ago

---

ShellNodeRubyPHPPython

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://exchange-region-endpoint-url.com/v1/market/all?is\_details=false' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

1

\[

2

    {

3

        "market": "SGD-BTC",

4

        "english\_name": "Bitcoin"

5

    },

6

    ...

7

\]

Updated 3 months ago

---

> **Source:**
> [listing-market-list](https://global-docs.upbit.com/reference/listing-market-list)
