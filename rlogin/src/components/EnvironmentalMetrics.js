import React from 'react';
import {Container,Grid,Paper,Card} from '@mui/material';
import TemperatureCard from '../components/TemperatureCard';
import HumidityCard from '../components/HumidityCard';


export default function EnvironmentalMetrics(){
    return(
    <Grid item xs={12}>
        <Paper sx={{ backgroundColor: "#091A20", padding: "20px" }}>
          <h2 style={{ color: "#FFF", marginBottom: "15px" }}>Environmental Metrics</h2>
          <Grid container spacing={2} direction="row">
            
            {/* Temperature Card */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <TemperatureCard  />
              </Card>
            </Grid>
      
            {/* Humidity Card */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <HumidityCard />
              </Card>
            </Grid>
      
          </Grid>
        </Paper>
      </Grid>)
}

         