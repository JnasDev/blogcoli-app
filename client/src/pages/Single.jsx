import React, { useContext, useEffect, useState } from "react";
import EDIT from "../img/edit.png";
import DELETE from "../img/delete.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext.jsx";
import DOMPurify from "dompurify";

const Single = () => {
   const [post, setPost] = useState({});
   const location = useLocation();
   const navigate = useNavigate();

   //for read number (http://localhost:4000[0]/posts[1]/:id[2])
   const postId = location.pathname.split("/")[2];

   //1.การทำเมื่อต้องการไห้เฉพาะคน post สามารถ edit and delete ได้
   const { currentUser } = useContext(AuthContext);

   // console.log(location);

   // นำข้อมูลจาก database มาไช้ใน frontend
   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(
               `http://localhost:4000/api/posts/${postId}`
            );

            setPost(res.data); //Note: Use setPost() instead of setPosts()
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, [postId]); //เพื่อ find function again and again

   const handleDelete = async () => {
      try {
         await axios.delete(`http://localhost:4000/api/posts/${postId}`, {
            withCredentials: true,
         });
         // After deleting the post, delete the token from local storage.
         localStorage.removeItem("jwtkey");
         navigate("/");
      } catch (err) {
         console.log(
            "Something went wrong:",
            err.response?.data || err.message
         );
      }
   };

   const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
   };

   return (
      <div className="single">
         <div className="content">
            <img src={`../upload/${post?.img}`} alt="POST_IMG" />
            <div className="user">
               {post.userImg && <img src={post.userImg} alt="USER" />}
               <div className="info">
                  <span>{post.username}</span>
                  <p>Posted {moment(post.date).fromNow()}</p>
               </div>
               {currentUser?.username === post.username && (
                  <div className="edit">
                     <Link to={`/write?edit=2`} state={post}>
                        <img src={EDIT} alt="EDIT" />
                     </Link>
                     <img onClick={handleDelete} src={DELETE} alt="DELETE" />
                  </div>
               )}
            </div>
            <h1>{post.title}</h1>
            <p
               dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
               }}
            ></p>{" "}
         </div>
         {/* END CONTENT */}
         {/* ส่ง props cat(category) ไปที่ Menu.jsx */}
         <Menu cat={post.cat} />
      </div>
   );
};

export default Single;
