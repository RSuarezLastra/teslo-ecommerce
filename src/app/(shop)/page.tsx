import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";


interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page: pageNumber });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <div className="px-2 md:px-0">
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
