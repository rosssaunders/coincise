---
title: KuCoin Margin WebSocket API v1.0.0
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="kucoin-margin-websocket-api">KuCoin Margin WebSocket API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

margin_public

<h1 id="kucoin-margin-websocket-api-default">Default</h1>

## Mark Price

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/markPrice/indicator/markPrice:_symbol_,_symbol_',
{
  method: 'TRACE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/markPrice/indicator/markPrice:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /markPrice/indicator/markPrice:_symbol_,_symbol_`

Subscribe to this topic to get the mark price for margin trading. The following ticker symbols are supported: List of currently supported symbols

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "granularity": {
          "type": "integer"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "symbol",
        "granularity",
        "timestamp",
        "value"
      ]
    }
  },
  "required": [
    "id",
    "type",
    "topic",
    "subject",
    "data"
  ]
}
```

<h3 id="mark-price-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Margin_margin_public_markPrice](#schemamargin_margin_public_markprice)|

<aside class="success">
This operation does not require authentication
</aside>

## Index Price

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/indexPrice/indicator/index:_symbol_,_symbol_',
{
  method: 'TRACE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/indexPrice/indicator/index:_symbol_,_symbol_', headers = headers)

print(r.json())

```

`TRACE /indexPrice/indicator/index:_symbol_,_symbol_`

Subscribe to this topic to get the index price for margin trading. The following ticker symbols are supported: List of currently supported symbols.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "granularity": {
          "type": "integer"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "symbol",
        "granularity",
        "timestamp",
        "value"
      ]
    }
  },
  "required": [
    "id",
    "type",
    "topic",
    "subject",
    "data"
  ]
}
```

<h3 id="index-price-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Margin_margin_public_indexPrice](#schemamargin_margin_public_indexprice)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Isolated Margin Position change

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/isolatedMarginPosition/margin/isolatedPosition:_symbol_',
{
  method: 'TRACE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/isolatedMarginPosition/margin/isolatedPosition:_symbol_', headers = headers)

print(r.json())

```

`TRACE /isolatedMarginPosition/margin/isolatedPosition:_symbol_`

The system will push the change event when the position status changes, or push the current debt message periodically when there is a liability.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": [
        "private",
        "public"
      ],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string",
          "description": "Isolated margin symbol",
          "example": [
            "BTC-USDT",
            "ETH-USDT"
          ]
        },
        "status": {
          "type": "string",
          "description": "Position status",
          "enum": [
            "DEBT",
            "CLEAR",
            "IN_BORROW",
            "IN_REPAY",
            "IN_LIQUIDATION",
            "IN_AUTO_RENEW"
          ],
          "x-api-enum": [
            {
              "value": "DEBT",
              "name": "DEBT",
              "description": "Debt"
            },
            {
              "value": "CLEAR",
              "name": "CLEAR",
              "description": "debt-free"
            },
            {
              "value": "IN_BORROW",
              "name": "IN_BORROW",
              "description": "Borrowing"
            },
            {
              "value": "IN_REPAY",
              "name": "IN_REPAY",
              "description": "Repayment in progress"
            },
            {
              "value": "IN_LIQUIDATION",
              "name": "IN_LIQUIDATION",
              "description": "Position closing"
            },
            {
              "value": "IN_AUTO_RENEW",
              "name": "IN_AUTO_RENEW",
              "description": "Automatically renewing"
            }
          ]
        },
        "statusBizType": {
          "type": "string",
          "enum": [
            "FORCE_LIQUIDATION",
            "USER_BORROW",
            "TRADE_AUTO_BORROW",
            "USER_REPAY",
            "AUTO_REPAY",
            "DEFAULT_DEBT",
            "DEFAULT_CLEAR",
            "ONE_CLICK_LIQUIDATION",
            "B2C_INTEREST_SETTLE_LIQUIDATION",
            "AIR_DROP_LIQUIDATION"
          ],
          "description": "Status type",
          "x-api-enum": [
            {
              "value": "FORCE_LIQUIDATION",
              "name": "FORCE_LIQUIDATION",
              "description": "Liquidation"
            },
            {
              "value": "USER_BORROW",
              "name": "USER_BORROW",
              "description": "User borrow"
            },
            {
              "value": "TRADE_AUTO_BORROW",
              "name": "TRADE_AUTO_BORROW",
              "description": "Trade auto borrow"
            },
            {
              "value": "USER_REPAY",
              "name": "USER_REPAY",
              "description": "User reply"
            },
            {
              "value": "AUTO_REPAY",
              "name": "AUTO_REPAY",
              "description": "Auto reply"
            },
            {
              "value": "DEFAULT_DEBT",
              "name": "DEFAULT_DEBT",
              "description": "In debt"
            },
            {
              "value": "DEFAULT_CLEAR",
              "name": "DEFAULT_CLEAR",
              "description": "No debt"
            },
            {
              "value": "ONE_CLICK_LIQUIDATION",
              "name": "ONE_CLICK_LIQUIDATION",
              "description": "One click liquidation"
            },
            {
              "value": "B2C_INTEREST_SETTLE_LIQUIDATION",
              "name": "B2C_INTEREST_SETTLE_LIQUIDATION",
              "description": "B2C interest settle liquidation"
            },
            {
              "value": "AIR_DROP_LIQUIDATION",
              "name": "AIR_DROP_LIQUIDATION",
              "description": "Air drop liquidation"
            }
          ]
        },
        "accumulatedPrincipal": {
          "type": "string",
          "description": "Accumulated principal"
        },
        "changeAssets": {
          "type": "object",
          "properties": {},
          "additionalProperties": {
            "type": "object",
            "properties": {
              "total": {
                "type": "string"
              },
              "hold": {
                "type": "string"
              },
              "liabilityPrincipal": {
                "type": "string"
              },
              "liabilityInterest": {
                "type": "string"
              }
            },
            "required": [
              "total",
              "hold",
              "liabilityPrincipal",
              "liabilityInterest"
            ]
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "tag",
        "status",
        "statusBizType",
        "accumulatedPrincipal",
        "changeAssets",
        "timestamp"
      ]
    }
  },
  "required": [
    "subject",
    "userId",
    "channelType",
    "topic",
    "type",
    "data"
  ]
}
```

<h3 id="get-isolated-margin-position-change-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Margin_margin_private_isolatedMarginPosition](#schemamargin_margin_private_isolatedmarginposition)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Cross Margin Position change

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/crossMarginPosition/margin/position',
{
  method: 'TRACE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.trace('/crossMarginPosition/margin/position', headers = headers)

print(r.json())

```

`TRACE /crossMarginPosition/margin/position`

The system will push the change event when the position status changes, or push the current debt message periodically when there is a liability.

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "debtRatio": {
          "type": "number",
          "description": "Debt ratio"
        },
        "totalAsset": {
          "type": "number",
          "description": "Total assets in BTC (interest included)"
        },
        "marginCoefficientTotalAsset": {
          "type": "string"
        },
        "totalDebt": {
          "type": "string",
          "description": "Total debt in BTC (interest included)"
        },
        "assetList": {
          "type": "object",
          "properties": {},
          "description": "Asset list (interest included)",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "total": {
                "type": "string"
              },
              "available": {
                "type": "string"
              },
              "hold": {
                "type": "string"
              }
            },
            "required": [
              "total",
              "available",
              "hold"
            ]
          }
        },
        "debtList": {
          "type": "object",
          "properties": {},
          "description": "Debt list (interest included)",
          "additionalProperties": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": [
            "FROZEN_FL",
            "UNFROZEN_FL",
            "FROZEN_RENEW",
            "UNFROZEN_RENEW",
            "LIABILITY",
            "UNLIABILITY"
          ],
          "description": "Event type, **Only applicable to \"debt.ratio\" subject**",
          "x-api-enum": [
            {
              "value": "FROZEN_FL",
              "name": "FROZEN_FL",
              "description": "When the debt ratio exceeds the liquidation threshold and the position is frozen, the system will push this event."
            },
            {
              "value": "UNFROZEN_FL",
              "name": "UNFROZEN_FL",
              "description": "When the liquidation is finished and the position returns to “EFFECTIVE” status, the system will push this event."
            },
            {
              "value": "FROZEN_RENEW",
              "name": "FROZEN_RENEW",
              "description": "When the auto-borrow renewing is complete and the position returns to “EFFECTIVE” status, the system will push this event."
            },
            {
              "value": "UNFROZEN_RENEW",
              "name": "UNFROZEN_RENEW",
              "description": "When the account reaches a negative balance, the system will push this event."
            },
            {
              "value": "LIABILITY",
              "name": "LIABILITY",
              "description": "When the account reaches a negative balance, the system will push this event."
            },
            {
              "value": "UNLIABILITY",
              "name": "UNLIABILITY",
              "description": "When all the liabilities are repaid and the position returns to “EFFECTIVE” status, the system will push this event."
            }
          ]
        }
      },
      "required": [
        "debtRatio",
        "totalAsset",
        "marginCoefficientTotalAsset",
        "totalDebt",
        "assetList",
        "debtList",
        "timestamp",
        "type"
      ]
    },
    "subject": {
      "type": "string",
      "enum": [
        "debt.ratio",
        "position.status"
      ],
      "x-api-enum": [
        {
          "value": "debt.ratio",
          "name": "",
          "description": ""
        },
        {
          "value": "position.status",
          "name": "",
          "description": ""
        }
      ]
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": [
        "private",
        "public"
      ],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    }
  },
  "required": [
    "topic",
    "type",
    "data",
    "subject",
    "userId",
    "channelType"
  ]
}
```

<h3 id="get-cross-margin-position-change-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Margin_margin_private_crossMarginPosition](#schemamargin_margin_private_crossmarginposition)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Margin_margin_public_markPrice">Margin_margin_public_markPrice</h2>
<!-- backwards compatibility -->
<a id="schemamargin_margin_public_markprice"></a>
<a id="schema_Margin_margin_public_markPrice"></a>
<a id="tocSmargin_margin_public_markprice"></a>
<a id="tocsmargin_margin_public_markprice"></a>

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "granularity": {
          "type": "integer"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "symbol",
        "granularity",
        "timestamp",
        "value"
      ]
    }
  },
  "required": [
    "id",
    "type",
    "topic",
    "subject",
    "data"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|topic|string|true|none|none|
|subject|string|true|none|none|
|data|object|true|none|none|
|» symbol|string|true|none|none|
|» granularity|integer|true|none|none|
|» timestamp|integer(int64)|true|none|none|
|» value|number|true|none|none|

<h2 id="tocS_Margin_margin_public_indexPrice">Margin_margin_public_indexPrice</h2>
<!-- backwards compatibility -->
<a id="schemamargin_margin_public_indexprice"></a>
<a id="schema_Margin_margin_public_indexPrice"></a>
<a id="tocSmargin_margin_public_indexprice"></a>
<a id="tocsmargin_margin_public_indexprice"></a>

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "topic": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "granularity": {
          "type": "integer"
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "symbol",
        "granularity",
        "timestamp",
        "value"
      ]
    }
  },
  "required": [
    "id",
    "type",
    "topic",
    "subject",
    "data"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|type|string|true|none|none|
|topic|string|true|none|none|
|subject|string|true|none|none|
|data|object|true|none|none|
|» symbol|string|true|none|none|
|» granularity|integer|true|none|none|
|» timestamp|integer(int64)|true|none|none|
|» value|number|true|none|none|

<h2 id="tocS_Margin_margin_private_isolatedMarginPosition">Margin_margin_private_isolatedMarginPosition</h2>
<!-- backwards compatibility -->
<a id="schemamargin_margin_private_isolatedmarginposition"></a>
<a id="schema_Margin_margin_private_isolatedMarginPosition"></a>
<a id="tocSmargin_margin_private_isolatedmarginposition"></a>
<a id="tocsmargin_margin_private_isolatedmarginposition"></a>

```json
{
  "type": "object",
  "properties": {
    "subject": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": [
        "private",
        "public"
      ],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    },
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string",
          "description": "Isolated margin symbol",
          "example": [
            "BTC-USDT",
            "ETH-USDT"
          ]
        },
        "status": {
          "type": "string",
          "description": "Position status",
          "enum": [
            "DEBT",
            "CLEAR",
            "IN_BORROW",
            "IN_REPAY",
            "IN_LIQUIDATION",
            "IN_AUTO_RENEW"
          ],
          "x-api-enum": [
            {
              "value": "DEBT",
              "name": "DEBT",
              "description": "Debt"
            },
            {
              "value": "CLEAR",
              "name": "CLEAR",
              "description": "debt-free"
            },
            {
              "value": "IN_BORROW",
              "name": "IN_BORROW",
              "description": "Borrowing"
            },
            {
              "value": "IN_REPAY",
              "name": "IN_REPAY",
              "description": "Repayment in progress"
            },
            {
              "value": "IN_LIQUIDATION",
              "name": "IN_LIQUIDATION",
              "description": "Position closing"
            },
            {
              "value": "IN_AUTO_RENEW",
              "name": "IN_AUTO_RENEW",
              "description": "Automatically renewing"
            }
          ]
        },
        "statusBizType": {
          "type": "string",
          "enum": [
            "FORCE_LIQUIDATION",
            "USER_BORROW",
            "TRADE_AUTO_BORROW",
            "USER_REPAY",
            "AUTO_REPAY",
            "DEFAULT_DEBT",
            "DEFAULT_CLEAR",
            "ONE_CLICK_LIQUIDATION",
            "B2C_INTEREST_SETTLE_LIQUIDATION",
            "AIR_DROP_LIQUIDATION"
          ],
          "description": "Status type",
          "x-api-enum": [
            {
              "value": "FORCE_LIQUIDATION",
              "name": "FORCE_LIQUIDATION",
              "description": "Liquidation"
            },
            {
              "value": "USER_BORROW",
              "name": "USER_BORROW",
              "description": "User borrow"
            },
            {
              "value": "TRADE_AUTO_BORROW",
              "name": "TRADE_AUTO_BORROW",
              "description": "Trade auto borrow"
            },
            {
              "value": "USER_REPAY",
              "name": "USER_REPAY",
              "description": "User reply"
            },
            {
              "value": "AUTO_REPAY",
              "name": "AUTO_REPAY",
              "description": "Auto reply"
            },
            {
              "value": "DEFAULT_DEBT",
              "name": "DEFAULT_DEBT",
              "description": "In debt"
            },
            {
              "value": "DEFAULT_CLEAR",
              "name": "DEFAULT_CLEAR",
              "description": "No debt"
            },
            {
              "value": "ONE_CLICK_LIQUIDATION",
              "name": "ONE_CLICK_LIQUIDATION",
              "description": "One click liquidation"
            },
            {
              "value": "B2C_INTEREST_SETTLE_LIQUIDATION",
              "name": "B2C_INTEREST_SETTLE_LIQUIDATION",
              "description": "B2C interest settle liquidation"
            },
            {
              "value": "AIR_DROP_LIQUIDATION",
              "name": "AIR_DROP_LIQUIDATION",
              "description": "Air drop liquidation"
            }
          ]
        },
        "accumulatedPrincipal": {
          "type": "string",
          "description": "Accumulated principal"
        },
        "changeAssets": {
          "type": "object",
          "properties": {},
          "additionalProperties": {
            "type": "object",
            "properties": {
              "total": {
                "type": "string"
              },
              "hold": {
                "type": "string"
              },
              "liabilityPrincipal": {
                "type": "string"
              },
              "liabilityInterest": {
                "type": "string"
              }
            },
            "required": [
              "total",
              "hold",
              "liabilityPrincipal",
              "liabilityInterest"
            ]
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        }
      },
      "required": [
        "tag",
        "status",
        "statusBizType",
        "accumulatedPrincipal",
        "changeAssets",
        "timestamp"
      ]
    }
  },
  "required": [
    "subject",
    "userId",
    "channelType",
    "topic",
    "type",
    "data"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subject|string|true|none|none|
|userId|string|true|none|none|
|channelType|string|true|none|Channel type|
|topic|string|true|none|none|
|type|string|true|none|none|
|data|object|true|none|none|
|» tag|string|true|none|Isolated margin symbol|
|» status|string|true|none|Position status|
|» statusBizType|string|true|none|Status type|
|» accumulatedPrincipal|string|true|none|Accumulated principal|
|» changeAssets|object|true|none|none|
|»» **additionalProperties**|object|false|none|none|
|»»» total|string|true|none|none|
|»»» hold|string|true|none|none|
|»»» liabilityPrincipal|string|true|none|none|
|»»» liabilityInterest|string|true|none|none|
|» timestamp|integer(int64)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|channelType|private|
|channelType|public|
|status|DEBT|
|status|CLEAR|
|status|IN_BORROW|
|status|IN_REPAY|
|status|IN_LIQUIDATION|
|status|IN_AUTO_RENEW|
|statusBizType|FORCE_LIQUIDATION|
|statusBizType|USER_BORROW|
|statusBizType|TRADE_AUTO_BORROW|
|statusBizType|USER_REPAY|
|statusBizType|AUTO_REPAY|
|statusBizType|DEFAULT_DEBT|
|statusBizType|DEFAULT_CLEAR|
|statusBizType|ONE_CLICK_LIQUIDATION|
|statusBizType|B2C_INTEREST_SETTLE_LIQUIDATION|
|statusBizType|AIR_DROP_LIQUIDATION|

<h2 id="tocS_Margin_margin_private_crossMarginPosition">Margin_margin_private_crossMarginPosition</h2>
<!-- backwards compatibility -->
<a id="schemamargin_margin_private_crossmarginposition"></a>
<a id="schema_Margin_margin_private_crossMarginPosition"></a>
<a id="tocSmargin_margin_private_crossmarginposition"></a>
<a id="tocsmargin_margin_private_crossmarginposition"></a>

```json
{
  "type": "object",
  "properties": {
    "topic": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "debtRatio": {
          "type": "number",
          "description": "Debt ratio"
        },
        "totalAsset": {
          "type": "number",
          "description": "Total assets in BTC (interest included)"
        },
        "marginCoefficientTotalAsset": {
          "type": "string"
        },
        "totalDebt": {
          "type": "string",
          "description": "Total debt in BTC (interest included)"
        },
        "assetList": {
          "type": "object",
          "properties": {},
          "description": "Asset list (interest included)",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "total": {
                "type": "string"
              },
              "available": {
                "type": "string"
              },
              "hold": {
                "type": "string"
              }
            },
            "required": [
              "total",
              "available",
              "hold"
            ]
          }
        },
        "debtList": {
          "type": "object",
          "properties": {},
          "description": "Debt list (interest included)",
          "additionalProperties": {
            "type": "string"
          }
        },
        "timestamp": {
          "type": "integer",
          "format": "int64"
        },
        "type": {
          "type": "string",
          "enum": [
            "FROZEN_FL",
            "UNFROZEN_FL",
            "FROZEN_RENEW",
            "UNFROZEN_RENEW",
            "LIABILITY",
            "UNLIABILITY"
          ],
          "description": "Event type, **Only applicable to \"debt.ratio\" subject**",
          "x-api-enum": [
            {
              "value": "FROZEN_FL",
              "name": "FROZEN_FL",
              "description": "When the debt ratio exceeds the liquidation threshold and the position is frozen, the system will push this event."
            },
            {
              "value": "UNFROZEN_FL",
              "name": "UNFROZEN_FL",
              "description": "When the liquidation is finished and the position returns to “EFFECTIVE” status, the system will push this event."
            },
            {
              "value": "FROZEN_RENEW",
              "name": "FROZEN_RENEW",
              "description": "When the auto-borrow renewing is complete and the position returns to “EFFECTIVE” status, the system will push this event."
            },
            {
              "value": "UNFROZEN_RENEW",
              "name": "UNFROZEN_RENEW",
              "description": "When the account reaches a negative balance, the system will push this event."
            },
            {
              "value": "LIABILITY",
              "name": "LIABILITY",
              "description": "When the account reaches a negative balance, the system will push this event."
            },
            {
              "value": "UNLIABILITY",
              "name": "UNLIABILITY",
              "description": "When all the liabilities are repaid and the position returns to “EFFECTIVE” status, the system will push this event."
            }
          ]
        }
      },
      "required": [
        "debtRatio",
        "totalAsset",
        "marginCoefficientTotalAsset",
        "totalDebt",
        "assetList",
        "debtList",
        "timestamp",
        "type"
      ]
    },
    "subject": {
      "type": "string",
      "enum": [
        "debt.ratio",
        "position.status"
      ],
      "x-api-enum": [
        {
          "value": "debt.ratio",
          "name": "",
          "description": ""
        },
        {
          "value": "position.status",
          "name": "",
          "description": ""
        }
      ]
    },
    "userId": {
      "type": "string"
    },
    "channelType": {
      "type": "string",
      "enum": [
        "private",
        "public"
      ],
      "description": "Channel type",
      "x-api-enum": [
        {
          "value": "private",
          "name": "private",
          "description": "private channel"
        },
        {
          "value": "public",
          "name": "public",
          "description": "public channel"
        }
      ]
    }
  },
  "required": [
    "topic",
    "type",
    "data",
    "subject",
    "userId",
    "channelType"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|topic|string|true|none|none|
|type|string|true|none|none|
|data|object|true|none|none|
|» debtRatio|number|true|none|Debt ratio|
|» totalAsset|number|true|none|Total assets in BTC (interest included)|
|» marginCoefficientTotalAsset|string|true|none|none|
|» totalDebt|string|true|none|Total debt in BTC (interest included)|
|» assetList|object|true|none|Asset list (interest included)|
|»» **additionalProperties**|object|false|none|none|
|»»» total|string|true|none|none|
|»»» available|string|true|none|none|
|»»» hold|string|true|none|none|
|» debtList|object|true|none|Debt list (interest included)|
|»» **additionalProperties**|string|false|none|none|
|» timestamp|integer(int64)|true|none|none|
|» type|string|true|none|Event type, **Only applicable to "debt.ratio" subject**|
|subject|string|true|none|none|
|userId|string|true|none|none|
|channelType|string|true|none|Channel type|

#### Enumerated Values

|Property|Value|
|---|---|
|type|FROZEN_FL|
|type|UNFROZEN_FL|
|type|FROZEN_RENEW|
|type|UNFROZEN_RENEW|
|type|LIABILITY|
|type|UNLIABILITY|
|subject|debt.ratio|
|subject|position.status|
|channelType|private|
|channelType|public|

