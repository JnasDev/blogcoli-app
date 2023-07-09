import db from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
   // Validate request body
   // if (!email || !username || !password) {
   //    return res.status(400).json({ message: "Invalid request body!" });
   // }

   // CHECK EXISTING USER
   const q = "SELECT * FROM users WHERE email = ? OR username = ?";
   db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      //check ถ้า user ซ้ำไห้ error
      if (data.length) return res.status(409).json("User already exists!");

      // แต่ถ้าไม่ซ้ำก็ทำตามขั้นตอน hash and create เลย
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      //create a user and hash password
      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
         if (err) return res.status(500).json(err);
         return res.status(200).json("User has been created.");
      });
   });
};

export const login = (req, res) => {
   // CHECK USER EXISTING OR NOT
   const q = "SELECT * FROM users WHERE username = ?";

   db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      // check if password correct and translate (hash) password to normal password by "compareSync"
      const isPasswordCorrect = bcrypt.compareSync(
         req.body.password,
         data[0].password
      );

      if (!isPasswordCorrect)
         return res.status(400).json("Wrong username or password!");

      // and then create jwt //สามารถไส่อะไรก็ได้แทน "jwtkey" ตัวอย่างเช่น "seryhhmafghj"
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];

      //สร้างชื่อ cookie = "access_token" //ตั้งค่า token นั้นเป็น cookie ด้วย res.cookie()
      // ข้อควรจำคือการทำงานนี้จะส่ง cookie ไปยัง server ในทุก ๆ request ดังนั้นคุณจำเป็นต้องมั่นใจว่า server ของคุณรับ cookie นี้และจัดการกับมันในทุก ๆ request และควรจะตั้งค่า SameSite policy ของ cookie เป็น 'None' และ Secure เป็น 'true' เพื่อส่ง cookie ผ่าน HTTPS ดังนี้
      res.cookie("access_token", token, {
         httpOnly: true,
         sameSite: 'none',
         secure: true
      })
         .status(200)
         .json(other);
   });
};

export const logout = (req, res) => {
   res.clearCookie("access_token", {
      sameSite: "none",
      secure: true,
   })
      .status(200)
      .json("User has been logged out.");
};
