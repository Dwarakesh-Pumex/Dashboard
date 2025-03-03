import React from "react"; 
import { Container, Grid, Card, Box } from "@mui/material";
import InfoCard from "../components/Overview/InfoCard";
import HostMetrics from "../components/Overview/HostMetrics";
import EnvironmentalMetrics from "../components/Overview/EnvironmentalMetrics";
import UtilizationGraph from "../components/Overview/UtilizationGraph";
import MapCard from "../components/Overview/MapCard";
import Side from "../components/Navigation/Side";
export default function Overview() {
  return (
    <div>
      {/* System Info Section */}
      <Box sx={{ marginLeft: "180px", marginBottom: "20px",marginTop:"25px" }}>
        <h4 style={{ color: "white", fontSize: "20px", marginBottom: "5px" }}>SYSTEM ID</h4>
        <h2 style={{ color: "white", fontSize: "35px",marginTop:"5px" }}>GAL-NM-6234</h2>
      </Box>

      <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
        <Grid container spacing={3}>
          <Side />

          {/* First Section */}
          <Grid item xs={12}>
        <Grid container spacing={2}>
          
          {/* Information Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
              <InfoCard />
            </Card>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#102127" }}>
              <MapCard />
            </Card>
          </Grid>

        </Grid>
      </Grid>

          {/* Environmental Metrics */}
          <Grid item xs={12}>
            <Grid>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <EnvironmentalMetrics />
              </Card>
            </Grid>
          </Grid>

          {/* Host Metrics */}
          <Grid item xs={12}>
            <Grid>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <HostMetrics />
              </Card>
            </Grid>
          </Grid>

          {/* Utilization Graph */}
          <Grid item xs={12}>
            <Grid>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <UtilizationGraph />
              </Card>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}
