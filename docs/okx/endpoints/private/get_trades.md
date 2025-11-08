# GET trades

Source: [https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-trades](https://www.okx.com/docs-v5/en/#block-trading-rest-api-get-trades)

### Get trades

Retrieves the executed trades that the user is a counterparty to (either as the creator or the receiver).

#### Rate Limit: 5 requests per 2 seconds

#### Rate limit rule: User ID

#### Permission: Read

#### HTTP Request

`GET /api/v5/rfq/trades`

#### Request parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| rfqId | String | No | RFQ ID . |
| clRfqId | String | No | Client-supplied RFQ ID. If both `clRfqId` and `rfqId` are passed, `rfqId` will be treated as primary identifier |
| quoteId | String | No | Quote ID |
| blockTdId | String | No | Block trade ID |
| clQuoteId | String | No | Client-supplied Quote ID. If both `clQuoteId` and `quoteId` are passed, `quoteId` will be treated as primary identifier |
| beginId | String | No | The starting rfq id the request to begin with. Pagination of data to return records newer than the requested blockTdId, not including beginId. |
| endId | String | No | The last rfq id the request to end withPagination of data to return records earlier than the requested blockTdId, not including endId. |
| beginTs | String | No | Filter trade execution time with a begin timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085 |
| endTs | String | No | Filter trade execution time with an end timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085 |
| limit | String | No | Number of results per request. The maximum is 100 which is also the default value.  
If the number of trades in the requested range is bigger than 100, the latest 100 trades in the range will be returned. |
| isSuccessful | Boolean | No | Whether the trade is filled successfully.  
`true`: the default value. `false`. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| code | String | The result code, `0` means success. |
| msg | String | The error message, not empty if the code is not 0. |
| data | Array of objects | Array of objects containing the results of the block trade. |
| \> cTime | String | The time the trade was executed. Unix timestamp in milliseconds. |
| \> rfqId | String | RFQ ID. |
| \> clRfqId | String | Client-supplied RFQ ID. This attribute is treated as client sensitive information. It will not be exposed to the Maker, only return empty string. |
| \> quoteId | String | Quote ID. |
| \> clQuoteId | String | Client-supplied Quote ID. This attribute is treated as client sensitive information. It will not be exposed to the Taker, only return empty string. |
| \> blockTdId | String | Block trade ID. |
| \> tag | String | Trade tag. The block trade will have the tag of the RFQ or Quote it corresponds to. |
| \> tTraderCode | String | A unique identifier of the Taker. Empty if the anonymous parameter of the RFQ is set to be `true`. |
| \> mTraderCode | String | A unique identifier of the Maker. Empty if the anonymous parameter of the Quote is set to be `true`. |
| \> isSuccessful | Boolean | Whether the trade is filled successfully |
| \> errorCode | String | Error code for unsuccessful trades.  
It is "" for successful trade. |
| \> legs | Array of objects | Legs of trade |
| \>> instId | String | Instrument ID, e.g. `BTC-USDT-SWAP` |
| \>> px | String | The price the leg executed |
| \>> sz | String | Size of the leg in contracts or spot. |
| \>> side | String | The direction of the leg. Valid value can be buy or sell. |
| \>> fee | String | Fee. Negative number represents the user transaction fee charged by the platform. Positive number represents rebate. |
| \>> feeCcy | String | Fee currency |
| \>> tradeId | String | Last traded ID. |
| \>> tradeQuoteCcy | String | The quote currency used for trading. Only applicable to SPOT.  
The default value is the quote currency of the instId, for example: for `BTC-USD`, the default is `USD`. |
| \> acctAlloc | Array of objects | Applicable to both taker, maker |
| \>> blockTdId | String | Block trade ID |
| \>> errorCode | String | Error code for unsuccessful trades.  
It is "0" for successful trade. |
| \>> acct | String | The name of the allocated account of the RFQ  
Only applicable to taker, return "" to makers |
| \>> legs | Array of objects | The allocated legs of the account. |
| \>>> instId | String | The Instrument ID of each leg. Example : "BTC-USDT-SWAP" |
| \>>> sz | String | Filled size |
| \>>> tradeId | String | Trade ID |
| \>>> fee | String | Fee |
| \>>> feeCcy | String | Fee currency |

Group RFQ introduction  
  
1\. This endpoint is at parent RFQ level and contains account allocation. For parent RFQ, we should return the actual executed size, i.e. failed execution size should not be included in the parent RFQ level.  
2\. For account allocation, we should include both filled and failed child RFQ but add an errorCode to indicate whether a child RFQ is filled.  
3\. Trade results will only be returned to group RFQ creator. Allocated subaccounts and MSAs will not see trade results. Allocated accounts are expected to get these trades through trading bills.  
4\. Trades data will only be returned after all child RFQs are execuated.  
5\. For parent RFQ isSuccessful field,  
    1. it will return true if any child RFQs are filled  
    2. otherwise, if all child RFQ fails, it will return false  
6\. Parent RFQ blockTdId or legs tradeId will be empty. However, account allocation breakdown will be offered and blockTdId/tradeId will be attached.
