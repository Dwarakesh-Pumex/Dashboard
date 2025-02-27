import React from "react"; 
import { Container, Grid, Card } from "@mui/material";
import InfoCard from "../components/Overview/InfoCard";
import HostMetrics from "../components/Overview/HostMetrics";
import EnvironmentalMetrics from "../components/Overview/EnvironmentalMetrics";
import UtilizationGraph from "../components/Overview/UtilizationGraph";
import MapCard from "../components/Overview/MapCard"; // Import MapCard

export default function Overview() {
  return (
    <div>
      <h7 style={{ marginLeft: "100px", color: "white", fontSize: "20px" }}>SYSTEM ID</h7>
      <h2 style={{ marginTop: "5px", marginLeft: "100px", color: "white", fontSize: "35px" }}>GAL-NM-6234</h2>

      <Container maxWidth="lg" sx={{ backgroundColor: "#01141A", padding: "20px" }}>
        <Grid container spacing={3}>

          {/* First Section */}
          <Grid item xs={12}>
        <Grid container spacing={2}>
          
          {/* Information Card - Larger Width */}
          <Grid item xs={12} md={8}>
            <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
              <InfoCard />
            </Card>
          </Grid>

          {/* Map Section - Smaller Width */}
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
