# GET /unknown

**Source:**
[Get all wrapped assets](https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getwrappedassets)

## Authentication

Not Required (Public Endpoint)

#### Response

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| wrapped\_assets | object | required | ​wrapped\_assetsobject\[\]required |
| id | string | required | The symbol of the wrapped asset |
| circulating\_supply | string | required | ​circulating\_supplystringrequired |
| total\_supply | string | required | ​total\_supplystringrequired |
| conversion\_rate | string | required | ​conversion\_ratestringrequired |
| apy | string | required | The APY earned by the supply of the underlying asset |
| redeem\_time\_estimate\_days | string | required | ​redeem\_time\_estimate\_daysstringrequired |

200

application/json

[​

](#response-wrapped-assets)

wrapped\_assets

object\[\]

required

Show child attributes

[​

](#response-wrapped-assets-id)

id

string

required

The symbol of the wrapped asset

[​

](#response-wrapped-assets-circulating-supply)

circulating\_supply

string

required

The assets wrapped by customers less the assets unwrapped by customers existing outside of Coinbase's premint account

[​

](#response-wrapped-assets-total-supply)

total\_supply

string

required

The total token supply of the asset matching that on Etherscan

[​

](#response-wrapped-assets-conversion-rate)

conversion\_rate

string

required

The conversion rate between the wrapped asset and the underlying asset

[​

](#response-wrapped-assets-apy)

apy

string

required

The APY earned by the supply of the underlying asset

[​

](#response-wrapped-assets-redeem-time-estimate-days)

redeem\_time\_estimate\_days

string

required

The estimated time to redeem the wrapped asset in days
