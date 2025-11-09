# GET [General]Contract Elements

**Source:** [[General]Contract Elements](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18bd764260c)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_query\_elements (\[General\]Contract Elements)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 20 times/2s

Interface description: Get Contract Elements info

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract code, if empty, query all | BTC-USDT... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | true |  |  |
| contract\_code | string | true | BTC-USDT... |  |
| mode\_type | int | true | Margin Mode: 1: Isolated margin; 2: Cross margin and isolated margin; 3: Cross margin |  |
| swap\_delivery\_type | int | true | Type of Futures: 1: USDT-M perpetual futures; 2: USDT-M delivery futures; 3: Both of them |  |
| instrument\_index\_code | string | true | index |  |
| real\_time\_settlement | int | true | Whether to enable real-time settlement: 0: No; 1: Yes |  |
| transfer\_profit\_ratio | Number | true | Available coefficient of isolated margin |  |
| cross\_transfer\_profit\_ratio | Number | true | Available coefficient of cross margin |  |
| instrument\_type | list | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| trade\_partition | String | true | trade partition USDT HUSD |  |
| min\_level | int | true | min level |  |
| max\_level | int | true | max level |  |
| settle\_period | int | true | settle period |  |
| funding\_rate\_cap | int | true | funding rate cap |  |
| funding\_rate\_floor | int | true | funding rate floor |  |
| trigger\_protect | decimal | false | Threshold for price Protection |  |
| long\_position\_limit |  | false | long position limit |  |
| offset\_order\_limit |  | false | offset order limit |  |
| open\_order\_limit |  | false | open order limit |  |
| short\_position\_limit |  | false | short position limit |  |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| contract\_code | string | true | contract code |  |
| instrument\_type | list | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| settlement\_date | string | true | The next settlement time of the contract | Timestamps, such as "1490759594752" |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| create\_date | string | true | Listing Date | eg "20190808" |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery\_date | string | true | delivery date, empty string when swap | such as: "20180720" |
| CONTRACT\_INFOS\_START | object array | true |  |  |
| PRICE\_TICKS\_START | object array | false | The Minimum Price Change |  |
| business\_type | Integer | true | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures |  |
| price | String | true | The Minimum Price Change |  |
| INSTRUMENT\_VALUES\_START |  | true | contract Face Value |  |
| business\_type | Integer | true | 1: Perpetual futures; 2: Delivery futures; 3: Perpetual futures + delivery futures |  |
| price | String | true | contract Face Value |  |
| ORDER\_LIMITS\_START | object array | true | The maximum quantity of single order (Cont) |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| open\_after\_closing | String | true | open after closing |  |
| NORMAL\_LIMITS\_START |  | false | Hard Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| OPEN\_LIMITS\_START | object | false | Non-basis Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| TRADE\_LIMITS\_START |  | false | Basis Price Limit |  |
| instrument\_type | int | true | Types of Futures Expiration: 1: Weekly futures; 2: Bi-weekly futures; 3: Quarterly futures; 4: Bi-quarterly futures; 0: Perpetual futures |  |
| open | String | true | open |  |
| close | String | true | close |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com?contract_code=XRP-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract\_code":

"BTC-USDT"

"funding\_rate\_cap":

"0.003750000000000000"

"funding\_rate\_floor":

"-0.003750000000000000"

"mode\_type":

2

"swap\_delivery\_type":

3

"settle\_period":

8

"instrument\_index\_code":

"BTC-USDT"

"price\_ticks":\[

0:{

"business\_type":

1

"price":

"0.001000000000000000"

}

1:{

"business\_type":

2

"price":

"0.100000000000000000"

}

\]

"instrument\_values":\[

0:{

"business\_type":

1

"price":

"0.001000000000000000"

}

1:{

"business\_type":

2

"price":

"0.001000000000000000"

}

\]

"min\_level":

"1"

"max\_level":

"200"

"order\_limits":\[

0:{

"open\_after\_closing":

"99999999.000000000000000000"

"instrument\_type":

0

"open":

"99999999.000000000000000000"

"close":

"99999999.000000000000000000"

}

1:{

"open\_after\_closing":

"99999999.000000000000000000"

"instrument\_type":

1

"open":

"99999999.000000000000000000"

"close":

"99999999.000000000000000000"

}

2:{

"open\_after\_closing":

"170000.000000000000000000"

"instrument\_type":

2

"open":

"170000.000000000000000000"

"close":

"170000.000000000000000000"

}

\]

"normal\_limits":\[

0:{

"instrument\_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument\_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"open\_limits":\[

0:{

"instrument\_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument\_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"trade\_limits":\[

0:{

"instrument\_type":

0

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

1:{

"instrument\_type":

1

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

\]

"real\_time\_settlement":

1

"transfer\_profit\_ratio":

1

"cross\_transfer\_profit\_ratio":

1

"instrument\_type":\[

0

:

1

1

:

2

2

:

0

\]

"price\_tick":

"0.001000000000000000"

"instrument\_value":

"0.001000000000000000"

"trade\_partition":

"USDT"

"open\_order\_limit":

"99999999.000000000000000000"

"offset\_order\_limit":

"99999999.000000000000000000"

"long\_position\_limit":

"200000000.000000000000000000"

"short\_position\_limit":

"200000000.000000000000000000"

"contract\_infos":\[

0:{

"contract\_code":

"BTC-USDT-231222"

"instrument\_type":

1

"settlement\_date":

"1703232000000"

"delivery\_time":

"1703232000000"

"create\_date":

"20231208"

"contract\_status":

1

"delivery\_date":

"20231222"

}

1:{

"contract\_code":

"BTC-USDT-231229"

"instrument\_type":

2

"settlement\_date":

"1703836800000"

"delivery\_time":

"1703836800000"

"create\_date":

"20230915"

"contract\_status":

1

"delivery\_date":

"20231229"

}

2:{

"contract\_code":

"BTC-USDT"

"instrument\_type":

0

"settlement\_date":

"1703232000000"

"delivery\_time":

""

"create\_date":

"20230905"

"contract\_status":

1

"delivery\_date":

""

}

\]

}

\]

"ts":

1703217085568

}