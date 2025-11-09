# GET [Isolated]Cancel all Take-profit and Stop-loss Orders

**Source:**
[[Isolated]Cancel all Take-profit and Stop-loss Orders](https://www.htx.com/en-us/opend/newApiPages/?id=8cb87d94-77b5-11ed-9966-0242ac110003)

**Category:** Swap Strategy Order Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/swap_tpsl_cancelall (\[Isolated\]Cancel all Take-profit and Stop-loss Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 5 times per second.

Interface description: This interface only supports isolated margin mode. The
frequency limit of this interface is 5 times per second.

#### Request Address

| Environment                         | Address              |
| ----------------------------------- | -------------------- |
| Online                              | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn  |

#### Request Parameter

| Parameter     | Data Type | Required | Description                                                    | Value Range       | Default Value |
| ------------- | --------- | -------- | -------------------------------------------------------------- | ----------------- | ------------- |
| contract_code | string    | true     | contract code                                                  | "BTC-USDT" ...    |               |
| direction     | string    | false    | direction false string direction（if not filled in means all） | \["buy", "sell"\] |               |

#### Response Parameter

| Parameter    | Data Type | Required | Description                                   | Value Range   |
| ------------ | --------- | -------- | --------------------------------------------- | ------------- |
| status       | string    | true     | status                                        | "ok", "error" |
| DATA_START   | object    | true     |                                               | dictionary    |
| ERRORS_START | object    | true     |                                               | dictionary    |
| order_id     | string    | true     | order id                                      |               |
| err_code     | long      | false    | error code                                    |               |
| err_msg      | string    | false    | error message                                 |               |
| ERRORS_END   |           | false    |                                               |               |
| successes    | string    | true     | successes orders                              |               |
| DATA_END     |           | false    |                                               |               |
| ts           | long      | true     | Time of Respond Generation，Unit: Millisecond |               |

#### Request example

{

"contract_code":

"BTC-USDT"

"direction":

"buy"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"errors":\[\]

"successes":

"795713650665832448,795714964661583872,795714964661583873"

}

"ts":

1609754843671

}
