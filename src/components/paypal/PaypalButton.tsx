'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js"

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = ((Math.round(amount * 100)) / 100).toString();

  if (isPending) {
    return (
      <>
        <div className="animate-pulse mb-12">
          <div className="h-10 bg-gray-400 rounded"></div>
          <div className="h-10 bg-gray-400 mt-3 rounded"></div>
        </div>
      </>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: roundedAmount,
          }
        }
      ]
    })

    console.log({ transactionId });


    return transactionId;
  }


  return (
    <PayPalButtons
      createOrder={createOrder}
    />
  )
}
