# Crypto API Docs Specs

This folder contains generated API specification files for part of the Venues
APIs

## Prompt for ChatGPT o4-mini-high Deep Research

Write a specification for an LLM to implement the Rate Limiting rules in a API
client library to ensure that rate limits on crypto exchange venue are not
breached. 

For REST calls consider any IP rate limiting, account based limiting, api key
rate limiting. 

For websocket calls please consider rate limiting per message send plus make
number of subscriptions to topics.

Please include both private and public apis.

If there are different levels of Rate Limits based on trading volume please
specify that. 

The specification should be programming language agnostic

For this request, write the formal spec for the <VENUE> API.
