import express from "express";
import booksRouter from "./routes/books.js";
import error500 from "./middleware/error500.js";
import error404 from "./middleware/Error404.js";

//setup
const app = express();
const port = 3000;

//routing
app.get("/", (req, res) => {
  res.send("This is Book hompage");
});

//Crud for books

app.use("/books", booksRouter);
app.use(error500);
app.use(error404);
//server start

app.listen(port, () => {
  console.log("connected to server https://localhost:" + port);
});
