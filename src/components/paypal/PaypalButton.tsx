'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js"
import { setTransactionId } from "@/actions";

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
            currency_code: 'USD'
          }
        }
      ],
      intent: 'CAPTURE'
    })

    //TODO: setTransactionId server action
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw Error('No se pudo actualizar la orden');
    }

    console.log({ transactionId });


    return transactionId;
  }


  return (
    <PayPalButtons
      createOrder={createOrder}
    />
  )
}
