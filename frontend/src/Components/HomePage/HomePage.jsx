import React from "react";
import Grid from "@mui/material/Grid";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";

const HomePage = () => {
    return (
      <Grid container spacing={12} className="px-5 lg:px-20">
        {/* Navigation - hidden on mobile, takes 3/12 columns on large screens */}
        <Grid item lg={3} className="hidden lg:block">
          <Navigation />
        </Grid>

        {/* Main content - takes full width on mobile, 6/12 columns on large screens */}
        <Grid item xs={12} lg={6} >
          <HomeSection />
        </Grid>

        {/* Right sidebar - hidden on mobile, takes 3/12 columns on large screens */}
        <Grid item lg={3} className="hidden lg:block">
          <div className="bg-gray-50 p-4 rounded">
            <p className='text-center'>Grid 3</p>
            {/* Add your right sidebar content here */}
          </div>
        </Grid>
      </Grid>
    );
  }
  
export default HomePage;
