# GET /private/get_leg_prices

This method returns individual leg prices for a given combo structure based on
an aggregated price of the strategy and the mark prices of the individual legs.
Please note that leg prices change dynamically with mark price fluctuations, and
the algorithm is calibrated only for conventional option structures and future
spreads. This method supports both inverse strategies and known linear
structures within a single currency pair.

This is a private method; it can only be used after authentication.

### Parameters

| Parameter              | Required | Type             | Enum                                                                                                                                                                              | Description               |
| ---------------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| legs                   | true     | array of objects | List of legs for which the prices will be calculated                                                                                                                              |                           |
| legs[].instrument_name | true     | string           | Instrument name                                                                                                                                                                   |                           |
| legs[].amount          | true     | number           | It represents the requested trade size. For perpetual and inverse futures the amount is in USD units. For options and linear futures and it is the underlying base currency coin. |                           |
| legs[].direction       | true     | string           | buy sell                                                                                                                                                                          | Direction of selected leg |
| price                  | true     | number           | Price for the whole leg structure                                                                                                                                                 |                           |

### Response

| Name                          | Type    | Description                                                                                           |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| id                            | integer | The id that was sent in the request                                                                   |
| jsonrpc                       | string  | The JSON-RPC version (2.0) result object                                                              |
| result.amount                 | number  | This value multiplied by the ratio of a leg gives trade size on that leg. result.legs array of object |
| result.legs[].direction       | string  | Direction: buy, or sell                                                                               |
| result.legs[].instrument_name | string  | Unique instrument identifier                                                                          |
| result.legs[].price           | number  | Price for a leg                                                                                       |
| result.legs[].ratio           | integer | Ratio of amount between legs                                                                          |
