import Contentstack from 'contentstack';

// Contentstack configuration
const apiKey = import.meta.env.VITE_CONTENTSTACK_API_KEY || 'blt755dc6238a6bbc27';
const deliveryToken = import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN || 'cs05eb74f9e80cece6d90fd6e3';
// Note: Use branch name as environment (cmsproject was mentioned as the branch name)
const environment = import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT || 'cmsproject';
const region = import.meta.env.VITE_CONTENTSTACK_REGION || 'us';

// Debug: Show current configuration
console.log('🔧 Current Contentstack Configuration:');
console.log('  API Key:', apiKey);
console.log('  Delivery Token:', deliveryToken);
console.log('  Environment:', environment);
console.log('  Region:', region);
console.log('  Environment Variables:');
console.log('    VITE_CONTENTSTACK_API_KEY:', import.meta.env.VITE_CONTENTSTACK_API_KEY || 'NOT SET');
console.log('    VITE_CONTENTSTACK_DELIVERY_TOKEN:', import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN || 'NOT SET');
console.log('    VITE_CONTENTSTACK_ENVIRONMENT:', import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT || 'NOT SET');
console.log('    VITE_CONTENTSTACK_REGION:', import.meta.env.VITE_CONTENTSTACK_REGION || 'NOT SET');

// Log configuration (only in dev)
if (import.meta.env.DEV) {
  console.log('🔧 Contentstack Configuration:');
  console.log('  API Key:', apiKey.substring(0, 10) + '...');
  console.log('  Delivery Token:', deliveryToken.substring(0, 10) + '...');
  console.log('  Environment:', environment);
  console.log('  Region:', region);
}

const Stack = Contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
  region: region,
});

export default Stack;
