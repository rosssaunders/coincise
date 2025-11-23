# GET /v2/platform/status

**Source:** [https://docs.bitfinex.com/reference/rest-public-platform-status](https://docs.bitfinex.com/reference/rest-public-platform-status)

get

https://api-pub.bitfinex.com/v2/platform/status

Get the current status of the platform, “Operative” or “Maintenance”. Maintenance periods generally last for a few minutes to a couple of hours and may be necessary from time to time during infrastructure upgrades.

For real-time status notifications, we suggest using Websockets to listen to events 20060/20061. For more information about Websockets please see [https://docs.bitfinex.com/v2/docs/ws-general](/docs/ws-general).

For more information on REST Public endpoint example code structure please see [https://docs.bitfinex.com/v2/docs/rest-public](/docs/rest-public).

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | STATUS | int | 1: operative, 0: maintenance |

> 🚧
> 
> ### 
> 
> Maintenance mode
> 
> 
> 
> When the platform is marked in maintenance mode, bots should stop all trading activity. Cancelling and placing new orders will not be possible during this time.

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |
