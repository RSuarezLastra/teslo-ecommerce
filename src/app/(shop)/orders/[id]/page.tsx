import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";
import { PaypalButton, Title } from "@/components";
import { PaymentStatus } from "./components";
import { currencyFormat } from "@/utils";


interface Props {
  params: Promise<{
    id: string;
  }>
}

export default async function ({ params }: Props) {

  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id.split('-').at(0)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <PaymentStatus isPaid={order!.isPaid} />

            {/* Items */}
            {
              order?.OrderItem.map(item => (
                <div key={`${item.product.slug}-${item.size}`} className="flex mb-5">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="hover:underline"
                    >
                      {item.product.title} - {item.size}
                    </Link>
                    <p>{currencyFormat(item.price)} x {item.quantity}</p>
                    <p className="font-semibold">Subtotal: {item.price * item.quantity}</p>

                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-lg p-7">

            <h2 className="text-2xl mb-2">Dirección de envío</h2>
            <div className="mb-10">
              <p>{address?.firstName} {address?.lastName}</p>
              <p className="text-sm">{address?.address}</p>
              <p className="text-sm">{address?.address2}</p>
              <p className="text-sm">{address?.city}, {address?.countryId}</p>
              <p className="text-sm">{address?.zip}</p>
              <p className="text-sm">{address?.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-8 rounded" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos (16%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">{currencyFormat(order!.total)}</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              {
                order?.isPaid ? (
                  <PaymentStatus isPaid={order!.isPaid} />
                ) : (
                  <PaypalButton
                    orderId={order!.id}
                    amount={order!.total}
                  />
                )
              }

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}