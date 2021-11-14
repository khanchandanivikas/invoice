import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "../style/invoice.css";
import EditInvoice from "../components/EditInvoice";

const Invoice = () => {
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

  const handleEliminar = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(124, 93, 250)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
        <div className="invoice-status-container">
          <div className="invoice-status">
            <p>Status</p>
            <button class="paid-btn">
              <i class="fas fa-circle paid"></i> Paid
            </button>
          </div>
          <div className="btn-container">
            <button onClick={toggleEditInvoice} className="edit-btn">
              Edit
            </button>
            <button onClick={handleEliminar} className="delete-btn">
              Delete
            </button>
          <button className="btn-save">Paid</button>
          </div>
        </div>
        <div className="invoice-item">
          <div className="invoice-item-number">
            <div>
              <h3>
                <span>#</span> RT3080
              </h3>
              <p className="invoice-title">Re-branding</p>
            </div>
            <div className="invoice-item-number-address">
              <p>19 Union Terrace London E1 3EZ United Kingdom</p>
            </div>
          </div>
          <div className="invoice-item-details">
            <div>
              <p>Invoice Date</p>
              <h4 className="marginTopOne">18 Aug 2021</h4>
              <p className="marginTopTwo">Payment Due</p>
              <h4 className="marginTopOne">19 Aug 2021</h4>
            </div>
            <div>
              <p>Bill To</p>
              <h4 className="marginTopTwo">Jensen Huang</h4>
              <p className="marginTopOne">
                106 Kendell Street Sharrington NR24 5WQ United Kingdom
              </p>
            </div>
            <div>
              <p>Sent to</p>
              <h4 className="marginTopTwo">jensenh@mail.com</h4>
            </div>
          </div>
          <div className="invoice-item-qty">
            <div>
              <p>Item Name</p>
              <h4 className="marginTopTwo">Brand Guidelines</h4>
            </div>
            <div>
              <p>QTY.</p>
              <p className="marginTopTwo">1</p>
            </div>
            <div>
              <p>Price</p>
              <p className="marginTopTwo">£1,800.9</p>
            </div>
            <div>
              <p>Total</p>
              <h4 className="marginTopTwo">£1,800.9</h4>
            </div>
          </div>
          <div className="invoice-item-total">
            <h4>Amount Due</h4>
            <h3>£1,800.9</h3>
          </div>
        </div>
      </div>
      {editInvoice ? (
        <EditInvoice toggleEditInvoice={toggleEditInvoice} />
      ) : null}
    </motion.div>
  );
};

export default Invoice;
