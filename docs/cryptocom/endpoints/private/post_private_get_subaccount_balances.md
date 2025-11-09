# POST private/get-subaccount-balances

**Source:**
[private/get-subaccount-balances](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-subaccount-balances)

## Authentication

Required (Private Endpoint)

## private/get-subaccount-balances

> Request Sample

```
{
  "id": 1,
  "method": "private/get-subaccount-balances",
  "params": {},
  "nonce": 1
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-subaccount-balances",
  "code": 0,
  "result": {
    "data": [
      // Sub account with no balance
      {
        "account": "a0d206a1-6b06-47c5-9cd3-8bc6ef0915c5",
        "instrument_name": "USD",
        "total_available_balance": "0.00000000",
        "total_margin_balance": "0.00000000",
        "total_initial_margin": "0.00000000",
        "total_maintenance_margin": "0.00000000",
        "total_position_cost": "0.00000000",
        "total_cash_balance": "0.00000000",
        "total_collateral_value": "0.00000000",
        "total_session_unrealized_pnl": "0.00000000",
        "total_session_realized_pnl": "0.00000000",
        "total_effective_leverage": "0.00000000",
        "position_limit": "3000000.00000000",
        "used_position_limit": "0.00000000",
        "is_liquidating": false,
        "position_balances": [ ]
      },
      // Sub account with balance
      {
        "account": "49786818-6ead-40c4-a008-ea6b0fa5cf96",
        "instrument_name": "USD",
        "total_available_balance": "20823.62250000",
        "total_margin_balance": "20823.62250000",
        "total_initial_margin": "0.00000000",
        "total_maintenance_margin": "0.00000000",
        "total_position_cost": "0.00000000",
        "total_cash_balance": "21919.55000000",
        "total_collateral_value": "20823.62250000",
        "total_session_unrealized_pnl": "0.00000000",
        "total_session_realized_pnl": "0.00000000",
        "total_effective_leverage": "0.00000000",
        "position_limit": "3000000.00000000",
        "used_position_limit": "0.00000000",
        "is_liquidating": false,
        "position_balances": [
          {
            "instrument_name": "BTC",
            "quantity": "1.0000000000",
            "market_value": "21918.5500000000",
            "collateral_eligible": "true",
            "haircut": "0.5500000000",
            "collateral_amount": "21918.0000000000",
            "max_withdrawal_balance": "1.0000000000"
          },
          {
            "instrument_name": "USD",
            "quantity": "1.00000000",
            "market_value": "1.00000000",
            "collateral_eligible": "true",
            "haircut": "0.10000000",
            "collateral_amount": "0.90000000",
            "max_withdrawal_balance": "0.00000000"
          }
        ]
      },
      {
        "account": "507d3f7d-37c3-4a09-9076-b83c2fcbb638",
        "total_available_balance": "20922.62250000",
        "total_margin_balance": "20922.62250000",
        "total_initial_margin": "0.00000000",
        "total_maintenance_margin": "0.00000000",
        "total_position_cost": "0.00000000",
        "total_cash_balance": "22018.55000000",
        "total_collateral_value": "20922.62250000",
        "total_session_unrealized_pnl": "0.00000000",
        "instrument_name": "USD",
        "total_session_realized_pnl": "0.00000000",
        "total_effective_leverage": "0.00000000",
        "position_limit": "3000000.00000000",
        "used_position_limit": "0.00000000",
        "is_liquidating": false,
        "position_balances": [
          {
            "instrument_name": "BTC",
            "quantity": "1.0000000000",
            "market_value": "21918.5500000000",
            "collateral_eligible": "true",
            "haircut": "0.5500000000",
            "collateral_amount": "21918.0000000000",
            "max_withdrawal_balance": "1.0000000000"
          },
          {
            "instrument_name": "USD",
            "quantity": "100.00000000",
            "market_value": "100.00000000",
            "collateral_eligible": "true",
            "haircut": "1.00000000",
            "collateral_amount": "99.00000000",
            "max_withdrawal_balance": "0.00000000"
          }
        ]
      }
    ]
  }
}
```

Returns the user's wallet balances of all sub-accounts.

### Request Params

**Note**: You still need to pass in an empty `params` block like `params: {}`
for API request consistency

### Applies To

REST

### REST Method

POST

### Response Attributes

An array consisting of:

| Name                         | Type    | Description                                                                                                          |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| account                      | string  | Sub account ID                                                                                                       |
| instrument_name              | string  | Instrument name of the balance e.g. `USD`                                                                            |
| total_available_balance      | string  | Balance that user can open new order (Margin Balance - Initial Margin)                                               |
| total_margin_balance         | string  | Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves |
| total_initial_margin         | string  | Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings            |
| total_maintenance_margin     | string  | Total maintenance margin requirement for all positions                                                               |
| total_position_cost          | string  | Position value in USD                                                                                                |
| total_cash_balance           | string  | Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees)                                                        |
| total_collateral_value       | string  | Collateral Value                                                                                                     |
| total_session_unrealized_pnl | string  | Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price)                |
| total_session_realized_pnl   | string  | Current realized profit and loss from all open positions (calculated with Mark Price and Avg Price)                  |
| is_liquidating               | boolean | Describes whether the account is under liquidation                                                                   |
| total_effective_leverage     | string  | The actual leverage used (all open positions combined), i.e. position size / margin balance                          |
| position_limit               | string  | Maximum position size allowed (for all open positions combined)                                                      |
| used_position_limit          | string  | Combined position size of all open positions + order exposure on all instruments                                     |
| position_balances            | array   | Collateral balances as shown below                                                                                   |

`position_balances` is an array consisting of:

| Name                   | Type    | Description                                                           |
| ---------------------- | ------- | --------------------------------------------------------------------- |
| instrument_name        | string  | Instrument name of the collateral e.g. `USD`, `CRO`, `USDT`, or `DAI` |
| quantity               | string  | Quantity of the collateral                                            |
| market_value           | string  | Market value of the collateral                                        |
| collateral_eligible    | boolean | true or false                                                         |
| haircut                | string  | Show haircut for eligible collateral token                            |
| collateral_amount      | string  | Collateral amount derived by market_value minus haircut               |
| max_withdrawal_balance | string  | Max withdrawal balance of the collateral                              |
