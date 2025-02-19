import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StorageCoreAllocationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      let newData = [];
      const times = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
      
      times.forEach((time) => {
        newData.push({
          name: time,
          App1: Math.floor(Math.random() * 200),
          App2: Math.floor(Math.random() * 200),
          App3: Math.floor(Math.random() * 200),
          App4: Math.floor(Math.random() * 200),
          App5: Math.floor(Math.random() * 200),
          Other: Math.floor(Math.random() * 200),
        });
      });

      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "left", marginLeft:"25px"}}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - Storage Allocation</h3>
      <p style={{ marginTop: "0", fontSize: "14px", opacity: 0.8 }}>
        Total Available: 512, Average App: 12%
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#CCC" />
          <YAxis stroke="#CCC" />
          <Tooltip />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
          <Line type="monotone" dataKey="App1" stroke="#31B969" />
          <Line type="monotone" dataKey="App2" stroke="#BFA836" />
          <Line type="monotone" dataKey="App3" stroke="#1B5CC6" />
          <Line type="monotone" dataKey="App4" stroke="#BF2525" />
          <Line type="monotone" dataKey="App5" stroke="#703494" />
          <Line type="monotone" dataKey="Other" stroke="#344247" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StorageCoreAllocationChart;
