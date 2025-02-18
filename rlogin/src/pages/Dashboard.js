import React from 'react';
import { Container, Grid, Paper, Card } from '@mui/material';
import CpuUtilizationChart from '../components/CpuUtilizationChart';
import CpuCoreAllocationChart from '../components/CpuCoreAllocationChart';
import { color } from 'chart.js/helpers';

const Dashboard = () => {
  return (
    <div>
    <h2 style={{color:"white"}}>GAL-NM-6234</h2>
    <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
      <Grid container spacing={3}>

        {/* CPU Section */}
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
            <h2 style={{ color: '#FFF', marginBottom: '15px' }}>CPU</h2>
            <Grid container spacing={2}>
              {/* CPU Utilization Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <CpuUtilizationChart />
                </Card>
              </Grid>

              {/* CPU Core Allocation Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <CpuCoreAllocationChart />
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        
      </Grid>
    </Container>
    </div>
  );
};

export default Dashboard;
