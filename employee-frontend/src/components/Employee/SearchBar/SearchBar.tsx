import { useState } from "react";
import "./SearchBar.css";
import { ROLES } from "../../../utils/constants";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  positionFilter?: string;
  onPositionFilterChange?: (position: string) => void;
  showAdvanced?: boolean;
}

const SearchBar = ({ 
  value, 
  onChange, 
  positionFilter = "",
  onPositionFilterChange,
  showAdvanced = false
}: SearchBarProps) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="search-bar">
      <div className="search-main">
        <div className="search-input-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-input"
          />
          {value && (
            <button 
              className="search-clear"
              onClick={() => onChange("")}
              type="button"
            >
              ×
            </button>
          )}
        </div>
        
        {showAdvanced && (
          <button 
            className={`search-toggle ${isAdvancedOpen ? 'active' : ''}`}
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            type="button"
          >
            <i className="fas fa-filter"></i>
            Filters
          </button>
        )}
      </div>
      
      {showAdvanced && isAdvancedOpen && (
        <div className="search-filters">
          <div className="filter-group">
            <label htmlFor="position-filter">Filter by Position:</label>
            <select
              id="position-filter"
              value={positionFilter}
              onChange={(e) => onPositionFilterChange?.(e.target.value)}
              className="filter-select"
            >
              <option value="">All Positions</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
