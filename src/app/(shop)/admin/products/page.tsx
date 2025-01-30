import Link from 'next/link';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function ProductsPage({ searchParams }: Props) {

  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page: pageNumber });


  return (
    <>
      <Title title="Productos" />

      <div className='flex justify-end mb-5'>
        <Link href='/admin/products/new' className='btn-primary text-sm'>
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full rounded overflow-hidden">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 p-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>

            {
              products?.map(product => (
                <tr key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage
                        src={product?.images[0]}
                        alt={product.title}
                        height={80}
                        width={80}
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 p-4 whitespace-nowrap">
                    <Link href={`/admin/products/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {currencyFormat(product.price)}
                  </td>
                  <td className="text-sm  text-gray-900 px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(', ')}
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>

        <Pagination totalPages={totalPages!} />

      </div>
    </>
  );
}