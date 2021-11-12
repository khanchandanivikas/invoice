import React from "react";
import "../style/dashboard.css";
import Chart from "../components/Chart";
import CustomerTable from "../components/CustomerTable";

const Dashboard = () => {
  return (
    <main>
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat">
          <i class="fas fa-chart-line"></i>
          <div>
            <p>Total Sales</p>
            <h2>$214k</h2>
          </div>
        </div>
        <div className="stat">
          <i class="fas fa-users"></i>
          <div>
            <p>Total Customers</p>
            <h2>21k</h2>
          </div>
        </div>
        <Chart />
        <div className="stat">
          <i class="fas fa-file-invoice-dollar"></i>
          <div>
            <p>Total Invoices</p>
            <h2>10k</h2>
          </div>
        </div>
        <div className="stat">
          <i class="fas fa-file-invoice"></i>
          <div>
            <p>Pending Invoices</p>
            <h2>3k</h2>
          </div>
        </div>
      </div>
      <CustomerTable />
    </main>
  );
};

export default Dashboard;
