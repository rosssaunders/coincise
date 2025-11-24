# Network Connectivity

## Introduction

# Introduction

What is an API?

API is short for Application Programming Interface. An API provides a means for
one application to interact with another according to a set of rules. This set
of rules can be found in the API documentation and describes how an application
can interact with our exchange.

What is the intended use of the Bitfinex API?

The Bitfinex API is designed to allow access to all the features of the Bitfinex
platform on the condition that it is used in compliance with our API Terms of
Service. Users can use the API to create highly customised and advanced trading
strategies on our platform. The API also allows users to create their own
trading platform on top of our existing infrastructure. In the API
documentation, you will find ways to retrieve or stream market data, retrieve or
stream data particular to your account (such as your balances, order history,
...), as well as ways to place trading or funding orders. The intended scope of
our API is such that it should be possible to rebuild almost the entire Bitfinex
platform on top of it according to custom specifications.

What makes our API special?

- The Bitfinex API offers a full array of functions to interact with our
  platform allowing users to create a fully customisable experience in their
  interaction with our platform.
- Our API is designed around speed. Our goal is to provide our traders with the
  fastest access to the market. To achieve this, we only send required data,
  usually in the form of lists. To avoid network latency, WebSocket API users
  receive a data snapshot whenever a connection is opened and will need to
  update this initial data locally using the updates sent through the open
  channel.
- Our API is continuously updated to include our latest platform features.
- Our API officially supports Python, NodeJS, Ruby, and Golang and we have
  official libraries available for each of these languages. These can be found
  on our Open Source Libraries page.
- Api developers can include affiliate links in their code to earn rebates. You
  can learn more about our affiliate program
  [here](https://support.bitfinex.com/hc/en-us/articles/360036965234-The-Bitfinex-Affiliate-Program)
  and more about the developer's reward in particular
  [here](https://blog.bitfinex.com/affiliate-program/explaining-the-developers-reward/).

API V1 or API V2

The page that you are currently viewing is the introduction for the Bitfinex API
V2. We recommend all our users to build their application on V2 of the API.
Using V2 has the following advantages:

- Increased performance on specific endpoints/channels. In some cases, the
  increase can be up to 40%!
- Long-term support, the V1 API will become deprecated at some point in the
  future.
- Unified response formats between endpoints and between REST and WebSocket.
- Much more extensively supported by our official client libraries.

REST and WebSocket

Applications can be built on top of our REST endpoints or you can opt to make
use of our WebSocket API. It is also possible to use a combination of both. This
may sometimes be required, as some data can only be retrieved through REST
endpoints (historic data, for example).

We recommend making use of our WebSocket API wherever possible. Users of REST
are subject to rate limits and thereby limited in the volume of data that they
can retrieve within a particular time frame. Using WebSocket, users are allowed
to open up to 5 connections per 15 seconds using wss://api.bitfinex.com/ for
authenticated connections. In addition, 20 connections per minute can be opened
using wss://api-pub.bitfinex.com/ for connections to public channels. Each
connection can be used to connect to up to 25 different channels.

In normal use, a WebSocket connection is left open for long periods of time and
rate limiting should not be an issue. If you require more than 5 authenticated
connections or 20 public connections, be sure to stagger opening the
connections. This should also be taken into account when reconnecting after a
connection issue.

Data formats and important guidelines for programmers

- Do not parse text descriptions, use only codes.
- Use numeric error codes. Any additional text may change without notice.
- New fields may be appended at the end of an array or inserted in an object
  without an API version change. An API version change will only be triggered if
  existing positional elements in an array or existing fields in an object are
  changed.
- Messages can contain 'null' placeholders for future additional fields.
- All timestamps are EPOCH/UNIX UTC timestamps expressed in milliseconds (e..g
  '1477409622229')

Price Precision

The precision level of all trading prices is based on significant figures. All
pairs on Bitfinex use up to 5 significant digits and up to 8 decimals (e.g.
1.2345, 123.45, 1234.5, 0.00012345). Prices submit with a precision larger than
5 will be cut by the API.

Amount Precision

The amount field allows up to 8 decimals. Anything exceeding this will be
rounded to the 8th decimal.

Symbols

A symbol can be a trading pair or a margin currency.

**Trading pair** symbols are formed prepending a `t` before the pair (i.e
`tBTCUSD`, `tETHUSD`).  
A list of possible trading pairs can be retrieved from
[Configs](/reference/rest-public-conf) by calling
[pub:list:pair:exchange](https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange).

**Margin currency** symbols are formed prepending a `f` before the currency (i.e
`fUSD`, `fBTC`, ...)  
A list of all possible symbols can be retrieved from
[Configs](/reference/rest-public-conf) by calling
[pub:list:currency](([https://api-pub.bitfinex.com/v2/conf/pub:list:currency](https://api-pub.bitfinex.com/v2/conf/pub:list:currency)).
Please note that not all listed currencies can be provided as funding.

**Derivatives**  
The following symbols are used for derivatives trading:

`tETHF0:USTF0`  
`tBTCF0:USTF0`  
`tAMPF0:USTF0`  
`tBTCDOMF0:USTF0`  
`tXAUTF0:USTF0`  
`tTESTBTCF0:TESTUSDTF0` (paper trading)

Legal

Any use of our API is subject to our
[API Terms of Service](https://www.bitfinex.com/legal/general/api-terms)

All API keys are used at your own risk and expense. We are not responsible for
any negligence, error, compromised security, malfunction, cyber attack, or other
force majeure affecting this environment. You hereby release us, hold us
harmless and indemnify us from any and all damages, losses or claims associated
with your use of this environment.

---

## REST API

URL

Public endpoints should use the domain:  
[https://api-pub.bitfinex.com  
](https://api-pub.bitfinex.com)  
Authenticated endpoints should use the domain:  
[https://api.bitfinex.com](https://api.bitfinex.com)

---

Source: https://docs.bitfinex.com/docs/introduction Source:
https://docs.bitfinex.com/docs/rest-general
