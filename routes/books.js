import express from "express";
import prisma from "../lib/prisma.js";

const booksRouter = express.Router();

//index
booksRouter.get("/", async (req, res) => {
  // res.send("List of books");

  const books = await prisma.book.findMany();
  res.json(books);
});

//show
booksRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const books = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(books);
});

//create
booksRouter.post("/", async (req, res) => {
  const { title, author, prize, description, categoryId } = req.body;

  const newBook = await prisma.book.create({
    data: {
      title,
      description,
      author,
      prize: prize ? Number(prize) : 0,
      category: {
        connect: { id: Number(categoryId) },
      },
    },
    select: {
      id: true,
    },
  });
  res.status(201).json(newBook);
});

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
