const express = require("express");

require("dotenv").config()
const logger = require("./middlwares/logger")
const {notFound,customizeException} = require("./middlwares/errors")

const connectToDb = require("./config/db")
const helmet = require("helmet")
const cors = require("cors")

    //== Connection To mongoDb Connection
        connectToDb()

//==Init app
const app = express();

//apply Middlewares
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(cors({origin:"http://localhost:3000"}));
app.use(logger)
app.use("/api/books",require("./routes/books"))
app.use("/api/authors", require("./routes/authors"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))
app.use("/password",require("./routes/password"))

//Error handler middleware
app.use(notFound)

app.use(customizeException)



//Running The Server 
const PORT = process.env.PORT || 8000; ;
app.listen(PORT,()=>{console.log("Server Running on port " +PORT)})