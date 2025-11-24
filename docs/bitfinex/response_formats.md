# Response Formats

## Abbreviation Glossary

# Abbreviation Glossary

Abbreviation Glossary

Below you can find all the message types that the API will send

| Term         | Definition                                               |
| ------------ | -------------------------------------------------------- |
| bu           | balance update                                           |
| ps           | position snapshot                                        |
| pn           | new position                                             |
| pu           | position update                                          |
| pc           | position close                                           |
| ws           | wallet snapshot                                          |
| wu           | wallet update                                            |
| os           | order snapshot                                           |
| on-req       | new order request                                        |
| on           | new order                                                |
| ou-req       | order update request                                     |
| ou           | order update                                             |
| oc-req       | order cancel request                                     |
| oc           | order cancel / fully executed (no longer active)         |
| oc_multi-req | multiple orders cancel request                           |
| te           | trade executed                                           |
| tu           | trade execution update                                   |
| fte          | funding trade execution                                  |
| ftu          | funding trade update                                     |
| hos          | historical order snapshot                                |
| mis          | margin information snapshot                              |
| miu          | margin information update                                |
| n            | notification                                             |
| fos          | funding offer snapshot                                   |
| fon          | funding offer new                                        |
| fou          | funding offer update                                     |
| foc          | funding offer cancel / fully executed (no longer active) |
| hfos         | historical funding offer snapshot                        |
| fcs          | funding credits snapshot                                 |
| fcn          | funding credits new                                      |
| fcu          | funding credits update                                   |
| fcc          | funding credits close                                    |
| hfcs         | historical funding credits snapshot                      |
| fls          | funding loan snapshot                                    |
| fln          | funding loan new                                         |
| flu          | funding loan update                                      |
| flc          | funding loan close                                       |
| hfls         | historical funding loan snapshot                         |
| hfts         | historical funding trade snapshot                        |
| uac          | user custom price alert                                  |

Error/Info Codes

| Event            | Code  | Description                                                 |
| ---------------- | ----- | ----------------------------------------------------------- |
| ERR_UNK          | 10000 | Unknown error                                               |
| ERR_GENERIC      | 10001 | Generic error                                               |
| ERR_CONCURRENCY  | 10008 | Concurrency error                                           |
| ERR_PARAMS       | 10020 | Request parameters error                                    |
| ERR_CONF_FAIL    | 10050 | Configuration setup failed                                  |
| ERR_AUTH_FAIL    | 10100 | Failed authentication                                       |
| ERR_AUTH_PAYLOAD | 10111 | Error in authentication request payload                     |
| ERR_AUTH_SIG     | 10112 | Error in authentication request signature                   |
| ERR_AUTH_HMAC    | 10113 | Error in authentication request encryption                  |
| ERR_AUTH_NONCE   | 10114 | Error in authentication request nonce                       |
| ERR_UNAUTH_FAIL  | 10200 | Error in un-authentication request                          |
| ERR_SUB_FAIL     | 10300 | Failed channel subscription                                 |
| ERR_SUB_MULTI    | 10301 | Failed channel subscription: already subscribed             |
| ERR_SUB_UNK      | 10302 | Failed channel subscription: unknown channel                |
| ERR_SUB_LIMIT    | 10305 | Failed channel subscription: reached limit of open channels |
| ERR_UNSUB_FAIL   | 10400 | Failed channel un-subscription: channel not found           |
| ERR_UNSUB_NOT    | 10401 | Failed channel un-subscription: not subscribed              |
| ERR_READY        | 11000 | Not ready, try again later                                  |
| EVT_STOP         | 20051 | Websocket server stopping... please reconnect later         |
| EVT_RESYNC_START | 20060 | Websocket server resyncing... please reconnect later        |
| EVT_RESYNC_STOP  | 20061 | Websocket server resync complete. please reconnect          |
| EVT_INFO         | 5000  | Info message                                                |

Order Status

| Status                                     | Description                                                                                                                                                                                                                                                                |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ACTIVE                                     | Order is currently active (in the order book and unfilled)                                                                                                                                                                                                                 |
| EXECUTED                                   | Order executed successfully                                                                                                                                                                                                                                                |
| CANCELED                                   | Order canceled                                                                                                                                                                                                                                                             |
| FORCED EXECUTED                            | System order to force position liquidation                                                                                                                                                                                                                                 |
| PARTIALLY FILLED                           | Order could not be filled in its entirety. The executed amount value will show how much of the order was filled. The remainder of the order may be active, or if you are retrieving the order status from the order history endpoint the remainder may have been canceled. |
| EXECUTED @ xxxx was ACTIVE (note:POSCLOSE) | This order closed an open position using the 'Close' (x) button or the API close position flag.                                                                                                                                                                            |
| INSUFFICIENT BALANCE (G1)                  | “Generic” - Sufficient balance was available when placing the order, but due to market slippage, the order is now worth more than the tradable balance. The order was filled for the maximum affordable amount and the remainder was canceled.                             |
| INSUFFICIENT BALANCE (U1)                  | Order canceled due to any of the following 5 reasons: Not enough tradable balance; No funding available; Funding over 0.75%; Market order max buy; Reduce Only                                                                                                             |
| POSTONLY CANCELED                          | The Post-Only Limit order was canceled because it would have matched an offer/bid in the order book.                                                                                                                                                                       |
| FILLORKILL CANCELED                        | The Fill or Kill order was canceled (killed) as it could not be filled in its entirety.                                                                                                                                                                                    |
| IOC CANCELED                               | Happens when an Immediate or Cancel order is canceled.                                                                                                                                                                                                                     |
| RSN_POS_REDUCE_INCR                        | Order canceled because the ‘Reduce Only’ option was selected. With this option selected, the order will only be executed when it reduces the size of an existing position. The order was canceled because it would have increased a position.                              |
| RSN_POS_REDUCE_FLIP                        | Order canceled as the ‘Reduce Only’ option was selected. With this option selected, the order will only be executed when it reduces the size of a position. The order was canceled because it would have flipped the position (from a short to a long or vice versa).      |
| RSN_POS_NOTFOUND                           | This happens when using the reduce-only option without an active position.                                                                                                                                                                                                 |
| RSN_DUST was: ACTIVE (note: POSCLOSE)      | Dust Amount Position Closed using the Close button (with a market order).                                                                                                                                                                                                  |
| RSN_PAUSE                                  | Order canceled during moments of pause in the order book. (This is usually for AMPL orders that are placed during the rebase period).                                                                                                                                      |
| RSN_BOOK_SLIP was: PARTIALLY FILLED @ xxxx | This happens an order would move the market too significantly. The order is partially executed and the remainder is canceled to avoid further slippage.                                                                                                                    |

---

---

Source: https://docs.bitfinex.com/docs/abbreviations-glossary
