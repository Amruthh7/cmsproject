const ContentstackManagement = require('@contentstack/management');

// Contentstack Management API configuration
const client = ContentstackManagement.client({
  authtoken: 'cs8f11635528ccb3a9f8edd741', // Management token
});

const stackUid = 'blt755dc6238a6bbc27'; // Stack API key
const environment = 'cmsproject'; // Branch name

// Content Types Definitions
const contentTypes = [
  {
    content_type: {
      title: 'Hero Section',
      uid: 'hero_section',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Subtitle',
          uid: 'subtitle',
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
          display_name: 'Primary Button Text',
          uid: 'primary_button_text',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Secondary Button Text',
          uid: 'secondary_button_text',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Trust Indicators',
          uid: 'trust_indicators',
          data_type: 'group',
          multiple: true,
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
      title: 'Features',
      uid: 'features',
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
          display_name: 'Features List',
          uid: 'features',
          data_type: 'group',
          multiple: true,
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
      title: 'About Page',
      uid: 'about_page',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Subtitle',
          uid: 'subtitle',
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
          display_name: 'Mission Statement',
          uid: 'mission_statement',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Vision Statement',
          uid: 'vision_statement',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Values',
          uid: 'values',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Value Title',
              uid: 'value_title',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Value Description',
              uid: 'value_description',
              data_type: 'text',
              mandatory: true
            }
          ]
        },
        {
          display_name: 'Team Members',
          uid: 'team_members',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Name',
              uid: 'name',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Position',
              uid: 'position',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Bio',
              uid: 'bio',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Photo',
              uid: 'photo',
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
      title: 'Career Page',
      uid: 'career_page',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true
        },
        {
          display_name: 'Subtitle',
          uid: 'subtitle',
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
          display_name: 'Company Stats',
          uid: 'company_stats',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Value',
              uid: 'value',
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
        },
        {
          display_name: 'Company History',
          uid: 'company_history',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Year',
              uid: 'year',
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
            }
          ]
        },
        {
          display_name: 'Open Positions',
          uid: 'open_positions',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Title',
              uid: 'title',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Location',
              uid: 'location',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Type',
              uid: 'type',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Department',
              uid: 'department',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Description',
              uid: 'description',
              data_type: 'text',
              mandatory: true
            }
          ]
        },
        {
          display_name: 'Benefits',
          uid: 'benefits',
          data_type: 'group',
          multiple: true,
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
          display_name: 'Video Sections List',
          uid: 'video_sections',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Title',
              uid: 'title',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Subtitle',
              uid: 'subtitle',
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
              display_name: 'Video URL',
              uid: 'video_url',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Video Placeholder',
              uid: 'video_placeholder',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Reverse Layout',
              uid: 'reverse_layout',
              data_type: 'boolean',
              mandatory: false
            }
          ]
        }
      ]
    }
  },
  {
    content_type: {
      title: 'Use Cases',
      uid: 'use_cases',
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
          display_name: 'Use Cases List',
          uid: 'use_cases',
          data_type: 'group',
          multiple: true,
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
  },
  {
    content_type: {
      title: 'Pricing Plans',
      uid: 'pricing_plans',
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
          display_name: 'Plans',
          uid: 'plans',
          data_type: 'group',
          multiple: true,
          schema: [
            {
              display_name: 'Plan Name',
              uid: 'plan_name',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Price',
              uid: 'price',
              data_type: 'text',
              mandatory: true
            },
            {
              display_name: 'Period',
              uid: 'period',
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
              display_name: 'Features',
              uid: 'features',
              data_type: 'group',
              multiple: true,
              schema: [
                {
                  display_name: 'Feature',
                  uid: 'feature',
                  data_type: 'text',
                  mandatory: true
                }
              ]
            },
            {
              display_name: 'Is Popular',
              uid: 'is_popular',
              data_type: 'boolean',
              mandatory: false
            }
          ]
        }
      ]
    }
  }
];

// Sample Entries Data
const sampleEntries = {
  hero_section: {
    title: "The world's best digital experiences start here",
    subtitle: "Seamlessly integrate intelligent agents, AI-powered automation, and advanced workflows—all in one platform built for the context economy.",
    description: "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.",
    primary_button_text: "Explore the Platform",
    secondary_button_text: "Watch Demo",
    trust_indicators: [
      { metric: "10K+", label: "Companies" },
      { metric: "99.99%", label: "Uptime" },
      { metric: "5B+", label: "API Calls" },
      { metric: "150+", label: "Countries" }
    ]
  },
  features: {
    title: "Powerful Features for Modern Teams",
    description: "Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.",
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
  about_page: {
    title: "About The Content",
    subtitle: "Building the future of content management",
    description: "We're on a mission to revolutionize how companies create, manage, and deliver digital experiences.",
    mission_statement: "To empower teams with intelligent content management tools that adapt to their needs and scale with their growth.",
    vision_statement: "A world where every digital experience is perfectly tailored to its audience, powered by intelligent content management.",
    values: [
      {
        value_title: "Innovation",
        value_description: "We constantly push the boundaries of what's possible in content management."
      },
      {
        value_title: "Reliability",
        value_description: "Our platform is built for enterprise-grade reliability and performance."
      },
      {
        value_title: "Simplicity",
        value_description: "Complex problems deserve simple, elegant solutions."
      },
      {
        value_title: "Community",
        value_description: "We believe in building strong communities around our platform."
      }
    ],
    team_members: [
      {
        name: "Sarah Johnson",
        position: "CEO & Co-founder",
        bio: "Former VP of Engineering at TechCorp, leading our vision for the future of content management.",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
      },
      {
        name: "Michael Chen",
        position: "CTO & Co-founder",
        bio: "Architect of our scalable platform infrastructure with 15+ years in distributed systems.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
      },
      {
        name: "Emily Rodriguez",
        position: "Head of Product",
        bio: "Product strategist focused on creating intuitive user experiences that delight our customers.",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
      }
    ]
  },
  career_page: {
    title: "Join Our Mission",
    subtitle: "Build the future of content management with a team that's passionate about innovation, collaboration, and making a real impact.",
    description: "We believe in taking care of our team so they can take care of our customers.",
    company_stats: [
      { value: "150+", label: "Team Members" },
      { value: "50+", label: "Countries" },
      { value: "4.9", label: "Glassdoor Rating" },
      { value: "99%", label: "Employee Satisfaction" }
    ],
    company_history: [
      {
        year: "2020",
        title: "The Beginning",
        description: "Founded with a vision to revolutionize content management"
      },
      {
        year: "2021",
        title: "First Breakthrough",
        description: "Launched our first AI-powered content platform"
      },
      {
        year: "2022",
        title: "Global Expansion",
        description: "Expanded to 50+ countries with enterprise clients"
      },
      {
        year: "2023",
        title: "Security Milestone",
        description: "Achieved SOC 2 Type II certification"
      },
      {
        year: "2024",
        title: "Platform Evolution",
        description: "Launched The Content platform with advanced features"
      }
    ],
    open_positions: [
      {
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        type: "Full-time",
        department: "Engineering",
        description: "Build amazing user experiences with React, TypeScript, and modern web technologies."
      },
      {
        title: "Product Manager",
        location: "New York, NY",
        type: "Full-time",
        department: "Product",
        description: "Lead product strategy and work with cross-functional teams to deliver exceptional features."
      },
      {
        title: "DevOps Engineer",
        location: "Remote",
        type: "Full-time",
        department: "Engineering",
        description: "Scale our infrastructure and ensure 99.99% uptime for our global platform."
      },
      {
        title: "UX Designer",
        location: "Austin, TX",
        type: "Full-time",
        department: "Design",
        description: "Create intuitive and beautiful interfaces that users love."
      },
      {
        title: "Sales Engineer",
        location: "Chicago, IL",
        type: "Full-time",
        department: "Sales",
        description: "Help enterprise clients understand and implement our platform solutions."
      },
      {
        title: "Content Marketing Manager",
        location: "Remote",
        type: "Full-time",
        department: "Marketing",
        description: "Develop compelling content that showcases our platform's capabilities."
      }
    ],
    benefits: [
      {
        title: "Health & Wellness",
        description: "Comprehensive health, dental, and vision coverage"
      },
      {
        title: "Flexible Time Off",
        description: "Unlimited PTO and flexible work arrangements"
      },
      {
        title: "Learning & Development",
        description: "$5,000 annual learning budget per employee"
      },
      {
        title: "Remote First",
        description: "Work from anywhere with global team collaboration"
      },
      {
        title: "Team Events",
        description: "Regular team building and company retreats"
      },
      {
        title: "Equity Program",
        description: "Stock options for all employees"
      }
    ]
  },
  video_sections: {
    title: "See The Content in Action",
    description: "Watch how leading companies transform their content operations",
    video_sections: [
      {
        title: "Platform Overview",
        subtitle: "Discover the power of our content management platform",
        description: "See how our platform streamlines content workflows and accelerates digital experiences.",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        video_placeholder: "Platform Demo",
        reverse_layout: false
      },
      {
        title: "Developer Experience",
        subtitle: "Built for developers, by developers",
        description: "Explore our comprehensive APIs and developer tools that make integration seamless.",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        video_placeholder: "Developer Tools",
        reverse_layout: true
      }
    ]
  },
  use_cases: {
    title: "Trusted by Industry Leaders",
    description: "See how companies across industries use The Content to power their digital experiences",
    use_cases: [
      {
        title: "E-commerce Platform",
        description: "Streamlined product content management for 10M+ products across multiple channels.",
        metric: "40% faster time-to-market"
      },
      {
        title: "Media Company",
        description: "Centralized content hub managing 50K+ articles and multimedia assets.",
        metric: "60% reduction in content creation time"
      },
      {
        title: "Financial Services",
        description: "Secure content delivery for regulatory compliance and customer communications.",
        metric: "99.99% uptime guarantee"
      },
      {
        title: "Healthcare Provider",
        description: "Patient education content management across multiple languages and formats.",
        metric: "24/7 multilingual support"
      }
    ]
  },
  pricing_plans: {
    title: "Choose Your Plan",
    description: "Start free and scale as you grow. All plans include our core features.",
    plans: [
      {
        plan_name: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for small teams and personal projects",
        features: [
          { feature: "Up to 5 users" },
          { feature: "10GB storage" },
          { feature: "Basic API access" },
          { feature: "Community support" }
        ],
        is_popular: false
      },
      {
        plan_name: "Professional",
        price: "$99",
        period: "per month",
        description: "Ideal for growing businesses and teams",
        features: [
          { feature: "Up to 25 users" },
          { feature: "100GB storage" },
          { feature: "Advanced API access" },
          { feature: "Priority support" },
          { feature: "Custom integrations" }
        ],
        is_popular: true
      },
      {
        plan_name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "For large organizations with complex needs",
        features: [
          { feature: "Unlimited users" },
          { feature: "Unlimited storage" },
          { feature: "Full API access" },
          { feature: "24/7 dedicated support" },
          { feature: "Custom development" },
          { feature: "SLA guarantee" }
        ],
        is_popular: false
      }
    ]
  }
};

// Function to create content types
async function createContentTypes() {
  console.log('Creating content types...');
  
  for (const contentType of contentTypes) {
    try {
      const result = await client.stack({ api_key: stackUid }).contentType().create({
        content_type: contentType.content_type
      });
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

// Function to create entries
async function createEntries() {
  console.log('Creating sample entries...');
  
  for (const [contentTypeUid, entryData] of Object.entries(sampleEntries)) {
    try {
      const result = await client.stack({ api_key: stackUid }).contentType(contentTypeUid).entry().create({
        entry: {
          ...entryData
        }
      });
      console.log(`✅ Created entry for: ${contentTypeUid}`);
    } catch (error) {
      console.error(`❌ Error creating entry for ${contentTypeUid}:`, error.errorMessage);
    }
  }
}

// Function to publish entries
async function publishEntries() {
  console.log('Publishing entries...');
  
  for (const contentTypeUid of Object.keys(sampleEntries)) {
    try {
      const entries = await client.stack({ api_key: stackUid }).contentType(contentTypeUid).entry().query().find();
      
      for (const entry of entries.items) {
        try {
          await client.stack({ api_key: stackUid }).contentType(contentTypeUid).entry(entry.uid).publish({
            entry: {
              environments: [environment]
            }
          });
          console.log(`✅ Published entry: ${entry.uid} in ${contentTypeUid}`);
        } catch (error) {
          console.error(`❌ Error publishing entry ${entry.uid}:`, error.errorMessage);
        }
      }
    } catch (error) {
      console.error(`❌ Error querying entries for ${contentTypeUid}:`, error.errorMessage);
    }
  }
}

// Main execution function
async function setupContentstack() {
  try {
    console.log('🚀 Starting Contentstack setup...');
    console.log(`Stack UID: ${stackUid}`);
    console.log(`Environment: ${environment}`);
    
    await createContentTypes();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    
    await createEntries();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    
    await publishEntries();
    
    console.log('🎉 Contentstack setup completed successfully!');
    console.log('\n📋 Created Content Types:');
    contentTypes.forEach(ct => console.log(`  - ${ct.content_type.title} (${ct.content_type.uid})`));
    
    console.log('\n📝 Created Sample Entries:');
    Object.keys(sampleEntries).forEach(uid => console.log(`  - ${uid}`));
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
setupContentstack();
