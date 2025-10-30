import Stack from './contentstack';

// Types for Contentstack entries
export interface ContentstackEntry {
  uid: string;
  title: string;
  url: string;
  [key: string]: any;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  secondary_button_text: string;
  trust_indicators: Array<{
    metric: string;
    label: string;
  }>;
}

export interface FeatureContent {
  title: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    image?: {
      url: string;
    };
  }>;
}

export interface VideoSectionContent {
  title: string;
  description: string;
  video_placeholder: string;
  reverse_layout: boolean;
}

export interface UseCaseContent {
  title: string;
  description: string;
  use_cases: Array<{
    title: string;
    description: string;
    metric: string;
  }>;
}

export interface AboutPageContent {
  title: string;
  subtitle: string;
  description: string;
  mission_statement: string;
  vision_statement: string;
  values: Array<{
    value_title: string;
    value_description: string;
  }>;
  team_members: Array<{
    name: string;
    position: string;
    bio: string;
    photo?: {
      url: string;
    };
  }>;
}

export interface CareerPageContent {
  title: string;
  subtitle: string;
  description: string;
  company_stats: Array<{
    value: string;
    label: string;
  }>;
  company_history: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  open_positions: Array<{
    title: string;
    location: string;
    type: string;
    department: string;
    description: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
  }>;
}

export interface PricingPlansContent {
  title: string;
  description: string;
  plans: Array<{
    plan_name: string;
    price: string;
    period: string;
    description: string;
    features: Array<{
      feature: string;
    }>;
    is_popular: boolean;
  }>;
}

// Contentstack service functions
export const contentstackService = {
  // Get hero content
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('hero_section').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result[0]) {
        const entry = result[0];
        return {
          title: entry.title || 'The world\'s best digital experiences start here',
          subtitle: entry.subtitle || '✨ Introducing Agent OS - The Future of Content',
          description: entry.description || 'Create, manage, and deliver exceptional content experiences across every channel with the platform trusted by global brands.',
          primary_button_text: entry.primary_button_text || 'Get Started Free',
          secondary_button_text: entry.secondary_button_text || 'Watch Demo',
          trust_indicators: entry.trust_indicators || [
            { metric: '10K+', label: 'Global Companies' },
            { metric: '99.99%', label: 'Uptime SLA' },
            { metric: '5B+', label: 'API Calls/Month' },
            { metric: '24/7', label: 'Expert Support' }
          ]
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return null;
    }
  },

  // Get features content
  async getFeaturesContent(): Promise<FeatureContent | null> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('features').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        // Get the first entry for title/description, then collect all features
        const firstEntry = result[0];
        const features = result.map((entry: any) => ({
          icon: entry.feature_icon?.toLowerCase() || 'zap',
          title: entry.feature_title || '',
          description: entry.feature_description || '',
          image: entry.feature_image ? { url: entry.feature_image.url || entry.feature_image } : undefined
        })).filter(f => f.title); // Filter out empty entries
        
        return {
          title: firstEntry.title || 'Powerful Features for Modern Teams',
          description: firstEntry.description || 'Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.',
          features: features.length > 0 ? features : [
            {
              icon: 'zap',
              title: 'Lightning Performance',
              description: 'Deliver content at blazing speeds with our globally distributed CDN and intelligent caching.',
              image: { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            },
            {
              icon: 'globe',
              title: 'Omnichannel Delivery',
              description: 'Reach audiences anywhere with seamless content delivery across web, mobile, IoT, and beyond.',
              image: { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            },
            {
              icon: 'shield',
              title: 'Enterprise Security',
              description: 'Bank-level security with SOC 2 Type II compliance, advanced encryption, and role-based access.',
              image: { url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            },
            {
              icon: 'code',
              title: 'Developer-First APIs',
              description: 'Comprehensive REST and GraphQL APIs with SDKs in all major languages and frameworks.',
              image: { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            },
            {
              icon: 'layers',
              title: 'Composable Architecture',
              description: 'Build with best-of-breed tools using our flexible, API-first headless architecture.',
              image: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            },
            {
              icon: 'users',
              title: 'Team Collaboration',
              description: 'Empower teams with intuitive workflows, version control, and real-time collaboration tools.',
              image: { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center&auto=format&q=80' }
            }
          ]
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching features content:', error);
      return null;
    }
  },

  // Get video sections content
  async getVideoSectionsContent(): Promise<VideoSectionContent[]> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('video_sections').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        return result.map((entry: any) => ({
          title: entry.title || 'Modernize your CMS',
          description: entry.description || 'Create experiences faster across more channels with an easy-to-use, future-ready platform that scales with your business needs.',
          video_placeholder: entry.video_placeholder || 'Watch: Headless CMS Platform Overview',
          reverse_layout: entry.reverse_layout || false
        }));
      }
      
      // Return default content if no entries found
      return [
        {
          title: 'Modernize your CMS',
          description: 'Create experiences faster across more channels with an easy-to-use, future-ready platform that scales with your business needs.',
          video_placeholder: 'Watch: Headless CMS Platform Overview',
          reverse_layout: false
        },
        {
          title: 'AI-Powered Workflows',
          description: 'Leverage intelligent automation to streamline content creation, optimize delivery, and enhance team productivity with built-in AI capabilities.',
          video_placeholder: 'Watch: AI Automation in Action',
          reverse_layout: true
        },
        {
          title: 'Enterprise-Ready Security',
          description: 'Built for the most demanding security requirements with SOC 2 Type II compliance, advanced encryption, and comprehensive access controls.',
          video_placeholder: 'Watch: Security & Compliance Overview',
          reverse_layout: false
        }
      ];
    } catch (error) {
      console.error('Error fetching video sections content:', error);
      return [];
    }
  },

  // Get use cases content
  async getUseCasesContent(): Promise<UseCaseContent | null> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('use_cases').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        // Find entry with section_title (main entry) or use first entry
        const mainEntry = result.find((e: any) => e.section_title) || result[0];
        
        // Collect all use cases
        const useCases = result
          .filter((e: any) => e.title && e.description)
          .map((e: any) => ({
            title: e.title,
            description: e.description,
            metric: e.metric || ''
          }));
        
        return {
          title: mainEntry.section_title || 'Trusted by Industry Leaders',
          description: mainEntry.section_description || 'See how companies across industries use The Content to power their digital experiences',
          use_cases: useCases.length > 0 ? useCases : []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching use cases content:', error);
      return null;
    }
  },

  // Get trust indicators
  async getTrustIndicators(): Promise<Array<{ metric_value: string; label: string }>> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('trust_indicators').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        return result.map((entry: any) => ({
          metric_value: entry.metric_value || '',
          label: entry.label || ''
        })).filter(item => item.metric_value && item.label);
      }
      return [];
    } catch (error) {
      console.error('Error fetching trust indicators:', error);
      return [];
    }
  },

  // Test Contentstack connection
  async testConnection(): Promise<void> {
    try {
      console.log('=== TESTING Contentstack Connection ===');
      // Try to fetch a simple entry to test the connection
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('about_page').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      console.log('✅ Connection successful!');
      console.log('Result:', result);
    } catch (error: any) {
      console.error('❌ Connection failed:', error?.errorMessage || error?.message);
    }
  },

  // Get about page content
  async getAboutPageContent(): Promise<AboutPageContent | null> {
    try {
      console.log('=== STARTING Contentstack About Page Fetch ===');
      console.log('Stack config:', {
        api_key: (Stack as any).config?.api_key || 'not accessible',
        environment: (Stack as any).config?.environment || 'not accessible',
        region: (Stack as any).config?.region || 'not accessible'
      });
      
      // Try different content type name variations
      const contentTypeVariations = ['about_page', 'about-page', 'aboutpage'];
      let result: any = null;
      let usedContentType = '';
      
      for (const contentType of contentTypeVariations) {
        try {
          console.log(`🔄 Trying content type: "${contentType}"`);
          result = await new Promise<any>((resolve, reject) => {
            Stack.ContentType(contentType).Entry.fetchAll((error: any, data: any) => {
              if (error) reject(error);
              else resolve(data);
            });
          });
          
          // Handle different response formats
          if (result && !Array.isArray(result)) {
            if ((result as any).entries) {
              result = (result as any).entries;
            } else if ((result as any).items) {
              result = (result as any).items;
            } else {
              result = [result];
            }
          }
          
          if (result && Array.isArray(result) && result.length > 0) {
            console.log(`✅ Success! Found ${result.length} entries using content type: "${contentType}"`);
            usedContentType = contentType;
            break;
          } else if (result && Array.isArray(result) && result.length === 0) {
            console.log(`⚠️  Content type "${contentType}" EXISTS but has NO ENTRIES`);
            console.log(`⚠️  ⚠️  ⚠️  THIS IS THE PROBLEM! ⚠️  ⚠️  ⚠️`);
            console.log(`⚠️  SOLUTION:`);
            console.log(`    1. Go to Contentstack Dashboard`);
            console.log(`    2. Navigate to: Content → "${contentType}" → Entries`);
            console.log(`    3. Either CREATE a new entry OR open existing entry`);
            console.log(`    4. Fill in the fields (hero_title, leader_name, etc.)`);
            console.log(`    5. Click "Publish" button (green button, top right)`);
            console.log(`    6. IMPORTANT: Select "cmsproject" from environment dropdown`);
            console.log(`    7. Click "Publish" to confirm`);
            console.log(`    8. Wait for confirmation: "Published to cmsproject"`);
            console.log(`    9. Come back here and click "Refresh Content"`);
          } else {
            console.log(`⚠️  Content type "${contentType}" response format unexpected:`, result);
          }
        } catch (error: any) {
          console.log(`❌ Content type "${contentType}" failed:`, error?.errorMessage || error?.message);
          // Continue to next variation
        }
      }
      
      if (!result || !Array.isArray(result) || result.length === 0) {
        console.error('');
        console.error('═══════════════════════════════════════════════════════════');
        console.error('❌ FINAL RESULT: No entries found in any content type');
        console.error('═══════════════════════════════════════════════════════════');
        console.error('');
        console.error('📋 CONTENT TYPES TESTED:', contentTypeVariations);
        console.error('');
        console.error('✅ WHAT THIS MEANS:');
        console.error('   - Content types may exist, but have NO ENTRIES');
        console.error('   - OR entries exist but are NOT PUBLISHED to "cmsproject"');
        console.error('');
        console.error('🔧 ACTION REQUIRED IN CONTENTSTACK:');
        console.error('   1. Open Contentstack Dashboard');
        console.error('   2. Go to: Content → [Your Content Type] → Entries');
        console.error('   3. Create entry OR open existing entry');
        console.error('   4. Fill in fields and SAVE');
        console.error('   5. Click "Publish" button (top right)');
        console.error('   6. Select "cmsproject" from environment dropdown');
        console.error('   7. Click "Publish"');
        console.error('   8. Verify status shows "Published to cmsproject"');
        console.error('');
        console.error('🧪 TEST AFTER PUBLISHING:');
        console.error(`   Open this URL: https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=cmsproject&access_token=cs05eb74f9e80cece6d90fd6e3`);
        console.error('   If you see JSON data → Working! Refresh the page.');
        console.error('   If empty array [] → Entry not published yet');
        console.error('');
        console.error('═══════════════════════════════════════════════════════════');
        console.error('');
        throw new Error('No entries found for about page content type');
      }
      
      console.log(`✅ Using content type: "${usedContentType || 'about_page'}"`);
      console.log(`✅ Found ${result.length} entries`);
      console.log('Full result JSON:', JSON.stringify(result, null, 2));
      
      // Find entry with hero_title (main entry) or use first entry
      const mainEntry = result.find((e: any) => e.entry?.hero_title || e.hero_title) || result[0];
      
      // Extract the actual entry data (handle both direct and nested structures)
      const entryData = mainEntry.entry || mainEntry;
      
      console.log('📋 Entry data structure:', entryData);
      console.log('📋 Available fields:', Object.keys(entryData));
      
      // Helper function to extract photo URL
      const extractPhotoUrl = (photo: any): string => {
        if (!photo) return '';
        if (typeof photo === 'string') {
          return photo;
        } else if (photo.url) {
          return photo.url;
        } else if (typeof photo === 'object' && photo.download_url) {
          return photo.download_url;
        }
        return '';
      };
      
      // Helper function to clean HTML tags from bio
      const cleanBio = (bio: string): string => {
        if (!bio) return '';
        return bio.replace(/<[^>]*>/g, '').trim();
      };
      
      // Collect leaders from entries - handle both single leader and multiple leaders
      const leaders = [];
      if (entryData.leader_name) {
        // Handle both string and array formats
        const leaderNames = Array.isArray(entryData.leader_name) ? entryData.leader_name : [entryData.leader_name];
        const leaderPositions = Array.isArray(entryData.leader_position) ? entryData.leader_position : [entryData.leader_position];
        const leaderBios = Array.isArray(entryData.leader_bio) ? entryData.leader_bio : [entryData.leader_bio];
        const leaderPhotos = Array.isArray(entryData.leader_photo) ? entryData.leader_photo : [entryData.leader_photo];
        
        leaderNames.forEach((name: string, index: number) => {
          const photoUrl = extractPhotoUrl(leaderPhotos[index]);
          leaders.push({
            name: name,
            position: leaderPositions[index] || '',
            bio: cleanBio(leaderBios[index] || ''),
            photo: photoUrl || (name?.includes('Sarah') ? 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces&auto=format&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80')
          });
        });
      }
      
      // Collect team members from entries - handle both single team member and multiple team members
      const teamMembers = [];
      if (entryData.team_member_name) {
        // Handle both string and array formats
        const memberNames = Array.isArray(entryData.team_member_name) ? entryData.team_member_name : [entryData.team_member_name];
        const memberPositions = Array.isArray(entryData.team_member_position) ? entryData.team_member_position : [entryData.team_member_position];
        const memberBios = Array.isArray(entryData.team_member_bio) ? entryData.team_member_bio : [entryData.team_member_bio];
        const memberPhotos = Array.isArray(entryData.team_member_photo) ? entryData.team_member_photo : [entryData.team_member_photo];
        
        // Use different fallback images based on name
        const fallbackImages = [
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80'
        ];
        
        memberNames.forEach((name: string, index: number) => {
          const photoUrl = extractPhotoUrl(memberPhotos[index]);
          const nameMatch = name?.toLowerCase() || '';
          let defaultPhoto = fallbackImages[0];
          if (nameMatch.includes('emily')) {
            defaultPhoto = fallbackImages[0];
          } else if (nameMatch.includes('david')) {
            defaultPhoto = fallbackImages[1];
          } else if (nameMatch.includes('lisa')) {
            defaultPhoto = fallbackImages[2];
          } else {
            defaultPhoto = fallbackImages[3];
          }
          
          teamMembers.push({
            name: name,
            position: memberPositions[index] || '',
            bio: cleanBio(memberBios[index] || ''),
            photo: photoUrl || defaultPhoto
          });
        });
      }
      
      // Collect values from entries
      const values = [];
      if (entryData.value_title) {
        values.push({
          value_title: entryData.value_title,
          value_description: cleanBio(entryData.value_description || '')
        });
      }
        
      console.log('✅ Processed leaders:', leaders);
      console.log('✅ Processed team members:', teamMembers);
      console.log('✅ Total team_members to return:', [...leaders, ...teamMembers].length);
      
      const finalData = {
        title: entryData.hero_title || 'Building the future of content management',
        subtitle: cleanBio(entryData.hero_description || 'We\'re on a mission to revolutionize how companies create, manage, and deliver digital experiences.'),
        description: cleanBio(entryData.hero_description || 'We\'re on a mission to revolutionize how companies create, manage, and deliver digital experiences.'),
        mission_statement: cleanBio(entryData.mission_statement || 'To empower teams with intelligent content management tools that adapt to their needs and scale with their growth.'),
        vision_statement: cleanBio(entryData.vision_statement || 'A world where every digital experience is perfectly tailored to its audience, powered by intelligent content management.'),
        values: values.length > 0 ? values : [],
        team_members: [...leaders, ...teamMembers] // Combine leaders and team members, but keep them separate for display
      };
      
      console.log('✅ Returning About Page Content:', JSON.stringify(finalData, null, 2));
      return finalData;
    } catch (error: any) {
      console.error('❌ ERROR fetching about page content:', error);
      console.error('Error message:', error?.errorMessage || error?.message);
      console.error('Error details:', error);
      console.error('Stack trace:', error?.stack);
      
      // Check for specific error types
      if (error?.errorMessage) {
        if (error.errorMessage.includes('not found')) {
          console.error('❌ Content type "about_page" does not exist in Contentstack');
          console.error('   → Create the content type first');
        } else if (error.errorMessage.includes('unauthorized') || error.errorMessage.includes('permission')) {
          console.error('❌ Permission denied - check delivery token');
        } else if (error.errorMessage.includes('environment')) {
          console.error('❌ Environment issue - check environment name');
        }
      }
      
      console.error('❌ CRITICAL: Could not fetch content after trying all variations');
      console.error('✅ TROUBLESHOOTING STEPS:');
      console.error('');
      console.error('1️⃣  Content Type Name:');
      console.error('   - Check exact name in Contentstack dashboard');
      console.error('   - Could be: "about_page", "about-page", or "aboutpage"');
      console.error('   - Go to: Content Types → Look for your about page content type');
      console.error('');
      console.error('2️⃣  Environment:');
      console.error('   - Currently using: cmsproject');
      console.error('   - Verify environment exists in Contentstack');
      console.error('   - Go to: Settings → Environments → Check "cmsproject" exists');
      console.error('');
      console.error('3️⃣  Entry Publication (CRITICAL):');
      console.error('   - Entry MUST be PUBLISHED (not just saved or in draft)');
      console.error('   - Go to: Content → [Your Content Type] → Entries');
      console.error('   - If you see entries listed, click on one');
      console.error('   - Click the green "Publish" button (top right)');
      console.error('   - IMPORTANT: Select "cmsproject" from environment dropdown');
      console.error('   - Click "Publish" button');
      console.error('   - Status should show: ✅ Published to cmsproject');
      console.error('   - If entry shows "Draft" status, it will NOT be visible via API');
      console.error('');
      console.error('4️⃣  Delivery Token:');
      console.error('   - Token: cs05eb74f9e80cece6d90fd6e3');
      console.error('   - Go to: Settings → Tokens → Find this token');
      console.error('   - Ensure it has access to your content type');
      console.error('');
      console.error('5️⃣  Test API Directly:');
      console.error('   Try this URL in browser:');
      console.error(`   https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=cmsproject&access_token=cs05eb74f9e80cece6d90fd6e3`);
      console.error('   (Replace "about_page" with your actual content type name if different)');
      
      return null;
    }
  },

  // Get career page content
  async getCareerPageContent(): Promise<CareerPageContent | null> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('career_page').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        // Find entry with hero_title (main entry) or use first entry
        const mainEntry = result.find((e: any) => e.hero_title) || result[0];
        
        // Collect company history
        const companyHistory = result
          .filter((e: any) => e.company_history_year)
          .map((e: any) => ({
            year: e.company_history_year,
            title: e.company_history_title,
            description: e.company_history_description
          }));
        
        // Collect open positions
        const openPositions = result
          .filter((e: any) => e.job_title)
          .map((e: any) => ({
            title: e.job_title,
            location: e.job_location,
            type: e.job_type,
            department: e.job_department,
            description: e.job_description
          }));
        
        // Collect benefits
        const benefits = result
          .filter((e: any) => e.benefit_title)
          .map((e: any) => ({
            title: e.benefit_title,
            description: e.benefit_description
          }));
        
        // Collect company stats
        const companyStats = result
          .filter((e: any) => e.company_stat_value)
          .map((e: any) => ({
            value: e.company_stat_value,
            label: e.company_stat_label
          }));
        
        return {
          title: mainEntry.hero_title || 'Join Our Mission',
          subtitle: mainEntry.hero_description || 'Build the future of content management with a team that\'s passionate about innovation, collaboration, and making a real impact.',
          description: mainEntry.hero_description || 'We believe in taking care of our team so they can take care of our customers.',
          company_stats: companyStats.length > 0 ? companyStats : [],
          company_history: companyHistory.length > 0 ? companyHistory : [],
          open_positions: openPositions.length > 0 ? openPositions : [],
          benefits: benefits.length > 0 ? benefits : []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching career page content:', error);
      return null;
    }
  },

  // Get pricing plans content
  async getPricingPlansContent(): Promise<PricingPlansContent | null> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Stack.ContentType('pricing_plans').Entry.fetchAll((error: any, data: any) => {
          if (error) reject(error);
          else resolve(data);
        });
      });
      
      if (result && result.length > 0) {
        // Find entry with section_title (main entry) or use first entry
        const mainEntry = result.find((e: any) => e.section_title) || result[0];
        
        // Group plans by plan_name (multiple entries can have same plan_name with different features)
        const plansMap = new Map<string, any>();
        
        result
          .filter((e: any) => e.plan_name)
          .forEach((entry: any) => {
            const planName = entry.plan_name;
            if (!plansMap.has(planName)) {
              plansMap.set(planName, {
                plan_name: entry.plan_name,
                price: entry.price,
                period: entry.period,
                description: entry.plan_description || entry.description || '',
                features: [],
                is_popular: entry.is_popular || false
              });
            }
            
            // Add feature if exists
            if (entry.feature) {
              const plan = plansMap.get(planName)!;
              plan.features.push({ feature: entry.feature });
            }
          });
        
        const plans = Array.from(plansMap.values());
        
        return {
          title: mainEntry.section_title || 'Choose Your Plan',
          description: mainEntry.section_description || 'Start free and scale as you grow. All plans include our core features.',
          plans: plans.length > 0 ? plans : []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching pricing plans content:', error);
      return null;
    }
  },

  // Get all content for the homepage
  async getHomepageContent() {
    try {
      const [heroContent, featuresContent, videoSectionsContent, useCasesContent] = await Promise.all([
        this.getHeroContent(),
        this.getFeaturesContent(),
        this.getVideoSectionsContent(),
        this.getUseCasesContent()
      ]);

      return {
        hero: heroContent,
        features: featuresContent,
        videoSections: videoSectionsContent,
        useCases: useCasesContent
      };
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      return null;
    }
  }
};
