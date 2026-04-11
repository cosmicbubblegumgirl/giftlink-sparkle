const isGitHubPages = typeof window !== 'undefined' && /github\.io$/i.test(window.location.hostname);

const deploymentUrl = process.env.REACT_APP_DEPLOYMENT_URL || 'https://cosmicbubblegumgirl.github.io/giftlink-sparkle/';
const publicUrl = process.env.PUBLIC_URL || '';

const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || (isGitHubPages ? '' : 'http://localhost:5000'),
  deploymentUrl,
  publicUrl
};

export default config;
