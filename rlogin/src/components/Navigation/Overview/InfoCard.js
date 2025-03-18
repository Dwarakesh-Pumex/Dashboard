import React, { useState, useEffect } from "react";
import { Circle } from "@mui/icons-material";
import './InfoCard.css';
import { useWeatherMetrics} from "../../../context/WeatherMetricsContext";

export default function InfoCard() {
  const [deviceInfo, setDeviceInfo] = useState({
    deviceID: "GAL-NM-6234",
    sections: [],
  });


  const [Humidity, setHumidity] = useState(0);
  const[Temperature,setTemperature]=useState(0);
  const { metrics, loading, error } = useWeatherMetrics();
  

  
        useEffect(() => {
          setHumidity(Math.round(metrics?.humidity || 0));
          setTemperature(Math.round(metrics?.temperature || 0));
        }, [metrics?.humidity, metrics?.temperature]);
        const temperature = Math.round((Temperature) * 9 / 5 + 32);
        
        useEffect(() => {
          setDeviceInfo({
            deviceID: "GAL-NM-6234",
            sections: [
              { label: "Status", value: "Healthy", icon: "check_circle" },
              { label: "Security", value: "Doors Armed", icon: "check_circle" },
              { label: "Temperature", value: temperature, icon: "info" },
              { label: "Humidity", value: Humidity, icon: "info" },
              { label: "Fire Suppression", value: true, icon: "check_circle" },
              { label: "Physical Address", value: "1932 East Marginal Way S, Tukwila" },
              { label: "Days Without Incident", value: "80 days" },
              { label: "Serial Number", value: "0301923-1253711-231-3" },
            ],
          });
          
        }, [temperature, Humidity]);

        if (loading) return <p>Loading metrics...</p>;
        if (error) return <p>Error: {error}</p>;
        

  const sectionMap = Object.fromEntries(deviceInfo.sections.map(item => [item.label, item.value]));

  return (
    <div className="container" style={{ padding: "15px", background: "#102127", borderRadius: "10px" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{deviceInfo.deviceID}</h3>
      <hr style={{ borderColor: "#3F4041" }} />

      <div className="row">
        <div className="column left">
          {["Status", "Security", "Temperature", "Humidity"].map((label) => (
            <div key={label} style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "15px", marginBottom: "5px" }}>{label}:</h3>
              <Circle
    sx={{
    color: 
      (label === "Status" || label === "Security") && 
      (sectionMap[label] === "Healthy" || sectionMap[label] === "Doors Armed")
        ? "#29A15A"
        : label === "Temperature" && sectionMap[label] <= 60
          ? "#29A15A"
          : label === "Humidity" && sectionMap[label] <= 60
            ? "#29A15A"
            : "red",
    fontSize: "10px",
    marginRight: "5px",
  }}
/>
              
              <span>
                {sectionMap[label]} {label === "Temperature" && "°F"}{" "}
                {["Humidity"].includes(label) && (
                  sectionMap[label] <= 60 ? "- Normal" : "- High"
                )}
              </span>
              <hr />
            </div>
          ))}
        </div>

        <div className="column right">
          {["Fire Suppression", "Physical Address", "Days Without Incident", "Serial Number"].map((label) => (
            <div key={label} style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "15px", marginBottom: "5px" }}>{label}:</h3>
              {label === "Fire Suppression" ? (
                <>
                  <Circle
                    sx={{
                      color: sectionMap[label] ? "#29A15A" : "red",
                      fontSize: "10px",
                      marginRight: "5px",
                    }}
                  />
                  <span>{sectionMap[label] ? "Smoke Systems Enabled" : "Smoke System Disabled"}</span>
                </>
              ) : (
                <span>{sectionMap[label]}</span>
              )}
              <hr style={{ borderColor: "#3F4041" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
