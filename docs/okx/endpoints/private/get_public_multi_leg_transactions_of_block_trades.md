# GET public multi-leg transactions of block trades

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-multi-leg-transactions-of-block-trades](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-public-multi-leg-transactions-of-block-trades)

### Get public multi-leg transactions of block trades

Retrieves the executed block trades. The data will be updated 15 minutes after
the block trade execution.

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: IP

#### HTTP Request

`GET /api/v5/rfq/public-trades`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                                                         |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| beginId   | String | No       | The starting blockTdId the request to begin with. Pagination of data to return records newer than the requested `blockTdId`, not including beginId. |
| endId     | String | No       | The last blockTdId the request to end with. Pagination of data to return records earlier than the requested `blockTdId`, not including endId.       |
| limit     | String | No       | Number of results per request. The maximum is 100 which is also the default value.                                                                  |

#### Response Parameters

| Parameter                                              | Type             | Description                                                        |
| ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------ |
| code                                                   | String           | The result code, `0` means success.                                |
| msg                                                    | String           | The error message, not empty if the code is not 0.                 |
| data                                                   | Array of objects | Array of objects containing the results of the public block trade. |
| \> strategy                                            | String           | Option strategy, e.g. CALL_CALENDAR_SPREAD                         |
| \> cTime                                               | String           | The time the trade was executed. Unix timestamp in milliseconds.   |
| \> blockTdId                                           | String           | Block trade ID.                                                    |
| \> groupId                                             | String           | Group RFQ ID                                                       |
| Only applicable to group RFQ, return "" for normal RFQ |
| \> legs                                                | Array of objects | Legs of trade                                                      |
| \>> instId                                             | String           | Instrument ID, e.g. BTC-USDT-SWAP                                  |
| \>> px                                                 | String           | The price the leg executed                                         |
| \>> sz                                                 | String           | Trade quantity                                                     |

For spot trading, the unit is base currency  
For `FUTURES`/`SWAP`/`OPTION`, the unit is contract. | | \>> side | String | The
direction of the leg from the Takers perspective. Valid value can be buy or
sell. | | \>> tradeId | String | Last traded ID. |

Group RFQ introduction

1\. Add new response parameter groupId, facilitating clients to map subaccount
execution to group RFQ. Only applicable to group RFQ, return "" for normal
RFQ.  
2\. Data return by this endpoint should be at \*\*parent RFQ level\*\*
regardless of the subaccounts allocation. blockTdId and tradeId will be empty.
