# GET /api/v5/asset/deposit-history

Source:
[https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-history](https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-deposit-history)

### Get deposit history

Retrieve the deposit records according to the currency, deposit status, and time
range in reverse chronological order. The 100 most recent records are returned
by default.  
Websocket API is also available, refer to
[Deposit info channel](/docs-v5/en/#funding-account-websocket-deposit-info-channel).

#### Rate Limit: 6 requests per second

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/asset/deposit-history`

#### Request Parameters

| Parameter                                                                                                             | Type   | Required | Description                                 |
| --------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ------------------------------------------- |
| ccy                                                                                                                   | String | No       | Currency, e.g. `BTC`                        |
| depId                                                                                                                 | String | No       | Deposit ID                                  |
| fromWdId                                                                                                              | String | No       | Internal transfer initiator's withdrawal ID |
| If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator |
| txId                                                                                                                  | String | No       | Hash record of the deposit                  |
| type                                                                                                                  | String | No       | Deposit Type                                |

`3`: internal transfer  
`4`: deposit from chain | | state | String | No | Status of deposit  
`0`: waiting for confirmation  
`1`: deposit credited  
`2`: deposit successful  
`8`: pending due to temporary deposit suspension on this crypto currency  
`11`: match the address blacklist  
`12`: account or deposit is frozen  
`13`: sub-account deposit interception  
`14`: KYC limit  
`17`: Pending response from Travel Rule vendor | | after | String | No |
Pagination of data to return records earlier than the requested ts, Unix
timestamp format in milliseconds, e.g. `1654041600000` | | before | String | No
| Pagination of data to return records newer than the requested ts, Unix
timestamp format in milliseconds, e.g. `1656633600000` | | limit | string | No |
Number of results per request. The maximum is `100`; The default is `100` |

#### Response Parameters

| Parameter                                                                                                                                                                                                                       | Type   | Description                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| ccy                                                                                                                                                                                                                             | String | Currency                                                                                                      |
| chain                                                                                                                                                                                                                           | String | Chain name                                                                                                    |
| amt                                                                                                                                                                                                                             | String | Deposit amount                                                                                                |
| from                                                                                                                                                                                                                            | String | Deposit account                                                                                               |
| If the deposit comes from an internal transfer, this field displays the account information of the internal transfer initiator, which can be a mobile phone number or email address (masked), and will return "" in other cases |
| areaCodeFrom                                                                                                                                                                                                                    | String | If `from` is a phone number, this parameter return area code of the phone number                              |
| to                                                                                                                                                                                                                              | String | Deposit address                                                                                               |
| If the deposit comes from the on-chain, this field displays the on-chain address, and will return "" in other cases                                                                                                             |
| txId                                                                                                                                                                                                                            | String | Hash record of the deposit                                                                                    |
| ts                                                                                                                                                                                                                              | String | The timestamp that the deposit record is created, Unix timestamp format in milliseconds, e.g. `1655251200000` |
| state                                                                                                                                                                                                                           | String | Status of deposit                                                                                             |

`0`: Waiting for confirmation  
`1`: Deposit credited  
`2`: Deposit successful  
`8`: Pending due to temporary deposit suspension on this crypto currency  
`11`: Match the address blacklist  
`12`: Account or deposit is frozen  
`13`: Sub-account deposit interception  
`14`: KYC limit | | depId | String | Deposit ID | | fromWdId | String | Internal
transfer initiator's withdrawal ID  
If the deposit comes from internal transfer, this field displays the withdrawal
ID of the internal transfer initiator, and will return "" in other cases | |
actualDepBlkConfirm | String | The actual amount of blockchain confirmed in a
single deposit |

About deposit state  
**Waiting for confirmation** is that the required number of blockchain
confirmations has not been reached.  
**Deposit credited** is that there is sufficient number of blockchain
confirmations for the currency to be credited to the account, but it cannot be
withdrawn yet.  
**Deposit successful** means the crypto has been credited to the account and it
can be withdrawn.
