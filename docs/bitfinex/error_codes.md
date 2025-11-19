# Error Codes

Error/Info Codes

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

---
Source: https://docs.bitfinex.com/docs/abbreviations-glossary
