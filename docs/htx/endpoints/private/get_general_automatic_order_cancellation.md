# GET [General] Automatic Order Cancellation

**Source:** [[General] Automatic Order Cancellation](https://www.htx.com/en-us/opend/newApiPages/?id=10000068-77b7-11ed-9966-0242ac110003)

**Category:** Swap Trade Interface

## Authentication

Required (Private Endpoint)

### /linear-swap-api/v1/linear-cancel-after (\[General\] Automatic Order Cancellation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: HTX Futures launches the automatic order cancellation interface to prevent API users from incurring unexpected losses in the event of network failures or client system failures that result in a loss of communication with the HTX system. When users experience an unexpected disconnection from HTX's system, this interface automatically cancels all pending orders (including both opening and closing orders) to mitigate potential losses through its Dead Man's Switch functionality. If the interface is not called again within the specified period, all of the user's pending futures orders will be canceled.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| on\_off | int | true | Enable and disable the automatic order cancellation feature | 1 refers to enable the feature;0 refers to disable the feature |  |
| time\_out | int | false | Configure a countdown timer for automatic order cancellation. If the feature is not disabled when the countdown ends, all pending orders placed by the user will be canceled. It is advisable to set the timer when enabling the feature; otherwise, the default countdown is 5,000 milliseconds (5 seconds). | ≥ 5,000 ms | 5,000 ms |

Notes:  
The system checks all countdowns approximately every 10 ms. Therefore, please be aware that when using this feature, redundancy should be taken into account. We do not recommend setting the countdowns too precisely or too small.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| msg | string | false | Error description |  |
| ts | long | false | Time of responding, unit: millisecond (ms) |  |
| DATA> \_START | object | false |  |  |
| current\_time | long | false | Current time (subject to platform server time) |  |
| trigger\_time | long | false | Trigger time (subject to platform server time) |  |
| DATA\_END |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

No data