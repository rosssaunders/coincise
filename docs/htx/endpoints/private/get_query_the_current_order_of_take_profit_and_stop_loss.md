# GET Query the current order of take profit and stop loss

**Source:** [Query the current order of take profit and stop loss](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-191271a45ea)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/tpsl\_open\_orders (Query the current order of take profit and stop loss)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used to query the currently unfilled take-profit and stop-loss orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Contract code, if empty, query all | "BTC-USDT"... ， |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| DATA\_START | array | true |  |  |
| contract\_code | String | true | contract code |  |
| volume | String | true |  |  |
| margin\_mode | String | true | isolated：，cross： |  |
| position\_side | String | true | :long, :short |  |
| trigger\_type | String | true | ge or le |  |
| tpsl\_order\_type | String | true | sl or tp |  |
| price | String | true | trigger price |  |
| DATA\_START |  | true |  |  |
| code | Long | true |  |  |

#### Request example

`curl"https://api.hbdm.com/copytrading/trader/tpsl_open_orders?contract_code=DOT-USDT"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"position\_side":

"long"

"contract\_code":

"DOT-USDT"

"margin\_mode":

"isolated"

"volume":

"1"

"trigger\_type":

"le"

"tpsl\_order\_type":

"tp"

"price":

"9.79902"

}

1:{

"position\_side":

"long"

"contract\_code":

"DOT-USDT"

"margin\_mode":

"isolated"

"volume":

"1"

"trigger\_type":

"ge"

"tpsl\_order\_type":

"sl"

"price":

"10.19898"

}

2:{

"position\_side":

"short"

"contract\_code":

"DOT-USDT"

"margin\_mode":

"cross"

"volume":

"1"

"trigger\_type":

"ge"

"tpsl\_order\_type":

"tp"

"price":

"10.2"

}

3:{

"position\_side":

"short"

"contract\_code":

"DOT-USDT"

"margin\_mode":

"cross"

"volume":

"1"

"trigger\_type":

"le"

"tpsl\_order\_type":

"sl"

"price":

"9.8"

}

\]

"tid":

"727a1da93a10450794bde074e25ed235"

"success":

true

}