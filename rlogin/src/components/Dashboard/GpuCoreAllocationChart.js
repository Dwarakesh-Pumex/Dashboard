import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CpuCoreAllocationChart = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const generateData = () => {
      let newData = [];
      const times = ["10:00", "10:30", "11:00", "11:30", "12:00","12:30","1:00","1:30","2:00","2:30"];
      let totalAllocation = 0;
      let totalCount = 0;

      times.forEach((time) => {
        const base = Math.floor(Math.random() * 50) + 50;
        const app1 = base;
        const app2 = base * 0.6;
        const app3 = base * 0.4;
        const app4 = base * 0.2;
        const app5 = base * 0.15;
        const other = base * 0.1;

        const allocationArray = [app1, app2, app3, app4, app5];
        const avgAllocation = (allocationArray.reduce((acc, val) => acc + val, 0) / allocationArray.length).toFixed(2);

        newData.push({
          name: time,
          App1: app1,
          App2: app2,
          App3: app3,
          App4: app4,
          App5: app5,
          Other: other,
          avg: avgAllocation,
        });

        totalAllocation += app1 + app2 + app3 + app4 + app5;
        totalCount += 5; 
      });

      setData(newData);
      setAvg((totalAllocation / totalCount).toFixed(2));
    };

    generateData();
    const interval = setInterval(generateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "left", marginLeft: "25px" }}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - GPU Allocation</h3>
      <p style={{ marginTop: "0", fontSize: "14px", opacity: 0.8 }}>
        AVERAGE ALLOCATION ACROSS ALL APPS: {avg}
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#CCC" />
          <YAxis stroke="#CCC" />
          <Tooltip />
          <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{ left: 610 }}/>
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

export default CpuCoreAllocationChart;
