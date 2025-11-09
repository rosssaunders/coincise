# GET Subscribe funding rate (no authentication)（sub）

**Source:**
[Subscribe funding rate (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=5d515a03-77b6-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.funding_rate (Subscribe funding rate (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

#### Subscription Address

| Environment                         | Address                              |
| ----------------------------------- | ------------------------------------ |
| Online                              | wss://api.hbdm.com/swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                                                                                                                                                 |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required;Operator Name，value for unsubscribe is unsub;                                                                                                                                                                                                     |
| cid        | string | Optional; Client requests unique ID                                                                                                                                                                                                                         |
| topic      | string | Subscribe topic name，Require subscribe public.$contract_code.funding_rate Subscribe/unsubscribe the data of a given contract code; when the $contract_code value is \*, it stands for subscribing/unsubscribing all the funding rates of contract codes，; |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| public.\*.funding_rate             | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.\*.funding_rate             | allowd      |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | allowd      |
| public.contract_code1.funding_rate | public.contract_code2.funding_rate | not allowed |
| public.\*.funding_rate             | public.contract_code1.funding_rate | not allowed |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                                                                  | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------- |
| op        | string    | true     | Required； Operator Name，required subscribe value is sub                                                                                                    |             |               |
| cid       | string    | false    | Optional; ID Client requests unique ID                                                                                                                       |             |               |
| topic     | string    | true     | Required；Topic name format: public.$contract_code.funding_rate.; contract_code is case-insenstive.Both uppercase and lowercase are supported.e.g. "BTC-USD" |             |               |

#### Data Update

| Parameter       | Data Type    | Required | Description                                       | Value Range |
| --------------- | ------------ | -------- | ------------------------------------------------- | ----------- |
| op              | string       | true     | value: "notify";                                  |             |
| topic           | string       | true     | topic subscribed                                  |             |
| ts              | long         | true     | timestamp of server response.unit: millionseconds |             |
| DATA_START      | object array | true     |                                                   |             |
| symbol          | string       | true     | symbol,"BTC","ETH"...                             |             |
| contract_code   | string       | true     | contract_code,"BTC-USD"                           |             |
| fee_asset       | string       | true     | fee asset,"BTC","ETH"...                          |             |
| funding_time    | string       | true     | current funding time                              |             |
| funding_rate    | string       | true     | current funding rate                              |             |
| estimated_rate  | string       | true     | (Deprecated, default is null)                     |             |
| settlement_time | string       | true     | settlement timestamp.eg:"1490759594753"           |             |
| DATA_END        |              | false    |                                                   |             |

Notes:  
Funding rate will be pushed every 60 seconds by default.Funding rate will not be
calculated under conditions below:  
the contract can't be traded.eg:Pending Listing、Suspension、Delisting、In
settlement、Delivering、Settlement Completed、Delivered,etc.  
the 'update_time' field of index data hasn't been changed over 5 minutes.  
the 'update_time' field of orderbook data hasn't been changed over 5 minutes.  
If the value is equal to last value over 5 continuous counts calculated by md5
of 150 bids data and 150 asks data.

#### Subscription Example

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.BTC-USD.liquidation_orders"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.btc-usd.funding_rate"

"ts":

1670903745088

"err-code":

0

}

#### Example of a Data Update

{

"op":

"notify"

"topic":

"public.BTC-USDT.funding_rate"

"ts":

1603778748166

"data":\[

0:{

"symbol":

"BTC"

"contract_code":

"BTC-USDT"

"fee_asset":

"USDT"

"funding_time":

"1603778700000"

"funding_rate":

"-0.000220068774978695"

"settlement_time":

"1603785600000"

"estimated_rate":

"null"

}

\]

}

#### Example of a Subscription Cancellation

{

"op":

"unsub"

"topic":

"public.BTC-USD.funding_rate"

"cid":

"40sG903yz80oDFWr"

}
