'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {

  const [count, setCount] = useState(quantity);

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;

    setCount(count + value);
  }

  return (
    <div className="flex">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline />
      </button>

      <span className="mx-3 px-2 w-14 text-center bg-gray-200 rounded">
        {count}
      </span>

      <button onClick={() => onQuantityChange(+1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  )
}
