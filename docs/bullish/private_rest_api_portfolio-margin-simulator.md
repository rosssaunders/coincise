# Bullish Trading API - Private REST API - Portfolio Margin Simulator

# portfolio-margin-simulator

## simulate-portfolio-margin

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "required": [
    "tradingAccountId"
  ],
  "properties": {
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "positions": {
      "type": "array",
      "description": "portfolio position to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": [
              "symbol",
              "quantity"
            ],
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC-USDC-PERP"
              },
              "quantity": {
                "description": "size of the position",
                "type": "string",
                "example": "1.0"
              }
            }
          }
        ]
      }
    },
    "orders": {
      "type": "array",
      "description": "pending orders to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": [
              "symbol",
              "quantity"
            ],
            "properties": {
              "symbol": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                    "example": "BTCUSDC"
                  }
                ]
              },
              "quantity": {
                "description": "quantity placed for order",
                "type": "string",
                "example": "1.0"
              },
              "limitPrice": {
                "description": "limit price for order",
                "type": "string",
                "example": "10000.0"
              }
            }
          }
        ]
      }
    },
    "referencePrices": {
      "type": "array",
      "description": "reference price to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC"
              },
              "price": {
                "description": "reference price for asset or market",
                "type": "string",
                "example": "12000.0"
              }
            }
          }
        ]
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':{
  "type": "string"
}
};

fetch('https://api.exchange.bullish.com/trading-api/v1/simulate-portfolio-margin',
{
  method: 'POST',
  body: inputBody,
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
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': {
  "type": "string"
}
}

r = requests.post('https://api.exchange.bullish.com/trading-api/v1/simulate-portfolio-margin', headers = headers)

print(r.json())

```

`POST /v1/simulate-portfolio-margin`

_Portfolio Margin Simulator_

Use Portfolio margin simulator to determine your margin requirements and risk
levels based on your current portfolio balances. You can also append position
details on top of your portfolio specifics to see simulated results.

> Body parameter

```json
{
  "type": "object",
  "required": ["tradingAccountId"],
  "properties": {
    "tradingAccountId": {
      "allOf": [
        {
          "description": "unique trading account ID",
          "type": "string",
          "example": "111000000000001"
        }
      ]
    },
    "positions": {
      "type": "array",
      "description": "portfolio position to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC-USDC-PERP"
              },
              "quantity": {
                "description": "size of the position",
                "type": "string",
                "example": "1.0"
              }
            }
          }
        ]
      }
    },
    "orders": {
      "type": "array",
      "description": "pending orders to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "required": ["symbol", "quantity"],
            "properties": {
              "symbol": {
                "allOf": [
                  {
                    "type": "string",
                    "description": "market symbol. Eg `BTCUSDC` for SPOT and `BTC-USDC-PERP` for PERPETUAL market",
                    "example": "BTCUSDC"
                  }
                ]
              },
              "quantity": {
                "description": "quantity placed for order",
                "type": "string",
                "example": "1.0"
              },
              "limitPrice": {
                "description": "limit price for order",
                "type": "string",
                "example": "10000.0"
              }
            }
          }
        ]
      }
    },
    "referencePrices": {
      "type": "array",
      "description": "reference price to be used in simulation",
      "items": {
        "allOf": [
          {
            "type": "string",
            "properties": {
              "symbol": {
                "description": "asset or market symbol. Eg `USDC` for asset and `BTCUSDC` for market",
                "type": "string",
                "example": "BTC"
              },
              "price": {
                "description": "reference price for asset or market",
                "type": "string",
                "example": "12000.0"
              }
            }
          }
        ]
      }
    }
  }
}
```

### Parameters

| Name            | In     | Type                                                            | Required | Description                                                                                  |
| --------------- | ------ | --------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| Authorization   | header | string                                                          | true     | authorization header, its value must be 'Bearer ' + [token](#overview--generate-a-jwt-token) |
| includeExisting | query  | [Boolean](#schemaboolean)                                       | false    | none                                                                                         |
| body            | body   | [PortfolioSimulationRequest](#schemaportfoliosimulationrequest) | false    | none                                                                                         |

> Example responses

> 200 Response

```json
{
  "description": "Simulation result",
  "type": "string",
  "properties": {
    "collateralUSD": {
      "description": "total collateral across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "13000.0000"
    },
    "borrowedUSD": {
      "description": "total borrowed across all assets in this trading account displayed in the reference asset in USD",
      "type": "string",
      "example": "12000.0000"
    },
    "initialMarginUSD": {
      "description": "The minimum margin one must maintain in order to be able to purposefully increase risk",
      "type": "string",
      "example": "14000.0000"
    },
    "warningMarginUSD": {
      "description": "The minimum margin when the customer will receive warning via email/notifications over UI",
      "type": "string",
      "example": "15000.0000"
    },
    "liquidationMarginUSD": {
      "description": "The minimum value of margin one must maintain in order to avoid liquidation",
      "type": "string",
      "example": "16000.0000"
    },
    "fullLiquidationMarginUSD": {
      "description": "The value of margin when full liquidation occurs",
      "type": "string",
      "example": "17000.0000"
    },
    "defaultedMarginUSD": {
      "description": "The value of margin when this trading account will be moved into a Defaulted state",
      "type": "string",
      "example": "18000.0000"
    },
    "liquidityAddonUSD": {
      "description": "expected market impact of unwinding the portfolio in the case of a liquidation event",
      "type": "string",
      "example": "19000.0000"
    },
    "marketRiskUSD": {
      "description": "the worst possible loss on the portfolio based on scenario analysis",
      "type": "string",
      "example": "20000.0000"
    }
  }
}
```

### Responses

| Status | Meaning                                                                    | Description           | Schema                                                            |
| ------ | -------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK                    | [PortfolioSimulationResponse](#schemaportfoliosimulationresponse) |
| 400    | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request           | None                                                              |
| 401    | [Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)            | Not Authenticated     | None                                                              |
| 403    | [Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)             | Access Forbidden      | None                                                              |
| 429    | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)         | Too Many Requests     | None                                                              |
| 500    | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Internal Server Error | None                                                              |

> **Note:** To perform this operation, you must be authenticated by means of one
> of the following methods: jwtTokenAuth
