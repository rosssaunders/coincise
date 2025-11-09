# GET [General] Subscribe contract elements  (no authentication)（sub）

**Source:** [[General] Subscribe contract elements  (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18ef15d1f28)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract\_code.contract\_elements (\[General\] Subscribe contract elements (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get Market Data Overview, Get Contract Information,Get market in-depth data, Get premium index Kline, Get real-time forecast capital rate kline, Get basis data, Get the last Trade of a Contract and so on： For websocket: The rate limit for “req” request is 50 times at once. No limit for “sub” request as the data will be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated margin mode，Check the latest contract elements information

#### Subscription Address

| Environment | Address |
| --- | --- |
| Online | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification |

#### Request Parameter

| Field Name | Type | Description |
| --- | --- | --- |
| op | string | Required； Operator Name，value for unsubscribe is Sub/Unsubscribe ; |
| cid | string | Optional; ID Client requests unique ID |
| topic | string | Required；Sub/Unsubscribe Topic Name, format: orders.$contract\_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| --- | --- | --- |
| public.$contract\_code.contract\_elements | public.$contract\_code.contract\_elements | Allowed (single contract) |
| public.\*.contract\_elements | public.\*.contract\_elements | Allowed (all contracts) |

#### Subscription Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | all: \* (swap and future), swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |  |
| cid | string | false | Current request's ID |  |  |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| op | string | true | op |  |
| topic | string | true | topic |  |
| ts | long | true |  |  |
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
| CONTRACT\_INFOS\_START |  | false |  |  |
| contract\_code |  | false |  |  |
| instrument\_type |  | false |  |  |
| settlement\_date | string | true |  |  |
| delivery\_time | string | true | delivery time（When the contract does not need to be delivered, the field value is an empty string），millesecond timestamp |  |
| create\_date | string | true | Listing Date | eg "20190808" |
| contract\_status | int | true | Contract Status | contract status ： 0: Delisting,1: Listing,2: Pending Listing,3: Suspension,4: Suspending of Listing,6: Delivering,8: Delivered |
| delivery\_date | string | true | delivery date, empty string when swap | such as: "20180720" |
| CONTRACT\_INFOS\_START |  | false |  |  |
| long\_position\_limit |  | false | long position limit |  |
| offset\_order\_limit |  | false | offset order limit |  |
| open\_order\_limit |  | false | open order limit |  |
| short\_position\_limit |  | false | short position limit |  |
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

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.contract\_elements"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USDT.contract\_elements"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"event":

"init"

"topic":

"public.DOSE-USDT.contract\_elements"

"ts":

1712804933421

"data":{

"contract\_code":

"DOSE-USDT"

"funding\_rate\_cap":

"0.007800000000000000"

"funding\_rate\_floor":

"-0.007600000000000000"

"mode\_type":

2

"swap\_delivery\_type":

3

"settle\_period":

4

"instrument\_index\_code":

"DOSE-USDT"

"price\_ticks":\[

0:{

"business\_type":

2

"price":

"0.000010000000000000"

}

1:{

"business\_type":

1

"price":

"0.000000000100000000"

}

\]

"instrument\_values":\[

0:{

"business\_type":

2

"price":

"0.000010000000000000"

}

1:{

"business\_type":

1

"price":

"0.000010000000000000"

}

\]

"min\_level":

"1"

"max\_level":

"74"

"order\_limits":\[

0:{

"open\_after\_closing":

"500000000000.000000000000000000"

"instrument\_type":

1

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

1:{

"open\_after\_closing":

"500000000000.000000000000000000"

"instrument\_type":

2

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

2:{

"open\_after\_closing":

"500000000000.000000000000000000"

"instrument\_type":

3

"open":

"500000000000.000000000000000000"

"close":

"500000000000.000000000000000000"

}

3:{

"open\_after\_closing":

"500000000003.000000000000000000"

"instrument\_type":

0

"open":

"500000000001.000000000000000000"

"close":

"10005000000002.000000000000000000"

}

\]

"normal\_limits":\[

0:{

"instrument\_type":

1

"open":

"999999.910000000000000000"

"close":

"999999.920000000000000000"

}

1:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument\_type":

0

"open":

"999999.910000000000000000"

"close":

"999999.920000000000000000"

}

\]

"open\_limits":\[

0:{

"instrument\_type":

1

"open":

"999999.930000000000000000"

"close":

"999999.940000000000000000"

}

1:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument\_type":

0

"open":

"999999.930000000000000000"

"close":

"999999.940000000000000000"

}

\]

"trade\_limits":\[

0:{

"instrument\_type":

1

"open":

"999999.950000000000000000"

"close":

"999999.960000000000000000"

}

1:{

"instrument\_type":

2

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

2:{

"instrument\_type":

3

"open":

"999999.990000000000000000"

"close":

"999999.990000000000000000"

}

3:{

"instrument\_type":

0

"open":

"999999.950000000000000000"

"close":

"999999.960000000000000000"

}

\]

"real\_time\_settlement":

0

"transfer\_profit\_ratio":

0

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

3

3

:

0

\]

"price\_tick":

"0.000000000100000000"

"instrument\_value":

"0.000010000000000000"

"trade\_partition":

"USDT"

"open\_order\_limit":

"500000000001.000000000000000000"

"offset\_order\_limit":

"10005000000002.000000000000000000"

"long\_position\_limit":

"4000001.000000000000000000"

"short\_position\_limit":

"4000002.000000000000000000"

"contract\_infos":\[

0:{

"contract\_code":

"DOSE-USDT-231027"

"instrument\_type":

1

"settlement\_date":

"1694592000000"

"delivery\_time":

"1698393600000"

"create\_date":

"20231024"

"contract\_status":

1

"delivery\_date":

"20231027"

}

1:{

"contract\_code":

"DOSE-USDT-231103"

"instrument\_type":

2

"settlement\_date":

"1694592000000"

"delivery\_time":

"1698998400000"

"create\_date":

"20231024"

"contract\_status":

1

"delivery\_date":

"20231103"

}

2:{

"contract\_code":

"DOSE-USDT-231229"

"instrument\_type":

3

"settlement\_date":

"1694592000000"

"delivery\_time":

"1703836800000"

"create\_date":

"20231024"

"contract\_status":

1

"delivery\_date":

"20231229"

}

3:{

"contract\_code":

"DOSE-USDT"

"instrument\_type":

0

"settlement\_date":

"1712822400000"

"delivery\_time":

""

"create\_date":

"20231024"

"contract\_status":

1

"delivery\_date":

""

}

\]

}

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USDT.contract\_elements"

"cid":

"40sG903yz80oDFWr"

}