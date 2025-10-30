# Contentstack Content Models Setup Guide

## Stack Information
- **API Key**: `blt755dc6238a6bbc27`
- **Environment**: `cmsproject`

## Content Types to Create

### 1. Hero Content Type

**Content Type UID**: `hero`
**Display Name**: Hero Section

**Fields**:
- `title` (Single Line Textbox)
  - Field UID: `title`
  - Display Name: Title
  - Required: Yes
  - Default Value: "The world's best digital experiences start here"

- `subtitle` (Single Line Textbox)
  - Field UID: `subtitle`
  - Display Name: Subtitle
  - Required: Yes
  - Default Value: "✨ Introducing Agent OS - The Future of Content"

- `description` (Multi-line Textbox)
  - Field UID: `description`
  - Display Name: Description
  - Required: Yes
  - Default Value: "Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands."

- `primary_button_text` (Single Line Textbox)
  - Field UID: `primary_button_text`
  - Display Name: Primary Button Text
  - Required: Yes
  - Default Value: "Get Started Free"

- `secondary_button_text` (Single Line Textbox)
  - Field UID: `secondary_button_text`
  - Display Name: Secondary Button Text
  - Required: Yes
  - Default Value: "Watch Demo"

- `trust_indicators` (Group)
  - Field UID: `trust_indicators`
  - Display Name: Trust Indicators
  - Required: No
  - Sub-fields:
    - `metric` (Single Line Textbox) - Field UID: `metric`
    - `label` (Single Line Textbox) - Field UID: `label`

### 2. Features Content Type

**Content Type UID**: `features`
**Display Name**: Features Section

**Fields**:
- `title` (Single Line Textbox)
  - Field UID: `title`
  - Display Name: Section Title
  - Required: Yes
  - Default Value: "Welcome to the Context Economy"

- `description` (Multi-line Textbox)
  - Field UID: `description`
  - Display Name: Section Description
  - Required: Yes
  - Default Value: "One-size-fits-all digital experiences are over. Adapting to customers in the moment is critical."

- `features` (Group)
  - Field UID: `features`
  - Display Name: Features List
  - Required: No
  - Sub-fields:
    - `icon` (Single Line Textbox) - Field UID: `icon` (Values: Zap, Globe, Shield, Code, Layers, Users)
    - `title` (Single Line Textbox) - Field UID: `title`
    - `description` (Multi-line Textbox) - Field UID: `description`

### 3. Video Sections Content Type

**Content Type UID**: `video_sections`
**Display Name**: Video Sections

**Fields**:
- `title` (Single Line Textbox)
  - Field UID: `title`
  - Display Name: Section Title
  - Required: Yes

- `description` (Multi-line Textbox)
  - Field UID: `description`
  - Display Name: Section Description
  - Required: Yes

- `video_placeholder` (Single Line Textbox)
  - Field UID: `video_placeholder`
  - Display Name: Video Placeholder Text
  - Required: Yes

- `reverse_layout` (Boolean)
  - Field UID: `reverse_layout`
  - Display Name: Reverse Layout
  - Required: No
  - Default Value: false

### 4. Use Cases Content Type

**Content Type UID**: `use_cases`
**Display Name**: Use Cases Section

**Fields**:
- `title` (Single Line Textbox)
  - Field UID: `title`
  - Display Name: Section Title
  - Required: Yes
  - Default Value: "Built for Every Industry"

- `description` (Multi-line Textbox)
  - Field UID: `description`
  - Display Name: Section Description
  - Required: Yes
  - Default Value: "From e-commerce to finance, healthcare to media—The Content powers exceptional experiences across all sectors."

- `use_cases` (Group)
  - Field UID: `use_cases`
  - Display Name: Use Cases List
  - Required: No
  - Sub-fields:
    - `title` (Single Line Textbox) - Field UID: `title`
    - `description` (Multi-line Textbox) - Field UID: `description`
    - `metric` (Single Line Textbox) - Field UID: `metric`

## Sample Entries to Create

### Hero Entry
- **Title**: "The world's best digital experiences start here"
- **Subtitle**: "✨ Introducing Agent OS - The Future of Content"
- **Description**: "Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands."
- **Primary Button Text**: "Get Started Free"
- **Secondary Button Text**: "Watch Demo"
- **Trust Indicators**:
  - Metric: "10K+", Label: "Global Companies"
  - Metric: "99.99%", Label: "Uptime SLA"
  - Metric: "5B+", Label: "API Calls/Month"
  - Metric: "24/7", Label: "Expert Support"

### Features Entry
- **Title**: "Welcome to the Context Economy"
- **Description**: "One-size-fits-all digital experiences are over. Adapting to customers in the moment is critical."
- **Features**:
  - Icon: "Zap", Title: "Agent OS", Description: "Intelligent agents that adapt to user context in real-time"
  - Icon: "Globe", Title: "Omnichannel", Description: "Deliver seamlessly across web, mobile, IoT, and beyond"
  - Icon: "Shield", Title: "Enterprise Grade", Description: "SOC 2 compliant with bank-level security"
  - Icon: "Code", Title: "Developer First", Description: "Comprehensive APIs and SDKs in all major languages"
  - Icon: "Layers", Title: "Composable", Description: "Build with best-of-breed tools and integrations"
  - Icon: "Users", Title: "Collaborative", Description: "Real-time workflows for modern teams"

### Video Sections Entries
1. **Title**: "Modernize your CMS"
   - **Description**: "Create experiences faster across more channels with an easy-to-use, future-ready platform that scales with your business needs."
   - **Video Placeholder**: "Watch: Headless CMS Platform Overview"
   - **Reverse Layout**: false

2. **Title**: "AI-Powered Workflows"
   - **Description**: "Leverage intelligent automation to streamline content creation, optimize delivery, and enhance team productivity with built-in AI capabilities."
   - **Video Placeholder**: "Watch: AI Automation in Action"
   - **Reverse Layout**: true

3. **Title**: "Enterprise-Ready Security"
   - **Description**: "Built for the most demanding security requirements with SOC 2 Type II compliance, advanced encryption, and comprehensive access controls."
   - **Video Placeholder**: "Watch: Security & Compliance Overview"
   - **Reverse Layout**: false

### Use Cases Entry
- **Title**: "Built for Every Industry"
- **Description**: "From e-commerce to finance, healthcare to media—The Content powers exceptional experiences across all sectors."
- **Use Cases**:
  - Title: "E-Commerce & Retail", Description: "Create personalized shopping experiences that drive conversion and customer loyalty across all touchpoints.", Metric: "45% increase in conversion"
  - Title: "Financial Services", Description: "Deliver secure, compliant digital experiences that build trust and streamline customer journeys.", Metric: "60% faster time-to-market"
  - Title: "Healthcare & Life Sciences", Description: "Manage sensitive content with HIPAA-compliant workflows and deliver patient-centric experiences.", Metric: "99.99% uptime SLA"
  - Title: "Media & Entertainment", Description: "Scale content delivery globally with lightning-fast performance and seamless multi-device support.", Metric: "5B+ monthly requests"

## Environment Configuration

Create a `.env` file in your project root:

```env
VITE_CONTENTSTACK_API_KEY=blt755dc6238a6bbc27
VITE_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
VITE_CONTENTSTACK_ENVIRONMENT=cmsproject
VITE_CONTENTSTACK_REGION=us
```

## Next Steps

1. Log in to your Contentstack dashboard
2. Navigate to your stack with API key `blt755dc6238a6bbc27`
3. Go to the `cmsproject` environment
4. Create each content type as described above
5. Create sample entries with the provided data
6. Publish all entries
7. Get your delivery token from the stack settings
8. Update the `.env` file with your delivery token
9. Run `npm run dev` to test the integration
