# GET Cancel All

**Source:** [Cancel All](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195894f0cf6)

**Category:** Orders

## Authentication

Required (Private Endpoint)

### /v5/trade/cancel\_all\_orders (Cancel All)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: Cancel all open orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online (preferred by aws customers) | https://api.hbdm.vn |
| Online | https://api.hbdm.com |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | false | Symbol |  |  |
| side | String | false | Order side | buy; sell |  |
| position\_side | String | false | Position side | long: going long; short: going short; both: One-way mode |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| order\_id | String | true | Order ID |  |
| client\_order\_id | String | true | Your order ID |  |

#### Request example

{

"contract\_code":

"BTC-USDT-241115"

"side":

"buy"

"position\_side":

"long"

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"client\_order\_id":

"1329854624317231104"

"code":

200

"message":

"成功"

"order\_id":

"1329854624317231104"

}

1:{

"client\_order\_id":

"1329854624434671616"

"code":

200

"message":

"成功"

"order\_id":

"1329854624434671616"

}

2:{

"client\_order\_id":

"1329854624824741888"

"code":

200

"message":

"成功"

"order\_id":

"1329854624824741888"

}

3:{

"client\_order\_id":

"1329854624686329856"

"code":

200

"message":

"成功"

"order\_id":

"1329854624686329856"

}

4:{

"client\_order\_id":

"1329854624258510848"

"code":

200

"message":

"成功"

"order\_id":

"1329854624258510848"

}

5:{

"client\_order\_id":

"1329854624380145664"

"code":

200

"message":

"成功"

"order\_id":

"1329854624380145664"

}

6:{

"client\_order\_id":

"1329854624497586176"

"code":

200

"message":

"成功"

"order\_id":

"1329854624497586176"

}

7:{

"client\_order\_id":

"1329854624556306432"

"code":

200

"message":

"成功"

"order\_id":

"1329854624556306432"

}

8:{

"client\_order\_id":

"1329854624971542528"

"code":

200

"message":

"成功"

"order\_id":

"1329854624971542528"

}

9:{

"client\_order\_id":

"1329854625118343168"

"code":

200

"message":

"成功"

"order\_id":

"1329854625118343168"

}

10:{

"client\_order\_id":

"1329854624615026688"

"code":

200

"message":

"成功"

"order\_id":

"1329854624615026688"

}

11:{

"client\_order\_id":

"1329849524702072832"

"code":

200

"message":

"成功"

"order\_id":

"1329849524702072832"

}

12:{

"client\_order\_id":

"1329854624753438720"

"code":

200

"message":

"成功"

"order\_id":

"1329854624753438720"

}

13:{

"client\_order\_id":

"1329854624896045056"

"code":

200

"message":

"成功"

"order\_id":

"1329854624896045056"

}

\]

"message":

"Success"

"ts":

1737104244869

}