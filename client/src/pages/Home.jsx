import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
   const [posts, setPosts] = useState([]);
   const cat = useLocation().search;

   // console.log(location)
   // นำข้อมูลจาก database มาไช้ใน frontend
   useEffect(() => {
      const FetchData = async () => {
         try {
            const res = await axios.get(
               `http://localhost:4000/api/posts${cat}`
            );

            setPosts(res.data);
         } catch (error) {
            console.log(error);
         }
      };

      FetchData();
   }, [cat]); //เพื่อ find function again and again

   // ลบ <p></p> ออกจาก desc
   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
   };

   return (
      <div className="app">
         <div className="container">
            <div className="home">
               <div className="posts">
                  {posts.map((post) => (
                     <div className="post" key={post.id}>
                        <div className="img">
                           <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                           <Link className="link" to={`/post/${post.id}`}>
                              <h1>{post.title}</h1>
                           </Link>
                           <p>{getText(post.desc)}</p>
                           <Link className="read_more" to={`/post/${post.id}`}>Read More</Link>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
