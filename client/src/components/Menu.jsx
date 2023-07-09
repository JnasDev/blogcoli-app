import axios from "axios";
import React, { useState, useEffect } from "react";

//รับ props cat  จาก Single.jsx
const Menu = ({ cat }) => {
   const [posts, setPosts] = useState([]);

   // console.log(location)
   // นำข้อมูลจาก database มาไช้ใน frontend
   useEffect(() => {
      const FetchData = async () => {
         try {
            const res = await axios.get(
               `http://localhost:4000/api/posts/?cat=${cat}`
            );

            setPosts(res.data);
         } catch (error) {
            console.log(error);
         }
      };

      FetchData();
   }, [cat]); //เพื่อ find function again and again
   return (
      <div className="menu">
         <h1>Other posts you may like</h1>
         {posts.map((post) => (
            <div className="post" key={post.id}>
               <img src={`../upload/${post?.img}`} alt="" />
               <h2>{post.title}</h2>
               <button className="btn-menu">Read More</button>
            </div>
         ))}
      </div>
   );
};

export default Menu;
