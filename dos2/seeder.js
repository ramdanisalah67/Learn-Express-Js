const {Book} = require("./Models/Book");
const {Author} = require("./Models/Author");
const {books,authors} = require("./data");

const connectToDb = require("./config/db");
 require("dotenv").config();



 connectToDb();

 //====Import Book 
 const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books imported");
    } catch (error) {
        console.log("Something went wrong:", error);
        process.exit(1);
    }
}



 //====Remove Books
 const removeBooks = async ()=>{
    await Book.deleteMany().then(console.log("books Removed")).catch(()=>{console.log("something went wrong");process.exit(1)})
}

if(process.argv[2]==="-import_Books"){
    importBooks();
}

else if(process.argv[2]==="-remove_Books"){
    removeBooks();
}


 //====Import Authors 
 const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("authors imported");
    } catch (error) {
        console.log("Something went wrong:", error);
        process.exit(1);
    }
}



 //====Remove Book 
 const removeAuthors = async ()=>{
    await Athor.deleteMany().then(console.log("authors Removed")).catch(()=>{console.log("something went wrong");process.exit(1)})
}

if(process.argv[2]==="-import_Authors"){
    importAuthors();
}

else if(process.argv[2]==="-remove_Authors"){
    removeAuthors();
}





