# GET /api/v5/sprd/spreads

Source:
[https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-spreads-public](https://www.okx.com/docs-v5/en/#spread-trading-rest-api-get-spreads-public)

### Get Spreads (Public)

Retrieve all available spreads based on the request parameters.

#### Rate Limit: 20 requests per 2 seconds

#### Rate limit rule: IP

#### Permission: Read

#### HTTP Request

`GET /api/v5/sprd/spreads`

#### Request Parameters

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| baseCcy   | string | No       | Currency instrument is based in, e.g. BTC, ETH                                                                   |
| instId    | String | No       | The instrument ID to be included in the spread.                                                                  |
| sprdId    | String | No       | The spread ID                                                                                                    |
| state     | string | No       | Spreads which are available to trade, suspened or expired. Valid values include `live`, `suspend` and `expired`. |

#### Response Parameters

| Parameter | Type             | Description                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| sprdId    | String           | spread ID                                                                                              |
| sprdType  | String           | spread Type. Valid values are `linear`, `inverse`, `hybrid`                                            |
| state     | String           | Current state of the spread. Valid values include `live`, `expired`, `suspend`.                        |
| baseCcy   | String           | Currency instrument is based in. Valid values include BTC, ETH                                         |
| szCcy     | String           | The currency the spread order size is submitted to the underlying venue in, e.g. USD, BTC, ETH.        |
| quoteCcy  | String           | The currency the spread is priced in, e.g. USDT, USD                                                   |
| tickSz    | String           | Tick size, e.g. 0.0001 in the quoteCcy of the spread.                                                  |
| minSz     | String           | Minimum order size in the szCcy of the spread.                                                         |
| lotSz     | String           | The minimum order size increment the spread can be traded in the szCcy of the spread.                  |
| listTime  | String           | The timestamp the spread was created. Unix timestamp format in milliseconds, , e.g. `1597026383085`    |
| expTime   | String           | Expiry time, Unix timestamp format in milliseconds, e.g. `1597026383085`                               |
| uTime     | String           | The timestamp the spread was last updated. Unix timestamp format in milliseconds, e.g. `1597026383085` |
| legs      | array of objects |                                                                                                        |
| \> instId | String           | Instrument ID, e.g. BTC-USD-SWAP                                                                       |
| \> side   | String           | The direction of the leg of the spread. Valid Values include `buy` and `sell`.                         |
