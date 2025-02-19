import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const MemoryUtilizationChart = () => {
  const [cpuUsage, setCpuUsage] = useState(55);
  const [data, setData] = useState({
    labels: ["App1", "App2", "App3", "App4", "App5", "Other"],
    datasets: [
      {
        data: [10, 20, 15, 18, 12, 25],
        backgroundColor: ["#31B969", "#BFA836", "#1B5CC6", "#BF2525", "#703494", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#A89030", "#1650A6", "#A01F1F", "#5E2B82", "#2A3535"],
      },
    ],
  });

  useEffect(() => {
    const updateData = () => {
      const newCpuUsage = Math.floor(Math.random() * 100);

      const app1 = Math.floor(newCpuUsage * 0.25);
      const app2 = Math.floor(newCpuUsage * 0.20);
      const app3 = Math.floor(newCpuUsage * 0.15);
      const app4 = Math.floor(newCpuUsage * 0.18);
      const app5 = Math.floor(newCpuUsage * 0.12);
      const other = Math.max(100 - (app1 + app2 + app3 + app4 + app5), 0); 

      setCpuUsage(newCpuUsage);
      setData({
        labels: ["App1", "App2", "App3", "App4", "App5", "Other"],
        datasets: [
          {
            data: [app1, app2, app3, app4, app5, other],
            backgroundColor: ["#31B969", "#BFA836", "#1B5CC6", "#BF2525", "#703494", "#344247"],
            hoverBackgroundColor: ["#28A75A", "#A89030", "#1650A6", "#A01F1F", "#5E2B82", "#2A3535"],
          },
        ],
      });
    };

    updateData();
    const interval = setInterval(updateData, 5000); 

    return () => clearInterval(interval);
  }, []);

  const options = {
    cutout: "85%", 
    circumference: 280,
    rotation:-140,
    responsive: true,
    plugins: {
      legend: { display: true, position: "right", },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "25px" }}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - Memory Utilization</h3>
      <p style={{ marginTop: "0", fontSize: "14px" }}>
        MIN:0%  MAX:100%  CURRENT:{cpuUsage}%
      </p>
      <div style={{ width: "250px", margin: "0 auto", position:"relative" }}>
        <Doughnut data={data} options={options} />
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          style={{ position: "absolute", top: "54%", left: "31%", transform: "translate(-50%, -50%)" }}
        >
          {/* Dotted Circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="3,7"
          />
          
          {/* CPU Utilization Text */}
          <text x="50%" y="45%" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
            {cpuUsage+1024}
          </text>
          <text x="50%" y="60%" textAnchor="middle" fill="#888888" fontSize="12">
            GB Used
          </text>
        </svg>
      </div>
    </div>
  );
};

export default MemoryUtilizationChart;
