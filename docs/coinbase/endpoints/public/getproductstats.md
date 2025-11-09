# GET /unknown

**Source:**
[Get product stats](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getproductstats)

## Authentication

Not Required (Public Endpoint)

The`volume` property is in base currency units. Properties `open`, `high`, `low` are in quote currency units.

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
| open | string | required |  |
| high | string | required |  |
| low | string | required |  |
| last | string | required |  |
| volume | string | required | ​volumestringrequired |
| volume\_30day | string | optional |  |
| rfq\_volume\_24hour | string | optional | ​rfq\_volume\_24hourstring |
| rfq\_volume\_30day | string | optional | ​rfq\_volume\_30daystring |
| conversions\_volume\_24hour | string | optional | ​conversions\_volume\_24hourstring |
| conversions\_volume\_30day | string | optional | ​conversions\_volume\_30daystring |

200

application/json

[​

](#response-open)

open

string

required

[​

](#response-high)

high

string

required

[​

](#response-low)

low

string

required

[​

](#response-last)

last

string

required

[​

](#response-volume)

volume

string

required

[​

](#response-volume-30day)

volume\_30day

string

[​

](#response-rfq-volume-24hour)

rfq\_volume\_24hour

string

[​

](#response-rfq-volume-30day)

rfq\_volume\_30day

string

[​

](#response-conversions-volume-24hour)

conversions\_volume\_24hour

string

[​

](#response-conversions-volume-30day)

conversions\_volume\_30day

string
