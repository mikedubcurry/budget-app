import React from "react";
import { LineChart, Line, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

function formatData(data) {
  let formattedData = [];
  data.map(item => {
    let entry = {};
    entry.timestamp = new Date(item.timestamp).toDateString();
    item.accounts.forEach(({ name, balance }) => {
      entry[name] = balance;
    });
    formattedData.unshift(entry);
  });
  return formattedData;
}

function colorPicker() {
  const colors = {
    0: "red",
    1: "orange",
    2: "yellow",
    3: "green",
    4: "blue",
    5: "indigo",
    6: "violet",
    7: "black",
    8: "chartruse",
    9: "rebeccapurple"
  };
  return colors[Math.floor(Math.random() * 6)];
}

function getActNames(data) {
  console.log("data", data);
  const names = [];
  if (data[0]) {
    data[0].accounts.forEach(act => {
      names.push(act.name);
    });
  }
  return names;
}

function drawLines(data) {
  const formattedData = formatData(data);
  const names = getActNames(data);
  if (names[0]) {
    return (
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {names.map(name => {
          return (
            <Line
              key={name}
              dataKey={`${name}`}
              type="monotone"
              stroke={colorPicker()}
            />
          );
        })}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Legend />
        <XAxis dataKey="timestamp" />
        <YAxis />
      </LineChart>
    );
  }
}
const FundsChart = ({ data }) => {
  return (
    <div className="line">
      {drawLines(data)}
      {/* <Line type="monotone" dataKey="val1" stroke="#8884d8" />
      <Line type="monotone" dataKey="val2" stroke="#6662b6" />
      <Legend /> */}
    </div>
  );
};

export default FundsChart;
