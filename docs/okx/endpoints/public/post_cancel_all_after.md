# POST / Cancel All After

Source: [https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-cancel-all-after](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)

### POST / Cancel All After

Cancel all pending orders after the countdown timeout. Applicable to all trading symbols through order book (except Spread trading)  

#### Rate Limit: 1 request per second

#### Rate limit rule: User ID + tag

#### Permission: Trade

#### HTTP Request

`POST /api/v5/trade/cancel-all-after`

#### Request Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| timeOut | String | Yes | The countdown for order cancellation, with second as the unit.  
Range of value can be 0, \[10, 120\].  
Setting timeOut to 0 disables Cancel All After. |
| tag | String | No | CAA order tag  
A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters. |

#### Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| triggerTime | String | The time the cancellation is triggered.  
triggerTime=0 means Cancel All After is disabled. |
| tag | String | CAA order tag |
| ts | String | The time the request is received. |

Users are recommended to send heartbeat to the exchange every second. When the cancel all after is triggered, the trading engine will cancel orders on behalf of the client one by one and this operation may take up to a few seconds. This feature is intended as a protection mechanism for clients only and clients should not use this feature as part of their trading strategies.

  
To use tag level CAA, first, users need to set tags for their orders using the \`tag\` request parameter in the placing orders endpoint. When calling the CAA endpoint, if the \`tag\` request parameter is not provided, the default will be to set CAA at the account level. In this case, all pending orders for all order book trading symbols under that sub-account will be cancelled when CAA triggers, consistent with the existing logic. If the \`tag\` request parameter is provided, CAA will be set at the order tag level. When triggered, only pending orders of order book trading symbols with the specified tag will be canceled, while orders with other tags or no tags will remain unaffected.  
  
Users can run a maximum of 20 tag level CAAs simultaneously under the same sub-account. The system will only count live tag level CAAs. CAAs that have been triggered or revoked by the user will not be counted. The user will receive error code 51071 when exceeding the limit.
