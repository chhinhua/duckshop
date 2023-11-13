export interface IInfoOrder {
    total: number;
    paymentType: string;
    note: string;
    userId: number;
    address: { id: number };
}
