# Upbit Venue Monitor

This venue monitor fetches and converts the Upbit changelog to markdown format for monitoring API changes.

## Usage

```bash
# Install dependencies
npm install

# Run the monitor
npm start

# Format the output markdown
npm run format
```

## Configuration

The configuration is stored in `config/private.json`:

```json
{
  "urls": ["https://global-docs.upbit.com/changelog"],
  "outputConfig": {
    "docsDir": "../../docs/upbit",
    "outputFileName": "change_log.md"
  },
  "title": "Upbit API Change Log"
}
```

## Output

The monitor generates a markdown file at `docs/upbit/change_log.md` containing the formatted changelog data.