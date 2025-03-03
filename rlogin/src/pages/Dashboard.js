import React from 'react';
import { Container, Grid, Paper, Card, Box } from '@mui/material';
import CpuUtilizationChart from '../components/Dashboard/CpuUtilizationChart';
import CpuCoreAllocationChart from '../components/Dashboard/CpuCoreAllocationChart';
import MemoryCoreAllocationChart from '../components/Dashboard/MemoryCoreAllocationChart';
import MemoryUtilizationChart from '../components/Dashboard/MemoryUtilizationChart';
import StorageUtilizationChart from '../components/Dashboard/StorageUtilizationChart';
import StorageCoreAllocationChart from '../components/Dashboard/StorageCoreAllocationChart';
import GpuUtilizationChart from '../components/Dashboard/GpuUtilizationChart';
import GpuCoreAllocationChart from '../components/Dashboard/GpuCoreAllocationChart';
import Side from '../components/Navigation/Side';

const Dashboard = () => {
  return (
    <div>
      {/* System Info Section */}
      <Box sx={{ marginLeft: "180px", marginBottom: "20px",marginTop:"25px" }}>
        <h4 style={{ color: "white", fontSize: "20px", marginBottom: "5px" }}>SYSTEM ID</h4>
        <h2 style={{ color: "white", fontSize: "35px",marginTop:"3px" }}>GAL-NM-6234</h2>
      </Box>

      <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
        <Grid container spacing={3}>
          <Side />

          {/* CPU Section */}
          <Grid item xs={12}>
            <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
              <h2 style={{ color: '#FFF', marginBottom: '15px' }}>CPU</h2>
              <Grid container spacing={2}>
                {/* CPU Utilization Card */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <CpuUtilizationChart />
                  </Card>
                </Grid>

                {/* CPU Core Allocation Card */}
                <Grid item xs={12} md={8}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <CpuCoreAllocationChart />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Memory Section */}
      <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
              <h2 style={{ color: '#FFF', marginBottom: '15px' }}>Memory</h2>
              <Grid container spacing={2}>
                {/* Memory Utilization Card */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <MemoryUtilizationChart />
                  </Card>
                </Grid>

                {/* Memory Allocation Card */}
                <Grid item xs={12} md={8}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <MemoryCoreAllocationChart />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Storage Section */}
      <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
              <h2 style={{ color: '#FFF', marginBottom: '15px' }}>Storage</h2>
              <Grid container spacing={2}>
                {/* Storage Utilization Card */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <StorageUtilizationChart />
                  </Card>
                </Grid>

                {/* Storage Allocation Graph */}
                <Grid item xs={12} md={8}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <StorageCoreAllocationChart />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* GPU Section */}
      <Container maxWidth="lg" sx={{ backgroundColor: '#01141A', padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ backgroundColor: '#091A20', padding: '20px' }}>
              <h2 style={{ color: '#FFF', marginBottom: '15px' }}>GPU</h2>
              <Grid container spacing={2}>
                {/* GPU Utilization Card */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#102127', padding: '15px' }}>
                    <GpuUtilizationChart />
                  </Card>
                </Grid>

                {/* GPU Core Allocation Card */}
                <Grid item xs={12} md={8}>
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
