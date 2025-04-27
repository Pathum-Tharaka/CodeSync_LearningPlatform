import { Form } from "formik";
import React from "react";
import "./Register.css";


const Register = () => {
  return (
    <div>
      <div class="flex">
        {}
        
        <div class="">
          <img
            src="https://thumbs.dreamstime.com/b/print-179008753.jpg"
            alt="ElearnXpert Logo"
          />

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
