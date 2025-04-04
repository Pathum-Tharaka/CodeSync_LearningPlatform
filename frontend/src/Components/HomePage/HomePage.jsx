import React from 'react'
import Grid from '@mui/material/Grid';
import Navigation from '../Navigation/Navigation';

const HomePage = () => {
    return (
      <Grid container xs={12} className="px-5 lg:px-36 justify-between">
        <Grid item xs={0} lg={3} className="relative hidden lg:block">
          <Navigation/>          
        </Grid >
        <Grid item xs={12} lg={6} className="relative hidden lg:block">
        <p className='text-center'>Grid 2</p>
        </Grid>
        <Grid item xs={0} lg={3} className="relative hidden lg:block">
        <p className='text-center'>Grid 3</p>
        </Grid>
      </Grid>
    );
  }
  
export default HomePage