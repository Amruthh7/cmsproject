// Create and publish pricing plan entries in Contentstack via Management API
// Usage:
//   CS_API_KEY=... CS_MANAGEMENT_TOKEN=... NODE_OPTIONS=--experimental-fetch node create-pricing-plans.mjs

const API_KEY = process.env.CS_API_KEY;
const MGMT_TOKEN = process.env.CS_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.CS_ENVIRONMENT || 'cmsproject';
const BRANCH = process.env.CS_BRANCH || 'cmsproject';

if (!API_KEY || !MGMT_TOKEN) {
  console.error('Missing CS_API_KEY or CS_MANAGEMENT_TOKEN env vars');
  process.exit(1);
}

const BASE_URL = 'https://api.contentstack.io/v3';
const CONTENT_TYPE = 'pricing_plans';

const plans = [
  {
    plan_name: 'Free',
    price: '$0',
    period: 'per month',
    plan_description: 'Perfect for getting started and exploring the platform.',
    features: [
      { feature: 'Up to 1,000 API calls/month' },
      { feature: '1 environment' },
      { feature: '1 user' },
      { feature: 'Community support' },
    ],
    is_popular: false,
  },
  {
    plan_name: 'Starter',
    price: '$49',
    period: 'per month',
    plan_description: 'Ideal for small teams shipping their first projects.',
    features: [
      { feature: 'Up to 250,000 API calls/month' },
      { feature: '2 environments' },
      { feature: '5 users' },
      { feature: 'Basic roles & permissions' },
      { feature: 'Email support' },
    ],
    is_popular: false,
  },
  {
    plan_name: 'Growth',
    price: '$199',
    period: 'per month',
    plan_description: 'Best for growing teams that need scale and collaboration.',
    features: [
      { feature: 'Up to 5,000,000 API calls/month' },
      { feature: '4 environments' },
      { feature: '20 users' },
      { feature: 'Advanced roles & permissions' },
      { feature: 'Webhooks & Automation' },
      { feature: 'Priority support' },
    ],
    is_popular: true,
  },
  {
    plan_name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    plan_description: 'For mission-critical workloads requiring security, scale, and compliance.',
    features: [
      { feature: 'Unlimited API scale' },
      { feature: 'Custom environments' },
      { feature: 'SSO/SAML & SCIM' },
      { feature: 'VPC/Peering & Private networking' },
      { feature: 'DPA, SOC2 Type II' },
      { feature: '99.99% SLA & Dedicated CSM' },
    ],
    is_popular: false,
  },
];

async function createEntry(plan) {
  const res = await fetch(`${BASE_URL}/content_types/${CONTENT_TYPE}/entries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: MGMT_TOKEN,
      api_key: API_KEY,
      branch: BRANCH,
    },
    body: JSON.stringify({ entry: plan }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Create failed: ${res.status} ${res.statusText} -> ${err}`);
  }
  const json = await res.json();
  return json.entry?.uid;
}

async function publishEntry(uid) {
  const res = await fetch(`${BASE_URL}/content_types/${CONTENT_TYPE}/entries/${uid}/publish`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: MGMT_TOKEN,
      api_key: API_KEY,
      branch: BRANCH,
    },
    body: JSON.stringify({ entry: { environments: [ENVIRONMENT], locales: ['en-us'] } }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Publish failed: ${res.status} ${res.statusText} -> ${err}`);
  }
}

(async () => {
  for (const plan of plans) {
    try {
      const uid = await createEntry(plan);
      console.log(`Created: ${plan.plan_name} -> ${uid}`);
      await publishEntry(uid);
      console.log(`Published: ${plan.plan_name}`);
    } catch (e) {
      console.error(`Error processing ${plan.plan_name}:`, e.message);
    }
  }
})();


