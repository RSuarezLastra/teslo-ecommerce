export const revalidate = 604800;

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";


interface Props {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = await params;

  const product = await getProductBySlug(slug)


  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Producto no encontrado',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Producto no encontrado',
      images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function ({ params }: Props) {

  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* SlidesShow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow
          images={product!.images}
          title={product!.title}
          className="hidden md:block"
        />

        <ProductMobileSlideShow
          images={product!.images}
          title={product!.title}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <StockLabel slug={slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product?.title}
        </h1>
        <p className="text-lg mb-5">${product?.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector
          selectedSize={product!.sizes[0]}
          availableSizes={product!.sizes}
        />

        <QuantitySelector quantity={1} />

        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product?.description}
        </p>

      </div>
    </div>
  );
}