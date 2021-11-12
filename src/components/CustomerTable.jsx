import React from "react";
import MaterialTable from "material-table";

const CustomerTable = () => {
  const data = [
    {
      client: "vikas",
      contact: 638714934,
      address: "ave de tunte 25",
      email: "vikas@gmail.com",
    },
    {
      client: "vikas",
      contact: 638714934,
      address: "ave de tunte 25",
      email: "vikas@gmail.com",
    },
    {
      client: "vikas",
      contact: 638714934,
      address: "ave de tunte 25",
      email: "vikas@gmail.com",
    },
  ];

  const columns = [
    {
      title: "Client",
      field: "client",
      validate: (rowData) =>
        rowData.client === undefined || rowData.client === ""
          ? "Required"
          : true,
    },
    {
      title: "Contact",
      field: "contact",
      validate: (rowData) =>
        rowData.contact === undefined || rowData.contact === ""
          ? "Required"
          : true,
    },
    {
      title: "Address",
      field: "address",
      validate: (rowData) =>
        rowData.address === undefined || rowData.address === ""
          ? "Required"
          : true,
    },
    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        rowData.email === undefined || rowData.email === "" ? "Required" : true,
    },
  ];
  return (
    <div className="container-table">
      <MaterialTable
        title="Customers"
        columns={columns}
        data={data}
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
                console.log(newData);
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                console.log(newData);
                console.log(oldData);
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                console.log(oldData);
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
