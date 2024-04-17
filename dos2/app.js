const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const logger = require("./middlwares/logger")
const {notFound,customizeException} = require("./middlwares/errors")
const authPath = require("./routes/auth") 
const userPath = require("./routes/users")

dotenv.config()


//== Connection To mongoDb Connection
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected To  MongoDb ..")})
    .catch((error)=>console.log("Connection Failed To MongoDb --",error ));

//==Init app
const app = express();

//apply Middlewares
app.use(express.json());
app.use(logger)
app.use("/api/books",booksPath)
app.use("/api/authors",authorsPath)
app.use("/api/auth",authPath)
app.use("/api/users",userPath)

//Error handler middleware
app.use(notFound)

app.use(customizeException)



//Running The Server 
const PORT = process.env.PORT || 8000; ;
app.listen(PORT,()=>{console.log("Server Running on port " +PORT)})