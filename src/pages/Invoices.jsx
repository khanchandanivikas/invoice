import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/invoices.css";
import { motion } from "framer-motion";
import CreateInvoice from "../components/CreateInvoice";

const Invoices = () => {
  const [newInvoice, setNewInvoice] = useState(false);
  const toggleNewInvoice = () => {
    setNewInvoice(!newInvoice);
  };

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
    <motion.div variants={animation} initial="hidden" animate="visible">
      <div className="container-invoice">
        <div className="container-newInvoice">
          <div>
            <h1 className="invoice-heading">Invoices</h1>
            <p>There are 7 total invoices.</p>
          </div>
          <div className="filter-new">
            <h5>
              Filter by status <i class="fas fa-chevron-down"></i>
            </h5>
            <button onClick={toggleNewInvoice} className="btn-newInvoice">
              <i class="fas fa-plus"></i> New Invoice
            </button>
          </div>
        </div>
        <div className="container-invoices">
          <Link to="/invoice">
            <div className="invoice">
              <h5>
                <span>#</span>RT3080
              </h5>
              <p>Due 19 Aug 2021</p>
              <p>Vikas khan</p>
              <h4>$556</h4>
              <button class="paid-btn">
                <i class="fas fa-circle paid"></i> Paid
              </button>
            </div>
          </Link>
          <Link to="/invoice">
            <div className="invoice">
              <h5>
                <span>#</span>RT3080
              </h5>
              <p>Due 19 Aug 2021</p>
              <p>Vikas khan</p>
              <h4>$1,556.05</h4>
              <button class="pending-btn">
                <i class="fas fa-circle pending"></i> Pending
              </button>
            </div>
          </Link>
        </div>
      </div>
      {newInvoice ? (
        <CreateInvoice toggleNewInvoice={toggleNewInvoice} />
      ) : null}
    </motion.div>
  );
};

export default Invoices;
