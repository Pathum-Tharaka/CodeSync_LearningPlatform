import React from 'react'
import Grid from '@mui/material/Grid';

const HomePage = () => {
    return (
      <Grid container xs={12} className="px-5 lg:px-36 justify-between">
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <p className='text-center'>Grid 1</p>
          
        </Grid>
        <Grid item xs={12} lg={6} className="hidden lg:block w-full relative">
        <p className='text-center'>Grid 1</p>
        </Grid>
        <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <p className='text-center'>Grid 1</p>
        </Grid>
      </Grid>
    );
  }
  
export default HomePage