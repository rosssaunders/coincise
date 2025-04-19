'use strict'

import { convertToMarkdown } from '../src/index.js'
import { cleanHtml } from '../src/utils/html-cleaner.js'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Test HTML content
const testHtml = `
<div class="content"><p class="P68B1DB1-21"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Segoe UI',sans-serif; color: #474d57; background: white; font-weight: normal;">This API can only be used with the SPOT Exchange.</span></p>
  <p>&nbsp;</p>
  <p><strong>Access URLs</strong></p>
  <p>Order access URL: <code>tcp+tls://</code><a href="http://fix-oe.binance.com"><code>fix-order.huobi.pro</code></a><code>: 9000</code></p>
  <p><code>Feature: </code>Place and cancel your orders.</p>
  <p>Market access URL: <code>tcp+tls://</code><a href="http://fix-oe.binance.com"><code>fix-market.huobi.pro</code></a><code>: 9000</code></p>
  <p><code>Feature: </code>Send push notifications of market movements.</p>
  <p>&nbsp;</p>
  <p><strong>Connection Limits</strong></p>
  <p>A maximum of 200 messages per second can be sent to the exchange per connection. It is the same as orders. Upon breaching the limit, a Reject <code>&lt;3&gt;</code> message will be sent.</p>
  <p>A maximum of 10 TCP connections per account is allowed. Exceeding this limit will result in a Logout <code>&lt;5&gt;</code> message being sent, followed by a disconnection.</p>
  <p>&nbsp;</p>
  <p><strong>Response Mode</strong></p>
  <p>FIX API allows multiple concurrent sessions for a single account. By default, all sessions receive all of the account's successful ExecutionReport<code>&lt;8&gt;</code> messages. These messages include responses from other FIX sessions as well as non-FIX API orders.</p>
  <p>&nbsp;</p>
  <p><strong>Header</strong></p>
  <p>Appears at the beginning of every message.</p>
  <table border="1">
    <thead>
      <tr>
        <td>Tag</td>
        <td>Name</td>
        <td>Type</td>
        <td>Required</td>
        <td>Description</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>8</td>
        <td>BeginString</td>
        <td>String</td>
        <td>Y</td>
        <td>Always FIX.4.4 Must be the first field in the message.</td>
      </tr>
      <tr>
        <td>9</td>
        <td>BodyLength</td>
        <td>Int</td>
        <td>Y</td>
        <td>Message length in bytes. Must be the second field in the message.</td>
      </tr>
      <tr>
        <td>35</td>
        <td>MsgType</td>
        <td>String</td>
        <td>Y</td>
        <td>Must be the third field in the message.</td>
      </tr>
      <tr>
        <td>49</td>
        <td>SenderCompID</td>
        <td>String</td>
        <td>Y</td>
        <td>Must be a unique mark with an alphanumeric combination of 10-32 characters. Your UUID is recommended.</td>
      </tr>
      <tr>
        <td>56</td>
        <td>TargetCompID</td>
        <td>String</td>
        <td>Y</td>
        <td>On messages from client required to be set to "spot."</td>
      </tr>
      <tr>
        <td>34</td>
        <td>MsgSeqNum</td>
        <td>Int</td>
        <td>Y</td>
        <td>Integer message sequence number.Values that will cause a gap will be rejected.</td>
      </tr>
      <tr>
        <td>52</td>
        <td>SendingTime</td>
        <td>UTCTimestamp</td>
        <td>Y</td>
        <td>Time of message transmission always expressed in UTC (YYYYMMDD-HH:MM:SS.sss).</td>
      </tr>
    </tbody>
  </table>
  <p>&nbsp;</p>
  <p><strong>Trailer</strong></p>
  <p>Appears at the end of every message.</p>
  <table border="1">
    <thead>
      <tr>
        <td>Tag</td>
        <td>Name</td>
        <td>Type</td>
        <td>Required</td>
        <td>Description</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>10</td>
        <td>CheckSum</td>
        <td>String</td>
        <td>Y</td>
        <td>&nbsp;</td>
      </tr>
    </tbody>
  </table>
  <p>&nbsp;</p>
</div>
`

// Clean the HTML before conversion
const cleanedHtml = cleanHtml(testHtml)

// Expected Markdown output
const expectedMarkdown = `This API can only be used with the SPOT Exchange.

**Access URLs**

Order access URL: \`tcp+tls://\`[fix-order.huobi.pro](http://fix-oe.binance.com): 9000

\`Feature: \`Place and cancel your orders.

Market access URL: \`tcp+tls://\`[fix-market.huobi.pro](http://fix-oe.binance.com): 9000

\`Feature: \`Send push notifications of market movements.

**Connection Limits**

A maximum of 200 messages per second can be sent to the exchange per connection. It is the same as orders. Upon breaching the limit, a Reject \`<3>\` message will be sent.

A maximum of 10 TCP connections per account is allowed. Exceeding this limit will result in a Logout \`<5>\` message being sent, followed by a disconnection.

**Response Mode**

FIX API allows multiple concurrent sessions for a single account. By default, all sessions receive all of the account's successful ExecutionReport\`<8>\` messages. These messages include responses from other FIX sessions as well as non-FIX API orders.

**Header**

Appears at the beginning of every message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 8 | BeginString | String | Y | Always FIX.4.4 Must be the first field in the message. |
| 9 | BodyLength | Int | Y | Message length in bytes. Must be the second field in the message. |
| 35 | MsgType | String | Y | Must be the third field in the message. |
| 49 | SenderCompID | String | Y | Must be a unique mark with an alphanumeric combination of 10-32 characters. Your UUID is recommended. |
| 56 | TargetCompID | String | Y | On messages from client required to be set to "spot." |
| 34 | MsgSeqNum | Int | Y | Integer message sequence number.Values that will cause a gap will be rejected. |
| 52 | SendingTime | UTCTimestamp | Y | Time of message transmission always expressed in UTC (YYYYMMDD-HH:MM:SS.sss). |

**Trailer**

Appears at the end of every message.

| Tag | Name | Type | Required | Description |
| --- | --- | --- | --- | --- |
| 10 | CheckSum | String | Y | |`

// Test function
async function testHtmlToMarkdownConversion() {
  const result = convertToMarkdown(cleanedHtml)

  // Remove extra whitespace and newlines for comparison
  const normalizedResult = result.replace(/\s+/g, ' ').trim()
  const normalizedExpected = expectedMarkdown.replace(/\s+/g, ' ').trim()

  if (normalizedResult === normalizedExpected) {
    console.log('✅ HTML to Markdown conversion test passed!')
  } else {
    console.error('❌ HTML to Markdown conversion test failed!')
    console.log('Expected:', normalizedExpected)
    console.log('Got:', normalizedResult)

    // Log the full markdown output to a file for debugging
    const outputPath = join(__dirname, 'failed-test-output.md')
    try {
      await writeFile(outputPath, result)
      console.log(`Full markdown output has been saved to: ${outputPath}`)
    } catch (error) {
      console.error('Error writing output file:', error)
    }
  }
}

// Run the test
testHtmlToMarkdownConversion().catch(error => console.error('Test error:', error))
