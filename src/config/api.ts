// API Configuration for Brother Ben Backend
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod',
  endpoints: {
    chat: '/chat',
    analyze: '/analyze'
  },
  timeout: 30000 // 30 seconds
};
