import React, { useState, useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const TemperatureCard = () => {
  const [Temp, setTemp] = useState(0);
  const [TempW, setTempW] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const t = localStorage.getItem("jwtToken")?.trim();
      if (!t) {
        console.warn("No token found in localStorage.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/profile/weather/Tukwila",
          {
            headers: {
              Authorization: `Bearer ${t}`,
              "Content-Type": "application/json",
            },
          }
        );

        const temperature = response.data.temperature;
        setTemp(Math.round((temperature * 9/5) + 32));

        if (temperature <= 68) {
          setTempW("Low");
        } else if (temperature > 68 && temperature <= 72) {
          setTempW("Normal");
        } else {
          setTempW("High");
        }
      } catch (error) {
        console.error("Error response:", error.response?.data || error.message);
        console.error("Headers sent:", error.config?.headers);
      }
    };

    fetchData();
  }, []); 

  
  const data = useMemo(() => ({
    labels: ["Temperature"],
    datasets: [
      {
        data: [Temp || 0, 100 - (Temp || 0)],
        backgroundColor: ["#31B969", "#344247"],
        hoverBackgroundColor: ["#28A75A", "#344247"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  }), [Temp]);

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
        Temperature
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
            {Temp !== null ? `${Temp}°F` : "N/A"}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="#888888"
            fontSize="12"
          >
            {TempW}
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
          0
        </span>
        <span
          style={{ fontSize: "14px", color: "#888888", marginLeft: "50px" }}
        >
          220
        </span>
      </div>
    </div>
  );
};

export default TemperatureCard;
