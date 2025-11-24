# GET /private/reset_mmp

Reset Market Maker Protection (MMP) limits for the specified currency pair or
group.

**📖 Related Support Article:**
[Market Maker Protection API Configuration](https://support.deribit.com/hc/en-us/articles/27308287203357-Market-Maker-Protection-API-Configuration)

**Scope:** `trade:read_write` or `block_rfq:read_write` (when `block_rfq` =
`true`)

This is a private method; it can only be used after authentication.

This is a matching engine method.

### Parameters

| Parameter  | Required | Type    | Enum                                                                                                                                                                                                                                                                                                                  | Description |
| ---------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| index_name | true     | string  | Currency pair for which to reset MMP limits. For regular MMP (block_rfq = false): Must be a specific currency pair (e.g., "btc_usd", "eth_usd"). The value "all" is not allowed. For Block RFQ MMP (block_rfq = true): Can be either a specific currency pair or "all" to reset MMP limits across all currency pairs. |             |
| mmp_group  | false    | string  | Specifies the MMP group for which limits are being reset. If this parameter is omitted, the method resets the traditional (no group) MMP limits. 📖 Related Support Article: Mass Quotes Specifications                                                                                                               |             |
| block_rfq  | false    | boolean | If true, resets MMP for Block RFQ. When set, requires block_rfq scope instead of trade scope. Block RFQ MMP settings are completely separate from normal order/quote MMP settings. When block_rfq = true, the index_name parameter can be set to "all" to reset limits across all currency pairs.                     |             |

### Response

| Name    | Type    | Description                                       |
| ------- | ------- | ------------------------------------------------- |
| id      | integer | The id that was sent in the request               |
| jsonrpc | string  | The JSON-RPC version (2.0)                        |
| result  | string  | Result of method execution. ok in case of success |
