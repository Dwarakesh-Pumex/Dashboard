import React from "react";
import { Circle } from "@mui/icons-material";
import './InfoCard.css';

export default function InfoCard() {
  const deviceInfo = {
    deviceID: "GAL-NM-6234",
    sections: [
      { label: "Status", value: "Healthy", icon: "check_circle" },
      { label: "Security", value: "Doors Armed", icon: "check_circle" },
      { label: "Temperature", value: Math.floor(Math.random() * 101) },
      { label: "Humidity", value: Math.floor(Math.random() * 101), icon: "info" },
      { label: "Fire Suppression", value: true, icon: "check_circle" },
      { label: "Physical Address", value: "1932 East Marginal Way S, Tukwila" },
      { label: "Days Without Incident", value: "80 days" },
      { label: "Serial Number", value: "0301923-1253711-231-3" },
    ],
  };

  const sectionMap = Object.fromEntries(deviceInfo.sections.map(item => [item.label, item.value]));

  return (
    <div className="container" style={{padding: "15px", background: "#102127", borderRadius: "10px" }}>
      {/* Device ID */}
      <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{deviceInfo.deviceID}</h3>
      <hr style={{ borderColor: "#3F4041" }} />

      <div className="row">
        <div className="column left">
          
          {["Status", "Security", "Temperature", "Humidity"].map((label) => (
            <div key={label} style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "15px", marginRight: "10px", marginBottom: "5px" }}>{label}:</h3>
              {label === "Status" && (
                <>
                  <Circle sx={{ color: sectionMap[label] === "Healthy" ? "#29A15A" : "red", fontSize: "10px", marginRight: "5px" }} />
                  <span>{sectionMap[label]}</span>
                </>
              )}
              {label === "Security" && (
                <>
                  <Circle sx={{ color: sectionMap[label] === "Doors Armed" ? "#29A15A" : "red", fontSize: "10px", marginRight: "5px" }} />
                  <span>{sectionMap[label]}</span>
                </>
              )}
              {label === "Temperature" && (
                <>
                  <Circle sx={{ color: sectionMap[label] <= 75 ? "#29A15A" : "red", fontSize: "10px", marginRight: "5px" }} />
                  <span>{sectionMap[label]}°F - {sectionMap[label] <= 75 ? "Normal" : "High"}</span>
                </>
              )}
              {label === "Humidity" && (
                <>
                  <Circle sx={{ color: sectionMap[label] <= 75 ? "#29A15A" : "red", fontSize: "10px", marginRight: "5px" }} />
                  <span>{sectionMap[label]}% - {sectionMap[label] <= 75 ? "Normal" : "High"}</span>
                </>
              )}
              <hr/>
            </div>
          ))}
        </div>

        <div className="column right">
          
          {["Fire Suppression", "Physical Address", "Days Without Incident", "Serial Number"].map((label) => (
            <div key={label} style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "15px", marginRight: "10px", marginBottom: "5px" }}>{label}:</h3>
              {label === "Fire Suppression" && (
                <>
                  <Circle sx={{ color: sectionMap[label] ? "#29A15A" : "red", fontSize: "10px", marginRight: "5px" }} />
                  <span>{sectionMap[label] ? "Smoke Systems Enabled" : "Smoke System Disabled"}</span>
                </>
              )}
              {label === "Physical Address" && <span>{sectionMap[label]}</span>}
              {label === "Days Without Incident" && <span>{sectionMap[label]}</span>}
              {label === "Serial Number" && <span>{sectionMap[label]}</span>}
              <hr style={{ borderColor: "#3F4041" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
