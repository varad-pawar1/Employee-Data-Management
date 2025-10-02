import { useEffect, useState } from "react";
import type { Employee } from "../../../types/employee";
import { EMPLOYEE_API, MESSAGES } from "../../../utils/constants";
const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(EMPLOYEE_API.LIST)
      .then((res) => res.json())
      .then((data: Employee[]) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        alert(MESSAGES.ERROR);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <h2 className="title">Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} — {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
