## Get Server Time

#### HTTP Request

GET https://open-api.bingx.com/openApi/swap/v2/server/time

#### Parameters: null

- code - int64 - error code, 0 means successfully response, others means
  response failure

- msg - string - Error Details Description

- serverTime - int64 - The current time of the system，unit: ms

{"code": 0,"msg": "","data": {"serverTime": 1675319535362}}

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html)
