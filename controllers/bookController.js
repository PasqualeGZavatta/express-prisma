import prisma from "../lib/prisma.js";

export async function index(req, res) {
  const books = await prisma.book.findMany();
  res.json(books);
}
export async function show(req, res) {
  const id = req.params.id;
  const books = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(books);
}
export async function store(req, res) {
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
}
export async function update(req, res) {
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
}
export async function destroy(req, res) {
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
}
