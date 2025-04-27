// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const OAuthSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5454/oauth-user", { withCredentials: true })
//       .then((res) => {
//         localStorage.setItem("user", JSON.stringify(res.data));
//         navigate("/home");
//       })
//       .catch(() => {
//         navigate("/signin?error=true");
//       });
//   }, [navigate]);

//   return <div>Signing you in...</div>;
// };

// export default OAuthSuccess;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5454/oauth-user", { withCredentials: true })
      .then((res) => {
        localStorage.setItem("token", res.headers["authorization"]);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch(() => {
        navigate("/signin?error=true");
      });
  }, [navigate]);

  return <div>Signing you in...</div>;
};

export default OAuthSuccess;

