# Overall Account Inquiry

\## Request Example \`\`\`javascript const request = require('request') const
uuidv4 = require("uuid/v4") const sign = require('jsonwebtoken').sign const
access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY const secret_key =
process.env.UPBIT_OPEN_API_SECRET_KEY const server_url =
process.env.UPBIT_OPEN_API_SERVER_URL const payload = { access_key: access_key,
nonce: uuidv4(), } const token = sign(payload, secret_key) const options = {
method: "GET", url: server_url + "/v1/accounts", headers: {Authorization:
\`Bearer \${token}\`}, } request(options, (error, response, body) => { if
(error) throw new Error(error) console.log(body) }) \`\`\` ## Example 2 \`\`\`
\[ { "currency":"SGD", "balance":"1000000.0", "locked":"0.0",
"avg_buy_price":"0", "avg_buy_price_modified":false, "unit_currency": "SGD", },
{ "currency":"BTC", "balance":"2.0", "locked":"0.0", "avg_buy_price":"101000",
"avg_buy_price_modified":false, "unit_currency": "SGD", } \] \`\`\` ## Request
Example \`\`\`javascript const request = require('request') const uuidv4 =
require("uuid/v4") const sign = require('jsonwebtoken').sign const access_key =
process.env.UPBIT_OPEN_API_ACCESS_KEY const secret_key =
process.env.UPBIT_OPEN_API_SECRET_KEY const server_url =
process.env.UPBIT_OPEN_API_SERVER_URL const payload = { access_key: access_key,
nonce: uuidv4(), } const token = sign(payload, secret_key) const options = {
method: "GET", url: server_url + "/v1/accounts", headers: {Authorization:
\`Bearer \${token}\`}, } request(options, (error, response, body) => { if
(error) throw new Error(error) console.log(body) }) \`\`\` ## Example 4 \`\`\`
\[ { "currency":"SGD", "balance":"1000000.0", "locked":"0.0",
"avg_buy_price":"0", "avg_buy_price_modified":false, "unit_currency": "SGD", },
{ "currency":"BTC", "balance":"2.0", "locked":"0.0", "avg_buy_price":"101000",
"avg_buy_price_modified":false, "unit_currency": "SGD", } \] \`\`\` ## Example 5
\`\`\` \[ { "currency":"SGD", "balance":"1000000.0", "locked":"0.0",
"avg_buy_price":"0", "avg_buy_price_modified":false, "unit_currency": "SGD", },
{ "currency":"BTC", "balance":"2.0", "locked":"0.0", "avg_buy_price":"101000",
"avg_buy_price_modified":false, "unit_currency": "SGD", } \] \`\`\`

> **Source:**
> [overall-account-inquiry](https://global-docs.upbit.com/reference/overall-account-inquiry)
