import express from "express";
import booksRouter from "./routes/books.js";
import error500 from "./middleware/error500.js";
import error404 from "./middleware/error404.js";

//setup
const app = express();
const port = 3000;


app.use(express.json());

//routing
app.get("/", (req, res) => {
  res.send("This is Book hompage");
});

//Crud for books
app.use("/books", booksRouter);


app.use(error404);

app.use(error500);

//server start
app.listen(port, () => {
  console.log("connected to server http://localhost:" + port);
});
