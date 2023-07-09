import React from "react";
import {
   createBrowserRouter,
   RouterProvider,
   Route,
   Link,
   Outlet,
} from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CSS
import "./style.scss";

const Layout = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};
//Outlet = การทำ file JSX ไห้อยู่ระหว่าง file Navbar - "JSX" - Footer
const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />, //Outlet
      children: [
         //สร้าง Element ที่ต้องการอยู่ระหว่าง Navbar and Footer
         { path: "/", element: <Home /> },
         { path: "/post/:id", element: <Single /> },
         { path: "/write", element: <Write /> },
      ],
   },
   {
      path: "/register",
      element: <Register />,
   },
   {
      path: "/login",
      element: <Login />,
   },
]);
function App() {
   return (
      <div className="App">
         <div className="container">
            <RouterProvider router={router} />
         </div>
      </div>
   );
}

export default App;
