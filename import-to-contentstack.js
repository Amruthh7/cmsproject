#!/usr/bin/env node

/**
 * Contentstack Import Script
 * 
 * This script helps you import all entries from the entries/ folder to Contentstack.
 * 
 * Prerequisites:
 * 1. Create all content types in Contentstack first (see CONTENTSTACK_IMPORT_GUIDE.md)
 * 2. Install dependencies: npm install contentstack
 * 3. Set up your Contentstack credentials
 * 
 * Usage:
 * node import-to-contentstack.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contentstack configuration
const config = {
  api_key: 'blt755dc6238a6bbc27',
  delivery_token: 'cs05eb74f9e80cece6d90fd6e3',
  environment: 'cmsproject',
  region: 'us'
};

// Entry files to import
const entriesToImport = [
  {
    contentType: 'hero_section',
    files: ['hero-section-entry.json'],
    title: 'Hero Section'
  },
  {
    contentType: 'about_page',
    files: ['about-page-entry.json'],
    title: 'About Page'
  },
  {
    contentType: 'career_page',
    files: ['career-page-entry.json'],
    title: 'Career Page'
  },
  {
    contentType: 'features',
    files: [
      'features-entry-1.json',
      'features-entry-2.json',
      'features-entry-3.json',
      'features-entry-4.json',
      'features-entry-5.json',
      'features-entry-6.json'
    ],
    title: 'Features'
  },
  {
    contentType: 'pricing_plans',
    files: [
      'pricing-plans-entry-1.json',
      'pricing-plans-entry-2.json',
      'pricing-plans-entry-3.json'
    ],
    title: 'Pricing Plans'
  },
  {
    contentType: 'trust_indicators',
    files: [
      'trust-indicators-entry-1.json',
      'trust-indicators-entry-2.json',
      'trust-indicators-entry-3.json',
      'trust-indicators-entry-4.json'
    ],
    title: 'Trust Indicators'
  },
  {
    contentType: 'use_cases',
    files: [
      'use-cases-entry-1.json',
      'use-cases-entry-2.json',
      'use-cases-entry-3.json',
      'use-cases-entry-4.json'
    ],
    title: 'Use Cases'
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

function displayImportInstructions() {
  console.log('🚀 Contentstack Import Instructions');
  console.log('=====================================\n');
  
  console.log('📋 Prerequisites:');
  console.log('1. Create all content types in Contentstack dashboard first');
  console.log('2. Ensure you have access to the cmsproject environment');
  console.log('3. All entries must be published to cmsproject environment\n');
  
  console.log('📁 Content Types to Create:');
  console.log('- hero_section');
  console.log('- about_page');
  console.log('- career_page');
  console.log('- features');
  console.log('- pricing_plans');
  console.log('- trust_indicators');
  console.log('- use_cases\n');
  
  console.log('📝 Import Process:');
  console.log('For each content type, follow these steps:\n');
  
  entriesToImport.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.title} (${entry.contentType})`);
    console.log(`   Go to: Contentstack Dashboard → Content → ${entry.contentType} → Create New Entry`);
    console.log(`   Files to import:`);
    entry.files.forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log(`   Steps:`);
    console.log(`   - Create new entry`);
    console.log(`   - Copy content from JSON file(s)`);
    console.log(`   - Save entry`);
    console.log(`   - Publish to "cmsproject" environment`);
    console.log('');
  });
  
  console.log('🧪 After Import:');
  console.log('1. Test API connection: http://localhost:5173/test-contentstack');
  console.log('2. Check all pages show dynamic content');
  console.log('3. Verify entries are published to cmsproject environment\n');
  
  console.log('📖 For detailed instructions, see: CONTENTSTACK_IMPORT_GUIDE.md');
}

function displayEntryData() {
  console.log('\n📄 Entry Data Preview:');
  console.log('======================\n');
  
  entriesToImport.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.title} (${entry.contentType})`);
    console.log('─'.repeat(50));
    
    entry.files.forEach((file, fileIndex) => {
      const data = readEntryFile(file);
      if (data) {
        console.log(`\n   File ${fileIndex + 1}: ${file}`);
        console.log('   Sample fields:');
        
        // Show first few fields as preview
        const fields = Object.keys(data).slice(0, 5);
        fields.forEach(field => {
          const value = data[field];
          const preview = typeof value === 'string' ? 
            (value.length > 50 ? value.substring(0, 50) + '...' : value) :
            JSON.stringify(value).substring(0, 50) + '...';
          console.log(`   - ${field}: ${preview}`);
        });
        
        if (Object.keys(data).length > 5) {
          console.log(`   ... and ${Object.keys(data).length - 5} more fields`);
        }
      }
    });
    console.log('');
  });
}

function main() {
  console.log('🎯 Contentstack Import Helper');
  console.log('==============================\n');
  
  console.log('This script will help you import all entries to Contentstack.');
  console.log('Note: This is a helper script. You still need to manually create entries in Contentstack.\n');
  
  displayImportInstructions();
  displayEntryData();
  
  console.log('✅ Ready to import!');
  console.log('Follow the instructions above to import all entries to Contentstack.');
  console.log('\n🔗 Contentstack Dashboard: https://app.contentstack.com/');
  console.log('📚 Full Guide: CONTENTSTACK_IMPORT_GUIDE.md');
}

// Run the script
main();
