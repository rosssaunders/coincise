#!/usr/bin/env python3
"""
Proof-of-Concept: Bitget API Documentation Scraper using Crawl4AI

This is a simplified replacement for the Node.js Puppeteer-based scraper
that demonstrates how Crawl4AI can reduce code complexity while providing
better markdown output optimized for LLM consumption.

Original implementation: index.js (226 lines)
This implementation: ~100 lines
"""

import asyncio
import json
from pathlib import Path
from typing import List, Dict
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy


class BitgetDocScraper:
    """Crawl4AI-based documentation scraper for Bitget Exchange API"""

    def __init__(self, config_path: str):
        """
        Initialize the scraper with a config file

        Args:
            config_path: Path to JSON config file (same format as Node.js version)
        """
        self.config = self._load_config(config_path)
        self.output_dir = Path(__file__).parent.parent.parent.parent / "docs" / "bitget"
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def _load_config(self, config_path: str) -> Dict:
        """Load and validate config file"""
        with open(config_path, 'r') as f:
            config = json.load(f)

        required_fields = ['title', 'output_file', 'base_url', 'urls']
        for field in required_fields:
            if field not in config:
                raise ValueError(f"Missing required config field: {field}")

        return config

    async def scrape_all_pages(self) -> str:
        """
        Scrape all pages from config and combine into single markdown document

        Returns:
            Combined markdown content
        """
        markdown_content = f"# {self.config['title']}\n\n"

        # Configure the crawler
        config = CrawlerRunConfig(
            # Wait for network to be idle before extracting
            wait_for="networkidle",
            # Use CSS selector to extract only the markdown content
            css_selector=".theme-doc-markdown.markdown",
            # Cache the results for 1 hour (helpful for development/testing)
            cache_mode=CacheMode.ENABLED,
            # Delay between requests to be polite
            delay_between_requests=1.0,
            # Timeout for each page
            page_timeout=30000,
            # Generate clean markdown optimized for LLMs
            word_count_threshold=10,  # Minimum words to keep a block
        )

        async with AsyncWebCrawler(verbose=True) as crawler:
            for i, relative_path in enumerate(self.config['urls'], 1):
                if not relative_path or not isinstance(relative_path, str):
                    continue

                full_url = f"{self.config['base_url']}{relative_path}"
                print(f"[{i}/{len(self.config['urls'])}] Processing: {full_url}")

                try:
                    # Crawl the page
                    result = await crawler.arun(url=full_url, config=config)

                    if result.success and result.markdown:
                        # Crawl4AI's markdown is already clean and optimized
                        section_markdown = result.markdown

                        # Drop heading levels by 1 (H1 -> H2, H2 -> H3, etc.)
                        section_markdown = self._drop_heading_levels(section_markdown)

                        # Add the section with source attribution
                        markdown_content += f"\n\n{section_markdown}"
                        markdown_content += f"\n\n> **Source:** [original URL]({full_url})\n\n---\n\n"
                    else:
                        print(f"❌ Failed to scrape {full_url}: {result.error_message}")

                except Exception as e:
                    print(f"❌ Error processing {full_url}: {e}")
                    continue

        return markdown_content

    def _drop_heading_levels(self, markdown: str) -> str:
        """
        Drop all heading levels by 1 (H1 -> H2, H2 -> H3, etc.)

        This matches the behavior of the original Node.js implementation
        """
        lines = markdown.split('\n')
        modified_lines = []

        for line in lines:
            # Check if line is a heading (starts with #)
            if line.strip().startswith('#') and not line.strip().startswith('#!'):
                # Count the number of # at the start
                hash_count = 0
                for char in line:
                    if char == '#':
                        hash_count += 1
                    elif char == ' ':
                        break
                    else:
                        break

                if hash_count > 0 and hash_count < 7:
                    # Add one more # to drop the level
                    remaining = line[hash_count:]
                    modified_lines.append('#' * (hash_count + 1) + remaining)
                else:
                    modified_lines.append(line)
            else:
                modified_lines.append(line)

        return '\n'.join(modified_lines)

    async def run(self):
        """Execute the scraping process and save output"""
        print(f"🚀 Starting Bitget API documentation scraper (Crawl4AI POC)")
        print(f"📝 Config: {self.config['title']}")
        print(f"🌐 Base URL: {self.config['base_url']}")
        print(f"📄 Pages to scrape: {len(self.config['urls'])}")

        # Scrape all pages
        markdown_content = await self.scrape_all_pages()

        # Save to file
        output_path = self.output_dir / self.config['output_file']
        # Add _crawl4ai suffix to distinguish from original
        output_path = output_path.with_stem(output_path.stem + '_crawl4ai')

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        print(f"✅ Markdown file created successfully at {output_path}")
        print(f"📊 Total size: {len(markdown_content):,} characters")


async def main():
    """Main entry point"""
    import sys

    if len(sys.argv) < 2:
        print("❌ Error: Please provide the path to the config file")
        print("Usage: python crawl4ai_poc.py <path_to_config_file>")
        sys.exit(1)

    config_path = sys.argv[1]

    if not Path(config_path).exists():
        print(f"❌ Error: Config file not found: {config_path}")
        sys.exit(1)

    try:
        scraper = BitgetDocScraper(config_path)
        await scraper.run()
        print("\n🎉 Scraping completed successfully! 🎉")
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
