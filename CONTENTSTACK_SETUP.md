# Contentstack Integration Setup

This project has been integrated with Contentstack CMS. Follow these steps to set up your Contentstack account and configure the application.

## Prerequisites

- Node.js and npm installed
- A Contentstack account (sign up at [contentstack.com](https://www.contentstack.com))

## Contentstack Setup

### 1. Create a Stack

1. Log in to your Contentstack account
2. Create a new stack or use an existing one
3. Note down your Stack API Key and Delivery Token

### 2. Create Content Types

Create the following content types in your Contentstack stack:

#### Hero Content Type
- **Content Type UID**: `hero`
- **Fields**:
  - `title` (Single Line Textbox)
  - `subtitle` (Single Line Textbox)
  - `description` (Multi-line Textbox)
  - `primary_button_text` (Single Line Textbox)
  - `secondary_button_text` (Single Line Textbox)
  - `trust_indicators` (Group field with `metric` and `label` sub-fields)

#### Features Content Type
- **Content Type UID**: `features`
- **Fields**:
  - `title` (Single Line Textbox)
  - `description` (Multi-line Textbox)
  - `features` (Group field with `icon`, `title`, and `description` sub-fields)

#### Video Sections Content Type
- **Content Type UID**: `video_sections`
- **Fields**:
  - `title` (Single Line Textbox)
  - `description` (Multi-line Textbox)
  - `video_placeholder` (Single Line Textbox)
  - `reverse_layout` (Boolean)

#### Use Cases Content Type
- **Content Type UID**: `use_cases`
- **Fields**:
  - `title` (Single Line Textbox)
  - `description` (Multi-line Textbox)
  - `use_cases` (Group field with `title`, `description`, and `metric` sub-fields)

### 3. Create Sample Entries

Create at least one entry for each content type with sample data to test the integration.

## Environment Configuration

### 1. Create Environment File

Create a `.env` file in the root directory with your Contentstack credentials:

```env
VITE_CONTENTSTACK_API_KEY=your_api_key_here
VITE_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
VITE_CONTENTSTACK_ENVIRONMENT=development
VITE_CONTENTSTACK_REGION=us
```

### 2. Update Configuration

Replace the placeholder values in `/src/lib/contentstack.ts` with your actual credentials:

```typescript
const Stack = Contentstack.Stack({
  api_key: 'your_actual_api_key',
  delivery_token: 'your_actual_delivery_token',
  environment: 'development', // or your environment name
  region: 'us', // or your region
});
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Features

- **Dynamic Content**: All text content is now managed through Contentstack
- **Loading States**: Components show loading skeletons while fetching data
- **Fallback Content**: If Contentstack is unavailable, the app falls back to default content
- **Type Safety**: Full TypeScript support for all Contentstack data
- **Caching**: React Query provides intelligent caching and background updates

## Content Management

- Log in to your Contentstack dashboard to manage content
- Changes are reflected on the website after publishing
- The application automatically handles content updates

## Troubleshooting

### Common Issues

1. **Content not loading**: Check your API key and delivery token
2. **CORS errors**: Ensure your domain is whitelisted in Contentstack settings
3. **Environment issues**: Verify your environment name matches Contentstack configuration

### Debug Mode

Enable debug logging by adding this to your `.env` file:
```env
VITE_DEBUG=true
```

## Support

For Contentstack-specific issues, refer to the [Contentstack documentation](https://www.contentstack.com/docs/).
