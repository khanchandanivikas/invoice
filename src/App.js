import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import ClientInvoice from "./pages/ClientInvoice";
import ClientInvoices from "./pages/ClientInvoices";

function App() {
  const [clients, setClients] = useState([]);
  // status
  const [invoiceTypeSelected, setInvoiceTypeSelected] = useState("");
  // id
  const [invoiceTypeSelectedClientId, setInvoiceTypeSelectedClientId] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState("");
  const [salesTotal, setSalesTotal] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [selectedClientInvoices, setSelectedClientInvoices] = useState([]);
  const [clientData, setClientData] = useState("");

  const getAllClients = async () => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/client/"
      );
      const datos = await request.data;
      console.log(datos);
      setClients(datos.clients);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInvoices = async (status) => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/invoice/${status}`
      );
      const datos = await request.data;
      setInvoices(datos.invoices);
      console.log(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingInvoices = async () => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/invoice/pending"
      );
      const datos = await request.data;
      setPendingInvoices(datos.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedInvoice = async (id) => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/invoice/id/${id}`
      );
      const datos = await request.data;
      setSelectedInvoice(datos.invoice);
      console.log(datos.invoice);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedClientInvoices = async (idClient, status) => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/invoice/idClient/${idClient}/${status}`
      );
      const datos = await request.data;
      setSelectedClientInvoices(datos.invoices);
      console.log(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInvoiceById = async (id) => {
    try {
      const request = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/invoice/${id}`
      );
      const datos = await request.data;
      console.log(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const markInvoiceAsPaid = async (id) => {
    axios
      .patch(process.env.REACT_APP_BACKEND_URL + `/api/invoice/${id}`, {
        status: "paid",
      })
      .then((response) => {
        console.log(response);
        getAllInvoices("");
        getAllClients();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalSales = (invoiceList) => {
    let totalSales = 0;
    invoiceList.forEach((invoice) => {
      totalSales = totalSales + invoice.totalBill;
      return totalSales;
    });
    setSalesTotal(totalSales);
  };

  useEffect(() => {
    getAllClients();
    getPendingInvoices();
    getTotalSales(invoices);
    getSelectedClientInvoices(invoiceTypeSelectedClientId, invoiceTypeSelected);
    // eslint-disable-next-line
  }, [invoiceTypeSelected, invoices]);

  useEffect(() => {
    getAllInvoices(invoiceTypeSelected);
  }, [invoiceTypeSelected]);

  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Dashboard
              clients={clients}
              getAllClients={getAllClients}
              pendingInvoices={pendingInvoices}
              salesTotal={salesTotal}
              invoices={invoices}
              setInvoiceTypeSelectedClientId={setInvoiceTypeSelectedClientId}
              getSelectedClientInvoices={getSelectedClientInvoices}
              setClientData={setClientData}
            />
          </Route>
          <Route path="/invoices">
            <Invoices
              invoices={invoices}
              getAllInvoices={getAllInvoices}
              getAllClients={getAllClients}
              setInvoiceTypeSelected={setInvoiceTypeSelected}
              getSelectedInvoice={getSelectedInvoice}
            />
          </Route>
          <Route path="/client-invoices">
            <ClientInvoices
              selectedClientInvoices={selectedClientInvoices}
              getAllInvoices={getAllInvoices}
              getAllClients={getAllClients}
              setInvoiceTypeSelected={setInvoiceTypeSelected}
              getSelectedClientInvoices={getSelectedClientInvoices}
              getSelectedInvoice={getSelectedInvoice}
              invoiceTypeSelectedClientId={invoiceTypeSelectedClientId}
              clientData={clientData}
            />
          </Route>
          <Route path="/invoice">
            <Invoice
              getAllInvoices={getAllInvoices}
              getAllClients={getAllClients}
              selectedInvoice={selectedInvoice}
              deleteInvoiceById={deleteInvoiceById}
              markInvoiceAsPaid={markInvoiceAsPaid}
            />
          </Route>
          <Route path="/client-invoice">
            <ClientInvoice
              getAllInvoices={getAllInvoices}
              getAllClients={getAllClients}
              selectedInvoice={selectedInvoice}
              deleteInvoiceById={deleteInvoiceById}
              markInvoiceAsPaid={markInvoiceAsPaid}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
