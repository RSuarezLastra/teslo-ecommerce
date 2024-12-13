import { QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    slug: string;
  }
}

export default async function ({ params }: Props) {

  const { slug } = await params;

  const product = initialData.products.find(product => product.slug === slug);

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* SlidesShow */}
      <div className="col-span-1 md:col-span-2">
        <h1>Hola mundo</h1>
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product?.title}
        </h1>
        <p className="text-lg mb-5">${product?.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector
          selectedSize={product?.sizes[0]}
          availableSizes={product?.sizes}
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