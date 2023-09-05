const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const connectToMDB = require("./ConnectToDB");
const cors = require("cors");

// let authoriseToken = async (req,res,next)=>{
//   let decryptedCredentials = jwt.verify(req.headers["Authorization"], "abrackadabra");
//     console.log(req.body.token);
//     console.log(decryptedCredentials);

//     let result = await User.find().and({ email: decryptedCredentials.email });

//     if (result.length > 0) {
//       if (result[0].password == decryptedCredentials.password) {
//         next();
//       } else {
//         res.json({ status: "failure", msg: "Invalid Password" });
//       }
//     } else {
//       res.json({ status: "failure", msg: "Invalid Username" });
//     }

//     console.log(result);
//   } catch (err) {
//     res.json({ status: "failure", msg: "Invalid Token" });
//   }

// }

// router.use(authoriseToken)

router.use(cors());
let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

connectToMDB();

router.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let result = await User.find().and({ email: req.body.email });

  if (result.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      result[0].password
    );

    if (isPasswordCorrect == true) {
      let encryptedCredentials = jwt.sign(
        {
          email: result[0].email,
          password: result[0].password,
        },
        "abrackadabra"
      );

      console.log(encryptedCredentials);

      res.json({
        status: "success",
        userData: result[0],
        token: encryptedCredentials,
      });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "Invalid Username" });
  }

  console.log(result);
});

router.post("/validateToken", upload.none(), async (req, res) => {
  try {
    let decryptedCredentials = jwt.verify(req.body.token, "abrackadabra");
    console.log(req.body.token);
    console.log(decryptedCredentials);

    let result = await User.find().and({ email: decryptedCredentials.email });

    if (result.length > 0) {
      if (result[0].password == decryptedCredentials.password) {
        res.json({
          status: "success",
          userData: result[0],
        });
      } else {
        res.json({ status: "failure", msg: "Invalid Password" });
      }
    } else {
      res.json({ status: "failure", msg: "Invalid Username" });
    }

    console.log(result);
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid Token" });
  }
});

router.post("/signup", upload.array("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    let newUser = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.files[0].path,
    });

    await newUser.save();

    res.json({ status: "success", msg: "User created successfully" });
  } catch (err) {
    res.json(err);
  }
});

router.put("/updateProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    if (req.file && req.file.path) {
      await User.updateMany(
        { _id: req.body._id },
        {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          password: req.body.password,
          mobileNo: req.body.mobileNo,
          profilePic: req.file.path,
        }
      );
    } else {
      await User.updateMany(
        { _id: req.body._id },
        {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          password: req.body.password,
          mobileNo: req.body.mobileNo,
        }
      );
    }

    res.json({ status: "success", msg: "User details updated successfully" });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/deleteProfile", upload.none(), async (req, res) => {
  console.log(req.body);

  try {
    let result = await User.deleteMany({ _id: req.body._id });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
