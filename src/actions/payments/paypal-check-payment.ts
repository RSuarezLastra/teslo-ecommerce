'use server'

import { revalidatePath } from "next/cache";
import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";



export const paypalCheckPayment = async (paypalTransactionId: string) => {

  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificación'
    }
  }

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: 'Error al verificar el pago'
    }
  }

  const { status, purchase_units } = resp;
  const { invoice_id: order_id } = purchase_units[0];

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se ha pagado en paypal'
    }
  }

  try {

    await prisma.order.update({
      where: { id: order_id },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    });

    revalidatePath(`/orders/${order_id}`);

    return {
      ok: true
    }


  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'El pago no se pudo realizar'
    }
  }


}


const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json());

    return result.access_token;

  } catch (error) {
    console.log(error);
    return null;
  }

}

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PaypalOrderStatusResponse | null> => {
  const ordersUrl = process.env.PAYPAL_ORDERS_URL;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(`${ordersUrl}/${paypalTransactionId}`, {
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json());

    return result;

  } catch (error) {
    console.log(error);
    return null;
  }

}