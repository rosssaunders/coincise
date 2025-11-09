# GET Subscription

**Source:** [Subscription](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Subscription

Users can subscribe to one or more channels, and the total length of multiple
channels cannot exceed 4096 bytes

### Subscribe Message Format

`{"action":"subscribe","args":["<topic>"]}`

#### Parameter Instructions

- `action` = subscribe
- `args` = The content of the args array is the subscribed topic
- `topic` is composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter can filter data, refer to the description of each channel for details

### Example

1.  Send message to BitMart server

    `{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}`

2.  The BitMart server returns the subscription result, success=true means the
    subscription is successful

    `{"action":"subscribe","group":"futures/klineBin1m:BTCUSDT","success":true,"request":{"action":"subscribe","args":["futures/klineBin1m:BTCUSDT"]}}`
