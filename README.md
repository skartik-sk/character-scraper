# Character Scraper

A comprehensive pipeline for generating AI character files and training datasets by scraping public figures' online presence from Twitter and blogs. This tool transforms scraped social media data into JSON character files compatible with [Eliza](https://github.com/elizaos/eliza), enabling AI agents to emulate real people's communication styles and personalities.

## 🎯 Purpose

This application scrapes Twitter data from any person's profile and produces JSON character files that can be used with Eliza to make AI agents communicate in the style and personality of that person. The tool analyzes tweets, engagement patterns, and writing style to create comprehensive character profiles.

## ⚠️ Important Warning

**Create a new Twitter account for this tool.** DO NOT use your main account as it may trigger Twitter's automation detection and result in account restrictions or bans.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Twitter account credentials (dedicated account recommended)
- OpenAI API key (for character generation)

## 🚀 Quick Start

### 1. Installation

Navigate to the `twitter-scraper` directory and install dependencies:

```bash
cd twitter-scraper
npm install
```

Or using pnpm:
```bash
cd twitter-scraper
pnpm install
```

### 2. Configuration

Copy the `.env.example` file to `.env` (from within the `twitter-scraper` directory):

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# (Required) Twitter Authentication
TWITTER_USERNAME=your_twitter_username
TWITTER_PASSWORD=your_twitter_password
TWITTER_EMAIL=your_twitter_email

# (Optional) Blog Configuration
BLOG_URLS_FILE=path/to/blog_urls.txt

# (Optional) Scraping Configuration
MAX_TWEETS=3000              # Maximum number of tweets to scrape
MAX_RETRIES=3                # Maximum retries for failed requests
RETRY_DELAY=5000             # Delay between retries (ms)
MIN_DELAY=1000               # Minimum delay between requests (ms)
MAX_DELAY=3000               # Maximum delay between requests (ms)
```

> **🔒 Security Note**: Never commit your `.env` file to version control. It's already included in `.gitignore` to protect your credentials.

For character generation, also add:
```env
OPENAI_API_KEY=your_openai_api_key
```

## 📖 Usage Guide

All commands should be run from within the `twitter-scraper` directory:

```bash
cd twitter-scraper
```

### Scrape Twitter Data

Scrape tweets from a specific user:

```bash
npm run twitter -- username
```

Example:
```bash
npm run twitter -- pmarca
```

This will:
- Authenticate with Twitter
- Scrape the user's tweets (up to MAX_TWEETS)
- Save raw tweets to `pipeline/[username]/[date]/raw/tweets.json`
- Generate analytics and statistics
- Create engagement reports

### Scrape Blog Content

Scrape content from blog URLs (configured via BLOG_URLS_FILE):

```bash
npm run blog
```

### Generate Eliza Character File

Generate a character file compatible with Eliza from scraped tweets:

```bash
npm run character -- username
```

Example:
```bash
npm run character -- pmarca
```

This creates a character file at `characters/[username].json` with:
- `name`: Character name
- `bio`: Biography array
- `lore`: Background and personality traits
- `knowledge`: Key facts and beliefs
- `messageExamples`: Conversation examples
- `postExamples`: Example tweets/posts
- `topics`: Common discussion topics
- `style`: Writing style characteristics

### Generate Virtuals Character Card

Generate a character card for Virtuals.io platform:

```bash
npm run generate-virtuals -- username [date]
```

Examples:
```bash
npm run generate-virtuals -- pmarca 2024-11-29
npm run generate-virtuals -- pmarca  # Uses today's date
```

Output: `pipeline/[username]/[date]/character/character.json`

### Create Fine-tuning Dataset

Generate a fine-tuning dataset from scraped tweets:

```bash
npm run finetune
```

Or with test mode:
```bash
npm run finetune:test
```

## 📁 Project Structure

```
character-scraper/
├── twitter-scraper/          # Main scraping application
│   ├── src/
│   │   ├── twitter/         # Twitter scraping logic
│   │   ├── blog/            # Blog scraping logic
│   │   ├── character/       # Eliza character generation
│   │   └── virtuals/        # Virtuals.io character generation
│   ├── scripts/
│   │   └── finetune.js      # Fine-tuning dataset creation
│   ├── pipeline/            # Output directory (generated)
│   │   └── [username]/
│   │       └── [date]/
│   │           ├── raw/                 # Raw scraped data
│   │           │   ├── tweets.json     # All scraped tweets
│   │           │   └── urls.txt        # Extracted URLs
│   │           ├── analytics/           # Analytics and stats
│   │           │   └── stats.json      # Engagement statistics
│   │           ├── processed/           # Processed data
│   │           │   └── finetuning.jsonl # Fine-tuning dataset
│   │           ├── character/           # Character files
│   │           │   └── character.json  # Virtuals character
│   │           └── exports/             # Export files
│   │               └── summary.md      # Summary report
│   ├── characters/          # Eliza character files (generated)
│   │   └── [username].json
│   ├── package.json
│   └── .env
├── eliza/                   # Eliza framework (reference)
└── README.md               # This file
```

## 📄 Output Formats

### Eliza Character File

Located at `characters/[username].json`, compatible with [Eliza](https://github.com/elizaos/eliza):

```json
{
  "name": "Character Name",
  "plugins": [],
  "clients": [],
  "modelProvider": "anthropic",
  "settings": {
    "secrets": {},
    "voice": {
      "model": "en_US-hfc_female-medium"
    }
  },
  "bio": [
    "Biography line 1",
    "Biography line 2"
  ],
  "lore": [
    "Background detail 1",
    "Personality trait 1"
  ],
  "knowledge": [
    "Key belief 1",
    "Important fact 1"
  ],
  "messageExamples": [
    [
      {
        "user": "{{user1}}",
        "content": { "text": "Question..." }
      },
      {
        "user": "Character",
        "content": { "text": "Response..." }
      }
    ]
  ],
  "postExamples": [
    "Example tweet 1",
    "Example tweet 2"
  ]
}
```

### Virtuals Character Card

Located at `pipeline/[username]/[date]/character/character.json`:

```json
{
  "name": "Character Name",
  "handler": "username",
  "bio": "Brief bio...",
  "description": "Detailed description...",
  "forum_start_system_prompt": "Forum behavior instructions...",
  "forum_end_system_prompt": "Forum consistency guidelines...",
  "twitter_start_system_prompt": "Tweet style instructions...",
  "twitter_end_system_prompt": "Tweet generation guidelines..."
}
```

### Raw Tweet Data

Located at `pipeline/[username]/[date]/raw/tweets.json`:

```json
[
  {
    "id": "1234567890",
    "text": "Tweet content...",
    "created_at": "2024-01-01T12:00:00Z",
    "likes": 100,
    "retweets": 50,
    "replies": 25,
    "views": 1000,
    "username": "username",
    "name": "Display Name"
  }
]
```

## 🔧 Advanced Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TWITTER_USERNAME` | Yes | - | Twitter account username |
| `TWITTER_PASSWORD` | Yes | - | Twitter account password |
| `TWITTER_EMAIL` | Yes | - | Twitter account email |
| `OPENAI_API_KEY` | For character gen | - | OpenAI API key for character generation |
| `MAX_TWEETS` | No | 3000 | Maximum tweets to scrape |
| `MAX_RETRIES` | No | 3 | Maximum retry attempts |
| `RETRY_DELAY` | No | 5000 | Delay between retries (ms) |
| `MIN_DELAY` | No | 1000 | Minimum delay between requests (ms) |
| `MAX_DELAY` | No | 3000 | Maximum delay between requests (ms) |
| `BLOG_URLS_FILE` | No | - | Path to file with blog URLs |

### Rate Limiting

The scraper includes built-in rate limiting to avoid triggering Twitter's automation detection:
- Random delays between requests (MIN_DELAY to MAX_DELAY)
- Automatic retry logic with exponential backoff
- Session management with proper authentication

## 🎭 Use Cases

1. **AI Character Creation**: Generate character files for Eliza-based AI agents
2. **Personality Analysis**: Study communication patterns and writing styles
3. **Content Generation**: Train models to generate content in specific styles
4. **Research**: Analyze social media behavior and engagement patterns
5. **Chatbot Development**: Create chatbots that emulate real people

## 🛡️ Best Practices

1. **Use a Dedicated Account**: Never use your main Twitter account
2. **Respect Rate Limits**: Don't set MAX_TWEETS too high (3000 is recommended)
3. **Monitor for Blocks**: Watch for authentication errors or rate limiting
4. **Privacy Considerations**: Only scrape public profiles
5. **API Keys**: Keep your `.env` file secure and never commit it to git
6. **Test First**: Use test mode for fine-tuning before running full pipeline

## 🔍 Troubleshooting

### Authentication Failed
- Verify credentials in `.env` are correct
- Check if Twitter account is locked or restricted
- Try using a different account

### Rate Limited
- Increase delays (MIN_DELAY, MAX_DELAY)
- Reduce MAX_TWEETS
- Wait before retrying (usually 15-30 minutes)

### No Tweets Found
- Verify the username is correct
- Check if the profile is public
- Ensure the user has tweets available

### Character Generation Failed
- Verify OPENAI_API_KEY is set
- Check if you have scraped tweets first
- Ensure tweets.json exists in the pipeline directory

## 📚 References

- [Eliza Framework](https://github.com/elizaos/eliza)
- [Virtuals.io Character Cards](https://whitepaper.virtuals.io/developer-documents/agent-contribution/contribute-to-cognitive-core#character-card-and-goal-samples)
- [agent-twitter-client](https://www.npmjs.com/package/agent-twitter-client)

## 📝 License

MIT

## 👤 Author

dreaminglucid

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Note**: This tool is for educational and research purposes. Always respect platform terms of service and user privacy.
