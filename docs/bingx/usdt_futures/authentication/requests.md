## Requests

Root URL for REST access: https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release
the frequency limit of the alternate domain name only when there is a problem
with the primary domain name open-api.bingx.com

Request Description

- Request parameter: Parameter encapsulation is performed according to the api
  request parameter specification.

- Submit request parameters: Submit the encapsulated request parameters to the
  server through POST/GET/DELETE, etc.

- Server response: The server first performs parameter security verification on
  the user request data, and returns the response data to the user in JSON
  format after passing the verification according to the business logic.

- Data processing: process the server response data.

Success

- A successful response is indicated by HTTP status code 200 and may optionally
  contain a body. If the response has a body, it will be included under each
  resource below.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html)
