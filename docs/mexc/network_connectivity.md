# Network Connectivity

## Base Endpoint

The base endpoint is:

- `https://api.mexc.com`

## HTTP Return Codes

- HTTP 4XX return codes are used for malformed requests; the issue is on the
  sender's side.
- HTTP 403 return code is used when the WAF Limit (Web Application Firewall) has
  been violated.
- HTTP 429 return code is used when breaking a request rate limit.
- HTTP 5XX return codes are used for internal errors; the issue is on MEXC's
  side. It is important to NOT treat this as a failure operation; the execution
  status is UNKNOWN and could have been a success.

## General Information on Endpoints

The API accepts requests of type GET, POST or DELETE

- For GET endpoints, parameters must be sent as a query string.
- For POST, PUT, and DELETE endpoints, the parameters may be sent as a query
  string with content type application/x-www-form-urlencoded,or in the request
  body with content type application/json. You may mix parameters between both
  the query string and request body if you wish to do so.
- Parameters may be sent in any order.
- If a parameter sent in both the query string and request body, the query
  string parameter will be used.
