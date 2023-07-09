import express from "express";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

// database
import db from "./database.js";

if (db) {
   console.log("MySQL is running.");
}

const app = express();

// cors (frontend only)
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
   },
});

const upload = multer({ storage });

// ชื่อไฟล์ "file"
app.post("/api/upload", upload.single("file"), (req, res, next) => {
   const file = req.file
   res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter); //POV = http://localhost:4000/api/auth/test  | test = from './routes/auth.js'
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);

const PORT = 4000;
app.listen(PORT, () => {
   console.log(`Server is running on port : ${PORT}`);
});
