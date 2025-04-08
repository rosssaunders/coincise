import { BaseProcessor } from './baseProcessor.js';
import {
    BinanceSpotPublicRESTProcessor,
    BinanceSpotPrivateRESTProcessor,
    BinanceSpotPublicWebSocketProcessor,
    BinanceSpotPrivateWebSocketProcessor,
    BinanceSpotFIXProcessor,
    BinanceSpotSBEProcessor
} from './binanceSpot.js';

import {
    BinanceUSDMPublicRESTProcessor,
    BinanceUSDMPrivateRESTProcessor,
    BinanceUSDMPublicWebSocketProcessor,
    BinanceUSDMPrivateWebSocketProcessor
} from './binanceUsdm.js';

import {
    BinanceCoinMPublicRESTProcessor,
    BinanceCoinMPrivateRESTProcessor,
    BinanceCoinMPublicWebSocketProcessor,
    BinanceCoinMPrivateWebSocketProcessor
} from './binanceCoinM.js';

import {
    BinanceOptionsPublicRESTProcessor,
    BinanceOptionsPrivateRESTProcessor,
    BinanceOptionsPublicWebSocketProcessor,
    BinanceOptionsPrivateWebSocketProcessor
} from './binanceOptions.js';

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
                    new BinanceSpotSBEProcessor()
                ];
            case 'binanceusdm':
                return [
                    new BinanceUSDMPublicRESTProcessor(),
                    new BinanceUSDMPrivateRESTProcessor(),
                    new BinanceUSDMPublicWebSocketProcessor(),
                    new BinanceUSDMPrivateWebSocketProcessor()
                ];
            case 'binancecoinm':
                return [
                    new BinanceCoinMPublicRESTProcessor(),
                    new BinanceCoinMPrivateRESTProcessor(),
                    new BinanceCoinMPublicWebSocketProcessor(),
                    new BinanceCoinMPrivateWebSocketProcessor()
                ];
            case 'binanceoptions':
                return [
                    new BinanceOptionsPublicRESTProcessor(),
                    new BinanceOptionsPrivateRESTProcessor(),
                    new BinanceOptionsPublicWebSocketProcessor(),
                    new BinanceOptionsPrivateWebSocketProcessor()
                ];
            default:
                throw new Error(`Unknown exchange type: ${exchangeType}`);
        }
    }
} 