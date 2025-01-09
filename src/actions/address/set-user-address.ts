'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";


export const setUserAddress = async (address: Address, userId: string) => {
  try {

    const dbAddress = await createOrReplaceAddress(address, userId);
    
    return {
      ok: true,
      dbAddress
    }

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error al guardar la dirección'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    
    const addressStored = await prisma.userAddress.findUnique({
      where: { userId }
    });
    
    const addressTosSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      countryId: address.country,
      address: address.address,
      address2: address.address2,
      city: address.city,
      zip: address.zip,
      phone: address.phone,
    }
    
    if (!addressStored) {
      const newAddress = await prisma.userAddress.create({
        data: addressTosSave
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressTosSave
    });

    return updatedAddress;

  } catch (error) {
    console.log(error);
    throw new Error('Error al guardar la dirección');
  }
}