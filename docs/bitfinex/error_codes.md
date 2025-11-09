# Error Codes

##

Error/Info Codes

[](#errorinfo-codes)

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

---

Source: https://docs.bitfinex.com/docs/abbreviations-glossary
