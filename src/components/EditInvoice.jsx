import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "../style/newInvoiceForm.css";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const EditInvoice = (props) => {
  let history = useHistory();
  const {
    register,
    formState: { errors },
  } = useForm();
  const invoiceSelected = props.invoiceSelected;
  // const [dateDue, setDateDue] = useState(invoiceSelected.paymentDue);
  const [senderStreet, setSenderStreet] = useState(
    invoiceSelected.senderStreet
  );
  const [senderCity, setSenderCity] = useState(invoiceSelected.senderCity);
  const [senderPostCode, setSenderPostCode] = useState(
    invoiceSelected.senderPostCode
  );
  const [senderCountry, setSenderCountry] = useState(
    invoiceSelected.senderCountry
  );
  const [clientName, setClientName] = useState(
    invoiceSelected.client.clientName
  );
  const [clientEmail, setClientEmail] = useState(
    invoiceSelected.client.clientEmail
  );
  const [clientStreet, setClientStreet] = useState(
    invoiceSelected.client.clientStreet
  );
  const [clientCity, setClientCity] = useState(
    invoiceSelected.client.clientCity
  );
  const [clientPostCode, setClientPostCode] = useState(
    invoiceSelected.client.clientPostCode
  );
  const [clientCountry, setClientCountry] = useState(
    invoiceSelected.client.clientCountry
  );
  const [createdAt, setCreatedAt] = useState(invoiceSelected.createdAt);
  const [paymentTerms, setPaymentTerms] = useState(
    invoiceSelected.paymentTerms
  );
  const [description, setdescription] = useState(invoiceSelected.description);

  const handleSenderStreetChange = (e) => {
    setSenderStreet(e.target.value);
  };
  const handleSenderCityChange = (e) => {
    setSenderCity(e.target.value);
  };
  const handleSenderPostCodeChangeChange = (e) => {
    setSenderPostCode(e.target.value);
  };
  const handleSenderCountryChange = (e) => {
    setSenderCountry(e.target.value);
  };
  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
  };
  const handleClientEmailChange = (e) => {
    setClientEmail(e.target.value);
  };
  const handleClientStreetChange = (e) => {
    setClientStreet(e.target.value);
  };
  const handleClientCityChange = (e) => {
    setClientCity(e.target.value);
  };
  const handleClientCountryChange = (e) => {
    setClientCountry(e.target.value);
  };
  const handleClientPostCodeChange = (e) => {
    setClientPostCode(e.target.value);
  };
  const handleCreatedAtChange = (e) => {
    setCreatedAt(e.target.value);
  };

  // const addDays = (days, created) => {
  //   var today = created;
  //   console.log(today)
  //   var result = today.setDate(today.getDate() + parseInt(days));
  //   const fecha = new Date(result);
  //   setDateDue(fecha);
  // };

  const handlePaymentTermsChange = (e) => {
    setPaymentTerms(e.target.value);
    // addDays(paymentTerms, createdAt);
  };

  const handleDescriptionChange = (e) => {
    setdescription(e.target.value);
  };

  const toggleEditInvoice = props.toggleEditInvoice;
  const getAllInvoices = props.getAllInvoices;
  const getAllClients = props.getAllClients;
  const [billTotal, setBillTotal] = useState(invoiceSelected.totalBill);
  const [inputList, setInputList] = useState(invoiceSelected.items);

  const getTotalBill = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item.total;
      return totalValue;
    });
    setBillTotal(totalValue);
  };
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = Number(value);
    list[index].total = list[index].price * list[index].quantity;
    setInputList(list);
  };

  // handle input change
  const handleInputNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    list[index].total = list[index].price * list[index].quantity;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { name: "", quantity: "", price: "", total: "" },
    ]);
  };

  // const addDays = (days, created) => {
  //   var today = created;
  //   console.log(created)
  //   var result = today.setDate(today.getDate() + parseInt(days));
  //   const fecha = new Date(result);
  //   setDateDue(fecha);
  // };

  // useEffect(() => {
  //   addDays(paymentTerms, createdAt);
  // }, [paymentTerms]);
  useEffect(() => {
    getTotalBill(inputList);
  }, [inputList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL +
          `/api/invoice/${invoiceSelected._id}`,
        {
          senderStreet: senderStreet,
          senderCity: senderCity,
          senderPostCode: senderPostCode,
          senderCountry: senderCountry,
          // createdAt: createdAt,
          // paymentDue: dateDue,
          // paymentTerms: paymentTerms,
          description: description,
          items: inputList,
          totalBill: billTotal,
        }
      )
      .then((response) => {
        console.log(response);
        getAllInvoices("");
        getAllClients();
        toggleEditInvoice();
        history.push("/invoices");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <h2>
          Edit Invoice <span>#</span>
          {invoiceSelected._id.slice(3, 8)}
        </h2>
        <div className="newInvoice-form-container">
          <form action="" onSubmit={handleSubmit} className="newInvoice-form">
            <label htmlFor="fromAddress" className="fromTo">
              Bill From
            </label>
            <label htmlFor="street address">Street Address</label>
            <input
              value={senderStreet}
              onChange={handleSenderStreetChange}
              type="text"
              name="street address"
            />
            <div className="form-grid">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  value={senderCity}
                  onChange={handleSenderCityChange}
                  type="text"
                  name="city"
                />
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input
                  value={senderPostCode}
                  onChange={handleSenderPostCodeChangeChange}
                  type="number"
                  name="post code"
                />
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              value={senderCountry}
              onChange={handleSenderCountryChange}
              type="text"
              name="country"
            />
            <label htmlFor="toAddress" className="fromTo">
              Bill To
            </label>
            <label htmlFor="client name">Client's Name</label>
            <input
              value={clientName}
              onChange={handleClientNameChange}
              type="text"
              name="client name"
              {...register("clientName", { required: true }, "required")}
            />
            {errors.clientName && errors.clientName.type === "required" && (
              <span>Required</span>
            )}
            <label htmlFor="client email">Client's Email</label>
            <input
              value={clientEmail}
              onChange={handleClientEmailChange}
              type="email"
              name="client email"
              placeholder="e.g. email@example.com"
              {...register("clientEmail", { required: true }, "required")}
            />
            {errors.clientEmail && errors.clientEmail.type === "required" && (
              <span>Required</span>
            )}
            <label htmlFor="street address">Street Address</label>
            <input
              value={clientStreet}
              onChange={handleClientStreetChange}
              type="text"
              name="street address"
              {...register("clientStreet", { required: true }, "required")}
            />
            {errors.clientStreet && errors.clientStreet.type === "required" && (
              <span>Required</span>
            )}
            <div className="form-grid">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  value={clientCity}
                  onChange={handleClientCityChange}
                  type="text"
                  name="city"
                  {...register("clientCity", { required: true }, "required")}
                />
                {errors.clientCity && errors.clientCity.type === "required" && (
                  <span>Required</span>
                )}
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input
                  value={clientPostCode}
                  onChange={handleClientPostCodeChange}
                  type="number"
                  name="post code"
                  {...register(
                    "clientPostCode",
                    { required: true },
                    "required"
                  )}
                />
                {errors.clientPostCode &&
                  errors.clientPostCode.type === "required" && (
                    <span>Required</span>
                  )}
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              value={clientCountry}
              onChange={handleClientCountryChange}
              type="text"
              name="country"
              {...register("clientCountry", { required: true }, "required")}
            />
            {errors.clientCountry &&
              errors.clientCountry.type === "required" && <span>Required</span>}
            <div className="form-grid2">
              <div>
                <label htmlFor="invoice date">Invoice Date</label>
                <br />
                <input
                  value={dayjs(createdAt).format("YYYY-MM-DD")}
                  onChange={handleCreatedAtChange}
                  type="date"
                  name="invoice date"
                  {...register("createdAt", { required: true }, "required")}
                />
                {errors.createdAt && errors.createdAt.type === "required" && (
                  <span>Required</span>
                )}
              </div>
              <div>
                <label htmlFor="payment terms">Payment Terms</label>
                <br />
                <select
                  value={paymentTerms}
                  onChange={handlePaymentTermsChange}
                  name="payment terms"
                  {...register("paymentTerms", { required: true }, "required")}
                >
                  <option value="1 day">Net 1 Day</option>
                  <option value="7 days">Net 7 Days</option>
                  <option value="14 day">Net 14 Days</option>
                  <option value="30 days">Net 30 Days</option>
                </select>
                {errors.paymentTerms &&
                  errors.paymentTerms.type === "required" && (
                    <span>Required</span>
                  )}
              </div>
            </div>
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={handleDescriptionChange}
              type="text"
              name="description"
            />
            {inputList.map((x, i) => {
              return (
                <div className="itemList">
                  <div>
                    <label htmlFor="itemName">Item Name</label>
                    <input
                      name="name"
                      type="text"
                      value={x.name}
                      onChange={(e) => handleInputNameChange(e, i)}
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity">Qty.</label>
                    <input
                      type="number"
                      name="quantity"
                      value={x.quantity}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="number"
                      value={x.price}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div>
                    <label htmlFor="total">Total</label>
                    <input
                      name="total"
                      type="number"
                      id="total-input"
                      value={x.total}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div>
                    {inputList.length !== 1 && (
                      <span
                        className="btn-trash"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    )}
                    {inputList.length - 1 === i && (
                      <button
                        style={{
                          marginLeft: "10px",
                          marginTop: "10px",
                          minWidth: "6rem",
                        }}
                        className="edit-btn"
                        onClick={handleAddClick}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="newInvoice-form-buttons">
              <button onClick={toggleEditInvoice} className="btn-discard">
                Discard
              </button>
              <button type="submit" className="btn-save">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditInvoice;
