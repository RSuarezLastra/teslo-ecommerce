import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  }
}


export default async function ({ params }: Props) {

  const { id } = await params;

  const products = initialData.products.filter(product => product.gender === id);

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
        title={`Articulos para ${label[id]}`}
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />
    </div>
  );
}