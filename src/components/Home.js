import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const user = AuthService.getLoggedInUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      {user ? (
        <div>
          <h2>Welcome, {user.fullname}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to Miss Toy</h2>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
