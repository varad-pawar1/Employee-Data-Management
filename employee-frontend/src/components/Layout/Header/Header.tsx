import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Brand Section */}
        <div className="header-brand">
          <img
            className="brand-logo"
            src="https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9"
            alt="Logo"
          />
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
