import React from 'react';
import {Container,Grid,Paper,Card} from '@mui/material';
import TotalCpuUtilization from '../components/TotalCpuUtilization';
import TotalMemoryUtilization from '../components/TotalMemoryUtilization';
import TotalStorageUtilization from '../components/TotalStorageUtilization';

export default function HostMetrics(){
    return(
    <Grid item xs={12}>
        <Paper sx={{ backgroundColor: "#091A20", padding: "20px" }}>
          <h2 style={{ color: "#FFF", marginBottom: "15px" }}>Host Metrics</h2>
          <Grid container spacing={2} direction="row" justifyContent="center">
            
            {/* Total CPU Utilization Card */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <TotalCpuUtilization />
              </Card>
            </Grid>
      
            {/* Memory Utilization Card */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <TotalMemoryUtilization />
              </Card>
            </Grid>
      
            {/* Storage Utilization Card */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#102127", padding: "15px" }}>
                <TotalStorageUtilization/>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>)
}

         