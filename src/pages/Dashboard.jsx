import React from "react";
import "../style/dashboard.css";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import CustomerTable from "../components/CustomerTable";

const Dashboard = (props) => {
  const clients = props.clients;
  const getAllClients = props.getAllClients;
  const invoices = props.invoices;
  const pendingInvoices = props.pendingInvoices;
  const salesTotal = props.salesTotal;
  const setInvoiceTypeSelectedClientId = props.setInvoiceTypeSelectedClientId;
  const getSelectedClientInvoices = props.getSelectedClientInvoices;
  const setClientData = props.setClientData;

  const animation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.main variants={animation} initial="hidden" animate="visible">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat">
          <i className="fas fa-chart-line"></i>
          <div>
            <p>Total Sales</p>
            <h2>€{salesTotal}</h2>
          </div>
        </div>
        <div className="stat">
          <i className="fas fa-users"></i>
          <div>
            <p>Total Customers</p>
            <h2>{clients.length}</h2>
          </div>
        </div>
        <Chart invoices={invoices} />
        <div className="stat">
          <i className="fas fa-file-invoice-dollar"></i>
          <div>
            <p>Total Invoices</p>
            <h2>{invoices.length}</h2>
          </div>
        </div>
        <div className="stat">
          <i className="fas fa-file-invoice"></i>
          <div>
            <p>Pending Invoices</p>
            <h2>{pendingInvoices.length}</h2>
          </div>
        </div>
      </div>
      <CustomerTable
        clients={clients}
        getAllClients={getAllClients}
        setInvoiceTypeSelectedClientId={setInvoiceTypeSelectedClientId}
        getSelectedClientInvoices={getSelectedClientInvoices}
        setClientData={setClientData}
      />
    </motion.main>
  );
};

export default Dashboard;
