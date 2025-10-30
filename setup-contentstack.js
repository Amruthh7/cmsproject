#!/usr/bin/env node

/**
 * Contentstack Content Models Setup Script
 * This script creates all the required content types and sample entries
 * 
 * Prerequisites:
 * 1. Install contentstack-management-sdk: npm install contentstack-management-sdk
 * 2. Get your management token from Contentstack dashboard
 * 3. Update the configuration below with your credentials
 */

const ContentstackManagement = require('@contentstack/management');

// Configuration
const config = {
  apiKey: 'blt755dc6238a6bbc27',
  managementToken: 'your_management_token_here', // Get this from Contentstack dashboard
  environment: 'cmsproject',
  region: 'us'
};

const client = ContentstackManagement.client({
  authtoken: config.managementToken,
  region: config.region
});

const stack = client.stack(config.apiKey);

// Content Types Definitions
const contentTypes = [
  {
    content_type: {
      title: 'Hero Section',
      uid: 'hero',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "The world's best digital experiences start here"
          }
        },
        {
          display_name: 'Subtitle',
          uid: 'subtitle',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "✨ Introducing Agent OS - The Future of Content"
          }
        },
        {
          display_name: 'Description',
          uid: 'description',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands."
          }
        },
        {
          display_name: 'Primary Button Text',
          uid: 'primary_button_text',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "Get Started Free"
          }
        },
        {
          display_name: 'Secondary Button Text',
          uid: 'secondary_button_text',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "Watch Demo"
          }
        },
        {
          display_name: 'Trust Indicators',
          uid: 'trust_indicators',
          data_type: 'group',
          mandatory: false,
          schema: [
            {
              display_name: 'Metric',
              uid: 'metric',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Label',
              uid: 'label',
              data_type: 'text',
              mandatory: true
            }
          ]
        }
      ]
    }
  },
  {
    content_type: {
      title: 'Features Section',
      uid: 'features',
      schema: [
        {
          display_name: 'Section Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "Welcome to the Context Economy"
          }
        },
        {
          display_name: 'Section Description',
          uid: 'description',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "One-size-fits-all digital experiences are over. Adapting to customers in the moment is critical."
          }
        },
        {
          display_name: 'Features List',
          uid: 'features',
          data_type: 'group',
          mandatory: false,
          schema: [
            {
              display_name: 'Icon',
              uid: 'icon',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Title',
              uid: 'title',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Description',
              uid: 'description',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Image',
              uid: 'image',
              data_type: 'file',
              mandatory: false
            }
          ]
        }
      ]
    }
  },
  {
    content_type: {
      title: 'Video Sections',
      uid: 'video_sections',
      schema: [
        {
          display_name: 'Section Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Section Description',
          uid: 'description',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Video Placeholder Text',
          uid: 'video_placeholder',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Reverse Layout',
          uid: 'reverse_layout',
          data_type: 'boolean',
          mandatory: false,
          field_metadata: {
            _default: false
          }
        }
      ]
    }
  },
  {
    content_type: {
      title: 'Use Cases Section',
      uid: 'use_cases',
      schema: [
        {
          display_name: 'Section Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "Built for Every Industry"
          }
        },
        {
          display_name: 'Section Description',
          uid: 'description',
          data_type: 'text',
          mandatory: true,
          field_metadata: {
            _default: "From e-commerce to finance, healthcare to media—The Content powers exceptional experiences across all sectors."
          }
        },
        {
          display_name: 'Use Cases List',
          uid: 'use_cases',
          data_type: 'group',
          mandatory: false,
          schema: [
            {
              display_name: 'Title',
              uid: 'title',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Description',
              uid: 'description',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Metric',
              uid: 'metric',
              data_type: 'text',
              mandatory: true
            }
          ]
        }
      ]
    }
  }
];

// Sample Entries Data
const sampleEntries = {
  hero: {
    title: "The world's best digital experiences start here",
    subtitle: "✨ Introducing Agent OS - The Future of Content",
    description: "Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands.",
    primary_button_text: "Get Started Free",
    secondary_button_text: "Watch Demo",
    trust_indicators: [
      { metric: "10K+", label: "Global Companies" },
      { metric: "99.99%", label: "Uptime SLA" },
      { metric: "5B+", label: "API Calls/Month" },
      { metric: "24/7", label: "Expert Support" }
    ]
  },
  features: {
    title: "Welcome to the Context Economy",
    description: "One-size-fits-all digital experiences are over. Adapting to customers in the moment is critical.",
    features: [
      { 
        icon: "zap", 
        title: "Lightning Performance", 
        description: "Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      },
      { 
        icon: "globe", 
        title: "Omnichannel Delivery", 
        description: "Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      },
      { 
        icon: "shield", 
        title: "Enterprise Security", 
        description: "Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      },
      { 
        icon: "code", 
        title: "Developer-First APIs", 
        description: "Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      },
      { 
        icon: "layers", 
        title: "Composable Architecture", 
        description: "Build with best-of-breed tools using our flexible, API-first headless architecture.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      },
      { 
        icon: "users", 
        title: "Team Collaboration", 
        description: "Empower teams with intuitive workflows, version control, and real-time collaboration tools.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
      }
    ]
  },
  video_sections: [
    {
      title: "Modernize your CMS",
      description: "Create experiences faster across more channels with an easy-to-use, future-ready platform that scales with your business needs.",
      video_placeholder: "Watch: Headless CMS Platform Overview",
      reverse_layout: false
    },
    {
      title: "AI-Powered Workflows",
      description: "Leverage intelligent automation to streamline content creation, optimize delivery, and enhance team productivity with built-in AI capabilities.",
      video_placeholder: "Watch: AI Automation in Action",
      reverse_layout: true
    },
    {
      title: "Enterprise-Ready Security",
      description: "Built for the most demanding security requirements with SOC 2 Type II compliance, advanced encryption, and comprehensive access controls.",
      video_placeholder: "Watch: Security & Compliance Overview",
      reverse_layout: false
    }
  ],
  use_cases: {
    title: "Built for Every Industry",
    description: "From e-commerce to finance, healthcare to media—The Content powers exceptional experiences across all sectors.",
    use_cases: [
      {
        title: "E-Commerce & Retail",
        description: "Create personalized shopping experiences that drive conversion and customer loyalty across all touchpoints.",
        metric: "45% increase in conversion"
      },
      {
        title: "Financial Services",
        description: "Deliver secure, compliant digital experiences that build trust and streamline customer journeys.",
        metric: "60% faster time-to-market"
      },
      {
        title: "Healthcare & Life Sciences",
        description: "Manage sensitive content with HIPAA-compliant workflows and deliver patient-centric experiences.",
        metric: "99.99% uptime SLA"
      },
      {
        title: "Media & Entertainment",
        description: "Scale content delivery globally with lightning-fast performance and seamless multi-device support.",
        metric: "5B+ monthly requests"
      }
    ]
  }
};

// Function to create content types
async function createContentTypes() {
  console.log('Creating content types...');
  
  for (const contentType of contentTypes) {
    try {
      const result = await stack.contentType().create(contentType);
      console.log(`✅ Created content type: ${contentType.content_type.title}`);
    } catch (error) {
      if (error.errorMessage && error.errorMessage.includes('already exists')) {
        console.log(`⚠️  Content type already exists: ${contentType.content_type.title}`);
      } else {
        console.error(`❌ Error creating content type ${contentType.content_type.title}:`, error.errorMessage);
      }
    }
  }
}

// Function to create sample entries
async function createSampleEntries() {
  console.log('Creating sample entries...');
  
  // Create hero entry
  try {
    const heroEntry = await stack.entry('hero').create({
      entry: {
        title: sampleEntries.hero.title,
        subtitle: sampleEntries.hero.subtitle,
        description: sampleEntries.hero.description,
        primary_button_text: sampleEntries.hero.primary_button_text,
        secondary_button_text: sampleEntries.hero.secondary_button_text,
        trust_indicators: sampleEntries.hero.trust_indicators
      }
    });
    console.log('✅ Created hero entry');
  } catch (error) {
    console.error('❌ Error creating hero entry:', error.errorMessage);
  }

  // Create features entry
  try {
    const featuresEntry = await stack.entry('features').create({
      entry: {
        title: sampleEntries.features.title,
        description: sampleEntries.features.description,
        features: sampleEntries.features.features
      }
    });
    console.log('✅ Created features entry');
  } catch (error) {
    console.error('❌ Error creating features entry:', error.errorMessage);
  }

  // Create video sections entries
  for (const videoSection of sampleEntries.video_sections) {
    try {
      const videoEntry = await stack.entry('video_sections').create({
        entry: videoSection
      });
      console.log(`✅ Created video section entry: ${videoSection.title}`);
    } catch (error) {
      console.error(`❌ Error creating video section entry ${videoSection.title}:`, error.errorMessage);
    }
  }

  // Create use cases entry
  try {
    const useCasesEntry = await stack.entry('use_cases').create({
      entry: {
        title: sampleEntries.use_cases.title,
        description: sampleEntries.use_cases.description,
        use_cases: sampleEntries.use_cases.use_cases
      }
    });
    console.log('✅ Created use cases entry');
  } catch (error) {
    console.error('❌ Error creating use cases entry:', error.errorMessage);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Contentstack setup...');
  console.log(`Stack API Key: ${config.apiKey}`);
  console.log(`Environment: ${config.environment}`);
  
  if (config.managementToken === 'your_management_token_here') {
    console.error('❌ Please update the management token in the script configuration');
    process.exit(1);
  }

  try {
    await createContentTypes();
    await createSampleEntries();
    console.log('🎉 Setup completed successfully!');
    console.log('📝 Next steps:');
    console.log('1. Get your delivery token from Contentstack dashboard');
    console.log('2. Update your .env file with the delivery token');
    console.log('3. Run npm run dev to test the integration');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createContentTypes, createSampleEntries };
