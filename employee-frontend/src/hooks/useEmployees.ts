import { useState, useEffect, useMemo } from "react";
import type { Employee, PaginationInfo } from "../types/employee";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";
import useDebounce from "./useDebounce";

export default function useEmployees() {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string>("");
  
  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load all employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEmployees();
      setAllEmployees(response.data);
    } catch (err) {
      setError("Failed to load employees. Please try again.");
      console.error("Error loading employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees based on search term and position filter
  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((employee) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        employee.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesPosition =
        positionFilter === "" || employee.position === positionFilter;

      return matchesSearch && matchesPosition;
    });
  }, [allEmployees, debouncedSearchTerm, positionFilter]);

  // Calculate pagination info based on filtered employees
  const pagination = useMemo((): PaginationInfo | null => {
    if (filteredEmployees.length === 0) return null;
    
    const totalEmployees = filteredEmployees.length;
    const totalPages = Math.ceil(totalEmployees / pageSize);
    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;

    return {
      currentPage,
      totalPages,
      totalEmployees,
      hasNext,
      hasPrev,
      limit: pageSize,
    };
  }, [filteredEmployees.length, currentPage, pageSize]);

  // Get current page employees from filtered results
  const employees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, currentPage, pageSize]);

  const createEmployee = async (employeeData: Omit<Employee, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addEmployee(employeeData);
      console.log("Employee added successfully:", response.data.name);
      await loadEmployees();
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
      console.log("Employee updated successfully:", response.data.name);
      await loadEmployees();
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
      const employeeToDelete = allEmployees.find((emp) => emp.id === id);
      await deleteEmployee(id);

      if (employeeToDelete) {
        console.log("Employee deleted successfully:", employeeToDelete.name);
      }

      // Check if we need to go to previous page after deletion
      const remainingEmployees = allEmployees.filter(emp => emp.id !== id);
      const totalPages = Math.ceil(remainingEmployees.length / pageSize);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }

      await loadEmployees();
    } catch (err) {
      setError("Failed to delete employee. Please try again.");
      console.error("Error deleting employee:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search term changes
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle position filter changes
  const handlePositionFilterChange = (position: string) => {
    setPositionFilter(position);
    setCurrentPage(1); // Reset to first page when filtering
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
    goToPage,
    nextPage,
    prevPage,
    handleSearchChange,
    handlePositionFilterChange,
    searchTerm,
    positionFilter,
  };
}
