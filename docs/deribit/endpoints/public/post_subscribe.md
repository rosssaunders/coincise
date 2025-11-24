# POST /public/subscribe

Subscribe to one or more channels.

This is the same method as [/private/subscribe](#private_subscribe), but it can
only be used for 'public' channels.

**📖 Related Support Article:**
[Market Data Collection Best Practices](https://support.deribit.com/hc/en-us/articles/29592500256669-Market-Data-Collection-Best-Practices)

### Parameters

| Parameter | Required | Type  | Enum                                | Description |
| --------- | -------- | ----- | ----------------------------------- | ----------- |
| channels  | true     | array | A list of channels to subscribe to. |             |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |
