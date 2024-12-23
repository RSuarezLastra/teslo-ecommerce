export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";


interface Props {
  params: {
    slug: string;
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