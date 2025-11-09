# GET [General]Get the estimated settlement price

**Source:**
[[General]Get the estimated settlement price](https://www.htx.com/en-us/opend/newApiPages/?id=8cb7f9d4-77b5-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_estimated_settlement_price (\[General\]Get the estimated settlement price)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: For public interface used to get information of index, price limit,
settlement, delivery, open positions and so on, the rate limit is 240 times
every 3 second at most for each IP (this 240 times every 3 second public
interface rate limit is shared by all the requests from that IP of non-marketing
information, like above).

Interface description: The interface supports cross margin mode and isolated
margin mode. The request parameter "contract_code" supports the contract code of
futures, in that the format is BTC-USDT-210625. When both of pair, contract_type
and contract_code filled in, the contract_code is the preferred. business_type
is a required parameter when query info of futures contract, and its value must
be futures or all.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                  | Value Range                                         | Default Value |
| ------------- | --------- | -------- | -------------------------------------------- | --------------------------------------------------- | ------------- |
| contract_code | string    | false    | contract code, return all without filling in | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |               |
| pair          | string    | false    | pair                                         | BTC-USDT                                            |               |
| contract_type | string    | false    | contract type                                | swap, this_week, next_week, quarter, next_quarter   |               |
| business_type | string    | false    | business type, default is swap               | futures, swap, all                                  |               |

#### Response Parameter

| Parameter                  | Data Type    | Required | Description                                                                                                                                                                                              | Value Range                                         |
| -------------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| status                     | string       | true     | status                                                                                                                                                                                                   |                                                     |
| DATA_START                 | object array | true     |                                                                                                                                                                                                          |                                                     |
| contract_code              | string       | true     | contract code                                                                                                                                                                                            | swap: "BTC-USDT"... , future: "BTC-USDT-210625" ... |
| estimated_settlement_price | decimal      | true     | Current-period estimated settlement price /Current-period estimated delivery price (When the settlement type is "delivery", it is estimated delivery price; Otherwise, it is estimated settlement price) |                                                     |
| settlement_type            | string       | true     | settlement type                                                                                                                                                                                          | “delivery”，“settlement”                            |
| contract_type              | string       | true     | contract type                                                                                                                                                                                            | swap, this_week, next_week, quarter, next_quarter   |
| pair                       | string       | true     | pair                                                                                                                                                                                                     | such as: “BTC-USDT”                                 |
| business_type              | string       | true     | business type                                                                                                                                                                                            | futures, swap                                       |
| DATA_END                   |              | false    |                                                                                                                                                                                                          |                                                     |
| ts                         | long         | true     | Time of Respond Generation，Unit: Millisecond                                                                                                                                                            |                                                     |

Notes:  
When the "settlement_type" is "settlement", the "estimated_settlement_price"
will be calculated and updated from 10 minutes before settlement and until the
settlement. In the other moment(including settlement),
"estimated_settlement_price" is empty, but the other fields will be displayed
normally.  
When the "settlement_type" is "delivery", the "estimated_settlement_price" will
be calculated and updated from 10 minutes before settlement and until the
delivery. In the other moment(including delivery), "estimated_settlement_price"
is empty, but the other fields will be displayed normally.  
Estimated settlement price will be calculated and updated every 6 seconds.

#### Request example

`curl"https://api.hbdm.com/linear-swap-api/v1/swap_estimated_settlement_price?contract_code=BTC-USDT&pair=BTC-USDT&contract_type=swap&business_type=swap"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"contract_code":

"BTC-USDT-211210"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"this_week"

}

1:{

"contract_code":

"BTC-USDT-211217"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"next_week"

}

2:{

"contract_code":

"BTC-USDT-211231"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

"business_type":

"futures"

"pair":

"BTC-USDT"

"contract_type":

"quarter"

}

3:{

"contract_code":

"BTC-USDT"

"estimated_settlement_price":

NULL

"settlement_type":

"settlement"

"business_type":

"swap"

"pair":

"BTC-USDT"

"contract_type":

"swap"

}

\]

"ts":

1638755400222

}
