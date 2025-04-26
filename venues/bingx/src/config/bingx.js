'use strict'

// BingX API Documentation URLs
const privateUrls = [
  'https://bingx-api.github.io/docs/#/en-us/common/introduce',
  'https://bingx-api.github.io/docs/#/en-us/swapV2/q&a',
  'https://bingx-api.github.io/docs/#/en-us/spot/base-info.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/authentication.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/wallet-api.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/account-api.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html',
  'https://bingx-api.github.io/docs/#/en-us/common/sub-account',
]

const publicUrls = [
  'https://bingx-api.github.io/docs/#/en-us/common/introduce',
  'https://bingx-api.github.io/docs/#/en-us/swapV2/q&a',
  'https://bingx-api.github.io/docs/#/en-us/spot/base-info.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/market-api.html',
]

// WebSocket API Documentation URLs
const privateWebSocketUrls = [
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/',
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/listenKey.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/account.html#Subscription%20order%20update%20data',
]

const publicWebSocketUrls = [
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/#Connection%20Limits',
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/listenKey.html',
  'https://bingx-api.github.io/docs/#/en-us/spot/socket/market.html',
]

// Output configurations
const privateOutputConfig = {
  docsDir: '../../docs/bingx/spot',
  outputFileName: 'private_rest_api.md',
}

const publicOutputConfig = {
  docsDir: '../../docs/bingx/spot',
  outputFileName: 'public_rest_api.md',
}

// WebSocket output configurations
const privateWebSocketOutputConfig = {
  docsDir: '../../docs/bingx/spot',
  outputFileName: 'private_websocket_api.md',
}

const publicWebSocketOutputConfig = {
  docsDir: '../../docs/bingx/spot',
  outputFileName: 'public_websocket_api.md',
}

// Function to get configuration based on type
export function getConfig(type = 'private') {
  switch (type) {
    case 'private':
      return {
        urls: privateUrls,
        outputConfig: privateOutputConfig,
      }
    case 'public':
      return {
        urls: publicUrls,
        outputConfig: publicOutputConfig,
      }
    case 'privateWebSocket':
      return {
        urls: privateWebSocketUrls,
        outputConfig: privateWebSocketOutputConfig,
      }
    case 'publicWebSocket':
      return {
        urls: publicWebSocketUrls,
        outputConfig: publicWebSocketOutputConfig,
      }
    default:
      return {
        urls: privateUrls,
        outputConfig: privateOutputConfig,
      }
  }
}

// Default export for backward compatibility
export const { urls, outputConfig } = getConfig('private')
