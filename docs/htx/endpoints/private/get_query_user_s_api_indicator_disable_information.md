# GET Query user's API indicator disable information

**Source:** [Query user's API indicator disable information](https://www.htx.com/en-us/opend/newApiPages/?id=5d519e20-77b6-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /swap-api/v1/swap\_api\_trading\_status (Query user's API indicator disable information)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

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
| COR\_END |  | false |  |  |
| TDN\_START | dict object | true | Total Disable Number |  |
| disables\_threshold | long | true | disable threshold |  |
| disables | long | true | total disable number |  |
| is\_trigger | int | true |  | 1：triggered，0：not triggered |
| is\_active | int | true |  | 1：active，0：not active |
| TDN\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl "https://api.hbdm.com/swap-api/v1/swap_api_trading_status"`

#### Response Example

##### Success Example

`{ "status": "ok", "data": [{ "is_disable": 1, "order_price_types": "limit,post_only,FOK,IOC", "disable_reason":"COR", "disable_interval": 5, "recovery_time": 1, "COR": "orders_threshold": 150, "orders": 150, "invalid_cancel_orders": 150, "cancel_ratio_threshold": 0.98, "cancel_ratio": 0.98, "is_trigger": 1, "is_active": 1 } , "TDN": { "disables_threshold": 3, "disables": 3, "is_trigger": 1, "is_active": 1 } }], "ts": 158797866555 }`