import IAddress from './address';
import IProductCart from './productCart';
export interface IOrder {
    address: IAddress;
    createdDate: string;
    id: number;
    isPaidBefore: boolean;
    lastModifiedDate: string;
    note: string;
    orderItems: IProductCart;
    paymentType: string;
    status: string;
    total: number;
    totalItems: number;
    userId: number;
}
