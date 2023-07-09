import React, { useContext } from "react";
import LOGO from "../img/logo-2.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
   //สร้าง Context และไช้ค่า currentUser ใน "authContext.jsx" (และนำไปไช้)
   const { currentUser, logout } = useContext(AuthContext);

   return (
      <div className="app">
         <div className="navbar">
            <div className="container">
               <div className="logo">
                  <Link to="/">
                     <img src={LOGO} alt="LOGO" />
                  </Link>
               </div>
               <div className="links">
                  <Link className="link" to="/?cat=art">
                     <h6>ART</h6>
                  </Link>
                  <Link className="link" to="/?cat=science">
                     <h6>SCIENCE</h6>
                  </Link>
                  <Link className="link" to="/?cat=technology">
                     <h6>TECHNOLOGY</h6>
                  </Link>
                  <Link className="link" to="/?cat=cinema">
                     <h6>CINEMA</h6>
                  </Link>
                  <Link className="link" to="/?cat=design">
                     <h6>DESIGN</h6>
                  </Link>
                  <Link className="link" to="/?cat=food">
                     <h6>FOOD</h6>
                  </Link>
                  <span>{currentUser?.username}</span>
                  {currentUser ? (
                     <span onClick={logout}>Logout</span>
                  ) : (
                     <Link className="link" to="/login">
                        Login
                     </Link>
                  )}
                  <span className="write">
                     <Link className="link" to="/write">
                        Write
                     </Link>
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
