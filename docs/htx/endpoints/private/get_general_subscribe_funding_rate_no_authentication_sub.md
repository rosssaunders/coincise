# GET [General] Subscribe funding rate (no authentication)（sub）

**Source:**
[[General] Subscribe funding rate (no authentication)（sub）](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7e3b0-77b5-11ed-9966-0242ac110003)

**Category:** Orders and Accounts WebSocket Interfaces

## Authentication

Required (Private Endpoint)

### public.$contract_code.funding_rate (\[General\] Subscribe funding rate (no authentication)（sub）)

Signature verification: Yes

Interface permission: Read

Rate Limit: For public interface to get market data such as Get Kline data, Get
Market Data Overview, Get Contract Information,Get market in-depth data, Get
premium index Kline, Get real-time forecast capital rate kline, Get basis data,
Get the last Trade of a Contract and so on： For websocket: The rate limit for
“req” request is 50 times at once. No limit for “sub” request as the data will
be pushed by sever voluntarily.

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Subscription Address

| Environment                         | Address                                     |
| ----------------------------------- | ------------------------------------------- |
| Online                              | wss://api.hbdm.com/linear-swap-notification |
| Online (preferred by aws customers) | wss://api.hbdm.vn/linear-swap-notification  |

#### Request Parameter

| Field Name | Type   | Description                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| op         | string | Required； Operator Name，value for unsubscribe is unsub;                                                                   |
| cid        | string | Optional; ID Client requests unique ID                                                                                      |
| topic      | string | Required；Unsubscribe Topic Name, format: orders.$contract_code; For parameter details please check req Subscribe Parameter |

#### Rule description

| Subscribe(sub)                     | Unsubscribe( unsub )               | Rule        |
| ---------------------------------- | ---------------------------------- | ----------- |
| public.\*.funding_rate             | public.\*.funding_rate             | Allowed     |
| public.contract_code1.funding_rate | public.\*.funding_rate             | Allowed     |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | Allowed     |
| public.contract_code1.funding_rate | public.contract_code1.funding_rate | Not Allowed |
| public.\*.funding_rate             | public.contract_code1.funding_rate | Not Allowed |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description          | Value Range                                                        | Default Value |
| ------------- | --------- | -------- | -------------------- | ------------------------------------------------------------------ | ------------- |
| contract_code | string    | true     | contract code        | "\*" all(it means to subscribe the all funding rate) "BTC-USDT"... |               |
| cid           | string    | false    | Current request's ID |                                                                    |               |

#### Data Update

| Parameter       | Data Type    | Required | Description                                       | Value Range |
| --------------- | ------------ | -------- | ------------------------------------------------- | ----------- |
| op              | string       | true     | value: "notify";                                  |             |
| topic           | string       | true     | topic subscribed                                  |             |
| ts              | long         | true     | timestamp of server response.unit: millionseconds |             |
| DATA_START      | object array | true     |                                                   |             |
| symbol          | string       | true     | symbol,"BTC","ETH"...                             |             |
| contract_code   | string       | true     | contract_code,"BTC-USDT"                          |             |
| fee_asset       | string       | true     | fee asset,"USDT"...                               |             |
| funding_time    | string       | true     | current funding time                              |             |
| funding_rate    | string       | true     | current funding rate                              |             |
| estimated_rate  | string       | true     | (Deprecated, default is null)                     |             |
| settlement_time | string       | true     | settlement timestamp.eg:"1490759594752"           |             |
| DATA_END        |              | false    |                                                   |             |

#### Subscription Example

{

"op":

"sub"

"topic":

"public.btc-usdt.funding_rate"

"cid":

"40sG903yz80oDFWr"

}

#### Example of a Successful Subscription

{

"op":

"sub"

"cid":

"40sG903yz80oDFWr"

"topic":

"public.btc-usdt.funding_rate"

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

"public.BTC-USDT.funding_rate"

"cid":

"40sG903yz80oDFWr"

}
