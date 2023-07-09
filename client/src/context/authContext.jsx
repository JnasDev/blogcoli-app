import axios from "axios";
import { createContext, useEffect, useState } from "react";

// เราต้องการดึง access_token มาจาก HTTP Only Cookie สำหรับการทำ API requests โดยใช้ axios คุณไม่จำเป็นต้องดึงมันออกมาและจัดเก็บใน localStorage ให้แทนที่การเข้าถึง access_token จาก localStorage ด้วยการส่ง access_token ใน HTTP Only Cookie ทุกครั้งที่คุณทำ API requests คุณสามารถทำได้โดยการตั้งค่า axios ดังนี้:
axios.defaults.withCredentials = true;

//1.สร้าง Context
export const AuthContext = createContext(); //นำไปไช้ที่ Login.jsx

export const AuthContextProvider = ({ children }) => {
   // "children" = เป็นตัวคลุม <App /> จาก Main.jsx | นำ AuthContextProvider ไปคลุม <App /> ด้วย สามารถไปดูตัวอย่างได้เลยที่ Main.jsx

   //สร้าง Key ใน LocalStorage ชื่อว่า "user" //นำไปไช้ใน Navbar.jsx ด้วย
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
   );

   const login = async (inputs) => {
      //ใน  Login.jsx เราต้องไส่ "inputs" เหมือนกันด้วย สามารถไปดูใน Login.jsx
      const res = await axios.post(
         "http://localhost:4000/api/auth/login",
         inputs
      );

      setCurrentUser(res.data); //นำ user ที่ login เข้ามาไปไว้ที่ currentUser และ LocalStorage ใน browser (Application)
   };

   //ใน logout นำ props "inputs" ออก
   const logout = async () => {
      await axios.post("http://localhost:4000/api/auth/logout");
      setCurrentUser(null);
   };

   //วิธีการเรียก cookie / jwt เข้ามาใน LocalStorage โดยไช้ useEffect
   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
   }, [currentUser]); //ตัว Change "currentUser"

   return (
      //2.ให้ Context .Provider ครอบ component ที่ต้องการใช้ข้อมูล (และไส่ข้อมูลที่ต้องการจะไห้ครอบ "value")
      <AuthContext.Provider value={{ currentUser, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
