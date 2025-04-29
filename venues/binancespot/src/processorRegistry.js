import { BaseProcessor } from './baseProcessor.js'
import {
  BinanceSpotFIXProcessor,
  BinanceSpotPrivateRESTProcessor,
  BinanceSpotPrivateWebSocketProcessor,
  BinanceSpotPublicRESTProcessor,
  BinanceSpotPublicWebSocketProcessor,
  BinanceSpotSBEProcessor,
} from './binanceSpot.js'

/**
 * Registry for creating and managing document processors
 */
export class ProcessorRegistry {
  /**
   * Creates processors based on the exchange type
   * @param {string} exchangeType - The type of exchange to create processors for
   * @returns {BaseProcessor[]} Array of processors for the specified exchange
   * @throws {Error} If the exchange type is unknown
   */
  static createProcessorsByExchange(exchangeType) {
    switch (exchangeType) {
      case 'binancespot':
        return [
          new BinanceSpotPublicRESTProcessor(),
          new BinanceSpotPrivateRESTProcessor(),
          new BinanceSpotPublicWebSocketProcessor(),
          new BinanceSpotPrivateWebSocketProcessor(),
          new BinanceSpotFIXProcessor(),
          new BinanceSpotSBEProcessor(),
        ]
      default:
        throw new Error(`Unknown exchange type: ${exchangeType}`)
    }
  }
}
