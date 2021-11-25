import React from "react";
import { Link } from "react-router-dom";
import "../style/sidebar.css";

const Sidebar = () => {
  return (
    <aside>
      <div className="logo-invoice-container">
        <Link to="/">
          <div className="logo-container">
            <img
              className="logo-img"
              src="https://invoice-app-giraffe.vercel.app/images/logo.svg"
              alt="logo"
            />
          </div>
        </Link>
        <div>
          <Link to="/invoices">
            <i className="fas fa-receipt"></i>
          </Link>
        </div>
      </div>
      <div className="logo-invoice-container">
        <p>
          <Link to="/">
            <i class="fas fa-home"></i>
          </Link>
        </p>
        <img
          className="avatar-img"
          src="https://invoice-app-giraffe.vercel.app/images/image-avatar.jpg"
          alt="avatar"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
