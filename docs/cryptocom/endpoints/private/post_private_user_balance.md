# POST private/user-balance

**Source:** [private/user-balance](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-user-balance)

## Authentication

Required (Private Endpoint)

## private/user-balance

> Request Sample

```
{
  "id":11,
  "method": "private/user-balance",
  "params": {},
  "nonce": 1611022832613
}
```

> Response Sample

```
{
  "id": 11,
  "method": "private/user-balance",
  "code": 0,
  "result": {
    "data": [
      {
        "total_available_balance": "4721.05898582",
        "total_margin_balance": "7595.42571782",
        "total_initial_margin": "2874.36673202",
        "total_position_im": "486.31273202",
        "total_haircut": "2388.054",
        "total_maintenance_margin": "1437.18336601",
        "total_position_cost": "14517.54641301",
        "total_cash_balance": "7890.00320721",
        "total_collateral_value": "7651.18811483",
        "total_session_unrealized_pnl": "-55.76239701",
        "instrument_name": "USD",
        "total_session_realized_pnl": "0.00000000",
        "is_liquidating": false,
        "total_effective_leverage": "1.90401230",
        "position_limit": "3000000.00000000",
        "used_position_limit": "40674.69622001",
        "position_balances": [
          {
            "instrument_name": "CRO",
            "quantity": "24422.72427884",
            "market_value": "4776.107959969951",
            "collateral_eligible": "true",
            "haircut": "0.5",
            "collateral_amount": "4537.302561971453",
            "max_withdrawal_balance": "24422.72427884",
            "reserved_qty" : "0.00000000"
          },
          {
            "instrument_name": "USD",
            "quantity": "3113.50747209",
            "market_value": "3113.50747209",
            "collateral_eligible": "true",
            "haircut": "0",
            "collateral_amount": "3113.50747209",
            "max_withdrawal_balance": "3113.50747209",
            "reserved_qty" : "0.00000000"
          },
          {
            "instrument_name": "USDT",
            "quantity": "0.19411607",
            "market_value": "0.19389555414448",
            "collateral_eligible": "true",
            "haircut": "0.02",
            "collateral_amount": "0.18904816529086801",
            "max_withdrawal_balance": "0.19411607",
            "reserved_qty" : "0.00000000"
          },
          {
            "instrument_name": "DAI",
            "quantity": "0.19387960",
            "market_value": "0.1938796",
            "collateral_eligible": "false",
            "haircut": "0.975",
            "collateral_amount": "0.18903261000000002",
            "max_withdrawal_balance": "0.1938796",
            "reserved_qty" : "0.00000000"
          }
        ]
      }
    ]
  }
}
```

Returns the user's wallet balance.

### Request Params

**Note**: You still need to pass in an empty `params` block like `params: {}` for API request consistency

### Applies To

REST Websocket (User API)

### REST Method

POST

### Response Attributes

An array consisting of:

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | Instrument name of the balance e.g. `USD` |
| total\_available\_balance | string | Balance that user can open new order (Margin Balance - Initial Margin) |
| total\_margin\_balance | string | Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves |
| total\_initial\_margin | string | Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings  
Total sum of total\_position\_im + total\_haircut |
| total\_position\_im | string | initial margin requirement to support open positions and orders |
| total\_haircut | string | the total haircut on eligible collateral token assets |
| total\_maintenance\_margin | string | Total maintenance margin requirement for all positions |
| total\_position\_cost | string | Position value in USD |
| total\_cash\_balance | string | Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees) |
| total\_collateral\_value | string | Collateral Value |
| total\_session\_unrealized\_pnl | string | Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price) |
| total\_session\_realized\_pnl | string | Current realized profit and loss from all open positions (calculated with Mark Price and Avg Price) |
| is\_liquidating | boolean | Describes whether the account is under liquidation |
| total\_effective\_leverage | string | The actual leverage used (all open positions combined), i.e. position size / margin balance |
| position\_limit | string | Maximum position size allowed (for all open positions combined) |
| used\_position\_limit | string | Combined position size of all open positions + order exposure on all instruments |
| position\_balances | array | Collateral balances as shown below |

`position_balances` is an array consisting of:

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI` |
| quantity | string | Quantity of the collateral |
| market\_value | string | Market value of the collateral |
| collateral\_eligible | boolean | true or false |
| haircut | string | Show haircut for eligible collateral token |
| collateral\_amount | string | Collateral amount derived by market\_value minus haircut |
| max\_withdrawal\_balance | string | Max withdrawal balance of the collateral |
| reserved\_qty | string | Fund/balance in use, not available for new orders or additional trading activities. |