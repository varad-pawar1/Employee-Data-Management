import "./Header.css";
import logo from "../../../assets/employee-management-logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Brand Section */}
        <div className="header-brand">
          <img className="brand-logo" src={logo} alt="Logo" />
        </div>

        {/* User Section */}
        <div className="header-user">
          <div className="user-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="user-info">
            <h5>VRD</h5>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
