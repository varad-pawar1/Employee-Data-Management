import type { Employee } from "../types/employee";

export const validateEmployee = (
  employee: Omit<Employee, "id">
): string | null => {
  if (!employee.name) return "Name is required";
  if (!employee.email) return "Email is required";
  if (!employee.position) return "Position is required";
  return null;
};
