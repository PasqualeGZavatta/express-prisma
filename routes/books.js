import express from "express";

const booksRouter = express.Router();

//index
booksRouter.get("/", (req, res) => {
  res.send("List of books");
});

export default booksRouter;
