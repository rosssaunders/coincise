# GET [General] Query user's API indicator disable information

**Source:**
[[General] Query user's API indicator disable information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb840a5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Account Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_api_trading_status (\[General\] Query user's API indicator disable information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: Generally, the private interface rate limit of API key is at most
144 times every 3 seconds for each UID (Trade Interface: at most 72 times every
3 seconds. Read Interface: at most 72 times every 3 seconds) (this rate limit is
shared by all the altcoins contracts delivered by different date).

Interface description: The interface supports cross margin mode and isolated
margin mode.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter              | Data Type    | Required | Description                                          | Value Range                                                   |
| ---------------------- | ------------ | -------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| status                 | string       | true     | response status                                      | "ok" , "error"                                                |
| ts                     | long         | true     | response millionseconds                              |                                                               |
| DATA_START             | array object | true     |                                                      |                                                               |
| is_disable             | int          | true     |                                                      | 1：is disabled，0：isn't disabled                             |
| order_price_types      | string       | true     | order price types,such as：“limit,post_only,FOK,IOC” |                                                               |
| disable_reason         | string       | true     | disable reason                                       | "COR":（Cancel Order Ratio），“TDN”：（Total Disable Number） |
| disable_interval       | long         | true     | disable millionseconds                               |                                                               |
| recovery_time          | long         | true     | recovery millionseconds                              |                                                               |
| COR_START              | dict object  | true     | （Cancel Order Ratio）                               |                                                               |
| orders_threshold       | long         | true     | orders threshold                                     |                                                               |
| orders                 | long         | true     | total pending orders                                 |                                                               |
| invalid_cancel_orders  | long         | true     | numbers of invalid cancel orders                     |                                                               |
| cancel_ratio_threshold | decimal      | true     | cancel ratio threshold                               |                                                               |
| cancel_ratio           | decimal      | true     | cancel ratio                                         |                                                               |
| is_trigger             | int          | true     |                                                      | 1: triggered，0: not triggered                                |
| is_active              | int          | true     |                                                      | 1: active，0：not active                                      |
| COR_END                | dict object  | true     |                                                      |                                                               |
| TDN_START              | dict object  | true     | Total Disable Number                                 |                                                               |
| disables_threshold     | long         | true     | disable threshold                                    |                                                               |
| disables               | long         | true     | total disable number                                 |                                                               |
| is_trigger             | int          | true     |                                                      | 1：triggered，0：not triggered                                |
| is_active              | int          | true     |                                                      | 1：active，0：not active                                      |
| TDN_END                | dict object  | true     |                                                      |                                                               |
| DATA_END               |              | false    |                                                      |                                                               |

#### Request example

`curl "https://api.hbdm.com/linear-swap-api/v1/swap_api_trading_status"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":\[

0:{

"is_disable":

1

"order_price_types":

"limit,post_only,FOK,IOC"

"disable_reason":

"COR"

"disable_interval":

5

"recovery_time":

1

"COR":{

"orders_threshold":

150

"orders":

150

"invalid_cancel_orders":

150

"cancel_ratio_threshold":

0.98

"cancel_ratio":

0.98

"is_trigger":

1

"is_active":

1

}

"TDN":{

"disables_threshold":

3

"disables":

3

"is_trigger":

1

"is_active":

1

}

}

\]

"ts":

158797866555

}
