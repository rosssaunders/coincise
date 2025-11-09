# GET withdrawal history

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-history](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)

### Get withdrawal history

Retrieve the withdrawal records according to the currency, withdrawal status,
and time range in reverse chronological order. The 100 most recent records are
returned by default.  
Websocket API is also available, refer to
[Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel).

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/withdrawal-history`

#### Request Parameters

| Parameter                                                                                          | Type   | Required | Description                |
| -------------------------------------------------------------------------------------------------- | ------ | -------- | -------------------------- |
| ccy                                                                                                | String | No       | Currency, e.g. `BTC`       |
| wdId                                                                                               | String | No       | Withdrawal ID              |
| clientId                                                                                           | String | No       | Client-supplied ID         |
| A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters. |
| txId                                                                                               | String | No       | Hash record of the deposit |
| type                                                                                               | String | No       | Withdrawal type            |

`3`: Internal transfer  
`4`: On-chain withdrawal | | state | String | No | Status of withdrawal

- Stage 1 : Pending withdrawal `19`: insufficient balance in the hot wallet  
  `17`: Pending response from Travel Rule vendor  
  `10`: Waiting transfer  
  `0`: Waiting withdrawal  
  `4`/`5`/`6`/`8`/`9`/`12`: Waiting manual review  
  `7`: Approved  
  \> `0`, `17`, `19` can be cancelled, other statuses cannot be cancelled

- Stage 2 : Withdrawal in progress (Applicable to on-chain withdrawals, internal
  transfers do not have this stage) `1`: Broadcasting your transaction to
  chain  
  `15`: Pending transaction validation  
  `16`: Due to local laws and regulations, your withdrawal may take up to 24
  hours to arrive  
  `-3`: Canceling

- Final stage `-2`: Canceled  
  `-1`: Failed  
  `2`: Success | | after | String | No | Pagination of data to return records
  earlier than the requested ts, Unix timestamp format in milliseconds, e.g.
  `1654041600000` | | before | String | No | Pagination of data to return
  records newer than the requested ts, Unix timestamp format in milliseconds,
  e.g. `1656633600000` | | limit | String | No | Number of results per request.
  The maximum is `100`; The default is `100` |

#### Response Parameters

| Parameter                                                                              | Type    | Description                                                                                             |
| -------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| ccy                                                                                    | String  | Currency                                                                                                |
| chain                                                                                  | String  | Chain name, e.g. `USDT-ERC20`, `USDT-TRC20`                                                             |
| nonTradableAsset                                                                       | Boolean | Whether it is a non-tradable asset or not                                                               |
| `true`: non-tradable asset, `false`: tradable asset                                    |
| amt                                                                                    | String  | Withdrawal amount                                                                                       |
| ts                                                                                     | String  | Time the withdrawal request was submitted, Unix timestamp format in milliseconds, e.g. `1655251200000`. |
| from                                                                                   | String  | Withdrawal account                                                                                      |
| It can be `email`/`phone`/`sub-account name`                                           |
| areaCodeFrom                                                                           | String  | Area code for the phone number                                                                          |
| If `from` is a phone number, this parameter returns the area code for the phone number |
| to                                                                                     | String  | Receiving address                                                                                       |
| areaCodeTo                                                                             | String  | Area code for the phone number                                                                          |
| If `to` is a phone number, this parameter returns the area code for the phone number   |
| toAddrType                                                                             | String  | Address type                                                                                            |

`1`: wallet address, email, phone, or login account name  
`2`: UID | | tag | String | Some currencies require a tag for withdrawals. This
is not returned if not required. | | pmtId | String | Some currencies require a
payment ID for withdrawals. This is not returned if not required. | | memo |
String | Some currencies require this parameter for withdrawals. This is not
returned if not required. | | addrEx | Object | Withdrawal address attachment
(This will not be returned if the currency does not require this) e.g. TONCOIN
attached tag name is comment, the return will be {'comment':'123456'} | | txId |
String | Hash record of the withdrawal  
This parameter will return "" for internal transfers. | | fee | String |
Withdrawal fee amount | | feeCcy | String | Withdrawal fee currency, e.g. `USDT`
| | state | String | Status of withdrawal | | wdId | String | Withdrawal ID | |
clientId | String | Client-supplied ID | | note | String | Withdrawal note |
