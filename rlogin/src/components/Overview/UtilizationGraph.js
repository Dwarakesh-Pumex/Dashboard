import React from "react";
import { Grid, Paper, Card } from "@mui/material";
import TotalCpuUtilizationGraph from "./TotalCpuUtilizationGraph";
import TotalMemoryUtilizationGraph from "./TotalMemoryUtilizationGraph";
import TotalStorageUtilizationGraph from "./TotalStorageUtilizationGraph";

export default function UtilizationGraph() {
  return (
    <Grid item xs={12}>
      <Paper sx={{ backgroundColor: "#091A20", padding: "20px" }}>
        <h2 style={{ color: "#FFF", marginBottom: "15px" }}>
          Utilization Graph
        </h2>

        <Grid 
          container 
          spacing={3} 
          sx={{ width: "100%", justifyContent: "center" }} 
        >
          {/* Total CPU Utilization Graph */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#102127", width: "100%", padding: "8px" }}>
              <TotalCpuUtilizationGraph />
            </Card>
          </Grid>

          {/* Total Memory Utilization Graph */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#102127", width: "100%", padding: "8px" }}>
              <TotalMemoryUtilizationGraph />
            </Card>
          </Grid>

          {/* Total Storage Utilization Graph */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#102127", width: "100%", padding: "8px" }}>
              <TotalStorageUtilizationGraph />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
