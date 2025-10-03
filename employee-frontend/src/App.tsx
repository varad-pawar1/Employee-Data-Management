import { useState, useEffect } from "react";
import useEmployees from "./hooks/useEmployees";
import Header from "./components/Layout/Header/Header";
import Container from "./components/Layout/Container/Container";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import EmployeeTable from "./components/Employee/EmployeeTable/EmployeeTable";
import SearchBar from "./components/Employee/SearchBar/SearchBar";
import Modal from "./components/common/Modal/Modal";
import EmployeeForm from "./components/Employee/EmployeeForm/EmployeeForm";
import Notification from "./components/common/Notification/Notification";
import type { Employee } from "./types/employee";
import "./App.css";

function App() {
  const {
    employees,
    pagination,
    loading,
    error,
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
  } = useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({ message, type, isVisible: true });
  };

  const handleCreateEmployee = async (data: Omit<Employee, "id">) => {
    await createEmployee(data);
    if (!error) {
      showNotification(
        `Employee "${data.name}" added successfully!`,
        "success"
      );
    } else {
      showNotification(error, "error");
    }
  };

  const handleEditEmployee = async (id: number, data: Omit<Employee, "id">) => {
    await editEmployee(id, data);
    if (!error) {
      showNotification(
        `Employee "${data.name}" updated successfully!`,
        "success"
      );
    } else {
      showNotification(error, "error");
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    await removeEmployee(id);
    if (!error) {
      showNotification(
        `Employee "${employee?.name}" deleted successfully!`,
        "success"
      );
    } else {
      showNotification(error, "error");
    }
  };

  const dashboardStats = [
    {
      label: "Total Employees",
      value: pagination?.totalEmployees || employees.length,
      icon: <i className="fas fa-users"></i>,
    },
  ];

  return (
    <div className="app">
      <Header />
      <Container>
        <Dashboard
          stats={dashboardStats}
          onAddEmployee={() => {
            setEditingEmployee(null);
            setModalOpen(true);
          }}
        >
          <div className="dashboard-section">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              positionFilter={positionFilter}
              onPositionFilterChange={handlePositionFilterChange}
              showAdvanced={true}
            />
          </div>

          <div className="dashboard-section">
            <EmployeeTable
              employees={employees}
              pagination={pagination}
              loading={loading}
              onEdit={(emp) => {
                setEditingEmployee(emp);
                setModalOpen(true);
              }}
              onDelete={handleDeleteEmployee}
              onPageChange={goToPage}
              onNextPage={nextPage}
              onPrevPage={prevPage}
            />
          </div>
        </Dashboard>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <EmployeeForm
            onSubmit={(data) =>
              editingEmployee
                ? handleEditEmployee(editingEmployee.id, data)
                : handleCreateEmployee(data)
            }
            initialData={editingEmployee}
            onClose={() => setModalOpen(false)}
          />
        </Modal>

        {/*  Global Error Notification with working close button */}
        {localError && (
          <Notification
            message={localError}
            type="error"
            isVisible={true}
            onClose={() => setLocalError(null)}
          />
        )}

        {/* Success / Info Notifications */}
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() =>
            setNotification((prev) => ({ ...prev, isVisible: false }))
          }
        />
      </Container>
    </div>
  );
}

export default App;
