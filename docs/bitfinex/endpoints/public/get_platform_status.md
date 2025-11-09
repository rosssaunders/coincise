# Platform Status

# Platform Status

get https://api-pub.bitfinex.com/v2/platform/status

Get the current status of the platform, “Operative” or “Maintenance”.
Maintenance periods generally last for a few minutes to a couple of hours and
may be necessary from time to time during infrastructure upgrades.

For real-time status notifications, we suggest using Websockets to listen to
events 20060/20061. For more information about Websockets please see
[https://docs.bitfinex.com/v2/docs/ws-general](/docs/ws-general).

For more information on REST Public endpoint example code structure please see
[https://docs.bitfinex.com/v2/docs/rest-public](/docs/rest-public).

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index | Field  | Type | Description                  |
| ----- | ------ | ---- | ---------------------------- |
| \[0\] | STATUS | int  | 1: operative, 0: maintenance |

> 🚧
>
> ###
>
> Maintenance mode
>
> [](#maintenance-mode)
>
> When the platform is marked in maintenance mode, bots should stop all trading
> activity. Cancelling and placing new orders will not be possible during this
> time.

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">30 reqs/min (requests per minute)</td></tr></tbody></table>

Response

#

200

200

Response body

array of integers

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://api-pub.bitfinex.com/v2/platform/status \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: General Source:
https://docs.bitfinex.com/reference/rest-public-platform-status Path:
/v2/platform/status Method: GET
