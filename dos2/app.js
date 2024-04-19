const express = require("express");

require("dotenv").config()
const logger = require("./middlwares/logger")
const {notFound,customizeException} = require("./middlwares/errors")

const connectToDb = require("./config/db")



    //== Connection To mongoDb Connection
        connectToDb()

//==Init app
const app = express();

//apply Middlewares
app.use(express.json());
app.use(logger)
app.use("/api/books",require("./routes/books"))
app.use("/api/authors", require("./routes/authors"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))

//Error handler middleware
app.use(notFound)

app.use(customizeException)



//Running The Server 
const PORT = process.env.PORT || 8000; ;
app.listen(PORT,()=>{console.log("Server Running on port " +PORT)})