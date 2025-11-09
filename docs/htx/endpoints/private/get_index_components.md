# GET index components

**Source:**
[Get index components](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-191d647df65)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/market/swap_constituents (Get index components )

Request type: GET

Signature verification: No

Interface permission: 读取

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: Get the index component information data on the market.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description   | Value Range | Default Value |
| ------------- | --------- | -------- | ------------- | ----------- | ------------- |
| contract_code | string    | true     | contract code | BTC-USD...  |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                     | Value Range  |
| ------------- | ------------ | -------- | ------------------------------------------------------------------------------- | ------------ | --- |
| status        | string       | false    |                                                                                 | ok , "error" |
| DATA_START    | object array | true     |                                                                                 |              |
| contract code | string       | true     | contract code                                                                   | BTC-USD...   |
| ts            | long         | true     | Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 |              |
| components    | string       | true     | Components                                                                      |              |
|               | exchange     | string   | true                                                                            |              |     |
|               | symbol       | string   | true                                                                            |              |     |
|               | weights      | string   | true                                                                            |              |     |
|               | symbol_price | string   | true                                                                            |              |     |
| index_price   | string       | true     |                                                                                 |              |
| DATA_END      |              | false    |                                                                                 |              |
| ts            | long         | true     |                                                                                 |              |

#### Request example

`curl"https://api.hbdm.com/swap-api/market/swap_constituents?contract_code=XRP-USD"`

#### Response Example

##### Success Example

{

"data":{

"components":\[

0:{

"exchange":

"bitstamp"

"symbol":

"XRP-USD"

"symbol_price":

"0.54254"

"weights":

"25.0000"

}

1:{

"exchange":

"huobi"

"symbol":

"XRP-USDT"

"symbol_price":

"0.54332905357512644121220"

"weights":

"25.0000"

}

2:{

"exchange":

"binance"

"symbol":

"XRP-BTC"

"symbol_price":

"0.54291395500000000000000000"

"weights":

"25.0000"

}

3:{

"exchange":

"binance"

"symbol":

"XRP-USDT"

"symbol_price":

"0.54340918764888111492500000"

"weights":

"25.0000"

}

\]

"contract_code":

"XRP-USD"

"index_price":

"0.543048049056001889"

"ts":

1725605130395

}

"status":

"ok"

"ts":

1725605151558

}
