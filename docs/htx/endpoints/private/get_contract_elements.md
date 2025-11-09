# GET Contract Elements

**Source:** [Contract Elements](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18bd7dfe1ff)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_query\_elements (Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Get Contract Elements info

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract code, if blank, query all | BTC... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | BTC... |  |
| instrument\_index\_code | string | true | index |  |
| real\_time\_settlement | int | true | Whether to enable real-time settlement: 0: No; 1: Yes |  |
| transfer\_profit\_ratio | Number | true | transfer profit ratio |  |
| min\_level | int | true | min level |  |
| max\_level | int | true | max level |  |
| open\_order\_limit | int | true | long position limit |  |
| offset\_order\_limit | int | true | offset order limit |  |
| long\_position\_limit | int | true | open order limit |  |
| short\_position\_limit | int | true | short position limit |  |
| price\_tick | string | true | price tick |  |
| instrument\_value | string | true | instrument value |  |
| settle\_period | int | true | settle period |  |
| funding\_rate\_cap | int | true | funding rate cap |  |
| funding\_rate\_floor | int | true | funding rate floor |  |
| trigger\_protect | decimal | false | Threshold for price Protection |  |
| hig\_normal\_limit | int | true | hig normal limit |  |
| min\_normal\_limit | int | true | min normal limit |  |
| hig\_open\_limit | int | true | hig open limit |  |
| min\_open\_limit | int | true | min open limit |  |
| hig\_trade\_limit | int | true | min open limit |  |
| min\_trade\_limit | int | true | min open limit |  |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| contract\_code | string | true | contract code |  |
| instrument\_type | list | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| settlement\_date | string | true | The next settlement time of the contract | Timestamps, such as "1490759594752" |
| create\_date | string | true | Listing Date | eg "20190808" |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

{

"contract\_code":

"BTC"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract\_code":

"BTC"

"settle\_period":

8

"instrument\_index\_code":

"BTC-USD"

"price\_tick":

"0.100000000000000000"

"instrument\_value":

"100.000000000000000000"

"min\_level":

"1"

"max\_level":

"91"

"real\_time\_settlement":

0

"transfer\_profit\_ratio":

0

"open\_order\_limit":

"9000.000000000000000000"

"offset\_order\_limit":

"9000.000000000000000000"

"long\_position\_limit":

"18000000.000000000000000000"

"short\_position\_limit":

"1800000.000000000000000000"

"funding\_rate\_cap":

"0.003750000000000000"

"funding\_rate\_floor":

"-0.003750000000000000"

"hig\_normal\_limit":

"999999.990000000000000000"

"min\_normal\_limit":

"999999.990000000000000000"

"hig\_open\_limit":

"999999.990000000000000000"

"min\_open\_limit":

"999999.990000000000000000"

"hig\_trade\_limit":

"999999.990000000000000000"

"min\_trade\_limit":

"999999.990000000000000000"

"contract\_infos":\[

0:{

"contract\_code":

"BTC-USD"

"settlement\_date":

"1734710400000"

"delivery\_time":

""

"create\_date":

"20221114"

"contract\_status":

1

}

\]

}

\]

"ts":

1703215559468

}