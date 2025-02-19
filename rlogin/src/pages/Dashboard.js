import React from 'react';
import { Container, Grid, Paper, Card } from '@mui/material';
import CpuUtilizationChart from '../components/CpuUtilizationChart';
import CpuCoreAllocationChart from '../components/CpuCoreAllocationChart';
import MemoryCoreAllocationChart from '../components/MemoryCoreAllocationChart'
import MemoryUtilizationChart from '../components/MemoryUtilizationChart';
import StorageUtilizationChart from '../components/StorageUtilizationChart';
import StorageCoreAllocationChart from '../components/StorageCoreAllocationChart';
import GpuUtilizationChart from '../components/GpuUtilizationChart';
import GpuCoreAllocationChart from '../components/GpuCoreAllocationChart';

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
    <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
      <Grid container spacing={3}>

        {/* Memory Section */}
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
            <h2 style={{ color: '#FFF', marginBottom: '15px' }}>Memory</h2>
            <Grid container spacing={2}>
              {/* Memory Utilization Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <MemoryUtilizationChart />
                </Card>
              </Grid>

              {/* Memory Allocation Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <MemoryCoreAllocationChart />
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        
      </Grid>
    </Container>
    <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
      <Grid container spacing={3}>

        {/* Storage Section */}
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
            <h2 style={{ color: '#FFF', marginBottom: '15px' }}>Storage</h2>
            <Grid container spacing={2}>
              {/* Storage Utilization Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <StorageUtilizationChart />
                </Card>
              </Grid>

              {/* Storage Allocation Graph */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <StorageCoreAllocationChart />
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        
      </Grid>
    </Container>
    <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
      <Grid container spacing={3}>

        {/* GPU Section */}
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
            <h2 style={{ color: '#FFF', marginBottom: '15px' }}>GPU</h2>
            <Grid container spacing={2}>
              {/* GPU Utilization Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <GpuUtilizationChart />
                </Card>
              </Grid>

              {/* GPU Core Allocation Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                  <GpuCoreAllocationChart />
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
