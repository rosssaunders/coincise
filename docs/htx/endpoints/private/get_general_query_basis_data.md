# GET [General] Query Basis Data

**Source:** [[General] Query Basis Data](https://www.htx.com/en-us/opend/newApiPages/?id=8cb8147e-77b5-11ed-9966-0242ac110003)

**Category:** Swap Market Data interface

## Authentication

Required (Private Endpoint)

### /index/market/history/linear\_swap\_basis (\[General\] Query Basis Data)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： （1）For restful interfaces, products, (future, coin margined swap, usdt margined Contracts)800 times/second for one IP at most

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-210625; and supports contract type: BTC-USDT, BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code or contract type | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... or BTC-USDT-CW, BTC-USDT-NW, BTC-USDT-CQ, BTC-USDT-NQ |  |
| period | string | true | kline period | 1min,5min, 15min, 30min, 60min,4hour,1day,1mon |  |
| basis\_price\_type | string | false | use basis price type to calculate the basis data | open price："open"，close price："close"，highest price："high"，lowest price："low"，avg=（high price +low price）/2："average" | Using open price default |
| size | int | true | data size | \[1,2000\] | 150 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| ch | string | true | data channel，eg： market.basis |  |
| DATA\_START | object array | false |  |  |
| id | long | true | unique id |  |
| contract\_price | string | true | contract last price |  |
| index\_price | string | true | index price |  |
| basis | string | true | basis=contract\_price - index\_price |  |
| basis\_rate | string | true | basis\_rate=basis/index\_price |  |
| DATA\_END |  | false |  |  |
| status | string | true | status | "ok" , "error" |
| ts | long | true | created time |  |

#### Request example

`curl "https://api.hbdm.com/index/market/history/linear_swap_basis?contract_code=BTC-USDT&period=1min&size=1"`

#### Response Example

##### Success Example

{

"ch":

"market.BTC-USDT.basis.1min.open"

"data":\[

0:{

"basis":

"15.29074235666667"

"basis\_rate":

"0.001170582317307796"

"contract\_price":

"13077.8"

"id":

1603697160

"index\_price":

"13062.509257643333"

}

\]

"status":

"ok"

"ts":

1603697170804

}