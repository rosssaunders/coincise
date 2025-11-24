# GET /api/v5/public/insurance-fund

Source:
[https://www.okx.com/docs-v5/en/#public-data-rest-api-get-security-fund](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-security-fund)

### Get security fund

Get security fund balance information

#### Rate Limit: 10 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/public/insurance-fund`

#### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| instType  | String | Yes      | Instrument type |

`MARGIN`  
`SWAP`  
`FUTURES`  
`OPTION` | | type | String | No | Type  
`regular_update`  
`liquidation_balance_deposit`  
`bankruptcy_loss`  
`platform_revenue`  
`adl`: ADL historical data  
The default is `all type` | | instFamily | String | Conditional | Instrument
family  
Required for `FUTURES`/`SWAP`/`OPTION` | | ccy | String | Conditional |
Currency, only applicable to `MARGIN` | | before | String | No | Pagination of
data to return records newer than the requested `ts` | | after | String | No |
Pagination of data to return records earlier than the requested `ts` | | limit |
String | No | Number of results per request. The maximum is `100`; The default
is `100` |

#### Response Parameters

| Parameter                                                                                      | Type             | Description                                                                                                                               |
| ---------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| total                                                                                          | String           | The total balance of security fund, in `USD`                                                                                              |
| instFamily                                                                                     | String           | Instrument family                                                                                                                         |
| Applicable to `FUTURES`/`SWAP`/`OPTION`                                                        |
| instType                                                                                       | String           | Instrument type                                                                                                                           |
| details                                                                                        | Array of objects | security fund data                                                                                                                        |
| \> balance                                                                                     | String           | The balance of security fund                                                                                                              |
| \> amt                                                                                         | String           | The change in the balance of security fund                                                                                                |
| Applicable when type is `liquidation_balance_deposit`, `bankruptcy_loss` or `platform_revenue` |
| \> ccy                                                                                         | String           | The currency of security fund                                                                                                             |
| \> type                                                                                        | String           | The type of security fund                                                                                                                 |
| \> maxBal                                                                                      | String           | Maximum security fund balance in the past eight hours                                                                                     |
| Only applicable when type is `adl`                                                             |
| \> maxBalTs                                                                                    | String           | Timestamp when security fund balance reached maximum in the past eight hours, Unix timestamp format in milliseconds, e.g. `1597026383085` |
| Only applicable when type is `adl`                                                             |
| \> decRate                                                                                     | String           | ~Real-time security fund decline rate (compare balance and maxBal)                                                                        |
| Only applicable when type is `adl`~(Deprecated)                                                |
| \> adlType                                                                                     | String           | ADL related events                                                                                                                        |

`rate_adl_start`: ADL begins due to high security fund decline rate  
`bal_adl_start`: ADL begins due to security fund balance falling  
`pos_adl_start`：ADL begins due to the volume of liquidation orders falls to a
certain level (only applicable to premarket symbols)  
`adl_end`: ADL ends  
Only applicable when type is `adl` | | \> ts | String | The update timestamp of
security fund. Unix timestamp format in milliseconds, e.g. `1597026383085` |

The enumeration value \`regular_update\` of type field is used to present
up-to-minute security fund change. The amt field will be used to present the
difference of security fund balance when the type field is
\`liquidation_balance_deposit\`, \`bankruptcy_loss\` or \`platform_revenue\`,
which is generated once per day around 08:00 am (UTC). When type is
\`regular_update\`, the amt field will be returned as "".
