import { initialData } from "./seed";
import prisma from "../lib/prisma";


async function main() {

  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories } = initialData

  const categoriesData = categories.map(name => ({ name }));

  await prisma.category.createMany({
    data: categoriesData
  })

  console.log('Seed ejecutado correctamente');
}



(() => {

  if (process.env.NODE_ENV === 'production') return;

  main();
})()