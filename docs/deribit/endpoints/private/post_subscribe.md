# POST /private/subscribe

Subscribe to one or more channels.

The name of the channel determines what information will be provided, and in
what form.

**📖 Related Support Article:**
[Market Data Collection Best Practices](https://support.deribit.com/hc/en-us/articles/29592500256669-Market-Data-Collection-Best-Practices)

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                         | Description |
| --------- | -------- | ------ | -------------------------------------------------------------------------------------------- | ----------- |
| channels  | true     | array  | A list of channels to subscribe to.                                                          |             |
| label     | false    | string | Optional label which will be added to notifications of private channels (max 16 characters). |             |

### Response

| Name    | Type            | Description                         |
| ------- | --------------- | ----------------------------------- |
| id      | integer         | The id that was sent in the request |
| jsonrpc | string          | The JSON-RPC version (2.0)          |
| result  | array of string | A list of subscribed channels.      |
