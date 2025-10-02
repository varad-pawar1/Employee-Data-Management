import { useState, useEffect } from "react";
import { ROLES, VALIDATION } from "../../../utils/constants";
import type { Employee } from "../../../types/employee";
import "./EmployeeForm.css";

interface EmployeeFormProps {
  onSubmit: (data: Omit<Employee, "id">) => void;
  initialData?: Employee | null;
  onClose: () => void;
}

const EmployeeForm = ({ onSubmit, initialData, onClose }: EmployeeFormProps) => {
  const [form, setForm] = useState<Omit<Employee, "id">>({
    name: "",
    email: "",
    position: "Developer",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        position: initialData.position,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (form.name.length < VALIDATION.NAME_MIN) {
      newErrors.name = `Name must be at least ${VALIDATION.NAME_MIN} characters`;
    }
    if (form.name.length > VALIDATION.NAME_MAX) {
      newErrors.name = `Name must be less than ${VALIDATION.NAME_MAX} characters`;
    }
    if (!VALIDATION.EMAIL_PATTERN.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      // Reset form after successful submission
      if (!initialData) {
        setForm({ name: "", email: "", position: "Developer" });
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="employee-form">
      <h2 className="form-title">
        {initialData ? "Edit Employee" : "Add New Employee"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            className={errors.name ? "error" : ""}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? "error" : ""}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select 
            id="position"
            name="position" 
            value={form.position} 
            onChange={handleChange}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="btn-spinner"></div>
                {initialData ? "Updating..." : "Adding..."}
              </>
            ) : (
              initialData ? "Update Employee" : "Add Employee"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
