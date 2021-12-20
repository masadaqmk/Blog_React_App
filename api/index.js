const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const multer = require("multer");
const path = require("path");
var cors = require('cors');

dotenv.config();

app.use(express.json());

app.use("/images", express.static(path.join(__dirname,"images/")))


app.use(cors());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(console.log("Connect")).catch( err=>console.log(err))

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images")
    },filename:(req,file,cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({ storage:storage});
app.post("/api/upload", upload.single("file"),(req, res)=>{
    res.status(200).json("File has been uploaded");
})

var cors = require ('cors');
app.use(cors({
    origin:['http://localhost:3000','http://127.0.0.1:3000'],
    credentials:true
}));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category",categoryRoute);

app.listen("5001");