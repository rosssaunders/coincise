# GET About recvWindow, timestamp

**Source:** [About recvWindow, timestamp](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## About recvWindow, timestamp

Currently only applicable to v4 interfaces

### Time synchronization security

Signed interfaces require the timestamp parameter to be passed, whose value should be the Unix timestamp (in milliseconds) at the time the request is sent, set in the `X-BM-TIMESTAMP` header of the request. When the server receives the request, it will check the timestamp in the request. If it was sent more than 5000 milliseconds ago, the request will be considered invalid. This time window value can be defined by sending the optional parameter `recvWindow`.

The pseudo code for this logic is as follows:

Copy Success

Copy to Clipboard

  `if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow)   {     // process request   }    else    {     // reject request   }`

### About trade timeliness

The internet is not always stable and reliable, so there may be latency fluctuations between your program and the BitMart server. This is the purpose of setting `recvWindow`. If you are engaged in high-frequency trading and have high requirements for trade timeliness, you can set recvWindow flexibly to meet your requirements.

It is recommended to use a recvWindow of less than 5 seconds! It cannot exceed 60 seconds at most!