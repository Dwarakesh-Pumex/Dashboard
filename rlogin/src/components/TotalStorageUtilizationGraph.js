import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: "8:25 PM", usage: 10 },
  { time: "10:00 PM", usage: 30 },
  { time: "12:00 AM", usage: 80 },
  { time: "2:00 AM", usage: 70 },
  { time: "4:35 AM", usage: 90 },
  { time: "6:00 AM", usage: 99 },
  { time: "8:00 AM", usage: 60 },
  { time: "10:00 AM", usage: 80 },
  { time: "12:00 PM", usage: 55 },
  { time: "2:00 PM", usage: 24 },
  { time: "4:00 PM", usage: 25 },
  { time: "5:35 PM", usage: 0 },
  { time: "6:30 PM", usage: 75 },
];

const yTicks = [0, 50, 100]; 

const TotalStorageUtilizationGraph = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <h3 style={{ marginTop: "0px", marginBottom: "5px" }}>Storage Utilization</h3>
      <p style={{ marginTop: "0", marginBottom: "5px", fontSize: "14px", opacity: 0.8 }}>
        MIN 14 Kbps MAX 56 Mbps LAST 44 Mbps
      </p>

      
      <div style={{ marginRight:"20px",display: "flex", justifyContent: "center" }}>
        <AreaChart width={350} height={200} data={data}>
          <defs>
            <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#fff"
            tickFormatter={(value, index) => {
              const showIndices = [0, Math.floor(data.length / 2), data.length - 1];
              return showIndices.includes(index) ? value : "";
            }}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#fff" domain={[0, 100]} ticks={yTicks} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="usage"
            stroke="#4CAF50"
            strokeWidth={1}
            fillOpacity={1}
            fill="url(#cpuGradient)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default TotalStorageUtilizationGraph;
