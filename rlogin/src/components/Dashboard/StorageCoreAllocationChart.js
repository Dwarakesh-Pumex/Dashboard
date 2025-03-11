import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const StorageCoreAllocationChart = () => {
  const [data, setData] = useState([]);
  const [Avg,setAvg] = useState(0);
  useEffect(() => {
    const generateData = () => {
      let newData = [];
      const times = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00","12:30","1:00","1:30","2:00","2:30"];
      let totalSum=0;

      times.forEach((time) => {
        const  app1 = Math.floor(Math.random() * 200);
        const  app2 = Math.floor(Math.random() * 200);
        const  app3 = Math.floor(Math.random() * 200);
        const  app4 = Math.floor(Math.random() * 200);
        const  app5 = Math.floor(Math.random() * 200);
        const  other= Math.floor(Math.random() * 200);
        const sum=app1+app2+app3+app4+app5+other;
        totalSum += sum;

        newData.push({
          name: time,
          App1: app1,
          App2: app2,
          App3: app3,
          App4: app4,
          App5: app5,
          Other: other,
        });
      });

      setData(newData);
      setAvg((totalSum/times.length).toFixed(2));
    };

    generateData();
    const interval = setInterval(generateData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "left", marginLeft:"25px"}}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - Storage Allocation</h3>
      <p style={{ marginTop: "0", fontSize: "14px", opacity: 0.8 }}>
        AVERAGE ALLOCATION ACROSS ALL APPS: {Avg} GB 
      </p>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#CCC" />
          <YAxis stroke="#CCC" />
          <Legend align="right" verticalAlign="middle" layout="vertical"  wrapperStyle={{ left: 610 }}/>
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
