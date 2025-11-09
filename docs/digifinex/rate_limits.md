# Rate Limits

## Digifinex API Trading Rules

In order to provide a better API trading environment, avoid malicious
manipulation and disruption of the market integrity, DigiFinex hereby publish
risk-control quantitative indicators and anti-manipulation rules.

### Quantitative Indicators

The indicators record and calculated by all orders on certain trading pair
within one time period.

- Filling Ratio（FR） FR = Total number of Filled Orders / Total Number of
  Orders
- Filling Weight（FW） FW = Totall Filled Amount / Total Order Amount
- Cancellation Ratio（CR） CR = Total Number of Fully-Cancelled Orders / Total
  Number of Orders In which the Fully-Cancelled Orders indicate orders with
  zero-filled amount and cancelled within 5 seconds after order placement.

### Trigger Conditions

| Indicator                | Trigger Value | Trigger Condition     | Calculating Cycle |
| ------------------------ | ------------- | --------------------- | ----------------- |
| Filling Ratio（FR）      | <0.01         | Number of Orders > 99 | 10 minutes        |
| Filling Weight（FW）     | <0.01         | Number of Orders > 49 | 10 minutes        |
| Cancellation Ratio（CR） | \>0.95        | Number of Orders > 99 | 10 minutes        |

### Risk Control and API Ban

API Users violated any anti-manipulation rules will be banned for API trading
for 30 minutes. The time will extend to 24 hours after third ban within 3 hours.
During that time, banned user cannot place new order through API or creat new
API key, order placement and cancellation will not be affected whatsoever.
