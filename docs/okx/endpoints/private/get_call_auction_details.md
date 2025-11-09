# GET / Call auction details

Source:
[https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-call-auction-details](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-call-auction-details)

### GET / Call auction details

Retrieve call auction details.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/market/call-auction-details`

#### Request Parameters

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| instId    | String | Yes      | Instrument ID, e.g. `BTC-USDT` |

#### Response Parameters

| Parameter                    | Type   | Description                                            |
| ---------------------------- | ------ | ------------------------------------------------------ |
| instId                       | String | Instrument ID                                          |
| eqPx                         | String | Equilibrium price                                      |
| matchedSz                    | String | Matched size for both buy and sell                     |
| The unit is in base currency |
| unmatchedSz                  | String | Unmatched size                                         |
| auctionEndTime               | String | Call auction end time. Unix timestamp in milliseconds. |
| state                        | String | Trading state of the symbol                            |

`call_auction`  
`continuous_trading` | | ts | String | Data generation time. Unix timestamp in
millieseconds. |

During call auction, users can get the updates of equilibrium price, matched
size, unmatched size, and auction end time. The data will be updated around once
a second. The endpoint returns the actual open price, matched size, and
unmatched size when the call auction ends.  
For symbols that never go through call auction, the endpoint will also return
results but with state always as \`continuous_trading\` and other fields as 0 or
empty.
