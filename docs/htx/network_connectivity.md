You can compare the network latency between two domain api.huobi.pro and
api-aws.huobi.pro, and then choose the better one for you.

In general, the domain api-aws.huobi.pro is optimized for AWS client, the
latency will be lower.

**REST API**

**`https://api.huobi.pro`**

**`https://api-aws.huobi.pro`**

**Websocket Feed (market data except MBP incremental)**

**`wss://api.huobi.pro/ws`**

**`wss://api-aws.huobi.pro/ws`**

**Websocket Feed (market data only MBP incremental)**

**`wss://api.huobi.pro/feed`**

**`wss://api-aws.huobi.pro/feed`**

**Websocket Feed (account and order)**

**`wss://api.huobi.pro/ws/v2`**

**`wss://api-aws.huobi.pro/ws/v2`**

Please initiate API calls with non-China IP.

It is not recommended to use proxy to access HTX API because it will introduce
high latency and low stability.

It is recommended to access HTX API from AWS Japan for better stability. If your
server is in China mainland, it may be not stable.
