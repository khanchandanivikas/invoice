import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import "../style/invoices.css";
import { motion } from "framer-motion";
import CreateClientInvoice from "../components/CreateClientInvoice";

const ClientInvoices = (props) => {
  let history = useHistory();
  const invoices = props.selectedClientInvoices;
  const getAllInvoices = props.getAllInvoices;
  const getAllClients = props.getAllClients;
  const setInvoiceTypeSelected = props.setInvoiceTypeSelected;
  const getSelectedClientInvoices = props.getSelectedClientInvoices;
  const getSelectedInvoice = props.getSelectedInvoice;
  const invoiceTypeSelectedClientId = props.invoiceTypeSelectedClientId;
  const clientData = props.clientData;
  const [newInvoice, setNewInvoice] = useState(false);
  const toggleNewInvoice = () => {
    setNewInvoice(!newInvoice);
  };
  const handleValueChange = (e) => {
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
            <h1 className="invoice-heading">Invoices <span>{clientData.clientName}</span></h1>
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
          {!invoices || invoices.length === 0 ? (
            <p style={{textAlign: 'center'}}>No Invoices Available For The Selected Client</p>
          ) : null}
          {invoices.map((invoice) => {
            return (
              <div
                className="invoice"
                onClick={() => {
                  getSelectedInvoice(invoice._id);
                  setTimeout(() => {
                    history.push("/client-invoice");
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
      {newInvoice ? (
        <CreateClientInvoice
          toggleNewInvoice={toggleNewInvoice}
          getAllInvoices={getAllInvoices}
          getAllClients={getAllClients}
          getSelectedClientInvoices={getSelectedClientInvoices}
          invoiceTypeSelectedClientId={invoiceTypeSelectedClientId}
          clientData={clientData}
        />
      ) : null}
    </motion.div>
  );
};

export default ClientInvoices;
