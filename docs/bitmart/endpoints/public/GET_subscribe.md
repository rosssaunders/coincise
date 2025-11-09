# GET Subscribe

**Source:** [Subscribe](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Subscribe

Users can subscribe to one or more channels, and the total length of multiple
channels cannot exceed 4096 bytes

> subscribe

`{"op": "subscribe", "args": ["<topic>"]}`

### Parameter Instructions

- op=subscribe
- The content of the args array is the subscribed topic
- topic is composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter can filter data, refer to the description of each channel for details

### Example

> Subscribe Request

`{"op": "subscribe", "args": ["spot/ticker:BTC_USDT"]}`

> Subscription successful

`{"event": "subscribe","topic": "spot/ticker:BTC_USDT"}`

> After successful subscription, push data

`{"table":"spot/ticker:BTC_USDT","data":[]}`
