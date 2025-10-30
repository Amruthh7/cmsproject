#!/usr/bin/env node

/**
 * Contentstack Entry Creation Script
 * 
 * This script automatically creates all entries in your Contentstack stack using the Management API.
 * 
 * Prerequisites:
 * 1. All content types must be created in Contentstack first
 * 2. Management token must have proper permissions
 * 
 * Usage:
 * node create-contentstack-entries.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contentstack Management API configuration
const config = {
  api_key: 'blt755dc6238a6bbc27',
  management_token: 'cs8f11635528ccb3a9f8edd741',
  branch: 'cmsproject',
  base_url: 'https://api.contentstack.io/v3'
};

// Content types and their corresponding entry files
const contentTypes = [
  {
    uid: 'hero_section',
    name: 'Hero Section',
    files: ['hero-section-entry.json']
  },
  {
    uid: 'about_page',
    name: 'About Page',
    files: ['about-page-entry.json']
  },
  {
    uid: 'career_page',
    name: 'Career Page',
    files: ['career-page-entry.json']
  },
  {
    uid: 'features',
    name: 'Features',
    files: [
      'features-entry-1.json',
      'features-entry-2.json',
      'features-entry-3.json',
      'features-entry-4.json',
      'features-entry-5.json',
      'features-entry-6.json'
    ]
  },
  {
    uid: 'pricing_plans',
    name: 'Pricing Plans',
    files: [
      'pricing-plans-entry-1.json',
      'pricing-plans-entry-2.json',
      'pricing-plans-entry-3.json'
    ]
  },
  {
    uid: 'trust_indicators',
    name: 'Trust Indicators',
    files: [
      'trust-indicators-entry-1.json',
      'trust-indicators-entry-2.json',
      'trust-indicators-entry-3.json',
      'trust-indicators-entry-4.json'
    ]
  },
  {
    uid: 'use_cases',
    name: 'Use Cases',
    files: [
      'use-cases-entry-1.json',
      'use-cases-entry-2.json',
      'use-cases-entry-3.json',
      'use-cases-entry-4.json'
    ]
  }
];

function readEntryFile(filename) {
  const filePath = path.join(__dirname, 'entries', filename);
  try {
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
  
  // Remove UID to avoid conflicts
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
  
  // Handle image fields - convert URLs to empty strings to avoid upload errors
  const imageFields = ['leader_photo', 'team_member_photo', 'feature_image'];
  imageFields.forEach(field => {
    if (cleanedEntry[field] && typeof cleanedEntry[field] === 'string') {
      // If it's a URL, remove it to avoid upload errors
      if (cleanedEntry[field].startsWith('http')) {
        delete cleanedEntry[field];
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
      body: JSON.stringify(entryData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Entry created successfully: ${result.entry?.title || 'Untitled'}`);
      console.log(`   UID: ${result.entry?.uid}`);
      return { success: true, data: result };
    } else {
      console.error(`❌ Failed to create entry:`, result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`❌ Network error creating entry:`, error.message);
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
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(publishData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Entry published successfully to ${config.branch}`);
      return { success: true, data: result };
    } else {
      console.error(`❌ Failed to publish entry:`, result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`❌ Network error publishing entry:`, error.message);
    return { success: false, error: error.message };
  }
}

async function createAllEntries() {
  console.log('🚀 Starting Contentstack Entry Creation');
  console.log('========================================\n');
  
  console.log('📋 Configuration:');
  console.log(`   API Key: ${config.api_key}`);
  console.log(`   Branch: ${config.branch}`);
  console.log(`   Management Token: ${config.management_token.substring(0, 10)}...`);
  console.log('');

  let totalCreated = 0;
  let totalPublished = 0;
  let totalErrors = 0;

  for (const contentType of contentTypes) {
    console.log(`📝 Creating ${contentType.name} entries (${contentType.uid})`);
    console.log('─'.repeat(60));

    // For single-entry content types, only create the first entry
    const filesToProcess = contentType.files.slice(0, 1);
    
    for (const filename of filesToProcess) {
      const entryData = readEntryFile(filename);
      
      if (!entryData) {
        console.log(`⏭️  Skipping ${filename} (file not found or invalid)`);
        continue;
      }

      // Clean the entry data to avoid conflicts
      const cleanedEntry = cleanEntryData(entryData);
      
      // Create entry
      const createResult = await createEntry(contentType.uid, { entry: cleanedEntry });
      
      if (createResult.success) {
        totalCreated++;
        
        // Publish entry
        const entryUid = createResult.data.entry.uid;
        const publishResult = await publishEntry(contentType.uid, entryUid);
        
        if (publishResult.success) {
          totalPublished++;
        } else {
          totalErrors++;
          console.log(`⚠️  Entry created but failed to publish: ${entryUid}`);
        }
      } else {
        totalErrors++;
        console.log(`❌ Failed to create entry from ${filename}`);
        console.log(`   Error: ${JSON.stringify(createResult.error)}`);
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('');
  }

  console.log('📊 Summary');
  console.log('==========');
  console.log(`✅ Entries created: ${totalCreated}`);
  console.log(`✅ Entries published: ${totalPublished}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('');

  if (totalCreated > 0) {
    console.log('🎉 Entry creation completed!');
    console.log('');
    console.log('🧪 Next Steps:');
    console.log('1. Test API connection: http://localhost:5173/test-contentstack');
    console.log('2. Check all pages show dynamic content');
    console.log('3. Verify entries in Contentstack dashboard');
  } else {
    console.log('❌ No entries were created. Please check:');
    console.log('1. Content types exist in Contentstack');
    console.log('2. Management token has proper permissions');
    console.log('3. API credentials are correct');
  }
}

// Run the script
createAllEntries().catch(console.error);
