# GET Query history records of insurance fund balance

**Source:** [Query history records of insurance fund balance](https://www.htx.com/en-us/opend/newApiPages/?id=5d51632f-77b6-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_insurance\_fund (Query history records of insurance fund balance)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | Case-Insenstive.e.g. "BTC-USD" |  |
| page\_index | int | false | page index. 1 by default | 1 |  |
| page\_size | int | false | page size.100 by default. 100 at most | 100 |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  | Dictionary Data |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USD" |
| TICK\_START |  | false |  |  |
| insurance\_fund | decimal | true | Insurance Fund Balance |  |
| ts | long | true | Timestamp, Unit: Millisecond |  |
| TICK\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_ladder_margin?contract_code=BTC-USD"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

89

"current\_page":

1

"total\_size":

89

"symbol":

"BTC"

"contract\_code":

"BTC-USD"

"tick":\[

0:{

"insurance\_fund":

593.7706304354919

"ts":

1603785600000

}

\]

}

"ts":

1603865805070

}