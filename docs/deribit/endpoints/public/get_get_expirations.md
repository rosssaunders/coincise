## /public/get_expirations

Retrieves expirations for instruments. This method can be used to see
instruments's expirations.

### Parameters

| Parameter | Required | Type   | Enum  | Description |
| --------- | -------- | ------ | ----- | ----------- |
| currency  | true     | string | `BTC` |

`ETH`  
`USDC`  
`USDT`  
`any`  
`grouped` | The currency symbol or `"any"` for all or '"grouped"' for all
grouped by currency | | kind | true | string | `future`  
`option`  
`any` | Instrument kind, `"future"` or `"option"` or `"any"` | | currency_pair |
false | string | `btc_usd`  
`eth_usd`  
`ada_usdc`  
`algo_usdc`  
`avax_usdc`  
`bch_usdc`  
`bnb_usdc`  
`btc_usdc`  
`btcdvol_usdc`  
`buidl_usdc`  
`doge_usdc`  
`dot_usdc`  
`eurr_usdc`  
`eth_usdc`  
`ethdvol_usdc`  
`link_usdc`  
`ltc_usdc`  
`near_usdc`  
`paxg_usdc`  
`shib_usdc`  
`sol_usdc`  
`steth_usdc`  
`ton_usdc`  
`trump_usdc`  
`trx_usdc`  
`uni_usdc`  
`usde_usdc`  
`usyc_usdc`  
`xrp_usdc`  
`btc_usdt`  
`eth_usdt`  
`eurr_usdt`  
`sol_usdt`  
`steth_usdt`  
`usdc_usdt`  
`usde_usdt`  
`btc_eurr`  
`btc_usde`  
`btc_usyc`  
`eth_btc`  
`eth_eurr`  
`eth_usde`  
`eth_usyc`  
`steth_eth`  
`paxg_btc`  
`drbfix-btc_usdc`  
`drbfix-eth_usdc` | The currency pair symbol |

### Response

| Name          | Type              | Description                                                                                                                                                                                                               |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | integer           | The id that was sent in the request                                                                                                                                                                                       |
| jsonrpc       | string            | The JSON-RPC version (2.0)                                                                                                                                                                                                |
| result        | array of _object_ | A map where each key is valid currency (e.g. btc, eth, usdc), and the value is a list of expirations or a map where each key is a valid kind (future or options) and value is a list of expirations from every instrument |
|   ›  currency | string            | Currency name or `"any"` if don't care or `"grouped"` if grouped by currencies                                                                                                                                            |
|   ›  kind     | string            | Instrument kind: `"future"`, `"option"` or `"any"` for all                                                                                                                                                                |
