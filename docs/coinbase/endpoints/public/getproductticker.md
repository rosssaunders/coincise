# GET /unknown

**Source:**
[Get product ticker](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductticker)

## Authentication

Not Required (Public Endpoint)

## 

[​

](#real-time-updates)

Real-time updates

Coinbase recommends that you get real-time updates by connecting with the WebSocket stream and listening for match messages, rather than polling.

#### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| product\_id | string | required | ​product\_idstringrequired |

[​

](#parameter-product-id)

product\_id

string

required

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| ask | string | required |  |
| bid | string | required |  |
| volume | string | required | ​volumestringrequired |
| trade\_id | integer | required | ​trade\_idintegerrequired |
| price | string | required |  |
| size | string | required |  |
| time | string | required | ​timestring<date-time>required |
| rfq\_volume | string | optional |  |
| conversions\_volume | string | optional | ​conversions\_volumestring |

200

application/json

[​

](#response-ask)

ask

string

required

[​

](#response-bid)

bid

string

required

[​

](#response-volume)

volume

string

required

[​

](#response-trade-id)

trade\_id

integer

required

[​

](#response-price)

price

string

required

[​

](#response-size)

size

string

required

[​

](#response-time)

time

string<date-time>

required

[​

](#response-rfq-volume)

rfq\_volume

string

[​

](#response-conversions-volume)

conversions\_volume

string
