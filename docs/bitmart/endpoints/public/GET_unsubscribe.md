# GET Unsubscribe

**Source:** [Unsubscribe](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Unsubscribe

Cancel subscription to one or more channels

### Unsubscribe Message Format

```json
{
  "action": "unsubscribe",
  "args": [
    "<topic>"
  ]
}
```

#### Parameter Instruction

-   `action` = unsubscribe
-   `args` = The content of the args array is the subscribed topic
-   `topic` is composed of `<channel>:<filter>`
    -   channel is composed of business/name
    -   filter can filter data, refer to the description of each channel for details

### Example

1.  Send message to BitMart server
    
```json
{
  "action": "unsubscribe",
  "args": [
    "futures/klineBin1m:BTCUSDT"
  ]
}
```
    
2.  The BitMart server returns the subscription result, success=true means the subscription is successful
    
```json
{
  "action": "unsubscribe",
  "group": "futures/klineBin1m:BTCUSDT",
  "success": true,
  "request": {
    "action": "unsubscribe",
    "args": [
      "futures/klineBin1m:BTCUSDT"
    ]
  }
}
```