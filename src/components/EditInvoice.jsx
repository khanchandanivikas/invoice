import React from "react";
import "../style/newInvoiceForm.css";
import { motion } from "framer-motion";

const editInvoice = (props) => {
  const toggleEditInvoice = props.toggleEditInvoice;
  
  const animation = {
    hidden: {
      x: "-100%",
      transition: { type: "spring", duration: 0.75 },
    },
    visible: {
      x: 0,
      transition: { type: "spring", duration: 0.75 },
    },
  };

  return (
    <div>
      <div onClick={toggleEditInvoice} className="overlay"></div>
      <motion.div
        className="newInvoice-container"
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1>Invoice</h1>
        <div className="newInvoice-form-container">
          <form action="" className="newInvoice-form">
            <label htmlFor="fromAddress" className="fromTo">
              Bill From
            </label>
            <label htmlFor="street address">Street Address</label>
            <input type="text" name="street address" />
            <div className="form-grid">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input type="text" name="city" />
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input type="number" name="post code" />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input type="text" name="country" />
              </div>
            </div>
            <label htmlFor="toAddress" className="fromTo">
              Bill To
            </label>
            <label htmlFor="client name">Client's Namel</label>
            <input type="text" name="client name" />
            <label htmlFor="client email">Client's Email</label>
            <input
              type="email"
              name="client email"
              placeholder="e.g. email@example.com"
            />
            <label htmlFor="street address">Street Address</label>
            <input type="text" name="street address" />
            <div className="form-grid">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input type="text" name="city" />
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input type="number" name="post code" />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input type="text" name="country" />
              </div>
            </div>
            <div className="form-grid2">
              <div>
                <label htmlFor="invoice date">Invoice Date</label>
                <br />
                <input type="date" name="invoice date" />
              </div>
              <div>
                <label htmlFor="payment terms">Payment Terms</label>
                <br />
                <select name="payment terms">
                  <option value="1 day">Net 1 Day</option>
                  <option value="7 days">Net 7 Days</option>
                  <option value="14 day">Net 14 Days</option>
                  <option value="30 days">Net 30 Days</option>
                </select>
              </div>
            </div>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" />
          </form>
        </div>
        <div className="newInvoice-form-buttons">
          <button onClick={toggleEditInvoice} className="btn-discard">Discard</button>
          <button className="btn-save">Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
};

export default editInvoice;
