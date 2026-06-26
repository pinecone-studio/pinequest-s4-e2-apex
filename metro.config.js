// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// The Next.js web app lives under dyslexia-ai/ (own node_modules). Exclude it so
// Metro's file watcher doesn't crawl it and hit the macOS limit (EMFILE).
config.resolver.blockList = [/\/dyslexia-ai\/.*/];

module.exports = config;
