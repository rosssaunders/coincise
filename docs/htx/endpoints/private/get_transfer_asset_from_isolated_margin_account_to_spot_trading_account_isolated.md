# GET Transfer Asset from Isolated Margin Account to Spot Trading Account（Isolated）

**Source:** [Transfer Asset from Isolated Margin Account to Spot Trading Account（Isolated）](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4cb3f-7773-11ed-9966-0242ac110003)

**Category:** Margin Loan (Cross/Isolated)

## Authentication

Required (Private Endpoint)

### /v1/dw/transfer-out/margin ( Transfer Asset from Isolated Margin Account to Spot Trading Account（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint transfers specific asset from isolated margin account to spot trading account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol, e.g. btcusdt, bccbtc |  |  |
| currency | string | false | The currency to transfer |  |  |
| amount | string | false | The amount of currency to transfer |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | integer | false | Transfer id |  |
| status | string | false | status |  |
| code | integer | false | code |  |

#### Request example

{

"symbol":

"ethusdt"

"currency":

"eth"

"amount":

"1.0"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":

46971504

"code":

200

}