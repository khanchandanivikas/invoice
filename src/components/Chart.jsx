import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Chart = (props) => {
  const invoices = props.invoices;
  const [jan, setJan] = useState("");
  const [feb, setFeb] = useState("");
  const [mar, setMar] = useState("");
  const [apr, setApr] = useState("");
  const [may, setMay] = useState("");
  const [jun, setJun] = useState("");
  const [jly, setJly] = useState("");
  const [aug, setAug] = useState("");
  const [sep, setSep] = useState("");
  const [oct, setOct] = useState("");
  const [nov, setNov] = useState("");
  const [dec, setDec] = useState("");

  const getTotalJan = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setJan(totalValue);
  };
  const getTotalFeb = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setFeb(totalValue);
  };
  const getTotalMar = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setMar(totalValue);
  };
  const getTotalApr = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setApr(totalValue);
  };
  const getTotalMay = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setMay(totalValue);
  };
  const getTotalJun = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setJun(totalValue);
  };
  const getTotalJly = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setJly(totalValue);
  };
  const getTotalAug = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setAug(totalValue);
  };
  const getTotalSep = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setSep(totalValue);
  };
  const getTotalOct = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setOct(totalValue);
  };
  const getTotalNov = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setNov(totalValue);
  };
  const getTotalDec = (itemList) => {
    let totalValue = 0;
    itemList.forEach((item) => {
      totalValue = totalValue + item;
      return totalValue;
    });
    setDec(totalValue);
  };

  const getTotal = (itemList) => {
    var jan = [];
    var feb = [];
    var mar = [];
    var apr = [];
    var may = [];
    var jun = [];
    var jul = [];
    var aug = [];
    var sep = [];
    var oct = [];
    var nov = [];
    var dec = [];
    itemList.forEach((item) => {
      var test = new Date(item.createdAt.slice(0, 10)).getMonth();
      console.log(test);
      switch (test) {
        case 0:
          jan.push(item.totalBill);
          getTotalJan(jan);
          break;
        case 1:
          feb.push(item.totalBill);
          getTotalFeb(feb);
          break;
        case 2:
          mar.push(item.totalBill);
          getTotalMar(mar);
          break;
        case 3:
          apr.push(item.totalBill);
          getTotalApr(apr);
          break;
        case 4:
          may.push(item.totalBill);
          getTotalMay(may);
          break;
        case 5:
          jun.push(item.totalBill);
          getTotalJun(jun);
          break;
        case 6:
          jul.push(item.totalBill);
          getTotalJly(jul);
          break;
        case 7:
          aug.push(item.totalBill);
          getTotalAug(aug);
          break;
        case 8:
          sep.push(item.totalBill);
          getTotalSep(sep);
          break;
        case 9:
          oct.push(item.totalBill);
          getTotalOct(oct);
          break;
        case 10:
          nov.push(item.totalBill);
          getTotalNov(nov);
          break;
        case 11:
          dec.push(item.totalBill);
          getTotalDec(dec);
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    getTotal(invoices);
    // eslint-disable-next-line
  }, [invoices]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Sales 2021",
        data: [jan, feb, mar, apr, may, jun, jly, aug, sep, oct, nov, dec],
        fill: false,
        backgroundColor: "rgb(146, 119, 255)",
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
      },
    },
    responsive: true,
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
