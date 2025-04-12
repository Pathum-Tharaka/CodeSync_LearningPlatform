import React from "react";
import { Grid } from "@mui/material";

const Authentication = () => {
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt=""
          />
        </Grid>
        <div className="absolute top=[26%] left-[19%]">
          <svg
            height="300"
            width="300"
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-jw1i3a r-4qtqp9 r-yyyyoo r-labphf
            r-1777fci r-dnmrzs r-494qqr r-bnwqim r-lplcrui r-lrvibr"
          >
            <g>
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.171-5.214-6.
                817L4.99 21.75H1.6817.73-8.835L1.254 2.25H8.18.0814.713 6.231zm-1.
                161 17.52h1.833L7.084 4.126H5.117z"
              ></path>
            </g>
          </svg>
        </div>
      </Grid>
    </div>
  );
};

export default Authentication;
