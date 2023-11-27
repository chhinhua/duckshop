// export interface IreviewOrder = Pick<Person, 'id' | 'name'>;
// {
//     content: string;
//     stars: number; // số nguyễn từ 1 đến 5
//     orderId: number;
//     productId: number;
// }

export interface IreviewOrder extends Pick<Ireview, 'content' | 'stars' | 'orderId' | 'productId'> {}
export default interface Ireview {
    id: number;
    content: string;
    stars: number;
    createdDate: string;
    user: {
        username: string;
        avatarUrl: string;
    };
    productId: number;
    orderId: number;
}
