---
title: margin v1.0.0
language_tabs:
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="margin">margin v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a
> language for code samples from the tabs above or the mobile navigation menu.

margin_public

<h1 id="margin-default">Default</h1>

## Mark Price

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/markPrice/indicator/markPrice:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
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

Subscribe to this topic to get the mark price for margin trading. The following
ticker symbols are supported: List of currently supported symbols

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
      "required": ["symbol", "granularity", "timestamp", "value"]
    }
  },
  "required": ["id", "type", "topic", "subject", "data"]
}
```

<h3 id="mark-price-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                  |
| ------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Margin_margin_public_markPrice](#schemamargin_margin_public_markprice) |

<aside class="success">
This operation does not require authentication
</aside>

## Index Price

> Code samples

```javascript
const headers = {
  Accept: "application/json"
}

fetch("/indexPrice/indicator/index:_symbol_,_symbol_", {
  method: "TRACE",

  headers: headers
})
  .then(function (res) {
    return res.json()
  })
  .then(function (body) {
    console.log(body)
  })
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

Subscribe to this topic to get the index price for margin trading. The following
ticker symbols are supported: List of currently supported symbols.

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
      "required": ["symbol", "granularity", "timestamp", "value"]
    }
  },
  "required": ["id", "type", "topic", "subject", "data"]
}
```

<h3 id="index-price-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema                                                                    |
| ------ | ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | [Margin_margin_public_indexPrice](#schemamargin_margin_public_indexprice) |

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
      "required": ["symbol", "granularity", "timestamp", "value"]
    }
  },
  "required": ["id", "type", "topic", "subject", "data"]
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description |
| ------------- | -------------- | -------- | ------------ | ----------- |
| id            | string         | true     | none         | none        |
| type          | string         | true     | none         | none        |
| topic         | string         | true     | none         | none        |
| subject       | string         | true     | none         | none        |
| data          | object         | true     | none         | none        |
| » symbol      | string         | true     | none         | none        |
| » granularity | integer        | true     | none         | none        |
| » timestamp   | integer(int64) | true     | none         | none        |
| » value       | number         | true     | none         | none        |

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
      "required": ["symbol", "granularity", "timestamp", "value"]
    }
  },
  "required": ["id", "type", "topic", "subject", "data"]
}
```

### Properties

| Name          | Type           | Required | Restrictions | Description |
| ------------- | -------------- | -------- | ------------ | ----------- |
| id            | string         | true     | none         | none        |
| type          | string         | true     | none         | none        |
| topic         | string         | true     | none         | none        |
| subject       | string         | true     | none         | none        |
| data          | object         | true     | none         | none        |
| » symbol      | string         | true     | none         | none        |
| » granularity | integer        | true     | none         | none        |
| » timestamp   | integer(int64) | true     | none         | none        |
| » value       | number         | true     | none         | none        |
