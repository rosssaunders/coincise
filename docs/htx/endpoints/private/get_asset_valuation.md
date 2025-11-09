# GET Asset Valuation

**Source:**
[Get Asset Valuation](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4ff6d-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/account/asset-valuation ( Get Asset Valuation)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the valuation of the total assets
of the account in btc or fiat currency.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter         | Data Type | Required | Description                                                                                              | Value Range                                                                                     | Default Value |
| ----------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| accountType       | string    | false    | The type of this account                                                                                 | spot, margin, otc, super-margin                                                                 |               |
| valuationCurrency | string    | false    | The valuation according to the certain fiat currency                                                     | BTC, CNY, USD, JPY, KRW, GBP, TRY, EUR, RUB, VND, HKD, TWD, MYR, SGD, AED, SAR (case sensitive) | BTC           |
| subUid            | long      | false    | Sub User's UID. When sub user's UID is not specified, the response would include the records of API key. |                                                                                                 |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                          | Value Range |
| ---------- | --------- | -------- | ---------------------------------------------------- | ----------- |
| code       | string    | false    | status code                                          |             |
| ok         | string    | false    |                                                      |             |
| DATA_START | object    | false    |                                                      |             |
| balance    | string    | false    | The valuation according to the certain fiat currency |             |
| timestamp  | long      | false    | Return time                                          |             |
| DATA_END   |           | false    |                                                      |             |

#### Request example

`curl"https://api.huobi.pro/v2/account/asset-valuation?accountType=spot&valuationCurrency=BTC&subUid=xxxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"balance":

"34.75"

"timestamp":

1594901254363

}

"ok":

true

}
