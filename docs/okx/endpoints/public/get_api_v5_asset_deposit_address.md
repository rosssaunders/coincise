# GET /api/v5/asset/deposit-address

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-address](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-address)

### Get deposit address

Retrieve the deposit addresses of currencies, including previously-used
addresses.

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-address`

#### Request Parameters

| Parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| ccy       | String | Yes      | Currency, e.g. `BTC` |

#### Response Parameters

| Parameter                                                                                | Type   | Description                                                                                              |
| ---------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| addr                                                                                     | String | Deposit address                                                                                          |
| tag                                                                                      | String | Deposit tag (This will not be returned if the currency does not require a tag for deposit)               |
| memo                                                                                     | String | Deposit memo (This will not be returned if the currency does not require a memo for deposit)             |
| pmtId                                                                                    | String | Deposit payment ID (This will not be returned if the currency does not require a payment_id for deposit) |
| addrEx                                                                                   | Object | Deposit address attachment (This will not be returned if the currency does not require this)             |
| e.g. `TONCOIN` attached tag name is `comment`, the return will be `{'comment':'123456'}` |
| ccy                                                                                      | String | Currency, e.g. `BTC`                                                                                     |
| chain                                                                                    | String | Chain name, e.g. `USDT-ERC20`, `USDT-TRC20`                                                              |
| to                                                                                       | String | The beneficiary account                                                                                  |

`6`: Funding account `18`: Trading account  
The users under some entity (e.g. Brazil) only support deposit to trading
account. | | verifiedName | String | Verified name (for recipient) | | selected
| Boolean | Return `true` if the current deposit address is selected by the
website page | | ctAddr | String | Last 6 digits of contract address |
