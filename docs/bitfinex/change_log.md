# Change Log

# Changelog

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

#

v2024-10-16

[](#v2024-10-16)

Added
[Virtual Asset Service Providers](/reference/virtual-asset-service-providers)
endpoint.

#

v2019-08-19

[](#v2019-08-19)

Upgrade rest end point:
[https://api.bitfinex.com/v2/auth/r/positions/audit](https://api.bitfinex.com/v2/auth/r/positions/audit)
([https://docs.bitfinex.com/v2/reference#positions-audit](/reference#positions-audit))  
Fields
added: TYPE, COLLATERAL, COLLATERAL_MIN and META

#

v2018-06-21

[](#v2018-06-21)

Support for more granular filtering (`trading-tBTCUSD`, `funding-fUSD`, ...)  
[https://docs.bitfinex.com/v2/docs/ws-auth#section-channel-filters](/docs/ws-auth#section-channel-filters)

#

v2018-06-08

[](#v2018-06-08)

Support for TIF (Time-In-Force) for order submission and update via Websocket
(`oc` and `ou` messages). This first version only support a datetime format
('2020-01-01 10:45:23')

#

v2018-06-06

[](#v2018-06-06)

Performance increase on order cancellation via Websocket (`oc` message)

#

v2018-04-19

[](#v2018-04-19)

##

1\. New RESTv2 ledger entries endpoint

[](#1-new-restv2-ledger-entries-endpoint)

Account ledger entries (wallet movements) are now accessible via a POST request
on `/v2/auth/r/ledgers/{currency}/hist`:

```
request.post({
  url: `${url}/auth/r/ledgers/BTC/hist`,
  headers: { /* auth headers */ },
  body: {},
  json: true,
}, (error, response, body) => {
  console.log(body)
})

/*
  Response structure:
  [
    [
      ID,
      CURRENCY,
      null,
      TIMESTAMP_MILLI,
      null,
      AMOUNT,
      BALANCE,
      null,
      DESCRIPTION
    ],
    ...
  ]
*/
```

##

2\. New RESTv2 exchange rate endpoint

[](#2-new-restv2-exchange-rate-endpoint)

The real-time exchange rate between any two currencies is now accessible via a
POST request on `/v2/calc/fx`:

```
request.post({
  url: `https://api-pub.bitfinex.com/v2/calc/fx`,
  json: true,
  body: {
    ccy1: 'BTC',
    ccy2: 'USD'
  }
}, (error, response, body) => {
  console.log(body)
})

/*
  Response structure:
  [CURRENT_RATE]
*/
```

##

3\. New RESTv2 user settings manipulation endpoints

[](#3-new-restv2-user-settings-manipulation-endpoints)

Users settings can now be read, modified, and deleted via POST requests:

```
// Read: given a key 'key1', read the saved user settings
// https://docs.bitfinex.com/v2/reference#user-settings-read
request.post({
  url: `${url}/auth/r/settings`,
  headers: { /* auth headers */ },
  json: true,
  body: {
    keys: [
      'api:key1'
    ]
  },
}, (error, response, body) => {
  console.log(body) // [[key, value], ...]
})

// Write: given an object of keys and values, write settings
// https://docs.bitfinex.com/v2/reference#user-settings-write
request.post({
  url: `${url}/auth/w/settings/set`,
  headers: { /* auth headers */ },
  json: true,
  body: {
    settings: {
      'api:key1': 'foo', // key1 -> foo
      'api:key2': {      // key2 -> { bar: 2 }
        bar: 2
      }
    },
  }
}, (error, response, body) => {
  console.log(body)
})

// Delete: a user setting by key
// https://docs.bitfinex.com/v2/reference#user-settings-delete
request.post({
  url: `${url}/auth/w/settings/del`,
  headers: { /* auth headers */ },
  json: true,
  body: {
    settings: {
      'api:key1': 1, // delete key1
      'api:key2': 1  // delete key2
    },
  }
}, (error, response, body) => {
  console.log(body)
})
```

##

4\. Added WSv2 order flag support

[](#4-added-wsv2-order-flag-support)

Orders now contain a 'flags' field which can be used to modify execution
behaviour. This replaces the old `hidden` and `postonly` boolean fields; if
multiple flags need to be active on an order, they can be added together
(logical AND). For more details, see the
[annoucement blog post](https://medium.com/bitfinex/bitfinex-api-dev-update-april-ee10d59f75c2).

```
Order.flags = {
  /* The one cancels other order option allows you to place a
     pair of orders stipulating that if one order is executed
     fully or partially, then the other is automatically
     canceled. */
  OCO: 2 ** 14, // 16384

  /* The post-only limit order option ensures the limit order will
     be added to the order book and not matched with a pre-existing
     order. */
  POSTONLY: 2 ** 12, // 4096

  /* The hidden order option ensures an order does not appear in
     the order book; thus does not influence other market
     participants. */
  HIDDEN: 2 ** 6, // 64

  /* Excludes variable rate funding offers when selecting funding
     for a Margin order. */
  NO_VR: 2 ** 19, // 524288

  /* Close position if present */
  POS_CLOSE: 2 ** 9, // 512

  /* Applies to Margin orders only; if set, and the order would
     increase the size of an open position, the order is cancelled */
  REDUCE_ONLY: 2 ** 10 // 1024
}
```

##

5\. Added WSv2 timestamp flag

[](#5-added-wsv2-timestamp-flag)

When sending the WebSocket `conf` request, you may apply the new timestamp flag
of value 32768. Once received, the timestamp will appended to every array sent
by the server.

Just like order flags, the timestamp flag can be summed with other conf flags.

All available conf flags can be found
[here](/docs/ws-general#section-available-options)

##

6\. Added WSv2 atomic order updates

[](#6-added-wsv2-atomic-order-updates)

You may now update an order via the WebSocket API in-place. You can change an
order’s price, amount, change an amount with a given delta, alter group IDs, and
change the trailing price delta. Prior to this, changes to an order were applied
by cancelling & submitting a new order (orders were immutable).

```
// adjust the remaining amount to 0.1 and set price to 500
ws.send(JSON.stringify([
  0, 'ou', null, {
    id: 1149698545,
    amount: '0.1',
    price: '500'
  }
]))

// increase the remaining amount by 0.1
ws.send(JSON.stringify([
  0, ‘ou’, null, {
    id: 1149698545,
    delta: '0.1',
    price: '6500'
  }
]))

// set trailing price delta to 45
ws.send(JSON.stringify([
  0, ‘ou’, null, {
    id: 1149698545,
    price_trailing: '45'
  }
]))

// Or, if using bitfinex-api-node, use the update method:
const o = new Order({
  id: 1149698545
  // ...
}, ws)

// Mirroring the examples above
o.update({ amount: '0.1', price: '500' })
o.update({ delta: '0.1', price: '6500' })
o.update({ priceTrailing: '45' })
```

##

7\. Added WSv2 offer submission

[](#7-added-wsv2-offer-submission)

You may now submit an offer via the WebSocket API to receive or provide funding.
A few examples:

```
// submit a LIMIT offer for USD
ws.send(JSON.stringify([
  0, 'fon', null, {
    type: 'LIMIT',
    symbol: 'fUSD',
    amount: '50',
    rate: '0.0002',
    period: 7,
    flags: 0
  }
]))

// submit a Hidden FRR Delta Variable offer for USD
ws.send(JSON.stringify([
  0, 'fon', null, {
    type: 'FRRDELTAVAR',
    symbol: 'fUSD',
    amount: '-50',
    rate: '0.0001',
    period: 7,
    flags: 64
  }
]))
```

##

8\. Added WSv2 notification broadcasts

[](#8-added-wsv2-notification-broadcasts)

Users can now broadcast custom notifications via the WebSocket v2 API, with the
only requirement being that the notification type must begin with ‘ucm’.
Notifications broadcast by a user are echo’ed out from all other active API
connections, and have no limitations on payload or internal structure.

The following is example notification broadcast packet:

```
// MESSAGE_ID can be null, and should be used to match requests & responses
w1.send(JSON.stringify([
  0, 'n', MESSAGE_ID, {
    type: 'ucm-req',
    info: { // custom payload data
      foo: 1,
      bar: 2
    }
  }
]))
```

#

v2017-03-28

[](#v2017-03-28)

_Release Date: Saturday 1 April 2017 (~4pm UTC)_

##

1\. WebSocket changes

[](#1-websocket-changes)

###

"mis", "miu", "fis", "fiu", "bs", "bu"

[](#mis-miu-fis-fiu-bs-bu)

"mis", "fis", "bs": will not be sent anymore  
"fiu", "miu": will change the protocol to be more granular.  
Instead sending a message containing all the information for all
pairs/currencies  
they will be split in multiple messages containing the information of the
pair/currency they are referring to.

**"fiu"**: will be granular per currency

_Current message_

```
[
  0,
  "fiu",
  [
    null,
    null,
    [
      [
        SYMBOL,
        [
          YIELD_LOAN,
          YIELD_LEND,
          DURATION_LOAN,
          DURATION_LEND,
          ...
        ]
      ],
     ...
    ]
  ]
```

_New message_

```
[
  0,
  "fiu",
  [
    "sym",
    SYMBOL,
    [
      YIELD_LOAN,
      YIELD_LEND,
      DURATION_LOAN,
      DURATION_LEND
    ]
  ]
]
```

**`miu`**: will be granular per trading symbol with an addition of a ‘base’
message

_Current message_

```
[
  0,
  "miu",
  [
    USER_PL,
    USER_SWAP,
    [
      [
        SYMBOL,
        [ TRADABLE_BALANCE, ... ]
      ],
      MARGIN_BALANCE,
      MARGIN_NET
    ]
  ]
```

_New message_

```
[
  0,
  "miu",
  [
    "base",
    [
      USER_PL,
      USER_SWAP,
      MARGIN_BALANCE,
      MARGIN_NET
    ]
  ]
]

[
  0,
  "miu",
  [
    "sym",
    [
      SYMBOL,
      [ TRADABLE_BALANCE, ... ]
    ]
  ]
]
```

###

"ps", "pu", "ws", "wu"

[](#ps-pu-ws-wu)

These messages do not change the format but they gain the ability to send the
calculation values (liquidation price, available balance) equal to "null"
meaning that the new calculated value is not yet available.

_Practical example_

```
[
  0,
  "ps",
  [
    [ "tETHUSD","ACTIVE",5.11,12.349,0,0,null,null,null,null ],
    [ "tBTCUSD","ACTIVE",0.01,1039.558031,0,0,null,null,null,null ]
  ]
]

[
  0,
  "pu",
  [ "tETHUSD","ACTIVE",5.11,12.349,0,0,-12.10559,-19.18373957,0,0.0073 ]
]

[
  0,
  "pu",
  [ "tBTCUSD","ACTIVE",0.01,1039.558031,0,0,-0.01638031,-0.15756994,0,0.1136 ]
]
```

###

"calc" input message

[](#calc-input-message)

This message will be used by UI and bot clients to trigger specific
calculations, so we don't end up in calculating data that is not needed (i.e
right now the UI receives margin calculation informations also for pairs that
are not visualised)

```
[
  0,
  "calc",
  null,
  [
    ["margin_sym_tBTCUSD"],
    ["position_tBTCUSD"],
    ["wallet_margin_BTC"],
    ["wallet_funding_USD"]
  ]
]
```

> 📘
>
> ###
>
> NOTE
>
> [](#note)
>
> Calculations are on demand, so no more streaming of unnecessary data.  
> Websocket server allows up to 30 calculations per batch. If the client sends
> too many concurrent requests (or tries to spam) requests, it will receive an
> error and potentially a disconnection.  
> The Websocket server performs a maximum of 8 calculations per second (per
> client)

##

1\. REST changes

[](#1-rest-changes)

###

"/auth/r/margin/SYMBOL", "/auth/r/funding/SYMBOL"

[](#authrmarginsymbol-authrfundingsymbol)

These two endpoints will be granular per symbol

Example: `/auth/r/trading/tBTCUSD` `/auth/r/funding/fUSD`

Updated 5 months ago

---

---

Source: https://docs.bitfinex.com/docs/changelog
