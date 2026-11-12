import express from "express";
import prisma from "../lib/prisma.js";
import {
  index,
  show,
  store,
  update,
  destroy,
} from "../controllers/bookController.js";

const booksRouter = express.Router();

//index
booksRouter.get("/", index);

//show
booksRouter.get("/:id", show);

//Store
booksRouter.post("/", store);

//update
booksRouter.patch("/:id", update);

//delete
booksRouter.delete("/:id", destroy);

// booksRouter.get("/", async (req, res, next) => {
//   try {
//     // 1. Aspettiamo che Prisma prenda i dati dal database
//     const books = await prisma.book.findMany();

//     // 2. Mandiamo la risposta JSON al client
//     res.json(books);
//   } catch (err) {
//     // 3. Se qualcosa va storto, l'errore vola dritto al middleware 500!
//     next(err);
//   }
// });

export default booksRouter;
