# GET Cancel a Withdraw Request

**Source:** [Cancel a Withdraw Request](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4cda7-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v1/dw/withdraw-virtual/{withdraw-id}/cancel ( Cancel a Withdraw Request)

Request type: POST

Signature verification: Yes

Interface permission: Withdraw

Rate Limit: 20times/2s

Interface description: Parent user cancels a previously created withdrawal request by its transfer id.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| withdraw-id | long | false | Enter the"withdraw-id" in the path |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | long | false | Withdraw cancel id |  |

#### Request example

{

"withdraw-id":

"179211"

}

#### Response Example

##### Success Example

{

"data":

700

}