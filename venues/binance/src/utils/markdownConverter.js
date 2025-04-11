import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { JSDOM } from 'jsdom';

/**
 * Class for converting HTML content to Markdown
 */
export class MarkdownConverter {
    /**
     * Initialize the Markdown converter with GFM support
     */
    constructor() {
        /** @private */
        this.dom = new JSDOM('');
        // Initialize Turndown with GFM
        /** @private */
        this.turndownService = new TurndownService({
            codeBlockStyle: 'fenced',
            fence: '```'
        });
        
        // Add GFM plugins (tables, strikethrough, etc)
        gfm(this.turndownService);

        // Add custom rule to preserve line breaks in table cells
        this.turndownService.addRule('tableCellWithBr', {
            filter: 'td',
            replacement: (content, node) => {
                if (node instanceof this.dom.window.HTMLElement) {
                    const cellContent = node.innerHTML.replace(/<br\s*\/?>/gi, '<br>');
                    return `| ${cellContent} `;
                }
                return `| ${content} `;
            }
        });
    }

    /**
     * Convert HTML content to Markdown
     * @param {string} html - The HTML content to convert
     * @returns {string} The converted Markdown content
     */
    convertToMarkdown(html) {
        return this.turndownService.turndown(html);
    }
}
