import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta.env
const env = {
  VITE_API_URL: 'http://localhost:3000',
  PROD: false,
  DEV: true,
};

(global as any).import = {
  meta: {
    env,
  },
};