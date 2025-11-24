# GET /public/get\_delivery\_prices

Retrieves delivery prices for then given index

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| index_name | true | string | btc_usd eth_usd ada_usdc algo_usdc avax_usdc bch_usdc bnb_usdc btc_usdc btcdvol_usdc buidl_usdc doge_usdc dot_usdc eurr_usdc eth_usdc ethdvol_usdc link_usdc ltc_usdc near_usdc paxg_usdc shib_usdc sol_usdc steth_usdc ton_usdc trump_usdc trx_usdc uni_usdc usde_usdc usyc_usdc xrp_usdc btc_usdt eth_usdt eurr_usdt sol_usdt steth_usdt usdc_usdt usde_usdt btc_eurr btc_usde btc_usyc eth_btc eth_eurr eth_usde eth_usyc steth_eth paxg_btc drbfix-btc_usdc drbfix-eth_usdc | Index identifier, matches (base) cryptocurrency with quote currency |
| offset | false | integer | The offset for pagination, default - 0 |  |
| count | false | integer | Number of requested items, default - 10, maximum - 1000 |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object result.data array of object |
| result.data[].date | string | The event date with year, month and day |
| result.data[].delivery_price | number | The settlement price for the instrument. Only when state = closed |
| result.records_total | number | Available delivery prices |