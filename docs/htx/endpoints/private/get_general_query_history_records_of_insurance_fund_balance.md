# GET [General] Query history records of insurance fund balance

**Source:** [[General] Query history records of insurance fund balance](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7fd58-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_insurance\_fund (\[General\] Query history records of insurance fund balance)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit, settlement, delivery, open positions and so on, the rate limit is 240 times every 3 second at most for each IP (this 240 times every 3 second public interface rate limit is shared by all the requests from that IP of non-marketing information, like above).

Interface description: The interface supports cross margin mode and isolated margin mode. The request parameter "contract\_code" supports the contract code of futures, in that the format is BTC-USDT-FUTURES.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |  |
| page\_index | int | false | page index. 1 by default |  |  |
| page\_size | int | false | page size.100 by default. 100 at most | \[1-100\] |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  | Dictionary Data |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| TICK\_START |  | false |  |  |
| insurance\_fund | decimal | true | Insurance Fund Balance |  |
| ts | long | true | Timestamp, Unit: Millisecond |  |
| TICK\_END |  | false |  |  |
| total\_page | int | true | total page |  |
| current\_page | int | true | current page |  |
| total\_size | int | true | total size |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_insurance_fund?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"total\_page":

1

"current\_page":

1

"total\_size":

4

"symbol":

"BTC"

"contract\_code":

"BTC-USDT-FUTURES"

"tick":\[

0:{

"insurance\_fund":

16174.621898868114

"ts":

1638691200000

}

1:{

"insurance\_fund":

130.91239886811348

"ts":

1638604800000

}

2:{

"insurance\_fund":

0.00286055422

"ts":

1638518400000

}

3:{

"insurance\_fund":

0

"ts":

1638432000000

}

\]

"business\_type":

"futures"

"pair":

"BTC-USDT"

}

"ts":

1638754881217

}