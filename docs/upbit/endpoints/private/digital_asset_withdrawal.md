# Digital Asset Withdrawal

📤

\[Python\] Withdraw Digital Asset

Open Recipe

Tutorial Example Code Guide

This tutorial includes step-by-step partial code and API call/response examples
to aid user understanding.  
The full code examples can be found in the Recipes menu.  
Click the button above to navigate to the full code Recipe page of this
tutorial.

##

Get Started

[](#get-started)

The procedure for withdrawing digital assets from Upbit to other exchange is as
follows:

1.  Register a withdrawal address for the digital asset on the Upbit website.
2.  Verify that the withdrawal address has been registered.
3.  Check whether the digital asset is currently available for withdrawal.
4.  Withdraw the digital asset.
5.  Query the withdrawal details to confirm the withdrawal status.

This guide explains how to implement the same process using the Upbit API to
withdraw digital assets from Upbit to other exchange.

This guide includes the process of withdrawing digital assets using real assets.

Therefore, if you copy and run the code exactly as written in this guide, your
actual digital assets held in your Upbit account may be withdrawn to another
exchange. If you do not wish to withdraw digital assets, please refer only to
the Upbit API usage instructions and make sure not to call any
withdrawal-related functions.

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

##

Authentication Guide

[](#authentication-guide)

The Withdrawal Management API is included in the Exchange API and requires
authentication. Be sure to review the [Authentication](/reference/auth)
documentation and the recipe below, and add the authentication header to all
Exchange API requests.

##

Registering Withdrawal Addresses for Digital Assets

[](#registering-withdrawal-addresses-for-digital-assets)

To withdraw digital assets from Upbit to another exchange or wallet, you must
first register a withdrawal address. Please refer to the withdrawal whitelist
address registration guides to check how to register a withdrawal address.

- [Withdrawal Allowlist Registration Guide for Singapore](/docs/withdrawal-allolwlist-registration-guide-sg)
- [Withdrawal Allowlist Registration Guide for Indonesia and Thailand](/docs/withdrawal-allolwlist-registration-guide-ind-th)

##

Confirming Registered Withdrawal Addresses

[](#confirming-registered-withdrawal-addresses)

Call the
[List Withdrawal Allowed Addresses](/reference/list-withdrawal-addresses) API to
implement a function that returns the list of registered withdrawal addresses
for a specific digital asset. The function returns the withdrawal address
entered during registration, the network type, and the name of the exchange that
issued the address.

Python

`   def get_withdrawal_address(currency: str, net_type: str, vasp_name: str) -> Sequence:     jwt_token = _create_jwt(access_key, secret_key)     url = "https://sg-api.upbit.com/v1/withdraws/coin_addresses"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers).json()     if not response:         raise ValueError("There is no withdrawal address.")      address_info = [{k: v for k, v in item.items()                      if k in ['withdraw_address', 'net_type', 'exchange_name']}                      for item in response if item.get('currency') == currency                      and item.get('net_type') == net_type                      and item.get('exchange_name') == vasp_name]          if not address_info:         raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))     return address_info   `

**Network Type(`net_type`) and Network Name(`network_name`)**

The network type(`net_type`) is an identifier field used to specify the
blockchain network (target chain) through which a digital asset is transferred
during deposit and withdrawal (e.g., `BTC`). It is a required parameter for
digital asset withdrawals, and the correct identifier value must be used to
ensure proper processing. When calling the withdrawal API, you should first call
the withdrawal whitelist address API and use the exact network type value from
the response.

The network name(`network_name`) represents the full name of the blockchain
network (e.g., `Bitcoin`). It is human-readable information and cannot be used
as an identifier. It is intended for display purposes, such as representing the
blockchain network in a service UI.

When the function is executed, it returns the information of the withdrawal
addresses registered by the user.

JSON

`   // If there are registered withdrawal addresses, [   {     "net_type": "TRX",     "withdraw_address": "<wtihdrawal_address>",     "exchange_name": "<VASP A>"   } ]  // If an unsupported currency code is entered ValueError: Unsupported currency USDTz.  // When there are no registered withdrawal addresses for the currency code entered by the user ValueError: There is no withdrawal address. Please register your withdrawal address.   `

##

Check Deposit and Withdrawal Service Status

[](#check-deposit-and-withdrawal-service-status)

Implement a function that calls the
[Get Deposit/Withdrawal Service Status](/reference/get-service-status) API to
check whether a specific digital asset is available for withdrawal. The function
also allows users to verify the deposit and withdrawal wallet status for each
network of the selected asset..

Python

`   def check_withdrawal_status(currency: str, net_type: str) -> str:      jwt_token = _create_jwt(access_key, secret_key)     url = "https://sg-api.upbit.com/v1/status/wallet"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers).json()     wallets = [item for item in response if item.get('currency') == currency]     print("{wallets}\n".format(wallets=wallets))     wallet = next((item for item in wallets if item.get('net_type') == net_type), None)     if wallet is None:         raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))     print("The {currency}-{net_type} wallet status is {wallet_state}.".format(currency=currency, net_type=net_type, wallet_state=wallet.get('wallet_state')))        return wallet.get('wallet_state')   `

When executed, the function retrieves the status of the blockchain network where
the digital asset is deployed. The `wallet_state` field shows whether deposits
and withdrawals are available for that asset. For multi-chain digital assets
such as USDT, you can check the deposit and withdrawal wallet status across all
blockchain networks supported by Upbit.

- Deposit/Withdrawal Wallet Status for a Single Network

JSON

`{   "currency": "BTC",   "wallet_state": "working",   "block_state": "normal",   "block_height": 908692,   "block_updated_at": "2025-08-05T07:38:57.889+00:00",   "block_elapsed_minutes": 10,   "net_type": "BTC",   "network_name": "Bitcoin" }`

- Deposit/Withdrawal wallet status for a Multichain network

JSON

`[   {     "currency": "USDT",     "wallet_state": "working",     "block_state": "normal",     "block_height": 23089140,     "block_updated_at": "2025-08-07T12:20:00.928+00:00",     "block_elapsed_minutes": 1,     "net_type": "ETH",     "network_name": "Ethereum"   },   {     "currency": "USDT",     "wallet_state": "working",     "block_state": "normal",     "block_height": 74636780,     "block_updated_at": "2025-08-07T12:21:51.663+00:00",     "block_elapsed_minutes": 0,     "net_type": "TRX",     "network_name": "Tron"   },   {     "currency": "USDT",     "wallet_state": "working",     "block_state": "normal",     "block_height": 3191769000,     "block_updated_at": "2025-08-07T12:21:50.948+00:00",     "block_elapsed_minutes": 0,     "net_type": "APT",     "network_name": "Aptos"   } ]`

##

Withdraw Digital Asset

[](#withdraw-digital-asset)

Implement a function to request a digital asset withdrawal. Provide the
currency, network type, withdrawal amount, withdrawal address, and secondary
address (if supported by the network), then call the
[Withdraw Digital Asset](/reference/withdraw) API to submit the request.

Python

`   def withdraw_digital_asset(         currency: str,          net_type: str,          amount: str,          address: str,          secondary_address: Optional[str] = None,          ) -> str:     params = {         "currency": currency,         "net_type": net_type,         "amount": amount,         "address": address,         "transaction_type": "default"     }      if secondary_address:         params["secondary_address"] = secondary_address       query_string = _build_query_string(params)     jwt_token = _create_jwt(access_key, secret_key, query_string)     url = "https://sg-api.upbit.com/v1/withdraws/coin"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.post(url, headers=headers, json=params).json()     uuid = response.get('uuid')     if uuid is None:         raise ValueError(f"Please check the withdrawal issue. {response}")     else:         return uuid   `

If the withdrawal request is successful, the `uuid` of the withdrawal is
returned.

JSON

`   {   "type": "withdraw",   "uuid": "<withdrawal uuid>",   "currency": "USDT",   "net_type": "TRX",   "txid": None,   "state": "WAITING",   "created_at": "2025-07-17T13:53:31+09:00",   "done_at": None,   "amount": "13.0",   "fee": "0.0",   "transaction_type": "default",   "is_cancelable": False }   `

##

Getting Withdrawal Status

[](#getting-withdrawal-status)

Call the Get [Get Withdrawal](/reference/get-withdrawal) API with the withdrawal
UUID to retrieve the withdrawal details and result..

Python

`   def get_withdrawal_state(uuid: str) -> Mapping:     params = {         "uuid": uuid     }        query_string = _build_query_string(params)     jwt_token = _create_jwt(access_key, secret_key, query_string)     url = "https://sg-api.upbit.com/v1/withdraw"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers, params=params).json()     return response   `

The `state` field in the withdrawal information indicates the current status of
the withdrawal. If the value is `DONE`, it means the withdrawal has been
completed. The possible states are as follows:

- `WAITING`: Withdrawal is pending.
- `PROCESSING`: Withdrawal is in progress.
- `DONE`: Withdrawal has been completed.
- `FAILED`: Withdrawal has failed.
- `CANCELLED`: Withdrawal has been cancelled.
- `REJECTED`: Withdrawal has been rejected.

Due to blockchain transaction processing, it may take some time for the
withdrawal to be finalized. If the state does not change immediately after
submitting the request, please try again after some time.

JSON

`{   "type": "withdraw",   "uuid": "<your_withdraw_uuid>",   "currency": "USDT",   "net_type": "TRX",   "txid": "<your_withdraw_txid>",   "state": "DONE",   "created_at": "2025-07-17T13:53:31+09:00",   "done_at": "2025-07-17T13:56:00+09:00",   "amount": "13.0",   "fee": "0.0",   "transaction_type": "default",   "is_cancelable": False }`

##

Full Code Example

[](#full-code-example)

The complete code for withdrawing digital assets is as follows.

Python

`   from urllib.parse import unquote, urlencode from typing import Any, Optional from collections.abc import Mapping, Sequence import hashlib import uuid import jwt # PyJWT import requests from decimal import Decimal, ROUND_DOWN  access_key = "<YOUR_ACCESS_KEY>" secret_key = "<YOUR_SECRET_KEY>"  # Please add the logic here to generate the JWT authentication token.  def get_withdrawal_address(currency: str, net_type: str, vasp_name: str) -> Sequence:     jwt_token = _create_jwt(access_key, secret_key)     url = "https://sg-api.upbit.com/v1/withdraws/coin_addresses"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers).json()     if not response:         raise ValueError("There is no withdrawal address.")      address_info = [{k: v for k, v in item.items()                      if k in ['withdraw_address', 'net_type', 'exchange_name']}                      for item in response if item.get('currency') == currency                      and item.get('net_type') == net_type                      and item.get('exchange_name') == vasp_name]          if not address_info:         raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))     return address_info  def check_withdrawal_status(currency: str, net_type: str) -> str:      jwt_token = _create_jwt(access_key, secret_key)     url = "https://sg-api.upbit.com/v1/status/wallet"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers).json()     wallets = [item for item in response if item.get('currency') == currency]     print("{wallets}\n".format(wallets=wallets))     wallet = next((item for item in wallets if item.get('net_type') == net_type), None)     if wallet is None:         raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))     print("The {currency}-{net_type} wallet status is {wallet_state}.".format(currency=currency, net_type=net_type, wallet_state=wallet.get('wallet_state')))        return wallet.get('wallet_state')  def withdraw_digital_asset(         currency: str,          net_type: str,          amount: str,          address: str,          secondary_address: Optional[str] = None,          ) -> str:     params = {         "currency": currency,         "net_type": net_type,         "amount": amount,         "address": address,         "transaction_type": "default"     }      if secondary_address:         params["secondary_address"] = secondary_address       query_string = _build_query_string(params)     jwt_token = _create_jwt(access_key, secret_key, query_string)     url = "https://sg-api.upbit.com/v1/withdraws/coin"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.post(url, headers=headers, json=params).json()     uuid = response.get('uuid')     if uuid is None:         raise ValueError(f"Please check the withdrawal issue. {response}")     else:         return uuid  def get_withdrawal_state(uuid: str) -> Mapping:     params = {         "uuid": uuid     }        query_string = _build_query_string(params)     jwt_token = _create_jwt(access_key, secret_key, query_string)     url = "https://sg-api.upbit.com/v1/withdraw"     headers = {         "Authorization": "Bearer {jwt_token}".format(jwt_token=jwt_token),         "Content-Type": "application/json"     }     response = requests.get(url, headers=headers, params=params).json()     return response  # # If you uncomment and run this code, the actual digital asset withdrawal process will be executed. Please double-check before running it.  # if __name__ == "__main__":       # currency = "<Enter_your_currency>"     # net_type = "<Enter_your_net_type>"     # vasp_name = "<Enter_your_vasp_name>"     # amount = "13.241"     # amount = str(Decimal(amount).quantize(Decimal("1e-8"), rounding=ROUND_DOWN))      # withdraw_addresses = get_withdrawal_address(currency, net_type, vasp_name)     # withdrawal_status = check_withdrawal_status(currency, net_type)     # if len(withdraw_addresses) == 0:     #     raise ValueError("There is no withdrawal address for {currency}.".format(currency=currency))     # if withdrawal_status != "working":     #     raise ValueError("The withdrawal is not working for {withdrawal_status}.".format(withdrawal_status=withdrawal_status))  #     for item in withdraw_addresses: #         withdraw_address = item['withdraw_address'] #         response = withdraw_digital_asset(currency, net_type, amount, withdraw_address) #         deposit_uuid = response #         withdrawal_state = get_withdrawal_state(deposit_uuid) #         print(withdrawal_state)   `

Updated 1 day ago

---

🦉

# Recipe Title

Recipe Description

​x

1{"success":true}

---

**Source:**
[digital-asset-withdrawal](https://global-docs.upbit.com/reference/digital-asset-withdrawal)
