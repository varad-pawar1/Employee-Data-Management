import type { ReactNode } from "react";
import "./Dashboard.css";

interface DashboardProps {
  children: ReactNode;
  stats?: {
    label: string;
    value: number;
    icon: ReactNode;
  }[];
  onAddEmployee: () => void;
}

export default function Dashboard({
  children,
  stats,
  onAddEmployee,
}: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Employee Management</h2>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={onAddEmployee}>
            <i className="fas fa-plus"></i> Add Employee
          </button>
        </div>
      </div>

      {stats && (
        <div className="dashboard-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-content">{children}</div>
    </div>
  );
}
