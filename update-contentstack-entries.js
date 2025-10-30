#!/usr/bin/env node

/**
 * Contentstack Entry Update Script
 * 
 * This script updates existing entries in your Contentstack stack using the Management API.
 * 
 * Usage:
 * node update-contentstack-entries.js
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
    files: ['features-entry-1.json']
  },
  {
    uid: 'pricing_plans',
    name: 'Pricing Plans',
    files: ['pricing-plans-entry-1.json']
  },
  {
    uid: 'trust_indicators',
    name: 'Trust Indicators',
    files: ['trust-indicators-entry-1.json']
  },
  {
    uid: 'use_cases',
    name: 'Use Cases',
    files: ['use-cases-entry-1.json']
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
  
  // Remove system fields that shouldn't be updated
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

async function getEntries(contentTypeUid) {
  const url = `${config.base_url}/content_types/${contentTypeUid}/entries`;
  
  const headers = {
    'api_key': config.api_key,
    'authorization': config.management_token,
    'branch': config.branch
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    const result = await response.json();
    
    if (response.ok) {
      return result.entries || [];
    } else {
      console.error(`❌ Failed to get entries:`, result);
      return [];
    }
  } catch (error) {
    console.error(`❌ Network error getting entries:`, error.message);
    return [];
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
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ entry: entryData })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Entry updated successfully: ${result.entry?.title || 'Untitled'}`);
      return { success: true, data: result };
    } else {
      console.error(`❌ Failed to update entry:`, result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error(`❌ Network error updating entry:`, error.message);
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

async function updateAllEntries() {
  console.log('🚀 Starting Contentstack Entry Updates');
  console.log('======================================\n');
  
  console.log('📋 Configuration:');
  console.log(`   API Key: ${config.api_key}`);
  console.log(`   Branch: ${config.branch}`);
  console.log(`   Management Token: ${config.management_token.substring(0, 10)}...`);
  console.log('');

  let totalUpdated = 0;
  let totalPublished = 0;
  let totalErrors = 0;

  for (const contentType of contentTypes) {
    console.log(`📝 Updating ${contentType.name} entries (${contentType.uid})`);
    console.log('─'.repeat(60));

    // Get existing entries
    const existingEntries = await getEntries(contentType.uid);
    
    if (existingEntries.length === 0) {
      console.log(`⚠️  No existing entries found for ${contentType.uid}`);
      continue;
    }

    // Use the first entry file for updates
    const filename = contentType.files[0];
    const entryData = readEntryFile(filename);
    
    if (!entryData) {
      console.log(`⏭️  Skipping ${filename} (file not found or invalid)`);
      continue;
    }

    // Clean the entry data
    const cleanedEntry = cleanEntryData(entryData);
    
    // Update the first existing entry
    const entryToUpdate = existingEntries[0];
    console.log(`   Updating entry: ${entryToUpdate.title || 'Untitled'} (${entryToUpdate.uid})`);
    
    const updateResult = await updateEntry(contentType.uid, entryToUpdate.uid, cleanedEntry);
    
    if (updateResult.success) {
      totalUpdated++;
      
      // Publish entry
      const publishResult = await publishEntry(contentType.uid, entryToUpdate.uid);
      
      if (publishResult.success) {
        totalPublished++;
      } else {
        totalErrors++;
        console.log(`⚠️  Entry updated but failed to publish: ${entryToUpdate.uid}`);
      }
    } else {
      totalErrors++;
      console.log(`❌ Failed to update entry from ${filename}`);
      console.log(`   Error: ${JSON.stringify(updateResult.error)}`);
    }
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('');
  }

  console.log('📊 Summary');
  console.log('==========');
  console.log(`✅ Entries updated: ${totalUpdated}`);
  console.log(`✅ Entries published: ${totalPublished}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('');

  if (totalUpdated > 0) {
    console.log('🎉 Entry updates completed!');
    console.log('');
    console.log('🧪 Next Steps:');
    console.log('1. Test API connection: http://localhost:5173/test-contentstack');
    console.log('2. Check all pages show dynamic content');
    console.log('3. Verify entries in Contentstack dashboard');
  } else {
    console.log('❌ No entries were updated. Please check:');
    console.log('1. Content types exist in Contentstack');
    console.log('2. Management token has proper permissions');
    console.log('3. API credentials are correct');
  }
}

// Run the script
updateAllEntries().catch(console.error);
