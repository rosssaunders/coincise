# Deribit Private Wallet Documentation

# Wallet

## /private/add_to_address_book

Adds new entry to address book of given type

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                                                                                                                                         |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency                 | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                                                                                                                                 |
| type                     | true     | string  | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                                                                                                                                                                                                   |
| address                  | true     | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format                                                                                                                                                                                                          |
| label                    | true     | string  |                                                                                                                                                                                                                                                                                                 | Label of the address book entry                                                                                                                                                                                                     |
| beneficiary_vasp_name    | true     | string  |                                                                                                                                                                                                                                                                                                 | Name of beneficiary VASP                                                                                                                                                                                                            |
| beneficiary_vasp_did     | true     | string  |                                                                                                                                                                                                                                                                                                 | DID of beneficiary VASP                                                                                                                                                                                                             |
| beneficiary_vasp_website | false    | string  |                                                                                                                                                                                                                                                                                                 | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs                                                                                       |
| beneficiary_first_name   | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                                                                                                              |
| beneficiary_last_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                                                                                                              |
| beneficiary_company_name | false    | string  |                                                                                                                                                                                                                                                                                                 | Beneficiary company name (if beneficiary is a company)                                                                                                                                                                              |
| beneficiary_address      | true     | string  |                                                                                                                                                                                                                                                                                                 | Geographical address of the beneficiary                                                                                                                                                                                             |
| agreed                   | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates that the user agreed to shared provided information with 3rd parties                                                                                                                                                      |
| personal                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software                                                                                                                  |
| extra_currencies         | false    | array   |                                                                                                                                                                                                                                                                                                 | The user can pass a list of currencies to add the address for. It is currently available ONLY for ERC20 currencies. Without passing this paramater for an ERC20 currency, the address will be added to ALL of the ERC20 currencies. |

### Response

| Name                                                  | Type            | Description                                                                                                                  |
| ----------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| id                                                    | integer         | The id that was sent in the request                                                                                          |
| jsonrpc                                               | string          | The JSON-RPC version (2.0)                                                                                                   |
| result                                                | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                      | string          | Address in proper format for currency                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                       | boolean         | Indicates that the user agreed to shared provided information with 3rd parties                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address          | string          | Geographical address of the beneficiary                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name     | string          | Company name of the beneficiary (if beneficiary is a company)                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name       | string          | First name of the beneficiary (if beneficiary is a person)                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name        | string          | Last name of the beneficiary (if beneficiary is a person)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did         | string          | DID of beneficiary VASP                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name        | string          | Name of beneficiary VASP                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_website     | string          | Website of the beneficiary VASP                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp           | integer         | The timestamp (milliseconds since the Unix epoch)                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                     | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;info_required                | boolean         | Signalises that addition information regarding the beneficiary of the address is required                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;label                        | string          | Label of the address book entry                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                     | boolean         | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software           |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation        | boolean         | If address requires email confirmation for withdrawals                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation_change | boolean         | If email confirmation change is in progress                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;status                       | string          | Wallet address status, values: [<code>admin_locked</code>, <code>waiting</code>, <code>confirmed</code>, <code>ready</code>] |
| &nbsp;&nbsp;›&nbsp;&nbsp;type                         | string          | Address book type                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;waiting_timestamp            | boolean         | Timestamp when the address will be ready                                                                                     |

## /private/cancel_transfer_by_id

Cancel transfer

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description         |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |
| id        | true     | integer |                                                                                                     | Id of transfer      |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/cancel_withdrawal

Cancels withdrawal request

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |
| id        | true     | number |                                                                                                     | The withdrawal id   |

### Response

| Name                                         | Type            | Description                                                                                                                                                                          |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                           | integer         | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                      | string          | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                       | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address             | string          | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount              | number          | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer         | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency            | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number          | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer         | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;priority            | number          | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;state               | string          | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string          | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |

## /private/create_deposit_address

Creates deposit address in currency

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name                                        | Type            | Description                                                               |
| ------------------------------------------- | --------------- | ------------------------------------------------------------------------- |
| id                                          | integer         | The id that was sent in the request                                       |
| jsonrpc                                     | string          | The JSON-RPC version (2.0)                                                |
| result                                      | <em>object</em> | Object if address is created, null otherwise                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;address            | string          | Address in proper format for currency                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency           | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;type               | string          | Address type/purpose, allowed values : <code>deposit</code>               |

## /private/delete_address_beneficiary

Deletes address beneficiary information

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description                |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol        |
| address   | true     | string |                                                                                                                                                                                                                                                                                                 | Address in currency format |
| tag       | false    | string |                                                                                                                                                                                                                                                                                                 | Tag for XRP addresses      |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |

## /private/get_address_beneficiary

Retrieves address beneficiary information

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description                |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol        |
| address   | true     | string |                                                                                                                                                                                                                                                                                                 | Address in currency format |
| tag       | false    | string |                                                                                                                                                                                                                                                                                                 | Tag for XRP addresses      |

### Response

| Name                                              | Type            | Description                                                                                                        |
| ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| id                                                | integer         | The id that was sent in the request                                                                                |
| jsonrpc                                           | string          | The JSON-RPC version (2.0)                                                                                         |
| result                                            | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                  | string          | Address in proper format for currency                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                   | boolean         | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address      | string          | Geographical address of the beneficiary                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name | string          | Company name of the beneficiary (if beneficiary is a company)                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name   | string          | First name of the beneficiary (if beneficiary is a person)                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name    | string          | Last name of the beneficiary (if beneficiary is a person)                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did     | string          | DID of beneficiary VASP                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name    | string          | Name of beneficiary VASP                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_website | string          | Website of the beneficiary VASP                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp       | integer         | The timestamp (milliseconds since the Unix epoch)                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                 | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                 | boolean         | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| &nbsp;&nbsp;›&nbsp;&nbsp;tag                      | string          | Tag for XRP addresses (optional)                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;unhosted                 | boolean         | Indicates if the address belongs to an unhosted wallet                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;update_timestamp         | integer         | The timestamp (milliseconds since the Unix epoch)                                                                  |

## /private/get_address_book

Retrieves address book of given type

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description         |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol |
| type      | true     | string | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type   |

### Response

| Name                                                  | Type                     | Description                                                                                                                  |
| ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id                                                    | integer                  | The id that was sent in the request                                                                                          |
| jsonrpc                                               | string                   | The JSON-RPC version (2.0)                                                                                                   |
| result                                                | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                      | string                   | Address in proper format for currency                                                                                        |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                       | boolean                  | Indicates that the user agreed to shared provided information with 3rd parties                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address          | string                   | Geographical address of the beneficiary                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name     | string                   | Company name of the beneficiary (if beneficiary is a company)                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name       | string                   | First name of the beneficiary (if beneficiary is a person)                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name        | string                   | Last name of the beneficiary (if beneficiary is a person)                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did         | string                   | DID of beneficiary VASP                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name        | string                   | Name of beneficiary VASP                                                                                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_website     | string                   | Website of the beneficiary VASP                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp           | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                     | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;info_required                | boolean                  | Signalises that addition information regarding the beneficiary of the address is required                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;label                        | string                   | Label of the address book entry                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                     | boolean                  | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software           |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation        | boolean                  | If address requires email confirmation for withdrawals                                                                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;requires_confirmation_change | boolean                  | If email confirmation change is in progress                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;status                       | string                   | Wallet address status, values: [<code>admin_locked</code>, <code>waiting</code>, <code>confirmed</code>, <code>ready</code>] |
| &nbsp;&nbsp;›&nbsp;&nbsp;type                         | string                   | Address book type                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;waiting_timestamp            | boolean                  | Timestamp when the address will be ready                                                                                     |

## /private/get_current_deposit_address

Retrieve deposit address for currency

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                | Description         |
| --------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol |

### Response

| Name                                        | Type            | Description                                                               |
| ------------------------------------------- | --------------- | ------------------------------------------------------------------------- |
| id                                          | integer         | The id that was sent in the request                                       |
| jsonrpc                                     | string          | The JSON-RPC version (2.0)                                                |
| result                                      | <em>object</em> | Object if address is created, null otherwise                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;address            | string          | Address in proper format for currency                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency           | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;type               | string          | Address type/purpose, allowed values : <code>deposit</code>               |

## /private/get_deposits

Retrieve the latest users deposits

**📖 Related Support Article:**
[Deposits](https://support.deribit.com/hc/en-us/articles/25944616988957-Deposits)

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                                                       |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                               |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code>, maximum - <code>1000</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>                               |

### Response

| Name                                                                    | Type                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                      | integer                  | The id that was sent in the request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| jsonrpc                                                                 | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| result                                                                  | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                          | integer                  | Total number of results available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                           | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address               | string                   | Address in proper format for currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount                | number                   | Amount of funds in given currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;clearance_state       | string                   | Clearance state indicating the current status of the transaction clearance process. Allowed values:<li><code>in_progress</code>: clearance process is in progress</li><li><code>pending_admin_decision</code>: transaction is under manual review by Deribit admin</li><li><code>pending_user_input</code>: user should provide additional information regarding the transaction</li><li><code>success</code>: clearance process completed successfully</li><li><code>failed</code>: clearance process failed, transaction is rejected</li><li><code>cancelled</code>: transaction is cancelled (currently used only for withdrawals, meaning the withdrawal is cancelled)</li><li><code>refund_initiated</code>: clearance process failed, transaction refund is initiated, funds are removed from Deribit balance (valid for deposits only)</li><li><code>refunded</code>: clearance process failed, deposit amount is refunded back to the client (valid for deposits only)</li> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency              | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;note                  | string                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;received_timestamp    | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;refund_transaction_id | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;source_address        | string                   | Address in proper format for currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state                 | string                   | Deposit state. Allowed values:<li><code>pending</code>: deposit detected on blockchain/system, compliance not yet finished</li><li><code>completed</code>: compliance check finished successfully</li><li><code>rejected</code>: deposit failed compliance and must be handled manually</li><li><code>replaced</code>: deposit transaction was replaced on the blockchain and should have a new transaction hash</li>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;transaction_id        | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp     | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## /private/get_reward_eligibility

Returns reward eligibility status and APR data for all supported currencies.

**📖 Related Support Article:**
[Yield reward-bearing coins](https://support.deribit.com/hc/en-us/articles/26525792475677-Yield-reward-bearing-coins)

This is a private method; it can only be used after authentication.

### Parameters

_This method takes no parameters_

### Response

| Name                                        | Type            | Description                                                                                                                                                                                                                                                                                                |
| ------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                          | integer         | The id that was sent in the request                                                                                                                                                                                                                                                                        |
| jsonrpc                                     | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                                                                                                 |
| result                                      | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;apr_sma7           | number          | Simple Moving Average (SMA) of the last 7 days of rewards for the currency                                                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;eligibility_status | string          | <ul><li><code>eligible</code>: User can get reward for specific currency for all its equity</li><li><code>partially_eligible</code>: User can get reward for specific currency, but custody balance is excluded</li><li><code>non_eligible</code>: User can not get reward for specific currency</li></ul> |

## /private/get_transfers

Retrieve the user's transfers list

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                                                       |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                               |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code>, maximum - <code>1000</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>                               |

### Response

| Name                                                                | Type                     | Description                                                                                                                                                                                                                       |
| ------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                  | integer                  | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                                             | string                   | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                                              | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                      | integer                  | Total number of results available                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                       | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount            | number                   | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency          | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;direction         | string                   | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;id                | integer                  | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string                   | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state             | string                   | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;type              | string                   | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/get_withdrawals

Retrieve the latest users withdrawals

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type    | Enum                                                                                                | Description                                                                       |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| currency  | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                               |
| count     | false    | integer |                                                                                                     | Number of requested items, default - <code>10</code>, maximum - <code>1000</code> |
| offset    | false    | integer |                                                                                                     | The offset for pagination, default - <code>0</code>                               |

### Response

| Name                                                                  | Type                     | Description                                                                                                                                                                          |
| --------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                                                    | integer                  | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                                               | string                   | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                                                | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                        | integer                  | Total number of results available                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                         | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address             | string                   | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;amount              | number                   | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer                  | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency            | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number                   | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer                  | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;priority            | number                   | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;state               | string                   | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string                   | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |

## /private/list_address_beneficiaries

Lists address beneficiaries with optional filtering and pagination

**Scope:** `wallet:read`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                                                   |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| currency                 | false    | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                                           |
| address                  | false    | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format                                                                                                                    |
| tag                      | false    | string  |                                                                                                                                                                                                                                                                                                 | Tag for XRP addresses                                                                                                                         |
| created_before           | false    | integer |                                                                                                                                                                                                                                                                                                 | Filter by creation timestamp (before)                                                                                                         |
| created_after            | false    | integer |                                                                                                                                                                                                                                                                                                 | Filter by creation timestamp (after)                                                                                                          |
| updated_before           | false    | integer |                                                                                                                                                                                                                                                                                                 | Filter by update timestamp (before)                                                                                                           |
| updated_after            | false    | integer |                                                                                                                                                                                                                                                                                                 | Filter by update timestamp (after)                                                                                                            |
| personal                 | false    | boolean |                                                                                                                                                                                                                                                                                                 | Filter by personal wallet flag                                                                                                                |
| unhosted                 | false    | boolean |                                                                                                                                                                                                                                                                                                 | Filter by unhosted wallet flag                                                                                                                |
| beneficiary_vasp_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | Filter by beneficiary VASP name                                                                                                               |
| beneficiary_vasp_did     | false    | string  |                                                                                                                                                                                                                                                                                                 | Filter by beneficiary VASP DID                                                                                                                |
| beneficiary_vasp_website | false    | string  |                                                                                                                                                                                                                                                                                                 | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs |
| limit                    | false    | integer |                                                                                                                                                                                                                                                                                                 | Maximum number of results to return                                                                                                           |
| continuation             | false    | string  |                                                                                                                                                                                                                                                                                                 | Continuation token for pagination                                                                                                             |

### Response

| Name                                                                       | Type                     | Description                                                                                                        |
| -------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| id                                                                         | integer                  | The id that was sent in the request                                                                                |
| jsonrpc                                                                    | string                   | The JSON-RPC version (2.0)                                                                                         |
| result                                                                     | <em>object</em>          |
| &nbsp;&nbsp;›&nbsp;&nbsp;continuation                                      | string                   | Continuation token for pagination.                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;count                                             | integer                  | Total number of results available                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;data                                              | array of <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address                  | string                   | Address in proper format for currency                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;agreed                   | boolean                  | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address      | string                   | Geographical address of the beneficiary                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name | string                   | Company name of the beneficiary (if beneficiary is a company)                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name   | string                   | First name of the beneficiary (if beneficiary is a person)                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name    | string                   | Last name of the beneficiary (if beneficiary is a person)                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did     | string                   | DID of beneficiary VASP                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name    | string                   | Name of beneficiary VASP                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_website | string                   | Website of the beneficiary VASP                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp       | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency                 | string                   | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;personal                 | boolean                  | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tag                      | string                   | Tag for XRP addresses (optional)                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;unhosted                 | boolean                  | Indicates if the address belongs to an unhosted wallet                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;update_timestamp         | integer                  | The timestamp (milliseconds since the Unix epoch)                                                                  |

## /private/remove_from_address_book

Removes address book entry

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                                                                                                                                                            | Description                                            |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                    |
| type      | true     | string | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                      |
| address   | true     | string |                                                                                                                                                                                                                                                                                                 | Address in currency format, it must be in address book |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |

## /private/save_address_beneficiary

Saves address beneficiary information

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                                                   |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| currency                 | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                                           |
| address                  | true     | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format                                                                                                                    |
| tag                      | false    | string  |                                                                                                                                                                                                                                                                                                 | Tag for XRP addresses                                                                                                                         |
| agreed                   | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates that the user agreed to shared provided information with 3rd parties                                                                |
| personal                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software                            |
| unhosted                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates if the address belongs to an unhosted wallet                                                                                        |
| beneficiary_vasp_name    | true     | string  |                                                                                                                                                                                                                                                                                                 | Name of beneficiary VASP                                                                                                                      |
| beneficiary_vasp_did     | true     | string  |                                                                                                                                                                                                                                                                                                 | DID of beneficiary VASP                                                                                                                       |
| beneficiary_vasp_website | false    | string  |                                                                                                                                                                                                                                                                                                 | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs |
| beneficiary_first_name   | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                        |
| beneficiary_last_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                        |
| beneficiary_company_name | false    | string  |                                                                                                                                                                                                                                                                                                 | Beneficiary company name (if beneficiary is a company)                                                                                        |
| beneficiary_address      | true     | string  |                                                                                                                                                                                                                                                                                                 | Geographical address of the beneficiary                                                                                                       |

### Response

| Name                                              | Type            | Description                                                                                                        |
| ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| id                                                | integer         | The id that was sent in the request                                                                                |
| jsonrpc                                           | string          | The JSON-RPC version (2.0)                                                                                         |
| result                                            | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address                  | string          | Address in proper format for currency                                                                              |
| &nbsp;&nbsp;›&nbsp;&nbsp;agreed                   | boolean         | Indicates that the user agreed to shared provided information with 3rd parties                                     |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_address      | string          | Geographical address of the beneficiary                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_company_name | string          | Company name of the beneficiary (if beneficiary is a company)                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_first_name   | string          | First name of the beneficiary (if beneficiary is a person)                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_last_name    | string          | Last name of the beneficiary (if beneficiary is a person)                                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_did     | string          | DID of beneficiary VASP                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_name    | string          | Name of beneficiary VASP                                                                                           |
| &nbsp;&nbsp;›&nbsp;&nbsp;beneficiary_vasp_website | string          | Website of the beneficiary VASP                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;creation_timestamp       | integer         | The timestamp (milliseconds since the Unix epoch)                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency                 | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                          |
| &nbsp;&nbsp;›&nbsp;&nbsp;personal                 | boolean         | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software |
| &nbsp;&nbsp;›&nbsp;&nbsp;tag                      | string          | Tag for XRP addresses (optional)                                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;unhosted                 | boolean         | Indicates if the address belongs to an unhosted wallet                                                             |
| &nbsp;&nbsp;›&nbsp;&nbsp;update_timestamp         | integer         | The timestamp (milliseconds since the Unix epoch)                                                                  |

## /private/set_clearance_originator

Sets originator of the deposit

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                                                      | Required | Type    | Enum                                                                                                | Description                                                        |
| -------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| deposit_id                                                     | true     | object  |                                                                                                     | Id of the deposit                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;currency     | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;user_id      | true     | integer |                                                                                                     | Id of a (sub)account                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address      | true     | string  |                                                                                                     | Address in currency format                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;tx_hash      | true     | string  |                                                                                                     | Transaction id in a proper format for the currency                 |
| originator                                                     | true     | object  |                                                                                                     | Information about the originator of the deposit                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;is_personal  | true     | boolean |                                                                                                     | If the user is the originator of the deposit                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;company_name | true     | string  |                                                                                                     | Company name of the originator if the originator is a legal entity |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;first_name   | true     | string  |                                                                                                     | If the user is the originator of the deposit                       |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;last_name    | true     | string  |                                                                                                     | Last name of the originator if the originator is a person          |
| &nbsp;&nbsp;›&nbsp;&nbsp;&nbsp;&nbsp;›&nbsp;&nbsp;address      | true     | string  |                                                                                                     | Geographical address of the originator                             |

### Response

| Name                  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address               | string  | Address in proper format for currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| amount                | number  | Amount of funds in given currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| clearance_state       | string  | Clearance state indicating the current status of the transaction clearance process. Allowed values:<li><code>in_progress</code>: clearance process is in progress</li><li><code>pending_admin_decision</code>: transaction is under manual review by Deribit admin</li><li><code>pending_user_input</code>: user should provide additional information regarding the transaction</li><li><code>success</code>: clearance process completed successfully</li><li><code>failed</code>: clearance process failed, transaction is rejected</li><li><code>cancelled</code>: transaction is cancelled (currently used only for withdrawals, meaning the withdrawal is cancelled)</li><li><code>refund_initiated</code>: clearance process failed, transaction refund is initiated, funds are removed from Deribit balance (valid for deposits only)</li><li><code>refunded</code>: clearance process failed, deposit amount is refunded back to the client (valid for deposits only)</li> |
| currency              | string  | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| note                  | string  |
| received_timestamp    | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| refund_transaction_id | string  | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| source_address        | string  | Address in proper format for currency                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| state                 | string  | Deposit state. Allowed values:<li><code>pending</code>: deposit detected on blockchain/system, compliance not yet finished</li><li><code>completed</code>: compliance check finished successfully</li><li><code>rejected</code>: deposit failed compliance and must be handled manually</li><li><code>replaced</code>: deposit transaction was replaced on the blockchain and should have a new transaction hash</li>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| transaction_id        | string  | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| updated_timestamp     | integer | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## /private/submit_transfer_between_subaccounts

Transfer funds between two (sub)accounts.

**Scope:** `wallets:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type    | Enum                                                                                                | Description                                                                                                                                                                                                                                                                                                              |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currency    | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                                                                                                                                                                                                                                                                      |
| amount      | true     | number  |                                                                                                     | Amount of funds to be transferred                                                                                                                                                                                                                                                                                        |
| destination | true     | integer |                                                                                                     | Id of destination subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab                                                                                                                                                                                                                           |
| source      | false    | integer |                                                                                                     | Id of the source (sub)account. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab. By default, it is the Id of the account which made the request. However, if a different "source" is specified, the user must possess the mainaccount scope, and only other subaccounts can be designated as the source. |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/submit_transfer_to_subaccount

Transfer funds to subaccount.

**Scope:** `wallets:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type    | Enum                                                                                                | Description                                                                                    |
| ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| currency    | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                                                            |
| amount      | true     | number  |                                                                                                     | Amount of funds to be transferred                                                              |
| destination | true     | integer |                                                                                                     | Id of destination subaccount. Can be found in <code>My Account &gt;&gt; Subaccounts</code> tab |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/submit_transfer_to_user

Transfer funds to another user.

**Scope:** `wallet:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter   | Required | Type   | Enum                                                                                                | Description                                          |
| ----------- | -------- | ------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| currency    | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code> | The currency symbol                                  |
| amount      | true     | number |                                                                                                     | Amount of funds to be transferred                    |
| destination | true     | string |                                                                                                     | Destination wallet's address taken from address book |

### Response

| Name                                       | Type            | Description                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                         | integer         | The id that was sent in the request                                                                                                                                                                                               |
| jsonrpc                                    | string          | The JSON-RPC version (2.0)                                                                                                                                                                                                        |
| result                                     | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount            | number          | Amount of funds in given currency                                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency          | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                                                                         |
| &nbsp;&nbsp;›&nbsp;&nbsp;direction         | string          | Transfer direction                                                                                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                | integer         | Id of transfer                                                                                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;other_side        | string          | For transfer from/to subaccount returns this subaccount name, for transfer to other account returns address, for transfer from other account returns that accounts username.                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;state             | string          | Transfer state, allowed values : <code>prepared</code>, <code>confirmed</code>, <code>cancelled</code>, <code>waiting_for_admin</code>, <code>insufficient_funds</code>, <code>withdrawal_limit</code> otherwise rejection reason |
| &nbsp;&nbsp;›&nbsp;&nbsp;type              | string          | Type of transfer: <code>user</code> - sent to user, <code>subaccount</code> - sent to subaccount                                                                                                                                  |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                                                                 |

## /private/update_in_address_book

Allows to provide beneficiary information for the address

**Scope:** `wallet:read_write`

This is a private method; it can only be used after authentication.

### Parameters

| Parameter                | Required | Type    | Enum                                                                                                                                                                                                                                                                                            | Description                                                                                                                                   |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| currency                 | true     | string  | <code>BTC</code><br><code>ETH</code><br><code>STETH</code><br><code>ETHW</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code><br><code>MATIC</code><br><code>SOL</code><br><code>XRP</code><br><code>USYC</code><br><code>PAXG</code><br><code>BNB</code><br><code>USDE</code> | The currency symbol                                                                                                                           |
| type                     | true     | string  | <code>transfer</code><br><code>withdrawal</code><br><code>deposit_source</code>                                                                                                                                                                                                                 | Address book type                                                                                                                             |
| address                  | true     | string  |                                                                                                                                                                                                                                                                                                 | Address in currency format, it must be in address book                                                                                        |
| beneficiary_vasp_name    | true     | string  |                                                                                                                                                                                                                                                                                                 | Name of beneficiary VASP                                                                                                                      |
| beneficiary_vasp_did     | true     | string  |                                                                                                                                                                                                                                                                                                 | DID of beneficiary VASP                                                                                                                       |
| beneficiary_vasp_website | false    | string  |                                                                                                                                                                                                                                                                                                 | Website of the beneficiary VASP. Required if the address book entry is associated with a VASP that is not included in the list of known VASPs |
| beneficiary_first_name   | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                        |
| beneficiary_last_name    | false    | string  |                                                                                                                                                                                                                                                                                                 | First name of beneficiary (if beneficiary is a person)                                                                                        |
| beneficiary_company_name | false    | string  |                                                                                                                                                                                                                                                                                                 | Beneficiary company name (if beneficiary is a company)                                                                                        |
| beneficiary_address      | true     | string  |                                                                                                                                                                                                                                                                                                 | Geographical address of the beneficiary                                                                                                       |
| agreed                   | true     | boolean |                                                                                                                                                                                                                                                                                                 | Indicates that the user agreed to shared provided information with 3rd parties                                                                |
| personal                 | true     | boolean |                                                                                                                                                                                                                                                                                                 | The user confirms that he provided address belongs to him and he has access to it via an un-hosted wallet software                            |
| label                    | true     | string  |                                                                                                                                                                                                                                                                                                 | Label of the address book entry                                                                                                               |

### Response

| Name    | Type    | Description                         |
| ------- | ------- | ----------------------------------- |
| id      | integer | The id that was sent in the request |
| jsonrpc | string  | The JSON-RPC version (2.0)          |
| result  | string  | ok                                  |

## /private/withdraw

Creates a new withdrawal request

**📖 Related Support Article:**
[Withdrawals](https://support.deribit.com/hc/en-us/articles/25944635205021-Withdrawals)

**Scope:** `wallet:read_write` and mainaccount

This is a private method; it can only be used after authentication.

### Parameters

| Parameter | Required | Type   | Enum                                                                                                                                                             | Description                                                       |
| --------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| currency  | true     | string | <code>BTC</code><br><code>ETH</code><br><code>USDC</code><br><code>USDT</code><br><code>EURR</code>                                                              | The currency symbol                                               |
| address   | true     | string |                                                                                                                                                                  | Address in currency format, it must be in address book            |
| amount    | true     | number |                                                                                                                                                                  | Amount of funds to be withdrawn                                   |
| priority  | false    | string | <code>insane</code><br><code>extreme_high</code><br><code>very_high</code><br><code>high</code><br><code>mid</code><br><code>low</code><br><code>very_low</code> | Withdrawal priority, optional for BTC, default: <code>high</code> |

### Response

| Name                                         | Type            | Description                                                                                                                                                                          |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                                           | integer         | The id that was sent in the request                                                                                                                                                  |
| jsonrpc                                      | string          | The JSON-RPC version (2.0)                                                                                                                                                           |
| result                                       | <em>object</em> |
| &nbsp;&nbsp;›&nbsp;&nbsp;address             | string          | Address in proper format for currency                                                                                                                                                |
| &nbsp;&nbsp;›&nbsp;&nbsp;amount              | number          | Amount of funds in given currency                                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;confirmed_timestamp | integer         | The timestamp (milliseconds since the Unix epoch) of withdrawal confirmation, <code>null</code> when not confirmed                                                                   |
| &nbsp;&nbsp;›&nbsp;&nbsp;created_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
| &nbsp;&nbsp;›&nbsp;&nbsp;currency            | string          | Currency, i.e <code>"BTC"</code>, <code>"ETH"</code>, <code>"USDC"</code>                                                                                                            |
| &nbsp;&nbsp;›&nbsp;&nbsp;fee                 | number          | Fee in currency                                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;id                  | integer         | Withdrawal id in Deribit system                                                                                                                                                      |
| &nbsp;&nbsp;›&nbsp;&nbsp;priority            | number          | Id of priority level                                                                                                                                                                 |
| &nbsp;&nbsp;›&nbsp;&nbsp;state               | string          | Withdrawal state, allowed values : <code>unconfirmed</code>, <code>confirmed</code>, <code>cancelled</code>, <code>completed</code>, <code>interrupted</code>, <code>rejected</code> |
| &nbsp;&nbsp;›&nbsp;&nbsp;transaction_id      | string          | Transaction id in proper format for currency, <code>null</code> if id is not available                                                                                               |
| &nbsp;&nbsp;›&nbsp;&nbsp;updated_timestamp   | integer         | The timestamp (milliseconds since the Unix epoch)                                                                                                                                    |
