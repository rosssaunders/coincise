# GET /v1/digital-asset-withdrawal

**Source:** [digital-asset-withdrawal](https://global-docs.upbit.com/reference/digital-asset-withdrawal)

## Description

Learn how to use the API to withdraw digital assets held in Upbit to other exchange.

The procedure for withdrawing digital assets from Upbit to other exchange is as follows:

## Authentication

Required (Private Endpoint)

## Rate Limit

See [Rate Limits](/docs/upbit/rate_limits.md) for rate limiting rules.

## HTTP Request

`GET /v1/digital-asset-withdrawal`

## Request Example

```bash
def get_withdrawal_address(currency: str, net_type: str, vasp_name: str) -> Sequence:
    jwt_token = _create_jwt(access_key, secret_key)
    url = "https://sg-api.upbit.com/v1/withdraws/coin_addresses"
    headers = {
        "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers).json()
    if not response:
        raise ValueError("There is no withdrawal address.")

    address_info = [{k: v for k, v in item.items() 
                    if k in ['withdraw_address', 'net_type', 'exchange_name']} 
                    for item in response if item.get('currency') == currency 
                    and item.get('net_type') == net_type 
                    and item.get('exchange_name') == vasp_name]
    
    if not address_info:
        raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))
    return address_info
```

## Response Example

### Success Response (200 OK)

```json
{
  "currency": "BTC",
  "wallet_state": "working",
  "block_state": "normal",
  "block_height": 908692,
  "block_updated_at": "2025-08-05T07:38:57.889+00:00",
  "block_elapsed_minutes": 10,
  "net_type": "BTC",
  "network_name": "Bitcoin"
}
```
