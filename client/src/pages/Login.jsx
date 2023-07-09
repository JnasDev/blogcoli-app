import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/authContext.jsx";

const Login = () => {
   const [inputs, setInputs] = useState({
      username: "",
      password: "",
   });
   const [err, setErr] = useState("");

   const navigate = useNavigate();

   //3.ใช้ useContext ดึงข้อมูลจาก Context คือ"AuthContext" ใน "authContext.jsx"
   const { login } = useContext(AuthContext);

   const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   // console.log(inputs);

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         // const res = await axios.post(
         //    "http://localhost:4000/api/auth/login",
         //    inputs
         // );   //โดนนำไปทำระบบ login / logout ใน authContext.js //"แต่ขั้นตอนแรกควร test ก่อนว่า กด login แล้ว cookie / jwt มาใน cookie browser หรือป่าว"

         await login(inputs); //from line 16 or const { login } = useContext(AuthContext);
         Swal.fire({
            title: "Login Successfully!",
            text: 'Let"s go to the Home Page. ',
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#047857",
            allowOutsideClick: false,
         }).then(() => {
            navigate("/");
         });
         // console.log(res);
      } catch (error) {
         console.log("Something went wrong : ", error);
         if (error.response.data) {
            setErr(error.response.data);
         }
      }
   };
   return (
      <div className="app">
         <div className="container-2">
            <div className="auth">
               <h1>Login</h1>
               <form>
                  <input
                     required
                     type="text"
                     placeholder="username"
                     name="username"
                     onChange={handleChange}
                  />
                  <input
                     required
                     type="password"
                     placeholder="password"
                     name="password"
                     onChange={handleChange}
                  />
                  <button onClick={handleLogin}>Login</button>
                  {err && <p>{err}</p>}
                  <span>
                     {" "}
                     Don't you have an account ?{" "}
                     <Link to="/register">Register</Link>
                  </span>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
