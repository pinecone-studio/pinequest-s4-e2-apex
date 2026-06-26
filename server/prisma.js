// Single shared Prisma client for the API server.
// The generated client lives under src/generated (server-side only — the Expo
// app never bundles it; see metro.config.js).
const { PrismaClient } = require('../src/generated/prisma/client');

const prisma = new PrismaClient();

module.exports = { prisma };
