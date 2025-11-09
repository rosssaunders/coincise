##

[​

](#timestamps)

Timestamps

Report incorrect code

Copy

Ask AI

```
2014-11-06T10:34:47.123456Z
```

Unless otherwise specified, all timestamps from API are returned in
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) with microseconds. Make sure
you can parse the following ISO 8601 format. Most modern languages and libraries
handle this without issues.

##

[​

](#numbers)

Numbers

Decimal numbers are returned as strings to preserve full precision across
platforms. When making a request, it is recommended that you also convert your
numbers to strings to avoid truncation and precision errors. Integer numbers
(such as trade id and sequence) are unquoted.

##

[​

](#ids)

IDs

Most identifiers are UUID unless otherwise specified. When making a request
which requires a UUID, both forms (with and without dashes) are accepted.
`132fb6ae-456b-4654-b4e0-d681ac05cea1` or `132fb6ae456b4654b4e0d681ac05cea1`
