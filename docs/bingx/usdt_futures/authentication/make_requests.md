## Make Requests

All private REST requests must contain the following parameters:

- Pass the API Key with X-BX-APIKEY on the request header.
- The request parameter carries the signature obtained by using the signature
  algorithm.
- timestamp is the timestamp of your request, in milliseconds. When the server
  receives the request, it will judge the timestamp in the request. If it is
  sent before 5000 milliseconds, the request will be considered invalid. This
  time window value can be defined by sending the optional parameter recvWindow.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html)
