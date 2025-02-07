"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import { ProductImage } from "@/components";

interface Props {
  product: Product & { ProductImage?: ProductWithImage[] } | null;
  categories: Category[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  sizes: string[];
  images?: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];


export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags.join(', '),
      sizes: product?.sizes ?? [],
      images: undefined
    }
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    
    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }

    setValue('sizes', Array.from(sizes));
  }


  const onSubmit = async (data: FormInputs) => {

    
    const formData = new FormData();

    const { ...productToSave } = data;

    if (product?.id) {
      formData.append('id', product?.id ?? '');
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (productToSave.images) {
      for (let i = 0; i < productToSave.images.length; i++) {
        formData.append('images', productToSave.images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert('No se pudo acutalizar/crear el producto');
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8" >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <button
          type="submit"
          className={clsx("w-full",
            {
              'btn-primary': isValid,
              'btn-disabled': !isValid
            }
          )}>
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">

          <div className="flex flex-col mb-2">
            <span>Inventario</span>
            <input
              type="number"
              className="p-2 border rounded-md bg-gray-200"
              {...register('inStock', { required: true, min: 0 })}
            />
          </div>

          <span>Tallas</span>
          <div className="flex flex-wrap mb-2 gap-2">

            {
              sizes?.map(size => (
                <div
                  key={size}
                  onClick={() => onSizeChanged(size)}
                  className={clsx("text-center p-2 justify-center w-12 h-10 border rounded-md mt-2 cursor-pointer transition-all", {
                    "bg-blue-500 text-white": getValues('sizes').includes(size)
                  })}>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {
              product?.ProductImage?.map(image => (
                <div key={image.id}>
                  <ProductImage
                    alt={product.title ?? ''}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t-lg"
                  />
                  <button
                    onClick={() => deleteProductImage(image.id, image.url)}
                    type="button"
                    className="btn-danger w-full rounded-b-lg">
                    Eliminar
                  </button>
                </div>
              ))
            }

          </div>

        </div>
      </div>
    </form>
  );
};