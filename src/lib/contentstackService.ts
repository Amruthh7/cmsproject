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
  manager?: string;
  manager_position?: string;
  manager_bio?: string;
  manager_photo?: string;
  leader_name?: string;
  leader_position?: string;
  leader_bio?: string;
  leader_photo?: string;
  team_member_photoo?: string;
  team_pic_4?: string;
  team_member_photo2?: string;
  team_members: Array<{
    name: string;
    position: string;
    bio: string;
    photo?: string;
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

export interface WhyChoosePlatformContent {
  title: string;
  description: string;
  benefits: Array<{
    title: string;
    description?: string;
    icon?: string;
    color?: string;
  }>;
}

// Contentstack service functions
export const contentstackService = {
  // Get hero content
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/hero_section/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      if (resp.ok && json?.entries && json.entries[0]) {
        const entry = json.entries[0];
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/features/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      if (result.length > 0) {
        // Get the main entry (could be single entry with arrays or multiple entries)
        const mainEntry = result.find((e: any) => e.title && e.description) || result.find((e: any) => e.title) || result[0];
        
        let features = [];
        
        // Check if feature_title is an array (new structure: single entry with arrays)
        if (mainEntry.feature_title && Array.isArray(mainEntry.feature_title)) {
          // Handle array-based structure: single entry with arrays
          const titles = mainEntry.feature_title || [];
          const descriptions = Array.isArray(mainEntry.feature_description) ? mainEntry.feature_description : [];
          const icons = Array.isArray(mainEntry.feature_icon) ? mainEntry.feature_icon : [];
          
          // Clean HTML from descriptions
          const cleanDescription = (desc: string): string => {
            if (!desc) return '';
            return String(desc)
              .replace(/<p[^>]*>/g, '')
              .replace(/<\/p>/g, '\n\n')
              .replace(/<h3[^>]*>.*?<\/h3>/g, '')
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\n\s*\n\s*\n/g, '\n\n')
              .trim();
          };
          
          // Default icon mapping based on keywords in title
          const getDefaultIcon = (title: string, index: number): string => {
            const titleLower = title.toLowerCase();
            if (titleLower.includes('security') || titleLower.includes('safe') || titleLower.includes('encrypt')) return 'shield';
            if (titleLower.includes('performance') || titleLower.includes('speed') || titleLower.includes('fast') || titleLower.includes('lightning')) return 'zap';
            if (titleLower.includes('delivery') || titleLower.includes('channel') || titleLower.includes('omnichannel')) return 'globe';
            if (titleLower.includes('api') || titleLower.includes('developer') || titleLower.includes('code') || titleLower.includes('flexibility')) return 'code';
            if (titleLower.includes('scalable') || titleLower.includes('infrastructure') || titleLower.includes('cloud')) return 'layers';
            if (titleLower.includes('collaboration') || titleLower.includes('team') || titleLower.includes('workflow')) return 'users';
            if (titleLower.includes('insight') || titleLower.includes('analytics') || titleLower.includes('data')) return 'zap';
            if (titleLower.includes('visual') || titleLower.includes('edit') || titleLower.includes('editor')) return 'code';
            // Default to cycling through icons based on index
            const defaultIcons = ['zap', 'globe', 'shield', 'code', 'layers', 'users'];
            return defaultIcons[index % defaultIcons.length];
          };
          
          // Map arrays to features
          console.log('🔄 Mapping features from arrays:', {
            titlesCount: titles.length,
            descriptionsCount: descriptions.length,
            iconsCount: icons.length
          });
          
          features = titles.map((title: string, index: number) => {
            const iconName = (icons[index] || '').toLowerCase().trim();
            const finalIcon = iconName || getDefaultIcon(title, index);
            const desc = cleanDescription(descriptions[index] || '');
            const feature = {
              icon: finalIcon,
              title: title || '',
              description: desc,
              image: mainEntry.feature_image ? { 
                url: (mainEntry.feature_image.url || (typeof mainEntry.feature_image === 'string' ? mainEntry.feature_image : '')) 
              } : undefined
            };
            console.log(`  ✓ Feature ${index + 1}: "${feature.title}" (icon: ${feature.icon})`);
            return feature;
          }).filter((f: any) => f.title); // Filter out features without titles
          
          console.log(`✅ Created ${features.length} features from ${titles.length} titles`);
        } else {
          // Handle old structure: multiple entries, each entry is a feature
          features = result
            .filter((entry: any) => entry.feature_title || entry.feature_icon)
            .map((entry: any) => ({
              icon: (entry.feature_icon || '').toLowerCase() || 'zap',
              title: entry.feature_title || '',
              description: entry.feature_description || '',
              image: entry.feature_image ? { 
                url: (entry.feature_image.url || (typeof entry.feature_image === 'string' ? entry.feature_image : '')) 
              } : undefined
            }))
            .filter((f: any) => f.title);
        }
        
        console.log('📊 Features fetched:', features.length, 'features from Contentstack');
        console.log('📋 Feature data structure:', {
          hasArrayStructure: mainEntry.feature_title && Array.isArray(mainEntry.feature_title),
          titlesCount: Array.isArray(mainEntry.feature_title) ? mainEntry.feature_title.length : 'N/A',
          descriptionsCount: Array.isArray(mainEntry.feature_description) ? mainEntry.feature_description.length : 'N/A',
          iconsCount: Array.isArray(mainEntry.feature_icon) ? mainEntry.feature_icon.length : 'N/A',
          rawTitles: Array.isArray(mainEntry.feature_title) ? mainEntry.feature_title : 'Not array',
          features: features.map((f: any) => ({ title: f.title, icon: f.icon }))
        });
        
        return {
          title: mainEntry.title || 'Powerful Features for Modern Teams',
          description: mainEntry.description || 'Built for the creditworthy. Experience the ascension yourself with tools designed for trustworthy individuals.',
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/video_sections/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      if (result.length > 0) {
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/use_cases/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      if (result.length > 0) {
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/trust_indicators/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      if (result.length > 0) {
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const result = await resp.json();
      console.log('✅ Connection successful!');
      console.log('Result:', result);
    } catch (error: any) {
      console.error('❌ Connection failed:', error?.errorMessage || error?.message);
    }
  },

  // Get about page content
  async getAboutPageContent(): Promise<AboutPageContent | null> {
    try {
      // Prefer CDN Delivery API with proper headers (api_key + branch)
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;

      const url = `https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, {
        headers: {
          'api_key': apiKey,
          'branch': branch,
          // access_token goes in query for CDN; keep header lean
        }
      });
      const json = await resp.json();
      if (!resp.ok || !json?.entries || json.entries.length === 0) {
        console.error('CDN fetch failed or empty:', json);
        return null;
      }

      const result = json.entries as any[];
      
      // Find entry with hero_title (main entry) or use first entry
      const mainEntry = result.find((e: any) => e.hero_title) || result[0];
      const entryData = mainEntry;
      
      // Helper function to extract photo URL
      const extractPhotoUrl = (photo: any): string => {
        if (!photo) return '';
        if (typeof photo === 'string') return photo;
        if (photo.url) return photo.url;
        if (typeof photo === 'object' && photo.download_url) return photo.download_url;
        return '';
      };
      
      // Helper function to clean HTML tags and entities from bio
      const cleanBio = (bio: string): string => {
        if (!bio) return '';
        return bio
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
          .replace(/&amp;/g, '&') // Replace &amp; with &
          .replace(/&lt;/g, '<') // Replace &lt; with <
          .replace(/&gt;/g, '>') // Replace &gt; with >
          .replace(/&quot;/g, '"') // Replace &quot; with "
          .replace(/&#39;/g, "'") // Replace &#39; with '
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
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
        
        // Build array-based photos (multiple) if provided
        const photoArrayRaw = Array.isArray(entryData.team_member_photo) ? entryData.team_member_photo : [];
        const photoArray: string[] = photoArrayRaw.map((p: any) => extractPhotoUrl(p));

        // Individual photo fields for each team member - map by index with fallback to array photos
        const individualPhotos = [
          extractPhotoUrl(entryData.team_member_photoo) || photoArray[0] || '', // Team member 1 (Abdu)
          extractPhotoUrl(entryData.team_pic_4) || photoArray[1] || '',         // Team member 2 (Nidhi)
          extractPhotoUrl(entryData.team_member_photo2) || photoArray[2] || '', // Team member 3 (Manoj)
          photoArray[3] || extractPhotoUrl(entryData.team_member_photo) || ''   // Team member 4 (Lavanya)
        ];
        
        memberNames.forEach((name: string, index: number) => {
          // Get photo by index: first member gets first photo field, second gets second, etc.
          let photoUrl = individualPhotos[index] || '';
          
          // Default logo if no photo is available
          const defaultLogo = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&auto=format&q=80';
          
          teamMembers.push({
            name: name,
            position: memberPositions[index] || '',
            bio: cleanBio(memberBios[index] || ''),
            photo: photoUrl || defaultLogo
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
        
      const finalData = {
        title: entryData.hero_title || 'Building the future of content management',
        subtitle: cleanBio(entryData.hero_description || 'We\'re on a mission to revolutionize how companies create, manage, and deliver digital experiences.'),
        description: cleanBio(entryData.hero_description || 'We\'re on a mission to revolutionize how companies create, manage, and deliver digital experiences.'),
        mission_statement: cleanBio(entryData.mission_statement || 'To empower teams with intelligent content management tools that adapt to their needs and scale with their growth.'),
        vision_statement: cleanBio(entryData.vision_statement || 'A world where every digital experience is perfectly tailored to its audience, powered by intelligent content management.'),
        values: values.length > 0 ? values : [],
        // Manager fields
        manager: entryData.manager || '',
        manager_position: entryData.manager_position || '',
        manager_bio: cleanBio(entryData.manager_bio || ''),
        manager_photo: extractPhotoUrl(entryData.manager_photo),
        // Leader fields
        leader_name: entryData.leader_name || '',
        leader_position: entryData.leader_position || '',
        leader_bio: cleanBio(entryData.leader_bio || ''),
        leader_photo: extractPhotoUrl(entryData.leader_photo),
        // Individual team member photos
        team_member_photoo: extractPhotoUrl(entryData.team_member_photoo),
        team_pic_4: extractPhotoUrl(entryData.team_pic_4),
        team_member_photo2: extractPhotoUrl(entryData.team_member_photo2),
        // Team members
        team_members: teamMembers // Use team members directly
      };
      
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/career_page/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      if (result.length > 0) {
        // Find entry with hero_title (main entry) or use first entry
        const mainEntry = result.find((e: any) => e.hero_title) || result[0];
        
        // Helper to strip HTML tags/entities from text
        const cleanText = (text: string): string => {
          if (!text) return '';
          return String(text)
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, ' ')
            .trim();
        };

        // Helper to clean pricing descriptions with proper bullet point formatting
        const cleanPricingDescription = (text: string): string => {
          if (!text) return '';
          return String(text)
            .replace(/<ul>/g, '')
            .replace(/<\/ul>/g, '')
            .replace(/<li>/g, '\n• ')
            .replace(/<\/li>/g, '\n\n')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\n\s*\n/g, '\n\n') // Ensure double newlines between bullet points
            .trim();
        };

        // Collect company history - handle arrays properly
        const companyHistory = [];
        result.forEach((entry: any) => {
          if (entry.company_history_year && Array.isArray(entry.company_history_year)) {
            // Handle array format - create separate entries for each year
            entry.company_history_year.forEach((year: string, index: number) => {
              companyHistory.push({
                year: year,
                title: cleanText(entry.company_history_title?.[index] || ''),
                description: cleanText(entry.company_history_description?.[index] || '')
              });
            });
          } else if (entry.company_history_year) {
            // Handle single entry format
            companyHistory.push({
              year: entry.company_history_year,
              title: cleanText(entry.company_history_title || ''),
              description: cleanText(entry.company_history_description || '')
            });
          }
        });
        
        // Collect open positions - handle arrays properly
        const openPositions: Array<{ title: string; location: string; type: string; department: string; description: string }> = [];
        result.forEach((entry: any) => {
          if (entry.job_title && Array.isArray(entry.job_title)) {
            entry.job_title.forEach((title: string, index: number) => {
              openPositions.push({
                title: cleanText(title),
                location: cleanText(entry.job_location?.[index] || ''),
                type: cleanText(entry.job_type?.[index] || ''),
                department: cleanText(entry.job_department?.[index] || ''),
                description: cleanText(entry.job_description?.[index] || '')
              });
            });
          } else if (entry.job_title) {
            openPositions.push({
              title: cleanText(entry.job_title),
              location: cleanText(entry.job_location || ''),
              type: cleanText(entry.job_type || ''),
              department: cleanText(entry.job_department || ''),
              description: cleanText(entry.job_description || '')
            });
          }
        });
        
        // Collect benefits - handle arrays properly
        const benefits = [];
        result.forEach((entry: any) => {
          if (entry.benefit_title && Array.isArray(entry.benefit_title)) {
            // Handle array format - create separate entries for each benefit
            entry.benefit_title.forEach((title: string, index: number) => {
              benefits.push({
                title: cleanText(title),
                description: cleanText(entry.benefit_description?.[index] || '')
              });
            });
          } else if (entry.benefit_title) {
            // Handle single entry format
            benefits.push({
              title: cleanText(entry.benefit_title),
              description: cleanText(entry.benefit_description || '')
            });
          }
        });
        
        // Collect company stats - handle arrays properly
        const companyStats = [];
        result.forEach((entry: any) => {
          if (entry.company_stat_value && Array.isArray(entry.company_stat_value)) {
            // Handle array format - create separate entries for each stat
            entry.company_stat_value.forEach((value: string, index: number) => {
              companyStats.push({
                value: cleanText(value),
                label: cleanText(entry.company_stat_label?.[index] || '')
              });
            });
          } else if (entry.company_stat_value) {
            // Handle single entry format
            companyStats.push({
              value: cleanText(entry.company_stat_value),
              label: cleanText(entry.company_stat_label || '')
            });
          }
        });
        
        return {
          title: cleanText(mainEntry.hero_title || 'Join Our Mission'),
          subtitle: cleanText(mainEntry.hero_description || 'Build the future of content management with a team that\'s passionate about innovation, collaboration, and making a real impact.'),
          description: cleanText(mainEntry.hero_description || 'We believe in taking care of our team so they can take care of our customers.'),
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
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/pricing_plans/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      
      // Helper to clean pricing descriptions with proper formatting
      const cleanPricingDescription = (text: string): string => {
        if (!text) return '';
        return String(text)
          .replace(/<ul[^>]*>/g, '')
          .replace(/<\/ul>/g, '')
          .replace(/<li[^>]*>/g, '\n• ')
          .replace(/<\/li>/g, '\n')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\n\s*\n/g, '\n')
          .trim();
      };
      
      const result = json?.entries || [];
      if (result.length > 0) {
        // Find entry with section_title or plans group (main entry) or use first entry
        const mainEntry = result.find((e: any) => e.section_title || e.plans) || result[0];
        
        const plans = [];
        
        // Check if entry has a 'plans' group field (single entry with nested plans)
        if (mainEntry.plans && Array.isArray(mainEntry.plans)) {
          // Handle group field structure: single entry with plans array
          mainEntry.plans.forEach((plan: any) => {
            const planFeatures = [];
            
            // Extract features from plan object
            if (plan.features && Array.isArray(plan.features)) {
              plan.features.forEach((feature: any) => {
                if (typeof feature === 'string') {
                  planFeatures.push({ feature: feature });
                } else if (feature.feature) {
                  planFeatures.push({ feature: feature.feature });
                }
              });
            }
            
            plans.push({
              plan_name: plan.plan_name || '',
              price: plan.price || '',
              period: plan.period || '',
              description: cleanPricingDescription(plan.description || plan.plan_description || ''),
              features: planFeatures,
              is_popular: plan.is_popular || false
            });
          });
        } else if (mainEntry.plan_name && Array.isArray(mainEntry.plan_name)) {
          // Handle array format - single entry with arrays of plan data
          mainEntry.plan_name.forEach((planName: string, index: number) => {
            const planFeatures = [];
            
            // Handle features - could be array of strings or array of objects
            if (mainEntry.feature && Array.isArray(mainEntry.feature)) {
              // Group features by plan if multiple plans exist
              const featuresPerPlan = Math.floor(mainEntry.feature.length / mainEntry.plan_name.length);
              const startIndex = index * featuresPerPlan;
              const endIndex = index === mainEntry.plan_name.length - 1 ? mainEntry.feature.length : startIndex + featuresPerPlan;
              
              mainEntry.feature.slice(startIndex, endIndex).forEach((feature: any) => {
                if (typeof feature === 'string') {
                  planFeatures.push({ feature: feature });
                } else if (feature.feature) {
                  planFeatures.push({ feature: feature.feature });
                }
              });
            } else if (mainEntry.features && Array.isArray(mainEntry.features)) {
              // Handle nested features array
              const planFeaturesArray = mainEntry.features[index] || [];
              if (Array.isArray(planFeaturesArray)) {
                planFeaturesArray.forEach((feature: any) => {
                  if (typeof feature === 'string') {
                    planFeatures.push({ feature: feature });
                  } else if (feature.feature) {
                    planFeatures.push({ feature: feature.feature });
                  }
                });
              }
            }
            
            plans.push({
              plan_name: planName,
              price: Array.isArray(mainEntry.price) ? (mainEntry.price[index] || '') : mainEntry.price || '',
              period: Array.isArray(mainEntry.period) ? (mainEntry.period[index] || '') : mainEntry.period || '',
              description: cleanPricingDescription(
                Array.isArray(mainEntry.plan_description) 
                  ? (mainEntry.plan_description[index] || '') 
                  : (mainEntry.plan_description || mainEntry.description || '')
              ),
              features: planFeatures,
              is_popular: Array.isArray(mainEntry.is_popular) ? (mainEntry.is_popular[index] || false) : (mainEntry.is_popular || false)
            });
          });
        } else {
          // Handle multiple entries format - one entry per plan
          const plansMap = new Map<string, any>();
          
          result
            .filter((e: any) => e.plan_name)
            .forEach((entry: any) => {
              const planName = Array.isArray(entry.plan_name) ? entry.plan_name[0] : entry.plan_name;
              if (!planName) return;
              
              if (!plansMap.has(planName)) {
                const planFeatures = [];
                
                // Extract features
                if (entry.features && Array.isArray(entry.features)) {
                  entry.features.forEach((feature: any) => {
                    if (typeof feature === 'string') {
                      planFeatures.push({ feature: feature });
                    } else if (feature.feature) {
                      planFeatures.push({ feature: feature.feature });
                    }
                  });
                } else if (entry.feature) {
                  if (Array.isArray(entry.feature)) {
                    entry.feature.forEach((feature: any) => {
                      if (typeof feature === 'string') {
                        planFeatures.push({ feature: feature });
                      } else if (feature.feature) {
                        planFeatures.push({ feature: feature.feature });
                      }
                    });
                  } else if (typeof entry.feature === 'string') {
                    planFeatures.push({ feature: entry.feature });
                  } else if (entry.feature.feature) {
                    planFeatures.push({ feature: entry.feature.feature });
                  }
                }
                
                plansMap.set(planName, {
                  plan_name: planName,
                  price: entry.price || '',
                  period: entry.period || '',
                  description: cleanPricingDescription(entry.plan_description || entry.description || ''),
                  features: planFeatures,
                  is_popular: entry.is_popular || false
                });
              } else {
                // Add additional features to existing plan
                const plan = plansMap.get(planName)!;
                if (entry.feature) {
                  if (typeof entry.feature === 'string') {
                    plan.features.push({ feature: entry.feature });
                  } else if (entry.feature.feature) {
                    plan.features.push({ feature: entry.feature.feature });
                  }
                }
              }
            });
          
          plans.push(...Array.from(plansMap.values()));
        }
        
        console.log('📊 Pricing plans fetched:', plans.length, 'plans');
        console.log('📊 Pricing data structure:', {
          title: mainEntry.section_title || mainEntry.title,
          description: mainEntry.section_description || mainEntry.description,
          plansCount: plans.length
        });

        // Clean description to remove HTML tags, especially <p> tags
        const cleanDescription = (desc: string): string => {
          if (!desc) return '';
          return String(desc)
            .replace(/<p[^>]*>/g, '')
            .replace(/<\/p>/g, '\n\n')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim();
        };

        return {
          title: mainEntry.section_title || mainEntry.title || 'Choose Your Plan',
          description: cleanDescription(mainEntry.section_description || mainEntry.description || 'Start free and scale as you grow. All plans include our core features.'),
          plans: plans.length > 0 ? plans : []
        };
      }
      
      console.warn('⚠️ No pricing plans entries found in Contentstack');
      return null;
    } catch (error) {
      console.error('❌ Error fetching pricing plans content:', error);
      return null;
    }
  },

  // Get why choose platform content
  async getWhyChoosePlatformContent(): Promise<WhyChoosePlatformContent | null> {
    try {
      const { contentstackConfig } = await import('./contentstack');
      const { apiKey, deliveryToken, environment, branch } = contentstackConfig as any;
      const url = `https://cdn.contentstack.io/v3/content_types/why_choose_platform/entries?environment=${encodeURIComponent(environment)}&locale=en-us&include_fallback=true&access_token=${encodeURIComponent(deliveryToken)}`;
      const resp = await fetch(url, { headers: { 'api_key': apiKey, 'branch': branch } });
      const json = await resp.json();
      const result = json?.entries || [];
      
      if (result.length > 0) {
        const mainEntry = result[0];
        
        // Check if benefit_title is an array
        if (mainEntry.benefit_title && Array.isArray(mainEntry.benefit_title)) {
          const titles = mainEntry.benefit_title || [];
          const descriptions = Array.isArray(mainEntry.benefit_description) ? mainEntry.benefit_description : [];
          const icons = Array.isArray(mainEntry.benefit_icon) ? mainEntry.benefit_icon : [];
          const colors = Array.isArray(mainEntry.benefit_color) ? mainEntry.benefit_color : [];
          
          // Clean HTML from descriptions
          const cleanDescription = (desc: string): string => {
            if (!desc) return '';
            return String(desc)
              .replace(/<p[^>]*>/g, '')
              .replace(/<\/p>/g, '\n\n')
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\n\s*\n\s*\n/g, '\n\n')
              .trim();
          };
          
          // Default color mapping
          const getDefaultColor = (title: string, index: number): string => {
            const titleLower = title.toLowerCase();
            if (titleLower.includes('uptime') || titleLower.includes('sla') || titleLower.includes('reliability')) return 'green';
            if (titleLower.includes('security') || titleLower.includes('safe') || titleLower.includes('encrypt')) return 'blue';
            if (titleLower.includes('support') || titleLower.includes('help') || titleLower.includes('service')) return 'purple';
            if (titleLower.includes('cdn') || titleLower.includes('delivery') || titleLower.includes('speed')) return 'pink';
            // Default cycling
            const defaultColors = ['green', 'blue', 'purple', 'pink'];
            return defaultColors[index % defaultColors.length];
          };
          
          const benefits = titles.map((title: string, index: number) => ({
            title: title || '',
            description: cleanDescription(descriptions[index] || ''),
            icon: (icons[index] || '').toLowerCase().trim() || 'checkcircle',
            color: (colors[index] || '').toLowerCase().trim() || getDefaultColor(title, index)
          })).filter((b: any) => b.title);
          
          console.log('📊 Why Choose Platform benefits fetched:', benefits.length);
          
          return {
            title: mainEntry.title || 'Why Choose Our Platform?',
            description: mainEntry.description || 'Experience the power of next-generation content management',
            benefits: benefits.length > 0 ? benefits : []
          };
        }
      }
      
      console.warn('⚠️ No why choose platform entries found in Contentstack');
      return null;
    } catch (error) {
      console.error('❌ Error fetching why choose platform content:', error);
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
