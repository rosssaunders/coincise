import { TwitterApi } from "twitter-api-v2"
import { execSync } from "child_process"

/**
 * Post tweet when a Twitter summary PR is merged
 */
async function postTweet() {
  try {
    // Get Twitter API credentials from environment variables
    const apiKey = process.env.TWITTER_API_KEY
    const apiSecret = process.env.TWITTER_API_SECRET
    const accessToken = process.env.TWITTER_ACCESS_TOKEN
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    // Get PR information from environment variables
    const prTitle = process.env.PR_TITLE
    const prNumber = process.env.PR_NUMBER

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
      throw new Error(
        "Twitter API credentials are required. Please set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_TOKEN_SECRET environment variables."
      )
    }

    if (!prTitle || !prNumber) {
      throw new Error(
        "PR_TITLE and PR_NUMBER environment variables are required"
      )
    }

    console.log(`Looking for Twitter summary in PR #${prNumber}`)

    // Find the Twitter summary file in the merged PR
    const twitterFileName = `twitter-summary-pr-${prNumber}.md`

    let twitterSummary
    try {
      const fs = await import("fs/promises")
      const fileContent = await fs.readFile(twitterFileName, "utf8")

      // Extract the Twitter summary from the markdown file
      const summaryMatch = fileContent.match(
        /## Twitter\/X Update\s*\n\n(.*?)\n\n/s
      )
      if (summaryMatch) {
        twitterSummary = summaryMatch[1].trim()
      } else {
        throw new Error("Could not extract Twitter summary from file")
      }
    } catch (error) {
      console.error("Error reading Twitter summary file:", error.message)
      // Fallback: try to extract from PR title
      twitterSummary = `📚 Updated cryptocurrency exchange API documentation! 🚀 #crypto #API #documentation`
    }

    console.log("Twitter summary to post:", twitterSummary)

    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessTokenSecret
    })

    // Post the tweet
    const tweet = await client.v2.tweet(twitterSummary)

    console.log("Tweet posted successfully!")
    console.log("Tweet ID:", tweet.data.id)
    console.log(
      "Tweet URL:",
      `https://twitter.com/i/web/status/${tweet.data.id}`
    )

    // Clean up the Twitter summary file after posting
    try {
      const fs = await import("fs/promises")
      await fs.unlink(twitterFileName)
      console.log(`Cleaned up ${twitterFileName}`)
    } catch (cleanupError) {
      console.warn(
        "Could not clean up Twitter summary file:",
        cleanupError.message
      )
    }

    return tweet.data
  } catch (error) {
    console.error("Error posting tweet:", error.message)
    console.error("Stack trace:", error.stack)

    // For testing/development, we might want to continue without failing
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode: Tweet would have been posted")
      return { id: "dev-tweet-id" }
    }

    process.exit(1)
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  postTweet().catch(error => {
    console.error("Unhandled error in postTweet:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
