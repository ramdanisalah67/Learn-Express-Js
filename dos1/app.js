console.log("welcome salah-eddine")

//Core Module
const http = require("http");
const books= [
    {id:1,name:"book1"},
    {id:2,name:"book2"},
    {id:3,name:"book3"}

]
const server = http.createServer((req,res)=>{
    if(req.url ==="/"){
        res.write("<h2>welcome salah-eddine</h2>");
        res.end()
    }
    if(req.url ==="/api/books"){
        res.write("<h2>Books List</h2>");
        res.write(`${JSON.stringify(books)}`);

        res.end()
    }
});
const PORT= 5000
server.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})

//Custome Module

const message_service = require("./message-service");
message_service.print()
//we can use other syntax
const {print,sayHello} = require("./message-service")

print();
sayHello();


//Third party Module
//npm init 
//npm install express

const express =require("express")