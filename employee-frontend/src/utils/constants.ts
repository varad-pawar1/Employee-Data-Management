export const API_BASE_URL = "http://localhost:5000";

export const EMPLOYEE_API = {
  LIST: `${API_BASE_URL}/employees`,
  CREATE: `${API_BASE_URL}/employees`,
  UPDATE: (id: number | string) => `${API_BASE_URL}/employees/${id}`,
  DELETE: (id: number | string) => `${API_BASE_URL}/employees/${id}`,
};

export const ROLES = [
  "Manager",
  "Developer",
  "Designer",
  "Tester",
  "HR",
] as const;

// Only runtime values here (MESSAGES, VALIDATION)
export const MESSAGES = {
  EMPLOYEE_ADDED: "Employee added successfully ✅",
  EMPLOYEE_UPDATED: "Employee updated successfully 🎉",
  EMPLOYEE_DELETED: "Employee deleted successfully ✅",
  ERROR: "Something went wrong ❌",
};

export const VALIDATION = {
  NAME_MIN: 3,
  NAME_MAX: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
