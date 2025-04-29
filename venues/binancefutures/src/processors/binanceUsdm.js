import { BaseProcessor } from './baseProcessor.js'

/**
 * Processor for Binance USDM Public REST API documentation
 * @extends BaseProcessor
 */
export class BinanceUSDMPublicRESTProcessor extends BaseProcessor {
  constructor() {
    super('binance', 'usdm.json', 'public_rest')
  }
}

/**
 * Processor for Binance USDM Private REST API documentation
 * @extends BaseProcessor
 */
export class BinanceUSDMPrivateRESTProcessor extends BaseProcessor {
  constructor() {
    super('binance', 'usdm.json', 'private_rest')
  }
}

/**
 * Processor for Binance USDM Public WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceUSDMPublicWebSocketProcessor extends BaseProcessor {
  constructor() {
    super('binance', 'usdm.json', 'public_websocket')
  }
}

/**
 * Processor for Binance USDM Private WebSocket API documentation
 * @extends BaseProcessor
 */
export class BinanceUSDMPrivateWebSocketProcessor extends BaseProcessor {
  constructor() {
    super('binance', 'usdm.json', 'private_websocket')
  }
}
