Copy

1.  [For developers](/hyperliquid-docs/for-developers)
2.  [API](/hyperliquid-docs/for-developers/api)

# Signing

It is recommended to use an existing SDK instead of manually generating
signatures. There are many potential ways in which signatures can be wrong. An
incorrect signature results in recovering a different signer based on the
signature and payload and results in one of the following errors:
`"L1 error: User or API Wallet 0x0123... does not exist."`
`Must deposit before performing actions. User: 0x123...` where the returned
address does not match the public address of the wallet you are signing with.
The returned address also changes for different inputs. An incorrect signature
does not indicate why it is incorrect which makes debugging more challenging. To
debug this it is recommended to read through the Python SDK carefully and make
sure the implementation matches exactly. If that doesn't work, add logging to
find where the output diverges.

Some common errors: 1. Not realizing that there are two signing schemes (the
Python SDK methods are `sign_l1_action` vs `sign_user_signed_action`). 2. Not
realizing that the order of fields matter for msgpack. 3. Issues with trailing
zeroes on numbers. 4. Issues with upper case characters in address fields. It is
recommended to lowercase any address before signing and sending. Sometimes the
field is parsed as bytes, causing it to be lowercased automatically across the
network. 5. Believing that the signature must be correct because calling recover
signer locally results in the correct address. The payload for recover signer is
constructed based on the action and does not necessarily match.

[PreviousError responses](/hyperliquid-docs/for-developers/api/error-responses)[NextRate limits and user limits](/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits)

Last updated 6 months ago
