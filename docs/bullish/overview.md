# Bullish Trading API - Overview

**Version**: 1.0.0

## Bullish Trading API

Welcome to the _Bullish Trading API_ documentation!

This documentation provides resource descriptions and endpoints usage
instructions for the API.

CoinDesk Trading services are provided by Bullish via regulated subsidiaries in
select locations. The features and functionality detailed in this Bullish API
documentation also apply to CoinDesk Trading users. The base URLs
`api.exchange.bullish.com` and `api.trade.coindesk.com` are interchangeable.

The API:

- follows [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
  conventions
- has the base URL `api.exchange.bullish.com` or `api.trade.coindesk.com`
  (unless one of the sandbox environments is being used)
- has endpoints under the below categories:
  - Authenticated endpoints for private client data e.g.
    [Get Orders](#get-/v2/orders) endpoint
  - Non-authenticated endpoints for public data e.g.
    [Get Markets](#get-/v1/markets) endpoint
- uses bearer-based authentication
- enforces a blanket rate limit across all requests
- may add new fields to existing response payloads. Please do not use strict
  deserialisation as it may cause compatibility issues.

## Additional Links

- Code examples -
  [Bullish Github Repository](https://github.com/bullish-exchange)
- Deprecated features & APIs -
  [Deprecated Features Documentation](.././deprecated/index.html)
- Help center - [Bullish Help Center](https://support.bullish.com)
- Comprehensive guide for new Institutional users -
  [Institutional User Guide](https://support.bullish.com/hc/en-us/articles/28811587741721-Comprehensive-New-User-Guide-for-Institutions#h_01HPQBYXD72K2M2CRSRXQ5YEWG)
- Various order/custody status codes -
  [Error & Rejection Codes](https://github.com/bullish-exchange/api-docs/wiki/Error-&-Rejection-Codes)
- Operational status of our exchange -
  [official status page](https://bullish.statuspage.io/)
