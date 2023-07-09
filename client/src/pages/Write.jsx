import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

axios.defaults.withCredentials = true;

const Write = () => {
   const state = useLocation().state;

   const [value, setValue] = useState(state?.desc || "");
   const [title, setTitle] = useState(state?.title || "");
   const [file, setFile] = useState(null);
   const [cat, setCat] = useState(state?.cat || "");

   const navigate = useNavigate();

   const upload = async () => {
      try {
         const formData = new FormData();
         // ชื่อ --> "file", ต้องตรงกันกับใน index.js
         formData.append("file", file);
         const res = await axios.post(
            "http://localhost:4000/api/upload",
            formData
         );
         console.log(res.data);
         return res.data;
      } catch (error) {
         console.log(error);
      }
   };

   const handleClick = async (e) => {
      e.preventDefault();
      const imgUrl = await upload();

      try {
         state
            ? await axios.put(`http://localhost:4000/api/posts/${state.id}`, {
                 title,
                 desc: value,
                 cat,
                 img: file ? imgUrl : "",
              })
            : await axios.post(`http://localhost:4000/api/posts/`, {
                 title,
                 desc: value,
                 cat,
                 img: file ? imgUrl : "",
                 date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              });
         navigate("/");
      } catch (err) {
         console.log(err);
      }
   };

   //  console.log(value);
   return (
      <div className="writing">
         <div className="content">
            <input
               type="text"
               value={title}
               placeholder="Title"
               onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
               <ReactQuill
                  className="editor"
                  theme="snow"
                  placeholder="Write something..."
                  value={value}
                  onChange={setValue}
               />
            </div>
         </div>
         <div className="menu">
            <div className="item">
               <h1>Publish</h1>
               <span>
                  <b>Status: </b> Draft
               </span>
               <span>
                  <b>Visibility: </b> Public
               </span>
               <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <label htmlFor="file">Upload Image</label>
               <div className="buttons">
                  <button className="buttons-save">Save as a draft</button>
                  <button className="buttons-update" onClick={handleClick}>
                     Publish
                  </button>
               </div>
            </div>
            <div className="item2">
               <h1>Category</h1>
               <div>
                  <input
                     type="radio"
                     checked={cat === "art"}
                     name="cat"
                     value="art"
                     id="art"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="art">ART</label>
               </div>
               <div>
                  <input
                     type="radio"
                     checked={cat === "science"}
                     name="cat"
                     value="science"
                     id="science"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science">science</label>
               </div>
               <div>
                  <input
                     type="radio"
                     checked={cat === "technology"}
                     name="cat"
                     value="technology"
                     id="technology"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">technology</label>
               </div>
               <div>
                  <input
                     type="radio"
                     checked={cat === "cinema"}
                     name="cat"
                     value="cinema"
                     id="cinema"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="cinema">cinema</label>
               </div>
               <div>
                  <input
                     type="radio"
                     checked={cat === "design"}
                     name="cat"
                     value="design"
                     id="design"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">design</label>
               </div>
               <div>
                  <input
                     type="radio"
                     checked={cat === "food"}
                     name="cat"
                     value="food"
                     id="food"
                     onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food">food</label>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Write;
