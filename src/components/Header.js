import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import "./Header.scss";

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const user = AuthService.getLoggedInUser();
  const isAdmin = user?.isAdmin;

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>
          <Link to="/">Miss Toy Shay Rabin</Link>
        </h1>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span className="welcome-message">Welcome, {user.fullname}!</span>
              {isAdmin && <span className="admin-badge">Admin</span>}
              {!isAdmin && (
                <Link to="/cart" className="cart-link">
                  Cart ({cartCount})
                </Link>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
