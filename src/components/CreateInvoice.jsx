import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import "../style/newInvoiceForm.css";
import { motion } from "framer-motion";

const CreateInvoice = (props) => {
  const [terms, setTerms] = useState(1);
  const handleTerms = (e) => {
    setTerms(e.target.value);
  };
  var today = new Date();
  var date = dayjs(today).format("YYYY-MM-DD");
  const [fecha, setFecha] = useState(date);
  const handleFecha = (e) => {
    setFecha(e.target.value);
  };
  const getAllInvoices = props.getAllInvoices;
  const getAllClients = props.getAllClients;
  const toggleNewInvoice = props.toggleNewInvoice;
  const [billTotal, setBillTotal] = useState("");
  const [dateDue, setDateDue] = useState("");

  const getTotalBill = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item.total;
      return totalValue;
    });
    setBillTotal(totalValue);
  };

  const addDays = (days) => {
    var today = new Date();
    var result = today.setDate(today.getDate() + parseInt(days));
    const fecha = new Date(result);
    setDateDue(fecha);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputList, setInputList] = useState([
    { name: "", quantity: "", price: "", total: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = Number(value);
    list[index].total = list[index].price * list[index].quantity;
    setInputList(list);
    getTotalBill(inputList);
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

  useEffect(() => {
    addDays(terms);
  }, [terms]);

  const onSubmit = async (data) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/invoice/", {
        status: "pending",
        senderStreet: data.senderStreet,
        senderCity: data.senderCity,
        senderPostCode: data.senderPostCode,
        senderCountry: data.senderCountry,
        createdAt: new Date(),
        paymentDue: dateDue,
        paymentTerms: terms,
        description: data.description,
        items: inputList,
        totalBill: billTotal,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientStreet: data.clientStreet,
        clientCity: data.clientCity,
        clientPostCode: data.clientPostCode,
        clientCountry: data.clientCountry,
      })
      .then((response) => {
        console.log(response);
        getAllInvoices("");
        getAllClients();
        toggleNewInvoice();
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
      <div onClick={toggleNewInvoice} className="overlay"></div>
      <motion.div
        className="newInvoice-container"
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2>New Invoice</h2>
        <div className="newInvoice-form-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="newInvoice-form"
          >
            <label htmlFor="fromAddress" className="fromTo">
              Bill From
            </label>
            <label htmlFor="street address">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              {...register("senderStreet", { required: true }, "required")}
            />
            {errors.streetAddress &&
              errors.streetAddress.type === "required" && <span>Required</span>}
            <div className="form-grid">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  type="text"
                  name="senderCity"
                  {...register("senderCity", { required: true }, "required")}
                />
                {errors.senderCity && errors.senderCity.type === "required" && (
                  <span>Required</span>
                )}
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input
                  type="number"
                  name="senderPostCode"
                  {...register(
                    "senderPostCode",
                    { required: true },
                    "required"
                  )}
                />
                {errors.senderPostCode &&
                  errors.senderPostCode.type === "required" && (
                    <span>Required</span>
                  )}
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="senderCountry"
              {...register("senderCountry", { required: true }, "required")}
            />
            {errors.senderCountry &&
              errors.senderCountry.type === "required" && <span>Required</span>}
            <label htmlFor="toAddress" className="fromTo">
              Bill To
            </label>
            <label htmlFor="client name">Client's Name</label>
            <input
              type="text"
              name="clientName"
              {...register("clientName", { required: true }, "required")}
            />
            {errors.clientName && errors.clientName.type === "required" && (
              <span>Required</span>
            )}
            <label htmlFor="client email">Client's Email</label>
            <input
              type="email"
              name="clientEmail"
              placeholder="e.g. email@example.com"
              {...register("clientEmail", { required: true }, "required")}
            />
            {errors.clientEmail && errors.clientEmail.type === "required" && (
              <span>Required</span>
            )}
            <label htmlFor="street address">Street Address</label>
            <input
              type="text"
              name="clientStreet"
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
                  type="text"
                  name="clientCity"
                  {...register("clientCity", { required: true }, "required")}
                />
                {errors.clientCity && errors.clientCity.type === "required" && (
                  <span>Required</span>
                )}
              </div>
              <div>
                <label htmlFor="post code">Post Code</label>
                <input
                  type="number"
                  name="clientPostCode"
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
              type="text"
              name="clientCountry"
              {...register("clientCountry", { required: true }, "required")}
            />
            {errors.clientCountry &&
              errors.clientCountry.type === "required" && <span>Required</span>}
            <div className="form-grid2">
              <div>
                <label htmlFor="invoice date">Invoice Date</label>
                <br />
                <input
                  type="date"
                  name="createdAt"
                  value={fecha}
                  onChange={handleFecha}
                  required
                  {...register("createdAt", { required: true }, "required")}
                />
                {/* {errors.createdAt && errors.createdAt.type === "required" && (
                  <span>Required</span>
                )} */}
              </div>
              <div>
                <label htmlFor="payment terms">Payment Terms</label>
                <br />
                <select
                  name="paymentTerms"
                  value={terms}
                  onChange={handleTerms}
                  required
                  // {...register("paymentTerms", { required: true }, "required")}
                >
                  <option value="1" defaultValue>
                    Net 1 Day
                  </option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
                {errors.paymentTerms &&
                  errors.paymentTerms.type === "required" && (
                    <span>Required</span>
                  )}
              </div>
            </div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              {...register("description", { required: true }, "required")}
            />
            {errors.description && errors.description.type === "required" && (
              <span>Required</span>
            )}
            <label htmlFor="itemList" id="itemList-heading">
              Item List
            </label>
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
              <button onClick={toggleNewInvoice} className="btn-discard">
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

export default CreateInvoice;
