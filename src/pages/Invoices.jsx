import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import "../style/invoices.css";
import { motion, AnimatePresence } from "framer-motion";
import CreateInvoice from "../components/CreateInvoice";

const Invoices = (props) => {
  let history = useHistory();
  const invoices = props.invoices;
  const getAllInvoices = props.getAllInvoices;
  const getAllClients = props.getAllClients;
  const setInvoiceTypeSelected = props.setInvoiceTypeSelected;
  const getSelectedInvoice = props.getSelectedInvoice;
  const [newInvoice, setNewInvoice] = useState(false);
  const toggleNewInvoice = () => {
    setNewInvoice(!newInvoice);
  };
  const handleValueChange = (e) => {
    e.preventDefault();
    setInvoiceTypeSelected(e.target.value);
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
          <div className="invoice-heading-container">
            <h1 className="invoice-heading">Invoices</h1>
            <p>There are {invoices.length} total invoices.</p>
          </div>
          <div className="filter-new">
            <select name="filter" onChange={handleValueChange}>
              <option value="" defaultValue>
                All
              </option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <button onClick={toggleNewInvoice} className="btn-newInvoice">
              <i className="fas fa-plus"></i> New
            </button>
          </div>
        </div>
        <div className="container-invoices">
          {invoices.map((invoice) => {
            return (
              <div
                key={invoice._id}
                className="invoice"
                onClick={() => {
                  getSelectedInvoice(invoice._id);
                  setTimeout(() => {
                    history.push("/invoice");
                  }, 500);
                }}
              >
                <h5>
                  <span>#</span>
                  {invoice._id.slice(3, 8)}
                </h5>
                <p>Due {dayjs(invoice.paymentDue).format("DD MMM YYYY")}</p>
                <p>{invoice.client.clientName}</p>
                <h4>€{invoice.totalBill}</h4>
                {invoice.status === "paid" ? (
                  <button className="paid-btn">
                    <i className="fas fa-circle paid"></i> Paid
                  </button>
                ) : (
                  <button className="pending-btn">
                    <i className="fas fa-circle paid"></i> Pending
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {newInvoice ? (
          <CreateInvoice
            toggleNewInvoice={toggleNewInvoice}
            getAllInvoices={getAllInvoices}
            getAllClients={getAllClients}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default Invoices;
