// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// The server-side Prisma client + query-engine binaries live under src/generated
// and prisma/. The app never imports them, but their large file count makes
// Metro's file watcher hit the macOS per-process limit (EMFILE). Exclude them.
config.resolver.blockList = [/\/src\/generated\/.*/, /\/prisma\/.*/];

module.exports = config;
