# Response Formats

## Abbreviation Glossary

# Abbreviation Glossary

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

## 

Abbreviation Glossary

[](#abbreviation-glossary)

Below you can find all the message types that the API will send

| Term | Definition |
| --- | --- |
| bu | balance update |
| ps | position snapshot |
| pn | new position |
| pu | position update |
| pc | position close |
| ws | wallet snapshot |
| wu | wallet update |
| os | order snapshot |
| on-req | new order request |
| on | new order |
| ou-req | order update request |
| ou | order update |
| oc-req | order cancel request |
| oc | order cancel / fully executed (no longer active) |
| oc\_multi-req | multiple orders cancel request |
| te | trade executed |
| tu | trade execution update |
| fte | funding trade execution |
| ftu | funding trade update |
| hos | historical order snapshot |
| mis | margin information snapshot |
| miu | margin information update |
| n | notification |
| fos | funding offer snapshot |
| fon | funding offer new |
| fou | funding offer update |
| foc | funding offer cancel / fully executed (no longer active) |
| hfos | historical funding offer snapshot |
| fcs | funding credits snapshot |
| fcn | funding credits new |
| fcu | funding credits update |
| fcc | funding credits close |
| hfcs | historical funding credits snapshot |
| fls | funding loan snapshot |
| fln | funding loan new |
| flu | funding loan update |
| flc | funding loan close |
| hfls | historical funding loan snapshot |
| hfts | historical funding trade snapshot |
| uac | user custom price alert |

## 

Error/Info Codes

[](#errorinfo-codes)

| Event | Code | Description |
| --- | --- | --- |
| ERR\_UNK | 10000 | Unknown error |
| ERR\_GENERIC | 10001 | Generic error |
| ERR\_CONCURRENCY | 10008 | Concurrency error |
| ERR\_PARAMS | 10020 | Request parameters error |
| ERR\_CONF\_FAIL | 10050 | Configuration setup failed |
| ERR\_AUTH\_FAIL | 10100 | Failed authentication |
| ERR\_AUTH\_PAYLOAD | 10111 | Error in authentication request payload |
| ERR\_AUTH\_SIG | 10112 | Error in authentication request signature |
| ERR\_AUTH\_HMAC | 10113 | Error in authentication request encryption |
| ERR\_AUTH\_NONCE | 10114 | Error in authentication request nonce |
| ERR\_UNAUTH\_FAIL | 10200 | Error in un-authentication request |
| ERR\_SUB\_FAIL | 10300 | Failed channel subscription |
| ERR\_SUB\_MULTI | 10301 | Failed channel subscription: already subscribed |
| ERR\_SUB\_UNK | 10302 | Failed channel subscription: unknown channel |
| ERR\_SUB\_LIMIT | 10305 | Failed channel subscription: reached limit of open channels |
| ERR\_UNSUB\_FAIL | 10400 | Failed channel un-subscription: channel not found |
| ERR\_UNSUB\_NOT | 10401 | Failed channel un-subscription: not subscribed |
| ERR\_READY | 11000 | Not ready, try again later |
| EVT\_STOP | 20051 | Websocket server stopping... please reconnect later |
| EVT\_RESYNC\_START | 20060 | Websocket server resyncing... please reconnect later |
| EVT\_RESYNC\_STOP | 20061 | Websocket server resync complete. please reconnect |
| EVT\_INFO | 5000 | Info message |

## 

Order Status

[](#order-status)

| Status | Description |
| --- | --- |
| ACTIVE | Order is currently active (in the order book and unfilled) |
| EXECUTED | Order executed successfully |
| CANCELED | Order canceled |
| FORCED EXECUTED | System order to force position liquidation |
| PARTIALLY FILLED | Order could not be filled in its entirety. The executed amount value will show how much of the order was filled. The remainder of the order may be active, or if you are retrieving the order status from the order history endpoint the remainder may have been canceled. |
| EXECUTED @ xxxx was ACTIVE (note:POSCLOSE) | This order closed an open position using the 'Close' (x) button or the API close position flag. |
| INSUFFICIENT BALANCE (G1) | “Generic” - Sufficient balance was available when placing the order, but due to market slippage, the order is now worth more than the tradable balance. The order was filled for the maximum affordable amount and the remainder was canceled. |
| INSUFFICIENT BALANCE (U1) | Order canceled due to any of the following 5 reasons: Not enough tradable balance; No funding available; Funding over 0.75%; Market order max buy; Reduce Only |
| POSTONLY CANCELED | The Post-Only Limit order was canceled because it would have matched an offer/bid in the order book. |
| FILLORKILL CANCELED | The Fill or Kill order was canceled (killed) as it could not be filled in its entirety. |
| IOC CANCELED | Happens when an Immediate or Cancel order is canceled. |
| RSN\_POS\_REDUCE\_INCR | Order canceled because the ‘Reduce Only’ option was selected. With this option selected, the order will only be executed when it reduces the size of an existing position. The order was canceled because it would have increased a position. |
| RSN\_POS\_REDUCE\_FLIP | Order canceled as the ‘Reduce Only’ option was selected. With this option selected, the order will only be executed when it reduces the size of a position. The order was canceled because it would have flipped the position (from a short to a long or vice versa). |
| RSN\_POS\_NOTFOUND | This happens when using the reduce-only option without an active position. |
| RSN\_DUST was: ACTIVE (note: POSCLOSE) | Dust Amount Position Closed using the Close button (with a market order). |
| RSN\_PAUSE | Order canceled during moments of pause in the order book. (This is usually for AMPL orders that are placed during the rebase period). |
| RSN\_BOOK\_SLIP was: PARTIALLY FILLED @ xxxx | This happens an order would move the market too significantly. The order is partially executed and the remainder is canceled to avoid further slippage. |

Updated 24 days ago

* * *

---
Source: https://docs.bitfinex.com/docs/abbreviations-glossary
