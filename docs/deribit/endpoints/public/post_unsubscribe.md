## /public/unsubscribe

Unsubscribe from one or more channels. The response contains only the channels
that were successfully unsubscribed in this request.

**Note:** The `result` field in the response contains only the channels that
were successfully processed and unsubscribed from this specific request. It does
not include all previously subscribed topics. If a channel in the request is
invalid, not subscribed, or fails validation, it will not appear in the result.

### Parameters

| Parameter | Required | Type  | Enum | Description                                                                                                     |
| --------- | -------- | ----- | ---- | --------------------------------------------------------------------------------------------------------------- |
| channels  | true     | array |      | A list of channels to unsubscribe from. Only successfully unsubscribed channels will be returned in the result. |

### Response

| Name    | Type            | Description                                                          |
| ------- | --------------- | -------------------------------------------------------------------- |
| id      | integer         |                                                                      |
| jsonrpc | string          |                                                                      |
| result  | array of string | List of channels that were successfully unsubscribed in this request |
