## Subscription order update data

Subscription Type

dataType: spot.executionReport

Subscription example

{"id":"e745cd6d-d0f6-4a70-8d5a-043e4c741b40","reqType":
"sub","dataType":"spot.executionReport"}

The effective time of the listen key is 1 hour. In order to ensure that your
subscription is not interrupted, please update the listen key regularly

Push data

### Data Parameters

|     | Description                              |
| --- | ---------------------------------------- |
| e   | Event Type                               |
| E   | event time                               |
| s   | trading pair                             |
| S   | Order direction                          |
| o   | order type                               |
| q   | Order original quantity                  |
| p   | Original order price                     |
| x   | Event Type                               |
| X   | order status                             |
| i   | Order ID                                 |
| l   | Last order transaction volume            |
| z   | Accumulated transaction volume of orders |
| L   | Last transaction price of the order      |
| n   | Number of handling fees                  |
| N   | Handling fee asset category              |
| T   | transaction time                         |
| t   | Transaction ID                           |
| O   | Order creation time                      |
| Z   | Accumulated transaction amount of orders |
| Y   | Last transaction amount of the order     |
| Q   | Original order amount                    |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data](https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data)
