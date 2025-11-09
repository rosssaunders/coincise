# GET [General] Query information on open interest

**Source:**
[[General] Query information on open interest](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8117d-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_his_open_interest (\[General\] Query information on open interest)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： （1）For restful interfaces,
products, (future, coin margined swap, usdt margined Contracts)800 times/second
for one IP at most

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. one of (pair+contract_type) and
contract_code must be filled in(if all of them not filled in, will get 1014
error code); and all filled in, the contract_code is the preferred.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description        | Value Range                                                      | Default Value |
| ------------- | --------- | -------- | ------------------ | ---------------------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract_code      | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ...              |               |
| pair          | string    | false    | pair               | BTC-USDT                                                         |               |
| contract_type | string    | false    | contract type      | swap, this_week, next_week, quarter, next_quarter                |               |
| period        | string    | true     | Period Type        | 1 hour:"60min"，4 hours:"4hour"，12 hours:"12hour"，1 day:"1day" |               |
| size          | int       | false    | Request Amount     | Default：48，Data Range \[1,200\]                                |               |
| amount_type   | int       | true     | Open interest unit | 1:-cont，2:-cryptocurrenty                                       |               |

#### Response Parameter

| Parameter     | Data Type | Required | Description                                                                                  | Value Range                                              |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| status        | string    | true     | Request Processing Result                                                                    | "ok" , "error"                                           |
| ts            | long      | true     | Time of Respond Generation, Unit: Millisecond                                                |                                                          |
| DATA_START    |           | false    | Dictionary Data                                                                              |                                                          |
| symbol        | string    | true     | symbol                                                                                       | "BTC","ETH"...                                           |
| contract_code | string    | true     | contract code                                                                                | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| contract_type | string    | true     | contract type                                                                                | swap, this_week, next_week, quarter, next_quarter        |
| pair          | string    | true     | pair                                                                                         | such as: “BTC-USDT”                                      |
| business_type | string    | true     | business type                                                                                | futures, swap                                            |
| TICK_START    |           | false    |                                                                                              |                                                          |
| volume        | decimal   | true     | Open Interest.                                                                               |                                                          |
| amount_type   | int       | true     | Open Interest Unit                                                                           | 1:-cont，2:- cryptocurrency                              |
| value         | decimal   | true     | Total position volume (the unit shall be the denominated currency of the contract, eg, USDT) |                                                          |
| ts            | long      | true     | Recording Time                                                                               |                                                          |
| TICK_END      |           | false    |                                                                                              |                                                          |
| DATA_END      |           | false    |                                                                                              |                                                          |

Notes:  
tick field：Tick data is arranged in reverse chronological order；

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_his_open_interest?contract_code=BTC-USDT&period=60min&amount_type=1"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"symbol":

"BTC"

"tick":\[

0:{

"volume":

27112

"amount_type":

1

"ts":

1638720000000

"value":

1321498.5264

}

\]

"contract_code":

"BTC-USDT-211210"

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

"ts":

1638755582116

}
