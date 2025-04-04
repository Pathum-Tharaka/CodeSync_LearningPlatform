import React from "react";

import logo from "../../Assets/logo.png";
import { navigationMenu } from "./NavigationMenu";

const Navigation = () => {
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5 ">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="space-y-6">
          {navigationMenu.map((item) => 
            <div className="cursor-pointer flex space-x-3">
              {item.icon}
            <p className="text-xl">{item.title}</p>
          </div>
          )}
          </div>

      </div>
    </div>
  );
};

export default Navigation;
