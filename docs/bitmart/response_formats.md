# Response Formats

### Successful Response Format

The format of the success message returned by the BitMart server to the client.

The returned field not contains `errorCode`

Successful Response Format

Copy Success

Copy to Clipboard

`When op=login: {"event":"<operation>"}  When op=unsubscribe: {"event":"<operation>","topic":"<topic>"}  When op=subscribe: {"table":"<topic1>","data":"[{"<value1>","<value2>"}]"} {"table":"<topic2>","data":"[{"<value1>","<value2>"}]"}`

**Example**:

### Failed Response Format

The format of the failed message returned by the BitMart server to the client.

If the returned field contains `errorCode`, it means failure. For the reason of
failure, please refer to: [WebSocket Error Code](#websocket-error-code)

Failed Response Format

Copy Success

Copy to Clipboard

`{"event":"<operation>","errorMessage":"<error_message>","errorCode":"<error_code>"}`
