## Timestamp

- Unless otherwise specified, all timestamps from the API are returned with
  millisseconds resolution.
- The timestamp of the request must be within 5 seconds of the API service time,
  otherwise the request will be considered expired and rejected. If there is a
  large deviation between the local server time and the API server time, we
  recommend that you update the http header by querying the API server time.
  header。

#### Example

1587091154123

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html)
