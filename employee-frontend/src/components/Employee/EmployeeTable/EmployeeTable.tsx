import { useState } from "react";
import type { Employee, PaginationInfo } from "../../../types/employee";
import Loader from "../../common/Loader/Loader";
import Pagination from "../../common/Pagination/Pagination";
import "./EmployeeTable.css";

interface Props {
  employees: Employee[];
  pagination?: PaginationInfo | null;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onPageChange?: (page: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  loading?: boolean;
}

const EmployeeTable = ({
  employees,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
  onNextPage,
  onPrevPage,
  loading = false,
}: Props) => {
  const [sortField, setSortField] = useState<keyof Employee | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleDelete = async (id: number, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    )
      return;
    onDelete(id);
  };

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getSortIcon = (field: keyof Employee) => {
    if (sortField !== field) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  if (loading) {
    return (
      <div className="table-loading">
        <Loader text="Loading employees..." />
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="table-empty">
        <div className="empty-icon">
          <i className="fa-solid fa-users"></i>
        </div>
        <h3>No employees found</h3>
        <p>Start by adding your first employee to the system.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      {/* <div className="table-header">
        <span className="table-count">
          Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}
        </span>
      </div> */}

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort("id")}>
                ID {getSortIcon("id")}
              </th>
              <th className="sortable" onClick={() => handleSort("name")}>
                Name {getSortIcon("name")}
              </th>
              <th className="sortable" onClick={() => handleSort("email")}>
                Email {getSortIcon("email")}
              </th>
              <th className="sortable" onClick={() => handleSort("position")}>
                Position {getSortIcon("position")}
              </th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="id-cell">
                  <span className="employee-id">#{emp.id}</span>
                </td>
                <td className="name-cell">
                  <div className="employee-info">
                    <div className="employee-avatar">
                      {emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <span className="employee-name">{emp.name}</span>
                  </div>
                </td>
                <td className="email-cell">
                  <a href={`mailto:${emp.email}`} className="email-link">
                    {emp.email}
                  </a>
                </td>
                <td className="position-cell">
                  <span
                    className={`position-badge position-${emp.position.toLowerCase()}`}
                  >
                    {emp.position}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => onEdit(emp)}
                      title="Edit employee"
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(emp.id, emp.name)}
                      title="Delete employee"
                    >
                      <i className="fas fa-trash-alt"></i>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && onPageChange && onNextPage && onPrevPage && (
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
          onNext={onNextPage}
          onPrev={onPrevPage}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
