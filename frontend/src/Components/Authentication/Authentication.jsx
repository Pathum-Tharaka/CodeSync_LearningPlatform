import React from "react";
import { Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";

const Authentication = () => {
  return (
    <div className=" overflow-hidden">

        {/* Right Side - Form */}
        <Grid item xs={12} lg={5} className="p-4 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="font-bold text-4xl mb-4">Happening Now</h1>
              <h2 className="font-bold text-2xl">Join Codesync Today</h2>
            </div>

            {/* Desktop Header (hidden on mobile) */}
            <div className="hidden lg:block mb-8">
              <h1 className="font-bold text-3xl mb-4">Join Codesync Today</h1>
            </div>

            <div className="space-y-4">
              <div className="w-full">
                <GoogleLogin width="100%" />
              </div>
              
              <p className="py-2 text-center">OR</p>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "10px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                Create Account
              </Button>
              
              <div>
                <p className="text-xs text-gray-600 mt-2">
                  By signing up, you agree to the Terms of Service and Privacy
                  Policy, including Cookie Use.
                </p>
              </div>
              
              <div className="mt-10">
                <h1 className="font-bold text-lg mb-4">
                  Already have an account?
                </h1>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "29px",
                    py: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold"
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </Grid>
     
    </div>
  );
};

export default Authentication;