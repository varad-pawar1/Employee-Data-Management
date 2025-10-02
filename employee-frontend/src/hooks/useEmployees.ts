import { useState, useEffect } from "react";
import type { Employee, PaginationInfo } from "../types/employee";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

export default function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  // Load employees on component mount and when page changes
  useEffect(() => {
    loadEmployees(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const loadEmployees = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEmployees(page, limit);
      setEmployees(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to load employees. Please try again.");
      console.error("Error loading employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addEmployee(employeeData);
      console.log("✅ Employee added successfully:", response.data.name);
      await loadEmployees(currentPage, pageSize);
      console.log("✅ Employee added successfully:", response.data.name);
    } catch (err) {
      setError("Failed to add employee. Please try again.");
      console.error("Error adding employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const editEmployee = async (
    id: number,
    employeeData: Omit<Employee, "id">
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateEmployee(id, employeeData);
      console.log("✅ Employee updated successfully:", response.data.name);
      await loadEmployees(currentPage, pageSize);
    } catch (err) {
      setError("Failed to update employee. Please try again.");
      console.error("Error updating employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeEmployee = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const employeeToDelete = employees.find((emp) => emp.id === id);
      await deleteEmployee(id);

      if (employeeToDelete) {
        console.log("✅ Employee deleted successfully:", employeeToDelete.name);
      }

      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await loadEmployees(currentPage, pageSize);
      }
    } catch (err) {
      setError("Failed to delete employee. Please try again.");
      console.error("Error deleting employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && pagination && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (pagination && pagination.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination && pagination.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    employees,
    pagination,
    loading,
    error,
    currentPage,
    createEmployee,
    editEmployee,
    removeEmployee,
    loadEmployees,
    goToPage,
    nextPage,
    prevPage,
  };
}
