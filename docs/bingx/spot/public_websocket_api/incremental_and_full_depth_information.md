## Incremental and Full Depth Information

Push incremental depth information of 1000 levels every 500ms.

How the client should maintain incremental depth locally

1\. After successfully subscribing, a full depth with an action field value of
'all' will be returned, along with a lastUpdateId used to handle the continuity
of subsequent incremental depth. After receiving the full depth, the WebSocket
should cache the full depth data in memory.

2\. Subsequent depth changes will return incremental depth, with the action
field set to 'update'. The value of the Nth incremental depth's lastUpdateId
should be the N-1th depth's lastUpdateId + 1.

3\. In rare cases where lastUpdateId is not continuous, you can choose to
reconnect, or cache the last three incremental depths and try to merge the data
by finding continuous lastUpdateId from the cache (because due to multithreading
or network routing issues, data order may not be strongly guaranteed).

4\. Then, iterate over the received incremental depth and compare it with the
current depth one by one. It's recommended to consider thread-safe design and
coding practices (as the push frequency may increase later). The data structure
could be a sorted map, such as TreeMap:

(1) If the price level does not exist in the current depth, it means a new price
level should be added. (Add)

(2) If the quantity corresponding to the price is 0, the price level should be
removed from the current depth. (Delete)

(3) If the quantity corresponding to the price is different from the current
value, replace it with the quantity returned by the incremental depth. (Update)

(4) After traversing, you will obtain the latest depth, update the depth cache,
and remember to update the lastUpdateId.

Subscription Type

dataType is <symbol>@incrDepth, for example, BTC-USDT@incrDepth

Subscription Example

{"id":"975f7385-7f28-4ef1-93af-df01cb9ebb53","reqType":
"sub","dataType":"BTC-USDT@incrDepth"}

Subscription Parameters

### Request Parameters

| Parameter Name | Type   | Required | Field Description                                                   |
| -------------- | ------ | -------- | ------------------------------------------------------------------- |
| id             | string | yes      | Subscription ID                                                     |
| reqType        | string | yes      | Request type: Subscribe - sub; Unsubscribe - unsub                  |
| dataType       | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USD |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html](https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html)
