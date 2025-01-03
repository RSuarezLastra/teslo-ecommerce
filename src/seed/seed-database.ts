import { initialData } from "./seed";
import prisma from "../lib/prisma";


async function main() {

  const { categories, products } = initialData;

  // delete data
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // users seed
  await prisma.user.createMany({
    data: initialData.users
  })

  // categories Seed
  const categoriesData = categories.map(name => ({ name }));

  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //products seed
  products.forEach(async (product) => {

    const { type, images, ...rest } = product;

    const productDb = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    });

    const imagesData = images.map(image => ({
      url: image,
      productId: productDb.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    })

  });

  console.log('Seed ejecutado correctamente');
}



(() => {

  if (process.env.NODE_ENV === 'production') return;

  main();
})()