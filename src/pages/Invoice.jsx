import React from "react";
import "../style/invoice.css";

const Invoice = () => {
  return (
    <div className="container-invoice-clicked">
      <div className="invoice-status-container">
        <div className="invoice-status">
          <p>Status</p>
          <button class="paid-btn">
            <i class="fas fa-circle paid"></i> Paid
          </button>
        </div>
        <div>
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
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
            <h3>18 Aug 2021</h3>
            <p className="payment-due">Payment Due</p>
            <h3>19 Aug 2021</h3>
          </div>
          <div>
            <p>Bill To</p>
            <h3 className="email">Jensen Huang</h3>
            <p>106 Kendell Street Sharrington NR24 5WQ United Kingdom</p>
          </div>
          <div>
            <p>Sent to</p>
            <h3 className="email">jensenh@mail.com</h3>
          </div>
        </div>
        <div className="invoice-item-qty">
          <div>
            <p>Item Name</p>
            <h4 className="email">Brand Guidelines</h4>
          </div>
          <div>
            <p>QTY.</p>
            <p className="email">1</p>
          </div>
          <div>
            <p>Price</p>
            <p className="email">£1,800.9</p>
          </div>
          <div>
            <p>Total</p>
            <h4 className="email">£1,800.9</h4>
          </div>
        </div>
        <div className="invoice-item-total">
          <h4>Amount Due</h4>
          <h2>£1,800.9</h2>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
