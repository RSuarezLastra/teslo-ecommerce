import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui";

interface Props {
  params: {
    slug: string
  }
}


export default async function ProductPage({ params }: Props) {

  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);


  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <div>
      <Title title={title} className='px-5' />

      <ProductForm product={product} categories={categories} />

    </div>
  );
}