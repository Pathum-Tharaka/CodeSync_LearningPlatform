import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import Signup from "../../Components/Register/Singup";
import "./Auth.css" 

const Auth = () => {
  const location=useLocation();
  return (
    <div>
     
        <div class="flex items-center justify-center h-[100vh]">
        

          <div className="form md:w-[35vw] lg:w-[22vw]">

            {location.pathname === "/login" ? <Signin/> :  <Signup/>}
           
          </div>
        </div>
      </div>
    
  );
};

export default Auth;

// https://res.cloudinary.com/dnbw04gbs/image/upload/v1679490221/screenshot4_hb7xtr.png
//
// 
// 