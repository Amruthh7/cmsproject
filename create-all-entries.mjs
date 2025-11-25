#!/usr/bin/env node

/**
 * Contentstack Entry Creation Script - Complete
 * 
 * This script automatically creates ALL entries in your Contentstack stack using the Management API.
 * 
 * Prerequisites:
 * 1. All content types must be created in Contentstack first
 * 2. Management token must have proper permissions
 * 3. Environment variables or config must be set
 * 
 * Usage:
 * node create-all-entries.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contentstack Management API configuration
const config = {
  api_key: process.env.CONTENTSTACK_API_KEY || 'blt755dc6238a6bbc27',
  management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN || 'cs8f11635528ccb3a9f8edd741',
  branch: process.env.CONTENTSTACK_BRANCH || 'cmsproject',
  base_url: 'https://api.contentstack.io/v3'
};

// Content types and their corresponding entry files
const contentTypes = [
  {
    uid: 'hero_section',
    name: 'Hero Section',
    files: ['hero-section-entry.json'],
    isSingleton: true
  },
  {
    uid: 'about_page',
    name: 'About Page',
    files: ['about-page-entry.json'],
    isSingleton: true
  },
  {
    uid: 'career_page',
    name: 'Career Page',
    files: ['career-page-entry.json'],
    isSingleton: true
  },
  {
    uid: 'features',
    name: 'Features',
    files: [
      'features-entry-1.json'
    ],
    isSingleton: true // Based on current structure - single entry with arrays
  },
  {
    uid: 'pricing_plans',
    name: 'Pricing Plans',
    files: [
      'pricing-plans-entry-1.json'
    ],
    isSingleton: true
  },
  {
    uid: 'trust_indicators',
    name: 'Trust Indicators',
    files: [
      'trust-indicators-entry-1.json',
      'trust-indicators-entry-2.json',
      'trust-indicators-entry-3.json',
      'trust-indicators-entry-4.json'
    ],
    isSingleton: false
  },
  {
    uid: 'use_cases',
    name: 'Use Cases',
    files: [
      'use-cases-entry-1.json',
      'use-cases-entry-2.json',
      'use-cases-entry-3.json',
      'use-cases-entry-4.json'
    ],
    isSingleton: false
  },
  {
    uid: 'why_choose_platform',
    name: 'Why Choose Platform',
    files: ['why-choose-platform-entry.json'],
    isSingleton: true,
    entryPath: '../why-choose-platform-entry.json' // In root, not entries folder
  }
];

function readEntryFile(filename, contentType) {
  let filePath;
  
  // Handle why_choose_platform which is in root
  if (contentType.uid === 'why_choose_platform' && contentType.entryPath) {
    filePath = path.join(__dirname, contentType.entryPath);
  } else {
    filePath = path.join(__dirname, 'entries', filename);
  }
  
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    return null;
  }
}

function cleanEntryData(entryData) {
  // Extract the actual entry data from the JSON structure
  const entry = entryData.entry || entryData;
  
  // Remove system fields to avoid conflicts
  const cleanedEntry = { ...entry };
  delete cleanedEntry.uid;
  delete cleanedEntry._version;
  delete cleanedEntry.created_at;
  delete cleanedEntry.updated_at;
  delete cleanedEntry.created_by;
  delete cleanedEntry.updated_by;
  delete cleanedEntry.ACL;
  delete cleanedEntry.tags;
  delete cleanedEntry._in_progress;
  delete cleanedEntry.url;
  delete cleanedEntry.locale;
  delete cleanedEntry._metadata;
  
  // Handle image fields - remove if they're URLs (will need to be uploaded separately)
  const imageFields = ['leader_photo', 'team_member_photo', 'feature_image', 'manager_photo'];
  imageFields.forEach(field => {
    if (cleanedEntry[field]) {
      if (typeof cleanedEntry[field] === 'string' && cleanedEntry[field].startsWith('http')) {
        // Remove URL images - they need to be uploaded as assets first
        delete cleanedEntry[field];
      } else if (typeof cleanedEntry[field] === 'object' && cleanedEntry[field].url) {
        // Keep object structure if it exists
        if (cleanedEntry[field].url.startsWith('http')) {
          delete cleanedEntry[field];
        }
      }
    }
  });
  
  return cleanedEntry;
}

async function createEntry(contentTypeUid, entryData) {
  const url = `${config.base_url}/content_types/${contentTypeUid}/entries`;
  
  const headers = {
    'api_key': config.api_key,
    'authorization': config.management_token,
    'Content-Type': 'application/json',
    'branch': config.branch
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ entry: entryData })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Created: ${result.entry?.title || result.entry?.uid || 'Untitled'}`);
      return { success: true, data: result, uid: result.entry?.uid };
    } else {
      // Check if entry already exists
      if (result.error_code === 109 || result.errorMessage?.includes('already exists')) {
        console.log(`   ⚠️  Entry already exists, skipping...`);
        return { success: false, error: 'Already exists', skip: true };
      }
      console.error(`   ❌ Failed:`, result.errorMessage || result.error || JSON.stringify(result));
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`   ❌ Network error:`, error.message);
    return { success: false, error: error.message };
  }
}

async function updateEntry(contentTypeUid, entryUid, entryData) {
  const url = `${config.base_url}/content_types/${contentTypeUid}/entries/${entryUid}`;
  
  const headers = {
    'api_key': config.api_key,
    'authorization': config.management_token,
    'Content-Type': 'application/json',
    'branch': config.branch
  };

  try {
    // First get the entry to get its version
    const getUrl = `${config.base_url}/content_types/${contentTypeUid}/entries/${entryUid}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        'api_key': config.api_key,
        'authorization': config.management_token,
        'branch': config.branch
      }
    });
    
    const getResult = await getResponse.json();
    const version = getResult.entry?._version || 1;
    
    // Update entry
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ 
        entry: { ...entryData, _version: version }
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Updated: ${result.entry?.title || entryUid}`);
      return { success: true, data: result, uid: result.entry?.uid };
    } else {
      console.error(`   ❌ Update failed:`, result.errorMessage || result.error);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`   ❌ Network error updating:`, error.message);
    return { success: false, error: error.message };
  }
}

async function publishEntry(contentTypeUid, entryUid) {
  const url = `${config.base_url}/content_types/${contentTypeUid}/entries/${entryUid}/publish`;
  
  const headers = {
    'api_key': config.api_key,
    'authorization': config.management_token,
    'Content-Type': 'application/json',
    'branch': config.branch
  };

  const publishData = {
    entry: {
      environments: [config.branch]
    },
    locale: 'en-us'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(publishData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Published to ${config.branch}`);
      return { success: true };
    } else {
      // Check if already published
      if (result.errorMessage?.includes('already published') || result.errorMessage?.includes('Published')) {
        console.log(`   ℹ️  Already published`);
        return { success: true, alreadyPublished: true };
      }
      console.error(`   ❌ Publish failed:`, result.errorMessage || result.error);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`   ❌ Network error publishing:`, error.message);
    return { success: false, error: error.message };
  }
}

async function findExistingEntry(contentTypeUid, title) {
  const url = `${config.base_url}/content_types/${contentTypeUid}/entries`;
  
  const headers = {
    'api_key': config.api_key,
    'authorization': config.management_token,
    'branch': config.branch
  };

  try {
    const response = await fetch(url, {
      headers: headers
    });

    const result = await response.json();
    
    if (response.ok && result.entries && result.entries.length > 0) {
      // For singleton content types, return first entry
      return result.entries[0]?.uid || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function createAllEntries() {
  console.log('🚀 Contentstack Entry Creation - Complete');
  console.log('==========================================\n');
  
  console.log('📋 Configuration:');
  console.log(`   API Key: ${config.api_key}`);
  console.log(`   Branch: ${config.branch}`);
  console.log(`   Management Token: ${config.management_token.substring(0, 10)}...`);
  console.log('');

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalPublished = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const contentType of contentTypes) {
    console.log(`📝 Processing: ${contentType.name} (${contentType.uid})`);
    console.log('─'.repeat(60));

    // For singleton content types, only process first file
    const filesToProcess = contentType.isSingleton ? contentType.files.slice(0, 1) : contentType.files;
    
    for (const filename of filesToProcess) {
      const entryData = readEntryFile(filename, contentType);
      
      if (!entryData) {
        console.log(`   ⏭️  Skipping ${filename} (file not found or invalid)`);
        totalSkipped++;
        continue;
      }

      // Clean the entry data
      const cleanedEntry = cleanEntryData(entryData);
      const entryTitle = cleanedEntry.title || cleanedEntry.section_title || filename;
      
      // Check if entry already exists (for singleton types)
      let existingUid = null;
      if (contentType.isSingleton) {
        existingUid = await findExistingEntry(contentType.uid, entryTitle);
      }
      
      let result;
      if (existingUid) {
        console.log(`   🔄 Entry exists (UID: ${existingUid}), updating...`);
        result = await updateEntry(contentType.uid, existingUid, cleanedEntry);
        if (result.success) {
          totalUpdated++;
        } else {
          totalErrors++;
          continue;
        }
      } else {
        console.log(`   ➕ Creating new entry...`);
        result = await createEntry(contentType.uid, cleanedEntry);
        if (result.success) {
          totalCreated++;
        } else if (result.skip) {
          totalSkipped++;
          continue;
        } else {
          totalErrors++;
          continue;
        }
      }
      
      // Publish entry
      const entryUid = result.uid || existingUid;
      if (entryUid) {
        console.log(`   📤 Publishing entry...`);
        const publishResult = await publishEntry(contentType.uid, entryUid);
        
        if (publishResult.success) {
          totalPublished++;
        } else {
          console.log(`   ⚠️  Entry ${entryUid} created but failed to publish`);
        }
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    console.log('');
  }

  console.log('📊 Summary');
  console.log('==========');
  console.log(`✅ Entries created: ${totalCreated}`);
  console.log(`🔄 Entries updated: ${totalUpdated}`);
  console.log(`✅ Entries published: ${totalPublished}`);
  console.log(`⏭️  Entries skipped: ${totalSkipped}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('');

  if (totalCreated > 0 || totalUpdated > 0) {
    console.log('🎉 Entry creation/update completed!');
    console.log('');
    console.log('🧪 Next Steps:');
    console.log('1. Verify entries in Contentstack dashboard');
    console.log('2. Test pages: http://localhost:5173');
    console.log('3. Check all content is displaying correctly');
  } else if (totalErrors > 0) {
    console.log('❌ Some entries failed. Please check:');
    console.log('1. Content types exist in Contentstack');
    console.log('2. Management token has proper permissions');
    console.log('3. API credentials are correct');
    console.log('4. Branch/environment exists');
  }
}

// Run the script
createAllEntries().catch(console.error);

