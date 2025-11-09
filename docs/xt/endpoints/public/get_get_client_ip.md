# GET Get client ip

Source:
[https://doc.xt.com/docs/spot/Market/GetClientIp](https://doc.xt.com/docs/spot/Market/GetClientIp)

# Get client ip

**Type:** GET **Description:** `/v4/public/client`

### Request Example[​](#request-example "Direct link to Request Example")

Request

```
  curl --location --request GET 'https://sapi.xt.com/v4/public/client' \    --header 'accept: */*' \    --header 'Content-Type: application/json' \
```

### Response Example[​](#response-example "Direct link to Response Example")

Response

```
{  "rc": 0,  "mc": "SUCCESS",  "ma": [],  "result": {    "ip": "192.168.1.1"  }}
```

[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/spot/Market/clientInfo.mdx)
