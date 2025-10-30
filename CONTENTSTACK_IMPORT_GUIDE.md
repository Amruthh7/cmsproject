# Contentstack Import Guide

This guide will help you import all entries from your GitHub repository to Contentstack.

## Prerequisites

1. **Contentstack Account**: You need access to your Contentstack stack
2. **Stack Details**:
   - API Key: `blt755dc6238a6bbc27`
   - Environment: `cmsproject`
   - Region: `us`

## Step 1: Create Content Types

Before importing entries, you need to create the content types in Contentstack.

### 1.1 Hero Section (`hero_section`)

**Go to**: Contentstack Dashboard → Content Types → Create New

**Fields to create**:
- `title` (Single Line Textbox) - Required
- `subtitle` (Single Line Textbox) - Required
- `description` (Multi-line Textbox) - Required
- `primary_button_text` (Single Line Textbox) - Required
- `secondary_button_text` (Single Line Textbox) - Required
- `trust_indicators` (Group) - Multiple
  - `metric` (Single Line Textbox) - Required
  - `label` (Single Line Textbox) - Required

### 1.2 Features (`features`)

**Fields to create**:
- `title` (Single Line Textbox) - Required
- `description` (Multi-line Textbox) - Required
- `feature_icon` (Single Line Textbox) - Required
- `feature_title` (Single Line Textbox) - Required
- `feature_description` (Multi-line Textbox) - Required
- `feature_image` (File) - Optional

### 1.3 About Page (`about_page`)

**Fields to create**:
- `hero_title` (Single Line Textbox) - Required
- `hero_description` (Multi-line Textbox) - Required
- `mission_statement` (Multi-line Textbox) - Required
- `vision_statement` (Multi-line Textbox) - Required
- `value_title` (Single Line Textbox) - Required
- `value_description` (Multi-line Textbox) - Required
- `leader_name` (Single Line Textbox) - Required
- `leader_position` (Single Line Textbox) - Required
- `leader_bio` (Multi-line Textbox) - Required
- `leader_photo` (File) - Optional
- `team_member_name` (Single Line Textbox) - Multiple
- `team_member_position` (Single Line Textbox) - Multiple
- `team_member_bio` (Multi-line Textbox) - Multiple
- `team_member_photo` (File) - Multiple, Optional

### 1.4 Career Page (`career_page`)

**Fields to create**:
- `hero_title` (Single Line Textbox) - Required
- `hero_description` (Multi-line Textbox) - Required
- `company_stat_value` (Single Line Textbox) - Multiple
- `company_stat_label` (Single Line Textbox) - Multiple
- `company_history_year` (Single Line Textbox) - Multiple
- `company_history_title` (Single Line Textbox) - Multiple
- `company_history_description` (Multi-line Textbox) - Multiple
- `job_title` (Single Line Textbox) - Multiple
- `job_location` (Single Line Textbox) - Multiple
- `job_type` (Single Line Textbox) - Multiple
- `job_department` (Single Line Textbox) - Multiple
- `job_description` (Multi-line Textbox) - Multiple
- `benefit_title` (Single Line Textbox) - Multiple
- `benefit_description` (Multi-line Textbox) - Multiple

### 1.5 Pricing Plans (`pricing_plans`)

**Fields to create**:
- `section_title` (Single Line Textbox) - Required
- `section_description` (Multi-line Textbox) - Required
- `plan_name` (Single Line Textbox) - Required
- `price` (Single Line Textbox) - Required
- `period` (Single Line Textbox) - Required
- `plan_description` (Multi-line Textbox) - Required
- `feature` (Single Line Textbox) - Multiple
- `is_popular` (Boolean) - Required

### 1.6 Trust Indicators (`trust_indicators`)

**Fields to create**:
- `metric_value` (Single Line Textbox) - Required
- `label` (Single Line Textbox) - Required

### 1.7 Use Cases (`use_cases`)

**Fields to create**:
- `section_title` (Single Line Textbox) - Required
- `section_description` (Multi-line Textbox) - Required
- `title` (Single Line Textbox) - Required
- `description` (Multi-line Textbox) - Required
- `metric` (Single Line Textbox) - Required

## Step 2: Import Entries

### 2.1 Hero Section Entry

1. **Go to**: Content → hero_section → Create New Entry
2. **Copy content from**: `entries/hero-section-entry.json`
3. **Fill in the fields**:
   - Title: "Hero Section"
   - Copy all other fields from the JSON file
4. **Save and Publish** to `cmsproject` environment

### 2.2 About Page Entry

1. **Go to**: Content → about_page → Create New Entry
2. **Copy content from**: `entries/about-page-entry.json`
3. **Fill in the fields**:
   - Title: "About Page"
   - Copy all other fields from the JSON file
4. **Save and Publish** to `cmsproject` environment

### 2.3 Career Page Entry

1. **Go to**: Content → career_page → Create New Entry
2. **Copy content from**: `entries/career-page-entry.json`
3. **Fill in the fields**:
   - Title: "Career Page"
   - Copy all other fields from the JSON file
4. **Save and Publish** to `cmsproject` environment

### 2.4 Features Entries (6 entries)

1. **Go to**: Content → features → Create New Entry
2. **Import each file**:
   - `entries/features-entry-1.json`
   - `entries/features-entry-2.json`
   - `entries/features-entry-3.json`
   - `entries/features-entry-4.json`
   - `entries/features-entry-5.json`
   - `entries/features-entry-6.json`
3. **For each entry**:
   - Create new entry
   - Copy content from JSON file
   - Save and Publish to `cmsproject` environment

### 2.5 Pricing Plans Entries (3 entries)

1. **Go to**: Content → pricing_plans → Create New Entry
2. **Import each file**:
   - `entries/pricing-plans-entry-1.json`
   - `entries/pricing-plans-entry-2.json`
   - `entries/pricing-plans-entry-3.json`
3. **For each entry**:
   - Create new entry
   - Copy content from JSON file
   - Save and Publish to `cmsproject` environment

### 2.6 Trust Indicators Entries (4 entries)

1. **Go to**: Content → trust_indicators → Create New Entry
2. **Import each file**:
   - `entries/trust-indicators-entry-1.json`
   - `entries/trust-indicators-entry-2.json`
   - `entries/trust-indicators-entry-3.json`
   - `entries/trust-indicators-entry-4.json`
3. **For each entry**:
   - Create new entry
   - Copy content from JSON file
   - Save and Publish to `cmsproject` environment

### 2.7 Use Cases Entries (4 entries)

1. **Go to**: Content → use_cases → Create New Entry
2. **Import each file**:
   - `entries/use-cases-entry-1.json`
   - `entries/use-cases-entry-2.json`
   - `entries/use-cases-entry-3.json`
   - `entries/use-cases-entry-4.json`
3. **For each entry**:
   - Create new entry
   - Copy content from JSON file
   - Save and Publish to `cmsproject` environment

## Step 3: Verify Import

1. **Test API Connection**:
   - Go to your app: `http://localhost:5173/test-contentstack`
   - Click "Test Direct API"
   - Verify all entries are returned

2. **Check Pages**:
   - Visit `/about` - should show dynamic content
   - Visit `/career` - should show dynamic content
   - Visit `/features` - should show dynamic content
   - Visit `/pricing` - should show dynamic content

## Important Notes

- **Environment**: All entries MUST be published to `cmsproject` environment
- **Publishing**: Draft entries won't be visible via API
- **Images**: Some entries reference external images - these will work as fallbacks
- **HTML Content**: Some fields contain HTML - this is normal and will be cleaned by the app

## Troubleshooting

If entries don't appear:
1. Check that entries are published to `cmsproject` environment
2. Verify content type names match exactly
3. Use the test page to debug API calls
4. Check browser console for error messages

## Quick Import Checklist

- [ ] Create all 7 content types
- [ ] Import hero section entry
- [ ] Import about page entry  
- [ ] Import career page entry
- [ ] Import 6 features entries
- [ ] Import 3 pricing plans entries
- [ ] Import 4 trust indicators entries
- [ ] Import 4 use cases entries
- [ ] Publish ALL entries to `cmsproject` environment
- [ ] Test API connection
- [ ] Verify all pages show dynamic content
