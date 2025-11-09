# GET [Isolated]Set a Take-profit and Stop-loss Order for an Existing Position

**Source:** [[Isolated]Set a Take-profit and Stop-loss Order for an Existing Position](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87911-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_tpsl\_order (\[Isolated\]Set a Take-profit and Stop-loss Order for an Existing Position)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: All take-profit and stop-loss orders are position closing orders. This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second. Fill in at least one of the take-profit trigger price(tp\_trigger\_price) and stop-loss trigger price(sl\_trigger\_price). If all the trigger price is not filled in, this type of take-profit and stop-loss order will not be placed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | BTC-USDT |  |
| direction | string | true | direction | "buy", "sell" |  |
| volume | decimal | true | Numbers of orders (volume) |  |  |
| tp\_trigger\_price | decimal | false | Trigger price of take-profit order |  |  |
| tp\_order\_price | decimal | false | Order price of take-profit order（The order price is not required to fill in for Optimal N) |  |  |
| tp\_order\_price\_type | string | false | Order type of take-profit order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| sl\_trigger\_price | decimal | false | Trigger price of stop-loss order |  |  |
| sl\_order\_price | decimal | false | Order price of stop-loss order（The order price is not required to fill in for Optimal N） |  |  |
| sl\_order\_price\_type | string | false | Order type of stop-loss order | default is market; market，limit，optimal\_5，optimal\_10，optimal\_20 |  |
| price\_protect | booleanint | false | price protection, default is false. This parameter is only required when setting tp/sl | true or false |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok" , "error" |
| ts | long | true | time stamp |  |
| DATA\_START | object | false | Returned data when order is placed successfully, and will not be returned when order fails to be placed. |  |
| TP\_ORDER\_START | object | true | Order placing result of take-profit order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| TP\_ORDER\_END |  | false |  |  |
| SL\_ORDER\_START | object | true | Order placing result of stop-loss order |  |
| order\_id | long | true | order id |  |
| order\_id\_str | string | true | order id (string) |  |
| SL\_ORDER\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| err\_code | int | false | error code（only when order fails to be placed） |  |
| err\_msg | string | false | error message（only when order fails to be placed） |  |

Notes:  
When only take-profit order or stop-loss order is set , the accordingly returned "sl\_order" or "tp\_order" will be empty.

#### Request example

{

"contract\_code":

"btc-usdt"

"direction":

"sell"

"volume":

1

"tp\_trigger\_price":

32000

"tp\_order\_price":

32000

"tp\_order\_price\_type":

"optimal\_5"

"sl\_trigger\_price":

"29000"

"sl\_order\_price":

"29000"

"sl\_order\_price\_type":

"optimal\_5"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"tp\_order":{

"order\_id":

795713650661638100

"order\_id\_str":

"795713650661638144"

}

"sl\_order":{

"order\_id":

795713650665832400

"order\_id\_str":

"795713650665832448"

}

}

"ts":

1609754517975

}