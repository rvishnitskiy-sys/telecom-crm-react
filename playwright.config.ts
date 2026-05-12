import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    headless: true,
  },
});