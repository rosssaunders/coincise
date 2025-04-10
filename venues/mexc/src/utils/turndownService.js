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

// turndownService.addRule('targetAnchor', {
//   filter: 'a',
//   replacement: (content, node) => {
//     // index.html#order_side
//     const href = node.getAttribute('href');
//     const id = node.getAttribute('id');
//     const anchor = href.split('#')[1];
//     return `[${content}](#${anchor})`;
//   }
// });



// turndownService.use(gfm);

// // Add a custom rule to handle table cells and links
// turndownService.addRule('tableCellWithLinks', {
//   filter: 'td',
//   replacement: (content, node) => {
//     if (node instanceof dom.window.HTMLElement) {
//       // // Get all links in the cell
//       // const links = node.querySelectorAll('a');
//       // let processedContent = node.innerHTML;
      
//       // // Process each link
//       // links.forEach(link => {
//       //   const href = link.getAttribute('href');
//       //   if (href && href.startsWith('index.html#')) {
//       //     const anchor = href.replace('index.html#', '').toLowerCase().replace(/_/g, '-');
//       //     const linkText = link.textContent;
//       //     processedContent = processedContent.replace(
//       //       link.outerHTML,
//       //       `[${linkText}](#${anchor})`
//       //     );
//       //   }
//       // });
      
//       return `| ${processedContent} `;
//     }
//     return `| ${content} `;
//   }
// });

export default turndownService;
