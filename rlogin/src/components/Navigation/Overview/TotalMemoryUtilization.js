import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSystemMetrics } from "../../../context/SystemMetricsContext";

const TotalMemoryUtilization = () => {
  const [MemUsage, setMemUsage] = useState(0);
  const [MemGB, setMemGB] = useState(0);

  const { metrics, loading, error } = useSystemMetrics();
          useEffect(() => {
          setMemUsage(Math.round(metrics?.memory?.used_percent));
          setMemGB(Math.round(metrics?.memory?.total_gb));},[metrics?.memory?.used_percent,metrics?.memory?.total_gb]);
          if (loading) return <p>Loading metrics...</p>;
          if (error) return <p>Error: {error}</p>;

 
  const data = {
    labels: ["Utilization", "Free"],
    datasets: [
      {
        data: [MemUsage, 100 - MemUsage],
        backgroundColor: ["#31B969", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#344247"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  }

  const options = {
    cutout: "80%",
    responsive: false,
    circumference: 280,
    rotation: -140,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <h3 style={{ marginTop: "8px", marginBottom: "15px", textAlign: "left" }}>
        Memory Utilization
      </h3>
      <div
        style={{
          width: "250px",
          margin: "0 auto",
          marginBottom: "60px",
          position: "relative",
        }}
      >
        <Doughnut
          data={data}
          options={options}
          style={{ transform: "translate(-8%, 0%)" }}
        />
        <svg
          width="140"
          height="140"
          viewBox="0 0 120 120"
          style={{
            position: "absolute",
            top: "58%",
            left: "51%",
            transform: "translate(-50%, -50%)",
          }}
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

          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            {Math.round(MemUsage)}%
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="#888888"
            fontSize="12"
          >
            {Math.round(MemGB)}GB
          </text>
        </svg>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "-60px",
          marginBottom: "48px",
        }}
      >
        <span
          style={{ fontSize: "14px", color: "#888888", marginRight: "10px" }}
        >
          0%
        </span>
        <span
          style={{ fontSize: "14px", color: "#888888", marginLeft: "50px" }}
        >
          100%
        </span>
      </div>
    </div>
  );
};

export default TotalMemoryUtilization;
