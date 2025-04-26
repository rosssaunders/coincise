import fs from 'fs'
import path from 'path'
import { DocProcessor } from '../utils/docProcessor.js'
import { MarkdownConverter } from '../utils/markdownConverter.js'
import { fileURLToPath } from 'url'

/**
 * @typedef {Object} ProcessorConfig
 * @property {string[]} endpoints - Array of API endpoints to process
 * @property {string} output_file - Path to the output file
 * @property {string} title - Title for the documentation
 */

/**
 * Base class for processing API documentation
 */
export class BaseProcessor {
  /**
   * @param {string} exchange - The exchange name
   * @param {string} configPath - Path to the configuration file
   * @param {string} apiType - Type of API (public_rest, private_rest, public_websocket, private_websocket)
   */
  constructor(exchange, configPath, apiType) {
    /** @private */
    this.exchange = exchange
    /** @private */
    this.configPath = configPath
    /** @private */
    this.apiType = apiType
    /** @private */
    this.config = this.loadConfig()
    /** @private */
    this.markdownConverter = new MarkdownConverter()
  }

  /**
   * Load the configuration file
   * @returns {Object} The configuration object
   */
  loadConfig() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const configFile = path.resolve(__dirname, '..', '..', 'config', this.configPath)
    return JSON.parse(fs.readFileSync(configFile, 'utf8'))
  }

  /**
   * Process the documentation
   * @returns {Promise<string>} The markdown content
   */
  async process() {
    const docProcessor = new DocProcessor(
      this.config[this.apiType].endpoints,
      this.config[this.apiType].output_file,
      this.config[this.apiType].title
    )

    return await docProcessor.processDocs()
  }

  /**
   * Get the output filename
   * @returns {string} The output filename
   */
  getOutputFilename() {
    return this.config[this.apiType].output_file
  }
}
