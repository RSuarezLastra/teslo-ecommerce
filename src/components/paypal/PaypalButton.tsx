'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

export const PaypalButton = () => {
  
  const [{ isPending }] = usePayPalScriptReducer();

  if(isPending){
    return (
      <>
        <div className="animate-pulse mb-12">
          <div className="h-10 bg-gray-400 rounded"></div>
          <div className="h-10 bg-gray-400 mt-3 rounded"></div>
        </div>
      </>
    )
  }


  return (
    <PayPalButtons />
  )
}
