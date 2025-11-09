# GET Query Basis Data

**Source:**
[Query Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=5d5182b0-77b6-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/swap_basis (Query Basis Data)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter        | Data Type | Required | Description                                      | Value Range                                                                                                                      | Default Value            |
| ---------------- | --------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| contract_code    | string    | true     | contract code                                    | Case-Insenstive.Both uppercase and lowercase are supported..e.g."BTC-USD"                                                        |                          |
| period           | string    | true     | kline period                                     | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon                                                                                   |                          |
| basis_price_type | string    | false    | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |
| size             | int       | true     | data size                                        | \[1,2000\]                                                                                                                       | 150                      |

#### Response Parameter

| Parameter      | Data Type    | Required | Description                        | Value Range    |
| -------------- | ------------ | -------- | ---------------------------------- | -------------- |
| ch             | string       | true     | data channel，eg： market.basis    |                |
| DATA_START     | object array | false    |                                    |                |
| id             | long         | true     | unique id                          |                |
| contract_price | string       | true     | contract last price                |                |
| index_price    | string       | true     | index price                        |                |
| basis          | string       | true     | basis=contract_price - index_price |                |
| basis_rate     | string       | true     | basis_rate=basis/index_price       |                |
| DATA_END       |              | false    |                                    |                |
| status         | string       | true     | status                             | "ok" , "error" |
| ts             | long         | true     | created time                       |                |

Notes:  
2000 size at most per request ；

#### Request example

`curl "https://api.hbdm.com/index/market/history/swap_basis?contract_code=BTC-USD&period=1min&size=1"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USD.basis.5min.open"

"data":\[

0:{

"basis":

"2.2525000000005093"

"basis_rate":

"0.00016353574072709766"

"contract_price":

"13776"

"id":

1603866300

"index_price":

"13773.7475"

}

1:{

"basis":

"9.072500000000218"

"basis_rate":

"0.0006591696787033861"

"contract_price":

"13772.6"

"id":

1603866600

"index_price":

"13763.5275"

}

\]

"status":

"ok"

"ts":

1603866710696

}
