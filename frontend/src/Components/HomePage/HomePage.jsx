import React from "react";
import Grid from "@mui/material/Grid";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import Profile from "../Profile/Profile";
import { Route, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <Grid container xs={12} className="px-5 lg:px-36 justify-between">
      <Grid item xs={0} lg={0} className="hidedn lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid item xs={12} lg={6} className="px-5 lg:px-9 hidden w-full relative">
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Grid>
      <Grid item xs={0} lg={3} className="relative lg:block w-full relative">
        <p className="text-center">Grid 3</p>
      </Grid>
    </Grid>
  );
};

export default HomePage;
