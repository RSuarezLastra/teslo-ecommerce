'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number;

  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChange(quantity + value);
  }

  return (
    <div className="flex">
      <button onClick={() => onValueChange(-1)}>
        <IoRemoveCircleOutline />
      </button>

      <span className="mx-3 px-2 w-14 text-center bg-gray-200 rounded">
        {quantity}
      </span>

      <button onClick={() => onValueChange(+1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  )
}
