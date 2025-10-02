// Configuration for the application
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,

  // App Configuration
  APP_TITLE: import.meta.env.VITE_APP_TITLE,

  // Development flags
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  EMPLOYEES: "/employees",
  EMPLOYEE_BY_ID: (id: number) => `/employees/${id}`,
} as const;
