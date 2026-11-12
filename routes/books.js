import express from "express";
import prisma from "../lib/prisma.js";
import error404 from "../middleware/error404.js";

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

//update
booksRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, author, prize, categoryId } = req.body;

  //validazioni

  //validazione ID

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid id format",
    });
  }

  //validazione esistenza prodotto nel DB ed esistenza categoria

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!book) {
    return res.status(404).json({
      error: "Book non trovato",
    });
  }

  if (categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });
    if (!category) {
      return res.status(400).json({
        error: "invalid category id",
      });
    }
  }
  const updatedBook = await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      author,
      prize: prize !== undefined ? Number(prize) : undefined,
      categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
    },
  });
  res.json(updatedBook);
});

//delete
booksRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  //VALIDAZIONI
  //ID è numero intero?
  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }

  //category esiste? Il book a quell'id??
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });

  if (!book) {
    return res.status(404).json({
      error: "Book not found",
    });
  }

  //delete prompt
  const deleteBook = await prisma.book.delete({
    where: { id },
  });

  res.status(204).send();
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
