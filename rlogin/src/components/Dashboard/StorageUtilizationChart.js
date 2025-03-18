import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useSystemMetrics } from '../../context/SystemMetricsContext';
Chart.register(ArcElement, Tooltip, Legend);

const StorageUtilizationChart = () => {
  const [StorageUsage, setStorageUsage] = useState(0);

    const { metrics, loading, error } = useSystemMetrics();
      useEffect(() => {
      setStorageUsage(Math.round(metrics?.storage?.used_percent));},[metrics?.storage?.used_percent]);
      if (loading) return <p>Loading metrics...</p>;
      if (error) return <p>Error: {error}</p>;

  const data = {
    labels: ["Utilization", "Free"],
    datasets: [
      {
        data: [StorageUsage, 100 - StorageUsage],
        backgroundColor: ["#31B969", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#344247"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    cutout: "80%", 
    responsive: false,
    circumference: 280,
    rotation:-140,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "10px" }}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - Storage Utilization</h3>
      <p style={{ marginBottom: "45px",marginTop: "0px", fontSize: "14px" }}>
        MIN:0%  MAX:100%  CURRENT:{Math.round(StorageUsage)}%
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
                  cx="50"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="3,7"
                />
                
               
                <text x="43%" y="45%" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                  {Math.round(StorageUsage)}%
                </text>
                <text x="43%" y="60%" textAnchor="middle" fill="#888888" fontSize="12">
                  Utilization
                </text>
              </svg>
            </div>
            <div style={{ textAlign: "center", marginTop: "-70px",marginBottom:"48px"}}>
             <span style={{  fontSize: "14px", color: "#888888",marginRight:"25px" }}>0%</span>
             <span style={{  fontSize: "14px", color: "#888888",marginLeft:"40px",marginRight:"50px" }}>100%</span>
            </div>
    </div>
  );
};

export default StorageUtilizationChart;
