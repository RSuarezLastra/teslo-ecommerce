import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChange: (siez: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        
        {
          availableSizes.map(size => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={
                clsx(
                  "text-lg mx-2 hover:underline",
                  {
                    'underline': size === selectedSize
                  }
                )}>
              {size}
            </button>
          ))
        }
      </div>

    </div>
  )
}
