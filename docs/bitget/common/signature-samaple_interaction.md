# Request Interaction

All requests are based on the Https protocol, and the Content-Type in the POST
request header should set to:'application/json'.

## Request Interaction Description[​](#request-interaction-description "Direct link to Request Interaction Description")

- Request parameters: Encapsulate parameters according to the interface request
  parameters.
- Submit request parameters: Submit the encapsulated request parameters to the
  server through GET/POST.
- Server Response：The server first performs parameter security verification on
  the user request data, and returns the response data to the user in JSON
  format according to the business logic after passing the verification.
- Data processing：Process the server response data.

### Success[​](#success "Direct link to Success")

HTTP status code 200 indicates a successful response and may contain content. If
the response contains content, it will be displayed in the corresponding return
content.

### Common Error Codes[​](#common-error-codes "Direct link to Common Error Codes")

- 400 Bad Request – Invalid request format
- 401 Unauthorized – Invalid API Key
- 403 Forbidden – You do not have access to the requested resource
- 404 Not Found – No request found
- 429 Too Many Requests – Requests are too frequent and are limited by the
  system
- 500 Internal Server Error – We had a problem with our server
- If it fails, the return body usually indicates the error message

## Standard Specification[​](#standard-specification "Direct link to Standard Specification")

### Timestamp[​](#timestamp "Direct link to Timestamp")

The unit of ACCESS-TIMESTAMP in the HTTP request signature is milliseconds. The
timestamp of the request must be within 30 seconds of the API server time,
otherwise the request will be considered expired and rejected. If there is a
large deviation between the local server time and the API server time, we
recommend that you compare the timestamp by querying the
[API server time](/api-doc/spot/public/Get-Server-Time).

### Frequency Limiting Rules[​](#frequency-limiting-rules "Direct link to Frequency Limiting Rules")

If the request is too frequent, the system will automatically limit the request
and return the 429 too many requests status code.

- Public interface：For the [market](/api-doc/category/market-2) information
  interfaces, the unified rate limit is a maximum of 20 requests per second.
- Authorization interface：apikey is used to restrict the calling of
  authorization interfaces, refer to the frequency restriction rules of each
  interface for frequency restriction.

### Request Format[​](#request-format "Direct link to Request Format")

There are currently only two supported request methods: GET and POST

- GET: The parameters are transmitted to the server in the path through
  queryString.
- POST: The parameters are sending to the server in json format.

> **Source:**
> https://www.bitget.com/api-doc/common/signature-samaple/interaction
