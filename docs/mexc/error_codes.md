# Error Codes

## Q1: How many API Keys can a user apply?

Each account can create up to 30 API Keys. The validity of an API Key without a linked IP address is 90 days, and the API Key will expire automatically. Each API Key can be linked to a maximum of 10 IP addresses.

## Q2: How many sub-accounts can a main account apply?

Each main account can create up to 30 sub-accounts. The sub-accounts will automatically inherit the main account rates. However, sub-accounts created via API cannot be logged in on Web.

## Q3: Why are there often issues of disconnections and expired sessions?

If stable access is not possible, it is recommended to use Japan or Singapore AWS cloud servers for access.

## Q4: What should I do after an error is reported for exceeding the limit frequency?

After exceeding the interface access frequency limit, you will not be able to continue accessing the interface. It will resume to normal after 10 minutes to keep the interface access frequency below the limit.

## Q5: How many orders can an account place?

Each account can hold up to 500 valid orders that are not completely filled.

## Q6:Why does WebSocket always disconnect?

1.  If there is no valid subscription, it will disconnect in 30 seconds.
2.  If the subscription is successful, and there is no traffic in 60 seconds, it will automatically disconnect.
3.  To ensure a stable connection, a Pong reply is required upon receiving the Ping message sent from the server.

## Q7: Why am I unable to subcribe to multiple channels on WebSocket?

WebSocket currently allows subscription to up to 30 channels via a single link. Any subscription will be invalid after the limit is exceeded. To subscribe to more channels, it is recommended to create multiple links.