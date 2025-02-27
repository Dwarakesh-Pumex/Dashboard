import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";


const StorageUtilizationChart = () => {
  const [cpuUsage, setCpuUsage] = useState(55);
  const [data, setData] = useState({
    labels: ["App1", "App2", "App3", "App4", "App5", "Other"],
    datasets: [
      {
        data: [10, 20, 15, 18, 12, 25],
        backgroundColor: ["#31B969", "#BFA836", "#1B5CC6", "#BF2525", "#703494", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#A89030", "#1650A6", "#A01F1F", "#5E2B82", "#2A3535"],
        borderWidth: 0,
        hoverOffset: 6,
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
    cutout: "80%",
    responsive: false,
    circumference: 280,
    rotation: -140,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: { enabled: true },
      minMaxLabelPlugin: true, 
    },
  };
  

  return (
    <div style={{ textAlign: "left", marginLeft: "10px" }}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - GPU Utilization</h3>
      <p style={{ marginBottom: "45px",marginTop: "0px", fontSize: "14px" }}>
        MIN:0%  MAX:100%  CURRENT:{cpuUsage}%
      </p>
      <div style={{ width: "250px", margin: "0 auto",marginBottom: "70px", position:"relative" }}>
              <Doughnut data={data} options={options} />
              <svg
                width="140"
                height="140"
                viewBox="0 0 120 120"
                style={{ position: "absolute", top: "58%", left: "41%", transform: "translate(-50%, -50%)" }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="3,7"
                />
                
                <text x="50%" y="45%" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                  {cpuUsage}MB
                </text>
                <text x="50%" y="60%" textAnchor="middle" fill="#888888" fontSize="12">
                  Utilized
                </text>
              </svg>
            </div>
            <div style={{ textAlign: "center", marginTop: "-70px",marginBottom:"48px"}}>
             <span style={{  fontSize: "14px", color: "#888888",marginRight:"10px" }}>0MB</span>
             <span style={{  fontSize: "14px", color: "#888888",marginLeft:"50px",marginRight:"38px" }}>400MB</span>
            </div>

    </div>
  );
};

export default StorageUtilizationChart;
