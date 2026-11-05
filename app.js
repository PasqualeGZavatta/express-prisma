import express from "express";
import booksRouter from "./routes/books.js";

//setup
const app = express();
const port = 3000;

//routing
app.get("/", (req, res) => {
  res.send("This is Book hompage");
});

//Crud for books

app.use("/books", booksRouter);

//server start

app.listen(port, () => {
  console.log("connected to server https://localhost:" + port);
});
