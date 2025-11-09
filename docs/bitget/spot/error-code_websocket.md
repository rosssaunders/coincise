# WebSocket Error Code

| Error Code | Description                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 429        | Too Many Requests                                                                                                                                           |
| 25000      | System error, please try again later                                                                                                                        |
| 25001      | Operation timed out                                                                                                                                         |
| 25002      | Unsupported operation                                                                                                                                       |
| 25003      | Concurrent operation, please retry                                                                                                                          |
| 25004      | Operation too frequent, please try again later                                                                                                              |
| 25005      | User does not exist                                                                                                                                         |
| 25006      | Abnormal account status                                                                                                                                     |
| 25007      | Account in an irregular status                                                                                                                              |
| 25008      | Account is in forced liquidation status                                                                                                                     |
| 25009      | Unsupported account mode switch                                                                                                                             |
| 25010      | Unsupported position mode switch                                                                                                                            |
| 25011      | Transfer failed, account is in forced liquidation status                                                                                                    |
| 25012      | Account at risk, trading temporarily disabled                                                                                                               |
| 25013      | {0} not support API trade                                                                                                                                   |
| 25100      | Trading pair {0} does not exist                                                                                                                             |
| 25101      | Trading pair not open for trading                                                                                                                           |
| 25102      | Trading pair temporarily closed for maintenance                                                                                                             |
| 25103      | Trading pair opening soon                                                                                                                                   |
| 25104      | Contract delisted                                                                                                                                           |
| 25105      | This contract does not support opening positions                                                                                                            |
| 25106      | Trading suspended due to settlement or maintenance                                                                                                          |
| 25107      | There is currently a position, please close the position                                                                                                    |
| 25108      | The contract is in the initialization state                                                                                                                 |
| 25110      | This coin is not supported for deposits into the unified account                                                                                            |
| 25200      | {0} validation error                                                                                                                                        |
| 25201      | Currency does not exist                                                                                                                                     |
| 25202      | Insufficient balance                                                                                                                                        |
| 25203      | Insufficient margin                                                                                                                                         |
| 25204      | Order does not exist                                                                                                                                        |
| 25205      | {0} trading price cannot be below {1}%                                                                                                                      |
| 25206      | {0} trading price cannot exceed {1}%                                                                                                                        |
| 25207      | {0} trading quantity cannot be less than {1} units                                                                                                          |
| 25208      | {0} trading quantity cannot exceed {1} units                                                                                                                |
| 25209      | Insufficient market liquidity, please try again later                                                                                                       |
| 25210      | Large price fluctuation, placing the order entails higher risk, please reorder                                                                              |
| 25211      | Exceeds the limit of {0} maximum orders                                                                                                                     |
| 25212      | Duplicate clientOid                                                                                                                                         |
| 25213      | Exceeds {0} permanent net buy limit, you can currently buy up to {1} USD worth of {0}                                                                       |
| 25214      | Exceeds {0} permanent net sell limit, you can currently sell up to {1} USD worth of {0}                                                                     |
| 25215      | Exceeds {0} 24-hour net buy limit, you can currently buy up to {1} USD worth of {0}                                                                         |
| 25216      | Exceeds {0} 24-hour net sell limit, you can currently sell up to {1} USD worth of {0}                                                                       |
| 25217      | Exceeds maximum repayment limit                                                                                                                             |
| 25218      | High risk, usage may result in forced liquidation                                                                                                           |
| 25219      | Increase in IMR exceeds available assets                                                                                                                    |
| 25220      | 未找到描述                                                                                                                                                  |
| 25221      | Level gradient does not exist                                                                                                                               |
| 25222      | Trade or fair mark price does not exist                                                                                                                     |
| 25223      | Exceeds Max. leverage                                                                                                                                       |
| 25224      | Take-profit or stop-loss triggered warning, please proceed with cancellation                                                                                |
| 25225      | Insufficient available quantity in position                                                                                                                 |
| 25226      | Insufficient total position quantity                                                                                                                        |
| 25227      | No position available to close                                                                                                                              |
| 25228      | Unable to update leverage for this position, insufficient margin!                                                                                           |
| 25229      | Total positions exceed the current limit of {0} positions                                                                                                   |
| 25230      | Order quantity exceeds the maximum open quantity                                                                                                            |
| 25231      | Close quantity cannot exceed the held position quantity                                                                                                     |
| 25232      | Reduce-only orders will only reduce your position; please cancel or modify existing orders before placing a new one                                         |
| 25233      | Order quantity cannot exceed the maximum for this level                                                                                                     |
| 25234      | Remaining quantity for regular orders is {0} {1}, and for post-only orders it is {2} {3}.                                                                   |
| 25235      | Due to risk control, the maximum open position currently allowed is {0} {1}. The risk control limit for a single user includes all primary and sub-accounts |
| 25236      | Incorrect position open type                                                                                                                                |
| 25237      | Close orders can only occur in bi-directional mode                                                                                                          |
| 25238      | {0} do not assign values at the same                                                                                                                        |
| 25239      | Closing failed, please try again later                                                                                                                      |
| 25240      | {0} does not support this operation                                                                                                                         |
| 25241      | Bulk orders cannot exceed the corresponding maximum order value.                                                                                            |
| 25242      | The maximum reducible amount is {0}{1}.                                                                                                                     |
| 25243      | You have exceeded the currency holding limit and cannot add more of this currency.                                                                          |
| 25244      | Price should be a multiple of {0}                                                                                                                           |
| 25245      | The account is not the unified account mode                                                                                                                 |
| 25559      | Not loan user                                                                                                                                               |
| 25560      | Subaccount the same with RiskUnit ID                                                                                                                        |
| 25561      | SubUid not in risk unit                                                                                                                                     |
| 25562      | The subacccount is the other's Risk Unit                                                                                                                    |
| 25563      | The UID you are unbinding has a non-zero balance and has unsettled or pending loan orders in its associated risk unit.                                      |
| 25564      | The number of sub-accounts under the risk unit has exceeded the limit.                                                                                      |
| 25565      | The sub-account UID you entered is already bound to another risk unit.                                                                                      |
| 25566      | The risk unit does not exist.                                                                                                                               |
| 25567      | Exceeded the maximum quantity of contract orders：{0} {1}                                                                                                   |
| 25568      | The order does not meet the modification requirements.                                                                                                      |
| 25569      | Exceeded the maximum limit for modifications.                                                                                                               |
| 25570      | There are pending orders for contract bidirectional closing or contract unidirectional opening/reducing positions.                                          |
| 25571      | The modification price and qty is the same as the original value. Please adjust and try again.                                                              |
| 25572      | Too many pending modification requests. Please try again later                                                                                              |
| 25573      | Skipped due to prior modification failure                                                                                                                   |
| 25574      | Reduce-only order protection                                                                                                                                |
| 25575      | Failed to stop the strategy because the corresponding strategy ID could not be found                                                                        |
| 25576      | Failed to stop the strategy because it is already stopping                                                                                                  |
| 25577      | Failed to stop the strategy because the corresponding strategy ID could not be found                                                                        |
| 25578      | No strategies available to stop                                                                                                                             |
| 25579      | For long position TP/SL (close long), the take-profit trigger price must be greater than the average entry price                                            |
| 25580      | For long position TP/SL (close long), the stop-loss trigger price must be less than the average entry price                                                 |
| 25581      | For short position TP/SL (close short), the take-profit trigger price must be less than the average entry price                                             |
| 25582      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the average entry price                                            |
| 25583      | Take-profit price must be greater than 0                                                                                                                    |
| 25584      | Stop-loss price must be greater than 0                                                                                                                      |
| 25585      | For long position TP/SL (close long), the take-profit trigger price must be greater than the latest price                                                   |
| 25586      | For long position TP/SL (close long), the stop-loss trigger price must be less than the latest price                                                        |
| 25587      | For short position TP/SL (close short), the take-profit trigger price must be less than the latest price                                                    |
| 25588      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the latest price                                                   |
| 25589      | For long position TP/SL (close long), the take-profit trigger price must be greater than the mark price                                                     |
| 25590      | For long position TP/SL (close long), the stop-loss trigger price must be less than the mark price                                                          |
| 25591      | For short position TP/SL (close short), the take-profit trigger price must be less than the mark price                                                      |
| 25592      | For short position TP/SL (close short), the stop-loss trigger price must be greater than the mark price                                                     |
| 25593      | The current trading type does not support TP/SL settings                                                                                                    |
| 25594      | Only one TP/SL can be set for all positions of the current symbol                                                                                           |
| 25595      | The total TP/SL quantity for partial positions exceeds the position amount                                                                                  |
| 25596      | Cannot modify strategy in triggered or error state                                                                                                          |
| 25597      | Strategy does not exist or has already been stopped                                                                                                         |
| 25598      | Current strategy status does not support modification                                                                                                       |
| 25599      | Maximum number of active TP/SL orders for this symbol is {0}; cannot add more                                                                               |
| 25600      | No changes made to the TP/SL order; please modify before submitting                                                                                         |
| 25601      | Position does not exist; cannot set TP/SL                                                                                                                   |
| 25602      | Take-profit trigger price must be greater than 0                                                                                                            |
| 25603      | Stop-loss trigger price must be greater than 0                                                                                                              |
| 25604      | Take-profit order price must be greater than 0                                                                                                              |
| 25605      | Stop-loss order price must be greater than 0                                                                                                                |
| 25606      | Take-profit trigger price does not meet precision requirements                                                                                              |
| 25607      | Stop-loss trigger price does not meet precision requirements                                                                                                |
| 25608      | Take-profit order price does not meet precision requirements                                                                                                |
| 25609      | Stop-loss order price does not meet precision requirements                                                                                                  |
| 25610      | Order amount does not meet precision requirements                                                                                                           |
| 25611      | Order quantity must be greater than the minimum order amount                                                                                                |
| 25612      | Only opening orders are allowed to have preset take-profit and stop-loss                                                                                    |
| 25620      | permission denied                                                                                                                                           |
| 25622      | The collateral setting for institutional loans sub-accounts must be in all-coins mode                                                                       |
| 25650      | For long positions, the stop-loss price must be lower than the current price: {0}                                                                           |
| 25651      | For short positions, the take-profit price must be lower than the current price: {0}                                                                        |
| 25652      | For long positions, the take-profit price must be greater than the current price: {0}                                                                       |
| 25653      | The order has been changed. Please try again later                                                                                                          |
| 25654      | {0} trading price cannot be greater than the bankruptcy price of {1} {2}                                                                                    |
| 25655      | {0} trading price cannot be lower than the bankruptcy price of {1} {2}                                                                                      |
| 40001      | ACCESS_KEY cannot be empty                                                                                                                                  |
| 40002      | SECRET_KEY cannot be empty                                                                                                                                  |
| 40003      | Signature cannot be empty                                                                                                                                   |
| 40006      | Invalid ACCESS_KEY                                                                                                                                          |
| 40008      | Request timestamp expired                                                                                                                                   |
| 40009      | sign signature error                                                                                                                                        |
| 40017      | Parameter verification failed {0}                                                                                                                           |
| 40034      | Parameter {0} does not exist                                                                                                                                |
| 40725      | service return an error                                                                                                                                     |
| 43117      | Exceeded Max. transferable quantity                                                                                                                         |
| 95001      | The current user is undergoing forced liquidation.                                                                                                          |
| 95002      | The sub-account has contract positions and cannot be added.                                                                                                 |
| 95003      | he sub-account UID you entered does not exist.                                                                                                              |
| 95004      | The UID you unbound has a non-zero asset balance and is in a risk unit with unsettled or pending loan orders.                                               |
| 95005      | The LTV for ins loan has exceeded the limit, and opening contracts is prohibited                                                                            |
| 95006      | The LTV for ins loan has exceeded the limit, and spot buying is prohibited                                                                                  |
| 95007      | Ins loan is not support this spot trading pair.                                                                                                             |
| 95008      | Ins loan is not support futures trading.                                                                                                                    |
| 95009      | Ins loan is not support this margin trading pair.                                                                                                           |
| 95010      | Your entered subaccount UID is already bound to another risk unit.                                                                                          |
| 95011      | Parameter validation failed:{0}                                                                                                                             |
| 95012      | The leverage {1} of the sub-account contract position for {0} exceeds max leverage {2} for ins loan                                                         |
| 95013      | The leverage {1} of the sub-account contract order trading pair {0} exceeds max leverage {2} for ins loan.",                                                |
| 95014      | The sub-account has contract orders and cannot be added                                                                                                     |

> **Source:** https://www.bitget.com/api-doc/spot/error-code/websocket
