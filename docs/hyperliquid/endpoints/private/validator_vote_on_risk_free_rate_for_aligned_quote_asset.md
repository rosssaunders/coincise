# Validator vote on risk-free rate for aligned quote asset

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

#### 

[](#headers-21)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-17)

Request Body

Name

Type

Description

action\*

Object

{

"type": "validatorL1Stream",

"riskFreeRate": String // e.g. "0.04" for 4%

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

200: OK Successful Response

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
