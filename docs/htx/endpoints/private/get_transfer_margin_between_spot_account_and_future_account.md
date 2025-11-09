# GET Transfer margin between Spot account and Future account

**Source:**
[Transfer margin between Spot account and Future account](https://www.htx.com/en-us/opend/newApiPages/?id=28c33390-77ae-11ed-9966-0242ac110003)

**Category:** Future Transferring Interface

## Authentication

Required (Private Endpoint)

### https://api.huobi.pro/v1/futures/transfer (Transfer margin between Spot account and Future account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1times/1s

#### Request Address

| Environment | Address                                   |
| ----------- | ----------------------------------------- |
| Online      | https://api.huobi.pro/v1/futures/transfer |

#### Request Parameter

| Parameter | Data Type | Required | Description                | Value Range | Default Value                                                                                                                 |
| --------- | --------- | -------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| currency  | string    | true     | currency. Case insensitive |             | e.g. btc, BTC                                                                                                                 |
| amount    | Decimal   | true     | Transferring amount        |             |                                                                                                                               |
| type      | string    | true     | type of the transfer       |             | Transfer from Future account to Spot account: “futures-to-pro” Transfer from Spot account to Future account: "pro-to-futures" |

#### Response Parameter

| Parameter | Data Type | Required | Description            | Value Range                           |
| --------- | --------- | -------- | ---------------------- | ------------------------------------- |
| status    | string    | true     | Response status        | ok, error                             |
| data      | long      | true     | Transfer ID            | If status="error", data will be null. |
| err-code  | string    | true     | Error code             |                                       |
| err-msg   | string    | true     | Error code description |                                       |

#### Request example

{

"currency":

"btc"

"amount":

10

"type":

"futures-to-pro"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

179697972

}
