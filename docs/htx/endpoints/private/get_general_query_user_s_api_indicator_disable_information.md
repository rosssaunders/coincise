# GET [General] Query user's API indicator disable information

**Source:** [[General] Query user's API indicator disable information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb840a5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap\_api\_trading\_status (\[General\] Query user's API indicator disable information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most 144 times every 3 seconds for each UID (Trade Interface: at most 72 times every 3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated margin mode.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | response status | "ok" , "error" |
| ts | long | true | response millionseconds |  |
| DATA\_START | array object | true |  |  |
| is\_disable | int | true |  | 1：is disabled，0：isn't disabled |
| order\_price\_types | string | true | order price types,such as：“limit,post\_only,FOK,IOC” |  |
| disable\_reason | string | true | disable reason | "COR":（Cancel Order Ratio），“TDN”：（Total Disable Number） |
| disable\_interval | long | true | disable millionseconds |  |
| recovery\_time | long | true | recovery millionseconds |  |
| COR\_START | dict object | true | （Cancel Order Ratio） |  |
| orders\_threshold | long | true | orders threshold |  |
| orders | long | true | total pending orders |  |
| invalid\_cancel\_orders | long | true | numbers of invalid cancel orders |  |
| cancel\_ratio\_threshold | decimal | true | cancel ratio threshold |  |
| cancel\_ratio | decimal | true | cancel ratio |  |
| is\_trigger | int | true |  | 1: triggered，0: not triggered |
| is\_active | int | true |  | 1: active，0：not active |
| COR\_END | dict object | true |  |  |
| TDN\_START | dict object | true | Total Disable Number |  |
| disables\_threshold | long | true | disable threshold |  |
| disables | long | true | total disable number |  |
| is\_trigger | int | true |  | 1：triggered，0：not triggered |
| is\_active | int | true |  | 1：active，0：not active |
| TDN\_END | dict object | true |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_api_trading_status"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"is\_disable":

1

"order\_price\_types":

"limit,post\_only,FOK,IOC"

"disable\_reason":

"COR"

"disable\_interval":

5

"recovery\_time":

1

"COR":{

"orders\_threshold":

150

"orders":

150

"invalid\_cancel\_orders":

150

"cancel\_ratio\_threshold":

0.98

"cancel\_ratio":

0.98

"is\_trigger":

1

"is\_active":

1

}

"TDN":{

"disables\_threshold":

3

"disables":

3

"is\_trigger":

1

"is\_active":

1

}

}

\]

"ts":

158797866555

}