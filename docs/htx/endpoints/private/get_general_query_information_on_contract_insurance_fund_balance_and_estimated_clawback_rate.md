# GET [General] Query information on contract insurance fund balance and estimated clawback rate

**Source:** [[General] Query information on contract insurance fund balance and estimated clawback rate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7feba-77b5-11ed-9966-0242ac110003)

**Category:** Downline Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_risk\_info (\[General\] Query information on contract insurance fund balance and estimated clawback rate)

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
| contract\_code | string | false | contract code | swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |  |
| business\_type | string | false | business type, default is swap | futures, swap, all |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| contract\_code | string | true | contract code | e.g. swap: "BTC-USDT"... , future: "BTC-USDT-FUTURES" ... |
| insurance\_fund | decimal | true | Insurance Fund Balance |  |
| estimated\_clawback | decimal | true | Estimated Clawback Rate |  |
| pair | string | true | pair | such as: “BTC-USDT” |
| business\_type | string | true | business type | futures, swap |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_risk_info?contract_code=BTC-USDT"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract\_code":

"BTC-USDT"

"insurance\_fund":

16174.621898868114

"estimated\_clawback":

0

"business\_type":

"swap"

"pair":

"BTC-USDT"

}

1:{

"contract\_code":

"BTC-USDT-FUTURES"

"insurance\_fund":

16174.621898868114

"estimated\_clawback":

0

"business\_type":

"futures"

"pair":

"BTC-USDT"

}

2:{

"contract\_code":

"ETH-USDT"

"insurance\_fund":

16174.621898868114

"estimated\_clawback":

0

"business\_type":

"swap"

"pair":

"ETH-USDT"

}

3:{

"contract\_code":

"ETH-USDT-FUTURES"

"insurance\_fund":

16174.621898868114

"estimated\_clawback":

0

"business\_type":

"futures"

"pair":

"ETH-USDT"

}

\]

"ts":

1638754774555

}