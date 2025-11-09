# Network Connectivity

### REST API

Speed limit judgment:

Each call to the interface will return 3 Response Headers with limit tags, as
shown below:

> Example:

Copy Success

Copy to Clipboard

`X-BM-RateLimit-Remaining: 10 X-BM-RateLimit-Limit: 600 X-BM-RateLimit-Reset: 60 The above setting means that it can be called 600 times within 60 seconds, and currently has been called 10 times`

| Response Header          | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| X-BM-RateLimit-Remaining | The number of requests that have been used in the current time window |
| X-BM-RateLimit-Limit     | The max number of requests in the current time window                 |
| X-BM-RateLimit-Reset     | Current time window, in seconds                                       |
