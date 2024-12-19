import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1

  const { products } = await getPaginatedProductsWithImages({ page: pageNumber });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

    </>
  );
}
