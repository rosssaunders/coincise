# GET Query information on contract trading fee

**Source:**
[Query information on contract trading fee](https://www.htx.com/en-us/opend/newApiPages/?id=28c2fe0a-77ae-11ed-9966-0242ac110003)

**Category:** Future Account Interface

## Authentication

Required (Private Endpoint)

### /api/v1/contract_fee (Query information on contract trading fee)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: the private interface rate limit of API key is at most 72 times
every 3 seconds for each UID (Trade Interface: at most 36 times every 3 seconds.
Read Interface: at most 36 times every 3 seconds) (this rate limit is shared by
all the altcoins contracts delivered by different date).

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description   | Value Range                                                                                                                                    | Default Value |
| --------- | --------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| symbol    | string    | false    | Contract Code | Case-Insenstive.Both uppercase and lowercase are supported. "BTC","ETH"...，If no data detected, system will return to all contract by default |               |

#### Response Parameter

| Parameter       | Data Type | Required | Description                                       | Value Range    |
| --------------- | --------- | -------- | ------------------------------------------------- | -------------- |
| status          | string    | true     | Request Processing Result                         | "ok" , "error" |
| ts              | long      | true     | Time of Respond Generation, Unit: Millisecond     |                |
| DATA_START      |           | false    |                                                   |                |
| symbol          | string    | true     | Contract Code                                     | "BTC","ETH"... |
| open_maker_fee  | string    | true     | Open maker order fee, decimal                     |                |
| open_taker_fee  | string    | true     | Open taker order fee, decimal                     |                |
| close_maker_fee | string    | true     | Close maker order fee, decimal                    |                |
| close_taker_fee | string    | true     | Close taker order fee, decimal                    |                |
| delivery_fee    | string    | true     | delivery fee, decimal                             |                |
| fee_asset       | string    | true     | the corresponding cryptocurrency to the given fee | "BTC","ETH"... |
| DATA_END        |           | false    |                                                   |                |

#### Request example

{

"symbol":

"btc"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"symbol":

"ADA"

"open_maker_fee":

"0.0002"

"open_taker_fee":

"0.0004"

"close_maker_fee":

"0.0002"

"close_taker_fee":

"0.0004"

"delivery_fee":

"0.0005"

"fee_asset":

"ADA"

}

\]

"ts":

1604307012954

}
