const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose")

//== Connection To mongoDb Connection
mongoose.connect("mongodb://localhost:27017/BookStoreDb").then(()=>{console.log("Connected To  MongoDb ..")})
    .catch((error)=>console.log("Connection Failed To MongoDb --",error ));

//==Init app
const app = express();

//apply Middlewares

app.use(express.json());
app.use("/api/books",booksPath)
app.use("/api/authors",authorsPath)

//Running The Server 
const PORT = 5000 ;
app.listen(PORT,()=>{console.log("Server Running on port " +PORT)})