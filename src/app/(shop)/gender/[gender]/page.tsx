import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>,
  searchParams: Promise<{
    page?: string;
  }>
}


export default async function ({ params, searchParams }: Props) {

  const { gender } = await params;
  const { page } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender: gender as Gender,
    page: pageNumber
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const label: Record<string, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "todos"
  }


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