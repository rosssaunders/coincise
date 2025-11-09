# GET Full Order Book

**Source:**
[Full Order Book](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-193426b1a86)

**Category:** Market Data

## Authentication

Required (Private Endpoint)

### /market/fullMbp (Full Order Book)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 5 times/1s

Interface description: Query the complete market depth data, Updated once per
second,and support returning up to 5000 levels.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                             | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------------- | ----------- | ------------- |
| symbol    | string    | true     | Trading Pairs, and support returning up to 5000 levels. |             |               |

#### Response Parameter

| Parameter    | Data Type                          | Required | Description                                                      | Value Range |
| ------------ | ---------------------------------- | -------- | ---------------------------------------------------------------- | ----------- |
| status       | string                             | false    | Request Processing Result "ok","error"                           |             |
| ch           | string                             | false    | Data belonged channel，Format： market.$symbol.depth.$type       |             |
| ts           | long                               | false    | Time of Respond Generation, Unit: Millisecond                    |             |
| TICK>\_START |                                    | false    |                                                                  |             |
| ts           | 调整为新加坡时间的时间戳，单位毫秒 | false    | The UNIX timestamp in milliseconds is adjusted to Singapore time |             |
| version      | 内部字段                           | false    | Internal data                                                    |             |
| bids         | 当前的所有买单 \[price, size\]     | false    | The current all bids in format \[price, size\]                   |             |
| asks         | 当前的所有卖单 \[price, size\]     | false    | The current all asks in format \[price, size\]                   |             |
| TICK>\_END   |                                    | false    |                                                                  |             |

#### Request example

`curl"https://api.huobi.pro/market/fullMbp?symbol=ethusdt"`

#### Response Example

##### Success Example

{

"ch":

"market.btcusdt.depth.step0"

"status":

"ok"

"ts":

1629790438801

"tick":{

"ts":

1629790438215

"version":

136107114472

"bids":\[

0:\[

0

:

49790.87

1

:

0.779876

\]

1:\[

0

:

49785.9

1

:

0.000182

\]

2:\[

0

:

49784.48

1

:

0.002758

\]

3:\[

0

:

49784.29

1

:

0.05

\]

4:\[

0

:

49783.06

1

:

0.005038

\]

\]

"asks":\[

0:\[

0

:

49790.88

1

:

2.980472

\]

1:\[

0

:

49790.89

1

:

0.006613

\]

2:\[

0

:

49792.16

1

:

0.080302

\]

3:\[

0

:

49792.67

1

:

0.030112

\]

4:\[

0

:

49793.23

1

:

0.043103

\]

\]

}

}
