import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import "../style/invoice.css";
import EditClientInvoice from "../components/EditClientInvoice";

const ClientInvoice = (props) => {
  let history = useHistory();
  const invoiceSelected = props.selectedInvoice;
  const getAllInvoices = props.getAllInvoices;
  const getAllClients = props.getAllClients;
  const deleteInvoiceById = props.deleteInvoiceById;
  const markInvoiceAsPaid = props.markInvoiceAsPaid;
  const [editInvoice, setEditInvoice] = useState(false);
  const toggleEditInvoice = () => {
    setEditInvoice(!editInvoice);
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

  const handleEliminar = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(124, 93, 250)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInvoiceById(invoiceSelected._id)
          .then(() => {
            getAllInvoices("");
            getAllClients();
            Swal.fire("Deleted!", "This invoice has been deleted.", "success");
            history.push("/client-invoices");
          })
          .catch((error) => {
            console.log("error" + error);
          });
      }
    });
  };

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container-invoice-clicked">
        <div className="back-container">
          <Link to="/client-invoices">
            <p>
              <span>
                <i className="fas fa-chevron-left"></i>
              </span>{" "}
              Go back
            </p>
          </Link>
        </div>
        <div className="invoice-status-container">
          <div className="invoice-status">
            <p>Status</p>
            {invoiceSelected.status === "paid" ? (
              <button className="paid-btn">
                <i className="fas fa-circle paid"></i> Paid
              </button>
            ) : (
              <button className="pending-btn">
                <i className="fas fa-circle paid"></i> Pending
              </button>
            )}
          </div>
          <div className="btn-container">
            <button onClick={toggleEditInvoice} className="edit-btn">
              Edit
            </button>
            <button onClick={handleEliminar} className="delete-btn">
              Delete
            </button>
            {invoiceSelected.status === "pending" ? (
              <button
                onClick={() => {
                  markInvoiceAsPaid(invoiceSelected._id);
                  history.push("/client-invoices");
                }}
                className="btn-save"
              >
                Paid
              </button>
            ) : null}
          </div>
        </div>
        <div className="invoice-item">
          <div className="invoice-item-number">
            <div>
              <h3>
                <span>#</span>
                {invoiceSelected._id.slice(3, 8)}
              </h3>
              <p className="invoice-title">{invoiceSelected.description}</p>
            </div>
            <div className="invoice-item-number-address">
              <p>{invoiceSelected.senderStreet}</p>
            </div>
          </div>
          <div className="invoice-item-details">
            <div>
              <p>Invoice Date</p>
              <h4 className="marginTopOne">
                {dayjs(invoiceSelected.createdAt).format("DD MMM YYYY")}
              </h4>
              <p className="marginTopTwo">Payment Due</p>
              <h4 className="marginTopOne">
                {dayjs(invoiceSelected.paymentDue).format("DD MMM YYYY")}
              </h4>
            </div>
            <div>
              <p>Bill To</p>
              <h4 className="marginTopTwo">
                {invoiceSelected.client.clientName}
              </h4>
              <p className="marginTopOne">
                {invoiceSelected.client.clientStreet +
                  " " +
                  invoiceSelected.client.clientCity +
                  " " +
                  invoiceSelected.client.clientPostCode +
                  " " +
                  invoiceSelected.client.clientCountry}
              </p>
            </div>
            <div>
              <p>Sent to</p>
              <h4 className="marginTopTwo">
                {invoiceSelected.client.clientEmail}
              </h4>
            </div>
          </div>
          {invoiceSelected.items.map((item) => {
            return (
              <div className="invoice-item-qty">
                <div>
                  <p>Item Name</p>
                  <h4 className="marginTopTwo">{item.name}</h4>
                </div>
                <div>
                  <p>QTY.</p>
                  <p className="marginTopTwo">{item.quantity}</p>
                </div>
                <div>
                  <p>Price</p>
                  <p className="marginTopTwo">€{item.price}</p>
                </div>
                <div>
                  <p>Total</p>
                  <h4 className="marginTopTwo">€{item.total}</h4>
                </div>
              </div>
            );
          })}
          <div className="invoice-item-total">
            <h4>Amount Due</h4>
            <h3>€{invoiceSelected.totalBill}</h3>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {editInvoice ? (
          <EditClientInvoice
            getAllInvoices={getAllInvoices}
            getAllClients={getAllClients}
            toggleEditInvoice={toggleEditInvoice}
            invoiceSelected={invoiceSelected}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClientInvoice;
