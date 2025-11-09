# GET [General] Get index components

**Source:**
[[General] Get index components](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-191d5dd3143)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/market/swap_contract_constituents (\[General\] Get index components )

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
| contract_code | string    | true     | contract code | BTC-USDT... |               |

#### Response Parameter

| Parameter     | Data Type    | Required | Description                                                                     | Value Range  |
| ------------- | ------------ | -------- | ------------------------------------------------------------------------------- | ------------ | --- |
| status        | string       | false    |                                                                                 | ok , "error" |
| DATA_START    | object array | true     |                                                                                 |              |
| contract_code | string       | true     | contract code                                                                   | BTC-USDT...  |
| ts            | long         | true     | Data generation time, Unix timestamp format in milliseconds, e.g. 1597026383085 |              |
| components    | string       | true     | Components                                                                      |              |
|               | exchange     | string   | true                                                                            |              |     |
|               | symbol       | string   | true                                                                            |              |     |
|               | weights      | string   | true                                                                            |              |     |
|               | symbol_price | string   | true                                                                            |              |     |
| index_price   | string       | true     |                                                                                 |              |
| DATA_END      |              | false    |                                                                                 |              |
| ts            | long         | true     |                                                                                 |              |

Notes: U-standard perpetual contracts and U-standard delivery contracts return
the same index information.

#### Request example

`curl"https://api.hbdm.com?contract_code=XRP-USDT"`

#### Response Example

##### Success Example

{

"data":{

"components":\[

0:{

"exchange":

"huobi"

"symbol":

"ETH-USDT"

"symbol_price":

"2379.06"

"weights":

"20.0000"

}

1:{

"exchange":

"okex"

"symbol":

"ETH-USDT"

"symbol_price":

"2378.8"

"weights":

"20.0000"

}

2:{

"exchange":

"binance"

"symbol":

"ETH-USDT"

"symbol_price":

"2378.91000000"

"weights":

"20.0000"

}

3:{

"exchange":

"HitBTC"

"symbol":

"ETH-USDT"

"symbol_price":

"2379.125"

"weights":

"20.0000"

}

4:{

"exchange":

"bybit"

"symbol":

"ETH-USDT"

"symbol_price":

"2378.84"

"weights":

"20.0000"

}

\]

"contract_code":

"ETH-USDT"

"index_price":

"2378.947000000000000000"

"ts":

1725603895074

}

"status":

"ok"

"ts":

1725603896779

}
