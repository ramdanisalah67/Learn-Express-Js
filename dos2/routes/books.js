const express = require("express");
const router = express.Router()
const  { allBook, getBookById, saveBook, deleteBook, updateBook } = require("../Controllers/BookController")
//==Variables :


//==Http Methods /Verbs

router.route("/").get(allBook);

router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);


router.route("/save").post(saveBook);



module.exports = router
