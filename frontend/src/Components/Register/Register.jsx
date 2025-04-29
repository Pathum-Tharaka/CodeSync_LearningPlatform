import { Form } from "formik";
import React from "react";
import "./Register.css";
import logo from "../../Assets/logo1.png";



const Register = () => {
  return (
    <div>
      <div class="flex">
        {}
        
        <div class="">
          
                    <img src={logo} alt="Logo" className="w-full max-w-[150px] mx-auto" />
                  

          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
