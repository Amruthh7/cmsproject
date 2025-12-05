# Complete Content Types Explanation

This document explains all Contentstack content types used in this project, their data structures, how they're fetched, and why fallback data exists.

---

## 📋 Table of Contents

1. [Hero Section](#1-hero-section)
2. [Features](#2-features)
3. [Video Sections](#3-video-sections)
4. [Use Cases](#4-use-cases)
5. [Trust Indicators](#5-trust-indicators)
6. [About Page](#6-about-page)
7. [Career Page](#7-career-page)
8. [Pricing Plans](#8-pricing-plans)
9. [Why Choose Platform](#9-why-choose-platform)

---

## 1. Hero Section

### **Content Type Name:** `hero_section`

### **Purpose:**
Displays the main hero/banner section on the homepage with title, subtitle, description, CTA buttons, and trust indicators.

### **Data Structure:**
```typescript
interface HeroContent {
  title: string;                    // Main headline
  subtitle: string;                 // Sub-headline
  description: string;              // Hero description text
  primary_button_text: string;      // Primary CTA button text
  secondary_button_text: string;    // Secondary CTA button text
  trust_indicators: Array<{         // Trust metrics (e.g., "10K+ Companies")
    metric: string;                  // The number/value
    label: string;                  // The label (e.g., "Global Companies")
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 137-165 in contentstackService.ts
async getHeroContent(): Promise<HeroContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/hero_section/entries
  
  // Fetches the FIRST entry from Contentstack
  // If no entry exists, returns null
  // Component then uses hardcoded fallback
}
```

### **Fallback Data:**
If Contentstack returns `null` or no entry exists, the component uses:
- Title: "The world's best digital experiences start here"
- Subtitle: "✨ Introducing Agent OS - The Future of Content"
- Description: "Create, manage, and deliver exceptional content experiences..."
- Primary Button: "Get Started Free"
- Secondary Button: "Watch Demo"
- Trust Indicators: 4 default metrics (10K+ Companies, 99.99% Uptime, etc.)

### **Why Fallback Exists:**
- Ensures the homepage always displays content, even if Contentstack is unavailable
- Provides default content during initial setup before CMS entries are created
- Prevents blank/error pages

### **Contentstack Fields Required:**
- `title` (Single Line Textbox)
- `subtitle` (Single Line Textbox)
- `description` (Multiple Line Textbox)
- `primary_button_text` (Single Line Textbox)
- `secondary_button_text` (Single Line Textbox)
- `trust_indicators` (Group field with `metric` and `label` sub-fields, or JSON field)

---

## 2. Features

### **Content Type Name:** `features`

### **Purpose:**
Displays a list of platform features with icons, titles, and descriptions on the Features page.

### **Data Structure:**
```typescript
interface FeatureContent {
  title: string;                    // Section title (e.g., "Powerful Features")
  description: string;              // Section description
  features: Array<{
    icon: string;                   // Icon name (e.g., "zap", "shield", "globe")
    title: string;                   // Feature title
    description: string;             // Feature description (HTML cleaned)
    image?: { url: string };        // Optional feature image
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 168-320 in contentstackService.ts
async getFeaturesContent(): Promise<FeatureContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/features/entries
  
  // Handles TWO data structures:
  
  // Structure 1: Single entry with arrays (NEW)
  // - feature_title: ["Feature 1", "Feature 2", ...]
  // - feature_description: ["Desc 1", "Desc 2", ...]
  // - feature_icon: ["zap", "shield", ...]
  
  // Structure 2: Multiple entries (OLD)
  // - Each entry is one feature
  // - Each entry has: feature_title, feature_description, feature_icon
}
```

### **Special Logic:**
1. **Icon Mapping:** If `feature_icon` is empty, automatically assigns icons based on keywords:
   - "security" → `shield`
   - "performance" → `zap`
   - "delivery" → `globe`
   - "api" → `code`
   - etc.

2. **HTML Cleaning:** Removes `<p>`, `<h3>`, and other HTML tags from descriptions

3. **Array Mapping:** Maps parallel arrays (titles, descriptions, icons) into feature objects

### **Fallback Data:**
If no features are found, returns 6 default features:
- Lightning Performance
- Omnichannel Delivery
- Enterprise Security
- Developer-First APIs
- Composable Architecture
- Team Collaboration

### **Why Fallback Exists:**
- Ensures Features page always shows content
- Provides example features during development
- Prevents empty page if Contentstack data is missing

### **Contentstack Fields Required:**
**Option 1 (Recommended - Single Entry with Arrays):**
- `title` (Single Line Textbox)
- `description` (Multiple Line Textbox)
- `feature_title` (Multiple Line Textbox - Multiple)
- `feature_description` (Multiple Line Textbox - Multiple)
- `feature_icon` (Single Line Textbox - Multiple, optional)

**Option 2 (Multiple Entries):**
- Each entry needs:
  - `feature_title` (Single Line Textbox)
  - `feature_description` (Multiple Line Textbox)
  - `feature_icon` (Single Line Textbox, optional)

---

## 3. Video Sections

### **Content Type Name:** `video_sections`

### **Purpose:**
Displays video sections on the homepage with alternating left/right layouts.

### **Data Structure:**
```typescript
interface VideoSectionContent {
  title: string;                    // Section title
  description: string;             // Section description
  video_placeholder: string;        // Video placeholder text or URL
  reverse_layout: boolean;          // If true, image on right, text on left
}
```

### **How It's Fetched:**
```typescript
// Line 323-365 in contentstackService.ts
async getVideoSectionsContent(): Promise<VideoSectionContent[]> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/video_sections/entries
  
  // Returns ARRAY of video sections
  // Each entry becomes one video section
  // If no entries, returns 3 default sections
}
```

### **Fallback Data:**
Returns 3 default video sections if no entries found:
1. "Modernize your CMS" (normal layout)
2. "AI-Powered Workflows" (reverse layout)
3. "Enterprise-Ready Security" (normal layout)

### **Why Fallback Exists:**
- Homepage needs multiple video sections for visual variety
- Ensures consistent layout even without CMS data
- Provides example content structure

### **Contentstack Fields Required:**
- `title` (Single Line Textbox)
- `description` (Multiple Line Textbox)
- `video_placeholder` (Single Line Textbox)
- `reverse_layout` (Boolean/Checkbox)

---

## 4. Use Cases

### **Content Type Name:** `use_cases`

### **Purpose:**
Shows how different industries/companies use the platform with metrics.

### **Data Structure:**
```typescript
interface UseCaseContent {
  title: string;                    // Section title (e.g., "Trusted by Industry Leaders")
  description: string;              // Section description
  use_cases: Array<{
    title: string;                   // Use case title
    description: string;             // Use case description
    metric: string;                  // Metric (e.g., "50% faster")
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 368-400 in contentstackService.ts
async getUseCasesContent(): Promise<UseCaseContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/use_cases/entries
  
  // Looks for entry with section_title (main entry)
  // Collects all entries with title + description as use cases
  // If no entries, returns null
}
```

### **Special Logic:**
- Finds the main entry (has `section_title` field)
- Collects all other entries as individual use cases
- Filters out entries without both `title` and `description`

### **Fallback Data:**
Returns `null` if no entries found (component handles gracefully)

### **Why Fallback Exists:**
- Use cases are optional content
- Component can display without use cases section
- Prevents errors if section is not yet configured

### **Contentstack Fields Required:**
**Main Entry:**
- `section_title` (Single Line Textbox)
- `section_description` (Multiple Line Textbox)

**Use Case Entries:**
- `title` (Single Line Textbox)
- `description` (Multiple Line Textbox)
- `metric` (Single Line Textbox, optional)

---

## 5. Trust Indicators

### **Content Type Name:** `trust_indicators`

### **Purpose:**
Displays trust metrics/statistics (e.g., "10K+ Companies", "99.99% Uptime").

### **Data Structure:**
```typescript
interface TrustIndicator {
  metric_value: string;            // The metric (e.g., "10K+", "99.99%")
  label: string;                    // The label (e.g., "Global Companies", "Uptime SLA")
}
```

### **How It's Fetched:**
```typescript
// Line 403-422 in contentstackService.ts
async getTrustIndicators(): Promise<Array<{ metric_value: string; label: string }>> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/trust_indicators/entries
  
  // Returns ARRAY of trust indicators
  // Each entry becomes one indicator
  // Filters out entries without both metric_value and label
  // If no entries, returns empty array []
}
```

### **Fallback Data:**
Returns empty array `[]` if no entries found (component handles gracefully)

### **Why Fallback Exists:**
- Trust indicators are optional
- Component can display without indicators
- Empty array prevents errors

### **Contentstack Fields Required:**
- `metric_value` (Single Line Textbox)
- `label` (Single Line Textbox)

---

## 6. About Page

### **Content Type Name:** `about_page`

### **Purpose:**
Displays comprehensive about page content including mission, vision, values, team members, and leaders.

### **Data Structure:**
```typescript
interface AboutPageContent {
  title: string;                    // Hero title
  subtitle: string;                 // Hero subtitle
  description: string;              // Hero description
  mission_statement: string;        // Mission statement
  vision_statement: string;         // Vision statement
  values: Array<{
    value_title: string;            // Value name
    value_description: string;       // Value description
  }>;
  manager?: string;                 // Manager name
  manager_position?: string;        // Manager position
  manager_bio?: string;             // Manager bio
  manager_photo?: string;           // Manager photo URL
  leader_name?: string;             // Leader name (can be array)
  leader_position?: string;         // Leader position (can be array)
  leader_bio?: string;             // Leader bio (can be array)
  leader_photo?: string;           // Leader photo URL (can be array)
  team_members: Array<{
    name: string;                   // Team member name
    position: string;               // Team member position
    bio: string;                    // Team member bio
    photo?: string;                 // Team member photo URL
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 441-635 in contentstackService.ts
async getAboutPageContent(): Promise<AboutPageContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/about_page/entries
  
  // Finds entry with hero_title (main entry)
  // Handles BOTH single values AND arrays for:
  // - leader_name, leader_position, leader_bio, leader_photo
  // - team_member_name, team_member_position, team_member_bio
  
  // Special photo handling:
  // - Supports individual photo fields: team_member_photoo, team_pic_4, team_member_photo2
  // - Also supports array of photos: team_member_photo[]
  // - Maps photos by index to team members
}
```

### **Special Logic:**
1. **Photo URL Extraction:** Handles multiple photo formats:
   - String URLs
   - Objects with `url` property
   - Objects with `download_url` property

2. **HTML Cleaning:** Removes HTML tags and entities from bios using `cleanBio()` function

3. **Array Handling:** Supports both single values and arrays for team members/leaders

4. **Photo Mapping:** Maps individual photo fields to team members by index:
   - `team_member_photoo` → Team member 1
   - `team_pic_4` → Team member 2
   - `team_member_photo2` → Team member 3
   - `team_member_photo[3]` → Team member 4

### **Fallback Data:**
Returns `null` if no entries found (component handles gracefully with default content)

### **Why Fallback Exists:**
- About page has complex structure
- Component can display with minimal data
- Prevents errors during initial setup

### **Contentstack Fields Required:**
**Main Fields:**
- `hero_title` (Single Line Textbox)
- `hero_description` (Multiple Line Textbox)
- `mission_statement` (Multiple Line Textbox)
- `vision_statement` (Multiple Line Textbox)

**Manager Fields:**
- `manager` (Single Line Textbox)
- `manager_position` (Single Line Textbox)
- `manager_bio` (Multiple Line Textbox)
- `manager_photo` (File/Asset)

**Leader Fields (can be single or multiple):**
- `leader_name` (Single Line Textbox - Single or Multiple)
- `leader_position` (Single Line Textbox - Single or Multiple)
- `leader_bio` (Multiple Line Textbox - Single or Multiple)
- `leader_photo` (File/Asset - Single or Multiple)

**Team Member Fields (arrays):**
- `team_member_name` (Single Line Textbox - Multiple)
- `team_member_position` (Single Line Textbox - Multiple)
- `team_member_bio` (Multiple Line Textbox - Multiple)
- `team_member_photo` (File/Asset - Multiple, optional)
- `team_member_photoo` (File/Asset - Individual field for member 1)
- `team_pic_4` (File/Asset - Individual field for member 2)
- `team_member_photo2` (File/Asset - Individual field for member 3)

**Values:**
- `value_title` (Single Line Textbox)
- `value_description` (Multiple Line Textbox)

---

## 7. Career Page

### **Content Type Name:** `career_page`

### **Purpose:**
Displays career page content including company stats, history timeline, open positions, and benefits.

### **Data Structure:**
```typescript
interface CareerPageContent {
  title: string;                    // Hero title
  subtitle: string;                // Hero subtitle
  description: string;             // Hero description
  company_stats: Array<{
    value: string;                  // Stat value (e.g., "150+")
    label: string;                 // Stat label (e.g., "Team Members")
  }>;
  company_history: Array<{
    year: string;                  // Year (e.g., "2020")
    title: string;                // Milestone title
    description: string;           // Milestone description
  }>;
  open_positions: Array<{
    title: string;                 // Job title
    location: string;              // Job location
    type: string;                 // Job type (e.g., "Full-time")
    department: string;           // Department
    description: string;          // Job description
  }>;
  benefits: Array<{
    title: string;                // Benefit title
    description: string;          // Benefit description
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 638-784 in contentstackService.ts
async getCareerPageContent(): Promise<CareerPageContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/career_page/entries
  
  // Handles ARRAY-based fields:
  // - company_history_year[], company_history_title[], company_history_description[]
  // - job_title[], job_location[], job_type[], job_department[], job_description[]
  // - benefit_title[], benefit_description[]
  // - company_stat_value[], company_stat_label[]
  
  // Maps parallel arrays into objects
  // Cleans HTML from all text fields
}
```

### **Special Logic:**
1. **Array Mapping:** Maps parallel arrays into structured objects:
   ```typescript
   // Contentstack has:
   company_history_year: ["2020", "2021", "2022"]
   company_history_title: ["Title 1", "Title 2", "Title 3"]
   company_history_description: ["Desc 1", "Desc 2", "Desc 3"]
   
   // Code creates:
   [
     { year: "2020", title: "Title 1", description: "Desc 1" },
     { year: "2021", title: "Title 2", description: "Desc 2" },
     { year: "2022", title: "Title 3", description: "Desc 3" }
   ]
   ```

2. **HTML Cleaning:** Uses `cleanText()` to remove HTML tags and entities

3. **Single vs Array:** Handles both single values and arrays for flexibility

### **Fallback Data:**
If `careerContent` is `null` or arrays are empty, component uses hardcoded fallbacks:

**Company History (5 items):**
- 2020: "The Beginning"
- 2021: "First Breakthrough"
- 2022: "Global Expansion"
- 2023: "Security Milestone"
- 2024: "Platform Evolution"

**Open Positions (6 items):**
- Senior Frontend Developer
- Product Manager
- DevOps Engineer
- UX Designer
- Sales Engineer
- Content Marketing Manager

**Benefits (6 items):**
- Health & Wellness
- Flexible Time Off
- Learning & Development
- Remote First
- Team Events
- Equity Program

**Company Stats (4 items):**
- 150+ Team Members
- 50+ Countries
- 4.9 Glassdoor Rating
- 99% Employee Satisfaction

### **Why Fallback Exists:**
- Career page has many sections that need content
- Ensures page is always functional
- Provides example content structure
- Prevents blank sections

### **Contentstack Fields Required:**
**Hero Fields:**
- `hero_title` (Single Line Textbox)
- `hero_description` (Multiple Line Textbox)

**Company History (Arrays):**
- `company_history_year` (Single Line Textbox - Multiple)
- `company_history_title` (Single Line Textbox - Multiple)
- `company_history_description` (Multiple Line Textbox - Multiple)

**Open Positions (Arrays):**
- `job_title` (Single Line Textbox - Multiple)
- `job_location` (Single Line Textbox - Multiple)
- `job_type` (Single Line Textbox - Multiple)
- `job_department` (Single Line Textbox - Multiple)
- `job_description` (Multiple Line Textbox - Multiple)

**Benefits (Arrays):**
- `benefit_title` (Single Line Textbox - Multiple)
- `benefit_description` (Multiple Line Textbox - Multiple)

**Company Stats (Arrays):**
- `company_stat_value` (Single Line Textbox - Multiple)
- `company_stat_label` (Single Line Textbox - Multiple)

---

## 8. Pricing Plans

### **Content Type Name:** `pricing_plans`

### **Purpose:**
Displays pricing plans with features, prices, and descriptions.

### **Data Structure:**
```typescript
interface PricingPlansContent {
  title: string;                    // Section title
  description: string;              // Section description (HTML cleaned)
  plans: Array<{
    plan_name: string;              // Plan name (e.g., "Starter")
    price: string;                  // Price (e.g., "$99")
    period: string;                 // Period (e.g., "/month", "/year")
    description: string;            // Plan description (HTML cleaned)
    features: Array<{
      feature: string;              // Feature text
    }>;
    is_popular: boolean;            // If true, highlights this plan
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 787-992 in contentstackService.ts
async getPricingPlansContent(): Promise<PricingPlansContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/pricing_plans/entries
  
  // Handles THREE data structures:
  
  // Structure 1: Group field (single entry with nested plans)
  // - plans: [{ plan_name, price, period, description, features, is_popular }, ...]
  
  // Structure 2: Arrays (single entry with parallel arrays)
  // - plan_name: ["Plan 1", "Plan 2", ...]
  // - price: ["$99", "$199", ...]
  // - period: ["/month", "/month", ...]
  // - feature: ["Feature 1", "Feature 2", ...] (distributed across plans)
  
  // Structure 3: Multiple entries (one entry per plan)
  // - Each entry is one plan
  // - Each entry has: plan_name, price, period, description, features
}
```

### **Special Logic:**
1. **Feature Distribution (Structure 2):**
   - If features are in a single array, distributes them evenly across plans
   - Example: 12 features, 3 plans → 4 features per plan

2. **HTML Cleaning:**
   - Removes `<p>` tags from description
   - Converts `<ul><li>` to bullet points
   - Cleans all HTML entities

3. **Plan Deduplication (Structure 3):**
   - Uses `Map` to prevent duplicate plans
   - Merges features if same plan name appears multiple times

### **Fallback Data:**
Returns `null` if no entries found (component handles gracefully)

### **Why Fallback Exists:**
- Pricing is critical content
- Component can display with empty plans array
- Prevents errors during setup

### **Contentstack Fields Required:**
**Option 1 (Recommended - Group Field):**
- `section_title` (Single Line Textbox)
- `section_description` (Multiple Line Textbox)
- `plans` (Group field - Multiple, with sub-fields):
  - `plan_name` (Single Line Textbox)
  - `price` (Single Line Textbox)
  - `period` (Single Line Textbox)
  - `description` (Multiple Line Textbox)
  - `features` (Single Line Textbox - Multiple, or Group field)
  - `is_popular` (Boolean/Checkbox)

**Option 2 (Arrays):**
- `section_title` (Single Line Textbox)
- `section_description` (Multiple Line Textbox)
- `plan_name` (Single Line Textbox - Multiple)
- `price` (Single Line Textbox - Multiple)
- `period` (Single Line Textbox - Multiple)
- `plan_description` (Multiple Line Textbox - Multiple)
- `feature` (Single Line Textbox - Multiple)
- `is_popular` (Boolean/Checkbox - Multiple)

**Option 3 (Multiple Entries):**
- Each entry needs:
  - `plan_name` (Single Line Textbox)
  - `price` (Single Line Textbox)
  - `period` (Single Line Textbox)
  - `plan_description` or `description` (Multiple Line Textbox)
  - `features` (Single Line Textbox - Multiple, or Group field)
  - `is_popular` (Boolean/Checkbox)

---

## 9. Why Choose Platform

### **Content Type Name:** `why_choose_platform`

### **Purpose:**
Displays benefits/reasons to choose the platform with icons and colors.

### **Data Structure:**
```typescript
interface WhyChoosePlatformContent {
  title: string;                    // Section title
  description: string;               // Section description
  benefits: Array<{
    title: string;                  // Benefit title
    description?: string;           // Benefit description (optional)
    icon?: string;                  // Icon name (e.g., "shield", "zap")
    color?: string;                 // Color name (e.g., "green", "blue")
  }>;
}
```

### **How It's Fetched:**
```typescript
// Line 995-1066 in contentstackService.ts
async getWhyChoosePlatformContent(): Promise<WhyChoosePlatformContent | null> {
  // API Endpoint:
  // https://cdn.contentstack.io/v3/content_types/why_choose_platform/entries
  
  // Handles ARRAY-based structure:
  // - benefit_title: ["Benefit 1", "Benefit 2", ...]
  // - benefit_description: ["Desc 1", "Desc 2", ...]
  // - benefit_icon: ["shield", "zap", ...]
  // - benefit_color: ["green", "blue", ...]
  
  // Maps parallel arrays into benefit objects
}
```

### **Special Logic:**
1. **Icon Defaults:** If `benefit_icon` is empty, defaults to `"checkcircle"`

2. **Color Mapping:** If `benefit_color` is empty, automatically assigns colors based on keywords:
   - "uptime", "sla", "reliability" → `green`
   - "security", "safe", "encrypt" → `blue`
   - "support", "help", "service" → `purple`
   - "cdn", "delivery", "speed" → `pink`
   - Otherwise cycles through: `['green', 'blue', 'purple', 'pink']`

3. **HTML Cleaning:** Removes HTML tags from descriptions

### **Fallback Data:**
Returns `null` if no entries found (component handles gracefully)

### **Why Fallback Exists:**
- This section is optional
- Component can display without it
- Prevents errors if not configured

### **Contentstack Fields Required:**
- `title` (Single Line Textbox)
- `description` (Multiple Line Textbox)
- `benefit_title` (Single Line Textbox - Multiple)
- `benefit_description` (Multiple Line Textbox - Multiple, optional)
- `benefit_icon` (Single Line Textbox - Multiple, optional)
- `benefit_color` (Single Line Textbox - Multiple, optional)

---

## 🔑 Key Patterns Across All Content Types

### **1. Fallback Pattern:**
```typescript
const data = contentstackData || fallbackData;
```
- All content types have fallback data
- Prevents blank pages
- Ensures graceful degradation

### **2. HTML Cleaning:**
- Most content types clean HTML from descriptions
- Removes `<p>`, `<h3>`, and other tags
- Converts HTML entities (`&nbsp;`, `&amp;`, etc.)

### **3. Array Handling:**
- Many content types support both single values and arrays
- Arrays are mapped into structured objects
- Parallel arrays are combined by index

### **4. Error Handling:**
- All functions use `try-catch`
- Return `null` or empty arrays on error
- Log errors to console for debugging

### **5. Default Values:**
- Icon defaults based on keywords
- Color defaults based on keywords
- Text defaults to empty strings

---

## 📝 Summary

| Content Type | Structure | Fallback | Special Logic |
|-------------|-----------|----------|---------------|
| **hero_section** | Single entry | ✅ Yes | Trust indicators array |
| **features** | Single entry (arrays) or Multiple entries | ✅ Yes | Icon mapping, HTML cleaning |
| **video_sections** | Multiple entries | ✅ Yes | Reverse layout toggle |
| **use_cases** | Multiple entries | ❌ No | Main entry + use case entries |
| **trust_indicators** | Multiple entries | ❌ No | Simple metric + label |
| **about_page** | Single entry (complex) | ❌ No | Photo mapping, array handling |
| **career_page** | Single entry (arrays) | ✅ Yes | Array mapping, HTML cleaning |
| **pricing_plans** | 3 structures supported | ❌ No | Feature distribution, plan deduplication |
| **why_choose_platform** | Single entry (arrays) | ❌ No | Icon/color defaults, keyword mapping |

---

## 🚀 Next Steps

1. **Create Content Types in Contentstack** using the field requirements above
2. **Create Entries** with the required fields
3. **Publish Entries** to your environment
4. **Test API** using the endpoints shown in each section
5. **Verify Data** appears correctly in the React components

---

**Last Updated:** 2025-01-31


