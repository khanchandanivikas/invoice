import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CustomerTable = (props) => {
  const data = props.clients;
  const getAllClients = props.getAllClients;
  const setInvoiceTypeSelectedClientId = props.setInvoiceTypeSelectedClientId;
  const getSelectedClientInvoices = props.getSelectedClientInvoices;
  const setClientData = props.setClientData;
  let history = useHistory();

  const columns = [
    {
      title: "Client",
      field: "clientName",
      validate: (rowData) =>
        rowData.clientName === undefined || rowData.clientName === ""
          ? "Required"
          : true,
    },
    {
      title: "Email",
      field: "clientEmail",
      validate: (rowData) =>
        rowData.clientEmail === undefined || rowData.clientEmail === ""
          ? "Required"
          : true,
    },
    {
      title: "Address",
      field: "clientStreet",
      validate: (rowData) =>
        rowData.clientStreet === undefined || rowData.clientStreet === ""
          ? "Required"
          : true,
    },
    {
      title: "City",
      field: "clientCity",
      validate: (rowData) =>
        rowData.clientCity === undefined || rowData.clientCity === ""
          ? "Required"
          : true,
    },
    {
      title: "Country",
      field: "clientCountry",
      validate: (rowData) =>
        rowData.clientCountry === undefined || rowData.clientCountry === ""
          ? "Required"
          : true,
    },
    {
      title: "Post Code",
      field: "clientPostCode",
      validate: (rowData) =>
        rowData.clientPostCode === undefined || rowData.clientPostCode === ""
          ? "Required"
          : true,
    },
  ];
  return (
    <div className="container-table">
      <MaterialTable
        title="Clients"
        columns={columns}
        data={data}
        actions={[
          {
            icon: "search",
            tooltip: "User Details",
            onClick: (event, rowData) => {
              setInvoiceTypeSelectedClientId(rowData._id);
              getSelectedClientInvoices(rowData._id, "");
              setClientData(rowData);
              setTimeout(() => {
                history.push("/client-invoices");
              }, 500);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
          headerStyle: {
            backgroundColor: "rgb(124, 93, 250)",
            color: "#fff",
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/api/client/",
                  {
                    clientName: newData.clientName,
                    clientEmail: newData.clientEmail,
                    clientStreet: newData.clientStreet,
                    clientCity: newData.clientCity,
                    clientCountry: newData.clientCountry,
                    clientPostCode: newData.clientPostCode,
                  }
                );
                const datos = request.data;
                console.log(datos);
                getAllClients();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.patch(
                  process.env.REACT_APP_BACKEND_URL +
                    "/api/client/" +
                    `${oldData._id}`,
                  {
                    clientName: newData.clientName,
                    clientEmail: newData.clientEmail,
                    clientStreet: newData.clientStreet,
                    clientCity: newData.clientCity,
                    clientCountry: newData.clientCountry,
                    clientPostCode: newData.clientPostCode,
                  }
                );
                const datos = request.data;
                console.log(datos);
                getAllClients();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.delete(
                  process.env.REACT_APP_BACKEND_URL +
                    "/api/client/" +
                    `${oldData._id}`
                );
                getAllClients();
                resolve();
                const datos = request.data;
                console.log(datos);
              } catch (error) {
                console.log("error" + error);
              }
            }),
        }}
      />
    </div>
  );
};

export default CustomerTable;
