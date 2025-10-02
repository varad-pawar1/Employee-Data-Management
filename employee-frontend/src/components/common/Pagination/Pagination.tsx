import React from "react";
import type { PaginationInfo } from "../../../types/employee";
import "./Pagination.css";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onNext,
  onPrev,
}) => {
  const { currentPage, totalPages, totalEmployees, hasNext, hasPrev, limit } = pagination;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      if (start > 2) pages.push(-1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push(-1);
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) {
    return (
      <div className="pagination-info">
        <span>Showing {totalEmployees} employee{totalEmployees !== 1 ? "s" : ""}</span>
      </div>
    );
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalEmployees)} of {totalEmployees}
        </span>
      </div>
      <div className="pagination-controls">
        <button className="pagination-btn prev-btn" onClick={onPrev} disabled={!hasPrev}>
          <i className="fas fa-chevron-left"></i>
          Previous
        </button>
        <div className="pagination-numbers">
          {getPageNumbers().map((page, idx) =>
            page === -1 ? (
              <span key={`ellipsis-${idx}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button className="pagination-btn next-btn" onClick={onNext} disabled={!hasNext}>
          Next
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;


