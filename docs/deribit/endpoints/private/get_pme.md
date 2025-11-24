# GET /private/pme/simulate

Calculates the Extended Risk Matrix and margin information for the selected
currency or against the entire Cross-Collateral portfolio.

**Scope:** `account:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter           | Required | Type    | Enum                                                                                                                                                                                                      | Description                                                                                                    |
| ------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| currency            | true     | string  | BTC ETH USDC USDT CROSS                                                                                                                                                                                   | The currency for which the Extended Risk Matrix will be calculated. Use CROSS for Cross Collateral simulation. |
| add_positions       | false    | boolean | If true, adds simulated positions to current positions, otherwise uses only simulated positions. By default true                                                                                          |                                                                                                                |
| simulated_positions | false    | object  | Object with positions in following form: {InstrumentName1: Position1, InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1.0} (or corresponding URI-encoding for GET). Size in base currency. |                                                                                                                |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | object  | Simulation details                  |
