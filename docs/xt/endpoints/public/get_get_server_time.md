# GET Get server time

Source: [https://doc.xt.com/docs/spot/Market/GetServerTime](https://doc.xt.com/docs/spot/Market/GetServerTime)

# Get server time

**Type:** GET **Description:** `/v4/public/time`

* * *

### Request Examples[​](#request-examples "Direct link to Request Examples")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/time' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

Response Example

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "serverTime": 1662435658062  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/serverInfo.mdx)