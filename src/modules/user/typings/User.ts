export type UserType = {
    _id?: string;
    email?: string;
    image?: string;
    name: string;
    role: string;
    cart: [{ productId: string; quantity: number }];
};
