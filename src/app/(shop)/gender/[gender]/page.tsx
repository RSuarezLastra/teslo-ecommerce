import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: Gender;

  },
  searchParams: {
    page?: string;
  }
}


export default async function ({ params, searchParams }: Props) {

  const { gender } = await params;
  const { page } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({ gender, page: pageNumber });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const label: Record<Category, string> = {
    "men": "Hombres",
    "women": "Mujeres", 
    "kid": "Niños",
    "unisex": "todos"
  }

  // if(id === "kids"){
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Articulos para ${label[gender]}`}
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}