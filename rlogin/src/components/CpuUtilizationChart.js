import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Plugin } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

// Custom Plugin to draw a dotted circle inside the doughnut
const DottedCirclePlugin = {
  id: "dottedCircle",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const { chartArea, innerRadius, radius } = chart;

    // Set the dotted circle style
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // Dotted line pattern
    ctx.arc(
      chartArea.left + (chartArea.right - chartArea.left) / 2, 
      chartArea.top + (chartArea.bottom - chartArea.top) / 2,
      (radius + innerRadius) / 2, // Inner circle radius
      0, 
      Math.PI * 2
    );
    ctx.strokeStyle = "#007bff"; // Color of the dotted line
    ctx.stroke();
    ctx.restore();
  },
};

Chart.register(DottedCirclePlugin);

const CpuUtilizationChart = () => {
  const [cpuUsage, setCpuUsage] = useState(55);
  const [data, setData] = useState({
    labels: ["App1", "App2", "App3", "App4", "App5", "Other"],
    datasets: [
      {
        data: [10, 20, 15, 18, 12, 25], // Initial dummy values
        backgroundColor: ["#31B969", "#BFA836", "#1B5CC6", "#BF2525", "#703494", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#A89030", "#1650A6", "#A01F1F", "#5E2B82", "#2A3535"],
      },
    ],
  });

  useEffect(() => {
    const updateData = () => {
      const newCpuUsage = Math.floor(Math.random() * 100);

      // Distribute CPU usage among apps proportionally
      const app1 = Math.floor(newCpuUsage * 0.25);
      const app2 = Math.floor(newCpuUsage * 0.20);
      const app3 = Math.floor(newCpuUsage * 0.15);
      const app4 = Math.floor(newCpuUsage * 0.18);
      const app5 = Math.floor(newCpuUsage * 0.12);
      const other = Math.max(100 - (app1 + app2 + app3 + app4 + app5), 0); // Ensure no negatives

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
    const interval = setInterval(updateData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const options = {
    cutout: "90%", // Creates a doughnut effect
    responsive: true,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: { enabled: true },
      dottedCircle: {}, // Activate the custom plugin
    },
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "25px" }}>
      <h3 style={{ marginBottom: "5px" }}>Top Apps - CPU Utilization</h3>
      <p style={{ marginTop: "0", fontSize: "14px" }}>
        Min=0%, Max=100%, Current {cpuUsage}%
      </p>
      <div style={{ width: "250px", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CpuUtilizationChart;
