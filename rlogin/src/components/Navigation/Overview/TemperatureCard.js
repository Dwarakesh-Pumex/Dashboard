import React, { useState, useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import { useWeatherMetrics } from "../../../context/WeatherMetricsContext";

const TemperatureCard = () => {
  const [Temp, setTemp] = useState(0);
  const [TempW, setTempW] = useState("");

  const { metrics, loading, error } = useWeatherMetrics();
  
    useEffect(() => {
      setTemp((Math.round((metrics?.temperature)* 9 / 5 + 32 || 0))); 
    }, [metrics?.temperature]);
  
    useEffect(() => {
      if (Temp <= 68) {
        setTempW("Low");
      } else if (Temp > 68 && Temp <= 72) {
        setTempW("Normal");
      } else {
        setTempW("High");
      }
    }, [Temp]);

  
    if (loading) return <p>Loading metrics...</p>;
    if (error) return <p>Error: {error}</p>;

  
  const data = {
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
