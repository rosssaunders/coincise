#!/bin/bash

slugs=(
  "binance"
  "coinbase-exchange"
  "okx"
  "bybit"
  "upbit"
  "bitget"
  "gate"
  "kucoin"
  "mexc"
  "htx"
  "crypto-com-exchange"
  "bitfinex"
  "bingx"
  "bitmart"
  "xt"
  "digifinex"
  "deribit"
  "hyperliquid"
  "bullish"
  "backpack-exchange"
)

for slug in "${slugs[@]}"; do
  url="https://coinmarketcap.com/exchanges/$slug/"
  id=$(curl -s "$url" | grep -o 's2.coinmarketcap.com/static/img/exchanges/64x64/[0-9]*' | head -n 1 | grep -o '[0-9]*')
  if [ -z "$id" ]; then
    echo "$slug: Not Found"
  else
    echo "$slug: $id"
  fi
  sleep 1 # Be nice to the server
done
