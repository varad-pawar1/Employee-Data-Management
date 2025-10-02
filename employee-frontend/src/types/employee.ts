import { ROLES } from "../utils/constants";
export type RoleType = (typeof ROLES)[number];

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: RoleType;
} 

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalEmployees: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
}
