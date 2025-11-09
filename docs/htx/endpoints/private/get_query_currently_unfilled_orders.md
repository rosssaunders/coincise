# GET Query currently unfilled orders

**Source:** [Query currently unfilled orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19127113268)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/open\_orders (Query currently unfilled orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used to query the currently unfilled pending orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | false | Contract code, if empty, query all | "BTC-USDT"... ， |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA\_START | array | true |  |  |
| contract\_code | String | true | contract code |  |
| price | String | false |  |  |
| volume | String | true |  |  |
| margin\_mode | String | true | isolated：，cross： |  |
| position\_side | String | true | :long, :short |  |
| order\_direction | Integer | true | 1-buy,2-sell |  |
| lever | Integer | true | lever |  |
| avg\_price | String | true | average transaction price |  |
| avg\_volume | String | true | The number of transactions |  |
| fee | String | true | fee |  |
| DATA\_START |  | true |  |  |
| code | long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/open_orders?contract_code=DOT-USDT"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"position\_side":

"short"

"contract\_code":

"DOT-USDT"

"order\_direction":

"open"

"lever":

5

"margin\_mode":

"isolated"

"volume":

"1.000000000000000000"

"price":

"11"

"avg\_volume":

"0.000000000000000000"

"avg\_price":

NULL

"fee":

"0"

}

1:{

"position\_side":

"long"

"contract\_code":

"DOT-USDT"

"order\_direction":

"open"

"lever":

5

"margin\_mode":

"isolated"

"volume":

"1.000000000000000000"

"price":

"8"

"avg\_volume":

"0.000000000000000000"

"avg\_price":

NULL

"fee":

"0"

}

2:{

"position\_side":

"short"

"contract\_code":

"DOT-USDT"

"order\_direction":

"open"

"lever":

5

"margin\_mode":

"cross"

"volume":

"1.000000000000000000"

"price":

"11"

"avg\_volume":

"0.000000000000000000"

"avg\_price":

NULL

"fee":

"0"

}

3:{

"position\_side":

"long"

"contract\_code":

"DOT-USDT"

"order\_direction":

"open"

"lever":

5

"margin\_mode":

"cross"

"volume":

"1.000000000000000000"

"price":

"8"

"avg\_volume":

"0.000000000000000000"

"avg\_price":

NULL

"fee":

"0"

}

\]

"tid":

"3edcabbedf3d4de596c840ca0b380f26"

"success":

true

}