import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
   const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
   });
   const [err, setErr] = useState("");

   const navigate = useNavigate();

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   // console.log(inputs);

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(
            "http://localhost:4000/api/auth/register",
            inputs
         );
         Swal.fire({
            title: "Register Successfully!",
            text: 'Let"s go to the Login. ',
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#047857",
            allowOutsideClick: false,
         }).then(() => {
            navigate("/login");
         });
         // console.log(res);
      } catch (error) {
         console.log("Something went wrong : ", error);
         setErr(error.response.data.message);
      }
   };

   return (
      <div className="app">
         <div className="container-2">
            <div className="auth">
               <h1>Register</h1>
               <form>
                  <input
                     required
                     type="text"
                     placeholder="username"
                     onChange={handleChange}
                     name="username"
                  />
                  <input
                     required
                     type="email"
                     placeholder="email"
                     onChange={handleChange}
                     name="email"
                  />
                  <input
                     required
                     type="password"
                     placeholder="password"
                     onChange={handleChange}
                     name="password"
                  />
                  <button onClick={handleRegister}>Register</button>
                  {err && <p>{err}</p>}
                  <span>
                     {" "}
                     If you have an account ? <Link to="/login">Login</Link>
                  </span>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;
