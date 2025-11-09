# GET [Isolated]Cancel a Take-profit and Stop-loss Order

**Source:** [[Isolated]Cancel a Take-profit and Stop-loss Order](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87bc0-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_tpsl\_cancel (\[Isolated\]Cancel a Take-profit and Stop-loss Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The frequency limit of this interface is 5 times per second.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| contract\_code | string | true | contract code | "BTC-USDT" ... |  |
| order\_id | string | true | order ID（different IDs are separated by ",", maximum 10 orders can be withdrew at one time） |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status | "ok", "error" |
| DATA\_START | object | true |  | dictionary |
| ERRORS\_START | object | true |  | dictionary |
| order\_id | string | true | order id |  |
| err\_code | long | false | error code |  |
| err\_msg | string | false | error message |  |
| ERRORS\_END |  | false |  |  |
| successes | string | true | successes orders |  |
| DATA\_END |  | false |  |  |
| ts | long | true | Time of Respond Generation，Unit: Millisecond |  |

#### Request example

{

"contract\_code":

"BTC-USDT"

"order\_id":

"2345567123"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[

0:{

"order\_id":

"795713650661638145"

"err\_code":

1061

"err\_msg":

"This order doesnt exist."

}

\]

"successes":

"795713650661638144"

}

"ts":

1609754722004

}