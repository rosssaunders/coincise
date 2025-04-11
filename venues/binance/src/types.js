/**
 * @typedef {'process'} Command
 */

/**
 * @typedef {'binancespot' | 'binanceusdm' | 'binancecoinm' | 'binanceoptions'} Exchange
 */

/**
 * @typedef {Object} ExchangeResult
 * @property {string} market - The market identifier
 * @property {string} filename - The name of the generated file
 * @property {string} timestamp - The timestamp of the processing
 * @property {number} tokens - The number of tokens processed
 */

/**
 * @typedef {Object} DocumentProcessor
 * @property {function(): Promise<[number, string, string]>} processDocs - Processes the documentation and returns [tokens, timestamp, market]
 * @property {function(): string} getOutputFilename - Returns the output filename for the processed documentation
 */

// Export the types for use in JSDoc comments
export {
    /** @type {Command} */
    Command,
    /** @type {Exchange} */
    Exchange,
    /** @type {ExchangeResult} */
    ExchangeResult,
    /** @type {DocumentProcessor} */
    DocumentProcessor
};