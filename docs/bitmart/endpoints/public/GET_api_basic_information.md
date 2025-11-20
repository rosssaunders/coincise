# GET API Basic Information

**Source:** [API Basic Information](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## API Basic Information

1.  This article lists the rest baseurl of the interfaces: https://api-cloud-v2.bitmart.com
2.  All interface responses are in JSON format.

### Request Parameter Settings

-   For `GET` and `DELETE` method interfaces, parameters must be sent in the query string, i.e., the parameters concatenated after the `URL?`.
-   For `POST` and `PUT` method interfaces, parameters are sent in the request body in JSON format.

### HTTP Response Codes

-   HTTP 4XX Error codes are used to indicate wrong request content, behavior, and format. The problem is from the request sender.
-   HTTP 403 The error code indicates a violation of the restriction (prohibited call).
-   HTTP 429 The error code indicates that the access frequency is overrun and the IP will be blocked.
-   HTTP 418 The error code indicates that the IP has been blocked after error code 429.
-   HTTP 5XX Error codes are used to indicate problems with BitMart server.

### API Returned Codes

-   `code` Error code
-   `message` Error description
-   `trace` Event tracking ID for each request, which is returned by the server for every request
-   `data` User Data

For details, please refer to [Error Code List](#error-code)