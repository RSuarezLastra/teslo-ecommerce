import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCartCheckout } from "./components/ProducstInCartCheckout";


export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>


            {/* Items */}
            <ProductsInCartCheckout />
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-lg p-7">

            <h2 className="text-2xl mb-2">Dirección de envío</h2>
            <div className="mb-10">
              <p>Raul Suarez</p>
              <p className="text-sm">Av. Privada Caoba #19</p>
              <p className="text-sm">Fracc. Pomoca</p>
              <p className="text-sm">Villahermosa, Tabasco</p>
              <p className="text-sm">CP. 86234</p>
              <p className="text-sm">123.354.434</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-8 rounded" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">$ 100</span>

            </div>

            <div className="mt-5 mb-2 w-full">

              {/* Disclaimer */}
              <p className="mb-4">
                <span className="text-xs">
                  Al hacer click en "Generar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#">política de privacidad</a>
                </span>
              </p>

              <Link
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Generar orden
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}