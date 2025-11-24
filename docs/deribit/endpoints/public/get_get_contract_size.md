# GET /public/get\_contract\_size

Retrieves contract size of provided instrument.

### Parameters

| Parameter | Required | Type | Enum | Description |
| --- | --- | --- | --- | --- |
| instrument_name | true | string | Instrument name |  |

### Response

| Name | Type | Description |
| --- | --- | --- |
| id | integer | The id that was sent in the request |
| jsonrpc | string | The JSON-RPC version (2.0) result object |
| result.contract_size | integer | Contract size, for futures in USD, for options in base currency of the instrument (BTC, ETH, ...) |