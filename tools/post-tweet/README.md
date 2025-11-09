# Post Tweet Tool

This tool posts tweets to Twitter/X when Twitter summary PRs are merged.

## Features

- Automatically posts tweets when Twitter summary PRs are merged
- Extracts Twitter content from the merged PR files
- Includes error handling and fallback mechanisms
- Cleans up Twitter summary files after posting

## Setup

### Twitter API Access

You need to set up Twitter API access and obtain the following credentials:

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app or use an existing one
3. Generate API keys and access tokens
4. Add the following secrets to your GitHub repository:
   - `TWITTER_API_KEY`
   - `TWITTER_API_SECRET`
   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_TOKEN_SECRET`

### Required Environment Variables

- `TWITTER_API_KEY`: Twitter API key
- `TWITTER_API_SECRET`: Twitter API secret
- `TWITTER_ACCESS_TOKEN`: Twitter access token
- `TWITTER_ACCESS_TOKEN_SECRET`: Twitter access token secret
- `PR_TITLE`: Title of the merged Twitter summary PR
- `PR_NUMBER`: Number of the merged Twitter summary PR

## Usage

This tool is designed to run in GitHub Actions workflows:

```yaml
- name: Post Tweet
  run: |
    cd tools/post-tweet
    node post-tweet.js
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
    PR_NUMBER: ${{ github.event.pull_request.number }}
    TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
    TWITTER_API_SECRET: ${{ secrets.TWITTER_API_SECRET }}
    TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
    TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

## Workflow Integration

This tool is used in the `tweet-poster.yml` workflow that triggers when PRs with
the "twitter-summary" label are merged.

## Process Flow

1. Twitter summary PR is created by the Twitter Summary Generator
2. PR is reviewed and merged
3. This tool extracts the Twitter content from the merged files
4. Posts the tweet to Twitter/X
5. Cleans up the temporary files

## Error Handling

- Falls back to a default tweet if the Twitter summary file cannot be read
- Provides detailed error logging for debugging
- In development mode, simulates posting without actually tweeting

## Dependencies

- `twitter-api-v2`: Official Twitter API v2 client for Node.js
