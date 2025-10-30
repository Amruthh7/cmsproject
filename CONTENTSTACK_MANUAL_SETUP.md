# Contentstack Content Types Setup Guide

## Content Types to Create Manually

### 1. Hero Section (`hero_section`)
**Fields:**
- Title (Text, mandatory, unique)
- Subtitle (Text, mandatory)
- Description (Text, mandatory)
- Primary Button Text (Text, mandatory)
- Secondary Button Text (Text, mandatory)

### 2. Features (`features`)
**Fields:**
- Title (Text, mandatory, unique)
- Description (Text, mandatory)
- Feature Title (Text, mandatory) - You'll create multiple entries for each feature
- Feature Description (Text, mandatory)
- Feature Icon (Text, mandatory) - e.g., "Zap", "Globe", "Shield"
- Feature Image (Text, optional) - URL or file reference

### 3. About Page (`about_page`)
**Fields:**
- Hero Title (Text, mandatory, unique)
- Hero Description (Text, mandatory)
- Mission Statement (Text, mandatory)
- Vision Statement (Text, mandatory)
- Value Title (Text, mandatory) - Multiple entries for each value
- Value Description (Text, mandatory)
- Leader Name (Text, mandatory) - Multiple entries for leadership
- Leader Position (Text, mandatory)
- Leader Bio (Text, mandatory)
- Leader Photo (Text, optional)
- Team Member Name (Text, mandatory) - Multiple entries for team
- Team Member Position (Text, mandatory)
- Team Member Bio (Text, mandatory)
- Team Member Photo (Text, optional)

### 4. Career Page (`career_page`)
**Fields:**
- Hero Title (Text, mandatory, unique)
- Hero Description (Text, mandatory)
- Company History Year (Text, mandatory) - Multiple entries
- Company History Title (Text, mandatory)
- Company History Description (Text, mandatory)
- Job Title (Text, mandatory) - Multiple entries
- Job Location (Text, mandatory)
- Job Type (Text, mandatory)
- Job Department (Text, mandatory)
- Job Description (Text, mandatory)
- Benefit Title (Text, mandatory) - Multiple entries
- Benefit Description (Text, mandatory)
- Company Stat Value (Text, mandatory) - Multiple entries
- Company Stat Label (Text, mandatory)

### 5. Pricing Plans (`pricing_plans`)
**Fields:**
- Section Title (Text, mandatory, unique)
- Section Description (Text, mandatory)
- Plan Name (Text, mandatory) - Multiple entries
- Price (Text, mandatory)
- Period (Text, mandatory)
- Plan Description (Text, mandatory)
- Feature (Text, mandatory) - Multiple entries per plan
- Is Popular (Boolean, optional)

### 6. Trust Indicators (`trust_indicators`)
**Fields:**
- Metric Value (Text, mandatory) - Multiple entries
- Label (Text, mandatory)

### 7. Use Cases (`use_cases`)
**Fields:**
- Section Title (Text, mandatory, unique)
- Section Description (Text, mandatory)
- Title (Text, mandatory) - Multiple entries
- Description (Text, mandatory)
- Metric (Text, mandatory)

## Steps to Create in Contentstack Dashboard:

1. Go to **Content Types** in your stack
2. Click **+ New Content Type**
3. Enter the Title and UID for each content type
4. Add fields one by one using the **Add Field** button
5. Set field properties (mandatory, unique, etc.)
6. Save the content type
7. Repeat for all 7 content types

## Alternative: Use Contentstack Management API

If you have API access, you can use the Management API to create content types programmatically.

