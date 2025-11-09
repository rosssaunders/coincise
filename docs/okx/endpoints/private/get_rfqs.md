# GET rfqs

Source:
[https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-rfqs](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-rfqs)

### Get rfqs

Retrieves details of RFQs that the user is a counterparty to (either as the
creator or the receiver of the RFQ).

#### Rate Limit: 2 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/rfqs`

#### Request parameters

| Parameter | Type   | Required | Description                                                                                                     |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| rfqId     | String | No       | RFQ ID .                                                                                                        |
| clRfqId   | String | No       | Client-supplied RFQ ID. If both `clRfqId` and `rfqId` are passed, `rfqId` will be treated as primary identifier |
| state     | String | No       | The status of the RFQ.                                                                                          |

Valid values can be `active` `canceled` `pending_fill` `filled` `expired`
`failed` `traded_away`.  
`traded_away` only applies to Maker | | beginId | String | No | Start rfq id the
request to begin with. Pagination of data to return records newer than the
requested rfqId, not including beginId | | endId | String | No | End rfq id the
request to end with. Pagination of data to return records earlier than the
requested rfqId, not including endId | | limit | String | No | Number of results
per request. The maximum is 100 which is also the default value. |

#### Response Parameters

| Parameter | Type             | Description                                                                    |
| --------- | ---------------- | ------------------------------------------------------------------------------ |
| code      | String           | The result code, `0` means success.                                            |
| msg       | String           | The error message, not empty if the code is not 0.                             |
| data      | Array of objects | Array of objects containing the results of the RFQ creation.                   |
| \> cTime  | String           | The timestamp the RFQ was created. Unix timestamp format in milliseconds.      |
| \> uTime  | String           | The timestamp the RFQ was last updated. Unix timestamp format in milliseconds. |
| \> state  | String           | The status of the RFQ.                                                         |

Valid values can be `active` `canceled` `pending_fill` `filled` `expired`
`failed` `traded_away`.  
`traded_away` only applies to Maker | | \> counterparties | Array of strings |
The list of counterparties traderCode the RFQ was broadcasted to. | | \>
validUntil | String | The timestamp the RFQ expires. Unix timestamp format in
milliseconds. | | \> clRfqId | String | Client-supplied RFQ ID.  
This attribute is treated as client sensitive information. It will not be
exposed to the Maker, only return empty string. | | \> tag | String | RFQ tag.  
The block trade associated with the RFQ will have the same tag. | | \> flowType
| String | Identify the type of the RFQ.  
Only applicable to Makers, return "" for Takers | | \> traderCode | String | A
unique identifier of taker. Empty if the anonymous parameter of the RFQ is set
to be `true`. | | \> rfqId | String | RFQ ID. | | \> allowPartialExecution |
Boolean | Whether the RFQ can be partially filled provided that the shape of
legs stays the same.  
Valid value is `true` or `false`. `false` by default. | | \> legs | Array of
objects | Legs of RFQ | | \>> instId | String | Instrument ID, e.g.
BTC-USDT-SWAP | | \>> tdMode | String | Trade mode  
Margin mode: `cross` `isolated`  
Non-Margin mode: `cash`.  
If not provided, tdMode will inherit default values set by the system shown
below:  
Futures mode & SPOT: `cash`  
Buy options in Futures mode and Multi-currency Margin: `isolated`  
Other cases: `cross` | | \>> ccy | String | Margin currency.  
Only applicable to `cross` `MARGIN` orders in `Futures mode`. The parameter will
be ignored in other scenarios. | | \>> sz | String | Size of the leg in
contracts or spot. | | \>> side | String | The direction of the leg. Valid
values can be buy or sell. | | \>> posSide | String | Position side.  
The default is `net` in the net mode. If not specified, return "", which is
equivalent to net.  
It can only be `long` or `short` in the long/short mode. If not specified,
return "", which corresponds to the direction that opens new positions for the
trade (buy => long, sell => short).  
Only applicable to `FUTURES`/`SWAP`. | | \>> tgtCcy | String | Defines the unit
of the “sz” attribute.  
Only applicable to instType = SPOT.  
The valid enumerations are base_ccy and quote_ccy. When not specified this is
equal to base_ccy by default. | | \>> tradeQuoteCcy | String | The quote
currency used for trading. Only applicable to SPOT.  
The default value is the quote currency of the instId, for example: for
`BTC-USD`, the default is `USD`. | | \> groupId | String | Group RFQ ID  
Only applicable to group RFQ, return "" for normal RFQ | | \> acctAlloc | Array
of objects | Account level allocation of the RFQ  
This is only applicable to the taker. | | \>> acct | String | The name of the
allocated account of the RFQ. | | \>> legs | Array of objects | The allocated
legs of the account. | | \>>> instId | String | The Instrument ID of each leg.
Example : "BTC-USDT-SWAP" | | \>>> sz | String | The allocated size of each leg.
| | \>>> tdMode | String | Trade mode | | \>>> ccy | String | Margin currency |
| \>>> posSide | String | Position side |

Group RFQ introduction

1\. allowPartialExecution field is always true for group RFQ for taker and
maker.  
2\. Add a new response parameter acctAlloc with all account allocation the same
as the initial request, but it is only applicable to takers.  
3\. Add a new response parameter groupId, applicable to both takers and
makers.  
4\. For group RFQ state,  
    1. if any allocated account is pending execution, then pending_fill  
    2. otherwise,  
        1. if any allocated account is filled, then filled  
        2. if all allocated accounts are failed, then failed
