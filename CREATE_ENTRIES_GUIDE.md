# Create All Entries in Contentstack

This guide will help you create all entries in your Contentstack stack.

## Prerequisites

1. **Content Types Created**: All content types must exist in Contentstack first:
   - `hero_section`
   - `about_page`
   - `career_page`
   - `features`
   - `pricing_plans`
   - `trust_indicators`
   - `use_cases`
   - `why_choose_platform` (new)

2. **Management Token**: You need a valid Management API token with permissions to:
   - Create entries
   - Update entries
   - Publish entries

## Configuration

The script uses these default values (can be overridden with environment variables):

- **API Key**: `blt755dc6238a6bbc27`
- **Management Token**: `cs8f11635528ccb3a9f8edd741`
- **Branch**: `cmsproject`

### Using Environment Variables (Optional)

You can set these environment variables before running:

```bash
export CONTENTSTACK_API_KEY="your_api_key"
export CONTENTSTACK_MANAGEMENT_TOKEN="your_management_token"
export CONTENTSTACK_BRANCH="cmsproject"
```

## Running the Script

### Option 1: Using npm script
```bash
npm run create-entries
```

### Option 2: Direct execution
```bash
node create-all-entries.mjs
```

## What the Script Does

1. **Reads all entry files** from the `entries/` folder and root directory
2. **Creates entries** for each content type
3. **Updates existing entries** if they already exist (for singleton types)
4. **Publishes all entries** to the `cmsproject` branch/environment
5. **Provides summary** of created/updated/published entries

## Content Types Handled

- **Hero Section** (singleton) - 1 entry
- **About Page** (singleton) - 1 entry
- **Career Page** (singleton) - 1 entry
- **Features** (singleton) - 1 entry (with arrays)
- **Pricing Plans** (singleton) - 1 entry
- **Trust Indicators** (multiple) - 4 entries
- **Use Cases** (multiple) - 4 entries
- **Why Choose Platform** (singleton) - 1 entry

## Troubleshooting

### If entries fail to create:

1. **Check Management Token**: Ensure your management token has proper permissions
2. **Verify Content Types**: All content types must exist in Contentstack
3. **Check Branch**: Ensure `cmsproject` branch/environment exists
4. **Review Errors**: The script will show specific error messages

### Common Issues:

- **"Content type not found"**: Create the content type in Contentstack first
- **"Unauthorized"**: Check your management token permissions
- **"Entry already exists"**: The script will update existing entries automatically
- **"Environment not found"**: Ensure `cmsproject` environment exists

## After Running

1. Verify entries in Contentstack dashboard
2. Check that all entries are published to `cmsproject`
3. Test your pages to ensure content is loading correctly
4. Use the Refresh button on pages to reload content

