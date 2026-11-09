import express from "express";

const booksRouter = express.Router();

//index
booksRouter.get("/", (req, res) => {
  res.send("List of books");
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
