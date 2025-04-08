'use strict';

import { BaseProcessor } from './baseProcessor.js';

export class PublicRestProcessor extends BaseProcessor {
  constructor() {
    super('public_rest.json', 'Public REST');
  }
}

export async function generatePublicRestDocs() {
  const processor = new PublicRestProcessor();
  await processor.generateDocs();
} 