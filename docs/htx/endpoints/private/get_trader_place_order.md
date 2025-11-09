# GET Trader place order

**Source:** [Trader place order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-19126a06eab)

**Category:** Future Copy Trade

## Authentication

Required (Private Endpoint)

### /copytrading/trader/place\_order (Trader place order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: A single user requests all copytrading interfaces 18 times per second.

Interface description: This interface is used by traders to place orders

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | String | true | contract code |  |  |
| price | String | false |  |  |  |
| amount | String | true |  |  |  |
| margin\_mode | String | true | isolated：，cross： |  |  |
| order\_price\_type | Integer | true | 1:limit、 2:opponent、6:optimal\_20、8:fok、13:opponent\_fok、16:optimal\_20\_fok、17:market |  |  |
| order\_direction | Integer | true | 1-buy,2-sell |  |  |
| lever | Integer | true |  |  |  |
| tp\_trigger\_price | String | false |  |  |  |
| sl\_trigger\_price | String | false |  |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tid | String | true | request id |  |
| data | Boolean | true | Transaction results | true ,or false |
| code | long | true |  |  |

#### Request example

{

"contract\_code":

"DOT-USDT"

"price":

8

"amount":

1

"margin\_mode":

"cross"

"order\_price\_type":

1

"order\_direction":

2

"lever":

5

"tp\_trigger\_price":

10

"sl\_trigger\_price":

10

}

#### Response Example

##### Success Example

{

"code":

200

"data":

true

"tid":

"9d94488290b1468d9d79b98c12898ca3"

"success":

true

}