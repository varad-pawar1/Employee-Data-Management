import axios from "axios";
import type { Employee } from "../types/employee";
import { config, API_ENDPOINTS } from "../utils/config";

const API = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(
      `✅ API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const getEmployees = () =>
  API.get<Employee[]>(API_ENDPOINTS.EMPLOYEES).then((response) => {
    console.log("✅ Fetched Employees Data:", response.data);
    return response;
  });

export const addEmployee = (employee: Omit<Employee, "id">) =>
  API.post<Employee>(API_ENDPOINTS.EMPLOYEES, employee);

export const updateEmployee = (id: number, employee: Omit<Employee, "id">) =>
  API.put<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), employee);

export const deleteEmployee = (id: number) =>
  API.delete(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
