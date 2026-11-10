import prisma from "../lib/prisma.js";
async function main() {
  console.log("Seeding started");

  // await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  const categoriesName = ["Giallo", "Fantasy", "Romanzo", "Game", "Storico"];
  const categories = await prisma.category.createMany({
    data: categoriesName.map((categ) => ({
      name: categ,
    })),
  });
  console.log(categories);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
