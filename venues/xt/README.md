# XT.com Exchange Documentation Extractor

This directory contains scripts for extracting API documentation from
[XT.com](https://www.xt.com/).

## Documentation Source

- **URL**: https://doc.xt.com/docs/index_overview/overview
- **Spot Trading API**:
  https://doc.xt.com/docs/spot/Access%20Description/BasicInformationOfTheInterface
- **Framework**: Docusaurus
- **GitHub**: https://github.com/XtApis/api

## Available Scripts

### Extract General Documentation

Extracts core documentation sections:

- Rate limits
- Authentication
- Network connectivity
- Error codes
- Response formats
- Change log

```bash
pnpm run extract:general
```

### Extract Endpoint Documentation

Extracts individual endpoint documentation for:

- Balance endpoints
- Deposit & Withdrawal endpoints
- Market data endpoints
- Order endpoints
- Trade endpoints
- Transfer endpoints

```bash
pnpm run extract:endpoints
```

### Extract All

Runs both general and endpoint extraction:

```bash
pnpm run extract:all
```

## Output Structure

Documentation is extracted to `/docs/xt/`:

```
docs/xt/
├── rate_limits.md
├── authentication.md
├── network_connectivity.md
├── error_codes.md
├── response_formats.md
├── change_log.md
└── endpoints/
    ├── public/
    │   └── *.md (public endpoints)
    └── private/
        └── *.md (authenticated endpoints)
```

## Notes

- XT.com uses Docusaurus for their API documentation
- The documentation is organized by product (Spot, Futures, Margin, etc.)
- This extractor focuses on Spot Trading API endpoints
- Authentication detection is based on the presence of signature headers:
  - `xt-validate-signature`
  - `xt-validate-timestamp`
  - `xt-validate-apikey`
- XT.com does not provide a dedicated API changelog in their documentation

## Last Updated

Generated on: November 3, 2024
