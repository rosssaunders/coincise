# GET Query Top Trader Sentiment Index Function-Position

**Source:** [Query Top Trader Sentiment Index Function-Position](https://www.htx.com/en-us/opend/newApiPages/?id=5d516888-77b6-11ed-9966-0242ac110003)

**Category:** Reference Data

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_elite\_position\_ratio (Query Top Trader Sentiment Index Function-Position)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | Contract Code | Case-Insenstive.e.g. "BTC-USD" |  |
| period | string | true | period | 5min, 15min, 30min, 60min,4hour,1day |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request Processing Result | "ok" , "error" |
| ts | long | true | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START |  | false |  |  |
| symbol | string | true | symbol | "BTC","ETH"... |
| contract\_code | string | true | contract code | e.g. "BTC-USD" |
| LIST\_START |  | false |  |  |
| buy\_ratio | decimal | true | Net long position ratio |  |
| sell\_ratio | decimal | true | Net short position ratio |  |
| ts | long | true | Time of Respond Generation |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_elite_position_ratio?contract_code=BTC-USD&period=1day"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"list":\[

0:{

"buy\_ratio":

0.535

"sell\_ratio":

0.465

"ts":

1603857300000

}

1:{

"buy\_ratio":

0.536

"sell\_ratio":

0.464

"ts":

1603857600000

}

\]

"symbol":

"BTC"

"contract\_code":

"BTC-USD"

}

"ts":

1603866161191

}