'use server'

import { User } from "@/interfaces"

export const getUserCart = async (userId: User['id']) => {
  try {

  } catch (error) {
    console.log(error);
    return [];
  }
}