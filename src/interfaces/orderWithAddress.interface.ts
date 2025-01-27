
export interface OrderWithAddress {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createAt: Date;
  updateAt: Date;
  transactionId: string | null; 
  UserId: string;
  
  OrderAddress: {
    firstName: string;
    lastName: string;
  } | null;

}

