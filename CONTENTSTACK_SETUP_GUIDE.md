# Contentstack Content Models Setup Guide

## Overview
This guide will help you set up all the content models and entries for "The Content" project in Contentstack.

## Contentstack Configuration
- **Stack API Key**: `blt755dc6238a6bbc27`
- **Delivery Token**: `cs05eb74f9e80cece6d90fd6e3`
- **Environment**: `cmsproject`
- **Region**: `us`

## Content Types to Create

### 1. Hero Section (`hero_section`)

**Fields:**
- `title` (Text) - Required
- `subtitle` (Text) - Required  
- `description` (Text) - Required
- `primary_button_text` (Text) - Required
- `secondary_button_text` (Text) - Required
- `trust_indicators` (Group) - Multiple
  - `metric` (Text) - Required
  - `label` (Text) - Required

**Sample Entry:**
```json
{
  "title": "The world's best digital experiences start here",
  "subtitle": "Seamlessly integrate intelligent agents, AI-powered automation, and advanced workflows—all in one platform built for the context economy.",
  "description": "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.",
  "primary_button_text": "Explore the Platform",
  "secondary_button_text": "Watch Demo",
  "trust_indicators": [
    { "metric": "10K+", "label": "Companies" },
    { "metric": "99.99%", "label": "Uptime" },
    { "metric": "5B+", "label": "API Calls" },
    { "metric": "150+", "label": "Countries" }
  ]
}
```

### 2. Features (`features`)

**Fields:**
- `title` (Text) - Required
- `description` (Text) - Required
- `features` (Group) - Multiple
  - `icon` (Text) - Required
  - `title` (Text) - Required
  - `description` (Text) - Required
  - `image` (File) - Optional

**Sample Entry:**
```json
{
  "title": "Powerful Features for Modern Teams",
  "description": "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.",
  "features": [
    {
      "icon": "zap",
      "title": "Lightning Performance",
      "description": "Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    },
    {
      "icon": "globe",
      "title": "Omnichannel Delivery",
      "description": "Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.",
      "image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    },
    {
      "icon": "shield",
      "title": "Enterprise Security",
      "description": "Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.",
      "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    },
    {
      "icon": "code",
      "title": "Developer-First APIs",
      "description": "Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.",
      "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    },
    {
      "icon": "layers",
      "title": "Composable Architecture",
      "description": "Build with best-of-breed tools using our flexible, API-first headless architecture.",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    },
    {
      "icon": "users",
      "title": "Team Collaboration",
      "description": "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
      "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
    }
  ]
}
```

### 3. About Page (`about_page`)

**Fields:**
- `title` (Text) - Required
- `subtitle` (Text) - Required
- `description` (Text) - Required
- `mission_statement` (Text) - Required
- `vision_statement` (Text) - Required
- `values` (Group) - Multiple
  - `value_title` (Text) - Required
  - `value_description` (Text) - Required
- `team_members` (Group) - Multiple
  - `name` (Text) - Required
  - `position` (Text) - Required
  - `bio` (Text) - Required
  - `photo` (File) - Optional

### 4. Career Page (`career_page`)

**Fields:**
- `title` (Text) - Required
- `subtitle` (Text) - Required
- `description` (Text) - Required
- `company_stats` (Group) - Multiple
  - `value` (Text) - Required
  - `label` (Text) - Required
- `company_history` (Group) - Multiple
  - `year` (Text) - Required
  - `title` (Text) - Required
  - `description` (Text) - Required
- `open_positions` (Group) - Multiple
  - `title` (Text) - Required
  - `location` (Text) - Required
  - `type` (Text) - Required
  - `department` (Text) - Required
  - `description` (Text) - Required
- `benefits` (Group) - Multiple
  - `title` (Text) - Required
  - `description` (Text) - Required

### 5. Video Sections (`video_sections`)

**Fields:**
- `title` (Text) - Required
- `description` (Text) - Required
- `video_sections` (Group) - Multiple
  - `title` (Text) - Required
  - `subtitle` (Text) - Required
  - `description` (Text) - Required
  - `video_url` (Text) - Required
  - `video_placeholder` (Text) - Required
  - `reverse_layout` (Boolean) - Optional

### 6. Use Cases (`use_cases`)

**Fields:**
- `title` (Text) - Required
- `description` (Text) - Required
- `use_cases` (Group) - Multiple
  - `title` (Text) - Required
  - `description` (Text) - Required
  - `metric` (Text) - Required

### 7. Pricing Plans (`pricing_plans`)

**Fields:**
- `title` (Text) - Required
- `description` (Text) - Required
- `plans` (Group) - Multiple
  - `plan_name` (Text) - Required
  - `price` (Text) - Required
  - `period` (Text) - Required
  - `description` (Text) - Required
  - `features` (Group) - Multiple
    - `feature` (Text) - Required
  - `is_popular` (Boolean) - Optional

## Setup Instructions

### Step 1: Access Contentstack Dashboard
1. Go to [Contentstack Dashboard](https://app.contentstack.com/)
2. Log in with your credentials
3. Select your stack with API key `blt755dc6238a6bbc27`

### Step 2: Create Content Types
1. Navigate to "Content Types" in the left sidebar
2. Click "Create New"
3. For each content type listed above:
   - Enter the title and UID exactly as specified
   - Add all fields with correct data types
   - Set required fields as mandatory
   - Save the content type

### Step 3: Create Entries
1. Navigate to "Entries" in the left sidebar
2. For each content type:
   - Click "Create New Entry"
   - Select the appropriate content type
   - Fill in the sample data provided above
   - Save the entry

### Step 4: Publish Entries
1. After creating entries, publish them to the `cmsproject` environment
2. Make sure all entries are published and available

### Step 5: Verify Setup
1. Check that all content types are created
2. Verify all entries are published
3. Test the React application to ensure data is loading correctly

## React Integration

The React application is already configured to work with these content types:

- **Homepage**: Uses `hero_section`, `features`, `video_sections`, `use_cases`
- **Features Page**: Uses `features` content type
- **About Page**: Uses `about_page` content type  
- **Career Page**: Uses `career_page` content type
- **Pricing Page**: Uses `pricing_plans` content type

## Troubleshooting

### Common Issues:
1. **Permission Errors**: Ensure your management token has proper permissions
2. **Environment Issues**: Make sure entries are published to the `cmsproject` environment
3. **Field Mismatches**: Ensure field names match exactly between Contentstack and React code
4. **API Key Issues**: Verify the API key and delivery token are correct

### Testing:
1. Check browser console for any API errors
2. Verify network requests are successful
3. Ensure content is loading in the React application

## Next Steps

After setting up the content models:
1. Test all pages in the React application
2. Customize content as needed in Contentstack
3. Add more entries for different content variations
4. Set up content workflows if needed

The React application will automatically fetch and display content from Contentstack once the setup is complete.
