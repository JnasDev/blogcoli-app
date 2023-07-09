import React from "react";
import LOGO from '../img/logo-2.png'

const Footer = () => {
   return (
      <div className="app-footer">
         <div className="container-footer">
            <footer>
               <img src={LOGO} alt="LOGO" />
            </footer>
            <span>&copy; Create by <b>JonasDev</b> and <b>React.JS</b></span>
         </div>
      </div>
   );
};

export default Footer;
