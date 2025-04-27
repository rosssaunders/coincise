'use strict'

import { promises as fs } from 'fs'

/**
 * Utility class for configuration handling
 */
class ConfigUtils {
  /**
   * Load and validate a configuration file
   * @param {string} configPath - Path to the configuration file
   * @returns {Promise<Object>} - The validated configuration object
   * @throws {Error} - If the configuration is invalid
   */
  static async loadConfig(configPath) {
    try {
      const configData = await fs.readFile(configPath, 'utf8')
      const config = JSON.parse(configData)

      this.validateConfig(config)

      return config
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Configuration file not found: ${configPath}`)
      }
      throw error
    }
  }

  /**
   * Validate the configuration object structure
   * @param {Object} config - The configuration object to validate
   * @throws {Error} - If the configuration is invalid
   */
  static validateConfig(config) {
    // Validate sections property
    if (!config.sections || !Array.isArray(config.sections) || config.sections.length === 0) {
      throw new Error(
        'Configuration must contain a "sections" array with at least one section name'
      )
    }

    // Validate output property
    if (!config.output) {
      throw new Error('Configuration must specify an "output" path')
    }

    // Validate title property (optional)
    if (config.title && typeof config.title !== 'string') {
      throw new Error('Configuration "title" must be a string when provided')
    }

    // Validate supportArticles if present
    if (config.supportArticles && !Array.isArray(config.supportArticles)) {
      throw new Error('Configuration "supportArticles" must be an array when provided')
    }
  }
}

export default ConfigUtils
