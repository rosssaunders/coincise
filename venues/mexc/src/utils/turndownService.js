'use strict';

import TurndownService from 'turndown';
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('');

// --- Turndown Setup ---
const turndownService = new TurndownService({
  headingStyle: 'atx', 
  codeBlockStyle: 'fenced', 
  emDelimiter: '*', 
  strongDelimiter: '**',
  linkStyle: 'inline',
});

turndownService.use([gfm, tables, strikethrough]);

export default turndownService;
