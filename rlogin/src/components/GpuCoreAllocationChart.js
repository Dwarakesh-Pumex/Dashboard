import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GpuCoreAllocationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      let newData = [];
      const times = ["10:00", "10:30", "11:00", "11:30", "12:00"];
      
      times.forEach((time) => {
        const base = Math.floor(Math.random() * 50) + 50;
        newData.push({
          name: time,
          App1: base,
          App2: base * 0.6,
          App3: base * 0.4,
          App4: base * 0.2,
          App5: base * 0.15,
          Other: base * 0.1,
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
      <h3 style={{ marginBottom: "5px" }}>Top Apps - GPU Allocation</h3>
      <p style={{ marginTop: "0", fontSize: "14px", opacity: 0.8 }}>
        Total Available: 512, Average App: 12%
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#CCC" />
          <YAxis stroke="#CCC" />
          <Tooltip />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
          <Bar dataKey="App1" stackId="a" fill="#31B969" />
          <Bar dataKey="App2" stackId="a" fill="#BFA836" />
          <Bar dataKey="App3" stackId="a" fill="#1B5CC6" />
          <Bar dataKey="App4" stackId="a" fill="#BF2525" />
          <Bar dataKey="App5" stackId="a" fill="#703494" />
          <Bar dataKey="Other" stackId="a" fill="#344247" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GpuCoreAllocationChart;
