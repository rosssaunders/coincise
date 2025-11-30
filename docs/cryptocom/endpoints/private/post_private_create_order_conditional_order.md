# POST private/create-order (Conditional Order)

**Source:**
[private/create-order (Conditional Order)](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-create-order "conditional order")

## Authentication

Required (Private Endpoint)

## private/create-order (Conditional Order)

[Conditional Orders](https://help.crypto.com/en/articles/4453247-stop-loss-order-and-take-profit-order)
automatically place a mark or limit order when the mark price reaches a trigger
price specified by the user. If the mark price reaches or exceeds the trigger
price, the Stop-Loss/Take-Profit order will be converted to a live order and
placed in the order book. If the mark price does not reach the trigger price,
the Stop-Loss/Take-Profit order will remain active until it is canceled or
triggered.

See [private/create-order](#private-create-order) and the `type` parameter for
more information.
